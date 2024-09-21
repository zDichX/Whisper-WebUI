import { FFmpeg } from "@ffmpeg/ffmpeg";

// 初始化 FFmpeg 实例
const ffmpeg = new FFmpeg();

export const convertToAudio = async (videoFile: File, outputBitrate: string = '128k'): Promise<File | null> => {
  console.log(videoFile)
  try {
    // 加载 FFmpeg 库
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    const fileName = videoFile.name;  // 输入文件名
    const outputFileName = 'output.mp3';  // 输出文件名

    // 将视频文件写入 FFmpeg 虚拟文件系统
    const videoData = await videoFile.arrayBuffer();  // 读取视频文件为 ArrayBuffer
    await ffmpeg.writeFile(fileName, new Uint8Array(videoData));  // 将视频文件写入虚拟文件系统

    // 使用 FFmpeg 命令将视频转换为音频并压缩为 128kbps
    await ffmpeg.exec(['-i', fileName, '-b:a', outputBitrate, outputFileName]);
    // 读取输出文件
    const data = await ffmpeg.readFile(outputFileName);
    const audioBlob = new Blob([data], { type: 'audio/mp3' });
    const audioFile = new File([audioBlob], outputFileName, { type: 'audio/mp3' });

    return audioFile;
  } catch (error) {
    console.error('转换音频时发生错误: ', error);
    return null;
  }
};

// const readFromBlobOrFile = (blob: Blob): Promise<ArrayBuffer> => (
//   new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       resolve(fileReader.result as ArrayBuffer);
//     };
//     fileReader.onerror = ({ target }) => {
//       reject(new Error(`File could not be read! Code=${(target as FileReader).error?.code}`));
//     };
//     fileReader.readAsArrayBuffer(blob);
//   })
// );

// const fetchFile = async (_data?: string | Blob | File): Promise<Uint8Array> => {
//   let data: any = _data;
//   if (typeof _data === 'undefined') {
//     return new Uint8Array();
//   }

//   if (typeof _data === 'string') {
//     /* From base64 format */
//     const base64Match = /data:[a-zA-Z]*\/([a-zA-Z]*);base64,([^"]*)/.exec(_data);
//     if (base64Match) {
//       data = atob(base64Match[2])
//         .split('')
//         .map((c) => c.charCodeAt(0));
//     /* From remote server/URL */
//     } else {
//       const res = await fetch(new URL(_data, import.meta.url).href);
//       data = await res.arrayBuffer();
//     }
//   /* From Blob or File */
//   } else if (_data instanceof File || _data instanceof Blob) {
//     data = await readFromBlobOrFile(_data);
//   }

//   return new Uint8Array(data);
// };
