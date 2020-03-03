<template>
  <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer po-ab">
      <vs-button radius icon="icon-settings" icon-pack="feather" />

      <vs-dropdown-menu class="w-32">
        <vs-dropdown-item>
          <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
            <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
            <span>Cài đặt điểm tích lũy</span>
          </div>
        </vs-dropdown-item>

      </vs-dropdown-menu>

    </vs-dropdown>
</template>