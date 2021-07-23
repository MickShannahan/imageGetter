<template>
  <main>
    <router-view />
  </main>
  <footer class="container-fluid sticky-footer">
    <div class=" row bg-fade-light text-light text-center align-items-center p-4">
      <input v-model="state.url" class=" col-10 form-control bg-fade-dark rounded-pill sq-right" type="text" placeholder="Enter api url">
      <button @click="getImages" class="btn rounded-pill bg-fade-dark btn-dark col-2 sq-left h-50">
        Go
      </button>
      <input v-model="state.selector" @blur="select" class="col-12 form-control bg-fade-dark rounded-pill" type="text" placeholder="Enter propery on object to display">
    </div>
  </footer>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
import { apiService } from './services/AxiosService'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      url: '',
      selector: ''
    })
    return {
      state,
      appState: computed(() => AppState),
      getImages() {
        apiService.getImages(state.url)
      },
      select() {
        apiService.select(state.selector)
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bg-fade-light{
  background: rgba(255, 255, 255, 0.267);
  backdrop-filter: blur(5px);
}
.bg-fade-dark{
  background: rgba(20, 20, 20, 0.5);
  color:whitesmoke
}

main{
  padding-bottom: 12vh;
}

.sticky-footer{
  position: fixed;
  bottom: 0;
}

.form-control:focus{
  background: rgba(20, 20, 20, 0.801);
}

.sq-right{
  border-top-right-radius: 2px !important;
  border-bottom-right-radius: 2px!important;
}

.sq-left{
  border-top-left-radius: 2px!important;
  border-bottom-left-radius: 2px!important;
}

html {
  --scrollbarBG: #cfd8dc00;
  --thumbBG: #90a4aec4;
}
body::-webkit-scrollbar {
  position: fixed;
  width: 11px;
}
body {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
body::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
body::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}

</style>
