const STORAGE_KEYS = {
  shopping: "birthdayChecklist.v1.checked",
  cooking: "birthdayChecklist.v1.cooking",
  mode: "birthdayChecklist.v1.mode",
};

const MODES = {
  shopping: {
    subtitle: "15 человек + ребёнок",
    progressLabel: "куплено",
    listLabel: "Список покупок",
    emptyState: "Нет позиций для выбранного фильтра.",
    resetConfirm: "Сбросить все отметки в checklist?",
    resetEmpty: "Пока нечего сбрасывать.",
    resetDone: "Отметки сброшены.",
  },
  cooking: {
    subtitle: "План готовки на месте",
    progressLabel: "готово",
    listLabel: "План приготовления",
    emptyState: "Нет этапов для выбранного фильтра.",
    resetConfirm: "Сбросить прогресс готовки?",
    resetEmpty: "Пока нечего сбрасывать.",
    resetDone: "Прогресс готовки сброшен.",
  },
};

const FILTERS = {
  shopping: [
    { id: "all", label: "Все" },
    { id: "remaining", label: "Осталось" },
    { id: "done", label: "Куплено" },
  ],
  cooking: [
    { id: "all", label: "Все" },
    { id: "remaining", label: "Осталось" },
    { id: "done", label: "Готово" },
  ],
};

const ROLES = {
  me: { label: "Я", className: "me" },
  her: { label: "Девушка", className: "her" },
  both: { label: "Оба", className: "both" },
};

const SHOPPING_GROUPS = [
  {
    id: "meat",
    title: "Мясо, курица, креветки",
    icon: "🥩",
    items: [
      { id: "pork-neck", name: "Свиная шейка", quantity: "4 кг" },
      { id: "chicken-legs", name: "Куриные ножки", quantity: "3–3,5 кг" },
      { id: "chicken-breast", name: "Куриная грудка для 6 шаурм", quantity: "1–1,2 кг" },
      {
        id: "shrimp",
        name: "Креветки для цезаря",
        quantity: "1,2–1,5 кг очищенных / 2–2,5 кг неочищенных",
      },
    ],
  },
  {
    id: "vegetables",
    title: "Овощи",
    icon: "🥕",
    items: [
      { id: "potatoes", name: "Картошка", quantity: "5 кг" },
      { id: "zucchini", name: "Кабачки", quantity: "2 кг" },
      { id: "mushrooms", name: "Грибы", quantity: "2 кг" },
      { id: "eggplants", name: "Баклажаны", quantity: "2 шт" },
      { id: "tomatoes", name: "Помидоры", quantity: "3,5–4 кг" },
      { id: "cucumbers", name: "Огурцы свежие", quantity: "2,5–3 кг" },
      { id: "cabbage", name: "Капуста для шаурмы", quantity: "500–700 г" },
      { id: "pickles", name: "Огурцы маринованные", quantity: "300–400 г" },
      { id: "onion", name: "Лук", quantity: "2 кг" },
      { id: "garlic", name: "Чеснок", quantity: "3–4 головки" },
      { id: "lemons", name: "Лимоны", quantity: "5–6 шт" },
      { id: "greens", name: "Зелень", quantity: "5–6 пучков" },
      { id: "romaine", name: "Романо/айсберг для цезаря", quantity: "1,2–1,5 кг" },
    ],
  },
  {
    id: "bread-cheese",
    title: "Лаваш, хлеб, сыр",
    icon: "🧀",
    items: [
      { id: "lavash", name: "Лаваш тонкий", quantity: "7–8 листов" },
      { id: "bread", name: "Хлеб/батон/багет", quantity: "2–3 шт" },
      { id: "parmesan", name: "Пармезан/твёрдый сыр для цезаря", quantity: "300–400 г" },
      { id: "snack-cheese", name: "Сыр для нарезки/закуски", quantity: "700 г – 1 кг" },
    ],
  },
  {
    id: "marinades",
    title: "Маринады и соусы",
    icon: "🫙",
    items: [
      { id: "kefir", name: "Кефир", quantity: "1–1,2 л" },
      { id: "kiwi", name: "Киви", quantity: "1 крупный / 2 маленьких" },
      { id: "mustard", name: "Горчица", quantity: "180–250 г" },
      { id: "honey", name: "Мёд", quantity: "150–200 г" },
      { id: "soy-sauce", name: "Соевый соус", quantity: "250 мл" },
      { id: "greek-yogurt", name: "Греческий йогурт", quantity: "300–400 г" },
      { id: "sour-cream", name: "Сметана 20%", quantity: "300–400 г" },
      { id: "mayo", name: "Майонез", quantity: "150–200 г, по желанию" },
      { id: "caesar-sauce", name: "Соус цезарь", quantity: "700 мл – 1 л" },
      { id: "meat-sauce", name: "Соус к мясу/BBQ/шашлычный", quantity: "1–1,5 л" },
      { id: "ketchup", name: "Кетчуп", quantity: "500–700 г" },
      { id: "garlic-cheese-sauce", name: "Чесночный/сырный соус", quantity: "500–700 г" },
    ],
  },
  {
    id: "tiramisu",
    title: "Тирамису",
    icon: "🍰",
    items: [
      { id: "mascarpone", name: "Маскарпоне", quantity: "4 банки по 250 г" },
      { id: "cookies", name: "Печенье юбилейное", quantity: "800 г – 1 кг" },
      { id: "cream", name: "Сливки 33%", quantity: "600–800 мл" },
      { id: "sugar", name: "Сахарная пудра/сахар", quantity: "200 г" },
      { id: "cocoa", name: "Какао", quantity: "80–100 г" },
    ],
  },
  {
    id: "drinks-dessert",
    title: "Напитки и десерт",
    icon: "🥤",
    items: [
      { id: "sprite", name: "Sprite 1,5 л", quantity: "2 бутылки" },
      { id: "sparkling-water", name: "Газированная вода 1,5 л", quantity: "2 бутылки" },
      { id: "tea", name: "Чай", quantity: "1 упаковка" },
      { id: "coffee", name: "Кофе", quantity: "1 упаковка" },
      { id: "cake", name: "Торт", quantity: "1,5–2 кг" },
    ],
  },
  {
    id: "basics",
    title: "База",
    icon: "🍽️",
    items: [
      { id: "vegetable-oil", name: "Растительное масло", quantity: "1 л" },
      { id: "olive-oil", name: "Оливковое масло", quantity: "500 мл, если используете" },
      { id: "salt", name: "Соль", quantity: "1 кг" },
      { id: "spices", name: "Перец, паприка, кориандр, зира, сухой чеснок", quantity: "по 1 упаковке" },
      { id: "foil", name: "Фольга для картошки", quantity: "1 рулон" },
    ],
  },
];

const COOKING_PHASES = [
  {
    id: "arrival",
    time: "00:00",
    elapsed: "+0:00",
    title: "Приезд и раскладка",
    roles: ["me", "her", "both"],
    grill: "Подготовка",
    tags: ["инвентарь", "холод"],
    summary: "Разложить зоны, продукты и сразу отделить сырое от готового.",
    ingredients: [
      { name: "Мангал, угли, розжиг", quantity: "1 комплект" },
      { name: "Чистые доски, щипцы, контейнеры", quantity: "раздельно" },
      { name: "Термосумка/холодильник", quantity: "для мяса и соусов" },
    ],
    steps: [
      { role: "me", text: "Поставить мангал, угли, розжиг, организовать горячую и умеренную зоны." },
      { role: "her", text: "Убрать мясо, йогурт и соусы в холод; достать овощи и чистую посуду." },
      { role: "both", text: "Сразу разделить сырой и готовый инвентарь, чтобы не смешивать доски и щипцы." },
    ],
  },
  {
    id: "coals",
    time: "00:05",
    elapsed: "+0:05",
    title: "Угли",
    roles: ["me"],
    grill: "Разогрев",
    tags: ["мангал", "жар"],
    summary: "Разжечь угли и дождаться стабильного жара без открытого пламени.",
    ingredients: [
      { name: "Угли", quantity: "на большой мангал" },
      { name: "Розжиг/стартер", quantity: "по ситуации" },
      { name: "Зона непрямого жара", quantity: "для ножек, рёбрышек и картошки" },
    ],
    steps: [
      { role: "me", text: "Разжечь угли и не начинать готовку, пока есть активное пламя." },
      { role: "me", text: "Дождаться серого пепла и стабильного жара." },
      { role: "me", text: "Собрать две зоны: горячую и умеренную/непрямую. Часть углей оставить под картошку в фольге." },
    ],
  },
  {
    id: "quick-marinades",
    time: "00:10",
    elapsed: "+0:10",
    title: "Быстрые маринады",
    roles: ["me", "her"],
    grill: "Греется",
    tags: ["грибы", "грудка", "свинина"],
    summary: "Запустить всё, чему нужно постоять 30-60 минут, пока доходят угли.",
    ingredients: [
      { name: "Шампиньоны", quantity: "1 кг" },
      { name: "Куриная грудка пластами", quantity: "1.826 кг" },
      { name: "Баклажаны", quantity: "1.5-2 см" },
      { name: "Рёбрышки и свинина по-дижонски", quantity: "уже замаринованы" },
      { name: "Соевый соус, йогурт, масло, специи", quantity: "по рецептам" },
    ],
    steps: [
      {
        role: "her",
        text: "Грибы: соевый соус 60 г, масло 50-55 г, мед 12-15 г, горчица 10-12 г, чеснок 2 зубчика, копченая паприка 1 ч. л., перец, без соли. Держать 1-3 часа в холоде.",
      },
      {
        role: "me",
        text: "Грудку нарезать пластами 1-1.5 см. Маринад: йогурт 5-6 ст. л., масло 5-6 ст. л., соль 3-3.5 ч. л., паприка 1 ст. л., кориандр/зира 1.5 ч. л., чеснок 5-6 зубчиков, перец, лимон 2-3 ч. л.",
      },
      { role: "her", text: "Баклажаны нарезать 1.5-2 см, посолить на 20-30 минут, затем промокнуть." },
      { role: "both", text: "Рёбрышки и свинину по-дижонски держать в холоде до жарки. Не класть их на доску после сырой курицы." },
    ],
  },
  {
    id: "veg-sauce-cabbage",
    time: "00:25",
    elapsed: "+0:25",
    title: "Овощи, салат, соус",
    roles: ["me", "her"],
    grill: "Греется",
    tags: ["овощи", "салат", "шаурма"],
    summary: "Подготовить овощи на решётку, салат огурцы-помидоры и холодную начинку для шаурмы.",
    ingredients: [
      { name: "Кабачки", quantity: "пластины 1-1.5 см" },
      { name: "Овощной маринад", quantity: "на 1-1.5 кг" },
      { name: "Огурцы, помидоры", quantity: "для салата" },
      { name: "Оливковое масло, соль, перец, специи", quantity: "для салата" },
      { name: "Йогуртовый соус", quantity: "500-550 г йогурта" },
      { name: "Капуста, помидоры, соленые огурцы", quantity: "для шаурмы" },
    ],
    steps: [
      { role: "me", text: "Кабачки нарезать пластинами или кружками 1-1.5 см." },
      { role: "me", text: "Овощной маринад: масло 4-5 ст. л., чеснок 2-3 зубчика, лимон/уксус 1 ст. л., перец, паприка/травы; соль ближе к жарке." },
      { role: "her", text: "Соус шаурмы: йогурт 500-550 г, чеснок 4-5 зубчиков, лимон 2-3 ч. л., горчица/майонез 2-3 ч. л., рассол 5-6 ч. л., паприка, перец, соль, зелень." },
      { role: "her", text: "Капусту тонко нашинковать и помять с солью, каплей лимона/уксуса и щепоткой сахара." },
      { role: "her", text: "Для салата нарезать огурцы и помидоры крупными кусками. Соль, специи и оливковое масло добавить ближе к подаче, чтобы салат не дал лишний сок." },
    ],
  },
  {
    id: "potatoes-foil",
    time: "00:35",
    elapsed: "+0:35",
    title: "Картошка в фольге",
    roles: ["me", "her"],
    grill: "В углях",
    tags: ["картошка", "фольга"],
    summary: "Запустить картошку рано: она готовится сама в углях и не занимает решётку.",
    ingredients: [
      { name: "Картошка", quantity: "средняя, целиком" },
      { name: "Фольга", quantity: "2 слоя на картофелину" },
      { name: "Соль, масло, специи", quantity: "по желанию" },
      { name: "Щипцы", quantity: "для переворота" },
    ],
    steps: [
      { role: "her", text: "Картошку вымыть, хорошо обсушить и наколоть вилкой в 2-3 местах." },
      { role: "her", text: "Завернуть каждую картофелину в 2 слоя фольги. Можно добавить щепотку соли и каплю масла." },
      { role: "me", text: "Спрятать картошку в угли по краю жара, не в самое агрессивное пламя." },
      { role: "me", text: "Поворачивать каждые 15-20 минут. Проверять готовность через 45-70 минут: шпажка должна входить мягко." },
    ],
  },
  {
    id: "legs-grill",
    time: "00:45",
    elapsed: "+0:45",
    title: "Ножки на мангал",
    roles: ["me"],
    grill: "Занят",
    tags: ["ножки", "курица"],
    summary: "Главная длинная партия: умеренный жар, частые перевороты, без глазури в начале.",
    ingredients: [
      { name: "Куриные ножки", quantity: "4.2 кг, уже замаринованы" },
      { name: "Паприка", quantity: "10 г" },
      { name: "Растительное масло", quantity: "55 г" },
      { name: "Горчица", quantity: "15-20 г, опционально" },
    ],
    steps: [
      { role: "me", text: "Дать лишнему маринаду стечь, толстый слой не оставлять." },
      { role: "me", text: "Смешать паприку 10 г, масло 55 г и горчицу 15-20 г по желанию; обмазать перед грилем." },
      { role: "me", text: "Готовить 30-40 минут на умеренном/непрямом жаре, переворачивать каждые 5-7 минут." },
      { role: "her", text: "Параллельно держать холодные соусы и начинку в холоде, подготовить чистую посуду под готовое." },
    ],
  },
  {
    id: "legs-glaze",
    time: "01:20",
    elapsed: "+1:20",
    title: "Глазурь и отдых ножек",
    roles: ["me", "her"],
    grill: "Финиш",
    tags: ["глазурь", "отдых"],
    summary: "Медовую глазурь наносить только в самом конце, затем дать мясу отдохнуть.",
    ingredients: [
      { name: "Мед", quantity: "75-80 г" },
      { name: "Горчица", quantity: "25-30 г" },
      { name: "Растительное масло", quantity: "25 г" },
      { name: "Соль", quantity: "1-2 г" },
    ],
    steps: [
      { role: "her", text: "Смешать мед 75-80 г, горчицу 25-30 г, масло 25 г и соль 1-2 г." },
      { role: "me", text: "Мазать ножки только последние 5-7 минут, переворачивая каждые 1-2 минуты." },
      { role: "me", text: "Проверить готовность: 74-78°C у кости или прозрачный сок." },
      { role: "both", text: "Снять и дать отдохнуть 5-10 минут." },
    ],
  },
  {
    id: "pork-grill",
    time: "01:35",
    elapsed: "+1:35",
    title: "Рёбрышки и свинина",
    roles: ["me", "her"],
    grill: "Занят",
    tags: ["рёбрышки", "свинина", "решётка"],
    summary: "После ножек занять решётку свининой: рёбрышки держать спокойнее, куски по-дижонски жарить быстрее.",
    ingredients: [
      { name: "Свиные рёбрышки", quantity: "замаринованы" },
      { name: "Свинина по-дижонски", quantity: "замаринована" },
      { name: "Решётка", quantity: "вместо шампуров" },
      { name: "Чистые щипцы и блюдо", quantity: "для готового мяса" },
    ],
    steps: [
      { role: "me", text: "Снять с мяса лишний маринад, чтобы он не горел и не капал в угли." },
      { role: "me", text: "Рёбрышки жарить на умеренном жаре или ближе к краю 25-35 минут, часто переворачивая. Если куски толстые, держать дольше на непрямом жаре." },
      { role: "me", text: "Свинину по-дижонски жарить на решётке 12-18 минут, переворачивая каждые 3-4 минуты. Не пересушивать." },
      { role: "her", text: "Параллельно достать чистое блюдо, салфетки, соусы и проверить картошку в фольге." },
      { role: "both", text: "После снятия дать свинине отдохнуть 5-7 минут." },
    ],
  },
  {
    id: "veg-mushrooms-grill",
    time: "02:05",
    elapsed: "+2:05",
    title: "Овощи и грибы",
    roles: ["me", "her"],
    grill: "Занят",
    tags: ["овощи", "грибы"],
    summary: "Короткая овощная партия после основного мяса: быстро, чтобы не пересушить.",
    ingredients: [
      { name: "Кабачки и баклажаны", quantity: "подготовлены" },
      { name: "Шампиньоны", quantity: "1 кг" },
      { name: "Лимон, зелень, масло", quantity: "для финиша" },
    ],
    steps: [
      { role: "me", text: "Овощи жарить 3-5 минут с каждой стороны." },
      { role: "me", text: "Грибы жарить 8-12 минут на среднем жаре, часто переворачивать." },
      { role: "her", text: "После огня добавить лимонный сок, зелень и немного масла." },
    ],
  },
  {
    id: "shawarma-chicken",
    time: "02:20",
    elapsed: "+2:20",
    title: "Курица для шаурмы",
    roles: ["me", "her"],
    grill: "Занят",
    tags: ["грудка", "шаурма"],
    summary: "Жарить грудку пластами и резать только после отдыха, чтобы не пересушить.",
    ingredients: [
      { name: "Куриная грудка", quantity: "1.826 кг, пласты 1-1.5 см" },
      { name: "Йогуртовый маринад", quantity: "45-60 минут" },
      { name: "Чистая доска", quantity: "для готовой курицы" },
    ],
    steps: [
      { role: "me", text: "Жарить грудку пластами 3-5 минут с каждой стороны." },
      { role: "me", text: "Снять при 72-74°C внутри или когда сок прозрачный." },
      { role: "her", text: "Дать 5 минут отдохнуть, затем нарезать полосками поперек волокон." },
    ],
  },
  {
    id: "shawarma-assembly",
    time: "02:35",
    elapsed: "+2:35",
    title: "Сборка шаурмы",
    roles: ["me", "her"],
    grill: "Подрумянить",
    tags: ["лаваш", "сборка"],
    summary: "Собирать партиями: один контролирует мангал, второй заворачивает.",
    ingredients: [
      { name: "Лаваш тонкий", quantity: "7-8 листов" },
      { name: "Куриная грудка", quantity: "полосками" },
      { name: "Капуста, помидоры, соленые огурцы", quantity: "нарезаны" },
      { name: "Йогуртовый соус", quantity: "готов" },
    ],
    steps: [
      { role: "me", text: "Лаваш быстро прогреть." },
      { role: "her", text: "Собрать: соус, капуста, курица, помидоры, соленые огурцы, еще немного соуса." },
      { role: "her", text: "Плотно завернуть шаурму." },
      { role: "me", text: "Подрумянить на решетке 1-2 минуты с каждой стороны." },
    ],
  },
  {
    id: "salad-finish",
    time: "02:45",
    elapsed: "+2:45",
    title: "Салат и картошка на стол",
    roles: ["me", "her"],
    grill: "Подача",
    tags: ["салат", "картошка"],
    summary: "Финализировать холодный салат и достать картошку, когда горячее уже готово.",
    ingredients: [
      { name: "Огурцы и помидоры", quantity: "нарезаны" },
      { name: "Оливковое масло", quantity: "по вкусу" },
      { name: "Соль, перец, специи", quantity: "по вкусу" },
      { name: "Картошка в фольге", quantity: "из углей" },
    ],
    steps: [
      { role: "her", text: "Заправить салат оливковым маслом, солью, перцем и специями прямо перед подачей." },
      { role: "her", text: "Аккуратно перемешать, не давить помидоры." },
      { role: "me", text: "Достать картошку из углей, раскрывать фольгу осторожно: внутри горячий пар." },
      { role: "both", text: "Подать салат отдельно от горячего мяса, чтобы он оставался свежим." },
    ],
  },
  {
    id: "serving-safety",
    time: "02:55",
    elapsed: "+2:55",
    title: "Подача и безопасность",
    roles: ["me", "her", "both"],
    grill: "Финиш",
    tags: ["подача", "безопасность"],
    summary: "Разнести готовое, убрать сырое и не использовать сырой маринад как соус.",
    ingredients: [
      { name: "Готовые ножки, рёбрышки, свинина, овощи, грибы, картошка, шаурма", quantity: "на подачу" },
      { name: "Чистые блюда и щипцы", quantity: "для готового" },
      { name: "Холод", quantity: "для остатков соуса и курицы" },
    ],
    steps: [
      { role: "both", text: "Сырой маринад не использовать как соус." },
      { role: "both", text: "Разделить щипцы и доски для сырого и готового." },
      { role: "her", text: "Остатки йогуртового соуса и курицу держать в холоде." },
      { role: "me", text: "Погасить опасные вспышки и убрать горячую зону после готовки." },
    ],
  },
];

const allShoppingItems = SHOPPING_GROUPS.flatMap((group) => group.items);
const validShoppingItemIds = new Set(allShoppingItems.map((item) => item.id));
const validCookingIds = new Set(COOKING_PHASES.map((phase) => phase.id));

const appSubtitle = document.querySelector("#app-subtitle");
const progressLabel = document.querySelector("#progress-label");
const modeButtons = [...document.querySelectorAll("[data-mode-button]")];
const cookingMeta = document.querySelector("#cooking-meta");
const listArea = document.querySelector("#list-area");
const emptyState = document.querySelector("#empty-state");
const checkedCount = document.querySelector("#checked-count");
const totalCount = document.querySelector("#total-count");
const progressPercent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");
const resetButton = document.querySelector("#reset-button");
const shareButton = document.querySelector("#share-button");
const filterBar = document.querySelector("#filter-bar");
const toast = document.querySelector("#toast");

let activeMode = loadActiveMode();
let activeFilter = "all";
let checkedShoppingIds = loadIdSet(STORAGE_KEYS.shopping, validShoppingItemIds);
let checkedCookingIds = loadIdSet(STORAGE_KEYS.cooking, validCookingIds);
let collapsedGroups = new Set(SHOPPING_GROUPS.slice(1).map((group) => group.id));
let expandedCookingIds = new Set(["arrival", "quick-marinades", "legs-grill"]);
let toastTimeout;

render();
bindEvents();
registerServiceWorker();

function loadActiveMode() {
  try {
    const mode = window.localStorage.getItem(STORAGE_KEYS.mode);
    return mode === "cooking" ? "cooking" : "shopping";
  } catch {
    return "shopping";
  }
}

function saveActiveMode() {
  window.localStorage.setItem(STORAGE_KEYS.mode, activeMode);
}

function loadIdSet(storageKey, validIds) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids)) return new Set();
    return new Set(ids.filter((id) => validIds.has(id)));
  } catch {
    return new Set();
  }
}

function saveIdSet(storageKey, ids, validIds) {
  const validValues = [...ids].filter((id) => validIds.has(id));
  window.localStorage.setItem(storageKey, JSON.stringify(validValues));
}

function bindEvents() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.modeButton;
      if (!MODES[nextMode] || nextMode === activeMode) return;

      activeMode = nextMode;
      activeFilter = "all";
      saveActiveMode();
      render();
    });
  });

  listArea.addEventListener("change", (event) => {
    const shoppingCheckbox = event.target.closest("[data-item-checkbox]");
    if (shoppingCheckbox) {
      updateCheckedSet(checkedShoppingIds, shoppingCheckbox.value, shoppingCheckbox.checked);
      saveIdSet(STORAGE_KEYS.shopping, checkedShoppingIds, validShoppingItemIds);
      render();
      return;
    }

    const cookingCheckbox = event.target.closest("[data-cooking-checkbox]");
    if (cookingCheckbox) {
      updateCheckedSet(checkedCookingIds, cookingCheckbox.value, cookingCheckbox.checked);
      saveIdSet(STORAGE_KEYS.cooking, checkedCookingIds, validCookingIds);
      render();
    }
  });

  listArea.addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-group-toggle]");
    if (groupToggle) {
      toggleSetValue(collapsedGroups, groupToggle.dataset.groupToggle);
      render();
      return;
    }

    const phaseToggle = event.target.closest("[data-phase-toggle]");
    if (phaseToggle) {
      toggleSetValue(expandedCookingIds, phaseToggle.dataset.phaseToggle);
      render();
    }
  });

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeFilter = button.dataset.filter;
    render();
  });

  resetButton.addEventListener("click", resetCurrentMode);
  shareButton.addEventListener("click", shareCurrentMode);
}

function updateCheckedSet(set, id, checked) {
  if (checked) {
    set.add(id);
  } else {
    set.delete(id);
  }
}

function toggleSetValue(set, value) {
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
}

function render() {
  const config = MODES[activeMode];
  const fragment = document.createDocumentFragment();
  let visibleRows = 0;

  appSubtitle.textContent = config.subtitle;
  progressLabel.textContent = config.progressLabel;
  listArea.setAttribute("aria-label", config.listLabel);
  emptyState.textContent = config.emptyState;
  cookingMeta.hidden = activeMode !== "cooking";

  modeButtons.forEach((button) => {
    const isActive = button.dataset.modeButton === activeMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  if (activeMode === "shopping") {
    visibleRows = renderShopping(fragment);
  } else {
    visibleRows = renderCooking(fragment);
  }

  listArea.replaceChildren(fragment);
  emptyState.hidden = visibleRows > 0;
  updateProgress();
  renderFilterButtons();
}

function renderShopping(fragment) {
  let visibleRows = 0;

  SHOPPING_GROUPS.forEach((group) => {
    const visibleItems = group.items.filter((item) => matchesFilter(checkedShoppingIds.has(item.id)));
    if (visibleItems.length === 0) return;

    visibleRows += visibleItems.length;
    fragment.appendChild(createGroupElement(group, visibleItems));
  });

  return visibleRows;
}

function createGroupElement(group, visibleItems) {
  const doneCount = group.items.filter((item) => checkedShoppingIds.has(item.id)).length;
  const section = document.createElement("section");
  section.className = `group${collapsedGroups.has(group.id) ? " collapsed" : ""}`;
  section.dataset.group = group.id;

  const header = document.createElement("button");
  header.className = "group-header";
  header.type = "button";
  header.dataset.groupToggle = group.id;
  header.setAttribute("aria-expanded", String(!collapsedGroups.has(group.id)));
  header.innerHTML = `
    <span class="group-icon" aria-hidden="true">${group.icon}</span>
    <span class="group-title">${escapeHtml(group.title)}</span>
    <span class="group-count">${doneCount}/${group.items.length}</span>
    <svg class="chevron" aria-hidden="true" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  const itemList = document.createElement("div");
  itemList.className = "item-list";
  visibleItems.forEach((item) => {
    itemList.appendChild(createShoppingRow(item));
  });

  section.append(header, itemList);
  return section;
}

function createShoppingRow(item) {
  const checked = checkedShoppingIds.has(item.id);
  const label = document.createElement("label");
  label.className = `item-row${checked ? " is-done" : ""}`;
  label.innerHTML = `
    <span class="checkbox">
      <input data-item-checkbox type="checkbox" value="${escapeAttribute(item.id)}" ${checked ? "checked" : ""} />
      <span class="checkmark" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="m5 12 4.2 4.2L19 6.8" />
        </svg>
      </span>
    </span>
    <span class="item-name">${escapeHtml(item.name)}</span>
    <span class="item-qty">${escapeHtml(item.quantity)}</span>
  `;

  return label;
}

function renderCooking(fragment) {
  const timeline = document.createElement("section");
  timeline.className = "timeline";
  timeline.setAttribute("aria-label", "План по времени");

  const heading = document.createElement("div");
  heading.className = "timeline-heading";
  heading.innerHTML = `
    <span class="timeline-heading-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    </span>
    <div>
      <h2>План по времени</h2>
      <p>Отсчёт от приезда. Мангал один, поэтому горячие этапы идут последовательно.</p>
    </div>
  `;
  timeline.appendChild(heading);

  const visiblePhases = COOKING_PHASES.filter((phase) => matchesFilter(checkedCookingIds.has(phase.id)));
  visiblePhases.forEach((phase) => {
    timeline.appendChild(createCookingPhase(phase));
  });

  fragment.appendChild(timeline);
  return visiblePhases.length;
}

function createCookingPhase(phase) {
  const checked = checkedCookingIds.has(phase.id);
  const expanded = expandedCookingIds.has(phase.id);
  const section = document.createElement("section");
  section.className = `timeline-item${checked ? " is-done" : ""}${expanded ? " expanded" : ""}`;
  section.dataset.phase = phase.id;

  const detailsId = `phase-details-${phase.id}`;
  section.innerHTML = `
    <div class="timeline-time" aria-hidden="true">
      <strong>${escapeHtml(phase.time)}</strong>
      <span>${escapeHtml(phase.elapsed)}</span>
    </div>
    <article class="phase-card">
      <div class="phase-topline">
        <label class="checkbox phase-checkbox" aria-label="Отметить этап ${escapeAttribute(phase.title)} готовым">
          <input data-cooking-checkbox type="checkbox" value="${escapeAttribute(phase.id)}" ${checked ? "checked" : ""} />
          <span class="checkmark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m5 12 4.2 4.2L19 6.8" />
            </svg>
          </span>
        </label>
        <button class="phase-toggle" type="button" data-phase-toggle="${escapeAttribute(phase.id)}" aria-expanded="${String(expanded)}" aria-controls="${detailsId}">
          <span class="phase-title-block">
            <span class="phase-title">${escapeHtml(phase.title)}</span>
            <span class="phase-summary">${escapeHtml(phase.summary)}</span>
          </span>
          <span class="phase-status">
            <span class="grill-chip">${escapeHtml(phase.grill)}</span>
            <span class="role-row">${phase.roles.map(renderRoleChip).join("")}</span>
          </span>
          <svg class="chevron" aria-hidden="true" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="phase-tags" aria-label="Блюда и контекст">
        ${phase.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="phase-details" id="${detailsId}" ${expanded ? "" : "hidden"}>
        <div class="detail-section">
          <h3>Ингредиенты / нужно</h3>
          <dl class="ingredient-list">
            ${phase.ingredients
              .map(
                (item) => `
                  <div>
                    <dt>${escapeHtml(item.name)}</dt>
                    <dd>${escapeHtml(item.quantity)}</dd>
                  </div>
                `,
              )
              .join("")}
          </dl>
        </div>
        <div class="detail-section">
          <h3>Шаги</h3>
          <ol class="step-list">
            ${phase.steps
              .map(
                (step) => `
                  <li>
                    <span class="step-role ${roleClass(step.role)}">${escapeHtml(roleLabel(step.role))}</span>
                    <span>${escapeHtml(step.text)}</span>
                  </li>
                `,
              )
              .join("")}
          </ol>
        </div>
      </div>
    </article>
  `;

  return section;
}

function renderRoleChip(roleId) {
  const role = ROLES[roleId] || ROLES.both;
  return `<span class="role-chip ${role.className}">${escapeHtml(role.label)}</span>`;
}

function roleClass(roleId) {
  return ROLES[roleId]?.className || "both";
}

function roleLabel(roleId) {
  return ROLES[roleId]?.label || "Оба";
}

function matchesFilter(checked) {
  if (activeFilter === "remaining") return !checked;
  if (activeFilter === "done") return checked;
  return true;
}

function updateProgress() {
  const total = activeMode === "shopping" ? allShoppingItems.length : COOKING_PHASES.length;
  const checked =
    activeMode === "shopping"
      ? [...checkedShoppingIds].filter((id) => validShoppingItemIds.has(id)).length
      : [...checkedCookingIds].filter((id) => validCookingIds.has(id)).length;
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

  checkedCount.textContent = String(checked);
  totalCount.textContent = String(total);
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function renderFilterButtons() {
  const filters = FILTERS[activeMode];
  const done =
    activeMode === "shopping"
      ? [...checkedShoppingIds].filter((id) => validShoppingItemIds.has(id)).length
      : [...checkedCookingIds].filter((id) => validCookingIds.has(id)).length;
  const total = activeMode === "shopping" ? allShoppingItems.length : COOKING_PHASES.length;
  const remaining = total - done;

  filterBar.replaceChildren(
    ...filters.map((filter) => {
      const button = document.createElement("button");
      button.className = `filter-button${filter.id === activeFilter ? " active" : ""}`;
      button.type = "button";
      button.dataset.filter = filter.id;
      button.textContent = filter.label;

      if (filter.id === "remaining") {
        button.dataset.count = String(remaining);
      } else if (filter.id === "done") {
        button.dataset.count = String(done);
      }

      return button;
    }),
  );
}

function resetCurrentMode() {
  const config = MODES[activeMode];
  const activeSet = activeMode === "shopping" ? checkedShoppingIds : checkedCookingIds;

  if (activeSet.size === 0) {
    showToast(config.resetEmpty);
    return;
  }

  const shouldReset = window.confirm(config.resetConfirm);
  if (!shouldReset) return;

  if (activeMode === "shopping") {
    checkedShoppingIds = new Set();
    saveIdSet(STORAGE_KEYS.shopping, checkedShoppingIds, validShoppingItemIds);
  } else {
    checkedCookingIds = new Set();
    saveIdSet(STORAGE_KEYS.cooking, checkedCookingIds, validCookingIds);
  }

  render();
  showToast(config.resetDone);
}

async function shareCurrentMode() {
  const text = activeMode === "shopping" ? buildRemainingShoppingText() : buildRemainingCookingText();

  try {
    if (navigator.share) {
      await navigator.share({
        title: activeMode === "shopping" ? "Birthday Checklist" : "Birthday Checklist — готовка",
        text,
      });
      return;
    }

    await copyText(text);
    showToast(activeMode === "shopping" ? "Список оставшихся покупок скопирован." : "План оставшейся готовки скопирован.");
  } catch (error) {
    if (error?.name === "AbortError") return;
    showToast("Не получилось поделиться списком.");
  }
}

function buildRemainingShoppingText() {
  const lines = ["Birthday Checklist — осталось купить:"];
  let hasRemaining = false;

  SHOPPING_GROUPS.forEach((group) => {
    const remainingItems = group.items.filter((item) => !checkedShoppingIds.has(item.id));
    if (remainingItems.length === 0) return;

    hasRemaining = true;
    lines.push("", `${group.title}:`);
    remainingItems.forEach((item) => {
      lines.push(`- ${item.name} — ${item.quantity}`);
    });
  });

  if (!hasRemaining) {
    return "Birthday Checklist: всё куплено.";
  }

  return lines.join("\n");
}

function buildRemainingCookingText() {
  const remainingPhases = COOKING_PHASES.filter((phase) => !checkedCookingIds.has(phase.id));
  if (remainingPhases.length === 0) {
    return "Birthday Checklist — готовка: все этапы готовы.";
  }

  const lines = ["Birthday Checklist — готовка, осталось:"];
  remainingPhases.forEach((phase) => {
    lines.push("", `${phase.time} — ${phase.title}`);
    lines.push(`Мангал: ${phase.grill}. Роли: ${phase.roles.map(roleLabel).join(", ")}.`);
    phase.steps.forEach((step) => {
      lines.push(`- ${roleLabel(step.role)}: ${step.text}`);
    });
  });

  return lines.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-999px";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function showToast(message) {
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app remains fully usable without offline caching.
    });
  });
}
