<template>
    <div class="circleContainer">
    <!-- 将伪元素替换为 div -->
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';

onMounted(() => {
  gsap.to('.circleContainer', {
    top: "100vh",
    duration: 3,
    ease: 'power4.inOut'
  });

  gsap.to('.circle1', {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'linear'
  });

  gsap.to('.circle2', {
      rotation: 360, 
      duration: 18,
      repeat: -1,
      ease: 'linear'
  });

  gsap.to('.circle3', {
      rotation: 360, 
      duration: 22,
      repeat: -1,
      ease: 'linear'
  });
});
</script>
  
  <style scoped>
  .circleContainer {
    position: fixed;
    min-width: 100vw;
    margin: 0;
    left: 0;
    top: 0;
    transform: scale(1.5);
    z-index: -1;
  }
  
  .circle1, .circle2, .circle3 {
    content: '';
    position: absolute;
    min-width: 200vw;
    min-height: 200vw;
    border-radius: 45%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
  }
  
  .circle1 {
    background: radial-gradient(circle,#537895, #53958f, #004db1);
    /* background-color: rgba(28, 43, 59, 1); */
    bottom: 15vh;
  }
  
  .circle2 {
    background: radial-gradient(circle,#537895, #53958f, #004db1);
    opacity: 0.5;
    bottom: 12vh;
  }

  .circle3 {
    background: radial-gradient(circle,#537895, #53958f, #004db1);
    opacity: 0.3;
    bottom: 9vh;
  }
  </style>
  