<template>
  <div>
    <b-form-rating
      v-model="avgRating"
      variant="warning"
      :id="`rating-popover-target-${id}`"
      no-border
      inline
      readonly
    >
    </b-form-rating>
    <b-popover
      :target="`rating-popover-target-${id}`"
      triggers="hover"
      placement="top"
    >
      <template #title>Ratings</template>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-chair"></i> Seats: </span>
        <b-form-rating
          v-model="seatRating"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-suitcase"></i> Storage: </span>
        <b-form-rating
          v-model="storageRating"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-wifi"></i> WiFi: </span>
        <b-form-rating
          v-model="wifiRating"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-wine-glass"></i> Food & Drinks: </span>
        <b-form-rating
          v-model="foodDrinkRating"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "BusCardRating",
  props: {
    id: Number
  },
  data() {
    return {
      rating: {}
    }
  },
  computed: {
    avgRating() {
      return this.$getRandomNumber(1, 5);
    },
    foodDrinkRating: {
      get() {
        return this.rating.food_drink ?? this.$getRandomNumber(1, 5);
      },
      set(value) {
        this.rating.food_drink = value;
      }
    },
    storageRating: {
      get() {
        return this.rating.storage ?? this.$getRandomNumber(1, 5);
      },
      set(value) {
        this.rating.storage = value;
      }
    },
    wifiRating: {
      get() {
        return this.rating.wifi ?? this.$getRandomNumber(1, 5);
      },
      set(value) {
        this.rating.wifi = value;
      }
    },
    seatRating: {
      get() {
        return this.rating.seat ?? this.$getRandomNumber(1, 5);
      },
      set(value) {
        this.rating.seat = value;
      }
    }
  }
};
</script>

<style>
.b-rating {
  background-color: transparent;
}
</style>