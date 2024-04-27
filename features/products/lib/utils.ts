import { Decimal } from '@prisma/client/runtime/library';

const formatProductPrice = (price: Decimal | undefined) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!price) return formatter.format(0);

  return formatter.format(price.toNumber());
};

export { formatProductPrice };
