<script>
  export default {
    data () {
      return {
        sizes: ['mouse', 'rat', 'cat', 'dog', 'pony', 'horse'],
        types: ['default', 'title', 'title--page', 'title--hero', 'lead'],
      };
    },
  };
</script>

<template>
  <div>
    <div class="l-design-width">
      <h1 class="t-title t-title--hero">Design Inventroy</h1>
      <h2 class="t-title t-title--page t-title--inventory">Sizes</h2>
      <div class="sizes">
        <div class="size" v-for="(size, i) in sizes" :key="i" v-bind:style="{'--size': `var(--size-${size})`}"><span>{{size}}</span></div>
      </div>

      <h2 class="t-title t-title--page t-title--inventory">Typography</h2>
      <div class="typo">
        <span v-for="(typo, i) in types" :key="i" v-bind:class="`t-${typo}`">t-{{typo}}</span>
      </div>

      <h2 class="t-title t-title--page t-title--inventory">Grid</h2>
      <div class="l-grid">
        <div class="debug l-grid__cell l-grid__cell--1/2">
          <h3>Width 1/2</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/2">
          <h3>Width 1/2</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/3">
          <h3>Width 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>
        <div class="debug l-grid__cell l-grid__cell--1/4">
          <h3>Width 1/4</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/3 l-grid__cell--push--2/3">
          <h3>Width 1/3</h3>
          <h3>Pushed 2/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--push--1/2">
          <h3>Width 1/2</h3>
          <h3>Pushed 1/2</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--2/3 l-grid__cell--push--1/3">
          <h3>Width 2/3</h3>
          <h3>Pushed 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--push--1/4 l-grid__cell--pull--1/4">
          <h3>Width 2/3</h3>
          <h3>Pushed 1/3</h3>
        </div>

        <div class="debug l-grid__cell l-grid__cell--1/2 l-grid__cell--pull--1/2">
          <h3>Width 1/2</h3>
          <h3>Pulled 1/2</h3>
        </div>
      </div>
    </div>

    <h2 class="t-title t-title--page t-title--inventory">Inverted Section</h2>
    <div class="l-design-width c-design c-design--inverted">
      <h1>Some Inverted Text</h1>
      <p>Lorem Ipsum doror sit amet</p>
    </div>

    <h2 class="t-title t-title--page t-title--inventory">Intro Section</h2>
    <intro
      :title="'Virtuelle Vermarktung.'"
      :lead-text="'Kunden fesseln, Begeisterung steigern und Begehrlichkeiten wecken: Wir lassen virtuelle Räume real werden. So schaffen wir einen Sense of Place, der Zukunft fassbar macht, und generieren ein Involvement, das Entscheidungsprozesse deutlich beschleunigt.'"
      :text="'Für Sie heisst das: Mit unseren professionellen Lösungen, reduzieren Sie nicht nur Besuchstermine vor Ort und ermöglichen fundierte Beratungsgespräch schon am Computer. Sondern Sie profitieren auch von einem digitalen Auftritt, der heutigen Anforderungen optimal entspricht. Für eine professionelle Vermarktung. Und für bessere Erfolge.'"
    />

    <h2 class="t-title t-title--page t-title--inventory">Intro Section with List</h2>

    <intro
      :title="'Virtual Real Estate.'"
      :lead-text="'Den ganzen Immobilienzyklus digitalisieren: Das ist sinnvoll. Und jetzt auch machbar! Denn Raumgleiter bietet nun virtuelle Gesamtlösungen an, die alle Phasen kohärent zusammenbringen: Die Visionsentwicklung, die Vermarkung, die Bewirtschaftung und den Wiederkauf. '"
      :text="'Für Sie heisst das: Mit unseren professionellen Lösungen, reduzieren Sie nicht nur Besuchstermine vor Ort und ermöglichen fundierte Beratungsgespräch schon am Computer. Sondern Sie profitieren auch von einem digitalen Auftritt, der heutigen Anforderungen optimal entspricht. Für eine professionelle Vermarktung. Und für bessere Erfolge. '"
      :list-title="'Unsere Leistungen.'"
      :list="[
        'Visionen zur Sensibilisierung der Öffentlichkeit',
        'Virtuelle Vermarktung',
        'Virtuelle Lösungen und Applikationen für die Bewirtschaftung',
        'Virtuelle Lösungen für den Wiederverkauf und -Vermietung',
      ]"
    />
  </div>
</template>

<style lang="scss">
  .sizes {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .size {
    position: relative;
    width: var(--size);
    height: var(--size);
    background: turquoise;
    margin-right: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    span {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 1.5em);
    }
  }
  .typo {
    span {
      display: block;
    }
  }
  .debug {
    padding: 1rem;
    background: turquoise;
  }
  .t-title--inventory {
    margin: 2em 0 1em;
    color: #f04e45;
  }
</style>
