<template>
  <div id="app">
    <h1>Input formatter</h1>
    <h2>Mask is case sensetive. Any letters acceptable. You can add characters and spaces as styling</h2>
    <form action="">
      <label class="label">
        Input mask: {{ phonePlaceholder }}
        <InputFormatter :placeholder="phonePlaceholder" v-model="phone" :mask="phonePlaceholder"/>
      </label>
      <label class="label">
        Input mask: {{ datePlaceholder }} 
        <InputFormatter :placeholder="datePlaceholder" v-model="date" :mask="datePlaceholder"/>
      </label>
      <label class="label">
        Input mask: {{ postalCodePlaceholder }}
        <InputFormatter :placeholder="postalCodePlaceholder" v-model="postalCode" :mask="postalCodePlaceholder"/>
      </label>

      <label class="label">
        Input mask: {{ creditCardPlaceholder }}
        <InputFormatter :placeholder="creditCardPlaceholder" v-model="creditCard" :mask="creditCardPlaceholder"/>
      </label>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputFormatter from './components/InputFormatter.vue';

export default Vue.extend({
  name: 'app',
  components: {
    InputFormatter,
  },
  data() {
    return {
      phone: '',
      date: '',
      postalCode: '',
      creditCard: '',
      phonePlaceholder: '+11 (111) 111 11',
      datePlaceholder: 'dd.mm.yyyy',
      postalCodePlaceholder: '1122 MM',
      creditCardPlaceholder: '1234 1234 1234 1234',
    };
  },
});
</script>

<style lang="scss">
@import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 50px;
}
.label {
  display: block;
  margin: 50px auto 0;
  width: 400px;
}
</style>
