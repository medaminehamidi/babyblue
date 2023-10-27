import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type User = {
  username: string,
  email: string
}

export type UserState = {
  user: User
}
export type UserAction = {
  updateUser: (user: UserState['user']) => void
}

export const useUserStore = create(
  persist<UserState & UserAction>(
    (set) => ({
      user: {
        username: '',
        email: ''
      },
      updateUser: (user) => set(() => ({ user: user }))
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export type Balance = {
  income: number,
  savings: number
}

export type BalanceState = {
  balance: Balance
}
export type BalanceAction = {
  updateBalance: (balance: BalanceState['balance']) => void
}

export const useBalanceStore = create(
  persist<BalanceState & BalanceAction>(
    (set) => ({
      balance: {
        income: 0,
        savings: 0
      },
      updateBalance: (balance) => set(() => ({ balance: balance }))
    }),
    {
      name: 'balance', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)



export type CategoryState = {
  categories: Array<string>
}
export type CategoryAction = {
  updateCategories: (categories: CategoryState['categories']) => void
}

export const useCategoryState = create(
  persist<CategoryState & CategoryAction>(
    (set) => ({
      categories: [],
      updateCategories: (categories) => set(() => ({ categories: categories }))
    }),
    {
      name: 'categories', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

export type Transaction = {
  id: number,
  title: string,
  amount: number,
  type: boolean,
  date: Date,
  description: string,
  isUpcoming: boolean
}

export type TransactionState = {
  transaction: Array<Transaction>
}
export type TransactionAction = {
  updateTransaction: (transaction: TransactionState['transaction']) => void
}

export const useTransactionStore = create(
  persist<TransactionState & TransactionAction>(
    (set) => ({
      transaction: [],
      updateTransaction: (transaction) => set(() => ({ transaction: transaction }))
    }),
    {
      name: 'transaction', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
