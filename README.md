# Sistem Informasi Akademik
 Projek sistem informasi akademik

# REQUIREMENT
1. apache webserver app (XAMPP/MAMPP...)
2. kode editor (VsCode/Sublime/..)
3. NODE JS v18
4. php V8.2


# Config Laravel - Werbservice
1. clone project
2. buka folder webservice
3. cari file .env (jika tidak ada silahkan duplicate .env.example -> ubah menjadi .env)
4. setting database
6. buka terminal/cmd
7. ketik "php artisan-migrate --seed"
8. ketik "php artisan serve"
9. buka phpmyadmin
10. buka tabel user tambah 1 user (agar mudah untuk melakukan pengetesan karna data di db masih data dummy)


# Config - CLient-App
1. clone project
2. buka folder client app
3. buka app.vue
4. ganti url sesuai dengan url webservice
5. buka terminal/cmd 
6. navigasi ke folder client-app
7. ketik npm install
8. npm run dev

   
