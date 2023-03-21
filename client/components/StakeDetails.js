import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { FaTrophy, FaMoneyBillAlt } from 'react-icons/fa'

function StakeDetails() {
  const { account, isWeb3Enabled } = useMoralis();
  const [rtBalance, setRtBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedBalance, setEarnedBalance] = useState('0');

  const stakingAddress = "0x3CA7fD0Dc3BfF58Db9723d677e4Ed999eC69FD68";
  const rewardTokenAddress = "0x0afEf5962E9Cc7A5254609310eDfE103f02810a2";

  const { runContractFunction: getRTBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: rewardTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'getStaked',
    params: {
      account
    }
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'earned',
    params: {
      account
    }
  });

  const { runContractFunction: claimEarnedReward } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'claimReward',
  });

  const { runContractFunction: withdrawTokens } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'withdraw',
    params: {
      
    }
  });

  const claimReward = async (e) => {
    e.preventDefault();
    console.log("Executing tx ....");
    const tx = await claimEarnedReward({ onError: (error) => console.log(error) });
    // await tx.wait(0);
    console.log("Tx executed");
  }

  const withdraw = async (e) => {
    e.preventDefault();
    console.log("Executing tx ....");
    const tx = await claimEarnedReward({ onError: (error) => console.log(error) });
    // await tx.wait(0);
    console.log("Tx executed");
  }



  useEffect(() => {
    async function updateUiValues() {
      const rtBalance = (await getRTBalance({ onError: (error) => console.log(error) })).toString();
      const formattedRtBalance = parseFloat(rtBalance) / 1e18;
      const formattedRtBalaceRounded = formattedRtBalance.toFixed(2);
      setRtBalance(formattedRtBalaceRounded);

      const stakedBalace = (await getStakedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedStakedBalance = parseFloat(stakedBalace) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance.toFixed(2);
      setStakedBalance(formattedStakedBalanceRounded);

      const earnedBalance = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedEarnedBalance = parseFloat(earnedBalance/1e18);
      const formattedEarnedBalanceRounded = formattedEarnedBalance.toFixed(15);
      setEarnedBalance(formattedEarnedBalanceRounded);
    }

    if (isWeb3Enabled) updateUiValues();
  
}, [account, stakedBalance, earnedBalance, getEarnedBalance, getRTBalance, getStakedBalance, isWeb3Enabled]);
return (
    <div className='p-3'>
      <div className='font-bold m-2'>RT Balance is: {rtBalance}</div>
      <div className='font-bold m-2'>Earned Balance is: {earnedBalance}</div>
      <div className='font-bold m-2'>Staked Balance is: {stakedBalance}</div>
      <button 
        className='font-bold m-2 flex items-center rounded-lg py-1 px-2 bg-[#f2f6ff]'
        onClick={claimReward}
      > Claim Reward <FaTrophy className="ml-2" /></button>
    </div>
  );
}

export default StakeDetails;