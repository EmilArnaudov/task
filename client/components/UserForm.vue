<template>
    <form @submit="handleSubmit">
        <label for="food">Food</label>
        <input type="text" id="food" name="food" v-model="food" />

        <label for="food">Electronics</label>
        <input type="text" id="electronics" name="electronics" v-model="electronics" />

        <label for="food">Cloths</label>
        <input type="text" id="cloths" name="cloths" v-model="cloths" />

        <label for="food">Utensils</label>
        <input type="text" id="utensils" name="utensils" v-model="utensils" />
        <button>Edit</button>

        <p v-if="error" class="error">Try again.</p>
    </form>
</template>

<script setup>
    const props = defineProps(['data', 'budget', 'updateBudget'])
    const food = ref(props.data.food);
    const electronics = ref(props.data.electronics);
    const cloths = ref(props.data.cloths);
    const utensils = ref(props.data.utensils);

    const error = ref(null)
    async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:5000/edit_file", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            food: food.value,
            electronics: electronics.value,
            cloths: cloths.value, 
            utensils: utensils.value ,
            filename: props.data.filename,
            budget: props.budget,
          }),
        })

      let resData = await res.json()

      if (res.status === 200) {
        console.log(resData);
          props.updateBudget(Number(resData))
      } else {
        error.value = resData.error;
        props.data.value = resData.data;
      }


    } catch (err) {
      console.log(err);
      error.value = err;
    }
}
</script>

<style scoped>
    form {
        margin: 0 auto;
        width: 10%;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
    }


    .error {
      color: red;
    }
</style>
