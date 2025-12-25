import './css/style.css';
import { DownloadManager } from './classes/DownloadManager.js';
import { FileDisplay } from './classes/FileDisplay.js';

// Создаем экземпляры классов
const downloadManager = new DownloadManager();
const fileDisplay = new FileDisplay(downloadManager);

// Функция для скачивания файла
async function downloadFile(fileName, fileSize) {
  try {
    // Вызываем метод скачивания из DownloadManager
    const success = await downloadManager.downloadFile(fileName, fileSize);

    if (success) {
      // Обновляем отображение объема скачанных данных
      fileDisplay.updateDownloadInfo();
    }
  } catch (error) {
    console.error('Ошибка при скачивании файла:', error);
  }
}

// Вызываем функцию отображения файлов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  fileDisplay.displayFiles();
});

// Экспортируем функции, чтобы они были доступны в глобальной области видимости
window.downloadFile = downloadFile;
