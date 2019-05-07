import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import ArticleIndexPage from '@/pages/articles/index.vue'
import BootstrapVue from 'bootstrap-vue/es'

const localVue = createLocalVue()

localVue.use(BootstrapVue)

describe('pages/articles/index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ArticleIndexPage, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  describe('template', () => {
    test('check banner', () => {
      expect(wrapper.vm.$el.querySelector('#banner')).not.toBeNull()
    })

    test('check header', () => {
      expect(wrapper.vm.$el.querySelector('#header')).not.toBeNull()
    })

    test('check card column', () => {
      expect(wrapper.vm.$el.querySelector('#articles-card-column')).not.toBeNull()
    })
  })
})
