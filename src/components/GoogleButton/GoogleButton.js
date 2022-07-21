import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import google from '../../assets/images/google.svg';

import s from './GoogleButton.module.scss';

export default function GoogleButton({ name }) {
  const { t } = useTranslation();
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
