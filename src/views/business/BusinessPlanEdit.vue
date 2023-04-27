<template>
    <div>
        <div class="breadcumb-area"
             style="background-image: url('${pageContext.servletContext.contextPath}/resources/img/catagory-img/3.jpg');">
            <div class="container h-100">
                <div class="row h-100 align-items-center">
                    <div class="col-12">
                        <div class="bradcumb-title text-center">
                            <h2>영업 계획 수정</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <table class="add-business-form">
            <tr>
                <td>제목</td>
                <td><input type="text" v-model="title" class="input-field"/></td>
            </tr>
            <tr>
                <td>부서</td>
                <td><input type="text" v-model="department" class="input-field"/></td>
                <td>직책</td>
                <td><input type="text" v-model="position" class="input-field"/></td>
                <td>담당자</td>
                <td><input type="text" v-model="manager" class="input-field"/></td>
            </tr>
            <tr>
                <td>거래처</td>
                <td><input type="text" v-model="account_name" class="input-field"/></td>
            </tr>
            <tr>
                <td>목표 수량</td>
                <td><input type="text" v-model="target_quantity" class="input-field"/></td>
                <td>목표 금액</td>
                <td><input type="text" v-model="target_amount" class="input-field"/></td>
            </tr>
            <tr>
                <td>상세 내용</td>
                <td colspan="5"><input type="textbox" v-model="description" class="textbox"/></td>
            </tr>
            <tr>
                <td>비고</td>
                <td colspan="5"><input type="textbox" v-model="note" class="textbox"/></td>
            </tr>
        </table>
    </div>
    <hr>
    <div class="button-container">
        <button class="btn-edit">수정</button>
        <button class="btn-cancel" @click="clearForm">취소</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            department: "",
            position: "",
            manager: "",
            account_name: "",
            target_quantity: "",
            target_amount: "",
            description: "",
            note: ""
        };
    },
    methods: {
        clearForm() {
            this.title = "";
            this.department = "";
            this.position = "";
            this.manager = "";
            this.account_name = "";
            this.target_quantity = "";
            this.target_amount = "";
            this.description = "";
            this.note = "";
        }
    }
};

</script>

<style scoped>
  .header {
    display: inline-block;
    padding: 8px 16px;
    background-color: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 4px;
    font-size: 24px;
    margin-bottom: 16px;
  }
  .breadcumb-area {
    height: 100px;
    background-position: center center;
    background-repeat: no-repeat
  }
  .bradcumb-title {
    margin-top: 20px;
    margin-bottom: 0;
}

.form-container {
    max-width: 800px;
    margin: auto;
}

.add-business-form {
    border-collapse: separate;
    border-spacing: 0 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: auto;
    width: 80%;
}

.add-business-form td {
    text-align: left;
    padding: 10px;
    border: none;
}

.add-business-form td:first-child {
    font-weight: bold;
}
.add-business-form td:nth-child(3),
.add-business-form td:nth-child(5) {
    font-weight: bold;
}

.form-label {
    width: 120px;
    font-weight: bold;
}

.input-field {
    width: 100%;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
    font-size: 14px;
}

.input-textarea {
    height: 150px;
    resize: vertical;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}

.btn-edit,
.btn-cancel {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    border-radius: 4px;
    font-size: 14px;
}

.btn-add:hover,
.btn-cancel:hover {
    background-color: #0056b3;
}

.textbox {
    border: 1.3px solid black;
    margin: 3px 0; 
    resize: none;
    outline: none;
    background-color: #f5f5f5;
    width: 100%;
    height: 150px;
    position: relative;
    font-size: 14px;
    padding: 8px;
}
</style>
  