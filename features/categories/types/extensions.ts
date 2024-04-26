import { Category, Image } from '@prisma/client';

export type ExtendedCategory = Category & {
  images: Image[];
};
