import React from 'react';
import {
   Button,
   Card,
   CheckBox,
   Donate,
   Filter,
   Footer,
   Form,
   Header,
   Login,
   Logo,
   Notification,
   Product,
   Profile,
   SignUp,
   Upload,
} from '../Components';

const layout = () => {
   return (
      <div className="home">
         <Header />
         <Upload />
         <Product />
         <Logo />
         <Button />
         <Notification />
         <Filter />
         <SignUp />
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
