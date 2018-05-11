let Web3;
module.exports = {
    config: (web3) => {
        Web3 = web3;
    },
    withdraw: (from, privateKeyUser, amount) => {
        let rawTransaction;
        const amountTransfer = amount * 1e18;
        const privKey         = Buffer.from(privateKeyUser, 'hex');
        return Web3.eth.getTransactionCount(from).then(nonce => {
            rawTransaction = {
                'from'    : from,
                'nonce'   : '0x' + nonce.toString(16),
                'gasPrice': Web3.utils.toHex(3 * 1e9),
                'gasLimit': Web3.utils.toHex(3000000),
                'to'      : contractAddress,
                'data'    : contract.methods.withdraw('0x' + amountTransfer.toString(16)).encodeABI()
            };
        const tx                    = new ethTx(rawTransaction);
        tx.sign(privKey);
        const serializedTx          = tx.serialize();
        return Web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', (transactionHash) => {
            console.info(transactionHash);
        }).on('receipt', (receipt) => {
                console.info(receipt);
        }).on('error', (err) => {
                console.info(err);
        });
        }).catch(err => {
                console.log(err);
        });
    },

    deposit: (from, privateKeyUser, amount) => {
        let rawTransaction;
        const amountTransfer = amount * 1e18;
        console.log(from);
        return Web3.eth.getTransactionCount(from).then(nonce => {
            rawTransaction = {
                'from'    : from,
                'nonce'   : '0x' + nonce.toString(16),
                'gasPrice': Web3.utils.toHex(3 * 1e9),
                'gasLimit': Web3.utils.toHex(3000000),
                'to'      : contractAddress,
                'value'   : '0x' + amountTransfer.toString(16),
                'data'    : contract.methods.deposit().encodeABI()
            };
        const tx                    = new ethTx(rawTransaction);
        tx.sign(privKey);
        const serializedTx          = tx.serialize();
        return Web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', (transactionHash) => {
            console.info(transactionHash);
        }).on('receipt', (receipt) => {
                console.info(receipt);
        }).on('error', (err) => {
                console.info(err);
        });
        }).catch(err => {
                console.log(err);
        });
    }
}