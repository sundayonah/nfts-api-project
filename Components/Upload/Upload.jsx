import React from 'react';
import Image from 'next/image';

// internal import
import { Delete, UploadIcon, File } from '../SVG/index';
import Style from './Upload.module.css';

const Upload = ({ onImageChange, display, retrieveFile }) => {
   return (
      <div className={Style.container}>
         <div className={Style.header}>
            {display == null ? (
               <>
                  <UploadIcon />
                  <p>Browse File to upload</p>
               </>
            ) : (
               <p>
                  <Image
                     className={Style.image}
                     src={display}
                     alt="image"
                     width={200}
                     height={200}
                  />
               </p>
            )}
         </div>
         <label for="file" className={Style.footer}>
            <File />
            <p>Not selected file</p>
            <Delete />
            <input
               id="file"
               onChange={(e) => (onImageChange(e), retrieveFile(e))}
               className={Style.file}
               type="file"
            />
         </label>
      </div>
   );
};

export default Upload;
