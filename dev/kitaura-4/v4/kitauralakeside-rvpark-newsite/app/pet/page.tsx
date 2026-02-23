import Link from "next/link";

export const metadata = {
  title: "ペット同伴ルール - KITAURA LAKESIDE RV park",
  robots: "noindex",
};

export default function PetPage() {
  const dogBreeds = [
    "プードル",
    "プードルミックス（○○プー）",
    "ヨークシャーテリア",
    "ミニチュアシュナウザー",
    "ビションフリーゼ",
    "マルチーズ",
    "シーズー",
    "チャイニーズクレステッドドッグ",
    "オーストラリアン・ラブラドゥードル（AL）",
  ];

  return (
    <div className="pet-rules-wrapper">
      <main className="pet-rules-page" aria-label="ペット同伴ルール">
        <div className="pet-rules-title-row" aria-label="犬種制限について">
          <div className="pet-rules-title-row__left" aria-hidden />
          <h1 className="pet-rules-page__title">犬種制限について</h1>
          <div className="pet-rules-title-row__right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/src/anime/dog-kezukuroi.png"
              alt=""
              className="pet-rules-title-row__img"
              width={44}
              height={57}
              loading="eager"
            />
          </div>
        </div>

        <section className="pet-rules-section" aria-labelledby="dog-heading">
          <div className="pet-rules-section__header">
            <h2 className="pet-rules-section__header-title" id="dog-heading">
              入場可能なワンちゃんについて
            </h2>
            <p className="pet-rules-section__header-desc">
              アレルギー反応が出にくい環境を維持するため、抜け毛の少ないシングルコートの犬種に限定しています。
            </p>
          </div>
          <div className="pet-rules-card">
            <span className="pet-rules-card__label">同伴可能な犬種</span>
            <div className="pet-rules-card__list">
              <div className="pet-rules-card__item">プードル</div>
              <div className="pet-rules-card__note pet-rules-card__note--indent">　スタンダード / ミディアム / トイ</div>
              <div className="pet-rules-card__item">プードルミックス（○○プー）</div>
              <div className="pet-rules-card__note">　※ 抜け毛が少ないなど、プードルの特徴を引き継いでいる場合</div>
              {dogBreeds.slice(2).map((name) => (
                <div key={name} className="pet-rules-card__item">{name}</div>
              ))}
            </div>
          </div>
          <Link href="/#terms" className="pet-rules-link">
            <span className="pet-rules-link__text">詳しくは利用規約・マナーをご確認ください</span>
            <span className="pet-rules-link__underline" aria-hidden />
          </Link>
        </section>

        <h2 className="pet-rules-page__title">なぜ犬種制限があるのか</h2>
        <div className="pet-rules-slider">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pet-rules-slider__img"
            src="/src/dog_breeds/slide_01.png"
            alt="犬種制限の説明"
            width={276}
            height={191}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="pet-rules-pagination" role="group" aria-label="スライダー操作">
          <button type="button" className="pet-rules-pagination__btn" aria-label="前へ">前</button>
          <span className="pet-rules-pagination__info">1 / 9</span>
          <button type="button" className="pet-rules-pagination__btn" aria-label="次へ">次</button>
        </div>
      </main>
      <div className="pet-rules-footer">
        <Link href="/#booking" className="pet-rules-footer__btn">予約・空き確認</Link>
      </div>
    </div>
  );
}
