export type Page<T> = Pick<PageParams<T>, 'pageSize' | 'pageNumber'> & {
	totalCount: number;
	data: T[];
};

export type PageParams<T> = {
	pageSize: number;
	pageNumber: number;
	sortBy: keyof T;
	sortDirection: 'ASC' | 'DESC';
};
