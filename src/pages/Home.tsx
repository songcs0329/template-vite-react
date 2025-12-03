import styled from 'styled-components';
import useCounterStore from '@/stores/useCounterStore';

function Home() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <CounterWrapper>
      <CounterContainer>
        <CounterButton $variant="minus" onClick={decrement}>
          -
        </CounterButton>
        <CounterTitle>{count}</CounterTitle>
        <CounterButton $variant="plus" onClick={increment}>
          +
        </CounterButton>
      </CounterContainer>
    </CounterWrapper>
  );
}

const CounterWrapper = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CounterTitle = styled.strong`
  line-height: 1;
  font-weight: 700;
  font-size: 24px;
  color: #333;
`;

const CounterButton = styled.button<{
  $variant: 'minus' | 'plus';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 18px;
  color: #fff;
  background-color: ${({ $variant }) => ($variant === 'minus' ? '#f44336' : '#4caf50')};
`;

export default Home;
