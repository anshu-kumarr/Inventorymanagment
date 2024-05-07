import GlobalStyles from './styles/globalStyles';
import Header from './components/Header';
import { type InventoryItem, InventoryProvider } from './context/inventory';
import { useEffect, useState } from 'react';
import { getInventoryData } from './api';
import InventoryStats from './components/InventoryStats';
import InventoryTable from './components/Table';

function App() {
  const [isUser, setIsUser] = useState(false);
  const [inventory, setInventory] = useState({
    isLoading: true,
    stats: { totalProducts: 0, totalValue: 0, outOfStock: 0, numberOfCategories: 0 },
    data: [] as InventoryItem[]
  });

  useEffect(() => {
    getInventoryData()
      .then(response =>
        setInventory(ps => ({ ...ps, data: response.inventory, stats: response.stats }))
      )
      .catch(e => console.error(e))
      .finally(() => setInventory(ps => ({ ...ps, isLoading: false })));
  }, []);

  return (
    <InventoryProvider value={{ isUser, setIsUser, inventory, setInventory }}>
      <GlobalStyles />
      <Header />
      <InventoryStats />
      <InventoryTable />
    </InventoryProvider>
  );
}

export default App;
