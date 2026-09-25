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
  ]

};


let currentCategory = "";

const categoryInfo = {

  "餐饮": {
    title: "🍜 今日美食推荐",
    tip: "享受一顿美味，给生活一点仪式感"
  },

  "旅游": {
    title: "🏝 今日探索地点",
    tip: "出去走走，发现身边的新风景"
  },

  "手工": {
    title: "🎨 今日创作灵感",
    tip: "动手创造属于自己的作品"
  },

  "游戏": {
    title: "🎮 今日娱乐推荐",
    tip: "放松一下，享受游戏时间"
  },

  "购物": {
    title: "🛍 今日购物选择",
    tip: "发现喜欢的物品，提升生活品质"
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

  const historyList =
  document.getElementById("historyList");


  historyData.forEach(function(item){

    const li =
    document.createElement("li");


    li.innerText = item;


    historyList.appendChild(li);

  });

});

function randomAll(){


  const categories =
  Object.keys(data);


  const randomCategory =
  categories[
    Math.floor(
      Math.random()*categories.length
    )
  ];


  currentCategory =
  randomCategory;


  document.getElementById(
    "categoryText"
  ).innerText =
  "当前类别：" + randomCategory;


  document.getElementById(
    "resultTitle"
  ).innerText =
  categoryInfo[randomCategory].title;


  document.getElementById(
    "resultTip"
  ).innerText =
  categoryInfo[randomCategory].tip;


 showItems();


document.querySelector(".result-box").scrollIntoView({
  behavior:"smooth",
  block:"start"
});


setTimeout(function(){

  drawItem();

},500);


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