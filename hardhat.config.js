require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config(); // To use environment variables from a .env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    amoy: {
      url: "https://polygon-amoy.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY].filter(Boolean), // Ensures the PRIVATE_KEY is defined
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [process.env.PRIVATE_KEY].filter(Boolean), // Ensures the PRIVATE_KEY is defined
    },
  },
};
