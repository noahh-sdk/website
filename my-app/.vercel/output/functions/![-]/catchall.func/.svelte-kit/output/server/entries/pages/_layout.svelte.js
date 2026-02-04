import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { B as Button, W as Waves, C as Column, R as Row, L as Link, D as Dot, I as Icon_1 } from "../../chunks/Waves.js";
const css = {
  code: "main.svelte-10tbxa1{display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:var(--gap-large);min-height:calc(100vh - var(--page-margin) * 2)}nav.svelte-10tbxa1{position:fixed;top:1rem;left:1rem}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n    import \\"../app.scss\\";\\n    import Button from \\"$lib/components/Button.svelte\\";\\n    import Gap from \\"$lib/components/Gap.svelte\\";\\n    import Column from \\"$lib/components/Column.svelte\\"\\n    import Row from \\"$lib/components/Row.svelte\\"\\n    import Link from \\"$lib/components/Link.svelte\\";\\n    import Dot from \\"$lib/components/Dot.svelte\\";\\n    import Waves from \\"$lib/components/Waves.svelte\\";\\n\\timport Icon from \\"$lib/components/Icon.svelte\\";\\n<\/script>\\n\\n<main>\\n<slot/>\\n<nav>\\n\\t<Button href=\\"..\\" style=\\"primary-filled-dark\\" icon=\\"home\\">Home</Button>\\n</nav>\\n<Waves type=\\"bottom\\">\\n\\t<Column>\\n\\t\\t<Row>\\n\\t\\t\\t<Link href=\\"https://discord.gg/WGUaDBdGkm\\" icon=\\"discord\\">Discord</Link>\\n\\t\\t\\t<Dot/>\\n\\t\\t\\t<Link href=\\"https://twitter.com/NoahhSDK\\" icon=\\"twitter\\">Twitter</Link>\\n\\t\\t\\t<Dot/>\\n\\t\\t\\t<Link href=\\"https://docs.noahh-sdk.org/\\" icon=\\"docs\\">Documentation</Link>\\n\\t\\t\\t<Dot/>\\n\\t\\t\\t<Link href=\\"https://github.com/noahh-sdk\\" icon=\\"github\\">Source Code</Link>\\n\\t\\t</Row>\\n\\t\\t<p class=\\"text-text-950\\">\\n\\t\\t\\tSite made by <Link href=\\"https://github.com/nipfswd\\">NoahBajsToa</Link>.\\n\\t\\t\\tThank you to <Link href=\\"https://github.com/torvalds\\">Linus Torvalds</Link> for the domain!\\n\\t\\t</p>\\n\\t\\t<Row gap=small>\\n\\t\\t\\t<Icon icon=\\"copyright\\"/> \\n\\t\\t\\t<p>Noahh Team 2024</p>\\n\\t\\t</Row>\\n\\t</Column>\\n</Waves>\\n</main>\\n\\n<style lang=\\"scss\\">main {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: space-between;\\n  gap: var(--gap-large);\\n  min-height: calc(100vh - var(--page-margin) * 2);\\n}\\n\\nnav {\\n  position: fixed;\\n  top: 1rem;\\n  left: 1rem;\\n}</style>"],"names":[],"mappings":"AAwCmB,mBAAK,CACtB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,GAAG,CAAE,IAAI,WAAW,CAAC,CACrB,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CACjD,CAEA,kBAAI,CACF,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,IACR"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-10tbxa1">${slots.default ? slots.default({}) : ``} <nav class="svelte-10tbxa1">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "..",
      style: "primary-filled-dark",
      icon: "home"
    },
    {},
    {
      default: () => {
        return `Home`;
      }
    }
  )}</nav> ${validate_component(Waves, "Waves").$$render($$result, { type: "bottom" }, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Link, "Link").$$render(
                $$result,
                {
                  href: "https://discord.gg/WGUaDBdGkm",
                  icon: "discord"
                },
                {},
                {
                  default: () => {
                    return `Discord`;
                  }
                }
              )} ${validate_component(Dot, "Dot").$$render($$result, {}, {}, {})} ${validate_component(Link, "Link").$$render(
                $$result,
                {
                  href: "https://twitter.com/NoahhSDK",
                  icon: "twitter"
                },
                {},
                {
                  default: () => {
                    return `Twitter`;
                  }
                }
              )} ${validate_component(Dot, "Dot").$$render($$result, {}, {}, {})} ${validate_component(Link, "Link").$$render(
                $$result,
                {
                  href: "https://docs.noahh-sdk.org/",
                  icon: "docs"
                },
                {},
                {
                  default: () => {
                    return `Documentation`;
                  }
                }
              )} ${validate_component(Dot, "Dot").$$render($$result, {}, {}, {})} ${validate_component(Link, "Link").$$render(
                $$result,
                {
                  href: "https://github.com/noahh-sdk",
                  icon: "github"
                },
                {},
                {
                  default: () => {
                    return `Source Code`;
                  }
                }
              )}`;
            }
          })} <p class="text-text-950">Site made by ${validate_component(Link, "Link").$$render($$result, { href: "https://github.com/nipfswd" }, {}, {
            default: () => {
              return `NoahBajsToa`;
            }
          })}.
			Thank you to ${validate_component(Link, "Link").$$render($$result, { href: "https://github.com/torvalds" }, {}, {
            default: () => {
              return `Linus Torvalds`;
            }
          })} for the domain!</p> ${validate_component(Row, "Row").$$render($$result, { gap: "small" }, {}, {
            default: () => {
              return `${validate_component(Icon_1, "Icon").$$render($$result, { icon: "copyright" }, {}, {})} <p data-svelte-h="svelte-18tuyid">Noahh Team 2024</p>`;
            }
          })}`;
        }
      })}`;
    }
  })} </main>`;
});
export {
  Layout as default
};
