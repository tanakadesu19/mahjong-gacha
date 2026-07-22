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
const rarityElement = document.getElementById("rarity");
const historyList = document.getElementById("historyList");

const collectionList =
    document.getElementById("collectionList");

const collectionCountElement =
    document.getElementById("collectionCount");

let gachaCount =
    Number(localStorage.getItem("mahjongGachaCount")) || 0;

gachaCountElement.textContent = gachaCount;


// ガチャ履歴
let history = [];

const savedCollection =
    JSON.parse(localStorage.getItem("mahjongCollection")) || [];

const collectedTiles = new Set(savedCollection);

gachaButton.addEventListener("click", function () {
    const randomIndex = Math.floor(
        Math.random() * mahjongTiles.length
    );

    const selectedTile = mahjongTiles[randomIndex];
    const rarity = getRarity();

    tileElement.classList.remove("gacha-animation");

    void tileElement.offsetWidth;

    tileElement.textContent = selectedTile.symbol;
    tileNameElement.textContent = selectedTile.name;

    updateRarityDisplay(rarity);

    tileElement.classList.add("gacha-animation");

    gachaCount++;

    gachaCountElement.textContent = gachaCount;

    localStorage.setItem(
        "mahjongGachaCount",
        gachaCount
    );


    updateHistory(selectedTile);

    collectedTiles.add(randomIndex);
    saveCollection();
    updateCollection();
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

//図鑑を表示する
function updateCollection() {
    collectionList.innerHTML = "";

    mahjongTiles.forEach(function (tile, index) {
        const item = document.createElement("div");

        item.classList.add("collection-item");

        const isCollected = collectedTiles.has(index);

        if (!isCollected) {
            item.classList.add("locked");
        }

        const symbol = document.createElement("span");
        symbol.classList.add("collection-symbol");

        const name = document.createElement("span");
        name.classList.add("collection-name");

        if (isCollected) {
            symbol.textContent = tile.symbol;
            name.textContent = tile.name;
        } else {
            symbol.textContent = "？";
            name.textContent = "未取得";
        }

        item.appendChild(symbol);
        item.appendChild(name);

        collectionList.appendChild(item);
    });

    collectionCountElement.textContent =
        collectedTiles.size;
}

//図鑑の保存
function saveCollection() {
    const collectionArray = Array.from(collectedTiles);

    localStorage.setItem(
        "mahjongCollection",
        JSON.stringify(collectionArray)
    );
}

updateCollection();

//レア度を決める関数
function getRarity() {
    const randomNumber = Math.random() * 100;

    if (randomNumber < 1.8) {
        return "SSR";
    }

    if (randomNumber < 10) {
        return "SR";
    }

    if (randomNumber < 30) {
        return "R";
    }

    return "N";
}

//レア度の見た目を変える
function updateRarityDisplay(rarity) {
    rarityElement.textContent = rarity;

    rarityElement.classList.remove(
        "rarity-n",
        "rarity-r",
        "rarity-sr",
        "rarity-ssr"
    );

    rarityElement.classList.add(
        `rarity-${rarity.toLowerCase()}`
    );

    tileElement.classList.remove(
        "tile-n",
        "tile-r",
        "tile-sr",
        "tile-ssr"
    );

    tileElement.classList.add(
        `tile-${rarity.toLowerCase()}`
    );
}