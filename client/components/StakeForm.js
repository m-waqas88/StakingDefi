import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

function StakeForm() {
  const stakingAddress = "0x3CA7fD0Dc3BfF58Db9723d677e4Ed999eC69FD68";
  const tesTokenAddress = "0x0afEf5962E9Cc7A5254609310eDfE103f02810a2";

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };

  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    // await tx.wait(0);
    console.log('Stake transaction complete');
  }

  return (
    <div className='text-black w-[400px]'>
      <Form
        onSubmit={handleStakeSubmit}
        data={[
          {
            inputWidth: '50%',
            name: 'Amount to stake ',
            type: 'number',
            value: '',
            key: 'amountToStake'
          }
        ]}
        title="Stake Now!"
      ></Form>
    </div>
  );
}

export default StakeForm;