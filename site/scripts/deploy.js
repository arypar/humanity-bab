/**
 * Script to deploy the DonationContract to Sepolia testnet
 * 
 * Prerequisites:
 * 1. Install hardhat: npm install --save-dev hardhat
 * 2. Install ethers: npm install --save-dev ethers@5
 * 3. Set up a .env file with PRIVATE_KEY and SEPOLIA_URL variables
 * 
 * Usage:
 * 1. Configure hardhat.config.js to include Sepolia network
 * 2. Run: npx hardhat run scripts/deploy.js --network sepolia
 */

const hre = require("hardhat");

async function main() {
  console.log("Deploying DonationContract to Sepolia...");

  // Get the contract factory
  const DonationContract = await hre.ethers.getContractFactory("DonationContract");
  
  // Deploy the contract
  const donationContract = await DonationContract.deploy();
  
  // Wait for deployment to finish
  await donationContract.deployed();
  
  console.log(`DonationContract deployed to ${donationContract.address}`);
  console.log("----------------------------------------------------");
  console.log("Next steps:");
  console.log("1. Update DONATION_CONTRACT_ADDRESS in src/contracts/config.ts");
  console.log(`   with the address: ${donationContract.address}`);
  console.log("2. Update STARTING_BLOCK in the same file with the block");
  console.log("   number this contract was deployed at for efficient indexing");
  console.log("3. Verify the contract on Etherscan (optional):");
  console.log(`   npx hardhat verify --network sepolia ${donationContract.address}`);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 