import Vue from 'vue'
import axios from 'axios'

// let collectiveAPI = 'http://localhost:8082/api/messages'

const client = axios.create({
  baseURL: 'http://localhost:8082/api',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getPosts () {
    return this.execute('get', '/messages')
  },
  getPost (id) {
    return this.execute('get', `/messages/${id}`)
  },
  createPost (data) {
    return this.execute('post', '/messages', data)
  },
  updatePost (id, data) {
    return this.execute('put', `/messages/${id}`, data)
  },
  deletePost (id) {
    return this.execute('delete', `/messages/${id}`)
  }
}
