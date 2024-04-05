<template>
  <v-btn icon :size="size" :color="color" @click="$emit('click')">
    <v-icon :color="iconColor">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'IconButton',
  emits: ['click'],
  props: {
    icon: {
      type: String,
      default: 'done'
    },
    color: {
      type: String,
      default: 'default'
    },
    iconColor: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped></style>