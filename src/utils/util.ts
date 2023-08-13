/**
 * @Author: Mojie
 * @Date: 2023-08-07 22:01:50
 */

/**
 * 格式化时间
 */
export function formatTime(time: number) {
  const minute = (`${(time / 60) | 0}`).padStart(2, '0')
  const second = (`${(time % 60) | 0}`).padStart(2, '0')
  return `${minute}:${second}`
}

/**
 * 根据数组长度随机生成索引
 * @param arrLength 数组的长度
 */
export function getRandomIndexes(arrLength: number) {
  const randomIndexes: number[] = []

  while (randomIndexes.length < arrLength) {
    const randomIndex = Math.floor(Math.random() * arrLength)

    // 确保没有重复的值且不等于当前索引
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex)
    }
  }

  return randomIndexes
}
