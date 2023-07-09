import { HeaderConntent, HeaderContainer, NewTrasactionButton } from './styles';
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderConntent>
        <img src={logoImg} alt="Logo DT Money" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTrasactionButton>Nova Transação</NewTrasactionButton>
          </Dialog.Trigger>

          <NewTransactionModal/>
        </Dialog.Root>
      </HeaderConntent>
    </HeaderContainer>
  );
}
