<template>
  <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer po-ab">
      <vs-button radius icon="icon-settings" icon-pack="feather" />

      <vs-dropdown-menu class="w-32">
        <vs-dropdown-item>
          <div @click="$router.push('/pages/profile').catch(() => {})" class="flex items-center">
            <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
            <span>Profile</span>
          </div>
        </vs-dropdown-item>
        <vs-dropdown-item>
          <div @click="$router.push('/apps/todo').catch(() => {})" class="flex items-center">
            <feather-icon icon="CheckSquareIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
            <span>Tasks</span>
          </div>
        </vs-dropdown-item>
        <vs-dropdown-item>
          <div @click="$router.push('/apps/email').catch(() => {})" class="flex items-center">
            <feather-icon icon="MailIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
            <span>Inbox</span>
          </div>
        </vs-dropdown-item>
      </vs-dropdown-menu>

    </vs-dropdown>
</template>