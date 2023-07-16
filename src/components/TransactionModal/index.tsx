import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { api } from '../../lib/axios'

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.string(),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>

interface NewTransactionModalProps {
  variant?: 'update' | 'create'
  transactionId?: number | null
}

export function TransactionModal({
  variant,
  transactionId,
}: NewTransactionModalProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const setTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.setTransactions
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
  })

  async function handleNewTransaction(data: NewTransactionsFormInputs) {
    await createTransaction(data)
    reset()
  }

  async function handleUpdateTransaction(dataUp: NewTransactionsFormInputs) {
    const { category, description, price, type } = dataUp
    const { data } = await api.put(`transactions/${transactionId}`, {
      description,
      type,
      category,
      price,
      createdAt: new Date(),
    })
    if (data.id === transactionId) {
      setTransactions((state) => [data, ...state])
    }
    window.location.reload()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form
          onSubmit={handleSubmit(
            variant === 'create'
              ? handleNewTransaction
              : handleUpdateTransaction,
          )}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={(props) => {
              return (
                <TransactionType
                  onValueChange={props.field.onChange}
                  value={props.field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          {variant === 'create' && (
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          )}
          {variant === 'update' && (
            <button type="submit" disabled={isSubmitting}>
              Atualizar
            </button>
          )}
        </form>
      </Content>
    </Dialog.Portal>
  )
}
