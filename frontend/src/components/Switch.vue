<template>
    <div :class="modo?'container-s':'container-ss'">
        <div class="btn-s"><section></section></div>
    </div>
</template>
<style scoped>
.container-s{
    border: 1px solid #4083a3;
    height: 16px;
    width: 25px;
    border-radius: 10px;
    box-shadow: .6px 0px 2px 1px #3192c770;
    display: flex;
    align-items: center;
}
.container-ss{
    border: 1px solid #4083a3;
    height: 16px;
    width: 25px;
    border-radius: 10px;
    box-shadow: .6px 0px 2px 1px #3192c770;
    display: flex;
    align-items: center;

}
.container-ss .btn-s{
    background-color: #3192c7;
    box-shadow: .6px 0px 2px 1px #3192c770;
    height: 11px;
    width: 11px;
    border-radius: 100%;
    margin-left: 11px;
}
.container-s .btn-s{
    background-color: #3192c7;
    box-shadow: .6px 0px 2px 1px #3192c770;
    height: 11px;
    width: 11px;
    border-radius: 100%;
    margin-left: 1px;


}
</style>
<script>
export default {
    name: 'Switch',
  props: ['modo']  // Definimos las props que recibirá el componente
}
</script>