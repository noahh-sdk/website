import { c as create_ssr_component, x as onDestroy, j as spread, l as escape_object, p as createEventDispatcher, i as is_promise, n as noop, v as validate_component, b as add_attribute, e as escape, d as null_to_empty } from "./ssr.js";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const icons = {
  error: "error",
  twitter: "mdi:twitter",
  discord: "simple-icons:discord",
  docs: "mdi:file-document",
  github: "mdi:github",
  download: "mdi:download",
  browse: "mdi:database-search",
  gd: "@:gd-logo",
  examples: "mdi:text-search",
  graph: "mdi:graph-line",
  windows: "mdi:microsoft-windows",
  mac: "mdi:apple",
  android: "mdi:android",
  ios: "mdi:apple-ios",
  linux: "mdi:linux",
  copyright: "mdi:copyright",
  help: "mdi:help-circle",
  warning: "mdi:warning-circle",
  down: "mdi:chevron-down",
  one: "mdi:number-one-circle",
  two: "mdi:number-two-circle",
  three: "mdi:number-three-circle",
  four: "mdi:number-four-circle",
  home: "mdi:home",
  search: "mdi:search",
  time: "mdi:clock",
  "time-update": "mdi:update",
  sort: "mdi:sort",
  "sort-downloads": "mdi:sort-numeric-descending",
  "sort-recent": "mdi:sort-clock-descending",
  tags: "mdi:tag",
  "tags-clear": "mdi:tag-off",
  filter: "mdi:filter",
  "filter-clear": "mdi:filter-off",
  featured: "mdi:star",
  "tag-universal": "mdi:globe",
  "tag-gameplay": "mdi:gamepad-variant",
  "tag-editor": "mdi:hammer-wrench",
  "tag-offline": "mdi:offline",
  "tag-online": "mdi:cloud",
  "tag-enhancement": "mdi:magic",
  "tag-music": "mdi:music-note",
  "tag-interface": "mdi:interaction-tap",
  "tag-bugfix": "mdi:bug",
  "tag-utility": "mdi:wrench",
  "tag-performance": "mdi:clock-fast",
  "tag-customization": "mdi:paint-outline",
  "tag-content": "mdi:auto-stories",
  "tag-developer": "mdi:code-braces"
};
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons2 = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons2[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons2).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons2 = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons2[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons2 = data.icons;
  for (const name in icons2) {
    const icon = icons2[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons2[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons2) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons2.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons2 = params.icons;
      const iconsList = icons2.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  "background-color": "currentColor"
};
const coloredProps = {
  "background-color": "transparent"
};
const propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
const propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key in styles) {
    customStyle += key + ": " + styles[key] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    return null;
  }
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = createEventDispatcher();
    dispatch("load", { icon });
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
      data = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data && iconData.classes) {
        data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
});
const css$6 = {
  code: ":root{--icon-size:1em}span.svelte-mzu5k8{display:inline-grid;place-content:center;width:var(--icon-size);height:var(--icon-size)}span.svelte-mzu5k8>svg{width:var(--icon-size);height:var(--icon-size)}",
  map: `{"version":3,"file":"Icon.svelte","sources":["Icon.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { icons } from \\"$lib\\";\\nimport Icon from \\"@iconify/svelte\\";\\nexport let icon;\\n<\/script>\\r\\n\\r\\n<span>\\r\\n    {#if icons[icon].startsWith('@:')}\\r\\n        {#await import(\`$lib/assets/\${icons[icon].substring('@:'.length)}.json?raw\`) then svg}\\r\\n            <Icon icon={JSON.parse(svg.default)} />\\r\\n        {/await}\\r\\n    {:else}\\r\\n        <Icon icon={icons[icon]}/>\\r\\n    {/if}\\r\\n</span>\\r\\n\\r\\n<style lang=\\"scss\\">:global(:root) {\\n  --icon-size: 1em;\\n}\\n\\nspan {\\n  display: inline-grid;\\n  place-content: center;\\n  width: var(--icon-size);\\n  height: var(--icon-size);\\n}\\nspan > :global(svg) {\\n  width: var(--icon-size);\\n  height: var(--icon-size);\\n}</style>"],"names":[],"mappings":"AAe2B,KAAO,CAChC,WAAW,CAAE,GACf,CAEA,kBAAK,CACH,OAAO,CAAE,WAAW,CACpB,aAAa,CAAE,MAAM,CACrB,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,MAAM,CAAE,IAAI,WAAW,CACzB,CACA,kBAAI,CAAW,GAAK,CAClB,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,MAAM,CAAE,IAAI,WAAW,CACzB"}`
};
const Icon_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  $$result.css.add(css$6);
  return `<span class="svelte-mzu5k8">${icons[icon].startsWith("@:") ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(svg) {
      return ` ${validate_component(Icon, "Icon").$$render($$result, { icon: JSON.parse(svg.default) }, {}, {})} `;
    }(__value);
  }(__variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../assets/gd-logo.json": () => import("./gd-logo.js") }), `../assets/${icons[icon].substring("@:".length)}.json`))}` : `${validate_component(Icon, "Icon").$$render($$result, { icon: icons[icon] }, {}, {})}`} </span>`;
});
const css$5 = {
  code: "a.svelte-9onbu9{font-family:var(--font-body);text-decoration:none;border-style:solid;border-width:0.15rem;border-radius:0.15rem;display:flex;align-items:center;justify-content:center;padding:0.6rem;gap:0.6rem;transition:color, background-color, border-color, transform;transition-duration:var(--transition-duration)}a.primary-filled-dark.svelte-9onbu9{color:var(--primary-300);background-color:var(--primary-950);border-color:var(--primary-950);box-shadow:0px 0.1rem 0.5rem color-mix(in srgb, var(--primary-950) 50%, transparent)}a.primary-filled-dark.svelte-9onbu9:hover{color:var(--secondary-950);background-color:var(--primary-50);border-color:var(--primary-50)}a.primary-filled.svelte-9onbu9{color:var(--primary-950);background-color:var(--primary-300);border-color:var(--primary-300);box-shadow:0px 0.1rem 0.5rem color-mix(in srgb, var(--primary-950) 50%, transparent)}a.primary-filled.svelte-9onbu9:hover{color:var(--secondary-950);background-color:var(--primary-50);border-color:var(--primary-50)}a.secondary-filled.svelte-9onbu9{color:var(--secondary-950);background-color:var(--secondary-300);border-color:var(--secondary-300);box-shadow:0px 0.1rem 0.5rem color-mix(in srgb, var(--secondary-950) 50%, transparent)}a.secondary-filled.svelte-9onbu9:hover{color:var(--secondary-950);background-color:var(--secondary-50);border-color:var(--secondary-50)}a.hollow.svelte-9onbu9{color:var(--secondary-300);background-color:transparent;border-color:var(--secondary-300);box-shadow:0px 0.1rem 0.5rem color-mix(in srgb, var(--secondary-950) 50%, transparent)}a.hollow.svelte-9onbu9:hover{color:var(--secondary-950);background-color:var(--secondary-50);border-color:var(--secondary-50)}",
  map: '{"version":3,"file":"Button.svelte","sources":["Button.svelte"],"sourcesContent":["<script lang=\\"ts\\">import \\"../../app.scss\\";\\nimport Icon from \\"./Icon.svelte\\";\\nexport let style = \\"hollow\\";\\nexport let href;\\nexport let icon = void 0;\\n<\/script>\\r\\n\\r\\n<a href={href} class={style}>\\r\\n    {#if icon}\\r\\n        <Icon {icon} --icon-size=1.5em />\\r\\n    {/if}\\r\\n    <slot/>\\r\\n</a>\\r\\n\\r\\n<style lang=\\"scss\\">a {\\n  font-family: var(--font-body);\\n  text-decoration: none;\\n  border-style: solid;\\n  border-width: 0.15rem;\\n  border-radius: 0.15rem;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  padding: 0.6rem;\\n  gap: 0.6rem;\\n  transition: color, background-color, border-color, transform;\\n  transition-duration: var(--transition-duration);\\n}\\na.primary-filled-dark {\\n  color: var(--primary-300);\\n  background-color: var(--primary-950);\\n  border-color: var(--primary-950);\\n  box-shadow: 0px 0.1rem 0.5rem color-mix(in srgb, var(--primary-950) 50%, transparent);\\n}\\na.primary-filled-dark:hover {\\n  color: var(--secondary-950);\\n  background-color: var(--primary-50);\\n  border-color: var(--primary-50);\\n}\\na.primary-filled {\\n  color: var(--primary-950);\\n  background-color: var(--primary-300);\\n  border-color: var(--primary-300);\\n  box-shadow: 0px 0.1rem 0.5rem color-mix(in srgb, var(--primary-950) 50%, transparent);\\n}\\na.primary-filled:hover {\\n  color: var(--secondary-950);\\n  background-color: var(--primary-50);\\n  border-color: var(--primary-50);\\n}\\na.secondary-filled {\\n  color: var(--secondary-950);\\n  background-color: var(--secondary-300);\\n  border-color: var(--secondary-300);\\n  box-shadow: 0px 0.1rem 0.5rem color-mix(in srgb, var(--secondary-950) 50%, transparent);\\n}\\na.secondary-filled:hover {\\n  color: var(--secondary-950);\\n  background-color: var(--secondary-50);\\n  border-color: var(--secondary-50);\\n}\\na.hollow {\\n  color: var(--secondary-300);\\n  background-color: transparent;\\n  border-color: var(--secondary-300);\\n  box-shadow: 0px 0.1rem 0.5rem color-mix(in srgb, var(--secondary-950) 50%, transparent);\\n}\\na.hollow:hover {\\n  color: var(--secondary-950);\\n  background-color: var(--secondary-50);\\n  border-color: var(--secondary-50);\\n}</style>"],"names":[],"mappings":"AAcmB,eAAE,CACnB,WAAW,CAAE,IAAI,WAAW,CAAC,CAC7B,eAAe,CAAE,IAAI,CACrB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,OAAO,CACrB,aAAa,CAAE,OAAO,CACtB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,MAAM,CACf,GAAG,CAAE,MAAM,CACX,UAAU,CAAE,KAAK,CAAC,CAAC,gBAAgB,CAAC,CAAC,YAAY,CAAC,CAAC,SAAS,CAC5D,mBAAmB,CAAE,IAAI,qBAAqB,CAChD,CACA,CAAC,kCAAqB,CACpB,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,MAAM,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CACtF,CACA,CAAC,kCAAoB,MAAO,CAC1B,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,YAAY,CAAE,IAAI,YAAY,CAChC,CACA,CAAC,6BAAgB,CACf,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,YAAY,CAAE,IAAI,aAAa,CAAC,CAChC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,MAAM,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CACtF,CACA,CAAC,6BAAe,MAAO,CACrB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,IAAI,YAAY,CAAC,CACnC,YAAY,CAAE,IAAI,YAAY,CAChC,CACA,CAAC,+BAAkB,CACjB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,YAAY,CAAE,IAAI,eAAe,CAAC,CAClC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,MAAM,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CACxF,CACA,CAAC,+BAAiB,MAAO,CACvB,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,YAAY,CAAE,IAAI,cAAc,CAClC,CACA,CAAC,qBAAQ,CACP,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,WAAW,CAC7B,YAAY,CAAE,IAAI,eAAe,CAAC,CAClC,UAAU,CAAE,GAAG,CAAC,MAAM,CAAC,MAAM,CAAC,UAAU,EAAE,CAAC,IAAI,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CACxF,CACA,CAAC,qBAAO,MAAO,CACb,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,gBAAgB,CAAE,IAAI,cAAc,CAAC,CACrC,YAAY,CAAE,IAAI,cAAc,CAClC"}'
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { style = "hollow" } = $$props;
  let { href } = $$props;
  let { icon = void 0 } = $$props;
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  $$result.css.add(css$5);
  return `<a${add_attribute("href", href, 0)} class="${escape(null_to_empty(style), true) + " svelte-9onbu9"}">${icon ? `<div style="display: contents; --icon-size:1.5em;">${validate_component(Icon_1, "Icon").$$render($$result, { icon }, {}, {})}</div>` : ``} ${slots.default ? slots.default({}) : ``} </a>`;
});
const css$4 = {
  code: "div.svelte-g2abhu{display:flex;flex-direction:column;flex-wrap:var(--wrap);gap:var(--gap);align-items:var(--align)}",
  map: `{"version":3,"file":"Column.svelte","sources":["Column.svelte"],"sourcesContent":["<script lang=\\"ts\\">const alignment = {\\n  \\"left\\": \\"start\\",\\n  \\"center\\": \\"center\\",\\n  \\"right\\": \\"end\\",\\n  \\"stretch\\": \\"stretch\\"\\n};\\nexport let align = \\"center\\";\\nexport let gap = \\"normal\\";\\nexport let wrap = false;\\n<\/script>\\r\\n\\r\\n<div style=\\"--wrap: {wrap ? 'wrap' : 'nowrap'}; --gap: var(--gap-{gap}); --align: {alignment[align]}\\"><slot/></div>\\r\\n\\r\\n<style lang=\\"scss\\">div {\\n  display: flex;\\n  flex-direction: column;\\n  flex-wrap: var(--wrap);\\n  gap: var(--gap);\\n  align-items: var(--align);\\n}</style>"],"names":[],"mappings":"AAamB,iBAAI,CACrB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,GAAG,CAAE,IAAI,KAAK,CAAC,CACf,WAAW,CAAE,IAAI,OAAO,CAC1B"}`
};
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const alignment = {
    "left": "start",
    "center": "center",
    "right": "end",
    "stretch": "stretch"
  };
  let { align = "center" } = $$props;
  let { gap = "normal" } = $$props;
  let { wrap = false } = $$props;
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.wrap === void 0 && $$bindings.wrap && wrap !== void 0)
    $$bindings.wrap(wrap);
  $$result.css.add(css$4);
  return `<div style="${"--wrap: " + escape(wrap ? "wrap" : "nowrap", true) + "; --gap: var(--gap-" + escape(gap, true) + "); --align: " + escape(alignment[align], true)}" class="svelte-g2abhu">${slots.default ? slots.default({}) : ``}</div>`;
});
const css$3 = {
  code: "div.svelte-1wkyqom{display:flex;flex-direction:row;flex-wrap:var(--wrap);gap:var(--gap);align-items:var(--align)}",
  map: `{"version":3,"file":"Row.svelte","sources":["Row.svelte"],"sourcesContent":["<script lang=\\"ts\\">const alignment = {\\n  \\"top\\": \\"start\\",\\n  \\"center\\": \\"center\\",\\n  \\"bottom\\": \\"end\\",\\n  \\"stretch\\": \\"stretch\\"\\n};\\nexport let align = \\"center\\";\\nexport let gap = \\"normal\\";\\nexport let wrap = false;\\n<\/script>\\r\\n\\r\\n<div style=\\"--wrap: {wrap ? 'wrap' : 'nowrap'}; --gap: var(--gap-{gap}); --align: {alignment[align]}\\"><slot/></div>\\r\\n\\r\\n<style lang=\\"scss\\">div {\\n  display: flex;\\n  flex-direction: row;\\n  flex-wrap: var(--wrap);\\n  gap: var(--gap);\\n  align-items: var(--align);\\n}</style>"],"names":[],"mappings":"AAamB,kBAAI,CACrB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,MAAM,CAAC,CACtB,GAAG,CAAE,IAAI,KAAK,CAAC,CACf,WAAW,CAAE,IAAI,OAAO,CAC1B"}`
};
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const alignment = {
    "top": "start",
    "center": "center",
    "bottom": "end",
    "stretch": "stretch"
  };
  let { align = "center" } = $$props;
  let { gap = "normal" } = $$props;
  let { wrap = false } = $$props;
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.wrap === void 0 && $$bindings.wrap && wrap !== void 0)
    $$bindings.wrap(wrap);
  $$result.css.add(css$3);
  return `<div style="${"--wrap: " + escape(wrap ? "wrap" : "nowrap", true) + "; --gap: var(--gap-" + escape(gap, true) + "); --align: " + escape(alignment[align], true)}" class="svelte-1wkyqom">${slots.default ? slots.default({}) : ``}</div>`;
});
const css$2 = {
  code: ":root{--link-hover:var(--text-50);--link-color:var(--text-color)}a.svelte-1651xwv{text-decoration:none;display:inline-flex;flex-direction:row;align-items:center;gap:var(--gap-small);font-weight:var(--link-weight);font-size:var(--font-size);transition:color, text-decoration;transition-duration:var(--transition-duration);color:var(--link-color)}a.svelte-1651xwv:hover{text-decoration:underline;color:var(--link-hover)}",
  map: `{"version":3,"file":"Link.svelte","sources":["Link.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Icon from \\"./Icon.svelte\\";\\nexport let icon = void 0;\\nexport let href;\\nexport let bold = false;\\n<\/script>\\r\\n\\r\\n<a href={href} style=\\"{bold ? '--link-weight: 600' : undefined}\\">\\r\\n    {#if icon}\\r\\n        <Icon {icon} --icon-size=1.15em/>\\r\\n    {/if}\\r\\n    <span><slot/></span>\\r\\n</a>\\r\\n\\r\\n<style lang=\\"scss\\">:global(:root) {\\n  --link-hover: var(--text-50);\\n  --link-color: var(--text-color);\\n}\\n\\na {\\n  text-decoration: none;\\n  display: inline-flex;\\n  flex-direction: row;\\n  align-items: center;\\n  gap: var(--gap-small);\\n  font-weight: var(--link-weight);\\n  font-size: var(--font-size);\\n  transition: color, text-decoration;\\n  transition-duration: var(--transition-duration);\\n  color: var(--link-color);\\n}\\na:hover {\\n  text-decoration: underline;\\n  color: var(--link-hover);\\n}</style>"],"names":[],"mappings":"AAa2B,KAAO,CAChC,YAAY,CAAE,cAAc,CAC5B,YAAY,CAAE,iBAChB,CAEA,gBAAE,CACA,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,WAAW,CACpB,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,WAAW,CAAC,CACrB,WAAW,CAAE,IAAI,aAAa,CAAC,CAC/B,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,UAAU,CAAE,KAAK,CAAC,CAAC,eAAe,CAClC,mBAAmB,CAAE,IAAI,qBAAqB,CAAC,CAC/C,KAAK,CAAE,IAAI,YAAY,CACzB,CACA,gBAAC,MAAO,CACN,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,IAAI,YAAY,CACzB"}`
};
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = void 0 } = $$props;
  let { href } = $$props;
  let { bold = false } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.bold === void 0 && $$bindings.bold && bold !== void 0)
    $$bindings.bold(bold);
  $$result.css.add(css$2);
  return `<a${add_attribute("href", href, 0)}${add_attribute("style", bold ? "--link-weight: 600" : void 0, 0)} class="svelte-1651xwv">${icon ? `<div style="display: contents; --icon-size:1.15em;">${validate_component(Icon_1, "Icon").$$render($$result, { icon }, {}, {})}</div>` : ``} <span>${slots.default ? slots.default({}) : ``}</span> </a>`;
});
const css$1 = {
  code: ":root{--dot-color:var(--background-900)}div.svelte-1f60cqh{background-color:var(--dot-color);opacity:50%;width:0.3rem;height:0.3rem;border-radius:9999px}",
  map: '{"version":3,"file":"Dot.svelte","sources":["Dot.svelte"],"sourcesContent":["<div></div>\\r\\n\\r\\n<style lang=\\"scss\\">:global(:root) {\\n  --dot-color: var(--background-900);\\n}\\n\\ndiv {\\n  background-color: var(--dot-color);\\n  opacity: 50%;\\n  width: 0.3rem;\\n  height: 0.3rem;\\n  border-radius: 9999px;\\n}</style>"],"names":[],"mappings":"AAE2B,KAAO,CAChC,WAAW,CAAE,qBACf,CAEA,kBAAI,CACF,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,aAAa,CAAE,MACjB"}'
};
const Dot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="svelte-1f60cqh"></div>`;
});
const css = {
  code: "span.svelte-1j0uvw.svelte-1j0uvw{display:block;width:100%;pointer-events:none}span.svelte-1j0uvw>div.svelte-1j0uvw{color:var(--text-950);--text-color:var(--text-950);--link-hover:var(--primary-500);--link-weight:700;pointer-events:auto}span.svelte-1j0uvw>svg{position:absolute;width:100%;height:100%;z-index:-2}span.bottom.svelte-1j0uvw.svelte-1j0uvw{position:relative;width:calc(100% + var(--page-margin) * 2);height:35rem;margin-top:-15rem;margin-bottom:calc(0px - var(--page-margin))}span.bottom.svelte-1j0uvw>div.svelte-1j0uvw{margin-top:20rem}span.top-full.svelte-1j0uvw.svelte-1j0uvw{position:absolute;height:65rem;top:0px}span.top-full.svelte-1j0uvw>svg{rotate:180deg}span.top.svelte-1j0uvw.svelte-1j0uvw{position:absolute;top:-14rem;height:38rem}span.top.svelte-1j0uvw>svg{rotate:180deg}",
  map: '{"version":3,"file":"Waves.svelte","sources":["Waves.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let type;\\nlet svgFileName;\\nswitch (type) {\\n  case \\"top-full\\":\\n    svgFileName = \\"waves-full\\";\\n    break;\\n  case \\"top\\":\\n    svgFileName = \\"waves-full\\";\\n    break;\\n  case \\"bottom\\":\\n    svgFileName = \\"waves-few\\";\\n    break;\\n}\\n<\/script>\\r\\n<span class=\\"{type}\\">\\r\\n    {#await import(`../assets/${svgFileName}.svg?raw`) then svg}\\r\\n        {@html svg.default}\\r\\n    {/await}\\r\\n    <div><slot/></div>\\r\\n</span>\\r\\n\\r\\n<style lang=\\"scss\\">span {\\n  display: block;\\n  width: 100%;\\n  pointer-events: none;\\n}\\nspan > div {\\n  color: var(--text-950);\\n  --text-color: var(--text-950);\\n  --link-hover: var(--primary-500);\\n  --link-weight: 700;\\n  pointer-events: auto;\\n}\\nspan > :global(svg) {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  z-index: -2;\\n}\\nspan.bottom {\\n  position: relative;\\n  width: calc(100% + var(--page-margin) * 2);\\n  height: 35rem;\\n  margin-top: -15rem;\\n  margin-bottom: calc(0px - var(--page-margin));\\n}\\nspan.bottom > div {\\n  margin-top: 20rem;\\n}\\nspan.top-full {\\n  position: absolute;\\n  height: 65rem;\\n  top: 0px;\\n}\\nspan.top-full > :global(svg) {\\n  rotate: 180deg;\\n}\\nspan.top {\\n  position: absolute;\\n  top: -14rem;\\n  height: 38rem;\\n}\\nspan.top > :global(svg) {\\n  rotate: 180deg;\\n}</style>"],"names":[],"mappings":"AAqBmB,gCAAK,CACtB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,IAClB,CACA,kBAAI,CAAG,iBAAI,CACT,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,YAAY,CAAE,eAAe,CAC7B,YAAY,CAAE,kBAAkB,CAChC,aAAa,CAAE,GAAG,CAClB,cAAc,CAAE,IAClB,CACA,kBAAI,CAAW,GAAK,CAClB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EACX,CACA,IAAI,mCAAQ,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAC1C,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAC9C,CACA,IAAI,qBAAO,CAAG,iBAAI,CAChB,UAAU,CAAE,KACd,CACA,IAAI,qCAAU,CACZ,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,GACP,CACA,IAAI,uBAAS,CAAW,GAAK,CAC3B,MAAM,CAAE,MACV,CACA,IAAI,gCAAK,CACP,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,MAAM,CACX,MAAM,CAAE,KACV,CACA,IAAI,kBAAI,CAAW,GAAK,CACtB,MAAM,CAAE,MACV"}'
};
const Waves = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let svgFileName;
  switch (type) {
    case "top-full":
      svgFileName = "waves-full";
      break;
    case "top":
      svgFileName = "waves-full";
      break;
    case "bottom":
      svgFileName = "waves-few";
      break;
  }
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  return `<span class="${escape(null_to_empty(type), true) + " svelte-1j0uvw"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(svg) {
      return ` <!-- HTML_TAG_START -->${svg.default}<!-- HTML_TAG_END --> `;
    }(__value);
  }(__variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../assets/favicon.svg": () => import("./favicon.js"), "../assets/mod-outlines.svg": () => import("./mod-outlines.js"), "../assets/noahh-logo-plain-mono.svg": () => import("./noahh-logo-plain-mono.js"), "../assets/noahh-logo-plain.svg": () => import("./noahh-logo-plain.js"), "../assets/noahh-logo.svg": () => import("./noahh-logo.js"), "../assets/waves-few.svg": () => import("./waves-few.js"), "../assets/waves-full.svg": () => import("./waves-full.js"), "../assets/waves-very-few.svg": () => import("./waves-very-few.js") }), `../assets/${svgFileName}.svg`))} <div class="svelte-1j0uvw">${slots.default ? slots.default({}) : ``}</div> </span>`;
});
export {
  Button as B,
  Column as C,
  Dot as D,
  Icon_1 as I,
  Link as L,
  Row as R,
  Waves as W,
  __variableDynamicImportRuntimeHelper as _
};
