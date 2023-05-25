import { isNumber } from "./isNumber"

export type Params = { [key: string]: string | number | string[] }

export const prepareUrlParams = (params: Params) =>
  Object.entries(params)
    .filter(([, value]) => isNumber(value) || Boolean(value) || Array.isArray(value))
    .reduce<string[]>((res, [key, value]) => {
      if (Array.isArray(value)) {
        return value.length ? [...res, value.map((val) => `${key}=${encodeURIComponent(val)}`).join('&')] : res
      }

      return [...res, `${key}=${encodeURIComponent(value)}`]
    }, [])
    .join('&')
