import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import './UserMenu.css'

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  return (
    <div className='userinfo'>
      <div className='userinfo_text'>
        <img
          src={`https://eu.ui-avatars.com/api/?background=2196f3&color=fff&length=1&name=$%7Bname%7D`}
          alt="avatar"
          title="Your avatar"
          className='userinfo_image'
        />
      </div>
      <div className='userinfo_greetings'>Welcome, {name}</div>
      <button className='userinfo_button' type="button" onClick={() => dispatch(authOperations.logOut())}>
        Log Out
      </button>
    </div>
  );
}