<script setup lang="ts">
import Character from "../types/Character"

const props = defineProps<{
    character: Character
}>()

const character: Character = props.character
</script>

<template>
    <div class="item">
        <div class="item__image">
            <img :src="character.image" :alt="character.name">
        </div>
        <div class="item__info">

            <div class="item__info-group">
                <h2 class="item__name">
                    {{ character.name }}
                </h2>
                <div class="item__status">
                    <span :class="`status-icon ${character.status}`"></span>
                    {{ character.status }} -
                    {{ character.species }}
                </div>
            </div>

            <div class="item__info-group">
                <div class="item__info-label">
                    Last known location:
                </div>
                <div class="item__info-value">
                    {{ character.location.name }}
                </div>
            </div>
            <div class="item__info-group">
                <div class="item__info-label">
                    First seen in:
                </div>
                <div class="item__info-value">
                    {{ character.origin.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.status-icon {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    overflow: hidden;
}

.status-icon.unknown {
    background: #bebebe;
}

.status-icon.Dead {
    background: #f85b00;
}

.status-icon.Alive {
    background: #55CC44;
}

.item {
    display: flex;
    background: #3C3E44;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
}

.item * {
    text-align: left;
}

.item__image {
    position: relative;
    height: 200px;
    width: 200px;
    background: #000;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
}

.item__image img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 100%;
}

.item__info {
    color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item__name {
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 4px;
}

.item__status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
}

.item__info-label {
    color: #9E9E9E;
    margin-bottom: 0.5rem;
}

@media screen and (max-width: 580px) {
    .item {
        flex-direction: column;
        height: auto;
    }

    .item__image {
        width: 100%;
        height: 200px;
    }

    .item__image img {
        width: 100%;
    }

    .item__info {
        gap: 16px;
    }
}
</style>
