import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('components/Header.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Header, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check headline data', () => {
      expect(wrapper.contains('div[id="card-published-date"]')).toBe(true)
      expect(wrapper.contains('h5[id="card-title"]')).toBe(true)
      expect(wrapper.contains('div[id="card-created-date"]')).toBe(true)
    })
  })
})
