import { Product, Image, Category, User } from '@prisma/client';

export type ExtendedProduct = Product & {
  images: Image[];
  category: Category;
  creator: User;
};
