<template>
  <div class="bg-[#FEFFFF] min-h-screen">
    <!-- ========== HERO SECTION ========== -->
    <section class="pt-8 sm:pt-[60px] pb-6 sm:pb-[48px] text-center">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <!-- Icon -->
        <div class="flex justify-center mb-3 sm:mb-4">
          <img
            src="/assets/icons/icon-chat-question.svg"
            alt="FAQ Icon"
            class="w-9 h-9 sm:w-11 sm:h-11"
          />
        </div>

        <!-- Heading -->
        <h1
          class="font-urbanist text-[24px] sm:text-[36px] lg:text-[48px] font-semibold leading-[1.25] tracking-[-0.5px] text-[#0A0A0A]"
        >
          Ada yang Bisa Kami Bantu?
        </h1>

        <!-- Subtitle -->
        <p
          class="mt-3 sm:mt-4 mx-auto max-w-[640px] sm:max-w-[1000px] text-[14px] sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[1.7] text-[#0A0A0ACC]"
        >
          Temukan jawaban cepat seputar cara melapor, menyampaikan aspirasi, dan bagaimana Vide
          bekerja untuk menghubungkan suaramu.
        </p>

        <!-- Search Bar -->
        <div class="mt-6 sm:mt-8 mx-auto max-w-[560px] px-2">
          <div class="relative flex items-center">
            <span class="absolute left-4 text-[#A0A0A0]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pertanyaan atau kata kunci..."
              class="w-full pl-11 pr-10 py-3 rounded-full border border-[#E5E5E5] bg-white text-sm text-[#0A0A0A] placeholder-[#A0A0A0] focus:outline-none focus:border-[#E75A0F] focus:ring-2 focus:ring-[#E75A0F]/20 transition-all shadow-sm"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="absolute right-4 text-[#A0A0A0] hover:text-[#0A0A0A] transition-colors"
              @click="searchQuery = ''"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- ========== CATEGORY TABS ========== -->
        <div v-if="categories.length > 0" class="mt-6 sm:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-1 sm:px-2">
          <button
            type="button"
            class="rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-[13.5px] font-medium transition-all duration-150 focus:outline-none"
            :class="
              activeCategory === 'all'
                ? 'bg-[#E75A0F] text-white shadow-sm'
                : 'bg-[#FFF7ED] text-[#E75A0F] hover:bg-[#FFE8D6]'
            "
            @click="selectCategory('all')"
          >
            Semua
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-[13.5px] font-medium transition-all duration-150 focus:outline-none"
            :class="
              activeCategory === cat.slug
                ? 'bg-[#E75A0F] text-white shadow-sm'
                : 'bg-[#FFF7ED] text-[#E75A0F] hover:bg-[#FFE8D6]'
            "
            @click="selectCategory(cat.slug)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- ========== FAQ ACCORDION SECTION ========== -->
    <section class="pb-[80px]">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <div class="mx-auto max-w-[920px]">
          <!-- Loading State Skeleton -->
          <div v-if="loading" class="space-y-4 py-6">
            <div
              v-for="n in 4"
              :key="n"
              class="animate-pulse p-4 rounded-xl border border-[#EDEDED] space-y-3"
            >
              <div class="h-5 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          </div>

          <!-- Error Alert State -->
          <div
            v-else-if="error"
            class="text-center py-12 px-4 rounded-2xl bg-red-50 border border-red-100 my-4"
          >
            <svg
              class="mx-auto h-10 w-10 text-red-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p class="text-red-700 font-medium mb-4">{{ error }}</p>
            <button
              type="button"
              class="px-5 py-2.5 rounded-full bg-[#E75A0F] text-white text-sm font-medium hover:bg-[#d44f0b] transition-colors shadow-sm"
              @click="loadData"
            >
              Coba Lagi
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredFaqs.length === 0" class="text-center py-16 px-4">
            <div class="flex justify-center mb-4">
              <div
                class="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#E75A0F]"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-[#0A0A0A] mb-1">Pertanyaan Tidak Ditemukan</h3>
            <p class="text-sm text-[#757575] max-w-md mx-auto">
              Tidak ada pertanyaan yang sesuai dengan kategori atau kata kunci pencarian Anda.
            </p>
            <button
              v-if="searchQuery || activeCategory !== 'all'"
              type="button"
              class="mt-4 px-4 py-2 rounded-full border border-[#E75A0F] text-[#E75A0F] text-xs font-medium hover:bg-[#FFF7ED] transition-colors"
              @click="resetFilters"
            >
              Reset Filter
            </button>
          </div>

          <!-- FAQ Accordion List -->
          <div v-else class="transition-all duration-200">
            <FaqAccordionItem
              v-for="(item, index) in filteredFaqs"
              :key="item.id"
              :first="index === 0"
              :question="item.question"
              :answer="item.answer"
              :default-open="index === 0"
            />
            <!-- Bottom divider -->
            <div class="border-t border-[#EDEDED]" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFaqStore } from '@/stores/faq';
import type { FaqItem } from '@/stores/faq';

useHead({
  title: 'FAQ – Ada yang Bisa Kami Bantu? | Vide',
  meta: [
    {
      name: 'description',
      content:
        'Temukan jawaban cepat seputar cara melapor, menyampaikan aspirasi, dan bagaimana Vide bekerja untuk menghubungkan suaramu.',
    },
  ],
});

const faqStore = useFaqStore();

const activeCategory = ref<string>('all');
const searchQuery = ref<string>('');

const categories = computed(() => faqStore.categories);
const loading = computed(() => faqStore.loading);
const error = computed(() => faqStore.error);

// Combined filter for category & search text
const filteredFaqs = computed<FaqItem[]>(() => {
  let list = faqStore.faqs;

  // Filter by category if not 'all'
  if (activeCategory.value !== 'all') {
    list = list.filter((item) => {
      const catSlug = item.category?.slug;
      if (catSlug) {
        return catSlug === activeCategory.value;
      }
      return true;
    });
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }

  return list;
});

async function selectCategory(slug: string) {
  activeCategory.value = slug;
  if (slug === 'all') {
    await faqStore.fetchFaqs();
  } else {
    // Call category-specific endpoint or filter
    const res = await faqStore.fetchFaqsByCategorySlug(slug);
    if (!res || !res.success) {
      // Fallback to query parameter endpoint if category slug endpoint didn't return
      await faqStore.fetchFaqs(slug);
    }
  }
}

function resetFilters() {
  activeCategory.value = 'all';
  searchQuery.value = '';
  faqStore.fetchFaqs();
}

async function loadData() {
  await Promise.all([faqStore.fetchCategories(), faqStore.fetchFaqs()]);
}

onMounted(() => {
  loadData();
});
</script>
