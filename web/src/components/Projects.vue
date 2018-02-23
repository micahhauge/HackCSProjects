
<template>
  <div class='container'>
  <h3>Projects</h3>
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
</template>

<script>
import axios from 'axios';


export default {
  name: 'HelloWorld',
  data () {
    return {
      projects: [],
    }
  },
  created() {
    axios.get('http://localhost:5001/api/project')
      .then( response => {
        this.projects = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
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
