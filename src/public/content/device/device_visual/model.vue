<template>
  <div style="height: 600px; width: 100%">
    <model-obj :src="src3" :mtl="mtl3" background-color="#1B232F"></model-obj>
  </div>
</template>

<script>
  import { ModelObj } from 'vue-3d-model'
  // import src3 from 'static/motor.obj'
  // import mtl3 from 'static/motor.mtl'
  export default {
    name: 'model',
    data() {
      return {
        src1: '../static/motor_demo.obj',
        src2: '../static/1225.obj',
        src3: '../static/motor.obj',
        mtl3: '../static/motor.mtl',
      }
    },
    components: {
      ModelObj,
    }
  }
</script>

<style scoped>

</style>