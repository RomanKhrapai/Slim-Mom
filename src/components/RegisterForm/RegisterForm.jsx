import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "redux/auth";
import './RegisterForm.css';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
          case 'name':
            return setName(value);
          case 'email':
            return setEmail(value);
          case 'password':
            return setPassword(value);
    
          default:
            return;
        }
      };

      const handleSubmit = e => {
        e.preventDefault();
        dispatch(authOperations.register({ name, email, password }));
        setName('');
        setEmail('');
        setPassword('');
      };

      return (
        <form className="registration_form" onSubmit={handleSubmit}>
          <label className="registration_label">
            <span>Нікнейм</span>
            <input
              className="registration_input"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Ваше нікнейм"
              aria-label="Input for your name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="The name can only contain letters, an apostrophe, a dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
              required
            />
          </label>
          <label className="registration_label">
            <span>Імейл</span>
            <input
              className="registration_input"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Ваш імейл"
              aria-label="Input for your email"
              required
            />
          </label>
          <label className="registration_label">
            <span>Пароль</span>
            <input
              className="registration_input"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Пароль має містити не менш 7 символів"
              aria-label="Input for your password"
              required
            />
          </label>
          <button className="registration_button" type="submit">Зареєструватися</button>
        </form>
      );
    }