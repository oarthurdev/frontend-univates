const routes = [
  {
    path: "/",
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
