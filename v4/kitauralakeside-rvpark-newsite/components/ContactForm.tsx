"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const FORM_SUBMIT_URL = "https://formsubmit.co/info@kitauralakeside.com";

type DogRow = { breed: string; count: number };

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const nextInputRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [companionMode, setCompanionMode] = useState<"" | "none" | "yes">("");
  const [dogRows, setDogRows] = useState<DogRow[]>([{ breed: "", count: 1 }]);

  const totalDogs = dogRows.reduce((s, r) => s + r.count, 0);
  const canAddRow = companionMode === "yes" && dogRows.length < 4 && totalDogs < 4;

  function setNextUrl() {
    if (typeof window === "undefined" || !nextInputRef.current) return;
    nextInputRef.current.value = `${window.location.origin}/contact/complete`;
  }

  function handleCompanionChange(value: "" | "none" | "yes") {
    setCompanionMode(value);
    if (value === "yes") setDogRows([{ breed: "", count: 1 }]);
  }

  function addDogRow() {
    if (!canAddRow) return;
    setDogRows((prev) => [...prev, { breed: "", count: 1 }]);
  }

  function removeDogRow(index: number) {
    if (dogRows.length <= 1) return;
    setDogRows((prev) => prev.filter((_, i) => i !== index));
  }

  function updateDogRow(index: number, field: "breed" | "count", value: string | number) {
    setDogRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (companionMode === "yes") {
      const valid = totalDogs >= 1 && totalDogs <= 4 && dogRows.every((r) => r.breed.trim() !== "");
      if (!valid) {
        e.preventDefault();
        alert("同伴「あり」の場合は、合計1〜4頭で犬種を入力してください。");
        return;
      }
    }
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
          onSubmit={(e) => handleSubmit(e)}
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
              ご連絡先 <span className="required">必須</span>
            </label>
            <input
              type="tel"
              name="ご連絡先"
              required
              placeholder="例：090-1234-5678"
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
              ご希望のお日にち <span className="required">必須</span>
            </label>
            <input type="date" name="ご希望のお日にち" required />
          </div>

          <div className="form-group">
            <label>
              ご利用人数 <span className="required">必須</span>
            </label>
            <select name="ご利用人数" required>
              <option value="">選択してください</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              チェックイン時間 <span className="required">必須</span>
            </label>
            <select name="チェックイン時間" required>
              <option value="">選択してください</option>
              <option value="13時〜14時">13時〜14時</option>
              <option value="14時〜15時">14時〜15時</option>
              <option value="15時〜16時">15時〜16時</option>
              <option value="16時〜17時">16時〜17時</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              ご希望のサイト番号 <span className="required">必須</span>
            </label>
            <select name="ご希望のサイト番号" required>
              <option value="">選択してください</option>
              <option value="サイト1">サイト1</option>
              <option value="サイト2">サイト2</option>
              <option value="サイト3">サイト3</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              ワンちゃんの犬種・頭数 <span className="required">必須</span>
            </label>
            <p className="form-note form-note--under-label">
              同伴されない場合は「なし」を選択してください。
            </p>
            <div className="form-row form-row--dog-first">
              <div className="form-row__select-wrap form-row__select-wrap--full">
                <select
                  name="ワンちゃんの同伴"
                  required
                  value={companionMode}
                  onChange={(e) => handleCompanionChange(e.target.value as "" | "none" | "yes")}
                  aria-label="ワンちゃんの同伴"
                >
                  <option value="">選択してください</option>
                  <option value="none">なし</option>
                  <option value="yes">あり</option>
                </select>
              </div>
            </div>
            {companionMode === "none" && (
              <>
                <input type="hidden" name="ワンちゃんの頭数" value="0" />
                <input type="hidden" name="ワンちゃんの犬種" value="なし" />
              </>
            )}
            {companionMode === "yes" && (
              <>
                <input type="hidden" name="ワンちゃんの頭数" value={totalDogs} />
                <div className="form-rows-dog form-rows-dog--breed-count">
                  {dogRows.map((row, i) => (
                    <div key={i} className="form-row form-row--dog-breed-count">
                      <input
                        type="text"
                        name={`ワンちゃんの犬種_${i + 1}`}
                        value={row.breed}
                        onChange={(e) => updateDogRow(i, "breed", e.target.value)}
                        placeholder="トイプードル"
                        className="form-row__input form-row__input--breed"
                        aria-label={`${i + 1}行目 犬種`}
                      />
                      <div className="form-row__select-wrap form-row__select-wrap--count">
                        <select
                          name={`ワンちゃんの頭数_${i + 1}`}
                          value={row.count}
                          onChange={(e) => updateDogRow(i, "count", Number(e.target.value))}
                          aria-label={`${i + 1}行目 頭数`}
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>{n}頭</option>
                          ))}
                        </select>
                      </div>
                      {dogRows.length > 1 && (
                        <button
                          type="button"
                          className="form-row__remove"
                          onClick={() => removeDogRow(i)}
                          aria-label={`${i + 1}行目を削除`}
                        >
                          削除
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {canAddRow && (
                  <button
                    type="button"
                    className="form-add-row"
                    onClick={addDogRow}
                  >
                    ＋ 行を追加
                  </button>
                )}
              </>
            )}
            <p className="form-note">
              ⚠️アレルギー対策の為、犬種制限あり。ご入場可能な犬種につきましては
              <Link href="/pet" className="form-note__link">犬種制限について</Link>
              よりご確認をお願いいたします。
            </p>
          </div>

          <div className="form-group">
            <label>
              当rvパークのご利用は初めてですか？ <span className="required">必須</span>
            </label>
            <select name="当rvパークのご利用は初めてですか？" required>
              <option value="">選択してください</option>
              <option value="はい（初めて）">はい（初めて）</option>
              <option value="いいえ（利用したことがある）">いいえ（利用したことがある）</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              ご希望のご宿泊スタイル <span className="required">必須</span>
            </label>
            <select name="ご希望のご宿泊スタイル" required>
              <option value="">選択してください</option>
              <option value="車中泊">車中泊</option>
              <option value="テント泊">テント泊</option>
              <option value="両方">両方</option>
            </select>
          </div>

          <p className="form-note">
            メッセージを確認して担当者から順次返信します。
          </p>

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
