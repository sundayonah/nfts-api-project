import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// internal import
import Style from './Header.module.css';
import { Logo, Login, SignUp } from '../index';

const Header = ({ notification, setNotification }) => {
   const menuList = [
      { name: 'Home', link: '/' },
      { name: 'about', link: '#' },
      { name: 'API', link: '/nfts-api' },
   ];

   const [signup, setSignup] = useState(false);
   const [login, setLogin] = useState(false);
   const [token, setToken] = useState(false);

   const openModal = (el) => {
      if (el == 'Login') {
         setLogin(true);
         setSignup(false);
      } else if (el == 'SignUp') {
         setSignup(true);
         setLogin(false);
      }
   };

   useEffect(() => {
      const token = localStorage.getItem('NFTApi Token');
      setToken(token);
   }, []);

   const logout = () => {
      localStorage.removeItem('NFTApi Token');
      window.location.reload();
   };

   return (
      <>
         <div className={Style.Header}>
            <Logo />
            <div className={Style.menu}>
               {menuList.map((el, i) => (
                  <Link className={Style.link} href={el.link} key={i + 1}>
                     <p>{el.name}</p>
                  </Link>
               ))}
               {token ? (
                  <p onClick={() => logout()}>Logout</p>
               ) : (
                  <>
                     <p onClick={() => openModal('Login')}>Login</p>
                     <p onClick={() => openModal('SignUp')}>SignUp</p>
                  </>
               )}
            </div>
         </div>
         {/* signup */}
         {signup && (
            <div className={Style.form}>
               <div className={Style.form_inner}>
                  <SignUp
                     setLogin={setLogin}
                     setSignup={setSignup}
                     notification={notification}
                     setNotification={setNotification}
                  />
               </div>
            </div>
         )}

         {/* Login */}
         {login && (
            <div className={Style.form}>
               <div className={Style.form_inner}>
                  <Login
                     setLogin={setLogin}
                     setSignup={setSignup}
                     notification={notification}
                     setNotification={setNotification}
                  />
               </div>
            </div>
         )}
      </>
   );
};

export default Header;
