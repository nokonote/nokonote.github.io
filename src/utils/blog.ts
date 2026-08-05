export const categoryLabels: Record<string, string> = {
	spot: '観光スポット紹介',
	itinerary: 'モデルコース提案',
	budget: '費用・予算シミュレーション',
	packing: '持ち物・準備リスト',
	gourmet: 'グルメ特集',
	tips: '旅のTips',
	essay: '体験談エッセイ',
};

export const tripStyleLabels: Record<string, string> = {
	solo: '一人旅',
	friends: '友達旅',
};

export function formatDate(date: Date): string {
	return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}
