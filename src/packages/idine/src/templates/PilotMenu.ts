import Allergen from "../enums/Allergen";
import Diet from "../enums/Diet";
import MenuCategory from "../enums/MenuCategory";
import MenuItem from "../types/MenuItem";

const PilotMenu: MenuItem[] = [
  // APPETIZERS (7)
  {
    id: "i-pilot-appetizer-1",
    name: "Burrata & Heirloom Tomatoes",
    price: 14,
    description:
      "Creamy burrata, vibrant heirloom tomatoes, basil oil and a balsamic drizzle — silky, bright, irresistible.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN, Diet.GLUTEN_FREE],
  },
  {
    id: "i-pilot-appetizer-2",
    name: "Artisanal Charcuterie Board",
    price: 22,
    description:
      "A curated selection of cured meats, imported cheeses, house pickles and marcona almonds — elegant and shareable.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.DAIRY, Allergen.NUTS],
    diets: [Diet.KETO],
  },
  {
    id: "i-pilot-appetizer-3",
    name: "Wood-Fired Garlic Shrimp",
    price: 16,
    description:
      "Plump shrimp, blistered garlic, lemon and parsley, kissed by wood-fire heat — bright, smoky, savory.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.SHELLFISH, Allergen.DAIRY],
    diets: [Diet.PESCATARIAN, Diet.KETO],
  },
  {
    id: "i-pilot-appetizer-4",
    name: "Truffle Arancini",
    price: 12,
    description:
      "Crisp risotto croquettes filled with fontina and truffle — pillowy center, crunchy shell, aromatic finish.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-appetizer-5",
    name: "Smoked Salmon Crostini",
    price: 14,
    description:
      "Thin toasts layered with silky smoked salmon, lemon-dill crème fraîche and capers — elegant and bright.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.FISH, Allergen.DAIRY],
    diets: [Diet.PESCATARIAN],
  },
  {
    id: "i-pilot-appetizer-6",
    name: "Crispy Calamari with Lemon Aioli",
    price: 13,
    description:
      "Tender calamari, light crisp batter, served with house lemon aioli — perfect for sharing.",
    category: MenuCategory.APPETIZER,
    allergens: [Allergen.SHELLFISH, Allergen.DAIRY],
    diets: [
      /* none by default */
    ],
  },
  {
    id: "i-pilot-appetizer-7",
    name: "Marinated Castelvetrano Olives & Citrus",
    price: 8,
    description:
      "Bright citrus, rosemary and olive oil married with buttery Castelvetrano olives — clean, savory, addictive.",
    category: MenuCategory.APPETIZER,
    allergens: [],
    diets: [Diet.VEGAN, Diet.GLUTEN_FREE],
  },

  // SIDES (5)
  {
    id: "i-pilot-side-1",
    name: "Truffle Parmesan Fries",
    price: 9,
    description:
      "Hand-cut fries tossed with black truffle oil and grated parmesan — earthy, salty, luxurious.",
    category: MenuCategory.SIDE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-side-2",
    name: "Rosemary Parmesan Polenta",
    price: 8,
    description:
      "Creamy polenta finished with parmesan and crisp rosemary — velvety, herby, comforting.",
    category: MenuCategory.SIDE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN, Diet.GLUTEN_FREE],
  },
  {
    id: "i-pilot-side-3",
    name: "Classic Caesar Salad",
    price: 10,
    description:
      "Crisp romaine, herby croutons, shaved parmesan and anchovy-forward dressing — bright umami notes.",
    category: MenuCategory.SIDE,
    allergens: [Allergen.DAIRY, Allergen.FISH],
    diets: [],
  },
  {
    id: "i-pilot-side-4",
    name: "Roasted Wild Mushrooms",
    price: 9,
    description:
      "A medley of mushrooms roasted with garlic and thyme — meaty texture, umami-forward and gluten-free.",
    category: MenuCategory.SIDE,
    allergens: [],
    diets: [Diet.VEGAN, Diet.GLUTEN_FREE],
  },
  {
    id: "i-pilot-side-5",
    name: "House Garlic Knots",
    price: 7,
    description:
      "Buttery, pull-apart knots brushed with herb garlic butter — warm, pillowy, comforting.",
    category: MenuCategory.SIDE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },

  // DRINKS (4)
  {
    id: "i-pilot-drink-1",
    name: "San Pellegrino Sparkling Water",
    price: 4,
    description:
      "Crisp, effervescent Italian sparkling water — refreshing and palate-cleansing.",
    category: MenuCategory.DRINK,
    allergens: [],
    diets: [Diet.VEGAN, Diet.GLUTEN_FREE],
  },
  {
    id: "i-pilot-drink-2",
    name: "Blood Orange Italian Soda",
    price: 6,
    description:
      "House-squeezed blood orange with a fizzy finish — bright, slightly tart, very refreshing.",
    category: MenuCategory.DRINK,
    allergens: [],
    diets: [Diet.VEGAN],
  },
  {
    id: "i-pilot-drink-3",
    name: "House Red / White Wine (glass)",
    price: 12,
    description:
      "Carefully selected rotating Italian wines by the glass — ask your server for today’s pour.",
    category: MenuCategory.DRINK,
    allergens: [],
    diets: [Diet.VEGAN, Diet.GLUTEN_FREE],
  },
  {
    id: "i-pilot-drink-4",
    name: "Classic Negroni",
    price: 14,
    description:
      "A perfect balance of bitter, sweet and botanical — gin, Campari and sweet vermouth, stirred to chill.",
    category: MenuCategory.DRINK,
    allergens: [],
    diets: [],
  },

  // DESERTS (2)
  {
    id: "i-pilot-dessert-1",
    name: "Affogato al Caffè",
    price: 10,
    description:
      "Vanilla gelato drowned in hot espresso — silky, bittersweet, and utterly indulgent.",
    category: MenuCategory.DESSERT,
    allergens: [Allergen.DAIRY],
    diets: [
      /* not vegan */
    ],
  },
  {
    id: "i-pilot-dessert-2",
    name: "Olive Oil Cake with Lemon Mascarpone",
    price: 11,
    description:
      "Moist olive oil sponge, lemon zest and a cloud of mascarpone — subtle, citrus-lifted sweetness.",
    category: MenuCategory.DESSERT,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },

  // ENTREES (PIZZAS) (22)
  {
    id: "i-pilot-entree-1",
    name: "Margherita DOC",
    price: 18,
    description:
      "San Marzano tomatoes, fior di latte mozzarella, fresh basil and extra-virgin olive oil — timeless and pure.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-2",
    name: "Funghi e Tartufo",
    price: 22,
    description:
      "Wild mushrooms, fior di latte, fontina and a whisper of black truffle — earthy luxury on a blistered crust.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-3",
    name: "Prosciutto & Arugula",
    price: 24,
    description:
      "Paper-thin prosciutto, peppery arugula, shavings of parm and a lemon finish — delicate salt and pepper contrast.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-4",
    name: "Quattro Formaggi",
    price: 23,
    description:
      "A singing quartet of cheeses — melted, tangy, and decadently rich with a crisp, blistered base.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-5",
    name: "Diavola",
    price: 20,
    description:
      "San Marzano sauce, spicy salami, smoked mozzarella and chile honey — heat tempered by smoky cheese.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-6",
    name: "Bianca al Rosmarino",
    price: 21,
    description:
      "Ricotta, mozzarella, lemon zest and rosemary on a white base — bright, creamy, herb-forward.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-7",
    name: "Pesto & Burrata",
    price: 25,
    description:
      "House basil-pine nut pesto, slow-roasted tomatoes and creamy burrata — fragrant, nutty, luxuriously creamy.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY, Allergen.NUTS],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-8",
    name: "Frutti di Mare Fra Diavolo",
    price: 30,
    description:
      "Shrimp, clams and tomato-basil sauce with a touch of chili — a seafood celebration on crisp dough.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.SHELLFISH],
    diets: [Diet.PESCATARIAN],
  },
  {
    id: "i-pilot-entree-9",
    name: "Smoked Salmon & Dill",
    price: 28,
    description:
      "Cold-smoked salmon, dill crème fraîche and lemon zest on a thin, blistered crust — refined and bright.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.FISH, Allergen.DAIRY],
    diets: [Diet.PESCATARIAN],
  },
  {
    id: "i-pilot-entree-10",
    name: "Fig, Prosciutto & Gorgonzola",
    price: 26,
    description:
      "Sweet figs, salty prosciutto and creamy gorgonzola finish with a balsamic drizzle — sweet-savory perfection.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-11",
    name: "Pera e Noci (Pear & Gorgonzola)",
    price: 24,
    description:
      "Caramelized pear, gorgonzola and toasted walnuts — texture and sweet-salty balance in every bite.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY, Allergen.NUTS],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-12",
    name: "Capricciosa",
    price: 23,
    description:
      "Artichoke hearts, prosciutto, mushrooms and olives over a light tomato base — hearty, classic, balanced.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-13",
    name: "Calabrese Sausage & Chillies",
    price: 21,
    description:
      "Spicy Calabrese sausage, peppers and smoked mozzarella — robust, spicy, unapologetically bold.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-14",
    name: "Vegan Margherita (Cashew Mozzarella)",
    price: 19,
    description:
      "San Marzano tomatoes, house cashew-based “mozzarella” and basil — all the classic flavor, fully plant-based.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.NUTS],
    diets: [Diet.VEGAN],
  },
  {
    id: "i-pilot-entree-15",
    name: "Garden (Gluten-Free Crust)",
    price: 20,
    description:
      "Roasted seasonal vegetables, fresh tomatoes and fior di latte on a certified gluten-free crust.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.GLUTEN_FREE, Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-16",
    name: "Four Seasons",
    price: 24,
    description:
      "Divided sections of artichoke, prosciutto, mushrooms and olives — an exploration of contrasts and textures.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-17",
    name: "Burrata & Heirloom (Pizza)",
    price: 26,
    description:
      "Charred crust topped post-bake with burrata, heirloom tomatoes and basil oil — creamy and intensely fresh.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
  {
    id: "i-pilot-entree-18",
    name: "Truffle & Speck",
    price: 28,
    description:
      "Smoky speck, bubbly mozzarella and a drizzle of truffle oil — savory, smoky, deeply aromatic.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-19",
    name: "Lobster & Lemon Cream",
    price: 34,
    description:
      "Succulent lobster, lemon-scented cream and chives on a golden crust — the restaurant’s signature indulgence.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.SHELLFISH, Allergen.DAIRY],
    diets: [Diet.PESCATARIAN],
  },
  {
    id: "i-pilot-entree-20",
    name: "Clam & Garlic (White Pie)",
    price: 29,
    description:
      "Fresh clams, garlic, parsley and a splash of white wine reduction — coastal flavors on a blistered base.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.SHELLFISH],
    diets: [Diet.PESCATARIAN],
  },
  {
    id: "i-pilot-entree-21",
    name: "Spicy Honey Pepperoni & Ricotta",
    price: 21,
    description:
      "Crisp pepperoni, dollops of ricotta and a drizzle of chili-honey — sweet heat and creamy contrast.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [],
  },
  {
    id: "i-pilot-entree-22",
    name: "Chef's Seasonal Porcini & Taleggio",
    price: 27,
    description:
      "Porcini mushrooms, melted taleggio and a finish of aged olive oil — seasonal, deeply savory, elegant.",
    category: MenuCategory.ENTREE,
    allergens: [Allergen.DAIRY],
    diets: [Diet.VEGETARIAN],
  },
];

export default PilotMenu;
