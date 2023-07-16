import styled from 'styled-components'

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      padding: 0 0.8rem 2rem;
      background: transparent;
    }

    div {
      display: none;
    }

    &:hover {
      div {
        display: flex;
        position: absolute;
        gap: 0.8rem;
      }
    }
  }
`

interface ButtonProps {
  variant: 'update' | 'delete'
}

export const Button = styled.button<ButtonProps>`
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: ${({ variant, theme }) =>
    variant === 'update' ? theme['green-500'] : theme['red-300']};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background: ${({ variant, theme }) =>
      variant === 'update' ? theme['green-500'] : theme['red-300']};
    color: ${({ theme }) => theme.white};
  }
`
interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ variant, theme }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`
