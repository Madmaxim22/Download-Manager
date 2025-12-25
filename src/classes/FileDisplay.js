import { DownloadManager } from './DownloadManager.js';

export class FileDisplay {
  constructor(downloadManager) {
    this.downloadManager = downloadManager;
    this.files = [
      {
        name: 'Storage Standard.pdf', size: 140000
      }, // примерный размер
      {
        name: 'Streams Standard.pdf', size: 120000
      }, // примерный размер
      {
        name: 'XMLHttpRequest Standard.pdf', size: 100000
      }, // примерный размер
    ];
  }

  // Функция для отображения файлов на странице
  displayFiles() {
    const filesList = document.getElementById('files');

    // Очищаем список перед отображением
    filesList.innerHTML = '';

    this.files.forEach((file) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${file.name}</span>
        <button class="download-btn" onclick="downloadFile('${file.name}', ${file.size})">Скачать</button>
      `;
      filesList.append(li);
    });
  }

  // Функция для обновления информации о скачанных данных
  updateDownloadInfo() {
    const totalDownloadedElement = document.getElementById('totalDownloaded');
    // Переводим байты в мегабайты и округляем до 2 знаков после запятой
    const totalInMB = this.downloadManager.getTotalDownloadedInMB();
    totalDownloadedElement.textContent = totalInMB;
  }

  // Метод для получения списка файлов
  getFiles() {
    return this.files;
  }
}
