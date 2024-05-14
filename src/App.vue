<script setup lang="ts">

// @ts-ignore
import Item from "./components/Item.vue"
// @ts-ignore
import Pagination from "./components/Pagination.vue"
import { computed, onMounted, ref, watch } from "vue"
import Api from "./api/Api"
import Character, { Statuses, Unknown } from "./types/Character"

const characters = ref<Character[]>([])
const totalPages = ref(0)
const pagesLoaded = ref(0)
const page = ref(0)
const itemsPerPage = 20

const nameFilter = ref("")
const statusFilter = ref<Statuses | Unknown | "none">("none")
const filterApplied = ref(false)

const filters = computed(() => {
  return {
    name: nameFilter.value,
    status: statusFilter.value === "none" ? undefined : statusFilter.value
  }
})

const fetchCharacters = async (page = 0, filters: any = {}) => {
  let data = await Api.fetchCharacters(page, filters)

  if (!data.error) {
    characters.value = [...characters.value, ...data.results]
    pagesLoaded.value++
    return data
  } else {
    alert(data.error)
    nameFilter.value = ""
    statusFilter.value = "none"
    fetchCharacters()
  }
}

const changePage = (type: "increment" | "decrement") => {
  if (type === "increment") {
    if (page.value + 1 < totalPages.value) {
      page.value++
    }
  }

  if (type === "decrement") {
    if (page.value > 0) {
      page.value--
    }
  }
}

const applyFilters = async () => {
  page.value = 0
  pagesLoaded.value = 0
  characters.value = []
  filterApplied.value = true

  let res = await fetchCharacters(page.value, filters.value)

  if (!res?.error && res) {
    totalPages.value = res.info.pages
  }
}

watch(() => [page.value], () => {
  if (page.value >= pagesLoaded.value && page.value) {
    fetchCharacters(page.value, filterApplied.value ? filters.value : null)
  }
})

onMounted(async () => {
  let data = await fetchCharacters()

  if (!data?.error && data) {
    totalPages.value = data.info.pages
  }
})
</script>

<template>
  <div class="app">
    <div class="filters">
      <div class="filters__title">
        Фильтровать по
      </div>

      <div class="filters__group">
        <label for="name">Имя:</label>
        <input id="name" type="text" v-model="nameFilter">
      </div>

      <div class="filters__group">
        <label for="select">Статус</label>
        <select name="select" id="select" v-model="statusFilter">
          <option value="none">None</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <button @click="applyFilters">Apply</button>
      </div>

    </div>
    <Pagination @next="changePage('increment')" @prev="changePage('decrement')" :page="page" />
    <div class="grid">
      <Item v-for="character in characters.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)"
        :key="character.id" :character="character" />
    </div>
    <Pagination @next="changePage('increment')" @prev="changePage('decrement')" :page="page" />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}

.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
  gap: 6px;
  color: #fff;
  margin: 8px;
}

.filters__group {
  display: flex;
  gap: 6px;
}
</style>
