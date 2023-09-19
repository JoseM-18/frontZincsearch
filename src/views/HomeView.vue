<template>
  <main class="container">
    <div class="pt-4 mb-8 flex item-center ">
      <input type="text" placeholder="Search" v-model="searchQuery"
        class="w-full h-12 px-4 rounded-full bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" />
      <button class="btn btn-primary mb-4 bg-cyan-700 rounded-full h-8 w-20" @click="getSearchQuery">
        Search
      </button>
    </div>
    <ul v-if="searchResults">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 ">
          <div class=" table-responsive">          
            <DataTable :data="emails" :columns="columns" class="table table-striped table-bordered display"
            :options="{ responsive: true, autoWidth: false, dom: 'Bfrtip'  }">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Content</th>
              </tr>
            </thead>
          </DataTable>
        </div>
        
      </div>
    </div>
    </ul>
  </main>
</template>
<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import Buttons from "datatables.net-buttons-bs5";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5";
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5)
export default {
  name: "HomeView",
  components: {
    DataTable,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      emails: null,
      columns: [
        { data: null, render: function (data, type, row, meta) { return `${meta.row + 1}`; } },
        { data: "_source.from" },  
        { data: "_source.to" },    
        { data: "_source.body" },  
      ],
    };
  },
  mounted() {
    this.getSearchQuery();
  },
  methods: {
    async getSearchQuery() {
      if (this.searchQuery !== "") {
        const result = await axios.get(`http://localhost:9090/search?q=${this.searchQuery}`);
        this.searchResults = result.data;
        this.emails = this.searchResults.hits.hits;
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style>
@import "datatables.net-bs5"
</style>