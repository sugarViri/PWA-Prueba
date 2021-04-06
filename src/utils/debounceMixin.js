export const debounceMixin = {
  data () {
    return {
      $_debounceTimerId: null
    }
  },
  methods: {
    $_debounceMixin_debounce (func, delay) {
      return ((...args) => {
        // only in browser
        clearTimeout(this.$_debounceTimerId)
        this.$_debounceTimerId = setTimeout(() => {
          this.$_debounceTimerId = null
          func(...args)
        }, delay)
      })()
    }
  }
}
