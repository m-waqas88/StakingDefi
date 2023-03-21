require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");

module.exports = {

  solidity: "0.8.6",
  settings:{
    optimizer:{
      enabled:true,
      runs:200
    }
  },
  networks:{
    hardhat:{
      chainId:1337 // this id is for localhost
    },
    // goerli:{
    //   url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   chainId: 5,
    // },
    mumbai:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.MAIN_ACCOUNT],
      chainId: 80001,
    }
    // etherscan: {
    //   apiKey: {
    //     goerli: process.env.ETHERSCAN_API_KEY,
    //   },
    // },
  },
  gasReporter:{
    enabled:true,
    currency:"USD",
    coinmarketcap:"4403d20c-9317-44bd-ae14-eba31d8a9afc",
    token:"matic",
    outputFile:"gasReports.txt",
    noColors:true
  }
  }
