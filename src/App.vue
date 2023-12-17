<template>
  <div id="wrapper">
    <TopNavbar />
    <router-view/>
  </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
</template>

<script>
import TopNavbar from '@/components/layout/TopNavbar.vue'

export default {
  components: {
      TopNavbar
    }
}
</script>

<style>
</style>
