# 📚 Bookshelf App

Aplikasi manajemen koleksi buku modern dengan antarmuka yang user-friendly, menggunakan warna warm, dan font JakartaPlus. Dibangun dengan Vue.js untuk frontend dan Hapi.js untuk backend API, serta menggunakan MySQL database melalui Laragon.

## ✨ Fitur

- 📖 **Manajemen Buku Lengkap**: Tambah, edit, hapus, dan lihat detail buku
- 🔍 **Pencarian & Filter**: Cari berdasarkan nama buku dan filter berdasarkan status baca
- 📊 **Progress Tracking**: Lacak progres baca dengan visual progress bar
- 📱 **Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- 🗄️ **Database MySQL**: Penyimpanan data dengan MySQL melalui Laragon

## 🛠️ Teknologi

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Font JakartaPlus** - Modern typography

### Backend
- **Hapi.js** - Node.js web framework
- **MySQL2** - MySQL client untuk Node.js
- **Nanoid** - Unique ID generator

### Development
- **Laragon** - Local development environment
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple scripts

## 🚀 Instalasi & Setup

### Prasyarat
- Node.js 16+
- Laragon (dengan MySQL)
- NPM atau Yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd bookshelf-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Laragon**
   - Pastikan Laragon sudah terinstall dan berjalan
   - Start Apache & MySQL services di Laragon
   - MySQL akan berjalan di port 3306 dengan user `root` dan password kosong

4. **Setup Database**
   ```bash
   npm run setup:db
   ```
5. **Jalankan Server**
   ```bash
   node src/server.js
   ```

5. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```
   
   Perintah ini akan menjalankan:
   - Backend server di `http://localhost:9000`
   - Frontend development server di `http://localhost:3000`

## 📁 Struktur Proyek

```
bookshelf-app/
├── src/
│   ├── components/
│   │   └── BookModal.vue        # Modal untuk tambah/edit buku
│   ├── services/
│   │   └── bookService.js       # API service untuk komunikasi dengan backend
│   ├── App.vue                  # Komponen utama aplikasi
│   ├── main.js                  # Entry point Vue.js
│   ├── style.css                # Global styles
│   ├── server.js                # Hapi.js server
│   ├── handler.js               # Request handlers untuk API
│   ├── routes.js                # API routes definition
│   └── database.js              # Database configuration & helper functions
├── scripts/
│   └── setup-database.js        # Database setup script
├── index.html                   # HTML template
├── package.json                 # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Dokumentasi proyek
```

## 🔌 API Endpoints

### Books API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Dapatkan semua buku |
| GET | `/books?name=query` | Cari buku berdasarkan nama |
| GET | `/books?reading=1` | Filter buku yang sedang dibaca |
| GET | `/books?finished=1` | Filter buku yang sudah selesai |
| GET | `/books/{id}` | Dapatkan detail buku |
| POST | `/books` | Tambah buku baru |
| PUT | `/books/{id}` | Update buku |
| DELETE | `/books/{id}` | Hapus buku |

### Request Body untuk POST/PUT

```json
{
  "name": "Atomic Habits",
  "year": 2018,
  "author": "James Clear",
  "summary": "A guide to building good habits",
  "publisher": "Penguin",
  "pageCount": 320,
  "readPage": 100,
  "reading": true,
  "categoryId": "Non-Fiksi"
}
```

### Categories API
| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/categories`      | Get all categories    |
| GET    | `/categories/{id}` | Get category by ID    |
| POST   | `/categories`      | Create a new category |
| PUT    | `/categories/{id}` | Update category by ID |
| DELETE | `/categories/{id}` | Delete category by ID |

### Request Body untuk POST/PUT

```json
{
  "name": "Fiction",
  "description": "Books related to fictional stories"
}

```

## 🎨 Design System

### Typography
- **Font**: Plus Jakarta Sans
- **Weights**: 200-800 (variable)
- **Usage**: Clean, modern, highly legible

### Komponen UI
- **Cards**: Rounded corners dengan backdrop blur
- **Buttons**: Gradient backgrounds dengan hover effects
- **Forms**: Focused ring styling dengan warm colors
- **Progress bars**: Gradient indicators
- **Modals**: Backdrop blur dengan smooth animations

## 📊 Database Schema

### Tabel: `books`

| Field      | Type         | Description           |
| ---------- | ------------ | --------------------- |
| id         | VARCHAR(16)  | Primary key (UUID)    |
| name       | VARCHAR(255) | Book title            |
| year       | INT          | Year of publication   |
| author     | VARCHAR(255) | Author of the book    |
| summary    | TEXT         | Short description     |
| publisher  | VARCHAR(255) | Book publisher        |
| pageCount  | INT          | Total pages           |
| readPage   | INT          | Pages read            |
| reading    | BOOLEAN      | Reading status        |
| finished   | BOOLEAN      | Finished status       |
| categoryId | VARCHAR(16)  | FK to `categories.id` |
| insertedAt | TIMESTAMP    | Auto insert timestamp |
| updatedAt  | TIMESTAMP    | Auto update timestamp |

### Indexes
- `idx_name` - Index pada kolom name untuk pencarian cepat
- `idx_author` - Index pada kolom author
- `idx_reading` - Index pada kolom reading untuk filter
- `idx_finished` - Index pada kolom finished untuk filter
- `idx_inserted_at` - Index pada kolom insertedAt untuk sorting
  
### Tabel: `categories`
| Field       | Type         | Description           |
| ----------- | ------------ | --------------------- |
| id          | VARCHAR(16)  | Primary key (UUID)    |
| name        | VARCHAR(255) | Unique category name  |
| description | TEXT         | Category description  |
| insertedAt  | TIMESTAMP    | Auto insert timestamp |
| updatedAt   | TIMESTAMP    | Auto update timestamp |


## 🔧 Scripts NPM

```bash
# Development
npm run dev              # Jalankan frontend & backend bersamaan
npm run dev:server       # Jalankan backend saja
npm run dev:client       # Jalankan frontend saja

# Production
npm run build           # Build aplikasi untuk production
npm run start           # Jalankan server production
npm run preview         # Preview build production

# Database
npm run setup:db        # Setup database dan sample data
```

## 📈 Pengembangan Lanjutan

### Fitur yang Bisa Ditambahkan
- **Authentication**: Login/register users
- **Categories**: Kategorisasi buku
- **Reviews**: Rating dan review buku
- **Export/Import**: Backup data ke file
- **Reading Goals**: Target baca tahunan
- **Statistics**: Dashboard statistik baca

### Optimisasi
- **Caching**: Redis untuk cache data
- **CDN**: Static assets optimization
- **Search Engine**: Elasticsearch untuk pencarian advanced
- **Real-time**: WebSocket untuk updates real-time

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request


### Preview
<img width="1901" height="903" alt="image" src="https://github.com/user-attachments/assets/dac26926-46d3-4909-94b1-8ab5a81f58ef" />
<img width="1896" height="916" alt="image" src="https://github.com/user-attachments/assets/6fa8034b-74bd-467f-ac15-e9e863b40734" />
<img width="1910" height="900" alt="image" src="https://github.com/user-attachments/assets/4167abe0-a541-416d-92bc-60babb42513f" />




## 📝 License

Project ini menggunakan MIT License. Lihat file `LICENSE` untuk detail.

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan teknologi modern untuk pengalaman manajemen buku yang optimal.

---

### 🎯 Quick Start

```bash
# Clone & Install
git clone <repo-url> && cd bookshelf-app && npm install

# Setup Database
npm run setup:db

# Run Server
node src/server.js

# Run Development
npm run dev
```

Akses aplikasi di `http://localhost:3000` 🚀
