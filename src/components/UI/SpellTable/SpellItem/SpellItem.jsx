import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHeal } from '../../../../redux/unitSlice';
import { endGDC, startGDC } from '../../../../redux/GDCSlice';
import style from './SpellItem.module.scss';
import { setSpellCast } from '../../../../redux/spellCastSlice';
import { deleteBuff, setBuff } from '../../../../redux/iconBuffSlice';

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

function intervalHeal(focus, valueHeal, duration, interval, address) {
  return async (dispatch) => {
    dispatch(setBuff({ id: focus, address: address }));

    const timerId = setInterval(() => {
      dispatch(setHeal({ id: focus, heal: valueHeal }));
    }, interval);

    setTimeout(() => {
      clearInterval(timerId);
      dispatch(deleteBuff({ id: focus, address: address }));
    }, duration);
  };
}

function intervalHealAll(valueHeal, duration, interval, address) {
  return async (dispatch) => {
    for (let i = 0; i < 5; i++) {
      dispatch(setBuff({ id: i, address: address }));
    }
    const timerId = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        dispatch(setHeal({ id: i, heal: valueHeal }));
      }
    }, interval);

    setTimeout(() => {
      clearInterval(timerId);
      for (let i = 0; i < 5; i++) {
        dispatch(deleteBuff({ id: i, address: address }));
      }
    }, duration);
  };
}

function SpellItem({
  nameSpell,
  coolDown,
  valueHeal,
  spellCasting,
  address,
  interval,
  duration,
  intervalArea,
}) {
  interval = interval || 0;
  spellCasting = spellCasting || 0;
  intervalArea = intervalArea || false;

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
      style={{ backgroundImage: `url(${address})` }}
      onClick={() => {
        if (!isSpellCasting) {
          dispatch(startGDC());
          if (spellCasting === 0) {
            if (interval === 0) {
              dispatch(setHeal({ id: focus, heal: valueHeal }));
            } else {
              if (intervalArea) {
                dispatch(intervalHealAll(valueHeal, duration, interval, address));
              } else {
                dispatch(intervalHeal(focus, valueHeal, duration, interval, address));
              }
            }
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
