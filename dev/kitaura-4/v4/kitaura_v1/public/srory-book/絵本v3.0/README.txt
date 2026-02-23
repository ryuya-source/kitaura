犬種制限についての絵本（絵本v3.0）

このフォルダに 01.avif ～ 11.avif を配置すると、サイトの「なぜ犬種制限があるのか」で表示されます。

【方法1】コピースクリプトを使う（推奨）
  タスク管理/scripts で AVIF 変換後、または 絵本-avif フォルダに .avif がある場合:
    cd dev/kitaura-4/v4/kitaura_v1/scripts
    node copy-storybook-avif.mjs ../../../../絵本-avif
  別のフォルダを指定する場合:
    node copy-storybook-avif.mjs /path/to/avifの入ったフォルダ

【方法2】手動で配置
  01.avif, 02.avif, … 11.avif をこのフォルダにコピーしてください。

枚数が異なる場合は components/pet-section.tsx の storyBookImages を編集してください。
