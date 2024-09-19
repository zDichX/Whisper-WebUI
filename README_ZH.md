# Whisper WebUI

Whisper WebUI 是一个简单的前端web界面，用于通过 OpenAI 的Whisper API 转录音频文件。该项目允许您上传音频文件，将其转录为字幕或歌词，并以 SRT 或 LRC 格式下载结果。

![image](https://github.com/user-attachments/assets/b0518176-563e-49ca-835d-5a75e54aa323)

## 功能

- 上传文件进行转录
- 支持多种语言
- 以 SRT（SubRip 字幕）格式下载转录结果
- 将转录内容转换并下载为 LRC（歌词）文件
- 平滑的动画效果
- 简单易用的界面

## 技术栈

- **Vue 3**
- **Vite**
- **TypeScript**
- **Axios**
- **GSAP** 

## 立刻体验

- 访问 [GitHub Pages](https://zdichx.github.io/whisper-webui/)

## 安装

```bash
# 克隆项目
git clone https://github.com/zDichX/whisper-webui.git

# 进入目录
cd whisper-webui

# 安装
npm i

# 预览
npm run dev
```
## 使用

1. 在浏览器中打开。
2. 输入 URL 和 Api Key，分别为`http://xxx.xxxxxx.xxx`和`sk-xxxxxx`的格式（注：无需填入`/v1/audio/transcriptions`，程序会自动补全）
3. 上传一个音频文件（低于25MB）。
4. 选择语言。
5. 点击 **Transcribe** 处理音频文件。
6. 处理完成后，将转录结果下载为 SRT 或 LRC 格式。

## 注意事项
- 关于URL和API Key：你可以从 [OpenAI官网](https://platform.openai.com/api-keys) 获取，如果有困难，也可以使用中转服务，你可以[在 Github 上搜索相关项目](https://github.com/search?q=Free%20GPT%20API)。
- 由于OpenAI官方限制，上传的文件不能高于25MB，请自行压缩视频/音频。
- 本项目代码质量低下，且存在AI生成的代码，不建议用于学习。本项目不对代码的易用性、稳定性、安全性、可维护性做任何保证。