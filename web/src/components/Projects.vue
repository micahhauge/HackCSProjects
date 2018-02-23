
<template>
    <p>
      test
    </p>
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
        this.posts = response.data
        console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
