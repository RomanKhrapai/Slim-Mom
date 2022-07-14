import { createContext, useEffect, useState } from "react";
import React from "react";
 export const ThemeContext = createContext()
 import PropTypes from 'prop-types';

 const themes={
     dark:{
backgroundColor: " rgb(56, 55, 84)",
color:"white",
h1:{
    color:'white'
}
     },
     light:{
        backgroundColor: "white",
        // color:"black"
             }
 }

 export const ThemeProvider = ({children})=>{
     const [isDark, setIsDark] = useState(false)
     const theme = isDark ? themes.dark : themes.light

     const toggleTheme =()=>{
         localStorage.setItem('isDark',JSON.stringify(!isDark))
         setIsDark(!isDark)
     }

     useEffect(()=>{
         if(localStorage.getItem('isDark') === true){  
             setIsDark(isDark)
            }
        console.log(localStorage.getItem('isDark'));
     },[])


     return(
         <ThemeContext.Provider value={[{theme, isDark}, toggleTheme]}>{children}</ThemeContext.Provider>
     )
 }

 ThemeProvider.propTypes = {
    children: PropTypes.node,
  };