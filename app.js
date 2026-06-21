const STORAGE_KEY = "birthdayChecklist.v1.checked";

const GROUPS = [
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
    ],
  },
];

const allItems = GROUPS.flatMap((group) => group.items);
const validItemIds = new Set(allItems.map((item) => item.id));
const listArea = document.querySelector("#list-area");
const emptyState = document.querySelector("#empty-state");
const checkedCount = document.querySelector("#checked-count");
const totalCount = document.querySelector("#total-count");
const progressPercent = document.querySelector("#progress-percent");
const progressFill = document.querySelector("#progress-fill");
const resetButton = document.querySelector("#reset-button");
const shareButton = document.querySelector("#share-button");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const toast = document.querySelector("#toast");

let checkedIds = loadCheckedIds();
let activeFilter = "all";
let collapsedGroups = new Set(GROUPS.slice(1).map((group) => group.id));
let toastTimeout;

render();
bindEvents();
registerServiceWorker();

function loadCheckedIds() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids)) return new Set();
    return new Set(ids.filter((id) => validItemIds.has(id)));
  } catch {
    return new Set();
  }
}

function saveCheckedIds() {
  const ids = [...checkedIds].filter((id) => validItemIds.has(id));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function bindEvents() {
  listArea.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-item-checkbox]");
    if (!checkbox) return;

    if (checkbox.checked) {
      checkedIds.add(checkbox.value);
    } else {
      checkedIds.delete(checkbox.value);
    }

    saveCheckedIds();
    render();
  });

  listArea.addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-group-toggle]");
    if (!groupToggle) return;

    const groupId = groupToggle.dataset.groupToggle;
    if (collapsedGroups.has(groupId)) {
      collapsedGroups.delete(groupId);
    } else {
      collapsedGroups.add(groupId);
    }

    render();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      render();
    });
  });

  resetButton.addEventListener("click", () => {
    if (checkedIds.size === 0) {
      showToast("Пока нечего сбрасывать.");
      return;
    }

    const shouldReset = window.confirm("Сбросить все отметки в checklist?");
    if (!shouldReset) return;

    checkedIds = new Set();
    saveCheckedIds();
    render();
    showToast("Отметки сброшены.");
  });

  shareButton.addEventListener("click", shareRemainingList);
}

function render() {
  const fragment = document.createDocumentFragment();
  let visibleRows = 0;

  GROUPS.forEach((group) => {
    const visibleItems = group.items.filter((item) => matchesFilter(item));
    if (visibleItems.length === 0) return;

    visibleRows += visibleItems.length;
    fragment.appendChild(createGroupElement(group, visibleItems));
  });

  listArea.replaceChildren(fragment);
  emptyState.hidden = visibleRows > 0;
  updateProgress();
  updateFilterButtons();
}

function createGroupElement(group, visibleItems) {
  const doneCount = group.items.filter((item) => checkedIds.has(item.id)).length;
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
    itemList.appendChild(createItemRow(item));
  });

  section.append(header, itemList);
  return section;
}

function createItemRow(item) {
  const checked = checkedIds.has(item.id);
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

function matchesFilter(item) {
  const checked = checkedIds.has(item.id);
  if (activeFilter === "remaining") return !checked;
  if (activeFilter === "done") return checked;
  return true;
}

function updateProgress() {
  const total = allItems.length;
  const checked = [...checkedIds].filter((id) => validItemIds.has(id)).length;
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

  checkedCount.textContent = String(checked);
  totalCount.textContent = String(total);
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function updateFilterButtons() {
  const done = [...checkedIds].filter((id) => validItemIds.has(id)).length;
  const remaining = allItems.length - done;

  filterButtons.forEach((button) => {
    const filter = button.dataset.filter;
    button.classList.toggle("active", filter === activeFilter);

    if (filter === "remaining") {
      button.dataset.count = String(remaining);
    } else if (filter === "done") {
      button.dataset.count = String(done);
    } else {
      delete button.dataset.count;
    }
  });
}

async function shareRemainingList() {
  const remainingText = buildRemainingListText();

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Birthday Checklist",
        text: remainingText,
      });
      return;
    }

    await copyText(remainingText);
    showToast("Список оставшихся покупок скопирован.");
  } catch (error) {
    if (error?.name === "AbortError") return;
    showToast("Не получилось поделиться списком.");
  }
}

function buildRemainingListText() {
  const lines = ["Birthday Checklist — осталось купить:"];
  let hasRemaining = false;

  GROUPS.forEach((group) => {
    const remainingItems = group.items.filter((item) => !checkedIds.has(item.id));
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
