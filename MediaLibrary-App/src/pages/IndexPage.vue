<template>
  <q-page class="row items-center justify-evenly">
    {{ "temp" }}
  </q-page>
</template>

<script setup lang="ts">
//import { ref } from 'vue';
import { Tag } from 'components/models';


//const base = ref(null as null|Tag)

const temp = new Tag('Name', 'Description', [], 'red', false, [], [new Tag('Name1', 'Description', [], 'red', false, [], []), new Tag('Name2', 'Description', [], 'red', false, [], []), new Tag('Name3', 'Description', [], 'red', false, [], [])]);

 
console.log(temp);

// function printTags(baseTag:Tag): string {
//   var tags = [];
//   //var output: string = baseTag.text;
  
//   tags.push(
//   );
  
//   //Get All Children tags
  

//   return 'NSUrteonstaus'+ baseTag.text;
// }

defineOptions({
  name: 'IndexPage'
});
</script>
