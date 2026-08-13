export interface Dish {
  id: string;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  price: number;
  category: string;
  image: string;
  isSignature?: boolean;
  isPopular?: boolean;
  isWeekendOnly?: boolean;
  priceRange?: string;
  preparationTime?: number;
  allergens?: string[];
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: { fr: string; en: string };
  icon: string;
  order: number;
}

export const menuCategories: MenuCategory[] = [
  { id: "specialites", name: { fr: "Spécialités Maison", en: "House Specialties" }, icon: "Star",       order: 1 },
  { id: "viandes",     name: { fr: "Menu Viande",        en: "Meat Menu"          }, icon: "ForkKnife",  order: 2 },
  { id: "poulets",     name: { fr: "Menu Poulets",        en: "Chicken Menu"       }, icon: "Bird",       order: 3 },
  { id: "poissons",    name: { fr: "Menu Poissons",       en: "Fish Menu"          }, icon: "Fish",       order: 4 },
  { id: "complements", name: { fr: "Compléments",         en: "Side Dishes"        }, icon: "Plus",       order: 5 },
  { id: "boissons",    name: { fr: "Softs & Eaux",        en: "Soft Drinks & Water"}, icon: "Coffee",     order: 6 },
  { id: "bieres",      name: { fr: "Bières",              en: "Beers"              }, icon: "Beer",       order: 7 },
  { id: "vins",        name: { fr: "Vins",                en: "Wines"              }, icon: "Wine",       order: 8 },
  { id: "liqueurs",    name: { fr: "Liqueurs",            en: "Spirits"            }, icon: "Martini",    order: 9 },
];

// ─── Matrice factorialisée : protéine × sauce ───────────────────────────────

type Protein = "viande" | "poulet" | "poisson";
type Sauce   = "tomate" | "arachide" | "ndole" | "legumes" | "pistache" | "gombo" | "pistache-gombo";

const PROTEIN_LABELS: Record<Protein, { fr: string; en: string; category: string; prepTime: number }> = {
  viande:  { fr: "Viande",  en: "Meat",    category: "viandes",  prepTime: 40 },
  poulet:  { fr: "Poulet",  en: "Chicken", category: "poulets",  prepTime: 35 },
  poisson: { fr: "Poisson", en: "Fish",    category: "poissons", prepTime: 30 },
};

const SAUCE_META: Record<Sauce, {
  nameFr: string; nameEn: string;
  descFr: string; descEn: string;
  allergens?: string[];
}> = {
  tomate:        { nameFr: "Sauce Tomate",        nameEn: "Tomato Sauce",       descFr: "mijotée dans une sauce tomate épicée aux herbes africaines",        descEn: "stewed in spicy tomato sauce with African herbs" },
  arachide:      { nameFr: "Sauce d'Arachide",    nameEn: "Peanut Sauce",       descFr: "dans une riche sauce d'arachide traditionnelle, onctueuse et parfumée", descEn: "in rich traditional peanut sauce, creamy and fragrant", allergens: ["cacahuètes"] },
  ndole:         { nameFr: "Ndolé",               nameEn: "Ndole",              descFr: "aux feuilles de ndolé et cacahuètes grillées, saveur profonde",      descEn: "with ndole leaves and roasted peanuts, deep flavor",   allergens: ["cacahuètes"] },
  legumes:       { nameFr: "Légumes Sautés",      nameEn: "Sautéed Vegetables", descFr: "accompagnée de légumes frais sautés aux épices du marché",           descEn: "served with fresh market vegetables sautéed with spices" },
  pistache:      { nameFr: "Sauce Pistache",      nameEn: "Pistache Sauce",     descFr: "dans une sauce onctueuse aux graines de courge, douce et riche",     descEn: "in creamy pumpkin seed sauce, smooth and rich" },
  gombo:         { nameFr: "Sauce Gombo",         nameEn: "Okra Sauce",         descFr: "dans une sauce épaisse au gombo, plat consistant aux saveurs terreuses", descEn: "in thick okra sauce, hearty dish with earthy flavors" },
  "pistache-gombo": { nameFr: "Sauce Pistache Gombo", nameEn: "Pistache & Okra Sauce", descFr: "dans un mélange unique de sauce pistache et gombo, saveurs complexes", descEn: "in a unique blend of pistache and okra sauce, complex flavors" },
};

function makeSauceDish(protein: Protein, sauce: Sauce): Dish {
  const p = PROTEIN_LABELS[protein];
  const s = SAUCE_META[sauce];
  return {
    id:          `${protein}-${sauce}`,
    name:        { fr: `${p.fr} ${s.nameFr}`, en: `${p.en} in ${s.nameEn}` },
    description: { fr: `${p.fr} ${s.descFr}.`, en: `${p.en} ${s.descEn}.` },
    price:       15,
    category:    p.category,
    image:       "",
    preparationTime: p.prepTime,
    ...(s.allergens ? { allergens: s.allergens } : {}),
  };
}

const PROTEINS: Protein[] = ["viande", "poulet", "poisson"];
const SAUCES:   Sauce[]   = ["tomate", "arachide", "ndole", "legumes", "pistache", "gombo", "pistache-gombo"];

const sauceDishes: Dish[] = PROTEINS.flatMap(p => SAUCES.map(s => makeSauceDish(p, s)));

// ─── Spécialités maison ──────────────────────────────────────────────────────

const specialites: Dish[] = [
  {
    id: "eru",
    name:        { fr: "Eru",                                en: "Eru" },
    description: { fr: "Plat traditionnel camerounais aux feuilles d'eru, viande et poisson fumé.", en: "Traditional Cameroonian dish with eru leaves, meat and smoked fish." },
    price: 13, category: "specialites", image: "", isSignature: true, preparationTime: 45,
    tags: ["traditionnel", "camerounais"],
  },
  {
    id: "kontchap",
    name:        { fr: "Kontchap",                          en: "Kontchap" },
    description: { fr: "Spécialité camerounaise aux légumes verts et viande, savoureux et généreux.", en: "Cameroonian specialty with green vegetables and meat, flavorful and generous." },
    price: 10, category: "specialites", image: "", isSignature: true, preparationTime: 35,
  },
  {
    id: "ndole-mixte",
    name:        { fr: "Ndolé Mixte",                       en: "Mixed Ndole" },
    description: { fr: "Notre ndolé signature — viande et poisson, feuilles amères, cacahuètes grillées. Le plat le plus demandé.", en: "Our signature ndole — meat and fish, bitter leaves, roasted peanuts. Our most requested dish." },
    price: 15, category: "specialites", image: "", isSignature: true, isPopular: true, preparationTime: 40,
    allergens: ["cacahuètes"],
  },
  {
    id: "macabo-malaxe-ndole-poisson",
    name:        { fr: "Macabo Malaxé + Ndolé Poisson",     en: "Mashed Macabo + Fish Ndole" },
    description: { fr: "Macabo pilé à la main, accompagné de ndolé au poisson. Une combinaison parfaite.", en: "Hand-mashed macabo with fish ndole. A perfect combination." },
    price: 17.5, category: "specialites", image: "", isSignature: true, preparationTime: 50,
  },
  {
    id: "brochettes",
    name:        { fr: "Brochettes",                        en: "Skewers" },
    description: { fr: "Brochettes de viande grillée aux épices africaines, dorées et savoureuses.", en: "Grilled meat skewers with African spices, golden and flavorful." },
    price: 10, category: "specialites", image: "", isSignature: true, preparationTime: 25,
  },
  {
    id: "taro-sauce-jaune",
    name:        { fr: "Taro Sauce Jaune",                  en: "Taro Yellow Sauce" },
    description: { fr: "Taro et sauce jaune épicée — spécialité du weekend uniquement.", en: "Taro with spicy yellow sauce — weekend specialty only." },
    price: 15, category: "specialites", image: "", isWeekendOnly: true, preparationTime: 45,
  },
  {
    id: "beignets-haricot",
    name:        { fr: "Beignets Haricot",                  en: "Bean Fritters" },
    description: { fr: "Beignets croustillants aux haricots, idéal pour l'apéritif. Weekend uniquement.", en: "Crispy bean fritters, ideal as appetizer. Weekend only." },
    price: 8, category: "specialites", image: "", isWeekendOnly: true, preparationTime: 20,
    tags: ["végétarien", "apéritif"],
  },
];

// ─── Viandes supplémentaires ─────────────────────────────────────────────────

const viandesExtra: Dish[] = [
  {
    id: "porc",
    name:        { fr: "Porc",           en: "Pork" },
    description: { fr: "Porc grillé ou en sauce selon votre préférence.", en: "Grilled or sauced pork according to your preference." },
    price: 15, category: "viandes", image: "", preparationTime: 35,
  },
  {
    id: "porc-braise",
    name:        { fr: "Porc Braisé",    en: "Braised Pork" },
    description: { fr: "Porc braisé lentement aux épices, tendre et profondément savoureux.", en: "Slowly braised pork with spices, tender and deeply flavorful." },
    price: 16, category: "viandes", image: "", isPopular: true, preparationTime: 45,
  },
  {
    id: "chevre",
    name:        { fr: "Chèvre",         en: "Goat" },
    description: { fr: "Viande de chèvre grillée aux épices traditionnelles, goût authentique.", en: "Grilled goat meat with traditional spices, authentic taste." },
    price: 12.5, category: "viandes", image: "", preparationTime: 50,
  },
  {
    id: "rognons-sautes",
    name:        { fr: "Rognons Sautés", en: "Sautéed Kidneys" },
    description: { fr: "Rognons sautés aux oignons et épices, spécialité de la maison.", en: "Kidneys sautéed with onions and spices, house specialty." },
    price: 12.5, category: "viandes", image: "", preparationTime: 30,
  },
  {
    id: "tripes-sautes",
    name:        { fr: "Tripes Sautés",  en: "Sautéed Tripe" },
    description: { fr: "Tripes sautés aux légumes et épices, plat traditionnel consistant.", en: "Tripe sautéed with vegetables and spices, hearty traditional dish." },
    price: 12.5, category: "viandes", image: "", preparationTime: 45,
  },
  {
    id: "petits-os",
    name:        { fr: "Petits Os",      en: "Small Bones" },
    description: { fr: "Petits os de viande grillés, accompagnement ou en-cas savoureux.", en: "Grilled small meat bones, tasty side or snack." },
    price: 7, category: "viandes", image: "", preparationTime: 25,
  },
];

// ─── Poulets supplémentaires ─────────────────────────────────────────────────

const pouletExtra: Dish[] = [
  {
    id: "demi-poulet-dg",
    name:        { fr: "1/2 Poulet DG",  en: "1/2 Chicken DG" },
    description: { fr: "Demi-poulet à la manière Directeur Général — légumes, épices, sauce maison.", en: "Half chicken Director General style — vegetables, spices, house sauce." },
    price: 15, category: "poulets", image: "", isPopular: true, preparationTime: 35,
  },
  {
    id: "poulet-braise",
    name:        { fr: "Poulet Braisé",  en: "Braised Chicken" },
    description: { fr: "Poulet grillé au feu de bois, peau croustillante et chair tendre.", en: "Wood-fired grilled chicken, crispy skin and tender meat." },
    price: 15, category: "poulets", image: "", isPopular: true, preparationTime: 30,
  },
  {
    id: "ailes-poulets",
    name:        { fr: "Ailes de Poulets", en: "Chicken Wings" },
    description: { fr: "Ailes de poulet grillées et épicées, croustillantes à souhait.", en: "Grilled and spiced chicken wings, perfectly crispy." },
    price: 7, category: "poulets", image: "", preparationTime: 20,
  },
];

// ─── Poissons supplémentaires ─────────────────────────────────────────────────

const poissonExtra: Dish[] = [
  {
    id: "maquereau",
    name:        { fr: "Maquereau",      en: "Mackerel" },
    description: { fr: "Maquereau frais du jour, grillé ou en sauce selon votre envie.", en: "Fresh daily mackerel, grilled or sauced as you wish." },
    price: 18, category: "poissons", image: "", priceRange: "À partir de", preparationTime: 25,
  },
  {
    id: "bar",
    name:        { fr: "Bar",            en: "Sea Bass" },
    description: { fr: "Bar frais du jour, chair ferme et délicate, préparé à votre convenance.", en: "Fresh daily sea bass, firm and delicate, prepared to your liking." },
    price: 25, category: "poissons", image: "", priceRange: "À partir de", preparationTime: 30,
  },
  {
    id: "tilapia",
    name:        { fr: "Tilapia",        en: "Tilapia" },
    description: { fr: "Tilapia frais grillé ou braisé, poisson doux et savoureux.", en: "Fresh tilapia grilled or braised, mild and flavorful fish." },
    price: 20, category: "poissons", image: "", priceRange: "À partir de", preparationTime: 25,
  },
  {
    id: "sole",
    name:        { fr: "Sole",           en: "Sole" },
    description: { fr: "Sole fraîche préparée avec finesse — un poisson noble pour les grands moments.", en: "Fresh sole prepared with finesse — a noble fish for great moments." },
    price: 35, category: "poissons", image: "", preparationTime: 35,
  },
];

// ─── Compléments ─────────────────────────────────────────────────────────────

const complements: Dish[] = [
  { id: "plantains-frits",   name: { fr: "Plantains Frits",   en: "Fried Plantains"      }, description: { fr: "Bananes plantains dorées et croustillantes.",             en: "Golden and crispy fried plantains."              }, price: 3.5, category: "complements", image: "", isPopular: true, preparationTime: 10, tags: ["végétarien"] },
  { id: "plantains-tapes",   name: { fr: "Plantains Tapés",   en: "Smashed Plantains"    }, description: { fr: "Plantains écrasés et assaisonnés à la manière traditionnelle.", en: "Smashed and traditionally seasoned plantains." }, price: 3.5, category: "complements", image: "", preparationTime: 15, tags: ["végétarien"] },
  { id: "wata-fufu",         name: { fr: "Wata Fufu",         en: "Wata Fufu"            }, description: { fr: "Accompagnement traditionnel à base de manioc fermenté.",    en: "Traditional fermented cassava side dish."        }, price: 5,   category: "complements", image: "", preparationTime: 20 },
  { id: "igname-vapeur",     name: { fr: "Igname Vapeur",     en: "Steamed Yam"          }, description: { fr: "Igname cuite à la vapeur, naturelle et rassasiante.",       en: "Steamed yam, natural and filling."               }, price: 5,   category: "complements", image: "", preparationTime: 25, tags: ["végétarien"] },
  { id: "plantain-vapeur",   name: { fr: "Plantain Vapeur",   en: "Steamed Plantain"     }, description: { fr: "Plantain cuit à la vapeur, doux et savoureux.",             en: "Steamed plantain, soft and tasty."               }, price: 5,   category: "complements", image: "", preparationTime: 20, tags: ["végétarien"] },
  { id: "patate-vapeur",     name: { fr: "Patate Vapeur",     en: "Steamed Sweet Potato" }, description: { fr: "Patate douce vapeur, sucrée naturellement.",                en: "Steamed sweet potato, naturally sweet."          }, price: 7,   category: "complements", image: "", preparationTime: 30, tags: ["végétarien"] },
  { id: "patate-frittes",    name: { fr: "Patate Frittes",    en: "Sweet Potato Fries"   }, description: { fr: "Frites de patate douce, croustillantes et dorées.",         en: "Crispy and golden sweet potato fries."           }, price: 5,   category: "complements", image: "", preparationTime: 15, tags: ["végétarien"] },
  { id: "riz",               name: { fr: "Riz",               en: "Rice"                 }, description: { fr: "Riz blanc parfumé.",                                        en: "Fragrant white rice."                            }, price: 3.5, category: "complements", image: "", preparationTime: 20, tags: ["végétarien"] },
  { id: "semoule",           name: { fr: "Semoule",           en: "Semolina"             }, description: { fr: "Semoule fine, parfaite pour accompagner les sauces.",       en: "Fine semolina, perfect to soak up sauces."       }, price: 3.5, category: "complements", image: "", preparationTime: 15, tags: ["végétarien"] },
  { id: "bobolo",            name: { fr: "Bobolo",            en: "Bobolo"               }, description: { fr: "Manioc fermenté traditionnel, spécialité camerounaise.",    en: "Traditional fermented cassava, Cameroonian specialty." }, price: 3.5, category: "complements", image: "", preparationTime: 10 },
];

// ─── Boissons ─────────────────────────────────────────────────────────────────

const boissons: Dish[] = [
  { id: "coca-cola",        name: { fr: "Coca Cola",        en: "Coca Cola"         }, description: { fr: "Soda classique et rafraîchissant.",         en: "Classic refreshing soda."           }, price: 2.5, category: "boissons", image: "" },
  { id: "fanta",            name: { fr: "Fanta",            en: "Fanta"             }, description: { fr: "Soda à l'orange pétillant.",                en: "Sparkling orange soda."             }, price: 2.5, category: "boissons", image: "" },
  { id: "looza",            name: { fr: "Looza",            en: "Looza"             }, description: { fr: "Jus de fruits naturel.",                    en: "Natural fruit juice."               }, price: 2.5, category: "boissons", image: "" },
  { id: "vimto",            name: { fr: "Vimto",            en: "Vimto"             }, description: { fr: "Boisson aux fruits exotiques.",             en: "Exotic fruit drink."                }, price: 2.5, category: "boissons", image: "" },
  { id: "ginger",           name: { fr: "Ginger",           en: "Ginger Beer"       }, description: { fr: "Boisson au gingembre piquante et fraîche.", en: "Spicy and refreshing ginger drink." }, price: 2.5, category: "boissons", image: "" },
  { id: "perrier",          name: { fr: "Perrier",          en: "Perrier"           }, description: { fr: "Eau gazeuse naturelle française.",          en: "French natural sparkling water."    }, price: 3,   category: "boissons", image: "" },
  { id: "pellegrino",       name: { fr: "Pellegrino",       en: "Pellegrino"        }, description: { fr: "Eau gazeuse italienne de prestige.",        en: "Prestigious Italian sparkling water."}, price: 3,  category: "boissons", image: "" },
  { id: "eau-gazeuse-spa",  name: { fr: "Spa Gazeuse",      en: "Spa Sparkling"     }, description: { fr: "Eau gazeuse belge pure.",                  en: "Pure Belgian sparkling water."      }, price: 2.5, category: "boissons", image: "" },
  { id: "eau-plate-spa",    name: { fr: "Spa Plate",        en: "Spa Still"         }, description: { fr: "Eau plate belge naturelle.",               en: "Natural Belgian still water."       }, price: 2.5, category: "boissons", image: "" },
  { id: "red-bull",         name: { fr: "Red Bull",         en: "Red Bull"          }, description: { fr: "Boisson énergisante iconique.",             en: "Iconic energy drink."               }, price: 4,   category: "boissons", image: "" },
  { id: "top-grenadine",    name: { fr: "Top Grenadine",    en: "Top Grenadine"     }, description: { fr: "Sirop de grenadine rafraîchissant.",        en: "Refreshing grenadine syrup."        }, price: 6,   category: "boissons", image: "" },
  { id: "top-pamplemousse", name: { fr: "Top Pamplemousse", en: "Top Grapefruit"    }, description: { fr: "Sirop de pamplemousse acidulé.",            en: "Tangy grapefruit syrup."            }, price: 6,   category: "boissons", image: "" },
  { id: "top-ananas",       name: { fr: "Top Ananas",       en: "Top Pineapple"     }, description: { fr: "Sirop d'ananas tropical.",                  en: "Tropical pineapple syrup."          }, price: 6,   category: "boissons", image: "" },
  { id: "djino",            name: { fr: "Djino",            en: "Djino"             }, description: { fr: "Boisson africaine au gingembre.",           en: "African ginger drink."              }, price: 6,   category: "boissons", image: "", tags: ["africain"] },
  { id: "malta-guinness",   name: { fr: "Malta Guinness",   en: "Malta Guinness"    }, description: { fr: "Boisson maltée sans alcool nutritive.",     en: "Nutritious non-alcoholic malt drink."}, price: 5,  category: "boissons", image: "" },
  { id: "super-malt",       name: { fr: "Super Malt",       en: "Super Malt"        }, description: { fr: "Boisson maltée énergisante.",              en: "Energizing malt drink."             }, price: 3,   category: "boissons", image: "" },
];

// ─── Bières ──────────────────────────────────────────────────────────────────

const bieres: Dish[] = [
  // Européennes
  { id: "carberg",             name: { fr: "Carberg",            en: "Carberg"           }, description: { fr: "Bière blonde européenne rafraîchissante.",       en: "Refreshing European blonde beer."      }, price: 3,   category: "bieres", image: "" },
  { id: "leffe-blonde",        name: { fr: "Leffe Blonde",       en: "Leffe Blonde"      }, description: { fr: "Bière belge blonde authentique.",               en: "Authentic Belgian blonde beer."        }, price: 3.5, category: "bieres", image: "" },
  { id: "leffe-brune",         name: { fr: "Leffe Brune",        en: "Leffe Brown"       }, description: { fr: "Bière belge brune aux arômes complexes.",       en: "Belgian brown beer with complex aromas."}, price: 3.5, category: "bieres", image: "" },
  { id: "jupiler-petite",      name: { fr: "Jupiler Petite",     en: "Jupiler Small"     }, description: { fr: "Petite Jupiler, bière belge classique.",         en: "Small Jupiler, classic Belgian beer."  }, price: 2.5, category: "bieres", image: "" },
  { id: "jupiler-grande",      name: { fr: "Jupiler Grande",     en: "Jupiler Large"     }, description: { fr: "Grande Jupiler, format généreux.",              en: "Large Jupiler, generous format."       }, price: 5,   category: "bieres", image: "" },
  { id: "guinness-eu",         name: { fr: "Guinness",           en: "Guinness"          }, description: { fr: "Stout irlandaise iconique et crémeuse.",         en: "Iconic and creamy Irish stout."        }, price: 5,   category: "bieres", image: "" },
  { id: "grimbergen",          name: { fr: "Grimbergen",         en: "Grimbergen"        }, description: { fr: "Bière d'abbaye belge aux saveurs riches.",       en: "Belgian abbey beer with rich flavors." }, price: 4.5, category: "bieres", image: "" },
  { id: "kriek",               name: { fr: "Kriek",              en: "Kriek"             }, description: { fr: "Bière belge aux cerises, douce et fruitée.",     en: "Belgian cherry beer, sweet and fruity."}, price: 3.5, category: "bieres", image: "" },
  { id: "heineken-petite",     name: { fr: "Heineken Petite",    en: "Heineken Small"    }, description: { fr: "Petite Heineken, bière hollandaise premium.",    en: "Small Heineken, premium Dutch beer."   }, price: 4,   category: "bieres", image: "" },
  { id: "heineken-grande",     name: { fr: "Heineken Grande",    en: "Heineken Large"    }, description: { fr: "Grande Heineken, format généreux.",             en: "Large Heineken, generous format."      }, price: 5,   category: "bieres", image: "" },
  { id: "becks",               name: { fr: "Beck's",             en: "Beck's"            }, description: { fr: "Bière allemande pure et rafraîchissante.",       en: "Pure and refreshing German beer."      }, price: 3,   category: "bieres", image: "" },
  { id: "desperados",          name: { fr: "Desperados",         en: "Desperados"        }, description: { fr: "Bière aromatisée tequila, originale.",           en: "Tequila flavored beer, original."      }, price: 4,   category: "bieres", image: "" },
  { id: "jb-cola",             name: { fr: "J&B Cola",           en: "J&B Cola"          }, description: { fr: "Mélange whisky et cola en canette.",             en: "Whisky and cola can mix."              }, price: 5,   category: "bieres", image: "" },
  // Camerounaises (isSignature)
  { id: "guinness-cam-petite", name: { fr: "Guinness Cameroun (petite)", en: "Guinness Cameroon (small)" }, description: { fr: "Guinness camerounaise, authentique et locale.", en: "Cameroonian Guinness, authentic and local." }, price: 6,  category: "bieres", image: "", isSignature: true },
  { id: "guinness-cam-grande", name: { fr: "Guinness Cameroun (grande)", en: "Guinness Cameroon (large)" }, description: { fr: "Grande Guinness camerounaise.",              en: "Large Cameroonian Guinness."               }, price: 10, category: "bieres", image: "", isSignature: true },
  { id: "33-export",           name: { fr: "33 Export",          en: "33 Export"         }, description: { fr: "Bière camerounaise d'exportation, référence locale.", en: "Cameroonian export beer, local reference." }, price: 8,  category: "bieres", image: "", isSignature: true, isPopular: true },
  { id: "kadji",               name: { fr: "Kadji",              en: "Kadji"             }, description: { fr: "Bière camerounaise traditionnelle et authentique.", en: "Traditional Cameroonian beer."             }, price: 8,  category: "bieres", image: "", isSignature: true },
  { id: "isenbeck",            name: { fr: "Isenbeck",           en: "Isenbeck"          }, description: { fr: "Bière camerounaise de qualité premium.",          en: "Premium Cameroonian beer."                 }, price: 8,  category: "bieres", image: "", isSignature: true },
  { id: "mutzig",              name: { fr: "Mutzig",             en: "Mutzig"            }, description: { fr: "Bière camerounaise blonde et légère.",            en: "Light blonde Cameroonian beer."            }, price: 8,  category: "bieres", image: "", isSignature: true },
  { id: "castel",              name: { fr: "Castel",             en: "Castel"            }, description: { fr: "Bière Castel camerounaise, goût authentique.",    en: "Cameroonian Castel beer."                  }, price: 8,  category: "bieres", image: "", isSignature: true },
  { id: "origine",             name: { fr: "Origine",            en: "Origine"           }, description: { fr: "Bière camerounaise aux saveurs originelles.",     en: "Cameroonian beer with original flavors."   }, price: 8,  category: "bieres", image: "", isSignature: true },
  { id: "booster",             name: { fr: "Booster",            en: "Booster"           }, description: { fr: "Bière camerounaise forte en goût.",              en: "Strong Cameroonian beer."                  }, price: 9,  category: "bieres", image: "", isSignature: true },
];

// ─── Vins ─────────────────────────────────────────────────────────────────────

const vins: Dish[] = [
  { id: "vin-rouge", name: { fr: "Petit Vin Rouge", en: "Red Wine" }, description: { fr: "Vin rouge de table, parfait avec les plats en sauce.", en: "Table red wine, perfect with sauced dishes." }, price: 7, category: "vins", image: "" },
  { id: "vin-blanc", name: { fr: "Petit Vin Blanc", en: "White Wine" }, description: { fr: "Vin blanc sec et rafraîchissant.",                   en: "Dry and refreshing white wine."              }, price: 7, category: "vins", image: "" },
  { id: "vin-rose",  name: { fr: "Petit Vin Rosé",  en: "Rosé Wine"  }, description: { fr: "Vin rosé léger et fruité, idéal en apéritif.",      en: "Light fruity rosé, ideal as aperitif."       }, price: 7, category: "vins", image: "" },
];

// ─── Liqueurs ─────────────────────────────────────────────────────────────────

const liqueurs: Dish[] = [
  { id: "baileys",      name: { fr: "Baileys",      en: "Baileys"      }, description: { fr: "Liqueur crémeuse irlandaise.",            en: "Irish cream liqueur."              }, price: 7, category: "liqueurs", image: "" },
  { id: "martini",      name: { fr: "Martini",      en: "Martini"      }, description: { fr: "Vermouth italien pour cocktails.",        en: "Italian vermouth for cocktails."   }, price: 7, category: "liqueurs", image: "" },
  { id: "malibu",       name: { fr: "Malibu",       en: "Malibu"       }, description: { fr: "Liqueur de rhum à la noix de coco.",     en: "Coconut rum liqueur."              }, price: 7, category: "liqueurs", image: "" },
  { id: "black-label",  name: { fr: "Black Label",  en: "Black Label"  }, description: { fr: "Whisky écossais premium 12 ans d'âge.",  en: "Premium 12-year-old Scottish whisky."}, price: 7, category: "liqueurs", image: "" },
  { id: "red-label",    name: { fr: "Red Label",    en: "Red Label"    }, description: { fr: "Whisky écossais blend accessible.",       en: "Accessible Scottish blend whisky." }, price: 7, category: "liqueurs", image: "" },
  { id: "jb",           name: { fr: "J&B",          en: "J&B"          }, description: { fr: "Whisky écossais rare et distinctif.",    en: "Rare and distinctive Scotch whisky."}, price: 7, category: "liqueurs", image: "" },
  { id: "jack-daniels", name: { fr: "Jack Daniels", en: "Jack Daniels" }, description: { fr: "Whiskey américain Tennessee, iconique.", en: "Iconic American Tennessee whiskey." }, price: 7, category: "liqueurs", image: "" },
  { id: "chivas",       name: { fr: "Chivas",       en: "Chivas"       }, description: { fr: "Whisky écossais de luxe, blend premium.", en: "Luxury Scottish blend whisky."     }, price: 7, category: "liqueurs", image: "" },
  { id: "remy-martin",  name: { fr: "Rémy Martin",  en: "Rémy Martin"  }, description: { fr: "Cognac français d'exception.",           en: "Exceptional French cognac."        }, price: 7, category: "liqueurs", image: "" },
  { id: "vodka",        name: { fr: "Vodka",        en: "Vodka"        }, description: { fr: "Vodka premium pure et cristalline.",     en: "Pure and crystal premium vodka."   }, price: 7, category: "liqueurs", image: "" },
];

// ─── Export principal ─────────────────────────────────────────────────────────

export const allDishes: Dish[] = [
  ...specialites,
  ...sauceDishes,
  ...viandesExtra,
  ...pouletExtra,
  ...poissonExtra,
  ...complements,
  ...boissons,
  ...bieres,
  ...vins,
  ...liqueurs,
];

// ─── Utilitaires ──────────────────────────────────────────────────────────────

export const getDishesByCategory = (categoryId: string): Dish[] =>
  categoryId === "all" ? allDishes : allDishes.filter(d => d.category === categoryId);

export const getSignatureDishes = (): Dish[] => allDishes.filter(d => d.isSignature);
export const getPopularDishes   = (): Dish[] => allDishes.filter(d => d.isPopular);
export const getWeekendDishes   = (): Dish[] => allDishes.filter(d => d.isWeekendOnly);

export const getDishById = (id: string): Dish | undefined =>
  allDishes.find(d => d.id === id);

export const searchDishes = (term: string, lang: "fr" | "en" = "fr"): Dish[] => {
  const q = term.toLowerCase().trim();
  if (!q) return allDishes;
  return allDishes.filter(d =>
    d.name[lang].toLowerCase().includes(q) ||
    d.description[lang].toLowerCase().includes(q) ||
    d.tags?.some(t => t.toLowerCase().includes(q))
  );
};
