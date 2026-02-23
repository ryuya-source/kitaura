"use client";

import Link from "next/link";
import { useRef } from "react";

const FORM_SUBMIT_URL = "https://formsubmit.co/info@kitauralakeside.com";

export default function ContactForm() {
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
    <div className="contact-page-wrapper">
      <div className="contact-page">
        <h1 className="contact-page__title">お問合せページ</h1>

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
            <input
              type="number"
              name="ご利用人数"
              required
              min={1}
              placeholder="例：2"
            />
          </div>

          <div className="form-group">
            <label>チェックイン時間</label>
            <input
              type="text"
              name="チェックイン時間"
              placeholder="例：14時〜15時"
            />
          </div>

          <div className="form-group">
            <label>ワンちゃんの頭数と犬種</label>
            <textarea
              name="ワンちゃんの頭数と犬種"
              placeholder="例：1頭・トイプードル　※同伴されない場合は「なし」とご入力ください"
            />
            <p className="form-note">
              ※ペット同伴されない場合は「なし」とご入力お願いします。
              <br />
              ※アレルギー対策のため、プードル（スタンダード・ミディアム・トイ）・ヨークシャテリア・ミニチュアシュナウザー・ビジョンフリーゼ・マルチーズ・シーズー・チャイニーズクレステッドドッグ・オーストラリアン・ラブラドゥードルに制限があります。上記犬種の組み合わせ以外のプードルミックス（チワプー・ダップー・ポメプー・ペキプー等）はご入場いただけます。
            </p>
          </div>

          <div className="form-group">
            <label>
              お問い合わせ内容 <span className="required">必須</span>
            </label>
            <textarea
              name="お問い合わせ内容"
              required
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

        <Link href="/" className="contact-page__back">
          TOPに戻る
        </Link>

        <p className="contact-page__privacy">
          ご入力いただいた個人情報は、お問い合わせへの対応およびご連絡の目的でのみ利用し、適切に管理いたします。第三者に開示・提供することはありません。
        </p>
      </div>
    </div>
  );
}
