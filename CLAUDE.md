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

## 自動化・Git運用ルール

- 記事作成後は意味のあるコミットメッセージをつける（例: `feat: 京都モデルコース記事を追加`）
- 現時点では push は自動で行わず、コミットまでにとどめる（将来的にPR作成に変更予定）
- 生成に失敗した場合は理由をログに残す

## 収益化について（現時点では未実装）

- 現段階では広告・アフィリエイトリンクは挿入しない
- 記事数がある程度貯まった段階で、アフィリエイトリンク挿入ルールを別途追記する予定

## 開発

開発サーバー起動時はバックグラウンドモードを使う:

```
astro dev --background
```

`astro dev stop` / `astro dev status` / `astro dev logs` で管理する。

## ドキュメント

Astro公式ドキュメント: https://docs.astro.build

関連作業の前に以下を参照する:

- [ページ・動的ルーティング・ミドルウェア](https://docs.astro.build/en/guides/routing/)
- [Astroコンポーネント](https://docs.astro.build/en/basics/astro-components/)
- [React/Vue/Svelteなどのフレームワークコンポーネント](https://docs.astro.build/en/guides/framework-components/)
- [コンテンツの追加・管理](https://docs.astro.build/en/guides/content-collections/)
- [スタイリング・Tailwind](https://docs.astro.build/en/guides/styling/)
- [多言語対応](https://docs.astro.build/en/guides/internationalization/)
