import React from 'react';
import s from './GoogleButton.module.scss';
import { useTranslation } from 'react-i18next';
import google from '../../images/google.svg';
import PropTypes from 'prop-types';

export default function GoogleButton({ name }) {
  const { t } = useTranslation();
  console.log(name);
  return (
    <a
      className={s.login_link}
      href="https://slim-mom-server.herokuapp.com/api/auth/google"
    >
      <div className={s.google_box}>
        <img src={google} alt={`add product icon`} className={s.googleIcon} />
        {name}
      </div>
    </a>
  );
}
GoogleButton.propTypes = {
  name: PropTypes.string,
};
