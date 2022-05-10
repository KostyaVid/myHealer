import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFocusPlayer } from '../../../../redux/focusSlice';
import style from './HealthBar.module.scss';

function HealthBar({ id }) {
  const [name, health, buffs] = useSelector((state) => {
    return [
      state.units.units[id].name,
      (state.units.units[id].currentHealth / state.units.units[id].maxHealth) * 100,
      state.iconBuff.unit[id].icons,
    ];
  });
  const dispatch = useDispatch();

  return (
    <div className={style.HealthBar} onClick={() => dispatch(setFocusPlayer(id))}>
      <div className={style.currentHealth} style={{ width: `${health + '%'}` }}></div>
      <div className={style.buffTable}>
        {buffs.map((elem, index) => (
          <img className={style.buffs} src={elem} alt="icon buff" key={index + elem} />
        ))}
      </div>

      <div className={style.title}>
        <div>{name}</div>
      </div>
    </div>
  );
}

export default HealthBar;
