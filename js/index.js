// 引入 Vue 的 createApp 方法
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js'

const app = {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.defaults.baseURL = 'https://dev-vue-course-api.hexschool.io';
            const api = '/admin/signin';
            axios.post(api,this.user)
                .then(response => {
                    console.log(response);
                    // 登入失敗
                    if (!response.data.success) {
                        alert(response.data.error.message);
                        return;
                    }
                    const { token , expired } = response.data;
                    console.log(`token: ${token}`, `expired: ${expired}`);
                    // 將 token expired 存入 cookie
                    document.cookie = `token=${token};expired=${new Date(expired)}`;
                    // 轉址
                    document.location = 'product.html';
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
createApp(app).mount('#app');