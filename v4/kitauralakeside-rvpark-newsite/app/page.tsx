import Link from "next/link";
import HeaderWithNav from "@/components/HeaderWithNav";
import { FixedCta } from "@/components/BookingModal";
import ImageRow from "@/components/ImageRow";
import Sp7AccessSection from "@/components/Sp7AccessSection";
import Sp8MediaSection from "@/components/Sp8MediaSection";
import {
  Droplets,
  Dog,
  Plus,
  Building2,
  Moon,
  Flame,
  VolumeX,
  Cigarette,
  CircleDot,
  Ban,
  Calendar,
} from "lucide-react";

const WATER_FALLBACK = [
  "01_サイト１案内_トイレ.jpg",
  "02_サイト１案内_シャワー.jpg",
  "03_サイト１案内_シャワールーム.jpg",
  "04_サイト１案内_炊事場.jpg",
  "05_サイト１案内_トイレシャワー.jpg",
];
const SMALL_DOG_FALLBACK = ["01_61259783.jpg", "02__18489346-768x576.jpg"];
const OTHER_FALLBACK = ["01-elec.jpg", "02-trash.jpg", "2A6B4F16-ACCB-405A-92CA-A986F84FC3A1.jpg"];
const NEARBY_FALLBACK = ["01-セブンイレブン.png", "02-image_side.jpg"];
const SITE1_FALLBACK = ["02_サイト１案内_景観.jpg", "03_サイト１案内_広さ-768x576.jpg"];
const SITE2_FALLBACK = ["S__38764551_0.jpg", "S__38764547_0.jpg"];
const SITE3_FALLBACK = ["S__61259783.jpg", "119EDFE4-613C-4D14-8D52-82CF48CADF7E.jpg"];

export default function Home() {
  return (
    <>
      <div className="sp0-top" aria-label="TOP画面">
        <HeaderWithNav />
        <main className="content-area">
          <h1 className="main-title">大切な人と、心ほどける時間</h1>
        </main>
      </div>

      <section className="sp2-pet" id="pet">
        <div className="pet-main-content">
          <div className="glass-card">
            <h2 className="glass-card__title">
              {"犬種制限と\nペット同伴のマナー"}
            </h2>
            <p className="glass-card__desc">
              ペットも、飼い主さまも、
              <br />
              そして周囲の方々も穏やかに過ごせるように。
              <br />
              受け入れ条件と場内ルールをご案内しています。
            </p>
          </div>
          <Link href="/pet" className="pet-cta-btn">
            <span className="pet-cta-btn__text">ペット同伴ルールを見る</span>
          </Link>
        </div>
      </section>

      <main className="info-page" id="feature">
        <div className="section-title-row" aria-label="こだわりポイント">
          <div className="section-title-row__left" aria-hidden />
          <div className="section-title-row__center">
            <h1 className="section-title">こだわりポイント</h1>
          </div>
          <div className="section-title-row__right" aria-hidden />
        </div>

        <section className="feature-section">
          <h2 className="subheading">
            <span className="icon-wrapper">
              <Droplets size={14} strokeWidth={2} />
            </span>
            全サイト水回り・電源完備
          </h2>
          <p className="subtext">トイレ・シャワー・炊事場・電源完備</p>
          <ImageRow folder="1-watter" fallbackNames={WATER_FALLBACK} aria-label="水回り写真" />
          <div className="note-link">← スクロールして他の写真を見る →</div>
        </section>

        <section className="feature-section">
          <h2 className="subheading">
            <span className="icon-wrapper">
              <Dog size={14} strokeWidth={2} />
            </span>
            小型犬対応
          </h2>
          <p className="subtext">小型犬に配慮した設計・ゲートを閉じるとドックランになります</p>
          <ImageRow folder="2_dog" fallbackNames={SMALL_DOG_FALLBACK} />
        </section>

        <section className="feature-section">
          <h2 className="subheading">
            <span className="icon-wrapper">
              <Plus size={14} strokeWidth={2} />
            </span>
            その他
          </h2>
          <p className="subtext">ゴミ置き場・コードリール完備・エアコンの有料貸出し(夏季限定)</p>
          <ImageRow folder="3_els" fallbackNames={OTHER_FALLBACK} />
        </section>

        <section className="feature-section">
          <h2 className="subheading">
            <span className="icon-wrapper">
              <Building2 size={14} strokeWidth={2} />
            </span>
            周辺環境
          </h2>
          <p className="subtext">セブンイレブン徒歩30秒の好立地・夕陽や花火大会も絶景</p>
          <ImageRow folder="4_nearby" fallbackNames={NEARBY_FALLBACK} />
        </section>

        <div className="site-type-notice" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source media="(max-width: 768px)" srcSet="/src/anime/apology4_trim_tight_nofade.png" />
            <img src="/src/anime/apology4.png" alt="" className="site-type-notice__img" loading="lazy" />
          </picture>
        </div>

        <h1 className="section-title" id="site-type">サイト種別</h1>
        <section className="site-block feature-section">
          <h3 className="site-title">サイト1</h3>
          <ImageRow folder="site_no1" fallbackNames={SITE1_FALLBACK} />
        </section>
        <section className="site-block feature-section">
          <h3 className="site-title">サイト2</h3>
          <ImageRow folder="site_no2" fallbackNames={SITE2_FALLBACK} />
        </section>
        <section className="site-block feature-section">
          <h3 className="site-title">サイト3</h3>
          <ImageRow folder="site_no3" fallbackNames={SITE3_FALLBACK} />
        </section>

        <h1 className="section-title" id="price">料金</h1>
        <section className="table-section pricing-section">
          <div className="table-label pricing-heading">サイト別料金</div>
          <table>
            <thead>
              <tr>
                <th>項目</th>
                <th>サイト1</th>
                <th>サイト2</th>
                <th>サイト3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>広さ</td>
                <td>8m × 15m</td>
                <td>11m × 13m</td>
                <td>12m × 9m</td>
              </tr>
              <tr>
                <td>定員</td>
                <td>5名</td>
                <td>5名</td>
                <td>3名</td>
              </tr>
              <tr>
                <td>電員容量</td>
                <td>15A</td>
                <td>15A</td>
                <td>20A</td>
              </tr>
              <tr>
                <td>平日料金</td>
                <td>¥6,500</td>
                <td>¥6,500</td>
                <td>¥7,000</td>
              </tr>
              <tr>
                <td>土日祝料金</td>
                <td>¥9,500</td>
                <td>¥9,500</td>
                <td>¥10,000</td>
              </tr>
              <tr>
                <td>ハイシーズン</td>
                <td>¥11,000</td>
                <td>¥11,000</td>
                <td>¥11,500</td>
              </tr>
            </tbody>
          </table>
          <div className="table-note">※ハイシーズンはGW、7/20〜8/31、花火大会開催日、12/31〜1/2</div>
        </section>

        <section className="pricing-section">
          <h2 className="subheading pricing-heading">ペット料金・頭数制限</h2>
          <div className="card">
            <div className="check-item"><span className="check">✓</span><span>基本料金：2頭まで無料</span></div>
            <div className="check-item"><span className="check">✓</span><span>追加料金：3頭目以降は1頭につき＋500円</span></div>
            <div className="check-item"><span className="check">✓</span><span>受入上限：最大4頭まで同伴可能</span></div>
          </div>
        </section>
        <section className="pricing-section">
          <h2 className="subheading pricing-heading">オプション</h2>
          <div className="card">
            <div className="check-item"><span className="check">✓</span><span>人数追加は+2,000円／1名（大人・子供・幼児共通）</span></div>
          </div>
        </section>

        <section className="sp6-terms" id="terms">
          <div className="sp6-terms__page">
            <h1 className="sp6-terms__title">利用規約・マナー</h1>
            <p className="sp6-terms__subtitle" />

            <section>
              <h2 className="sp6-terms__section-title">予約・キャンセル・その他</h2>
              <div className="sp6-terms__table-card">
                <div className="sp6-terms__table-label">チェックイン・アウト</div>
                <div className="sp6-terms__rows sp6-terms__rows--w140">
                  <div className="sp6-terms__row"><span className="sp6-terms__row-label">IN</span><span>13:00 〜 17:00</span></div>
                  <div className="sp6-terms__row"><span className="sp6-terms__row-label">OUT</span><span>〜 10:00</span></div>
                </div>
              </div>
              <div className="sp6-terms__table-card">
                <div className="sp6-terms__table-label">キャンセルポリシー</div>
                <div className="sp6-terms__rows sp6-terms__rows--w140">
                  <div className="sp6-terms__row"><span className="sp6-terms__row-label">1日前 〜 3日前</span><span>宿泊代の50%</span></div>
                  <div className="sp6-terms__row"><span className="sp6-terms__row-label">当日</span><span>宿泊代の100%</span></div>
                </div>
              </div>
              <div className="sp6-terms__table-card">
                <div className="sp6-terms__table-label">免責事項・環境について</div>
                <div className="sp6-terms__table-body--pad">
                  <div className="sp6-terms__bullets">
                    <div className="sp6-terms__bullet">場内での事故、盗難、ペット間のトラブル等について、<br />当施設は一切の責任を負いません。</div>
                    <div className="sp6-terms__bullet">ゴミはサイト内のゴミ置き場で分別回収しております。<br />買い物はセブンイレブン 鉾田梶山店（徒歩30秒）が便利です。</div>
                    <div className="sp6-terms__bullet">県道に隣接しているため、時間帯によっては<br />車両の走行音が聞こえる場合がございます。</div>
                    <div className="sp6-terms__bullet">暴力団およびその関係者のご利用はお断りいたします。</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="sp6-terms__section-title">基本ルール・禁止事項</h2>
              <div className="sp6-terms__rule-card">
                {[
                  { icon: Moon, title: "クワイエットタイム：21:00 〜 翌7:00", desc: "話し声や生活音が隣のサイトに漏れないようご配慮ください" },
                  { icon: Flame, title: "直火禁止（焚き火台・焚き火シート必須）", desc: "床は指定の灰捨て場へ処理をお願いします" },
                  { icon: VolumeX, title: "騒音・音響の制限", desc: "音楽は隣のサイトに聞こえない音量で。アイドリング禁止。" },
                  { icon: Cigarette, title: "喫煙はご自身のサイト内のみ" },
                  { icon: CircleDot, title: "サッカーやフリスビー等、飛んでいく遊具の使用禁止" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="sp6-terms__rule-item">
                    <div className="sp6-terms__rule-icon"><Icon size={12} strokeWidth={2} /></div>
                    <div>
                      <div className="sp6-terms__rule-title">{title}</div>
                      {desc && <div className="sp6-terms__rule-desc">{desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="sp6-terms__section-title">グループ利用の制限</h2>
              <div className="sp6-terms__rule-card">
                <div className="sp6-terms__rule-item">
                  <div className="sp6-terms__rule-icon"><Ban size={12} strokeWidth={2} /></div>
                  <div>
                    <div className="sp6-terms__rule-title">グループ利用不可</div>
                    <div className="sp6-terms__rule-desc">複数サイト予約、代表者名を変えての予約、現地での合流行為は一切禁止</div>
                  </div>
                </div>
                <div className="sp6-terms__rule-item">
                  <div className="sp6-terms__rule-icon"><Calendar size={12} strokeWidth={2} /></div>
                  <div>
                    <div className="sp6-terms__rule-title">予約頻度の制限</div>
                    <div className="sp6-terms__rule-desc">土曜・祝日のご予約は、1組につき「月に1回まで」（連泊除く）</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="sp6-terms__section-title">ペット同伴規約</h2>
              <p className="sp6-terms__text sp6-terms__text--muted">愛犬と安心して過ごせるよう、マナーの遵守をお願いします。</p>
              <div className="sp6-terms__rule-card">
                <div className="sp6-terms__rule-item">
                  <div className="sp6-terms__rule-icon"><Dog size={12} strokeWidth={2} /></div>
                  <div>
                    <div className="sp6-terms__rule-title">サイト外はリード着用</div>
                    <div className="sp6-terms__rule-desc">サイト外では必ずリード着用。共有スペースで2m以内。</div>
                  </div>
                </div>
                <div className="sp6-terms__rule-item">
                  <div className="sp6-terms__rule-icon"><Dog size={12} strokeWidth={2} /></div>
                  <div>
                    <div className="sp6-terms__rule-title">噛みつき・破壊癖のあるペットは利用不可</div>
                  </div>
                </div>
                <div className="sp6-terms__rule-item">
                  <div className="sp6-terms__rule-icon"><Ban size={12} strokeWidth={2} /></div>
                  <div>
                    <div className="sp6-terms__rule-title">制限外の動物の持ち込み禁止</div>
                    <div className="sp6-terms__rule-desc">発覚した場合は即退場（返金なし）</div>
                  </div>
                </div>
              </div>
              <div className="sp6-terms__pet-note">ペット同士のトラブルについて、施設側は責任を負いかねます。</div>
            </section>

            <section>
              <h2 className="sp6-terms__section-title">小鳥（オウム・インコ）の同伴について</h2>
              <div className="sp6-terms__check-card">
                <div className="sp6-terms__check-item"><span className="sp6-terms__check">✓</span><span>キャンピングカー利用の方のみ<br /><span className="sp6-terms__text sp6-terms__text--muted">テント泊での同伴はできません</span></span></div>
                <div className="sp6-terms__check-item"><span className="sp6-terms__check">✓</span><span>1羽まで</span></div>
                <div className="sp6-terms__check-item"><span className="sp6-terms__check">✓</span><span>必ずケージ内でお過ごしください（放鳥不可）</span></div>
                <div className="sp6-terms__check-item"><span className="sp6-terms__check">✓</span><span>鳴き声など、周囲へのご配慮をお願いします</span></div>
              </div>
            </section>
          </div>
        </section>

        <Sp7AccessSection />
        <Sp8MediaSection />
      </main>

      <FixedCta />
    </>
  );
}
