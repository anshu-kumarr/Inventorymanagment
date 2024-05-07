import React, { useEffect, useState } from 'react';
import Flex from '../Flex';
import { Input, Modal } from 'antd';
import { InventoryItem } from '../../context/inventory';

type ModalProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  onSave: (newRecord: InventoryItem) => void;
  slectedRow: InventoryItem;
};

const EditModal: React.FC<ModalProps> = ({ visible, setVisible, onSave, slectedRow }) => {
  const [formValue, setFormValue] = useState(slectedRow);

  useEffect(() => {
    const formattedRow = {} as Record<string, string | number>;
    for (const key in slectedRow) {
      const value = slectedRow[key];
      if (['price', 'value'].includes(key)) {
        formattedRow[key] = parseInt(
          ((value as string) ?? '').replace('$', '').replace(',', '')
        );
      } else formattedRow[key] = value;
    }
    setFormValue(formattedRow);
  }, [slectedRow]);

  const handleChange = (key: string, value: string | number) => {
    setFormValue(ps => ({ ...ps, [key]: value }));
  };

  const inputBoxConfig = [
    { title: 'Category', key: 'category', type: 'text' },
    { title: 'Price', key: 'price', type: 'number' },
    { title: 'Quantity', key: 'quantity', type: 'number' },
    { title: 'Value', key: 'value', type: 'number' }
  ];

  return (
    <Modal
      width="500px"
      title="Edit Value"
      open={visible}
      onOk={() => {
        const formattedRow = {} as InventoryItem;
        for (const key in formValue) {
          const value = formValue[key];
          if (['price', 'value'].includes(key)) {
            if (key === 'value' && !formValue.value)
              formattedRow[key] = `$${formValue.price * formValue.quantity}`;
            else formattedRow[key] = `$${value}`;
          } else formattedRow[key] = value;
        }
        console.log({ formattedRow });
        onSave(formattedRow);
      }}
      onCancel={() => setVisible(false)}
    >
      <Flex padding="1rem" flexDirection="column" rowGap="1rem">
        <Flex flexWrap="wrap" columnGap="0.5rem" width="100%">
          {inputBoxConfig.map(config => {
            return (
              <Flex
                flexDirection="column"
                rowGap="8px"
                width="calc(50% - 40px)"
                flexGrow="1"
              >
                <h5>{config.title}</h5>
                <Input
                  value={formValue[config.key]}
                  type={config.type}
                  onChange={e => handleChange(config.key, e.target.value)}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default EditModal;
