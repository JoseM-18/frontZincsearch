<template>
  <div class="flex flex-col min-h-screen font-Lato
  bg-primary ">
    <SiteNavigation />
    <RouterView />

  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';

export default {
    setup() {
        return {};
    },
    components: { RouterView, SiteNavigation }
}
</script>

<style lang="scss" scoped>

</style>