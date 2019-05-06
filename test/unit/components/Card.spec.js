import { mount, RouterLinkStub } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('components/Card.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Card, {
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
