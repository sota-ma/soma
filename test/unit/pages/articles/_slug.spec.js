import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'
import BootstrapVue from 'bootstrap-vue/es'

const localVue = createLocalVue()

localVue.use(BootstrapVue)

describe('pages/articles/_slug.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticlePage, {
      localVue,
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
