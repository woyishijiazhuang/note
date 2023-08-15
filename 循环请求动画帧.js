/**
 * always requestAnimationFrame 连续请求动画帧
 * 当你希望动画停止时，应当让callback返回true
 * 或者调用该方法返回的函数
 * @param {Function} callback
 * @returns {Function}
 * @example 
 * // 在大多数设备上会运行60次callback
 * let stopAlwasRAF = alwaysRAF(callback)
 * setTimeout(stopAlwasRAF, 1000)
 */
function alwaysRAF(callback) {
  let stop = false
  
  const loopRAF = callback => {
    requestAnimationFrame(DOMHighResTimeStamp => {
      if (stop || callback(DOMHighResTimeStamp)) return
      loopRAF(callback)
    })
  }
  loopRAF(callback)
  // 返回一个停止该函数的方法
  return () => stop = true
}
