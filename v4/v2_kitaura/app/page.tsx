'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 固定ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-white/95 backdrop-blur-[10px] shadow-sm flex justify-between items-center px-6 h-[71px]">
        <div className="flex flex-col items-center gap-1">
          <Image 
            src="/images/futter_logo.png" 
            alt="KITAURA LAKESIDE RV park"
            width={48}
            height={46}
            className="object-contain"
          />
          <span className="text-[#1C1C1C] text-[6px] font-normal text-center leading-[1.4] tracking-[0.08em] w-[67px] whitespace-pre-line">
            KITAURA LAKESIDE{'\n'}RV park
          </span>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-[18px] h-[18px] flex items-center justify-center"
          aria-label="メニュー"
        >
          <svg className="w-[18px] h-[18px] stroke-[#1C1C1C] stroke-2 fill-none" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* ハンバーガーメニュー */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1000]"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav 
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ✕
            </button>
            
            <div className="mt-12 space-y-2">
              {[
                { label: 'TOP', href: '#top' },
                { label: 'ペット', href: '#pet' },
                { label: 'ペット同伴ルール', href: '#pet-rules' },
                { label: 'サイト案内・料金', href: '#site' },
                { label: '利用規約・マナー', href: '#manners' },
                { label: 'アクセス', href: '#access' },
                { label: 'お知らせ・メディア', href: '#media' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="pt-[71px] pb-[90px]">
        
        {/* SP_0.TOP画面（Bfg2T） */}
        <section id="top" className="relative w-full h-[100vh] overflow-hidden flex flex-col">
          {/* 背景画像 */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/image_side.jpg" 
              alt="北浦レイクサイドRVパーク"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* オーバーレイ */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.10) 60%, rgba(0, 0, 0, 0.40) 100%)'
            }}
          />

          {/* ヘッダー（TOPページ用） */}
          <div className="relative z-10 flex justify-between items-center px-6 py-5 -mt-[71px]">
            <div className="flex flex-col items-center gap-1">
              <Image 
                src="/images/futter_logo.png" 
                alt="KITAURA LAKESIDE RV park"
                width={48}
                height={46}
                className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              />
              <span 
                className="text-[#FFF8F8] text-[6px] font-normal text-center leading-[1.4] tracking-[0.08em] w-[67px] whitespace-pre-line"
                style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.4)' }}
              >
                KITAURA LAKESIDE{'\n'}RV park
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-[18px] h-[18px] flex items-center justify-center"
              aria-label="メニュー"
            >
              <svg 
                className="w-[18px] h-[18px] stroke-white stroke-2 fill-none"
                viewBox="0 0 24 24"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {/* コンテンツエリア */}
          <div className="relative z-10 flex-1 flex items-end px-[22px] pb-[46px]">
            <h1 
              className="text-white text-[23px] font-light tracking-[0.8px] leading-[1.4]"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
            >
              大切な人と、心ほどける時間
            </h1>
          </div>
        </section>

        {/* SP_2.ペットセクション（FhnNd） */}
        <section id="pet" className="relative w-full min-h-[100vh] py-8 px-[10px] flex flex-col gap-[18px]">
          {/* 背景画像 */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/pet-bg.jpg" 
              alt="ペット同伴について"
              fill
              className="object-cover"
            />
          </div>

          {/* オーバーレイ */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.9) 100%)'
            }}
          />

          {/* メインコンテンツ */}
          <div className="relative z-10 flex flex-col gap-[18px]">
            {/* グラスカード */}
            <div className="w-full bg-white/20 backdrop-blur-[20px] border border-[#E8E5E0]/50 rounded-[9px] p-[14px] flex flex-col gap-[7px]">
              <h2 className="text-[#1C1C1C] text-[16px] font-semibold tracking-[-0.3px] leading-[1.4]">
                犬種制限と<br />ペット同伴のマナー
              </h2>
              <p className="text-[#3D3D3D] text-[9px] font-normal leading-[1.7] whitespace-pre-line">
                ペットも、飼い主さまも、{'\n'}そして周囲の方々も穏やかに過ごせるように。{'\n'}受け入れ条件と場内ルールをご案内しています。
              </p>
            </div>

            {/* ギャラリー */}
            <div className="w-full flex flex-col gap-[11px]">
              <div className="flex flex-col gap-[5px]">
                <div className="flex items-center gap-[5px] px-1">
                  <svg className="w-3 h-3 stroke-[#1E3A5F] stroke-2 fill-none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <h3 className="text-[#1E3A5F] text-[12px] font-medium">場内の雰囲気</h3>
                </div>
                <p className="text-[#6B6B6B] text-[9px] font-normal px-1">
                  湖畔の自然に囲まれた、プライベート感のあるサイト
                </p>
              </div>

              {/* 横スクロールギャラリー */}
              <div className="w-full flex gap-[7px] overflow-x-auto px-1 no-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-[89px] h-[89px] rounded-[5px] bg-gray-300 flex-shrink-0">
                    {/* 画像は後で追加 */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SP_3.ペット同伴ルール（a2HDt） */}
        <section id="pet-rules" className="w-full bg-[#FAF8F5] py-8 px-[10px] flex flex-col gap-[14px]">
          <header className="w-full flex flex-col items-center gap-[5px]">
            <h2 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px] text-center">
              犬種制限について
            </h2>
            <p className="text-[#6B6B6B] text-[9px] font-normal text-center">
              アレルギー反応が出にくい環境を維持するため
            </p>
          </header>

          <div className="w-full flex flex-col gap-[7px]">
            {/* ルールカード例 */}
            <div className="w-full bg-white border border-[#E8E5E0] rounded-[7px] p-[9px] flex flex-col gap-[5px]">
              <div className="flex items-center gap-[5px]">
                <svg className="w-[11px] h-[11px] stroke-[#6B8E6B] stroke-2 fill-none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h3 className="text-[#1C1C1C] text-[11px] font-semibold">
                  同伴可能な犬種
                </h3>
              </div>
              <p className="text-[#6B6B6B] text-[9px] font-normal leading-[1.6] pl-4 whitespace-pre-line">
                プードル（スタンダード、ミディアム、トイ）{'\n'}ヨークシャーテリア、ミニチュアシュナウザー{'\n'}ビションフリーゼ、マルチーズ、シーズー{'\n'}チャイニーズクレステッドドッグ{'\n'}オーストラリアン・ラブラドゥードル
              </p>
            </div>
          </div>
        </section>

        {/* SP_4.サイト案内・料金 */}
        <section id="site" className="w-full bg-[#FAF8F5] py-8 px-[10px] flex flex-col gap-8">
          <header className="w-full flex flex-col items-center gap-[5px]">
            <h2 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px]">
              サイト案内・料金
            </h2>
          </header>

          {/* サイトギャラリー */}
          <div className="w-full flex flex-col gap-[5px]">
            <h3 className="text-[#1E3A5F] text-[12px] font-medium px-1">
              サイトの様子
            </h3>
            <div className="w-full flex gap-[7px] overflow-x-auto px-1 no-scrollbar">
              {['02_サイト１案内_景観.jpg', '06_サイト１案内_トイレ.jpg', '08_サイト１案内_シャワー.jpg'].map((img, i) => (
                <Image
                  key={i}
                  src={`/images/${img}`}
                  alt={`サイト${i + 1}`}
                  width={89}
                  height={89}
                  className="rounded-[5px] flex-shrink-0 object-cover"
                />
              ))}
            </div>
          </div>

          {/* 料金表 */}
          <div className="w-full flex flex-col gap-[7px]">
            <h3 className="text-[#1C1C1C] text-[12px] font-medium px-1">
              料金
            </h3>
            <div className="w-full bg-white border border-[#E8E5E0] rounded-[7px] overflow-hidden">
              <div className="flex border-b border-[#E8E5E0]">
                <div className="bg-[#F5F3F0] text-[#1C1C1C] text-[9px] font-semibold px-[9px] py-[7px] w-[40%]">
                  項目
                </div>
                <div className="text-[#3D3D3D] text-[9px] font-normal px-[9px] py-[7px] flex-1 leading-[1.6]">
                  料金
                </div>
              </div>
              <div className="flex border-b border-[#E8E5E0]">
                <div className="bg-[#F5F3F0] text-[#1C1C1C] text-[9px] font-semibold px-[9px] py-[7px] w-[40%]">
                  1泊料金
                </div>
                <div className="text-[#3D3D3D] text-[9px] font-normal px-[9px] py-[7px] flex-1">
                  ¥3,500
                </div>
              </div>
              <div className="flex">
                <div className="bg-[#F5F3F0] text-[#1C1C1C] text-[9px] font-semibold px-[9px] py-[7px] w-[40%]">
                  追加料金
                </div>
                <div className="text-[#3D3D3D] text-[9px] font-normal px-[9px] py-[7px] flex-1">
                  ペット1頭: ¥500
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SP_6.利用規約・マナー */}
        <section id="manners" className="w-full bg-[#FAF8F5] py-8 px-[10px] flex flex-col gap-8">
          <header className="w-full flex flex-col items-center gap-[5px]">
            <h2 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px]">
              利用規約・マナー
            </h2>
          </header>

          <div className="w-full flex flex-col gap-[7px]">
            <h3 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              基本ルール
            </h3>
            
            <div className="w-full bg-white border border-[#E8E5E0] rounded-[7px] p-[9px] flex flex-col gap-[5px]">
              <div className="flex items-center gap-[5px]">
                <div className="w-[14px] h-[14px] bg-[#6B8E6B] rounded-full flex items-center justify-center text-white text-[7px] font-semibold flex-shrink-0">
                  1
                </div>
                <h4 className="text-[#1C1C1C] text-[11px] font-semibold">
                  チェックイン・アウト
                </h4>
              </div>
              <p className="text-[#6B6B6B] text-[9px] font-normal leading-[1.6] pl-[19px] whitespace-pre-line">
                チェックイン: 13:00 〜 17:00{'\n'}チェックアウト: 〜 10:00
              </p>
            </div>
          </div>
        </section>

        {/* SP_7.アクセス */}
        <section id="access" className="w-full bg-[#FAF8F5] py-8 px-[10px] flex flex-col gap-8">
          <header className="w-full flex flex-col items-center gap-[5px]">
            <h2 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px]">
              アクセス
            </h2>
          </header>

          <div className="w-full flex flex-col gap-[7px]">
            <h3 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              所在地・ナビ設定
            </h3>
            
            <div className="w-full bg-white border border-[#E8E5E0] rounded-[7px] p-[9px] flex flex-col gap-[7px]">
              <div className="flex items-start gap-[5px]">
                <div className="w-[18px] h-[18px] bg-[#E8F5E9] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 stroke-[#3D6B4F] stroke-2 fill-none" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-[#1C1C1C] text-[10px] font-medium leading-[1.6] flex-1">
                  〒311-2104 茨城県鉾田市梶山2947
                </p>
              </div>

              {/* 警告ボックス */}
              <div className="w-full bg-[#FFF9ED] border border-[#E8E5E0] rounded-[5px] p-[7px] flex flex-col gap-1">
                <div className="flex items-start gap-1">
                  <svg className="w-[14px] h-[14px] stroke-[#D97706] stroke-2 fill-none flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-[#D97706] text-[10px] font-semibold leading-[1.4]">
                    重要：ナビ設定時のご注意
                  </span>
                </div>
                <p className="text-[#6B6B6B] text-[10px] font-normal leading-[1.6] pl-[18px]">
                  住所検索を行うと、地図上のピンが実際の場所とズレて表示される場合がございます。
                </p>
              </div>

              {/* ヒントボックス */}
              <div className="w-full bg-[#E8F5E9] border border-[#E8E5E0] rounded-[5px] p-[7px] flex flex-col gap-1">
                <div className="flex items-start gap-1">
                  <svg className="w-[7px] h-[7px] stroke-[#3D6B4F] stroke-2 fill-none flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span className="text-[#3D6B4F] text-[10px] font-semibold leading-[1.4]">
                    ナビの目的地設定
                  </span>
                </div>
                <p className="text-[#2D5A3F] text-[10px] font-normal leading-[1.6] pl-[11px]">
                  「セブンイレブン 鉾田梶山店」を目的地に設定してお越しください。当施設はすぐ隣です。
                </p>
              </div>
            </div>
          </div>

          {/* 地図 */}
          <div className="w-full h-[178px] rounded-[7px] border border-[#E8E5E0] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.8!2d140.5!3d36.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA2JzAwLjAiTiAxNDDCsDMwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="北浦レイクサイドRVパーク 地図"
            />
          </div>
        </section>

        {/* SP_8.お知らせ・メディア */}
        <section id="media" className="w-full bg-[#FAF8F5] py-8 px-[10px] flex flex-col gap-8">
          <header className="w-full flex flex-col items-center gap-[5px]">
            <h2 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px]">
              お知らせ・メディア
            </h2>
          </header>

          {/* メディア掲載 */}
          <div className="w-full flex flex-col gap-[7px]">
            <h3 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              メディア掲載
            </h3>
            
            <div className="w-full bg-white border border-[#E8E5E0] rounded-[7px] p-[9px] flex gap-[7px]">
              <div className="w-5 h-5 bg-red-600 rounded-[5px] flex items-center justify-center flex-shrink-0">
                <svg className="w-[9px] h-[9px] stroke-white stroke-2 fill-white" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              
              <div className="flex-1 flex flex-col gap-1">
                <h4 className="text-[#1C1C1C] text-[9px] font-semibold">
                  YouTubeでご紹介いただきました
                </h4>
                <p className="text-[#6B6B6B] text-[9px] font-normal leading-[1.6]">
                  板倉趣味チャンネル様にご紹介いただきました
                </p>
                <p className="text-[#9B9B9B] text-[7px] font-medium">
                  2026.01.15
                </p>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="w-full flex flex-col gap-[9px]">
            <h3 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              Instagram
            </h3>
            
            <div className="w-full flex gap-[5px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[73px] h-[73px] bg-[#E8E5E0] rounded-[5px] flex-shrink-0" />
              ))}
            </div>

            <a
              href="https://instagram.com/kitaura_lakeside_rvpark"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white border border-[#E8E5E0] rounded-[11px] px-[7px] py-[5px] flex items-center justify-center gap-1"
            >
              <svg className="w-[14px] h-[14px] stroke-[#E4405F] stroke-2 fill-none" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="text-[#1C1C1C] text-[9px] font-medium">
                Instagramで見る
              </span>
            </a>
          </div>
        </section>

      </main>

      {/* 固定フッター */}
      <footer className="fixed bottom-0 left-0 right-0 z-[998] flex justify-end items-end p-[9px_9px_9px_0] pointer-events-none">
        <button
          className="bg-[#6B8E6B] text-white text-[11px] font-semibold px-[22px] py-[14px] rounded-[20px] shadow-lg hover:shadow-xl transition-all pointer-events-auto active:translate-y-0"
          type="button"
        >
          予約・空き状況
        </button>
      </footer>

      {/* スクロールバー非表示用のスタイル */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
