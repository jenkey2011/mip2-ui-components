import Vue from 'vue';
import Ripple from '../directives/ripple';
export default Vue.extend({
    name: 'routable',
    directives: {
        Ripple
    },
    props: {
        activeClass: String,
        append: Boolean,
        disabled: Boolean,
        exact: {
            type: Boolean,
            default: undefined
        },
        exactActiveClass: String,
        href: [String, Object],
        to: [String, Object],
        nuxt: Boolean,
        replace: Boolean,
        ripple: [Boolean, Object],
        tag: String,
        target: String
    },
    methods: {
        /* eslint-disable-next-line no-unused-vars */
        click(e) {},
        generateRouteLink() {
            let exact = this.exact;
            let tag;
            const data = {
                attrs: { disabled: this.disabled },
                class: this.classes,
                props: {},
                directives: [{
                    name: 'ripple',
                    value: this.ripple && !this.disabled ? this.ripple : false
                }],
                [this.to ? 'nativeOn' : 'on']: {
                    ...this.$listeners,
                    click: this.click
                }
            };
            if (typeof this.exact === 'undefined') {
                exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
            }
            if (this.to) {
                // Add a special activeClass hook
                // for component level styles
                let activeClass = this.activeClass;
                let exactActiveClass = this.exactActiveClass || activeClass;
                // TODO: apply only in VListTile
                if (this.proxyClass) {
                    activeClass += ' ' + this.proxyClass;
                    exactActiveClass += ' ' + this.proxyClass;
                }
                tag = this.nuxt ? 'nuxt-link' : 'router-link';
                Object.assign(data.props, {
                    to: this.to,
                    exact,
                    activeClass,
                    exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            } else {
                tag = this.href && 'a' || this.tag || 'a';
                if (tag === 'a' && this.href) data.attrs.href = this.href;
            }
            if (this.target) data.attrs.target = this.target;
            return { tag, data };
        }
    }
});
//# sourceMappingURL=routable.js.map