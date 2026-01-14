import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const FACTORY_ADDRESS = '0x918ca6e5Db17511136dfbb86a936e666bCFcfe81'

export const REFERENCE_TOKEN = '0xe9E96d1aad82562b7588F03f49aD34186f996478'
export const STABLE_TOKEN_POOL = '0xb07cbef88a962fbd55042a843c5df032833768b0'

export const TVL_MULTIPLIER_THRESHOLD = '2'
export const MATURE_MARKET = '1000000'
export const MINIMUM_NATIVE_LOCKED = BigDecimal.fromString('20')

export const ROLL_DELETE_HOUR = 768
export const ROLL_DELETE_MINUTE = 1680

export const ROLL_DELETE_HOUR_LIMITER = BigInt.fromI32(500)
export const ROLL_DELETE_MINUTE_LIMITER = BigInt.fromI32(1000)

// token where amounts should contribute to tracked volume and liquidity
// usually tokens that many tokens are paired with s
export const WHITELIST_TOKENS: string[] = [
  REFERENCE_TOKEN, // WIMX
  '0x60d7778daa2487b8bdd54a7b6eabd1f3fb2bc4ca', // STBL
]

export const STABLE_COINS: string[] = ['0x60d7778daa2487b8bdd54a7b6eabd1f3fb2bc4ca']

export const SKIP_POOLS: string[] = []

export const POOL_MAPINGS: Array<Address[]> = []

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = []
