import React from 'react';
import SpellItem from './SpellItem/SpellItem';
import style from './SpellTable.module.scss';

function SpellTable() {
  return (
    <div className={style.spellTable}>
      <SpellItem
        nameSpell="1"
        coolDown="1000"
        valueHeal={10}
        spellCasting={2000}
        address="./img/EaseHeal.png"
      />
      <SpellItem
        nameSpell="2"
        coolDown="3000"
        valueHeal={5}
        interval={1000}
        duration={8000}
        address="./img/bloom.png"
      />
      <SpellItem
        nameSpell="3"
        coolDown="1000"
        valueHeal={2}
        interval={1000}
        duration={8000}
        intervalArea={true}
        address="./img/IntervalAreaHeal.png"
      />
      <SpellItem nameSpell="4" coolDown="500" valueHeal={10} />
      <SpellItem nameSpell="5" coolDown="10000" valueHeal={10} />
      <SpellItem nameSpell="6" coolDown="2500" valueHeal={10} />
      <SpellItem nameSpell="7" coolDown="7000" valueHeal={10} />
      <SpellItem nameSpell="8" coolDown="8000" valueHeal={10} />
      <SpellItem nameSpell="9" coolDown="3500" valueHeal={10} />
      <SpellItem nameSpell="0" coolDown="1000" valueHeal={10} />
    </div>
  );
}

export default SpellTable;
