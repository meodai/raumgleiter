<script>
  export default {
    data () {
      return {
        isSuscribed: false,
        isSuscribing: false,
        isInvalid: false,
        hide: false,
      };
    },
    computed: {
      footer () {
        return this.footerByLocale && this.footerByLocale[this.$i18n.locale] ? this.footerByLocale[this.$i18n.locale] : null;
      },
      mainSections () {
        return this.$store.getters.getMainSections;
      },
      asideSections () {
        return this.$store.getters.getAsideSections;
      },
      footerByLocale () {
        return this.$store.state.footerByLocale;
      },
    },
    beforeDestroy () {
      clearTimeout(this.timer);
      if (this.hide) {
        this.enemies.forEach((el) => {
          this.$refs.root.removeChild(el.$el);
        });
        this.$refs.roott.removeChild(this.player);
        this.hide = false;
      }
    },
    methods: {
      boom (x, y) {
        const prefixes = ['webkit', 'moz', 'ms', ''];

        function prefixedEvent (element, type, callback) {
          for (let p = 0; p < prefixes.length; p++) {
            if (!prefixes[p]) {
              type = type.toLowerCase();
            }
            element.addEventListener(prefixes[p] + type, callback, false);
          }
        }

        function transform ($e, x, y, scale, rotation, percent) {
          x = x || 0; y = y || 0; scale = scale || 1;
          const unit = percent ? '%' : 'px';
          rotation = rotation || 0;

          const transfromString = 'translate(' + x + unit + ', ' + y + unit + ') ' +
            'scale(' + scale + ') ' +
            'rotate(' + rotation + 'deg)';

          $e.style.webkitTransform = transfromString;
          $e.style.MozTransform = transfromString;
          $e.style.transform = transfromString;
        }

        function createParticle (x, y, scale) {
          const $particle = document.createElement('i');
          const $sparcle = document.createElement('i');

          $particle.className = 'particle';
          $sparcle.className = 'sparcle';

          transform($particle, x, y, scale);
          $particle.appendChild($sparcle);

          return $particle;
        }

        function explode ($container) {
          const particles = [];

          particles.push(createParticle(0, 0, 1.2));
          particles.push(createParticle(50, -15, 0.4));
          particles.push(createParticle(50, -105, 0.2));
          particles.push(createParticle(-10, -60, 0.8));
          particles.push(createParticle(-10, 60, 0.4));
          particles.push(createParticle(-50, -60, 0.2));
          particles.push(createParticle(-50, -15, 0.75));
          particles.push(createParticle(-100, -15, 0.4));
          particles.push(createParticle(-100, -15, 0.2));
          particles.push(createParticle(-100, -115, 0.2));
          particles.push(createParticle(80, -15, 0.1));

          particles.forEach((particle) => {
            $container.appendChild(particle);
            prefixedEvent(particle, 'AnimationEnd', function () {
              setTimeout(() => {
                requestAnimationFrame(() => {
                  $container.removeChild(this);
                });
              }, 100);
            });
          });
        }

        function exolpodeGroup (x, y, trans) {
          const $container = document.createElement('div');

          $container.className = 'boom';
          $container.style.top = y + 'px';
          $container.style.left = x + 'px';

          transform($container, trans.x, trans.y, trans.scale, trans.r, true);

          explode($container);

          return $container;
        }

        const sparcle = () => {
          const explosions = [];

          explosions.push(exolpodeGroup(x, y, { scale: 1, x: -50, y: -50, r: 0 }));
          explosions.push(exolpodeGroup(x, y, { scale: 0.5, x: -30, y: -50, r: 180 }));
          explosions.push(exolpodeGroup(x, y, { scale: 0.5, x: -50, y: -20, r: -90 }));

          const audio = new Audio('/boom.mp3');
          audio.play();

          requestAnimationFrame(() => {
            explosions.forEach((boum, i) => {
              setTimeout(() => {
                this.$refs.root.appendChild(boum);
              }, i * 100);
            });
          });
        };

        sparcle();
      },
      place () {
        this.hide = true;

        const els = Array.from(this.$refs.root.querySelectorAll('[data-i], [data-ic] > *'));
        const rootRect = this.$refs.root.getBoundingClientRect();

        this.enemies = els.map(($el) => {
          const rect = $el.getBoundingClientRect();

          return {
            $el: $el.cloneNode(true),
            top: rect.top - rootRect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };
        }).sort((el, el2) => el2.top - el.top);

        this.enemies.forEach((el) => {
          el.$el.style = `
            position: absolute;
            left: ${el.left}px;
            top: ${el.top}px;
            width: ${el.width}px;
            height: ${el.height}px;
            list-style: none;
          `;

          this.$refs.root.appendChild(el.$el);
        });

        const p = this.$refs.root.querySelector('[data-p]');
        const prect = p.getBoundingClientRect();

        const player = {
          $el: p.cloneNode(true),
          top: prect.top - rootRect.top,
          left: prect.left,
          width: prect.width,
          height: prect.height,
        };

        this.player = player;

        let x = 0;

        const placePlayer = () => {
          player.$el.style = `
            position: absolute;
            left: ${player.left}px;
            top: ${player.top}px;
            width: ${prect.width}px;
            height: ${prect.height}px;
            margin: 0;
          `;
        };

        placePlayer();

        this.$refs.root.appendChild(player.$el);

        p.style = 'opacity: 0; pointer-events: none;';

        let shoot = false;

        const logKey = (e) => {
          if (e.code === 'ArrowLeft') {
            x -= player.width * 0.2;
          } else if (e.code === 'ArrowRight') {
            x += player.width * 0.2;
          } else if (e.code === 'Space') {
            shoot = true;
          }
        };

        document.addEventListener('keydown', logKey);

        const isColliding = (rect1, rect2) => {
          if (rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left /* &&
            rect1.top < rect2.top + rect2.height &&
            rect1.top + rect1.height > rect2.top */
          ) {
            return true;
          } else {
            return false;
          }
        };

        const shootNow = (from, to, callBack) => {
          const $shot = document.createElement('div');

          $shot.style = `
            position: absolute;
            left: ${from.left + from.width * 0.5 - 3}px;
            top: ${from.top}px;
            height: ${from.height}px;
            width: 6px;
            background: hotpink;
            z-index: 100;
            transform: scaleY(.2);
            transform-origin: 0 100%;
          `;

          this.$refs.root.appendChild($shot);
          const dist = to.top - from.top;

          this.$nextTick(() => {
            gsap.to($shot, 0.5, {
              y: dist,
              scaleY: 1,
              ease: 'power4.in',

              onComplete: () => {
                this.$refs.root.removeChild($shot);
                if (callBack) {
                  callBack();
                };
              },
            });
          });
        };

        const loop = () => {
          if (x) {
            player.left += x;
            placePlayer();
            x = 0;
          }

          if (shoot) {
            const found = this.enemies.find((enemy, i) => {
              if (isColliding(enemy, player)) {
                this.enemies.splice(i, 1);
                shootNow(player, enemy, () => {
                  this.$refs.root.removeChild(enemy.$el);
                  this.boom(
                    enemy.left + enemy.width * 0.5,
                    enemy.top + enemy.height * 0.5,
                  );
                });
                return true;
              }
            });

            if (!found) {
              shootNow(player, { top: 0, height: 0 });
            }

            shoot = false;
          }

          this.hide && requestAnimationFrame(loop);
        };

        loop();
      },
      start () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }

        if (process.client && !this.hide) {
          this.place();
        }
      },
      subscribe () {
        if (!this.$refs.input.validity.valid) {
          this.setInvalid();
        } else {
          this.isSuscribing = true;
          // this.$refs.newsletterForm.submit();
          this.timer = setTimeout(() => {
            this.isSuscribing = false;
            this.$refs.input.value = '';
          }, 2000);
        }
      },
      setInvalid () {
        this.isInvalid = true;
        this.timer = setTimeout(() => {
          this.isInvalid = false;
        }, 2000);
      },
      getSwitchLocalePath (localeCode) {
        if (this.$route.name.startsWith('projects-slug') && !this.$store.state.i18n.routeParams[localeCode]) {
          return this.localePath('projects', localeCode);
        }
        return this.switchLocalePath(localeCode);
      },
    },
  };
</script>

<template>
  <div
    v-if="footer"
    ref="root"
    class="footer"
    :class="{'playfield': hide}"
  >
    <div class="footer__inner" :class="{'footer__inner--hide': hide}">
      <nuxt-link
        class="footer__logo-link footer__col"
        data-i
        to="/#"
      >
        <Logo class="footer__logo" />
        <span class="sr-only">Raumgleiter</span>
      </nuxt-link>

      <div class="footer__col footer__col--address">
        <address
          data-ic
          :aria-label="$t('address')"
          class="footer__address"
          v-html="footer.address"
        />
        <ul class="footer__social">
          <li
            v-for="(link, index) in footer.socialLinks"
            :key="'footer-social-'+index"
          >
            <a
              :href="link.url"
              rel="noopener nofollow"
              data-i
            >
              <span class="sr-only">{{ link.type }}</span>
              <Icon
                class="footer__socialIcon"
                :name="link.type"
                :is-block="true"
              />
            </a>
          </li>
        </ul>
      </div>

      <article class="footer__newsletter footer__col">
        <h4 data-i>
          {{ footer.newsletterLabel }}
        </h4>
        <form
          ref="newsletterForm"
          class="footer__form"
          action="https://raumgleiter.us3.list-manage.com/subscribe/post"
          method="post"
          data-i
          :class="{
            'footer__form--subscribed': isSuscribed,
            'footer__form--subscribing': isSuscribing,
            'footer__form--invalid': isInvalid,
          }"
        >
          <input type="hidden" name="u" value="b9d5ffac0197f1e308e810c0a">
          <input type="hidden" name="id" value="c00e021b7f">
          <div class="field-shift" aria-label="Please leave the following three fields empty">
            <label for="b_name">Name: </label>
            <input type="text" name="b_name" tabindex="-1" value="" placeholder="Freddie" id="b_name">

            <label for="b_email">Email: </label>
            <input type="email" name="b_email" tabindex="-1" value="" placeholder="youremail@gmail.com" id="b_email">

            <label for="b_comment">Comment: </label>
            <textarea name="b_comment" tabindex="-1" placeholder="Please comment" id="b_comment"></textarea>
          </div>
          <label for="MERGE0" :aria-label="$t('email')"></label>
          <input
            id="MERGE0"
            ref="input"
            :disabled="isSuscribed || isSuscribing"
            type="email"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
            name="MERGE0"
            :placeholder="$t('email')"
            required="required"
          >
          <button class="footer__button" type="submit">
            <span>{{ $t('subscribe') }}</span>
          </button>
          <input
            type="hidden"
            name="ht"
            value="fe961cb12891b7ea0fbe0c4edead447eaf71e18d:MTYwNTE3MjY3NS42Mjg3"
          >
          <input
            type="hidden"
            name="mc_signupsource"
            value="hosted"
          >
        </form>
      </article>
      <ul class="footer__nav footer__col">
        <li
          v-for="(section, key) in mainSections"
          :key="'footer-main-links-'+key"
          data-i
        >
          <nuxt-link :to="localePath(section.path)" @click.native="$scrollToTop">
            {{ section.title }}
          </nuxt-link>
        </li>
      </ul>
      <ul class="footer__nav footer__nav--second footer__col">
        <li
          v-for="(section, index) in asideSections"
          :key="'footer-aside-links-'+index"
          data-i
          :class="{ 'footer__navgap': index === 0 }"
        >
          <nuxt-link :to="localePath(section.path)" @click.native="$scrollToTop">
            {{ section.title }}
          </nuxt-link>
        </li>
      </ul>
      <ul
        :aria-label="$t('language')"
        class="footer__lang footer__col"
        role="listbox"
      >
        <li
          v-for="locale in $i18n.locales"
          :key="locale.code"
          data-i
        >
          <nuxt-link
            :aria-selected="locale.code === $i18n.locale"
            :aria-label="locale.name"
            :to="getSwitchLocalePath(locale.code)"
            :hreflang="$i18n.locale"
            role="option"
            @click.native="$scrollToTop"
          >
            {{ locale.code.toUpperCase().charAt(0) }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <a
      class="footer__logo-bottomlink"
      href="#"
      @click.prevent="start"
    >
      <Icon
        data-p
        :name="'raumgleiter_symbol'"
        :is-block="true"
        class="footer__logoicon"
      />
      <span class="sr-only">Do not click!</span>
    </a>
  </div>
</template>

<style lang="scss">
  .clickme {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: .75rem;
  }
  .footer {
    position: relative;
    z-index: 1;
    --size-footer-stack: 0.4em;
    font-size: 1.6rem;

    background-color: var(--color-layout--background-inverted);
    color: var(--color-text--inverted);
    overflow: hidden;

    path {
      fill: var(--color-text--inverted);
    }

    @include bp('phone') {
      font-size: 2.2rem;
      text-align: center;
    }
  }

  .footer__inner {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: var(--size-rat);

    @include bp('phone') {
      flex-direction: column;
      padding: var(--size-design-bezel);
    }
  }

  .footer__inner--hide {
    opacity: 0;
    pointer-events: none;
  }

  .footer__col {
    padding-right: 5%;
    flex: 1 1 20%;

    &:last-child {
      flex: 1 0 1px;
      padding-right: 0;
    }
  }

  .footer__logo {
    width: 16rem;
    order: 1;
  }

  .footer__newsletter {
    @include bp('phone') {
      margin-top: var(--size-design-bezel);
      order: 2;
    }
  }

  .footer__col--address {
    text-align: left;
    @include bp('phone') {
      order: 3;
      margin-top: var(--size-design-bezel);
    }
  }

  .footer__logo-link {
    flex: 1 0 1px;
  }

  .footer__address {
    font-style: normal;
    margin-bottom: var(--size-mouse);

    @include bp('phone') {
      margin-top: var(--size-rat);
    }
  }

  .footer__address > * {
    display: block;

    @include typo('nobreak');
  }
  .footer__nav {
    @include bp('tablet') {
      display: none;
    }
  }
  .footer__address a,
  .footer__nav a {
    display: block;
    padding-top: var(--size-footer-stack);
  }

  .footer__address li:first-child a,
  .footer__nav li:first-child a {
    padding-top: 0;
  }

  .footer__nav--second {
    flex-shrink: 1;
    flex-basis: auto;
  }

  .footer__form {
    position: relative;
    margin-top: calc(2 * var(--size-footer-stack));
    margin-right: -0.75rem;
    margin-left: -0.75rem;

    input, button {
      font-size: 1.4rem;
      padding: .2em .75em .3em;
      border-radius: 2em;
      appearance: none;

      @include bp('phone') {
        font-size: 2rem;
        padding: .5em .75em .6em;
        //border-radius: 0;
      }
    }

    button {
      line-height: 1;
      min-width: calc(9ch + 1.5rem);
      transition: 400ms min-width cubic-bezier(0.7, 0.3, 0 ,1);
    }

    input {
      display: block;
      width: 100%;
      background: rgba(#7f7f7f, .5);
      padding-right: 8.5rem;
      outline: none;

      &:disabled {
        color: rgba(#fff, .5);
      }

      &:focus {
        box-shadow: 0 0 0 2px #fff;
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(#7f7f7f, .75);
    }

    &--subscribing,
    &--subscribed {
      button {
        min-width: calc(1ch + 1.5rem);

        span {
          display: none;
        }

        &::after {
          position: absolute;
          content: "◌";
          font-size: 3.3rem;
          line-height: 0.5;
          padding-bottom: .39ex;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: 2s spin infinite linear;
        }
      }
    }

    &--subscribed button::after {
      content: "✓";
      font-size: 1.5rem;
      padding-bottom: 0;
      animation: none;
    }

    &--invalid {
      input {
        color: red;
      }
      animation: 500ms twerk cubic-bezier(.3,.7,0,1.5) both;
    }
  }

  @keyframes twerk {
    10%, 90% {
      transform: translate3d(2px,0, 0) rotate(-.2deg);
      transform-origin: 100% 50%;
    }

    20%, 80% {
      transform: translate3d(2px,0, 0) rotate(.2deg);
      transform-origin: -50% 50%;
    }

    30%, 50%, 70% {
      transform: translate3d(-2px,0, 0) rotate(-.2deg);
      transform-origin: 100% 50%;
    }

    40%, 60% {
      transform: translate3d(3px, 0, 0) rotate(.2deg);
      transform-origin: -50% 50%;
    }
  }

  @keyframes spin {
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .footer__lang {

    @include bp('tablet') {
      display: block;
      position: absolute;
      top: var(--size-rat);
      right: var(--size-rat);
    }

    @include bp('phone') {
      top: auto;
      bottom: var(--size-design-bezel);
      right: var(--size-design-bezel);
      margin-bottom: var(--size-mouse);
    }

    display: flex;

    a {
      padding: 0.5em;

      &[aria-selected] {
        font-weight: bold;
      }
    }
  }
  .footer__socialIcon {
    width: 2.6rem;
    height: 2.6rem;

    --color-icon-contrast: var(--color-layout--background-inverted);
  }
  .footer__social {
    > * {
      display: inline-block;
      margin-right: 0.5em;
    }

    @include bp('phone') {
      margin-bottom: var(--size-mouse);
    }
  }

  .footer__logo-bottomlink {
    display: block;
    width: 4rem;
    height: 4rem;
    margin: var(--size-gutter) auto;
  }
  .footer__logoicon {
    width: 100%;
    height: 100%;
  }

  .field-shift {
    left: -9999px; position: absolute;
  }

  // don't ask any question
  .boom {
    position: absolute;
    width: 20rem; height: 20rem;
    transform: translate(-50%,-50%);
    pointer-events: none;

    &:before {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      display: block;
      width: 2rem; height: 2rem;
      background: rgba(#fff,.05);
      transform: rotate(45deg);
      outline: 10px solid rgba(#fff,.04);
    }
  }

  .particle {
    position: absolute;
    display: block;
    top: 50%; left: 50%;
    width: 0; height: 0;

    @for $i from 0 through 20 {
      &:nth-child(#{$i + 1}) {
        .sparcle {
          animation-delay: $i * 50ms;
        }
      }
    }
  }

  $white: #e4f9fa;
  $yellow: #fde655;
  $orange: #d47946;
  $red: #7a2c1f;

  .sparcle {
    position: absolute;
    display: block;
    top: 0; left: 0;
    width: 3rem; height: 3rem;
    background: rgba($white,0);
    transform: rotate(45deg) scale(0.2) translateZ(0);
    animation: explode 333ms;

    box-shadow: 0 0 0 0 $yellow;
  }

  @keyframes explode {
    0% {
      background-color: $white;
      transform: rotate(45deg) scale(1.2) translateZ(0);
      box-shadow: 0 0 0 0 $yellow;
    }
    40% {
      background-color: rgba($white,.1);
    }
    50% {
      transform: rotate(45deg) scale(1) translateZ(0);
      box-shadow: 0 0 0 10px $yellow;
      background-color: rgba($white,0);
    }
    60% {
      box-shadow: 0 0 0 50px $orange;
      transform: rotate(45deg) scale(0.5) translateZ(0);
    }
    70% {
      background-color: rgba($white,0);
      box-shadow: 0 0 0 30px $red;
    }
    100% {
      background-color: $red;
      box-shadow: 0 0 0 0 $red;
      transform: rotate(45deg) scale(0.25) translateZ(0);
    }
  }

  .playfield::after {
    overflow: visible;
    font-size: 1.4rem;
    font-family: monospace;
    content: '[ move: ← arrow keys → | space: shoot ]';
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
