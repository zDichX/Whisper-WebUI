# Whisper WebUI

Whisper WebUI 是一个简单的前端web界面，用于通过 OpenAI 的Whisper API 转录音频文件。该项目允许您上传音频文件，将其转录为字幕或歌词，并以 SRT 或 LRC 格式下载结果。

## 功能

- 上传音频文件进行转录
- 支持多种语言
- 以 SRT（SubRip 字幕）格式下载转录结果
- 将转录内容转换并下载为 LRC（歌词）文件
- 平滑的动画效果
- 简单易用的界面，实时反馈

## 技术栈

- **Vue 3**
- **TypeScript**
- **Axios**
- **GSAP** 

## 体验

- 访问 Github Pages

## 安装

### 先决条件

-  Node.js

### 安装

```bash
cd whisper-webui

npm install

npm run dev
```

## 使用

1. 在浏览器中打开。
2. 输入 API 的 URL 和您的 API 密钥。
3. 上传一个音频文件。
4. 选择语言。
5. 点击 **Transcribe** 按钮处理音频文件。
6. 处理完成后，将转录结果下载为 SRT 或 LRC 格式。