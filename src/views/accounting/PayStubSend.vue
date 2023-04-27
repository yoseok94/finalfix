<template>
  <div>
    <h1 style="text-align: center;">급여명세서 보내기</h1>
    <br>

    <label>발신수단</label>
    <label><input type="checkbox" class="email"/> Email</label>
    <label><input type="checkbox" class="mobile"/> Mobile</label>

    <br>
    <br>
    <div class="email-info">
    <h6 class="email-info-title">이메일정보</h6>
    <hr class="email-info-hr" />

  </div>
    <div class="form-section">
      <label>이메일 발송 주소</label>
      <input type="text" placeholder="admin@admin.com" />
    </div>
    <div class="form-section">
      <label>참조자</label>
      <input type="text" placeholder="필요할 경우 적어주세요" />
    </div>
    <div class="form-section">
      <label>메일 제목</label>
      <input type="text" placeholder="예시: 4월 급여명세서 입니다." />
    </div>
    <div class="form-section">
      <label>메일 내용</label>
      <textarea></textarea>
    </div>
    <div class="form-section">
      <button>첨부하기</button>
    </div>

    <h3>수신정보</h3>
    <table>
        <thead>
            <tr>
                <td>수신자명</td>
                <td>상세내용</td>
                <td>금액</td>
                <td>받을대상</td>
                <td>받는메일주소</td>
            </tr>
          </thead>
        <tbody>
            <tr>
                <td>윤영광</td>
                <td>급여</td>
                <td>4,500,000 원</td>
                <td>윤영광</td>
                <td>test01@example.com</td>
            </tr>
        </tbody>
    </table>
    <br>
    <input type="button" value="전송하기" />
  </div>
</template>

<script>
export default {
  methods: {
    sendPayStub() {
      // 이메일하고 카톡 API 추가하기!
    },
  },
};
</script>

<style scoped>
.email-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.email-info-title {
  margin: 0;
  margin-right: 1rem;
}

.email-info-hr {
  flex-grow: 1;
  border: none;
  border-top: 1px solid black;
  margin-left: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-section {
  margin-bottom: 1rem;
}

input[type="text"], textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  margin-left: 1rem;
  margin-right: 0.5rem;
}

button {
  margin-top: 8px;
}
</style>