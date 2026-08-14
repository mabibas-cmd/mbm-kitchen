const recipes = [
  {
    id: "prawn-lemon-risotto",
    number: 1,
    title: { en: "Prawn and lemon risotto", pt: "Risoto de camarão e limão", it: "Risotto ai gamberi e limone" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "seafood",
    format: "rice",
    activeMinutes: 15,
    totalMinutes: 35,
    pots: 2,
    pausable: false,
    makeAhead: false,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: 300, unit: "g", item: { en: "arborio rice", pt: "arroz arbóreo", it: "riso arborio" }, staple: true },
      { amount: 250, unit: "g", item: { en: "prawns", pt: "camarões", it: "gamberi" }, staple: false },
      { amount: 1, unit: null, item: { en: "lemon", pt: "limão", it: "limone" }, staple: false }
    ],
    steps: {
      en: [
        "Soften the onion in butter.",
        "Toast the rice, then add wine.",
        "Add stock a ladle at a time until al dente.",
        "Fold through prawns, lemon zest and butter."
      ],
      pt: [
        "Refogue a cebola na manteiga.",
        "Toste o arroz e acrescente o vinho.",
        "Adicione o caldo, uma concha por vez, até ficar al dente.",
        "Incorpore os camarões, as raspas de limão e a manteiga."
      ],
      it: [
        "Far appassire la cipolla nel burro.",
        "Tostare il riso, poi sfumare con il vino.",
        "Aggiungere il brodo un mestolo alla volta fino a cottura al dente.",
        "Mantecare con i gamberi, la scorza di limone e il burro."
      ]
    }
  },
  {
    id: "tortellini-panna-bacon-peas-corn",
    number: 2,
    title: {
      en: "Tortellini with panna, bacon, peas and corn",
      pt: "Tortellini com creme de leite, bacon, ervilha e milho",
      it: "Tortellini con panna, pancetta, piselli e mais"
    },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "pork",
    format: "pasta",
    activeMinutes: 20,
    totalMinutes: 20,
    pots: 2,
    pausable: true,
    makeAhead: false,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: 200, unit: "g", item: { en: "bacon", pt: "bacon", it: "pancetta" }, staple: false },
      { amount: 1, unit: "can", item: { en: "peas and corn", pt: "ervilha e milho", it: "piselli e mais" }, staple: false },
      { amount: 300, unit: "ml", item: { en: "thickened cream", pt: "creme de leite", it: "panna da cucina" }, staple: false },
      { amount: 50, unit: "g", item: { en: "parmesan", pt: "parmesão", it: "parmigiano" }, staple: true },
      { amount: 500, unit: "g", item: { en: "tortellini", pt: "tortellini", it: "tortellini" }, staple: false }
    ],
    steps: {
      en: [
        "Fry the cut bacon.",
        "Add the can of peas and corn.",
        "Stir through the thickened cream and season.",
        "Add the parmesan.",
        "Cook the tortellini, then add to the sauce."
      ],
      pt: [
        "Frite o bacon picado.",
        "Acrescente a lata de ervilha e milho.",
        "Misture o creme de leite e tempere.",
        "Junte o parmesão.",
        "Cozinhe o tortellini e junte ao molho."
      ],
      it: [
        "Rosolare la pancetta a cubetti.",
        "Unire i piselli e il mais scolati.",
        "Mantecare con la panna e aggiustare di sale.",
        "Aggiungere il parmigiano.",
        "Cuocere i tortellini e unirli al sugo."
      ]
    }
  },
  {
    id: "lamb-cutlets-potato-gratin-and-broccolini",
    number: 3,
    title: { en: "Lamb cutlets, potato gratin and broccolini", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "meat",
    format: "roast",
    activeMinutes: 20,
    totalMinutes: 90,
    pots: 3,
    pausable: true,
    makeAhead: true,
    cuisine: "Other",
    season: "winter",
    ingredients: [
      { amount: 6, unit: null, item: { en: "lamb cutlets", pt: "", it: "" }, staple: false },
      { amount: 3, unit: null, item: { en: "potatoes", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "bunch", item: { en: "broccolini", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "ml", item: { en: "milk", pt: "", it: "" }, staple: false },
      { amount: 80, unit: "g", item: { en: "parmesan", pt: "", it: "" }, staple: false },
      { amount: 50, unit: "g", item: { en: "butter", pt: "", it: "" }, staple: true },
      { amount: 2, unit: null, item: { en: "garlic cloves", pt: "", it: "" }, staple: true },
      { amount: 2, unit: "tsp", item: { en: "rosemary", pt: "", it: "" }, staple: true },
      { amount: 2, unit: "tbsp", item: { en: "olive oil", pt: "", it: "" }, staple: true },
      { amount: 1, unit: "tsp", item: { en: "salt", pt: "", it: "" }, staple: true }
    ],
    steps: {
      en: [
        "Season the cutlets with garlic, salt, rosemary and olive oil and set aside.",
        "Slice the potatoes thinly and layer into a dish, alternating with butter, milk, salt and parmesan. Finish with plenty of parmesan and butter.",
        "Bake the gratin covered for 40 minutes, then a further 30 minutes uncovered.",
        "Sear the cutlets to your liking and rest.",
        "Bake the broccolini for 12 minutes, dressed with olive oil and salt."
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "chilli-con-carne",
    number: 4,
    title: { en: "Chilli Con Carne", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "meat",
    format: "soup",
    activeMinutes: 20,
    totalMinutes: 30,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "Mexican",
    season: "winter",
    ingredients: [
      { amount: 500, unit: "g", item: { en: "mince", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "black beans", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "crushed tomatoes", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "taco seasoning", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "bottle", item: { en: "passata", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "onion", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "red onion", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "avocado", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "tasty cheese", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "tortilla chips", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Fry diced onion",
        "Add mince",
        "Add beans",
        "Add tomato and passata",
        "Add taco seasoning",
        "Boil for 15 minutes",
        "Serve with all toppings"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "strawberries-and-whipped-cream",
    number: 5,
    title: { en: "Strawberries and Whipped Cream", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "dessert",
    protein: null,
    format: "fruit",
    activeMinutes: 10,
    totalMinutes: 10,
    pots: 2,
    pausable: true,
    makeAhead: true,
    cuisine: "",
    season: "all year",
    ingredients: [
      { amount: 1, unit: "punnet", item: { en: "strawberries", pt: "", it: "" }, staple: false },
      { amount: 0.5, unit: null, item: { en: "thickened cream", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "sugar", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "lime", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Cut strawberries",
        "Whip cream, sugar and lime"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "prawn-pasta",
    number: 6,
    title: { en: "Prawn Pasta", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "seafood",
    format: "pasta",
    activeMinutes: 15,
    totalMinutes: 15,
    pots: 2,
    pausable: false,
    makeAhead: false,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: 200, unit: "g", item: { en: "prawns", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "spaghetti", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Season prawns with garlic, chilli and lime juice",
        "Fry them with oil, finish with butter",
        "Boil pasta",
        "Add to prawn pot"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "pasta-that-slaps",
    number: 7,
    title: { en: "Pasta That Slaps", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "chicken",
    format: "pasta",
    activeMinutes: 25,
    totalMinutes: 25,
    pots: 2,
    pausable: false,
    makeAhead: false,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: 500, unit: "g", item: { en: "chicken thighs", pt: "", it: "" }, staple: false },
      { amount: 1, unit: null, item: { en: "onion", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "tomato paste", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "penne", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "thickened cream", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "parmesan", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "burrata", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Fry diced onion",
        "Add diced chicken",
        "Add tomato paste",
        "Add thickened cream and parmesan",
        "Boil pasta and add to chicken pot",
        "Cut burrata on top of pasta"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "carbonara",
    number: 8,
    title: { en: "Carbonara", pt: "", it: "" },
    servings: 3,
    photo: null,
    type: "savoury",
    protein: "meat",
    format: "pasta",
    activeMinutes: 20,
    totalMinutes: 20,
    pots: 2,
    pausable: false,
    makeAhead: false,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: 200, unit: "g", item: { en: "pancetta cut thick (about 1cm)", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "g", item: { en: "fettuccine", pt: "", it: "" }, staple: false },
      { amount: 2, unit: null, item: { en: "eggs", pt: "", it: "" }, staple: true },
      { amount: 1, unit: null, item: { en: "egg yolk", pt: "", it: "" }, staple: true },
      { amount: 80, unit: "g", item: { en: "parmigiano reggiano", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "salt", pt: "", it: "" }, staple: true },
      { amount: 1, unit: "tsp", item: { en: "black pepper", pt: "", it: "" }, staple: true }
    ],
    steps: {
      en: [
        "Dice the pancetta and fry it with no oil until almost crispy. A lot of fat will render out — that's flavour, keep it.",
        "Meanwhile get the pasta water boiling, salty like the ocean. When the pancetta is done, drop the pasta and stir every so often.",
        "While that cooks, mix the eggs, yolk and parmigiano in a bowl. Be generous with black pepper, but go easy on salt — the pancetta and parmigiano are already salty.",
        "Reserve a cup of pasta water. Drain the pasta and toss it with the pancetta and its fat, off the heat.",
        "Add the egg mixture and toss quickly, until glossy. Do not let it scramble."
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "salmon-teriyaki",
    number: 9,
    title: { en: "Salmon Teriyaki", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "seafood",
    format: "rice",
    activeMinutes: 15,
    totalMinutes: 30,
    pots: 2,
    pausable: false,
    makeAhead: false,
    cuisine: "Asian",
    season: "all year",
    ingredients: [
      { amount: 300, unit: "g", item: { en: "salmon", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "cup", item: { en: "sushi rice", pt: "", it: "" }, staple: false },
      { amount: 1, unit: null, item: { en: "cucumber", pt: "", it: "" }, staple: false },
      { amount: 1, unit: null, item: { en: "avocado", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "spring onion", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Dice salmon, season with soy sauce, brown sugar, chilli flakes, mirin, garlic, onion, MSG, salt and sesame oil",
        "Mandolin cucumber, season with soy sauce, salt, sesame seeds, sesame oil, garlic",
        "Bake salmon for 12 minutes",
        "Cook sushi rice",
        "Assemble bowl with all and finish with avocado and spring onions"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "classic-brownies",
    number: 10,
    title: { en: "Classic Brownies", pt: "", it: "" },
    servings: null,
    photo: null,
    type: "dessert",
    protein: null,
    format: "chocolate",
    activeMinutes: 20,
    totalMinutes: 50,
    pots: 3,
    pausable: false,
    makeAhead: true,
    cuisine: "American",
    season: "all year",
    ingredients: [
      { amount: 400, unit: "g", item: { en: "semi sweet chocolate", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "g", item: { en: "sugar", pt: "", it: "" }, staple: false },
      { amount: 100, unit: "g", item: { en: "butter", pt: "", it: "" }, staple: false },
      { amount: 4, unit: null, item: { en: "eggs", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "vanilla", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "baking powder", pt: "", it: "" }, staple: false },
      { amount: 115, unit: "g", item: { en: "flour", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Melt chocolate and butter together",
        "Mix eggs, sugar, vanilla",
        "Join chocolate mixture to egg mixture",
        "Add flour and baking powder",
        "Bake at 180 for around 30 minutes"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "dulce-de-leche-brownies",
    number: 11,
    title: { en: "Dulce de Leche Brownies", pt: "", it: "" },
    servings: null,
    photo: null,
    type: "dessert",
    protein: null,
    format: "chocolate",
    activeMinutes: 20,
    totalMinutes: 50,
    pots: 3,
    pausable: false,
    makeAhead: true,
    cuisine: "American",
    season: "all year",
    ingredients: [
      { amount: 400, unit: "g", item: { en: "semi sweet chocolate", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "g", item: { en: "sugar", pt: "", it: "" }, staple: false },
      { amount: 100, unit: "g", item: { en: "butter", pt: "", it: "" }, staple: false },
      { amount: 4, unit: null, item: { en: "eggs", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "vanilla", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "baking powder", pt: "", it: "" }, staple: false },
      { amount: 115, unit: "g", item: { en: "flour", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "caramel", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Melt chocolate and butter together",
        "Mix eggs, sugar, vanilla",
        "Join chocolate mixture to egg mixture",
        "Add flour and baking powder",
        "Add dollops of cold caramel, mix a little with a knife",
        "Bake at 180 for around 30 minutes",
        "Finish with salt flakes"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "chocolate-chips-cookies",
    number: 12,
    title: { en: "Chocolate Chips Cookies", pt: "", it: "" },
    servings: null,
    photo: null,
    type: "dessert",
    protein: null,
    format: "chocolate",
    activeMinutes: 20,
    totalMinutes: 20,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "American",
    season: "all year",
    ingredients: [
      { amount: 200, unit: "g", item: { en: "unsalted butter", pt: "", it: "" }, staple: false },
      { amount: 180, unit: "g", item: { en: "brown sugar", pt: "", it: "" }, staple: false },
      { amount: 150, unit: "g", item: { en: "granulated sugar", pt: "", it: "" }, staple: false },
      { amount: 2, unit: null, item: { en: "eggs", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "vanilla extract", pt: "", it: "" }, staple: false },
      { amount: 325, unit: "g", item: { en: "all-purpose flour", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "salt", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "baking powder", pt: "", it: "" }, staple: false },
      { amount: 2, unit: "cup", item: { en: "chocolate chips", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Cream sugars and butter",
        "add eggs and vanilla",
        "add flour, salt and baking powder.",
        "add chocolate chips",
        "portion with ice cream scoop",
        "add salt flakes to the top",
        "let it cool it overnight in the fridge",
        "bake it for 13 minutes at 180, let it cool in pan",
        "freeze rest"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "brown-butter-chocolate-chips-cookies",
    number: 13,
    title: { en: "Brown Butter Chocolate Chips Cookies", pt: "", it: "" },
    servings: null,
    photo: null,
    type: "dessert",
    protein: null,
    format: "chocolate",
    activeMinutes: 20,
    totalMinutes: 20,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "American",
    season: "all year",
    ingredients: [
      { amount: 165, unit: "g", item: { en: "brown butter", pt: "", it: "" }, staple: false },
      { amount: 35, unit: "g", item: { en: "butter", pt: "", it: "" }, staple: false },
      { amount: 180, unit: "g", item: { en: "brown sugar", pt: "", it: "" }, staple: false },
      { amount: 150, unit: "g", item: { en: "granulated sugar", pt: "", it: "" }, staple: false },
      { amount: 2, unit: null, item: { en: "eggs", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "vanilla extract", pt: "", it: "" }, staple: false },
      { amount: 325, unit: "g", item: { en: "all-purpose flour", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "salt", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "tsp", item: { en: "baking powder", pt: "", it: "" }, staple: false },
      { amount: 2, unit: "cup", item: { en: "chocolate chips", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Cream sugars and butter",
        "add eggs and vanilla",
        "add flour, salt and baking powder.",
        "add chocolate chips",
        "portion with ice cream scoop",
        "add salt flakes to the top",
        "let it cool it overnight in the fridge",
        "bake it for 13 minutes at 180, let it cool in pan",
        "freeze rest"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "cookie-skillet",
    number: 14,
    title: { en: "Cookie Skillet", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "dessert",
    protein: null,
    format: "chocolate",
    activeMinutes: 5,
    totalMinutes: 25,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "American",
    season: "all year",
    ingredients: [
      { amount: null, unit: null, item: { en: "frozen cookie dough balls", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "gelato", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Butter skillet",
        "cover skillet with frozen cookie dough balls",
        "bake at 180 for around 20 minutes, until a bit jiggly in centre",
        "finish with salt flakes",
        "serve with gelato"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "oven-chicken-risotto",
    number: 15,
    title: { en: "Oven Chicken Risotto", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "chicken",
    format: "rice",
    activeMinutes: 20,
    totalMinutes: 40,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "Italian",
    season: "winter",
    ingredients: [
      { amount: 500, unit: "g", item: { en: "chicken thighs", pt: "", it: "" }, staple: false },
      { amount: 1, unit: null, item: { en: "onion", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "cup", item: { en: "rice", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "corn", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "diced tomatoes", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "chicken stock", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "tasty cheese", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Fry onions",
        "add diced chicken",
        "add rice",
        "add corn and tomatoes",
        "add 1.5 cups of stock, salt it",
        "cover and bake it at 200 for 22 minutes",
        "finish with tasty cheese"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "strogonoff",
    number: 16,
    title: { en: "Strogonoff", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "chicken",
    format: "rice",
    activeMinutes: 30,
    totalMinutes: 30,
    pots: 2,
    pausable: true,
    makeAhead: true,
    cuisine: "Brazilian",
    season: "all year",
    ingredients: [
      { amount: 500, unit: "g", item: { en: "meat, chicken or prawns", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "tomato paste", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "thickened cream", pt: "", it: "" }, staple: false },
      { amount: 1, unit: null, item: { en: "onion", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "cup", item: { en: "rice", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "batata palha or potato sticks", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "Worcestershire sauce", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "ketchup", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "fry protein, move to another container",
        "Add some more olive oil and a bit of butter.",
        "Grate onion and add to pot",
        "Bring back protein",
        "Add sauce, tomato paste, and ketchup",
        "Add cream and let it simmer for a bit",
        "Cook rice",
        "Serve on top of rice with the potatoes on the side"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "crispy-rice-prawn-salad",
    number: 17,
    title: { en: "Crispy Rice Prawn Salad", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "seafood",
    format: "salad",
    activeMinutes: 30,
    totalMinutes: 100,
    pots: 2,
    pausable: true,
    makeAhead: true,
    cuisine: "Asian",
    season: "summer",
    ingredients: [
      { amount: 1, unit: "cup", item: { en: "rice", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "g", item: { en: "prawns", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "can", item: { en: "corn", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "edamame", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "cucumber", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "avocado", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "carrots", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "cabbage", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "green goddess sauce or sesame sauce", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Oven dry cooked rice in low tempo with some sesame oil and soy sauce until crispy",
        "Fry prawns",
        "Chop veggies and add all together",
        "Mix well"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "bacon-pear-and-pecan-salad",
    number: 18,
    title: { en: "Bacon, Pear and Pecan salad", pt: "", it: "" },
    servings: 4,
    photo: null,
    type: "savoury",
    protein: "pork",
    format: "salad",
    activeMinutes: 10,
    totalMinutes: 30,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "Brazilian",
    season: "all year",
    ingredients: [
      { amount: 1, unit: "bag", item: { en: "spinach and rocket", pt: "", it: "" }, staple: false },
      { amount: 2, unit: null, item: { en: "pears", pt: "", it: "" }, staple: false },
      { amount: 300, unit: "g", item: { en: "bacon", pt: "", it: "" }, staple: false },
      { amount: 100, unit: "g", item: { en: "pecans", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "maple syrup", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Dice pears and bacon",
        "Add them with the pecan to a pan, toss with a little maple syrup and salt",
        "Bake at 180 until bacon and pear cooked through",
        "Let it cool",
        "Mix with leaves, finish with olive oil and salt"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "beetroot-salad",
    number: 19,
    title: { en: "Beetroot salad", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "veg",
    format: "salad",
    activeMinutes: 10,
    totalMinutes: 10,
    pots: 1,
    pausable: true,
    makeAhead: true,
    cuisine: "Greek",
    season: "all year",
    ingredients: [
      { amount: 250, unit: "g", item: { en: "beetroot", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "spinach", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "marinated goats cheese", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "pepitas", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "olive oil", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Dice all and mix"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "pasta-al-sugo",
    number: 20,
    title: { en: "Pasta al Sugo", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "veg",
    format: "pasta",
    activeMinutes: 10,
    totalMinutes: 20,
    pots: 2,
    pausable: true,
    makeAhead: true,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: null, unit: null, item: { en: "pasta", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "jar", item: { en: "passata", pt: "", it: "" }, staple: false },
      { amount: null, unit: null, item: { en: "burrata (optional)", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Make sauce seasoning with salt, pepper, chilli flakes, beef stock cube.",
        "Let it simmer while pasta cooks",
        "Finish with parmesan, burrata optional"
      ],
      pt: [],
      it: []
    }
  },
  {
    id: "amatriciana",
    number: 21,
    title: { en: "Amatriciana", pt: "", it: "" },
    servings: 2,
    photo: null,
    type: "savoury",
    protein: "meat",
    format: "pasta",
    activeMinutes: 10,
    totalMinutes: 20,
    pots: 2,
    pausable: true,
    makeAhead: true,
    cuisine: "Italian",
    season: "all year",
    ingredients: [
      { amount: null, unit: null, item: { en: "pasta", pt: "", it: "" }, staple: false },
      { amount: 200, unit: "g", item: { en: "pancetta", pt: "", it: "" }, staple: false },
      { amount: 1, unit: "jar", item: { en: "passata", pt: "", it: "" }, staple: false }
    ],
    steps: {
      en: [
        "Fry pancetta until crispy",
        "Add passata, season with salt and pepper, chilli flakes",
        "Add cooked pasta",
        "Finish with parmesan"
      ],
      pt: [],
      it: []
    }
  }
];
