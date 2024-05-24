export type Prefix<T extends Record<string, any>, K extends string> = {
  [P in keyof T as `${K}${Capitalize<string & P>}`]: T[P]
}
