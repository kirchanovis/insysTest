<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped" :fixed="fixed"
    >
      <v-toolbar-title @click="">
        <img src="@/assets/logo.png" class="logo"/>
      </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y="offset-y">
        <v-btn flat="flat" slot="activator" small="small">Иван Иванов
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-icon class="mr-2">exit_to_app</v-icon>
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-avatar class="mr-2" size="36"><img src="https://cdn.vuetifyjs.com/images/john.jpg"/></v-avatar>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 год</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'еу'
    }
  }
}
</script>


<style scoped>
.logo {
  padding-top:10px;
  height:60px;
}
</style>

