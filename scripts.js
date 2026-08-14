const list = document.getElementById("recipe-list");
const detail = document.getElementById("recipe-detail");
const form = document.getElementById("recipe-form");
const roulette = document.getElementById("recipe-roulette");
const toolbar = document.getElementById("toolbar");
const listTabs = document.getElementById("list-tabs");

const STORAGE_KEY = "mbm-recipes";

// Maps each format value to a Tabler icon name, so the names can be changed in
// one place.
const formatIcons = {
  pasta: "ti-bowl",
  rice: "ti-bowl",
  soup: "ti-soup",
  salad: "ti-salad",
  roast: "ti-meat",
  bread: "ti-bread",
  pie: "ti-chef-hat",
  "stir fry": "ti-tools-kitchen-2",
  other: "ti-tools-kitchen-2",
  chocolate: "ti-cookie",
  fruit: "ti-apple",
  custard: "ti-egg",
  pastry: "ti-cake",
  frozen: "ti-ice-cream"
};

const proteinColours = {
  seafood: "var(--cobalt)",
  meat: "var(--red)",
  chicken: "var(--red)",
  pork: "var(--red)",
  veg: "var(--ink)",
  dessert: "var(--red)"
};

// Picks the hand-drawn frame overlay for a recipe. Desserts always use the ink
// frame; otherwise it follows the protein. Any protein not listed falls back to
// the ink frame.
function frameFor(recipe) {
  if (recipe.type === "dessert") return "frame-ink.png";
  if (recipe.protein === "seafood") return "frame-cobalt.png";
  if (recipe.protein === "meat" || recipe.protein === "chicken") return "frame-red.png";
  if (recipe.protein === "veg") return "frame-ink.png";
  return "frame-ink.png";
}

function seedStore() {
  return JSON.parse(JSON.stringify(recipes));
}

function loadStore() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

if (localStorage.getItem(STORAGE_KEY) === null) {
  saveStore(seedStore());
}

function countUnexported() {
  return loadStore().filter((r) => r.unexported === true).length;
}

// Recipes created on the device carry unexported: true; seeded recipes do not.
function addRecipe(recipe) {
  const data = loadStore();
  data.push({ ...recipe, unexported: true });
  saveStore(data);
  renderList();
}

function renderNotice() {
  const count = countUnexported();
  let notice = document.getElementById("unexported-notice");
  if (count > 0) {
    if (!notice) {
      notice = document.createElement("div");
      notice.id = "unexported-notice";
      notice.style.color = "var(--red)";
      notice.style.fontSize = "0.875rem";
      notice.style.fontFamily = "var(--font-ui)";
      notice.style.marginBottom = "12px";
      list.parentNode.insertBefore(notice, list);
    }
    notice.textContent = count + " recipes not yet saved to data.js";
    notice.style.display = "";
  } else if (notice) {
    notice.style.display = "none";
  }
}

function formatNumber(n) {
  return "NO. " + String(n).padStart(3, "0");
}

let currentLang = "en";

// Returns the value for the chosen language, falling back to English when a
// translation is missing or empty. Tolerates the legacy (pre-translation) shape
// where the field is a plain string or array.
function pick(field, lang) {
  if (field === null || field === undefined) return field;
  if (typeof field === "string" || Array.isArray(field)) return field;
  const value = field[lang];
  const empty =
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);
  return empty ? field.en : value;
}

function showStatus(message) {
  let status = document.getElementById("toolbar-status");
  if (!status) {
    status = document.createElement("div");
    status.id = "toolbar-status";
    toolbar.append(status);
  }
  status.textContent = message;
  setTimeout(() => {
    if (status.textContent === message) status.textContent = "";
  }, 2500);
}

function metaItem(label, value) {
  const item = document.createElement("div");
  item.className = "meta-item";

  const labelEl = document.createElement("div");
  labelEl.className = "meta-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("div");
  valueEl.className = "meta-value";
  valueEl.textContent = value;

  item.append(labelEl, valueEl);
  return item;
}

function metaRow(recipe) {
  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.append(
    metaItem("ACTIVE", recipe.activeMinutes),
    metaItem("TOTAL", recipe.totalMinutes),
    metaItem("POTS", recipe.pots)
  );
  return meta;
}

function showList() {
  detail.innerHTML = "";
  detail.style.display = "none";
  form.innerHTML = "";
  form.style.display = "none";
  roulette.innerHTML = "";
  roulette.style.display = "none";
  list.style.display = "";
  listTabs.style.display = "";
}

function showDetail(recipe) {
  detail.innerHTML = "";

  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "#";
  back.textContent = "← All recipes";
  back.addEventListener("click", (event) => {
    event.preventDefault();
    showList();
  });

  const langToggle = document.createElement("div");
  langToggle.className = "lang-toggle";
  langToggle.style.display = "flex";
  langToggle.style.gap = "4px";
  langToggle.style.marginBottom = "0.75rem";
  ["en", "pt", "it"].forEach((code) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "lang-option";
    option.textContent = code.toUpperCase();
    if (code === currentLang) option.style.color = "var(--red)";
    option.addEventListener("click", () => {
      currentLang = code;
      showDetail(recipe);
    });
    langToggle.append(option);
  });

  let photoEl = null;
  if (recipe.photo) {
    photoEl = document.createElement("div");
    photoEl.className = "detail-photo";

    const img = document.createElement("img");
    img.className = "detail-photo-img";
    img.src = "photos/" + recipe.photo;
    img.alt = "";

    const frame = document.createElement("img");
    frame.className = "detail-photo-frame";
    frame.src = "photos/" + frameFor(recipe);
    frame.alt = "";

    photoEl.append(img, frame);
  }

  const number = document.createElement("div");
  number.className = "card-number";
  number.textContent = formatNumber(recipe.number);

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = pick(recipe.title, currentLang);

  // Servings are optional (e.g. desserts): omit the line entirely when blank.
  let serves = null;
  if (recipe.servings !== null && recipe.servings !== undefined && recipe.servings !== "") {
    serves = document.createElement("div");
    serves.className = "card-serves";
    serves.textContent = "serves " + recipe.servings;
  }

  // Cuisine / season labels: small, letterspaced, muted. Omit cuisine when blank
  // and season when blank or "all year".
  const tags = [];
  if (recipe.cuisine) tags.push(recipe.cuisine);
  if (recipe.season && recipe.season !== "all year") tags.push(recipe.season);
  let tagsEl = null;
  if (tags.length) {
    tagsEl = document.createElement("div");
    tagsEl.style.display = "flex";
    tagsEl.style.gap = "1rem";
    tagsEl.style.marginTop = "0.5rem";
    tags.forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      span.style.color = "var(--muted)";
      span.style.fontFamily = "var(--font-ui)";
      span.style.fontSize = "0.6875rem";
      span.style.letterSpacing = "0.15em";
      span.style.textTransform = "uppercase";
      tagsEl.append(span);
    });
  }

  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.className = "detail-heading";
  ingredientsHeading.textContent = "Ingredients";

  const ingredients = document.createElement("ul");
  recipe.ingredients.forEach((ing) => {
    const li = document.createElement("li");
    const parts = [];
    if (ing.amount !== null && ing.amount !== undefined && ing.amount !== "") parts.push(ing.amount);
    if (ing.unit !== null && ing.unit !== undefined) parts.push(ing.unit);
    parts.push(pick(ing.item, currentLang));
    li.textContent = parts.join(" ");
    ingredients.append(li);
  });

  const stepsHeading = document.createElement("h3");
  stepsHeading.className = "detail-heading";
  stepsHeading.textContent = "Steps";

  const steps = document.createElement("ol");
  pick(recipe.steps, currentLang).forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    steps.append(li);
  });

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "edit-button";
  editButton.textContent = "Edit";
  editButton.style.marginTop = "1.25rem";
  editButton.style.marginRight = "8px";
  editButton.addEventListener("click", () => openForm("edit", recipe));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    if (!confirm('Delete "' + pick(recipe.title, currentLang) + '"?')) return;
    const data = loadStore().filter((r) => r.id !== recipe.id);
    saveStore(data);
    renderList();
    showList();
  });

  const signature = document.createElement("div");
  signature.className = "detail-signature";
  const signatureText = document.createElement("span");
  signatureText.className = "detail-signature-text";
  signatureText.textContent = "from the MBM kitchen";
  const signatureMark = document.createElement("img");
  signatureMark.className = "detail-signature-mark";
  signatureMark.src = "photos/mbm-mark.png";
  signatureMark.alt = "";
  signature.append(signatureText, signatureMark);

  const nodes = [back];
  if (photoEl) nodes.push(photoEl);
  nodes.push(number, title);
  if (serves) nodes.push(serves);
  nodes.push(metaRow(recipe));
  if (tagsEl) nodes.push(tagsEl);
  nodes.push(
    ingredientsHeading,
    ingredients,
    stepsHeading,
    steps,
    editButton,
    deleteButton,
    langToggle,
    signature
  );
  detail.append(...nodes);

  form.innerHTML = "";
  form.style.display = "none";
  roulette.innerHTML = "";
  roulette.style.display = "none";
  list.style.display = "none";
  listTabs.style.display = "none";
  detail.style.display = "";
}

let listFilter = "savoury";

function renderTabs() {
  listTabs.innerHTML = "";
  [
    ["savoury", "Meals"],
    ["dessert", "Desserts"]
  ].forEach(([type, label]) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "list-tab" + (listFilter === type ? " active" : "");
    tab.textContent = label;
    tab.addEventListener("click", () => {
      listFilter = type;
      renderTabs();
      renderList();
    });
    listTabs.append(tab);
  });
}

function renderList() {
  list.innerHTML = "";
  loadStore()
    .filter((recipe) => recipe.type === listFilter)
    .forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "card";

    // Format icon colour: protein colour, or red for desserts, ink otherwise.
    const colour =
      recipe.type === "dessert"
        ? proteinColours.dessert
        : proteinColours[recipe.protein] || "var(--ink)";

    // Left: two-digit recipe number.
    const number = document.createElement("div");
    number.className = "list-number";
    number.textContent = String(recipe.number).padStart(2, "0");

    // Right: title (with the format icon inline before it) and a single meta line.
    const body = document.createElement("div");
    body.className = "list-body";

    const title = document.createElement("h2");
    title.className = "list-title";
    const icon = document.createElement("i");
    icon.className = "ti " + formatIcons[recipe.format];
    icon.style.fontSize = "15px";
    icon.style.color = colour;
    icon.style.marginRight = "6px";
    title.append(icon, document.createTextNode(pick(recipe.title, currentLang)));

    const parts = [];
    if (recipe.type === "dessert") parts.push("dessert");
    else if (recipe.cuisine) parts.push(recipe.cuisine);
    parts.push(recipe.format);
    if (recipe.servings !== null && recipe.servings !== undefined && recipe.servings !== "") {
      parts.push("serves " + recipe.servings);
    }
    parts.push(recipe.activeMinutes + " active / " + recipe.totalMinutes + " total");
    parts.push(recipe.pots + " pots");

    const meta = document.createElement("div");
    meta.className = "list-meta";
    meta.textContent = parts.join(" · ");

    body.append(title, meta);
    card.append(number, body);
    card.addEventListener("click", () => showDetail(recipe));
    list.append(card);
  });
  renderNotice();
}

function exportRecipes() {
  const cleaned = loadStore().map((r) => {
    const copy = { ...r };
    delete copy.unexported;
    return copy;
  });
  const js = "const recipes = " + JSON.stringify(cleaned, null, 2) + ";";
  navigator.clipboard.writeText(js).then(
    () => {
      saveStore(cleaned);
      renderList();
      showStatus("Copied to clipboard");
    },
    () => showStatus("Copy failed")
  );
}

function resetRecipes() {
  const unexported = countUnexported();
  if (unexported > 0) {
    if (!confirm(unexported + " recipes have not been saved to data.js and will be lost. Continue?")) return;
    if (!confirm("Are you sure? This cannot be undone.")) return;
  } else {
    if (!confirm("Reset all recipes from the file? This discards any changes.")) return;
  }
  saveStore(seedStore());
  renderList();
  showList();
  showStatus("Reset from file");
}

// ---- Add / edit form ----

const DRAFT_KEY = "mbm-draft";

function loadDraft() {
  const raw = localStorage.getItem(DRAFT_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveDraft(state) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nextNumber() {
  const used = new Set(
    loadStore()
      .map((r) => r.number)
      .filter((n) => typeof n === "number")
  );
  let n = 1;
  while (used.has(n)) n++;
  return n;
}

const CUISINE_OPTIONS = [
  "Italian",
  "Brazilian",
  "Greek",
  "French",
  "Spanish",
  "Middle Eastern",
  "Asian",
  "Mexican",
  "American",
  "British",
  "Other"
];
const SEASON_OPTIONS = ["all year", "summer", "winter"];
const FORMAT_SAVOURY = ["pasta", "rice", "soup", "salad", "roast", "bread", "pie", "stir fry", "other"];
const FORMAT_DESSERT = ["chocolate", "fruit", "custard", "pastry", "frozen", "other"];

function formatOptionsFor(type) {
  return type === "dessert" ? FORMAT_DESSERT : FORMAT_SAVOURY;
}

// Returns the current season for the southern hemisphere: December–February is
// summer, June–August is winter, and other months return "all year".
// Not used anywhere yet.
function currentSeasonSouthern() {
  const month = new Date().getMonth() + 1;
  if (month === 12 || month === 1 || month === 2) return "summer";
  if (month >= 6 && month <= 8) return "winter";
  return "all year";
}

function blankRow() {
  return { amount: "", unit: "none", item: "", staple: false };
}

function blankState() {
  return {
    mode: "add",
    id: null,
    number: null,
    title: "",
    photo: "",
    servings: "",
    type: "savoury",
    protein: "none",
    format: "",
    cuisine: "",
    season: "all year",
    activeMinutes: "",
    totalMinutes: "",
    pots: "",
    pausable: false,
    makeAhead: false,
    ingredients: [blankRow()],
    steps: ""
  };
}

function stateFromRecipe(recipe) {
  return {
    mode: "edit",
    id: recipe.id,
    number: recipe.number,
    title: pick(recipe.title, "en") || "",
    photo: recipe.photo == null ? "" : recipe.photo,
    servings: recipe.servings == null ? "" : recipe.servings,
    type: recipe.type || "savoury",
    protein: recipe.protein == null ? "none" : recipe.protein,
    format: recipe.format || "",
    cuisine: recipe.cuisine || "",
    season: recipe.season || "all year",
    activeMinutes: recipe.activeMinutes == null ? "" : recipe.activeMinutes,
    totalMinutes: recipe.totalMinutes == null ? "" : recipe.totalMinutes,
    pots: recipe.pots == null ? "" : recipe.pots,
    pausable: !!recipe.pausable,
    makeAhead: !!recipe.makeAhead,
    ingredients: recipe.ingredients.map((ing) => ({
      amount: ing.amount == null ? "" : ing.amount,
      unit: ing.unit == null ? "none" : ing.unit,
      item: pick(ing.item, "en") || "",
      staple: !!ing.staple
    })),
    steps: (pick(recipe.steps, "en") || []).join("\n")
  };
}

function styleField(el) {
  el.style.width = "100%";
  el.style.minHeight = "44px";
  el.style.boxSizing = "border-box";
  el.style.border = "1px solid var(--hairline)";
  el.style.borderRadius = "4px";
  el.style.fontFamily = "var(--font-ui)";
  el.style.fontSize = "1rem";
  el.style.padding = "8px";
  el.style.backgroundColor = "var(--cream)";
  el.style.color = "var(--ink)";
  return el;
}

function fieldLabel(text) {
  const label = document.createElement("label");
  label.textContent = text;
  label.style.display = "block";
  label.style.marginBottom = "4px";
  label.style.color = "var(--muted)";
  label.style.fontFamily = "var(--font-ui)";
  label.style.fontSize = "0.8125rem";
  return label;
}

function labelWrap(text, field) {
  const wrap = document.createElement("div");
  wrap.style.marginBottom = "12px";
  wrap.append(fieldLabel(text), field);
  return wrap;
}

function checkboxField(text, checked, onChange) {
  const wrap = document.createElement("div");
  wrap.style.marginBottom = "12px";
  const row = document.createElement("label");
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "8px";
  row.style.minHeight = "44px";
  row.style.color = "var(--muted)";
  row.style.fontFamily = "var(--font-ui)";
  row.style.fontSize = "0.8125rem";
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = checked;
  cb.addEventListener("change", () => onChange(cb.checked));
  const span = document.createElement("span");
  span.textContent = text;
  row.append(cb, span);
  wrap.append(row);
  return wrap;
}

function makeSelect(options, value) {
  const select = document.createElement("select");
  const opts = options.slice();
  if (value !== "" && value != null && !opts.includes(value)) {
    // Preserve an existing value that isn't one of the standard options.
    opts.push(value);
  }
  opts.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.append(option);
  });
  select.value = value;
  return select;
}

function buildForm(state) {
  form.innerHTML = "";
  const persist = () => saveDraft(state);

  const cancel = document.createElement("a");
  cancel.className = "back-link";
  cancel.href = "#";
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", (event) => {
    event.preventDefault();
    cancelForm(state);
  });

  const heading = document.createElement("h2");
  heading.className = "card-title";
  heading.textContent = state.mode === "edit" ? "Edit recipe" : "Add recipe";

  const titleInput = styleField(document.createElement("input"));
  titleInput.type = "text";
  titleInput.value = state.title;
  titleInput.addEventListener("input", () => {
    state.title = titleInput.value;
    persist();
  });

  const photoInput = styleField(document.createElement("input"));
  photoInput.type = "text";
  photoInput.value = state.photo;
  photoInput.addEventListener("input", () => {
    state.photo = photoInput.value;
    persist();
  });

  const servingsInput = styleField(document.createElement("input"));
  servingsInput.type = "number";
  servingsInput.value = state.servings;
  servingsInput.addEventListener("input", () => {
    state.servings = servingsInput.value;
    persist();
  });

  const typeSelect = styleField(makeSelect(["savoury", "dessert"], state.type));
  typeSelect.addEventListener("change", () => {
    state.type = typeSelect.value;
    populateFormat();
    persist();
  });

  const proteinSelect = styleField(
    makeSelect(["chicken", "seafood", "meat", "pork", "veg", "none"], state.protein)
  );
  proteinSelect.addEventListener("change", () => {
    state.protein = proteinSelect.value;
    persist();
  });

  const formatSelect = styleField(document.createElement("select"));
  function populateFormat() {
    const opts = formatOptionsFor(state.type);
    formatSelect.innerHTML = "";
    opts.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      formatSelect.append(option);
    });
    if (!opts.includes(state.format)) {
      state.format = opts[0];
    }
    formatSelect.value = state.format;
  }
  populateFormat();
  formatSelect.addEventListener("change", () => {
    state.format = formatSelect.value;
    persist();
  });

  const cuisineSelect = styleField(makeSelect([""].concat(CUISINE_OPTIONS), state.cuisine));
  cuisineSelect.addEventListener("change", () => {
    state.cuisine = cuisineSelect.value;
    persist();
  });

  const seasonSelect = styleField(makeSelect(SEASON_OPTIONS, state.season || "all year"));
  seasonSelect.addEventListener("change", () => {
    state.season = seasonSelect.value;
    persist();
  });

  const activeInput = styleField(document.createElement("input"));
  activeInput.type = "number";
  activeInput.value = state.activeMinutes;
  activeInput.addEventListener("input", () => {
    state.activeMinutes = activeInput.value;
    persist();
  });

  const totalInput = styleField(document.createElement("input"));
  totalInput.type = "number";
  totalInput.value = state.totalMinutes;
  totalInput.addEventListener("input", () => {
    state.totalMinutes = totalInput.value;
    persist();
  });

  const potsInput = styleField(document.createElement("input"));
  potsInput.type = "number";
  potsInput.value = state.pots;
  potsInput.addEventListener("input", () => {
    state.pots = potsInput.value;
    persist();
  });

  const pausableField = checkboxField("Pausable", state.pausable, (v) => {
    state.pausable = v;
    persist();
  });
  const makeAheadField = checkboxField("Make ahead", state.makeAhead, (v) => {
    state.makeAhead = v;
    persist();
  });

  const ingredientsHeading = document.createElement("h3");
  ingredientsHeading.className = "detail-heading";
  ingredientsHeading.textContent = "Ingredients";

  const rowsContainer = document.createElement("div");

  function ensureTrailingBlank() {
    const last = state.ingredients[state.ingredients.length - 1];
    if (!last || last.item.trim() !== "") {
      const next = blankRow();
      state.ingredients.push(next);
      addRow(next);
    }
  }

  function addRow(rowState) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexWrap = "wrap";
    row.style.gap = "8px";
    row.style.marginBottom = "8px";
    row.style.alignItems = "center";

    const amount = styleField(document.createElement("input"));
    amount.type = "number";
    amount.placeholder = "amount";
    amount.value = rowState.amount;
    amount.style.width = "80px";
    amount.style.flex = "0 0 auto";
    amount.addEventListener("input", () => {
      rowState.amount = amount.value;
      persist();
    });

    const unit = styleField(makeSelect(["g", "kg", "ml", "l", "tbsp", "tsp", "none"], rowState.unit));
    unit.style.width = "auto";
    unit.style.flex = "0 0 auto";
    unit.addEventListener("change", () => {
      rowState.unit = unit.value;
      persist();
    });

    const item = styleField(document.createElement("input"));
    item.type = "text";
    item.placeholder = "item";
    item.value = rowState.item;
    item.style.flex = "1 1 120px";
    item.style.width = "auto";
    item.addEventListener("input", () => {
      rowState.item = item.value;
      persist();
      if (
        state.ingredients[state.ingredients.length - 1] === rowState &&
        item.value.trim() !== ""
      ) {
        ensureTrailingBlank();
      }
    });

    const stapleWrap = document.createElement("label");
    stapleWrap.style.display = "inline-flex";
    stapleWrap.style.alignItems = "center";
    stapleWrap.style.gap = "4px";
    stapleWrap.style.minHeight = "44px";
    stapleWrap.style.color = "var(--muted)";
    stapleWrap.style.fontFamily = "var(--font-ui)";
    stapleWrap.style.fontSize = "0.8125rem";
    const staple = document.createElement("input");
    staple.type = "checkbox";
    staple.checked = rowState.staple;
    staple.addEventListener("change", () => {
      rowState.staple = staple.checked;
      persist();
    });
    stapleWrap.append(staple, document.createTextNode("staple"));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "Remove ingredient");
    remove.style.width = "44px";
    remove.style.minHeight = "44px";
    remove.style.padding = "0";
    remove.style.flex = "0 0 auto";
    remove.addEventListener("click", () => {
      const idx = state.ingredients.indexOf(rowState);
      if (idx !== -1) state.ingredients.splice(idx, 1);
      row.remove();
      ensureTrailingBlank();
      persist();
    });

    row.append(amount, unit, item, stapleWrap, remove);
    rowsContainer.append(row);
  }

  state.ingredients.forEach((rowState) => addRow(rowState));
  ensureTrailingBlank();

  const stepsHeading = document.createElement("h3");
  stepsHeading.className = "detail-heading";
  stepsHeading.textContent = "Steps";

  const stepsArea = styleField(document.createElement("textarea"));
  stepsArea.rows = 6;
  stepsArea.style.minHeight = "120px";
  stepsArea.style.resize = "vertical";
  stepsArea.placeholder = "One step per line";
  stepsArea.value = state.steps;
  stepsArea.addEventListener("input", () => {
    state.steps = stepsArea.value;
    persist();
  });

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Save";
  saveButton.style.marginTop = "1.25rem";
  saveButton.addEventListener("click", () => saveForm(state));

  form.append(
    cancel,
    heading,
    labelWrap("Title", titleInput),
    labelWrap("Photo filename", photoInput),
    labelWrap("Servings", servingsInput),
    labelWrap("Type", typeSelect),
    labelWrap("Protein", proteinSelect),
    labelWrap("Format", formatSelect),
    labelWrap("Cuisine", cuisineSelect),
    labelWrap("Season", seasonSelect),
    labelWrap("Active minutes", activeInput),
    labelWrap("Total minutes", totalInput),
    labelWrap("Pots", potsInput),
    pausableField,
    makeAheadField,
    ingredientsHeading,
    rowsContainer,
    stepsHeading,
    stepsArea,
    saveButton
  );
}

function showForm() {
  list.style.display = "none";
  listTabs.style.display = "none";
  detail.innerHTML = "";
  detail.style.display = "none";
  roulette.innerHTML = "";
  roulette.style.display = "none";
  form.style.display = "";
}

function openForm(mode, recipe) {
  const draft = loadDraft();
  let state;
  if (mode === "add") {
    state = draft && draft.mode === "add" ? draft : blankState();
  } else if (draft && draft.mode === "edit" && draft.id === recipe.id) {
    state = draft;
  } else {
    state = stateFromRecipe(recipe);
  }
  saveDraft(state);
  buildForm(state);
  showForm();
}

function cancelForm(state) {
  clearDraft();
  if (state.mode === "edit") {
    const existing = loadStore().find((r) => r.id === state.id);
    if (existing) {
      showDetail(existing);
      return;
    }
  }
  showList();
}

function saveForm(state) {
  const title = state.title.trim();
  const stepsArray = state.steps
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  const ingredients = state.ingredients
    .filter((row) => row.item.trim() !== "")
    .map((row) => ({
      amount: row.amount === "" ? null : Number(row.amount),
      unit: row.unit === "none" ? null : row.unit,
      item: { en: row.item.trim(), pt: "", it: "" },
      staple: !!row.staple
    }));

  const fields = {
    title: { en: title, pt: "", it: "" },
    photo: state.photo.trim() === "" ? null : state.photo.trim(),
    servings: state.servings === "" ? null : Number(state.servings),
    type: state.type,
    protein: state.protein === "none" ? null : state.protein,
    format: state.format,
    cuisine: state.cuisine,
    season: state.season || "all year",
    activeMinutes: state.activeMinutes === "" ? null : Number(state.activeMinutes),
    totalMinutes: state.totalMinutes === "" ? null : Number(state.totalMinutes),
    pots: state.pots === "" ? null : Number(state.pots),
    pausable: !!state.pausable,
    makeAhead: !!state.makeAhead,
    ingredients: ingredients,
    steps: { en: stepsArray, pt: [], it: [] }
  };

  const data = loadStore();
  let saved;
  if (state.mode === "edit") {
    const idx = data.findIndex((r) => r.id === state.id);
    const base = idx !== -1 ? data[idx] : {};
    saved = { ...base, ...fields, id: state.id, number: state.number };
    if (idx !== -1) data[idx] = saved;
    else data.push(saved);
  } else {
    saved = {
      id: slugify(title),
      number: nextNumber(),
      ...fields,
      unexported: true
    };
    data.push(saved);
  }

  saveStore(data);
  clearDraft();
  renderList();
  showDetail(saved);
}

// ---- Roulette ----

const ROULETTE_PROTEINS = ["chicken", "seafood", "meat", "pork", "veg"];
const ROULETTE_SAVOURY_FORMATS = ["pasta", "rice", "soup", "salad", "roast", "bread", "pie", "stir fry"];
const ROULETTE_DESSERT_FORMATS = ["chocolate", "fruit", "custard", "pastry", "frozen"];
// [totalMinutes limit, label] — matches recipes with totalMinutes under the limit.
const ROULETTE_TIMES = [
  [30, "Under 30"],
  [60, "Under 60"],
  [90, "Under 90"],
  [120, "Under 2 hours"]
];

const rouletteState = {
  mode: "savoury",
  savouryProtein: "any",
  savouryFormat: "any",
  dessertFormat: "any",
  time: "any",
  lastId: null
};

function pillGroup(options, selected, onSelect) {
  // options: array of [value, label]
  const group = document.createElement("div");
  group.className = "pill-group";
  options.forEach(([value, label]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (value === selected ? " selected" : "");
    btn.textContent = label;
    btn.addEventListener("click", () => onSelect(value));
    group.append(btn);
  });
  return group;
}

function selectionLabel(options, value) {
  const found = options.find((opt) => opt[1] === value);
  return found ? found[0] : "any";
}

function matchingRecipes() {
  return loadStore().filter((r) => {
    if (rouletteState.time !== "any" && !(r.totalMinutes < rouletteState.time)) return false;
    if (rouletteState.mode === "dessert") {
      if (r.type !== "dessert") return false;
      if (rouletteState.dessertFormat !== "any" && r.format !== rouletteState.dessertFormat) return false;
      return true;
    }
    if (r.type !== "savoury") return false;
    if (rouletteState.savouryProtein !== "any" && r.protein !== rouletteState.savouryProtein) return false;
    if (rouletteState.savouryFormat !== "any" && r.format !== rouletteState.savouryFormat) return false;
    return true;
  });
}

function activeFiltersLabel() {
  const parts = [rouletteState.mode === "dessert" ? "Dessert" : "Savoury"];
  if (rouletteState.mode === "savoury") {
    if (rouletteState.savouryProtein !== "any") parts.push("protein: " + rouletteState.savouryProtein);
    if (rouletteState.savouryFormat !== "any") parts.push("format: " + rouletteState.savouryFormat);
  } else if (rouletteState.dessertFormat !== "any") {
    parts.push("format: " + rouletteState.dessertFormat);
  }
  if (rouletteState.time !== "any") {
    const t = ROULETTE_TIMES.find((x) => x[0] === rouletteState.time);
    parts.push("time: " + (t ? t[1].toLowerCase() : rouletteState.time));
  }
  return parts.join(", ");
}

function rouletteResultCard(recipe) {
  const card = document.createElement("article");
  card.className = "card";

  const colour =
    recipe.type === "dessert"
      ? proteinColours.dessert
      : proteinColours[recipe.protein] || "var(--ink)";

  const iconWrap = document.createElement("div");
  iconWrap.style.textAlign = "center";
  iconWrap.style.marginBottom = "0.5rem";
  const icon = document.createElement("i");
  icon.className = "ti " + formatIcons[recipe.format];
  icon.style.fontSize = "24px";
  icon.style.color = colour;
  iconWrap.append(icon);

  const number = document.createElement("div");
  number.className = "card-number";
  number.textContent = formatNumber(recipe.number);

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = pick(recipe.title, currentLang);

  const nodes = [iconWrap, number, title];
  if (recipe.servings !== null && recipe.servings !== undefined && recipe.servings !== "") {
    const serves = document.createElement("div");
    serves.className = "card-serves";
    serves.textContent = "serves " + recipe.servings;
    nodes.push(serves);
  }
  nodes.push(metaRow(recipe));

  card.append(...nodes);
  card.addEventListener("click", () => showDetail(recipe));
  return card;
}

function roll() {
  const resultArea = document.getElementById("roulette-result");
  resultArea.innerHTML = "";

  const matches = matchingRecipes();
  if (matches.length === 0) {
    const mark = document.createElement("img");
    mark.className = "roulette-empty-mark";
    mark.src = "photos/mbm-mark.png";
    mark.alt = "";
    const msg = document.createElement("div");
    msg.className = "roulette-empty";
    msg.textContent = "No recipes match " + activeFiltersLabel() + ".";
    resultArea.append(mark, msg);
    return;
  }

  // Avoid repeating the same recipe twice in a row when more than one matches.
  let pool = matches;
  if (matches.length > 1 && rouletteState.lastId !== null) {
    const filtered = matches.filter((r) => r.id !== rouletteState.lastId);
    if (filtered.length) pool = filtered;
  }
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  rouletteState.lastId = chosen.id;

  const again = document.createElement("button");
  again.type = "button";
  again.className = "roll-again-button";
  again.textContent = "Roll again";
  again.addEventListener("click", roll);

  resultArea.append(rouletteResultCard(chosen), again);
}

function buildRoulette() {
  roulette.innerHTML = "";

  const back = document.createElement("a");
  back.className = "back-link";
  back.href = "#";
  back.textContent = "← All recipes";
  back.addEventListener("click", (event) => {
    event.preventDefault();
    showList();
  });

  const modeToggle = pillGroup(
    [["savoury", "Savoury"], ["dessert", "Dessert"]],
    rouletteState.mode,
    (value) => {
      rouletteState.mode = value;
      rouletteState.lastId = null;
      buildRoulette();
    }
  );
  const modeRow = document.createElement("div");
  modeRow.className = "filter-row";
  modeRow.append(modeToggle);

  const count = document.createElement("div");
  count.className = "roulette-count";
  function updateCount() {
    count.textContent = matchingRecipes().length + " recipes match";
  }

  // The jars sit side by side in one row; a single options area below the row
  // shows the tapped jar's options, left-aligned with it. Only one open at a time.
  const jarsRow = document.createElement("div");
  jarsRow.className = "jars-row";

  const optionsArea = document.createElement("div");
  optionsArea.className = "jar-options-area";

  let openJar = null;

  function openOptions(config, jarEl, selectionEl) {
    optionsArea.innerHTML = "";
    const list = document.createElement("div");
    list.className = "jar-options";
    config.options.forEach(([label, value]) => {
      const opt = document.createElement("button");
      opt.type = "button";
      opt.className = "jar-option";
      opt.textContent = label;
      opt.addEventListener("click", () => {
        config.set(value);
        selectionEl.textContent = label;
        optionsArea.innerHTML = "";
        openJar = null;
        updateCount();
      });
      list.append(opt);
    });
    list.style.marginLeft =
      jarEl.getBoundingClientRect().left - optionsArea.getBoundingClientRect().left + "px";
    optionsArea.append(list);
    openJar = jarEl;
  }

  function addJar(config) {
    const jar = document.createElement("div");
    jar.className = "jar";

    const img = document.createElement("img");
    img.className = "jar-img";
    img.src = config.img;
    img.alt = "";
    img.style.height = config.imgHeight + "px";

    const labelEl = document.createElement("div");
    labelEl.className = "jar-label";
    labelEl.textContent = config.label;

    const selectionEl = document.createElement("div");
    selectionEl.className = "jar-selection";
    selectionEl.textContent = selectionLabel(config.options, config.get());

    jar.append(img, labelEl, selectionEl);
    jar.addEventListener("click", () => {
      if (openJar === jar) {
        optionsArea.innerHTML = "";
        openJar = null;
      } else {
        openOptions(config, jar, selectionEl);
      }
    });
    jarsRow.append(jar);
  }

  if (rouletteState.mode === "savoury") {
    addJar({
      img: "photos/jar-protein.png",
      imgHeight: 110,
      label: "PROTEIN",
      options: ROULETTE_PROTEINS.map((v) => [v, v]).concat([["any", "any"]]),
      get: () => rouletteState.savouryProtein,
      set: (v) => {
        rouletteState.savouryProtein = v;
      }
    });
    addJar({
      img: "photos/jar-format.png",
      imgHeight: 85,
      label: "FORMAT",
      options: ROULETTE_SAVOURY_FORMATS.map((v) => [v, v]).concat([["any", "any"]]),
      get: () => rouletteState.savouryFormat,
      set: (v) => {
        rouletteState.savouryFormat = v;
      }
    });
  } else {
    addJar({
      img: "photos/jar-protein.png",
      imgHeight: 110,
      label: "CATEGORY",
      options: ROULETTE_DESSERT_FORMATS.map((v) => [v, v]).concat([["any", "any"]]),
      get: () => rouletteState.dessertFormat,
      set: (v) => {
        rouletteState.dessertFormat = v;
      }
    });
  }

  addJar({
    img: "photos/jar-time.png",
    imgHeight: 85,
    label: "TIME",
    options: ROULETTE_TIMES.map(([v, l]) => [l.toLowerCase(), v]).concat([["any", "any"]]),
    get: () => rouletteState.time,
    set: (v) => {
      rouletteState.time = v;
    }
  });

  const rollButton = document.createElement("button");
  rollButton.type = "button";
  rollButton.className = "roll-button";
  rollButton.textContent = "Roll";
  rollButton.addEventListener("click", roll);

  const resultArea = document.createElement("div");
  resultArea.id = "roulette-result";

  roulette.append(back, modeRow, jarsRow, optionsArea, count, rollButton, resultArea);
  updateCount();
}

function showRoulette() {
  list.style.display = "none";
  listTabs.style.display = "none";
  detail.innerHTML = "";
  detail.style.display = "none";
  form.innerHTML = "";
  form.style.display = "none";
  roulette.style.display = "";
}

function openRoulette() {
  rouletteState.lastId = null;
  buildRoulette();
  showRoulette();
}

const menuButton = document.getElementById("btn-menu");
const menuPanel = document.getElementById("menu-panel");

function openMenu() {
  menuPanel.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menuPanel.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (menuPanel.hidden) openMenu();
  else closeMenu();
});

document.addEventListener("click", (event) => {
  if (!menuPanel.hidden && !menuPanel.contains(event.target)) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.getElementById("btn-add").addEventListener("click", () => {
  closeMenu();
  openForm("add");
});
document.getElementById("btn-roulette").addEventListener("click", openRoulette);
document.getElementById("btn-export").addEventListener("click", () => {
  closeMenu();
  exportRecipes();
});
document.getElementById("btn-reset").addEventListener("click", () => {
  closeMenu();
  resetRecipes();
});

// Compact header fades in once the resting banner has scrolled out of view.
const bannerHeader = document.getElementById("banner-header");
const compactHeader = document.getElementById("compact-header");
function updateCompactHeader() {
  // Show once scrolled past the bottom of the resting banner. Using scrollY vs the
  // banner's own height keeps the test stable when the compact-header padding is
  // toggled (which would otherwise move the banner and feed back on itself).
  const show = window.scrollY > bannerHeader.offsetHeight;
  compactHeader.classList.toggle("visible", show);
  document.body.classList.toggle("compact-visible", show);
}
window.addEventListener("scroll", updateCompactHeader, { passive: true });
updateCompactHeader();

// Clicking either header wordmark returns to the recipe list and scrolls to the
// top. The hamburger button is a separate element and is unaffected.
function goToRecipeList() {
  showList();
  window.scrollTo(0, 0);
}
document.getElementById("banner-large").addEventListener("click", goToRecipeList);
document.getElementById("banner-compact").addEventListener("click", goToRecipeList);

renderTabs();
renderList();
showList();
