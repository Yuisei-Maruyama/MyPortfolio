// 手元で簡易的な動作確認を行うファイル

const user = {
  name: 'Maruyama',
  area: {
    pref: '東京',
    city: '八王子',
  },
  updateDay: new Date('2022-08-31T12:00:00+09:00'),
  favoriteColor: ['red', 'blue', 'green'],
}

// スプレッド構文でシャローコピー!!
const userCopy = structuredClone(user)

// userCopyのareaプロパティを書き換える
userCopy.name = 'Yuisei'
userCopy.area.pref = '大分' // ネストしたオブジェクト
userCopy.area.city = '大分' // ネストしたオブジェクト
userCopy.updateDay.setMonth(user.updateDay.getMonth() + 3) // Dateオブジェクト
userCopy.favoriteColor.push('yellow') // 配列

console.log(userCopy)
