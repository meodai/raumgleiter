<script>
import FilterButton from './FilterButton';

export default {
  components: {
    FilterButton,
  },
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <template v-for="(group, groupName) in categories">
      <h3>{{ $t(groupName) }}</h3>
      <ul>
        <li v-for="category in group">
          <FilterButton :category="category"/>
        </li>
      </ul>
      <hr>
    </template>
  </div>
</template>
