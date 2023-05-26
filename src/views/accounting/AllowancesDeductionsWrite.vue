<template>
  <div>
    <br>
    <h1 style="text-align: center;">수당 및 공제 리스트 등록</h1>
    <br>

    <!-- 테이블 구역 -->
    <form @submit.prevent="saveData">
      <table class="salary-table">
        <thead>
          <tr>
            <th style="width: 200px;">항목코드</th>
            <th style="width: 400px;">항목이름</th>
            <th>계산식</th>
            <th>산출방법</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in list" :key="index">
            <td><input type="text" v-model="row.adcode"></td>
            <td><input type="text" v-model="row.adname"></td>
            <td><input type="text" v-model="row.adcalculation"></td>
            <td><input type="text" v-model="row.adcalculationmethod"></td>
          </tr>
          <button @click="addRow()">+</button>
        </tbody>
      </table>
    </form>
            <!-- 액션 버튼 (이메일 및 인쇄) 구역 -->
            <div class="actions">
              <button @click="saveData" :disabled="isSaving">{{ isSaving ? '등록처리중...' : '신규등록' }}
</button>
<button class="movelocation" @click="goback">이전페이지</button>
    </div>
    </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      isSaving: false,
      list: [
        { adcode: '', adname: '', adcalculation: '', adcalculationmethod: '' }
      ], // Initialize list with an empty object
    }
  },
  methods: {
  addRow() {
    this.list.push({ adcode: '', adname: '', adcalculation: '', adcalculationmethod: '' });
  },
  saveData() {
    this.isSaving = true;  // New data property to track saving status

    const savePromises = this.list.map(row => this.saveRow(row));  // Create an array of promises

    Promise.allSettled(savePromises)
  .then((results) => {
    this.isSaving = false;
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Error saving row ${index}: ${result.reason}`);
      }
    });
  })
},
  saveRow(row) {
    return this.$axios.post(this.$serverUrl + "/accounting/adwrite/", row);
  },
  goBack() {
    this.$router.go(-1);
  },
},

}
</script>
  
<style scoped>
input.table-input {
  border: none;
}

.salary_menu-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 5px;
}

.search_container-bar {
  margin-right: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
}

.actions button {
  margin-right: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.pagination button {
  margin: 0 0.5rem;
}

.page {
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.page.active,
.page:hover {
  background-color: #0077cc;
  color: #fff;
}


th {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
}</style>