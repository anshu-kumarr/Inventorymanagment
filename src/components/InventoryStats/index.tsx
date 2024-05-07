import { useMemo } from 'react';
import StatsCard from '../StatsCard';
import Flex from '../Flex';
import {
  MoneyCollectFilled,
  ShareAltOutlined,
  ShopOutlined,
  ShoppingFilled
} from '@ant-design/icons';
import useInventoryContext from '../../context/inventory';

const InventoryStats: React.FC = () => {
  const { inventory } = useInventoryContext();

  const stats = inventory.stats;
  const statConfig = useMemo(
    () => [
      {
        title: 'Total Products',
        value: stats.totalProducts,
        icon: <ShoppingFilled />,
        key: 1
      },
      {
        title: 'Total Store Value',
        value: stats.totalValue,
        icon: <MoneyCollectFilled />,
        key: 2
      },
      {
        title: 'Out of Stock',
        value: stats.outOfStock,
        icon: <ShopOutlined />,
        key: 3
      },
      {
        title: 'No of Category',
        icon: <ShareAltOutlined />,
        value: stats.numberOfCategories,
        key: 4
      }
    ],
    [stats.totalProducts, stats.outOfStock, stats.totalValue, stats.numberOfCategories]
  );

  return (
    <Flex flexDirection="column" rowGap="1rem" padding="1rem">
      <h1>Inventory Stats</h1>
      <Flex width="100%" columnGap="1rem">
        {statConfig.map(value => (
          <StatsCard {...value} />
        ))}
      </Flex>
    </Flex>
  );
};

export default InventoryStats;
