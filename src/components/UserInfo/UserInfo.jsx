import React, {useState, useEffect} from "react"
import styles from './userinfo.module.scss'
import { NavLink } from 'react-router-dom';


const UserInfo = () => {



    return (
        <div className={styles.userinfo}>
          <h3>Nic</h3>
          <div className={styles.vector1} />
          <button>Sign Out</button>
        </div>
    )
}

export default UserInfo
