import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { Table } from '../../components/Table';
import { TransactionsContainer } from './styles';

export function Transactions() {
  return (
    <div>
      <Header/>
      <Summary/>

      <TransactionsContainer>
        <Table/>
      </TransactionsContainer>
    </div>
  );
}
