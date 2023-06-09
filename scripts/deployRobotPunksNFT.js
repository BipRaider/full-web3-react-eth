const hre = require('hardhat');

async function main() {
  // Get contract.
  const RobotsPunksNFT = await hre.getContractFactory('RobotPunksNFT');
  /*** Init the `RobotsPunksNFT` contract.
   * @method `deploy()` Passing arguments to the contract constructor.
   */
  const dep = await RobotsPunksNFT.deploy();
  // deployed the contract to network
  await dep.deployed();

  console.log('The deployed to', dep.address);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
