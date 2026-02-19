/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // WebP/AVIF 等の自動最適化を有効化（未指定時は true）
    unoptimized: false,
    // ローカル画像を許可（クエリ付き ?v= も許可＝search 省略）
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
