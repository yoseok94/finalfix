<template>
    <div class="container">
  <br>
  <h1 style="text-align: center;">회계 전표 작성 페이지</h1>
  <br>
  <form @submit.prevent="saveData">
    <div class="slip-statement_writer">
      <div class="slip-statement_main_title">작성자명 :</div>
      <input type="text" name="slipwriter" id="slipwriter" v-model="slipStatement.slipstatementbrief" placeholder="관리자">
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">전표일자</div>
      <div class="slip-statement_main_subtitle">
        <input type="date" name="slipstatementdate" id="slipstatementdate" v-model="slipStatement.slipstatementdate">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">거래 유형</div>
        <input type="text" name="slipstatementcategory" id="slipstatementcategory" v-model="slipStatement.tradetype" placeholder="전표타입">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">거래처 이름</div>
      <div class="slip-statement_main_subtitle">
      <input type="text" name="customer" id="customer" v-model="slipStatement.accountname" placeholder="거래처 명">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">거래금액</div>
      <div class="slip-statement_main_subtitle">
        <input type="text" name="supplyvalue" id="supplyvalue" v-model="slipStatement.slipstatementamount" placeholder="거래금액">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">세부내역</div>
      <div class="slip-statement_main_subtitle">
        <input type="text" name="detail" id="detail" v-model="slipStatement.slipstatementbrief" placeholder="세부내용">
      </div>
    </div>
    <div class="slip-statement_signbtn">
      <input type="submit" value="등록하기">
    </div>
  </form>
  <div class="actions">
    <button class="movelocation" @click="goBack">이전페이지</button>
  </div>
</div>
</template>
    
<script>
export default {
  data() {
    return {
      isSaving: false,
      slipStatement: {
        slipstatementno: null,
        tradingno: null,
        accountname: '',
        tradetype: '',
        slipstatementamount: null,
        slipstatementbrief: '',
        slipstatementdate: null,
      },
    };
  },
  methods: {
    saveData() {
      this.isSaving = true;
      this.$axios.post(this.$serverUrl + "/accounting/slipwrite/", this.slipStatement)
        .then(() => {
          this.isSaving = false;
        })
        .catch((error) => {
          this.isSaving = false;
          console.error(`Error saving slip statement: ${error}`);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box;
  padding: 0 20px;
}
.slip-statement_writer,
.slip-statement_signbtn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.slip-statement_main-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
}
.slip-statement_main {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
}

.slip-statement_main > div {
  flex: 1 0 auto; 
  box-sizing: border-box;
  padding: 5px;
}
.slip-statement_main_subtitle {
  display: flex;
  align-items: center;
  flex-grow: 2;
}

.slip-statement_main_subtitle input {
  flex-grow: 1;
}

.slip-statement_main_title {
  flex-grow: 1;
}
.slip-statement_main_title,
.slip-statement_main_subtitle_tagname {
  border: 1px solid black;
  margin: 0 5px 5px 5px;
  padding: 3px 5px;
  text-align: center;
  width: auto;
  white-space: nowrap;
}
.slip-statement_main_subtitle {
  display: flex;
  padding: 0;
  margin: 0 5px 5px 5px;
  align-items: center;
}

</style>