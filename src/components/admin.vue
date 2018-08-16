<template>
  <v-container fluid>
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          Пользователи
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.website }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
    </v-app>
  </v-container>
</template>

<script>
export default {
  name: 'Admin',
  props: {
    msg: String
  },
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Website', value: 'website' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      items: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
