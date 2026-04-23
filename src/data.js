// =============================================
//  GameFlux — Sports Events Data
//  (showing last 7 days only)
// =============================================

// ── IPL 2026 Points Table ─────────────────────────────────────────────────────
const IPL_TABLE = {
  season: "IPL 2026",
  updatedAt: "23 Apr 2026, 7:00 PM IST",
  teams: [
    { pos: 1,  team: "Mumbai Indians",        short: "MI",  m: 10, w: 7, l: 3, nr: 0, pts: 14, nrr: "+0.812", form: ["W","W","L","W","W"] },
    { pos: 2,  team: "Chennai Super Kings",   short: "CSK", m: 10, w: 6, l: 4, nr: 0, pts: 12, nrr: "+0.534", form: ["W","L","W","W","L"] },
    { pos: 3,  team: "Royal Challengers",     short: "RCB", m: 10, w: 6, l: 4, nr: 0, pts: 12, nrr: "+0.421", form: ["W","W","L","W","L"] },
    { pos: 4,  team: "Kolkata Knight Riders", short: "KKR", m: 10, w: 6, l: 4, nr: 0, pts: 12, nrr: "+0.187", form: ["L","W","W","L","W"] },
    { pos: 5,  team: "Rajasthan Royals",      short: "RR",  m: 10, w: 5, l: 5, nr: 0, pts: 10, nrr: "+0.210", form: ["L","W","L","W","L"] },
    { pos: 6,  team: "Sunrisers Hyderabad",   short: "SRH", m: 10, w: 5, l: 5, nr: 0, pts: 10, nrr: "+0.044", form: ["W","L","L","W","W"] },
    { pos: 7,  team: "Delhi Capitals",        short: "DC",  m: 10, w: 4, l: 6, nr: 0, pts: 8,  nrr: "-0.185", form: ["L","L","W","L","W"] },
    { pos: 8,  team: "Punjab Kings",          short: "PBKS",m: 10, w: 4, l: 6, nr: 0, pts: 8,  nrr: "-0.302", form: ["W","L","L","L","W"] },
    { pos: 9,  team: "Gujarat Titans",        short: "GT",  m: 10, w: 3, l: 7, nr: 0, pts: 6,  nrr: "-0.445", form: ["L","L","W","L","L"] },
    { pos: 10, team: "Lucknow Super Giants",  short: "LSG", m: 10, w: 2, l: 8, nr: 0, pts: 4,  nrr: "-1.276", form: ["L","L","L","L","W"] }
  ]
};

const SPORTS_DATA = {
  cricket: {
    live: [
      {
        id: "cr_live_ipl_01",
        sport: "cricket",
        status: "live",
        title: "Mumbai Indians vs Chennai Super Kings",
        tournament: "IPL 2026 · Match 42",
        venue: "Wankhede Stadium, Mumbai",
        startTime: new Date(Date.now() - 1.5 * 3600000).toISOString(),
        score: {
          team1: { name: "MI", runs: 148, wickets: 3, overs: "18.2" },
          team2: { name: "CSK", runs: 189, wickets: 5, overs: "20.0" },
          status: "MI batting · Chasing 190",
          currentOver: "18.2",
          reqRate: "12.8",
          runRate: "8.1"
        },
        batsmen: [
          { name: "S. Iyer", runs: 68, balls: 41, fours: 6, sixes: 4 },
          { name: "T. Stubbs", runs: 31, balls: 19, fours: 2, sixes: 2 }
        ],
        bowler: { name: "M. Pathirana", overs: "3.2", runs: 22, wickets: 2 },
        commentary: [
          "SIX! Iyer goes downtown off Pathirana!",
          "FOUR! Stubbs slaps through covers brilliantly",
          "OUT! Rohit caught at long-on, big wicket for CSK!",
          "WIDE! Too short and down the leg side.",
          "Two runs. Iyer and Stubbs keeping MI in the hunt!"
        ],
        highlights: [
          { time: "18.2", event: "SIX by Iyer", type: "six" },
          { time: "17.4", event: "FOUR by Stubbs", type: "four" },
          { time: "16.1", event: "WICKET - Rohit caught", type: "wicket" }
        ],
        thumbnail: "cricket",
        featured: true
      },
      {
        id: "cr_live_ipl_02",
        sport: "cricket",
        status: "live",
        title: "Royal Challengers vs Sunrisers Hyderabad",
        tournament: "IPL 2026 · Match 43",
        venue: "M. Chinnaswamy Stadium, Bengaluru",
        startTime: new Date(Date.now() - 2 * 3600000).toISOString(),
        score: {
          team1: { name: "RCB", runs: 205, wickets: 6, overs: "20.0" },
          team2: { name: "SRH", runs: 178, wickets: 8, overs: "19.1" },
          status: "SRH batting · 2nd Innings",
          currentOver: "19.1",
          reqRate: "16.9",
          runRate: "9.3"
        },
        batsmen: [
          { name: "H. Klaasen", runs: 71, balls: 38, fours: 7, sixes: 5 },
          { name: "Pat Cummins", runs: 14, balls: 8, fours: 1, sixes: 1 }
        ],
        bowler: { name: "M. Siraj", overs: "3.1", runs: 28, wickets: 2 },
        commentary: [
          "SIX! Klaasen launches Siraj into the stands!",
          "FOUR! Cut shot by Klaasen, finds the gap perfectly",
          "OUT! Abhishek Sharma caught at deep square leg",
          "Siraj bowls a tight line, dot ball.",
        ],
        highlights: [
          { time: "19.1", event: "SIX by Klaasen", type: "six" },
          { time: "18.4", event: "FOUR by Klaasen", type: "four" },
          { time: "17.3", event: "WICKET - Abhishek caught", type: "wicket" }
        ],
        thumbnail: "cricket",
        featured: false
      },
      {
        id: "cr_live_001",
        sport: "cricket",
        status: "live",
        title: "KKR vs Gujarat Titans",
        tournament: "IPL 2026 · Match 44",
        venue: "Eden Gardens, Kolkata",
        startTime: new Date(Date.now() - 2 * 3600000).toISOString(),
        score: {
          team1: { name: "KKR", runs: 142, wickets: 4, overs: "14.2" },
          team2: { name: "Gujarat Titans", runs: 176, wickets: 7, overs: "20.0" },
          status: "KKR batting · 2nd Innings",
          currentOver: "14.2",
          runRate: "9.9",
          reqRate: "12.8"
        },
        batsmen: [
          { name: "A. Russell", runs: 44, balls: 21, fours: 3, sixes: 4 },
          { name: "Rinku Singh", runs: 28, balls: 18, fours: 2, sixes: 2 }
        ],
        bowler: { name: "M. Prasidh Krishna", overs: "2.2", runs: 18, wickets: 1 },
        commentary: [
          "SIX! Russell deposits Prasidh into the second tier!",
          "FOUR! Rinku Singh whips through midwicket!",
          "OUT! Q. de Kock caught at long-off by Gill!",
          "Dot ball. Russell mistimes a slog, lands safe.",
          "KKR need 35 off 34 balls — it's on!"
        ],
        highlights: [
          { time: "14.2", event: "SIX by A. Russell", type: "six" },
          { time: "13.1", event: "FOUR by Rinku Singh", type: "four" },
          { time: "11.4", event: "WICKET - Q. de Kock caught", type: "wicket" }
        ],
        thumbnail: "cricket",
        featured: false
      }
    ],
    upcoming: [
      {
        id: "cr_up_ipl_01",
        sport: "cricket",
        status: "upcoming",
        title: "Delhi Capitals vs Punjab Kings",
        tournament: "IPL 2026 · Match 44",
        venue: "Arun Jaitley Stadium, Delhi",
        startTime: new Date(Date.now() + 4 * 3600000).toISOString(),
        thumbnail: "cricket"
      },
      {
        id: "cr_up_ipl_02",
        sport: "cricket",
        status: "upcoming",
        title: "Kolkata Knight Riders vs Rajasthan Royals",
        tournament: "IPL 2026 · Match 45",
        venue: "Eden Gardens, Kolkata",
        startTime: new Date(Date.now() + 28 * 3600000).toISOString(),
        thumbnail: "cricket"
      },
      {
        id: "cr_up_ipl_03",
        sport: "cricket",
        status: "upcoming",
        title: "Gujarat Titans vs Lucknow Super Giants",
        tournament: "IPL 2026 · Match 46",
        venue: "Narendra Modi Stadium, Ahmedabad",
        startTime: new Date(Date.now() + 52 * 3600000).toISOString(),
        thumbnail: "cricket"
      },
      {
        id: "cr_up_001",
        sport: "cricket",
        status: "upcoming",
        title: "Sunrisers Hyderabad vs Lucknow Super Giants",
        tournament: "IPL 2026 · Match 47",
        venue: "Rajiv Gandhi Intl. Cricket Stadium, Hyderabad",
        startTime: new Date(Date.now() + 6 * 3600000).toISOString(),
        thumbnail: "cricket"
      }
    ],
    past: [
      {
        id: "cr_past_ipl_01",
        sport: "cricket",
        status: "past",
        title: "Royal Challengers vs Rajasthan Royals",
        tournament: "IPL 2026 · Match 41",
        venue: "M. Chinnaswamy Stadium, Bengaluru",
        startTime: new Date(Date.now() - 1 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "RCB", runs: 198, wickets: 5, overs: "20.0" },
          team2: { name: "RR", runs: 176, wickets: 8, overs: "20.0" },
          status: "RCB won by 22 runs"
        },
        result: "RCB won",
        playerOfMatch: "V. Kohli (87 off 54)",
        fullScorecard: {
          innings: [
            {
              team: "RCB", runs: 198, wickets: 5, overs: "20.0",
              batting: [
                { name: "V. Kohli", runs: 87, balls: 54, fours: 8, sixes: 4, howOut: "c Samson b Chahal" },
                { name: "P. Salt", runs: 44, balls: 28, fours: 5, sixes: 2, howOut: "c Jaiswal b Sandeep" },
                { name: "R. Patidar", runs: 38, balls: 24, fours: 3, sixes: 2, howOut: "b Avesh" },
                { name: "G. Maxwell", runs: 22, balls: 12, fours: 2, sixes: 1, howOut: "not out" },
                { name: "L. Livingstone", runs: 7, balls: 5, fours: 1, sixes: 0, howOut: "run out" }
              ],
              bowling: [
                { name: "Sandeep Sharma", overs: "4.0", runs: 38, wickets: 2, economy: "9.5" },
                { name: "Y. Chahal", overs: "4.0", runs: 36, wickets: 1, economy: "9.0" },
                { name: "Avesh Khan", overs: "4.0", runs: 44, wickets: 1, economy: "11.0" },
                { name: "R. Parag", overs: "4.0", runs: 42, wickets: 1, economy: "10.5" }
              ]
            },
            {
              team: "RR", runs: 176, wickets: 8, overs: "20.0",
              batting: [
                { name: "Y. Jaiswal", runs: 63, balls: 42, fours: 7, sixes: 3, howOut: "c Maxwell b Siraj" },
                { name: "S. Samson", runs: 48, balls: 32, fours: 4, sixes: 2, howOut: "c Salt b Hazlewood" },
                { name: "R. Parag", runs: 28, balls: 18, fours: 2, sixes: 1, howOut: "b Hasaranga" },
                { name: "D. Jurel", runs: 22, balls: 14, fours: 1, sixes: 2, howOut: "run out" },
                { name: "S. Hetmyer", runs: 12, balls: 8, fours: 1, sixes: 0, howOut: "b Siraj" }
              ],
              bowling: [
                { name: "M. Siraj", overs: "4.0", runs: 34, wickets: 3, economy: "8.5" },
                { name: "J. Hazlewood", overs: "4.0", runs: 28, wickets: 2, economy: "7.0" },
                { name: "W. Hasaranga", overs: "4.0", runs: 32, wickets: 2, economy: "8.0" },
                { name: "Y. Dayal", overs: "4.0", runs: 44, wickets: 1, economy: "11.0" }
              ]
            }
          ]
        },
        thumbnail: "cricket"
      },
      {
        id: "cr_past_ipl_02",
        sport: "cricket",
        status: "past",
        title: "Mumbai Indians vs Kolkata Knight Riders",
        tournament: "IPL 2026 · Match 40",
        venue: "Wankhede Stadium, Mumbai",
        startTime: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "MI", runs: 214, wickets: 4, overs: "20.0" },
          team2: { name: "KKR", runs: 198, wickets: 7, overs: "20.0" },
          status: "MI won by 16 runs"
        },
        result: "MI won",
        playerOfMatch: "Suryakumar Yadav (101* off 55)",
        fullScorecard: {
          innings: [
            {
              team: "MI", runs: 214, wickets: 4, overs: "20.0",
              batting: [
                { name: "R. Sharma", runs: 42, balls: 28, fours: 4, sixes: 2, howOut: "c Russell b Narine" },
                { name: "Suryakumar Yadav", runs: 101, balls: 55, fours: 9, sixes: 7, howOut: "not out" },
                { name: "T. Stubbs", runs: 38, balls: 22, fours: 3, sixes: 2, howOut: "c Rana b Cummins" },
                { name: "H. Pandya", runs: 21, balls: 11, fours: 2, sixes: 1, howOut: "not out" }
              ],
              bowling: [
                { name: "S. Narine", overs: "4.0", runs: 38, wickets: 1, economy: "9.5" },
                { name: "A. Nortje", overs: "4.0", runs: 44, wickets: 2, economy: "11.0" },
                { name: "A. Russell", overs: "4.0", runs: 52, wickets: 1, economy: "13.0" },
                { name: "H. Rana", overs: "4.0", runs: 48, wickets: 0, economy: "12.0" }
              ]
            },
            {
              team: "KKR", runs: 198, wickets: 7, overs: "20.0",
              batting: [
                { name: "Q. de Kock", runs: 55, balls: 34, fours: 6, sixes: 3, howOut: "c Pandya b Bumrah" },
                { name: "S. Narine", runs: 44, balls: 22, fours: 4, sixes: 3, howOut: "b Bumrah" },
                { name: "A. Russell", runs: 41, balls: 21, fours: 2, sixes: 4, howOut: "c Suryakumar b Boult" },
                { name: "Rinku Singh", runs: 35, balls: 20, fours: 2, sixes: 2, howOut: "b Pandya" },
                { name: "R. Singh", runs: 14, balls: 9, fours: 1, sixes: 1, howOut: "not out" }
              ],
              bowling: [
                { name: "J. Bumrah", overs: "4.0", runs: 24, wickets: 3, economy: "6.0" },
                { name: "G. Coetzee", overs: "4.0", runs: 36, wickets: 2, economy: "9.0" },
                { name: "H. Pandya", overs: "4.0", runs: 44, wickets: 1, economy: "11.0" },
                { name: "V. Chakaravarthy", overs: "4.0", runs: 52, wickets: 1, economy: "13.0" }
              ]
            }
          ]
        },
        thumbnail: "cricket"
      },
      {
        id: "cr_past_ipl_03",
        sport: "cricket",
        status: "past",
        title: "Sunrisers Hyderabad vs Gujarat Titans",
        tournament: "IPL 2026 · Match 39",
        venue: "Rajiv Gandhi Stadium, Hyderabad",
        startTime: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "SRH", runs: 231, wickets: 3, overs: "20.0" },
          team2: { name: "GT", runs: 189, wickets: 10, overs: "19.2" },
          status: "SRH won by 42 runs"
        },
        result: "SRH won",
        playerOfMatch: "T. Head (112 off 51)",
        fullScorecard: {
          innings: [
            {
              team: "SRH", runs: 231, wickets: 3, overs: "20.0",
              batting: [
                { name: "T. Head", runs: 112, balls: 51, fours: 10, sixes: 9, howOut: "c Shubman b Noor" },
                { name: "A. Sharma", runs: 58, balls: 38, fours: 5, sixes: 3, howOut: "not out" },
                { name: "H. Klaasen", runs: 38, balls: 21, fours: 3, sixes: 2, howOut: "not out" }
              ],
              bowling: [
                { name: "Mohammed Shami", overs: "4.0", runs: 42, wickets: 1, economy: "10.5" },
                { name: "Noor Ahmad", overs: "4.0", runs: 48, wickets: 1, economy: "12.0" },
                { name: "R. Khan", overs: "4.0", runs: 52, wickets: 1, economy: "13.0" },
                { name: "S. Gill", overs: "2.0", runs: 28, wickets: 0, economy: "14.0" }
              ]
            },
            {
              team: "GT", runs: 189, wickets: 10, overs: "19.2",
              batting: [
                { name: "Shubman Gill", runs: 67, balls: 44, fours: 7, sixes: 2, howOut: "c Klaasen b Cummins" },
                { name: "D. Miller", runs: 42, balls: 28, fours: 3, sixes: 3, howOut: "b Bhuvneshwar" },
                { name: "W. Saha", runs: 31, balls: 22, fours: 3, sixes: 1, howOut: "c Head b Natarajan" },
                { name: "R. Tewatia", runs: 22, balls: 11, fours: 1, sixes: 2, howOut: "b Cummins" }
              ],
              bowling: [
                { name: "Pat Cummins", overs: "4.0", runs: 32, wickets: 3, economy: "8.0" },
                { name: "B. Kumar", overs: "4.0", runs: 38, wickets: 2, economy: "9.5" },
                { name: "T. Natarajan", overs: "4.0", runs: 44, wickets: 2, economy: "11.0" },
                { name: "M. Markande", overs: "4.0", runs: 42, wickets: 2, economy: "10.5" }
              ]
            }
          ]
        },
        thumbnail: "cricket"
      },
      {
        id: "cr_past_ipl_04",
        sport: "cricket",
        status: "past",
        title: "Chennai Super Kings vs Punjab Kings",
        tournament: "IPL 2026 · Match 38",
        venue: "MA Chidambaram Stadium, Chennai",
        startTime: new Date(Date.now() - 4 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "CSK", runs: 176, wickets: 6, overs: "20.0" },
          team2: { name: "PBKS", runs: 162, wickets: 9, overs: "20.0" },
          status: "CSK won by 14 runs"
        },
        result: "CSK won",
        playerOfMatch: "R. Gaikwad (72 off 48)",
        fullScorecard: {
          innings: [
            {
              team: "CSK", runs: 176, wickets: 6, overs: "20.0",
              batting: [
                { name: "R. Gaikwad", runs: 72, balls: 48, fours: 7, sixes: 3, howOut: "c Prabhsimran b Arshdeep" },
                { name: "R. Ravindra", runs: 38, balls: 30, fours: 3, sixes: 1, howOut: "b Harshal" },
                { name: "S. Dube", runs: 28, balls: 18, fours: 2, sixes: 1, howOut: "c Bairstow b Arshdeep" },
                { name: "M.S. Dhoni", runs: 22, balls: 11, fours: 1, sixes: 2, howOut: "not out" },
                { name: "R. Jadeja", runs: 16, balls: 10, fours: 1, sixes: 1, howOut: "run out" }
              ],
              bowling: [
                { name: "Arshdeep Singh", overs: "4.0", runs: 26, wickets: 3, economy: "6.5" },
                { name: "Harshal Patel", overs: "4.0", runs: 36, wickets: 1, economy: "9.0" },
                { name: "M. Jansen", overs: "4.0", runs: 38, wickets: 1, economy: "9.5" },
                { name: "Y. Chahal", overs: "4.0", runs: 34, wickets: 1, economy: "8.5" }
              ]
            },
            {
              team: "PBKS", runs: 162, wickets: 9, overs: "20.0",
              batting: [
                { name: "Prabhsimran", runs: 48, balls: 32, fours: 5, sixes: 2, howOut: "c Dhoni b Chahar" },
                { name: "J. Bairstow", runs: 44, balls: 28, fours: 4, sixes: 2, howOut: "c Gaikwad b Pathirana" },
                { name: "Shashank Singh", runs: 28, balls: 18, fours: 2, sixes: 1, howOut: "run out" },
                { name: "L. Livingstone", runs: 22, balls: 12, fours: 1, sixes: 2, howOut: "b Jadeja" },
                { name: "Nehal Wadhera", runs: 14, balls: 9, fours: 1, sixes: 0, howOut: "b Chahar" }
              ],
              bowling: [
                { name: "D. Chahar", overs: "4.0", runs: 28, wickets: 2, economy: "7.0" },
                { name: "M. Pathirana", overs: "4.0", runs: 34, wickets: 2, economy: "8.5" },
                { name: "R. Jadeja", overs: "4.0", runs: 38, wickets: 2, economy: "9.5" },
                { name: "M. Theekshana", overs: "4.0", runs: 32, wickets: 1, economy: "8.0" }
              ]
            }
          ]
        },
        thumbnail: "cricket"
      },
      {
        id: "cr_past_001",
        sport: "cricket",
        status: "past",
        title: "India vs England",
        tournament: "England Tour of India 2026 · 3rd ODI",
        venue: "Narendra Modi Stadium, Ahmedabad",
        startTime: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "India", runs: 301, wickets: 7, overs: "50.0" },
          team2: { name: "England", runs: 256, wickets: 10, overs: "44.2" },
          status: "India won by 45 runs"
        },
        result: "India won",
        playerOfMatch: "J. Bumrah (5/38)",
        fullScorecard: {
          innings: [
            {
              team: "India", runs: 301, wickets: 7, overs: "50.0",
              batting: [
                { name: "R. Sharma", runs: 78, balls: 92, fours: 7, sixes: 2, howOut: "c Root b Atkinson" },
                { name: "S. Gill", runs: 54, balls: 68, fours: 5, sixes: 1, howOut: "lbw b Stokes" },
                { name: "V. Kohli", runs: 91, balls: 104, fours: 9, sixes: 1, howOut: "c Brook b Woakes" },
                { name: "S. Iyer", runs: 42, balls: 38, fours: 3, sixes: 2, howOut: "run out" },
                { name: "H. Pandya", runs: 26, balls: 18, fours: 2, sixes: 1, howOut: "not out" }
              ],
              bowling: [
                { name: "G. Atkinson", overs: "10.0", runs: 52, wickets: 2, economy: "5.2" },
                { name: "C. Woakes", overs: "10.0", runs: 58, wickets: 2, economy: "5.8" },
                { name: "B. Stokes", overs: "10.0", runs: 64, wickets: 1, economy: "6.4" },
                { name: "A. Rashid", overs: "10.0", runs: 61, wickets: 1, economy: "6.1" }
              ]
            },
            {
              team: "England", runs: 256, wickets: 10, overs: "44.2",
              batting: [
                { name: "Z. Crawley", runs: 44, balls: 58, fours: 5, sixes: 0, howOut: "c Kohli b Bumrah" },
                { name: "J. Root", runs: 88, balls: 98, fours: 8, sixes: 1, howOut: "c Pant b Bumrah" },
                { name: "H. Brook", runs: 52, balls: 62, fours: 5, sixes: 1, howOut: "b Siraj" },
                { name: "B. Stokes", runs: 38, balls: 44, fours: 3, sixes: 1, howOut: "b Bumrah" },
                { name: "J. Bairstow", runs: 22, balls: 28, fours: 2, sixes: 0, howOut: "c Gill b Jadeja" }
              ],
              bowling: [
                { name: "J. Bumrah", overs: "10.0", runs: 38, wickets: 5, economy: "3.8" },
                { name: "M. Siraj", overs: "9.2", runs: 52, wickets: 2, economy: "5.6" },
                { name: "R. Jadeja", overs: "10.0", runs: 44, wickets: 2, economy: "4.4" },
                { name: "K. Yadav", overs: "9.0", runs: 66, wickets: 1, economy: "7.3" }
              ]
            }
          ]
        },
        thumbnail: "cricket"
      }
    ]
  },

  football: {
    live: [
      {
        id: "fb_live_001",
        sport: "football",
        status: "live",
        title: "Liverpool vs Real Madrid",
        tournament: "UEFA Champions League 2025/26 · SF 1st Leg",
        venue: "Anfield, Liverpool",
        startTime: new Date(Date.now() - 68 * 60000).toISOString(),
        score: {
          team1: { name: "Liverpool", goals: 2 },
          team2: { name: "Real Madrid", goals: 1 },
          status: "68' · 2nd Half",
          minute: 68
        },
        goals: [
          { team: "Liverpool", player: "Mo Salah", minute: 23, type: "goal" },
          { team: "Real Madrid", player: "Jude Bellingham", minute: 41, type: "goal" },
          { team: "Liverpool", player: "Luis Díaz", minute: 59, type: "goal" }
        ],
        cards: [
          { team: "Real Madrid", player: "Tchouaméni", minute: 45, type: "yellow" }
        ],
        stats: {
          possession: [54, 46],
          shots: [11, 8],
          shotsOnTarget: [5, 3],
          corners: [5, 4],
          fouls: [9, 12]
        },
        commentary: [
          "68' Szoboszlai shoots — blocked! Corner to Liverpool.",
          "59' GOAL! Díaz fires low into the far corner — 2-1 Liverpool!",
          "45' Yellow card for Tchouaméni — reckless challenge on Salah.",
          "41' EQUALIZER! Bellingham turns sharply and buries it — 1-1!",
          "23' GOAL! Salah opens the scoring — cool finish past Courtois!"
        ],
        thumbnail: "football",
        featured: false
      },
      {
        id: "fb_live_002",
        sport: "football",
        status: "live",
        title: "Arsenal vs PSG",
        tournament: "UEFA Champions League 2025/26 · SF 1st Leg",
        venue: "Emirates Stadium, London",
        startTime: new Date(Date.now() - 42 * 60000).toISOString(),
        score: {
          team1: { name: "Arsenal", goals: 1 },
          team2: { name: "PSG", goals: 0 },
          status: "42' · 1st Half",
          minute: 42
        },
        goals: [
          { team: "Arsenal", player: "Bukayo Saka", minute: 28, type: "goal" }
        ],
        cards: [
          { team: "PSG", player: "Marquinhos", minute: 37, type: "yellow" }
        ],
        stats: {
          possession: [55, 45],
          shots: [7, 5],
          shotsOnTarget: [3, 1],
          corners: [4, 2],
          fouls: [5, 8]
        },
        commentary: [
          "42' Dembélé cuts inside — Raya tips it over the bar! Great save!",
          "37' Yellow card for Marquinhos — late on Havertz.",
          "28' GOAL! Saka receives from Ødegaard, takes one touch and slots home!",
          "15' PSG pressing high — Vitinha wins it back, Barcola denied by Raya."
        ],
        thumbnail: "football",
        featured: false
      },
      {
        id: "fb_live_003",
        sport: "football",
        status: "live",
        title: "Chelsea vs Manchester City",
        tournament: "Premier League 2025/26 · GW34",
        venue: "Stamford Bridge, London",
        startTime: new Date(Date.now() - 55 * 60000).toISOString(),
        score: {
          team1: { name: "Chelsea", goals: 1 },
          team2: { name: "Manchester City", goals: 1 },
          status: "55' · 2nd Half",
          minute: 55
        },
        goals: [
          { team: "Chelsea", player: "Cole Palmer", minute: 19, type: "penalty" },
          { team: "Manchester City", player: "Erling Haaland", minute: 47, type: "goal" }
        ],
        cards: [
          { team: "Manchester City", player: "Gvardiol", minute: 42, type: "yellow" }
        ],
        stats: {
          possession: [44, 56],
          shots: [8, 13],
          shotsOnTarget: [3, 5],
          corners: [3, 7],
          fouls: [11, 8]
        },
        commentary: [
          "55' Haaland holds it up — Caicedo wins it back for Chelsea!",
          "47' GOAL! Haaland pounces on a loose ball — 1-1!",
          "42' Yellow card for Gvardiol — brought down Pedro Neto.",
          "19' PENALTY! Palmer steps up — coolly converted — 1-0 Chelsea!"
        ],
        thumbnail: "football",
        featured: false
      }
    ],
    upcoming: [
      {
        id: "fb_up_001",
        sport: "football",
        status: "upcoming",
        title: "PSG vs Inter Milan",
        tournament: "UEFA Champions League · Semi-Final",
        venue: "Parc des Princes, Paris",
        startTime: new Date(Date.now() + 3 * 3600000).toISOString(),
        thumbnail: "football"
      },
      {
        id: "fb_up_002",
        sport: "football",
        status: "upcoming",
        title: "Chelsea vs Manchester United",
        tournament: "Premier League 2025/26 · GW34",
        venue: "Stamford Bridge, London",
        startTime: new Date(Date.now() + 26 * 3600000).toISOString(),
        thumbnail: "football"
      },
      {
        id: "fb_up_003",
        sport: "football",
        status: "upcoming",
        title: "Bayern Munich vs Inter Milan",
        tournament: "UEFA Champions League 2025/26 · SF 1st Leg",
        venue: "Allianz Arena, Munich",
        startTime: new Date(Date.now() + 24 * 3600000).toISOString(),
        thumbnail: "football"
      }
    ],
    past: [
      {
        id: "fb_past_001",
        sport: "football",
        status: "past",
        title: "Chelsea vs Tottenham",
        tournament: "Premier League 2025/26 · GW33",
        venue: "Stamford Bridge, London",
        startTime: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "Chelsea", goals: 2 },
          team2: { name: "Tottenham", goals: 1 },
          status: "FT"
        },
        result: "Chelsea won 2–1",
        playerOfMatch: "Cole Palmer (1 goal, 1 assist)",
        goals: [
          { team: "Chelsea", player: "Cole Palmer", minute: 18, type: "penalty" },
          { team: "Chelsea", player: "Pedro Neto", minute: 62, type: "goal" },
          { team: "Tottenham", player: "Heung-min Son", minute: 77, type: "goal" }
        ],
        cards: [
          { team: "Tottenham", player: "Destiny Udogie", minute: 34, type: "yellow" },
          { team: "Chelsea", player: "Enzo Fernández", minute: 81, type: "yellow" }
        ],
        stats: {
          possession: [52, 48],
          shots: [13, 10],
          shotsOnTarget: [5, 3],
          corners: [6, 4],
          fouls: [10, 11]
        },
        thumbnail: "football"
      },
      {
        id: "fb_past_002",
        sport: "football",
        status: "past",
        title: "Liverpool vs Crystal Palace",
        tournament: "Premier League 2025/26 · GW33",
        venue: "Anfield, Liverpool",
        startTime: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "Liverpool", goals: 3 },
          team2: { name: "Crystal Palace", goals: 0 },
          status: "FT"
        },
        result: "Liverpool won 3–0",
        playerOfMatch: "Luis Díaz (1 goal, 1 assist)",
        goals: [
          { team: "Liverpool", player: "Cody Gakpo", minute: 14, type: "goal" },
          { team: "Liverpool", player: "Luis Díaz", minute: 44, type: "goal" },
          { team: "Liverpool", player: "Darwin Núñez", minute: 78, type: "goal" }
        ],
        cards: [
          { team: "Crystal Palace", player: "D. Munoz", minute: 52, type: "yellow" },
          { team: "Crystal Palace", player: "M. Hughes", minute: 66, type: "yellow" }
        ],
        stats: {
          possession: [66, 34],
          shots: [19, 5],
          shotsOnTarget: [8, 1],
          corners: [10, 2],
          fouls: [6, 15]
        },
        thumbnail: "football"
      },
      {
        id: "fb_past_003",
        sport: "football",
        status: "past",
        title: "Barcelona vs Real Madrid",
        tournament: "La Liga 2025/26 · GW31 · El Clásico",
        venue: "Montjuïc Olympic Stadium, Barcelona",
        startTime: new Date(Date.now() - 5 * 24 * 3600000).toISOString(),
        score: {
          team1: { name: "Barcelona", goals: 1 },
          team2: { name: "Real Madrid", goals: 2 },
          status: "FT"
        },
        result: "Real Madrid won 2–1",
        playerOfMatch: "Jude Bellingham (goal + assist)",
        goals: [
          { team: "Barcelona", player: "Lamine Yamal", minute: 34, type: "goal" },
          { team: "Real Madrid", player: "Jude Bellingham", minute: 52, type: "goal" },
          { team: "Real Madrid", player: "Vinícius Jr.", minute: 87, type: "goal" }
        ],
        cards: [
          { team: "Barcelona", player: "Araújo", minute: 44, type: "yellow" },
          { team: "Real Madrid", player: "Valverde", minute: 68, type: "yellow" }
        ],
        stats: {
          possession: [54, 46],
          shots: [11, 14],
          shotsOnTarget: [4, 6],
          corners: [5, 7],
          fouls: [13, 10]
        },
        thumbnail: "football"
      }
    ]
  }
};

// Helper: get all events
function getAllEvents(sport = "all", filter = "live") {
  let events = [];
  const sports = sport === "all" ? ["cricket", "football"] : [sport];
  sports.forEach(s => {
    if (SPORTS_DATA[s]) {
      events = events.concat(SPORTS_DATA[s][filter] || []);
    }
  });
  return events;
}

function getFeaturedEvent() {
  return SPORTS_DATA.cricket.live.find(e => e.featured) ||
         SPORTS_DATA.football.live[0] ||
         SPORTS_DATA.cricket.live[0];
}

function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
}

function getEventById(id) {
  for (const sport of ["cricket", "football"]) {
    for (const status of ["live", "upcoming", "past"]) {
      const ev = SPORTS_DATA[sport][status].find(e => e.id === id);
      if (ev) return ev;
    }
  }
  return null;
}

