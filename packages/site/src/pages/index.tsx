import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from '../components';
import { defaultSnapOrigin } from '../config';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleGetAccountAddressClick = async () => {
    await invokeSnap({ method: 'getAccountAddress' });
  };

  const handleGetBalanceClick = async () => {
    await invokeSnap({ method: 'getBalance' });
  };

  const handleSendTransactionClick = async () => {
    await invokeSnap({ method: 'sendTransaction' });
  };

  const handleGetNetworkInfoClick = async () => {
    await invokeSnap({ method: 'getNetworkInfo' });
  };

  const handleGetTransactionsClick = async () => {
    await invokeSnap({ method: 'getTransactions' });
  };

  const handleValidateDagAddressClick = async () => {
    const dagAddress = prompt('Please enter the DAG address:');
    if (dagAddress) {
      await invokeSnap({
        method: 'validateDagAddress',
        params: { address: dagAddress.toString() },
      });
    }
  };

  const handleGetBalanceForClick = async () => {
    const dagAddress = prompt('Please enter the DAG address:');
    if (dagAddress) {
      await invokeSnap({
        method: 'getBalanceFor',
      });
    }
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>Stardust</Span>
      </Heading>
      <Subtitle>
        Stardust is a MetaMask Snap that allows you to interact with the
        Constellation network.
      </Subtitle>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the Stardust snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={requestSnap}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Get Account Address',
            description: 'Get the account address of the connected user.',
            button: (
              <SendHelloButton
                onClick={handleGetAccountAddressClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Get Balance',
            description: 'Retrieve the balance of your account.',
            button: (
              <button onClick={handleGetBalanceClick} disabled={!installedSnap}>
                Get Balance
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Card
          content={{
            title: 'Get Network Info',
            description: 'Retrieve information about the network.',
            button: (
              <button
                onClick={handleGetNetworkInfoClick}
                disabled={!installedSnap}
              >
                Get Network Info
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Card
          content={{
            title: 'Get Transactions',
            description: 'Retrieve transactions from the network.',
            button: (
              <button
                onClick={handleGetTransactionsClick}
                disabled={!installedSnap}
              >
                Get Transactions
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Card
          content={{
            title: 'Validate DAG Address',
            description: 'Validate a DAG address.',
            button: (
              <button
                onClick={handleValidateDagAddressClick}
                disabled={!installedSnap}
              >
                Validate DAG Address
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Card
          content={{
            title: 'Get Balance For',
            description: 'Get the balance for a DAG address.',
            button: (
              <button
                onClick={handleGetBalanceForClick}
                disabled={!installedSnap}
              >
                Get Balance For
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Card
          content={{
            title: 'Send Transaction',
            description: 'Send a transaction to the network.',
            button: (
              <button
                onClick={handleSendTransactionClick}
                disabled={!installedSnap}
              >
                Send Transaction
              </button>
            ),
          }}
          disabled={!installedSnap}
        />
        <Notice>
          Designed with ❤️ by{' '}
          <a href="https://metagraph.devpost.com">
            Constellation Metagraph Hackathon 2024
          </a>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
