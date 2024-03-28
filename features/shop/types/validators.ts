import { z } from 'zod';

const CreateShopValidator = z.object({
  name: z.string().min(3).max(100),
});

export type CreateShopType = z.infer<typeof CreateShopValidator>;

export { CreateShopValidator };
