import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// internal import
import Style from './Card.module.css';
import images from '../Image/client/index';
import imagesNFT from '../Image/index';

const Card = ({ setNotification, image, index }) => (
   <div className={Style.card}>
      <div className={Style.content}>
         <a href={`/image/1`}>
            {/* <a href={`/image/${image.imageID}`}> */}
            <p>
               <Image
                  // src={image.image}
                  src={imagesNFT.img1}
                  alt="image"
                  className={Style.image}
                  width={250}
                  height={200}
               />
            </p>
         </a>
         <span className={Style.para}>
            <Image
               className="avatar_img"
               // src={images[`client${index + 1}`]}
               src={images[`client1`]}
               width={40}
               height={40}
               alt="avatar"
            />
            <small
               className={Style.para_small}
               onClick={() => (
                  setNotification('Copied'),
                  navigator.clipboard.writeText(image.owner)
               )}
            >
               {/* {image.owner.slice(0, 25)}... */}
               0x00000034asdcfwd3...
            </small>
         </span>
         <span>
            Sept 17 2023
            {/* CreatedAt:{new Date(image.createdAt * 1000).toDateString()} */}
            {/* <small className={Style.number}>#{image.imageID}</small> */}
            #1
         </span>
         <small className={Style.para}>
            {/* {image.description.slice(0, 80)}... */}
            description
         </small>
         <button
            onClick={() => (
               setNotification('Copied'),
               // navigator.clipboard.writeText(image.image)
               navigator.clipboard.writeText('')
            )}
            className={Style.btn}
         >
            Copy URL
         </button>
      </div>
   </div>
);

export default Card;
