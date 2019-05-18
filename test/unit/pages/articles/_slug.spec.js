import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('pages/articles/_slug.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticlePage, {
      localVue,
      router,
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
