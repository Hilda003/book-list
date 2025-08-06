<!-- App.vue -->
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
          
          <div class="flex gap-3">
            <button
              @click="showCategoryModal = true"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              + Kategori
            </button>
          <button 
            @click="showAddModal = true"
            class="bg-gradient-to-r from-warm-500 to-warm-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-warm-600 hover:to-warm-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            + Tambah Buku
          </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-warm-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'books'"
              :class="activeTab === 'books' 
                ? 'border-warm-500 text-warm-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Daftar Buku ({{ books.length }})
            </button>
            <button
              @click="activeTab = 'categories'"
              :class="activeTab === 'categories' 
                ? 'border-warm-500 text-warm-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Kategori ({{ categories.length }})
            </button>
          </nav>
        </div>
      </div>

      <div v-if="activeTab === 'books'">
      <!-- Search and Filter -->
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-200 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-2">Cari Buku</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Judul, Penulis, atau Penerbit"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            />
            </div>
            <div>
              <label class="block text-sm font-medium text-warm-700 mb-2">Kategori</label>
              <select
                v-model="categoryFilter"
                class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
              >
                <option value="">Semua Kategori</option>
                <option 
                  v-for="category in categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-warm-700 mb-2">Tahun Terbit</label>
              <select
                v-model="yearFilter"
                class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
              >
                <option value="">Semua Tahun</option>
                <option 
                  v-for="year in availableYears" 
                  :key="year" 
                  :value="year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
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
            
        <div>
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
        </div>
        </div>
      <!-- Book Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full"
        >
    <div class="mb-4 text-left">
        <div class="flex justify-between items-start gap-2">
    <h3 class="text-xl font-bold text-gray-800 line-clamp-2 flex-1">
      {{ book.name }}
    </h3>
            <div class="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs text-right">
              <span
                :class="book.reading ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'"
                class="px-2 py-1 rounded-full font-medium whitespace-nowrap"
              >
                {{ book.reading ? 'Dibaca' : 'Belum' }}
              </span>
              <span
                :class="book.finished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                class="px-2 py-1 rounded-full font-medium whitespace-nowrap"
              >
                {{ book.finished ? 'Selesai' : 'Progress' }}
              </span>
            </div>
          </div>
        </div>
    <div class="space-y-2 text-sm text-gray-600 mb-4 text-left">
      <p v-if="book.author"><i class="fas fa-user mr-2 text-gray-500 w-4 inline-block text-center"></i>Penulis: {{ book.author }}</p>
      <p v-if="book.publisher"><i class="fas fa-building mr-2 text-gray-500 w-4 inline-block text-center"></i>Penerbit: {{ book.publisher }}</p>
      <p v-if="book.year"><i class="fas fa-calendar-alt mr-2 text-gray-500 w-4 inline-block text-center"></i>Tahun: {{ book.year }}</p>
      <p><i class="fas fa-book mr-2 text-gray-500 w-4 inline-block text-center"></i>Halaman: {{ book.readPage }}/{{ book.pageCount }}</p>
    </div>
    <p v-if="book.summary" class="text-gray-700 text-sm mb-4 line-clamp-3 text-left">
      {{ book.summary }}
    </p>
    <div class="mb-3 text-left">
    <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{{ ((book.readPage / book.pageCount) * 100).toFixed(0) }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${(book.readPage / book.pageCount) * 100}%` }"
        ></div>
      </div>
    </div>
          <div class="flex gap-2 mt-4">
            <button
              @click="editBook(book)"
              class="flex-1 bg-warm-100 text-warm-700 px-4 py-2 rounded-lg font-medium hover:bg-warm-200 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              @click="deleteBook(book.id)"
              class="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
            >
              Hapus
            </button>
          </div>

    <div class="text-xs text-gray-500 mt-4 text-left">
      <span>Ditambahkan: {{ new Date(book.insertedAt).toLocaleDateString('id-ID') }}</span>
      <span v-if="book.updatedAt !== book.insertedAt" class="block">
        Diperbarui: {{ new Date(book.updatedAt).toLocaleDateString('id-ID') }}
      </span>
        </div>
      </div>
    </div>
      <div v-if="filteredBooks.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-warm-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-warm-700 mb-2">Tidak ada buku ditemukan</h3>
        <p class="text-warm-600 mb-6">Coba ubah filter pencarian atau tambah buku baru</p>
        <button
          @click="showAddModal = true"
          class="bg-gradient-to-r from-warm-500 to-warm-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-warm-600 hover:to-warm-700 transition-all duration-200"
        >
          Tambah Buku Pertama
        </button>
        </div>
      </div>

      <div v-if="activeTab === 'categories'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <h3 class="font-bold text-lg text-warm-800 mb-2">{{ category.name }}</h3>
                <p class="text-warm-600 text-sm mb-3">{{ category.description || 'Tidak ada deskripsi' }}</p>
                <p class="text-warm-500 text-xs">
                  {{ getCategoryBookCount(category.id) }} buku
                </p>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button
                @click="editCategory(category)"
                class="flex-1 bg-warm-100 text-warm-700 px-4 py-2 rounded-lg font-medium hover:bg-warm-200 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
        
        <div v-if="categories.length === 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-warm-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-warm-700 mb-2">Belum ada kategori</h3>
          <p class="text-warm-600 mb-6">Mulai dengan menambahkan kategori pertama</p>
          <button
            @click="showCategoryModal = true"
            class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            Tambah Kategori
          </button>
        </div>
      </div>
    </main>

    <BookModal
      v-if="showAddModal || showEditModal"
      :book="editingBook"
      :is-editing="showEditModal"
      :categories="categories"
      @close="closeBookModal"
      @save="saveBook"
    />

    <CategoryModal
      v-if="showCategoryModal || showEditCategoryModal"
      :category="editingCategory"
      :is-editing="showEditCategoryModal"
      @close="closeCategoryModal"
      @save="saveCategory"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookModal from './components/BookModal.vue'
import CategoryModal from './components/CategoryModal.vue'
import { bookService } from './services/bookService.js'

const activeTab = ref('books')
const books = ref([])
const categories = ref([])
const searchQuery = ref('')
const categoryFilter = ref('')
const yearFilter = ref('')
const readingFilter = ref('')
const finishedFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingBook = ref(null)

const showCategoryModal = ref(false)
const showEditCategoryModal = ref(false)
const editingCategory = ref(null)


const filteredBooks = computed(() => {
  let filtered = books.value

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase()
    filtered = filtered.filter(book =>
      book.name.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.publisher.toLowerCase().includes(search)
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(book => book.categoryId === categoryFilter.value)
  }

  if (yearFilter.value) {
    filtered = filtered.filter(book => book.year.toString() === yearFilter.value)
  }

  if (readingFilter.value !== '') {
    const isReading = readingFilter.value === '1'
    filtered = filtered.filter(book => book.reading === isReading)
  }

  if (finishedFilter.value !== '') {
    const isFinished = finishedFilter.value === '1'
    filtered = filtered.filter(book => book.finished === isFinished)
  }

  return filtered
})

const availableYears = computed(() => {
  const years = [...new Set(books.value.map(book => book.year))]
  return years.sort((a, b) => b - a)
})

// Methods
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

const getCategoryBookCount = (categoryId) => {
  return books.value.filter(book => book.categoryId === categoryId).length
}

const saveBook = async (bookData) => {
  try {
    if (showEditModal.value) {
      await bookService.updateBook(editingBook.value.id, bookData)
    } else {
      await bookService.addBook(bookData)
    }
    await loadBooks()
    closeBookModal()
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

const closeBookModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingBook.value = null
}

const saveCategory = async (categoryData) => {
  try {
    if (showEditCategoryModal.value) {
      await bookService.updateCategory(editingCategory.value.id, categoryData)
    } else {
      await bookService.addCategory(categoryData)
    }
    await loadCategories()
    closeCategoryModal()
  } catch (error) {
    console.error('Error saving category:', error)
    alert('Gagal menyimpan kategori: ' + error.message)
  }
}

const editCategory = (category) => {
  editingCategory.value = { ...category }
  showEditCategoryModal.value = true
}

const deleteCategory = async (categoryId) => {
  const bookCount = getCategoryBookCount(categoryId)
  const message = bookCount > 0 
    ? `Kategori ini memiliki ${bookCount} buku. Buku-buku tersebut akan menjadi tanpa kategori. Lanjutkan?`
    : 'Apakah Anda yakin ingin menghapus kategori ini?'
    
  if (confirm(message)) {
    try {
      await bookService.deleteCategory(categoryId)
      await loadCategories()
      await loadBooks()
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Gagal menghapus kategori: ' + error.message)
    }
  }
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  showEditCategoryModal.value = false
  editingCategory.value = null
}
onMounted(() => {
  loadBooks()
  loadCategories()
})
</script>