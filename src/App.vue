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
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: auto 1fr;
  height: 100vh;

}

.sidebar {
  grid-row: 1 / -1;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.router-view {
  grid-row: 1;
  grid-column: 2;
  padding: 1rem;
}

PageFooter {
  grid-row: 2;
  grid-column: 2;
}
</style>