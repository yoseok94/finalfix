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
// import { provide, onMounted } from 'vue'
// import { useAuth } from './compositions/useAuth.js'
// import Cookies from 'js-cookie'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
  },
  // setup() {
  //   const {
  //     myinfo,
  //     isAuthorized,
  //     isAdmin,
  //     isMember,
  //     signin,
  //     signinByToken,
  //     signout,
  //   } = useAuth()

  //   //데이터 공유
  //   provide("myinfo", myinfo)
  //   provide("isAuthorized", isAuthorized)
  //   provide("isAdmin", isAdmin)
  //   provide("isMember", isMember)
  //   provide("signin", signin)
  //   provide("signout", signout)

  //   onMounted (() => {
  //     const savedToken = Cookies.get('accessToken')
  //     if (savedToken) {
  //       signinByToken(savedToken).then(() => {
  //         console.log('Logined By Token')
  //       })
  //     }
  //   })
  // },
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
  height: calc(100vh - 20px); /* Adjust this value to match your footer height */
  overflow: auto;
}

PageFooter {
  grid-row: 2;
  grid-column: 2;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set this value to match your footer height */
}
</style>