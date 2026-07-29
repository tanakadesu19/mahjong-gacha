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

const tenGachaButton = document.getElementById("tenGachaButton");
const tenGachaResult = document.getElementById("tenGachaResult");

const gachaCountElement = document.getElementById("gachaCount");
const rarityElement = document.getElementById("rarity");
const historyList = document.getElementById("historyList");

const tileModal = document.getElementById("tileModal");
const modalRarityList = document.getElementById("modalRarityList");
const closeModalButton = document.getElementById("closeModalButton");
const modalTileName = document.getElementById("modalTileName");

const collectionList = document.getElementById("collectionList");

const collectionCountElement = document.getElementById("collectionCount");

const flashEffect = document.getElementById("flashEffect");

const singleGachaResult = document.getElementById("singleGachaResult");

let gachaCount =
    Number(localStorage.getItem("mahjongGachaCount")) || 0;

gachaCountElement.textContent = gachaCount;


// ガチャ履歴
let history = [];

const savedCollection =
    JSON.parse(localStorage.getItem("mahjongCollection")) || [];

const collectedTiles = new Set(savedCollection);

const savedRarityCollection =
    JSON.parse(
        localStorage.getItem("mahjongRarityCollection")
    ) || {};

const rarityCollection = savedRarityCollection;

gachaButton.addEventListener("click", function () {
    drawSingleGacha();
});

function drawSingleGacha() {

    singleGachaResult.style.display = "block";
    tenGachaResult.style.display = "none";

    const result = drawGachaResult();

    const selectedTile = result.tile;
    const rarity = result.rarity;

    tileElement.classList.remove("gacha-animation");

    void tileElement.offsetWidth;

    tileElement.textContent = selectedTile.symbol;
    tileNameElement.textContent = selectedTile.name;

    updateRarityDisplay(rarity);

    playFlash(rarity);
    playRaritySound(rarity);

    tileElement.classList.add("gacha-animation");
}

function drawGachaResult() {
    const randomIndex = Math.floor(
        Math.random() * mahjongTiles.length
    );

    const selectedTile = mahjongTiles[randomIndex];
    const rarity = getRarity();

    gachaCount++;

    gachaCountElement.textContent = gachaCount;

    localStorage.setItem(
        "mahjongGachaCount",
        gachaCount
    );

    updateHistory(selectedTile);

    collectedTiles.add(randomIndex);
    saveCollection();

    addRarityToCollection(
        randomIndex,
        rarity
    );

    updateCollection();

    return {
        tile: selectedTile,
        rarity: rarity
    };
}

tenGachaButton.addEventListener(
    "click",
    function () {
        drawTenGacha();
    }
);

async function drawTenGacha() {
    tenGachaButton.disabled = true;
    gachaButton.disabled = true;

    singleGachaResult.style.display = "none";
    tenGachaResult.style.display = "grid";

    tenGachaResult.innerHTML = "";

    let highestRarity = "N";

    for (let i = 0; i < 10; i++) {
        const result = drawGachaResult();

        const item = createTenGachaItem(
            result.tile,
            result.rarity
        );

        tenGachaResult.appendChild(item);

        void item.offsetWidth;

        item.classList.add("show");

        highestRarity = compareRarity(
            highestRarity,
            result.rarity
        );

        await wait(180);
    }

    playFlash(highestRarity);
    playRaritySound(highestRarity);

    tenGachaButton.disabled = false;
    gachaButton.disabled = false;
}

function createTenGachaItem(tile, rarity) {
    const item = document.createElement("div");

    item.classList.add("ten-gacha-item");

    const tileCard =
        document.createElement("div");

    tileCard.classList.add(
        "ten-gacha-tile",
        `tile-${rarity.toLowerCase()}`
    );

    tileCard.textContent = tile.symbol;

    const rarityText =
        document.createElement("p");

    rarityText.classList.add(
        "ten-gacha-rarity",
        `rarity-${rarity.toLowerCase()}`
    );

    rarityText.textContent = rarity;

    item.appendChild(tileCard);
    item.appendChild(rarityText);

    return item;
}

function compareRarity(
    currentRarity,
    newRarity
) {
    const rarityOrder = {
        N: 1,
        R: 2,
        SR: 3,
        SSR: 4
    };

    if (
        rarityOrder[newRarity] >
        rarityOrder[currentRarity]
    ) {
        return newRarity;
    }

    return currentRarity;
}

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

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

        if (isCollected) {
            item.addEventListener("click", () => {
                openTileModal(index);
            });
        } else {
            item.classList.add("locked");
        }

        const rarityMarks = document.createElement("div");
        rarityMarks.classList.add("rarity-marks");

        const rarities = ["N", "R", "SR", "SSR"];

        const obtainedRarities =
            rarityCollection[index] || [];

        rarities.forEach(function (rarity) {
            const mark = document.createElement("span");

            mark.classList.add(
                "rarity-mark",
                `mark-${rarity.toLowerCase()}`
            );


            if (obtainedRarities.includes(rarity)) {
                mark.classList.add("obtained");
            }

            rarityMarks.appendChild(mark);
        });

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

        item.appendChild(rarityMarks);
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

//レア度保存用の関数
function saveRarityCollection() {
    localStorage.setItem(
        "mahjongRarityCollection",
        JSON.stringify(rarityCollection)
    );
}

//取得したレア度を登録する関数
function addRarityToCollection(tileIndex, rarity) {
    if (!rarityCollection[tileIndex]) {
        rarityCollection[tileIndex] = [];
    }

    if (!rarityCollection[tileIndex].includes(rarity)) {
        rarityCollection[tileIndex].push(rarity);
    }

    saveRarityCollection();
}

updateCollection();

//レア度を決める関数
function getRarity() {
    const randomNumber = Math.random() * 100;

    if (randomNumber < 3) {
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

//詳細画面を開く関数
function openTileModal(tileIndex) {
    const tile = mahjongTiles[tileIndex];

    const obtainedRarities =
        rarityCollection[tileIndex] || [];

    modalTileName.textContent = tile.name;
    modalRarityList.innerHTML = "";

    const rarityData = [
        {
            id: "N",
            label: "ノーマル",
            className: "tile-n"
        },
        {
            id: "R",
            label: "シルバー",
            className: "tile-r"
        },
        {
            id: "SR",
            label: "ゴールド",
            className: "tile-sr"
        },
        {
            id: "SSR",
            label: "レインボー",
            className: "tile-ssr"
        }
    ];

    rarityData.forEach(function (rarity) {
        if (!obtainedRarities.includes(rarity.id)) {
            return;
        }

        const rarityItem = document.createElement("div");
        rarityItem.classList.add("modal-tile-item");

        const tileCard = document.createElement("div");

        tileCard.classList.add(
            "modal-color-tile",
            rarity.className
        );

        tileCard.textContent = tile.symbol;

        const rarityName = document.createElement("p");
        rarityName.classList.add("modal-rarity-name");
        rarityName.textContent = rarity.label;

        rarityItem.appendChild(tileCard);
        rarityItem.appendChild(rarityName);

        modalRarityList.appendChild(rarityItem);
    });

    tileModal.classList.add("open");
}

closeModalButton.addEventListener("click", () => {
    tileModal.classList.remove("open");
});

tileModal.addEventListener("click", (event) => {
    if (event.target === tileModal) {
        tileModal.classList.remove("open");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        tileModal.classList.remove("open");
    }
});

function playFlash(rarity) {

    flashEffect.className = "flash-effect";

    if (rarity === "R") {
        flashEffect.classList.add("flash-silver");
    }

    if (rarity === "SR") {
        flashEffect.classList.add("flash-gold");
    }

    if (rarity === "SSR") {
        flashEffect.classList.add("flash-rainbow");
    }

    setTimeout(() => {
        flashEffect.className = "flash-effect";
    }, 900);

}

//レア度別の効果音の実装
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    return audioContext;
}

function playTone({
    frequency,
    startTime,
    duration,
    type = "sine",
    volume = 0.12
}) {
    const context = getAudioContext();

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(
        frequency,
        startTime
    );

    gainNode.gain.setValueAtTime(
        volume,
        startTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function playRaritySound(rarity) {
    const context = getAudioContext();
    const now = context.currentTime;

    if (context.state === "suspended") {
        context.resume();
    }

    if (rarity === "N") {
        playTone({
            frequency: 330,
            startTime: now,
            duration: 0.08,
            type: "triangle",
            volume: 0.08
        });
    }

    if (rarity === "R") {
        playTone({
            frequency: 720,
            startTime: now,
            duration: 0.18,
            type: "triangle",
            volume: 0.10
        });
    }

    if (rarity === "SR") {
        playTone({
            frequency: 660,
            startTime: now,
            duration: 0.15,
            type: "triangle",
            volume: 0.10
        });

        playTone({
            frequency: 880,
            startTime: now + 0.08,
            duration: 0.18,
            type: "triangle",
            volume: 0.12
        });

        playTone({
            frequency: 1175,
            startTime: now + 0.18,
            duration: 0.28,
            type: "sine",
            volume: 0.14
        });
    }

    if (rarity === "SSR") {
        const notes = [
            392,
            523,
            659,
            784,
            1047,
            1319
        ];

        notes.forEach((frequency, index) => {

            playTone({
                frequency,
                startTime: now + index * 0.08,
                duration: 0.35,
                type: index < 4 ? "triangle" : "sine",
                volume: 0.13
            });

        });

        playTone({
            frequency: 1760,
            startTime: now + 0.55,
            duration: 0.6,
            type: "sine",
            volume: 0.15
        });
    }
}