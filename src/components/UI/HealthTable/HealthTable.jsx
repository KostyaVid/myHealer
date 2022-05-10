import React from 'react';
import HealthBar from './HealthBar/HealthBar';
import style from './HealthTable.module.scss';

function HealthTable() {
  return (
    <div className={style.healthTable}>
      <HealthBar id="1" />
      <HealthBar id="2" />
      <HealthBar id="3" />
      <HealthBar id="4" />
      <HealthBar id="0" />
    </div>
  );
}

export default HealthTable;
