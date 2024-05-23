<template>
  <q-page class="row items-center justify-evenly">
    <div class="tags">
      <q-input type="text" v-model="TagInputName" @update:modelValue="tagExists(TagInputName)">
        <template #append v-if="PreviousTag != undefined">
          <small-tag :tag="PreviousTag"></small-tag>
        </template>
      </q-input>
      <div v-for="val in TagList" :key="val.primaryTagId">
        <small-tag :tag="val" :depth=0></small-tag>
      </div>
      <div v-for="val in TagList2" :key="val.primaryTagId">
        <small-tag :tag="val" :depth=0></small-tag>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tag, TagChain, TagLibrary } from 'components/models';
import SmallTag from 'components/SmallTag.vue';

const TagList = ref([] as TagChain[]);
const TagList2 = ref([] as TagChain[]);
const TagInputName = ref('')
const PreviousTag = ref(undefined as (TagChain|undefined))



const temp = new Tag('a', 'Description', [], 'red', false, [], [new Tag('b', 'Description', [], 'o', false, [], []), new Tag('w', 'Description', [], 'blue', false, [], []), new Tag('s', 'Description', [], 'orange', false, [], []), new Tag('aoeu', 'Description', [], 'orange', false, [], []), new Tag('saoeu', 'Description', [], 'orange', false, [], [])]);
const text = new TagChain(temp.tagId, [new TagChain(temp.parentReccomendations[0], [new TagChain(temp.parentReccomendations[1], [])]),new TagChain(temp.parentReccomendations[1], []), new TagChain(temp.parentReccomendations[2], [])]);

TagList2.value = TagLibrary.getTagList().sort((a, b) => TagLibrary.sortTagFunction(a, b)).reverse();

TagList.value.push(text);

function tagExists(tempText: string){
  let b = TagLibrary.getTagByText(tempText);
  if(b != undefined){
    PreviousTag.value = undefined;
    PreviousTag.value = new TagChain(b, []);
    return;
  }
    PreviousTag.value = undefined;
}

// function printTags(baseTag:Tag): string {
//   var tags = [];
//   //var output: string = baseTag.text;
  
//   tags.push(
//   )

//   return 'NSUrteonstaus'+ baseTag.text;
// }

defineOptions({
  name: 'IndexPage'
});
</script>
