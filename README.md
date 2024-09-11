# Stardust

Stardust is a MetaMask Snap application that integrates with the Constellation Network. This application allows users to interact with the Constellation Network directly from their MetaMask wallet.

## Prerequisites

- **MetaMask Flask**: This application requires MetaMask Flask, an experimental version of MetaMask that supports Snaps. You can download MetaMask Flask from [here](https://chrome.google.com/webstore/detail/metamask-flask/ljfoeinjpaedjfecbmggjgodbgkmjkjk).

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/dag-snap.git
   cd dag-snap
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

4. Load the Snap in MetaMask Flask:
   - Open MetaMask Flask.
   - Go to Settings > Snaps.
   - Click on "Load Unpacked Snap" and select the `dag-snap/packages/snap` directory.

## Usage

Once the Snap is loaded in MetaMask Flask, you can interact with the Constellation Network using the following endpoints:

### Endpoints

#### `getAccountAddress`

Returns the account address associated with the private key.

#### `getBalance`

Returns the balance of the account in DAG tokens.

#### `sendTransaction`

Sends a transaction to a specified address.

#### `getNetworkInfo`

Returns information about the Constellation Network.

#### `getTransactions`

Returns the list of transactions associated with the account.

#### `validateDagAddress`

Validates a given DAG address.

#### `getBalanceFor`

Returns the balance for a specified DAG address.

## Example Usage

To use these endpoints, you can send RPC requests from your dApp. Here is an example of how to call the `getBalance` endpoint:
