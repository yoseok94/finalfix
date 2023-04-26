<template>
  <div class="main-container">
    <div class="sidebar">
      <PageHeader/>

    </div>
    <div class="router-view">
      <router-view/>
    </div>

  </div>
  <PageFooter/>
</template>


<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
  }
}
</script>
<style>
.main-container {
  display: flex;

}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.router-view {
  flex-grow: 1;
  padding: 1rem;

}


</style>