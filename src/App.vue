<template>
  <div id="wrapper">
    <TopNavbar />
    <!-- <SideNavbar /> -->
    <router-view/>
  </div>
  <!-- <SideNavbar/> -->
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
</template>

<script>
  import TopNavbar from '@/components/layout/TopNavbar.vue'
  // import SideNavbar from '@/components/layout/SideNavbar.vue'

  export default {
    components: {
      TopNavbar,
      // SideNavbar
    }
  }
</script>

<style>
</style>
