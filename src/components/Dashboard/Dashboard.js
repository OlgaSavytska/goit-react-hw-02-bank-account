import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    balanceUp: 0,
    balanceDown: 0,
    amount: '',
  };

  componentDidMount() {
    const persistedState = localStorage.getItem('state');
    if (persistedState) {
      const state = JSON.parse(persistedState);
      this.setState(state);
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { transactions } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = ({ target }) => {
    const { name } = target;
    this.addTransaction({ ...this.state }, name);
  };

  addTransaction = (dataState, nameType) => {
    if (+dataState.amount === 0) {
      this.notifyWarn();
      this.reset();
      return;
    }
    const transactionToAdd = {
      ...dataState,
      id: shortid.generate(),
      type: nameType,
      amount: +dataState.amount,
      date: new Date().toLocaleString(),
    };
    if (nameType === 'deposit') {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, transactionToAdd],
        balance: dataState.balance + Number(dataState.amount),
        balanceUp: dataState.balanceUp + Number(dataState.amount),
      }));
    } else {
      if (+dataState.amount > dataState.balance) {
        this.notifyError();
        this.reset();
        return;
      }
      this.setState(prevState => ({
        transactions: [...prevState.transactions, transactionToAdd],
        balance: dataState.balance - Number(dataState.amount),
        balanceDown: dataState.balanceDown + Number(dataState.amount),
      }));
    }
    this.reset();
  };

  reset = () => {
    this.setState({
      amount: '',
    });
  };

  notifyWarn = () => toast.warn('Введите сумму для проведения операции!');

  notifyError = () =>
    toast.error('На счету недостаточно средств для проведения операции!', {
      position: toast.POSITION.TOP_LEFT,
    });

  render() {
    const {
      transactions,
      balance,
      balanceUp,
      balanceDown,
      amount,
    } = this.state;
    return (
      <div>
        <Controls
          onChange={this.handleChange}
          onClick={this.handleClick}
          amount={amount}
        />
        <ToastContainer />
        <Balance
          balanceUp={balanceUp}
          balanceDown={balanceDown}
          balance={balance}
        />
        {transactions.length > 0 && (
          <TransactionHistory transactions={transactions} />
        )}
      </div>
    );
  }
}
