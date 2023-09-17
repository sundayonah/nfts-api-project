import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import {
   useAddress,
   useContract,
   useMetamask,
   useDisconnect,
   useSigner,
} from '@thirdweb-dev/react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
   const { contract } = useContract(
      '0x29c6Cd6d269F5CB422eB21B8D7b636384Bc66123'
   );

   const address = useAddress();
   const connect = useMetamask();

   // frontend
   const disconnect = useDisconnect();
   const signer = useSigner();
   const [userBalance, setUserBalance] = useState();
   const [loading, setLoading] = useState(false);

   const fetchData = async () => {
      try {
         const balance = await signer?.getBalance();
         const userBalance = address
            ? ethers.utils.formatEther(balance?.toString())
            : '';
         setUserBalance(userBalance);
         console.log(userBalance);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      fetchData();
   }, []);

   // contract function // ---upload
   const UploadImage = async (imageInfo) => {
      const { title, description, email, category, image } = imageInfo;
      try {
         // charge
         const listPrice = await contract.call('listingPrice');

         const createNFTs = await contract.call(
            'uploadIPFS',
            [address, image, title, description, email, category],
            { value: listPrice.toString() }
         );

         // api  call
         const res = await axios({
            methos: 'POST',
            url: `/api/v1/NFTs`,
            data: {
               title: title,
               description: description,
               category: category,
               image: image,
               address: address,
               email: email,
            },
         });
         console.log(res);
         console.info('contract call success', createNFTs);
      } catch (error) {
         console.error('contract call failure,', error);
      }
   };

   // get contract data
   const getUploadedImages = async () => {
      // All Images
      const images = await contract.call('getAllNFTs');

      // total upload
      const totalUpload = await contract.call('imagesCount');

      // listing Price
      const listingPrice = await contract.call('listingPrice');
      const allImages = images.map((images, i) => {
         const { creator, title, description, email, image } = images;
         owner: creator;
         title: title;
         description: description;
         email: email;
         category: category;
         fundraised: fundraised;
         image: image;
         imageId: id.toNumber();
         createdAt: timestamp.toNumber();
         listedAmount: ethers.utils.formatEther(listingPrice.toString()); //
         totalUpload: totalUpload.toNumber(); //
      });
      return allImages;
   };

   //get single image
   const singleImage = async (id) => {
      try {
         const data = await contract.call('getImage');
         console.log(data);

         const image = {
            title: data[0],
            description: data[1],
            email: data[2],
            category: data[3],
            fundRaised: ethers.utils.formatEther(data[4].toString()),
            creator: data[5],
            imageURL: data[6],
            createdAt: data[7].toNumber(),
            imageId: data[8].toNumber(),
         };
         return image;
      } catch (error) {
         console.log(error);
      }
   };

   //donate
   const donateFund = async ({ amount, id }) => {
      try {
         const tx = await contract.call('donateToImage', [id], {
            value: amount.toString(),
         });
         console.log(tx);
         window.location.reload();
      } catch (error) {
         console.log(error);
      }
   };

   // get api data
   const getAllNFTsAPI = async () => {
      const res = await axios({
         method: 'GET',
         url: '/api/v1/NFTs',
      });
      console.log(res);
   };

   // single NFTs API
   const getSingleNftsAPI = async (id) => {
      const res = await axios({
         method: 'GET',
         url: `/api/v1/NFTs${id}`,
      });
      console.log(res);
   };

   return (
      <StateContext.Provider
         value={{
            // contract
            address,
            contract,
            connect,
            disconnect,
            userBalance,
            setLoading,
            loading,
            // function
            UploadImage,
            getUploadedImages,
            donateFund,
            singleImage,
            // API
            getAllNFTsAPI,
            getSingleNftsAPI,
         }}
      >
         {children}
      </StateContext.Provider>
   );
};
