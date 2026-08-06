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
  }
];
