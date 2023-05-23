<template>
  <div class="email-form">
    <button class="close-btn" @click="$emit('close')">Close</button>
    <h1>Send template mail</h1>
    <div class="container">
      <form @submit.prevent="submitForm">
        <table>
          <tr v-for="(email, index) in emails" :key="index" class="form-group">
            <td>Email address</td>
            <td>
              <input type="text" class="form-control" v-model="email.address" placeholder="Enter your email address">
            </td>
            <td>
              <button class="form-control remove-btn" @click.prevent="removeEmail(index)">Delete</button>
            </td>
          </tr>
          <tr class="form-group">
    <td>From</td>
    <td>
      <input type="text" class="form-control" v-model="from" placeholder="Enter the sender's email">
    </td>
  </tr>
  <tr class="form-group">
    <td>CC</td>
    <td>
      <input type="text" class="form-control" v-model="ccAddress" placeholder="Enter the CC email addresses, comma-separated">
    </td>
  </tr>
          <tr class="form-group">
    <td>Content</td>
    <td>
      <textarea class="form-control" v-model="content" placeholder="Enter the email content"></textarea>
    </td>
          </tr>
          <tr>
            <td colspan="3">
              <button class="submit-btn">Submit</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      emails: [{ address: '' }],
      from: '',
      ccAddress: '',
      title: '',
      content: '',
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
    async submitForm() {
    try {
      const emailAddresses = this.emails.map(email => email.address);
      const ccAddresses = this.ccAddress.split(','); 


        const data = {
        from: this.from,
        address: emailAddresses,
        ccAddress: ccAddresses,
        title: this.title,
        content: this.content,
        template: this.template,
      };

        // send the request to your server
        await axios.post('/mail/template/send', data);
      alert('Emails sent successfully');
    } catch (error) {
      alert('Failed to send emails:', error);
    }
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
