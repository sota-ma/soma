import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticleIndexPage from '@/pages/articles/index.vue'
import Vuex from 'vuex'
import '@/plugins/firebase'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import store from '@/store'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(VueRouter)

describe('pages/articles/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticleIndexPage, {
      store,
      router,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check banner', () => {
      expect(wrapper.vm.$el.querySelector('#banner')).not.toBeNull()
    })

    test('check header', () => {
      expect(wrapper.vm.$el.querySelector('#header')).not.toBeNull()
    })

    test('check card column', () => {
      expect(wrapper.vm.$el.querySelector('#articles-card-column')).not.toBeNull()
    })
  })
})
