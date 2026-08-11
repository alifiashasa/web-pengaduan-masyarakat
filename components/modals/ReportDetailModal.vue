<template>
  <AppModal :isOpen="isOpen" title="Detail Pengaduan Masyarakat" maxWidth="2xl" @close="$emit('close')">
    <div v-if="report" class="space-y-6">
      <!-- Top Meta Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <span class="text-xs font-semibold text-gray-500 block mb-1">Dibuat pada {{ report.date }}</span>
          <h3 class="text-lg font-bold text-gray-900">{{ report.title || 'Laporan Pengaduan' }}</h3>
        </div>
        <AppBadge :status="report.status" />
      </div>

      <!-- Location & Category Badges -->
      <div class="flex flex-wrap gap-2 text-xs">Saya me
        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {{ report.province }} - {{ report.city }}
        </span>
        <span class="bg-orange-50 text-brand-orange px-3 py-1 rounded-lg font-medium">
          {{ report.category }}
        </span>
      </div>

      <!-- Description Content -->
      <div class="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed border border-gray-100">
        <p>{{ report.description }}</p>
      </div>

      <!-- Image Gallery & PDF Attachments -->
      <div v-if="report.images && report.images.length > 0" class="space-y-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Lampiran / Bukti Dokumen</h4>
        <div class="flex flex-wrap gap-3">
          <template v-for="(img, idx) in report.images" :key="idx">
            <a
              v-if="img.startsWith('data:application/pdf') || img.toLowerCase().includes('.pdf')"
              :href="img"
              target="_blank"
              download="Dokumen-Pengaduan.pdf"
              class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100 transition-colors"
            >
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-xs">
                PDF
              </div>
              <div>
                <span class="block text-xs font-semibold text-gray-800">Lihat / Unduh Dokumen PDF</span>
                <span class="block text-[10px] text-gray-500">Klik untuk membuka</span>
              </div>
            </a>
            <img
              v-else
              :src="img"
              alt="Bukti Laporan"
              class="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-2xs hover:opacity-90 transition-opacity cursor-pointer"
            />
          </template>
        </div>
      </div>


      <!-- Timeline & Comments -->
      <div class="space-y-4 pt-4 border-t border-gray-100">
        <h4 class="text-sm font-bold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Tanggapan & Catatan Petugas ({{ report.comments ? report.comments.length : 0 }})
        </h4>

        <div v-if="report.comments && report.comments.length > 0" class="space-y-3">
          <div
            v-for="comment in report.comments"
            :key="comment.id"
            class="p-4 rounded-xl bg-orange-50/60 border border-orange-100 flex items-start gap-3"
          >
            <img
              :src="comment.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'"
              :alt="comment.author"
              class="w-9 h-9 rounded-full object-cover border border-orange-200"
            />
            <div class="flex-1 text-xs sm:text-sm">
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-gray-900">{{ comment.author }}</span>
                <span class="text-[10px] text-gray-400">{{ comment.date }}</span>
              </div>
              <p class="text-xs text-brand-orange font-semibold mb-1" v-if="comment.role">{{ comment.role }}</p>
              <p class="text-gray-700 leading-normal">{{ comment.text }}</p>
            </div>
          </div>
        </div>

        <div v-else class="p-4 rounded-xl bg-gray-50 text-center text-xs text-gray-500 border border-gray-100">
          Belum ada tanggapan dari petugas. Laporan Anda sedang dalam antrean.
        </div>

        <!-- Add Reply Form -->
        <div class="pt-2 space-y-2">
          <AppTextarea
            v-model="newComment"
            placeholder="Tulis balasan atau informasi tambahan untuk petugas..."
            :rows="2"
          />
          <div class="flex justify-end">
            <AppButton variant="primary" size="sm" :disabled="!newComment.trim()" @click="submitComment">
              Kirim Balasan
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '../AppModal.vue';
import AppButton from '../AppButton.vue';
import AppBadge from '../AppBadge.vue';
import AppTextarea from '../AppTextarea.vue';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  isOpen: boolean;
  report: ReportItem | null;
}>();

defineEmits(['close']);

const { user } = useAuth();
const newComment = ref('');

const submitComment = () => {
  if (!newComment.value.trim() || !props.report) return;
  
  if (!props.report.comments) {
    props.report.comments = [];
  }
  
  props.report.comments.push({
    id: Date.now(),
    author: `${user.value.name} (Pelapor)`,
    role: 'Masyarakat',
    avatar: user.value.avatarUrl,
    text: newComment.value,
    date: 'Baru saja',
  });
  
  newComment.value = '';
};
</script>
