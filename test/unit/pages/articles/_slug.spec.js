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
      expect(wrapper.contains('h1[id="title-ja"]')).toBe(true)
      expect(wrapper.contains('h4[id="title-en"]')).toBe(true)
      expect(wrapper.contains('p[id="created-date"]')).toBe(true)
      expect(wrapper.contains('p[id="published-date"]')).toBe(true)
    })
    test('check abstract', () => {
      expect(wrapper.contains('div[id="abstract-ja"]'))
      expect(wrapper.contains('div[id="abstract-en"]'))
    })
  })
})
