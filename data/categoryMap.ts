export const CATEGORY_MAP: { [key: string]: { title: string; subcategories?: string[] } } = {
    goldbar: {
        title: '골드바',
        subcategories: ['사자 골드바', '호랑이 골드바', '기타 골드바', 'LS MnM 골드바','기타'],
    },
    silverbar: {
        title: '실버바',
    },
    goldcoin: {
        title: '순금코인',
    },
    goldbaby: {
        title: '순금베이비',
        subcategories: ['돌반지', '돌팔찌', '돌목걸이', '순금카드'],
    },
    goldgift: {
        title: '순금기념품',
        subcategories: ['선물용/소장용', '돼지/토끼/입체', '순금 행운의 열쇠/열쇠상패', '복 금수저/금수저상패', '상패류'],
    }
};