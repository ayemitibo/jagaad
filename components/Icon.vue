
<script>
export default {
  props: {
    // Name of the icon, must be name of a svg file that exists in assets/icons directory
    // or sub directories
    name: { type: String, default: null },
  },
  computed: {
    iconName() {
      return this.name;
    },

    raw() {
      return this.iconName ? this.getRawIcon(this.iconName) : null;
    },

    attrs() {
      const output = {};

      if (this.raw) {
        const attributes = Array.from(this.raw.attributes);
        for (const attr of attributes) {
          output[attr.name] = attr.value;
        }
      }

      return output;
    },

    content() {
      let content = this.raw ? this.raw.innerHTML : "";

      for (const key in this.replace) {
        content = content.replace(
          new RegExp(`\\[\\[${key}\\]\\]`, "gm"),
          this.replace[key]
        );
      }

      return content;
    },
  },
  methods: {
    getRawIcon(iconName) {
      let raw = null;
      try {
        raw = require(`~/assets/svg/${iconName}.svg?raw`);
      } catch (e) {
        return raw;
      }

      const $div = document.createElement("div");
      $div.innerHTML = raw;

      const $raw = $div.firstElementChild;

      if ($raw.getAttribute("fill") !== "none") {
        $raw.setAttribute("fill", "currentColor");
      }

      $raw.classList.remove(...$raw.classList);
      $raw.classList.add("base-icon", `icon-${iconName}`);
      $raw.style.cssText = "";

      for (const child of Array.from($raw.children)) {
        const tagName = child.tagName ? child.tagName.toLowerCase() : null;
        if (tagName === "title" || tagName === "desc") {
          $raw.removeChild(child);
        }
      }

      return $raw;
    },
  },
  render(h) {
    return h("svg", {
      class: this.raw ? [...this.raw.classList] : [],
      attrs: this.attrs,
      on: this.$listeners,
      domProps: {
        innerHTML: this.content,
      },
    });
  },
};
</script>

<style lang="scss">
.base-icon {
  width: 1em;
  height: 1em;
  display: inline;
  transition: none;
  vertical-align: middle;
  user-select: none;
}
</style>
