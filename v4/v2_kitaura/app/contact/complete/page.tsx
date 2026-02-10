import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-12 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-[#6B8E6B]" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          送信完了
        </h1>
        
        <p className="text-gray-600 mb-8">
          お問い合わせありがとうございました。<br />
          メッセージを確認して担当者から順次返信します。<br />
          予約について不明点がありましたら、お気軽にご連絡ください。
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-[#6B8E6B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5A7A5A] transition-colors"
          >
            TOPページへ戻る
          </Link>

          <div className="text-sm text-gray-500">
            <p>お急ぎの場合は、以下からもお問い合わせいただけます</p>
            <p className="mt-2">
              電話：<a href="tel:07084148109" className="text-[#6B8E6B] hover:underline">070-8414-8109</a>
            </p>
            <p>
              LINE：<a href="https://lin.ee/D9p4FmI" target="_blank" rel="noopener noreferrer" className="text-[#6B8E6B] hover:underline">公式アカウント</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
