<template>
<el-form :model="profilesFilterModel" class="perfilesFiltro">
    <el-row type="flex" :gutter="20" align="middle" class="rowFlex">
    <!--    edad -->
    <div>
      <el-col :span="12" >
        <el-form-item class="filtroEdad" :label="$t( 'profiles.filter.ageLabel' )">
          <el-input
          v-model="profilesFilterModel.age"
          :placeholder="$t( 'profiles.filter.agePlaceholder' )"
          :disabled="filterDisabled" size="exa" @input="handleKeywordChange">
          </el-input>
        </el-form-item>
      </el-col>
      <!--  nacionalidad -->
      <el-col :span="12">
        <el-form-item :label="$t( 'profiles.filter.nationalityLabel' )">
          <el-input
          v-model="profilesFilterModel.nationality"
          :placeholder="$t( 'profiles.filter.nationalityPlaceholder' )"
          :disabled="filterDisabled" size="exa" @input="handleChange">
          </el-input>
        </el-form-item>
      </el-col>
    </div>
   <!--     genero -->
   <div>
      <el-col :span="12">
        <el-radio-group
        v-model='profilesFilterModel.gender'
        @change="handleChange"
        :disabled="filterDisabled">
          <el-radio label='male'> {{ $t( 'application.fields.male' ) }}</el-radio>
          <el-radio label='female'> {{ $t( 'application.fields.female' ) }}</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="12">
        <el-button type="text"
        :round="false"
        @click="resetFilters"
        class="reset-filters-buttons"
        :disabled="!canCleanFilters || filterDisabled"> {{ $t( 'application.cleanFilters' ) }}
        </el-button>
      </el-col>
      </div>
    </el-row>
 </el-form>

</template>

<script>

import { debounceMixin } from '@/utils/debounceMixin'

export default {
  name: 'PerfilesFiltro',
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
<style lang="scss">
.perfilesFiltro {
  .rowFlex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .el-button.is-disabled.el-button--text {
    background-color: #fff;
    color: #303030;
    font-weight: bold;
  }
  .reset-filters-buttons.el-button--text {
    padding: 1rem;
    font-weight: bold;
 /*    color: hsl(125, 48%, 32%); */
  }
  button:hover {
    background-color: rgb(224, 224, 224);
  }
  .el-form-item label {
    color: #ffffff;
  }
  .el-radio {
    color: #ffffff;
    margin-right: 0;
    margin-top: 0.5rem;
  }
  .el-radio:last-child {
    color: #ffffff;
    margin-right: 15px;
    margin-top: 0.5rem;
  }
}

  .order-icon-left {
    float: left;
  }
   .reset-filters-buttons {
      background-color: #fff;
   }

  .reset-filters-buttons.el-button--text {
    padding-top: 18px;
    padding-bottom: 0px;

  }

</style>
