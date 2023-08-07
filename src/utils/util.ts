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
