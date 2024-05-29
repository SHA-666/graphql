let elem = document.getElementById("start")
let prof = document.getElementById("prof_info")

fetch('/api/graphql')

    .then(res => res.json())
    .then(({ last_act, project_on, skils, data }) => {
        let lvl = data.user[0].events[0].level;
        displayLvl(lvl)
        let currentproject = project_on.group[0]
        lastAct(currentproject)
        let skills = skils.user[0].transactions;
        insertGraph(skills)
    })
    .catch(err => console.error("Error fetching data:", err));









// add skills graph
function insertGraph(skils) {
    skils.sort((a, b) => { if (a.amount > b.amount) { return -1 } if (a.amount < b.amount) { return 1 } return 0; })
    let skills_info = document.createElement("div");
    skills_info.classList.add("skills_grid");
    let svgdata = `<div class="skills_heder">
               </div>
<svg class="skil_svg" style="overflow: visible;" width="20%" height="20%" viewBox="0 0 400 300" class="mv6-01 pb7-01"><circle fill="none" stroke="rgb(170, 170, 170)" stroke-width="0.75" cx="200" cy="200" r="200"></circle><path stroke-width="0" stroke="none" fill="var(--lightBlue)" d="`;
    for (let i = 0; i < skils.length && i < 6; i++) {
        let cord = rotate({ x: 200, y: 200 - 200 * skils[i].amount / 100 }, { x: 200, y: 200 }, -(Math.PI / 3) * i);
        if (i === 0) {
            svgdata += `M ${cord.x} ${cord.y}`;
        } else {
            svgdata += `L ${cord.x} ${cord.y}`;
        }
    }
    svgdata += `"></path>
        <g><line x1="200" y1="0" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)">
        </line><circle cx="200" cy="180" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="160" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="140" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="120" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="100" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="80" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="60" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="40" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="20" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="0" fill="rgb(170, 170, 170)" r="0">
        </circle></g><g><line x1="373.2050807568877" y1="100" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)">
        </line><circle cx="217.32050807568876" cy="190" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="234.64101615137753" cy="180" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="251.96152422706632" cy="170" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="269.28203230275506" cy="160" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="286.60254037844385" cy="150" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="303.92304845413264" cy="140" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="321.2435565298214" cy="130" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="338.56406460551017" cy="120" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="355.88457268119896" cy="110" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="373.2050807568877" cy="100" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="373.20508075688775" y1="300" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="217.32050807568876" cy="210" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="234.64101615137756" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="251.96152422706632" cy="230" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="269.2820323027551" cy="240" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="286.6025403784439" cy="250" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="303.92304845413264" cy="260" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="321.24355652982143" cy="270" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="338.5640646055102" cy="280" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="355.88457268119896" cy="290" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="373.20508075688775" cy="300" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="200" y1="400" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="200" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="240" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="260" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="280" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="300" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="320" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="340" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="360" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="380" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="400" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="26.794919243112304" y1="300.00000000000006" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="182.67949192431124" cy="210" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="165.35898384862247" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="148.03847577293368" cy="230.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="130.71796769724492" cy="240.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="113.39745962155615" cy="250.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="96.07695154586739" cy="260.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="78.75644347017861" cy="270.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="61.43593539448983" cy="280.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="44.11542731880107" cy="290.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="26.794919243112304" cy="300.00000000000006" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="26.79491924311219" y1="100.00000000000013" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="182.6794919243112" cy="190" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="165.35898384862244" cy="180.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="148.03847577293365" cy="170.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="130.7179676972449" cy="160.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="113.3974596215561" cy="150.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="96.07695154586732" cy="140.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="78.75644347017854" cy="130.00000000000009" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="61.435935394489746" cy="120.0000000000001" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="44.11542731880098" cy="110.00000000000011" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="26.79491924311219" cy="100.00000000000013" fill="rgb(170, 170, 170)" r="0"></circle></g>
        <text text-anchor="middle" alignment-baseline="after-edge" x="200" y="-40" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[0].type.split("_")[1]}</text>
        <text text-anchor="start" alignment-baseline="after-edge" x="418.2050807568877" y="100" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[1].type.split("_")[1]}</text>
        <text text-anchor="start" alignment-baseline="before-edge" x="418.20508075688775" y="300" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[2].type.split("_")[1]}</text>
        <text text-anchor="middle" alignment-baseline="before-edge" x="200" y="440" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[3].type.split("_")[1]}</text>
        <text text-anchor="end" alignment-baseline="before-edge" x="-18.205080756887696" y="300.00000000000006" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[4].type.split("_")[1]}</text>
        <text text-anchor="end" alignment-baseline="after-edge" x="-18.20508075688781" y="100.00000000000013" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[5].type.split("_")[1]}</text></svg>`;
    skills_info.innerHTML = svgdata;
    elem.appendChild(skills_info);
}


function rotate(M, O, angle) {
    var xM, yM, x, y;
    xM = M.x - O.x;
    yM = M.y - O.y;
    x = xM * Math.cos(angle) + yM * Math.sin(angle) + O.x;
    y = - xM * Math.sin(angle) + yM * Math.cos(angle) + O.y;
    return ({ x: Math.round(x), y: Math.round(y) });
}



//display the activity working on
function lastAct(currentproject) {
    let diff = new Date();
    if (currentproject.updatedAt) {
        diff = Date.now() - new Date(currentproject.updatedAt);
    } else {
        diff = Date.now() - new Date(currentproject.createdAt);
    }
    let week = Math.floor(diff / (604800 * 1000));
    diff = diff - (week * 604800 * 1000);
    let day = Math.floor(diff / (1000 * 3600 * 24));
    diff = diff - (day * (1000 * 3600 * 24));
    let hours = Math.floor(diff / (1000 * 3600));
    diff = diff - (hours * (1000 * 3600));
    let min = Math.floor(diff / (1000 * 60));
    diff = diff - (min * (1000 * 60));
    let sec = Math.floor(diff / 1000);
    let activity = document.createElement("div");
    activity.classList.add("activity");
    activity.innerHTML = `
                            <div>
                              <div class="active">
                                <div class="active_header">You're currently</div>
                                <div class="active_p"></div>
                              </div>
                              <div class="active_info">Active</div>
                            </div>
                            <div>You're working on <span class="blue">${currentproject.object.name}</span> since ${week}w ${day}d ${hours}h ${min}m ${sec}s, keep going!</div>
                          `
    elem.appendChild(activity)

}
//display level info
function displayLvl(lvl) {
    let prof = document.createElement("div");
    prof.classList.add("prof_info");
    let lvl_div = document.createElement("div");
    let rank = getRank(lvl);
    let nextR = nextRank(lvl);
    lvl_div.classList.add("levelInfo");
    lvl_div.innerHTML = `<div class="level_header">
                            <div class="rank_header">Current rank</div>
                            <div class="rank">${rank}</div> 
                            <div class="next">Next rank in ${nextR} levels</div>
                          </div>
                           <div id="svg_level_draw"><div class="circl"><div class="level">Level</div> <div class="num_lev">${lvl}</div></div></div>
                           `;
    prof.appendChild(lvl_div);
    elem.appendChild(prof)
}

function getRank(level) {
    switch (level) {
        case level >= 60:
            return "Full-Stack developer";
        case level >= 55:
            return "Confirmed developer";
        case level >= 50:
            return "Junior developer";
        case level >= 40:
            return "Basic developer";
        case level >= 30:
            return "Assistant developer";
        case level >= 20:
            return "Apprentice developer";
        case level >= 10:
            return "Beginner developer";
        default:
            return "Aspiring developer";
    }
}

function nextRank(level) {
    switch (level) {
        case level >= 60:
            return 0;
        case level >= 55:
            return 60 - level;
        case level >= 50:
            return 55 - level;
        case level >= 40:
            return 50 - level;
        case level >= 30:
            return 40 - level;
        case level >= 20:
            return 30 - level;
        case level >= 10:
            return 20 - level;
        default:
            return 10 - level;
    }
}
//