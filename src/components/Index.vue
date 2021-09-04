<template>
  <div class="hello">
    hihihi, this is the index page, rendered a imported page as below:  <br/>
    <Draw :box_list="box_list" ord=3 :refresh=refresh></Draw>
  </div>
</template>

<script>
import Draw from '@/components/Draw'
export default {
  data () {
    return {
      box_list: [ {x: 1, y: 1} ],
      refresh: 1
    }
  },
  components: {
    Draw
  }
}
</script>

