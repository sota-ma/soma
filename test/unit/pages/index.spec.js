import { mount, RouterLinkStub } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('pages/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(IndexPage, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check title and subtitle', () => {
      expect(wrapper.vm.$el.querySelector('#title')).not.toBeNull()
      expect(wrapper.vm.$el.querySelector('#subtitle')).not.toBeNull()
    })

    test('check link button', () => {
      expect(wrapper.contains('button[id="link-to-articles"]')).toBe(true)
      expect(wrapper.contains('button[id="link-to-about"]')).toBe(true)
    })
  })
})
