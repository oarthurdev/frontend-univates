<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el label="Dashboard" icon="home" to="/dashboard" />
      <q-breadcrumbs-el
        v-if="$route.fullPath == '/profile'"
        label="Profile"
        icon="people"
        to="/profile"
      />
      <q-breadcrumbs-el
        v-if="$route.fullPath == '/person/register'"
        label="Person"
        icon="shop"
        to="/person"
      />
      <q-breadcrumbs-el
        v-if="$route.fullPath == '/person/register'"
        label="Register"
        icon="add"
        to="/person/register"
      />
      <q-breadcrumbs-el
        v-if="$route.fullPath == '/person/manage'"
        label="Person"
        icon="shop"
        to="/person"
      />
      <q-breadcrumbs-el
        v-if="$route.fullPath == '/person/manage'"
        label="Manage"
        icon="settings"
        to="/person/register"
      />
    </q-breadcrumbs>
  </div>
</template>
<script>
export default {
  name: "BreadcumbsTest",
};
</script>
