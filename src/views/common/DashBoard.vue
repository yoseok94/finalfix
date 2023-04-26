<template>
  <div class="dashboard">
    <div class="dashboard-row">
      <div class="dashboard-column">
         공지사항
        </div>
      <div class="dashboard-column">
        이벤트페이지
      </div>
    </div>
    <div class="dashboard-row">
      <div class="dashboard-column">
        영업계획표(켈린더)
      </div>
      <div class="dashboard-column">
         월별 매출 그래프
        </div>
    </div>
  </div>
</template>

 <script>
 
 </script>

 <style>

.dashboard {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
}

.dashboard-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
}

.dashboard-column {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  border: 3px dashed red;
  overflow: auto;
}

</style>