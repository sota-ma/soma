import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticleIndexPage from '@/pages/articles/index.vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/es'
import store from '@/store'


const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(Vuex)


describe('pages/articles/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticleIndexPage, {
      store,
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
