import { z } from 'zod';

const CreateOrderValidator = z.object({
  products: z
    .object({
      id: z.string({ message: "Product ID is required" }),
    })
    .array(),
  shopId: z.string({ message: "Shop ID is required" }),
  isPaid: z.boolean().default(false).refine((val) => typeof val === 'boolean', { message: "IsPaid must be a boolean" }),
  totalPrice: z.number({ message: "Total price is required" }).nonnegative({ message: "Total price must be non-negative" }),
});

const UpdateOrderValidator = z.object({
  id: z.string({ message: "Order ID is required" }),
  isPaid: z.boolean().default(false).refine((val) => typeof val === 'boolean', { message: "IsPaid must be a boolean" }),
  address: z.string().optional().or(z.literal('')).refine((val) => val === undefined || typeof val === 'string', { message: "Address must be a string" }),
  phone: z.string().optional().or(z.literal('')).refine((val) => val === undefined || typeof val === 'string', { message: "Phone must be a string" }),
});

const DeleteOrderValidator = z.object({
  id: z.string({ message: "Order ID is required" }),
});

export type CreateOrderType = z.infer<typeof CreateOrderValidator>;
export type UpdateOrderType = z.infer<typeof UpdateOrderValidator>;
export type DeleteOrderType = z.infer<typeof DeleteOrderValidator>;

export { CreateOrderValidator, UpdateOrderValidator, DeleteOrderValidator };
