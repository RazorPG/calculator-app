<template>
  <div class="mt-4 text-start">
    <ul v-if="value.length">
      <li v-for="(item, index) in value" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'history',
    props: ['value'],
  }
</script>
