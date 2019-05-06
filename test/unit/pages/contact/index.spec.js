import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ContactPage from '@/pages/contact/index.vue'
import BootstrapVue from 'bootstrap-vue/es'

const localVue = createLocalVue()

localVue.use(BootstrapVue)

describe('pages/contact/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ContactPage, {
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

    test('check contact body', () => {
      expect(wrapper.contains('div[id="body"]')).toBe(true)
    })
  })
})
