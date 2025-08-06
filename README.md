# 📚 Bookshelf App

Aplikasi manajemen koleksi buku modern dengan antarmuka yang user-friendly, menggunakan warna hangat, dan font JakartaPlus. Dibangun dengan Vue.js untuk frontend dan Hapi.js untuk backend API, serta menggunakan MySQL database melalui Laragon.

## ✨ Fitur

- 📖 **Manajemen Buku Lengkap**: Tambah, edit, hapus, dan lihat detail buku
- 🔍 **Pencarian & Filter**: Cari berdasarkan nama buku dan filter berdasarkan status baca
- 📊 **Progress Tracking**: Lacak progres baca dengan visual progress bar
- 🎨 **UI Modern**: Desain dengan warna hangat dan font JakartaPlus yang elegan
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
  "name": "Nama Buku",
  "year": 2024,
  "author": "Nama Penulis",
  "summary": "Ringkasan buku...",
  "publisher": "Nama Penerbit",
  "pageCount": 300,
  "readPage": 150,
  "reading": true
}
```

## 🎨 Design System

### Warna Hangat (Warm Palette)
- **Primary**: Orange tones (#f97316, #ea580c)
- **Background**: Cream gradients (#fefdf9, #fef7ed)
- **Accent**: Warm orange variations

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

| Column | Type | Description |
|--------|------|-------------|
| `id` | VARCHAR(16) | Primary key, unique identifier |
| `name` | VARCHAR(255) | Nama buku |
| `year` | INT | Tahun terbit |
| `author` | VARCHAR(255) | Nama penulis |
| `summary` | TEXT | Ringkasan buku |
| `publisher` | VARCHAR(255) | Nama penerbit |
| `pageCount` | INT | Total halaman |
| `readPage` | INT | Halaman yang sudah dibaca |
| `reading` | BOOLEAN | Status sedang dibaca |
| `finished` | BOOLEAN | Status selesai dibaca (auto-calculated) |
| `insertedAt` | TIMESTAMP | Waktu ditambahkan |
| `updatedAt` | TIMESTAMP | Waktu terakhir diupdate |

### Indexes
- `idx_name` - Index pada kolom name untuk pencarian cepat
- `idx_author` - Index pada kolom author
- `idx_reading` - Index pada kolom reading untuk filter
- `idx_finished` - Index pada kolom finished untuk filter
- `idx_inserted_at` - Index pada kolom insertedAt untuk sorting

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

# Run Development
npm run dev
```

Akses aplikasi di `http://localhost:3000` 🚀
