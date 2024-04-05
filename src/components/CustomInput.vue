<template>
  <v-text-field
    v-on="$listeners"
    :id="id"
    :value="modelValue"
    @input="(v) => $emit('input', v)"
    hide-spin-buttons
    :outlined="outlined"
    :label="label"
    :required="required"
    :type="type"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "default",
    },
  },
};
</script>

<style lang="scss" scoped></style>
