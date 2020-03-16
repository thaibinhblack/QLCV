

<template>
  <div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'app-page': isAppPage}]">
    <v-nav-menu
      :navMenuItems = "navMenuItems"
      :logo         = "navMenuLogo"
      title         = "CRM Ecosy"
      parent        = ".layout--main" />

    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />

    <template >
      <the-navbar-vertical
        :navbarColor="navbarColor"
        :class="'text-base'" />
    </template>
    <!-- /Navbar -->

      <div class="content-wrapper">

        <div class="router-view">
          <div class="router-content">

            <transition :name="routerTransition">

              <div v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="router-header flex flex-wrap items-center mb-6">
                <div
                  class="content-area__heading"
                  :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}">
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->

                <!-- DROPDOWN -->
             

              </div>
            </transition>

            <div class="content-area__content">

              <back-to-top bottom="5%" visibleoffset="500" v-if="!hideScrollToTop">
                <vs-button icon-pack="feather" icon="icon-arrow-up" class="shadow-lg btn-back-to-top" />
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle"></router-view>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>


<script>
import navMenuItems from '@/layouts/components/vertical-nav-menu/navMenuItems.js'
import themeConfig  from '@/../themeConfig.js'
import BackToTop from 'vue-backtotop'
import axios from '@/axios'
export default {
  components: {
    BackToTop,
    'the-footer': () => import('@/layouts/components/TheFooter.vue'),
    'the-navbar-vertical': () => import('@/layouts/components/navbar/TheNavbarVertical.vue'),
    'v-nav-menu': () => import('@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'),
  },
  data() {
    return {
      disableCustomizer : themeConfig.disableCustomizer,
      disableThemeTour  : themeConfig.disableThemeTour,
      footerType        : 'static',
      hideScrollToTop   : themeConfig.hideScrollToTop,
      isNavbarDark      : false,
      navbarColor       : '#fff',
      navbarType        :  'floating',
      navMenuItems      : navMenuItems ,
      navMenuLogo       : require('@/assets/images/logo/logo.png'),
      routerTransition  : themeConfig.routerTransition || 'none',
      routeTitle        : this.$route.meta.pageTitle,
    }
  },
  watch: {
    "$route"() {
      this.routeTitle = this.$route.meta.pageTitle
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    },
    windowWidth(val) {
      if(val < 1200) this.disableThemeTour = true
    },
    verticalNavMenuWidth() {
      this.disableThemeTour = true
    }
  },
  computed: {
    bodyOverlay() { return this.$store.state.bodyOverlay },
    contentAreaClass() {
      if(this.mainLayoutType === "vertical") {
        if      (this.verticalNavMenuWidth == "default") return "content-area-reduced"
        else if (this.verticalNavMenuWidth == "reduced") return "content-area-lg"
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else return "content-area-full"
    },
    footerClasses() {
      return {
        'footer-hidden': this.footerType == 'hidden',
        'footer-sticky': this.footerType == 'sticky',
        'footer-static': this.footerType == 'static',
      }
    },
    isAppPage() {
      return this.$route.path.includes('/apps/') ? true : false
    },
    layoutTypeClass() { return `main-${this.mainLayoutType}` },
    mainLayoutType()  { return this.$store.state.mainLayoutType  },
    navbarClasses()   {
      return {
        'navbar-hidden'   : this.navbarType == 'hidden',
        'navbar-sticky'   : this.navbarType == 'sticky',
        'navbar-static'   : this.navbarType == 'static',
        'navbar-floating' : this.navbarType == 'floating',
      }
    },
    verticalNavMenuWidth() { return this.$store.state.verticalNavMenuWidth },
    windowWidth()          { return this.$store.state.windowWidth }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title
    },
    updateFooter(val) {
      this.footerType = val
    },
    updateRouterTransition(val) {
      this.routerTransition = val
    },
    setNavMenuVisibility(layoutType) {
      if((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === "vertical" && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      }
      else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val
    },
    checkTokenUser()
    {
      if(!this.$cookies.isKey('token'))
      {
        this.$router.push('/login')
      }
      else{
        axios.get('/api/info?api_token='+this.$cookies.get('token'))
        .then((response) => {
          if(response.data.success == false)
          {
            this.$cookies.remove('token')
            this.$router.push('/login')
          }
          else
          {
            axios.defaults.params.token = this.$cookies.get('token')
            this.$store.state.user.info = response.data.result
          }
        })
        .catch(() => {
           this.$cookies.remove('token')
            this.$router.push('/login')
        })
      }
    }
  },
  mounted()
  {
     this.checkTokenUser()
  },
  created() {
    
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)
    this.checkTokenUser()
  }
}

</script>

