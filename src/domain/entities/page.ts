export type Page<T> = PageParams<T> & {
	totalCount: number;
	data: T[];
};

export type PageParams<T> = {
	pageSize: number;
	pageNumber: number;
	sortBy: keyof T;
	sortDirection: 'ASC' | 'DESC';
};
