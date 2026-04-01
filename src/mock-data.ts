export const mock = [{ id: crypto.randomUUID(), category: "pizza", name: "Маргарита", prices: [399, 599, 799], url: "src/assets/pizza.svg", description: "Классическая итальянская пицца с томатным соусом, моцареллой и базиликом", isOn: true },
    { id: crypto.randomUUID(), category: "pizza", name: "Пепперони", prices: [499, 699, 899], url: "src/assets/pizza.svg", description: "Пикантная пицца с пепперони, моцареллой и томатным соусом", isOn: true },
    { id: crypto.randomUUID(), category: "pizza", name: "Четыре сыра", prices: [549, 749, 949], url: "src/assets/pizza.svg", description: "Нежная пицца с моцареллой, пармезаном, горгонзолой и рикоттой", isOn: true },
    { id: crypto.randomUUID(), category: "pizza", name: "Гавайская", prices: [449, 649, 849], url: "src/assets/pizza.svg", description: "Сочетание курицы, ананасов, моцареллы и томатного соуса", isOn: false },
    { id: crypto.randomUUID(), category: "pizza", name: "Мясная", prices: [599, 799, 999], url: "src/assets/pizza.svg", description: "Сытная пицца с ветчиной, беконом, пепперони, курицей и моцареллой", isOn: true },
    // КОМБО (5 шт)
    { id: crypto.randomUUID(), category: "combo", name: "Семейный", prices: [1299, 1599], url: "", description: "2 пиццы 30см + 2 закуски + 1,5л напиток + соус", isOn: true },
    { id: crypto.randomUUID(), category: "combo", name: "Обеденный", prices: [399, 449], url: "", description: "Пицца 25см + напиток 0,5л + закуска на выбор", isOn: true },
    { id: crypto.randomUUID(), category: "combo", name: "Вечеринка", prices: [2499, 2799], url: "", description: "3 пиццы 30см + 4 закуски + 2 напитка 1л + десерт", isOn: true },
    { id: crypto.randomUUID(), category: "combo", name: "Для двоих", prices: [899, 999], url: "", description: "Пицца 30см + 2 напитка + 2 закуски + соус", isOn: false },
    { id: crypto.randomUUID(), category: "combo", name: "Сытный", prices: [749, 849], url: "", description: "Пицца 25см + картофель фри + напиток 0,5л + соус", isOn: true },
    // ЗАКУСКИ (5 шт)
    { id: crypto.randomUUID(), category: "snack", name: "Картофель фри", prices: [149, 199], url: "", description: "Хрустящий картофель фри с солью", isOn: true },
    { id: crypto.randomUUID(), category: "snack", name: "Куриные крылышки", prices: [299, 399], url: "", description: "Острые куриные крылышки в соусе барбекю", isOn: true },
    { id: crypto.randomUUID(), category: "snack", name: "Сырные палочки", prices: [249, 299], url: "", description: "Золотистые палочки из моцареллы с соусом", isOn: true },
    { id: crypto.randomUUID(), category: "snack", name: "Овощные наггетсы", prices: [179, 219], url: "", description: "Вегетарианские наггетсы из цветной капусты и нута", isOn: false },
    { id: crypto.randomUUID(), category: "snack", name: "Кольца кальмара", prices: [329, 389], url: "", description: "Хрустящие кольца кальмара в панировке с чесночным соусом", isOn: true },
    // НАПИТКИ (5 шт)
    { id: crypto.randomUUID(), category: "drink", name: "Кока-кола", prices: [99, 149, 199], url: "", description: "Газированный напиток классический", isOn: true },
    { id: crypto.randomUUID(), category: "drink", name: "Лимонад", prices: [129, 179, 229], url: "", description: "Домашний лимонад с мятой и лимоном", isOn: true },
    { id: crypto.randomUUID(), category: "drink", name: "Морс", prices: [119, 169, 219], url: "", description: "Клюквенный морс натуральный", isOn: true },
    { id: crypto.randomUUID(), category: "drink", name: "Чай", prices: [79, 119], url: "", description: "Черный чай с бергамотом", isOn: false },
    { id: crypto.randomUUID(), category: "drink", name: "Кофе", prices: [89, 139], url: "", description: "Американо из свежемолотых зерен", isOn: true },
    // ДЕСЕРТЫ (5 шт)
    { id: crypto.randomUUID(), category: "dessert", name: "Чизкейк", prices: [249, 299], url: "", description: "Нью-йорк чизкейк с малиновым соусом", isOn: true },
    { id: crypto.randomUUID(), category: "dessert", name: "Тирамису", prices: [279, 329], url: "", description: "Классический итальянский десерт", isOn: true },
    { id: crypto.randomUUID(), category: "dessert", name: "Маффин", prices: [129, 169], url: "", description: "Шоколадный маффин с жидкой начинкой", isOn: true },
    { id: crypto.randomUUID(), category: "dessert", name: "Пирожное", prices: [149, 189], url: "", description: "Картошка пирожное", isOn: false },
    { id: crypto.randomUUID(), category: "dessert", name: "Мороженое", prices: [89, 119], url: "", description: "Ванильное мороженое с шоколадной крошкой", isOn: true }]