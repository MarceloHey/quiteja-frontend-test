import api from '@/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    queryParams: {
      page: 0,
    },
    pages: 0,
    users: [],
    currentUser: [],
    loading: false
  },
  getters: {
    users(state) {
      return state.users
    },
    currentUser(state) {
      return state.currentUser
    },
    page(state) {
      return state.queryParams.page
    },
    pages(state) {
      return state.pages
    },
    loading(state) {
      return state.loading
    },
  },
  mutations: {
    SET_PAGE: (state, payload) => {
      state.queryParams.page = payload
    },
    SET_PAGES: (state, payload) => {
      state.pages = payload
    },
    SET_PAGINATION: (state, payload) => {
      state.queryParams.total = payload
    },
    SET_USERS: (state, payload) => {
      state.users = payload
    },
    SET_USER: (state, payload) => {
      state.currentUser = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async getUsers(ctx) {
      ctx.commit('SET_LOADING', true)
      try {
        const response = await api.user.getUsers(ctx.state.queryParams.page)
        ctx.commit('SET_USERS', response.data.data)
        ctx.commit('SET_PAGES', Math.round(response.data.total / response.data.limit))
      } catch (err) {
        throw new Error()

      } finally {
        ctx.commit('SET_LOADING', false)
      }
    },
    async getUser(ctx, userId) {
      ctx.commit('SET_LOADING', true)
      try {
        ctx.commit('SET_USER', {})
        const response = await api.user.getUser(userId)
        ctx.commit('SET_USER', response.data)
      } catch (err) {
        throw new Error()
      } finally {
        ctx.commit('SET_LOADING', false)
      }
    },
    async removeUser(ctx, userId) {
      ctx.commit('SET_LOADING', true)
      try {
        await api.user.removeUser(userId)
      } catch (err) {
        throw new Error()
      } finally {
        ctx.commit('SET_LOADING', false)
      }
    },
    async createUser(ctx, payload) {
      ctx.commit('SET_LOADING', true)
      try {
        await api.user.createUser(payload)
      } catch (err) {
        throw new Error()
      } finally {
        ctx.commit('SET_LOADING', false)
      }
    },
    async editUser(ctx, payload) {
      ctx.commit('SET_LOADING', true)
      try {
        await api.user.editUser(payload)
      } catch (err) {
        throw new Error()
      } finally {
        ctx.commit('SET_LOADING', false)
      }
    },
    clearUser(ctx) {
      ctx.commit('SET_USER', {})
    },
    async setPage(ctx, payload) {
      ctx.commit("SET_PAGE", payload)
      const response = await api.user.getUsers(ctx.state.queryParams.page)
      ctx.commit('SET_USERS', response.data.data)
    }
  },
  modules: {
  }
})
