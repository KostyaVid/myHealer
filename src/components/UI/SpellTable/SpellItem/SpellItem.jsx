import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHeal } from '../../../../redux/unitSlice';
import { endGDC, startGDC } from '../../../../redux/GDCSlice';
import style from './SpellItem.module.scss';
import { setSpellCast } from '../../../../redux/spellCastSlice';

const endGlobalCooldown = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(endGDC());
    }, 1000);
  };
};

const castHeal = (focus, valueHeal, spellCasting) => {
  return async (dispatch) => {
    dispatch(setSpellCast({ isCast: true, castTime: spellCasting }));
    setTimeout(() => {
      dispatch(setHeal({ id: focus, heal: valueHeal }));
      dispatch(setSpellCast({ isCast: false, castTime: spellCasting }));
    }, spellCasting);
  };
};

function SpellItem({ nameSpell, coolDown, valueHeal, spellCasting }) {
  spellCasting = spellCasting || 0;
  const focus = useSelector((state) => {
    return state.focus.focusPlayer;
  });
  const GDC = useSelector((state) => {
    return state.gdc.isGDC;
  });

  const isSpellCasting = useSelector((state) => {
    return state.spellCast.isCast;
  });
  const dispatch = useDispatch();

  return (
    <div
      className={[style.spellItem, GDC ? `${style.unActive}` : ''].join(' ')}
      onClick={() => {
        if (!isSpellCasting) {
          dispatch(startGDC());
          if (spellCasting === 0) {
            dispatch(setHeal({ id: focus, heal: valueHeal }));
          } else {
            dispatch(castHeal(focus, valueHeal, spellCasting));
          }
          dispatch(endGlobalCooldown());
        }
      }}>
      <div className={style.currentCoolDown} style={{ animationDuration: `${coolDown}ms` }}></div>

      {GDC ? (
        <div className={style.currentCoolDown} style={{ animationDuration: `1000ms` }}></div>
      ) : (
        ''
      )}

      <div className={style.spellNumber}>{nameSpell}</div>
    </div>
  );
}

export default SpellItem;
