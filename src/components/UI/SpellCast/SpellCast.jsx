import React from 'react';
import { useSelector } from 'react-redux';
import style from './SpellCast.module.scss';

function SpellCast() {
  const [isCast, castTime] = useSelector((state) => {
    return [state.spellCast.isCast, state.spellCast.castTime];
  });
  return (
    <div>
      {isCast ? (
        <div className={style.spellCast}>
          <div className={style.currentCast} style={{ animationDuration: `${castTime}ms` }}></div>
          <div className={style.nameCast}>
            <div>Casting</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default SpellCast;
