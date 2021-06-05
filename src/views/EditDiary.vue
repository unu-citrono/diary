<template>
  <div>
    <edit-form :diary='diary'></edit-form>
  </div>
</template>

<script>
import EditForm from '@/components/EditForm.vue'

export default {
  
  components: {
    EditForm
  },
  data () {
    return {
      diary: {}
    }
  },
  mounted () {
    this.diary = this.$route.params.diary
  },
  methods: {

  }
}
</script>
