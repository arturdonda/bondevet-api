type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;

export type Choose<T, A extends keyof T, B extends keyof T> = Either<Pick<T, A>, Pick<T, B>>;
