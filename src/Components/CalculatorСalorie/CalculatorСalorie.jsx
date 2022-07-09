import React, { useState, useEffect } from 'react';
import DailyCaloriesForm from 'Components/DailyCaloriesForm';
import UserInfo from './UserInfo';
import users from '../usersDB';
// Имитация базы и поиска пользователя, для проверки работоспособности

const userId = users[0].userId;
const user = users.find(user => user.userId === userId);

const сalculatorСalorie = () => {
    // Активность режима редактирования
  const [activeModerate, setActiveModerate] = useState(false);

  const changeActive = () => {
    setActiveModerate(!activeModerate);
  };

  //Имитация открытия модалки
  const openModal = () => {
    console.log('Modal is open');
    window.confirm();
    console.log('Modal is close');
  };


  if (!activeModerate) {
    return (
      <>
        <UserInfo userData={user} />
        <button type="button" onClick={changeActive}>
          Edit information
        </button>
        {/* <button type="button" onClick={openModal}>
          View your losing weight plan
        </button> */}
      </>
    );
  }

  return (
    <>
      <DailyCaloriesForm userData={user} />
      <button type="button" onClick={changeActive}>
        Cancel
      </button>
    </>
  );
};

export default сalculatorСalorie;
