// Style
import '../../../src/stylus/components/_parallax.styl'
// Mixins
import Translatable from '../../mixins/translatable'
import mixins from '../../util/mixins'
/* @vue/component */
export default mixins(Translatable).extend({
  name: 'VParallax',
  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    src: String
  },
  data: () => ({
    isBooted: false
  }),
  computed: {
    styles () {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      }
    }
  },
  watch: {
    parallax () {
      this.isBooted = true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const img = this.$refs.img
      if (!img) return
      if (img.complete) {
        this.translate()
        this.listeners()
      } else {
        img.addEventListener('load', () => {
          this.translate()
          this.listeners()
        }, false)
      }
    },
    objHeight () {
      return this.$refs.img.naturalHeight
    }
  },
  render (h) {
    const imgData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    }
    if (this.alt) imgData.attrs.alt = this.alt
    const container = h('div', {
      staticClass: 'v-parallax__image-container'
    }, [h('img', imgData)])
    const content = h('div', {
      staticClass: 'v-parallax__content'
    }, this.$slots.default)
    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [container, content])
  }
})
