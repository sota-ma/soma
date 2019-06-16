<template>
  <div class="card">
    <div class="card-name-ja card-header text-center">
      {{ nameJa }}
    </div>
    <div class="card-name-en card-body text-center">
      <h5 class="abst">
        {{ nameEn }}
      </h5>
    </div>
    <div class="card-institution card-footer text-muted text-center">
      <small class="text-muted ">
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
      default: ''
    }
  }
}
</script>

<style scoped>
.abst {
  letter-spacing: 0.5px
}
.card {
  margin: 5px;
  flex-basis: 30%;
  max-width: 30%;
}
.card-name-ja,.card-name-en,.card-institution{
  white-space: nowrap;
}
</style>
