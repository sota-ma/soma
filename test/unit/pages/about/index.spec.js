import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import AboutPage from '@/pages/about/index.vue'
import BootstrapVue from 'bootstrap-vue/es'
import VueRouter from 'vue-router'
import '@/plugins/firebase'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('pages/about/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AboutPage, {
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check header', () => {
      expect(wrapper.vm.$el.querySelector('#header')).not.toBeNull()
    })
    test('check banner', () => {
      expect(wrapper.vm.$el.querySelector('#banner')).not.toBeNull()
    })

    test('check about body', () => {
      expect(wrapper.vm.$el.querySelector('#about-page-body')).not.toBeNull()
    })
  })
})
