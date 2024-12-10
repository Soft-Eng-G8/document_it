export const sleep = async(ms: number) => new Promise<void>(resolve => setTimeout(() => {resolve()}, ms))
export const rngArr = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)]
