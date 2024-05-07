import React from 'react';
import styled from 'styled-components';

interface FlexProps {
  padding?: string;
  margin?: string;
  children?: JSX.Element | React.ReactNode;
  position?: 'absolute' | 'relative' | 'sticky' | 'fixed' | 'static';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'normal';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'normal';
  alignSelf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'auto'
    | 'normal';
  alignItem?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'normal';
  columnGap?: string;
  rowGap?: string;
  background?: string;
  flexDirection?: string;
  borderRadius?: string;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  flexGrow?: string;
}

const FlexContainer = styled.div<FlexProps>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  align-content: ${({ alignContent }) => alignContent};
  box-sizing: border-box;
  display: flex;
  justify-content: ${props => props.justifyContent};
  position: ${({ position }) => position};
  align-items: ${({ alignItem }) => alignItem};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
  background: ${({ background }) => background};
  flex-direction: ${({ flexDirection }) => flexDirection};
  border-radius: ${({ borderRadius }) => borderRadius};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
  min-width: ${({ minWidth }) =>
    typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
  min-height: ${({ minHeight }) =>
    typeof minHeight === 'number' ? `${minHeight}px` : minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  flex-grow: ${({ flexGrow }) => flexGrow};
`;

const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  return <FlexContainer {...props}>{children}</FlexContainer>;
};

export default Flex;
