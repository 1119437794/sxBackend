/**
 * Created by Administrator on 2017-05-26.
 */
import { ajax } from '../js/utils'

window.setLog = function(content, page) {
    ajax({
        method: 'POST',
        url: '/log/save.do',
        body: JSON.stringify({
            type: '浏览',
            systemAddress: '前台',
            content,
            page
        }),
        success: res => {}
    })
}