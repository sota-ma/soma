<template>
  <div class="select-department">
    <b-form-select
      v-model="department"
      :options="options"
      @change="submitData"
    >
      <template slot="first">
        <option :value="''">
          診療科で検索
        </option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: '',
      candidates: [
        '総合診療科',
        '脳神経外科',
        '整形外科',
        '乳腺外科',
        '内科',
        '循環器内科',
        '消化器内科',
        '感染症内科',
        '呼吸器内科',
        '神経内科',
        '精神科',
        '皮膚科',
        '病理',
        '公衆衛生',
        '放射線科',
        '医療倫理',
        '泌尿器科',
        '医療情報',
        '救急',
        'ICU',
        '医療事務'
      ]
    }
  },
  computed: {
    options() {
      return this.candidates.map((option) => {
        return { value: option, text: option }
      })
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
  margin: 10px 0px;
  display: inline-block;
}

</style>
