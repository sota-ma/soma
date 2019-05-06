import { mount, RouterLinkStub } from '@vue/test-utils'
import AboutPage from '@/pages/about/index.vue'

describe('pages/about/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AboutPage, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check banner', () => {
      expect(wrapper.contains('div[id="banner"]')).toBe(true)
    })

    test('check about body', () => {
      expect(wrapper.contains('div[id="body"]')).toBe(true)
    })
  })
})
