export class DownloadManager {
  constructor() {
    // Глобальная переменная для отслеживания общего объема скачанных данных
    this.totalDownloaded = 0;
  }

  // Функция для скачивания файла
  async downloadFile(fileName, fileSize) {
    try {
      // Отправляем запрос к файлу
      const response = await fetch(`./assets/${encodeURIComponent(fileName)}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Файл не найден: ${fileName}`);
        } else {
          throw new Error(`Ошибка при загрузке файла: ${response.statusText}`);
        }
      }

      // Получаем данные файла в формате ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();

      // Обновляем общий объем скачанных данных
      this.totalDownloaded += fileSize;

      // Создаем объект Blob из ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      // Создаем URL для скачивания
      const downloadUrl = URL.createObjectURL(blob);

      // Создаем временный элемент <a> для скачивания файла
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;

      // Добавляем элемент в DOM, кликаем по нему и удаляем
      document.body.append(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем URL объекта
      URL.revokeObjectURL(downloadUrl);

      console.log(`Файл ${fileName} успешно скачан`);
      return true;
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
      // Проверяем, является ли ошибка связанной с 404
      if (error.message.includes("Файл не найден")) {
        alert(
          `Файл ${fileName} не найден на сервере. Пожалуйста, проверьте наличие файла в директории assets.`
        );
      } else {
        alert(`Произошла ошибка при скачивании файла: ${error.message}`);
      }
      return false;
    }
  }

  // Метод для получения общего объема скачанных данных
  getTotalDownloaded() {
    return this.totalDownloaded;
  }

  // Метод для перевода байтов в мегабайты
  getTotalDownloadedInMB() {
    return (this.totalDownloaded / (1024 * 1024)).toFixed(2);
  }

  // Метод для сброса счетчика скачанных данных
  resetDownloaded() {
    this.totalDownloaded = 0;
  }
}
