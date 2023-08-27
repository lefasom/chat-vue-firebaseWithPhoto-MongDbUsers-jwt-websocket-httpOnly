

<template>
  <ChatPlantilla :id="id"/>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Obtenemos el objeto de enrutamiento actual
const route = useRoute();

// Creamos una referencia reactiva para almacenar el valor del ID
const id = ref(route.params.id);
// Cuando el componente se monta, asignamos el valor del parámetro ID

</script>
<script>
import ChatPlantilla from '../components/ChatPlantilla.vue'

export default {
 components: {
    ChatPlantilla,
  },
 
  }
</script>




<style scoped></style>
