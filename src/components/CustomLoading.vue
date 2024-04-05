<template>
  <div class="d-flex justify-center w-100 pt-8 pb-8">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "CustomLoading",
};
</script>

<style lang="scss" scoped></style>
