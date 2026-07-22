const MAX_HISTORY = 10;

const mahjongTiles = [
    { symbol: "🀇", name: "一萬" },
    { symbol: "🀈", name: "二萬" },
    { symbol: "🀉", name: "三萬" },
    { symbol: "🀊", name: "四萬" },
    { symbol: "🀋", name: "五萬" },
    { symbol: "🀌", name: "六萬" },
    { symbol: "🀍", name: "七萬" },
    { symbol: "🀎", name: "八萬" },
    { symbol: "🀏", name: "九萬" },

    { symbol: "🀙", name: "一筒" },
    { symbol: "🀚", name: "二筒" },
    { symbol: "🀛", name: "三筒" },
    { symbol: "🀜", name: "四筒" },
    { symbol: "🀝", name: "五筒" },
    { symbol: "🀞", name: "六筒" },
    { symbol: "🀟", name: "七筒" },
    { symbol: "🀠", name: "八筒" },
    { symbol: "🀡", name: "九筒" },

    { symbol: "🀐", name: "一索" },
    { symbol: "🀑", name: "二索" },
    { symbol: "🀒", name: "三索" },
    { symbol: "🀓", name: "四索" },
    { symbol: "🀔", name: "五索" },
    { symbol: "🀕", name: "六索" },
    { symbol: "🀖", name: "七索" },
    { symbol: "🀗", name: "八索" },
    { symbol: "🀘", name: "九索" },

    { symbol: "🀀", name: "東" },
    { symbol: "🀁", name: "南" },
    { symbol: "🀂", name: "西" },
    { symbol: "🀃", name: "北" },
    { symbol: "🀆", name: "白" },
    { symbol: "🀅", name: "發" },
    { symbol: "🀄", name: "中" }
];

const tileElement = document.getElementById("tile");
const tileNameElement = document.getElementById("tileName");
const gachaButton = document.getElementById("gachaButton");
const gachaCountElement = document.getElementById("gachaCount");
const historyList = document.getElementById("historyList");

let gachaCount = 0;

// ガチャ履歴
let history = [];

gachaButton.addEventListener("click", function () {
    const randomIndex = Math.floor(
        Math.random() * mahjongTiles.length
    );

    const selectedTile = mahjongTiles[randomIndex];

    tileElement.classList.remove("gacha-animation");

    void tileElement.offsetWidth;

    tileElement.textContent = selectedTile.symbol;
    tileNameElement.textContent = selectedTile.name;

    tileElement.classList.add("gacha-animation");

    gachaCount++;
    gachaCountElement.textContent = gachaCount;

    updateHistory(selectedTile);
});

function updateHistory(selectedTile) {
    history.unshift(selectedTile);

    if (history.length > MAX_HISTORY) {
        history.pop();
    }

    historyList.innerHTML = "";

    history.forEach(function (tile) {
        const li = document.createElement("li");

        const symbol = document.createElement("span");
        symbol.classList.add("history-symbol");
        symbol.textContent = tile.symbol;

        const name = document.createElement("span");
        name.classList.add("history-name");
        name.textContent = tile.name;

        li.appendChild(symbol);
        li.appendChild(name);

        historyList.appendChild(li);
    });
}