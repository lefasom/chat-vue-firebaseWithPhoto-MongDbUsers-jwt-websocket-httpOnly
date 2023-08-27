<template>
  <div :class="modoNocturno ? 'principal' : 'nocturno'">
    <LogoAndMenu />
    <div class="img">
      <p>
        ch<font-awesome-icon id="icon" icon="comments" />tea
      </p>
    </div>

  </div>
</template>
<script>
import LogoAndMenu from "../components/LogoAndMenu.vue";
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';

export default {
  name: 'crear',

  components: {
    LogoAndMenu,
  },

  setup() {
    const store = useStore();
    const modoNocturno = computed(() => store.state.modoNocturno);
    const usuario = computed(() => store.state.usuario);
    const usuarios = computed(() => store.state.usuarios);
    const mensajes = computed(() => store.state.mensajes);


    const id = computed(() => store.state.id);


    onMounted(async () => {
      await store.dispatch('fetchUsuarios')
      await store.dispatch('fetchMensajes')

      // console.log(
      //   'mensajes', mensajes
      // )

      // console.log(
      //   'usuarios', usuarios
      // )
    })

    return {
      modoNocturno
    }
  }
}
</script>
  
<style scoped>
.principal {
  background-color: #0C1D25;
  height: 100vh;
}




.principal .img {
  margin-top: 33%;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-decoration: none;
  text-align: center;
  display: flex;

}

.principal .img p {
  margin: auto;
  font-size: 88px;
  color: #3192c7;
  /* background-color: #232D36; */


}

.nocturno {
  background-color: #fff;
  height: 100vh;
}




.nocturno .img {
  margin-top: 33%;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-decoration: none;
  text-align: center;
  display: flex;

}

.nocturno .img p {
  margin: auto;
  font-size: 88px;
  color: #3192c7;
  /* background-color: #232D36; */


}
</style>
  
