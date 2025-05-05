````
project-root/
├── node_modules/                  # Node.js modules
├── public/                        # Static files (CSS, JavaScript, images)
│   ├── css/
│   ├── js/
│   └── img/
├── views/                         # Frontend files (HTML, template engine files)
│   └── layouts/
├── routes/                        # Route definitions
│   ├── currency.js                
│   └── nostalgia.js               
├── controllers/                   # Route handlers
│   ├── currencyController.js      
│   └── nostalgiaController.js     
├── config/                        # API and DB configuration
│   ├── api.js
│   └── supabase.js
├── services/
│   └── exchangeRateSerices.js
├── data/                          # Data Files
│   ├── products.json              
│   └── historicalExchange.json    
├── utils/                         # Utility functions
│   └── apiUtils.js                
├── .env                           # Environment variables
├── .gitignore                     # Files to be ignored by Git
├── package.json                   # Node.js project configuration
├── server.js                      # Main server file
└── README.md                      # Project description
````