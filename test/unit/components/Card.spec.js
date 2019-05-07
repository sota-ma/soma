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
      expect(wrapper.vm.$el.querySelector('.card-published-date').textContent).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('.card-body').textContent).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('.card-created-date').textContent).not.toBeNull()
    })
  })
})
