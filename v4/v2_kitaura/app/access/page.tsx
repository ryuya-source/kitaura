'use client';

import { MapPin, AlertCircle, Navigation, Car, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AccessPage() {
  const [openRoute1, setOpenRoute1] = useState(false);
  const [openRoute2, setOpenRoute2] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ルートフレーム（g5WKr） */}
      <div className="w-full max-w-[375px] mx-auto py-8 px-[10px] flex flex-col gap-8">
        
        {/* ヘッダー（BcXwJ） */}
        <header className="w-full flex flex-col gap-[5px] items-center">
          <h1 className="text-[#1C1C1C] text-[23px] font-light tracking-[-0.5px]">
            アクセス
          </h1>
        </header>

        {/* 所在地・ナビ設定（R22RR） */}
        <section className="w-full flex flex-col gap-[7px]">
          {/* セクションヘッダー（q0qGj） */}
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              所在地・ナビ設定
            </h2>
          </div>

          {/* 住所カード（r7ELh） */}
          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-[9px] flex flex-col gap-[7px]">
            {/* 住所行（EWHVz） */}
            <div className="w-full flex gap-[5px] items-center">
              {/* アイコンコンテナ（CJns5） */}
              <div className="w-[14px] h-[14px] bg-[#F5F3F0] rounded flex items-center justify-center">
                <MapPin size={8} className="text-[#1E3A5F]" />
              </div>

              {/* 住所テキスト（M7yLA） */}
              <span className="text-[#1C1C1C] text-[9px] font-medium">
                〒311-2104 茨城県鉾田市梶山2947
              </span>
            </div>

            {/* 警告ボックス（imNYA） */}
            <div className="w-full bg-[#FFF8E6] border border-[#F0E4C8] rounded-[5px] p-[7px] flex flex-col gap-[5px]">
              {/* 警告ヘッダー（mg2wk） */}
              <div className="flex gap-1 items-center">
                <AlertCircle size={7} className="text-[#B8860B]" />
                <span className="text-[#8B6914] text-[9px] font-semibold">
                  重要：ナビ設定時のご注意
                </span>
              </div>

              {/* 警告テキスト（i1GVt） */}
              <p className="text-[#6B5A2A] text-[9px] font-normal leading-[1.6]">
                住所検索を行うと、地図上のピンが実際の場所とズレて<br />
                表示される場合がございます。
              </p>
            </div>

            {/* ヒントボックス（fAh18） */}
            <div className="w-full bg-[#F0F7F0] border border-[#D4E8D4] rounded-[5px] p-[7px] flex flex-col gap-1">
              {/* ヒントヘッダー（cZFPR） */}
              <div className="flex gap-1 items-center">
                <Navigation size={7} className="text-[#3D6B4F]" />
                <span className="text-[#3D6B4F] text-[9px] font-semibold">
                  ナビの目的地設定
                </span>
              </div>

              {/* ヒントテキスト（nkxjv） */}
              <p className="text-[#2D5A3F] text-[9px] font-normal leading-[1.6]">
                「セブンイレブン 鉾田梶山店」を目的地に設定して<br />
                お越しください。当施設はすぐ隣です。
              </p>
            </div>
          </div>
        </section>

        {/* 地図コンテナ（b1w1U） */}
        <div className="w-full h-[178px] rounded-[7px] overflow-hidden border border-[#E8E5E0]">
          {/* Google Maps埋め込み */}
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

        {/* お車での所要時間（FYTyA） */}
        <section className="w-full flex flex-col gap-[7px]">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              お車での所要時間
            </h2>
            <p className="text-[#6B6B6B] text-[9px] font-normal">
              最寄りのインターチェンジからの目安時間です。
            </p>
          </div>

          {/* ルートカード1 - 東関東自動車道 */}
          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] overflow-hidden">
            <button
              onClick={() => setOpenRoute1(!openRoute1)}
              className="w-full bg-[#F5F3F0] px-[5px] py-[7px] flex justify-between items-center hover:bg-[#EBE9E6] transition-colors"
            >
              <div className="flex gap-1 items-center">
                <Car size={12} className="text-[#6B6B6B]" />
                <span className="text-[#6B6B6B] text-[9px] font-semibold">
                  東関東自動車道をご利用の方
                </span>
              </div>
              <ChevronDown 
                size={12} 
                className={`text-[#6B6B6B] transition-transform ${openRoute1 ? 'rotate-180' : ''}`}
              />
            </button>

            {openRoute1 && (
              <>
                <div className="flex justify-between px-[6px] py-[7px] border-b border-[#E8E5E0]">
                  <span className="text-[#1C1C1C] text-[9px] font-medium">鉾田IC</span>
                  <span className="text-[#1E3A5F] text-[9px] font-medium">約15分</span>
                </div>
                <div className="flex justify-between px-[6px] py-[7px]">
                  <span className="text-[#1C1C1C] text-[9px] font-medium">潮来IC</span>
                  <span className="text-[#1E3A5F] text-[9px] font-medium">約30分</span>
                </div>
              </>
            )}
          </div>

          {/* ルートカード2 - 常磐自動車道 */}
          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] overflow-hidden">
            <button
              onClick={() => setOpenRoute2(!openRoute2)}
              className="w-full bg-[#F5F3F0] px-[5px] py-[7px] flex justify-between items-center hover:bg-[#EBE9E6] transition-colors"
            >
              <div className="flex gap-1 items-center">
                <Car size={12} className="text-[#6B6B6B]" />
                <span className="text-[#6B6B6B] text-[9px] font-semibold">
                  常磐自動車道をご利用の方
                </span>
              </div>
              <ChevronDown 
                size={12} 
                className={`text-[#6B6B6B] transition-transform ${openRoute2 ? 'rotate-180' : ''}`}
              />
            </button>

            {openRoute2 && (
              <div className="flex justify-between px-[6px] py-[7px]">
                <span className="text-[#1C1C1C] text-[9px] font-medium">土浦北IC</span>
                <span className="text-[#1E3A5F] text-[9px] font-medium">約50分</span>
              </div>
            )}
          </div>
        </section>

        {/* 公共交通機関 */}
        <section className="w-full flex flex-col gap-[7px]">
          <div className="w-full flex flex-col gap-2">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              公共交通機関をご利用の方
            </h2>
          </div>

          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-[9px] flex flex-col gap-2">
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              <span className="font-semibold">最寄り駅：</span>JR鹿島線 鹿島旭駅
            </p>
            <p className="text-[#6B6B6B] text-[7px] leading-[1.6]">
              ※ 駅からタクシーで約20分<br />
              ※ 公共交通機関でのアクセスは便が少ないため、お車でのご来場をおすすめします
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
