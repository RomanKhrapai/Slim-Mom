import { Confirm } from 'notiflix';

export const confirmWindow = (message, yesBtn, NoBtn, foo) => {
  Confirm.show(
    'SlimMom',
    message,
    yesBtn,
    NoBtn,
    OnYes => {
      foo();
    },
    OnNo => {
      return;
    }
  );
};
