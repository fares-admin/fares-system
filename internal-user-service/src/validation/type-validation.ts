export type TValidateFunction = <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => Record<keyof T, string>
