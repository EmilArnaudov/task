<template>
  <div class="container">
    <form @submit="handleSubmit">
        <input @change="handleFileUpload" type="file">
        <button>send</button>
    </form>
    <p>Budget: {{data}}</p>
    <p v-if="error" class="error">{{error}}</p>
    <UserForm v-if="error" :updateBudget="updateBudget" :data="dataToEdit" :budget="data" ></UserForm>
  </div>
</template>

<script setup>

const data = ref(500)
const dataToEdit = ref(null);
const error = ref(null)
let file = null;

const updateBudget = (num) => {
  data.value = num
  error.value = null;
} 

const handleFileUpload = (e) => {
  file = e.target.files[0]
  console.log(file);
}

async function handleSubmit(e) {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('budget', data.value);

    try {
      let res = await fetch("http://localhost:5000/upload_files", {
          method: 'POST',
          body: formData,
        })

      let resData = await res.json()

      if (res.status === 200) {
          data.value = resData;
      } else {
        error.value = resData.error;
        dataToEdit.value = resData.data;
      }


    } catch (err) {
      console.log(err);
      error.value = err;
    }
}

</script>


<style>

.container {
text-align: center;
}

.form {
  border: 1px solid black;
  height: 200px;
}

.error {
  color: red;
}

</style>