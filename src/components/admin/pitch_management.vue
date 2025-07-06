<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý sân bóng</h1>
        <p class="text-gray-600">Quản lý thông tin sân bóng 5 và sân bóng 7</p>
      </div>

      <!-- Add New Field Button -->
      <div class="mb-6">
        <button
          @click="openAddModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus class="w-4 h-4" />
          Thêm sân mới
        </button>
      </div>

      <!-- Fields Table -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold text-gray-900">Danh sách sân bóng</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sân</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại sân</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="field in fields" :key="field.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ field.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ field.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="field.type === 'field5' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'" 
                        class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ field.type === 'field5' ? 'Sân 5' : 'Sân 7' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="field.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                        class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ field.is_active ? 'Hoạt động' : 'Không hoạt động' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="openEditModal(field)"
                    class="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteField(field.id)"
                    class="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="fields.length === 0" class="text-center py-12">
            <div class="text-gray-400 mb-2">
              <MapPin class="w-12 h-12 mx-auto" />
            </div>
            <p class="text-gray-500">Chưa có sân bóng nào</p>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ isEditing ? 'Sửa sân bóng' : 'Thêm sân bóng mới' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="saveField" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tên sân</label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tên sân"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Loại sân</label>
              <select
                v-model="formData.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn loại sân</option>
                <option value="field5">Sân 5</option>
                <option value="field7">Sân 7</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.is_active"
                type="checkbox"
                id="is_active"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="is_active" class="ml-2 block text-sm text-gray-700">
                Sân đang hoạt động
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Success Toast -->
      <div v-if="showToast" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus, Edit, Trash2, X, MapPin } from 'lucide-vue-next'

// Reactive data
const fields = ref([
  { id: 1, name: 'Sân A1', type: 'field5', is_active: true },
  { id: 2, name: 'Sân A2', type: 'field5', is_active: true },
  { id: 3, name: 'Sân B1', type: 'field7', is_active: false },
  { id: 4, name: 'Sân B2', type: 'field7', is_active: true },
])

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

const formData = reactive({
  name: '',
  type: '',
  is_active: true
})

// Methods
const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (field) => {
  isEditing.value = true
  editingId.value = field.id
  formData.name = field.name
  formData.type = field.type
  formData.is_active = field.is_active
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.name = ''
  formData.type = ''
  formData.is_active = true
}

const saveField = () => {
  if (isEditing.value) {
    // Update existing field
    const index = fields.value.findIndex(f => f.id === editingId.value)
    if (index !== -1) {
      fields.value[index] = {
        ...fields.value[index],
        name: formData.name,
        type: formData.type,
        is_active: formData.is_active
      }
      showToastMessage('Cập nhật sân bóng thành công!')
    }
  } else {
    // Add new field
    const newId = Math.max(...fields.value.map(f => f.id), 0) + 1
    fields.value.push({
      id: newId,
      name: formData.name,
      type: formData.type,
      is_active: formData.is_active
    })
    showToastMessage('Thêm sân bóng thành công!')
  }
  
  closeModal()
}

const deleteField = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa sân bóng này?')) {
    fields.value = fields.value.filter(f => f.id !== id)
    showToastMessage('Xóa sân bóng thành công!')
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>