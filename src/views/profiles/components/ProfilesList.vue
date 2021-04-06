<template lang="pug">
  div(v-show="hasLoadedPage")

    el-row(
      type="flex"
      align="middle")
      el-col(:span="21")
        profiles-filter(
          :filter-disabled="filterDisabled"
          @change-filter="filterProfiles")
      el-col(
        :span="3"
        class="total-items-message"
        align="right")
        div {{ $t( 'application.totalItemsMessage', { total: filteredProfiles.length} )}}

    el-row
      el-col(:span="24")
        el-table(
          :data="showFilteredProfiles"
          empty-text=" ")
          el-table-column(
            prop="email",
            :label="$t( 'application.fields.email' )",
            sortable)
          el-table-column(
            prop="name",
            :label="$t( 'application.fields.name' )",
            :formatter="(row, column, cell) => `${cell.first} ${cell.last}`"
            sortable)
          el-table-column(
            prop="location.country",
            :label="$t( 'application.fields.nationality' )",
            sortable)
          el-table-column(
            prop="gender",
            :label="$t( 'application.fields.gender' )",
            :formatter="getGender"
            sortable)
          el-table-column(
            prop="dob.date",
            :label="$t( 'application.fields.dateToBirth' )",
            :formatter="getDate"
            sortable)
          el-table-column(
            prop="registered.date",
            :label="$t( 'application.fields.registrationDate' )",
            :formatter="getDate"
            sortable)
          el-table-column(
            class-name="technical-basis-wizard-custom-cell"
            width="100")
            template(slot-scope="scope")
              el-tooltip(
                effect="dark"
                :content="$t( 'profiles.seeDetail' )"
                placement="top")
                el-button(
                  icon="el-icon-view"
                  circle
                  @click="navigateProfileDetail(scope.row)")

    el-row
      el-col(
        :span="24"
        align="left"
        class="pagination")
        el-pagination(
          @size-change="handlePageSizeChange"
          @current-change="handlePageActualChange"
          :current-page.sync="paginationPageActual"
          :page-sizes="[6, 12, 18]"
          :page-size="paginationPageSize"
          layout="sizes, ->, prev, pager, next"
          :total="paginationItemCount")

</template>

<script>

import ProfilesFilter from '@/views/profiles/components/ProfilesFilter'

import { getAllProfiles } from '@/api/profilesApi.js'

export default {
  name: 'ProfilesList',
  components: {
    ProfilesFilter
  },
  data () {
    return {
      profiles: JSON.parse(localStorage.getItem('listOfProfiles')) || [],
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
      return cell === 'male' ? 'Masculino' : 'Femenino'
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
      if (!this.profiles.length) {
        await getAllProfiles(500)
          .then(({ data }) => {
            this.profiles = data.results.filter(item => item.id.value !== null).slice(0, 100) || []
            localStorage.setItem('listOfProfiles', JSON.stringify(this.profiles))
            this.filteredProfiles = [...this.profiles]
            if (this.profiles.length > 0) {
              this.paginationItemCount = this.profiles.length
              this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationPageSize)]
              this.filterDisabled = false
            }
          })
          .finally(() => {
            this.hasLoadedPage = true
          })
      } else {
        this.filteredProfiles = [...this.profiles]
        if (this.profiles.length > 0) {
          this.paginationItemCount = this.profiles.length
          this.showFilteredProfiles = [...this.filteredProfiles.slice(this.paginationItemStart, this.paginationPageSize)]
          this.filterDisabled = false
        }
        this.hasLoadedPage = true
      }
    }
  },
  created () {
    this.fetchInitialData()
  }
}
</script>

<style lang="scss">
.pagination {
  margin-top: 10px;
}
</style>
