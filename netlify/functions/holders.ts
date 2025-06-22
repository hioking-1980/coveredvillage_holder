console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);import type { Handler } from '@netlify/functions';

const ALCHEMY_API_KEY = process.env.VITE_ALCHEMY_API_KEY;
const COLLECTION_ADDRESS = "0x1d2a6e6a5e3e7e3e7e5e4e6e7e3e6e2e3e6e7e7e8";
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
    return {
      statusCode: 200,
      body: JSON.stringify(data.owners || [])
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', detail: e instanceof Error ? e.message : e })
    };
  }
};
