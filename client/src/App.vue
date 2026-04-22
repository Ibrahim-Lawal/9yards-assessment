<template>
  <div id="app">
    <div class="container">
      <h1>To-Do List</h1>
      <task-input @task-added="fetchTasks" />
      <task-list :tasks="tasks" :loading="loading" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import TaskInput from './components/TaskInput.vue'
import TaskList from './components/TaskList.vue'

const API_BASE = process.env.API_BASE

export default {
  name: 'App',
  components: {
    TaskInput,
    TaskList
  },
  data() {
    return {
      tasks: [],
      loading: false,
      pollInterval: null
    }
  },
  created() {
    this.fetchTasks()
    this.pollInterval = setInterval(this.fetchTasks, 5000)
  },
  beforeDestroy() {
    clearInterval(this.pollInterval)
  },
  methods: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE}/tasks`)
        this.tasks = response.data
      } catch (err) {
        console.error('Could not load tasks', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
  padding: 40px 16px;
}

.container {
  max-width: 560px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
}
</style>
