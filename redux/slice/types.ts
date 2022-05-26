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
export interface UploadCategory {
  data: FormData;
  token: string;
}
