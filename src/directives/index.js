import debounce from './debounce'
const directivePlugin = {
    install: function(Vue) {
        Vue.directive('debounce', debounce)
    }
}

export default directivePlugin