'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ルートフレーム（3UNaB） */}
      <div className="w-full max-w-[375px] mx-auto py-8 px-[10px] flex flex-col gap-10">
        
        {/* ヘッダーセクション（LENAp） */}
        <header className="flex flex-col gap-4 items-center">
          <h1 className="text-[#1C1C1C] text-[23px] font-light tracking-[-0.5px]">
            利用規約・マナー
          </h1>
          <p className="text-[#6B6B6B] text-[12px] leading-[1.8] text-center w-[320px]">
            すべてのお客様が快適で安全な時間を過ごせるよう、<br />
            以下の規約を設けております。
          </p>
        </header>

        {/* 予約・キャンセル・その他（Zed5V） */}
        <section className="w-full flex flex-col gap-3">
          <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
            予約・キャンセル・その他
          </h2>

          {/* チェックイン・アウトカード（I910U） */}
          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] overflow-hidden">
            {/* カードヘッダー（r5fjv） */}
            <div className="bg-[#F5F3F0] rounded-t-xl px-[5px] py-[7px]">
              <h3 className="text-[#6B6B6B] text-[9px] font-semibold">
                チェックイン・アウト
              </h3>
            </div>

            {/* 行1（fff4F） */}
            <div className="flex justify-between px-2 py-[9px] border-b border-[#E8E5E0]">
              <span className="text-[#6B6B6B] text-[12px] font-semibold w-[100px]">
                IN
              </span>
              <span className="text-[#1C1C1C] text-[12px] font-normal">
                13:00 ～ 17:00
              </span>
            </div>

            {/* 行2（cuxPh） */}
            <div className="flex justify-between px-2 py-[9px]">
              <span className="text-[#6B6B6B] text-[12px] font-semibold w-[100px]">
                OUT
              </span>
              <span className="text-[#1C1C1C] text-[12px] font-normal">
                ～ 10:00
              </span>
            </div>
          </div>

          {/* キャンセルポリシーカード（f9umC） */}
          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] overflow-hidden">
            {/* カードヘッダー（P6JY1） */}
            <div className="bg-[#F5F3F0] rounded-t-xl px-[5px] py-[7px]">
              <h3 className="text-[#6B6B6B] text-[9px] font-semibold">
                キャンセルポリシー
              </h3>
            </div>

            {/* 行1（iTm3Z） */}
            <div className="flex justify-between px-2 py-[9px] border-b border-[#E8E5E0]">
              <span className="text-[#6B6B6B] text-[12px] font-medium w-[140px]">
                1日前 ～ 3日前
              </span>
              <span className="text-[#1C1C1C] text-[12px] font-normal">
                宿泊代の50％
              </span>
            </div>

            {/* 行2（aGs8w） */}
            <div className="flex justify-between px-2 py-[9px]">
              <span className="text-[#6B6B6B] text-[12px] font-medium w-[140px]">
                当日
              </span>
              <span className="text-[#1C1C1C] text-[12px] font-normal">
                宿泊代の100％
              </span>
            </div>
          </div>

          {/* 免責事項・環境カード（WQ2vh） */}
          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] overflow-hidden">
            {/* カードヘッダー（w3uft） */}
            <div className="bg-[#F5F3F0] rounded-t-xl px-[5px] py-[7px]">
              <h3 className="text-[#6B6B6B] text-[9px] font-semibold">
                免責事項・環境について
              </h3>
            </div>

            {/* リストコンテナ（pt8nJ） */}
            <div className="p-[9px] flex flex-col gap-3">
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 場内での事故、盗難、ペット間のトラブル等について、<br />
                　 当施設は一切の責任を負いません。
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ ゴミはサイト内のゴミ置き場で分別回収しております。<br />
                　 買い物はセブンイレブン 鉾田梶山店（徒歩30秒）が便利です。
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 県道に隣接しているため、時間帯によっては<br />
                　 車両の走行音が聞こえる場合がございます。
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 暴力団およびその関係者のご利用はお断りいたします。
              </p>
            </div>
          </div>
        </section>

        {/* 基本ルール・禁止事項 */}
        <section className="w-full flex flex-col gap-3">
          <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
            基本ルール・禁止事項
          </h2>

          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] overflow-hidden">
            <div className="bg-[#F5F3F0] rounded-t-xl px-[5px] py-[7px]">
              <h3 className="text-[#6B6B6B] text-[9px] font-semibold">
                禁止行為
              </h3>
            </div>

            <div className="p-[9px] flex flex-col gap-3">
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 焚き火・直火は全面禁止です
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 花火、爆竹などの火薬類の使用禁止
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 騒音行為（22時〜翌7時は静粛にお願いします）
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ サイト内への車両進入（指定場所のみ可）
              </p>
              <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
                ・ 他のお客様のサイトへの無断立ち入り
              </p>
            </div>
          </div>
        </section>

        {/* グループ利用の制限 */}
        <section className="w-full flex flex-col gap-3">
          <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
            グループ利用の制限
          </h2>

          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] p-[9px] flex flex-col gap-3">
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ 1サイトあたりの最大利用人数は4名までです
            </p>
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ 複数サイトをまたぐグループ利用の場合、事前にご相談ください
            </p>
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ 大人数でのイベント利用は別途ご相談ください
            </p>
          </div>
        </section>

        {/* ペット同伴規約 */}
        <section className="w-full flex flex-col gap-3">
          <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
            ペット同伴規約
          </h2>

          <div className="w-full bg-white rounded-xl border border-[#E8E5E0] p-[9px] flex flex-col gap-3">
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ ペット同伴の詳細ルールは「ペット同伴ルール」ページをご確認ください
            </p>
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ 犬種制限があります（シングルコートの犬種のみ）
            </p>
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ リードの着用は必須です
            </p>
            <p className="text-[#1C1C1C] text-[9px] leading-[1.6]">
              ・ 無駄吠えにご注意ください
            </p>
          </div>
        </section>

        {/* 重要な注意事項 */}
        <div className="w-full bg-[#FFF9E6] border border-[#F4D799] rounded-xl p-3 flex flex-col gap-2">
          <h3 className="text-[#8B6914] text-[9px] font-semibold flex items-center gap-2">
            ⚠️ ご協力のお願い
          </h3>
          <p className="text-[#6B5A2A] text-[7px] font-normal leading-[1.7]">
            規約に違反する行為が見られた場合、ご退場をお願いすることがございます。
            すべてのお客様が快適に過ごせるよう、ご理解とご協力をお願いいたします。
          </p>
        </div>
      </div>
    </div>
  );
}
