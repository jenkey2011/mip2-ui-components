import '../../../src/stylus/components/_button-toggle.styl'
// Mixins
import mixins from '../../util/mixins'
import ButtonGroup from '../../mixins/button-group'
import Themeable from '../../mixins/themeable'
// Util
import { consoleWarn } from '../../util/console'
/* @vue/component */
export default mixins(ButtonGroup, Themeable).extend({
  name: 'VBtnToggle',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      required: false
    },
    mandatory: Boolean,
    multiple: Boolean
  },
  computed: {
    classes () {
      return {
        'v-btn-toggle': true,
        'v-btn-toggle--selected': this.hasValue,
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    },
    hasValue () {
      return this.multiple && this.inputValue.length || !this.multiple && this.inputValue !== null && typeof this.inputValue !== 'undefined'
    }
  },
  watch: {
    inputValue: {
      handler () {
        this.update()
      },
      deep: true
    }
  },
  created () {
    if (this.multiple && !Array.isArray(this.inputValue)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },
  methods: {
    isSelected (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        return this.inputValue === item
      }
      return this.inputValue.includes(item)
    },
    updateValue (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return
        const nextValue = this.inputValue === item ? null : item;
        this.$emit('change', nextValue)
        this.$emit('update:inputValue', nextValue)
        return
      }
      const items = this.inputValue.slice()
      const index = items.indexOf(item)
      if (index > -1) {
        if (this.mandatory && items.length === 1) return
        items.length >= 1 && items.splice(index, 1)
      } else {
        items.push(item)
      }
      this.$emit('change', items)
      this.$emit('update:inputValue', items)
    },
    updateAllValues () {
      if (!this.multiple) return
      const items = []
      for (let i = 0; i < this.buttons.length; ++i) {
        const item = this.getValue(i)
        const index = this.inputValue.indexOf(item)
        if (index !== -1) {
          items.push(item)
        }
      }
      this.$emit('change', items)
    }
  },
  render (h) {
    return h('div', { class: this.classes }, this.$slots.default)
  }
})
