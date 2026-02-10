'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/${process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/contact/complete');
      } else {
        alert('送信が完了していません。もう一度お試しください。');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('送信が完了していません。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          お問い合わせフォーム
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* 宿泊希望日 */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              ご希望のお日にち <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* 利用人数 */}
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              ご利用人数 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="guests"
              name="guests"
              placeholder="例：大人2名、子供1名"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* チェックイン時間 */}
          <div>
            <label htmlFor="checkin" className="block text-sm font-semibold text-gray-700 mb-2">
              チェックイン時間（◯時〜◯時）
            </label>
            <input
              type="text"
              id="checkin"
              name="checkin"
              placeholder="例：14時〜15時"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* ペット情報 */}
          <div>
            <label htmlFor="pets" className="block text-sm font-semibold text-gray-700 mb-2">
              ワンちゃんの頭数と犬種 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pets"
              name="pets"
              rows={4}
              placeholder="※ペット同伴されない場合は「なし」とご入力お願いします&#10;※アレルギー対策の為、プードル（スタンダード、ミディアム、トイ）・ヨークシャテリア・ミニチュアシュナウザー・ビジョンフリーゼ・マルチーズ・シーズー・チャイニーズクレステッドドック・オーストラリアン・ラブラドゥードルの犬種に制限させていただいております&#10;※上記犬種の組み合わせの以外のプードルミックス◯◯プーについて（チワプー・ダップー・ポメプー・ペキプー）もご入場いただけます"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B8E6B]"
            />
          </div>

          {/* プライバシーポリシー */}
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
            <h3 className="font-semibold mb-2">プライバシーポリシー</h3>
            <p>
              お客様からいただいた個人情報は、お問い合わせへの回答および予約管理の目的でのみ使用し、
              第三者に開示することはありません。
            </p>
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6B8E6B] text-white py-4 rounded-lg font-semibold hover:bg-[#5A7A5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>

          {/* FormSubmit設定（非表示） */}
          <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/contact/complete`} />
          <input type="hidden" name="_captcha" value="false" />
        </form>
      </div>
    </div>
  );
}
