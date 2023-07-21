<template>
  <b-card
    no-body
    class="bus-card shadow-sm"
  >
    <b-row no-gutters>
      <b-col
        md="4"
        lg="3"
        class="p-2"
      >
        <!-- Img -->
        <b-card-img
          :src="randomImagePath"
          class="bus-card__img"
        ></b-card-img>
        <!-- Like -->
        <b-button
          class="like-btn text-danger"
          variant="dark"
          @click="isFavorite = !isFavorite"
        >
          <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
        </b-button>
      </b-col>
      <b-col md="8" lg="9">
        <b-card-body class="d-flex flex-column h-100">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Name -->
            <h4 class="card-title">{{ bus.name | capitalize }}</h4>
            <!-- Rating -->
            <BusCardRating
              :id="bus.id"
            />
          </div>

          <div class="d-flex flex-wrap align-items-center mb-2">
            <div class="medium">
                <div class="mt-1 mb-2">
                    {{ bus.from_destination.name }} - {{ bus.to_destination.name }}
                </div>
                <span class="mb-1">Departs : </span> Jul 21, 07:00 AM
                <span class="text-primary text-bold ml-2 mb-1">
                    <i class="fas fa-sun"></i>
                    <span>Day Bus</span>
                </span>
                <br>
                <span class="mb-2">Arrives : </span> Jul 21, 05:00 PM
                <span class="mb-2 text-my"> Duration : 10 Hours</span>
            </div>
          </div>

          <b-card-text>
            <div class="small">
                <span class="text-danger">* </span>
                <i class="mr-2 text-secondary">Foreigner Not Allow</i>

                <span class="text-danger">* </span>
                <i class="mr-2 text-secondary">NRC</i>
            </div>
          </b-card-text>

          <div class="d-flex flex-wrap gap-1 mb-3 flex-1">
            <div><i class="mr-1 text-primary fas fa-chair"></i><span class="text-muted"> Seat </span></div>
            <div><i class="mr-1 text-primary fas fa-suitcase"></i><span class="text-muted"> Storage </span></div>
            <div><i class="mr-1 text-primary fas fa-wifi"></i><span class="text-muted"> WiFi </span></div>
            <div><i class="mr-1 text-primary fas fa-wine-glass"></i><span class="text-muted"> Food & Drinks </span></div>
          </div>
          <hr class="w-100">

          <div class="d-flex justify-content-between align-items-center">
            <span class="font-1h">{{ bus.price.amount | priceFormat }} per seat</span>
            <!-- Book Btn -->
            <b-button :to="`/bus/${bus.id}`" variant="primary">Book Now</b-button>
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import BusCardRating from "@/components/BusCardRating"

export default {
  name: "BusCard",
  components: {
    BusCardRating,
  },
  props: {
    bus: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false,
    }
  },
  computed: {
    randomImagePath() {
      return require(`@/assets/img/buses/${this.$getRandomNumber(1, 5)}.jpg`);
    },
    minPrice() {
      return Math.min(...Object.values(this.bus.price.amount));
    }
  }
};
</script>
