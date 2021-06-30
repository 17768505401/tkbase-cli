import request from './request'

const apis = {

    /**用户登录 */
    userLogin(data) {
        return request({
            url: `/health/user/backLoginGetUser`,
            method: 'post',
            data: data
        })
    },
    /**用户登录 */
    getPlatform(data) {
        return request({
            url: `/health/corp/queryCorpBo`,
            method: 'get',
            data: data
        })
    },
    /**推送 */
    push(data) {
        return request({
            url: `/health/wxgzh/pushWxgzhMsgToCorpClientIntoHtml`,
            method: 'post',
            data: data
        })
    }
}
export default apis
