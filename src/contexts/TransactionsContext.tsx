import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface TransactionsProps {
    id: number
    description: string
    type: 'income' | 'outcome'
    category: string
    price: number
    createdAt: string
}

interface TransactionsContextType {
    transactions: TransactionsProps[]
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    async function getTransactions() {
        const { data } = await axios.get("http://localhost:3333/transactions")
        setTransactions(data)
    }

    useEffect(() => {
        getTransactions()
    }, [])
    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}