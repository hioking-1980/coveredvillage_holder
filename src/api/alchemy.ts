// Alchemy NFT Holder Fetcher
// .envにVITE_ALCHEMY_API_KEYを設定しておくこと

export type AlchemyHolder = {
  ownerAddress: string;
  tokenBalances: { tokenId: string; balance: string }[];
};

export async function fetchHolders(): Promise<AlchemyHolder[]> {
  // Netlify Functions経由でAlchemy APIを呼ぶ
  const url = '/.netlify/functions/holders';
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch holders");
  const data = await res.json();
  return data;
}
