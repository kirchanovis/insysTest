<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped" :fixed="fixed"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
         <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-avatar slot="activator" size="36px">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <HelloWorld/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
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
