<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-warm-500 to-warm-600 px-8 py-6 text-white">
        <h2 class="text-2xl font-bold">
          {{ isEditing ? 'Edit Buku' : 'Tambah Buku Baru' }}
        </h2>
        <p class="text-warm-100 mt-1">
          {{ isEditing ? 'Perbarui informasi buku' : 'Lengkapi form untuk menambahkan buku baru' }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
        <div class="space-y-8">
          <!-- Basic Information -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-warm-800 border-b border-warm-200 pb-2">
              Informasi Dasar
            </h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Judul Buku -->
              <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Judul Buku <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="Masukkan Judul buku"
            />
          </div>

          <!-- Nama Penulis -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
             Nama Penulis <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.author"
              type="text"
              required
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="Nama penulis"
            />
          </div>

          <!-- Tahun Terbit-->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Tahun Terbit <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.year"
              type="number"
              required
              min="1000"
              :max="currentYear"
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="2024"
            />
          </div>

          <!-- Penerbit -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Penerbit <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.publisher"
              type="text"
              required
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="Nama penerbit"
            />
          </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-2">
                  Kategori
                </label>
                <select
                  v-model="form.categoryId"
                  class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Pilih Kategori</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Reading Progress -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-warm-800 border-b border-warm-200 pb-2">
              Progress Baca
            </h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Page Count -->
              <div>
                <label class="block text-sm font-medium text-warm-700 mb-2">
                  Jumlah Halaman <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="form.pageCount"
                  type="number"
                  required
                  min="1"
                  class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
                  placeholder="300"
                />
              </div>

          <!-- Halaman yang Dibaca -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Halaman Dibaca <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.readPage"
              type="number"
              required
              min="0"
              :max="form.pageCount || 9999"
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="150"
            />
            <p v-if="form.readPage > form.pageCount" class="text-red-500 text-sm mt-1">
              Halaman yang dibaca tidak boleh lebih dari jumlah halaman
            </p>
              </div>
          </div>

          <!-- Status Baca -->
            <div>
            <label class="block text-sm font-medium text-warm-700 mb-3">Status Baca</label>
            <div class="flex gap-3">
              <button
                  type="button"
                  @click="form.reading = false"
                  :class="!form.reading ? 
                    'bg-warm-500 text-white border-warm-500' : 
                    'bg-warm-50 text-warm-700 border-warm-200 hover:bg-warm-100'"
                  class="flex-1 px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200"
                >
                  Belum Dibaca
                </button>
                <button
                  type="button"
                  @click="form.reading = true"
                  :class="form.reading ? 
                    'bg-warm-500 text-white border-warm-500' : 
                    'bg-warm-50 text-warm-700 border-warm-200 hover:bg-warm-100'"
                  class="flex-1 px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200"
                >
                  Sedang Dibaca
                </button>
              </div>
            </div>

            <!-- Visualisasi Progres -->
            <div v-if="form.pageCount > 0" class="bg-warm-50 rounded-xl p-6 border border-warm-200">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-medium text-warm-700">Progress Baca</span>
                <span class="text-sm text-warm-600">
                  {{ form.readPage || 0 }}/{{ form.pageCount }} halaman
                  ({{ Math.round(((form.readPage || 0) / form.pageCount) * 100) }}%)
                </span>
              </div>
              <div class="w-full bg-warm-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-warm-400 to-warm-500 h-3 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${Math.min(((form.readPage || 0) / form.pageCount) * 100, 100)}%` }"
                ></div>
              </div>
              <p class="text-sm text-warm-600 mt-3">
                <span v-if="form.readPage === form.pageCount" class="text-green-600 font-medium">
                  Buku sudah selesai dibaca!
                </span>
                <span v-else-if="form.readPage > 0">
                  Tersisa {{ form.pageCount - form.readPage }} halaman lagi
                </span>
                <span v-else>
                  Belum mulai membaca
                </span>
              </p>
            </div>
          </div>

          <!-- Ringkasan -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-warm-800 border-b border-warm-200 pb-2">
              Ringkasan
            </h3>
            <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Ringkasan Buku <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.summary"
              required
              rows="4"
              class="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tuliskan ringkasan singkat tentang buku ini..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-10 pt-8 border-t border-warm-200">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="!isFormValid || form.readPage > form.pageCount"
            :class="isFormValid && form.readPage <= form.pageCount 
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {{ isEditing ? 'Perbarui Buku' : 'Simpan Buku' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { bookService } from '../services/bookService.js'

const props = defineProps({
  book: Object,
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const currentYear = new Date().getFullYear()
const categories = ref([])

const form = ref({
  name: '',
  author: '',
  year: currentYear,
  publisher: '',
  pageCount: 0,
  readPage: 0,
  reading: false,
  summary: '',
  categoryId: ''
})

const isFormValid = computed(() => {
  return form.value.name.trim() && 
         form.value.author.trim() && 
         form.value.year && 
         form.value.publisher.trim() && 
         form.value.pageCount > 0 && 
         form.value.readPage >= 0 && 
         form.value.summary.trim()
})

const loadCategories = async () => {
  try {
    const response = await bookService.getAllCategories()
    categories.value = response.data.categories
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

watch(() => props.book, (newBook) => {
  if (newBook) {
    form.value = { 
      ...newBook,
      categoryId: newBook.categoryId || ''
    }
  } else {
    // Reset form for new book
    form.value = {
      name: '',
      author: '',
      year: currentYear,
      publisher: '',
      pageCount: 0,
      readPage: 0,
      reading: false,
      summary: '',
      categoryId: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (isFormValid.value && form.value.readPage <= form.value.pageCount) {
    const submitData = { ...form.value }
    if (!submitData.categoryId) {
      delete submitData.categoryId
    }
    emit('save', submitData)
  }
}

onMounted(() => {
  loadCategories()
})
</script>