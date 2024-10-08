<template>
    <div class="introContainer">
        <span
        v-for="index in arrayRange" :key="index" class="animatedSpan"></span>
    </div>
    <span class="text" ref="textElement">Whisper-1</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const arrayRange = Array.from({ length: 10 }, (_, i) => i + 1);

const textElement = ref<HTMLElement | null>(null);

// 深色模式检测
const checkDarkMode = () => {
    const isDarkMode = ref(false);
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode.value;
};
if (checkDarkMode()) {
    gsap.fromTo("body", {backgroundColor: "black"}, {backgroundColor: "white", duration: 3, delay: 4})
}

// 向父组件发送结束事件
const emit = defineEmits<{
  (event: 'anim-complete'): void;
}>();

// 逐字动画
const applyAnimation = (element: HTMLElement | null) => {
    if (!element) return;

    const text = element.textContent || '';
    element.textContent = '';
    const characters = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        return span;
    });

    characters.forEach(span => element.appendChild(span));

    // 图标
    gsap.timeline()
    .to('.animatedSpan', { height: 50, marginBottom: 200, marginTop: 0, filter: "hue-rotate(120deg)", duration: 0.5, stagger: 0.1, ease: 'power1.inOut', delay: 1})
    .to('.animatedSpan', { height: 70, marginBottom: 0, marginTop: 150, filter: "hue-rotate(240deg)", duration: 0.5, stagger: 0.1, ease: 'power1.inOut', }, "-=1")
    .to('.animatedSpan', { height: 100, marginBottom: 150, marginTop: 0, filter: "hue-rotate(360deg)", duration: 0.5, stagger: 0.1, ease: 'power1.inOut', }, "-=1")
    .to('.animatedSpan', { height: 10, marginBottom: 0, marginTop: 90, duration: 0.5, stagger: 0.1, ease: 'power2.inOut', }, "-=1")
    .to('.animatedSpan', { background: 'transparent', duration: 0.5, stagger: 0.12, ease: 'none', }, "-=1.3")
    .to(element.querySelectorAll('.char'), { opacity: 0.8, margin: "0px", filter: "hue-rotate(400deg)", stagger: 0.1, ease: 'power4.out', duration: 1 }, "-=1.2")
    .to(element.querySelectorAll('.char'), { opacity: 0, duration: 0.2, onComplete: () => {emit('anim-complete')}});
};

onMounted(() => {
    applyAnimation(textElement.value);
});
</script>

<style scoped>
.introContainer {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    z-index: -5;
    display: flex;
    align-items: center;
    height: 70px;
}
.animatedSpan {
    display: block;
    margin: 0 5px;
    border-radius: 50px;
    width: 10px;
    height: 0%;
    background: rgb(0, 191, 255);
    filter: hue-rotate(0);
}
.text {
    position: fixed;
    top: 46%;
    left: 50%;
    transform: translate(-50%);
    z-index: -4;
    font-size: 36px;
    font-weight: bold;
    color: rgb(0, 191, 255);
    text-shadow: 0px 2px 10px rgb(0, 191, 255);
    
}
.text > * {
    opacity: 0;
}
</style>
