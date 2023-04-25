<template>
  <PageHeader/> <!-- 해더 컴포넌트 -->
  <router-view/> <!-- 페이지 이동이 표시될 영역을 의미함 -->
  <PageFooter/> <!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>

</style>
