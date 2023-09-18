import React from 'react';
import {
   Button,
   Card,
   CheckBox,
   Donate,
   Filter,
   Footer,
   Form,
   Login,
   Logo,
   Notification,
   Profile,
} from '../Components';

const layout = () => {
   return (
      <div className="home">
         <Logo />
         <Button />
         <Notification />
         <Filter />
         <Card />
         <Donate />
         <Form />
         <Login />
         <Profile />
         <CheckBox />
         <Footer />
      </div>
   );
};

export default layout;
