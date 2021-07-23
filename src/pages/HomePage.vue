<template>
  <div class=" text-light home flex-grow-1 d-flex flex-column justify-content-center">
    <div class="container-fluid">
      <div v-if="filteredResults?.length > 0" class="row">
        Filtered Array
        <div v-for="r in filteredResults" :key="r" class="col-3 img">
          {{ r }}
          <img class="img-fluid" :src="r" />
        </div>
      </div>
      <div v-else-if="filteredResults" class="row">
        Filtered
        {{ filteredResults }}
      </div>
      <div v-else class="row">
        RAW
        <pre class=" text-left">
        <code class="text-light bg-fade-dark rounded">
        {{ JSON.stringify(results, null, 2) }}
        </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { apiService } from '../services/AxiosService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    return {
      results: computed(() => AppState.results),
      filteredResults: computed(() => AppState.filteredResults)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
