import { z } from 'zod';

const CreateOrderValidator = z.object({
  products: z
    .object({
      id: z.string(),
    })
    .array(),
  shopId: z.string(),
  isPaid: z.boolean().default(false),
  totalPrice: z.number(),
});

const UpdateOrderValidator = z.object({
  id: z.string(),
  isPaid: z.boolean().default(false),
  address: z.string().optional(),
  phone: z.string().optional(),
});

const DeleteOrderValidator = z.object({
  id: z.string(),
});

export type CreateOrderType = z.infer<typeof CreateOrderValidator>;
export type UpdateOrderType = z.infer<typeof UpdateOrderValidator>;
export type DeleteOrderType = z.infer<typeof DeleteOrderValidator>;

export { CreateOrderValidator, UpdateOrderValidator, DeleteOrderValidator };
