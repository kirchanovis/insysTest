<template>
    <v-footer 
      fixed="fixed"
      dark
      height="auto"
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2018 — <strong> inSystem</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  components: {
  },
  data () {
    return {
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
    }
  }
}

</script>
