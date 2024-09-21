export function createDownloadURL(filename: string, content: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function srtToLrc(srtContent: string): string {
    return srtContent
        .replace(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/g, (_, __, p2, p3, p4) => `[${p2}:${p3}.${p4.slice(0, 2)}]`)
        .replace(/\d+\n/g, "")
        .replace(/ --> .*?\n/g, "")
        .replace(/\.00\]\n/g, ".00]");
}