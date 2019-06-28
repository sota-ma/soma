<template>
  <div class="card">
    <div class="card-name-en card-body text-center">
      <h5 class="abst">
        {{ handleName }}
      </h5>
      <div class="name">
        {{ nameJa }}
      </div>
    </div>
    <div class="card-institution card-footer text-muted text-center">
      <small class="text-muted">
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
  flex-basis: 30%;
  max-width: 30%;
}
.abst {
  letter-spacing: 0.5px
}
.name {
  font-size: 12px;
}
.text-muted {
  height: 7vh;
}
</style>
