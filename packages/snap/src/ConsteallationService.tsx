import { dag4 } from '@stardust-collective/dag4';
import { dagDi } from '@stardust-collective/dag4-core';
import {
  GlobalDagNetwork,
  DagNetwork,
} from '@stardust-collective/dag4-network';

let currentInstance: ConstellationService;

export class ConstellationService {
  private network: DagNetwork | GlobalDagNetwork;

  constructor() {
    dag4.account.connect(
      {
        id: 'integration2',
        networkVersion: '2.0',
        beUrl: 'https://be-integrationnet.constellationnetwork.io',
        l0Url: 'https://l0-lb-integrationnet.constellationnetwork.io',
        l1Url: 'https://l1-lb-integrationnet.constellationnetwork.io',
      },
      false,
    );
    dagDi.useFetchHttpClient(fetch);
    this.getAccountAddress();
    this.network = new DagNetwork({
      id: 'integration2',
      networkVersion: '2.0',
      beUrl: 'https://be-integrationnet.constellationnetwork.io',
      l0Url: 'https://l0-lb-integrationnet.constellationnetwork.io',
      l1Url: 'https://l1-lb-integrationnet.constellationnetwork.io',
    });
  }

  static getInstance(): ConstellationService {
    if (!currentInstance) {
      currentInstance = new ConstellationService();
    }
    return currentInstance;
  }

  async getAccountAddress(): Promise<string> {
    const pk =
      '79168496c4383297a0758c64c5a187e148ad4d164450a5518ee70667a314cd94'; //Test account
    dag4.account.loginPrivateKey(pk);
    return dag4.account.address;
  }

  async getBalance(): Promise<any> {
    const pk = await this.getAccountAddress();
    const result = await dag4.network.getAddressBalance(pk);
    return result;
  }

  async sendTransaction(): Promise<any> {
    const pk =
      '79168496c4383297a0758c64c5a187e148ad4d164450a5518ee70667a314cd94'; //Test account
    dag4.account.loginPrivateKey(pk);
    const transfer = await dag4.account.transferDag(
      'DAG1DsoPpNgnY9D6CUurDQUgvqsD6oxikuSgv7XV',
      25.551,
      0,
      false,
    );
    return transfer.hash;
  }

  async getNetworkInfo(): Promise<any> {
    const info = dag4.network.getNetwork();
    return info;
  }

  async getTransactions(limit?: number, searchAfter?: string) {
    return this.network.getTransactionsByAddress(
      'DAG1DsoPpNgnY9D6CUurDQUgvqsD6oxikuSgv7XV', //Test account
    );
  }

  async validateDagAddress(address: string) {
    return dag4.keyStore.validateDagAddress(address);
  }

  async getBalanceFor(address: string) {
    const addressObj = await this.network.getAddressBalance(address);
    return addressObj;
  }

}
