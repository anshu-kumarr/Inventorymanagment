import { Switch as AntdSwitch } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/es/switch';

type SwitchProps = {
  onChange: SwitchChangeEventHandler | undefined;
  value: boolean;
};

const Switch: React.FC<SwitchProps> = ({ value = false, onChange }) => {
  return (
    <AntdSwitch
      style={{ backgroundColor: value ? '#006E7F' : 'gray' }}
      onChange={onChange}
      value={value}
    />
  );
};

export default Switch;
