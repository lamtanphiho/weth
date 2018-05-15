const ethTx     = require('ethereumjs-tx');
const WethAbi   = require('./lib/contract/Weth_ABI.json');
let Web3;
let contractAddress;
let ownerAddress;
let contract;
module.exports = {
    config: (config) => {
        Web3 = config.web3;
        contractAddress = config.contractAddress;
        ownerAddress = config.ownerAddress;
        contract        = new Web3.eth.Contract(WethAbi, contractAddress, {
            from: ownerAddress
        });
    },
    withdraw: (from, privateKeyUser, amount) => {
        let rawTransaction;
        const amountTransfer    = amount * 1e18;
        const amountTransferHex = '0x' + amountTransfer.toString(16);
        const privKey           = Buffer.from(privateKeyUser, 'hex');
        return Web3.eth.getTransactionCount(from).then(nonce => {
            rawTransaction = {
                'from'    : from,
                'nonce'   : '0x' + nonce.toString(16),
                'gasPrice': Web3.utils.toHex(2 * 1e9),
                'gasLimit': Web3.utils.toHex(3000000),
                'to'      : contractAddress,
                'data'    : contract.methods.withdraw(amountTransferHex).encodeABI()
            };
            const tx                    = new ethTx(rawTransaction);
            tx.sign(privKey);
            const serializedTx          = tx.serialize();
            return Web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', (transactionHash) => {
                console.info('transactionHash: ', transactionHash);
            });
        });
    },

    deposit: (from, privateKeyUser, amount) => {
        let rawTransaction;
        const amountTransfer = amount * 1e18;
        const amountTransferHex = '0x' + amountTransfer.toString(16);
        const privKey           = Buffer.from(privateKeyUser, 'hex');
        return Web3.eth.getTransactionCount(from).then(nonce => {
            rawTransaction = {
                'from'    : from,
                'nonce'   : '0x' + nonce.toString(16),
                'gasPrice': Web3.utils.toHex(2 * 1e9),
                'gasLimit': Web3.utils.toHex(3000000),
                'to'      : contractAddress,
                'value'   : amountTransferHex,
                'data'    : contract.methods.deposit().encodeABI()
            };
            const tx                    = new ethTx(rawTransaction);
            tx.sign(privKey);
            const serializedTx          = tx.serialize();
            return Web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', (transactionHash) => {
                console.info('transactionHash: ', transactionHash);
            });
        });
    }
}