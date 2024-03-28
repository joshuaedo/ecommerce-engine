'use client';

import { create } from 'zustand';

interface useShopModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useShopModal = create<useShopModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useShopModal;
