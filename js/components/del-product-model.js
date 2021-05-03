export default {
  props: ['temp-product','products'],
  template: '#delProductModel',
  data() {
    return {
      model: null
    }
  },
  methods: {
    openModal() {
      this.model.show();
    },
    // 刪除資料
    deleteProduct() {
      let id = this.tempProduct.id;
      if (id) {
        this.products.forEach((product) => {
          if (product.id === id) {
            const api = `/api/${apiPath}/admin/product/${id}`;
            axios.delete(api,{data: this.tempProduct})
              .then(response => {
                  console.log(response);
                  this.model.hide();
                  this.$emit('delete');
              })
              .catch(error => {
                  console.log(error);
              })
          }
        });
      }
    }
  },
  mounted() {
    // 建立 instance
    this.model = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false
    });
  }
}