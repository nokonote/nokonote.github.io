import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    // 一人旅 or 友達旅
    tripStyle: z.enum(['solo', 'friends']),
    // 切り口（マンネリ防止のためのローテーション対象）
    // spot: 観光スポット紹介 / itinerary: モデルコース提案 / budget: 費用・予算シミュレーション
    // packing: 持ち物・準備リスト / gourmet: グルメ・ご当地グルメ特集
    // tips: 一人旅/友達旅ならではのTips / essay: 体験談風エッセイ
    category: z.enum(['spot', 'itinerary', 'budget', 'packing', 'gourmet', 'tips', 'essay']),
    // 記事のヒーロー画像（Unsplash/Pexelsなど商用利用可の写真を想定）
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.object({
          name: z.string(),
          url: z.string().url(),
          source: z.string(),
        }),
      })
      .optional(),
  }),
});

export const collections = { blog };
