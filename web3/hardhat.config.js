/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY =
   '1f1aec904899569d60605bfdb13428c689bdce679f31a72ea4c8a13ea5d31cf7';
const RPC_URL = 'https://rpc.ankr.com/polygon_mumbai';
module.exports = {
   defaultNetwork: 'polygon_mumbai',
   networks: {
      hardhat: {
         chainId: 80001,
      },
      polygon_mumbai: {
         url: 'https://rpc.ankr.com/polygon_mumbai',
         accounts: [`0x${PRIVATE_KEY}`],
      },
   },
   solidity: {
      version: '0.8.9',
      settings: {
         optimizer: {
            enabled: true,
            runs: 200,
         },
      },
   },
};
