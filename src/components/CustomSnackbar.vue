<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <v-snackbar v-model="open" :timeout="timeout">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="handleCancel">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "CustomSnackbar",
  props: ["open", "text", "timeout"],
  emits: ["close", "save"],
  data() {
    return {};
  },
  methods: {
    handleCancel() {
      this.$emit("close");
    },
  },
};
</script>
