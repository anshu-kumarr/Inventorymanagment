import Flex from '../Flex';
import Switch from '../Switch';
import styled from 'styled-components';
import useInventoryContext from '../../context/inventory';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';

const ViewLabelText = styled.p`
  margin: 0;
  color: #fff;
  font-weight: 400;
`;

const Header = () => {
  const { isUser, setIsUser } = useInventoryContext();

  return (
    <Flex
      justifyContent="flex-end"
      padding="1rem"
      columnGap="0.5rem"
      alignItem="center"
      background="#B2C7D7"
    >
      <ViewLabelText>Admin</ViewLabelText>
      <Switch onChange={setIsUser} value={isUser} />
      <ViewLabelText>User</ViewLabelText>
      <div>
        <LogoutOutlined style={{ color: '#fff', marginLeft: '2rem' }} />
      </div>
    </Flex>
  );
};

export default Header;
