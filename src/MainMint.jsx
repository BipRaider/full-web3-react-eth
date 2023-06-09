import React, { useState } from 'react';
// should be version ethers@5.7.1
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Text, Input } from '@chakra-ui/react';

// The data about contract.
import robotPunks from './RobotPunksNFT.json';
// The address of the contract.
const robotPunksAddress = '0x50.....................';

const MainMint = ({ accounts }) => {
  const isConnect = Boolean(accounts[0]);
  const [mintAmount, setMintAmount] = useState(1);

  const handleMint = async () => {
    // The MetaMask inject into window the ethereum property.
    if (window.ethereum) {
      // Create new provider for connect to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // get sigher form the ether network
      const signer = provider.getSigner();
      // Create new contract
      const contract = new ethers.Contract(robotPunksAddress, robotPunks.adi, signer);
      try {
        // Makes query to the RobotPunksNFT contract and inside call the mint func
        const response = contract.mint(BigNumber.form(mintAmount), {
          // Setting the amount of payment by the contract.
          value: ethers.utils.parseEther(0.02 * mintAmount).toString(),
        });
        console.dir(response);
      } catch (error) {
        console.dir(error);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount < 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify={'center'} align={'center'} height={'100vh'} paddingBottom={'130px'}>
      <Box width={'520px'}>
        <Text fontSize={'48px'} textShadow={'0px 5px #000000'}>
          RobotPunks
        </Text>
        {isConnect ? (
          <Flex justify={'space-around'} align={'center'} padding={'30px'}>
            <Flex justify={'space-around'} align={'center'} padding={'30px'}>
              <Button
                backgroundColor={'#D6517D'}
                boxShadow={'0px 2px 2px 1px #0F0F0F'}
                borderRadius={'5px'}
                color={'white'}
                cursor={'pointer'}
                fontFamily={'inherit'}
                padding={'15px'}
                margin={'0 15px'}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                width={'100px'}
                height={'40px'}
                textAlign={'center'}
                fontFamily={'inherit'}
                boxShadow={'0px 2px 2px 1px #0F0F0F'}
                paddingLeft={'19px'}
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor={'#D6517D'}
                boxShadow={'0px 2px 2px 1px #0F0F0F'}
                borderRadius={'5px'}
                color={'white'}
                cursor={'pointer'}
                fontFamily={'inherit'}
                padding={'15px'}
                margin={'0 15px'}
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor={'#D6517D'}
              boxShadow={'0px 2px 2px 1px #0F0F0F'}
              borderRadius={'5px'}
              color={'white'}
              cursor={'pointer'}
              fontFamily={'inherit'}
              padding={'15px'}
              margin={'0 15px'}
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </Flex>
        ) : (
          <p>You must be connected to Mint</p>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
