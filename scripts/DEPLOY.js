const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFT = await hre.ethers.getContractFactory("Dinar");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT contract deployed to the address: ", nft.address);
  if (!fs.existsSync("metadata")) {
    fs.mkdirSync("metadata");
  }

  fs.writeFileSync(
    "metadata/contractAddress.js",
    `
    export const nftAddress = "${nft.address}"
    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
