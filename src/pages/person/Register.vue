<template>
  <center>
    <div class="q-pa-md" style="max-width: 1000px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="birth_date"
          label="Your birth date"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="cpf"
          label="Your CPF"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="sex"
          label="Your sex"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="phone"
          label="Your phone"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="email"
          label="Your email"
          lazy-rules
          type="email"
          :rules="[(val) => !!val || 'Email is missing', isValidEmail()]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </center>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  name: "RegisterPerson",
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const birth_date = ref(null);
    const cpf = ref(null);
    const sex = ref(null);
    const phone = ref(null);
    const email = ref(null);

    return {
      name,
      birth_date,
      cpf,
      sex,
      phone,
      email,

      onSubmit() {
        api
          .post("persons", {
            name: name.value,
            birth_date: birth_date.value,
            cpf: cpf.value,
            sex: sex.value,
            phone: phone.value,
            email: email.value,
          })
          .then(function (response) {
            if (response.data.status == "success") {
              $q.notify({
                type: "positive",
                message: "Person registered sucessfully.",
              });
            } else {
              $q.notify({
                type: "negative",
                message: "Oops, something went wrong, try again.",
              });
            }
          });
      },

      isValidEmail() {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(email.value) || "Invalid email";
      },

      onReset() {
        name.value = null;
        birth_date.value = null;
        cpf.value = null;
        sex.value = null;
        phone.value = null;
        email.value = null;
      },
    };
  },
};
</script>
