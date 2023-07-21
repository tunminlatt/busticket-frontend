<template>
  <div v-if="bus">
    <b-row align-v="start">
      <b-col lg="8" class="mb-3 mb-lg-0">
        <b-card class="shadow">
          <h1 class="mb-3">{{ bus.name | capitalize }}</h1>
          <!-- carousel -->
          <BusCarousel :showcase-img="randomImagePath" />

          <hr>

          <!-- Location -->
          <section>
            <div class="d-flex flex-wrap align-items-center mb-2">
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

              <BusCardRating
                :id="bus.id"
                class="flex-1 text-right"
              />
            </div>
          </section>

          <hr>
          <!-- Seat Plan -->
          <div class="mt-4">
            <div class="theatre">
              <div class="screen-side">
                <div class="screen">Bus Front</div>
                <h3 class="select-text">Please select a seat</h3>

                <span class="badge badge-selected mr-2">Selected</span>
                <span class="badge badge-avaliable mr-2">Avaliable</span>
                <span class="badge badge-booked">Booked</span>
              </div>
              <div class="container mt-4">
                <ol class="cabin">
                  <li v-for="(row, rowIndex) in seatRows" :key="rowIndex" :class="`row row--${rowIndex + 1}`">
                    <ol class="seats" :type="seatType(rowIndex)">
                      <li v-for="seat in row" :key="seat.id" class="seat">
                        <input type="checkbox" :id="seat.id" :disabled="!seat.is_available" @click="handleCheckboxClick(seat)"/>
                        <label :for="seat.id">{{ seat.seat_number }}</label>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <hr>

          <div class="d-flex flex-wrap gap-1 mb-3 flex-1">
            <div><i class="mr-1 text-primary fas fa-chair"></i><span class="text-muted"> Seat </span></div>
            <div><i class="mr-1 text-primary fas fa-suitcase"></i><span class="text-muted"> Storage </span></div>
            <div><i class="mr-1 text-primary fas fa-wifi"></i><span class="text-muted"> WiFi </span></div>
            <div><i class="mr-1 text-primary fas fa-wine-glass"></i><span class="text-muted"> Food & Drinks </span></div>
          </div>

        </b-card>
      </b-col>

      <!-- Book -->
      <b-col lg="4" class="sticky p-lg-0">
        <b-card class="shadow">
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <h2 class="mb-0">Book Now</h2>
            <span class="text-bold text-lg" v-if="totalPrice > 0">
              Total: {{ totalPrice | priceFormat }}
            </span>
          </div>
          <hr>
          <b-form>
            <!-- Dates -->
            <b-form-group label="Departure Date" label-class="font-weight-bold">
              <b-form-datepicker
                v-model="form.date"
                placeholder="Choose a departure date"
                locale="en"
                no-flip
                :state="validateState('form.date')"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                Choose a departure date
              </b-form-invalid-feedback>
            </b-form-group>


            <!-- Passenger Counters -->
            <b-form-group label="No. of Passenger" label-class="font-weight-bold">
              <b-dropdown
                :text="totalPassengerCount > 0 ? `Adults: ${form.adultCount}${form.infantCount > 0 ? `, Infants: ${form.infantCount}` : ''}` : 'Choose the number of passengers'"
                block
                :toggle-class="`custom-dropdown-toggle ${!$v.form.adultCount.minValue && $v.form.adultCount.$dirty ? 'custom-dropdown-toggle--error' : ''} d-flex justify-content-between align-items-center`"
                menu-class="w-100"
              >
                <div class="d-flex flex-wrap justify-content-between align-items-center px-3">
                  <div class="text-center">
                    <b>Adult</b>
                    <PassangerCounter :visitor-count="form.adultCount" @change="setPassengerCount('adult', $event)"/>
                  </div>
                  <span class="text-muted">|</span>
                  <div class="text-center">
                    <b>Infant</b>
                    <PassangerCounter :visitor-count="form.infantCount" @change="setPassengerCount('infant', $event)"/>
                  </div>
                </div>
              </b-dropdown>
              <small v-if="!$v.form.adultCount.minValue && $v.form.adultCount.$dirty" class="text-danger">Choose the number of adult passenger</small>
            </b-form-group>

             <b-form-group label="Selected Seat(s)" label-class="font-weight-bold">
              <b-form-input
                v-model="form.seats"
                name="seat"
                :state="validateState('form.seats')"
                disabled
              ></b-form-input>
              <b-form-invalid-feedback>
                Choose a seat.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Name and Surname" label-class="font-weight-bold">
              <b-form-input
                v-model="form.name"
                name="name"
                :state="validateState('form.name')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Fill your name.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Email" label-class="font-weight-bold">
              <b-form-input
                v-model="form.email"
                name="email"
                :state="validateState('form.email')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Fill your eamil and must be a valid e-mail adress.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Phone Number" label-class="font-weight-bold">
              <b-form-input
                v-model="form.phone"
                name="phone"
                type="number"
                :state="validateState('form.phone')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Fill your phone number and must be a valid phone number. e.g. 09123456789
              </b-form-invalid-feedback>
            </b-form-group>

            <div class="d-flex justify-content-between">
              <!-- book -->
              <b-button
                variant="primary"
                @click="book()"
              >
                Book Now
              </b-button>
            </div>

          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PassangerCounter from "@/components/PassangerCounter.vue"
import BusCarousel from "@/components/BusCarousel.vue"
import BusCardRating from "@/components/BusCardRating"

import bookingValidation from "@/mixins/validation/booking-validation.js"
import validateState from "@/mixins/validation/validate-state.js"

import { fetchData, postData } from '@/api';

export default {
  name: "Bus",
  components: {
    PassangerCounter,
    BusCarousel,
    BusCardRating
  },
  mixins: [bookingValidation, validateState],
  data() {
    return {
      bus: null,
      form: { // booking data
        adultCount: 0,
        infantCount: 0,
        date: null,
        seats: null,
        seatIds: [],
        name: "",
        email: "",
        phone: ""
      },
      seatingPlan: null,
      selectedSeats: [],
    }
  },
  computed: {
    totalPassengerCount() {
      return this.form.adultCount + this.form.infantCount;
    },
    totalPrice() {
      return this.form.adultCount * this.bus.price.amount;
    },
    randomImagePath() {
      return require(`@/assets/img/buses/${this.$getRandomNumber(1, 5)}.jpg`);
    },
    isInvalid() {
      return this.$v.$invalid;
    },
    seatRows() {
      if (!this.seatingPlan) {
        return [];
      }

      const seats = this.seatingPlan.seats;

      const seatRows = [];
      let rowIndex = 0;

      for (let i = 0; i < seats.length; i += this.seatingPlan.column) {
        const rowSeats = seats.slice(i, i + this.seatingPlan.column);
        seatRows[rowIndex] = rowSeats;
        rowIndex++;
      }

      return seatRows;
    },
    seatTypes() {
      if (!this.seatingPlan) {
        return [];
      }

      const seats = this.seatingPlan.seats;

      const rows = Math.ceil(seats.length / this.seatingPlan.column);

      const seatTypes = [];
      const baseCharCode = 'A'.charCodeAt(0);
      for (let i = 0; i < rows; i++) {
      seatTypes.push(String.fromCharCode(baseCharCode + i));
      }

      return seatTypes;
    },
  },
  watch: {
    isInvalid: function(val) {
      this.$emit("is-invalid", val);
    },
  },
  created() {
    this.fetchBus()
    this.$emit("is-invalid", this.$v.$invalid);
  },
  methods: {

    async fetchBus() {
      this.loading();
      try {
        const bus = await fetchData(`/buses/${this.$route.params.id}`);
        this.bus = bus
        this.seatingPlan = bus.seating_plan
        this.$swal.close()
      } catch (error) {
        this.$swal.fire('Error!', 'Failed to fetch data.', 'error');
      }
    },

    seatType(index) {
      return this.seatTypes[index % this.seatTypes.length] || 'A';
    },

    setPassengerCount(type, $event) {
      if(type === "adult") {
        this.form.adultCount = $event;
      } else if(type === "infant") {
        this.form.infantCount = $event;
      }
    },

    loading() {
      this.$swal.fire({
        title: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          this.$swal.showLoading();
        }
      });
    },

    async book() {

      this.$v.$touch();

      if(!this.$v.$error) {

        this.loading();

        const data = {
          bus_id: this.$route.params.id,
          passenger_name: this.form.name,
          passenger_email: this.form.email,
          passenger_phone: this.form.phone,
          seat_ids: JSON.stringify(this.form.seatIds)
        }

        const response = await postData('/booking', data)

        if(response.status == 200) {
          this.form = {
            adultCount: 0,
            infantCount: 0,
            date: null,
            seats: null,
            seatIds: [],
            name: "",
            email: "",
            phone: ""
          };
          this.$v.$reset();
          this.selectedSeats = []
          this.fetchBus()

          this.$swal.fire('Success!', 'Booking successful.', 'success');
        }else if(response.status == 408) {
          this.$swal.fire('Error!', response.message, 'error');
        }else{
          this.$swal.fire('Error!', 'Booking unsuccessful, try again', 'error');
        }
      }
    },

    handleCheckboxClick(seat) {
      const index = this.selectedSeats.indexOf(seat.seat_number);
      if (index === -1) {
        this.selectedSeats.push(seat.seat_number);
        this.form.seatIds.push(seat.id);
      } else {
        this.selectedSeats.splice(index, 1);
        this.form.seatIds.splice(this.form.seatIds.indexOf(seat.seat_number), 1);
      }
      this.form.seats = this.selectedSeats.join(',');

    },
  }
};
</script>

<style scoped src="@/assets/css/seat.css">
</style>

<style lang="scss">

.custom-dropdown-toggle {
  border: 1px solid #ced4da;
  background-color: white !important;
  color: #6c757d !important;

  &:hover {
    border-color: #ced4da;
  }

  &--error {
    border-color: #dc3545;
     &:hover {
      border-color: #dc3545;
    }
  }
}

.badge-selected {
  background-color: #d7d419ed;
  color: #00000087;
}
.badge-avaliable {
  background-color: #26a676;
  color: #fff;
}
.badge-booked {
  background-color: #d43c3c;
  color: #fff;
}

</style>