const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/person/register",
    name: "RegisterPerson",
    component: () => import("layouts/person/PersonLayout.vue"),
    children: [
      { path: "", component: () => import("pages/person/Register.vue") },
    ],
  },
  {
    path: "/person",
    name: "ManagePerson",
    component: () => import("layouts/person/ManageLayout.vue"),
    children: [
      { path: "", component: () => import("pages/person/Manage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
