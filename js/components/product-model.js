export default {
  props: ['temp-product','products'],
  template: '#productModal',
  data() {
    return {
      model: null
    }
  },
  methods: {
    openModal() {
      this.model.show();
    },
    // 更新資料
    updateProduct() {
      let id = this.tempProduct.id;
      let api;
      let httpMethod = 'post';
      if (id) {
        // 編輯商品
        this.products.forEach((product, index) => {
          if (product.id === id) {
            api = `/api/${apiPath}/admin/product/${id}`
            httpMethod = 'put';
          }
        });
      } else {
        // 建立新商品
        this.tempProduct.id = new Date().getTime();
        api = `/api/${apiPath}/admin/product`;
      }
      axios[httpMethod](api,{data: this.tempProduct})
        .then(response => {
            if (!response.data.success) return;
            this.model.hide();
            this.$emit('update');
        })
        .catch(error => {
            console.log(error);
        })
    },
  },
  mounted() {
    // 建立 instance
    this.model = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false
    });
  }
}