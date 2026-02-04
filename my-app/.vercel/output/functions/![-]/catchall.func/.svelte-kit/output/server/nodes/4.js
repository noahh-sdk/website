

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mods/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CX_eWPPq.js","_app/immutable/chunks/scheduler.DVcVLstM.js","_app/immutable/chunks/index.DkS2KLeZ.js"];
export const stylesheets = [];
export const fonts = [];
