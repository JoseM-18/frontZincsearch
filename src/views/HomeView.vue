<template>
  <main class="container">
    <div class="pt-4 mb-8 flex center item-center space-x-4 ">
      <input type="text" placeholder="Search" v-model="searchQuery"
        class=" w-full h-12 px-4 rounded-full bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 "
        @keyup.enter="getSearchQuery" />
      <button
        class="  btn btn-primary mb-4 transition delay-150 duration-300 ease-in-out bg-cyan-700 rounded-full h-12 w-20 hover:bg-sky-500 mx-4"
        @click="getSearchQuery">
        Search
      </button>
    </div>
      <div class=" flex  sm:flex-row ">
        <div class="col-lg-8 offset-lg-2  ">
          <div v-if="cargando" class="flex center item-center space-x-4 ">
            <div class="spinner-border text-secondary flex justify-center" role="status">
              <span class="visually-hidden ">Loading...</span>
            </div>
          </div>
          <div v-if="emails" class=" table-responsive flex center item-center space-x-4 ">
            <table id="tabla" class="table table-striped table-bordered table-hover" style="width:100%">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Subject</th>
                  <th class="display display-none">Body</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(email, index) in emails" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ email._source.date }}</td>
                  <td>{{ email._source.from }}</td>
                  <td>{{ seeAllContent(email._source.to, index) }}</td>
                  <td>{{ email._source.subject }}</td>
                  <td class="display display-none">{{ email._source.body }}</td>
                  
                  <button
                    class="btn btn-primary mb-4 transition delay-150 duration-300 ease-in-out bg-cyan-700 rounded-full h-7 w-7 hover:bg-sky-500 mx-2 overflow-clip mt-5"
                    @click="expandBody(email._source.body, index)">
                    {{ showFullContent && indexEmail === index ? "-" : "+" }}
                  </button>
                </tr>
              </tbody>
            </table>
            <textarea v-if="showFullContent" disabled rows="20" cols="60" class="mt-20 px-4 rounded-lg py-2 border border-gray-300 form-control bg-tertiary border-none"
              id="comment" v-model="body">
            </textarea>
          </div>
        </div>
      </div>

  </main>
</template>
<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5.js";
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      emails: null,
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
          const result = await axios.get(`http://localhost:9090/search?q=${this.searchQuery}`);
          this.searchResults = result.data;
          this.emails = this.searchResults.hits.hits;
          this.cargando = false;
          if ($.fn.DataTable.isDataTable("#tabla")) {
            $("#tabla").DataTable().destroy();
          }
          this.getTabla();
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    expandBody(body, index) {
      
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