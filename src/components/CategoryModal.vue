<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white rounded-t-3xl">
        <h2 class="text-xl font-bold">
          {{ isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru' }}
        </h2>
        <p class="text-blue-100 mt-1 text-sm">
          {{ isEditing ? 'Perbarui informasi kategori' : 'Buat kategori buku baru' }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-8">
        <div class="space-y-6">
          <!-- Category Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Kategori <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              placeholder="Masukkan nama kategori"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Deskripsi kategori (opsional)"
            ></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-8">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="!isFormValid"
            :class="isFormValid 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            class="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            {{ isEditing ? 'Perbarui' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  category: Object,
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  name: '',
  description: ''
})

const isFormValid = computed(() => {
  return form.value.name.trim()
})

watch(() => props.category, (newCategory) => {
  if (newCategory) {
    form.value = { ...newCategory }
  } else {
    form.value = {
      name: '',
      description: ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('save', form.value)
  }
}
</script>