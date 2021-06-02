import repo from '~/api-request'
const request = (context, inject) => {
    inject('repo', repo(context))
}


export default request
