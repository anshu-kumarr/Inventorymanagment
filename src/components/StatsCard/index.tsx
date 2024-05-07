import styled from 'styled-components';
import Flex from '../Flex';

type StatsCard = {
  title: string;
  value: number | string;
  icon: JSX.Element;
};

const Label = styled.p`
  margin: 0;
  color: #546988;
`;

const StatsCard: React.FC<StatsCard> = ({ title, value, icon }) => {
  return (
    <Flex
      padding="2rem"
      background="#fff"
      columnGap="1.5rem"
      borderRadius="8px"
      flexGrow="1"
    >
      <Flex alignItem="flex-start">{icon}</Flex>
      <Flex flexDirection="column">
        <Label>{title}</Label>
        <h2>{value}</h2>
      </Flex>
    </Flex>
  );
};

export default StatsCard;
