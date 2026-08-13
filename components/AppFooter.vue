<template>
  <footer class="bg-[#18171C] text-white pt-12 pb-8">
    <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
      <!-- Top Section -->
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-start md:gap-[120px]">
        <!-- Brand & Slogan -->
        <div>
          <img
            src="/assets/icons/herms_logo.svg.svg"
            alt="Hermes Logo"
            class="h-8 w-auto object-contain"
          />
          <h3 class="mt-3 text-[22px] font-bold text-white tracking-tight">LMUM</h3>
          <p class="mt-1 text-[14px] text-[#A3A3A3]">Sigap untuk membantu warga</p>
        </div>

        <!-- Links + Top Copyright -->
        <div class="flex flex-wrap items-center gap-x-[72px] gap-y-4 pt-2">
          <NuxtLink
            to="/"
            class="text-[14px] font-semibold tracking-wider text-white hover:text-[#EOEOEO] transition-colors uppercase"
          >
            HOMEPAGE
          </NuxtLink>
          <a
            href="#tentang"
            class="text-[14px] font-semibold tracking-wider text-white hover:text-[#EOEOEO] transition-colors uppercase"
          >
            TENTANG KAMI
          </a>
          <NuxtLink
            to="/faq"
            class="text-[14px] font-semibold tracking-wider text-white hover:text-[#EOEOEO] transition-colors uppercase"
          >
            FAQ
          </NuxtLink>
          <NuxtLink
            to="/kontak"
            class="text-[14px] font-semibold tracking-wider text-white hover:text-[#EOEOEO] transition-colors uppercase"
          >
            KONTAK
          </NuxtLink>
          <span class="text-[14px] text-[#EOEOEO] font-medium ml-4">
            © 2025 MUM. All rights reserved.
          </span>
        </div>
      </div>

      <!-- Divider line -->
      <div
        class="mt-10 border-t border-[#2A292E] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-[13px] text-[#EOEOEO] font-medium">© 2025 MUM. All rights reserved.</p>

        <!-- Social Icons -->
        <div class="flex items-center gap-4">
          <!-- WhatsApp Icon -->
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-transform hover:scale-110"
            title="WhatsApp"
          >
            <img src="/assets/icons/icon-wa.svg" alt="WhatsApp" class="h-7 w-7 object-contain" />
          </a>

          <!-- X Icon (White) -->
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-7 w-7 items-center justify-center text-white transition-transform hover:scale-110"
            title="X (Twitter)"
          >
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>

          <!-- Facebook Icon -->
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-transform hover:scale-110"
            title="Facebook"
          >
            <img src="/assets/icons/icon-fb.svg" alt="Facebook" class="h-7 w-7 object-contain" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
