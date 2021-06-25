<template>
  <div v-show="hasLoadedPage" class="listaFavoritos">
    <el-row>
      <el-col
        :span="24"
        align="right"
        class="pagination">
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handlePageActualChange"
          :current-page.sync="paginationPageActual"
          :page-sizes="[5, 10, 15]"
          :page-size="paginationPageSize"
          layout="prev, pager, next"
          :total="paginationItemCount"
          >
        </el-pagination>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="24">
      </el-col>
      <el-col
      :span="18"
      align="right">
        <el-button
        type="warning"
        :disabled="profiles.length === 0"
        > {{ $t( 'application.buttons.saveData' )}}
        </el-button>
      </el-col>
      <el-col
      :span="18"
      align="right">
        <el-button
        type="success"
        :disabled="profiles.length === 0"
        @click="exportToCSV"> {{ $t( 'application.buttons.exportCsv' )}}
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="showFilteredProfiles" empty-text=" ">
          <el-table-column
            prop="gender"
            :label="$t( 'application.fields.gender' )"
            :formatter="getGender"
            :min-width="100"
            ></el-table-column>
          <el-table-column
            prop="name"
            :label="$t( 'application.fields.name' )"
            :formatter="(row, column, cell) => `${cell.first} ${cell.last}`"
            :min-width="140"
            ></el-table-column>
          <el-table-column
            prop="email"
            :label="$t( 'application.fields.email' )"
            :min-width="140"
            ></el-table-column>
          <el-table-column
            prop="location.country"
            :label="$t( 'application.fields.nationality' )"
            :min-width="120"
            ></el-table-column>
          <el-table-column
            prop="dob.date"
            :label="$t( 'application.fields.dateToBirth' )"
            :min-width="110"
            :formatter="getDate"
            ></el-table-column>
          <el-table-column
            prop="registered.date"
            :label="$t( 'application.fields.registrationDate' )"
            :min-width="100"
            :formatter="getDate"
            ></el-table-column>
          <el-table-column
            class-name="claseExportar"
            width="100">
            <template slot-scope="scope">
              <el-tooltip
                effect="dark"
                :content="$t( 'profiles.seeDetail' )"
                placement="top">
                <el-button
                  icon="el-icon-view"
                  circle
                  @click="navigateProfileDetail(scope.row)">
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <perfiles-filtro :filter-disabled="filterDisabled" @change-filter="filterProfiles" />
  </div>
</template>

<script>

import PerfilesFiltro from '@/views/profiles/components/PerfilesFiltro'

export default {
  name: 'PerfilesListaFavoritos',
  components: {
    PerfilesFiltro
  },
  data () {
    return {
      profiles: JSON.parse(localStorage.getItem('listOfProfilesFavorites')) || [],
      filteredProfiles: [],
      hasLoadedPage: false,
      filterDisabled: true,
      showFilteredProfiles: [],
      paginationPageSize: parseInt(process.env.VUE_APP_PAGINATION_PAGE_SIZE),
      paginationPageActual: parseInt(process.env.VUE_APP_PAGINATION_PAGE_ACTUAL),
      paginationItemStart: parseInt(process.env.VUE_APP_PAGINATION_ITEM_START),
      paginationItemEnd: parseInt(process.env.VUE_APP_PAGINATION_ITEM_END),
      paginationItemCount: 0
    }
  },
  methods: {
    exportToCSV () {
      const template = [`${this.$t('application.fields.gender')}; ${this.$t('application.fields.name')}; ${this.$t('application.fields.email')}; ${this.$t('application.fields.nationality')}; ${this.$t('application.fields.dateToBirth')}; ${this.$t('application.fields.registrationDate')}; \n`]
      template.push(...this.profiles.map(profile => {
        return `${this.getGender(profile.gender)}; ${profile.name.title} ${profile.name.first} ${profile.name.last}; ${profile.email}; ${profile.location.country}; ${this.getDate('', '', profile.dob.date)}; ${this.getDate('', '', profile.registered.date)};\n`
      }))
      const reader = new FileReader()
      reader.onload = (event) => {
        const linkDownload = document.createElement('a')
        linkDownload.href = event.target.result
        linkDownload.target = '_blank'
        linkDownload.download = 'Listado de perfiles favoritos.csv'
        linkDownload.click()
      }
      reader.readAsDataURL(new Blob(template, { type: 'text/csv' }))
    },
    handlePageSizeChange (val) {
      this.paginationPageSize = val
      if (this.paginationPageActual < 2) {
        this.paginationItemStart = 0
      }
      this.paginationItemEnd = this.paginationPageSize + this.paginationItemStart
      this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationItemEnd)]
    },
    handlePageActualChange (val) {
      this.paginationPageActual = val
      if (this.paginationPageActual < 2) {
        this.paginationItemStart = 0
      } else {
        this.paginationItemStart = (this.paginationPageActual - 1) * (this.paginationPageSize)
      }
      this.paginationItemEnd = this.paginationPageSize + this.paginationItemStart
      this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationItemEnd)]
    },
    getDate (row, column, cell) {
      return this.$moment(new Date(cell)).format('DD/MM/YYYY')
    },
    getGender (row, column, cell) {
      return cell === 'male' ? this.$t('application.fields.male') : this.$t('application.fields.female')
    },
    filterProfiles (filter) {
      let filterResult = [...this.profiles]
      if (filter.age) {
        filterResult = filterResult.filter(({ dob }) => dob.age.toString() === filter.age.toString())
      }
      if (filter.gender) {
        filterResult = filterResult.filter(({ gender }) => gender.toString() === filter.gender.toString())
      }
      if (filter.nationality) {
        const filterNationalityRegExp = new RegExp(filter.nationality, 'i')
        filterResult = filterResult.filter(({ location }) => (location.country && location.country.match(filterNationalityRegExp)))
      }
      this.filteredProfiles = [...filterResult]
      this.paginationItemCount = this.filteredProfiles.length
      this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationItemEnd)]
    },
    navigateProfileDetail (profile) {
      this.$router.push({ name: 'profile-detail', params: { profileId: profile.id.value } })
    },
    async fetchInitialData () {
      this.filteredProfiles = [...this.profiles]
      if (this.profiles.length > 0) {
        this.paginationItemCount = this.profiles.length
        this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationPageSize)]
        this.filterDisabled = false
      }
      this.hasLoadedPage = true
    }
  },
  created () {
    this.fetchInitialData()
  }
}
</script>

<style lang="scss">
.listaFavoritos {
   .el-table th {
    background-color: #b3e19d;
    padding-left: 1rem;
    color: #303030;
  }
  .el-table__body-wrapper {
    padding-left: 1rem;
  }
  .pagination {
    margin-bottom: 10px;
  }
.el-button--success.is-disabled, .el-button--success.is-disabled:active, .el-button--success.is-disabled:focus, .el-button--success.is-disabled:hover {
  color: hsl(0, 0%, 44%);
  font-weight: bold;;
  background-color: #b3e19d;
  border-color: #b3e19d;
  margin-bottom: 1rem;
}
.el-button--warning.is-disabled, .el-button--warning.is-disabled:active, .el-button--warning.is-disabled:focus, .el-button--warning.is-disabled:hover {
  color: hsl(0, 0%, 44%);
  font-weight: bold;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}
}
</style>
