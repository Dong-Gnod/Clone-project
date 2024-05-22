// Movie 타입 정의
export interface Movie {
	id: string;
	title: string;
	poster_path: string;
	overview: string;
	vote_average: number;
	vote_count: number;
}

// 각 페이지의 데이터 구조 정의
export interface MoviePageData {
	results: Movie[];
	nextPage?: number;
	totalPages: number;
}

// useInfiniteQuery에서 반환되는 데이터 구조 정의
export interface InfiniteMovieData {
	pages: MoviePageData[];
	pageParam: number[];
}

export interface ContentsObject {
	[key: string]: Movie[];
}
