<template>
  <v-app style="overflow: hidden">
    <v-app-bar class="print-hide" absolute color="">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <IconButton
        @click="toggleTheme"
        :icon="!isDark ? 'dark_mode' : 'light_mode'"
      />
    </v-app-bar>

    <v-navigation-drawer
      class="print-hide"
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title class="text-h6 header-title">
            <img src="./assets/logo.png" alt="" />
            QuiteJa | Test
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedOption">
          <v-list-item
            exact
            class="text-decoration-none"
            v-for="item in sidebarOptions"
            :key="item.id"
            :to="{ name: item.path }"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="pt-16">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import IconButton from "./components/IconButton.vue";
export default {
  name: "App",
  components: { IconButton },

  data: () => ({
    drawer: false,
    headerTitle: "",
    selectedOption: 0,
    sidebarOptions: [
      { icon: "home", id: 0, label: "Home", path: "Home" },
      { icon: "home", id: 1, label: "Users", path: "Users" },
    ],
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    isDark: function () {
      return this.$vuetify.theme.dark;
    },
  },
};
</script>
<style lang="scss">
.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  img {
    max-width: 2rem;
  }
}
@media print {
  .print-hide {
    display: none !important;
  }

  .print-show {
    display: block !important;
  }
}
</style>
