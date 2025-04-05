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
│   └── currency.js                # Currency exchange routes
├── controllers/                   # Route handlers
│   └── currencyController.js
├── config/                        # API configuration
│   └── api.js
├── data/                          # Data Files
│   ├── products.json              # Product price history
│   ├── dailyExchange.json         # Dollar/TL daily exchange rate history
│   └── historicalExchange.json    # Dollar/TL historical exchange rate history
├── utils/                         # Utility functions
│   └── apiUtils.js                # API utility functions
├── .env                           # Environment variables
├── .gitignore                     # Files to be ignored by Git
├── package.json                   # Node.js project configuration
├── server.js                      # Main server file
└── README.md                      # Project description
````