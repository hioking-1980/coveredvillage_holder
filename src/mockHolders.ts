// NFTホルダーのモックデータ
type Holder = {
  address: string;
  count: number;
  displayName?: string; // 任意の表示名
  iconUrl?: string;     // 任意のアイコン画像URL
};

export type Hierarchy = '長老' | '名主' | '領主' | '庄屋' | '村長';

export type HolderWithHierarchy = Holder & { hierarchy: Hierarchy };

export const mockHolders: Holder[] = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    count: 55,
    displayName: 'CoveredVillageTeam',
    iconUrl: 'https://i.imgur.com/4c2Z7lH.png',
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    count: 42,
    displayName: 'HIOKING',
    iconUrl: 'https://i.imgur.com/8wYjv1T.png',
  },
  {
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
    count: 37,
    displayName: '_TOKYO_CHAN_',
    iconUrl: 'https://i.imgur.com/2yaf2wb.png',
  },
  {
    address: '0x4567890abcdef1234567890abcdef1234567890a',
    count: 28,
    displayName: 'NFTMAP_2',
    iconUrl: 'https://i.imgur.com/7qQ4Z4S.png',
  },
  {
    address: '0x90abcdef1234567890abcdef1234567890abcdef',
    count: 15,
    displayName: 'running-mole',
    iconUrl: 'https://i.imgur.com/3yQ2QwM.png',
  },
  {
    address: '0x1111111111111111111111111111111111111111',
    count: 51,
    displayName: 'nami-hey',
    iconUrl: 'https://i.imgur.com/0wZ7VhJ.png',
  },
  {
    address: '0x2222222222222222222222222222222222222222',
    count: 49,
    displayName: 'Hana-ptan',
    iconUrl: 'https://i.imgur.com/5dNwY8F.png',
  },
  {
    address: '0x3333333333333333333333333333333333333333',
    count: 31,
    displayName: 'user3333',
    iconUrl: 'https://i.imgur.com/8nQ1sH3.png',
  },
  {
    address: '0x4444444444444444444444444444444444444444',
    count: 24,
    displayName: 'user4444',
    iconUrl: 'https://i.imgur.com/1ZQ9J2b.png',
  },
  {
    address: '0x5555555555555555555555555555555555555555',
    count: 12,
    displayName: 'user5555',
    iconUrl: 'https://i.imgur.com/9rQ1tWq.png',
  },
];

export function categorizeHolders(holders: Holder[]): Record<Hierarchy, Holder[]> {
  const result: Record<Hierarchy, Holder[]> = {
    '長老': [],
    '名主': [],
    '領主': [],
    '庄屋': [],
    '村長': [],
  };
  holders.forEach((holder) => {
    if (holder.count >= 50) result['長老'].push(holder);
    else if (holder.count >= 40) result['名主'].push(holder);
    else if (holder.count >= 30) result['領主'].push(holder);
    else if (holder.count >= 20) result['庄屋'].push(holder);
    else if (holder.count >= 10) result['村長'].push(holder);
  });
  return result;
}
