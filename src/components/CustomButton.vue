<template>
  <v-btn :text="text" :type="type" :disabled="disabled" :size="size" :color="color"
    @click="$emit('click')" tile>
    <span v-if="icon">
      <v-icon v-if="iconLeft" :color="iconColor" left>{{ icon }}</v-icon>
      <v-icon v-else :color="iconColor" right>{{ icon }}</v-icon>
    </span>
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'CustomButton',
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: 'default'
    },
    label: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    text: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped></style>