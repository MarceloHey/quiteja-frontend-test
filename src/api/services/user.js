export default httpClient => ({
  getUsers: (page) => {
    return httpClient.get(`/user?page=${page}`)
  },
  getUser: (id) => {
    return httpClient.get(`/user/${id}`)
  },
  createUser: (data) => {
    return httpClient.post('/user/create', data)
  },
  editUser: (data) => {
    return httpClient.put(`/user/${data.id}`, data)
  },
  removeUser: (id) => {
    return httpClient.delete(`/user/${id}`)
  }
})