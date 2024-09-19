# Whisper WebUI

### [\>\>\>【简体中文】](README_ZH.md)

Whisper WebUI is a simple frontend web interface for transcribing audio using OpenAI Whisper API. This project allows you to upload files, transcribe them into subtitles or lyrics, and download the results in SRT or LRC format.

![image](https://github.com/user-attachments/assets/b0518176-563e-49ca-835d-5a75e54aa323)

## Features

- Upload files for transcription
- Support for multiple languages
- Download transcription results in SRT (SubRip Subtitle) format
- Convert and download transcriptions as LRC (Lyrics) files
- Smooth animations
- Easy-to-use interface

## Technologies

- **Vue 3**
- **Vite**
- **TypeScript**
- **Axios**
- **GSAP**

## Try It Now

- Visit [GitHub Pages](https://zdichx.github.io/whisper-webui/)

## Installation

```bash
# Clone the project
git clone https://github.com/zDichX/whisper-webui.git

# Change directory
cd whisper-webui

# Install dependencies
npm i

# Preview
npm run dev
```

## Usage

1. Open in your browser.
2. Enter the URL and API Key in the formats `http://xxx.xxxxxx.xxx` and `sk-xxxxxx` respectively (Note: The program will automatically append `/v1/audio/transcriptions` to the URL).
3. Upload an file (Less than 25MB).
4. Choose the language.
5. Click the **Transcribe** button to process the audio file.
6. After processing, download the transcription in either SRT or LRC format.

## Note
- About the URL and API Key: You can obtain them from the [OpenAI website](https://platform.openai.com/api-keys). If you encounter difficulties, you can also use proxy services. You can [search for relevant projects on GitHub](https://github.com/search?q=Free%20GPT%20API).
- Due to OpenAI's official restrictions, uploaded files cannot exceed 25MB. Please compress your video/audio files accordingly.
- The code quality of this project is poor, and it contains AI-generated code. It is not recommended for learning purposes. This project makes no guarantees about the code's usability, stability, security, or maintainability.