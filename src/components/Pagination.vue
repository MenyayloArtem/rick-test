<script setup lang="ts">
const props = defineProps<{ page: number }>()
const emit = defineEmits(["next", "prev"])
</script>

<template>
    <div class="pagination">
        <button class="pagination__btn" @click="emit('prev')">
            &lt;&lt;
        </button>

        <div class="currentPage">
            Page: {{ props.page + 1 }}
        </div>


        <button class="pagination__btn" @click="emit('next')">
            &gt;&gt;
        </button>
    </div>
</template>

<style scoped>
.pagination {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.pagination__btn,
.currentPage {
    font-size: 20px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    background: #3C3E44;
    outline: none;
    color: #fff;
    text-align: center;
    cursor: pointer;
}

.currentPage {
    cursor: default;
}
</style>