import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// recebendo dados
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    try {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default CreateTransactionService;
