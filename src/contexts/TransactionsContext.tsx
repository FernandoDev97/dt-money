import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionProps {
  category: string
  price: number
  type: string
  description: string
}

interface TransactionsContextType {
  transactions: TransactionsProps[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  const getTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: { q: query, _sort: 'createdAt', _order: 'desc' },
    })
    setTransactions(data)
  }, [])

  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  const createTransaction = useCallback(
    async (data: CreateTransactionProps) => {
      const { category, description, price, type } = data
      const response = await api.post('transactions', {
        description,
        type,
        category,
        price,
        createdAt: new Date(),
      })
      setTransactions((state) => [response.data, ...state])
    },
    [],
  )
  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
