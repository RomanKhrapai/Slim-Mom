import { Confirm } from 'notiflix';

Confirm.init({
  titleColor: '#fc842d',
  okButtonColor: '#f8f8f8',
  okButtonBackground: '#fc842d',
  });

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
