const MAX_HISTORY = 10;

const mahjongTiles = [
    { symbol: "🀇", name: "一萬", reading: "イーマン" },
    { symbol: "🀈", name: "二萬", reading: "リャンマン" },
    { symbol: "🀉", name: "三萬", reading: "サンマン" },
    { symbol: "🀊", name: "四萬", reading: "スーマン" },
    { symbol: "🀋", name: "五萬", reading: "ウーマン" },
    { symbol: "🀌", name: "六萬", reading: "ローマン" },
    { symbol: "🀍", name: "七萬", reading: "チーマン" },
    { symbol: "🀎", name: "八萬", reading: "パーマン" },
    { symbol: "🀏", name: "九萬", reading: "キューマン" },

    { symbol: "🀙", name: "一筒", reading: "イーピン" },
    { symbol: "🀚", name: "二筒", reading: "リャンピン" },
    { symbol: "🀛", name: "三筒", reading: "サンピン" },
    { symbol: "🀜", name: "四筒", reading: "スーピン" },
    { symbol: "🀝", name: "五筒", reading: "ウーピン" },
    { symbol: "🀞", name: "六筒", reading: "ローピン" },
    { symbol: "🀟", name: "七筒", reading: "チーピン" },
    { symbol: "🀠", name: "八筒", reading: "パーピン" },
    { symbol: "🀡", name: "九筒", reading: "キューピン" },

    { symbol: "🀐", name: "一索", reading: "イーソー" },
    { symbol: "🀑", name: "二索", reading: "リャンソー" },
    { symbol: "🀒", name: "三索", reading: "サンソー" },
    { symbol: "🀓", name: "四索", reading: "スーソー" },
    { symbol: "🀔", name: "五索", reading: "ウーソー" },
    { symbol: "🀕", name: "六索", reading: "ローソー" },
    { symbol: "🀖", name: "七索", reading: "チーソー" },
    { symbol: "🀗", name: "八索", reading: "パーソー" },
    { symbol: "🀘", name: "九索", reading: "キューソー" },

    { symbol: "🀀", name: "東", reading: "トン" },
    { symbol: "🀁", name: "南", reading: "ナン" },
    { symbol: "🀂", name: "西", reading: "シャー" },
    { symbol: "🀃", name: "北", reading: "ペー" },
    { symbol: "🀆", name: "白", reading: "ハク" },
    { symbol: "🀅", name: "發", reading: "ハツ" },
    { symbol: "🀄", name: "中", reading: "チュン" },
];

const yakuList = [
    {
        id: "tanyao",
        name: "タンヤオ",
        reading: "タンヤオ",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "1・9牌と字牌を使わず、2から8の数牌だけで作る役。",
        tiles: [
            "🀈", "🀉", "🀊",
            "🀛", "🀜", "🀝",
            "🀑", "🀒", "🀓",
            "🀋", "🀋", "🀋",
            "🀝", "🀝"
        ]
    },
    {
        id: "pinfu",
        name: "平和",
        reading: "ピンフ",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "4組の順子と、役牌ではない雀頭で構成する門前役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "menzen-tsumo",
        name: "門前清自摸和",
        reading: "メンゼンツモ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "鳴いていない門前の手を、自分でツモって和了すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "riichi",
        name: "立直",
        reading: "リーチ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "門前でテンパイしているときに、1,000点棒を出してリーチを宣言すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "iipeikou",
        name: "一盃口",
        reading: "イーペーコー",
        type: "shape",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "同じ種類・同じ数字の順子を2組そろえる門前役。",
        tiles: [
            "🀇", "🀇", "🀈",
            "🀈", "🀉", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "yakuhai-haku",
        name: "役牌・白",
        reading: "ヤクハイ・ハク",
        type: "shape",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "白を3枚以上そろえて、刻子または槓子にすると成立する役。",
        tiles: [
            "🀆", "🀆", "🀆",
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "yakuhai-hatsu",
        name: "役牌・發",
        reading: "ヤクハイ・ハツ",
        type: "shape",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "發を3枚以上そろえて、刻子または槓子にすると成立する役。",
        tiles: [
            "🀅", "🀅", "🀅",
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "yakuhai-chun",
        name: "役牌・中",
        reading: "ヤクハイ・チュン",
        type: "shape",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "中を3枚以上そろえて、刻子または槓子にすると成立する役。",
        tiles: [
            "🀄", "🀄", "🀄",
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "ippatsu",
        name: "一発",
        reading: "イッパツ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "リーチを宣言した後、鳴きが入らないまま1巡以内に和了すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "jikaze",
        name: "自風",
        reading: "ジカゼ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "自分の席と同じ風牌を3枚以上そろえると成立する役。東家なら東、南家なら南が自風牌になる。",
        tiles: [
            "🀀", "🀀", "🀀",
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "bakaze",
        name: "場風",
        reading: "バカゼ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "現在の場と同じ風牌を3枚以上そろえると成立する役。東場なら東、南場なら南が場風牌になる。",
        tiles: [
            "🀀", "🀀", "🀀",
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀘", "🀘"
        ]
    },
    {
        id: "rinshan-kaihou",
        name: "嶺上開花",
        reading: "リンシャンカイホウ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "カンをした後に補充する嶺上牌でツモ和了すると成立する役。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "chankan",
        name: "搶槓",
        reading: "チャンカン",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "他家が加槓しようとした牌でロン和了すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "haitei-raoyue",
        name: "海底摸月",
        reading: "ハイテイラオユエ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "山に残った最後の牌をツモして和了すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },
    {
        id: "houtei-raoyui",
        name: "河底撈魚",
        reading: "ホウテイラオユイ",
        type: "situation",
        category: "normal",
        categoryLabel: "1翻",
        han: 1,
        description:
            "その局で最後に捨てられた牌でロン和了すると成立する役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀚", "🀛", "🀜",
            "🀑", "🀒", "🀓",
            "🀍", "🀎", "🀏",
            "🀘", "🀘"
        ]
    },





    {
        id: "sanshoku-doujun",
        name: "三色同順",
        reading: "サンショクドウジュン",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "萬子・筒子・索子で、同じ数字の順子をそろえる役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀙", "🀚", "🀛",
            "🀐", "🀑", "🀒",
            "🀍", "🀎", "🀏",
            "🀄", "🀄"
        ]
    },
    {
        id: "chiitoitsu",
        name: "七対子",
        reading: "チートイツ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "異なる7種類の対子をそろえて作る、特殊な形の門前役。",
        tiles: [
            "🀇", "🀇",
            "🀉", "🀉",
            "🀛", "🀛",
            "🀝", "🀝",
            "🀑", "🀑",
            "🀕", "🀕",
            "🀄", "🀄"
        ]
    },
    {
        id: "ikkitsuukan",
        name: "一気通貫",
        reading: "イッキツウカン",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "同じ種類の数牌で、123・456・789の3つの順子をそろえる役。",
        tiles: [
            "🀇", "🀈", "🀉",
            "🀊", "🀋", "🀌",
            "🀍", "🀎", "🀏",
            "🀚", "🀛", "🀜",
            "🀘", "🀘"
        ]
    },
    {
        id: "toitoi",
        name: "対々和",
        reading: "トイトイホウ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "4組すべてを刻子または槓子でそろえる役。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀅", "🀅", "🀅",
            "🀄", "🀄"
        ]
    },
    {
        id: "sanankou",
        name: "三暗刻",
        reading: "サンアンコウ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "自分でそろえた暗刻を3組含むと成立する役。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀍", "🀎", "🀏",
            "🀄", "🀄"
        ]
    },
    {
        id: "sanshoku-doukou",
        name: "三色同刻",
        reading: "サンショクドウコウ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "萬子・筒子・索子で、同じ数字の刻子または槓子をそろえる役。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀍", "🀎", "🀏",
            "🀄", "🀄"
        ]
    },
    {
        id: "sankantsu",
        name: "三槓子",
        reading: "サンカンツ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "1人で3組の槓子を作って和了すると成立する役。表示では槓子を3枚ずつに省略しています。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀍", "🀎", "🀏",
            "🀄", "🀄"
        ]
    },
    {
        id: "shousangen",
        name: "小三元",
        reading: "ショウサンゲン",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "白・發・中のうち2種類を刻子または槓子にし、残り1種類を雀頭にする役。",
        tiles: [
            "🀆", "🀆", "🀆",
            "🀅", "🀅", "🀅",
            "🀄", "🀄",
            "🀇", "🀈", "🀉",
            "🀐", "🀑", "🀒"
        ]
    },
    {
        id: "honroutou",
        name: "混老頭",
        reading: "ホンロウトウ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "手牌のすべてを1・9牌と字牌だけで構成する役。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀏", "🀏", "🀏",
            "🀀", "🀀", "🀀",
            "🀄", "🀄", "🀄",
            "🀆", "🀆"
        ]
    },
    {
        id: "honchantaiyaochuu",
        name: "混全帯么九",
        reading: "ホンチャンタイヤオチュー",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "すべての面子と雀頭に、1・9牌または字牌を含む役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀙","🀚","🀛",
            "🀐","🀑","🀒",
            "🀄","🀄","🀄",
            "🀆","🀆"
        ]
    },
    {
        id: "honitsu",
        name: "混一色",
        reading: "ホンイツ",
        type: "shape",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "1種類の数牌と字牌だけで構成する役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀊","🀋","🀌",
            "🀍","🀎","🀏",
            "🀄","🀄","🀄",
            "🀆","🀆"
        ]
    },
    {
        id: "double-riichi",
        name: "ダブル立直",
        reading: "ダブルリーチ",
        type: "situation",
        category: "normal",
        categoryLabel: "2翻",
        han: 2,
        description:
            "配牌から一巡目にリーチを宣言すると成立する役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀚","🀛","🀜",
            "🀑","🀒","🀓",
            "🀍","🀎","🀏",
            "🀘","🀘"
        ]
    },



    {
        id: "ryanpeikou",
        name: "二盃口",
        reading: "リャンペーコー",
        type: "shape",
        category: "normal",
        categoryLabel: "3翻",
        han: 3,
        description:
            "同じ順子を2組ずつ、合計4組そろえる門前役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀇","🀈","🀉",
            "🀚","🀛","🀜",
            "🀚","🀛","🀜",
            "🀄","🀄"
        ]
    },
    {
        id: "junchan",
        name: "純全帯么九",
        reading: "ジュンチャンタイヤオチュー",
        type: "shape",
        category: "normal",
        categoryLabel: "3翻",
        han: 3,
        description:
            "すべての面子と雀頭に1または9牌を含み、字牌を使わない役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀏","🀎","🀍",
            "🀙","🀚","🀛",
            "🀡","🀡","🀡",
            "🀐","🀐"
        ]
    },
    {
        id: "chinitsu",
        name: "清一色",
        reading: "チンイツ",
        type: "shape",
        category: "normal",
        categoryLabel: "6翻",
        han: 6,
        description:
            "1種類の数牌だけで構成する役。",
        tiles: [
            "🀇","🀈","🀉",
            "🀊","🀋","🀌",
            "🀍","🀎","🀏",
            "🀇","🀇","🀇",
            "🀋","🀋"
        ]
    },




    {
        id: "kokushi-musou",
        name: "国士無双",
        reading: "コクシムソウ",
        category: "yakuman",
        categoryLabel: "役満",
        han: null,
        description:
            "1・9牌と字牌をすべて1枚ずつ集め、そのうち1種類を対子にする役満。",
        tiles: [
            "🀇", "🀏", "🀙", "🀡",
            "🀐", "🀘", "🀀",
            "🀁", "🀂", "🀃",
            "🀆", "🀅", "🀄",
            "🀇"
        ]
    },
    {
        id: "daisangen",
        name: "大三元",
        reading: "ダイサンゲン",
        category: "yakuman",
        categoryLabel: "役満",
        han: null,
        description:
            "白・發・中の三元牌を、すべて刻子または槓子にする役満。",
        tiles: [
            "🀆", "🀆", "🀆",
            "🀅", "🀅", "🀅",
            "🀄", "🀄", "🀄",
            "🀇", "🀈", "🀉",
            "🀀", "🀀"
        ]
    },
    {
        id: "suuankou",
        name: "四暗刻",
        reading: "スーアンコウ",
        category: "yakuman",
        categoryLabel: "役満",
        han: null,
        description:
            "暗刻を4組そろえて完成させる役満。",
        tiles: [
            "🀇", "🀇", "🀇",
            "🀙", "🀙", "🀙",
            "🀐", "🀐", "🀐",
            "🀀", "🀀", "🀀",
            "🀄", "🀄"
        ]
    },
    {
        id: "tsuuiisou",
        name: "字一色",
        reading: "ツーイーソー",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "字牌だけで構成する役満。",
        tiles: [
            "🀀","🀀","🀀",
            "🀁","🀁","🀁",
            "🀂","🀂","🀂",
            "🀃","🀃","🀃",
            "🀄","🀄"
        ]
    },
    {
        id: "ryuuiisou",
        name: "緑一色",
        reading: "リューイーソー",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "緑色の牌だけで構成する役満。",
        tiles: [
            "🀑","🀒","🀓",
            "🀕","🀕","🀕",
            "🀖","🀖","🀖",
            "🀅","🀅","🀅",
            "🀘","🀘"
        ]
    },
    {
        id: "chinroutou",
        name: "清老頭",
        reading: "チンロウトウ",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "1・9牌だけで構成する役満。",
        tiles: [
            "🀇","🀇","🀇",
            "🀏","🀏","🀏",
            "🀙","🀙","🀙",
            "🀡","🀡","🀡",
            "🀐","🀐"
        ]
    },
    {
        id: "shousuushii",
        name: "小四喜",
        reading: "ショウスーシー",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "風牌3種類を刻子、残り1種類を雀頭にした役満。",
        tiles: [
            "🀀","🀀","🀀",
            "🀁","🀁","🀁",
            "🀂","🀂","🀂",
            "🀃","🀃",
            "🀄","🀄","🀄"
        ]
    },
    {
        id: "daisuushii",
        name: "大四喜",
        reading: "ダイスーシー",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "4種類すべての風牌を刻子にした役満。",
        tiles: [
            "🀀","🀀","🀀",
            "🀁","🀁","🀁",
            "🀂","🀂","🀂",
            "🀃","🀃","🀃",
            "🀄","🀄"
        ]
    },
    {
        id: "chuuren-poutou",
        name: "九蓮宝燈",
        reading: "チューレンポウトウ",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "同一種類の数牌だけで『1112345678999』を作る役満。",
        tiles: [
            "🀇","🀇","🀇",
            "🀈","🀉","🀊",
            "🀋","🀌","🀍",
            "🀎",
            "🀏","🀏","🀏",
            "🀋"
        ]
    },
    {
        id: "suukantsu",
        name: "四槓子",
        reading: "スーカンツ",
        type: "shape",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "4組すべてを槓子にした役満。（図鑑では3枚表示）",
        tiles: [
            "🀇","🀇","🀇",
            "🀙","🀙","🀙",
            "🀐","🀐","🀐",
            "🀄","🀄","🀄",
            "🀆","🀆"
        ]
    },
    {
        id: "tenhou",
        name: "天和",
        reading: "テンホウ",
        type: "situation",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "親が配牌時点で和了している役満。",
        tiles: [
            "🀇","🀈","🀉",
            "🀚","🀛","🀜",
            "🀑","🀒","🀓",
            "🀍","🀎","🀏",
            "🀘","🀘"
        ]
    },
    {
        id: "chiihou",
        name: "地和",
        reading: "チーホウ",
        type: "situation",
        category: "yakuman",
        categoryLabel: "役満",
        han: 13,
        description:
            "子が第一ツモで和了している役満。",
        tiles: [
            "🀇","🀈","🀉",
            "🀚","🀛","🀜",
            "🀑","🀒","🀓",
            "🀍","🀎","🀏",
            "🀘","🀘"
        ]
    },
];

const yakumanList = yakuList.filter(function (yaku) {
    return yaku.category === "yakuman";
});

const normalYakuList = yakuList.filter(function (yaku) {
    return yaku.category === "normal";
});

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

const collectionList = document.getElementById("collection");

const collectionCountElement = document.getElementById("collectionCount");

const flashEffect = document.getElementById("flashEffect");

const singleGachaResult = document.getElementById("singleGachaResult");

const yakumanResult = document.getElementById("yakumanResult");
const yakumanName = document.getElementById("yakumanName");
const yakumanTiles = document.getElementById("yakumanTiles");

const tileCollectionTab = document.getElementById("tileCollectionTab");
const yakumanCollectionTab = document.getElementById("yakumanCollectionTab");
const tileCollectionPanel = document.getElementById("tileCollectionPanel");
const yakumanCollectionPanel = document.getElementById("yakumanCollectionPanel");
const collectionCount = document.getElementById("collectionCount");

const yakumanCollection = document.getElementById("yakumanCollection");

const yakumanDetailModal = document.getElementById("yakumanDetailModal");
const yakumanDetailName = document.getElementById("yakumanDetailName");
const yakumanDetailTiles = document.getElementById("yakumanDetailTiles");
const closeYakumanDetailButton = document.getElementById("closeYakumanDetailButton");

const yakumanDetailCategory = document.getElementById("yakumanDetailCategory");
const yakumanDetailDescription = document.getElementById("yakumanDetailDescription");

const modalTileReading = document.getElementById("modalTileReading");
const yakumanDetailReading = document.getElementById("yakumanDetailReading");

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

const savedYakuCollection =
    JSON.parse(
        localStorage.getItem("mahjongYakuCollection")
    ) || [];

const collectedYaku =
    new Set(savedYakuCollection);

gachaButton.addEventListener("click", function () {
    drawSingleGacha();
});

function drawSingleGacha() {
    const result = drawGachaResult();

    tenGachaResult.style.display = "none";

    // 役満が出た場合
    if (result.type === "yaku") {
        yakumanFromTenGacha = false;

        singleGachaResult.style.display = "none";

        showYakuResult(result.yaku);
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
    gachaCount++;

    gachaCountElement.textContent = gachaCount;

    localStorage.setItem(
        "mahjongGachaCount",
        gachaCount
    );

    // ① まず役満を抽選
    const yakuman = getYakumanResult();

    if (yakuman) {
        addYakuToCollection(yakuman);
        updateHistory(yakuman);

        return {
            type: "yaku",
            yaku: yakuman
        };
    }

    // ② 次に一般役を抽選
    const normalYaku = getNormalYakuResult();

    if (normalYaku) {
        addYakuToCollection(normalYaku);
        updateHistory(normalYaku);

        return {
            type: "yaku",
            yaku: normalYaku
        };
    }

    // ③ どちらも外れたら通常牌
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
    const obtainedYaku = [];

    for (let i = 0; i < 10; i++) {
        const result = drawGachaResult();

        let item;

        // 役満が出た場合
        if (result.type === "yaku") {
            item = createTenYakuItem(
                result.yaku
            );

            obtainedYaku.push(
                result.yaku
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
    if (obtainedYaku.length > 0) {
        await wait(700);

        yakumanFromTenGacha = true;

        showYakuResult(
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

function createTenYakuItem(yaku) {
    const item = document.createElement("div");

    item.classList.add(
        "ten-gacha-item",
        "ten-yaku-item"
    );

    const yakuCard =
        document.createElement("div");

    yakuCard.classList.add(
        "ten-gacha-tile",
        "ten-yaku-tile"
    );

    if (yaku.category === "yakuman") {
        yakuCard.classList.add("yakuman");
    } else {
        yakuCard.classList.add("normal-yaku");
    }

    yakuCard.textContent =
        yaku.categoryLabel;

    const yakuNameText =
        document.createElement("p");

    yakuNameText.classList.add(
        "ten-yaku-name"
    );

    yakuNameText.textContent = yaku.name;

    item.appendChild(yakuCard);
    item.appendChild(yakuNameText);

    // ここを追加
    item.addEventListener("click", function () {
        openYakumanDetail(yaku);
    });

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
            li.dataset.category =
            item.categoryLabel;

            symbol.textContent = item.categoryLabel;
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

    updateTileCollectionCount();
}

//図鑑の保存
function saveCollection() {
    const collectionArray = Array.from(collectedTiles);

    localStorage.setItem(
        "mahjongCollection",
        JSON.stringify(collectionArray)
    );
}

//役の保存
function saveYakuCollection() {
    const yakuArray =
        Array.from(collectedYaku);

    localStorage.setItem(
        "mahjongYakuCollection",
        JSON.stringify(yakuArray)
    );
}

function addYakuToCollection(yaku) {
    collectedYaku.add(yaku.id);

    saveYakuCollection();
    updateYakuCollection();
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


//レア度を決める関数
function getRarity() {
    const randomNumber = Math.random() * 100;

    if (randomNumber < 5) {
        return "SSR";
    }

    if (randomNumber < 20) {
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

    modalTileReading.textContent = tile.reading;
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

//役図鑑詳細を開く関数
function openYakumanDetail(yaku) {
    yakumanDetailReading.textContent =
        yaku.reading;

    yakumanDetailName.textContent =
        yaku.name;

    yakumanDetailCategory.textContent =
        yaku.categoryLabel;

    yakumanDetailDescription.textContent =
        yaku.description;

    yakumanDetailTiles.innerHTML = "";

    yaku.tiles.forEach(function (symbol) {
        const tile =
            document.createElement("div");

        tile.classList.add(
            "yakuman-detail-tile"
        );

        tile.textContent = symbol;

        yakumanDetailTiles.appendChild(tile);
    });

    yakumanDetailModal.classList.add("open");
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
        yakumanDetailModal.classList.remove("open");
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


function getNormalYakuResult() {
    const randomNumber = Math.random() * 100;

    // テスト用：20％で一般役
    if (randomNumber >= 20) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * normalYakuList.length
    );

    return normalYakuList[randomIndex];
}

//役満
function getYakumanResult() {
    const randomNumber = Math.random() * 100;

    // テスト用：30％で役満
    if (randomNumber >= 10) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * yakumanList.length
    );

    return yakumanList[randomIndex];
}


function showYakuResult(yaku) {
    singleGachaResult.style.display = "none";
    tenGachaResult.style.display = "none";

    yakumanTiles.innerHTML = "";

    yakumanName.textContent = yaku.name;

    const label =
        document.querySelector(
            ".yakuman-result-label"
        );

    label.textContent =
        yaku.categoryLabel;

    yaku.tiles.forEach(function (symbol, index) {
        const tile =
            document.createElement("div");

        tile.classList.add("yakuman-tile");
        tile.textContent = symbol;

        tile.style.animationDelay =
            `${index * 0.05}s`;

        yakumanTiles.appendChild(tile);
    });

    yakumanResult.classList.remove(
        "normal-yaku-result",
        "yakuman-result-style"
    );

    if (yaku.category === "yakuman") {
        yakumanResult.classList.add(
            "yakuman-result-style"
        );
    } else {
        yakumanResult.classList.add(
            "normal-yaku-result"
        );
    }

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


//役満図鑑
function switchCollectionTab(tabName) {
    const isTileTab = tabName === "tile";

    tileCollectionTab.classList.toggle(
        "active",
        isTileTab
    );

    yakumanCollectionTab.classList.toggle(
        "active",
        !isTileTab
    );

    tileCollectionPanel.classList.toggle(
        "active",
        isTileTab
    );

    yakumanCollectionPanel.classList.toggle(
        "active",
        !isTileTab
    );

    if (isTileTab) {
        updateTileCollectionCount();
    } else {
        updateYakuCollectionCount();
    }
}

tileCollectionTab.addEventListener(
    "click",
    function () {
        switchCollectionTab("tile");
    }
);

yakumanCollectionTab.addEventListener(
    "click",
    function () {
        switchCollectionTab("yakuman");
    }
);


function updateTileCollectionCount() {
    collectionCount.textContent =
        `収集数：${collectedTiles.size} / ${mahjongTiles.length}`;
}

function updateYakuCollectionCount() {
    collectionCount.textContent =
        `収集数：${collectedYaku.size} / ${yakuList.length}`;
}

switchCollectionTab("tile");

function updateYakuCollection() {
    yakumanCollection.innerHTML = "";

    yakuList.forEach(function (yaku) {
        const item = document.createElement("div");

        item.classList.add("yakuman-collection-item");

        const isCollected =
            collectedYaku.has(yaku.id);

        if (isCollected) {
            item.addEventListener("click", function () {
                openYakumanDetail(yaku);
            });
        } else {
            item.classList.add("locked");
        }

        const topArea =
            document.createElement("div");

        topArea.classList.add(
            "yaku-collection-top"
        );

        const name =
            document.createElement("p");

        name.classList.add(
            "yakuman-collection-name"
        );

        const category =
            document.createElement("span");

        category.classList.add(
            "yaku-collection-category"
        );
        if (yaku.category === "yakuman") {
            category.classList.add("category-yakuman");
        } else if (yaku.han === 1) {
            category.classList.add("category-1han");
        } else if (yaku.han === 2) {
            category.classList.add("category-2han");
        } else {
            category.classList.add("category-high");
        }

        const tiles =
            document.createElement("div");

        tiles.classList.add(
            "yaku-collection-tiles"
        );

        const status =
            document.createElement("p");

        status.classList.add(
            "yakuman-collection-status"
        );

        if (isCollected) {
            name.textContent = yaku.name;
            category.textContent =
                yaku.categoryLabel;

            yaku.tiles.forEach(function (symbol) {
                const tile =
                    document.createElement("span");

                tile.classList.add(
                    "yaku-collection-tile"
                );

                tile.textContent = symbol;

                tiles.appendChild(tile);
            });

            status.textContent = "取得済み";
        } else {
            name.textContent = "？？？";
            category.textContent = "？";

            for (let i = 0; i < 14; i++) {
                const tile =
                    document.createElement("span");

                tile.classList.add(
                    "yaku-collection-tile",
                    "locked"
                );

                tile.textContent = "？";

                tiles.appendChild(tile);
            }

            status.textContent = "未取得";
        }

        topArea.appendChild(name);
        topArea.appendChild(category);

        item.appendChild(topArea);
        item.appendChild(tiles);
        item.appendChild(status);

        yakumanCollection.appendChild(item);
    });

    updateYakuCollectionCount();
}

updateCollection();
updateYakuCollection();
switchCollectionTab("tile");

//役の詳細を閉じる
closeYakumanDetailButton.addEventListener(
    "click",
    function () {
        yakumanDetailModal.classList.remove("open");
    }
);

yakumanDetailModal.addEventListener(
    "click",
    function (event) {
        if (event.target === yakumanDetailModal) {
            yakumanDetailModal.classList.remove("open");
        }
    }
);