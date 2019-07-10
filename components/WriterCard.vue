<template>
  <div class="card">
    <div class="card-name-en card-body text-center">
      <p class="abst">
        {{ handleName }}
      </p>
      <p class="name">
        {{ nameJa }}
      </p>
    </div>
    <div class="card-institution card-footer text-muted text-center">
      <small>
        {{ institution }}
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nameJa: {
      type: String,
      default: ''
    },
    nameEn: {
      type: String,
      default: ''
    },
    institution: {
      type: String,
      default: '(本人希望により所属は非開示)'
    },
    handleName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.card {
  margin: 5px;
  min-width: 300px;
  max-width: 30%;
}
.abst {
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: bold;
}

.name {
  font-size: 12px;
}
.text-muted {
  height: 9vh;
}
</style>
