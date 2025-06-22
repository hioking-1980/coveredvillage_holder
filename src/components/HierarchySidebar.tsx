import React from 'react';
import { Hierarchy } from '../mockHolders';

interface Props {
  hierarchyOrder: Hierarchy[];
  hierarchyDesc: Record<Hierarchy, string>;
  categorized: Record<Hierarchy, { address: string; count: number }[]>;
}

export const HierarchySidebar: React.FC<Props> = ({ hierarchyOrder, hierarchyDesc, categorized }) => {
  // サンプル顔画像（階層ごとに仮で割り当て）
  const faceIcons: Record<Hierarchy, string> = {
    '長老': '/icons/長老.png',
    '名主': '/icons/名主.png',
    '領主': '/icons/領主.png',
    '庄屋': '/icons/庄屋.png',
    '村長': '/icons/村長.png',
  };
  // 縦書きテキスト
  const verticalText = (
    <div className="absolute left-2 top-40 flex flex-col items-center" style={{zIndex:2}}>
      <div className="text-yellow-600 font-bold text-lg rotate-180" style={{writingMode:'vertical-rl'}}>すごくえらい</div>
      <svg width="24" height="80" viewBox="0 0 24 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0 L12 80 M12 80 L6 74 M12 80 L18 74" stroke="#FFD600" strokeWidth="3"/>
      </svg>
      <div className="text-yellow-600 font-bold text-base mt-2" style={{writingMode:'vertical-rl'}}>えらい</div>
    </div>
  );
  const colorMap: Record<Hierarchy, string> = {
    '長老': 'text-red-600',
    '名主': 'text-green-600',
    '領主': 'text-blue-600',
    '庄屋': 'text-gray-600',
    '村長': 'text-gray-600',
  };
  return (
    <aside className="relative flex flex-col items-center min-w-[220px] bg-white border-r py-4 px-2">
      {/* 左の黄色帯 */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-yellow-300" style={{zIndex:1}} />
      {verticalText}
      <div className="flex flex-col gap-0 z-10 w-full items-start mt-6">
        {hierarchyOrder.map((h, idx) => (
          <React.Fragment key={h}>
            <div className="flex flex-row items-center w-full py-8 gap-6 min-h-[120px]">
              {/* 顔アイコン */}
              {faceIcons[h] && <img src={faceIcons[h]} alt={h + 'のアイコン'} className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover bg-white shadow-none mr-2" style={{marginLeft:'-8px'}} />}

              {/* ラベル・説明・人数 */}
              <div className="flex flex-row items-center w-full">
                <div className="flex flex-col justify-center min-w-[120px]">
                  <span className={`font-serif font-extrabold text-8xl leading-none ${h==='長老' ? 'text-[#b60000]' : h==='名主' ? 'text-[#0e8b2f]' : h==='領主' ? 'text-[#1a4fa3]' : 'text-[#555]'}`}>{h}</span>
                  <span className="text-xs text-gray-500 leading-tight mt-2 ml-1 tracking-wide">{hierarchyDesc[h]}</span>
                </div>
                <span className="ml-8 text-3xl font-bold text-gray-500 min-w-[48px] text-center">{categorized[h].length}人</span>
              </div>
            </div>
            {/* 区切りの点線（最後の階層以外） */}
            {idx < hierarchyOrder.length - 1 && (
              <div className="w-full border-t border-dotted border-gray-300 mb-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
};
