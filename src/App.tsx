import React, { useState, useEffect } from 'react';
import { mockHolders, categorizeHolders, Hierarchy } from './mockHolders';
import { fetchHolders } from './api/alchemy';
import { WalletCard } from './components/WalletCard';
import { HierarchySidebar } from './components/HierarchySidebar';

const hierarchyOrder: Hierarchy[] = ['長老', '名主', '領主', '庄屋', '村長'];
const hierarchyDesc: Record<Hierarchy, string> = {
  '長老': '50個以上',
  '名主': '40-49個',
  '領主': '30-39個',
  '庄屋': '20-29個',
  '村長': '10-19個',
};

function App() {
  const [address, setAddress] = useState('');
  const [holders, setHolders] = useState(mockHolders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categorized = categorizeHolders(holders);

  useEffect(() => {
    async function loadHolders() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHolders();
        // Alchemyのデータを {address, count}[] 形式に変換
        const holdersData = data.map(h => ({
          address: h.ownerAddress,
          count: h.tokenBalances.reduce((acc, t) => acc + Number(t.balance), 0),
        }));
        setHolders(holdersData);
      } catch (e: any) {
        setError('ホルダー情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    }
    loadHolders();
  }, []);

  // 入力欄のハンドラ（将来のAPI切替用）
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // 実装時はAPIコールしsetHoldersを更新
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 py-3 flex flex-col">
  <div className="flex items-center justify-between">
    {/* OpenSeaロゴボタン */}
    <a
      href="https://opensea.io/ja/collection/coveredvillage"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center mr-4"
    >
      <img
        src="/icons/opensea_logo.png"
        alt="OpenSea"
        className="h-10 w-auto"
      />
    </a>
    {/* タイトル */}
    <span className="text-2xl font-bold bg-yellow-200 px-4 py-1 rounded">
      カバードビレッジ階級表（ほぼリアルタイム）
    </span>
    {/* 右側のアイコン */}
    <div className="flex gap-2 items-center">
      <img src="/icons/カバードビレッジ階級.PNG" alt="カバードビレッジ階級" className="w-10 h-10 rounded-full border object-cover" />
      <img src="/icons/カバードビレッジ階級2.PNG" alt="カバードビレッジ階級2" className="w-10 h-10 rounded-full border object-cover" />
      <img src="/icons/カバードビレッジ階級3.PNG" alt="カバードビレッジ階級3" className="w-10 h-10 rounded-full border object-cover" />
      <img src="/icons/カバードビレッジ階級4.PNG" alt="カバードビレッジ階級4" className="w-10 h-10 rounded-full border object-cover" />
    </div>
  </div>
  <div className="flex gap-2 items-center mt-2">
    <label htmlFor="address" className="text-sm font-medium text-gray-700">コレクションアドレス:</label>
    <input
      id="address"
      type="text"
      value={address}
      onChange={handleInput}
      placeholder="0x..."
      className="border rounded px-2 py-1 text-sm w-64"
    />
    <span className="text-xs text-gray-400">（現在はモックデータ表示）</span>
  </div>
</header>
      <main className="flex-1 flex overflow-x-auto bg-white">
        {/* Sidebar */}
        <HierarchySidebar hierarchyOrder={hierarchyOrder} hierarchyDesc={hierarchyDesc} categorized={categorized} />
        {/* Holders Grid */}
        <div className="flex-1 overflow-x-auto p-8">
          {loading ? (
            <div className="text-xl text-gray-400 mt-8">ホルダー情報を取得中...</div>
          ) : error ? (
            <div className="text-xl text-red-500 mt-8">{error}</div>
          ) : (
            <div className="flex flex-col gap-12">
              {hierarchyOrder.map((h) => (
                <section key={h} className="mb-6">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span>{h}</span>
                    <span className="text-base text-gray-400 font-normal">{hierarchyDesc[h]}</span>
                    <span className="ml-2 text-xs text-gray-500">{categorized[h].length}人</span>
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {categorized[h].map((holder) => (
                      <WalletCard key={holder.address} hierarchy={h} holder={holder} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white text-center p-2 text-xs text-gray-400 border-t">© 2025 カバードビレッジ階級表</footer>
    </div>
  );
}

export default App;
