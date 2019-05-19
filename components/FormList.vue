<template>
  <b-form-group>
    <b-form-row
      v-for="(item,index) in value"
      :key="index"
      inline
    >
      <b-col>
        <b-form-input
          :value="item"
          type="text"
          @change="data => changeItem(index,data)"
        />
      </b-col>
      <b-col sm="2">
        <b-button @click="removeItem(index)">
          -
        </b-button>
      </b-col>
    </b-form-row>
    <b-button @click="addItem">
      +
    </b-button>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addItem() {
      const newValue = this.value.slice()
      newValue.push('')
      this.$emit('input', newValue)
    },
    removeItem(index) {
      const newValue = this.value.slice()
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
    changeItem(index, data) {
      const newValue = this.value.slice()
      newValue[index] = data
      this.$emit('input', newValue)
    }
  }

}
</script>

<style scoped>
</style>
