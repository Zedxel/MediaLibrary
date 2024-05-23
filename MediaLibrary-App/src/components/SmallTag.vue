<template>
    <div v-if="validTag">
        <q-badge rounded :color="tagReference?.displayColour" >{{ tagReference?.text != null ? tagReference?.text: '' }}
            <div v-for="val in tag?.children" :key="val.primaryTagId">
                <small-tag :tag="val" :depth="depth != null ? depth + 1 : 0"></small-tag>
            </div>
        </q-badge>
    </div>
</template>

<script setup lang="ts">
import { Tag, TagChain, TagLibrary } from './models';
import { ref } from 'vue'

const props = defineProps(
{
    tag: (TagChain),
    depth: Number,
})

const validTag = ref(false);
const tagReference = ref(undefined as Tag|undefined);

if(!(tagReference.value instanceof Tag)){
    if(props.tag?.primaryTagId != undefined)
    {
        tagReference.value = TagLibrary.Storage[props.tag?.primaryTagId]    
        validTag.value = true;
    }
}

</script>