<script>
import { ref } from 'vue';

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import SidebarMenu from './SidebarMenu.vue';
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router'

export default {
    components: {
        SidebarMenu,
    },
    props: ['id'],
    name: 'ChatPlantillas',

    setup(props) {
        const store = useStore()
        const router = useRouter()

        const modoNocturno = computed(() => store.state.modoNocturno)
        const mensajes = computed(() => store.state.mensajes);
        const usuario = computed(() => store.state.usuario);
        let idemisor = computed(() => store.state.id);
        idemisor = localStorage.getItem('id') || idemisor

        // Fecha
        const fechas = []
        const fechaActual = new Date();
        const diferenciaHoraria = -300; // -3 horas * 60 minutos/hora = -180 minutos
        // Ajustar la hora según la diferencia horaria
        fechaActual.setMinutes(fechaActual.getMinutes() + diferenciaHoraria);
        const ano = fechaActual.getFullYear()
        const mes = fechaActual.getMonth() + 1
        const día = fechaActual.getDate()
        const hora = fechaActual.getHours()
        const minutos = fechaActual.getMinutes()
        // const segundos = fechaActual.getSeconds()

        const numeroANombre = (mes) => {
            switch (mes) {
                case 1: return "enero"
                    break;
                case 1: return "enero"
                    break;
                case 2: return "febrero"
                    break;
                case 3: return "marzo"
                    break;
                case 4: return "abril"
                    break;
                case 5: return "mayo"
                    break;
                case 6: return "junio"
                    break;
                case 7: return "julio"
                    break;
                case 8: return "agosto"
                    break;
                case 9: return "septiembre"
                    break;
                case 10: return "octubre"
                    break;
                case 11: return "noviembre"
                    break;
                case 12: return "diciembre"
                    break;
            }
        }

        const msj = ref({
            foto_emisor: localStorage.getItem('photo') || usuario.value.photo,
            nombre_emisor: localStorage.getItem('userName') || usuario.value.userName,
            id_emisor: localStorage.getItem('_id') || usuario.value._id,
            id_receptor: props.id,
            mensaje: '',
            fecha: serverTimestamp(),
            hora: `${hora}:${minutos}`,
            fecha_e: `${día + 1} de ${numeroANombre(mes)} del ${ano} `

        })

        const send = () => {
            if (usuario.value._id) {
                const value = msj.value
                store.dispatch('crearMensaje', value);
                msj.value.mensaje = ''
            }

        }

        const chequear = (value) => {
            if (!fechas.includes(value)) {
                fechas.push(value)
                return value
            } else {
                return ''
            }
        }

        const deleteMensaje = (id) => {
            store.dispatch('borrarMensaje', id)
        }

        onMounted(async () => {
            await store.dispatch('fetchMensajes')
            if(usuario.value.userName == ''){
                router.push('/Login')
            }
        })
     
        return {
            send,
            chequear,
            deleteMensaje,
            msj,
            modoNocturno,
            mensajes,
            usuario,
            props,
            fechas
        }
    }
}
</script>

<template >
    <div :class="modoNocturno ? 'color1' : 'color2'">
        <div :class="modoNocturno ? 'nocturno' : 'dia'">
            <section class="panel-sup">
                <div class="panel-sup-phote">
                    <router-link to="/">
                        <font-awesome-icon id="icon" icon="arrow-left" />
                    </router-link>
                    <!-- <img src="../assets/messi-perfil.jpg" alt=""> -->
                </div>
                <!-- <div class="panel-sup-name">
                <h3>Lionel Messi </h3>
            </div> -->
            </section>

            <section v-for="mensaje in mensajes" :key="mensaje.id"
                :class="(mensaje.value.id_emisor === usuario._id && mensaje.value.id_receptor === props.id) || (mensaje.value.id_emisor === props.id && mensaje.value.id_receptor === usuario._id) ? 'panel-body' : 'none'">
                <div v-if="(mensaje.value.id_emisor === usuario._id && mensaje.value.id_receptor === props.id) || (mensaje.value.id_emisor === props.id && mensaje.value.id_receptor === usuario._id)"
                    class="messages-container">
                    <div v-if="chequear(mensaje.value.fecha_e) !== ''" class="fecha">
                        <p>{{ mensaje.value.fecha_e }}</p>
                    </div>

                    <div v-if="mensaje.value.id_emisor != usuario._id" class="msj-me">
                        <img :src="mensaje.value.foto_emisor" alt="">
                        <div class="nodo">
                            <h3>{{ mensaje.value.nombre_emisor }}</h3>
                            <p>
                                {{ mensaje.value.mensaje }}
                            </p>
                            <span>{{ mensaje.value.hora }}</span>

                        </div>
                    </div>

                    <div v-else class="msj-you">
                        <div class="nodo">
                            <h3>{{ mensaje.value.nombre_emisor }}</h3>
                            <p>
                                {{ mensaje.value.mensaje }}
                            </p>
                            <span>{{ mensaje.value.hora }}</span>
                        </div>
                        <div class="float">
                            <img :src="mensaje.value.foto_emisor" alt="">
                            <font-awesome-icon @click="deleteMensaje(mensaje.id)" id="icon" icon="trash" />
                        </div>
                    </div>

                </div>
            </section>

            <section class="panel-inf">
                <input v-model="msj.mensaje" type="text" placeholder="Mensaje">
                <button @click="send">
                    <font-awesome-icon id="icon" icon="paper-plane" />
                </button>
            </section>
        </div>
    </div>
</template>

<style scoped>
.color1 {
    background-color: #0C1D25;
    height: 100vh;
}

.color2 {
    background-color: #EFEAE2;
    height: 100vh;
}

.nocturno {
    padding: 77px 0;
    background-color: #0C1D25;
}

.dia {
    padding: 77px 0;
    background-color: #EFEAE2;
}

.float {
    display: flex;
    flex-direction: column;
}

.fecha {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.nocturno .fecha p {
    background-color: #232D36;
    text-align: right;
    color: #7d7985;
    font-size: 13px;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 5px;
    border-radius: 10px;
}

.nocturno .panel-body {
    background-color: #0C1D25;
    width: 100%;
    padding: 5px 10px;
    overflow-y: hidden;
}

.messages-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    /* Alineamos los mensajes a la izquierda */
}

.msj-you,
.msj-me {
    display: flex;
}

.nocturno .msj-you #icon {
    color: #fa2e64;
    background-color: #232D36;
    border-radius: 100%;
    font-size: 16px;
    padding: 7px;
    margin-top: 10px;
    cursor: pointer;
}

.msj-you {
    width: 100%;
    justify-content: end;
}

.nocturno .msj-you span {
    width: 100%;
    text-align: right;
    color: #798185;
    font-size: 13px;
}

.nocturno .msj-me span {
    width: 100%;
    text-align: right;
    color: #e3eaee;
    font-size: 13px;
}

.nocturno .msj-me .nodo {
    display: flex;
    padding: 10px;
    max-width: 70%;
    margin-left: 9px;
    margin-right: 10px;
    background-color: #074b6f;
    border-radius: 10px;
    flex-direction: column;
    color: #7dade9;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.nocturno .msj-you .nodo {
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 7px;
    max-width: 70%;
    margin-right: 9px;
    margin-left: 20%;
    padding: 10px;
    background-color: #232D36;
    border-radius: 10px;
    color: #fa2e64;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.nocturno .panel-body .msj-me p {
    margin-top: 5px;
    font-size: 15px;
    color: #FEFDFC;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.nocturno .panel-body .msj-you p {
    margin-top: 5px;
    font-size: 15px;
    color: #FEFDFC;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.nocturno .panel-sup {
    width: 100%;
    height: 70px;
    background-color: #232D36;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
}

.nocturno .panel-inf {
    width: 100%;
    height: 65px;
    background-color: #0C1D25;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nocturno .panel-inf input {
    background-color: #232D36;
    width: 90%;
    padding: 15px 10px;
    border-radius: 30px;
    color: #FEFDFC;
    outline: 0;
    border: 0;
}

button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
}

.nocturno button:focus #icon {
    color: #01896B;
}

.nocturno .panel-sup #icon {
    font-size: 20px;
    font-weight: 300;
    color: #FEFDFC;
    padding: 15px;
    padding-right: 5px;
}

.nocturno .panel-inf #icon {
    font-size: 20px;
    font-weight: 300;
    color: #FEFDFC;
    padding: 5px;
}

.nocturno .panel-sup-name h3 {
    font-size: 17px;
    color: #FEFDFC;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-left: 10px;
    font-weight: 300;
}

.panel-sup img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
}

.panel-body img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    object-fit: cover;
}

.nocturno .panel-body::-webkit-scrollbar {
    width: 8px;
    background-color: #0C1D25;
}

.nocturno .panel-body::-webkit-scrollbar-thumb {
    background-color: #074b6f;
    /* Color de la barra en sí */
    border-radius: 10px;
    /* Borde redondeado */
}

.nocturno .panel-body::-webkit-scrollbar-thumb:hover {
    background-color: #074b6f;
    /* Color de la barra en sí al pasar el cursor sobre ella */
}

.dia .fecha p {
    background-color: #ffffff;
    text-align: right;
    color: #7d7985;
    font-size: 13px;

    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 5px;
    border-radius: 10px;
}

.dia .panel-body {
    background-color: #EFEAE2;
    width: 100%;
    padding: 7px;
    overflow-y: hidden;
    overflow-y: scroll;
}

.messages-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    /* Alineamos los mensajes a la izquierda */
}

.msj-you,
.msj-me {
    display: flex;
}

.dia .msj-you #icon {
    color: #074b6f;
    background-color: #fff;
    border-radius: 100%;
    font-size: 16px;
    padding: 7px;
    margin-top: 10px;
    cursor: pointer;
}

.msj-you {
    width: 100%;
    justify-content: end;
}

.dia .msj-you span {
    width: 100%;
    text-align: right;
    color: #798185;
    font-size: 13px;
}

.dia .msj-me span {
    width: 100%;
    text-align: right;
    color: #798185;
    font-size: 13px;
}

.dia .msj-me .nodo {
    display: flex;
    padding: 10px;
    max-width: 70%;
    margin-left: 9px;
    margin-right: 10px;
    background-color: #fff;
    border-radius: 10px;
    flex-direction: column;
    color: #074b6f;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dia .msj-you .nodo {
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 7px;
    max-width: 70%;
    margin-right: 9px;
    margin-left: 20%;
    padding: 10px;
    background-color: #d3f5fd;
    border-radius: 10px;
    color: #05beb1;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dia .panel-body .msj-me p {
    margin-top: 5px;
    font-size: 15px;
    color: #333;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dia .panel-body .msj-you p {
    margin-top: 5px;
    font-size: 15px;
    color: #232D36;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dia .panel-sup {
    width: 100%;
    height: 70px;
    background-color: #074b6f;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
}

.dia .panel-inf {
    width: 100%;
    height: 65px;
    background-color: #EFEAE2;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dia .panel-inf input {
    background-color: #FEFDFC;
    width: 90%;
    padding: 15px 10px;
    border-radius: 30px;
    color: #232D36;
    outline: 0;
    border: 0;
}

button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
}

.dia button:focus #icon {
    color: #01896B;
}

.dia .panel-sup #icon {
    font-size: 20px;
    font-weight: 300;
    color: #f6fbff;
    padding: 15px;
    padding-right: 5px;
}

.dia .panel-inf #icon {
    font-size: 20px;
    font-weight: 300;
    color: #074b6f;
    padding: 5px;
}

.dia .panel-sup-name h3 {
    font-size: 17px;
    color: #f6fbff;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-left: 10px;
    font-weight: 500;
}

.panel-sup img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
}

.panel-body img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    object-fit: cover;
}

.dia .panel-body::-webkit-scrollbar {
    width: 8px;
    /* Ancho de la barra */
    background-color: #fff;
    /* Color de fondo de la barra */
}

.dia .panel-body::-webkit-scrollbar-thumb {
    background-color: #074b6f;
    /* Color de la barra en sí */
    border-radius: 10px;
    /* Borde redondeado */
}

.dia .panel-body::-webkit-scrollbar-thumb:hover {
    background-color: #fff;
    /* Color de la barra en sí al pasar el cursor sobre ella */
}
</style>
