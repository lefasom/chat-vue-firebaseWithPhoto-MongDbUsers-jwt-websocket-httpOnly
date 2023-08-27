<template>
  <header>
      <router-link class="router" to="/">
            <h1>
                ch<font-awesome-icon id="icon" icon="comments" />tea
            </h1>
        </router-link>
      <SidebarMenu />
    </header>
</template>

<style scoped>

h1 {
  padding: 10px;
  font-size: 22px;
  color: #3192c7;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: start;
}




header {
  display: flex;
  justify-content: start;
}

 header .router {
  margin-top: 5px;
  font-size: 22px;
  color: #FEFDFC;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-decoration: none;
}

</style>
<script>
import SidebarMenu from "./SidebarMenu.vue";

export default {
  name: 'LogoAndMenu',

  components: {
    SidebarMenu,
  },

  setup() {

    return {
    }
  }
}
</script>