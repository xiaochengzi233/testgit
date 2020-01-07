<template>
  <div style="height: 400px; width: 600px">
    <model-obj :src="src3" :mtl="mtl3"></model-obj>
  </div>
</template>

<script>
  import { ModelObj } from 'vue-3d-model'
  // import motor_demo from '../assets/motor_demo.obj'

  export default {
    name: 'test_model',
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
      // motor_demo
    }
  }
</script>

<style scoped>

</style>