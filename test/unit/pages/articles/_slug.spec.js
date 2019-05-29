import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'
import user from '@/store/user'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)
localVue.use(Vuex)

describe('pages/articles/_slug.vue', () => {
  let store
  let wrapper
  beforeEach(() => {
    store = new Vuex.Store({
      user
    })
    wrapper = mount(ArticlePage, {
      localVue,
      router,
      store,
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
