import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'
const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)
localVue.use(Vuex)

describe('pages/articles/_slug.vue', () => {
  let _store
  let wrapper
  let modules

  beforeEach(() => {
    modules = {
      article: {
        namespaced: true,
        getters: {
          articleDetail: () => {
            return {
              createdAt: '2019-01-01',
              titleJa: '日本語タイトル',
              titleEn: '英語タイトル',
              tags: [],
              departments: [],
              articleURL: '',
              images: [],
              publishedDate: '2019-01-01',
              abstractJa: '',
              abstractEn: ''
            }
          }
        }
      },
      user: {
        namespaced: true,
        getters: {
          loggedin: () => false
        }
      }
    }

    _store = new Vuex.Store({ modules })
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
