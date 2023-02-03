import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const App = () => {
  const [ensName, setENSName] = useState('');
  const [address, setAddress] = useState('');
  const [ethBalance, setETHBalance] = useState(0);
  const [tokenBalances, setTokenBalances] = useState({});

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    const resolveENSName = async () => {
      const resolvedAddress = await web3.eth.ens.getAddress(ensName);
      setAddress(resolvedAddress);
    };

    const getETHBalance = async () => {
      const balance = await web3.eth.getBalance(address);
      setETHBalance(balance);
    };

    const getTokenBalances = async () => {
      // Example of getting the balance of one token (in this case, Dai)
      const Dai = new web3.eth.Contract(
        [{...}],
        '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      );
      const daiBalance = await Dai.methods.balanceOf(address).call();
      setTokenBalances({
        ...tokenBalances,
        Dai: daiBalance
      });
    };

    resolveENSName();
    getETHBalance();
    getTokenBalances();
  }, [ensName]);

  return (
    <div>
      <input type="text" onChange={(e) => setENSName(e.target.value)} />
      <p>Address: {address}</p>
      <p>ETH balance: {ethBalance}</p>
      <p>Token balances:</p>
      <ul>
        {Object.keys(tokenBalances).map((token) => (
          <li key={token}>
            {token}: {tokenBalances[token]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
