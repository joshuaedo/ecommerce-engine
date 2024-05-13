import { ExtendedProduct } from '@/features/products/types/extensions';
import { Category, Image } from '@prisma/client';

export type ExtendedCategory = Category & {
  images: Image[];
  products: ExtendedProduct[];
};
