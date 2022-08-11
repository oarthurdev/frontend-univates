<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <router-link to="/dashboard"> Univates </router-link>
        </q-toolbar-title>

        <q-item clickable @click="logout">
          <q-item-section>
            <q-btn :icon="'logout'">
              <q-tooltip transition-show="rotate" transition-hide="rotate">
                Logout
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <!-- <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title align="right"><font size="4pt">Hookah Finder - Copyright &#9400; 2021</font></q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-toggle
        v-model="darkMode"
        :click="setDarkMode()"
        class="toggleDarkMode"
      >
        <q-tooltip transition-show="rotate" transition-hide="rotate">
          Turn lights {{ onOrOff }}
        </q-tooltip>
      </q-toggle>
      <q-list id="main-navigation">
        <q-item-label header class="text-grey-8">
          Main Navigation
        </q-item-label>
        <router-link
          v-for="link in geralM"
          :key="link.link"
          :to="link.link"
          class="text-grey-8"
        >
          <GeralMenu :key="link.title" v-bind="link" />
        </router-link>
        <q-expansion-item
          v-for="menu in menuGeral"
          :key="menu.title"
          expand-separator
          :icon="menu.icon"
          :label="menu.title"
          :caption="menu.caption"
        >
          <router-link
            v-for="submenu in menu.submenu"
            :key="submenu.title"
            :to="submenu.link"
            class="text-grey-8"
          >
            <LoungeMenu
              :link="submenu.link"
              :title="submenu.title"
              :caption="submenu.caption"
              :icon="submenu.icon"
            />
          </router-link>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <Breadcrumbs />
      <transition name="fade-in-right">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import GeralMenu from "src/components/menu/GeralMenu.vue";
import LoungeMenu from "src/components/menu/LoungeMenu.vue";
import geralMenu from "src/components/menu/js/geral.js";
import menu from "src/components/menu/js/menu.js";
import Breadcrumbs from "components/Breadcrumbs.vue";

export default {
  name: "MainLayout",
  components: {
    GeralMenu,
    LoungeMenu,
    Breadcrumbs,
  },
  data() {
    return {
      leftDrawerOpen: false,
      geralM: geralMenu,
      el: "",
      darkMode: true,
      onOrOff: "on",
      user: {
        email: "",
        photo: "",
        role: "",
      },
      token: null,
      menuGeral: menu,
    };
  },
  created() {
    let vm = this;
    vm.user.email = localStorage.getItem("email");
    vm.token = localStorage.getItem("token");
  },
  methods: {
    setDarkMode() {
      if (this.darkMode) {
        this.$q.dark.set(true);
        this.onOrOff = "on";
      } else {
        this.$q.dark.set(false);
        this.onOrOff = "off";
      }
    },
    logout(e) {
      const self = this;
      e.preventDefault();
      localStorage.clear();
      window.location.href = "/";
    },
    profile() {
      const self = this;
      self.$router.push("/profile");
    },
  },
};
</script>
<style>
a {
  text-decoration: none !important;
}
.toggleDarkMode {
  float: right;
}
.user-image {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
}

.user-image-dropdown {
  width: 105px;
  height: 105px;
  border-radius: 50%;
}

#dropdownUser {
  margin-right: -15px;
}
</style>
