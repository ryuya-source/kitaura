import Link from "next/link";

export const metadata = {
  title: "送信完了 - KITAURA LAKESIDE RV park",
  robots: "noindex",
};

export default function ContactCompletePage() {
  return (
    <div className="complete-page-wrapper">
      <div className="complete-page">
        <h1 className="complete-page__title">送信完了</h1>
        <p className="complete-page__message">
          メッセージを確認して担当者から順次返信します。
          <br />
          予約について不明点がありましたら、お気軽にご連絡ください。
        </p>
        <Link href="/" className="complete-page__back">
          TOPに戻る
        </Link>
      </div>
    </div>
  );
}
