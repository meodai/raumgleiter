<script>
export default {
    props: {
        blocks: {
            type: Array,
            required: true,
        },
    },
}
</script>

<template>
    <div>
        <component
            v-for="(block, index) in blocks"
            :key="'block'+index"
            :is="block.type"
            :fields="block.fields"
        />
    </div>
</template>
