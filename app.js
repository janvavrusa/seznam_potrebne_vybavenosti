"use strict";

const initialItems = [
  { id: 1, name: "Dětská hřiště", cost: 16800000, urgency: 2, preference: 3, city: 25, developers: 60, state: 10, eu: 0, region: 0, private: 0 },
  { id: 2, name: "Dům s pečovatelskou službou", cost: 294560000, urgency: 5, preference: 18, city: 25, developers: 10, state: 25, eu: 25, region: 15, private: 0 },
  { id: 3, name: "Výjezdové centrum Hasičů a IZS", cost: 134125000, urgency: 1, preference: 7, city: 20, developers: 0, state: 40, eu: 35, region: 15, private: 0 },
  { id: 4, name: "Komunitní centrum se sálem", cost: 47232000, urgency: 3, preference: 10, city: 0, developers: 20, state: 10, eu: 30, region: 0, private: 0 },
  { id: 5, name: "Krytá sportovní hala", cost: 114840000, urgency: 2, preference: 12, city: 20, developers: 20, state: 30, eu: 0, region: 15, private: 0 },
  { id: 6, name: "Lékárna", cost: 8187000, urgency: 1, preference: 11, city: 35, developers: 0, state: 0, eu: 0, region: 0, private: 100 },
  { id: 7, name: "Maloobchod potraviny", cost: 14821875, urgency: 2, preference: 14, city: 20, developers: 0, state: 0, eu: 0, region: 0, private: 100 },
  { id: 8, name: "Mateřská škola", cost: 202123200, urgency: 2, preference: 9, city: 0, developers: 30, state: 15, eu: 30, region: 0, private: 0 },
  { id: 9, name: "Městská knihovna", cost: 30110400, urgency: 3, preference: 13, city: 15, developers: 20, state: 0, eu: 20, region: 0, private: 0 },
  { id: 10, name: "Retence Modrozelená infrastruktura", cost: 3515400, urgency: 1, preference: 8, city: 10, developers: 50, state: 5, eu: 35, region: 0, private: 0 },
  { id: 11, name: "Objekt veřejných soc. zařízení", cost: 394740000, urgency: 5, preference: 5, city: 20, developers: 20, state: 20, eu: 30, region: 0, private: 0 },
  { id: 12, name: "Okrsková služebna policie", cost: 12255000, urgency: 1, preference: 19, city: 40, developers: 0, state: 80, eu: 0, region: 0, private: 0 },
  { id: 13, name: "Parkování", cost: 215000000, urgency: 3, preference: 15, city: 25, developers: 75, state: 0, eu: 5, region: 0, private: 5 },
  { id: 14, name: "Podzemní kontejnery", cost: 25200000, urgency: 2.5, preference: 6, city: 15, developers: 50, state: 0, eu: 35, region: 0, private: 0 },
  { id: 15, name: "Poliklinika", cost: 54580000, urgency: 1, preference: 20, city: 40, developers: 10, state: 0, eu: 0, region: 10, private: 60 },
  { id: 16, name: "Pošta", cost: 7353000, urgency: 1, preference: 17, city: 20, developers: 30, state: 50, eu: 0, region: 0, private: 0 },
  { id: 17, name: "Sběrný dvůr", cost: 5160000, urgency: 1, preference: 16, city: 60, developers: 0, state: 10, eu: 50, region: 0, private: 0 },
  { id: 18, name: "Terminál MHD", cost: 21088500, urgency: 1, preference: 1, city: 80, developers: 10, state: 15, eu: 50, region: 5, private: 0 },
  { id: 19, name: "Veřejná pobytová zeleň", cost: 51000000, urgency: 3, preference: 2, city: 30, developers: 40, state: 10, eu: 30, region: 0, private: 0 },
  { id: 20, name: "Základní škola", cost: 421090000, urgency: 3, preference: 4, city: 10, developers: 25, state: 30, eu: 20, region: 0, private: 0 },
  { id: 21, name: "Zázemí technických služeb", cost: 26985000, urgency: 1, preference: 10, city: 30, developers: 20, state: 0, eu: 0, region: 0, private: 0 }
].map((item) => ({ ...item, selected: true }));

const weightDefinitions = [
  { key: "cost", label: "Finanční náročnost celková RTS" },
  { key: "urgency", label: "Naléhavost (legislativní a plánovací)" },
  { key: "preference", label: "Preference respondentů" },
  { key: "city", label: "Podíl financování — Město", fundingShare: true },
  { key: "developers", label: "Podíl financování — Developeři", fundingShare: true },
  { key: "state", label: "Podíl financování — Stát", fundingShare: true },
  { key: "eu", label: "Podíl financování — EU", fundingShare: true },
  { key: "region", label: "Podíl financování — Kraj", fundingShare: true },
  { key: "private", label: "Podíl financování — Soukromí", fundingShare: true },
  { key: "funding", label: "Celková váha nevyrovnané finanční zátěže", fundingTotal: true }
];

const itemFields = [
  { key: "name", label: "Název projektu", type: "text", wide: true },
  { key: "cost", label: "Cena celková RTS (Kč)", type: "number", min: 0, step: 1 },
  { key: "urgency", label: "Naléhavost (0–5)", type: "number", min: 0, max: 5, step: 0.5 },
  { key: "preference", label: "Preference respondentů", type: "number", min: 0, step: 1 },
  { key: "city", label: "Město (%)", type: "number", min: 0, max: 100, step: 1 },
  { key: "developers", label: "Developeři (%)", type: "number", min: 0, max: 100, step: 1 },
  { key: "state", label: "Stát (%)", type: "number", min: 0, max: 100, step: 1 },
  { key: "eu", label: "EU (%)", type: "number", min: 0, max: 100, step: 1 },
  { key: "region", label: "Kraj (%)", type: "number", min: 0, max: 100, step: 1 },
  { key: "private", label: "Soukromí (%)", type: "number", min: 0, max: 100, step: 1 }
];

const defaultWeights = {
  cost: 3, urgency: 0, preference: 3, city: 5, developers: 10,
  state: 0, eu: 0, region: 0, private: 0, funding: 1
};

let items = initialItems;
let weights = { ...defaultWeights };
let lastEnabledWeights = { ...defaultWeights, urgency: 1, state: 1, eu: 1, region: 1, private: 1 };
let sourceWorkbook = null;
let sourceSheetName = "List 1";
let editingItemId = null;
let noticeTimer = null;

const itemList = document.querySelector("#item-list");
const rankingList = document.querySelector("#ranking-list");
const weightList = document.querySelector("#weight-list");
const fileInput = document.querySelector("#file-input");
const dropzone = document.querySelector("#dropzone");
const editDialog = document.querySelector("#edit-dialog");
const editForm = document.querySelector("#edit-form");

function formatNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits }).format(value);
}

function formatCurrency(value) {
  return `${formatNumber(value, 0)} Kč`;
}

function calcSubBurden(weight, percentage) {
  if (weight === 0) return 0;
  if (weight === 5) return 0;
  return Math.abs(weight - percentage / 10);
}

function calculateScore(item) {
  const totalCost = items.reduce((total, entry) => total + numberValue(entry.cost), 0);
  const count = items.length;
  const fundingKeys = ["city", "developers", "state", "eu", "region", "private"];
  const fundingBurden = fundingKeys.reduce(
    (total, key) => total + calcSubBurden(numberValue(weights[key]), numberValue(item[key])),
    0
  );
  return (
    numberValue(weights.cost) * (totalCost ? numberValue(item.cost) / totalCost : 0) +
    numberValue(weights.urgency) * (numberValue(item.urgency) / 5) +
    numberValue(weights.preference) * (numberValue(item.preference) / (count || 1)) +
    (numberValue(weights.funding) / 5) * fundingBurden
  );
}

function numberValue(value) {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

function weightRowForItems() {
  return Math.max(30, items.length + 9);
}

function findWeightRow(sheet) {
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z52");
  for (let row = 1; row <= range.e.r + 1; row += 1) {
    const label = getCellValue(sheet, row, 3);
    if (typeof label === "string" && label.toLocaleLowerCase("cs").includes("koeficienty vážení položek")) {
      return row;
    }
  }
  return 30;
}

function rankedSelectedItems() {
  return items
    .filter((item) => item.selected)
    .map((item) => ({ item, score: calculateScore(item) }))
    .sort((a, b) => a.score - b.score || a.item.id - b.item.id);
}

function updateWeightAppearance() {
  for (const definition of weightDefinitions) {
    const control = document.querySelector(`#weight-${definition.key}`)?.closest(".weight-control");
    if (!control) continue;
    const enabled = numberValue(weights[definition.key]) > 0;
    control.classList.toggle("is-zero", !enabled);
    control.classList.toggle(
      "is-inactive",
      definition.key !== "funding" &&
        ["city", "developers", "state", "eu", "region", "private"].includes(definition.key) &&
        numberValue(weights.funding) === 0
    );
    const slider = control.querySelector('input[type="range"]');
    const toggle = control.querySelector('input[type="checkbox"]');
    const description = control.querySelector(".weight-description");
    const weight = numberValue(weights[definition.key]);
    if (slider) {
      slider.disabled = !enabled || (definition.key !== "funding" && definition.key !== "cost" &&
        definition.key !== "urgency" && definition.key !== "preference" &&
        numberValue(weights.funding) === 0);
    }
    if (toggle) toggle.checked = enabled;
    if (description) description.textContent = getWeightDescription(definition, weight);
  }
}

function getWeightDescription(definition, weight) {
  if (definition.fundingShare) {
    if (weight === 0) return "Není rozhodující";
    if (weight === 1) return "Minimální podíl";
    if (weight === 5) return "Není preference";
    if (weight === 10) return "Maximální kontribuce";
    return "Nastavte preferovaný podíl financování";
  }
  if (definition.fundingTotal && weight === 0) return "Spoluúčast nepřipadá v úvahu";
  if (weight === 0) return "Není rozhodující";
  if (weight === 1) return "Záleží na ní minimálně";
  if (weight === 10) return "Záleží na ní maximálně";
  return "Nastavte důležitost parametru";
}

function createWeightControls() {
  weightList.replaceChildren();
  for (const definition of weightDefinitions) {
    const wrapper = document.createElement("div");
    wrapper.className = "weight-control";
    const label = document.createElement("label");
    label.htmlFor = `weight-${definition.key}`;
    label.textContent = definition.label;
    const value = document.createElement("output");
    value.className = "weight-value";
    value.id = `weight-value-${definition.key}`;
    value.htmlFor = `weight-${definition.key}`;
    const toggleLabel = document.createElement("label");
    toggleLabel.className = "weight-switch";
    toggleLabel.setAttribute("aria-label", `Zapnout parametr: ${definition.label}`);
    const toggle = document.createElement("input");
    toggle.id = `weight-toggle-${definition.key}`;
    toggle.type = "checkbox";
    toggle.checked = numberValue(weights[definition.key]) > 0;
    toggle.setAttribute("aria-label", `Zapnout nebo vypnout: ${definition.label}`);
    const switchTrack = document.createElement("span");
    switchTrack.className = "switch-track";
    toggleLabel.append(toggle, switchTrack);
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        weights[definition.key] = Math.max(1, numberValue(lastEnabledWeights[definition.key]) || 1);
      } else {
        if (numberValue(weights[definition.key]) > 0) {
          lastEnabledWeights[definition.key] = numberValue(weights[definition.key]);
        }
        weights[definition.key] = 0;
      }
      slider.value = String(Math.max(1, weights[definition.key]));
      value.value = String(weights[definition.key]);
      slider.style.setProperty("--fill", `${((Math.max(1, weights[definition.key]) - 1) / 9) * 100}%`);
      updateWeightAppearance();
      renderRanking();
    });
    const slider = document.createElement("input");
    slider.id = `weight-${definition.key}`;
    slider.type = "range";
    slider.min = "1";
    slider.max = "10";
    slider.step = "0.1";
    slider.value = String(Math.max(1, numberValue(weights[definition.key])));
    slider.setAttribute("aria-label", definition.label);
    slider.addEventListener("input", () => {
      weights[definition.key] = Number(slider.value);
      lastEnabledWeights[definition.key] = weights[definition.key];
      value.value = formatNumber(weights[definition.key], 1);
      slider.style.setProperty("--fill", `${((weights[definition.key] - 1) / 9) * 100}%`);
      updateWeightAppearance();
      renderRanking();
    });
    slider.addEventListener("change", () => renderRanking());
    const description = document.createElement("p");
    description.className = "weight-description";
    description.id = `weight-description-${definition.key}`;
    slider.setAttribute("aria-describedby", description.id);
    const switchAndValue = document.createElement("div");
    switchAndValue.className = "weight-value-tools";
    switchAndValue.append(value, toggleLabel);
    const topline = document.createElement("div");
    topline.className = "weight-topline";
    topline.append(label, switchAndValue);
    wrapper.append(topline, slider);
    wrapper.append(description);
    if (definition.fundingShare) {
      const scale = document.createElement("div");
      scale.className = "funding-scale";
      scale.innerHTML = '<span><b>1</b><span>Minimální podíl</span></span><span><b>5</b><span>Není preference</span></span><span><b>10</b><span>Maximální kontribuce</span></span>';
      wrapper.append(scale);
    }
    weightList.append(wrapper);
    value.value = formatNumber(weights[definition.key], 1);
    slider.style.setProperty("--fill", `${((Math.max(1, weights[definition.key]) - 1) / 9) * 100}%`);
  }
  updateWeightAppearance();
}

function renderItems() {
  const query = document.querySelector("#search-input").value.trim().toLocaleLowerCase("cs");
  const filtered = items.filter((item) => item.name.toLocaleLowerCase("cs").includes(query));
  itemList.replaceChildren();
  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = "Žádný projekt neodpovídá hledání.";
    itemList.append(empty);
  }

  for (const item of filtered) {
    const row = document.createElement("div");
    row.className = "item-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.selected;
    checkbox.setAttribute("aria-label", `Zařadit ${item.name}`);
    checkbox.addEventListener("change", () => {
      item.selected = checkbox.checked;
      renderItems();
      renderRanking();
    });
    const name = document.createElement("button");
    name.className = `item-name${item.selected ? " is-selected" : ""}`;
    name.type = "button";
    name.textContent = item.name;
    name.title = "Dvojklikem upravíte údaje projektu";
    name.addEventListener("dblclick", () => openEditor(item));
    name.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.shiftKey) openEditor(item);
    });
    const edit = document.createElement("button");
    edit.className = "edit-item";
    edit.type = "button";
    edit.setAttribute("aria-label", `Upravit ${item.name}`);
    edit.title = "Upravit projekt";
    edit.textContent = "↗";
    edit.addEventListener("click", () => openEditor(item));
    row.append(checkbox, name, edit);
    itemList.append(row);
  }

  const selected = items.filter((item) => item.selected).length;
  document.querySelector("#item-count").textContent = String(items.length);
  document.querySelector("#selected-count").textContent = `${selected} zařazeno`;
  document.querySelector("#toggle-all").textContent = selected === items.length ? "Odebrat vše" : "Vybrat vše";
}

function renderRanking() {
  const ranked = rankedSelectedItems();
  rankingList.replaceChildren();
  for (const [index, entry] of ranked.entries()) {
    const row = document.createElement("li");
    row.className = "ranking-row";
    const number = document.createElement("span");
    number.className = "rank-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const details = document.createElement("div");
    details.className = "rank-details";
    const name = document.createElement("p");
    name.className = "rank-name";
    name.textContent = entry.item.name;
    const description = document.createElement("p");
    description.className = "rank-detail";
    description.textContent = formatCurrency(entry.item.cost);
    details.append(name, description);
    const score = document.createElement("span");
    score.className = "rank-score";
    score.textContent = formatNumber(entry.score, 3);
    const scoreLabel = document.createElement("small");
    scoreLabel.textContent = "index";
    score.append(scoreLabel);
    row.append(number, details, score);
    rankingList.append(row);
  }
  document.querySelector("#rank-count").textContent = `${ranked.length} ${ranked.length === 1 ? "položka" : ranked.length >= 2 && ranked.length <= 4 ? "položky" : "položek"}`;
  document.querySelector("#empty-ranking").hidden = ranked.length > 0;
  rankingList.hidden = ranked.length === 0;
}

function openEditor(item = null) {
  editingItemId = item?.id ?? null;
  const isNew = item === null;
  document.querySelector("#dialog-eyebrow").textContent = isNew ? "NOVÝ PROJEKT" : "ÚPRAVA PROJEKTU";
  document.querySelector("#dialog-title").textContent = isNew ? "Přidat vlastní položku" : item.name;
  document.querySelector("#save-item").textContent = isNew ? "Přidat projekt" : "Uložit změny";
  const fields = document.querySelector("#edit-fields");
  fields.replaceChildren();
  for (const definition of itemFields) {
    const wrapper = document.createElement("div");
    wrapper.className = `edit-field${definition.wide ? " wide" : ""}`;
    const label = document.createElement("label");
    label.htmlFor = `edit-${definition.key}`;
    label.textContent = definition.label;
    const input = document.createElement("input");
    input.id = `edit-${definition.key}`;
    input.name = definition.key;
    input.type = definition.type;
    if (definition.min !== undefined) input.min = String(definition.min);
    if (definition.max !== undefined) input.max = String(definition.max);
    if (definition.step) input.step = String(definition.step);
    input.required = true;
    const defaultValue = definition.key === "name" ? "" : 0;
    input.value = String(item?.[definition.key] ?? defaultValue);
    wrapper.append(label, input);
    fields.append(wrapper);
  }
  editDialog.showModal();
  fields.querySelector("input").focus();
}

function showNotice(message, isError = false) {
  const notice = document.querySelector("#notice");
  notice.textContent = message;
  notice.hidden = false;
  notice.classList.toggle("error", isError);
  window.clearTimeout(noticeTimer);
  if (!isError) {
    noticeTimer = window.setTimeout(() => { notice.hidden = true; }, 6000);
  }
}

function getCellValue(sheet, row, column) {
  const cell = sheet[XLSX.utils.encode_cell({ r: row - 1, c: column - 1 })];
  return cell?.v ?? null;
}

function readWorkbook(file) {
  return file.arrayBuffer().then((buffer) => {
    const workbook = XLSX.read(buffer, { type: "array", cellStyles: true, cellFormula: true });
    const sheetName = workbook.SheetNames.includes("List 1") ? "List 1" : workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error("V sešitu nebyl nalezen žádný list.");

    const importedItems = [];
    const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z40");
    const weightRow = findWeightRow(sheet);
    for (let row = 8; row <= Math.min(weightRow - 2, range.e.r + 1); row += 1) {
      const nameValue = getCellValue(sheet, row, 3);
      const idValue = getCellValue(sheet, row, 2);
      if (nameValue === null || String(nameValue).trim() === "") continue;
      const values = {
        id: Number(idValue) || importedItems.length + 1,
        name: String(nameValue),
        cost: getCellValue(sheet, row, 4),
        urgency: getCellValue(sheet, row, 5),
        preference: getCellValue(sheet, row, 6),
        city: getCellValue(sheet, row, 7),
        developers: getCellValue(sheet, row, 8),
        state: getCellValue(sheet, row, 9),
        eu: getCellValue(sheet, row, 10),
        region: getCellValue(sheet, row, 11),
        private: getCellValue(sheet, row, 12),
        selected: true
      };
      for (const key of ["cost", "urgency", "preference", "city", "developers", "state", "eu", "region", "private"]) {
        values[key] = numberValue(values[key]);
      }
      importedItems.push(values);
    }
    if (!importedItems.length) {
      throw new Error("V sešitu jsem nenašel položky. Očekávám názvy ve sloupci C od řádku 8.");
    }
    const importedWeights = {
      cost: numberValue(getCellValue(sheet, weightRow, 4)),
      urgency: numberValue(getCellValue(sheet, weightRow, 5)),
      preference: numberValue(getCellValue(sheet, weightRow, 6)),
      city: numberValue(getCellValue(sheet, weightRow, 7)),
      developers: numberValue(getCellValue(sheet, weightRow, 8)),
      state: numberValue(getCellValue(sheet, weightRow, 9)),
      eu: numberValue(getCellValue(sheet, weightRow, 10)),
      region: numberValue(getCellValue(sheet, weightRow, 11)),
      private: numberValue(getCellValue(sheet, weightRow, 12)),
      funding: numberValue(getCellValue(sheet, weightRow + 1, 7))
    };
    return { workbook, sheetName, items: importedItems, weights: importedWeights };
  });
}

async function importFile(file) {
  if (!file) return;
  try {
    const imported = await readWorkbook(file);
    items = imported.items;
    weights = imported.weights;
    lastEnabledWeights = { ...defaultWeights, urgency: 1, state: 1, eu: 1, region: 1, private: 1 };
    for (const definition of weightDefinitions) {
      if (weights[definition.key] > 0) lastEnabledWeights[definition.key] = weights[definition.key];
    }
    sourceWorkbook = imported.workbook;
    sourceSheetName = imported.sheetName;
    document.querySelector("#project-name").textContent = file.name;
    createWeightControls();
    renderItems();
    renderRanking();
    showNotice(`Načteno ${items.length} položek ze souboru ${file.name}.`);
  } catch (error) {
    showNotice(`Soubor se nepodařilo načíst: ${error.message}`, true);
  } finally {
    fileInput.value = "";
  }
}

function setWorkbookCell(sheet, address, value, formula = null) {
  const oldCell = sheet[address] || {};
  const cell = { ...oldCell };
  delete cell.f;
  delete cell.F;
  if (value === null || value === undefined || value === "") {
    delete cell.v;
    delete cell.t;
  } else {
    cell.v = value;
    cell.t = typeof value === "number" ? "n" : "s";
  }
  if (formula) {
    cell.f = formula;
    if (typeof value !== "number") cell.t = "n";
  }
  sheet[address] = cell;
}

function scoreFormula(row, lastItemRow, helperRow = fundingHelperRow(row), weightRow = weightRowForItems()) {
  return `$D$${weightRow}*D${row}/SUM($D$8:$D$${lastItemRow})+$E$${weightRow}*E${row}/5+$F$${weightRow}*F${row}/COUNT($F$8:$F$${lastItemRow})+($G$${weightRow + 1}/5)*SUM(R${helperRow}:W${helperRow})`;
}

function burdenFormula(weightCell, percentageCell) {
  return `IF(${weightCell}=0,0,IF(${weightCell}=5,0,ABS(${weightCell}-${percentageCell}/10)))`;
}

function fundingHelperRow(row) {
  return row + Math.max(24, items.length + 3);
}

function createTemplateWorkbook() {
  const workbook = XLSX.utils.book_new();
  const sheet = {};
  const helperOffset = Math.max(24, items.length + 3);
  const weightRow = weightRowForItems();
  sheet["!ref"] = `A1:Z${Math.max(52, items.length + 7 + helperOffset, weightRow + 1)}`;
  sheet["!cols"] = [
    { wch: 2 }, { wch: 7 }, { wch: 40 }, { wch: 18 }, { wch: 13 }, { wch: 20 },
    { wch: 13 }, { wch: 15 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 13 },
    { wch: 15 }, { wch: 3 }, { wch: 12 }, { wch: 40 }, { wch: 16 }, { wch: 12 },
    { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
    { wch: 12 }, { wch: 15 }
  ];
  setWorkbookCell(sheet, "G6", "podíl subjektů");
  const headers = [
    ["D7", "Finanční náročnost celková RTS"], ["E7", "Naléhavost (legislativní a plánovací)"], ["F7", "Preference respondentů"],
    ["G7", "Město [%]"], ["H7", "Developeři [%]"], ["I7", "Stát [%]"],
    ["J7", "EU [%]"], ["K7", "Kraj [%]"], ["L7", "Soukromí [%]"],
    ["M7", "Index Kamechy"], ["O7", "Vypočítané pořadí položek seznamu"],
    ["P7", "Seřazené položky podle nastavených preferencí"]
  ];
  for (const [address, value] of headers) setWorkbookCell(sheet, address, value);
  setWorkbookCell(sheet, `C${weightRow}`, "koeficienty vážení položek (0-10)");
  setWorkbookCell(sheet, `F${weightRow + 1}`, "Celková váha nevyrovnané finanční zátěže");

  const ordered = rankedSelectedItems();
  const lastItemRow = Math.max(items.length + 7, 8);
  items.forEach((item, index) => {
    const row = index + 8;
    const values = [item.id, item.name, numberValue(item.cost), numberValue(item.urgency), numberValue(item.preference),
      numberValue(item.city), numberValue(item.developers), numberValue(item.state), numberValue(item.eu),
      numberValue(item.region), numberValue(item.private)];
    values.forEach((value, offset) => setWorkbookCell(sheet, XLSX.utils.encode_cell({ r: row - 1, c: offset + 1 }), value));
    const helperRow = fundingHelperRow(row);
    setWorkbookCell(sheet, `M${row}`, calculateScore(item), scoreFormula(row, lastItemRow, helperRow, weightRow));
    setWorkbookCell(sheet, `O${row}`, index + 1);
    const fundingKeys = ["city", "developers", "state", "eu", "region", "private"];
    fundingKeys.forEach((key, offset) => {
      const weightColumn = String.fromCharCode(71 + offset);
      const itemColumn = String.fromCharCode(71 + offset);
      setWorkbookCell(
        sheet,
        `${String.fromCharCode(82 + offset)}${helperRow}`,
        calcSubBurden(numberValue(weights[key]), numberValue(item[key])),
        burdenFormula(`${weightColumn}$${weightRow}`, `${itemColumn}${row}`)
      );
    });
  });

  weightDefinitions.slice(0, 9).forEach((definition, index) => {
    setWorkbookCell(sheet, `${String.fromCharCode(68 + index)}${weightRow}`, numberValue(weights[definition.key]));
  });
  setWorkbookCell(sheet, `G${weightRow + 1}`, numberValue(weights.funding));
  ordered.forEach(({ item }) => {
    const sourceRow = items.indexOf(item) + 8;
    const sortedRow = ordered.findIndex((entry) => entry.item === item) + 8;
    const sortedValues = [item.name, numberValue(item.cost), numberValue(item.urgency), numberValue(item.preference),
      numberValue(item.city), numberValue(item.developers), numberValue(item.state), numberValue(item.eu),
      numberValue(item.region), numberValue(item.private), calculateScore(item)];
    sortedValues.forEach((value, offset) => setWorkbookCell(sheet, XLSX.utils.encode_cell({ r: sortedRow - 1, c: offset + 15 }), value));
    setWorkbookCell(sheet, `O${sortedRow}`, sourceRow - 7);
  });

  XLSX.utils.book_append_sheet(workbook, sheet, "List 1");
  workbook.Workbook = { ...(workbook.Workbook || {}), CalcPr: { fullCalcOnLoad: true, forceFullCalc: true } };
  return workbook;
}

function exportWorkbook() {
  const workbook = sourceWorkbook
    ? XLSX.read(XLSX.write(sourceWorkbook, { bookType: "xlsx", type: "array" }), { type: "array", cellStyles: true, cellFormula: true })
    : createTemplateWorkbook();
  const sheet = workbook.Sheets[sourceSheetName] || workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error("V sešitu není list, do kterého lze exportovat.");

  const lastItemRow = Math.max(items.length + 7, 8);
  const weightRow = weightRowForItems();
  items.forEach((item, index) => {
    const row = index + 8;
    const values = [item.id, item.name, numberValue(item.cost), numberValue(item.urgency), numberValue(item.preference),
      numberValue(item.city), numberValue(item.developers), numberValue(item.state), numberValue(item.eu),
      numberValue(item.region), numberValue(item.private)];
    values.forEach((value, offset) => setWorkbookCell(sheet, XLSX.utils.encode_cell({ r: row - 1, c: offset + 1 }), value));
    const helperRow = fundingHelperRow(row);
    setWorkbookCell(sheet, `M${row}`, calculateScore(item), scoreFormula(row, lastItemRow, helperRow, weightRow));
    setWorkbookCell(sheet, `O${row}`, index + 1);
    const fundingKeys = ["city", "developers", "state", "eu", "region", "private"];
    fundingKeys.forEach((key, offset) => {
      const col = String.fromCharCode(71 + offset);
      setWorkbookCell(
        sheet,
        `${String.fromCharCode(82 + offset)}${helperRow}`,
        calcSubBurden(numberValue(weights[key]), numberValue(item[key])),
        burdenFormula(`${col}$${weightRow}`, `${col}${row}`)
      );
    });
  });

  setWorkbookCell(sheet, "D7", "Finanční náročnost celková RTS");
  setWorkbookCell(sheet, "E7", "Naléhavost (legislativní a plánovací)");
  setWorkbookCell(sheet, `C${weightRow}`, "koeficienty vážení položek (0-10)");
  setWorkbookCell(sheet, `F${weightRow + 1}`, "Celková váha nevyrovnané finanční zátěže");
  weightDefinitions.slice(0, 9).forEach((definition, index) => {
    setWorkbookCell(sheet, `${String.fromCharCode(68 + index)}${weightRow}`, numberValue(weights[definition.key]));
  });
  setWorkbookCell(sheet, `G${weightRow + 1}`, numberValue(weights.funding));

  const ranked = rankedSelectedItems();
  const exportRows = Math.max(items.length, 21);
  for (let offset = 0; offset < exportRows; offset += 1) {
    const row = offset + 8;
    const entry = ranked[offset];
    const sortedValues = entry
      ? [entry.item.name, numberValue(entry.item.cost), numberValue(entry.item.urgency), numberValue(entry.item.preference),
        numberValue(entry.item.city), numberValue(entry.item.developers), numberValue(entry.item.state), numberValue(entry.item.eu),
        numberValue(entry.item.region), numberValue(entry.item.private), entry.score]
      : Array(11).fill(null);
    sortedValues.forEach((value, colOffset) => setWorkbookCell(sheet, XLSX.utils.encode_cell({ r: row - 1, c: colOffset + 15 }), value));
    setWorkbookCell(sheet, `O${row}`, entry ? offset + 1 : null);
  }
  const finalRange = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z52");
  sheet["!ref"] = XLSX.utils.encode_range({
    s: finalRange.s,
    e: {
      r: Math.max(finalRange.e.r, items.length + 6 + Math.max(24, items.length + 3)),
      c: Math.max(finalRange.e.c, 25)
    }
  });
  workbook.Workbook = {
    ...(workbook.Workbook || {}),
    CalcPr: { ...(workbook.Workbook?.CalcPr || {}), fullCalcOnLoad: true, forceFullCalc: true }
  };
  XLSX.writeFile(workbook, "Vysledky-razeni.xlsx", { bookType: "xlsx", compression: true });
  showNotice("Výsledky byly exportovány do souboru Vysledky-razeni.xlsx.");
}

fileInput.addEventListener("change", () => importFile(fileInput.files?.[0]));
document.querySelector("#search-input").addEventListener("input", renderItems);
document.querySelector("#add-item").addEventListener("click", () => openEditor());
document.querySelector("#toggle-all").addEventListener("click", () => {
  const selectAll = items.some((item) => !item.selected);
  items = items.map((item) => ({ ...item, selected: selectAll }));
  renderItems();
  renderRanking();
});
document.querySelector("#export-button").addEventListener("click", () => {
  try {
    exportWorkbook();
  } catch (error) {
    showNotice(`Excel se nepodařilo vytvořit: ${error.message}`, true);
  }
});
document.querySelector("#close-dialog").addEventListener("click", () => editDialog.close());
document.querySelector("#cancel-edit").addEventListener("click", () => editDialog.close());
editDialog.addEventListener("click", (event) => {
  if (event.target === editDialog) editDialog.close();
});
editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = items.find((entry) => entry.id === editingItemId);
  const formData = new FormData(editForm);
  const updated = item ? { ...item } : {
    id: Math.max(0, ...items.map((entry) => numberValue(entry.id))) + 1,
    selected: true
  };
  for (const field of itemFields) {
    const value = formData.get(field.key);
    updated[field.key] = field.type === "number" ? Number(value) : String(value).trim();
  }
  if (!updated.name) {
    showNotice("Název projektu nesmí být prázdný.", true);
    return;
  }
  if (itemFields.filter((field) => field.type === "number").some((field) => !Number.isFinite(updated[field.key]))) {
    showNotice("Zkontrolujte prosím číselné hodnoty.", true);
    return;
  }
  items = item
    ? items.map((entry) => entry.id === editingItemId ? updated : entry)
    : [...items, updated];
  renderItems();
  renderRanking();
  editDialog.close();
  showNotice(item ? "Údaje projektu byly aktualizovány." : "Vlastní projekt byl přidán do seznamu.");
});

for (const eventName of ["dragenter", "dragover"]) {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.add("is-dragging");
  });
}
for (const eventName of ["dragleave", "drop"]) {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragging");
  });
}
dropzone.addEventListener("drop", (event) => importFile(event.dataTransfer?.files?.[0]));
window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#search-input").focus();
  }
});

createWeightControls();
renderItems();
renderRanking();
