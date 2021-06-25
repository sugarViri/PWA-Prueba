<template>
  <header class="headerContent">
    <div class="main">
      <el-row
        type="flex"
        align="middle"
        class="contenido"
        >
        <el-col
          :span="12"
          align="center"
          >
          <h1>PWA - Consulta Perfiles</h1>
        </el-col>
        <el-col
          :span="12"
          align="center"
          >
          <router-link to="/profiles"> Perfiles</router-link>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
.headerContent {
  display: block;
  .main {
    position: relative;
    height: 64px;
    background-color: #303030;
    padding: 1rem auto;
    box-shadow: 0 2px 10px 0 #3a444b;
    z-index: 1001;
    .contenido {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      a {
        text-decoration: none;
        padding: 1rem 2rem;
        color: #303030;
        font-weight: bold;
        background-color: #b3e19d;
      }
      a:hover {
        background-color: hsl(101, 27%, 63%);
      }
      h1 {
        color: #fff;
        font-weight: bold;
      }
      p {
        color: #ffffff;
      }
    }
  }
}

</style>
