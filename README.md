````
project-root/
├── node_modules/        # Node.js modülleri
├── public/              # Statik dosyalar (CSS, JavaScript, resimler)
│   ├── css/
│   ├── js/
│   └── img/
├── views/               # Frontend dosyaları (HTML, şablon motoru dosyaları)
│   └── layouts/
├── routes/              # Rota tanımları
│   └── currency.js      # Döviz kuru rotaları
├── controllers/         # Rota işleyicileri
│   └── currencyController.js
├── config/              # API yapılandırması
│   └── api.js
├── utils/               # Yardımcı fonksiyonlar
│   └── apiUtils.js      # API yardımcı fonksiyonları
├── .env                 # Ortam değişkenleri
├── .gitignore           # Git tarafından yok sayılacak dosyalar
├── package.json         # Node.js proje yapılandırması
├── server.js            # Ana sunucu dosyası
└── README.md            # Proje açıklaması
````