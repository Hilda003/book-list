<template>
  <div class="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur-md shadow-lg border-b border-warm-200/50 sticky top-0 z-40">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-warm-400 to-warm-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-warm-800">Bookshelf</h1>
              <p class="text-sm text-warm-600">Kelola koleksi buku Anda</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button 
              @click="showCategoryModal = true"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              + Kategori
            </button>
          <button 
            @click="showAddModal = true"
            class="bg-gradient-to-r from-warm-500 to-warm-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-warm-600 hover:to-warm-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            + Tambah Buku
          </button>
          </div>
        </div>
      </div>
    </header>

    <section class="container mx-auto px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-warm-600">Total Buku</p>
              <p class="text-3xl font-bold text-warm-800">{{ stats.totalBooks }}</p>
            </div>
            <div class="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-600">Sedang Dibaca</p>
              <p class="text-3xl font-bold text-blue-800">{{ stats.readingBooks }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-600">Selesai Dibaca</p>
              <p class="text-3xl font-bold text-green-800">{{ stats.finishedBooks }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-purple-600">Kategori</p>
              <p class="text-3xl font-bold text-purple-800">{{ stats.totalCategories }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <main class="container mx-auto px-6 pb-8">
    
      <section class="mb-8">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-warm-200/50">
          <div class="px-8 py-6 border-b border-warm-200/50">
            <h2 class="text-xl font-bold text-warm-800 flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Kategori Buku
            </h2>
          </div>
          <!-- Category -->
          <div class="p-8">
            <div v-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="category in categories"
                :key="category.id"
                class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50 hover:shadow-md transition-all duration-200"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold text-blue-800 mb-1">{{ category.name }}</h3>
                    <p class="text-sm text-blue-600 mb-3">{{ category.description || 'Tanpa deskripsi' }}</p>
                    <span class="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">
                      {{ getBooksCountByCategory(category.id) }} buku
                    </span>
                  </div>
                  <div class="flex gap-2 ml-4 items-start">
              <!-- Edit Button -->
              <button
                @click="editCategory(category)"
                class="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                title="Edit kategori"
              >
                <!-- Lucide Edit Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>

              <!-- Delete Button -->
              <button
                @click="deleteCategory(category.id)"
                class="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                title="Hapus kategori"
              >
                <!-- Lucide Trash Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>

                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">Belum ada kategori</h3>
              <p class="text-gray-600 mb-4">Buat kategori untuk mengorganisir buku Anda</p>
              <button
                @click="showCategoryModal = true"
                class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Tambah Kategori Pertama
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Search and Filter -->
      <section class="mb-8">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-warm-200/50">
          <h2 class="text-xl font-bold text-warm-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Filter & Pencarian
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-2">Cari Buku</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Judul, Penulis, atau Penerbit"
              class="w-full px-4 py-3 border border-warm-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
          
       
            <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">Kategori</label>
            <select
              v-model="categoryFilter"
              class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            >
              <option value="">Semua Kategori</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
  

            <div>
             <label class="block text-sm font-medium text-warm-700 mb-2">Tahun Terbit</label>
            <select
              v-model="yearFilter"
              class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
            >
            <option value="">Semua Tahun</option>
                <option v-for="year in availableYears" :key="year" :value="year.toString()">
                  {{ year }}
                </option>
              </select>

            </div>

            <div>
              <label class="block text-sm font-medium text-warm-700 mb-2">Status</label>
              <select
                v-model="statusFilter"
                class="w-full px-4 py-3 border border-warm-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white/80"
              >
                <option value="">Semua Status</option>
                <option value="reading">Sedang Dibaca</option>
                <option value="finished">Selesai Dibaca</option>
                <option value="not-started">Belum Dibaca</option>
              </select>
            </div>
          </div>
         </div>
      </section>

      <section>
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-warm-200/50">
          <div class="px-8 py-6 border-b border-warm-200/50">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-warm-800 flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Koleksi Buku
              </h2>
              <span class="text-sm text-warm-600">
                {{ filteredBooks.length }} dari {{ books.length }} buku
              </span>
            </div>
          </div>
          
      <!-- Book Grid -->
      <div class="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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


    <!-- Informasi Buku (dengan icon) -->
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

        </div>
      </section>
    </main>


    <BookModal
      v-if="showAddModal || showEditModal"
      :book="editingBook"
      :is-editing="showEditModal"
      @close="closeModal"
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

// Data
const books = ref([])
const categories = ref([])
const stats = ref({
  totalBooks: 0,
  readingBooks: 0,
  finishedBooks: 0,
  totalCategories: 0
})
const searchQuery = ref('')
const categoryFilter = ref('')
const yearFilter = ref('')
const statusFilter = ref('')


const showAddModal = ref(false)
const showEditModal = ref(false)
const showCategoryModal = ref(false)
const showEditCategoryModal = ref(false)
const editingBook = ref(null)
const editingCategory = ref(null)

const filteredBooks = computed(() => {
  let filtered = books.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(book =>
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query)
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(book => book.categoryId === categoryFilter.value)
  }

// Filter tahun - sekarang sudah benar!
  if (yearFilter.value) {
    filtered = filtered.filter(book => book.year && book.year.toString() === yearFilter.value);
  }
  if (statusFilter.value) {
    switch (statusFilter.value) {
      case 'reading':
        filtered = filtered.filter(book => book.reading && !book.finished)
        break
      case 'finished':
        filtered = filtered.filter(book => book.finished)
        break
      case 'not-started':
        filtered = filtered.filter(book => !book.reading && !book.finished)
        break
    }
  }

  return filtered
})

const availableYears = computed(() => {
  const years = [...new Set(books.value.map(book => book.year))]
  return years.sort((a, b) => b - a)
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

const loadStats = async () => {
  try {
    const response = await bookService.getStats()
    stats.value = response.data.stats
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const getBooksCountByCategory = (categoryId) => {
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
    await loadStats()
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
      await loadStats()
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
const saveCategory = async (categoryData) => {
  try {
    if (showEditCategoryModal.value) {
      await bookService.updateCategory(editingCategory.value.id, categoryData)
    } else {
      await bookService.addCategory(categoryData)
    }
    await loadCategories()
    await loadStats()
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
  const booksInCategory = getBooksCountByCategory(categoryId)
  
  if (booksInCategory > 0) {
    alert(`Tidak dapat menghapus kategori yang masih memiliki ${booksInCategory} buku. Hapus atau pindahkan buku terlebih dahulu.`)
    return
  }

  if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
    try {
      await bookService.deleteCategory(categoryId)
      await loadCategories()
      await loadStats()
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
onMounted(async () => {
  await Promise.all([
    loadBooks(),
    loadCategories(),
    loadStats()
  ])
})
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>