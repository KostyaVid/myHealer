import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { takeDamage, takeDamageAll } from '../../../redux/unitSlice';
import style from './Enemy.module.scss';

function intervalDamage() {
  return async (dispatch) => {
    const timerId = setInterval(() => {
      dispatch(takeDamageAll({ damage: 100 }));
    }, 2000);

    setTimeout(() => {
      clearInterval(timerId);
    }, 100000);
  };
}

function Enemy() {
  const dispatch = useDispatch();
  dispatch(intervalDamage());
  return (
    <div className={style.HealthBar}>
      <div className={style.currentHealth} style={{ width: `${50 + '%'}` }}></div>

      <div className={style.title}>
        <div>{'enemy' + 50}</div>
      </div>
    </div>
  );
}

export default Enemy;
