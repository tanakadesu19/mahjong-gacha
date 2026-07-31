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

const yakumanList = [
    {
        name: "国士無双",
        tiles: [
            "🀇", "🀏", "🀙", "🀡",
            "🀐", "🀘", "🀀",
            "🀁", "🀂", "🀃",
            "🀆", "🀅", "🀄",
            "🀇"
        ]
    },
    {
        name: "大三元",
        tiles: [
            "🀆", "🀆", "🀆",
            "🀅", "🀅", "🀅",
            "🀄", "🀄", "🀄",
            "🀇", "🀈", "🀉",
            "🀀", "🀀"
        ]
    },
    {
        name: "四暗刻",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀀", "🀀", "🀀",
            "🀄", "🀄"
        ]
    }
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

const yakumanResult = document.getElementById("yakumanResult");
const yakumanName = document.getElementById("yakumanName");
const yakumanTiles = document.getElementById("yakumanTiles");

let yakumanFromTenGacha = false;

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

const savedYakumanCollection =
    JSON.parse(
        localStorage.getItem("mahjongYakumanCollection")
    ) || [];

const collectedYakuman =
    new Set(savedYakumanCollection);

gachaButton.addEventListener("click", function () {
    drawSingleGacha();
});

function drawSingleGacha() {
    const result = drawGachaResult();

    tenGachaResult.style.display = "none";

    // 役満が出た場合
    if (result.type === "yakuman") {
        yakumanFromTenGacha = false;

        singleGachaResult.style.display = "none";

        showYakumanResult(result.yakuman);
        return;
    }

    // 通常牌が出た場合
    yakumanResult.classList.remove("show");
    singleGachaResult.style.display = "block";

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
    // ガチャ回数は、通常牌でも役満でも1回増やす
    gachaCount++;

    gachaCountElement.textContent = gachaCount;

    localStorage.setItem(
        "mahjongGachaCount",
        gachaCount
    );

    // 最初に役満かどうかを抽選する
    const yakuman = getYakumanResult();

    if (yakuman) {
        addYakumanToCollection(yakuman);
        updateHistory(yakuman);

        return {
            type: "yakuman",
            yakuman: yakuman
        };
    }

    // 役満ではなかった場合は通常牌を抽選
    const randomIndex = Math.floor(
        Math.random() * mahjongTiles.length
    );

    const selectedTile = mahjongTiles[randomIndex];
    const rarity = getRarity();

    updateHistory(selectedTile);

    collectedTiles.add(randomIndex);
    saveCollection();

    addRarityToCollection(
        randomIndex,
        rarity
    );

    updateCollection();

    return {
        type: "tile",
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
    yakumanResult.classList.remove("show");

    tenGachaResult.style.display = "grid";
    tenGachaResult.innerHTML = "";

    let highestRarity = "N";

    // 10連の中で出た役満を保存する
    const obtainedYakuman = [];

    for (let i = 0; i < 10; i++) {
        const result = drawGachaResult();

        let item;

        // 役満が出た場合
        if (result.type === "yakuman") {
            item = createTenYakumanItem(
                result.yakuman
            );

            obtainedYakuman.push(
                result.yakuman
            );
        } else {
            // 通常牌が出た場合
            item = createTenGachaItem(
                result.tile,
                result.rarity
            );

            highestRarity = compareRarity(
                highestRarity,
                result.rarity
            );
        }

        tenGachaResult.appendChild(item);

        void item.offsetWidth;

        item.classList.add("show");

        await wait(180);
    }

    // 通常牌の中で最も高いレア度の演出
    playFlash(highestRarity);
    playRaritySound(highestRarity);

    tenGachaButton.disabled = false;
    gachaButton.disabled = false;

    // 10連に役満が含まれていた場合
    if (obtainedYakuman.length > 0) {
        await wait(700);

        yakumanFromTenGacha = true;

        showYakumanResult(
            obtainedYakuman[0]
        );
    }
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

    rarityText.textContent = tile.name;

    item.appendChild(tileCard);
    item.appendChild(rarityText);

    return item;
}

function createTenYakumanItem(yakuman) {
    const item = document.createElement("div");

    item.classList.add(
        "ten-gacha-item",
        "ten-yakuman-item"
    );

    const yakumanCard =
        document.createElement("div");

    yakumanCard.classList.add(
        "ten-gacha-tile",
        "ten-yakuman-tile"
    );

    yakumanCard.textContent = "役満";

    const yakumanNameText =
        document.createElement("p");

    yakumanNameText.classList.add(
        "ten-yakuman-name"
    );

    yakumanNameText.textContent =
        yakuman.name;

    item.appendChild(yakumanCard);
    item.appendChild(yakumanNameText);

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


function updateHistory(result) {
    history.unshift(result);

    if (history.length > MAX_HISTORY) {
        history.pop();
    }

    historyList.innerHTML = "";

    history.forEach(function (item) {
        const li = document.createElement("li");

        const symbol =
            document.createElement("span");

        symbol.classList.add(
            "history-symbol"
        );

        const name =
            document.createElement("span");

        name.classList.add(
            "history-name"
        );

        // 通常牌の場合
        if (item.symbol) {
            symbol.textContent = item.symbol;
            name.textContent = item.name;
        } else {
            // 役満の場合
            li.classList.add(
                "history-yakuman"
            );

            symbol.textContent = "役満";
            name.textContent = item.name;
        }

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

//役満の保存
function saveYakumanCollection() {
    const yakumanArray =
        Array.from(collectedYakuman);

    localStorage.setItem(
        "mahjongYakumanCollection",
        JSON.stringify(yakumanArray)
    );
}

function addYakumanToCollection(yakuman) {
    collectedYakuman.add(yakuman.name);

    saveYakumanCollection();
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


//役満
function getYakumanResult() {
    const randomNumber = Math.random() * 100;

    // テスト用：30％で役満
    if (randomNumber >= 30) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * yakumanList.length
    );

    return yakumanList[randomIndex];
}


function showYakumanResult(yakuman) {
    // 通常の結果を非表示にする
    singleGachaResult.style.display = "none";
    tenGachaResult.style.display = "none";

    // 前回の役満牌を削除
    yakumanTiles.innerHTML = "";

    // 役名を表示
    yakumanName.textContent = yakuman.name;

    // 14枚の牌を作成
    yakuman.tiles.forEach(function (symbol, index) {
        const tile = document.createElement("div");

        tile.classList.add("yakuman-tile");
        tile.textContent = symbol;

        tile.style.animationDelay =
            `${index * 0.05}s`;

        yakumanTiles.appendChild(tile);
    });

    // 役満結果を表示
    yakumanResult.classList.remove("show");

    void yakumanResult.offsetWidth;

    yakumanResult.classList.add("show");
}

yakumanResult.addEventListener("click", function () {
    yakumanResult.classList.remove("show");

    if (yakumanFromTenGacha) {
        tenGachaResult.style.display = "grid";
        yakumanFromTenGacha = false;
    }
});