var storage = window.localStorage;


let pointList = [];
let endureList = [];
//抓取storage資料存成object
//storage資料為二維陣列[key,value]
//需要對value作分析才可區分value中的name、time、score
for (let i of Object.entries(storage)) {
    let data = {};
    data.id = i[0];
    data.name = i[1].split(",")[0];
    data.time = i[1].split(",")[1];
    data.score = parseInt(i[1].split(",")[2]);
    pointList.push(data);
    endureList.push(data);
}
//排序取得的pointList
pointList = pointList.sort(function (a, b) {
    if (a.score != b.score)
        return b.score - a.score;
    else {
        return convertTime(b.time) - convertTime(a.time)
    }
});

// 字串轉換成時間
function convertTime(mmss) {
    let obj = new Date();
    let [minutes, seconds] = mmss.split(':');
    obj.setMinutes(minutes);
    obj.setSeconds(seconds);
    return obj;
}

// 耐力排行榜
endureList = endureList.sort(function (a, b) {
    return convertTime(b.time) - convertTime(a.time);
});


// const leaderboard = pointList;
// // 將遊戲資料渲染到排行榜中


function renderLeaderboard(leaderboard) {
    // 清空原有的排行榜
    scoreboard.innerHTML = "";
    // endureboard.innerHTML = "";

    // 生成新的排行榜
    leaderboard.forEach((player) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.innerText = player.name;
        row.appendChild(nameCell);

        const timeCell = document.createElement("td");
        timeCell.innerText = player.time;
        row.appendChild(timeCell);

        const scoreCell = document.createElement("td");
        scoreCell.innerText = player.score;
        row.appendChild(scoreCell);

        const rankCell = document.createElement("td");
        rankCell.innerText = leaderboard.indexOf(player) + 1;
        row.appendChild(rankCell);

        scoreboard.appendChild(row);
    });


}

renderLeaderboard(pointList);

