<template>
  <form class="task-form" @submit.prevent="submit">
    <input
      v-model="title"
      type="text"
      placeholder="Add a new task..."
      class="task-input"
      :disabled="submitting"
    />
    <button type="submit" class="task-btn" :disabled="submitting || !title.trim()">
      {{ submitting ? 'Adding...' : 'Add' }}
    </button>
    <p v-if="error" class="input-error">{{ error }}</p>
  </form>
</template>

<script>
import axios from 'axios'

const API_BASE = process.env.API_BASE

export default {
  name: 'TaskInput',
  data() {
    return {
      title: '',
      submitting: false,
      error: ''
    }
  },
  methods: {
    async submit() {
      this.error = ''

      if (!this.title.trim()) return

      this.submitting = true
      try {
        await axios.post(`${API_BASE}/tasks`, { title: this.title })
        this.title = ''
        this.$emit('task-added')
      } catch (err) {
        this.error = 'Something went wrong. Please try again.'
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.task-input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.15s;
}

.task-input:focus {
  border-color: #555;
}

.task-btn {
  padding: 10px 18px;
  font-size: 0.95rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
}

.task-btn:hover:not(:disabled) {
  background: #111;
}

.task-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-error {
  width: 100%;
  font-size: 0.85rem;
  color: #c0392b;
  margin-top: 4px;
}
</style>
