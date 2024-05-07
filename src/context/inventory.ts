import { createContext, useContext } from 'react';

export type InventoryItemWithoutNameId = Omit<InventoryItem, 'name' | 'id'>;

// Define interfaces for inventory data
interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  outOfStock: number;
  numberOfCategories: number;
}

export interface InventoryItem {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  id: number;
}

interface InventoryContextType {
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  inventory: {
    isLoading: boolean;
    stats: InventoryStats;
    data: InventoryItem[];
  };
  setInventory: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      stats: InventoryStats;
      data: InventoryItem[];
    }>
  >;
}

// Create context
export const InventoryContext = createContext<InventoryContextType>({
  isUser: false,
  setIsUser: () => {},
  inventory: {
    isLoading: true,
    stats: { totalProducts: 0, totalValue: 0, outOfStock: 0, numberOfCategories: 0 },
    data: []
  },
  setInventory: () => {}
});

export const InventoryProvider = InventoryContext.Provider;

export default function useInventoryContext() {
  return useContext(InventoryContext);
}
