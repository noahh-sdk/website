

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/install/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BkkeSNcZ.js","_app/immutable/chunks/scheduler.DVcVLstM.js","_app/immutable/chunks/index.DkS2KLeZ.js"];
export const stylesheets = [];
export const fonts = [];
