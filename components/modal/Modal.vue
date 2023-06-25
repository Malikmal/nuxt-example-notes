
<script setup>
import { toRefs, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
    show: Boolean,
    closeable: Boolean,
    maxWidth: String,
})

const { show, closeable, maxWidth} = toRefs(props)

const emit = defineEmits([
    'close'
])

const maxWidthClass = computed(()=>{
    return {
        'sm': 'sm:max-w-sm',
        'md': 'sm:max-w-md',
        'lg': 'sm:max-w-lg',
        'xl': 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth ?? '2xl']
})

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape)
    document.body.style.overflow = null
})

function close() {
    if(closeable)
        emit('close')
}

function closeOnEscape(e){
    if(e.key === 'Escape' && show)
        close()
}

</script>


<template>
    <!-- <teleport to="body"> -->
        <transition leave-active-class="duration-200">
            <div v-show="show" class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" scroll-region>
                <transition enter-active-class="ease-out duration-300"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="ease-in duration-200"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                    <div v-show="show" class="fixed z-50 m-auto inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                </transition>

                <transition enter-active-class="ease-out duration-300"
                        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                        leave-active-class="ease-in duration-200"
                        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div v-show="show" class="fixed z-50 m-auto inset-0 flex-col max-w-[95vw] md:max-w-lg h-fit max-h-[65vh] sm:max-h-[75vh] align-bottom bg-white rounded-[24px] overflow-auto shadow-xl transform transition-all opacity-100 translate-y-0 sm:scale-100" :class="maxWidthClass">
                        <slot v-if="show"></slot>
                    </div>
                </transition>
            </div>
        </transition>
    <!-- </teleport> -->
</template>
