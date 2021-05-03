export default {
  props: ['pagination'],
  template: '#pagination-template',
  methods: {
    changePage(page) {
      console.log(page);
      if (this.pagination.current_page === page) return;
      this.$emit('change-page', page);
    }
  }
}