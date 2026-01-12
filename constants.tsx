
import { Retailer, Product } from './types';

export const RETAILERS: Retailer[] = [
  { id: 'zara', name: 'Zara', logo: 'https://picsum.photos/id/101/200', primaryColor: '#000000', category: 'Fashion' },
  { id: 'hm', name: 'H&M', logo: 'https://picsum.photos/id/102/200', primaryColor: '#E50012', category: 'Fashion' },
  { id: 'sainsburys', name: "Sainsbury's", logo: 'https://picsum.photos/id/103/200', primaryColor: '#F06C00', category: 'Grocery' },
  { id: 'apple', name: 'Apple Store', logo: 'https://picsum.photos/id/104/200', primaryColor: '#555555', category: 'Tech' },
  { id: 'uniqlo', name: 'Uniqlo', logo: 'https://picsum.photos/id/105/200', primaryColor: '#FF0000', category: 'Fashion' },
  { id: 'ikea', name: 'IKEA', logo: 'https://picsum.photos/id/106/200', primaryColor: '#0058AB', category: 'Home' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Premium Cotton Shirt', price: 45.99, image: 'https://picsum.photos/id/10/200' },
  { id: 'p2', name: 'Slim Fit Chinos', price: 39.00, image: 'https://picsum.photos/id/11/200' },
  { id: 'p3', name: 'Leather Accessories Set', price: 125.50, image: 'https://picsum.photos/id/12/200' },
];
