import React from 'react';

//internal import
import Style from './Notification.module.css';

const Notification = ({ setNotification, notification }) => {
   return (
      <div className={Style.alert} onClick={() => setNotification('')}>
         {notification}
         <span>&times;</span>
      </div>
   );
};

export default Notification;
