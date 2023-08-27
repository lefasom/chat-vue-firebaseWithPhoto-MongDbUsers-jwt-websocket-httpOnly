<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

import { ref } from 'vue';
import LogoAndMenu from "../components/LogoAndMenu.vue";
export default {
  name: 'crear',

  components: {
    LogoAndMenu,
  },

  setup() {
    const router = useRouter()
    const store = useStore();
    const modoNocturno = computed(() => store.state.modoNocturno);
    const conexion = computed(() => store.state.conexion);

    const array = [{ "id": 1, "grupo": "Lucas Vargas" }, { "id": 2, "grupo": "Mike Huaman" }, { "id": 3, "grupo": "Pedro perez" }, { "id": 4, "grupo": "Franco Echegaray" }, { "id": 5, "grupo": "Ignacio Herrera" }, { "id": 6, "grupo": "Lisandro Tamola" }, { "id": 7, "grupo": "Renzo Perez" }, { "id": 8, "grupo": "Dylan Sombra" }, { "id": 9, "grupo": "Diego Sanfurgo" }, { "id": 10, "grupo": "Jose Lagos" }, { "id": 11, "grupo": "Nicolas Estalles" }, { "id": 12, "grupo": "Eros Silva" }];

onMounted(()=>{
  if(conexion.value==false){
    router.push('/Login')
  }
})
    return {
      LogoAndMenu,
      modoNocturno,
      array
    }
  }
}

</script>

<template>
  <div :class="modoNocturno ? 'container-nube' : 'container2-nube'">
    <LogoAndMenu />

    <input type="text" placeholder="Buscar palabra clave o id">
    <section>
      <div v-for="arra in array" :key="arra.id">
        <article>
            <img src="../assets/messi-perfil.jpg" alt="">
          <div class="GrupName">{{ arra.grupo }}</div>
          <button>
            <font-awesome-icon id="icon" icon="comments" />
          </button>
          <button>
            <font-awesome-icon id="icon" icon="trash" style="color: rgb(195, 33, 8);"/>
          </button>
        </article>
      </div>
    </section>
  </div>
</template>
<style scoped>
img{
    height: 20px;
    width: 20px;
    margin: 2px;
    border-radius: 100%;
}
.container-nube .btn-cancelar {
  background-color: #999;
  color: #0C1D25;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.container-nube button {
    background-color: transparent;
  border:0;
  outline: 0;
  color: #3192c7;
  margin: 0 5px;
  padding: 2px;
  border-radius: 10px;
  cursor: pointer;
}

.container-nube .router {
  text-decoration: none;
  color: #FEFDFC;
}

.container-nube {
  background-color: #0C1D25;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container-nube h1 {
  padding: 10px;
  margin-top: 5px;
  font-size: 22px;
  color: #3192c7;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.container-nube label {
  margin-top: 5px;
  font-size: 12px;
  color: #FEFDFC;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container-nube input {
  margin-top: 10px;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #999;
  outline-color: #f8fdff;
  background-color: transparent;
  color: #FEFDFC;

}

.container-nube section {
  border: 1px solid #FEFDFC;
  width: 90%;
  height: 70vh;
  margin: auto;
  margin-top: 20px;
  color: #FEFDFC;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  overflow: hidden;
  overflow-y: scroll;
}

.container-nube section div {
  margin: 0 5px;


}

.container-nube article {
  background-color: #074b6f;
  display: flex;
  margin-top: 3px;
  height: 20px;
  align-items: center;
}

.container-nube section::-webkit-scrollbar {
  width: 8px;
  /* Ancho de la barra */
  background-color: #0C1D25;
  /* Color de fondo de la barra */
}

section::-webkit-scrollbar-thumb {
  background-color: #074b6f;
  /* Color de la barra en sí */
  border-radius: 10px;
  /* Borde redondeado */
}

section::-webkit-scrollbar-thumb:hover {
  background-color: #074b6f;
  /* Color de la barra en sí al pasar el cursor sobre ella */
}

.container2-nube .btn-cancelar {
  background-color: #999;
  color: #0C1D25;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.container2-nube button {
  background-color: transparent;
  border:0;
  outline: 0;
  color: #3192c7;
  margin: 0 5px;
  padding: 2px;
  border-radius: 10px;
  cursor: pointer;
}

.container2-nube .router {
  text-decoration: none;
  color: #FEFDFC;
}

.container2-nube {
  background-color: #fff;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container2-nube h1 {
  padding: 10px;
  margin-top: 5px;
  font-size: 22px;
  color: #3192c7;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.container2-nube label {
  margin-top: 5px;
  font-size: 12px;
  color: #FEFDFC;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.container2-nube input {
  margin-top: 10px;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #999;
  outline-color: #0C1D25;
  background-color: transparent;
  color: #0C1D25;

}

.container2-nube section {
  border: 1px solid #0C1D25;
  width: 90%;
  height: 70vh;
  margin: auto;
  margin-top: 20px;
  color: #0C1D25;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #ccc;
}

.container2-nube article {
  background-color: #f8fdff;
  display: flex;
  margin-top: 3px;
  height: 20px;
  align-items: center;
}

section div {
  margin: 0 5px;


}
</style>
