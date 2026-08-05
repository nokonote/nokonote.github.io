export const categoryLabels: Record<string, string> = {
	spot: '観光スポット紹介',
	itinerary: 'モデルコース提案',
	budget: '費用・予算シミュレーション',
	packing: '持ち物・準備リスト',
	gourmet: 'グルメ特集',
	tips: '旅のTips',
	essay: '体験談エッセイ',
};

export const categoryIcons: Record<string, string> = {
	spot: '📍',
	itinerary: '🧭',
	budget: '💰',
	packing: '🎒',
	gourmet: '🍜',
	tips: '💡',
	essay: '📖',
};

// カテゴリごとのアクセントカラー（グラデーションの開始色・終了色）
export const categoryColors: Record<string, { from: string; to: string }> = {
	spot: { from: '#2AA9BD', to: '#5FD0C4' },
	itinerary: { from: '#FF7A5C', to: '#FFB25C' },
	budget: { from: '#4CAF7D', to: '#8FD69A' },
	packing: { from: '#8B7FD6', to: '#B79EE8' },
	gourmet: { from: '#F2545B', to: '#FF8A65' },
	tips: { from: '#F2A93B', to: '#FFD166' },
	essay: { from: '#5C6BC0', to: '#8E9EE8' },
};

export const tripStyleLabels: Record<string, string> = {
	solo: '一人旅',
	friends: '友達旅',
};

export function formatDate(date: Date): string {
	return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}
