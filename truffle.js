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
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const version = require('./package.json').version;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'scr', 'contracts'),
  authors: [
    'Moritz Schmitz von Hülst <m.schmitzvonhuelst@gmail.com>'
  ],
  version,
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_URL);
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
