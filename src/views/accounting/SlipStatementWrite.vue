<template>
  <br>
    <h1 style="text-align: center;">회계 전표 작성 페이지</h1>
    <br>

    <div class="slip-statement_writer">
      <span>작성자명 : </span>
      &nbsp;<input type="text" name="slipwriter" id="slipwriter" placeholder="admin">
    </div>

    <div class="slip-statement_main">
      <div class="slip-statement_main_title">전표일자</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">달력</div>
        <input type="date" name="slipstatementdate" id="slipstatementdate">
      </div>
     
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title" style="visibility: hidden;">전표일자</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">목차</div>
        <input type="text" name="slipstatementcategory" id="slipstatementcategory" placeholder="전표타입">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">거래처</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">거래처</div>
        <router-link to="/accounting/searchcustomer"><input type="text" name="customer" id="customer" placeholder="거래처"></router-link>
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">공급가액</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">$</div>
        <input type="text" name="supplyvalue" id="supplyvalue" placeholder="거래금액">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">부가세</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">-</div>
        <input type="text" name="slipstatementdate" id="slipstatementdate" placeholder="부가세">
      </div>
    </div>
    <div class="slip-statement_main">
      <div class="slip-statement_main_title">세부내역</div>
      <div class="slip-statement_main_subtitle">
        <div class="slip-statement_main_subtitle_tagname">카드</div>
        <input type="text" name="slipstatementdate" id="slipstatementdate" placeholder="세부내용">
      </div>
    </div>
    <div class="slip-statement_signbtn">
      <input type="button" value="등록하기">
    </div>
   
</template>
    
<script>
</script>
<style scoped>
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
  flex-direction: row;
  align-items: center;
  width: 50%;
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