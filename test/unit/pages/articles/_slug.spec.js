import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'
import * as store from '@/store/'
import * as user from '@/store/user'
const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)
localVue.use(Vuex)

describe('pages/articles/_slug.vue', () => {
  let _store
  let wrapper
  beforeEach(() => {
    user.namespaced = true
    _store = new Vuex.Store(
      Object.assign({
        modules: { user }
      }, store)
    )
    wrapper = mount(ArticlePage, {
      localVue,
      router,
      store: _store,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check headline data', () => {
      expect(wrapper.vm.$el.querySelector('#title-ja')).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('#title-en')).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('#created-date')).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('#published-date')).not.toBeNull()
    })
    test('check abstract', () => {
      expect(wrapper.vm.$el.querySelector('#abstract-ja')).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('#abstract-en')).not.toBeNull()
    })
  })
})
