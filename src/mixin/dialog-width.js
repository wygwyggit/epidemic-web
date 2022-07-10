const { body } = document
const WIDTH = 768
export default {
    data: function () {
        return {
            dialogWidth: '480px'
        }
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            this.dialogWidth = "8.9rem";
        } else {
            this.dialogWidth = '480px'
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width <= WIDTH
        }
    }
}