<template>
  <div class="overflow-x-hidden bg-[#FEFFFF] text-[#0A0A0A]">
    <section class="landing-pattern relative pt-[36px] pb-[60px]">
      <div class="relative z-10 mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <div class="mx-auto max-w-[1000px] text-center">
          <span
            class="mt-4 inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-[14px] font-semibold leading-[18px] text-[#E75A0F]"
          >
            Wilayah Semarang Selatan
          </span>

          <h1
            class="font-urbanist mx-auto mt-4 max-w-[930px] text-[34px] font-semibold leading-[1.15] tracking-[-1.4px] sm:text-[44px] lg:text-[52px]"
          >
            Laporkan Masalah Untuk Mewujudkan
            <span class="block mt-3">Kota Yang Aman</span>
          </h1>

          <p class="mt-4 text-[20px] leading-6 text-[#757575] sm:text-[20px]">
            Setiap laporan Anda membantu menciptakan lingkungan yang nyaman dan terlindungi bagi
            semua.
          </p>
        </div>

        <!-- Form Laporan Pengaduan -->
        <form
          class="mx-auto mt-[50px] max-w-[718px] rounded-[18px] border border-[#EDEDED] bg-white p-[12px] shadow-[0_9px_30px_rgba(17,27,41,0.12)]"
          @submit.prevent="handleFormSubmit"
        >
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Buat laporanmu disini"
            class="block h-[140px] w-full resize-none rounded-[14px] border border-[#E0E0E0] bg-white px-4 py-4 text-[14px] text-[#0A0A0A] outline-none placeholder:text-[#757575] focus:border-[#E75A0F]"
            required
          />

          <input
            v-model="form.location"
            type="text"
            placeholder="Masukkan lokasi kejadian"
            class="mt-3 block h-[40px] w-full rounded-[12px] border border-[#E0E0E0] bg-white px-4 text-[14px] text-[#0A0A0A] outline-none placeholder:text-[#757575] focus:border-[#E75A0F]"
            required
          />

          <div class="mt-3 flex min-h-[34px] items-center justify-between px-1">
            <div class="flex items-center gap-3">
              <label class="group relative flex cursor-pointer items-center">
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full border-[1.6px] border-[#141B34] text-[#141B34]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M12 5v14M5 12h14" stroke-linecap="round" />
                  </svg>
                </span>

                <input
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  class="hidden"
                  multiple
                  @change="handleFileUpload"
                />

                <span
                  class="pointer-events-none absolute left-1/2 top-[34px] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-[5px] bg-[#1F1F1F] px-3 py-2 text-[11px] font-medium text-white shadow-lg group-hover:block"
                >
                  Tambahkan dokumen (Foto / PDF)
                  <span
                    class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#1F1F1F]"
                  />
                </span>
              </label>

              <button
                type="button"
                class="group relative flex h-7 w-7 cursor-pointer items-center justify-center transition-colors"
                :class="isAnonymous ? 'text-[#E75A0F]' : 'text-[#141B34] hover:text-[#E75A0F]'"
                @click="isAnonymous = !isAnonymous"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M 5.2 12.8 C 5.2 12.8 5.6 7.2 8.6 5.8 C 10 5 11 6.3 12 6.3 C 13 6.3 14 5 15.4 5.8 C 18.4 7.2 18.8 12.8 18.8 12.8"
                  />
                  <path d="M 2.5 12.8 H 21.5" />
                  <circle cx="7.5" cy="17.8" r="2.5" />
                  <circle cx="16.5" cy="17.8" r="2.5" />
                  <path d="M 10 17.2 C 11 16.2 13 16.2 14 17.2" />
                </svg>

                <span
                  class="pointer-events-none absolute left-1/2 top-[34px] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-[5px] bg-[#1F1F1F] px-3 py-2 text-[11px] font-medium text-white shadow-lg group-hover:block"
                >
                  {{ isAnonymous ? 'Mode Anonim (Aktif)' : 'Mode Anonim (Incognito)' }}
                  <span
                    class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#1F1F1F]"
                  />
                </span>
              </button>
            </div>

            <button
              type="submit"
              aria-label="Kirim laporan"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F67011] text-white transition-transform hover:scale-105"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 18V6M7.5 10.5 12 6l4.5 4.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>

        <div
          v-if="attachedFiles.length"
          class="mx-auto mt-4 flex max-w-[718px] flex-wrap items-center justify-center gap-3"
        >
          <div
            v-if="attachedImages.length"
            class="flex items-center gap-2 rounded-[16px] border border-[#EDEDED] bg-white p-2 shadow-[0_4px_20px_rgba(17,27,41,0.06)]"
          >
            <div
              v-for="img in attachedImages"
              :key="img.id"
              class="group/image relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border border-[#EDEDED]"
            >
              <img :src="img.url" :alt="img.name" class="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Hapus gambar"
                class="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-[10px] text-white transition-opacity hover:bg-black"
                @click="removeFile(img.id)"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            v-for="pdf in attachedPdfs"
            :key="pdf.id"
            class="flex items-center gap-3 rounded-[16px] border border-[#EDEDED] bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(17,27,41,0.06)]"
          >
            <div class="flex h-9 w-9 shrink-0 items-center justify-center">
              <svg
                width="32"
                height="36"
                viewBox="0 0 32 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 0H4C1.79086 0 0 1.79086 0 4V32C0 34.2091 1.79086 36 4 36H28C30.2091 36 32 34.2091 32 32V12L20 0Z"
                  fill="#E53935"
                />
                <path d="M20 0V12H32L20 0Z" fill="#D32F2F" opacity="0.7" />
                <text
                  x="4"
                  y="26"
                  font-family="Arial, sans-serif"
                  font-size="9"
                  font-weight="900"
                  fill="white"
                >
                  PDF
                </text>
              </svg>
            </div>

            <div class="flex flex-col min-w-0">
              <span class="text-[13px] font-semibold text-[#0A0A0A] truncate max-w-[150px]">
                {{ pdf.name }}
              </span>
              <span class="text-[11px] text-[#757575]">
                {{ pdf.size }}
              </span>
            </div>

            <button
              type="button"
              aria-label="Hapus PDF"
              class="ml-2 text-[#757575] hover:text-[#0A0A0A] transition-colors p-1"
              @click="removeFile(pdf.id)"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full overflow-hidden py-6 sm:py-10">
      <img
        src="/img/misc/Collaboration.svg"
        alt="Partner Logos"
        class="h-auto w-full object-cover sm:object-contain"
      />
    </section>

    <!-- Alur Langkah Pengaduan -->
    <section>
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <div class="grid gap-5 md:grid-cols-2">
          <article
            v-for="step in steps"
            :key="step.number"
            class="relative flex h-[230px] w-full max-w-[598px] overflow-hidden rounded-[20px] bg-[#18171C] px-[28px] py-[31px] text-white"
          >
            <div
              class="flex w-[110px] shrink-0 select-none items-center justify-center pl-4 text-[200px] font-bold leading-none tracking-normal text-[#9E9E9E]/20"
            >
              {{ step.number }}
            </div>

            <div class="relative z-10 ml-6 flex flex-1 flex-col justify-center">
              <div class="mb-4 text-[#FEFFFF]">
                <component :is="step.icon" />
              </div>
              <h3 class="text-[15px] text-[#EOEOEO] font-semibold leading-5">{{ step.title }}</h3>
              <p class="mt-3 max-w-[360px] text-[12px] leading-[18px] text-[#EOEOEO]">
                {{ step.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Tentang Kami & Statistik -->
    <section class="mt-[84px]">
      <div
        class="mx-auto grid w-full max-w-[1216px] grid-cols-1 items-center gap-[56px] px-4 sm:px-6 lg:grid-cols-2 lg:px-0"
      >
        <div>
          <h2 class="text-[32px] font-semibold leading-tight tracking-[-0.8px]">
            Sigap Bantu Warga
          </h2>

          <p class="mt-5 max-w-[580px] text-[15px] leading-[24px] text-[#OAOAOA]">
            Website ini hadir untuk memudahkan setiap warga dalam menyampaikan laporan masalah di
            lingkungan sekitar. Dengan sistem yang sederhana dan cepat, siapa pun dapat
            berpartisipasi menjaga kenyamanan bersama. Dengan adanya website ini, masyarakat tidak
            lagi kesulitan menyampaikan keluhan atau masalah. Semua bisa dilakukan secara praktis,
            cepat, dan terorganisir, sehingga tercipta lingkungan yang lebih aman, nyaman, dan
            sejahtera.
          </p>

          <div class="mt-[54px] grid grid-cols-3 gap-6 text-center">
            <div v-for="stat in stats" :key="stat.value">
              <strong class="block text-[32px] font-semibold leading-none tracking-[-1px]">
                {{ stat.value }}
              </strong>
              <p class="mx-auto mt-5 max-w-[200px] text-[15px] leading-[22px] text-[#757575]">
                <span class="block">{{ stat.line1 }}</span>
                <span class="block">{{ stat.line2 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-[20px]">
          <img
            src="/assets/cover/sigap-bantu-warga.webp"
            alt="Sigap Bantu Warga"
            class="h-[382px] w-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Testimoni Warga -->
    <section class="mt-[88px] overflow-hidden pb-[40px]">
      <div class="ml-auto w-[calc(100%-max(16px,calc((100vw-1216px)/2)))]">
        <div class="flex w-max marquee-track">
          <div
            v-for="groupIndex in 4"
            :key="groupIndex"
            class="flex gap-[21px] pr-[21px] marquee-group"
            :aria-hidden="groupIndex > 1 ? 'true' : undefined"
          >
            <article
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.author + '-' + groupIndex + '-' + index"
              class="flex h-[334px] w-[336.6px] shrink-0 flex-col rounded-[20px] bg-[#F5F5F5] px-[20px] pb-[18px] pt-[24px]"
            >
              <img
                src="/assets/icons/tanda-kutip.svg"
                alt="Tanda Kutip"
                class="h-[72px] w-[68px] shrink-0 object-contain object-left"
              />

              <p class="mt-4 text-[19px] leading-[25px] text-[#171717]">
                {{ testimonial.text }}
              </p>

              <p class="mt-auto text-[14px] text-[#757575]">
                {{ testimonial.author }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <LoginRequiredModal :isOpen="showLoginModal" @close="showLoginModal = false" />
    <ReportConfirmationModal
      :isOpen="showConfirmModal"
      @close="showConfirmModal = false"
      @confirm="handleTermsConfirmed"
    />
    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue';
import LoginRequiredModal from '@/components/modals/LoginRequiredModal.vue';
import ReportConfirmationModal from '@/components/modals/ReportConfirmationModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useAuth } from '@/composables/useAuth';
import { useReports } from '@/composables/useReports';
import { HugeiconsIcon } from '@hugeicons/vue';
import {
  GlobalSearchIcon,
  AuthorizedIcon,
  CheckmarkBadge01Icon,
  WorkoutRunIcon,
} from '@hugeicons/core-free-icons';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf';
  url: string;
}

const { isLoggedIn } = useAuth();
const { addReport } = useReports();

const showLoginModal = ref(false);
const showConfirmModal = ref(false);
const toast = reactive({ show: false, message: '' });
const isAnonymous = ref(false);
const hasConfirmedTerms = ref(false);

const form = reactive({
  description: '',
  location: '',
});

const attachedFiles = ref<AttachedFile[]>([]);

const attachedImages = computed(() => attachedFiles.value.filter((f) => f.type === 'image'));
const attachedPdfs = computed(() => attachedFiles.value.filter((f) => f.type === 'pdf'));

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
};

const steps = [
  {
    number: '1',
    title: 'Sesuaikan Wilayah Pengaduan!',
    description: 'Untuk membuat laporan, kamu harus masuk ke website sesuai wilayahmu',
    icon: h(HugeiconsIcon, {
      icon: GlobalSearchIcon,
      size: 28,
      strokeWidth: 1.5,
      class: 'h-7 w-7',
    }),
  },
  {
    number: '2',
    title: 'Daftar Akun Sebagai Warga',
    description: 'Daftarkan akun dengan Google guna membuat laporan',
    icon: h(HugeiconsIcon, { icon: AuthorizedIcon, size: 28, strokeWidth: 1.5, class: 'h-7 w-7' }),
  },
  {
    number: '3',
    title: 'Laporan Harus Benar',
    description: 'Sebelum mengirim, pastikan laporan mu adalah benar terjadi',
    icon: h(HugeiconsIcon, {
      icon: CheckmarkBadge01Icon,
      size: 28,
      strokeWidth: 1.5,
      class: 'h-7 w-7',
    }),
  },
  {
    number: '4',
    title: 'Tunggu Laporan Ditindak Lanjuti',
    description: 'Laporan yang terkirim akan ditindak lanjuti oleh tim keamanan setempat',
    icon: h(HugeiconsIcon, { icon: WorkoutRunIcon, size: 28, strokeWidth: 1.5, class: 'h-7 w-7' }),
  },
];

const stats = [
  { value: '80+', line1: 'Laporan terkirim setiap', line2: 'harinya' },
  { value: '99%', line1: 'Laporan laporan direspon', line2: 'perhari' },
  { value: '500+', line1: 'Orang terbantu dengan', line2: 'layanan kami' },
];

const testimonials = [
  {
    text: 'bagus cocok buat aku, kalo punya jerawat yang baru muncul muncul terus dipakein ini bisa kempes beso',
    author: 'Rachmad Supard',
  },
  {
    text: 'Aku cobain produk ini masih jaman sekolah, karena gak tau apa produk yg bagus. Dan alhamdulillah ini',
    author: 'Rafi',
  },
  {
    text: 'Agak cekit2 di wajah. Menyerapnya agak lama di T zone. Selebihnya bagus sih. Ga ada efek buruk yang',
    author: 'Anya Tayler',
  },
  {
    text: 'emak gw yg make ni,w nyoba tp gabgt di komuk lsgg jerawatan. di emak gw mah fine2 aja ga ngpa2 gw si',
    author: 'Rachmad Rafi Supardi',
  },
];

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files || []);

  const remaining = Math.max(0, 5 - attachedFiles.value.length);
  files.slice(0, remaining).forEach((file) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && attachedFiles.value.length < 5) {
        attachedFiles.value.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          size: formatFileSize(file.size),
          type: isPdf ? 'pdf' : 'image',
          url: reader.result as string,
        });
      }
    };
    reader.readAsDataURL(file);
  });

  input.value = '';
};

const removeFile = (id: string) => {
  attachedFiles.value = attachedFiles.value.filter((f) => f.id !== id);
};

const handleTermsConfirmed = () => {
  hasConfirmedTerms.value = true;
  showConfirmModal.value = false;
};

const handleFormSubmit = () => {
  if (!isLoggedIn.value) {
    showLoginModal.value = true;
    return;
  }

  if (!hasConfirmedTerms.value) {
    showConfirmModal.value = true;
    return;
  }

  processReportSubmission();
};

const processReportSubmission = () => {
  addReport({
    title: form.description.slice(0, 45) + (form.description.length > 45 ? '...' : ''),
    description: form.description,
    location: form.location,
    province: '',
    city: '',
    category: '',
    images: attachedFiles.value.map((f) => f.url),
  });

  toast.message = 'Laporan Anda telah terkirim!';
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);

  form.description = '';
  form.location = '';
  attachedFiles.value = [];
  hasConfirmedTerms.value = false;
};
</script>

<style scoped>
.landing-pattern {
  background-color: #feffff;
  background-image: url('/img/background/bg-hero-section-landing.webp');
  background-size: cover;
  background-position: center -85px;
  background-repeat: no-repeat;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-group {
  flex-shrink: 0;
  display: flex;
  gap: 21px;
  padding-right: 21px;
  animation: scroll-left 30s linear infinite;
}

.marquee-track:hover .marquee-group {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
