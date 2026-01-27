import HeroKitaura from "@/components/HeroKitaura";

export default function Page() {
  return (
    <>
      {/* ===== HERO ===== */}
      <HeroKitaura />

      {/* ===== HERO → 下層を自然につなぐセクション ===== */}
      <section
        style={{
          position: "relative",
          background: "#000",
          overflow: "hidden",
        }}
      >
        {/* 上部フェード（HEROと溶かすためのグラデーション） */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "32vh",
            pointerEvents: "none",
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* 下層コンテンツ本体 */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "24vh",
            paddingBottom: "20vh",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>
            HEROの余韻から自然に続く下層コンテンツ
          </h2>

          <p style={{ opacity: 0.7 }}>
            ここから通常コンテンツが始まります
          </p>
        </div>
      </section>
    </>
  );
}
