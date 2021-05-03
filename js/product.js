import pagination from './components/pagination.js';
import productModal from './components/product-model.js';
import delProductModal from './components/del-product-model.js';


const app = Vue.createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        options: {}
      },
      pagination: {}
    };
  },
  methods: {
    openModal(isNew, item) {
      switch (isNew) {
        case "new":
          this.tempProduct = {};
          this.tempProduct.options = {};
          this.$refs.productModal.openModal();
          break;
        case "edit":
          this.tempProduct = { ...item };
          this.$refs.productModal.openModal();
          break;
        case "delete":
          this.tempProduct = { ...item };
          this.$refs.delProductModal.openModal();
          break;
      }
    },
    // 取得商品列表
    getProduct(page = 1) {
        const api = `/api/${apiPath}/admin/products?page=${page}`;
        axios.get(api)
            .then(response => {
                this.products = response.data.products;
                this.pagination = response.data.pagination;
            })
            .catch(error => {
                console.log(error);
            })
    }
  },
  mounted() {
    // 從 cookie 取登入時存的 token
    const token = document.cookie.split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];
    // 設定 request headers
    axios.defaults.headers.common['Authorization'] = token;
    // 取商品資料
    this.getProduct();
  }
})
.component('pagination', pagination)
.component('product-modal', productModal)
.component('del-product-modal', delProductModal);
app.mount("#app");
