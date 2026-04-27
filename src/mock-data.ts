export const mock = [
  {id: crypto.randomUUID(), category: "pizza", name: "Маргарита",
    variants: [
      { value: "25 см", price: "399", weight: "350 г" },
      { value: "30 см", price: "549", weight: "500 г" },
      { value: "35 см", price: "699", weight: "650 г" },
    ], url: "src/assets/pizza.svg", description: "Классическая пицца с томатным соусом и моцареллой", isOn: true,},

  {id: crypto.randomUUID(), category: "pizza", name: "Пепперони",
    variants: [
      { value: "25 см", price: "449", weight: "360 г" },
      { value: "30 см", price: "599", weight: "520 г" },
      { value: "35 см", price: "749", weight: "680 г" },
    ], url: "src/assets/pizza.svg", description: "Острая пицца с пепперони и сыром", isOn: true,},

  {id: crypto.randomUUID(), category: "pizza", name: "Четыре сыра",
    variants: [
      { value: "25 см", price: "459", weight: "340 г" },
      { value: "30 см", price: "629", weight: "500 г" },
      { value: "35 см", price: "789", weight: "660 г" },
    ], url: "src/assets/pizza.svg", description: "Смесь четырёх видов сыра", isOn: true,},

  {id: crypto.randomUUID(), category: "pizza", name: "Гавайская",
    variants: [
      { value: "25 см", price: "429", weight: "360 г" },
      { value: "30 см", price: "579", weight: "520 г" },
      { value: "35 см", price: "739", weight: "680 г" },
    ], url: "src/assets/pizza.svg", description: "Курица и ананасы", isOn: true,},

  {id: crypto.randomUUID(), category: "pizza", name: "BBQ Курица",
    variants: [
      { value: "25 см", price: "459", weight: "380 г" },
      { value: "30 см", price: "619", weight: "540 г" },
      { value: "35 см", price: "779", weight: "700 г" },
    ], url: "src/assets/pizza.svg", description: "Курица с соусом BBQ", isOn: true,},

  {id: crypto.randomUUID(), category: "combo", name: "Комбо для двоих",
    variants: [{ value: "1 набор", price: "599", weight: "900 г" }],
    url: "src/assets/combo.svg", description: "Пицца, напитки и закуски на двоих", isOn: true,},

  {id: crypto.randomUUID(), category: "combo", name: "Семейное комбо",
    variants: [{ value: "1 набор", price: "899", weight: "1500 г" }],
    url: "src/assets/combo.svg", description: "Большой набор для всей семьи", isOn: true,},

  {id: crypto.randomUUID(), category: "combo", name: "Студенческое комбо",
    variants: [{ value: "1 набор", price: "399", weight: "800 г" }],
    url: "src/assets/combo.svg", description: "Бюджетный набор для студентов", isOn: true,},

  {id: crypto.randomUUID(), category: "combo", name: "Комбо с пепперони",
    variants: [{ value: "1 набор", price: "649", weight: "1000 г" }],
    url: "src/assets/combo.svg", description: "Пицца пепперони + напиток + закуска", isOn: true,},

  {id: crypto.randomUUID(), category: "combo", name: "Фирменное комбо",
    variants: [{ value: "1 набор", price: "799", weight: "1200 г" }],
    url: "src/assets/combo.svg", description: "Фирменный набор от шефа", isOn: true,},

  {id: crypto.randomUUID(), category: "snack", name: "Картофель фри",
    variants: [
      { value: "Мал", price: "149", weight: "120 г" },
      { value: "Больш", price: "199", weight: "180 г" },
    ], url: "src/assets/snack.svg", description: "Хрустящий картофель фри", isOn: true,},

  {id: crypto.randomUUID(), category: "snack", name: "Наггетсы",
    variants: [
      { value: "6 шт", price: "179", weight: "150 г" },
      { value: "9 шт", price: "229", weight: "220 г" },
      { value: "12 шт", price: "279", weight: "300 г" },
    ], url: "src/assets/snack.svg", description: "Куриные наггетсы", isOn: true,},

  {id: crypto.randomUUID(), category: "snack", name: "Крылышки BBQ",
    variants: [{ value: "6 шт", price: "249", weight: "250 г" }],
    url: "src/assets/snack.svg", description: "Острые крылышки с BBQ соусом", isOn: true,},

  {id: crypto.randomUUID(), category: "snack", name: "Сырные палочки",
    variants: [{ value: "6 шт", price: "219", weight: "180 г" }],
    url: "src/assets/snack.svg", description: "Растянутый сыр в хрустящей панировке", isOn: true,},

  {id: crypto.randomUUID(), category: "snack", name: "Креветки темпура",
    variants: [
      { value: "6 шт", price: "299", weight: "120 г" },
      { value: "12 шт", price: "499", weight: "240 г" },
    ], url: "src/assets/snack.svg", description: "Креветки в хрустящей темпуре", isOn: true,},

  {id: crypto.randomUUID(), category: "dessert", name: "Чизкейк",
    variants: [{ value: "1 порция", price: "199", weight: "120 г" }],
    url: "src/assets/dessert.svg", description: "Нежный сливочный чизкейк", isOn: true,},

  {id: crypto.randomUUID(), category: "dessert", name: "Тирамису",
    variants: [
      { value: "1 порция", price: "229", weight: "130 г" },
      { value: "2 порции", price: "399", weight: "260 г" },
      { value: "4 порции", price: "699", weight: "520 г" },
    ], url: "src/assets/dessert.svg", description: "Итальянский десерт с кофе и маскарпоне", isOn: true,},

  {id: crypto.randomUUID(), category: "dessert", name: "Шоколадный фондан",
    variants: [{ value: "1 порция", price: "249", weight: "140 г" }],
    url: "src/assets/dessert.svg", description: "Тёплый шоколадный десерт с жидкой начинкой", isOn: true,},

  {id: crypto.randomUUID(), category: "dessert", name: "Мороженое пломбир",
    variants: [{ value: "1 шар", price: "99", weight: "60 г" }],
    url: "src/assets/dessert.svg", description: "Классическое сливочное мороженое", isOn: true,},

  {id: crypto.randomUUID(), category: "dessert", name: "Медовик",
    variants: [{ value: "1 порция", price: "189", weight: "130 г" }],
    url: "src/assets/dessert.svg", description: "Домашний торт с мёдом", isOn: true,},

  // ======================= DRINK =======================
  {id: crypto.randomUUID(), category: "drink", name: "Кола",
    variants: [
      { value: "0.3 л", price: "99", weight: "300 мл" },
      { value: "0.5 л", price: "129", weight: "500 мл" },
      { value: "1 л", price: "179", weight: "1000 мл" },
    ], url: "src/assets/drink.svg", description: "Освежающая газировка", isOn: true,},

  {id: crypto.randomUUID(), category: "drink", name: "Лимонад",
    variants: [
      { value: "0.3 л", price: "99", weight: "300 мл" },
      { value: "0.5 л", price: "129", weight: "500 мл" },
    ], url: "src/assets/drink.svg", description: "Домашний лимонад", isOn: true,},

  {id: crypto.randomUUID(), category: "drink", name: "Апельсиновый сок",
    variants: [
      { value: "0.3 л", price: "109", weight: "300 мл" },
      { value: "0.5 л", price: "149", weight: "500 мл" },
    ], url: "src/assets/drink.svg", description: "Свежевыжатый сок", isOn: true,},

  {id: crypto.randomUUID(), category: "drink", name: "Чай холодный",
    variants: [
      { value: "0.3 л", price: "89", weight: "300 мл" },
      { value: "0.5 л", price: "119", weight: "500 мл" },
    ], url: "src/assets/drink.svg", description: "Охлаждённый чай", isOn: true,},

  {id: crypto.randomUUID(), category: "drink", name: "Кофе латте",
    variants: [
      { value: "0.3 л", price: "149", weight: "300 мл" },
      { value: "0.5 л", price: "199", weight: "500 мл" },
    ], url: "src/assets/drink.svg", description: "Кофе с молоком", isOn: true,},
];