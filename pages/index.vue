
<script setup>
import { ref } from 'vue'
import Modal from '@/components/modal/Modal.vue'
import { useSearch } from '@/composables/state';
import NoteCard from '@/components/card/NoteCard.vue';

const config = useRuntimeConfig()

const search = useSearch()
const isModalFormOpen = ref(false)
const form = reactive({
  id: '',
  title: '',
  description: '',
})

function openModalForCreate(){
  form.id = ''
  form.title = ''
  form.description = ''

  isModalFormOpen.value = true
}
function openModalForUpdate(note){
  form.id = note.id
  form.title = note.title
  form.description = note.description

  isModalFormOpen.value = true
}

const {data, pending, refresh, execute, error} = useFetch(`${config.public.api_url}/api/note`, {
  params: {
    search : search || '',
  },
  lazy: true,
  server: false,
})

function create({
  title, 
  description
}){
  $fetch(`${config.public.api_url}/api/note`, {
    method: 'POST',
    body: {
      title,
      description,
    }
  })
  .then(response => {
    refresh()
  })
}

function update(id, {
  title,
  description,
}){
  $fetch(`${config.public.api_url}/api/note/${id}`, {
    method: 'PUT',
    body: {
      title,
      description,
    }
  })
  .then(response => {
    refresh()
  })
}

function destroy(id){
  $fetch(`${config.public.api_url}/api/note/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    refresh()
    isModalFormOpen.value = false
  })
}

function handleSubmit(){
  if(!form.id)
    create({
      title: form.title,
      description: form.description,
    })
  else
    update(form.id, {
      title: form.title,
      description: form.description,
    })

  isModalFormOpen.value = false
}
</script>

<template>
  <section id="notes" class="w-full max-w-6xl mx-auto px-4 py-2 flex flex-col space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-stretch p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div class="col-span-full inline-flex justify-end">
        <button type="button" @click="openModalForCreate" class="cols-span-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create</button>
      </div>
      <NoteCard
        v-for="note in data?.data?.data"
        :key="note.id"
        :note="note"
        @click="() => openModalForUpdate(note)"
        @onDelete="id => destroy(id)"
      />
    </div>
  </section>
  <Modal :show="isModalFormOpen" @close="isModalFormOpen = false">
    <form @submit.prevent="handleSubmit" class="p-4 flex flex-col space-y-4">
      <div class="text-start">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          placeholder="Title of Note" 
          required
          />
      </div>
      <div class="text-start">     
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Note</label>
        <textarea
          v-model="form.description"
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description of Note"
          required
        ></textarea>
      </div>
      <div class="w-full inline-flex justify-end items-center gap-2">
        <button @click="() => destroy(form.id)" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Delete</button>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Save</button>
      </div>
    </form>
  </Modal>
</template>