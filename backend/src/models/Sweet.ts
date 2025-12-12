export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface SweetCreate {
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

export interface SweetUpdate {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
}

export interface SweetSearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

