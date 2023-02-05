import { PageParams } from '@domain/entities';

export function parsePageParams<T>(pageParams?: Partial<PageParams<T>>): PageParams<T> {
	const DEFAULT_PAGE_NUMBER = 1;
	const DEFAULT_PAGE_SIZE = 50;
	const DEFAULT_SORT_BY = 'createdAt';
	const DEFAULT_SORT_DIRECTION = 'DESC';

	const pageNumber =
		pageParams?.pageNumber === undefined || pageParams.pageNumber <= 0 ? DEFAULT_PAGE_NUMBER : pageParams.pageNumber;

	const pageSize =
		pageParams?.pageSize === undefined || pageParams.pageSize <= 0 ? DEFAULT_PAGE_SIZE : pageParams.pageSize;

	const sortBy = (pageParams?.sortBy as keyof T) ?? DEFAULT_SORT_BY;

	const sortDirection =
		pageParams?.sortDirection && ['ASC', 'DESC'].includes(pageParams.sortDirection.toUpperCase())
			? (pageParams.sortDirection.toUpperCase() as 'ASC' | 'DESC')
			: DEFAULT_SORT_DIRECTION;

	return { pageNumber, pageSize, sortBy, sortDirection };
}
