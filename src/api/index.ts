import { INVENTORY_API_URL } from '../constants';

export const getInventoryData = async () => {
  const response = await fetch(INVENTORY_API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let inventory = await response.json();

  inventory = inventory.map((v: Record<string, unknown>, i: number) => ({
    ...v,
    id: ++i
  }));

  const totalProducts = inventory.length;
  let totalValue = 0;
  let outOfStock = 0;
  const categories = new Set();
  for (const item of inventory) {
    totalValue += parseInt(item.value.replace('$', '').replace(',', ''));
    if (item.quantity === 0) {
      outOfStock++;
    }
    categories.add(item.category);
  }

  return {
    inventory,
    stats: {
      totalProducts,
      totalValue,
      outOfStock,
      numberOfCategories: Array.from(categories).length ?? 0
    }
  };
};
