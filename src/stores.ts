import {create} from 'zustand'

export type ProductType = {
    type: string
    name: string
    prices: number[]
    url: string
    isOn: boolean
}

interface ProductsStore {
    products: ProductType[]
    currentType: string
    addProduct: (newProduct: ProductType) => void
    setCurrentType: (type: string) => void
}

export const useProducts = create<ProductsStore>((set) => ({
    products: [{ type: "pizza", name: "Маргарита", prices: [399, 549, 699], url: "src/assets/Pizza (2).svg", isOn: true },
  { type: "pizza", name: "Пепперони", prices: [449, 599, 749], url: "src/assets/Pizza (2).svg", isOn: true },
  { type: "pizza", name: "Четыре сыра", prices: [499, 649, 799], url: "src/assets/Pizza (2).svg", isOn: true },
  { type: "pizza", name: "Гавайская", prices: [469, 619, 769], url: "src/assets/Pizza (2).svg", isOn: true },
  { type: "pizza", name: "Барбекю с курицей", prices: [529, 679, 829], url: "src/assets/Pizza (2).svg", isOn: true },
  { type: "pizza", name: "Мясная", prices: [549, 699, 849], url: "/img/pizza/meat.jpg", isOn: true },
  { type: "pizza", name: "Вегетарианская", prices: [429, 579, 729], url: "/img/pizza/veggie.jpg", isOn: true },
  { type: "pizza", name: "Диабло", prices: [519, 669, 819], url: "/img/pizza/diablo.jpg", isOn: true },
  { type: "pizza", name: "Карбонара", prices: [499, 649, 799], url: "/img/pizza/carbonara.jpg", isOn: true },
  { type: "pizza", name: "Цезарь", prices: [489, 639, 789], url: "/img/pizza/caesar.jpg", isOn: true },

  { type: "combo", name: "Комбо для двоих", prices: [1299], url: "/img/combo/for_two.jpg", isOn: true },
  { type: "combo", name: "Семейное комбо", prices: [1999], url: "/img/combo/family.jpg", isOn: true },
  { type: "combo", name: "Комбо Пепперони + Кола", prices: [899], url: "/img/combo/pepperoni_cola.jpg", isOn: true },
  { type: "combo", name: "Вечеринка", prices: [2499], url: "/img/combo/party.jpg", isOn: true },
  { type: "combo", name: "Комбо Студент", prices: [799], url: "/img/combo/student.jpg", isOn: true },
  { type: "combo", name: "Комбо XXL", prices: [2999], url: "/img/combo/xxl.jpg", isOn: true },
  { type: "combo", name: "Романтический ужин", prices: [1599], url: "/img/combo/romantic.jpg", isOn: true },
  { type: "combo", name: "Комбо 4 пиццы", prices: [2799], url: "/img/combo/4pizza.jpg", isOn: true },
  { type: "combo", name: "Комбо с закусками", prices: [1399], url: "/img/combo/snack.jpg", isOn: true },
  { type: "combo", name: "Детское комбо", prices: [699], url: "/img/combo/kids.jpg", isOn: true },

  { type: "drink", name: "Кола 0.5л", prices: [129], url: "/img/drink/cola05.jpg", isOn: true },
  { type: "drink", name: "Кола 1л", prices: [189], url: "/img/drink/cola1.jpg", isOn: true },
  { type: "drink", name: "Фанта 0.5л", prices: [129], url: "/img/drink/fanta05.jpg", isOn: true },
  { type: "drink", name: "Спрайт 0.5л", prices: [129], url: "/img/drink/sprite05.jpg", isOn: true },
  { type: "drink", name: "Морс ягодный", prices: [159], url: "/img/drink/mors.jpg", isOn: true },
  { type: "drink", name: "Лимонад домашний", prices: [179], url: "/img/drink/lemonade.jpg", isOn: true },
  { type: "drink", name: "Чай холодный", prices: [149], url: "/img/drink/tea.jpg", isOn: true },
  { type: "drink", name: "Кофе американо", prices: [139], url: "/img/drink/americano.jpg", isOn: true },
  { type: "drink", name: "Капучино", prices: [169], url: "/img/drink/cappuccino.jpg", isOn: true },
  { type: "drink", name: "Вода 0.5л", prices: [99], url: "/img/drink/water.jpg", isOn: true },

  { type: "dessert", name: "Чизкейк Нью-Йорк", prices: [249], url: "/img/dessert/cheesecake.jpg", isOn: true },
  { type: "dessert", name: "Шоколадный фондан", prices: [269], url: "/img/dessert/fondant.jpg", isOn: true },
  { type: "dessert", name: "Тирамису", prices: [259], url: "/img/dessert/tiramisu.jpg", isOn: true },
  { type: "dessert", name: "Брауни", prices: [199], url: "/img/dessert/brownie.jpg", isOn: true },
  { type: "dessert", name: "Мороженое ванильное", prices: [149], url: "/img/dessert/vanilla_icecream.jpg", isOn: true },
  { type: "dessert", name: "Мороженое шоколадное", prices: [149], url: "/img/dessert/choco_icecream.jpg", isOn: true },
  { type: "dessert", name: "Панкейки с сиропом", prices: [229], url: "/img/dessert/pancakes.jpg", isOn: true },
  { type: "dessert", name: "Маффин черничный", prices: [159], url: "/img/dessert/muffin.jpg", isOn: true },
  { type: "dessert", name: "Карамельный тарт", prices: [239], url: "/img/dessert/tart.jpg", isOn: true },
  { type: "dessert", name: "Эклер", prices: [179], url: "/img/dessert/eclair.jpg", isOn: true },

  { type: "snack", name: "Картофель фри", prices: [179], url: "/img/snack/fries.jpg", isOn: true },
  { type: "snack", name: "Картофель по-деревенски", prices: [199], url: "/img/snack/potato.jpg", isOn: true },
  { type: "snack", name: "Куриные наггетсы", prices: [249], url: "/img/snack/nuggets.jpg", isOn: true },
  { type: "snack", name: "Куриные крылья BBQ", prices: [299], url: "/img/snack/wings.jpg", isOn: true },
  { type: "snack", name: "Сырные палочки", prices: [229], url: "/img/snack/cheese_sticks.jpg", isOn: true },
  { type: "snack", name: "Луковые кольца", prices: [189], url: "/img/snack/onion_rings.jpg", isOn: true },
  { type: "snack", name: "Чесночные гренки", prices: [169], url: "/img/snack/toast.jpg", isOn: true },
  { type: "snack", name: "Мини-кальцоне", prices: [279], url: "/img/snack/calzone.jpg", isOn: true },
  { type: "snack", name: "Кесадилья с курицей", prices: [299], url: "/img/snack/quesadilla.jpg", isOn: true },
  { type: "snack", name: "Кесадилья с сыром", prices: [279], url: "/img/snack/quesadilla_cheese.jpg", isOn: true },],
    currentType: 'pizza',
    addProduct: (newProduct) => {
        set(
            state=>({...state, products: [...state.products, newProduct]})
        )
    },
    setCurrentType: (type) => {
        set(
            state=>({...state, currentType: type})
        )
    }
}))