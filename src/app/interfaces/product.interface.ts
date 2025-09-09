export interface ProductAPI {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount: number;

  brand: {
    _id: string;
    name: string;
    slug: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategory: {
    _id: string;
    name: string;
    slug: string;
  }[];
  createdAt: string;   // ISO Date string
  updatedAt: string;   // ISO Date string
}

export interface Root {
  results: number;
  metadata: Metadata;
  data: ProductAPI[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
