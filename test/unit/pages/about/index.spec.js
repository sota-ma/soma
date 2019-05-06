import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import AboutPage from '@/pages/about/index.vue'
import BootstrapVue from 'bootstrap-vue/es'

const localVue = createLocalVue()

localVue.use(BootstrapVue)

describe('pages/about/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AboutPage, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check header', () => {
      expect(wrapper.contains('div[id="header"]')).toBe(true)
    })
    test('check banner', () => {
      expect(wrapper.contains('div[id="banner"]')).toBe(true)
    })

    test('check about body', () => {
      expect(wrapper.contains('div[id="body"]')).toBe(true)
    })
  })
})
