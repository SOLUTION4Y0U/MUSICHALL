import { Product, Category } from '../types/product';

export const categories: Category[] = [
  { id: '1', name: 'Электроника', image: 'https://via.placeholder.com/150?text=Electronics' },
  { id: '2', name: 'Одежда', image: 'https://via.placeholder.com/150?text=Clothes' },
  { id: '3', name: 'Товары для дома', image: 'https://via.placeholder.com/150?text=Home' },
  { id: '4', name: 'Спорт и отдых', image: 'https://via.placeholder.com/150?text=Sport' },
  { id: '5', name: 'Красота и здоровье', image: 'https://via.placeholder.com/150?text=Beauty' },
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Смартфон Pro Max',
    description: 'Новейший смартфон с мощным процессором и великолепной камерой',
    price: 999.99,
    discountPercentage: 10,
    rating: 4.8,
    stock: 50,
    brand: 'TechBrand',
    category: '1',
    thumbnail: 'https://via.placeholder.com/300x200?text=Smartphone',
    images: [
      'https://via.placeholder.com/800x600?text=Smartphone1',
      'https://via.placeholder.com/800x600?text=Smartphone2',
      'https://via.placeholder.com/800x600?text=Smartphone3',
    ]
  },
  {
    id: '2',
    title: 'Ноутбук UltraBook',
    description: 'Тонкий и легкий ноутбук для работы и развлечений',
    price: 1299.99,
    rating: 4.5,
    stock: 20,
    brand: 'LaptopBrand',
    category: '1',
    thumbnail: 'https://via.placeholder.com/300x200?text=Laptop',
    images: [
      'https://via.placeholder.com/800x600?text=Laptop1',
      'https://via.placeholder.com/800x600?text=Laptop2',
    ]
  },
  {
    id: '3',
    title: 'Беспроводные наушники',
    description: 'Наушники с активным шумоподавлением и отличным звуком',
    price: 199.99,
    discountPercentage: 15,
    rating: 4.7,
    stock: 100,
    brand: 'AudioBrand',
    category: '1',
    thumbnail: 'https://via.placeholder.com/300x200?text=Headphones',
    images: [
      'https://via.placeholder.com/800x600?text=Headphones1',
      'https://via.placeholder.com/800x600?text=Headphones2',
    ]
  },
  {
    id: '4',
    title: 'Футболка Premium',
    description: 'Качественная хлопковая футболка',
    price: 29.99,
    rating: 4.3,
    stock: 200,
    brand: 'FashionBrand',
    category: '2',
    thumbnail: 'https://via.placeholder.com/300x200?text=Tshirt',
    images: [
      'https://via.placeholder.com/800x600?text=Tshirt1',
      'https://via.placeholder.com/800x600?text=Tshirt2',
    ]
  },
  {
    id: '5',
    title: 'Джинсы Classic',
    description: 'Классические джинсы прямого кроя',
    price: 59.99,
    discountPercentage: 5,
    rating: 4.6,
    stock: 80,
    brand: 'JeansBrand',
    category: '2',
    thumbnail: 'https://via.placeholder.com/300x200?text=Jeans',
    images: [
      'https://via.placeholder.com/800x600?text=Jeans1',
      'https://via.placeholder.com/800x600?text=Jeans2',
    ]
  },
  {
    id: '6',
    title: 'Кофемашина Pro',
    description: 'Автоматическая кофемашина для дома',
    price: 399.99,
    rating: 4.9,
    stock: 15,
    brand: 'HomeBrand',
    category: '3',
    thumbnail: 'https://via.placeholder.com/300x200?text=CoffeeMachine',
    images: [
      'https://via.placeholder.com/800x600?text=CoffeeMachine1',
      'https://via.placeholder.com/800x600?text=CoffeeMachine2',
    ]
  },
  {
    id: '7',
    title: 'Набор посуды',
    description: 'Комплект кухонной посуды из 10 предметов',
    price: 149.99,
    discountPercentage: 20,
    rating: 4.4,
    stock: 30,
    brand: 'KitchenBrand',
    category: '3',
    thumbnail: 'https://via.placeholder.com/300x200?text=Kitchenware',
    images: [
      'https://via.placeholder.com/800x600?text=Kitchenware1',
      'https://via.placeholder.com/800x600?text=Kitchenware2',
    ]
  },
  {
    id: '8',
    title: 'Гантели 5кг (пара)',
    description: 'Набор гантелей для домашних тренировок',
    price: 49.99,
    rating: 4.2,
    stock: 50,
    brand: 'SportBrand',
    category: '4',
    thumbnail: 'https://via.placeholder.com/300x200?text=Dumbbells',
    images: [
      'https://via.placeholder.com/800x600?text=Dumbbells1',
      'https://via.placeholder.com/800x600?text=Dumbbells2',
    ]
  },
  {
    id: '9',
    title: 'Крем для лица',
    description: 'Увлажняющий крем для всех типов кожи',
    price: 24.99,
    discountPercentage: 10,
    rating: 4.7,
    stock: 100,
    brand: 'BeautyBrand',
    category: '5',
    thumbnail: 'https://via.placeholder.com/300x200?text=FaceCream',
    images: [
      'https://via.placeholder.com/800x600?text=FaceCream1',
      'https://via.placeholder.com/800x600?text=FaceCream2',
    ]
  },
  {
    id: '10',
    title: 'Шампунь и кондиционер',
    description: 'Набор для ухода за волосами',
    price: 19.99,
    rating: 4.5,
    stock: 150,
    brand: 'HairBrand',
    category: '5',
    thumbnail: 'https://via.placeholder.com/300x200?text=Shampoo',
    images: [
      'https://via.placeholder.com/800x600?text=Shampoo1',
      'https://via.placeholder.com/800x600?text=Shampoo2',
    ]
  },
];