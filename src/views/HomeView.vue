<template>
  <main>
    <div class="pt-4 mb-1 flex center item-center space-x-4 p-10">
      <input type="text" placeholder="Search" v-model="searchQuery"
        class=" w-full h-12 px-4 rounded-full bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 "
        @keyup.enter="getSearchQuery" />
      <button
        class="  btn btn-primary mb-4 transition delay-150 duration-300 ease-in-out bg-cyan-700 rounded-full h-12 w-20 hover:bg-sky-500 mx-4"
        @click="getSearchQuery">
        Search
      </button>
    </div>
    <div class=" mt-0 mx-4">
      <div class="col-lg-8 offset-lg-2 flex center item-center space-x-2 ">
        <div v-if="cargando" class="flex center item-center space-x-4 ">
          <div class="spinner-border text-secondary flex justify-center" role="status">
            <span class="visually-hidden ">Loading...</span>
          </div>
        </div>
        <div v-if="emails && !cargando" class=" table-responsive flex center item-center">
          <table id="tabla" class="table table-striped table-bordered table-hover" style="width:100%">
            <thead>
              <tr>
                <th class="display display-none">#</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Subject</th>
                <th class="display display-none">Body</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(email, index) in emails" :key="index">
                <td class="display display-none">{{ index + 1 }}</td>
                <td>{{ email._source.date }}</td>
                <td>{{ email._source.from }}</td>
                <td>{{ seeAllContent(email._source.to, index) }}</td>
                <td>{{ email._source.subject }}</td>
                <td class="display display-none">{{ email._source.body }}</td>

                <button
                  class="btn btn-primary mb-4 transition delay-150 duration-300 ease-in-out bg-cyan-700 rounded-full h-7 w-7 hover:bg-sky-500 mx-2 overflow-clip mt-5"
                  @click="expandBody(email._source.from, email._source.to, email._source.body, index)">
                  {{ showFullContent && indexEmail === index ? "-" : "+" }}
                </button>
              </tr>
            </tbody>
          </table>
        </div>
        <textarea v-if="showFullContent" disabled cols="90" class="mt-10 mb-60 px-4 rounded-lg py-2 border border-gray-300 form-control
           bg-tertiary border-none" id="comment">From: {{ from }}{{ "\n" + "To: " + to }}
          {{ "\n" + body }}
          </textarea>
      </div>
    </div>
  </main>
</template>
<script>
import api from "../api/api";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
DataTable.use(DataTableLib);

export default {
  data() {
    return {
      searchQuery: "",
      emails: null,
      from: null,
      to: null,
      body: null,
      showFullContent: false,
      indexEmail: null,
      cargando: false,
    };
  },
  mounted() {
    this.getSearchQuery();
  },
  methods: {
    getTabla() {
      this.$nextTick(() => {
        $("#tabla").DataTable({
          dom: "lfrtip",
          responsive: true,
          paging: true,
          ordering: true,
          info: true,
          searching: true,
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
          },
          columnDefs: [
            {
              targets: [5],
              visible: false,
              searchable: true,
            },
            {
              targets: [0],
              visible: false,
              searchable: false,
            },
          ],
        });
      });
    },
    async getSearchQuery() {
      try {
        if (this.searchQuery !== "") {
          this.cargando = true;
          this.body = null;
          this.showFullContent = false;
          this.indexEmail = null;
          const result = await api(this.searchQuery)
          this.emails = result
          console.log(result);
          if ($.fn.DataTable.isDataTable("#tabla")) {
            $("#tabla").DataTable().destroy();
          }
          this.getTabla();
          this.cargando = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    expandBody(from, to, body, index) {
      this.from = from;
      this.to = to;
      this.body = body;
      this.showFullContent = !this.showFullContent;
      this.indexEmail = index;
      if (!this.showFullContent) {
        this.body = null;
        this.indexEmail = null;
      }
    },
    seeAllContent(data, index) {
      if (data.length > 50 && !this.showFullContent ||
        data.length > 50 && this.showFullContent && this.indexEmail !== index) {
        return data.slice(0, 50) + "...";
      } else {
        return data;
      }

    },
  },
};
</script>

<style>
@import "datatables.net-bs5"
</style>