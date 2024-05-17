'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/popover';
import { Shop } from '@prisma/client';
import useShopModal from '../hooks/use-shop-modal';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/common/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ShopSwitcherProps extends PopoverTriggerProps {
  items: Shop[] | undefined;
}

export const ShopSwitcher = ({ className, items = [] }: ShopSwitcherProps) => {
  const shopModal = useShopModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentShop = formattedItems.find(
    (item) => item.value === params.shopId
  );

  const [open, setOpen] = useState(false);

  const onShopSelect = (shop: (typeof formattedItems)[number]) => {
    setOpen(false);
    router.push(`/${shop.value}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            role='combobox'
            aria-expanded={open}
            className={cn('justify-between', className)}
          >
            <Store className='mr-2 size-4' />
            <span className='hidden lg:flex'>{currentShop?.label}</span>
            <ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search shop...' />
              <CommandEmpty>No shop found</CommandEmpty>
              <CommandGroup heading='Shops'>
                {formattedItems.map((shop) => (
                  <CommandItem
                    key={shop.value}
                    onSelect={() => onShopSelect(shop)}
                    className='text-sm'
                  >
                    <Store className='mr-2 size-4' />
                    {shop.label}
                    <Check
                      className={cn(
                        'ml-auto size-4',
                        currentShop?.value === shop.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  disabled={false}
                  onSelect={() => {
                    setOpen(false);
                    shopModal.onOpen();
                  }}
                >
                  <PlusCircle className='mr-2 size-4' />
                  Create Shop
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
