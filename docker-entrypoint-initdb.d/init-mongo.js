db = db.getSiblingDB("showball");

db.createCollection("tokens");

db.tokens.insertMany([
  {
    textId: "slimak",
    name: "Slimák",
    description: "",
    imageSrc: "uploads/slimak.png",
    levels: [
      {
        coins: 1,
        points: 1,
        exps: 1,
        nextLevelCost: 1,
      },
      {
        coins: 2,
        points: 2,
        exps: 2,
        nextLevelCost: 2,
      },
    ],
    maxLevel: 2,
    state: true,
  },
  {
    textId: "kozel",
    name: "Kozel",
    description: "",
    imageSrc: null,
    levels: [
      {
        coins: 1,
        points: 1,
        exps: 1,
        nextLevelCost: 1,
      },
      {
        coins: 2,
        points: 2,
        exps: 2,
        nextLevelCost: 2,
      },
    ],
    maxLevel: 2,
    state: true,
  },
  {
    textId: "krtek",
    name: "Krtek",
    description: "",
    imageSrc: null,
    levels: [
      {
        coins: 1,
        points: 1,
        exps: 1,
        nextLevelCost: 1,
      },
    ],
    maxLevel: 1,
    state: true,
  },
]);
