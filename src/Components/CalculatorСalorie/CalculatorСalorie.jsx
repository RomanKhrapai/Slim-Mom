import React, { useState, useEffect } from 'react';
import DailyCaloriesForm from 'Components/DailyCaloriesForm';
import UserInfo from './UserInfo';

// Имитация базы и поиска пользователя, для проверки работоспособности
const users = [
  {
    userId: 1,
    name: 'user1',
    age: 27,
    blood: 2,
    current: 75,
    height: 170,
    desired: 65,
  },
  {
    userId: 2,
    name: 'user2',
    age: 20,
    blood: 4,
    current: 80,
    height: 165,
    desired: 56,
  },
];
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
    window.confirm()
  };


  if (!activeModerate) {
    return (
      <>
        <UserInfo userData={user} />
        <button type="button" onClick={changeActive}>
          Change information
        </button>
        <button type="button" onClick={openModal}>
          View your losing weight plan
        </button>
      </>
    );
  }

  return (
    <>
      <DailyCaloriesForm userData={user} />
      <button type="button" onClick={changeActive}>
        Close Changes
      </button>
    </>
  );
};

export default сalculatorСalorie;
