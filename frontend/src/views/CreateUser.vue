<template>
    <div :class="modoNocturno ? 'container' : 'container2'">
        <LogoAndMenu />
        <div class="user-registration">
            <form @submit.prevent="registrarse">
                <div class="form-group">
                    <label for="customImageInput" id="customImageLabel">
                        <font-awesome-icon class="img1" icon="camera" />
                        <div v-if="image" class="img2">
                            <img :src="image" alt="Uploaded Image" />
                        </div>
                    </label>
                    <input type="file" id="customImageInput" @change="handleFileChange" style="display: none;">
                </div>



                <div class="form-group">
                    <label for="">Correo Electronico</label>
                    <input v-model.trim="form.email" type="text" id="email" placeholder="Correo Electronico"
                        :class="passwordError ? 'is-invalid' : ''">

                </div>

                <div class="form-group">
                    <label for="">Nombre de usuario</label>
                    <input v-model.trim="form.userName" type="text" id="alias" placeholder="Nombre de usuario">
                </div>

                <div class="form-group">
                    <label for="">Contraseña</label>
                    <input :class="passwordError ? 'is-invalid' : ''" v-model.trim="form.password" type="password"
                        id="password" placeholder="Contraseña">
                </div>

                <div v-if="form.photo != ''">
                    <button type="submit">Registrarse</button>
                </div>
                <div v-if="emailError" class="error-message">Ingrese un correo válido</div>
                <div v-if="passwordError" class="error-message">
                    La contraseña debe tener al menos {{ minPasswordLength }} caracteres
                </div>
                <div v-if="response" class="error-message">
                    {{ resMessage }}
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import LogoAndMenu from '../components/LogoAndMenu.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { db, uploadFile } from '../firebase/firebase'
export default {
    name: 'CreateUser',

    components: {
        LogoAndMenu,
    },

    setup() {
        const router = useRouter()
        const store = useStore()
        const modoNocturno = computed(() => store.state.modoNocturno)
        const image = ref('')
        const passwordError = ref(false)
        const minPasswordLength = 8
        const emailError = ref(false)
        const response = ref(false)
        const resMessage = ref('')


        const form = ref({
            email: null,
            password: null,
            userName: null,
            photo: '',
            connection: false
        })

        const validateEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            emailError.value = !emailRegex.test(email.value)
        }

        const validatePassword = () => {
            passwordError.value = password.value.length < minPasswordLength
        }

        const handleFileChange = (event) => {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()

                reader.onload = (e) => {
                    image.value = e.target.result
                };

                reader.readAsDataURL(file)
                cargarPhoto(file)
            }
        };

        const cargarPhoto = async (file) => {
            const result = await uploadFile(file)
            form.value.photo = result
        }

        const registrarse = async () => {
            validateEmail()
            validatePassword()
         
            if (form.value.photo && !passwordError.value && !emailError.value) {
                const value = form.value;
                const resp = await store.dispatch('createUsuario', value)
             
                if (resp.error === true) {
                    response.value = true
                    resMessage.value = resp.message
                    console.log("Datos invalidos")
                } else {
                    router.push('/');
                    console.log("Formulario válido, enviando datos...")
                }
            } else {
                console.log("Datos invalidos")
            }
        }

        return {
            handleFileChange,
            registrarse,
            modoNocturno,
            image,
            form,
            minPasswordLength,
            emailError,
            passwordError,
            response,
            resMessage
        }
    }
}
</script>
  
<style scoped>
.is-invalid {
    border: 1px solid red;
}

.error-message {
    margin-left: 14px;
    padding-top: 10px;
    color: red;
    font-size: 14px;
    margin-top: 5px;
}

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
  
