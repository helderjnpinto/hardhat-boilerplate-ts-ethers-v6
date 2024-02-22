# Dev

## Configurations

### Basic overview of configuration

Every configuration load is initially set with default values from the module config, specified in the file `config/default.js`.

When setting the NODE_ENV or NODE_CONFIG_ENV, the target environment configuration file will override the default.js settings. By default, it is configured for testing in the local environment of the Hardhat network and development settings.

For example, to override and configure for the Tenderly fork of the network, set the environment variable `NODE_CONFIG_ENV=tenderly-polygon`.

This will load the configuration file config/tenderly-polygon.js, and all configurations will be merged, with the settings in this last file taking precedence.

Finally, if there is an existing .env file with custom-environment-variables specific to the tenderly configuration, these will prevail in the loaded configuration.

You can add .env for default as override settings or multiple .env. + "network name of hardhat || config/config file name". eg. .env.polygon, .env.tenderly, etc.

> Reminder: This is automatically change the configuration and env selection by only set NODE_CONFIG_ENV, If you got some zsh plugin like dotenv need to be disable for this project due a conflict of dotenv npm loading custom envs like env.xxx.

The custom environment name should be set like on this example:

```ts
network: {
    chainId: "NETWORK_CHAIN_ID",
    url: "NETWORK_URL",
    forking: {
        url: "NETWORK_FORKING_URL",
        blockNumber: "NETWORK_FORKING_BLOCK_NUMBER",
    },
}
```

The name of properties chained with "\_" network.chainId -> NETWORK_CHAIN_ID.

This architecture provides flexibility for developers to seamlessly manage and override configurations based on their specific needs and environments.

> The configuration is set not by dev, staging, production normally environments but by network name and variations if is the same network (config/network_name.js).
> This is because of existence of multiple configurations for same purpose eg. (production for polygon, ethereum, etc).

### Accounts

- `ACCOUNTS_MNEMONIC`: Change the default mnemonic used for testing on any network (should be changed in case of dev/staging/production environments).

### Network

- `NETWORK_URL`: Set the JSON RPC server to be used for deployment/testing (defaults to '').

Only used for Hardhat forking/testing purposes:

- `NETWORK_CHAIN_ID`: Sets the chain network ID; should be the same as `TENDERLY_FORK_NETWORK` (defaults to Polygon ID '123').
- `NETWORK_FORKING_URL`: Set the JSON RPC server to be used for deployment/testing.
- `NETWORK_FORKING_BLOCK_NUMBER`: Set the default forking block number (defaults to '47537432').

Note: For testing, all whale accounts and tests are conducted on Polygon; tests will not work on other networks.

### Tenderly

- `TENDERLY_PROJECT`: The Tenderly project in use (defaults to 'proj name').
- `TENDERLY_USERNAME`: The username of the Tenderly account; for verification purposes, the project name should be used (defaults to 'corpname').
- `TENDERLY_FORK_NETWORK`: The ID of the fork on Tenderly. You can find it at the end of the URL after choosing a project and then a fork in the `Forks` tab (defaults to Polygon ID '137').
- `TENDERLY_SETUP_AUTOMATIC_VERIFICATIONS`: Sets whether contracts should be automatically verified on Tenderly upon deployment.

### Etherscan

- `ETHERSCAN_API_KEY`: Required to run Etherscan verifications.

### Gas Reporter

- `GAS_REPORTER_ENABLED`: If set without any value, the gas reporter should be enabled.

## Testing

```bash
yarn test
```

### Tracing/Debug failed tests the tests like on tenderly

```bash
yarn test --v
```

## Deployment of contracts

```bash
yarn deploy --tags production
```
