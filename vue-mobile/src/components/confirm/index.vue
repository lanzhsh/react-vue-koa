    <template>
        <div>
            <div>{{content}}</div>
            <div>
                <div @click="cancelHandler">{{cancelTxt}}</div>
                <div @click="confirmHandler">{{confirmTxt}}</div>
            </div>
        </div>
    </template>

<script>
export default {
  data() {
    return {
      content: '',
      confirmTxt: '',
      cancelTxt: '',
      onConfirm: function() {
        this.callback = 'confirm'
      },
      onCancel: function() {
        this.callback = 'cancel'
      },
      callback: ''
    }
  },
  methods: {
    uninstall() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    cancelHandler() {
      (typeof this.onCancel === 'function') && this.onCancel()
      this.uninstall()
    },
    confirmHandler() {
      (typeof this.onConfirm === 'function') && this.onConfirm()
      this.uninstall()
    }
  }
}
</script>
