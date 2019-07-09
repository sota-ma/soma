import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ContactPage from '@/pages/contact/index.vue'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('pages/contact/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ContactPage, {
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check header', () => {
      expect(wrapper.vm.$el.querySelector('#header').textContent).not.toBeNull()
    })

    test('check banner', () => {
      expect(wrapper.vm.$el.querySelector('#banner').textContent).not.toBeNull()
    })

    test('check contact body', () => {
      expect(wrapper.vm.$el.querySelector('#contact-page-body').textContent).not.toBeNull()
    })
  })
})
