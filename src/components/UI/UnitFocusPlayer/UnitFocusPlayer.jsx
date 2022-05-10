import React from 'react';
import HealthBar from '../HealthTable/HealthBar/HealthBar';
import { useSelector } from 'react-redux';
import style from './UnitFocusPlayer.module.scss';

function UnitFocusPlayer() {
  const focus = useSelector((state) => {
    return state.focus.focusPlayer;
  });
  return (
    <div className={style.unitFocusPlayer}>
      <HealthBar id={focus} />
    </div>
  );
}

export default UnitFocusPlayer;
