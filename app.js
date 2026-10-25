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
  { key: "private", label: "Podíl financování — Soukromí investoři", fundingShare: true },
  { key: "funding", label: "Celková váha nevyrovnané finanční zátěže", fundingTotal: true }
];

const itemFields = [
  {
    key: "name", label: "Název položky", type: "text", wide: true,
    help: "Uveďte název chybějícího prvku veřejné vybavenosti.",
    link: "https://mmr.gov.cz/cs/ministerstvo/stavebni-pravo/stanoviska-a-metodiky/uzemni-planovani/stanoviska-a-metodiky-k-zakonu-c-183-2006-sb-,-do/9-ostatni-stanoviska-a-metodiky/standardy-dostupnosti-verejne-infrastruktury",
    linkTitle: "Otevřít metodiku MMR ke standardům dostupnosti veřejné infrastruktury"
  },
  {
    key: "cost", label: "Finanční náročnost celková RTS (Kč)", type: "number", min: 0, step: 1,
    help: "Celková odhadovaná cena položky v korunách podle cenové soustavy RTS/THU.",
    link: "https://www.cenovasoustava.cz/dok/ceny/thu_2026.html",
    linkTitle: "Otevřít cenovou soustavu RTS/THU 2026"
  },
  {
    key: "urgency", label: "Naléhavost (0–5)", type: "number", min: 0, max: 5, step: 0.5,
    help: "Zohledňuje legislativní a plánovací připravenost. 0 = nejvyšší naléhavost, 5 = nejnižší."
  },
  {
    key: "preference", label: "Pořadí preference respondentů", type: "number", min: 0, step: 1,
    help: "Pořadí podle dotazníkového šetření; nižší číslo znamená vyšší preferenci."
  },
  {
    key: "city", label: "Podíl financování města (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený městem v procentech."
  },
  {
    key: "developers", label: "Podíl financování developerů (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený developery v procentech."
  },
  {
    key: "state", label: "Podíl financování státu (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený státem v procentech."
  },
  {
    key: "eu", label: "Podíl financování EU (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený z fondů EU v procentech."
  },
  {
    key: "region", label: "Podíl financování kraje (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený krajem v procentech."
  },
  {
    key: "private", label: "Podíl financování soukromými investory (%)", type: "number", min: 0, max: 100, step: 1, fundingShare: true,
    help: "Předpokládaný podíl celkových nákladů položky hrazený soukromými investory v procentech."
  }
];

const defaultWeights = {
  cost: 3, urgency: 0, preference: 3, city: 5, developers: 10,
  state: 0, eu: 0, region: 0, private: 0, funding: 1
};

const fundingKeys = ["city", "developers", "state", "eu", "region", "private"];
let items = initialItems;
let weights = { ...defaultWeights };
let lastEnabledWeights = { ...defaultWeights, urgency: 1, state: 1, eu: 1, region: 1, private: 1 };
let customCriteria = [];
let sourceColumns = {
  id: 1, name: 2, cost: 3, score: 4, urgency: 5, preference: 6,
  city: 7, developers: 8, state: 9, eu: 10, region: 11, private: 12
};
let sourceWeightColumns = { funding: 1 };
let sourceWorkbook = null;
let sourceSheetName = "List 1";
let editingItemId = null;
let noticeTimer = null;
let tutorialStepIndex = 0;

const tutorialSteps = [
  {
    title: "1. Připravte seznam",
    text: "V seznamu už jsou ukázkové položky. Můžete je upravit, doplnit vlastní nebo nahrát svůj sešit.",
    bullets: [
      "Tlačítkem + Přidat vytvoříte položku. Údaje existující položky otevřete dvojklikem nebo tlačítkem úprav vedle ní.",
      "Soubor Excel nahrajete přetažením do pole Vložit Excel sešit nebo kliknutím na toto pole.",
      "Do výsledného pořadí vstupují jen zaškrtnuté položky. Ostatní v seznamu zůstanou."
    ]
  },
  {
    title: "2. Doplňte údaje položek",
    text: "V editoru položky upravte údaje, které chcete při rozhodování zohlednit. Nemusíte vyplňovat kritéria, která nepoužijete.",
    bullets: [
      "Pořadí preference respondentů zapište podle dotazníku; nižší číslo znamená vyšší preferenci.",
      "Naléhavost se zadává od 0 (nejvyšší) do 5 (nejnižší).",
      "U financování vyplňte předpokládané podíly jednotlivých zdrojů v procentech."
    ]
  },
  {
    title: "3. Nastavte, na čem záleží",
    text: "Ve středním sloupci zapněte kritéria, která mají ovlivnit výsledek. Posuvníkem nastavte jejich důležitost od 1 do 10; vypnutá kritéria se nezapočítají.",
    bullets: [
      "Například zapněte „Finanční náročnost celková RTS“ nebo „Preference respondentů“ a zvolte, jak velkou váhu jim dát.",
      "U kritéria podílu financování znamená váha 5 neutrální nastavení bez preference výše daného podílu.",
      "Vlastní kritérium přidáte tlačítkem Vlastní slider. Zvolíte směr hodnocení a hodnoty doplníte v editoru položek."
    ]
  },
  {
    title: "4. Projděte výsledek a exportujte",
    text: "Pořadí v pravém sloupci se průběžně aktualizuje podle vybraných položek, jejich údajů a zapnutých vah. Nižší index znamená vyšší prioritu.",
    bullets: [
      "Změňte některou váhu nebo údaj položky a sledujte, jak se pořadí přepočítá.",
      "Tlačítkem Exportovat Excel stáhnete sešit s upravenými údaji a výsledným pořadím."
    ]
  }
];

const itemList = document.querySelector("#item-list");
const rankingList = document.querySelector("#ranking-list");
const weightList = document.querySelector("#weight-list");
const fileInput = document.querySelector("#file-input");
const dropzone = document.querySelector("#dropzone");
const editDialog = document.querySelector("#edit-dialog");
const editForm = document.querySelector("#edit-form");
const customValuesDialog = document.querySelector("#custom-values-dialog");
const customValuesForm = document.querySelector("#custom-values-form");
let editingCustomCriterionKey = null;

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

function customCriterionColumn(index) {
  return index + 13;
}

function lastCustomCriterionColumn() {
  return customCriteria.reduce(
    (lastColumn, criterion, index) => Math.max(lastColumn, criterion.column || customCriterionColumn(index)),
    12
  );
}

function customCriterionCell(column, row) {
  return `${XLSX.utils.encode_col(column - 1)}${row}`;
}

function calculateScore(item) {
  const totalCost = items.reduce((total, entry) => total + numberValue(entry.cost), 0);
  const count = items.length;
  const fundingBurden = fundingKeys.reduce(
    (total, key) => total + calcSubBurden(numberValue(weights[key]), numberValue(item[key])),
    0
  );
  const customScore = customCriteria.reduce(
    (total, criterion) => {
      const weight = numberValue(weights[criterion.key]);
      const value = numberValue(item.customValues?.[criterion.key]);
      if (criterion.mode === "target") return total + calcSubBurden(weight, value);
      const normalized = value / 10;
      return total + weight * (criterion.mode === "lower" ? normalized : 1 - normalized);
    },
    0
  );
  return (
    numberValue(weights.cost) * (totalCost ? numberValue(item.cost) / totalCost : 0) +
    numberValue(weights.urgency) * (numberValue(item.urgency) / 5) +
    numberValue(weights.preference) * (numberValue(item.preference) / (count || 1)) +
    (numberValue(weights.funding) / 5) * fundingBurden +
    customScore
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
    for (let column = 1; column <= range.e.c + 1; column += 1) {
      const label = getCellValue(sheet, row, column);
      if (typeof label === "string" && label.toLocaleLowerCase("cs").includes("koeficienty vážení položek")) {
        return row;
      }
    }
  }
  return 30;
}

function workbookColumn(key) {
  if (sourceColumns[key]) return sourceColumns[key];
  const legacyColumns = {
    id: 2, name: 3, cost: 4, urgency: 5, preference: 6, city: 7,
    developers: 8, state: 9, eu: 10, region: 11, private: 12
  };
  if (legacyColumns[key]) return legacyColumns[key];
  const criterion = customCriteria.find((entry) => entry.key === key);
  return criterion?.column || null;
}

function lastInputColumn() {
  const inputColumns = Object.entries(sourceColumns)
    .filter(([key]) => key !== "score" && key !== "selected")
    .map(([, column]) => column);
  return Math.max(12, ...inputColumns, ...customCriteria.map((criterion, index) => criterion.column || customCriterionColumn(index)));
}

function resultColumns() {
  return {
    score: 4,
    rank: 3,
    sortedStart: 4
  };
}

function readColumnSchema(sheet, range) {
  const columns = {};
  const weightColumns = {};
  const schemaRows = { key: 4, type: 5, mode: 6, header: 7 };
  for (let column = 1; column <= range.e.c + 1; column += 1) {
    const key = getCellValue(sheet, schemaRows.key, column);
    if (typeof key === "string" && key.startsWith("field:")) {
      columns[key.slice(6)] = column;
    } else if (typeof key === "string" && key.startsWith("weight:")) {
      weightColumns[key.slice(7)] = column;
    }
  }
  return { columns, weightColumns, schemaRows };
}

function inferColumnsFromHeaders(sheet, range) {
  const aliases = {
    id: ["id", "identifikator"],
    name: ["nazev"],
    cost: ["financni narocnost", "cena celk", "cena rts", "cena thu"],
    urgency: ["nalehavost"],
    preference: ["preference respondent", "poradi preference"],
    city: ["mesto", "mest"],
    developers: ["developer"],
    state: ["stat"],
    eu: ["eu"],
    region: ["kraj"],
    private: ["soukrom"]
  };
  const columns = {};
  for (let column = 1; column <= range.e.c + 1; column += 1) {
    const value = getCellValue(sheet, 7, column);
    if (typeof value !== "string") continue;
    const label = value.toLocaleLowerCase("cs")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    for (const [key, patterns] of Object.entries(aliases)) {
      if (!columns[key] && patterns.some((pattern) => label.includes(pattern))) {
        columns[key] = column;
      }
    }
  }
  return columns;
}

function writeColumnSchema(sheet) {
  const fields = [
    { key: "id", label: "ID", type: "integer", mode: "identifier" },
    { key: "name", label: "Název položky", type: "text", mode: "identifier" },
    { key: "cost", label: "Finanční náročnost celková RTS", type: "number", mode: "cost" },
    { key: "score", label: "Index Kamechy", type: "number", mode: "calculated-score" },
    { key: "urgency", label: "Naléhavost (legislativní a plánovací)", type: "number", mode: "urgency" },
    { key: "preference", label: "Preference respondentů", type: "number", mode: "preference" },
    { key: "city", label: "Město [%]", type: "percent", mode: "funding-share" },
    { key: "developers", label: "Developeři [%]", type: "percent", mode: "funding-share" },
    { key: "state", label: "Stát [%]", type: "percent", mode: "funding-share" },
    { key: "eu", label: "EU [%]", type: "percent", mode: "funding-share" },
    { key: "region", label: "Kraj [%]", type: "percent", mode: "funding-share" },
    { key: "private", label: "Soukromí [%]", type: "percent", mode: "funding-share" },
    ...customCriteria.map((criterion) => ({
      key: criterion.key,
      label: criterion.label,
      type: criterion.mode === "target" ? "percent" : "number",
      mode: `custom:${criterion.mode}`
    }))
  ];
  const columns = {
    id: 1, name: 2, cost: 3, score: 4, urgency: 5, preference: 6,
    city: 7, developers: 8, state: 9, eu: 10, region: 11, private: 12
  };
  for (const [index, criterion] of customCriteria.entries()) {
    columns[criterion.key] = 13 + index;
    criterion.column = columns[criterion.key];
  }
  columns.score = 4;
  columns.selected = 13 + customCriteria.length;
  const oldSelectionColumn = sourceColumns.selected;
  if (oldSelectionColumn && oldSelectionColumn !== columns.selected) {
    for (let row = 4; row <= weightRowForItems(); row += 1) {
      setWorkbookCell(sheet, customCriterionCell(oldSelectionColumn, row), null);
    }
  }
  const weightColumns = { ...sourceWeightColumns, funding: 14 + customCriteria.length };
  setWorkbookCell(sheet, customCriterionCell(weightColumns.funding, 4), "weight:funding");
  setWorkbookCell(sheet, customCriterionCell(weightColumns.funding, 5), "number");
  setWorkbookCell(sheet, customCriterionCell(weightColumns.funding, 6), "funding-burden");
  setWorkbookCell(sheet, customCriterionCell(weightColumns.funding, 7), "Celková váha nevyrovnané finanční zátěže");
  for (const field of fields) {
    const column = columns[field.key];
    if (!column) continue;
    setWorkbookCell(sheet, customCriterionCell(column, 4), `field:${field.key}`);
    setWorkbookCell(sheet, customCriterionCell(column, 5), field.type);
    setWorkbookCell(sheet, customCriterionCell(column, 6), field.mode);
    setWorkbookCell(sheet, customCriterionCell(column, 7), field.label);
  }
  setWorkbookCell(sheet, customCriterionCell(columns.selected, 4), "field:selected");
  setWorkbookCell(sheet, customCriterionCell(columns.selected, 5), "boolean");
  setWorkbookCell(sheet, customCriterionCell(columns.selected, 6), "selection-filter");
  setWorkbookCell(sheet, customCriterionCell(columns.selected, 7), "Zařadit do výpočtu");
  sourceColumns = columns;
  sourceWeightColumns = weightColumns;
}

function sortedTableHeaderRow() {
  return 32;
}

function sortedTableFormula(lastItemRow, sourceSheetName) {
  const quotedSheetName = `'${sourceSheetName.replace(/'/g, "''")}'`;
  return `SORT(${quotedSheetName}!B8:D${lastItemRow},3,1)`;
}

function setFormulaCell(sheet, address, formula, cachedValue, arrayRange = null) {
  const cell = {
    ...(sheet[address] || {}),
    t: typeof cachedValue === "number" ? "n" : "str",
    v: cachedValue,
    f: formula
  };
  if (arrayRange) cell.F = arrayRange;
  else delete cell.F;
  sheet[address] = cell;
}

function writeSortedTable(sheet, lastItemRow) {
  const headerRow = 7;
  const dataRow = 8;
  const headers = [
    "Položka", "Finanční náročnost celková RTS", "Index Kamechy"
  ];
  for (const column of ["B", "C", "D"]) {
    for (let row = headerRow; row <= dataRow + Math.max(items.length, 21); row += 1) {
      setWorkbookCell(sheet, `${column}${row}`, null);
    }
  }
  headers.forEach((header, index) => {
    setWorkbookCell(sheet, customCriterionCell(index + 2, headerRow), header);
  });
  const sortedItems = items
    .map((item) => ({ item, score: calculateScore(item) }))
    .sort((left, right) => left.score - right.score || left.item.id - right.item.id);
  sortedItems.forEach(({ item, score }, index) => {
    const row = dataRow + index;
    setWorkbookCell(sheet, `B${row}`, item.name);
    setWorkbookCell(sheet, `C${row}`, numberValue(item.cost));
    setWorkbookCell(sheet, `D${row}`, score);
  });
  setFormulaCell(
    sheet,
    `B${dataRow}`,
    sortedTableFormula(lastItemRow, sourceSheetName),
    sortedItems[0]?.item.name || "",
    `B${dataRow}:D${lastItemRow}`
  );
  sheet["!ref"] = `A1:D${Math.max(headerRow, lastItemRow)}`;
  sheet["!cols"] = [{ wch: 3 }, { wch: 40 }, { wch: 24 }, { wch: 18 }];
}

function clearSortedTableFromInput(sheet) {
  if (getCellValue(sheet, 32, 3) !== "Položka") return;
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z52");
  const arrayRange = sheet.C33?.F
    ? XLSX.utils.decode_range(sheet.C33.F)
    : { e: { r: 0 } };
  const lastRow = Math.max(range.e.r + 1, arrayRange.e.r + 1, 32 + Math.max(items.length, 21));
  for (const column of ["C", "D", "E"]) {
    for (let row = 32; row <= lastRow; row += 1) {
      setWorkbookCell(sheet, `${column}${row}`, null);
    }
  }
}

function setSortedWorkbookSheet(workbook, lastItemRow) {
  const existingIndex = workbook.SheetNames.indexOf("Seřazený list");
  if (existingIndex !== -1) {
    workbook.SheetNames.splice(existingIndex, 1);
    delete workbook.Sheets["Seřazený list"];
  }
  const sheet = {};
  writeSortedTable(sheet, lastItemRow);
  XLSX.utils.book_append_sheet(workbook, sheet, "Seřazený list");
}

function rankedSelectedItems() {
  return items
    .filter((item) => item.selected)
    .map((item) => ({ item, score: calculateScore(item) }))
    .sort((a, b) => a.score - b.score || a.item.id - b.item.id);
}

function allWeightDefinitions() {
  return [...weightDefinitions, ...customCriteria];
}

function updateScoreFormula() {
  const fundingLabels = {
    city: "město", developers: "developeři", state: "stát",
    eu: "EU", region: "kraj", private: "soukromí investoři"
  };
  const terms = [];
  const addTerm = (label, expression) => terms.push({ label, expression });
  const costWeight = numberValue(weights.cost);
  const urgencyWeight = numberValue(weights.urgency);
  const preferenceWeight = numberValue(weights.preference);
  if (costWeight > 0) {
    addTerm(
      "Finanční náročnost",
      `${formatNumber(costWeight, 1)} × cena položky / součet cen všech položek`
    );
  }
  if (urgencyWeight > 0) {
    addTerm("Naléhavost", `${formatNumber(urgencyWeight, 1)} × naléhavost / 5`);
  }
  if (preferenceWeight > 0) {
    addTerm(
      "Preference respondentů",
      `${formatNumber(preferenceWeight, 1)} × pořadí respondenta / počet položek`
    );
  }
  const fundingWeight = numberValue(weights.funding);
  const activeFundingTerms = fundingKeys
    .filter((key) => numberValue(weights[key]) > 0 && numberValue(weights[key]) !== 5)
    .map((key) => `|${formatNumber(numberValue(weights[key]), 1)} − podíl ${fundingLabels[key]} / 10|`);
  if (fundingWeight > 0 && activeFundingTerms.length) {
    addTerm(
      "Finanční zátěž",
      `(${formatNumber(fundingWeight, 1)} / 5) × (${activeFundingTerms.join(" + ")})`
    );
  }
  for (const criterion of customCriteria) {
    const weight = formatNumber(numberValue(weights[criterion.key]), 1);
    const numericWeight = numberValue(weights[criterion.key]);
    if (numericWeight === 0 || (criterion.mode === "target" && numericWeight === 5)) continue;
    if (criterion.mode === "target") {
      addTerm(criterion.label, `|${weight} − podíl „${criterion.label}“ / 10|`);
    } else {
      const polarity = criterion.mode === "lower" ? "hodnota" : "1 − hodnota";
      addTerm(criterion.label, `${weight} × (${polarity} „${criterion.label}“ / 10)`);
    }
  }
  const output = document.querySelector("#score-formula");
  if (!output) return;
  output.replaceChildren();
  if (!terms.length) {
    const empty = document.createElement("span");
    empty.className = "formula-empty";
    empty.textContent = "Všechny parametry jsou vypnuté — index je 0.";
    output.append(empty);
    return;
  }
  terms.forEach(({ label, expression }, index) => {
    const term = document.createElement("div");
    term.className = "formula-term";
    const name = document.createElement("span");
    name.className = "formula-term-name";
    name.textContent = label;
    const value = document.createElement("code");
    value.textContent = expression;
    term.append(name, value);
    if (index < terms.length - 1) {
      const plus = document.createElement("span");
      plus.className = "formula-plus";
      plus.textContent = "+";
      term.append(plus);
    }
    output.append(term);
  });
}

function updateWeightAppearance() {
  for (const definition of allWeightDefinitions()) {
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
      slider.disabled = !enabled || (definition.fundingShare && numberValue(weights.funding) === 0);
    }
    if (toggle) toggle.checked = enabled;
    if (description) description.textContent = getWeightDescription(definition, weight);
  }
}

function getWeightDescription(definition, weight) {
  if (definition.fundingShare || definition.targetShare) {
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

function createWeightScale(definition) {
  const scale = document.createElement("div");
  scale.className = `weight-scale${definition.fundingShare || definition.targetShare ? " funding-scale" : ""}`;
  const labels = definition.fundingShare || definition.targetShare
    ? [[1, "Minimální podíl"], [5, "Není preference"], [10, "Maximální kontribuce"]]
    : [[1, "Záleží na ní minimálně"], [10, "Záleží na ní maximálně"]];
  for (const [value, text] of labels) {
    const marker = document.createElement("span");
    const number = document.createElement("b");
    number.textContent = String(value);
    const caption = document.createElement("span");
    caption.textContent = text;
    marker.append(number, caption);
    scale.append(marker);
  }
  return scale;
}

function createWeightControls() {
  weightList.replaceChildren();
  for (const definition of allWeightDefinitions()) {
    const controlLabel = definition.targetShare
      ? `${definition.label} — cílový podíl (%)`
      : definition.label;
    const wrapper = document.createElement("div");
    wrapper.className = "weight-control";
    const label = document.createElement("label");
    label.htmlFor = `weight-${definition.key}`;
    label.textContent = controlLabel;
    const value = document.createElement("output");
    value.className = "weight-value";
    value.id = `weight-value-${definition.key}`;
    value.htmlFor = `weight-${definition.key}`;
    const toggleLabel = document.createElement("label");
    toggleLabel.className = "weight-switch";
    toggleLabel.setAttribute("aria-label", `Zapnout parametr: ${controlLabel}`);
    const toggle = document.createElement("input");
    toggle.id = `weight-toggle-${definition.key}`;
    toggle.type = "checkbox";
    toggle.checked = numberValue(weights[definition.key]) > 0;
    toggle.setAttribute("aria-label", `Zapnout nebo vypnout: ${controlLabel}`);
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
      updateScoreFormula();
    });
    const slider = document.createElement("input");
    slider.id = `weight-${definition.key}`;
    slider.type = "range";
    slider.min = "1";
    slider.max = "10";
    slider.step = "0.1";
    slider.value = String(Math.max(1, numberValue(weights[definition.key])));
    slider.setAttribute("aria-label", controlLabel);
    slider.addEventListener("input", () => {
      weights[definition.key] = Number(slider.value);
      lastEnabledWeights[definition.key] = weights[definition.key];
      value.value = formatNumber(weights[definition.key], 1);
      slider.style.setProperty("--fill", `${((weights[definition.key] - 1) / 9) * 100}%`);
      updateWeightAppearance();
      renderRanking();
      updateScoreFormula();
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
    wrapper.append(description, createWeightScale(definition));
    if (definition.customCriterion) {
      const editValues = document.createElement("button");
      editValues.className = "criterion-values-button";
      editValues.type = "button";
      editValues.textContent = "Upravit hodnoty všech položek";
      editValues.addEventListener("click", () => openCustomValuesEditor(definition));
      const remove = document.createElement("button");
      remove.className = "remove-control-button";
      remove.type = "button";
      remove.textContent = "Odebrat parametr";
      remove.setAttribute("aria-label", `Odebrat parametr ${definition.label}`);
      remove.addEventListener("click", () => removeCustomCriterion(definition.key));
      const actions = document.createElement("div");
      actions.className = "criterion-actions";
      actions.append(editValues, remove);
      wrapper.append(actions);
    }
    weightList.append(wrapper);
    value.value = formatNumber(weights[definition.key], 1);
    slider.style.setProperty("--fill", `${((Math.max(1, weights[definition.key]) - 1) / 9) * 100}%`);
  }
  updateWeightAppearance();
  updateScoreFormula();
}

function renderItems() {
  const query = document.querySelector("#search-input").value.trim().toLocaleLowerCase("cs");
  const filtered = items.filter((item) => item.name.toLocaleLowerCase("cs").includes(query));
  itemList.replaceChildren();
  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "list-empty";
    empty.textContent = "Žádná položka neodpovídá hledání.";
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
    name.title = "Dvojklikem upravíte údaje položky";
    name.addEventListener("dblclick", () => openEditor(item));
    name.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.shiftKey) openEditor(item);
    });
    const edit = document.createElement("button");
    edit.className = "edit-item";
    edit.type = "button";
    edit.setAttribute("aria-label", `Upravit ${item.name}`);
    edit.title = "Upravit položku";
    edit.textContent = "↗";
    edit.addEventListener("click", () => openEditor(item));
    const remove = document.createElement("button");
    remove.className = "remove-item";
    remove.type = "button";
    remove.setAttribute("aria-label", `Odebrat položku ${item.name}`);
    remove.title = "Odebrat položku";
    remove.textContent = "Odebrat";
    remove.addEventListener("click", () => removeItem(item.id));
    row.append(checkbox, name, edit, remove);
    itemList.append(row);
  }

  const selected = items.filter((item) => item.selected).length;
  document.querySelector("#item-count").textContent = String(items.length);
  document.querySelector("#toggle-all").textContent = selected === items.length ? "Odebrat vše" : "Vybrat vše";
}

function removeItem(itemId) {
  const item = items.find((entry) => entry.id === itemId);
  if (!item) return;
  items = items.filter((entry) => entry.id !== itemId);
  renderItems();
  renderRanking();
  updateScoreFormula();
  showNotice(`Položka „${item.name}“ byla odebrána.`);
}

function removeCustomCriterion(key) {
  const criterion = customCriteria.find((entry) => entry.key === key);
  if (!criterion) return;
  customCriteria = customCriteria.filter((entry) => entry.key !== key);
  delete weights[key];
  delete lastEnabledWeights[key];
  delete sourceColumns[key];
  customCriteria.forEach((entry, index) => {
    entry.column = 13 + index;
  });
  items = items.map((item) => {
    const customValues = { ...(item.customValues || {}) };
    delete customValues[key];
    return { ...item, customValues };
  });
  createWeightControls();
  renderItems();
  renderRanking();
  updateScoreFormula();
  showNotice(`Parametr „${criterion.label}“ a jeho hodnoty byly odebrány.`);
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
  document.querySelector("#dialog-eyebrow").textContent = isNew ? "NOVÁ POLOŽKA" : "ÚPRAVA POLOŽKY";
  document.querySelector("#dialog-title").textContent = isNew ? "Přidat vlastní položku" : item.name;
  document.querySelector("#save-item").textContent = isNew ? "Přidat položku" : "Uložit změny";
  const fields = document.querySelector("#edit-fields");
  fields.replaceChildren();
  for (const definition of itemFields) {
    const wrapper = document.createElement("div");
    wrapper.className = `edit-field${definition.wide ? " wide" : ""}`;
    const labelRow = document.createElement("div");
    labelRow.className = "edit-label-row";
    const label = document.createElement("label");
    label.htmlFor = `edit-${definition.key}`;
    label.textContent = definition.label;
    labelRow.append(label);
    if (definition.link) {
      const link = document.createElement("a");
      link.className = "field-help-link";
      link.href = definition.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.title = definition.linkTitle;
      link.setAttribute("aria-label", definition.linkTitle);
      link.textContent = "?";
      labelRow.append(link);
    }
    const input = document.createElement("input");
    input.id = `edit-${definition.key}`;
    input.name = definition.key;
    input.type = definition.type;
    if (definition.min !== undefined) input.min = String(definition.min);
    if (definition.max !== undefined) input.max = String(definition.max);
    if (definition.step) input.step = String(definition.step);
    input.required = true;
    input.setAttribute("aria-describedby", `edit-help-${definition.key}`);
    const defaultValue = definition.key === "name" ? "" : 0;
    input.value = String(item?.[definition.key] ?? defaultValue);
    const help = document.createElement("p");
    help.className = "edit-field-help";
    help.id = `edit-help-${definition.key}`;
    help.textContent = definition.help;
    wrapper.append(labelRow, input, help);
    fields.append(wrapper);
  }
  for (const criterion of customCriteria) {
    const wrapper = document.createElement("div");
    wrapper.className = "edit-field wide";
    const label = document.createElement("div");
    label.className = "edit-label-row";
    const fieldLabel = document.createElement("label");
    fieldLabel.htmlFor = `edit-${criterion.key}`;
    fieldLabel.textContent = criterion.mode === "target" ? `${criterion.label} (%)` : criterion.label;
    label.append(fieldLabel);
    const input = document.createElement("input");
    input.id = `edit-${criterion.key}`;
    input.name = criterion.key;
    input.type = "number";
    input.min = "0";
    input.max = criterion.mode === "target" ? "100" : "10";
    input.step = "any";
    input.required = true;
    input.value = String(item?.customValues?.[criterion.key] ?? 0);
    const help = document.createElement("p");
    help.className = "edit-field-help";
    help.textContent = criterion.mode === "target"
      ? "Zadejte podíl této položky v procentech (0–100 %). Slider kritéria určuje preferovaný podíl; hodnota 5 znamená bez preference."
      : "Zadejte hodnotu kritéria od 0 do 10.";
    wrapper.append(label, input, help);
    fields.append(wrapper);
  }
  editDialog.showModal();
  fields.querySelector("input").focus();
}

function openCustomValuesEditor(criterion) {
  editingCustomCriterionKey = criterion.key;
  document.querySelector("#custom-values-title").textContent = criterion.label;
  document.querySelector("#custom-values-help").textContent = criterion.mode === "target"
    ? "Zadejte podíl každé položky v procentech (0–100 %). Posuvník kritéria nastavuje preferovaný podíl."
    : "Zadejte hodnotu každé položky od 0 do 10.";
  const list = document.querySelector("#custom-values-list");
  list.replaceChildren();
  const max = criterion.mode === "target" ? 100 : 10;
  items.forEach((item, index) => {
    const row = document.createElement("label");
    row.className = "custom-value-row";
    const name = document.createElement("span");
    name.textContent = item.name;
    const input = document.createElement("input");
    input.type = "number";
    input.name = String(index);
    input.min = "0";
    input.max = String(max);
    input.step = "any";
    input.required = true;
    input.value = String(item.customValues?.[criterion.key] ?? 0);
    input.setAttribute("aria-label", `${criterion.label}: ${item.name}`);
    row.append(name, input);
    list.append(row);
  });
  customValuesDialog.showModal();
}

function renderTutorialStep() {
  const step = tutorialSteps[tutorialStepIndex];
  document.querySelector("#tutorial-title").textContent = step.title;
  document.querySelector("#tutorial-step-count").textContent =
    `Krok ${tutorialStepIndex + 1} z ${tutorialSteps.length}`;
  document.querySelector("#tutorial-progress-fill").style.width =
    `${((tutorialStepIndex + 1) / tutorialSteps.length) * 100}%`;
  const content = document.querySelector("#tutorial-step-content");
  content.replaceChildren();
  const description = document.createElement("p");
  description.textContent = step.text;
  content.append(description);
  const list = document.createElement("ul");
  for (const text of step.bullets) {
    const bullet = document.createElement("li");
    bullet.textContent = text;
    list.append(bullet);
  }
  content.append(list);
  document.querySelector("#tutorial-previous").disabled = tutorialStepIndex === 0;
  document.querySelector("#tutorial-next").textContent =
    tutorialStepIndex === tutorialSteps.length - 1 ? "Dokončit" : "Další krok";
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
    const sheetName = workbook.SheetNames.includes("List 1")
      ? "List 1"
      : workbook.SheetNames.find((name) => name !== "Seřazený list") || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error("V sešitu nebyl nalezen žádný list.");

    const importedItems = [];
    const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z40");
    const schema = readColumnSchema(sheet, range);
    const explicitSchema = Object.keys(schema.columns).length > 0;
    const columns = explicitSchema ? schema.columns : inferColumnsFromHeaders(sheet, range);
    const hasSchema = explicitSchema || Object.keys(columns).length > 0;
    const weightRow = findWeightRow(sheet);
    const importedCriteria = [];
    for (const [key, column] of Object.entries(columns)) {
      const modeValue = String(getCellValue(sheet, schema.schemaRows.mode, column) || "");
      const modePrefix = modeValue.startsWith("custom:") ? "custom:" : modeValue.startsWith("custom|") ? "custom|" : null;
      if (!modePrefix) continue;
      const mode = modeValue.slice(modePrefix.length);
      if (!["target", "lower", "higher"].includes(mode)) {
        throw new Error(`Vlastní kritérium ve sloupci ${XLSX.utils.encode_col(column - 1)} má neznámý typ výpočtu.`);
      }
      const label = getCellValue(sheet, schema.schemaRows.header, column);
      if (label === null || String(label).trim() === "") continue;
      importedCriteria.push({
        key,
        label: String(label).trim(),
        mode,
        targetShare: mode === "target",
        customCriterion: true,
        column
      });
      columns[key] = column;
    }
    for (let column = 1; column <= range.e.c + 1; column += 1) {
      if (importedCriteria.some((criterion) => criterion.column === column)) continue;
      const label = getCellValue(sheet, 7, column);
      if (label === null || String(label).trim() === "") continue;
      const metadata = String(getCellValue(sheet, 6, column) || "");
      const legacyMarker = metadata.startsWith("custom|");
      if (!legacyMarker && (explicitSchema || column < 27)) continue;
      const mode = metadata.includes("|target") ? "target" : metadata.includes("|lower") ? "lower" : "higher";
      const criterion = {
        key: `custom_${importedCriteria.length + 1}`,
        label: String(label).trim(),
        mode,
        targetShare: mode === "target",
        customCriterion: true,
        column
      };
      importedCriteria.push(criterion);
      columns[criterion.key] = column;
    }
    const legacyColumns = {
      id: 2, name: 3, cost: 4, urgency: 5, preference: 6, city: 7,
      developers: 8, state: 9, eu: 10, region: 11, private: 12
    };
    const columnFor = (key) => columns[key] || (!hasSchema ? legacyColumns[key] : null) || null;
    const nameColumn = columnFor("name") || 3;
    const idColumn = columnFor("id") || 2;
    if (!nameColumn) throw new Error("V Excelu chybí sloupec názvu položky.");
    for (let row = 8; row <= Math.min(weightRow - 2, range.e.r + 1); row += 1) {
      const nameValue = getCellValue(sheet, row, nameColumn);
      const idValue = idColumn ? getCellValue(sheet, row, idColumn) : null;
      if (nameValue === null || String(nameValue).trim() === "") continue;
      const values = {
        id: Number(idValue) || importedItems.length + 1,
        name: String(nameValue),
        cost: columnFor("cost") ? getCellValue(sheet, row, columnFor("cost")) : 0,
        urgency: columnFor("urgency") ? getCellValue(sheet, row, columnFor("urgency")) : 0,
        preference: columnFor("preference") ? getCellValue(sheet, row, columnFor("preference")) : 0,
        city: columnFor("city") ? getCellValue(sheet, row, columnFor("city")) : 0,
        developers: columnFor("developers") ? getCellValue(sheet, row, columnFor("developers")) : 0,
        state: columnFor("state") ? getCellValue(sheet, row, columnFor("state")) : 0,
        eu: columnFor("eu") ? getCellValue(sheet, row, columnFor("eu")) : 0,
        region: columnFor("region") ? getCellValue(sheet, row, columnFor("region")) : 0,
        private: columnFor("private") ? getCellValue(sheet, row, columnFor("private")) : 0,
        selected: columnFor("selected")
          ? numberValue(getCellValue(sheet, row, columnFor("selected"))) !== 0
          : true,
        customValues: Object.fromEntries(importedCriteria.map((criterion) => [
          criterion.key,
          numberValue(getCellValue(sheet, row, criterion.column))
        ])),
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
      funding: numberValue(getCellValue(
        sheet,
        schema.weightColumns.funding ? weightRow : weightRow + 1,
        schema.weightColumns.funding || columnFor("city") || 7
      ))
    };
    for (const key of Object.keys(defaultWeights)) {
      const column = columnFor(key);
      if (column && key !== "funding") {
        importedWeights[key] = numberValue(getCellValue(sheet, weightRow, column));
      }
    }
    for (const criterion of importedCriteria) {
      importedWeights[criterion.key] = numberValue(getCellValue(sheet, weightRow, criterion.column));
    }
    return {
      workbook,
      sheetName,
      items: importedItems,
      weights: importedWeights,
      criteria: importedCriteria,
      columns,
      weightColumns: schema.weightColumns
    };
  });
}

async function importFile(file) {
  if (!file) return;
  try {
    const imported = await readWorkbook(file);
    items = imported.items;
    weights = imported.weights;
    customCriteria = imported.criteria;
    sourceColumns = imported.columns;
    sourceWeightColumns = imported.weightColumns;
    lastEnabledWeights = { ...defaultWeights, urgency: 1, state: 1, eu: 1, region: 1, private: 1 };
    for (const definition of allWeightDefinitions()) {
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

function scoreFormula(row, lastItemRow, weightRow = weightRowForItems()) {
  const columnLetter = (key) => {
    const column = workbookColumn(key);
    return XLSX.utils.encode_col((column || 1) - 1);
  };
  const cell = (key, targetRow = row) => `${columnLetter(key)}${targetRow}`;
  const absoluteCell = (key, targetRow) => `$${columnLetter(key)}$${targetRow}`;
  const parts = [
    `${absoluteCell("cost", weightRow)}*${cell("cost")}/SUM(${absoluteCell("cost", 8)}:${absoluteCell("cost", lastItemRow)})`,
    `${absoluteCell("urgency", weightRow)}*${cell("urgency")}/5`,
    `${absoluteCell("preference", weightRow)}*${cell("preference")}/COUNT(${absoluteCell("preference", 8)}:${absoluteCell("preference", lastItemRow)})`
  ];
  const fundingParts = fundingKeys.map((key) => {
    const weightCell = absoluteCell(key, weightRow);
    return `IF(${weightCell}=0,0,IF(${weightCell}=5,0,ABS(${weightCell}-${cell(key)}/10)))`;
  });
  const fundingColumn = XLSX.utils.encode_col((sourceWeightColumns.funding || 1) - 1);
  parts.push(`($${fundingColumn}$${weightRow}/5)*(${fundingParts.join("+")})`);
  for (const [index, criterion] of customCriteria.entries()) {
    const valueCell = cell(criterion.key);
    const weightCell = absoluteCell(criterion.key, weightRow);
    if (criterion.mode === "target") {
      parts.push(`IF(${weightCell}=0,0,IF(${weightCell}=5,0,ABS(${weightCell}-${valueCell}/10)))`);
    } else {
      const value = criterion.mode === "lower" ? `${valueCell}/10` : `(1-${valueCell}/10)`;
      parts.push(`${weightCell}*${value}`);
    }
  }
  return parts.join("+");
}

function writeItemColumns(sheet, item, row) {
  const values = {
    id: numberValue(item.id),
    name: item.name,
    cost: numberValue(item.cost),
    urgency: numberValue(item.urgency),
    preference: numberValue(item.preference),
    city: numberValue(item.city),
    developers: numberValue(item.developers),
    state: numberValue(item.state),
    eu: numberValue(item.eu),
    region: numberValue(item.region),
    private: numberValue(item.private),
    selected: item.selected ? 1 : 0
  };
  for (const [key, value] of Object.entries(values)) {
    const column = workbookColumn(key);
    if (column) setWorkbookCell(sheet, customCriterionCell(column, row), value);
  }
  customCriteria.forEach((criterion) => {
    const column = workbookColumn(criterion.key);
    if (column) {
      setWorkbookCell(sheet, customCriterionCell(column, row), numberValue(item.customValues?.[criterion.key]));
    }
  });
}

function createTemplateWorkbook() {
  const workbook = XLSX.utils.book_new();
  const sheet = {};
  const helperOffset = Math.max(24, items.length + 3);
  const weightRow = weightRowForItems();
  writeColumnSchema(sheet);
  const lastColumn = Math.max(
    lastCustomCriterionColumn(),
    lastInputColumn(),
    ...Object.values(sourceColumns),
    ...Object.values(sourceWeightColumns),
    resultColumns().score,
    resultColumns().rank,
    resultColumns().sortedStart + 10,
    26
  );
  sheet["!ref"] = `A1:${XLSX.utils.encode_col(lastColumn - 1)}${Math.max(
    52,
    items.length + 7 + helperOffset,
    sortedTableHeaderRow() + Math.max(items.length, 21) + 1
  )}`;
  sheet["!cols"] = [
    { wch: 2 }, { wch: 7 }, { wch: 40 }, { wch: 18 }, { wch: 13 }, { wch: 20 },
    { wch: 13 }, { wch: 15 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 13 },
    { wch: 15 }, { wch: 3 }, { wch: 12 }, { wch: 40 }, { wch: 16 }, { wch: 12 },
    { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
    { wch: 12 }, { wch: 15 }
  ];
  customCriteria.forEach((criterion, index) => {
    const column = criterion.column || customCriterionColumn(index);
    sheet["!cols"][column - 1] = { wch: 20 };
  });
  setWorkbookCell(sheet, `B${weightRow}`, "koeficienty vážení položek (0-10)");
  setWorkbookCell(sheet, `F${weightRow + 1}`, null);

  const lastItemRow = Math.max(items.length + 7, 8);
  const outputColumns = resultColumns();
  items.forEach((item, index) => {
    const row = index + 8;
    writeItemColumns(sheet, item, row);
    setWorkbookCell(
      sheet,
      customCriterionCell(outputColumns.score, row),
      calculateScore(item),
      scoreFormula(row, lastItemRow, weightRow)
    );
  });

  weightDefinitions.filter((definition) => !definition.fundingTotal).forEach((definition) => {
    const column = workbookColumn(definition.key);
    if (column) setWorkbookCell(sheet, customCriterionCell(column, weightRow), numberValue(weights[definition.key]));
  });
  setWorkbookCell(sheet, customCriterionCell(sourceWeightColumns.funding || 1, weightRow), numberValue(weights.funding));
  customCriteria.forEach((criterion) => {
    const column = workbookColumn(criterion.key);
    if (column) setWorkbookCell(sheet, customCriterionCell(column, weightRow), numberValue(weights[criterion.key]));
  });
  XLSX.utils.book_append_sheet(workbook, sheet, "List 1");
  setSortedWorkbookSheet(workbook, lastItemRow);
  workbook.Workbook = {
    ...(workbook.Workbook || {}),
    CalcPr: { fullCalcOnLoad: true, forceFullCalc: true, calcMode: "auto" }
  };
  return workbook;
}

function clearDuplicateResultBlocks(sheet) {
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z52");
  const lastResultRow = Math.max(items.length, 21) + 7;
  const sheetLastRow = range.e.r + 1;
  const oldResultHeaders = new Map([
    ["Vypočítané pořadí položek seznamu", 1],
    ["Seřazené položky podle nastavených preferencí", 11]
  ]);
  for (let column = 1; column <= range.e.c + 1; column += 1) {
    const header = getCellValue(sheet, 7, column);
    const width = oldResultHeaders.get(header);
    if (width) {
      for (let offset = 0; offset < width; offset += 1) {
        const outputColumn = column + offset;
        for (let row = 7; row <= Math.max(lastResultRow, sheetLastRow); row += 1) {
          setWorkbookCell(sheet, customCriterionCell(outputColumn, row), null);
        }
      }
    }
  }
  const legacyTable = [];
  for (let row = 8; row <= range.e.r + 1; row += 1) {
    if (getCellValue(sheet, row, 15) === "Pořadí" && getCellValue(sheet, row, 16) === "Položka") {
      legacyTable.push(row);
    }
  }
  for (const row of legacyTable) {
    const lastRow = Math.max(row + Math.max(items.length, 21), sheetLastRow);
    for (let column = 15; column <= 26; column += 1) {
      for (let outputRow = row; outputRow <= lastRow; outputRow += 1) {
        setWorkbookCell(sheet, customCriterionCell(column, outputRow), null);
      }
    }
  }
}

function normalizeWorkbookColumns(sheet) {
  const weightRow = weightRowForItems();
  const lastItemRow = Math.max(items.length + 7, 8);
  const oldColumns = new Set([
    ...Object.values(sourceColumns),
    ...customCriteria.map((criterion) => criterion.column),
    ...Object.values(sourceWeightColumns)
  ].filter((column) => Number.isInteger(column) && column > 0));
  clearDuplicateResultBlocks(sheet);
  for (const column of oldColumns) {
    for (let row = 4; row <= 7; row += 1) {
      setWorkbookCell(sheet, customCriterionCell(column, row), null);
    }
    for (let row = 8; row <= lastItemRow; row += 1) {
      setWorkbookCell(sheet, customCriterionCell(column, row), null);
    }
    setWorkbookCell(sheet, customCriterionCell(column, weightRow), null);
    setWorkbookCell(sheet, customCriterionCell(column, weightRow + 1), null);
  }
  sourceColumns = {
    id: 1, name: 2, cost: 3, score: 4, urgency: 5, preference: 6,
    city: 7, developers: 8, state: 9, eu: 10, region: 11, private: 12
  };
  sourceWeightColumns = { funding: 14 + customCriteria.length };
  customCriteria.forEach((criterion, index) => {
    criterion.column = 13 + index;
  });
}

function exportWorkbook() {
  const workbook = sourceWorkbook
    ? XLSX.read(XLSX.write(sourceWorkbook, { bookType: "xlsx", type: "array" }), { type: "array", cellStyles: true, cellFormula: true })
    : createTemplateWorkbook();
  const sheet = workbook.Sheets[sourceSheetName] || workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error("V sešitu není list, do kterého lze exportovat.");

  normalizeWorkbookColumns(sheet);
  writeColumnSchema(sheet);
  const lastItemRow = Math.max(items.length + 7, 8);
  const weightRow = weightRowForItems();
  const outputColumns = resultColumns();
  clearDuplicateResultBlocks(sheet);
  clearSortedTableFromInput(sheet);
  if (weightRow !== 30) {
    setWorkbookCell(sheet, "C30", null);
    setWorkbookCell(sheet, "F31", null);
  }
  setWorkbookCell(sheet, `F${weightRow + 1}`, null);
  if ((sourceWeightColumns.funding || 1) !== 7) setWorkbookCell(sheet, `G${weightRow + 1}`, null);
  items.forEach((item, index) => {
    const row = index + 8;
    writeItemColumns(sheet, item, row);
    setWorkbookCell(
      sheet,
      customCriterionCell(outputColumns.score, row),
      calculateScore(item),
      scoreFormula(row, lastItemRow, weightRow)
    );
  });

  setWorkbookCell(sheet, `B${weightRow}`, "koeficienty vážení položek (0-10)");
  weightDefinitions.filter((definition) => !definition.fundingTotal).forEach((definition) => {
    const column = workbookColumn(definition.key);
    if (column) setWorkbookCell(sheet, customCriterionCell(column, weightRow), numberValue(weights[definition.key]));
  });
  customCriteria.forEach((criterion, index) => {
    const column = workbookColumn(criterion.key) || criterion.column || customCriterionColumn(index);
    setWorkbookCell(sheet, customCriterionCell(column, weightRow), numberValue(weights[criterion.key]));
    sheet["!cols"] ||= [];
    sheet["!cols"][column - 1] = { wch: 20 };
  });
  setWorkbookCell(sheet, customCriterionCell(sourceWeightColumns.funding || 1, weightRow), numberValue(weights.funding));

  setSortedWorkbookSheet(workbook, lastItemRow);
  const finalRange = XLSX.utils.decode_range(sheet["!ref"] || "A1:Z52");
  sheet["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: {
      r: Math.max(finalRange.e.r, lastItemRow - 1, weightRow),
      c: Math.max(finalRange.e.c, lastInputColumn() - 1, ...Object.values(sourceColumns),
        ...Object.values(sourceWeightColumns),
        resultColumns().score - 1,
        resultColumns().rank - 1, resultColumns().sortedStart + 9, lastCustomCriterionColumn() - 1)
    }
  });
  workbook.Workbook = {
    ...(workbook.Workbook || {}),
    CalcPr: { ...(workbook.Workbook?.CalcPr || {}), fullCalcOnLoad: true, forceFullCalc: true, calcMode: "auto" }
  };
  XLSX.writeFile(workbook, "Vysledky-razeni.xlsx", { bookType: "xlsx", compression: true });
  showNotice("Výsledky byly exportovány do souboru Vysledky-razeni.xlsx.");
}

fileInput.addEventListener("change", () => importFile(fileInput.files?.[0]));
document.querySelector("#search-input").addEventListener("input", renderItems);
document.querySelector("#add-item").addEventListener("click", () => openEditor());
const customWeightDialog = document.querySelector("#custom-weight-dialog");
const customWeightForm = document.querySelector("#custom-weight-form");
document.querySelector("#add-weight").addEventListener("click", () => {
  customWeightForm.reset();
  customWeightDialog.showModal();
  document.querySelector("#custom-weight-name").focus();
});
document.querySelector("#close-custom-weight").addEventListener("click", () => customWeightDialog.close());
document.querySelector("#cancel-custom-weight").addEventListener("click", () => customWeightDialog.close());
customWeightDialog.addEventListener("click", (event) => {
  if (event.target === customWeightDialog) customWeightDialog.close();
});
document.querySelector("#close-custom-values").addEventListener("click", () => customValuesDialog.close());
document.querySelector("#cancel-custom-values").addEventListener("click", () => customValuesDialog.close());
customValuesDialog.addEventListener("click", (event) => {
  if (event.target === customValuesDialog) customValuesDialog.close();
});
customValuesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const criterion = customCriteria.find((entry) => entry.key === editingCustomCriterionKey);
  if (!criterion) {
    showNotice("Vlastní kritérium nebylo nalezeno.", true);
    return;
  }
  const max = criterion.mode === "target" ? 100 : 10;
  const inputs = [...document.querySelectorAll("#custom-values-list input")];
  const values = inputs.map((input) => Number(input.value));
  if (values.some((value) => !Number.isFinite(value) || value < 0 || value > max)) {
    showNotice(`Hodnoty musí být v rozsahu 0–${max}${criterion.mode === "target" ? " %" : ""}.`, true);
    return;
  }
  items = items.map((item, index) => ({
    ...item,
    customValues: { ...(item.customValues || {}), [criterion.key]: values[index] }
  }));
  customValuesDialog.close();
  renderRanking();
  showNotice(`Hodnoty kritéria „${criterion.label}“ byly uloženy u všech položek.`);
});
customWeightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(customWeightForm);
  const label = String(formData.get("name") || "").trim();
  const mode = String(formData.get("mode") || "higher");
  if (!label) {
    showNotice("Zadejte název vlastního kritéria.", true);
    return;
  }
  if (customCriteria.some((criterion) => criterion.label.toLocaleLowerCase("cs") === label.toLocaleLowerCase("cs"))) {
    showNotice("Kritérium s tímto názvem už existuje.", true);
    return;
  }
  const criterion = {
    key: `custom_${customCriteria.length + 1}`,
    label,
    mode: ["higher", "lower", "target"].includes(mode) ? mode : "higher",
    column: Math.max(lastCustomCriterionColumn(), sourceColumns.selected || 0) + 1,
    targetShare: mode === "target",
    customCriterion: true
  };
  customCriteria.push(criterion);
  weights[criterion.key] = 1;
  lastEnabledWeights[criterion.key] = 1;
  items = items.map((item) => ({
    ...item,
    customValues: { ...(item.customValues || {}), [criterion.key]: 0 }
  }));
  customWeightDialog.close();
  createWeightControls();
  renderItems();
  renderRanking();
  showNotice(`Slider „${label}“ byl přidán. Hodnotu můžete nastavit u každé položky v jejím editoru.`);
});
const tutorialDialog = document.querySelector("#tutorial-dialog");
document.querySelector("#tutorial-button").addEventListener("click", () => {
  tutorialStepIndex = 0;
  renderTutorialStep();
  tutorialDialog.showModal();
});
document.querySelector("#close-tutorial").addEventListener("click", () => tutorialDialog.close());
document.querySelector("#tutorial-skip").addEventListener("click", () => tutorialDialog.close());
document.querySelector("#tutorial-previous").addEventListener("click", () => {
  if (tutorialStepIndex > 0) {
    tutorialStepIndex -= 1;
    renderTutorialStep();
  }
});
document.querySelector("#tutorial-next").addEventListener("click", () => {
  if (tutorialStepIndex === tutorialSteps.length - 1) {
    tutorialDialog.close();
    return;
  }
  tutorialStepIndex += 1;
  renderTutorialStep();
});
tutorialDialog.addEventListener("click", (event) => {
  if (event.target === tutorialDialog) tutorialDialog.close();
});
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
  updated.customValues = { ...(updated.customValues || {}) };
  for (const criterion of customCriteria) {
    const value = Number(formData.get(criterion.key));
    const max = criterion.mode === "target" ? 100 : 10;
    if (!Number.isFinite(value) || value < 0 || value > max) {
      showNotice(`Hodnota kritéria „${criterion.label}“ musí být v rozsahu 0–${max}${criterion.mode === "target" ? " %" : ""}.`, true);
      return;
    }
    updated.customValues[criterion.key] = value;
  }
  if (!updated.name) {
    showNotice("Název položky nesmí být prázdný.", true);
    return;
  }
  if (itemFields
    .filter((field) => field.type === "number")
    .some((field) => !Number.isFinite(updated[field.key]) || updated[field.key] < field.min ||
      (field.max !== undefined && updated[field.key] > field.max))) {
    showNotice("Zkontrolujte prosím číselné hodnoty.", true);
    return;
  }
  items = item
    ? items.map((entry) => entry.id === editingItemId ? updated : entry)
    : [...items, updated];
  renderItems();
  renderRanking();
  editDialog.close();
  showNotice(item ? "Údaje položky byly aktualizovány." : "Vlastní položka byla přidána do seznamu.");
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
