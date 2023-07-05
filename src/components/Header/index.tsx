import { HeaderConntent, HeaderContainer, NewTrasactionButton } from './styles';
import logoImg from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderConntent>
        <img src={logoImg} alt="Logo DT Money" />
        <NewTrasactionButton>Nova Transação</NewTrasactionButton>
      </HeaderConntent>
    </HeaderContainer>
  );
}
