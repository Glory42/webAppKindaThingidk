# 💱 Currency Nostalgia API

Currency Nostalgia is a currency comparison API that allows users to compare historical USD exchange rates with today's product prices. It uses [CurrencyFreaks](https://currencyfreaks.com/) free API for current exchange rates and manually added JSON data for historical values and product prices.

## 🚀 Features

- Fetches live exchange rates using CurrencyFreaks API.
- Compares historical product prices with today's equivalents.
- Stores historical exchange rates and product data in local JSON files.
- Schedules daily currency rate updates using `node-cron`.

## 🛠️ Project Structure
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

## ⚙️ Setup Instructions

Projenin çalışabilmesi için aşağıdaki adımları takip edin:

### 1. Clone the repository:
```bash
git clone https://github.com/Glory42/webAppKindaThingidk.git
cd webAppKindaThingidk
```

### 2. Install dependencies:
````bash
npm install
`````

### 3. Create a .env file:
In the project root, create a .env file with the following content:
````
CURRENCY_API_KEY=your_currencyfreaks_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key`
````
### 4. Start the server:
````bash
npm start
````
The API will be accessible at: 
```` bash
 http://localhost:3000
```` 

## 📦 Dependencies
| Package                 | Purpose                       |
| ----------------------- | ----------------------------- |
| `express`               | Web framework                 |
| `axios`                 | HTTP client                   |
| `cors`                  | Cross-Origin Resource Sharing |
| `node-cron`             | Scheduled background tasks    |
| `@supabase/supabase-js` | Supabase client for DB access |

## 📁 Data Files
* data/products.json: Historical product prices per year.

* data/historicalExchange.json: Manually stored historical exchange rates.

## 📬 Contributing
Pull requests and contributions are welcome. Please open an issue first to discuss your ideas before making major changes.

MIT [LICENSE](LICENSE) © 2025 Görkem Karyol