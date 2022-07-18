import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './UserConfig.module.scss';
import avatar from '../../images/avatar.png';
import { BsSun, BsMoon, BsPersonCheckFill } from 'react-icons/bs';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import { useContext } from 'react';
import i18n from 'services/i18n/config';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UserConfig() {
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const opositiveLanguage = currentLanguage === 'uk' ? 'en' : 'uk';

  const [{ isDark }, toggleTheme] = useContext(ThemeContext);
  const name = useSelector(state => state.auth.user.name);
  const [popUpMenu, setPopUpMenu] = useState(false);
  function setingPopUpMenu() {
      setPopUpMenu(!popUpMenu);
    }
  function openMenu(event){
    popUpMenu === false? setPopUpMenu(true): undefined

}

  const navigateToCalculator = () => {
    navigate('/calculator');
    //   setingPopUpMenu()
  };

  function PopUpMenu() {
    return (
      <>
        <ul className={s.drop_down}
         onMouseLeave={setingPopUpMenu}
         >
          <li className={s.pointer} onClick={toggleTheme}>
            {isDark ? (
              <span>
                <BsMoon size={20} />
              </span>
            ) : (
              <span>
                <BsSun size={20} />
              </span>
            )}
          </li>
          <li
            className={s.pointer}
            onClick={e => i18n.changeLanguage(opositiveLanguage)}
          >
            <button className={s.languageBtn} type="button">
              <span className={s.currentLanguage}>
                {currentLanguage === 'uk' ? 'UK' : 'EN'}
              </span>
            </button>
          </li>
          <li>
            <BsPersonCheckFill
              className={s.pointer}
              onClick={navigateToCalculator}
              size={20}
            />
          </li>
        </ul>
      </>
    );
  }
  return (
    <div className={s.wrapper}>
      <img
        onMouseOver={openMenu}
        className={s.avatar}
        src={avatar}
        alt="avatar"
      />
      <p
        onMouseOver={openMenu}
        className={name !== '' ? s.light : undefined}
      >
        {name === '' ? 'Name' : name}
      </p>
      {popUpMenu && PopUpMenu()}
    </div>
  );
}

