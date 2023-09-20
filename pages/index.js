import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// internal import
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

import { StateContext } from '../Context/NFTs';
import images from '../Components/Image/client/index';

const Home = () => {
   // state variable
   const {
      address,
      disconnect,
      contract,
      connect,
      userBalance,
      UploadImage,
      getUploadedImages,
      setLoading,
      loading,
      getAllNFTsAPI,
   } = useContext(StateContext);

   const [openProfile, setOpenProfile] = useState(false);
   const [closeForm, setCloseForm] = useState(true);
   const [file, setFile] = useState(null);
   const [display, setDisplay] = useState(null);
   const [notification, setNotification] = useState('');
   const [allImages, setAllImages] = useState([]);
   const [activeSelect, setActiveSelect] = useState('Old Images');
   const [imagesCopy, setImagesCopy] = useState([]);

   // get data
   const oldImages = [];

   const fetchImages = async () => {
      const images = await getUploadedImages();
      setAllImages(images);
      console.log(images);
      // api nfts
      const apiImages = await getAllNFTsAPI();
   };
   useEffect(() => {
      if (contract) fetchImages();
   }, [address, contract]);

   if (allImages.length == 0) {
      console.log('loading');
   } else {
      allImages.map((el) => oldImages.push(el));
   }
   console.log(allImages);

   // image data
   const [category, setCategory] = useState('');
   const [imageInfo, setImageInfo] = useState({
      title: '',
      description: '',
      email: '',
      category: '',
      image: '',
   });

   const handleFormFieldChange = (fieldName, e) => {
      setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
   };

   // upload image
   const handleSubmit = async (e) => {
      e.preventDefault();
      setCloseForm(false);
      setLoading(true);
      if (file) {
         try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios({
               method: 'post',
               url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
               data: formData,
               headers: {
                  pinata_api_key: `5215a74e525dd12d8c6b`,
                  pinata_secret_api_key: `
53d90e51f58691609de847f314ef402705e2a6851474817089ea9dcb2862a90b`,
                  'Content-Type': 'multipart/form-data',
               },
            });
            console.log(res, 'response');
            const image = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
            await UploadImage({
               ...imageInfo,
               image: image,
               category: category,
            });
            console.log(image, 'image');
            setFile(null);
         } catch (error) {
            console.log(error);
         }
      }
      setFile(null);
      setLoading(false);
   };

   const retrieveFile = (e) => {
      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
         setFile(e.target.files[0]);
      };
      e.preventDefault();
   };

   // display image to ui
   const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
         setDisplay(URL.createObjectURL(event.target.files[0]));
      }
   };

   return (
      <div className="home">
         <Header
            notification={notification}
            setNotification={setNotification}
         />
         <div className="header">
            <h1>Create 1000 NFTs for Free</h1>
         </div>

         <div className="upload">
            <Upload
               onImageChange={onImageChange}
               display={display}
               address={address}
               retrieveFile={retrieveFile}
            />

            <div className="upload-info">
               <h1>Welcome to NFTs IPFS Upload</h1>
               <p>Our product help you securely distribute any type of media</p>
               <div className="avatar">
                  <Button
                     address={address}
                     disconnect={disconnect}
                     connect={connect}
                     file={file}
                  />
                  {address && (
                     <p>
                        <Image
                           className="avatar_img"
                           alt="images"
                           src={images.client1}
                           width={40}
                           height={40}
                           onClick={() => setOpenProfile(true)}
                        />
                     </p>
                  )}
               </div>
            </div>
         </div>
         <h1 className="subheading">All Nfts in Marketplace</h1>
         {/* card */}
         {allImages.length == 0 ? (
            <Logo />
         ) : allImages == undefined ? (
            <h1>No Image</h1>
         ) : (
            <>
               <Filter
                  setImagesCopy={setImagesCopy}
                  imagesCopy={imagesCopy}
                  setAllImages={setAllImages}
                  allImages={allImages}
                  oldImages={oldImages}
                  activeSelect={activeSelect}
                  setActiveSelect={setActiveSelect}
               />
               <div className="card">
                  {allImages.map((image, i) => {
                     <Card
                        key={i + 1}
                        index={i}
                        image={image}
                        setNotification={setNotification}
                     />;
                  })}
               </div>
            </>
         )}
         <Footer />
         {/* notification */}
         {notification != '' && (
            <Notification
               notification={notification}
               setNotification={setNotification}
            />
         )}
         {/* Profile */}
         {openProfile && (
            <div className="profile">
               <Profile
                  setOpenProfile={setOpenProfile}
                  userBalance={userBalance}
                  address={address}
               />
            </div>
         )}
         {/* loader */}
         {loading && (
            <div className="loader">
               <Logo />
            </div>
         )}
         {/* form */}
         {file && closeForm && (
            <div className="form">
               <div className="form_inner">
                  <Form
                     setFile={setFile}
                     setDisplay={setDisplay}
                     handleFormFieldChange={handleFormFieldChange}
                     handleSubmit={handleSubmit}
                     setCategory={setCategory}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default Home;
