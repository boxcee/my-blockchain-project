/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require('dotenv').config();
const Web3 = require('web3');
const version = require('./package.json').version;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: './output',
  authors: [
    'Moritz Schmitz von Hülst <m.schmitzvonhuelst@gmail.com>'
  ],
  version,
  networks: {
    rinkeby: {
      from: process.env.PRIVATE_ADDRESS,
      provider: function() {
        return new Web3.providers.HttpProvider(process.env.INFURA_URL);
      },
      network_id: '*'
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    }
  }
};
