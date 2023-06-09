echo [Connect to newtwork]
npx hardhat clean

echo [Compile the contract]
npx hardhat compile

echo [Run scripts deployRobotPunksNFT into the rinkeby network]
npx hardhat run scripts/deployRobotPunksNFT.js --network rinkeby

echo ["Add the address contract"]
read contractAddress
if [ ${contractAddress}]; then
  echo [run verify contract]
  npx hardhat verify --network rinkeby $contractAddress
fi

