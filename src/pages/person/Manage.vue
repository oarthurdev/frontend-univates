<template>
  <div class="q-pa-md">
    <q-btn dense flat color="grey" @click="alert = true" icon="add"
      >New Person</q-btn
    >
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add new Person</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md" style="max-width: 1000px !important">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="name"
                label="Your name"
                hint="Name and surname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="birth_date"
                label="Your birth date"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="cpf"
                label="Your CPF"
                lazy-rules
                v-mask="['###.###.###-##']"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-select filled v-model="sex" :options="options" label="Sex" />

              <q-input
                filled
                v-model="phone"
                label="Your phone"
                lazy-rules
                v-mask="['(##) ####-####', '(##) #####-####']"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="email"
                label="Your email"
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
            @click="editRow(props)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteRow(props)"
            icon="delete"
          ></q-btn>
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
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });

    api.get("persons").then(function (response) {
      response.data.data.forEach((element) => {
        originalRows.push(element);
      });
    });

    function onSubmit() {
      api
        .post("persons", {
          name: name.value,
          birth_date: birth_date.value,
          cpf: cpf.value,
          sex: sex.value,
          phone: phone.value,
          email: email.value,
        })
        .then(function (response) {
          if (response.data.status == "success") {
            $q.notify({
              type: "positive",
              message: "Person registered sucessfully.",
            });
          } else {
            $q.notify({
              type: "negative",
              message: "Oops, something went wrong, try again.",
            });
          }
        });
    }

    function editRow(props) {
      console.log(props.row);
      fd.noti();
      // do something
      fd.noti = q$.notify({
        type: "info",
        textColor: "grey-10",
        multiLine: true,
        message: `I'll edit row data => ${JSON.stringify(props.row.id)
          .split(",")
          .join(", ")}`,
        timeout: 2000,
      });
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
      alert: ref(false),
      address: ref(""),
      filter,
      loading,
      pagination,
      columns,
      rows,
      editRow,
      deleteRow,
      onRequest,
      name,
      birth_date,
      cpf,
      sex,
      phone,
      email,
      onSubmit,
      onReset,
      options: ["Male", "Female"],
    };
  },
};
</script>
