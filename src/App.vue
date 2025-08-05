<template>
  <div class="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-warm-200">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-warm-400 to-warm-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-warm-800">Bookshelf</h1>
              <p class="text-sm text-warm-600">Kelola koleksi buku Anda</p>
            </div>
          </div>
          
          <button 
            @click="showAddModal = true"
            class="bg-gradient-to-r from-warm-500 to-warm-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-warm-600 hover:to-warm-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            + Tambah Buku
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <!-- Search and Filter -->
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-200 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-warm-700 mb-2">Cari Buku</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Masukkan Judul Buku, Penulis atau Publisher"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
          
          <div class="md:w-48">
            <label class="block text-sm font-medium text-warm-700 mb-2">Status Baca</label>
            <select
              v-model="readingFilter"
              class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="">Semua</option>
              <option value="1">Sedang Dibaca</option>
              <option value="0">Belum Dibaca</option>
            </select>
          </div>
          
          <div class="md:w-48">
            <label class="block text-sm font-medium text-warm-700 mb-2">Status Selesai</label>
            <select
              v-model="finishedFilter"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="">Semua</option>
              <option value="1">Selesai</option>
              <option value="0">Belum Selesai</option>
            </select>
          </div>
          <div class="md:w-48">
          <label class="block text-sm font-medium text-warm-700 mb-2">Kategori</label>
          <select
            v-model="categoryFilter"
            class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
          >
            <option value="">Semua</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>

        <div class="md:w-48">
          <label class="block text-sm font-medium text-warm-700 mb-2">Tahun Terbit</label>
          <input
            v-model="yearFilter"
            type="number"
            class="w-full px-4 py-3 border border-warm-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            placeholder="Contoh: 2024"
          />
        </div>
        </div>
      </div>

      <!-- Book Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="font-bold text-lg text-warm-800 mb-2 line-clamp-2">{{ book.name }}</h3>
              <p class="text-warm-600 text-sm mb-1">oleh {{ book.author }}</p>
              <p class="text-warm-500 text-xs">{{ book.publisher }} • {{ book.year }}</p>
            </div>
            
            <div class="flex flex-col gap-2 ml-4">
              <span
                :class="book.reading ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ book.reading ? 'Dibaca' : 'Belum' }}
              </span>
              <span
                :class="book.finished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ book.finished ? 'Selesai' : 'Progress' }}
              </span>
            </div>
          </div>
          
          <div class="mb-4">
            <div class="flex justify-between text-sm text-warm-600 mb-1">
              <span>Progress</span>
              <span>{{ book.readPage }}/{{ book.pageCount }}</span>
            </div>
            <div class="w-full bg-warm-200 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-warm-400 to-warm-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(book.readPage / book.pageCount) * 100}%` }"
              ></div>
            </div>
          </div>
          
          <p class="text-warm-700 text-sm mb-4 line-clamp-3">{{ book.summary }}</p>
          
          <div class="flex gap-2">
            <button
              @click="editBook(book)"
              class="flex-1 bg-warm-100 text-warm-700 px-4 py-2 rounded-lg font-medium hover:bg-warm-200 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              @click="deleteBook(book.id)"
              class="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
      <div v-if="filteredBooks.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-warm-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-warm-700 mb-2">Belum ada buku</h3>
        <p class="text-warm-600 mb-6">Mulai dengan menambahkan buku pertama Anda</p>
        <button
          @click="showAddModal = true"
          class="bg-gradient-to-r from-warm-500 to-warm-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-warm-600 hover:to-warm-700 transition-all duration-200"
        >
          Tambah Buku Pertama
        </button>
      </div>
    </main>

    <BookModal
      v-if="showAddModal || showEditModal"
      :book="editingBook"
      :is-editing="showEditModal"
      @close="closeModal"
      @save="saveBook"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookModal from './components/BookModal.vue'
import { bookService } from './services/bookService.js'

const books = ref([])
const categories = ref([])
const searchQuery = ref('')
const readingFilter = ref('')
const finishedFilter = ref('')
const categoryFilter = ref('')
const yearFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingBook = ref(null)

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesSearch = !searchQuery.value || [book.name, book.author, book.publisher].some(f => f.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesReading = readingFilter.value === '' || book.reading === (readingFilter.value === '1')
    const matchesFinished = finishedFilter.value === '' || book.finished === (finishedFilter.value === '1')
    const matchesCategory = !categoryFilter.value || book.categoryId === categoryFilter.value
    const matchesYear = !yearFilter.value || book.year === Number(yearFilter.value)
    return matchesSearch && matchesReading && matchesFinished && matchesCategory && matchesYear
  })
})

const loadBooks = async () => {
  try {
    const response = await bookService.getAllBooks()
    books.value = response.data.books
  } catch (error) {
    console.error('Error loading books:', error)
  }
}

const loadCategories = async () => {
  try {
    const response = await bookService.getAllCategories()
    categories.value = response.data.categories
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const saveBook = async (bookData) => {
  try {
    if (showEditModal.value) {
      await bookService.updateBook(editingBook.value.id, bookData)
    } else {
      await bookService.addBook(bookData)
    }
    await loadBooks()
    closeModal()
  } catch (error) {
    console.error('Error saving book:', error)
    alert('Gagal menyimpan buku: ' + error.message)
  }
}

const editBook = (book) => {
  editingBook.value = { ...book }
  showEditModal.value = true
}

const deleteBook = async (bookId) => {
  if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
    try {
      await bookService.deleteBook(bookId)
      await loadBooks()
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('Gagal menghapus buku: ' + error.message)
    }
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingBook.value = null
}

onMounted(() => {
  loadBooks()
  loadCategories()
})
</script>