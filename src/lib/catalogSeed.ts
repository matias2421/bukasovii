// Catálogo real de Bukasovii (extraído del catálogo de WhatsApp).
// Usado para sembrar la base de datos la primera vez que arranca.
export type SeedDish = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};
export type SeedCategory = { id: string; name: string; dishes: SeedDish[] };

export const catalogSeed: SeedCategory[] = [
  {
    "id": "combos-alitas",
    "name": "Combos de Alitas",
    "dishes": [
      {
        "id": "combo-ligero",
        "name": "Combo Ligero",
        "description": "Papas en bastón o casco 6 alitas Salsa",
        "price": 24000,
        "imageUrl": "/menu/combo-ligero.jpg"
      },
      {
        "id": "combo-duo",
        "name": "Combo Duo",
        "description": "Papas en bastón o casco 10 alitas Salsa",
        "price": 38000,
        "imageUrl": "/menu/combo-duo.jpg"
      },
      {
        "id": "combo-friends",
        "name": "Combo Friends",
        "description": "Papas en bastón o casco 26 alitas Salsa",
        "price": 93000,
        "imageUrl": "/menu/combo-friends.jpg"
      },
      {
        "id": "combo-familiar",
        "name": "Combo familiar",
        "description": "50 alitas de pollo en salsa BBQ Picante ó Miel mostaza Papas en bastones ó cascos",
        "price": 170000,
        "imageUrl": "/menu/combo-familiar.jpg"
      },
      {
        "id": "adicion-de-alitas",
        "name": "Adición de alitas",
        "description": "Cada adición de alitas tiene un valor de 3500",
        "price": 3500,
        "imageUrl": "/menu/adicion-de-alitas.jpg"
      }
    ]
  },
  {
    "id": "hamburguesas",
    "name": "Hamburguesas",
    "dishes": [
      {
        "id": "hamburguesa-artesanal-de-cerdo",
        "name": "Hamburguesa artesanal de Cerdo",
        "description": "Pan artesano de Bimbo Carne artesanal de cerdo con pimienta Queso tocineta Lechuga crespa Tomate Papas en baston",
        "price": 20000,
        "imageUrl": "/menu/hamburguesa-artesanal-de-cerdo.jpg"
      },
      {
        "id": "hamburguesa-artesanal",
        "name": "Hamburguesa Artesanal",
        "description": "Pan artesano de Bimbo Carne artesanal Pepino y cebolla caramelizada Ensalada dulce Lechuga Tomate Tocineta Queso Papas",
        "price": 25000,
        "imageUrl": "/menu/hamburguesa-artesanal.jpg"
      }
    ]
  },
  {
    "id": "papas",
    "name": "Papas",
    "dishes": [
      {
        "id": "papas-bukasovii",
        "name": "Papas bukasovii",
        "description": "Papas en bastón Salsa",
        "price": 9000,
        "imageUrl": "/menu/papas-bukasovii.jpg"
      },
      {
        "id": "bukasovii-kids",
        "name": "Bukasovii kids",
        "description": "Papas en baston Salchicha Tocineta Queso",
        "price": 13000,
        "imageUrl": "/menu/bukasovii-kids.jpg"
      },
      {
        "id": "bukasovii-salchichas",
        "name": "Bukasovii salchichas",
        "description": "Papas en bastón Salchicha Salsas",
        "price": 13000,
        "imageUrl": "/menu/bukasovii-salchichas.jpg"
      },
      {
        "id": "bastones-con-carne",
        "name": "Bastones con carne",
        "description": "Papas en bastón Carne con hogado Salsa Chorizo coctelero Huevo",
        "price": 23000,
        "imageUrl": "/menu/bastones-con-carne.jpg"
      },
      {
        "id": "bukasovii-mix",
        "name": "Bukasovii Mix",
        "description": "Papas en bastón Salchicha Queso Tocineta Chorizo coctelero Salsas",
        "price": 23000,
        "imageUrl": "/menu/bukasovii-mix.jpg"
      },
      {
        "id": "papas-legendarias",
        "name": "Papas Legendarias",
        "description": "Papas en bastón Carne con hogado Queso Maicitos Chorizo coctelero Trozos de chicharrón Pico de gallo Salsas",
        "price": 30000,
        "imageUrl": "/menu/papas-legendarias.jpg"
      },
      {
        "id": "papas-legendarias-especiales",
        "name": "Papas Legendarias Especiales",
        "description": "Papas en baston Maicitos Queso Carne desmechada Pico de gallo Platanitos maduros Tocineta Chicharrón en trocitos Huevos de codorniz",
        "price": 38000,
        "imageUrl": "/menu/papas-legendarias-especiales.jpg"
      }
    ]
  },
  {
    "id": "arepas",
    "name": "Arepas",
    "dishes": [
      {
        "id": "arepa-burguer",
        "name": "Arepa Burguer",
        "description": "Arepa Carne artesanal de res Lechuga Tocineta Tomate Queso",
        "price": 18000,
        "imageUrl": "/menu/arepa-burguer.jpg"
      },
      {
        "id": "arepa-rellena",
        "name": "Arepa Rellena",
        "description": "Arepa Carne de res desmechada con hogado queso tajado tocineta maicitos salsa dulce maíz crema de leña",
        "price": 22000,
        "imageUrl": "/menu/arepa-rellena.jpg"
      }
    ]
  },
  {
    "id": "patacon",
    "name": "Patacón",
    "dishes": [
      {
        "id": "patacon",
        "name": "Patacón",
        "description": "Carne desmechada Maíz Queso Tocineta Chicharrón",
        "price": 25000,
        "imageUrl": "/menu/patacon.jpg"
      }
    ]
  },
  {
    "id": "costilla-chicharron",
    "name": "Costilla y Chicharrón",
    "dishes": [
      {
        "id": "chicharron",
        "name": "Chicharrón",
        "description": "Papas en casco Chicharrón Pico de gallo",
        "price": 22000,
        "imageUrl": "/menu/chicharron.jpg"
      },
      {
        "id": "costillas-a-la-bbq-picante-o-miel-mostaza",
        "name": "Costillas a la BBQ, picante o miel mostaza",
        "description": "Costillas 350g Papas en cascos Pico de gallo",
        "price": 25000,
        "imageUrl": "/menu/costillas-a-la-bbq-picante-o-miel-mostaza.jpg"
      }
    ]
  },
  {
    "id": "bebidas",
    "name": "Bebidas",
    "dishes": [
      {
        "id": "agua-personal",
        "name": "agua personal",
        "description": "",
        "price": 2000,
        "imageUrl": "/menu/agua-personal.jpg"
      },
      {
        "id": "malta-personal",
        "name": "malta personal",
        "description": "",
        "price": 3500,
        "imageUrl": "/menu/malta-personal.jpg"
      },
      {
        "id": "manzana-personal",
        "name": "manzana personal",
        "description": "",
        "price": 3500,
        "imageUrl": "/menu/manzana-personal.jpg"
      },
      {
        "id": "uva-personal",
        "name": "uva personal",
        "description": "",
        "price": 3500,
        "imageUrl": "/menu/uva-personal.jpg"
      },
      {
        "id": "colombiana-personal",
        "name": "colombiana personal",
        "description": "",
        "price": 3500,
        "imageUrl": "/menu/colombiana-personal.jpg"
      },
      {
        "id": "soda-personal",
        "name": "soda personal",
        "description": "",
        "price": 3500,
        "imageUrl": "/menu/soda-personal.jpg"
      },
      {
        "id": "coca-cola-personal",
        "name": "Coca-Cola personal",
        "description": "",
        "price": 4000,
        "imageUrl": "/menu/coca-cola-personal.jpg"
      },
      {
        "id": "coca-cola-cero",
        "name": "Coca-Cola cero",
        "description": "",
        "price": 4000,
        "imageUrl": "/menu/coca-cola-cero.jpg"
      },
      {
        "id": "hit-mango",
        "name": "hit mango",
        "description": "",
        "price": 4000,
        "imageUrl": "/menu/hit-mango.jpg"
      },
      {
        "id": "hit-mora",
        "name": "hit mora",
        "description": "",
        "price": 4000,
        "imageUrl": "/menu/hit-mora.jpg"
      },
      {
        "id": "hit-tropical",
        "name": "hit tropical",
        "description": "",
        "price": 4000,
        "imageUrl": "/menu/hit-tropical.jpg"
      },
      {
        "id": "coronita",
        "name": "Coronita",
        "description": "",
        "price": 5000,
        "imageUrl": "/menu/coronita.jpg"
      },
      {
        "id": "manzana-litro-y-medio",
        "name": "manzana litro y medio",
        "description": "",
        "price": 6000,
        "imageUrl": "/menu/manzana-litro-y-medio.jpg"
      },
      {
        "id": "uva-litro-y-medio",
        "name": "uva litro y medio",
        "description": "",
        "price": 6000,
        "imageUrl": "/menu/uva-litro-y-medio.jpg"
      },
      {
        "id": "coca-cola-litro-y-medio",
        "name": "Coca-Cola litro y medio",
        "description": "",
        "price": 8000,
        "imageUrl": "/menu/coca-cola-litro-y-medio.jpg"
      }
    ]
  }
];
