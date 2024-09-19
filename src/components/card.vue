<template>
    <div class="form-container" ref="formContainer">
    <!-- <div class="form-container" ref="formContainer" :style="cardStyle"> -->
        <h2>Whisper WebUI</h2>
        <input v-model="url" placeholder="Enter your url"/>
        <input v-model="apiKey" placeholder="Enter your api key"/>
        <input id="selectFile" type="file" @change="handleFileUpload" />
        <form class="selectForm">
            <label for="languages">language: </label>
            <select v-model="selectedLanguage" id="languages" name="languages">
                <option v-for="language in languages" :key="language.value" :value="language.value">
                {{ language.label }}
                </option>
            </select>
        </form>
            <button @click="sendRequest">Transcribe</button>

        <div v-if="error" class="error">{{ error }}</div>
        <div >
            <pre class="result" ref="resultElement"></pre>
        </div>
        <div class="dlContainer">
            <label ref="labelElement"></label>
            <div class="downloadButtons">
                <button @click="downloadFile">SRC (Subtitles)</button>
                <button @click="convertToLrc">LRC (Lyrics)</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import gsap from 'gsap';

import { createDownloadURL, srtToLrc } from '../utils/fileUtils';

import languages from '../assets/languages.json';

// 状态管理
const url = ref<string | null>(null);
const apiKey = ref<string | null>(null);
const file = ref<File | null>(null);
const selectedLanguage = ref<string | null>(null);
const error = ref<string | null>(null);
const result = ref<string | null>(null);
const resultElement = ref<HTMLElement | null>(null);
const labelElement = ref<HTMLElement | null>(null);

// // 透视动画
// const handleMouseMove = (event: MouseEvent) => {
//     const { innerWidth: width, innerHeight: height } = window;
//     const { clientX: x, clientY: y } = event;
//     const rotateX = (-1) * ((y - height / 2) / height) * 10;
//     const rotateY = ((x - width / 2) / width) * 10;
//     gsap.to('.form-container', { rotationX: rotateX, rotationY: rotateY, duration: 0.5 });
// };

// const setupEventListeners = () => {
//     window.addEventListener('mousemove', handleMouseMove);
// };

// const cleanupEventListeners = () => {
//     window.removeEventListener('mousemove', handleMouseMove);
// };

// 启动动画
const startAnimation = () => {
    gsap.to('.form-container', { top: "50vh", duration: 3, ease: 'power4.inOut' });
};

const showTextBoxAnim = () => {
    gsap.timeline()
    .fromTo(".result", { maxHeight: "0vh" }, { maxHeight: "20vh", duration: 2, ease: "power4.inOut" })
    .fromTo(".downloadButtons", { opacity: 0.5 }, { opacity: 1, duration: 0.5, ease: "power4.inOut" });
};

const showTextAnim = (element: HTMLElement | null) => {
    if (!element) return;

    const characters = Array.from(element.textContent || '').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        return span;
    });

    element.textContent = '';
    characters.forEach(span => element.appendChild(span));

    gsap.fromTo(
        element.querySelectorAll('.char'),
        { opacity: 0.5, fontSize: 0, margin: 0, padding: 0, fontFamily: 'Helvetica' },
        { opacity: 1, fontSize: '16px', stagger: 0.01, ease: 'power4.out', duration: 0.2 }
    );
};

// 处理文件上传
const handleFileUpload = (event: Event) => {
    file.value = (event.target as HTMLInputElement).files?.[0] || null;
};

// 发送请求处理媒体文件
const sendRequest = async () => {
    if (!file.value) {
        error.value = 'Please upload a file.';
        return;
    }

    if (labelElement.value) {
        labelElement.value.textContent = 'Processing. Please wait....';
        showTextAnim(labelElement.value);
    }

    error.value = null;

    const headers = {
        "Authorization": `Bearer ${apiKey.value}`,
        "Content-Type": "multipart/form-data"
    };

    const formData = new FormData();
    formData.append("file", file.value);
    formData.append("model", "whisper-1");
    formData.append("response_format", "srt");
    formData.append("timestamp_granularities", "segment");
    if (selectedLanguage.value) formData.append("language", selectedLanguage.value);
    if (url.value == null) url.value = "http://127.0.0.1:5000";
    try {
        const response = await axios.post(`${url.value}/v1/audio/transcriptions`, formData, { headers });
        result.value = response.data;
        if (resultElement.value && labelElement.value) {
            resultElement.value.textContent = result.value;
            showTextBoxAnim();
            showTextAnim(resultElement.value);

            labelElement.value.textContent = "Download as...";
            showTextAnim(labelElement.value);
        }
    } catch (err) {
        error.value = 'Request failed, please try again.';
        console.error(err);
    }
};

// 下载文件
const downloadFile = () => {
    if (result.value) {
        createDownloadURL('test.srt', result.value);
    } else {
        error.value = 'Please transcribe first.';
    }
};

// 转换 SRT 文件内容为 LRC，之后下载
const convertToLrc = () => {
    if (!result.value) {
        error.value = 'Please transcribe first.';
        return;
    }
    createDownloadURL('test.lrc', srtToLrc(result.value));
};

// 生命周期钩子
onMounted(() => {
    startAnimation();
    // setupEventListeners();
});

onUnmounted(() => {
    // cleanupEventListeners();
});
</script>



<style scoped>
.form-container {
    position: fixed;
    top: -50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    padding: 20px;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(45deg, #4A90E2 0%, #b8deff 100%);
    border-radius: 30px;
    max-width: 80vw;
    box-shadow: 10px 10px 0px black;
}

input {
    border: 5px solid #9ccaff;
    margin: 3px 0px;
    padding: 8px;
    border-radius: 20px;
}
input:focus {
    outline: none;
}
#selectFile {
    border: none;
}

label, .error {
    padding: 0px 10px;
}

.bottons {
    display: flex;
    flex-direction: column;
}

button {
    margin: 5px;
    box-shadow: 3px 3px 0px;
    padding: 8px;
    border-radius: 20px;
}


.downloadButtons {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    opacity: 0.5;
}
.downloadButtons > button {
    width: 100%;
}

select {
    margin: 3px 0px;
    padding: 8px;
    border-radius: 20px;
}

.selectForm {
    margin: 0px;
    padding: 0px;
    border-radius: 20px;
}
.result {
    color: black;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0px 10px;
}

/* .dlContainer {
    height: 0px; 
    overflow: hidden;
} */

.error {
    color: red;
}

/* 滚动条整体容器 */
::-webkit-scrollbar {
    width: 10px;
}

/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
    background: #4A90E2;
    border-radius: 5px;
}

/* 滚动条的轨道 */
::-webkit-scrollbar-track {
    background: transparent;
}
</style>
