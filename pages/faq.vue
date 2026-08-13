<template>
  <div class="bg-[#FEFFFF] min-h-screen">

    <!-- ========== HERO SECTION ========== -->
    <section class="pt-[60px] pb-[48px] text-center">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">

        <!-- Small icon above heading -->
        <div class="flex justify-center mb-4">
          <img
            src="/images/icon-chat-question.svg"
            alt="FAQ Icon"
            width="44"
            height="44"
          />
        </div>

        <!-- Heading -->
        <h1 class="font-urbanist text-[36px] sm:text-[48px] font-semibold leading-[1.2] tracking-[-0.5px] text-[#0A0A0A]">
          Ada yang Bisa Kami Bantu?
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 mx-auto max-w-[1000px] text-[20px] leading-[1.7] text-[#0A0A0ACC]">
          Temukan jawaban cepat seputar cara melapor, menyampaikan aspirasi, dan bagaimana Vide bekerja untuk menghubungkan suaramu.
        </p>

        <!-- ========== CATEGORY TABS ========== -->
        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            class="rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-150 focus:outline-none"
            :class="
              activeCategory === cat.key
                ? 'bg-[#E75A0F] text-white'
                : 'bg-[#FFF7ED] text-[#E75A0F] hover:bg-[#FFE8D6]'
            "
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

      </div>
    </section>

    <!-- ========== FAQ ACCORDION SECTION ========== -->
    <section class="pb-[80px]">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">

        <!-- FAQ list container -->
        <div class="mx-auto max-w-[920px]">
          <FaqAccordionItem
            :first="index === 0"
            v-for="(item, index) in currentFaqs"
            :key="item.id"
            :question="item.question"
            :answer="item.answer"
            :default-open="index === 0"
          />
          <!-- Bottom divider -->
          <div class="border-t border-[#EDEDED]" />
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

useHead({
  title: "FAQ \u2013 Ada yang Bisa Kami Bantu? | Vide",
  meta: [
    {
      name: "description",
      content:
        "Temukan jawaban cepat seputar cara melapor, menyampaikan aspirasi, dan bagaimana Vide bekerja untuk menghubungkan suaramu.",
    },
  ],
});

// \u2500\u2500\u2500 Category tabs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const categories = [
  { key: "general", label: "General" },
  { key: "reporting", label: "Reporting Guide" },
  { key: "aspirations", label: "Aspirations" },
  { key: "tracking", label: "Tracking & Follow-up" },
  { key: "privacy", label: "Privacy & Security" },
  { key: "account", label: "Account Management" },
];

const activeCategory = ref("general");

// \u2500\u2500\u2500 FAQ data per category \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: Record<string, FaqItem[]> = {
  general: [
    {
      id: "g1",
      question: "What is the difference between a copyright and a trademark?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "g2",
      question: "How does the internet work?",
      answer:
        "The internet is a global network of computers connected together using standardized communication protocols. Data is broken into packets, transmitted across various routes, and reassembled at the destination. It relies on technologies like TCP/IP, DNS, and HTTP to enable communication between billions of devices worldwide.",
    },
    {
      id: "g3",
      question: "What are the key factors to consider when buying a car?",
      answer:
        "When buying a car, consider your budget, fuel efficiency, reliability ratings, maintenance costs, safety features, insurance costs, and your intended use. Also factor in resale value and whether you prefer to buy new or used.",
    },
    {
      id: "g4",
      question: "How do I start a healthy diet?",
      answer:
        "Start a healthy diet by focusing on whole foods, reducing processed sugar and saturated fats, increasing vegetable and fruit intake, staying hydrated, and practicing portion control. Consult a nutritionist for a personalized plan suited to your needs.",
    },
    {
      id: "g5",
      question: "What is the capital of the United States?",
      answer:
        "The capital of the United States is Washington, D.C. It has served as the nation s capital since 1800 and is home to all three branches of the federal government, including the White House, Capitol Building, and Supreme Court.",
    },
    {
      id: "g6",
      question: "What is the speed of light?",
      answer:
        "The speed of light in a vacuum is approximately 299,792,458 meters per second, often abbreviated as c. This constant is fundamental to Einstein s theory of relativity and serves as the ultimate speed limit in the universe.",
    },
  ],
  reporting: [
    {
      id: "r1",
      question: "Bagaimana cara membuat laporan baru?",
      answer:
        "Untuk membuat laporan baru, kunjungi halaman utama dan isi formulir laporan yang tersedia. Tuliskan deskripsi masalah secara jelas, sertakan lokasi kejadian, dan lampirkan bukti foto jika ada. Setelah mengisi semua kolom, klik tombol kirim.",
    },
    {
      id: "r2",
      question: "Apa saja jenis laporan yang dapat saya buat?",
      answer:
        "Anda dapat melaporkan berbagai masalah infrastruktur kota seperti jalan rusak, lampu jalan mati, sampah liar, banjir, dan masalah fasilitas publik lainnya. Pastikan laporan sesuai dengan kategori yang tersedia.",
    },
    {
      id: "r3",
      question: "Berapa lama waktu respons setelah laporan dikirim?",
      answer:
        "Tim kami akan meninjau laporan dalam 1x24 jam. Laporan yang valid akan diteruskan ke instansi terkait dan Anda akan mendapat notifikasi status laporan melalui platform ini.",
    },
  ],
  aspirations: [
    {
      id: "a1",
      question: "Apa perbedaan laporan dan aspirasi?",
      answer:
        "Laporan digunakan untuk melaporkan masalah yang membutuhkan tindakan segera dari pemerintah. Aspirasi adalah saran, masukan, atau ide yang Anda sampaikan untuk meningkatkan layanan publik di wilayah Anda.",
    },
    {
      id: "a2",
      question: "Apakah aspirasi saya akan dibaca oleh pejabat terkait?",
      answer:
        "Ya, setiap aspirasi yang masuk akan dikompilasi dan diteruskan kepada instansi atau pejabat terkait secara berkala. Aspirasi yang mendapat banyak dukungan akan mendapat prioritas perhatian lebih.",
    },
  ],
  tracking: [
    {
      id: "t1",
      question: "Bagaimana cara melacak status laporan saya?",
      answer:
        "Anda dapat melacak status laporan melalui menu Riwayat Pengaduan di profil Anda. Setiap laporan akan menampilkan status terkini seperti Pending, Diproses, Selesai, atau Ditolak.",
    },
    {
      id: "t2",
      question: "Apa yang harus saya lakukan jika laporan tidak ada update?",
      answer:
        "Jika laporan Anda tidak mendapat update dalam 7 hari kerja, Anda dapat menghubungi tim kami melalui halaman Kontak atau menggunakan fitur follow-up yang tersedia di detail laporan.",
    },
  ],
  privacy: [
    {
      id: "p1",
      question: "Apakah identitas saya akan dilindungi saat melapor?",
      answer:
        "Ya, kami berkomitmen melindungi privasi Anda. Identitas pelapor tidak akan dipublikasikan secara terbuka. Data Anda hanya digunakan untuk keperluan verifikasi laporan dan komunikasi tindak lanjut.",
    },
    {
      id: "p2",
      question: "Bagaimana Vide mengamankan data pengguna?",
      answer:
        "Vide menggunakan enkripsi SSL/TLS untuk semua transmisi data, penyimpanan data yang aman di server terproteksi, dan prosedur keamanan berlapis untuk mencegah akses tidak sah.",
    },
  ],
  account: [
    {
      id: "ac1",
      question: "Bagaimana cara mendaftar akun baru?",
      answer:
        "Klik tombol Masuk Sebagai Warga di navbar, lalu pilih opsi daftar. Isi formulir pendaftaran dengan data yang valid dan verifikasi email Anda untuk mengaktifkan akun.",
    },
    {
      id: "ac2",
      question: "Bagaimana jika saya lupa kata sandi?",
      answer:
        "Pada halaman login, klik Lupa Kata Sandi dan masukkan email yang terdaftar. Kami akan mengirimkan tautan reset kata sandi ke email Anda dalam beberapa menit.",
    },
  ],
};

const currentFaqs = computed(() => faqData[activeCategory.value] ?? []);
</script>

