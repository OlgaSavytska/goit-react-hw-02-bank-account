import React from 'react';
import PropTypes from 'prop-types';
import s from './Controls.module.css';

const Controls = ({ onChange, onClick, amount }) => {
  return (
    <section className={s.controls}>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={onChange}
        className={s.input}
      />
      <button
        type="submit"
        name="deposit"
        onClick={onClick}
        className={s.button}
      >
        Deposit
      </button>
      <button
        type="submit"
        name="withdraw"
        onClick={onClick}
        className={s.button}
      >
        Withdraw
      </button>
    </section>
  );
};

Controls.defaultProps = {
  amount: '',
};

Controls.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  amount: PropTypes.string,
};

export default Controls;
