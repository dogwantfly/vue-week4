export default {
  props: ['temp-product'],
  template: '#delProductModal',
  data() {
    return {
      modal: null
    }
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    // 刪除資料
    deleteProduct() {
      let id = this.tempProduct.id;
      if (id) {
        const api = `/api/${apiPath}/admin/product/${id}`;
        axios.delete(api,{data: this.tempProduct})
          .then(response => {
            if (!response.data.success) return;
              this.modal.hide();
              this.$emit('delete');
          })
          .catch(error => {
              console.log(error);
          })
      }
    }
  },
  mounted() {
    // 建立 instance
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false
    });
  }
}