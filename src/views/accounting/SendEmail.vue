<template>
  <div class="email-form">
    <button class="close-btn" @click="$emit('close')">Close</button>
    <h1>템플릿 메일 보내기</h1>
    <div class="container">
      <form @submit.prevent="submitForm">
        <table>
          <tr v-for="(email, index) in emails" :key="index" class="form-group">
            <td>메일 주소</td>
            <td>
              <input type="text" class="form-control" v-model="email.address" placeholder="이메일 주소를 입력하세요">
            </td>
            <td>
              <button class="form-control remove-btn" @click.prevent="removeEmail(index)">삭제</button>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button class="form-control" @click.prevent="addEmail">추가</button>
            </td>
          </tr>
          <!-- ... -->
          <button class="submit-btn">발송</button>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emails: [
        { address: '' }
      ],
      // ccAddresses: [ ... ],
      title: '',
      template: '',
    }
  },
  methods: {
    addEmail() {
      this.emails.push({ address: '' });
    },
    removeEmail(index) {
      this.emails.splice(index, 1);
    },
    submitForm() {
      console.log('Submitting form', {
        emails: this.emails,
        title: this.title,
        template: this.template,
      });
    },
  }
}
</script>

<style scoped>
.email-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  height: 100%; 
  max-width: 80%;
  max-height: 70%;
  margin: auto;
  font-family: 'Roboto', sans-serif; /* Google Fonts의 Roboto 사용 */
  font-size: 1rem; /* 글씨 크기 조절 */
}

.close-btn {
  border: none;
  background: none;
  font-size: 20px;
  float: right;
  cursor: pointer;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
}

.remove-btn, .submit-btn {
  background: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
}

.submit-btn {
  background: #28a745;
}

.container {
  margin-top: 20px;
}
</style>
