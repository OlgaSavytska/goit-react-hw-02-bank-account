import React from 'react';
import PropTypes from 'prop-types';
import s from './Balance.module.css';

const Balance = ({ balanceUp, balanceDown, balance }) => {
  return (
    <section className={s.balance}>
      <p className={s.text}>
        <span className={s.iconUp} role="img" aria-label="deposit-up">
          ⬆
        </span>
        {balanceUp}$
      </p>
      <p className={s.text}>
        <span className={s.iconDown} role="img" aria-label="deposit-down">
          ⬇
        </span>
        {balanceDown}$
      </p>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  balanceUp: PropTypes.number.isRequired,
  balanceDown: PropTypes.number.isRequired,
};

export default Balance;
