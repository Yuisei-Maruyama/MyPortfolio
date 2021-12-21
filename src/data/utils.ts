import { Issues, Label} from '@/types'

/** 2 つの値の間のランダムな整数を取得 */
export function getRandomInt(min: number, max: number): number {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt) + minInt)
}

/** ランダムな文字列を取得 */
export function getRandomString(min = 0, max = 100): string {
  return 'not implemented.'
}

/** 基準時刻を元にずらした時間を取得 */
export function getDate(options: { month: number }, base?: Date): Date {
  const date = base ? new Date(base) : new Date()
  if (options?.month) date.setMonth(date.getMonth() + options.month)
  return date
}

/** ランダムな日付を取得 */
export function getRandomDate(term?: { start?: Date; end?: Date }): Date {
  const start = term?.start || getDate({ month: -1 })
  const end = term?.end || getDate({ month: 1 })
  return new Date(getRandomInt(start.getTime(), end.getTime()))
}

/** ランダムな長さの配列を取得 */
export function getRandomArray<T>(item: () => T, length = 3): T[] {
  return new Array(length).fill(0).map(item)
}

/** それなりの割合でデータを選択して返す */
export function mix<T1 = unknown, T2 = unknown>(data1: T1, data2: T2, ratio = 2): T1 | T2 {
  return Math.floor(Math.random() * ratio) ? data1 : data2
}

/** ランダムなオブジェクトを取得 */
export interface Dummy {
  foo: string
}
export function getRandomObject(): Dummy {
  return { foo: 'string' }
}

/** 日付を文字列にキャスト */
export function getDateToString() {
  return ''
}

export const gen = {
  get N() {
    return Math.floor(Math.random() * 10)
  },
}
