'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 固定フッター */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#6B8E6B] text-white py-4 rounded-lg font-semibold hover:bg-[#5A7A5A] transition-colors"
          >
            予約・空き状況の確認
          </button>
        </div>
      </div>

      {/* 予約ボトムシート */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* ボトムシート */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
            >
              {/* スワイプバー */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    ご予約・お問い合わせ
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  ご希望の方法でお気軽にお問い合わせください
                </p>

                <div className="space-y-3">
                  {/* LINE */}
                  <a
                    href="https://lin.ee/D9p4FmI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-[#06C755] text-white rounded-lg hover:bg-[#05B04A] transition-colors"
                  >
                    <MessageCircle size={24} />
                    <div className="text-left flex-1">
                      <div className="font-semibold">LINE公式アカウント</div>
                      <div className="text-sm opacity-90">最短でお返事できます</div>
                    </div>
                  </a>

                  {/* メール */}
                  <Link
                    href="/contact"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center gap-4 p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Mail size={24} />
                    <div className="text-left flex-1">
                      <div className="font-semibold">お問い合わせフォーム</div>
                      <div className="text-sm text-gray-600">詳細なご相談に</div>
                    </div>
                  </Link>

                  {/* 電話 */}
                  <button
                    onClick={() => {
                      const phoneNumber = '070-8414-8109';
                      if (window.confirm(`${phoneNumber} に電話をかけますか？`)) {
                        window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`;
                      }
                    }}
                    className="flex items-center gap-4 p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors w-full"
                  >
                    <Phone size={24} />
                    <div className="text-left flex-1">
                      <div className="font-semibold">お電話でのお問い合わせ</div>
                      <div className="text-sm text-gray-600">070-8414-8109</div>
                    </div>
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  受付時間：9:00〜18:00
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* フッター用のスペーサー（固定フッターの高さ分） */}
      <div className="h-24" />
    </>
  );
}
