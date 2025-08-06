<!-- components/BookModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <div class="bg-gradient-to-r from-warm-500 to-warm-600 px-6 py-4 text-white">
        <h2 class="text-xl font-bold">
          {{ isEditing ? 'Edit Buku' : 'Tambah Buku Baru' }}
        </h2>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Judul Buku -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Judul Buku <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="Masukkan judul buku"
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
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
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
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
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
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="Nama penerbit"
            />
          </div>

          <!-- Kategori -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Kategori
            </label>
            <select
              v-model="form.categoryId"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">Pilih Kategori</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Jumlah Halaman -->
          <div>
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Jumlah Halaman <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="form.pageCount"
              type="number"
              required
              min="1"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
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
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
              placeholder="150"
            />
            <p v-if="form.readPage > form.pageCount" class="text-red-500 text-sm mt-1">
              Halaman yang dibaca tidak boleh lebih dari jumlah halaman
            </p>
          </div>

          <!-- Status Baca -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-3">Status Baca</label>
            <div class="flex gap-4">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.reading"
                  type="radio"
                  :value="false"
                  class="sr-only"
                />
                <div
                  :class="!form.reading ? 'bg-warm-500 text-white' : 'bg-warm-100 text-warm-700'"
                  class="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-warm-200"
                >
                  Belum Dibaca
                </div>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.reading"
                  type="radio"
                  :value="true"
                  class="sr-only"
                />
                <div
                  :class="form.reading ? 'bg-warm-500 text-white' : 'bg-warm-100 text-warm-700'"
                  class="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-warm-200"
                >
                  Sedang Dibaca
                </div>
              </label>
            </div>
          </div>

          <!-- Ringkasan -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-warm-700 mb-2">
              Ringkasan Buku <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.summary"
              required
              rows="4"
              class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tuliskan ringkasan singkat tentang buku ini..."
            ></textarea>
          </div>
        </div>

        <!-- Progress Info -->
        <div v-if="form.pageCount > 0" class="mt-6 p-4 bg-warm-50 rounded-lg border border-warm-200">
          <div class="flex justify-between text-sm text-warm-700 mb-2">
            <span>Progress Baca</span>
            <span>{{ form.readPage || 0 }}/{{ form.pageCount }} halaman</span>
          </div>
          <div class="w-full bg-warm-200 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-warm-400 to-warm-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${Math.min(((form.readPage || 0) / form.pageCount) * 100, 100)}%` }"
            ></div>
          </div>
          <p class="text-xs text-warm-600 mt-2">
            {{ form.readPage === form.pageCount ? 'Buku sudah selesai dibaca! 🎉' : 
               form.readPage > 0 ? `Tersisa ${form.pageCount - form.readPage} halaman lagi` : 
               'Belum mulai membaca' }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 mt-8 pt-6 border-t border-warm-200">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-6 py-3 border border-warm-300 text-warm-700 rounded-lg font-semibold hover:bg-warm-50 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="!isFormValid || form.readPage > form.pageCount"
            :class="isFormValid && form.readPage <= form.pageCount 
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700' 
              : 'bg-gray-300 cursor-not-allowed'"
            class="flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-all duration-200"
          >
            {{ isEditing ? 'Perbarui Buku' : 'Simpan Buku' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  book: Object,
  isEditing: Boolean,
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

const currentYear = new Date().getFullYear()

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
  return form.value.name && 
         form.value.author && 
         form.value.year && 
         form.value.publisher && 
         form.value.pageCount > 0 && 
         form.value.readPage >= 0 && 
         form.value.summary
})

watch(() => props.book, (newBook) => {
  if (newBook) {
    form.value = { 
      ...newBook,
      categoryId: newBook.categoryId || ''
    }
  } else {
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
    const bookData = { ...form.value }
    if (!bookData.categoryId) {
      bookData.categoryId = null
    }
    emit('save', bookData)
  }
}
</script>