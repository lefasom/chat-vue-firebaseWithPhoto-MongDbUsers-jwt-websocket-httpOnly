<template>
    <div :class="modoNocturno ? 'container' : 'container2'">
        <LogoAndMenu />
        <div class="user-registration">
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="">Correo Electronico</label>
                    <input v-model="form.email" type="email" id="email" placeholder="Correo Electronico">
                </div>
                <div class="form-group">
                    <label for="">Contraseña</label>
                    <input v-model="form.password" type="password" id="password" placeholder="Contraseña">
                </div>
                <div class="form-group">
                    <label for="">Nombre de usuario</label>
                    <input v-model="form.userName" type="text" id="alias" placeholder="Nombre de usuario">
                </div>
                <button @click="editarDatos" type="submit">Editar datos</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import LogoAndMenu from '../components/LogoAndMenu.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'CreateUser',

    components: {
        LogoAndMenu,
    },

    setup() {
        const router = useRouter()

        const store = useStore();
        const modoNocturno = computed(() => store.state.modoNocturno);
        const usuario = computed(() => store.state.usuario);
        let form =
        {
            userName: usuario.value.userName,
            password: usuario.value.password,
            photo: usuario.value.photo,
            _id: usuario.value._id,
            email: usuario.value.email

        }

        const editarDatos = async () => {
            const value = form
            await store.dispatch('updateUsuario', value)
            store.dispatch('setDatosUsuario', value)

            router.push('/');

        }
      
        return {
            modoNocturno,
            editarDatos,
            form,
        }
    }
}
</script>
  
<style scoped>
.router {
    text-decoration: none;
    color: #FEFDFC;
}


h1 {
    padding: 10px;
    font-size: 22px;
    color: #074b6f;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.container {
    background-color: #0C1D25;
    height: 100vh;
}

.container2 {
    background-color: #fff;
    height: 100vh;
}

.container option {
    background: #0C1D25;
    color: #3192c7;
}

.container select {
    background: #0C1D25;
    color: #3192c7;
}

.container .user-registration {
    font-family: Arial, sans-serif;
    width: 80%;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #0C1D25;
    margin-top: 10%;
}

.container2 .user-registration {
    font-family: Arial, sans-serif;
    width: 80%;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10%;
}

h2 {
    color: #FEFDFC;
}

.form-group {
    margin: 15px;
}

.container label {
    display: block;
    font-size: 15px;
    margin: 5px 0;
    color: #3192c7;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: start;
}

.container2 label {
    display: block;
    font-size: 15px;
    margin: 5px 0;
    color: #5db8e8;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: start;
}

.container input[type="text"],
.container input[type="email"],
.container input[type="password"],
.container input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 5px;
    background-color: transparent;
    color: #FEFDFC;
}

.container2 input[type="text"],
.container2 input[type="email"],
.container2 input[type="password"],
.container2 input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #777;
    border-radius: 5px;
    background-color: transparent;
    color: #0C1D25;
}

.container input::placeholder {
    color: #777778;
}

.container button {
    background-color: transparent;
    color: #3192c7;
    padding: 10px 20px;
    border: 1px solid #3192c7;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 14px;

}

.container2 button {
    background-color: transparent;
    color: #3192c7;
    padding: 10px 20px;
    border: 1px solid #3192c7;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 14px;

}

.container #customImageLabel {
    /* Estilo para el contenedor de la imagen personalizada */
    /* Asegúrate de establecer el tamaño adecuado para la imagen personalizada */
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: inline-block;
}

.container2 #customImageLabel {
    /* Estilo para el contenedor de la imagen personalizada */
    /* Asegúrate de establecer el tamaño adecuado para la imagen personalizada */
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: inline-block;
}

.container #customImageLabel .img1 {
    /* Asegúrate de que la imagen personalizada se ajuste correctamente al contenedor */
    cursor: pointer;
    object-fit: cover;
    position: relative;
    bottom: -69%;
    right: -73%;
    border-radius: 100%;
    z-index: 999;
    background-color: #074b6f;
    font-size: 16px;
    padding: 7px;

}

.container2 #customImageLabel .img1 {
    /* Asegúrate de que la imagen personalizada se ajuste correctamente al contenedor */
    cursor: pointer;
    object-fit: cover;
    position: relative;
    bottom: -69%;
    right: -73%;
    border-radius: 100%;
    z-index: 999;
    background-color: #5db8e8;
    font-size: 16px;
    padding: 7px;
    color: #fff;

}

#customImageLabel img {
    /* Asegúrate de que la imagen personalizada se ajuste correctamente al contenedor */
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 100%;
    position: relative;
    top: -32px;
    z-index: 9;
    cursor: pointer;
    border: 2px solid #ccc;

}
</style>
  
