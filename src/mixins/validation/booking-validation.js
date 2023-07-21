import { required, minValue, email } from "vuelidate/lib/validators";

export default {
  validations: {
    form: {
      adultCount: {
        minValue: minValue(1),
      },
      date: {
        required
      },
      seats: {
        required
      },
       name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required
      },
    },
  },
}