export default {
    methods: {
        generateTitle(title) {
            const hasKey = this.$te('route.' + title)
            if (hasKey) {
                const translatedTitle = this.$t('route.' + title)
                return translatedTitle
            }
            return title
        },
        $$t(key, title) {
            if (typeof title === 'undefined') {
                return this.$t(key)
            } else {
                let path = key + '.' + title
                const hasKey = this.$te(path)
                if (hasKey) {
                    const translatedTitle = this.$t(path)
                    return translatedTitle
                }
                return title
            }
        }
    }
}