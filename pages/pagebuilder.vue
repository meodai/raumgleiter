<script>
import pageQuery from '../api/page'
import collect from "collect.js";
import gql from 'graphql-tag'


export default {
  async asyncData ({ $craft, $http }) {
    // Fetching the data from the cms here
    // const allPages = collect(await $axios.$get('/pages.json').then(data => data.data))
    // .groupBy('lang').all();

    // const page = await $craft({ query: `{ping}`})
    // console.log(await $http.$post('http://raumgleiter-cms.valet/api'))
    console.log(await $craft({ query: pageQuery }))

    // console.log(pageQuery);

    return {  };
  },
}
</script>

<template>
  <div>
    hoi
  </div>
</template>
