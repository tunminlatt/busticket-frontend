<template>
  <section>
    <div v-if="isFiltering && filteredbuses.length === 0">
      <p>No Result Found.</p>
    </div>
    <div v-else>
    <BusCard
      v-for="bus, i in (filteredbuses.length > 0 ? filteredbuses : buses)"
      :key="i"
      :bus="bus"
      class="mb-3"
    />
    </div>

  </section>

</template>

<script>
import BusCard from "@/components/BusCard"
import { fetchData } from '@/api';

export default {
  name: "BusesSection",
  components: {
    BusCard
  },
  data() {
    return {
      buses: [],
      filteredbuses: [],
      keywordSearch: "",
      isFiltering: false,
    }
  },
  watch: {
    $route: function() {
      this.filter();
    }
  },
  created() {
    this.filter();
    this.fetchBuses();
  },
  methods: {
    async fetchBuses() {
      try {
        const buses = await fetchData(`/buses`);
        this.buses = buses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    // filters buses by search query
    filter() {
      let buses = this.buses;
      const to = this.$route

      this.filteredbuses = [];
      this.isFiltering = false;

      // if searched by keyword set buses and filtered buses with result
      if(to.query.keyword) {
        this.isFiltering = true;
        this.keywordSearch = to.query.keyword;
        buses = this.buses.filter(bus => bus.name.toLowerCase() === this.keywordSearch.toLowerCase() || bus.from_destination.name.toLowerCase() === this.keywordSearch.toLowerCase() || bus.to_destination.name.toLowerCase() === this.keywordSearch.toLowerCase())
        this.filteredbuses = buses;
      }
    }
  }
}
</script>
