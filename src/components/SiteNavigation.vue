<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row
    items-center gap-4 text-blue py-6">
    <RouterLink :to="{name:'home'}">
      <div class="flex items-center gap-3 flex-1">
        <i class="fa-solid fa-sum text-2x1">SearchApp</i>
      </div>
    </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';



</script>
