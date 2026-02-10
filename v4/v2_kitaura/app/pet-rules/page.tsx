'use client';

export default function PetRulesPage() {
  const allowedBreeds = [
    { name: 'プードル', note: 'スタンダード / ミディアム / トイ' },
    { name: 'プードルミックス（○○プー）', note: '※ 抜け毛が少ないなど、プードルの特徴を引き継いでいる場合' },
    { name: 'ヨークシャーテリア', note: null },
    { name: 'ミニチュアシュナウザー', note: null },
    { name: 'ビションフリーゼ', note: null },
    { name: 'マルチーズ', note: null },
    { name: 'シーズー', note: null },
    { name: 'チャイニーズクレステッドドッグ', note: null },
    { name: 'オーストラリアン・ラブラドゥードル（AL）', note: null },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ルートフレーム（GsBK0） */}
      <div className="w-full max-w-[375px] mx-auto py-[21px] px-[25px] flex flex-col gap-[21px] items-center">
        
        {/* ヘッダー（AydsY） */}
        <header className="w-full flex flex-col gap-[7px] items-center">
          <h1 className="text-[#1C1C1C] text-[18px] font-light tracking-[-0.5px]">
            犬種制限について
          </h1>
        </header>

        {/* ワンちゃん同伴ルール（OL9lQ） */}
        <section className="w-full flex flex-col gap-[9px]">
          
          {/* ヘッダー（Ouc4S） */}
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              入場可能なワンちゃんについて
            </h2>
            <p className="text-[#6B6B6B] text-[7px] font-normal leading-[1.7]">
              アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。
            </p>
          </div>

          {/* カード行（b8Mbm） */}
          <div className="w-full flex flex-col gap-[7px]">
            
            {/* 同伴可能カード（hgZNS） */}
            <div className="w-full bg-white rounded-[7px] border border-[#D4E8D4] p-[9px] flex flex-col gap-[6px]">
              {/* ラベル（HhSdX） */}
              <h3 className="text-[#5A8A5A] text-[7px] font-semibold tracking-[0.5px]">
                同伴可能な犬種
              </h3>

              {/* リスト（B6Au1） */}
              <ul className="w-full flex flex-col gap-1">
                {allowedBreeds.map((breed, index) => (
                  <li key={index} className="flex flex-col">
                    <span className="text-[#1C1C1C] text-[9px] font-normal">
                      {breed.name}
                    </span>
                    {breed.note && (
                      <span className="text-[#9A9A9A] text-[7px] font-normal leading-[1.5] pl-2">
                        {breed.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 同伴不可カード */}
            <div className="w-full bg-white rounded-[7px] border border-[#E8C8C8] p-[9px] flex flex-col gap-[6px]">
              <h3 className="text-[#A55858] text-[7px] font-semibold tracking-[0.5px]">
                同伴できない犬種
              </h3>
              <p className="text-[#1C1C1C] text-[9px] font-normal">
                上記以外の犬種（ダブルコート）
              </p>
              <p className="text-[#9A9A9A] text-[7px] font-normal leading-[1.5] pl-2">
                ※ シェパード、レトリバー、柴犬など、換毛期に下毛が抜ける犬種
              </p>
            </div>
          </div>
        </section>

        {/* 小鳥同伴ルールセクション */}
        <section className="w-full flex flex-col gap-[9px]">
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              小鳥同伴について
            </h2>
            <p className="text-[#6B6B6B] text-[7px] font-normal leading-[1.7]">
              適切なケージで管理いただける場合に限り、小鳥の同伴も可能です。
            </p>
          </div>

          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-[9px] flex flex-col gap-[6px]">
            <h3 className="text-[#6B6B6B] text-[7px] font-semibold tracking-[0.5px]">
              受け入れ条件
            </h3>
            <ul className="text-[#1C1C1C] text-[9px] font-normal space-y-2">
              <li>• 専用ケージでの管理（放鳥禁止）</li>
              <li>• 鳴き声が過度に大きくない種類</li>
              <li>• 糞の適切な処理</li>
              <li>• 他のお客様へのご配慮</li>
            </ul>
          </div>
        </section>

        {/* ペットマナーセクション */}
        <section className="w-full flex flex-col gap-[9px]">
          <div className="w-full flex flex-col gap-1">
            <h2 className="text-[#1C1C1C] text-[12px] font-medium tracking-[-0.3px]">
              場内マナー
            </h2>
            <p className="text-[#6B6B6B] text-[7px] font-normal leading-[1.7]">
              すべてのお客様が快適に過ごせるよう、以下のマナーをお守りください。
            </p>
          </div>

          <div className="w-full bg-white rounded-[7px] border border-[#E8E5E0] p-[9px] flex flex-col gap-[6px]">
            <ul className="text-[#1C1C1C] text-[9px] font-normal space-y-3">
              <li>
                <span className="font-semibold">リードの着用</span>
                <p className="text-[7px] text-[#6B6B6B] mt-1 leading-[1.6]">
                  場内では必ずリードを着用してください。他のお客様やペットとの接触を避けるため、リードは短めにお持ちください。
                </p>
              </li>
              <li>
                <span className="font-semibold">排泄物の処理</span>
                <p className="text-[7px] text-[#6B6B6B] mt-1 leading-[1.6]">
                  排泄物は必ず飼い主様が責任を持って処理してください。専用のゴミ袋をご用意しております。
                </p>
              </li>
              <li>
                <span className="font-semibold">無駄吠えの防止</span>
                <p className="text-[7px] text-[#6B6B6B] mt-1 leading-[1.6]">
                  夜間（22時〜翌7時）は特に静粛にお願いします。継続的な吠え声がある場合、ご退場をお願いすることがあります。
                </p>
              </li>
              <li>
                <span className="font-semibold">サニタリー棟への入場禁止</span>
                <p className="text-[7px] text-[#6B6B6B] mt-1 leading-[1.6]">
                  衛生管理のため、ペットをサニタリー棟内に連れての入場はご遠慮ください。
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* 注意事項 */}
        <div className="w-full bg-[#FFF9E6] border border-[#F4D799] rounded-[7px] p-[12px] flex flex-col gap-2">
          <h3 className="text-[#8B6914] text-[9px] font-semibold flex items-center gap-2">
            ⚠️ 重要なお願い
          </h3>
          <p className="text-[#6B5A2A] text-[7px] font-normal leading-[1.7]">
            ペットの体調管理は飼い主様の責任となります。万が一、場内で体調不良や事故が発生した場合、当施設は一切の責任を負いかねますのでご了承ください。
          </p>
        </div>
      </div>
    </div>
  );
}
