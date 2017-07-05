/*
 * @method clickOtherClose 点击其他区域关闭指定的dom
 * @param { Object }   targetDom 需要关闭的dom
 * @param { Function } callback  回调函数
 * */

export default function (targetDom, callback) {
    let isInnerTargetDom = false
    targetDom.addEventListener('click', () => { isInnerTargetDom = true })
    document.body.addEventListener('click', () => {
        isInnerTargetDom ? (isInnerTargetDom = false) : callback()
    })
}