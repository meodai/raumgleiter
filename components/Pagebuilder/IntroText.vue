<script>
export default {
    props: {
        fields: {
            type: Object,
            required: true,
        },
    },
};
</script>

<template>
    <div>
        <h1>{{ fields.header }}</h1>
    </div>
</template>
