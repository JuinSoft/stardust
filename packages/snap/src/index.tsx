import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold, Heading } from '@metamask/snaps-sdk/jsx';
import { ConstellationService } from './ConsteallationService';

const constellationService = ConstellationService.getInstance();

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'getAccountAddress':
      const pk = await constellationService.getAccountAddress();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Account Address: <Bold>{pk}</Bold>
              </Text>
            </Box>
          ),
        },
      });
    case 'getBalance':
      let balance = await constellationService.getBalance();
      balance = parseFloat((balance.balance * 1e-8).toFixed(8));
      console.log('balance', balance);
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Your balance is: <Bold>{balance.toString()} DAG</Bold>
              </Text>
            </Box>
          ),
        },
      });
    case 'sendTransaction':
      const transactionResult = await constellationService.sendTransaction();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Transaction result: <Bold>{transactionResult}</Bold>
              </Text>
            </Box>
          ),
        },
      });
    case 'getNetworkInfo':
      let networkInfo = await constellationService.getNetworkInfo();
      if(!networkInfo.id){
        networkInfo = 'testnet'
      }
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Network info: <Bold>{networkInfo}</Bold>
              </Text>
            </Box>
          ),
        },
      });

    case 'getTransactions':
      const transactions = await constellationService.getTransactions();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Transactions: <Bold>{JSON.stringify(transactions)}</Bold>
              </Text>
            </Box>
          ),
        },
      });

    case 'validateDagAddress':
      let address = request.params.address;
      const isValid = await constellationService.validateDagAddress(address);
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Address is valid: <Bold>{isValid.toString()}</Bold>
              </Text>
            </Box>
          ),
        },
      });

    case 'getBalanceFor':
      //address = request.params.address;
      const balance = await constellationService.getBalanceFor("DAG5Aqr2rHQZ9CmY8HPpciFr6AGXmxUq7fsGzuKX");
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Balance: <Bold>{balance.balance.toString()}</Bold>
              </Text>
            </Box>
          ),
        },
      });

    default:
      throw new Error('Method not found.');
  }
};
