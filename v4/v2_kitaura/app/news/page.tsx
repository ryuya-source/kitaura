'use client';

import { Youtube, Instagram, ExternalLink } from 'lucide-react';

export default function NewsPage() {
  // モックデータ
  const newsItems = [
    {
      id: 1,
      title: 'お知らせのタイトル1',
      date: '2026-02-05',
      isNew: true,
      category: 'お知らせ',
    },
    {
      id: 2,
      title: 'ルール変更のお知らせ',
      date: '2026-02-01',
      isNew: false,
      category: 'ルール変更',
    },
    {
      id: 3,
      title: 'キャンペーン情報',
      date: '2026-01-28',
      isNew: false,
      category: 'キャンペーン',
    },
  ];

  const mediaItems = [
    {
      id: 1,
      title: '板倉趣味チャンネル様にご紹介いただきました',
      thumbnail: null, // 実際の画像URLを後で追加
      views: '12,500',
      url: 'https://youtube.com',
    },
    {
      id: 2,
      title: 'ARJべんちゃん様にご紹介いただきました',
      thumbnail: null,
      views: '8,300',
      url: 'https://youtube.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ルートフレーム（WawUF） */}
      <div className="w-full max-w-[375px] mx-auto py-8 px-[10px] flex flex-col gap-8">
        
        {/* ヘッダー（I2mAW） */}
        <header className="w-full flex flex-col gap-[5px] items-center">
          <h1 className="text-[#1C1C1C] text-[23px] font-light tracking-[-0.5px]">
            お知らせ・メディア
          </h1>
        </header>

        {/* メディア掲載（jnMSf） */}
        <section className="w-full flex flex-col gap-[7px]">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              メディア掲載
            </h2>
            <p className="text-[#6B6B6B] text-[9px] font-normal">
              YouTubeでご紹介いただきました
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            {mediaItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white rounded-[7px] border border-[#E8E5E0] overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* サムネイル */}
                <div className="w-full h-[120px] bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center relative">
                  <Youtube size={40} className="text-white/90" />
                  {item.thumbnail && (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* コンテンツ */}
                <div className="p-[9px] flex flex-col gap-1">
                  <h3 className="text-[#1C1C1C] text-[10px] font-medium leading-[1.4]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#6B6B6B] text-[7px]">
                      再生回数: {item.views}
                    </span>
                    <ExternalLink size={8} className="text-[#6B6B6B]" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* お知らせ（BwQ6Z） */}
        <section className="w-full flex flex-col gap-[7px]">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              お知らせ
            </h2>
          </div>

          <div className="w-full flex flex-col gap-2">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-[9px] flex flex-col gap-1 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {item.isNew && (
                    <span className="bg-[#FF6B6B] text-white text-[6px] font-semibold px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                  <span className="text-[#6B6B6B] text-[7px]">
                    {item.date}
                  </span>
                  <span className="text-[#6B6B6B] text-[7px] px-2 py-0.5 bg-[#F5F3F0] rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-[#1C1C1C] text-[10px] font-medium">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram（FguyL） */}
        <section className="w-full flex flex-col gap-[7px]">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              Instagram
            </h2>
            <p className="text-[#6B6B6B] text-[9px] font-normal">
              @kitaura_lakeside_rvpark
            </p>
          </div>

          {/* Instagram埋め込みプレースホルダー */}
          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-12 flex flex-col items-center justify-center gap-4">
            <Instagram size={48} className="text-[#E1306C]" />
            <p className="text-[#6B6B6B] text-[9px] text-center">
              Instagram投稿はこちらに表示されます
            </p>
            <a
              href="https://instagram.com/kitaura_lakeside_rvpark"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-[9px] font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Instagramで見る
            </a>
          </div>
        </section>

        {/* SNSリンク */}
        <section className="w-full bg-[#F5F3F0] rounded-[7px] p-4 flex flex-col gap-3 items-center">
          <h3 className="text-[#1C1C1C] text-[10px] font-medium">
            最新情報をチェック
          </h3>
          <p className="text-[#6B6B6B] text-[7px] text-center leading-[1.6]">
            キャンペーン情報や施設の最新情報は<br />
            SNSでもお知らせしています
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/kitaura_lakeside_rvpark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-[#E8E5E0] rounded-full px-4 py-2 hover:shadow-sm transition-shadow"
            >
              <Instagram size={14} className="text-[#E1306C]" />
              <span className="text-[#1C1C1C] text-[8px] font-medium">Instagram</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
