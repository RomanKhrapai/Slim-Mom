import styles from '../Navigation/navigation.module.scss';
import s from './languageButton.module.scss'
import React from 'react';
import i18n from 'services/i18n/config';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';


export const LanguageButton = () => {
  
   const isAuthorised = useSelector(authSelectors.getIsAuthorised);
   const isDark = useSelector((state) => state.theme.isDark);
   
   const languageClassToggle = (e) =>{
     const firstChildClass = e.currentTarget.firstChild.firstChild;
     const secondChildClass = e.currentTarget.firstChild.lastChild
     firstChildClass.className.includes(styles.currentLanguage)? firstChildClass.text = styles.secondaryLanguage:  firstChildClass.className = styles.currentLanguage;
     secondChildClass.className.includes(styles.currentLanguage)? secondChildClass.className = styles.secondaryLanguage:  secondChildClass.className = styles.currentLanguage
   }
   // i18n.changeLanguage(opositiveLanguage)
   
     const currentLanguage = i18n.language === 'uk' ? 'uk' : 'en';
     const opositiveLanguage = currentLanguage === 'uk' ? 'en' : 'uk';
     // const languageBtnCurrent = currentLanguage ==='uk' ? 'ua' : 'en'
     // const languageBtnSecondary = currentLanguage ==='uk' ? 'en' : 'ua'
     // if(currentLanguage === 'uk' ? currentLanguage : i18n.changeLanguage(opositiveLanguage));
 
     return  <button
  className={ `${s.button} ${isAuthorised? s.languageBtnAuthorise : s.languageBtn} ` }
            type="button"
            onClick={e =>{ i18n.changeLanguage(opositiveLanguage); languageClassToggle(e)}}
          >
            <span className={s.languageText}>
            <span
                className={
                currentLanguage ==="uk"? ((isAuthorised && isDark) ? s.currentLanguage_dark : s.currentLanguage):
                  s.opositiveLanguage}
              >
                {"UA" }
              </span >
              /
              <span  className={
              currentLanguage ==="en"? ((isAuthorised && isDark) ? s.currentLanguage_dark : s.currentLanguage):
              s.opositiveLanguage}
              >
              {"EN"}
              </span >
            </span>
          </button>
        
          }