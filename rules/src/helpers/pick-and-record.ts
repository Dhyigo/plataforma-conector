export type PickAndRecord<T, V, K extends keyof T> = Pick<Record<keyof T, V>, K>
