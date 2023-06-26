<script setup>
import { useSearch } from '@/composables/state';

const search = useSearch()
</script>

<template>
    <body>
        <!-- header -->

        <header class="w-full max-w-6xl mx-auto px-4 py-2 sticky top-0 bg-white border-b border-gray-200 shadow-sm">
            <nav class="w-full inline-flex justify-between items-center">
                <h1 class="font-semibold text-xl">My Notes</h1>
                <form>   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-black rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Search " 
                            v-model="search"
                            />
                    </div>
                </form>
            </nav>
        </header>

        <!-- main -->
        <main>
            <slot/>
        </main>

        <!-- footer -->
        <!-- <div>footer</div> -->
    </body>
</template>