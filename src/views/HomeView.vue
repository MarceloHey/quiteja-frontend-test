<template>
  <div class="home">HOME</div>
</template>

<script>
import { setWindowName } from "@/utils/meta";

export default {
  name: "HomeView",
  components: {},
  mounted() {
    setWindowName("QuiteJá | Home");
  },
};
</script>
