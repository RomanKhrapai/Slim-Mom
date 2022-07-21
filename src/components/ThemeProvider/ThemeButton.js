import {React,useState,useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from 'redux/theme/themeSlice';
import { BsSun, BsMoon } from 'react-icons/bs';

import s from './ThemeButton.module.scss'

export default function ThemeButton(){
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);
    const [icon, setIcon] = useState(<BsSun size={20} />);

    useEffect(() => {
        if (isDark) {
          setIcon(<BsMoon className={s.moon_icon} size={20} />);
        } else {
          setIcon(<BsSun size={20} />);
        }
      }, [isDark]);

    return(
        <div
        className={
          isDark
            ? s.button_theme_swither_dark
            : s.button_theme_swither_light
        }
        onClick={() => dispatch(toggleTheme())}
      >
        {icon}
      </div>
    )
}