# Uniswap V3 and V3-Tokens Subgraph

## Development

1. Install dependencies
`yarn install`

2. Build a v3 subgraph
`yarn build --network <network> --subgraph-type v3` 

3. Deploy a v3 subgraph
`yarn build --network <network> --subgraph-type v3 --deploy`

4. Build a v3-tokens subgraph
`yarn build --network <network> --subgraph-type v3-tokens`

5. Deploy a v3-tokens subgraph
`yarn build --network <network> --subgraph-type v3-tokens --deploy`

Note: Deployments will fail if there are uncommitted changes in the subgraph. Please commit your changes before deploying.

## Adding a New Chain

When deploying to a new chain, you must configure the chain-specific constants in `config/<network>/chain.ts` for USD calculations to work properly.

### Required Configuration

| Constant | Description | Example |
|----------|-------------|---------|
| `FACTORY_ADDRESS` | Uniswap V3 Factory contract address | `0x918ca6e5Db17511136dfbb86a936e666bCFcfe81` |
| `REFERENCE_TOKEN` | Wrapped native token address (WETH, WMATIC, WIMX, etc.) | `0xe9E96d1aad82562b7588F03f49aD34186f996478` |
| `STABLE_TOKEN_POOL` | **CRITICAL**: Pool address containing REFERENCE_TOKEN paired with a stablecoin. This pool is used to derive the native token price in USD. | `0xb07cbef88a962fbd55042a843c5df032833768b0` |
| `WHITELIST_TOKENS` | Array of trusted token addresses used for price derivation. Must include REFERENCE_TOKEN and major stablecoins. | `[REFERENCE_TOKEN, '0x...USDC']` |
| `STABLE_COINS` | Array of stablecoin addresses (priced at 1 USD) | `['0x...USDC', '0x...USDT']` |
| `MINIMUM_NATIVE_LOCKED` | Minimum liquidity (in native token value) required for a pool to be used in price derivation | `20` for mainnet, `1` for testnet |

### How USD Calculations Work

```
USD Value = amount × token.derivedETH × bundle.ethPriceUSD
```

1. **bundle.ethPriceUSD**: Derived from `STABLE_TOKEN_POOL` - reads the price of the native token vs stablecoin
2. **token.derivedETH**: For each token, finds the best-liquidity pool paired with a whitelist token to derive its native token price
3. **Final USD**: Multiplies token amount by its derived native price and the native/USD rate

### Common Issue: All USD Values Return 0

If `totalValueLockedUSD`, `volumeUSD`, or other USD fields return 0:

1. **Check `STABLE_TOKEN_POOL`** - Must be a valid pool address (not zero address)
2. **Verify pool exists and has liquidity** - The pool must have been created and have liquidity added
3. **Ensure pool has had at least one swap** - Token prices are set after the first swap
4. **Verify stablecoin addresses** - Ensure `WHITELIST_TOKENS` and `STABLE_COINS` use the correct addresses for your chain

### Pool Requirements

For USD pricing to work, the `STABLE_TOKEN_POOL` must:
- Contain the `REFERENCE_TOKEN` as token0 or token1
- Contain a token listed in `STABLE_COINS` as the other token
- Have been initialized (Initialize event)
- Have had at least one swap (to set token0Price/token1Price)
- Have liquidity (totalValueLockedToken0/1 > 0)

