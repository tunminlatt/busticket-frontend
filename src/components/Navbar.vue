<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="mb-5">
    <b-container>
      <b-navbar-brand to="/">Bus Ticketing</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="filter.keywordSearch = keyword">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search by keyword"
              v-model="keyword"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">
              <i class="fas fa-search"></i>
            </b-button>
          </b-nav-form>

        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      keyword: "",
      filter: {
        keywordSearch: "",
      },
      query: {},
    };
  },
  created() {
    this.keyword = this.$route.query.keyword
  },
  watch: {
      keyword(newValue) {
      if(!newValue) {
        this.filter.keywordSearch = ""
      }
    },
    // watch the search filter. if it changes set queries for searching
    filter: {
      handler: function(filter) {
        this.query.keyword = filter.keywordSearch.trim() !== "" > 0 ? filter.keywordSearch.trim() : "";

        this.$router.push({
          path: "/",
          query: this.query
        });
      },
      deep: true,
    },

  },
  methods: {
  },
};
</script>

<style>
</style>