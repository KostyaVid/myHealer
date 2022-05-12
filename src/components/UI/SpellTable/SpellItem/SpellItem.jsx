import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHeal } from '../../../../redux/unitSlice';
import { endGDC, startGDC } from '../../../../redux/GDCSlice';
import style from './SpellItem.module.scss';
import { setSpellCast } from '../../../../redux/spellCastSlice';
import { deleteBuff, setBuff } from '../../../../redux/iconBuffSlice';
import { endCoolDown, setCoolDown } from '../../../../redux/coolDownSlice';

const endGlobalCooldown = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(endGDC());
    }, 1000);
  };
};

const syncCoolDown = (nameSpell, coolDown) => {
  return async (dispatch) => {
    dispatch(setCoolDown({ nameSpell: nameSpell }));
    setTimeout(() => {
      dispatch(endCoolDown({ nameSpell: nameSpell }));
    }, coolDown);
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

/**
 * основной компонент ячейки заклинания

 * @param {string} nameSpell- Имя заклинания
 * @param {number} coolDown - Кулдаун заклинания
 * @param {number} valueHeal- Объем хила за тик
 * @param {number} spellCasting - Время каста
 * @param {number} address - URL изображения заклинания
 * @param {number} interval- Интервал между тиками. Если его нет, то закл. непериодическое
 * @param {number} duration - продолжительность периодического закл. Необяз, если нет interval
 * @param {boolean} intervalArea - boolean. Всех или соло лечит
 */

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
  coolDown = coolDown || 1000;
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
  const isCoolDown = useSelector((state) => {
    return state.coolDown[nameSpell];
  });

  const buffs = useSelector((state) => {
    return state.iconBuff.unit[focus].icons;
  });

  const dispatch = useDispatch();

  return (
    <div
      className={[style.spellItem, GDC ? `${style.unActive}` : ''].join(' ')}
      style={{ backgroundImage: `url(${address})` }}
      onClick={() => {
        //Обработка кулдаунов и вызовов событий
        if (!isCoolDown) {
          dispatch(syncCoolDown(nameSpell, coolDown));
          if (!isSpellCasting) {
            dispatch(startGDC());
            if (spellCasting === 0) {
              if (interval === 0) {
                dispatch(setHeal({ id: focus, heal: valueHeal }));
              } else {
                if (intervalArea) {
                  dispatch(intervalHealAll(valueHeal, duration, interval, address));
                } else {
                  if (!buffs.includes(address)) {
                    dispatch(intervalHeal(focus, valueHeal, duration, interval, address));
                  }
                }
              }
            } else {
              dispatch(castHeal(focus, valueHeal, spellCasting));
            }
            dispatch(endGlobalCooldown());
          }
        }
      }}
      //конец обработки кулдаунов и событий
    >
      {isCoolDown ? (
        <div className={style.currentCoolDown} style={{ animationDuration: `${coolDown}ms` }}></div>
      ) : (
        ''
      )}

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
