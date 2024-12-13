# api-booking

API для системи бронювання, написана на Node.js з використанням Express та TypeScript.

## Опис

Це базовий API для бронювання, який підтримує операції для роботи з користувачами, бронюваннями, а також надає можливість відправки електронних листів з використанням шаблонів через Nodemailer. API також включає документацію Swagger.

## Технології

- **Node.js**
- **Express**
- **TypeScript**
- **Mongoose** для роботи з MongoDB
- **Swagger** для документації API
- **Nodemailer** для відправки електронних листів
- **Handlebars** для шаблонів електронних листів

## Встановлення

1. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/OksanaNevolina/api-booking
   
2. Встановіть залежності:
  ```bash
   npm install 
```   
## Сценарії
### Запуск у режимі розробки
#### Для запуску API у режимі розробки з моніторингом змін файлів:
  ```bash
   npm run start:dev
``` 
## Ця команда:

1. Використовує rimraf для видалення попередньо зібраних файлів.
2. Запускає tsc-watch, який спостерігає за змінами в коді та автоматично компілює TypeScript файли.
3. Запускає сервер через nodemon, який слідкує за змінами в папці src і перезапускає сервер при зміні файлів.

## Запуск сервера
### Для запуску сервера в продакшн середовищі (після компіляції TypeScript):

```bash
npm run watch:server
```   

## Конфігурація
### Змінні середовища
#### API використовує файл .env для зберігання конфіденційної інформації та налаштувань. Створіть файл .env в кореневій директорії проекту і налаштуйте його відповідно до ваших потреб:
```
PORT=5400

DB_URL=mongodb+srv://sana:sanaDev11@cluster0.5lixf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_ACCESS_SECRET=jwtAccess
JWT_REFRESH_SECRET=jwtRefresh
JWT_ACCESS_EXPIRES_IN=8h
JWT_REFRESH_EXPIRES_IN=30d


JWT_ADMIN_ACCESS_SECRET=jwtAdminAccess
JWT_ADMIN_ACCESS_EXPIRES_IN=20h
JWT_ADMIN_REFRESH_SECRET=jwtAdminRefresh
JWT_ADMIN_REFRESH_EXPIRES_IN=50d


```
### Структура проекту
```
src/ — всі вихідні файли TypeScript
app.ts — основний файл сервера Express
routes/ — маршрути API
models/ — моделі для MongoDB
controllers/ — контролери для обробки запитів
services/ — служби для логіки бізнесу
middlewares/ — проміжні функції для валідації, обробки помилок тощо
```
### Документація API
#### Для доступу до документації Swagger відкрийте API в браузері за адресою:

```bash
http://localhost:5400/swagger
```