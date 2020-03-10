type ResultItem = {
  title: string
  success: boolean
}

export const showResult = (resultArray: ResultItem[]) => {
  let count = {
    success: 0,
    fail: 0
  }
  resultArray.forEach(item => {
    if (item.success) {
      count.success++
    } else {
      count.fail++
    }
  })
  console.log('💰 签到结果')
  return `🚗 成功 ${count.success} 门，失败： ${count.fail} 门`
}
