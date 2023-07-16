import { Button, PriceHighlight, TableContainer } from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { useState } from 'react'
import { TransactionModal } from '../TransactionModal'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCounterClockwise, X } from 'phosphor-react'
import { api } from '../../lib/axios'

export function Table() {
  const [transactionId, setTrasactionId] = useState<number | null | undefined>(
    null,
  )
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  async function handleDeleteTransaction(id: number) {
    await api.delete(`transactions/${id}`)
    window.location.reload()
  }

  return (
    <TableContainer>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <PriceHighlight variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighlight>
              </td>
              <td>{transaction.category}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              <td width="8%">
                <div>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button
                        variant="update"
                        type="button"
                        onClick={() => setTrasactionId(transaction.id)}
                      >
                        <ArrowCounterClockwise size={20} />
                      </Button>
                    </Dialog.Trigger>

                    <TransactionModal
                      transactionId={transactionId}
                      variant="update"
                    />
                  </Dialog.Root>
                  <Button
                    variant="delete"
                    type="button"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <X size={20} />
                  </Button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </TableContainer>
  )
}
