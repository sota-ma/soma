<template>
  <div class="col-md-6 select-department">
    <b-form inline @submit.prevent="submitData">
      <label for="input-with-list">診療科で検索 &nbsp;</label>
      <b-form-input id="input-with-list" v-model="department" list="input-list" />
      <b-form-datalist id="input-list" :options="candidates" />
      <b-button class="select-department-button" type="submit" variant="primary" size="md">
        検索
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: ''
    }
  },
  computed: {
    candidates() {
      return [
        '脳神経外科',
        '循環器内科',
        '精神科',
        '公衆衛生',
        '感染症内科',
        '放射線科',
        '医療倫理',
        '乳腺外科',
        '神経内科',
        '泌尿器科',
        '医療情報',
        '救急',
        'ICU',
        '医療事務',
        '消化器内科'
      ]
    }
  },
  methods: {
    submitData() {
      this.$emit('search-by-department', this.department)
    }
  }
}
</script>

<style scoped>

.select-department {
  margin: 10px;
}

.select-department-button {
  margin: 10px;
}

</style>
