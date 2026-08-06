## プロジェクト概要

- Astroで構築した個人ブログ
- 記事は `src/content/blog/` 配下に Markdown で追加する（現時点では MDX 未導入。導入する場合は `@astrojs/mdx` を追加し `src/content.config.ts` の `pattern` を更新する）
- content collection の設定は `src/content.config.ts`（`blog` コレクション）
- 将来的に GitHub Actions から Claude Code（headless モード）を使って記事を自動生成する運用を予定している

## ブログの方向性

- ジャンル: 旅行
- エリア: 国内旅行のみ
- スタイル: 一人旅または友達との旅行（記事ごとに `tripStyle` フロントマターでどちらかを明示する）
- 切り口: マンネリ防止のため、以下をローテーションまたはランダムで選択し `category` フロントマターに明示する
  1. 観光スポット紹介 (`spot`)
  2. モデルコース提案・1泊2日/2泊3日など (`itinerary`)
  3. 費用・予算シミュレーション (`budget`)
  4. 持ち物・準備リスト (`packing`)
  5. グルメ・ご当地グルメ特集 (`gourmet`)
  6. 一人旅/友達旅ならではのTips (`tips`)
  7. 体験談風エッセイ (`essay`) ※このカテゴリはローテーション対象外。ユーザーが明示的に指定した場合のみ使用する（自動選択・ランダム選択の対象にしない）

## 記事のルール

### フロントマター（`src/content.config.ts` の `blog` コレクションスキーマに準拠）

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `title` | string | ✓ | SEOを意識した簡潔なタイトル |
| `pubDate` | date | ✓ | 公開日 |
| `description` | string | ✓ | SEOを意識した簡潔なmeta description |
| `tags` | string[] | - | タグ一覧（省略時は空配列） |
| `tripStyle` | `"solo"` \| `"friends"` | ✓ | 一人旅か友達旅かを明示 |
| `category` | 上記7種のいずれか | ✓ | 記事の切り口 |

### 文体・分量

- 文体は親しみやすく、読みやすい日本語（丁寧語ベース）
- 記事の長さは切り口によって変える
  - モデルコース提案・体験談風エッセイ（`itinerary`, `essay`）: 2000〜3000文字程度（じっくり読ませる記事）
  - 持ち物・準備リスト、Tips系（`packing`, `tips`）: 800〜1200文字程度（サクッと読める記事）
  - 観光スポット紹介、グルメ特集、費用シミュレーション（`spot`, `gourmet`, `budget`）: 1200〜2000文字程度
- タイトル・meta descriptionはSEOを意識して簡潔にする

### 執筆前の確認事項

- 過去記事と重複するテーマを避けるため、`src/content/blog/` 内の既存記事のタイトル・`category`・エリアを確認してから執筆する

### モデルコース (`itinerary`) の日数

- 日帰り／1泊2日／2泊3日からランダムまたはローテーションで選択する
- 既存記事の日数と連続して同じにならないようにする（直近の `itinerary` 記事の日数を確認し、異なる日数を優先する）

## 自動化・Git運用ルール

- 記事作成後は意味のあるコミットメッセージをつける（例: `feat: 京都モデルコース記事を追加`）
- 現時点では push は自動で行わず、コミットまでにとどめる（将来的にPR作成に変更予定）
- 生成に失敗した場合は理由をログに残す

## セキュリティ

### GitHub Actions・シークレット管理

- APIキー等の認証情報はリポジトリに直接コミットしない。GitHub Actions の Secrets（`secrets.*`）で管理する
- Claude Code（headless モード）にリポジトリへの書き込み権限を渡す場合も、push は自動で行わない（[自動化・Git運用ルール](#自動化git運用ルール)を参照）。マージ・pushは人がレビューしてから行う
- Actions のワークフローが Issue/PR コメントなど外部から編集可能な入力をトリガーやプロンプトに含める場合は、プロンプトインジェクションのリスクを考慮し、外部入力をそのままコマンド実行や権限昇格に使わない

### 画像と本文の整合性

- `<figure class="post-image">` で挿入するインライン画像は、その画像が写している場所・場面を実際に説明している段落の近くに配置する（例: 「朝霧の大正池」の写真は「大正池」について書いているセクションに置く。「宮島フェリー」のセクションに「原爆ドーム」の写真を置かない、など）
- 画像の `alt` テキストが指す内容と、その画像が置かれているセクションの見出し・本文の話題が一致しているか、執筆後に必ず読み合わせて確認する
- heroImage は記事全体のテーマを代表する1枚であればよく、本文の特定の段落と一致している必要はない

### 生成コンテンツのインジェクション対策

- 記事本文に埋め込む HTML（`<figure>`, `<img>`, `<a>` タグ等）には、出典元（Pexels等の信頼できる情報源）から取得したURL・クレジット表記のみを使用する
- 画像の `src` / `alt` やリンクの `href` に、検証していない外部由来の文字列をそのまま差し込まない
- `<script>` タグや `on*` イベント属性など、実行可能なコードを記事Markdown内に含めない

### 依存パッケージの管理

- 依存関係を追加・更新する際は `npm audit` で既知の脆弱性がないか確認する
- 重大な脆弱性が指摘された依存パッケージは優先的にアップデートする

## 収益化について（現時点では未実装）

- 現段階では広告・アフィリエイトリンクは挿入しない
- 記事数がある程度貯まった段階で、アフィリエイトリンク挿入ルールを別途追記する予定

## 開発

開発サーバー起動時はバックグラウンドモードを使う:

```
astro dev --background
```

`astro dev stop` / `astro dev status` / `astro dev logs` で管理する。

### 検索機能（Pagefind）

- `/search/` は [Pagefind](https://pagefind.app) を使ったクライアントサイド検索ページ
- `npm run build`（`astro build` 実行後に `postbuild` スクリプトとして `pagefind --site dist` が自動実行される）でインデックスが生成される
- `astro dev` では `dist/pagefind/` が存在しないため検索は動作しない（フォールバックメッセージが表示される）。検索の動作確認は `npm run build && npx astro preview` で行う
- 記事の本文以外（ヘッダー・フッター・ナビ）を検索対象から除外するため、各ページの `<main>` に `data-pagefind-body` を付与している。新しいページを追加する際も同様に付与する

## ドキュメント

Astro公式ドキュメント: https://docs.astro.build

関連作業の前に以下を参照する:

- [ページ・動的ルーティング・ミドルウェア](https://docs.astro.build/en/guides/routing/)
- [Astroコンポーネント](https://docs.astro.build/en/basics/astro-components/)
- [React/Vue/Svelteなどのフレームワークコンポーネント](https://docs.astro.build/en/guides/framework-components/)
- [コンテンツの追加・管理](https://docs.astro.build/en/guides/content-collections/)
- [スタイリング・Tailwind](https://docs.astro.build/en/guides/styling/)
- [多言語対応](https://docs.astro.build/en/guides/internationalization/)
