"use client";

import { useState } from "react";
import { Car, ChevronDown, MapPin, AlertCircle, Navigation } from "lucide-react";

const ACCORDIONS = [
  {
    id: "sp7-access-body-1",
    title: "東関東自動車道をご利用の方",
    rows: [
      { label: "鉾田IC", time: "約15分" },
      { label: "潮来IC", time: "約30分" },
    ],
  },
  {
    id: "sp7-access-body-2",
    title: "常磐自動車道をご利用の方",
    rows: [{ label: "土浦北IC", time: "約50分" }],
  },
];

export default function Sp7AccessSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  return (
    <section className="sp7-access" id="access">
      <div className="sp7-access__page">
        <h1 className="sp7-access__title">アクセス</h1>
        <section>
          <h2 className="sp7-access__section-title">所在地・ナビ設定</h2>
          <div className="sp7-access__card">
            <div className="sp7-access__address">
              <span className="sp7-access__pin">
                <MapPin size={8} strokeWidth={2} />
              </span>
              <span>〒311-2104 茨城県鉾田市根山2947</span>
            </div>
            <div className="sp7-access__notice">
              <div className="sp7-access__notice-headline">
                <span className="sp7-access__notice-icon">
                  <AlertCircle size={10} strokeWidth={2} />
                </span>
                <span>重要：ナビ設定時のご注意</span>
              </div>
              <p className="sp7-access__notice-text">
                住所検索を行うと、地図上のピンが実際の場所とズレて表示される場合がございます。
              </p>
            </div>
            <div className="sp7-access__navbox">
              <div className="sp7-access__navbox-headline">
                <span className="sp7-access__tip-icon">
                  <Navigation size={10} strokeWidth={2} />
                </span>
                <span>ナビの目的地設定</span>
              </div>
              <p className="sp7-access__navbox-text">
                「セブンイレブン 鉾田梶山店」を目的地に設定してお越しください。当施設はすぐ隣です。
              </p>
            </div>
          </div>
        </section>
        <div className="sp7-access__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.2417857230967!2d140.5344194!3d36.1119668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60224fa01ff7d6e9%3A0x79981e4f948c6858!2z5YyX5rWm44Os44Kk44Kv44K144Kk44OJUlbjg5Hjg7zjgq8!5e0!3m2!1sja!2sjp!4v1770747600676!5m2!1sja!2sjp"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="地図"
          />
        </div>
        <section className="sp7-access__travel-time">
          <h2 className="sp7-access__section-title">お車での所要時間</h2>
          <p className="sp7-access__desc">最寄りのインターチェンジからの目安時間です。</p>
          <div className="sp7-access__accordion-group">
            {ACCORDIONS.map((acc) => (
              (() => {
                const isOpen = openIds.has(acc.id);
                return (
              <div
                key={acc.id}
                className={`sp7-access__accordion ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="sp7-access__acc-head"
                  aria-expanded={isOpen}
                  aria-controls={acc.id}
                  onClick={() => {
                    setOpenIds((prev) => {
                      const next = new Set(prev);
                      if (next.has(acc.id)) next.delete(acc.id);
                      else next.add(acc.id);
                      return next;
                    });
                  }}
                >
                  <span className="sp7-access__acc-title">
                    <span className="sp7-access__route-icon">
                      <Car size={12} strokeWidth={2} />
                    </span>
                    <span className="sp7-access__acc-title-text">{acc.title}</span>
                  </span>
                  <span className="sp7-access__chevron">
                    <ChevronDown size={12} strokeWidth={2} />
                  </span>
                </button>
                <div
                  id={acc.id}
                  className="sp7-access__acc-body"
                  hidden={!isOpen}
                >
                  {acc.rows.map((row) => (
                    <div key={row.label} className="sp7-access__acc-row">
                      <span>{row.label}</span>
                      <span className="sp7-access__time">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
                );
              })()
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
