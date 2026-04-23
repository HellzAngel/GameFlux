// =============================================
//  GameFlux — App (lhbzr-style Three.js scene)
// =============================================

let currentSport  = "all";
let currentFilter = "live";
let activeEvent   = null;
let matchAnimFrame   = null;
let commentaryInterval = null;
let scoreUpdateInterval = null;
let _matchRenderer = null;

// ─── Custom Cursor ────────────────────────────────────────────────────────────
(function initCursor() {
  const el = document.getElementById("cursor");
  if (!el) return;
  let cx = -100, cy = -100, tx = -100, ty = -100;
  document.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    requestAnimationFrame(loop);
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    el.style.left = cx + "px";
    el.style.top  = cy + "px";
  })();
  document.addEventListener("mousedown", () => el.classList.add("pressed"));
  document.addEventListener("mouseup",   () => el.classList.remove("pressed"));
})();

// ─── Three.js Background Scene (lhbzr.com accurate recreation) ───────────────
(function initThreeJS() {
  try {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const W = window.innerWidth, H = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 1);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
    camera.position.z = 500;

    // ── Mouse parallax ──────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    document.addEventListener("mousemove", e => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 80;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 50;
    });

    // ── Constellation particles ─────────────────────────────────────────────
    // lhbzr uses ~120 particles, camera at z=500, spread in ~±300 3D space
    const N = 120;
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 600;
      positions[i*3+1] = (Math.random() - 0.5) * 400;
      positions[i*3+2] = (Math.random() - 0.5) * 300;
      velocities[i*3]   = (Math.random() - 0.5) * 0.4;
      velocities[i*3+1] = (Math.random() - 0.5) * 0.4;
      velocities[i*3+2] = (Math.random() - 0.5) * 0.2;
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // ── Connecting lines with distance-based opacity ────────────────────────
    // Max distance to draw a line: 150 units
    const DIST = 150, DIST2 = DIST * DIST, MAX_LINES = 800;

    // We'll use vertex colors to fade lines by distance
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors    = new Float32Array(MAX_LINES * 6); // r,g,b per vertex
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.6 });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Central large wireframe icosahedron ─────────────────────────────────
    // lhbzr has ONE dominant central icosahedron — large, low opacity, indigo
    const icoGeo = new THREE.IcosahedronGeometry(200, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xcc4400,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icosahedron);

    // ── Second smaller one off-center ───────────────────────────────────────
    const ico2Geo = new THREE.IcosahedronGeometry(120, 1);
    const ico2Mat = new THREE.MeshBasicMaterial({
      color: 0x882200,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const icosahedron2 = new THREE.Mesh(ico2Geo, ico2Mat);
    icosahedron2.position.set(300, -120, -200);
    scene.add(icosahedron2);

    // ── Animation loop ──────────────────────────────────────────────────────
    function animate() {
      requestAnimationFrame(animate);

      // Lerp camera toward mouse target (parallax)
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      camera.position.x = mouse.x;
      camera.position.y = -mouse.y;
      camera.lookAt(scene.position);

      // Move particles, bounce off walls
      for (let i = 0; i < N; i++) {
        positions[i*3]   += velocities[i*3];
        positions[i*3+1] += velocities[i*3+1];
        positions[i*3+2] += velocities[i*3+2];
        if (Math.abs(positions[i*3])   > 300) velocities[i*3]   *= -1;
        if (Math.abs(positions[i*3+1]) > 200) velocities[i*3+1] *= -1;
        if (Math.abs(positions[i*3+2]) > 150) velocities[i*3+2] *= -1;
      }
      ptGeo.attributes.position.needsUpdate = true;

      // Build connecting lines with distance-fade color
      let li = 0;
      outer: for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (li >= MAX_LINES) break outer;
          const dx = positions[i*3]   - positions[j*3];
          const dy = positions[i*3+1] - positions[j*3+1];
          const dz = positions[i*3+2] - positions[j*3+2];
          const d2 = dx*dx + dy*dy + dz*dz;
          if (d2 < DIST2) {
            // opacity fades linearly: 1 at dist=0, 0 at dist=DIST
            const alpha = 1 - Math.sqrt(d2) / DIST;
            // line from vertex i to vertex j
            linePositions[li*6]   = positions[i*3];
            linePositions[li*6+1] = positions[i*3+1];
            linePositions[li*6+2] = positions[i*3+2];
            linePositions[li*6+3] = positions[j*3];
            linePositions[li*6+4] = positions[j*3+1];
            linePositions[li*6+5] = positions[j*3+2];
            // vertex color: orange-amber distance fade
            lineColors[li*6]   = alpha;
            lineColors[li*6+1] = 0.45 * alpha;
            lineColors[li*6+2] = 0.05 * alpha;
            lineColors[li*6+3] = alpha;
            lineColors[li*6+4] = 0.45 * alpha;
            lineColors[li*6+5] = 0.05 * alpha;
            li++;
          }
        }
      }
      lineGeo.setDrawRange(0, li * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      // Rotate icosahedra
      icosahedron.rotation.x  += 0.0015;
      icosahedron.rotation.y  += 0.002;
      icosahedron2.rotation.x += 0.002;
      icosahedron2.rotation.y += 0.0025;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (e) {
    console.warn("Three.js scene failed:", e);
    const c = document.getElementById("bg-canvas");
    if (c) c.style.display = "none";
  }
})();

// ─── Scorecard Renderer ───────────────────────────────────────────────────────
function renderScorecard(event) {
  const area = document.getElementById("scorecard-area");
  if (!area) return;
  if (event.sport === "cricket") renderCricketScorecard(event, area);
  else renderFootballScorecard(event, area);
}

function renderCricketScorecard(event, area) {
  const s = event.score;

  if (event.status === "upcoming") {
    area.innerHTML = `
      <div class="sc-upcoming">
        <div class="sc-upcoming-badge">🕐 UPCOMING MATCH</div>
        <div class="sc-upcoming-teams">${event.title}</div>
        <div class="sc-upcoming-detail">📅 ${formatDate(event.startTime)} at ${formatTime(event.startTime)}</div>
        <div class="sc-upcoming-detail">📍 ${event.venue}</div>
        <div class="sc-upcoming-detail">🏆 ${event.tournament}</div>
      </div>`;
    return;
  }

  // Score header
  let headerHTML = "";
  if (s) {
    const rr  = s.runRate ? `<span class="sc-rate-item">RR <strong>${s.runRate}</strong></span>` : "";
    const req = s.reqRate ? `<span class="sc-rate-item req">REQ <strong>${s.reqRate}</strong></span>` : "";
    const liveTag = event.status === "live"
      ? `<span class="sc-live-pill"><span class="pulse">●</span> LIVE${s.currentOver ? " · " + s.currentOver + " ov" : ""}</span>` : "";
    headerHTML = `
      <div class="sc-header cricket">
        <div class="sc-header-top-row">${liveTag}${rr}${req}</div>
        <div class="sc-teams-row">
          <div class="sc-team-block">
            <div class="sc-team-name">${s.team1.name}</div>
            <div class="sc-team-score">${s.team1.runs}<span class="sc-wkts">/${s.team1.wickets}</span></div>
            <div class="sc-team-overs">${s.team1.overs} ov</div>
          </div>
          <div class="sc-vs-block">
            <div class="sc-vs-text">VS</div>
          </div>
          <div class="sc-team-block right">
            <div class="sc-team-name">${s.team2.name}</div>
            <div class="sc-team-score">${s.team2.runs}<span class="sc-wkts">/${s.team2.wickets}</span></div>
            <div class="sc-team-overs">${s.team2.overs} ov</div>
          </div>
        </div>
        <div class="sc-match-status">${s.status}</div>
      </div>`;
  }

  // Result banner (past)
  let resultHTML = "";
  if (event.status === "past" && event.score) {
    resultHTML = `
      <div class="sc-result-banner">${event.score.status}</div>
      ${event.playerOfMatch ? `<div class="sc-potm">⭐ Player of the Match: <strong>${event.playerOfMatch}</strong></div>` : ""}`;
  }

  // Live batting / bowling table
  let liveCardHTML = "";
  if (event.status === "live" && event.batsmen) {
    const sr = b => b.balls > 0 ? (b.runs / b.balls * 100).toFixed(1) : "0.0";
    liveCardHTML = `
      <div class="sc-section">
        <div class="sc-section-label">BATTING</div>
        <table class="sc-table">
          <thead><tr><th>BATTER</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></thead>
          <tbody>
            ${event.batsmen.map((b, i) => `
              <tr class="${i === 0 ? "sc-striker" : ""}">
                <td class="sc-player-name">${b.name}${i === 0 ? " <span class='sc-star'>★</span>" : ""}</td>
                <td class="sc-num bold">${b.runs}</td>
                <td class="sc-num">${b.balls}</td>
                <td class="sc-num">${b.fours}</td>
                <td class="sc-num">${b.sixes}</td>
                <td class="sc-num">${sr(b)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="sc-section">
        <div class="sc-section-label">BOWLING</div>
        <table class="sc-table">
          <thead><tr><th>BOWLER</th><th>O</th><th>R</th><th>W</th><th>ECON</th></tr></thead>
          <tbody>
            <tr>
              <td class="sc-player-name">${event.bowler.name} <span class="sc-star">★</span></td>
              <td class="sc-num">${event.bowler.overs}</td>
              <td class="sc-num">${event.bowler.runs}</td>
              <td class="sc-num bold">${event.bowler.wickets}</td>
              <td class="sc-num">${parseFloat(event.bowler.overs) > 0 ? (event.bowler.runs / parseFloat(event.bowler.overs)).toFixed(2) : "–"}</td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  // Full innings scorecard (past)
  let fullScorecardHTML = "";
  if (event.status === "past" && event.fullScorecard) {
    fullScorecardHTML = event.fullScorecard.innings.map(inn => `
      <div class="sc-innings-block">
        <div class="sc-innings-header">
          <span class="sc-inn-team">${inn.team}</span>
          <span class="sc-inn-score">${inn.runs}/${inn.wickets}</span>
          <span class="sc-inn-overs">(${inn.overs} ov)</span>
        </div>
        <div class="sc-section-label" style="margin-top:.6rem">BATTING</div>
        <table class="sc-table">
          <thead><tr><th>BATTER</th><th>DISMISSAL</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></thead>
          <tbody>
            ${inn.batting.map(b => `
              <tr>
                <td class="sc-player-name">${b.name}</td>
                <td class="sc-dismissal">${b.howOut}</td>
                <td class="sc-num bold">${b.runs}</td>
                <td class="sc-num">${b.balls}</td>
                <td class="sc-num">${b.fours}</td>
                <td class="sc-num">${b.sixes}</td>
                <td class="sc-num">${b.balls > 0 ? (b.runs / b.balls * 100).toFixed(1) : "0.0"}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        <div class="sc-section-label" style="margin-top:.6rem">BOWLING</div>
        <table class="sc-table">
          <thead><tr><th>BOWLER</th><th>O</th><th>R</th><th>W</th><th>ECON</th></tr></thead>
          <tbody>
            ${inn.bowling.map(b => `
              <tr>
                <td class="sc-player-name">${b.name}</td>
                <td class="sc-num">${b.overs}</td>
                <td class="sc-num">${b.runs}</td>
                <td class="sc-num bold">${b.wickets}</td>
                <td class="sc-num">${b.economy}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`).join("");
  }

  // Commentary
  let commentaryHTML = "";
  if (event.commentary && event.commentary.length) {
    commentaryHTML = `
      <div class="sc-section">
        <div class="sc-section-label">COMMENTARY</div>
        <div class="sc-commentary-list">
          ${event.commentary.map(c => `<div class="sc-comment-item">${c}</div>`).join("")}
        </div>
      </div>`;
  }

  // Key moments / Highlights
  let highlightHTML = "";
  if (event.highlights && event.highlights.length) {
    highlightHTML = `
      <div class="sc-section">
        <div class="sc-section-label">KEY MOMENTS</div>
        ${event.highlights.map(h => `
          <div class="sc-moment ${h.type}">
            <span class="sc-moment-time">${h.time}</span>
            <span class="sc-moment-dot"></span>
            <span class="sc-moment-desc">${h.event}</span>
          </div>`).join("")}
      </div>`;
  }

  area.innerHTML = headerHTML + resultHTML + liveCardHTML + fullScorecardHTML + commentaryHTML + highlightHTML;
}

function renderFootballScorecard(event, area) {
  const s = event.score;

  if (event.status === "upcoming") {
    area.innerHTML = `
      <div class="sc-upcoming">
        <div class="sc-upcoming-badge">🕐 UPCOMING MATCH</div>
        <div class="sc-upcoming-teams">${event.title}</div>
        <div class="sc-upcoming-detail">📅 ${formatDate(event.startTime)} at ${formatTime(event.startTime)}</div>
        <div class="sc-upcoming-detail">📍 ${event.venue}</div>
        <div class="sc-upcoming-detail">🏆 ${event.tournament}</div>
      </div>`;
    return;
  }

  // Score header
  let headerHTML = "";
  if (s) {
    const liveTag = event.status === "live"
      ? `<span class="sc-live-pill"><span class="pulse">●</span> LIVE · ${s.minute || 0}'</span>` : `<span class="sc-ft-pill">FT</span>`;
    headerHTML = `
      <div class="sc-header football">
        <div class="sc-header-top-row">${liveTag}</div>
        <div class="sc-fb-scoreline">
          <div class="sc-fb-team">
            <div class="sc-fb-team-name">${s.team1.name}</div>
            <div class="sc-fb-goals">${s.team1.goals}</div>
          </div>
          <div class="sc-fb-dash">–</div>
          <div class="sc-fb-team right">
            <div class="sc-fb-goals">${s.team2.goals}</div>
            <div class="sc-fb-team-name">${s.team2.name}</div>
          </div>
        </div>
        ${s.status ? `<div class="sc-match-status">${s.status}</div>` : ""}
      </div>`;
  }

  // Result banner (past)
  let resultHTML = "";
  if (event.status === "past") {
    resultHTML = `
      <div class="sc-result-banner">${event.result || (s ? s.status : "")}</div>
      ${event.playerOfMatch ? `<div class="sc-potm">⭐ Player of the Match: <strong>${event.playerOfMatch}</strong></div>` : ""}`;

    if (event.penaltyShootout) {
      const ps = event.penaltyShootout;
      const kicks = arr => arr.map(k => `<span class="sc-pen-kick ${k ? "scored" : "missed"}">${k ? "●" : "○"}</span>`).join("");
      resultHTML += `
        <div class="sc-section">
          <div class="sc-section-label">PENALTY SHOOTOUT</div>
          <div class="sc-pen-row">
            <span class="sc-pen-team">${ps.team1.name}</span>
            <span class="sc-pen-kicks">${kicks(ps.team1.scored)}</span>
            <span class="sc-pen-score">${ps.team1.scored.filter(Boolean).length}</span>
          </div>
          <div class="sc-pen-row">
            <span class="sc-pen-team">${ps.team2.name}</span>
            <span class="sc-pen-kicks">${kicks(ps.team2.scored)}</span>
            <span class="sc-pen-score">${ps.team2.scored.filter(Boolean).length}</span>
          </div>
        </div>`;
    }
  }

  // Match events (goals + cards) split by team
  let eventsHTML = "";
  const goals = event.goals || [];
  const cards = event.cards || [];
  if ((goals.length || cards.length) && s) {
    const all = [
      ...goals.map(g => ({ ...g, kind: "goal" })),
      ...cards.map(c => ({ ...c, kind: "card" }))
    ].sort((a, b) => a.minute - b.minute);

    const t1Events = all.filter(e => e.team === s.team1.name);
    const t2Events = all.filter(e => e.team === s.team2.name);
    const evItem = e => {
      const icon = e.kind === "goal" ? (e.type === "penalty" ? "⚽(P)" : "⚽") : (e.type === "yellow" ? "🟨" : "🟥");
      return `<div class="sc-ev-item ${e.kind} ${e.type || ""}">
        <span class="sc-ev-icon">${icon}</span>
        <span class="sc-ev-name">${e.player}</span>
        <span class="sc-ev-min">${e.minute}'</span>
      </div>`;
    };
    const evItemR = e => {
      const icon = e.kind === "goal" ? (e.type === "penalty" ? "⚽(P)" : "⚽") : (e.type === "yellow" ? "🟨" : "🟥");
      return `<div class="sc-ev-item right ${e.kind} ${e.type || ""}">
        <span class="sc-ev-min">${e.minute}'</span>
        <span class="sc-ev-name">${e.player}</span>
        <span class="sc-ev-icon">${icon}</span>
      </div>`;
    };

    eventsHTML = `
      <div class="sc-section">
        <div class="sc-section-label">MATCH EVENTS</div>
        <div class="sc-events-grid">
          <div class="sc-events-team-header">${s.team1.name}</div>
          <div></div>
          <div class="sc-events-team-header right">${s.team2.name}</div>
          ${all.map(e => `
            <div class="sc-ev-left">${e.team === s.team1.name ? evItem(e) : ""}</div>
            <div class="sc-ev-center"></div>
            <div class="sc-ev-right">${e.team === s.team2.name ? evItemR(e) : ""}</div>
          `).join("")}
        </div>
      </div>`;
  }

  // Match stats
  let statsHTML = "";
  if (event.stats && s) {
    const st = event.stats;
    const labels = ["Possession %", "Shots", "Shots on Target", "Corners", "Fouls"];
    const vals   = [st.possession, st.shots, st.shotsOnTarget, st.corners, st.fouls];
    statsHTML = `
      <div class="sc-section">
        <div class="sc-section-label">MATCH STATS</div>
        <div class="sc-stats-names">
          <span>${s.team1.name}</span>
          <span>${s.team2.name}</span>
        </div>
        ${labels.map((lbl, i) => {
          const v1 = vals[i][0], v2 = vals[i][1], total = v1 + v2 || 1;
          const p1 = Math.round(v1 / total * 100);
          return `
            <div class="sc-stat-row">
              <span class="sc-stat-v1">${v1}</span>
              <div class="sc-stat-bar-wrap">
                <div class="sc-stat-bar">
                  <div class="sc-stat-fl" style="width:${p1}%"></div>
                  <div class="sc-stat-fr" style="width:${100 - p1}%"></div>
                </div>
                <div class="sc-stat-label">${lbl}</div>
              </div>
              <span class="sc-stat-v2">${v2}</span>
            </div>`;
        }).join("")}
      </div>`;
  }

  // Commentary
  let commentaryHTML = "";
  if (event.commentary && event.commentary.length) {
    commentaryHTML = `
      <div class="sc-section">
        <div class="sc-section-label">COMMENTARY</div>
        <div class="sc-commentary-list">
          ${event.commentary.map(c => `<div class="sc-comment-item">${c}</div>`).join("")}
        </div>
      </div>`;
  }

  area.innerHTML = headerHTML + resultHTML + eventsHTML + statsHTML + commentaryHTML;
}

// ─── Render Events ────────────────────────────────────────────────────────────
function renderEvents() {
  const grid  = document.getElementById("events-grid");
  const title = document.getElementById("section-title");
  grid.innerHTML = "";

  const search = (document.getElementById("search-input").value || "").toLowerCase();
  let events = getAllEvents(currentSport, currentFilter);
  if (search) events = events.filter(e =>
    e.title.toLowerCase().includes(search) ||
    e.tournament.toLowerCase().includes(search) ||
    e.venue.toLowerCase().includes(search)
  );

  const labels = { live: "LIVE NOW", upcoming: "UPCOMING", past: "REPLAYS" };
  title.textContent = labels[currentFilter] || "EVENTS";

  document.getElementById("live-count").textContent = getAllEvents("all", "live").length;

  if (!events.length) {
    grid.innerHTML = `<p class="no-events">No events found.</p>`;
    return;
  }

  events.forEach((event, idx) => {
    const card   = document.createElement("div");
    const isLive = event.status === "live";
    const isPast = event.status === "past";
    card.className = `event-card ${event.sport} ${event.status}`;
    card.onclick   = () => openEventModal(event);

    const icon = event.sport === "cricket" ? "🏏" : "⚽";
    const sportColor = event.sport === "cricket" ? "255,152,0" : "0,150,255";

    let scoreHTML = "";
    if (isLive && event.score) {
      const s = event.score;
      if (event.sport === "cricket") {
        scoreHTML = `
          <div class="card-score-block">
            <div class="cs-team">${s.team1.name} <span class="cs-runs">${s.team1.runs}/${s.team1.wickets}</span></div>
            <div class="cs-sep">vs</div>
            <div class="cs-team">${s.team2.name} <span class="cs-runs">${s.team2.runs}/${s.team2.wickets}</span></div>
            <div class="cs-status">${s.status}</div>
          </div>`;
      } else {
        scoreHTML = `
          <div class="card-score-block football">
            <span class="cs-team-fb">${s.team1.name}</span>
            <span class="cs-goals">${s.team1.goals} – ${s.team2.goals}</span>
            <span class="cs-team-fb">${s.team2.name}</span>
            <div class="cs-minute">${s.status}</div>
          </div>`;
      }
    } else if (isPast && event.score) {
      scoreHTML = `<div class="card-result">${event.score.status}</div>`;
    } else {
      scoreHTML = `<div class="card-upcoming-time">⏰ ${formatDate(event.startTime)} · ${formatTime(event.startTime)}</div>`;
    }

    card.innerHTML = `
      <div class="card-top-row">
        <div class="card-sport-tag ${event.sport}">${icon} ${event.sport.toUpperCase()}</div>
        ${isLive ? '<div class="card-live-badge"><span class="pulse">●</span> LIVE</div>' : ""}
        ${isPast ? '<div class="card-replay-badge">⏮ REPLAY</div>' : ""}
      </div>
      <div class="card-tournament">${event.tournament}</div>
      <h3 class="card-title">${event.title}</h3>
      <div class="card-venue">📍 ${event.venue}</div>
      ${scoreHTML}
      <div class="card-cta">
        <span>${isPast ? "Watch Replay" : isLive ? "Watch Live" : "Set Reminder"}</span>
        <span class="card-arrow">→</span>
      </div>`;

    // 3D tilt on hover
    card.addEventListener("mousemove", e => {
      const r  = card.getBoundingClientRect();
      const rx = -((e.clientY - r.top  - r.height/2) / r.height) * 15;
      const ry =  ((e.clientX - r.left - r.width /2) / r.width)  * 15;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
      card.style.boxShadow = `${-ry*0.5}px ${-rx*0.5}px 50px rgba(${sportColor},0.3), 0 0 0 1px rgba(${sportColor},0.45)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = ""; card.style.boxShadow = "";
    });

    grid.appendChild(card);
    setTimeout(() => card.classList.add("visible"), idx * 55);
  });
}

function renderFeaturedEvent() {}
window.getFeaturedEvent = () => getAllEvents("all", "live")[0] || getAllEvents("all", "past")[0];

// ─── Modal ────────────────────────────────────────────────────────────────────
function openEventModal(event) {
  if (!event) return;
  activeEvent = event;
  document.getElementById("event-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const sb = document.getElementById("modal-sport-badge");
  sb.textContent = event.sport === "cricket" ? "🏏 Cricket" : "⚽ Football";
  sb.className   = "modal-sport-badge " + event.sport;

  const stb = document.getElementById("modal-status-badge");
  stb.textContent = event.status === "live" ? "🔴 LIVE" : event.status === "upcoming" ? "🕐 UPCOMING" : "📼 REPLAY";
  stb.className   = "modal-status " + event.status;

  document.getElementById("modal-title").textContent = event.title;
  document.getElementById("modal-meta").textContent  = `${event.tournament} · ${event.venue}`;

  renderScorecard(event);
  if (event.status === "live") startLiveUpdates(event);
}

function closeModal() {
  document.getElementById("event-modal").classList.add("hidden");
  document.body.style.overflow = "";
  const sc = document.getElementById("scorecard-area");
  if (sc) sc.innerHTML = "";
  if (commentaryInterval)  clearInterval(commentaryInterval);
  if (scoreUpdateInterval) clearInterval(scoreUpdateInterval);
  activeEvent = null;
}

// ─── Score Panel ──────────────────────────────────────────────────────────────
function renderModalScore(event) {
  const panel = document.getElementById("score-panel");
  if (!event.score) { panel.innerHTML = ""; return; }
  const s = event.score;
  if (event.sport === "cricket") {
    panel.innerHTML = `
      <div class="score-grid cricket">
        <div class="score-team"><div class="team-name">${s.team1.name}</div>
          <div class="team-score">${s.team1.runs}/${s.team1.wickets}</div>
          <div class="team-overs">${s.team1.overs} ov</div></div>
        <div class="score-vs">VS</div>
        <div class="score-team"><div class="team-name">${s.team2.name}</div>
          <div class="team-score">${s.team2.runs}/${s.team2.wickets}</div>
          <div class="team-overs">${s.team2.overs} ov</div></div>
      </div>
      <div class="match-status-bar">${s.status}</div>
      ${event.batsmen ? `<div class="batting-info"><h4>At the Crease</h4>
        <div class="batsmen-row">${event.batsmen.map(b => `
          <div class="batsman-card">
            <span class="batsman-name">${b.name} *</span>
            <span class="batsman-stat">${b.runs} (${b.balls})</span>
            <span class="batsman-extras">${b.fours} fours · ${b.sixes} sixes</span>
          </div>`).join("")}</div>
        ${event.bowler ? `<div class="bowler-info">🎳 ${event.bowler.name} — ${event.bowler.overs} ov · ${event.bowler.runs} runs · ${event.bowler.wickets} wkts</div>` : ""}
      </div>` : ""}`;
  } else {
    panel.innerHTML = `
      <div class="score-grid football">
        <div class="score-team"><div class="team-name">${s.team1.name}</div>
          <div class="team-score football">${s.team1.goals}</div></div>
        <div class="score-vs">${s.status || "VS"}</div>
        <div class="score-team"><div class="team-name">${s.team2.name}</div>
          <div class="team-score football">${s.team2.goals}</div></div>
      </div>
      ${event.goals ? `<div class="goals-list">${event.goals.map(g =>
        `<div class="goal-item">⚽ ${g.minute}' · ${g.player} <span class="goal-team">(${g.team})</span>${g.type==="penalty"?' <span class="pen-badge">P</span>':""}</div>`
      ).join("")}</div>` : ""}
      ${event.cards && event.cards.length ? `<div class="cards-list">${event.cards.map(c =>
        `<span class="card-event ${c.type}">${c.type==="yellow"?"🟨":"🟥"} ${c.minute}' ${c.player}</span>`
      ).join("")}</div>` : ""}`;
  }
}

// ─── Stats Panel ──────────────────────────────────────────────────────────────
function renderModalStats(event) {
  const panel = document.getElementById("stats-panel");
  if (!event.stats) {
    panel.innerHTML = event.playerOfMatch ? `<div class="potm">⭐ Player of the Match: <strong>${event.playerOfMatch}</strong></div>` : "";
    return;
  }
  const s = event.stats;
  const labels = ["Possession","Shots","Shots on Target","Corners","Fouls"];
  panel.innerHTML = `
    <h4 class="stats-title">Match Stats</h4>
    <div class="stats-bars">${labels.map((lbl, i) => {
      const arr = [s.possession,s.shots,s.shotsOnTarget,s.corners,s.fouls];
      const v1 = arr[i][0], v2 = arr[i][1], total = v1+v2||1;
      const p1 = Math.round(v1/total*100);
      return `
        <div class="stat-row">
          <span class="stat-val left">${i===0?v1+"%":v1}</span>
          <div class="stat-label">${lbl}</div>
          <span class="stat-val right">${i===0?v2+"%":v2}</span>
        </div>
        <div class="stat-bar">
          <div class="stat-fill left" style="width:${p1}%"></div>
          <div class="stat-fill right" style="width:${100-p1}%"></div>
        </div>`;
    }).join("")}</div>`;
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function renderTimeline(event) {
  const container = document.getElementById("timeline-events");
  const section   = document.getElementById("timeline-section");
  const evts = event.goals || event.highlights || [];
  if (!evts.length) { section.style.display = "none"; return; }
  section.style.display = "block";
  container.innerHTML = evts.map(e => `
    <div class="timeline-item ${e.type||""}">
      <span class="tl-time">${e.minute?e.minute+"'":e.time||""}</span>
      <span class="tl-dot"></span>
      <span class="tl-desc">${e.player||e.event}</span>
      ${e.team?`<span class="tl-team">${e.team}</span>`:""}
    </div>`).join("");
}

// ─── Commentary ───────────────────────────────────────────────────────────────
function renderCommentary(event) {
  if (!event.commentary) return;
  const box = document.getElementById("commentary-box");
  let idx = 0;
  function next() {
    box.textContent = event.commentary[idx % event.commentary.length];
    box.classList.remove("fade-in"); void box.offsetWidth; box.classList.add("fade-in");
    idx++;
  }
  next();
  if (commentaryInterval) clearInterval(commentaryInterval);
  commentaryInterval = setInterval(next, 4000);
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function renderTicker() {
  const track = document.getElementById("ticker-track");
  const lives = getAllEvents("all", "live");
  if (!lives.length) { track.textContent = "No live events right now."; return; }
  const text = lives.map(e => {
    if (e.sport==="cricket" && e.score)
      return `🏏 ${e.score.team1.name} ${e.score.team1.runs}/${e.score.team1.wickets} vs ${e.score.team2.name} ${e.score.team2.runs}/${e.score.team2.wickets} · ${e.title}`;
    if (e.sport==="football" && e.score)
      return `⚽ ${e.score.team1.name} ${e.score.team1.goals}–${e.score.team2.goals} ${e.score.team2.name} · ${e.score.status}`;
    return e.title;
  }).join("    ◆    ");
  track.innerHTML = `<span>${text}&nbsp;&nbsp;&nbsp;&nbsp;${text}</span>`;
}

// ─── Live Updates ─────────────────────────────────────────────────────────────
function startLiveUpdates(event) {
  if (scoreUpdateInterval) clearInterval(scoreUpdateInterval);
  scoreUpdateInterval = setInterval(() => {
    if (event.sport === "cricket" && event.score) {
      if (Math.random() < 0.3) event.score.team1.runs += Math.floor(Math.random() * 6) + 1;
      renderScorecard(event);
    } else if (event.sport === "football" && event.score && event.score.minute < 90) {
      event.score.minute++;
      event.score.status = `${event.score.minute}' · ${event.score.minute <= 45 ? "1st Half" : "2nd Half"}`;
      renderScorecard(event);
    }
  }, 8000);
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
document.querySelectorAll(".nav-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const sport = btn.dataset.sport;
    const evSection  = document.getElementById("events-section");
    const tblSection = document.getElementById("table-section");
    if (sport === "table") {
      evSection.classList.add("hidden");
      tblSection.classList.remove("hidden");
      renderIPLTable();
    } else {
      evSection.classList.remove("hidden");
      tblSection.classList.add("hidden");
      currentSport = sport;
      renderEvents();
    }
  });
});
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderEvents();
  });
});
document.getElementById("search-input").addEventListener("input", renderEvents);

// ─── IPL Points Table ─────────────────────────────────────────────────────────
function renderIPLTable() {
  const wrap = document.getElementById("ipl-table-wrap");
  if (!wrap) return;
  const t = IPL_TABLE;
  const formDot = r => `<span class="form-dot ${r === "W" ? "w" : "l"}">${r}</span>`;

  wrap.innerHTML = `
    <div class="ipl-table-card">
      <div class="ipl-table-meta">
        <span class="ipl-season">${t.season}</span>
        <span class="ipl-updated">Updated: ${t.updatedAt}</span>
      </div>
      <div class="ipl-table-scroll">
        <table class="ipl-table">
          <thead>
            <tr>
              <th>#</th>
              <th class="th-team">TEAM</th>
              <th>M</th>
              <th>W</th>
              <th>L</th>
              <th>NR</th>
              <th class="th-pts">PTS</th>
              <th class="th-nrr">NRR</th>
              <th class="th-form">FORM</th>
            </tr>
          </thead>
          <tbody>
            ${t.teams.map((row, i) => `
              <tr class="${i < 4 ? "playoff-zone" : ""}${i === 0 ? " top-team" : ""}">
                <td class="td-pos">${row.pos}</td>
                <td class="td-team">
                  <span class="team-short ${row.short.toLowerCase()}">${row.short}</span>
                  <span class="team-fullname">${row.team}</span>
                </td>
                <td>${row.m}</td>
                <td class="td-w">${row.w}</td>
                <td class="td-l">${row.l}</td>
                <td>${row.nr}</td>
                <td class="td-pts">${row.pts}</td>
                <td class="td-nrr ${parseFloat(row.nrr) >= 0 ? "pos" : "neg"}">${row.nrr}</td>
                <td class="td-form">${row.form.map(formDot).join("")}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="ipl-table-legend">
        <span class="legend-dot playoff"></span> Top 4 qualify for playoffs
      </div>
    </div>`;
}

// ─── Particle Morph Loading Screen ──────────────────────────────────────────
function runParticleLoader(onDone) {
  const ls     = document.getElementById("loading-screen");
  const canvas = document.getElementById("loader-canvas");
  if (!canvas) { onDone(); return; }
  const ctx = canvas.getContext("2d");

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const COLORS = ["#ff6b00", "#ffaa00", "#ff3300", "#ffcc44", "#ff8800", "#ffffff"];

  // ── Sample pixel positions from text rendered on offscreen canvas
  function sampleText(text, step, maxPts) {
    const off      = document.createElement("canvas");
    const fontSize = Math.min(W / text.length * 1.3, H * 0.2);
    off.width  = W;
    off.height = Math.ceil(fontSize * 2.4);
    const c = off.getContext("2d");
    c.fillStyle    = "#fff";
    c.font         = `900 ${fontSize}px 'Orbitron', sans-serif`;
    c.textAlign    = "center";
    c.textBaseline = "middle";
    c.fillText(text, W / 2, off.height / 2);
    const data = c.getImageData(0, 0, off.width, off.height).data;
    const pts  = [];
    const yOff = (H - off.height) / 2;
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        if (data[(y * off.width + x) * 4 + 3] > 128)
          pts.push({ x, y: y + yOff });
      }
    }
    if (pts.length > maxPts) {
      const skip = pts.length / maxPts;
      const out  = [];
      for (let i = 0; i < maxPts; i++) out.push(pts[Math.floor(i * skip)]);
      return out;
    }
    return pts;
  }

  const targets = sampleText("GAMEFLUX", 5, 1600);
  const N = targets.length;

  // ── Build particles starting at random scattered positions
  const particles = targets.map(t => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    tx:    t.x,
    ty:    t.y,
    vx:    (Math.random() - 0.5) * 5,
    vy:    (Math.random() - 0.5) * 5,
    size:  Math.random() * 0.7 + 0.3,   // smaller: 0.3–1.0px
    delay: Math.random() * 0.55,
    hue:   COLORS[Math.floor(Math.random() * COLORS.length)]
  }));

  // ── Ambient rising sparks
  const SPARKS = 200;
  const sparks = Array.from({ length: SPARKS }, () => ({
    x:    Math.random() * W,
    y:    H + Math.random() * 50,
    vx:   (Math.random() - 0.5) * 0.5,
    vy:   -(Math.random() * 0.8 + 0.2),
    size: Math.random() * 0.6 + 0.2,
    hue:  COLORS[Math.floor(Math.random() * COLORS.length)],
    life: Math.random() * 0.8 + 0.2
  }));

  let phase = 0, tick = 0, raf;
  const SCATTER = 35, MORPH = 70, HOLD = 60, BURST = 40;
  let burstVel;

  function draw() {
    raf = requestAnimationFrame(draw);

    // Motion trail
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, W, H);

    tick++;
    if      (tick <= SCATTER)                phase = 0;
    else if (tick <= SCATTER + MORPH)        phase = 1;
    else if (tick <= SCATTER + MORPH + HOLD) phase = 2;
    else                                     phase = 3;

    if (phase === 3 && !burstVel) {
      burstVel = particles.map(p => ({
        vx: (p.tx - W / 2) * 0.08 + (Math.random() - 0.5) * 8,
        vy: (p.ty - H / 2) * 0.08 + (Math.random() - 0.5) * 8
      }));
    }

    const morphT = Math.max(0, Math.min(1, (tick - SCATTER) / MORPH));

    // Sparks
    for (const s of sparks) {
      s.x += s.vx; s.y += s.vy; s.life -= 0.005;
      if (s.life <= 0 || s.y < -10) {
        s.x = Math.random() * W; s.y = H + 5;
        s.life = 0.6 + Math.random() * 0.4;
        s.vy = -(Math.random() * 0.8 + 0.2);
        s.vx = (Math.random() - 0.5) * 0.5;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.hue; ctx.globalAlpha = s.life * 0.5;
      ctx.fill();
    }

    // Morphing particles → GAMEFLUX text
    for (let i = 0; i < N; i++) {
      const p      = particles[i];
      const localT = Math.max(0, Math.min(1, (morphT - p.delay) / (1 - p.delay)));
      const le     = localT < 0.5
        ? 4 * localT * localT * localT
        : 1 - Math.pow(-2 * localT + 2, 3) / 2;

      if (phase === 0) {
        p.x += p.vx * 0.4; p.y += p.vy * 0.4;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      } else if (phase <= 2) {
        p.x += (p.tx - p.x) * 0.065 * (le + 0.08);
        p.y += (p.ty - p.y) * 0.065 * (le + 0.08);
      } else {
        const bv = burstVel[i];
        p.x += bv.vx; p.y += bv.vy;
        bv.vx *= 1.07; bv.vy *= 1.07;
      }

      const dist = Math.hypot(p.x - p.tx, p.y - p.ty);
      const glow = phase >= 1 ? Math.max(0, 1 - dist / 30) : 0;
      const r    = p.size + glow * 0.7;

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle   = p.hue;
      ctx.globalAlpha = 0.65 + glow * 0.35;
      ctx.fill();

      if (glow > 0.3) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, p.hue + "44");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.globalAlpha = glow * 0.25;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    // Subtitle fade-in during hold
    if (phase >= 2) {
      const a = Math.min(1, (tick - SCATTER - MORPH) / 20);
      ctx.globalAlpha  = a * 0.85;
      ctx.fillStyle    = "#ffaa00";
      ctx.font         = `400 ${Math.max(9, W * 0.009)}px 'Orbitron', sans-serif`;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("LIVE SPORTS  ·  CRICKET  ·  FOOTBALL", W / 2, H * 0.61);
      ctx.globalAlpha  = 1;
    }

    // Progress bar
    const progress = Math.min(1, tick / (SCATTER + MORPH + HOLD * 0.9));
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(W * 0.25, H * 0.88, W * 0.5, 1);
    const grad = ctx.createLinearGradient(W * 0.25, 0, W * 0.75, 0);
    grad.addColorStop(0, "#ff3300");
    grad.addColorStop(0.5, "#ffaa00");
    grad.addColorStop(1, "#ff6b00");
    ctx.fillStyle = grad; ctx.globalAlpha = 0.9;
    ctx.fillRect(W * 0.25, H * 0.88, W * 0.5 * progress, 1);
    ctx.globalAlpha = 1;

    if (phase === 3 && tick > SCATTER + MORPH + HOLD + BURST) {
      cancelAnimationFrame(raf);
      ls.style.transition = "opacity 0.4s";
      ls.style.opacity    = "0";
      setTimeout(() => { ls.style.display = "none"; onDone(); }, 420);
    }
  }
  draw();
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
window.addEventListener("load", () => {
  renderEvents();
  renderTicker();
  setInterval(renderTicker, 30000);
  runParticleLoader(() => { /* loading screen dismissed */ });
});

window.openEventModal = openEventModal;
window.closeModal     = closeModal;
