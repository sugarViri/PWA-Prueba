<template lang="pug">
  el-form(:model="profilesFilterModel")

    el-row(
      type="flex"
      :gutter="20"
      align="middle")

      // age
      el-col(:span="6")
        el-form-item(:label="$t( 'profiles.filter.ageLabel' )")
          el-input(
            v-model="profilesFilterModel.age"
            :placeholder="$t( 'profiles.filter.agePlaceholder' )"
            :disabled="filterDisabled"
            size="exa"
            @input="handleKeywordChange")

      // nationality
      el-col(:span="6")
        el-form-item(:label="$t( 'profiles.filter.nationalityLabel' )")
          el-input(
            v-model="profilesFilterModel.nationality"
            :placeholder="$t( 'profiles.filter.nationalityPlaceholder' )"
            :disabled="filterDisabled"
            size="exa"
            @input="handleChange")

      // gender
      el-col(:span="6")
          el-radio-group(
            v-model='profilesFilterModel.gender'
            @change="handleChange"
            :disabled="filterDisabled")
            el-radio(label='male') {{ $t( 'application.fields.male' ) }}
            el-radio(label='female') {{ $t( 'application.fields.female' ) }}

      el-col(:span="6")
        el-button(
          type="text"
          :round="false"
          @click="resetFilters"
          class="reset-filters-buttons"
          :disabled="!canCleanFilters || filterDisabled") {{ $t( 'application.cleanFilters' ) }}

</template>

<script>

import { debounceMixin } from '@/utils/debounceMixin'

export default {
  name: 'ProfilesFilter',
  props: {
    filterDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      profilesFilterModel: {
        gender: '',
        age: '',
        nationality: ''
      },
      immediateSearch: true
    }
  },
  mixins: [debounceMixin],
  computed: {
    canCleanFilters () {
      return this.profilesFilterModel.gender ||
              this.profilesFilterModel.age ||
              this.profilesFilterModel.nationality
    }
  },
  methods: {
    handleSearch () {
      this.executeProfilesFilter(this.profilesFilterModel)
    },
    // nationality
    handleKeywordChange () {
      if (this.immediateSearch) {
        this.$_debounceMixin_debounce(
          () => this.executeProfilesFilter(this.profilesFilterModel),
          400)
      }
    },
    handleChange () {
      if (this.immediateSearch) {
        this.executeProfilesFilter(this.profilesFilterModel)
      }
    },
    executeProfilesFilter (filter) {
      this.$emit('change-filter', filter)
    },
    resetFilters () {
      this.profilesFilterModel = {
        gender: '',
        age: '',
        nationality: ''
      }
      this.executeProfilesFilter(this.profilesFilterModel)
    }
  }
}
</script>
<style lang="scss" scoped>
  .order-icon-left {
    float: left;
  }
  .reset-filters-buttons.el-button--text {
    padding-top: 18px;
    padding-bottom: 0px;
  }

</style>
