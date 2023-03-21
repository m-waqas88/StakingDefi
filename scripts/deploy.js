const{ethers} =require("hardhat");

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();

  console.log("RewardToken contract deployed to:", rewardToken.address);

  const Staking = await ethers.getContractFactory("staking");
  const staking = await Staking.deploy(rewardToken.address, rewardToken.address);
  await staking.deployed();

  console.log("Staking contract deployed to:", staking.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// RewardToken contract deployed to: 0x0afEf5962E9Cc7A5254609310eDfE103f02810a2
// Staking contract deployed to: 0x3CA7fD0Dc3BfF58Db9723d677e4Ed999eC69FD68