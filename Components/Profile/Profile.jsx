import React from 'react';

// internal import
import { Twitter, Instagram, GitHub, FormSVG } from '../SVG';
import Style from './Profile.module.css';
import images from '../Image/client/index';
import Image from 'next/image';

const Profile = ({ setOpenProfile, userBalance, address }) => {
   return (
      <>
         <div className={Style.card}>
            <div className={Style.img}>
               <Image
                  className="avatar_img"
                  src={images.client1}
                  width={80}
                  height={80}
                  onClick={() => setOpenProfile(true)}
               />
            </div>
            {/* <span>{address.slice(0, 25)}</span> */}
            <span>0x467rygjbhvjhv...</span>
            <p className={Style.info}>
               {userBalance} Welcome to NFTs IPFS Upload Our products help you
               securely distribute your media.
            </p>
            <div className={Style.share}>
               <a href="">
                  <GitHub />
               </a>
               <a href="">
                  <Instagram />
               </a>
               <a href="">
                  <Twitter />
               </a>
            </div>
            <button onClick={() => setOpenProfile(false)}>Close</button>
         </div>
      </>
   );
};

export default Profile;
