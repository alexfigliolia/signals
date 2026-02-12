export type Computer<T> = () => T extends Promise<any> ? never : T;
