import React from 'react';
import { Button, Card, CheckBox, Filter, Footer, Logo } from '../Components';

const layout = () => {
   return (
      <div className="home">
         <Logo />
         <Button />
         <Filter />
         <Card />
         <CheckBox />
         <Footer />
      </div>
   );
};

export default layout;
