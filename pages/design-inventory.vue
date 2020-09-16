<script>
  export default {
    data () {
      return {
        sizes: ['mouse', 'rat', 'cat', 'dog', 'pony', 'horse'],
        types: ['default', 'title', 'title--page', 'title--hero', 'lead'],
      };
    },
    methods: {
      exampleImage(id, title, width = 1600, height = 900) {
        return {
          width,
          height,
          mimeType: 'image/jpg',
          title: title,
          alt: title,
          src: `https://picsum.photos/id/${id}/${width}/${height}.jpg`,
          srcset: `https://picsum.photos/id/${id}/${width*0.25}/${height*0.25}.jpg ${width*0.25}w, https://picsum.photos/id/${id}/${width*0.5}/${height*0.5}.jpg ${width*0.5}w, https://picsum.photos/id/${id}/${width*0.75}/${height*0.75}.jpg ${width*0.75}w, https://picsum.photos/id/${id}/${width}/${height}.jpg ${width}w`,
          webpSrcset: `https://picsum.photos/id/${id}/${width*0.25}/${height*0.25}.webp ${width*0.25}w, https://picsum.photos/id/${id}/${width*0.5}/${height*0.5}.webp ${width*0.5}w, https://picsum.photos/id/${id}/${width*0.75}/${height*0.75}.webp ${width*0.75}w, https://picsum.photos/id/${id}/${width}/${height}.webp ${width}w`,
        }
      }
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

    <h2 class="l-design-width t-title t-title--page t-title--inventory">Image-Block</h2>
    <ImageBlock
      :title="'Vision.'"
      :images="[
        exampleImage(1038, 'kitten'),
      ]"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'Evaluationsphase.'"
      :images="[
        exampleImage(1038, 'kitten'),
      ]"
      :image-position="'right'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'360° Panorama.'"
      :images="[
        exampleImage(1019, 'sky'),
      ]"
      :image-position="'top'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'Kollaborative Plattform.'"
      :images="[
        exampleImage(1021, 'people'),
      ]"
      :image-position="'background'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <h2 class="l-design-width t-title t-title--page t-title--inventory">Image-Block Gallery</h2>
    <ImageBlock
      :title="'Vision.'"
      :images="[
        exampleImage(1042, 'people', 700, 438),
        exampleImage(1047, 'people', 700, 438),
        exampleImage(1052, 'people', 700, 438),
        exampleImage(153, 'people', 700, 438),
      ]"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'Evaluationsphase.'"
      :images="[
        exampleImage(1053, 'people', 700, 438),
        exampleImage(1060, 'people', 700, 438),
        exampleImage(1063, 'people', 700, 438),
        exampleImage(1069, 'people', 700, 438),
      ]"
      :image-position="'right'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'360° Panorama.'"
      :images="[
        exampleImage(1053, 'people', 1250, 500),
        exampleImage(1060, 'people', 1250, 500),
      ]"
      :image-position="'top'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>

    <ImageBlock
      :title="'Kollaborative Plattform.'"
      :images="[
        exampleImage(1021, 'people', 1440, 1000),
        exampleImage(1022, 'people', 1440, 1000),
        exampleImage(1044, 'people', 1440, 1000),
        exampleImage(1064, 'people', 1440, 1000),
        exampleImage(999, 'people', 1440, 1000),
      ]"
      :image-position="'background'"
    >
      <p>Im Bereich virtueller Realitäten können wir alles. Fast alles. Denn seit 20 Jahren wir sind der Schweizer Pionier für zukunftsweisende Visualisierungen, der Ihnen das bietet, worauf es ankommt: Ein breites Angebot. Und eine überragende Qualität.</p>
    </ImageBlock>


    <h2 class="l-design-width t-title t-title--page t-title--inventory">Inverted Section</h2>
    <div class="l-design-width c-design c-design--inverted">
      <h1>Some Inverted Text</h1>
      <p>Lorem Ipsum doror sit amet</p>
    </div>

    <h2 class="l-design-width t-title t-title--page t-title--inventory">Intro Section</h2>
    <intro
      :fields="{
        header: 'Virtuelle Vermarktung.',
        lead: 'Kunden fesseln, Begeisterung steigern und Begehrlichkeiten wecken: Wir lassen virtuelle Räume real werden. So schaffen wir einen Sense of Place, der Zukunft fassbar macht, und generieren ein Involvement, das Entscheidungsprozesse deutlich beschleunigt.',
        body: 'Für Sie heisst das: Mit unseren professionellen Lösungen, reduzieren Sie nicht nur Besuchstermine vor Ort und ermöglichen fundierte Beratungsgespräch schon am Computer. Sondern Sie profitieren auch von einem digitalen Auftritt, der heutigen Anforderungen optimal entspricht. Für eine professionelle Vermarktung. Und für bessere Erfolge.',
      }"
    />

    <h2 class="l-design-width t-title t-title--page t-title--inventory">Intro Section with List</h2>

    <intro
      :fields="{
        header: 'Virtual Real Estate.',
        lead: 'Den ganzen Immobilienzyklus digitalisieren: Das ist sinnvoll. Und jetzt auch machbar! Denn Raumgleiter bietet nun virtuelle Gesamtlösungen an, die alle Phasen kohärent zusammenbringen: Die Visionsentwicklung, die Vermarkung, die Bewirtschaftung und den Wiederkauf. ',
        body: 'Für Sie heisst das: Mit unseren professionellen Lösungen, reduzieren Sie nicht nur Besuchstermine vor Ort und ermöglichen fundierte Beratungsgespräch schon am Computer. Sondern Sie profitieren auch von einem digitalen Auftritt, der heutigen Anforderungen optimal entspricht. Für eine professionelle Vermarktung. Und für bessere Erfolge. ',
        offers: [
          {
            header: 'Unsere Leistungen.',
            services: [
              'Visionen zur Sensibilisierung der Öffentlichkeit',
              'Virtuelle Vermarktung',
              'Virtuelle Lösungen und Applikationen für die Bewirtschaftung',
              'Virtuelle Lösungen für den Wiederverkauf und -Vermietung',
            ],
          },
        ]
      }"
    />

    <h2 class="l-design-width t-title t-title--page t-title--inventory">Intro Section with List and CTA</h2>

    <intro
      :fields="{
        header: 'Virtual Real Estate.',
        lead: 'Den ganzen Immobilienzyklus digitalisieren: Das ist sinnvoll. Und jetzt auch machbar! Denn Raumgleiter bietet nun virtuelle Gesamtlösungen an, die alle Phasen kohärent zusammenbringen: Die Visionsentwicklung, die Vermarkung, die Bewirtschaftung und den Wiederkauf. ',
        body: 'Für Sie heisst das: Mit unseren professionellen Lösungen, reduzieren Sie nicht nur Besuchstermine vor Ort und ermöglichen fundierte Beratungsgespräch schon am Computer. Sondern Sie profitieren auch von einem digitalen Auftritt, der heutigen Anforderungen optimal entspricht. Für eine professionelle Vermarktung. Und für bessere Erfolge. ',
        offers: [
          {
            header: 'Unsere Leistungen.',
            services: [
              'Visionen zur Sensibilisierung der Öffentlichkeit',
              'Virtuelle Vermarktung',
              'Virtuelle Lösungen und Applikationen für die Bewirtschaftung',
              'Virtuelle Lösungen für den Wiederverkauf und -Vermietung',
            ],
          },
        ]
      }"
    >
      <calltoaction
        class="intro__cta"
        :fields="{
          icon: 'heart',
          header: 'In der Real Virtuality angekommen?',
          text: 'Dann freuen wir uns auf Ihre Kontaktaufnahme.',
          contactName: null,
          phone: '+41 044 202 70 80',
          email: 'realworld@raumgleiter.com',
        }"
      >
      </calltoaction>
    </intro>
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
