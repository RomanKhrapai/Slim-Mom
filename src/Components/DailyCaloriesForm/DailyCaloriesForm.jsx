import React, { useState, useEffect } from "react";

import s from './DailyCaloriesForm.module.scss';

const DailyCaloriesForm = () => {
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [current, setCurrent] = useState("");
    const [desired, setDesired] = useState("");
    const [blood, setBlood] = useState("1");

    const getDailyCalories = () => {
        return 10 * Number(current) + 6.25 * Number(height) - 5 * Number(age) - 161 - 10 * (Number(current) - Number(desired));
    }

    const getActiveClass = (condition) => {
        if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
        return `${s.label} ${s.labelAbsolute}`;
    }

    return (<form className={s.form} onSubmit={e => {
        e.preventDefault();
    }}>
        <div className={s.inputBox}>
        
            <input className={s.input} id="height" type="text" required onChange={e => setHeight(e.target.value)} value={height} pattern="\D" />
            <label className={getActiveClass(height)} htmlFor="height">Heigh *</label>
        </div>
        <div className={s.inputBox}>
           
        <input className={s.input} id="age" type="text" required onChange={e => setAge(e.target.value)} pattern="\D"/>
         <label className={getActiveClass(age)} htmlFor="age">Age *</label>
        </div>
        <div className={s.inputBox}>
            
            <input className={s.input} id="current" type="text" required onChange={e => setCurrent(e.target.value)} pattern="\D" />
            <label className={getActiveClass(current)} htmlFor="current">Current weight *</label>
        </div>
        <div className={s.inputBox}>
            
            <input className={s.input} id="desired" type="text" required onChange={e => setDesired(e.target.value)} pattern="\D" />
            <label className={getActiveClass(desired)} htmlFor="desired">Desired weight *</label>
        </div>
        

        <div className={s.bloodBox} onChange={e => setBlood(e.target.value)}>
            <p className={`${s.label} ${s.labelBlood}`}>Blood type *</p>

            <label className={s.radio}>
                <input className={s.radioInput} type="radio" name="blood" value='1' required checked={blood === "1"} />
                
            <div className={s.radioBox}>
                    <span></span>
                </div>
                <span>1</span>
                    </label>
        
            <label className={s.radio}>
                <input className={s.radioInput} type="radio" name="blood" value='2' required checked={blood === "2"}/>
                
              <div className={s.radioBox}>
                <span></span>
                </div>
                <span>2</span>
                </label>
        
            <label className={s.radio}>
                <input className={s.radioInput} type="radio" name="blood" value='3' required checked={blood === "3"}/>
                
              <div className={s.radioBox}>
                <span></span>
                </div>
                <span>3</span>
                    </label>
        
            <label className={s.radio}>
                <input className={s.radioInput} type="radio" name="blood" value='4' required checked={blood === "4"} />
             <div className={s.radioBox}>
                <span></span>
                </div>
                <span>2</span>
                    </label>
        </div>

        <button type="submit">Start losing weight</button>
    </form>)
}

export default DailyCaloriesForm;