import _debounce from 'lodash/debounce'
import {
    debounceTimer
} from '@/config/config.js'

let fn = null
const debounce = {
    inserted: function (el, binding) {
        fn = _debounce(binding.value, debounceTimer, {
            leading: true,
            trailing: false
        })
        const event = binding.arg || 'click'
        el.addEventListener(event, fn)
    },
    unbind: function(el, binding) {
        const event = binding.arg || 'click'
        fn && el.removeEventListener(event, fn)
    }
}

export default debounce