const hre = require('hardhat');
const airnodeAdmin = require('@api3/airnode-admin');
const { getApi } = require('../scripts/apis.js');

module.exports = async () => {
  const apiData = getApi(hre.network);
  const account = (await hre.ethers.getSigners())[0];
  const Lottery = await hre.deployments.get('Lottery');
  const lottery = new hre.ethers.Contract(Lottery.address, Lottery.abi, account);

  // We are deriving the sponsor wallet address from the lottery contract address
  // using the @api3/airnode-admin SDK. You can also do this using the CLI
  // https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html
  // Visit our docs to learn more about sponsors and sponsor wallets
  // https://docs.api3.org/airnode/latest/concepts/sponsor.html
  const sponsorWalletAddress = await airnodeAdmin.deriveSponsorWalletAddress(
    apiData.xpub,
    apiData.airnode,
    lottery.address
  );

  // Set the parameters that will be used to make Airnode requests
  const receipt = await lottery.setRequestParameters(
    apiData.airnode,
    apiData.endpointIdUint256,
    sponsorWalletAddress
  );
  console.log('Setting request parameters...');
  await new Promise((resolve) =>
    hre.ethers.provider.once(receipt.hash, () => {
      resolve();
    })
  );
  console.log('Request parameters set');
};
module.exports.tags = ['setup'];