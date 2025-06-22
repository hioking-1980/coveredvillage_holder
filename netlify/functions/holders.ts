console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);
import type { Handler } from '@netlify/functions';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const COLLECTION_ADDRESS = "0x0e6a70cb485Ed3735Fa2136E0D4aDC4BF5456F93";
const BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}`;

export const handler: Handler = async (event, context) => {
  try {
    const url = `${BASE_URL}/getOwnersForCollection?contractAddress=${COLLECTION_ADDRESS}&withTokenBalances=true`;
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: 'Alchemy API fetch failed' })
      };
    }
    const data = await res.json();
    console.log("Alchemy API Response:", JSON.stringify(data)); // ログ出力
    return {
      statusCode: 200,
      body: JSON.stringify(data.ownerAddresses || [])
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', detail: e instanceof Error ? e.message : e })
    };
  }
};