import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulador, transaction) => {
      if (transaction.type === 'income') {
        return acumulador + transaction.value;
      }

      return acumulador;
    }, 0);

    const outcome = this.transactions.reduce((acumulador, transaction) => {
      if (transaction.type === 'outcome') {
        return acumulador + transaction.value;
      }

      return acumulador;
    }, 0);

    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    const { total } = this.getBalance();
    if (type === 'outcome' && total - value < 0) {
      throw Error('error');
    }
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
