<template>
  <div id="app">
    <ewFamilyTree :treeData="getTreeData" />
  </div>
</template>

<script>
import ewFamilyTree from './components/ewFamilyTree.vue';
import { testData } from './data'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  computed: {
    getTreeData() {
      return testData.object;
    }
  },
  components: {
    ewFamilyTree
  }
}
</script>

<style></style>
