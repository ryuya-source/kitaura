(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 年表示
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ヘッダーの影
  const header = document.querySelector("[data-elevate]");
  const setHeader = () => {
    if (!header) return;
    const elevated = window.scrollY > 6;
    header.setAttribute("data-elevated", elevated ? "true" : "false");
  };
  window.addEventListener("scroll", setHeader, { passive: true });
  setHeader();

  // モバイルナビ
  const navToggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    $$(".nav-link", nav).forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const t = e.target;
      if (t instanceof Node && !nav.contains(t) && !navToggle.contains(t)) closeNav();
    });
  }

  // カルーセル
  const carousel = $("[data-carousel]");
  if (carousel) {
    const track = $("[data-carousel-track]", carousel);
    const prevBtn = $("[data-carousel-prev]", carousel);
    const nextBtn = $("[data-carousel-next]", carousel);
    const dotsWrap = $("[data-carousel-dots]", carousel);
    const items = $$(".carousel-item", carousel);
    let idx = 0;

    const renderDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      items.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dot";
        b.setAttribute("aria-label", `スライド ${i + 1}`);
        b.setAttribute("aria-current", i === idx ? "true" : "false");
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
      });
    };

    const go = (next) => {
      idx = (next + items.length) % items.length;
      if (track) track.style.transform = `translateX(${idx * -100}%)`;
      renderDots();
    };

    prevBtn?.addEventListener("click", () => go(idx - 1));
    nextBtn?.addEventListener("click", () => go(idx + 1));
    renderDots();
  }

  // details で + / × 表示の補助（CSSで回転しているが念のため）
  $$("[data-accordion] details").forEach((d) => {
    const icon = $(".acc-icon", d);
    if (!icon) return;
    const sync = () => (icon.textContent = d.hasAttribute("open") ? "×" : "+");
    sync();
    d.addEventListener("toggle", sync);
  });

  // カレンダー（ダミーの空き状況）
  const calRoot = $("[data-calendar]");
  if (calRoot) {
    const title = $("[data-cal-title]", calRoot);
    const grid = $("[data-cal-grid]", calRoot);
    const prev = $("[data-cal-prev]", calRoot);
    const next = $("[data-cal-next]", calRoot);

    const DOW = ["日", "月", "火", "水", "木", "金", "土"];

    /**
     * status:
     * - ok: 空きあり
     * - few: 残りわずか
     * - no: 満室
     */
    const statusFor = (d) => {
      // デモ用の簡易ロジック（曜日や日付で見え方を作る）
      const day = d.getDate();
      const dow = d.getDay();
      if (dow === 0 || dow === 6) return day % 3 === 0 ? "few" : "no";
      if (day % 9 === 0) return "no";
      if (day % 4 === 0) return "few";
      return "ok";
    };

    const labelFor = (s) => (s === "ok" ? "○" : s === "few" ? "△" : "×");

    let view = new Date();
    view.setDate(1);

    const render = () => {
      if (!grid || !title) return;
      const y = view.getFullYear();
      const m = view.getMonth();
      title.textContent = `${y}年${m + 1}月`;

      grid.innerHTML = "";
      DOW.forEach((d) => {
        const el = document.createElement("div");
        el.className = "cal-dow";
        el.textContent = d;
        grid.appendChild(el);
      });

      const first = new Date(y, m, 1);
      const last = new Date(y, m + 1, 0);
      const startPad = first.getDay();
      const totalCells = startPad + last.getDate();
      const weeks = Math.ceil(totalCells / 7);
      const cells = weeks * 7;

      for (let i = 0; i < cells; i++) {
        const cell = document.createElement("div");
        cell.className = "cal-cell";

        const dateNum = i - startPad + 1;
        const inMonth = dateNum >= 1 && dateNum <= last.getDate();
        const d = new Date(y, m, dateNum);
        if (!inMonth) cell.classList.add("is-muted");

        const dayEl = document.createElement("div");
        dayEl.className = "cal-day";
        dayEl.textContent = String(inMonth ? dateNum : "");
        cell.appendChild(dayEl);

        const badge = document.createElement("div");
        badge.className = "cal-badge";
        if (inMonth) {
          const s = statusFor(d);
          badge.dataset.status = s;
          badge.textContent = labelFor(s);
        } else {
          badge.textContent = "";
        }
        cell.appendChild(badge);

        if (inMonth) {
          cell.setAttribute("role", "button");
          cell.tabIndex = 0;
          cell.setAttribute("aria-label", `${y}年${m + 1}月${dateNum}日 空き状況 ${badge.textContent}`);
          const goReserve = () => {
            // 実運用ではフォーム/外部予約へ遷移
            const btn = document.querySelector("#reserve .btn-primary");
            if (btn instanceof HTMLElement) btn.focus();
          };
          cell.addEventListener("click", goReserve);
          cell.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goReserve();
            }
          });
        }

        grid.appendChild(cell);
      }
    };

    prev?.addEventListener("click", () => {
      view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
      render();
    });
    next?.addEventListener("click", () => {
      view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      render();
    });

    render();
  }
})();

