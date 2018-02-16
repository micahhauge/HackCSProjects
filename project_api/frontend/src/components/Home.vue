<template>
  <div>
    <p>Home page</p>
    <p>Projects from backend: {{ projects }}</p>
    <!-- <button @click="getProjects">New random number</button> -->
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
</script>
