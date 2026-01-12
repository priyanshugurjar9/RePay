
export interface Retailer {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Transaction {
  id: string;
  retailerId: string;
  amount: number;
  items: Product[];
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
}

export interface User {
  phone: string;
  isLoggedIn: boolean;
}

export enum AppStep {
  SHOP_SELECTOR,
  QR_SCANNER,
  AUTH,
  PAYMENT,
  RECEIPT
}
