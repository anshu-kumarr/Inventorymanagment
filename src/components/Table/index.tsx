import { Table } from 'antd';
import Flex from '../Flex';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import useInventoryContext, { InventoryItem } from '../../context/inventory';
import EditModal from '../EditModal';
import { useState } from 'react';

const InventoryTable: React.FC = () => {
  const { isUser, inventory, setInventory } = useInventoryContext();
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [disableId, setdisableId] = useState<Array<number>>([]);

  const data = inventory.data ?? [];

  const calculateStats = (data: InventoryItem[], disableId: Array<number> = []) => {
    const newData = data.filter(v => !disableId.includes(v.id));
    const totalProducts = newData.length;
    const totalValue = newData.reduce(
      (acc, item) => acc + parseFloat(item.value.replace('$', '')),
      0
    );
    const outOfStock = newData.filter(item => item.quantity === 0).length;
    const numberOfCategories = [...new Set(newData.map(item => item.category))].length;

    setInventory(ps => ({
      ...ps,
      data,
      stats: {
        totalProducts,
        totalValue,
        outOfStock,
        numberOfCategories
      }
    }));
  };

  const onSave = (newRecord: InventoryItem) => {
    const newData = [...data];
    const index = newData.findIndex(item => +newRecord.id === item.id);

    if (index > -1) {
      newData[index] = newRecord;
      setInventory(ps => ({ ...ps, data: newData }));
      setVisible(false);

      // Recalculate statistics
      calculateStats(newData, disableId);
    }
  };

  const handleDeleteRow = (id: number) => {
    const newData = data?.filter(val => val.id !== id);
    calculateStats(newData, disableId);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Action',
      key: 'id',
      render: (row: InventoryItem) => {
        return (
          <Flex columnGap="1rem">
            <EditFilled
              onClick={() => {
                if (isUser) return;
                setVisible(true);
                setSelectedRow(row);
              }}
              style={{
                cursor: isUser ? 'not-allowed' : 'pointer',
                color: isUser ? 'gray' : 'green'
              }}
            />
            <EyeFilled
              onClick={() => {
                if (isUser) return;
                let newList: Array<number> = [];
                if (disableId.includes(row.id as number))
                  newList = disableId.filter(v => v !== row.id);
                else newList = [...disableId, row.id];
                calculateStats(data, newList);
                setdisableId(newList);
              }}
              style={{
                cursor: isUser ? 'not-allowed' : 'pointer',
                color: isUser || disableId.includes(row.id) ? 'gray' : 'purple'
              }}
            />
            <DeleteFilled
              onClick={() => !isUser && handleDeleteRow(row.id)}
              style={{
                cursor: isUser ? 'not-allowed' : 'pointer',
                color: isUser ? 'gray' : 'red'
              }}
            />
          </Flex>
        );
      }
    }
  ];
  return (
    <div style={{ padding: '1rem' }}>
      <EditModal
        slectedRow={selectedRow as InventoryItem}
        visible={visible}
        setVisible={setVisible}
        onSave={onSave}
      />
      <Table dataSource={data} columns={columns} loading={inventory.isLoading} />
    </div>
  );
};

export default InventoryTable;
