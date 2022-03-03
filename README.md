# zksync-sandbox
## depositToSyncFromEthereum

```bash
$ yarn ts-node src/deposit-to-sync-from-ethereum.ts
```

Result 

deposit

```
ETHOperation {
  ethTx: {
    nonce: 0,
    gasPrice: BigNumber { _hex: '0x3b9aca15', _isBigNumber: true },
    gasLimit: BigNumber { _hex: '0x030d40', _isBigNumber: true },
    to: '0x82F67958A5474e40E1485742d648C0b0686b6e5D',
    value: BigNumber { _hex: '0x2710', _isBigNumber: true },
    data: '0x2d2da80600000000000000000000000019ece7c90e631e9ece2494efab9868c3047d6507',
    chainId: 4,
    v: 44,
    r: '0x6d381b6a313d3ead73f5360f8e3ecd5e9e0570e03b1832d19fb06d77b9289654',
    s: '0x79cc4ac13418a66480827c50b187b323fc03523cc2ae6fb1a83c4ace45ff139d',
    from: '0x19EcE7C90E631e9ece2494efaB9868C3047D6507',
    hash: '0x853cf70ade80f221b10b3b27b7d2a5fc33762b2c5cc5703a286ee1114fe8985b',
    wait: [Function (anonymous)]
  },
  zkSyncProvider: Provider {
    transport: HTTPTransport { address: 'https://rinkeby-api.zksync.io/jsrpc' },
    pollIntervalMilliSecs: 500,
    contractAddress: {
      mainContract: '0x82F67958A5474e40E1485742d648C0b0686b6e5D',
      govContract: '0xC8568F373484Cd51FDc1FE3675E46D8C0dc7D246'
    },
    tokenSet: TokenSet { tokensBySymbol: [Object] }
  },
  state: 'Sent'
}
```

receipt:

```
{
  executed: true,
  block: { blockNumber: 108639, committed: true, verified: false }
}
```

verified receipt:

ATTENTION: Need to wait for a long time to verified on zksync rinkeby

```
transaction hash on RinkeBy: 0x853cf70ade80f221b10b3b27b7d2a5fc33762b2c5cc5703a286ee1114fe8985b
```

On Zksync rinkeby
```
https://rinkeby.zkscan.io/explorer/accounts/0x19ece7c90e631e9ece2494efab9868c3047d6507
```