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
          <router-link style="color: white !important" to="/dashboard">
            Univates
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
          </router-link>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import GeralMenu from "src/components/menu/GeralMenu.vue";
import geralMenu from "src/components/menu/js/geral.js";
import menu from "src/components/menu/js/menu.js";

export default {
  name: "MainLayout",
  components: {
    GeralMenu,
  },
  data() {
    return {
      leftDrawerOpen: false,
      geralM: geralMenu,
      el: "",
      menuGeral: menu,
    };
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
