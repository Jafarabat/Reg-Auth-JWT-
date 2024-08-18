import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { login } from "../../Services";
import { AuthContext } from "../../context";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userLogInfo, setUserLogInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const toogleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userLogInfo);
      setErrorMessage("");
      setUserLogInfo("");
      setIsAuth(true);
    } catch (e) {
      const errors = e.response.data.errors;
      const errorMessages = Object.values(errors).flat();
      setErrorMessage(errorMessages);
    }
  };

  const regexInput = (e, pattern, field) => {
    const value = e.target.value;
    if (!pattern.test(value)) {
      setUserLogInfo({ ...userLogInfo, [field]: value });
    }
  };

  const cyrillicPattern = /[\u0400-\u04FF]/;

  return (
    <div className="main-reg">
      <div className="log-form">
        <div className="log-content">
          <h2 className="log-title">Войти в аккаунт</h2>
          <form onSubmit={onLogin} className="log-content-form">
            <div className="input-form-container">
              <input
                required
                autoComplete="on"
                type="email"
                className="input-form"
                placeholder="Электронная почта"
                value={userLogInfo?.email ?? ""}
                onChange={(e) => regexInput(e, cyrillicPattern, "email")}
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
                value={userLogInfo?.password ?? ""}
                onChange={(e) => regexInput(e, cyrillicPattern, "password")}
              />
              <button
                onClick={toogleVisiblePassword}
                type="button"
                className="show-hide"
              >
                {visiblePassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              onClick={() => localStorage.clear()}
              type="button"
              className="forgot-password"
            >
              Забыли пароль?
            </button>

            <button type="submit" className="log-but">
              Войти
            </button>
          </form>

          <div className="to-reg">
            <span className="to-reg-span">Нет аккаунта?</span>
            <Link className="to-reg-btn" to="/registration">
              Зарегистрироваться
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

export default Login;
