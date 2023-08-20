# MyCar

#SERVER

`cd server/`

##Install dependensi dengan menjalankan perintah berikut:

`npm install`

##Konfigurasi database di 'config.js', sesuaikan pengaturan database dengan database lokal Anda. Lalu lakukan perintah berikut:

`NPX sequelize-cli db:create`

dan

`npx sequelize-cli db:migrate`

##JALANKAN SERVER

`npm run dev`

Server akan berjalan pada http://localhost:3000.

#CLIENT

`cd client/`

##Install dependensi dengan menjalankan perintah berikut:

`npm install`

##JALANKAN CLIENT

`npm run start`

Aplikasi klien akan berjalan pada http://localhost:8080.
