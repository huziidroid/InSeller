export interface StoreCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  phone_number: string;
  location: Object;
  passsword: string;
  business_image_url: string;
  url_name: string;
  category: Object;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
}
export interface Category {
  id: number;
  name: string;
  image: string;
  store_id: number;
}
export interface Upload {
  data: FormData;
  token: string;
}
export interface Delete {
  id: number;
  token: string;
}
export interface Item {
  id: number;
  name: string;
  description: string;
  selling_price: number;
  discount_price: number;
  unit: string;
  cost_price: number;
  quantity: number;
  image: string;
  category_id: number;
  store_id: number;
}
