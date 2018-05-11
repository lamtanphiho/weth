# weth
call w-eth's smart contract 


## Super simple to use

Require and config: 

```js
const Weth = require('weth');
Weth.config({
    web3: web3, // your web3,
    contractAddress: contractAddress// weth's contract address
});

```

## withdraw

UNWRAP WETH to ETH: 

```js
Weth.withdraw(address, privateKeyAddress, amount);
```

## deposit

WRAP ETH to WETH: 

```js
Weth.deposit(address, privateKeyAddress, amount);
```