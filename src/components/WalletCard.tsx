import React from 'react';
import { Hierarchy } from '../mockHolders';

const hierarchyStyles: Record<Hierarchy, string> = {
  '長老': 'bg-red-100 border-red-500 text-red-700',
  '名主': 'bg-green-100 border-green-500 text-green-700',
  '領主': 'bg-blue-100 border-blue-500 text-blue-700',
  '庄屋': 'bg-gray-100 border-gray-400 text-gray-700',
  '村長': 'bg-gray-100 border-gray-400 text-gray-700',
};

const hierarchyIcons: Partial<Record<Hierarchy, React.ReactNode>> = {
  '長老': (
    <span className="mr-1" role="img" aria-label="仏像">🗿</span>
  ),
};

function shortenAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export const WalletCard: React.FC<{
  hierarchy: Hierarchy;
  holder: { address: string; count: number; displayName?: string; iconUrl?: string };
}> = ({ hierarchy, holder }) => {
  const openOpenSea = () => {
    window.open(`https://opensea.io/${holder.address}`, '_blank');
  };

  return (
    <div
      className={`cursor-pointer border-4 rounded-md px-6 py-2 min-w-[200px] h-[60px] flex items-center bg-opacity-95 shadow-lg hover:scale-105 transition font-bold relative ${hierarchyStyles[hierarchy]}`}
      onClick={openOpenSea}
      title="OpenSeaでプロフィールを見る"
      style={{boxShadow:'0 2px 12px 0 rgba(0,0,0,0.10)'}}
    >
      {/* アイコン画像 */}
      {holder.iconUrl && (
        <img
          src={holder.iconUrl}
          alt={holder.displayName || 'icon'}
          className="w-9 h-9 rounded-full border-2 border-white bg-white object-cover mr-3 ml-1"
        />
      )}
      {/* 階層アイコン（長老のみ） */}
      {hierarchyIcons[hierarchy]}
      {/* 名前 */}
      <span className="font-bold text-xl leading-tight tracking-wide text-center flex-1 truncate">
        {holder.displayName || shortenAddress(holder.address)}
      </span>
      {/* 保有数を下部中央に大きく・太字で */}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-lg font-extrabold text-gray-700 bg-white bg-opacity-70 px-2 rounded">
        {holder.count}個
      </span>
      {/* アドレスは必要なら下部に小さく */}
      {/* <span className="absolute bottom-1 left-2 text-[10px] text-gray-500">{shortenAddress(holder.address)}</span> */}
    </div>
  );
};
