
export enum ProductCategory {
  Electronics = "Electronics",
  Apparel = "Apparel",
  HomeGoods = "Home Goods",
  Books = "Books",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}
