<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <v-dialog persistent v-model="open" max-width="360">
    <v-card>
      <v-card-title class="text-h5">
        {{ userData.id ? "Edit user" : "New user" }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <form
            @submit.prevent="handleSubmit"
            class="d-flex flex-column justify-center"
          >
            <CustomInput
              outlined
              required
              :model-value="userData.firstName"
              v-model="userData.firstName"
              label="First Name"
            />
            <CustomInput
              outlined
              required
              :model-value="userData.lastName"
              v-model="userData.lastName"
              label="Last Name"
            />
            <CustomInput
              outlined
              required
              :model-value="userData.email"
              v-model="userData.email"
              label="E-mail"
            />
            <CustomButton
              type="submit"
              label="Submit"
              :disabled="
                !userData.firstName || !userData.lastName || !userData.email
              "
              class="mb-3"
              color="primary"
            />
            <CustomButton
              label="Cancel"
              @click="$emit('close')"
              color="error"
            />
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomButton from "../CustomButton.vue";
import CustomInput from "../CustomInput.vue";

export default {
  name: "CreateEditUser",
  components: { CustomButton, CustomInput },
  props: ["open"],
  emits: ["close", "save"],
  data() {
    return {};
  },
  computed: {
    userData() {
      return this.$store.getters["currentUser"];
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save");
    },
    handleCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
