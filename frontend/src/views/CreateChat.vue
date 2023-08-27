<template>
    <div :class="modoNocturno ? 'container' : 'container2'">

        <LogoAndMenu />
        <div class="form-unirse">
            <label for="">Identifica tu chat</label>
            <input type="text" placeholder="Abre hilo, nombra un grupo, etc">
            <label for=""></label>
            <input type="text" placeholder="Contraseña opcional">
            <div>
                <button>
                    Crear
                </button>
            </div>

        </div>
    </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex';

import LogoAndMenu from "../components/LogoAndMenu.vue";
export default {
    name: 'crear',

    components: {
        LogoAndMenu,
    },

    setup() {
        const store = useStore();
        const modoNocturno = computed(() => store.state.modoNocturno);

        return {
            modoNocturno
        }
    }
}
</script>
<style scoped>
h1 {
    padding: 10px;
    margin-top: 5px;
    font-size: 22px;
    color: #3192c7;
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
.form-unirse {
    background-color: transparent;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border-radius: 10px;
    width: 80%;
    height: 130px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 30%;
}


label {
    display: block;
    font-size: 15px;
    margin: 5px 0;
    color: #3192c7;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: start;
}

.container .form-unirse input[type="text"] {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #999;
    outline-color: #f8fdff;
    background-color: transparent;
    color: #FEFDFC;

}
.container2 .form-unirse input[type="text"] {
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #999;
    outline-color: #0C1D25;
    background-color: transparent;
    color: #0C1D25;

}
.form-unirse button {
    background-color: transparent;
    color: #3192c7;
    padding: 10px 20px;
    border: 1px solid #3192c7;
    border-radius: 5px;
    cursor: pointer;
    margin: 14px;
    margin-left: 0px;
}
</style>