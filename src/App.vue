<template>

    <div class="row">
      <div class="col-auto">
        <PageHeader/> <!-- header component -->
      </div>
  
        <router-view/> <!-- refers to the area where the page movement will be displayed -->
  
    </div>
  
    <PageFooter/> <!-- Footer component -->

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

</style>