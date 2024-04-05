<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <v-dialog @click:outside="handleCancel" v-model="open" max-width="600">
    <v-card>
      <v-card-title class="text-h5 pl-4 pb-2">
        {{ userData.firstName }}
      </v-card-title>
      <hr />
      <v-card-text class="pt-4">
        <div class="d-flex flex-column">
          <div class="d-flex justify-start align-center mb-4">
            <div class="d-flex align-center mr-3">
              <v-icon dense class="icon">md_person</v-icon>
              <b>Name</b>
            </div>
            <span class="text-overline"
              >{{ userData.firstName }} {{ userData.lastName }}</span
            >
          </div>
          <div class="d-flex align-center mb-4">
            <div class="d-flex align-center mr-3">
              <v-icon dense class="icon">md_mail</v-icon>
              <b>E-Mail</b>
            </div>
            <span class="text-overline">{{ userData.email }}</span>
          </div>
          <div class="d-flex align-center mb-4">
            <div class="d-flex align-center mr-3">
              <v-icon dense class="icon">md_calendar_month</v-icon>
              <b>Date of Birth</b>
            </div>
            <span class="text-overline">{{
              formatDateToPtBR(userData.dateOfBirth)
            }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { formatDateToPtBR } from "@/utils/format";

export default {
  name: "UserView",
  props: ["open"],
  emits: ["close"],
  data() {
    return { formatDateToPtBR };
  },
  computed: {
    userData() {
      return this.$store.getters["currentUser"];
    },
  },
  methods: {
    handleCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  width: 0px;
  padding-right: 3rem;
}
</style>
