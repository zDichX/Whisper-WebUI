<template>
  <intro v-if="showIntro"/>
  <bg v-if="showBg"/>
  <card v-if="showCard" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import card from './components/card.vue';
import bg from './components/bg.vue'
import intro from './components/intro.vue'

const showIntro = ref<boolean>(false)
const showBg = ref<boolean>(false)
const showCard = ref<boolean>(false)

onMounted(() => {
  const loadComponent = (refVar: { value: boolean }, delay: number): void => {
  setTimeout(() => {
    refVar.value = true
  }, delay)
}
  loadComponent(showIntro, 0)
  loadComponent(showBg, 2800)
  loadComponent(showCard, 3000)
  })


</script>
