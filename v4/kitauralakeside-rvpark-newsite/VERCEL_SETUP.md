# Vercel プロジェクト設定（必須）

この Next サイトを Vercel でデプロイするときは、**プロジェクトの Root Directory を必ず設定してください。**

## 手順

1. [Vercel Dashboard](https://vercel.com/dashboard) を開く
2. 対象プロジェクト（kitaura など）を選択
3. **Settings** タブを開く
4. **General** の **Root Directory** をクリック
5. **Edit** で次の値を入力して **Save**  
   ```  
   v4/kitauralakeside-rvpark-newsite  
   ```

これでビルド・デプロイの起点がこの Next アプリになり、`npm run build` が正しく実行されます。
