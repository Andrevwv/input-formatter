<template>
  <ejs-textbox
    v-bind="$attrs"
    v-bind:value="value"
    v-on="inputListeners"
    :placeholder="placeholder"
  >
  </ejs-textbox>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputFormatter',
  inheritAttrs: false,
  props: {
    mask: String,
    value: String,
    placeholder: String,
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({},
        this.$listeners,
        {
          input(event: any) {
            vm.$emit('input', event.value);
          },
          blur(event: any) {
              vm.$emit('input', vm.makeValueFormatted());
              vm.$emit('blur', event.value);
          },
        },
      );
    },
  },
  methods: {
    makeValueFormatted(): string {
      const valueWithoutSymbols = this.normalizeString(this.value);
      let finalString = '';

      for (let maskCharIndex = 0, valueCharIndex = 0; maskCharIndex < this.mask.length; maskCharIndex++) {
        const maskChar = this.mask.charAt(maskCharIndex);
        const valueChar = valueWithoutSymbols.charAt(valueCharIndex);

        if (/[a-z0-9]/i.test(maskChar)) {
          if (maskChar === maskChar.toUpperCase()) {
            finalString += valueChar.toUpperCase();
          } else if (maskChar === maskChar.toLowerCase()) {
            finalString += valueChar.toLowerCase();
          }
          valueCharIndex++;
        } else {
          finalString += maskChar;
        }
      }
      if (!this.normalizeString(finalString)) {
        return '';
      }
      return finalString.trim();
    },
    normalizeString(value: string) {
      return value.replace(/[^A-Z0-9]+/gi, '');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
