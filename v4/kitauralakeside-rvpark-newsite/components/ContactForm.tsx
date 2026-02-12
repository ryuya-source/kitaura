"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const FORM_SUBMIT_URL = "https://formsubmit.co/info@kitauralakeside.com";

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const nextInputRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  function setNextUrl() {
    if (typeof window === "undefined" || !nextInputRef.current) return;
    nextInputRef.current.value = `${window.location.origin}/contact/complete`;
  }

  function handleSubmit() {
    setNextUrl();
    if (submitBtnRef.current) {
      submitBtnRef.current.disabled = true;
      submitBtnRef.current.textContent = "送信中...";
    }
  }

  return (
    <div
      className="contact-page-wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) router.push("/");
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") router.push("/");
      }}
    >
      <div className="contact-page" onClick={(e) => e.stopPropagation()}>
        <div className="contact-page__header">
          <h1 className="contact-page__title">お問い合わせ</h1>
          <Link href="/" className="contact-page__close" aria-label="TOPに戻る">
            ×
          </Link>
        </div>

        <form
          ref={formRef}
          className="contact-form"
          action={FORM_SUBMIT_URL}
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="_subject"
            value="【北浦レイクサイドRVパーク】お問い合わせ"
          />
          <input
            ref={nextInputRef}
            type="hidden"
            name="_next"
            value=""
            id="form-next"
          />
          <input type="hidden" name="_captcha" value="false" />

          <div className="form-group">
            <label>
              お名前 <span className="required">必須</span>
            </label>
            <input
              type="text"
              name="お名前"
              required
              placeholder="例：山田 太郎"
            />
          </div>

          <div className="form-group">
            <label>
              メールアドレス <span className="required">必須</span>
            </label>
            <input
              type="email"
              name="メールアドレス"
              required
              placeholder="例：example@email.com"
            />
          </div>

          <div className="form-group">
            <label>
              電話番号 <span className="required">必須</span>
            </label>
            <input
              type="tel"
              name="電話番号"
              required
              placeholder="例：090-1234-5678"
            />
          </div>

          <div className="form-group">
            <label>
              ご希望のお日にち <span className="required">必須</span>
            </label>
            <input type="date" name="ご希望のお日にち" required />
          </div>

          <div className="form-group">
            <label>
              ご利用人数 <span className="required">必須</span>
            </label>
            <select name="ご利用人数" required>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>ご希望のご宿泊スタイル</label>
            <select name="ご希望のご宿泊スタイル">
              <option value="">選択してください</option>
              <option value="テント泊">テント泊</option>
              <option value="車中泊">車中泊</option>
              <option value="両方">両方</option>
            </select>
          </div>

          <div className="form-group">
            <label>チェックイン時間</label>
            <select name="チェックイン時間">
              <option value="">選択してください</option>
              {[12, 13, 14, 15, 16, 17, 18].flatMap((h) =>
                [0, 15, 30, 45].map((m) => {
                  const value = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
                  const label = m === 0 ? `${h}:00` : `${h}:${m.toString().padStart(2, "0")}`;
                  return h === 18 && m > 0 ? null : (
                    <option key={value} value={value}>{label}</option>
                  );
                })
              ).filter(Boolean)}
            </select>
          </div>

          <div className="form-group">
            <label>ワンちゃんの頭数</label>
            <select name="ワンちゃんの頭数">
              <option value="なし">なし</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <p className="form-note">※ペット同伴されない場合は「なし」をご選択ください。</p>
          </div>

          <div className="form-group">
            <label>犬種</label>
            <input
              type="text"
              name="犬種"
              placeholder="例：トイプードル"
            />
            <p className="form-note">
              ※アレルギー対策のため、プードル（スタンダード・ミディアム・トイ）・ヨークシャテリア・ミニチュアシュナウザー・ビジョンフリーゼ・マルチーズ・シーズー・チャイニーズクレステッドドッグ・オーストラリアン・ラブラドゥードルに制限があります。上記犬種の組み合わせ以外のプードルミックス（チワプー・ダップー・ポメプー・ペキプー等）はご入場いただけます。
            </p>
          </div>

          <div className="form-group">
            <label>お問い合わせ内容</label>
            <textarea
              name="お問い合わせ内容"
              placeholder="ご質問・ご要望などをご記入ください"
            />
          </div>

          <button
            ref={submitBtnRef}
            type="submit"
            className="form-submit"
            id="submit-btn"
          >
            送信する
          </button>
        </form>

        <p className="contact-page__privacy">
          ご入力いただいた個人情報は、お問い合わせへの対応およびご連絡の目的でのみ利用し、適切に管理いたします。第三者に開示・提供することはありません。
        </p>
      </div>
    </div>
  );
}
