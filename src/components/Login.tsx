import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.scss';
import loginImage from '../assets/images/login-image.png';
import logo from '../assets/images/logo.png';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftContainer}>
        <img src={logo} alt="Lendsqr Logo" className={styles.logo} />
        <img src={loginImage} alt="Login" className={styles.loginImage} />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <span onClick={handleShowPassword}>{showPassword ? 'HIDE' : 'SHOW'}</span>
            </div>
            <a href="#" className={styles.forgotPassword}>FORGOT PASSWORD?</a>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
