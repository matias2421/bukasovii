export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  available: boolean;
};

export type CartItem = {
  dish: Dish;
  quantity: number;
};

export type Category = {
  id: string;
  name: string;
  dishes: Dish[];
};
