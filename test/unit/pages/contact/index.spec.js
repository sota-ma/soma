import { mount, RouterLinkStub } from '@vue/test-utils'
import ContactPage from '@/pages/contact/index.vue'

describe('pages/contact/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ContactPage, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check banner', () => {
      expect(wrapper.contains('div[id="banner"]')).toBe(true)
    })

    test('check contact body', () => {
      expect(wrapper.contains('div[id="body"]')).toBe(true)
    })
  })
})
