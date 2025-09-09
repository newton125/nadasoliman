// 🛒 Cart Response Type
export interface CartResponse {
  status: string; // e.g. "success"
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// 📦 Cart Product
export interface CartProduct {
  _id: string;
  count: number;
  product: Product;
}

// 🛍️ Product
export interface Product {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  id: string;
  price: number;
}

// 📂 Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// 📂 Subcategory
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // reference id
}

// 🏷️ Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
