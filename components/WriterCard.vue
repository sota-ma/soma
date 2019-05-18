<template>
  <div class="card">
    <div class="card-published-date card-header text-center">
      {{ nameJa }}
    </div>
    <div class="card-body text-center">
      <h5 class="abst">
        {{ nameEn }}
      </h5>
    </div>
    <div class="card-created-date card-footer text-muted text-center">
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
}
.detail-btn {
  margin: 15px 0px 0px 0px;
}
.card-published-date{
  white-space: nowrap;
}
</style>
