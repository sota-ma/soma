import { mount, RouterLinkStub } from '@vue/test-utils'
import ArticlePage from '@/pages/articles/_slug.vue'

describe('pages/articles/_slug.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticlePage, {
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
