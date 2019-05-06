import { mount, RouterLinkStub } from '@vue/test-utils'
import ArticleIndexPage from '@/pages/articles/index.vue'

describe('pages/articles/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticleIndexPage, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check banner', () => {
      expect(wrapper.contains('div[id="banner"]')).toBe(true)
    })

    test('check header', () => {
      expect(wrapper.contains('div[id="header"]')).toBe(true)
    })

    test('check card column', () => {
      expect(wrapper.contains('div[id="column"]')).toBe(true)
    })
  })
})
