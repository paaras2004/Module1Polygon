
const { ethers } = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/Dinar.sol/Dinar.json");
require("dotenv").config();
const tokenABI = tokenContractJSON.abi;


async function main() {
  
  const networkAddress =
    "https://ethereum-sepolia-rpc.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);

 
  const [signer] = await ethers.getSigners();


  const NFT = await ethers.getContractFactory("Dinar");
  const nft = await NFT.attach("0xE59F3299AeFD2bB0708d993AeCFbd16c0c10cfC7");


  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(fxRootContractABI, fxRootAddress);

 
  const tokenIds = [1, 2, 3, 4, 5];


  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");


  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x6566");


    await depositTx.wait();
  }
  console.log("Approved and deposited to the destination address");

  const balance = await nft.balanceOf(wallet.address);


  console.log("Current NFT wallet balance", wallet.address,"is: ", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });