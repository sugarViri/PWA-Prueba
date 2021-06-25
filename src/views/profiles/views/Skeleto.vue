<template>
  <div>
    <div class="filtrosSkeleto">Descubre y Selecciona tus perfiles Favoritos</div>
      <div class="lineaSkeleto">
        <h1>Encuentra los contactos perfectos entre los 100 perfiles seleccionados para tí</h1>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Skeleto',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.filtrosSkeleto {
  padding: 2.7rem 1rem 2rem 1rem;
  margin: -2rem -1.5rem 2rem -1.5rem;
  background-color: #fff;
  min-height: 1rem;
  font-size: 1.2rem;
  color: #303030;
}
.lineaSkeleto {
  padding: 3rem 2rem 3rem 2rem;
  background-color: #fff;
  min-height: 40vh;
  border-bottom: 1px solid hsl(0, 1%, 38%);
  text-align: center;
  margin: 0 auto;
  h1 {
    color: #303030;
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 3.5rem;
    padding: 1rem;
  }
}
</style>
