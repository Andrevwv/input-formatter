<template>
  <div>
    <div class="e-input-group" :class="{'e-error': isErrorMessage}">
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
        :placeholder="placeholder"
        class="e-input"
      >
    </div>
    <div class="error" v-if="isErrorMessage">Not enough characters</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputFormatter',
  inheritAttrs: false,
  data() {
    return {
      isErrorMessage: false,
    }
  },
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
            vm.$emit('input', event.target.value);
          },
          blur(event: any) {
              vm.$emit('input', vm.makeValueFormatted());
              vm.$emit('blur', event.target.value);
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
          if(/[a-z]/i.test(valueChar) && /[a-z]/i.test(maskChar)) {
            if (maskChar === maskChar.toUpperCase()) {
              finalString += valueChar.toUpperCase();
            } else if (maskChar === maskChar.toLowerCase()) {
              finalString += valueChar.toLowerCase();
            }
          } else if (/[0-9]/i.test(valueChar) && /[0-9]/i.test(maskChar)) {
            finalString += valueChar;
          }
          valueCharIndex++;
        } else {
          finalString += maskChar;
        }
      }
      if (!this.normalizeString(finalString)) {
        return '';
      }
      const trimedFinalString = finalString.trim()
      this.setErrorMessage(trimedFinalString);
      return trimedFinalString;
    },
    normalizeString(value: string) {
      return value.replace(/[^A-Z0-9]+/gi, '');
    },
    setErrorMessage(value: String) {
      this.isErrorMessage = value.length < this.mask.length;
    },
  },
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
