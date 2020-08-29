import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

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
    const transactionType = type;

    if (transactionType !== 'income' && transactionType !== 'outcome') {
      throw Error('Type of transaction not avaliable');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const transactionValues = this.transactionsRepository.getBalance();

    if (transactionValues.total < value && transactionType === 'outcome') {
      throw Error('Insufficient account value');
    }

    return transaction;
  }
}

export default CreateTransactionService;
