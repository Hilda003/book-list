<!-- components/CategoryModal.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      <div class="bg-gradient-to-r from-warm-500 to-warm-600 px-6 py-4 text-white">
        <h2 class="text-xl font-bold">
          {{ isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru' }}
        </h2>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Nama Kategori -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Nama Kategori <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan nama kategori"
          />
        </div>

        <!-- Deskripsi -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-warm-700 mb-2">
            Deskripsi
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-3 border border-warm-200 rounded-lg focus:ring-2 focus:ring-warm-400 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Deskripsi kategori (opsional)"
          ></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-3 border border-warm-300 text-warm-700 rounded-lg font-semibold hover:bg-warm-50 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="!isFormValid"
            :class="isFormValid 
              ? 'bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700' 
              : 'bg-gray-300 cursor-not-allowed'"
            class="flex-1 px-4 py-3 text-white rounded-lg font-semibold transition-all duration-200"
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
  isEditing: Boolean
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  name: '',
  description: ''
})

const isFormValid = computed(() => {
  return form.value.name.trim().length > 0
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
    emit('save', {
      name: form.value.name.trim(),
      description: form.value.description.trim() || null
    })
  }
}
</script>