import React, { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";
import { registration } from "../../Services";

const Registration = () => {
  const [userRegInfo, setUserRegInfo] = useState("");
  const [visiblePassword, setVisiblePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();
    if (userRegInfo.password !== userRegInfo.passwordConfirmation) {
      setErrorMessage(["Пароли не совпадают!"]);
      return;
    }
    try {
      const response = await registration(userRegInfo);
      setErrorMessage("");
      setUserRegInfo("");
    } catch (e) {
      const errors = e.response.data.errors;
      const errorMessages = Object.values(errors).flat();
      setErrorMessage(errorMessages);
    }
  };

  const toogleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const regexInputReg = (e, pattern, field) => {
    const value = e.target.value;
    if (!pattern.test(value)) {
      setUserRegInfo({ ...userRegInfo, [field]: value });
    }
  };
  const cyrillicPattern = /[\u0400-\u04FF]/;

  return (
    <div className="main-reg">
      <div className="reg-form">
        <div className="reg-content">
          <h2 className="reg-title">Создайте аккаунт</h2>
          <form onSubmit={onRegister} on className="reg-content-form">
            <div className="input-form-container">
              <input
                required
                minLength={4}
                maxLength={16}
                autoComplete="on"
                type="text"
                className="input-form"
                placeholder="Имя пользователя"
                value={userRegInfo?.username ?? ""}
                onChange={(e) => regexInputReg(e, cyrillicPattern, "username")}
              />
            </div>

            <div className="input-form-container">
              <input
                required
                autoComplete="on"
                type="text"
                className="input-form"
                placeholder="Электронная почта"
                value={userRegInfo?.email ?? ""}
                onChange={(e) => regexInputReg(e, cyrillicPattern, "email")}
              />
            </div>

            <div className="input-form-container">
              <input
                required
                minLength={8}
                autoComplete="on"
                type={visiblePassword ? "text" : "password"}
                className="input-form"
                placeholder="Пароль"
                value={userRegInfo?.password ?? ""}
                onChange={(e) => regexInputReg(e, cyrillicPattern, "password")}
              />
              <button
                onClick={toogleVisiblePassword}
                type="button"
                className="show-hide"
              >
                {visiblePassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="input-form-container">
              <input
                required
                minLength={8}
                autoComplete="on"
                type="password"
                className="input-form"
                placeholder="Подтверждение пароля"
                value={userRegInfo?.passwordConfirmation ?? ""}
                onChange={(e) =>
                  regexInputReg(e, cyrillicPattern, "passwordConfirmation")
                }
              />
            </div>

            <button type="submit" className="reg-but">
              Регистрация
            </button>
          </form>
          <div className="to-login">
            <span className="to-login-span">Уже есть аккаунт?</span>
            <Link className="to-login-btn" to="/login">
              Войти
            </Link>
          </div>
          {errorMessage.length > 0 && (
            <div className="error-notify">
              {errorMessage.map((msg, index) => (
                <p key={index} className="error-message">
                  {msg}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
