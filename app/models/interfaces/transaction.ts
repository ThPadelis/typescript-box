export interface ITransaction {
  from: string | number;
  to?: string;
  value?: number;
  gas?: number;
  gasPrice?: number;
  data?: string;
  nonce?: number;
  chain?: string;
  hardfork?: string;
  common?: {
    customChain: {
      name?: string;
      networkId: number;
      chainId: number;
    };
    baseChain?: "mainnet" | "goerli" | "kovan" | "rinkeby" | "ropsten";
    hardfork?:
      | "chainstart"
      | "homestead"
      | "dao"
      | "tangerineWhistle"
      | "spuriousDragon"
      | "byzantium"
      | "constantinople"
      | "petersburg"
      | "istanbul";
  };
}
