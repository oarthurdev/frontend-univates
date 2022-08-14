<template>
  <div class="q-pa-md">
    <q-btn
      dense
      flat
      color="grey"
      @click="
        newPerson = true;
        updateOrAdd = 'Add new';
        limpaCampos();
      "
      icon="add"
      >New Person</q-btn
    >
    <q-dialog v-model="newPerson">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ updateOrAdd }} Person</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md" style="max-width: 1000px !important">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="name"
                label="Name"
                hint="Name and surname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="birth_date"
                v-mask="['##/##/####']"
                label="Birth Date"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date mask="MM-DD-YYYY" v-model="birth_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                filled
                v-model="cpf"
                label="CPF"
                lazy-rules
                v-mask="['###.###.###-##']"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-select
                filled
                v-model="sex"
                :options="options"
                label="Sex"
              /><br />

              <q-input
                filled
                v-model="phone"
                label="Phone"
                lazy-rules
                v-mask="['(##) ####-####', '(##) #####-####']"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
                type="email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table
      v-model:pagination="pagination"
      title="Persons"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="
              update = true;
              editRow(props);
            "
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="confirm = true"
            icon="delete"
          ></q-btn>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" />
                <span class="q-ml-sm">You want to delete this person?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn
                  @click="deleteRow(props)"
                  flat
                  label="Yes"
                  color="negative"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-td>
      </template>
      <template #top-right>
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { mask } from "vue-the-mask";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "birth_date",
    align: "center",
    label: "Birth Date",
    field: "birth_date",
    sortable: true,
  },
  { name: "cpf", label: "CPF", field: "cpf", sortable: true },
  { name: "sex", label: "Sex", field: "sex", sortable: true },
  { name: "phone", label: "Phone", field: "phone", sortable: true },
  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

var originalRows = [];

export default {
  name: "ManagePerson",
  directives: { mask },
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const birth_date = ref(null);
    const cpf = ref(null);
    const sex = ref(null);
    const phone = ref(null);
    const email = ref(null);

    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);

    const update = ref(false);

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 10,
    });

    api.get("persons").then(function (response) {
      response.data.data.forEach((element) => {
        originalRows.push(element);
      });
    });

    function limpaCampos() {
      name.value = null;
      birth_date.value = null;
      cpf.value = null;
      sex.value = null;
      phone.value = null;
      email.value = null;
    }

    function onSubmit() {
      var objPerson = {
        name: name.value,
        birth_date: birth_date.value,
        cpf: cpf.value,
        sex: sex.value,
        phone: phone.value,
        email: email.value,
      };

      if (update.value == true) {
        api
          .put("persons", objPerson)
          .then(function (response) {
            if (response.data.status == "success") {
              $q.notify({
                type: "positive",
                message: "Person updated sucessfully.",
              });

              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((e) => {
            $q.notify({
              type: "negative",
              message: "Oops, something went wrong, try again.",
            });
          });
      } else {
        api
          .post("persons", objPerson)
          .then(function (response) {
            if (response.data.status == "success") {
              $q.notify({
                type: "positive",
                message: "Person registered sucessfully.",
              });

              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((e) => {
            $q.notify({
              type: "negative",
              message: "Oops, something went wrong, try again.",
            });
          });
      }
    }

    function editRow(props) {
      this.updateOrAdd = "Update a";
      name.value = props.row.name;
      birth_date.value = props.row.birth_date;
      cpf.value = props.row.cpf;
      sex.value = props.row.sex;
      phone.value = props.row.phone;
      email.value = props.row.email;

      this.newPerson = true;
    }

    function deleteRow(props) {
      api.delete("/persons/" + props.row.id).then(function (response) {
        if (response) {
          $q.notify({
            type: "negative",
            multiline: true,
            message: "Person deleted sucessfully",
            timeout: 2000,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? originalRows.filter((row) => row.name.includes(filter))
        : originalRows.slice();

      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === "desc"
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }

      return data.slice(startRow, startRow + count);
    }

    function onReset() {
      name.value = null;
      birth_date.value = null;
      cpf.value = null;
      sex.value = null;
      phone.value = null;
      email.value = null;
    }
    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      if (!filter) {
        return originalRows.length;
      }
      let count = 0;
      originalRows.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    }

    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 1500);
    }

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined,
      });
    });

    return {
      newPerson: ref(false),
      address: ref(""),
      updateOrAdd: "Add new",
      filter,
      loading,
      pagination,
      columns,
      rows,
      editRow,
      deleteRow,
      onRequest,
      name,
      cpf,
      sex,
      phone,
      email,
      onSubmit,
      onReset,
      options: ["Male", "Female", "Non-Binary"],
      update,
      limpaCampos,
      birth_date,
      confirm: ref(false),
    };
  },
};
</script>
