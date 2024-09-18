const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Dinar.sol/Dinar.json");

const tokenAddress = "0xE59F3299AeFD2bB0708d993AeCFbd16c0c10cfC7"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x2eaAa794e50445c8071C92bB0d6298A36Bf879Fc";

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have a total number of: " + await token.balanceOf(walletAddress) + " tokens in the wallet.");
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
