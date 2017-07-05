/*
* @function getPwdByRandom 获取指定位数包含字符和数字的随机密码
* @params minLen {Number} 最小长度密码
* @params maxLen {Number} 最长长度密码
* @return {String} 在 minLen 和 maxLen 长度之间的密码
* eg: getPwdByRandom(6, 12)
* */
const getPwdByRandom = (function () {

    // 可供排列组合的数字
    const numArr = [2, 3, 4, 5, 6, 7, 8, 9]

    // 可供排列组合的字母
    const upperCaseCharArr = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'M', 'N', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z'
    ]
    const lowerCaseCharArr = upperCaseCharArr.map(item => item.toLowerCase())
    const allCharArr = lowerCaseCharArr.concat(upperCaseCharArr)

    // 所有可供排列组合包含大小写字母 和 数字 的字符
    const allNumCharArr = numArr.concat(allCharArr)

    const numLen = numArr.length
    const allCharLen = allCharArr.length
    const allNumCharLen = allNumCharArr.length

    return function (minLen, maxLen) {
        // 获取在maxLen 和 minLen 之间长度的随机密码
        let randomLen = getRandomByMaxMin(minLen, maxLen)

        // 保证至少 一个 数字 和 字母
        const numArrIndex = getRandomByMaxMin(0, numLen - 1)
        const charArrIndex = getRandomByMaxMin(0, allCharLen - 1)

        // 随机生成数组
        let tmpIndex = 0
        const tmpArr = [numArr[numArrIndex], allCharArr[charArrIndex]]
        while (randomLen) {
            tmpIndex = (Math.random() * randomLen--) >>> 0
            if (tmpArr[randomLen] === undefined) {
                tmpArr[randomLen] = allNumCharArr[getRandomByMaxMin(0, allNumCharLen - 1)]
            }
            if (tmpArr[tmpIndex] === undefined) {
                tmpArr[tmpIndex] = allNumCharArr[getRandomByMaxMin(0, allNumCharLen - 1)]
            }
            [tmpArr[randomLen], tmpArr[tmpIndex]] = [tmpArr[tmpIndex], tmpArr[randomLen]]
        }
        return tmpArr.join('')
    }
})()

// 获取指定范围的随机整数
const getRandomByMaxMin = function (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

export default getPwdByRandom