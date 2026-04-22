<template>
  <div class="task-list">
    <p v-if="loading && tasks.length === 0" class="status-text">Loading tasks...</p>
    <p v-else-if="tasks.length === 0" class="status-text">No tasks yet. Add one above.</p>
    <ul v-else>
      <li v-for="task in tasks" :key="task._id" class="task-item">
        <span>{{ task.title }}</span>
        <time class="task-date">{{ formatDate(task.createdAt) }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.task-list ul {
  list-style: none;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.task-item span {
  flex: 1;
  word-break: break-word;
}

.task-date {
  font-size: 0.78rem;
  color: #999;
  white-space: nowrap;
  margin-left: 12px;
}

.status-text {
  font-size: 0.9rem;
  color: #888;
}
</style>
