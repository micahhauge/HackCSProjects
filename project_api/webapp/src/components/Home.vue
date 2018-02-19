<template>
  <div>
    <p>Home page</p>
    <p>Projects from backend: {{ projects }}</p>
    <!-- <button @click="getProjects">New random number</button> -->
    <div class="container">
    <div v-for="project in projects" class="card border-primary mb-3" style="max-width: 20rem;">
      <div class="card-header">{{ project.name }}</div>
      <div class="card-body">
        <h4 class="card-title">{{project.name}}</h4>
        <p class="card-text"> {{project.created_date}} </p>
        <p class="card-text"> {{project.upvote}} </p>
        <p class="card-text">{{ project.description }}</p>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      projects: []
    }
  },
  methods: {
    get_projects_from_backend() {
        const path = "http://localhost:5001/api/project"
        axios.get(path)
        .then(response => {
          this.projects = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created () {
    this.get_projects_from_backend()
  }
}


/* creating a Vue panel.
var Panel = Vue.extend({
  template: '#panel-template',
  props: ['title', 'body', 'footer', 'style'],
  data: function() {
    return {
      footer: ''
    }
  }
});
Vue.component('vue-panel', Panel);
*/


</script>
