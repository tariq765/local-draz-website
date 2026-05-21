export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}
