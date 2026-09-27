const data = {

  "餐饮": [
    "火锅",
    "烤肉",
    "海鲜料理",
    "汉堡快餐",
    "盖浇饭",
    "川菜",
    "鱼类料理",
    "牛肉料理",
    "地方特色小吃",
    "家常炒菜",
    "麻辣烫",
    "冒菜"
  ],

  "旅游": [
    "博物馆",
    "爬山徒步",
    "城市公园",
    "海边游玩",
    "动物园",
    "游乐场",
    "城市特色景点",
    "寺庙古刹",
    "古城古镇",
    "文创街区"
  ],

  "手工": [
    "拼豆",
    "非遗文化体验",
    "陶艺制作",
    "黏土创作",
    "折纸",
    "编织与缝纫",
    "解压手工",
    "手账制作",
    "模型制作",
    "海报/相框DIY",
    "玩偶制作",
    "创意玩具制作"
  ],

  "游戏": [
    "动作游戏",
    "冒险探索",
    "角色扮演",
    "策略游戏",
    "射击游戏",
    "模拟游戏",
    "竞技对战",
    "模拟经营",
    "益智解谜",
    "生存挑战"
  ],

  "购物": [
    "衣服",
    "饰品",
    "零食食品",
    "鞋子",
    "化妆品",
    "护肤品",
    "日用品",
    "艺术品与收藏品",
    "书籍或知识产品",
    "虚拟商品"
  ],

"爱好": [
    "摄影",
    "阅读",
    "听音乐",
    "看电影",
    "运动健身",
    "绘画",
    "书法练习",
    "养花种植",
    "学习乐器",
    "旅行规划",
    "写作创作",
    "收藏爱好"
]

};


let currentCategory = "";

let categoryInfo = {

  "餐饮": {
    icon: "🍜",
    title: "🍜 今日美食推荐",
    tip: "享受一顿美味，给生活一点仪式感",
    subtitle: "美食探索"
  },

  "旅游": {
    icon: "🏝️",
    title: "🏝️ 今日探索地点",
    tip: "出去走走，发现身边的新风景",
    subtitle: "发现风景"
  },

  "手工": {
    icon: "🎨",
    title: "🎨 今日创作灵感",
    tip: "动手创造属于自己的作品",
    subtitle: "创造乐趣"
  },

  "游戏": {
    icon: "🎮",
    title: "🎮 今日娱乐推荐",
    tip: "放松一下，享受游戏时间",
    subtitle: "休闲挑战"
  },

  "购物": {
    icon: "🛍️",
    title: "🛍️ 今日购物选择",
    tip: "发现喜欢的物品，提升生活品质",
    subtitle: "发现好物"
  },

  "爱好": {
    icon: "🌈",
    title: "🌈 今日兴趣推荐",
    tip: "探索喜欢的事情，丰富生活体验",
    subtitle: "探索兴趣"
  }

};

let historyData = [];

let savedHistory =
localStorage.getItem("historyData");


if(savedHistory){

 historyData =
 JSON.parse(savedHistory);

}

let usedItems = [];

// 从浏览器读取保存的数据
let savedData =
localStorage.getItem("drawData");


if(savedData){

  Object.assign(
    data,
    JSON.parse(savedData)
  );

}

let savedCategoryInfo =
  localStorage.getItem("categoryInfo");

if (savedCategoryInfo) {

  categoryInfo =
    JSON.parse(savedCategoryInfo);

}

let originalData = JSON.parse(JSON.stringify(data));

function chooseCategory(category, button) {

  currentCategory = category;

  const resultCard =
  document.querySelector(".result-card");

resultCard.classList.remove(
  "food-card",
  "travel-card",
  "craft-card",
  "game-card",
  "shop-card"
);

const cardClassMap = {
  "餐饮": "food-card",
  "旅游": "travel-card",
  "手工": "craft-card",
  "游戏": "game-card",
  "购物": "shop-card"
};

resultCard.classList.add(
  cardClassMap[category]
);

  document
  .querySelectorAll(".category-btn")
  .forEach(function(btn) {
    btn.classList.remove("active");
  });

button.classList.add("active");

  document.getElementById("categoryText").innerText =
    "当前类别：" + category;

  document.getElementById("result").innerText =
    "？";

  document.getElementById("drawButton").disabled =
    false;

document.getElementById("resultTitle").innerText =
categoryInfo[category].title;


document.getElementById("resultTip").innerText =
categoryInfo[category].tip;

     showItems();

document.querySelector(".result-box").scrollIntoView({
  behavior: "smooth",
  block: "start"
});

}

function drawItem() {

  if (!currentCategory) {
    return;
  }

  const items = data[currentCategory];

  let availableItems = items;

  const drawButton =
  document.getElementById("drawButton");

const resultBox =
  document.getElementById("result");

drawButton.disabled = true;
drawButton.classList.add("drawing");
drawButton.innerText = "🎲 正在抽取...";

  let count = 0;

  const timer = setInterval(function () {

    const randomIndex =
       Math.floor(Math.random() * availableItems.length);

    document.getElementById("result").innerText =
      items[randomIndex];

    count++;

    if (count > 20) {

      clearInterval(timer);

      const finalIndex =
         Math.floor(Math.random() * availableItems.length);

      const finalResult =
availableItems[finalIndex];

const modeElement =
  document.querySelector(
    'input[name="mode"]:checked'
  );


const mode =
  modeElement ? modeElement.value : "repeat";

if (mode === "once") {

  const index =
    data[currentCategory].indexOf(finalResult);

  data[currentCategory].splice(index, 1);

  saveData();

  showItems();

}

   resultBox.innerText =
"🎉 " + finalResult;




// 开启分享按钮
const shareButton =
  document.getElementById("shareButton");

if (shareButton) {
  shareButton.disabled = false;
}


// 添加历史记录
addHistory(finalResult);


// 播放结果动画
resultBox.classList.remove("result-pop");

void resultBox.offsetWidth;

resultBox.classList.add("result-pop");


drawButton.disabled = false;
drawButton.classList.remove("drawing");
drawButton.innerText = "🎲 再抽一次";  

      
    }

  }, 100);

}

function addHistory(result) {

  const historyList =
    document.getElementById("historyList");

  const li =
    document.createElement("li");

  const now =
    new Date();

  const time =
    now.toLocaleTimeString();

  li.innerText =
    time + "  " +
    currentCategory +
    "：" +
    result;

  historyList.prepend(li);

historyData.unshift(
  li.innerText
);


localStorage.setItem(
 "historyData",
 JSON.stringify(historyData)
);

}

function clearHistory() {

  document.getElementById("historyList").innerHTML = "";

  historyData = [];

  localStorage.removeItem("historyData");

}

function addItem(){

  const input =
  document.getElementById("newItem");


  const value =
  input.value.trim();


  if(value === ""){

    alert("请输入内容");

    return;

  }


  if(!currentCategory){

    alert("请先选择类别");

    return;

  }


  data[currentCategory].push(value);

  saveData();

  showItems();

  alert(
    "添加成功：" + value
  );


  input.value="";

}

function showItems(){

  const list =
  document.getElementById("itemList");


  list.innerHTML="";


  if(!currentCategory){

    return;

  }


  data[currentCategory].forEach(function(item,index){


    const li =
    document.createElement("li");


    li.innerHTML =
    item +
    " <button onclick='deleteItem("+
    index+
    ")'>删除</button>";


    list.appendChild(li);


  });


}

function deleteItem(index){


  data[currentCategory].splice(index,1);

  saveData();

  showItems();


}

function resetItems(){

  if(!currentCategory){

    alert("请先选择类别");

    return;

  }


  data[currentCategory] =
  JSON.parse(
    JSON.stringify(
      originalData[currentCategory]
    )
  );

  saveData();

  showItems();


  document.getElementById("drawButton").disabled =
  false;


  alert("签库恢复成功");

}

function saveData(){

  localStorage.setItem(
    "drawData",
    JSON.stringify(data)
  );

}

window.addEventListener("load", function(){

   renderCategories();

  const historyList =
  document.getElementById("historyList");


  historyData.forEach(function(item){

    const li =
    document.createElement("li");


    li.innerText = item;


    historyList.appendChild(li);

  });

});

function randomAll() {

  // 只获取有签内容的类别
  const categories = Object.keys(data).filter(function(category) {

    return data[category] &&
           data[category].length > 0;

  });


  // 如果所有类别都没有内容
  if (categories.length === 0) {

    alert("目前没有可以抽取的内容，请先添加一些签。");

    return;

  }


  // 随机选择类别
  const randomCategory =
    categories[
      Math.floor(
        Math.random() * categories.length
      )
    ];


  // 设置当前类别
  currentCategory = randomCategory;


  // 显示当前类别
  document.getElementById(
    "categoryText"
  ).innerText =
    "当前类别：" + randomCategory;


  // 更新结果卡片
  if (categoryInfo[randomCategory]) {

    document.getElementById(
      "resultTitle"
    ).innerText =
      categoryInfo[randomCategory].title;


    document.getElementById(
      "resultTip"
    ).innerText =
      categoryInfo[randomCategory].tip;


    // 更新图标
    if (categoryInfo[randomCategory].icon) {

      document.getElementById(
        "resultIcon"
      ).innerText =
        categoryInfo[randomCategory].icon;

    }

  } else {

    document.getElementById(
      "resultTitle"
    ).innerText =
      "今日灵感";


    document.getElementById(
      "resultTip"
    ).innerText =
      "让随机帮你发现新的可能";

  }


  // 显示当前类别的签库
  showItems();


  // 启用抽签按钮
  document.getElementById(
    "drawButton"
  ).disabled = false;


  // 滚动到结果区域
  const resultBox =
    document.querySelector(".result-box");


  if (resultBox) {

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  // 等待滚动后自动抽签
  setTimeout(function() {

    drawItem();

  }, 500);

}

function shareResult() {

  if (!currentCategory) {
    alert("请先完成一次抽签");
    return;
  }

  const result =
    document.getElementById("result").innerText;

  const title =
    document.getElementById("resultTitle").innerText;

  const tip =
    document.getElementById("resultTip").innerText;


  const shareText =
    "✨ 今日灵感\n\n" +
    title + "\n\n" +
    result + "\n\n" +
    tip;


  if (navigator.share) {

    navigator.share({
      title: "今日灵感",
      text: shareText
    });

  } else {

    navigator.clipboard
      .writeText(shareText)
      .then(function () {

        alert("结果已复制，可以粘贴分享给朋友啦！");

      });

  }

}

function saveCategoryInfo() {

  localStorage.setItem(
    "categoryInfo",
    JSON.stringify(categoryInfo)
  );

}

function renderCategories() {

  const categoryList =
    document.getElementById("categoryList");

  categoryList.innerHTML = "";


  Object.keys(data).forEach(function(category) {

    const button =
      document.createElement("button");


    button.className =
      "category-btn";


    const info =
      categoryInfo[category];


    const icon =
      info && info.icon
        ? info.icon
        : "✨";


    const subtitle =
      info && info.subtitle
        ? info.subtitle
        : "随机探索";


    button.innerHTML = `
      <span>${icon}</span>
      <strong>${category}</strong>
      <small>${subtitle}</small>
    `;


    button.onclick = function() {

      chooseCategory(
        category,
        button
      );

    };


    categoryList.appendChild(button);

  });

}

function addCategory() {

  const nameInput =
    document.getElementById("newCategoryName");

  const iconInput =
    document.getElementById("newCategoryIcon");


  const name =
    nameInput.value.trim();

  const icon =
    iconInput.value.trim() || "✨";


  if (name === "") {

    alert("请输入类别名称");

    return;

  }


  if (data[name]) {

    alert("这个类别已经存在啦");

    return;

  }


  // 创建空签库
  data[name] = [];


  // 创建类别信息
  categoryInfo[name] = {

    icon: icon,

    title:
      icon + " 今日" + name + "推荐",

    tip:
      "让随机帮你发现新的" +
      name +
      "灵感",

    subtitle:
      "随机探索"

  };


  saveData();

  saveCategoryInfo();


  renderCategories();


  nameInput.value = "";

  iconInput.value = "";


  alert(
    "类别“" +
    name +
    "”添加成功！"
  );

}