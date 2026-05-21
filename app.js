const state = {
  points: 0,
  recoveryStep: 0,
  recordSelections: [],
  dailyHistory: [],
};

const DAILY_HISTORY_KEY = "dailyHistory";

const pointLabel = document.querySelector("#pointLabel");
const progressFill = document.querySelector("#progressFill");
const rewardText = document.querySelector("#rewardText");
const riskScore = document.querySelector("#riskScore");
const riskLevel = document.querySelector("#riskLevel");
const riskMessage = document.querySelector("#riskMessage");
const meterRing = document.querySelector(".meter-ring");
const toast = document.querySelector("#toast");
const historyDrawer = document.querySelector("#historyDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const historyList = document.querySelector("#historyList");
const historyPoints = document.querySelector("#historyPoints");
const summaryList = document.querySelector("#summaryList");
const emptySummary = document.querySelector("#emptySummary");
const clearHistoryButton = document.querySelector("#clearHistory");
const newsTags = document.querySelector("#newsTags");
const newsTitle = document.querySelector("#newsTitle");
const newsBody = document.querySelector("#newsBody");
const newsRefresh = document.querySelector("#newsRefresh");
const navButtons = document.querySelectorAll(".bottom-nav button");
const pagePanels = document.querySelectorAll(".page-panel");

const recordLabels = ["饮水情况", "运动情况", "睡眠情况", "饮酒情况", "饮食情况", "血压记录"];

const newsItems = [
  {
    tags: ["饮酒", "晚睡", "脑卒中风险"],
    title: "聚餐饮酒后突发脑卒中案例",
    body: "真实报道中，聚餐饮酒后出现言语不清、肢体异常，最终被诊断为急性脑卒中。对三高人群，饮酒和重口饭局不是普通放松。",
    action: "今晚不喝酒 +20",
  },
  {
    tags: ["高血压", "熬夜", "心梗风险"],
    title: "长期熬夜和应酬后突发心梗",
    body: "多起报道提到，高血压人群在应酬、熬夜、重口味饮食叠加后，可能出现胸闷、头晕等危险信号。身体不是突然出事，是长期透支后到达临界点。",
    action: "今晚早点睡 +20",
  },
  {
    tags: ["高尿酸", "啤酒", "痛风风险"],
    title: "啤酒海鲜后痛风反复发作",
    body: "高尿酸人群如果长期饮酒、吃高嘌呤食物，痛风可能反复发作，甚至影响关节和肾脏。痛风不是忍几天就过去的小事。",
    action: "今天不喝酒 +20",
  },
  {
    tags: ["宵夜", "高盐高油", "血压风险"],
    title: "熬夜夜宵让血压更难稳定",
    body: "晚睡后再吃重口味宵夜，会让身体在夜间继续承压。对血压、血糖、血脂异常的人来说，这不是奖励自己，而是在给第二天加负担。",
    action: "今晚不吃宵夜 +20",
  },
  {
    tags: ["甜饮", "血糖", "尿酸风险"],
    title: "甜饮不是水，会增加代谢负担",
    body: "含糖饮料会影响血糖管理，也可能增加尿酸和体重管理压力。口渴时最该补的是水，不是甜饮。",
    action: "今天不喝甜饮 +20",
  },
  {
    tags: ["白酒", "血压波动", "心脑血管"],
    title: "一场饭局后血压明显升高",
    body: "饮酒和高盐菜肴叠加时，血压更容易波动。对已经有高血压的人来说，饭局不是普通热闹，而是一次身体压力测试。",
    action: "今晚少喝一杯 +20",
  },
  {
    tags: ["熬夜", "报复性刷手机", "血糖"],
    title: "凌晨刷手机让第二天更难自控",
    body: "晚睡会影响第二天的食欲、精神和自控力。越累越想吃重口味，越疲惫越不想测指标，风险常常从这一晚开始叠加。",
    action: "今晚早点放下手机 +20",
  },
  {
    tags: ["痛风", "尿酸", "反复发作"],
    title: "痛风反复发作不是小毛病",
    body: "高尿酸长期不控制，可能让痛风从偶尔发作变成反复发作。疼痛只是提醒，真正要管住的是尿酸和生活方式。",
    action: "今天多喝水 +20",
  },
  {
    tags: ["甜饮", "奶茶", "血糖"],
    title: "奶茶不是奖励，是代谢负担",
    body: "甜饮会让血糖管理更难，也容易增加体重压力。对血糖异常的人来说，少喝一次甜饮，就是少给身体添一次乱。",
    action: "今天不喝奶茶 +20",
  },
  {
    tags: ["久坐", "血脂", "体重"],
    title: "久坐一天后，身体并没有休息",
    body: "久坐会影响体重、血脂和血糖管理。哪怕只是饭后走 10 分钟，也比一直坐着更能帮身体往回拉一点。",
    action: "饭后走 10 分钟 +20",
  },
  {
    tags: ["忘记服药", "高血压", "风险"],
    title: "血压药不能想起来才吃",
    body: "高血压管理最怕忽高忽低。忘记服药、饮酒、熬夜叠加时，血管承受的压力会更不稳定。",
    action: "检查今天是否服药 +20",
  },
  {
    tags: ["胸闷", "心慌", "就医"],
    title: "胸闷心慌不要硬扛",
    body: "如果出现胸痛、呼吸困难、持续心慌、冒冷汗等情况，不要只当作累了。尤其三高人群，危险信号要及时就医。",
    action: "今天关注身体信号 +20",
  },
  {
    tags: ["头痛", "口齿不清", "脑卒中"],
    title: "说话不清和肢体无力是危险信号",
    body: "突发口齿不清、肢体无力、剧烈头痛、面部歪斜，可能是脑卒中的警讯。不要睡一觉看看，要尽快就医。",
    action: "记住危险信号 +20",
  },
  {
    tags: ["宵夜", "泡面", "高盐"],
    title: "深夜泡面会让血压更难稳",
    body: "高盐宵夜会增加夜间身体负担。熬夜后再吃重盐食物，第二天血压和水肿都可能更难看。",
    action: "今晚不吃泡面 +20",
  },
  {
    tags: ["啤酒", "烧烤", "尿酸"],
    title: "啤酒烧烤是尿酸高危组合",
    body: "啤酒、烧烤、高嘌呤食物叠加，对高尿酸人群非常不友好。痛风往往不是突然来的，是一次次组合推出来的。",
    action: "今晚避开啤酒烧烤 +20",
  },
  {
    tags: ["熬夜", "能量饮料", "血压"],
    title: "靠能量饮料硬撑不是清醒",
    body: "熬夜后用高咖啡因饮料硬撑，可能让心率和血压更难稳定。身体需要休息，不是被强行唤醒。",
    action: "今天不喝能量饮料 +20",
  },
  {
    tags: ["应酬", "劝酒", "边界"],
    title: "不好意思拒酒，身体会替你付账",
    body: "很多人不是想喝，而是不好意思拒绝。可是别人劝的是一杯酒，身体承受的是血压、尿酸和睡眠的连锁反应。",
    action: "准备一句拒酒理由 +20",
  },
  {
    tags: ["血糖", "空腹", "监测"],
    title: "不测血糖不代表风险消失",
    body: "逃避记录只能让风险变得更模糊。测一次不是为了吓自己，是为了知道今天身体到底在什么位置。",
    action: "今天测一次指标 +20",
  },
  {
    tags: ["血压", "早晨", "记录"],
    title: "早晨血压值得认真看",
    body: "早晨血压偏高常常提示身体没有真正恢复。连续晚睡、饮酒后，更应该留意第二天的血压变化。",
    action: "早晨测一次血压 +20",
  },
  {
    tags: ["脂肪肝", "饮酒", "体检"],
    title: "脂肪肝不是体检单上的小字",
    body: "脂肪肝常和饮酒、体重、血脂、血糖管理有关。它不是一句注意饮食就结束，而是身体已经在提醒你。",
    action: "今天不饮酒 +20",
  },
  {
    tags: ["血脂", "油炸", "外卖"],
    title: "连续外卖会让血脂管理更难",
    body: "高油外卖吃多了，体重、血脂和血压都可能被影响。今天少油少盐一顿，就是给身体减一点负担。",
    action: "下一餐清淡一点 +20",
  },
  {
    tags: ["脱水", "饮水", "尿酸"],
    title: "水喝太少，尿酸更难排",
    body: "饮水不足会让身体更难维持稳定状态。高尿酸人群尤其要避免一整天几乎不喝水。",
    action: "现在喝一杯水 +20",
  },
  {
    tags: ["周末", "放纵", "反弹"],
    title: "周末不是身体的免责日",
    body: "很多风险不是工作日来的，而是周末连续饮酒、晚睡、宵夜叠加出来的。放松可以，别把底线也放掉。",
    action: "周末守住一次 +20",
  },
  {
    tags: ["情绪", "饮酒", "压力"],
    title: "想喝酒可能是想关掉压力",
    body: "压力大时喝酒，看起来能暂时放松，但也可能让睡眠、血压和第二天情绪更糟。先换一种方式缓一缓。",
    action: "先休息 10 分钟 +20",
  },
  {
    tags: ["低血糖", "糖尿病", "夜间"],
    title: "糖尿病人熬夜要警惕低血糖",
    body: "作息混乱、饮酒、吃饭不规律，都会让血糖波动更难预测。头晕、出汗、心慌时不要硬撑。",
    action: "今天规律吃饭 +20",
  },
  {
    tags: ["睡眠", "血压", "恢复"],
    title: "睡够不等于睡得健康",
    body: "凌晨两三点才睡，即使睡到很晚，身体节律也可能被打乱。早睡不是形式，是给血压和代谢一个恢复窗口。",
    action: "今晚提前 30 分钟睡 +20",
  },
  {
    tags: ["痛风", "止痛药", "误区"],
    title: "止痛不等于尿酸控制住了",
    body: "痛风疼痛缓解后，如果继续饮酒、宵夜、高嘌呤饮食，下一次发作可能还会来。别只管痛，要管原因。",
    action: "今天守住饮食 +20",
  },
  {
    tags: ["家人", "担心", "健康"],
    title: "你的一次放纵，家人会一直担心",
    body: "对爸爸来说可能只是今晚喝多了，对咩咩来说，是担心你明天会不会难受、指标会不会更差。",
    action: "为咩咩守住一次 +20",
  },
  {
    tags: ["体重", "血压", "血糖"],
    title: "体重上升会推高一串风险",
    body: "体重不是外表问题，它常常牵动血压、血糖、血脂和尿酸。少一次宵夜，就是一次往回拉。",
    action: "今晚不加餐 +20",
  },
  {
    tags: ["酒后睡眠", "打鼾", "恢复"],
    title: "酒后睡着不代表休息好了",
    body: "酒后可能更快入睡，但睡眠质量往往下降，夜间醒来、口渴、第二天疲惫都可能更明显。",
    action: "今晚不酒后入睡 +20",
  },
  {
    tags: ["高血压", "浓茶", "咖啡"],
    title: "深夜浓茶咖啡会打乱睡眠",
    body: "晚上靠浓茶咖啡撑着，会让入睡更晚，也可能影响心率和血压感受。别用明天的状态换今晚的清醒。",
    action: "晚上不喝浓茶咖啡 +20",
  },
  {
    tags: ["外卖", "重盐", "水肿"],
    title: "重盐外卖会让第二天更难受",
    body: "重盐饮食可能让口渴、水肿和血压管理都变差。今天吃清淡一点，不是委屈，是在给身体松绑。",
    action: "下一餐少盐 +20",
  },
  {
    tags: ["运动", "饭后", "血糖"],
    title: "饭后走一走，比躺下刷手机更有用",
    body: "饭后轻度活动能帮助身体从餐后负担中恢复。不要追求剧烈运动，先从走 10 分钟开始。",
    action: "饭后走一走 +20",
  },
  {
    tags: ["复查", "指标", "逃避"],
    title: "体检异常不能靠不看来解决",
    body: "指标异常不是判决书，而是提醒你还有机会调整。真正危险的是明知道异常却继续放任。",
    action: "本周安排复查记录 +20",
  },
  {
    tags: ["酒局", "离场", "边界"],
    title: "早点离场不是扫兴，是自救",
    body: "很多失控发生在后半场。早点离开饭局，可能就是挡下下一杯酒、下一顿宵夜和下一次晚睡。",
    action: "今晚早点回家 +20",
  },
  {
    tags: ["头晕", "血压", "测量"],
    title: "头晕时先别猜，测一下",
    body: "头晕可能来自睡眠、血压、血糖等多种原因。测一次指标，比靠感觉判断更靠谱。",
    action: "不舒服先测指标 +20",
  },
  {
    tags: ["高尿酸", "火锅", "浓汤"],
    title: "火锅浓汤不是普通汤",
    body: "高尿酸人群要小心浓汤、动物内脏、酒精等组合。吃得开心可以，但别把风险全部叠满。",
    action: "今天避开浓汤 +20",
  },
  {
    tags: ["血脂", "夜宵", "甘油三酯"],
    title: "夜宵会让血脂管理更难",
    body: "长期夜宵、高油饮食会给血脂和体重增加压力。晚上的一口爽，可能换来体检单上的难看数字。",
    action: "今晚不点外卖 +20",
  },
  {
    tags: ["睡前", "刷牙", "宵夜"],
    title: "想吃宵夜时，先刷牙",
    body: "冲动常常只持续一阵。刷牙、喝水、离开外卖页面，都是把自己从宵夜里拉回来的小动作。",
    action: "现在先刷牙 +20",
  },
  {
    tags: ["饮酒", "药物", "风险"],
    title: "吃药期间更不能随便喝酒",
    body: "很多药物和酒精不适合同时出现。正在服药的人，饭局前更应该把不喝酒当成底线。",
    action: "服药期不喝酒 +20",
  },
  {
    tags: ["血压", "情绪", "争吵"],
    title: "情绪上头时血压也可能上头",
    body: "压力、争吵、熬夜和饮酒都可能影响血压稳定。先让自己停一下，比继续硬顶更重要。",
    action: "先深呼吸 1 分钟 +20",
  },
  {
    tags: ["清晨", "胸痛", "急救"],
    title: "清晨胸痛不要拖",
    body: "清晨是心脑血管事件需要格外警惕的时段。胸痛、气短、冷汗等信号出现时，要及时求助。",
    action: "记住急救信号 +20",
  },
  {
    tags: ["家庭", "陪伴", "坚持"],
    title: "少喝一次，咩咩就少担心一次",
    body: "改变不一定要轰轰烈烈。今天少喝一次、早点睡一次、测一次血压，都是在让家人安心。",
    action: "今天让咩咩安心 +20",
  },
  {
    tags: ["早餐", "血糖", "规律"],
    title: "不吃早餐也会打乱节奏",
    body: "作息混乱后再不吃早餐，血糖和食欲更容易失控。规律一点，是给身体重新排队。",
    action: "明早吃点清淡早餐 +20",
  },
  {
    tags: ["饮水", "酒后", "止损"],
    title: "酒后第二天先做止损",
    body: "如果昨晚已经喝了，今天不要继续重口味和熬夜。先喝水、测血压、吃清淡一点，把损失截住。",
    action: "今天先止损 +20",
  },
  {
    tags: ["步数", "久坐", "循环"],
    title: "一天几乎不动，身体会更沉",
    body: "长时间坐着会让身体越来越不想动。先站起来走几分钟，不是运动任务，是给身体一个启动信号。",
    action: "现在站起来走走 +20",
  },
  {
    tags: ["高血糖", "甜食", "疲惫"],
    title: "累的时候最容易想吃甜的",
    body: "疲惫会让人更想靠甜食补偿，但血糖异常的人要尤其小心。先休息和喝水，再决定要不要吃。",
    action: "先喝水再决定 +20",
  },
  {
    tags: ["痛风", "脚痛", "预警"],
    title: "脚趾疼可能是尿酸在提醒",
    body: "关节疼痛、红肿、发热时，不要只想着忍过去。高尿酸人群要把这些当成身体报警。",
    action: "今天避开酒和海鲜 +20",
  },
  {
    tags: ["睡眠", "连续晚睡", "风险"],
    title: "连续晚睡比偶尔一次更危险",
    body: "真正伤身体的往往不是某一天，而是连续几天重复。今天早点睡，就是把连续风险切断。",
    action: "今晚切断连续晚睡 +20",
  },
  {
    tags: ["复诊", "医生", "记录"],
    title: "给医生看的不是感觉，是记录",
    body: "复诊时只说最近还行不够。血压、睡眠、饮酒、饮食这些记录，能帮医生更准确判断。",
    action: "今天完成记录 +20",
  },
  {
    tags: ["无糖", "替代", "选择"],
    title: "想喝饮料时，先换无糖",
    body: "改变不一定一步到位。把含糖饮料换成无糖或水，就是一个现实的小胜利。",
    action: "今天选无糖 +20",
  },
  {
    tags: ["应酬", "宵夜", "二次伤害"],
    title: "饭局后的宵夜是二次加码",
    body: "喝酒后再吃宵夜，会把风险继续往上叠。饭局结束后直接回家，是很有价值的一次刹车。",
    action: "饭局后直接回家 +20",
  },
  {
    tags: ["血压计", "家庭", "监测"],
    title: "家里有血压计，就别让它闲着",
    body: "血压不是靠感觉猜的。定期测量能让你更早发现变化，也能让家人少一点担心。",
    action: "今天测一次血压 +20",
  },
  {
    tags: ["口渴", "高血糖", "信号"],
    title: "总是口渴别只怪天气",
    body: "频繁口渴、乏力、尿多等情况，可能和血糖管理有关。身体信号反复出现时，别忽略。",
    action: "留意今天身体信号 +20",
  },
  {
    tags: ["奖励", "家人", "坚持"],
    title: "咩咩的奖励不是交易，是在乎",
    body: "你守住几天，咩咩不是因为分数开心，而是因为你愿意认真照顾自己。这个比任何积分都重要。",
    action: "今天继续守住 +20",
  },
];

let newsIndex = 0;

function renderNews() {
  const item = newsItems[newsIndex];
  newsTags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
  newsTitle.textContent = item.title;
  newsBody.textContent = item.body;
  document.querySelector("#newsAction").textContent = item.action;
}

function refreshNews() {
  newsIndex = (newsIndex + 1) % newsItems.length;
  renderNews();
}

function showPage(pageId) {
  pagePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === pageId);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === pageId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateRewardProgress() {
  pointLabel.textContent = `${state.points} / 100`;
  progressFill.style.width = `${Math.min(100, state.points)}%`;

  if (state.points >= 100) {
    rewardText.textContent = "可以解锁一周奖励：咩咩准备的爱心礼物一份！";
  } else {
    rewardText.textContent = `还差 ${100 - state.points} 守住值，可解锁“一周奖励”。`;
  }
}

const riskRules = [
  { match: "偏少", points: 6 },
  { match: "几乎没喝水", points: 10 },
  { match: "久坐", points: 8 },
  { match: "未运动", points: 6 },
  { match: "00:00-01:00", points: 10 },
  { match: "01:00-02:00", points: 16 },
  { match: "02:00-03:00", points: 22 },
  { match: "03:00 以后", points: 28 },
  { match: "喝了一点", points: 14 },
  { match: "喝多了", points: 26 },
  { match: "可能会喝", points: 12 },
  { match: "重口味", points: 10 },
  { match: "宵夜", points: 12 },
  { match: "甜饮", points: 10 },
  { match: "偏高", points: 18 },
  { match: "还没测", points: 5 },
];

function calculateRiskScore() {
  const baseScore = 28;
  const extraScore = state.recordSelections.filter(Boolean).reduce((total, item) => {
    const rule = riskRules.find((riskRule) => item.value.includes(riskRule.match));
    return total + (rule ? rule.points : 0);
  }, 0);

  return Math.min(98, baseScore + extraScore);
}

function getRiskInfo(score) {
  if (score < 40) {
    return {
      color: "#24745a",
      level: "低负担",
      message: "今天整体守得不错，继续保持，咩咩会很安心。",
    };
  }

  if (score < 60) {
    return {
      color: "#e7a737",
      level: "需要注意",
      message: "今天有一些小风险，先守住饮水、睡眠和别加宵夜。",
    };
  }

  if (score < 80) {
    return {
      color: "#e36f3d",
      level: "中等偏高",
      message: "今天身体负担偏高，血压、尿酸和睡眠都需要收一收。",
    };
  }

  return {
    color: "#bd3e36",
    level: "高风险",
    message: "今天风险已经很高，别再饮酒和熬夜了，咩咩真的会担心。",
  };
}

function updateRiskMeter() {
  const score = calculateRiskScore();
  const riskInfo = getRiskInfo(score);
  riskScore.textContent = score;
  riskLevel.textContent = riskInfo.level;
  riskMessage.textContent = riskInfo.message;
  meterRing.style.background = `conic-gradient(${riskInfo.color} 0 ${score}%, rgba(255, 255, 255, 0.2) ${score}% 100%)`;
}

function getTodayLabel() {
  return new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function loadDailyHistory() {
  try {
    const saved = localStorage.getItem(DAILY_HISTORY_KEY);
    state.dailyHistory = saved ? JSON.parse(saved) : [];
  } catch (error) {
    state.dailyHistory = [];
  }
}

function persistDailyHistory() {
  try {
    localStorage.setItem(DAILY_HISTORY_KEY, JSON.stringify(state.dailyHistory));
  } catch (error) {
    showToast("当前浏览器无法长期保存历史记录。");
  }
}

function renderSummary() {
  if (!state.recordSelections.length) {
    emptySummary.style.display = "block";
    summaryList.innerHTML = "";
    return;
  }

  emptySummary.style.display = "none";
  summaryList.innerHTML = state.recordSelections
    .map(
      (item) => `
        <li>
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </li>
      `
    )
    .join("");
}

function renderHistory() {
  historyPoints.textContent = state.points;
  if (!state.dailyHistory.length) {
    historyList.innerHTML = `
        <article>
          <time>${getTodayLabel()}</time>
          <strong>还没有完整记录</strong>
          <p>完成今日记录后，这里会按天保存所有选择项。</p>
        </article>
      `;
    return;
  }

  historyList.innerHTML = state.dailyHistory
    .map((day) => {
      const selections = day.selections
        .map(
          (item) => `
            <li>
              <span>${item.label}</span>
              <b>${item.value}</b>
            </li>
          `
        )
        .join("");

      return `
        <article>
          <time>${day.date}</time>
          <strong>今日记录</strong>
          <ul class="history-record">${selections}</ul>
        </article>
      `;
    })
    .join("");
}

function saveDailyHistory() {
  const selections = state.recordSelections.filter(Boolean);
  if (selections.length < recordLabels.length) {
    return;
  }

  const date = getTodayLabel();
  const record = { date, selections };
  const existingIndex = state.dailyHistory.findIndex((day) => day.date === date);

  if (existingIndex >= 0) {
    state.dailyHistory[existingIndex] = record;
  } else {
    state.dailyHistory.unshift(record);
  }

  state.dailyHistory = state.dailyHistory.slice(0, 30);
  persistDailyHistory();
  renderHistory();
}

function clearDailyHistory() {
  state.dailyHistory = [];
  try {
    localStorage.removeItem(DAILY_HISTORY_KEY);
  } catch (error) {
    showToast("当前浏览器无法清除历史记录。");
    return;
  }
  renderHistory();
  showToast("历史记录已清除。");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function addPoints(points, message) {
  state.points = Math.min(140, state.points + points);
  updateRewardProgress();
  showToast(message);
  renderHistory();
}

document.querySelectorAll("#todayChoices button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#todayChoices button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    addPoints(Number(button.dataset.points), `已选择：${button.textContent}，守住值增加。`);
  });
});

document.querySelectorAll(".question .pill-list button").forEach((button) => {
  button.addEventListener("click", () => {
    const current = document.querySelector(`.question[data-step="${state.recoveryStep}"]`);
    state.recordSelections[state.recoveryStep] = {
      label: recordLabels[state.recoveryStep],
      value: button.textContent,
    };
    renderSummary();
    updateRiskMeter();
    current.classList.remove("active");
    state.recoveryStep += 1;
    const next = document.querySelector(`.question[data-step="${state.recoveryStep}"]`);

    if (next) {
      next.classList.add("active");
      showToast(`已选择：${button.textContent}`);
      return;
    }

    document.querySelector("#flowDone").classList.add("show");
    addPoints(10, "今日记录完成，+10 守住值。");
    saveDailyHistory();
  });
});

document.querySelector("#newsAction").addEventListener("click", () => {
  addPoints(20, "你选择了今晚不喝酒，+20 守住值。");
});

newsRefresh.addEventListener("click", refreshNews);

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.target);
  });
});

document.querySelector("#redeemBtn").addEventListener("click", () => {
  if (state.points < 100) {
    showToast(`还差 ${100 - state.points} 守住值。再守住几次，就能解锁咩咩的小礼物。`);
    return;
  }

  state.points -= 100;
  updateRewardProgress();
  rewardText.textContent = "一周奖励已解锁：咩咩准备的爱心礼物一份！";
  showToast("一周奖励已解锁。");
});

function openHistory() {
  historyDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
}

function closeHistory() {
  historyDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
}

document.querySelector("#historyOpen").addEventListener("click", openHistory);
document.querySelector("#historyClose").addEventListener("click", closeHistory);
clearHistoryButton.addEventListener("click", clearDailyHistory);
drawerBackdrop.addEventListener("click", closeHistory);
loadDailyHistory();
updateRewardProgress();
updateRiskMeter();
renderNews();
renderHistory();
renderSummary();
showPage("todayPage");
