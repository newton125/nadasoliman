// interface/catgorytype.ts
export interface Categorytype {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  results: number;
  data: Categorytype[];
}
