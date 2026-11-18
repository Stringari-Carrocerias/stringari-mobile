<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    route: String,
});

</script>

<template>
    <button class="btn-model" @click="router.push({ name: props.route })">
        <slot class="slot-btn"/>
    </button>
</template>

<style scoped>

.btn-model {
    position: fixed;
    z-index: 900;
    display: block;
    width: 92%;
    max-width: 100%;
    min-height: 48px;
    padding: 16px 24px;
    bottom: calc(max(var(--footer-height, 120px), 120px) + 16px + env(safe-area-inset-bottom, 0px));
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #C71E25;
    border-style: none;
    border-radius: 16px;
    box-shadow: 0 0 3px 0 #E7E7E7;
    transition: background-color 0.2s;
    font-size: clamp(16px, 4vw, 20px);
    overflow-wrap: anywhere;
    color: #FFFFFF;
    cursor: pointer;
}

.btn-model:active {
    background-color: #991b20;
}

@media (min-width: 769px) {
    .btn-model {
        position: static;
        width: fit-content;
        margin: 24px auto 0 0;
        transform: none;
        font-size: 16px;
        border-radius: 40px;
    }
}

</style>
