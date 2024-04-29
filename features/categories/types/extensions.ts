import { Category, Image, Product } from '@prisma/client';

export type ExtendedCategory = Category & {
  images: Image[];
  products: Product[];
};
