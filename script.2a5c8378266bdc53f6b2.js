/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && 'undefined' != typeof parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideNav = exports.Slide = exports.Icon = exports.Footer = exports.Container = exports.Code = exports.Cat = exports.Button = exports.Bubbles = exports.Bubble = undefined;

var _Bubble2 = __webpack_require__(13);

var _Bubble3 = _interopRequireDefault(_Bubble2);

var _Bubbles2 = __webpack_require__(14);

var _Bubbles3 = _interopRequireDefault(_Bubbles2);

var _Button2 = __webpack_require__(15);

var _Button3 = _interopRequireDefault(_Button2);

var _Cat2 = __webpack_require__(7);

var _Cat3 = _interopRequireDefault(_Cat2);

var _Code2 = __webpack_require__(16);

var _Code3 = _interopRequireDefault(_Code2);

var _Container2 = __webpack_require__(17);

var _Container3 = _interopRequireDefault(_Container2);

var _Footer2 = __webpack_require__(18);

var _Footer3 = _interopRequireDefault(_Footer2);

var _Icon2 = __webpack_require__(8);

var _Icon3 = _interopRequireDefault(_Icon2);

var _Slide2 = __webpack_require__(19);

var _Slide3 = _interopRequireDefault(_Slide2);

var _SlideNav2 = __webpack_require__(20);

var _SlideNav3 = _interopRequireDefault(_SlideNav2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Bubble = _Bubble3.default;
exports.Bubbles = _Bubbles3.default;
exports.Button = _Button3.default;
exports.Cat = _Cat3.default;
exports.Code = _Code3.default;
exports.Container = _Container3.default;
exports.Footer = _Footer3.default;
exports.Icon = _Icon3.default;
exports.Slide = _Slide3.default;
exports.SlideNav = _SlideNav3.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.PropTypes = mod.exports;
  }
})(this, function (exports, module) {

  'use strict';

  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

  var ReactElement = {};

  ReactElement.isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  var ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };

  var emptyFunction = {
    thatReturns: function thatReturns(what) {
      return function () {
        return what;
      };
    }
  };

  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  var ANONYMOUS = '<<anonymous>>';

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];

        var preciseType = getPreciseType(propValue);

        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName) == null) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true;
    }

    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  module.exports = ReactPropTypes;
});

//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global.preactRouter = factory(global.preact));
}(this, (function (preact) { 'use strict';

var EMPTY$1 = {};

function exec(url, route) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret = void 0;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var _i = 0; _i < max; _i++) {
		if (route[_i] && route[_i].charAt(0) === ':') {
			var param = route[_i].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[_i].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[_i] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(_i).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[_i] !== url[_i]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) return false;
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) return 1;
	if (bAttr.default) return -1;
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customHistory = null;

var ROUTERS = [];

var EMPTY = {};

// hangs off all elements created by preact
var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

function isPreactElement(node) {
	return ATTR_KEY in node;
}

function setUrl(url) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url = void 0;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return '' + (url.pathname || '') + (url.search || '');
}

function route(url) {
	var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) return true;
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) return;

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) return;

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button !== 0) return;
	routeFromLink(e.currentTarget || e.target || this);
	return prevent(e);
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) e.stopImmediatePropagation();
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (e.button !== 0) return;
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Link = function Link(props) {
	return preact.h('a', _extends({}, props, { onClick: handleLinkClick }));
};

var Router = function (_Component) {
	_inherits(Router, _Component);

	function Router(props) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		if (props.history) {
			customHistory = props.history;
		}

		_this.state = {
			url: _this.props.url || getCurrentUrl()
		};

		initEventListeners();
		return _this;
	}

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) return true;
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */


	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */


	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) return this.canRoute(url);

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				_this2.routeTo('' + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') this.unlisten();
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).filter(function (_ref) {
			var attributes = _ref.attributes;

			var path = attributes.path,
			    matches = exec(url, path, attributes);
			if (matches) {
				if (invoke !== false) {
					attributes.url = url;
					attributes.matches = matches;
					// copy matches onto props
					for (var i in matches) {
						if (matches.hasOwnProperty(i)) {
							attributes[i] = matches[i];
						}
					}
				}
				return true;
			}
		});
	};

	Router.prototype.render = function render(_ref2, _ref3) {
		var children = _ref2.children,
		    onChange = _ref2.onChange;
		var url = _ref3.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact.Component);

var Route = function Route(_ref4) {
	var component = _ref4.component,
	    url = _ref4.url,
	    matches = _ref4.matches;

	return preact.h(component, { url: url, matches: matches });
};

Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

return Router;

})));
//# sourceMappingURL=preact-router.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _ = __webpack_require__(3);

var _cat = __webpack_require__(43);

var _cat2 = _interopRequireDefault(_cat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cat = function Cat() {
    var src = __webpack_require__(10);

    return (0, _preact.h)('div', { dangerouslySetInnerHTML: { __html: src }, className: _cat2.default.cat });
};

Cat.propTypes = {};

exports.default = Cat;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = __webpack_require__(46);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aliases = {};

var Icon = function Icon(_ref) {
    var name = _ref.name,
        color = _ref.color,
        className = _ref.className,
        size = _ref.size,
        style = _ref.style;

    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    var src = __webpack_require__(64)("./" + name + '.svg');
    var props = {
        className: (0, _classnames2.default)(_icon2.default.icon, _icon2.default['icon--' + name], className, _icon2.default['icon--' + size]),
        style: style
    };

    if (color && color !== 'transparent') {
        props.style = {
            color: color
        };
    }

    return (0, _preact.h)('span', _extends({ dangerouslySetInnerHTML: { __html: src } }, props));
};

Icon.propTypes = {
    className: _proptypes.string,
    color: _proptypes.string,
    name: _proptypes.string.isRequired,
    size: (0, _proptypes.oneOf)(['tiny', 'small', 'medium']),
    style: _proptypes.object
};

Icon.defaultProps = {
    size: 'medium'
};

exports.default = Icon;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 199 204\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>Cat</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"Cat\"><g id=\"Body\" transform=\"translate(34.000000, 6.000000)\"><path d=\"M108.674179,33.3090935 C112.524421,38.4343275 115.485962,44.2028816 117.176554,50.3676407 C122.878374,71.1593887 130.660156,196.375 130.660156,196.375 L0.292272225,196.374999 C0.292272225,196.374999 -0.363100857,108.512086 13.0925368,54.8601364 C15.0413064,47.0897658 17.6629397,40.4777357 20.8440062,34.9199435 L19.6052315,35.9663667 L24.6326211,4.53599332 C24.6326211,4.53599332 26.3889368,-1.65576277 32.2693683,0.74180625 C37.2345368,2.76620429 42.7709487,11.2926987 44.3741008,13.8978786 C52.586338,10.6922702 61.7608988,9.8871033 71.3647537,10.9931812 C75.4388302,11.4623935 79.5215663,12.5148516 83.4880926,14.0698307 L95.0464818,2.97441061 C95.0464818,2.97441061 101.679797,-1.45854968 103.613481,5.18096791 C105.547164,11.8204855 109.802757,34.1552099 109.802757,34.1552099 L108.674179,33.3090935 Z\" stroke=\"#241808\" stroke-width=\"2\" fill=\"#C28838\"></path><g id=\"Fur\" transform=\"translate(11.000000, 14.000000)\" stroke=\"#8D5E1D\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d id=\"Path-17\"></path><path d=\"M25.729327,18.4197569 L22.1827081,14.4419253\" id=\"Path-18\"></path><path d=\"M34.4210013,13.3329924 L30.5702862,8.53206437\" id=\"Path-19\"></path><path d=\"M42.7924265,9.12199701 C41.6619563,6.92988221 40.5314862,4.73776741 39.401016,2.54565261\" id=\"Path-20\"></path><path d=\"M53.175241,7.27494599 L51.7200738,0.0236905461\" id=\"Path-21\"></path><path d=\"M64.210493,10.200731 C64.8075132,3.81412016 63.4706384,6.13435213 66.8413117,2.61026428\" id=\"Path-22\"></path><path d=\"M79.0676658,15.0065752 C80.081554,13.9636585 81.0954422,12.9207419 82.1093304,11.8778252\" id=\"Path-23\"></path><path d=\"M84.4402667,19.2681362 C85.5515406,18.784251 86.6628145,18.3003658 87.7740884,17.8164805\" id=\"Path-24\"></path><path d=\"M68.1082623,17.7729379 L69.8928086,13.3933903\" id=\"Path-25\"></path><path d=\"M58.5464373,19.6649362 L58.3596253,12.5422018\" id=\"Path-26\"></path><path d=\"M49.9425506,17.0039185 L48.2745863,13.3119234\" id=\"Path-27\"></path><path d=\"M41.7165017,23.1932952 L39.6362868,18.8144499\" id=\"Path-28\"></path><path d=\"M53.5952169,26.5748734 C53.4364969,24.9247007 53.277777,23.274528 53.119057,21.6243553\" id=\"Path-29\"></path><path d=\"M65.4500539,24.0852172 L66.2569975,20.6664171\" id=\"Path-30\"></path><path d id=\"Path-31\"></path><polyline id=\"Path-32\" points=\"52.9231151 55.9177019 53.5074293 55.9177019 53.6338434 55.9177019 53.8866717 55.9177019 54.0713768 55.9177019 54.1296678 55.9177019 54.1879587 55.9177019 54.2462497 55.9177019 54.3045407 55.9177019 54.4211226 55.9177019 54.5377045 55.9177019 54.5959955 55.9177019 54.6542865 55.9177019 54.7125774 55.9177019 54.7708684 55.9177019 54.9457413 55.9177019 55.0040322 55.9177019 55.0623232 55.9177019\"></polyline><path d=\"M51.0009179,60.8970143 L55.0405519,60.7200345\" id=\"Path-33\"></path><path d=\"M48.5583158,64.8917011 L58.9362143,64.2280269\" id=\"Path-34\"></path><path d=\"M4.6701361,85.9635334 L0.577829516,85.7275603\" id=\"Path-35\"></path><polyline id=\"Path-36\" points=\"33.1695013 81.9351362 32.5233846 81.9351362 32.2291206 81.9351362 31.8077401 81.9351362 31.601966 81.9351362 31.3961919 81.9351362 31.1904178 81.9351362 30.9846436 81.9351362 30.6903796 81.9351362 30.357489 81.9351362 30.1517149 81.9351362 29.897482 81.9351362 29.7703656 81.9351362 29.5161327 81.9351362 29.3890163 81.9351362 29.330023 81.9351362 29.2710298 81.9351362 29.1439133 81.9351362 29.08492 81.9351362 29.0259268 81.9351362 28.9669335 81.9351362 28.9079403 81.9351362\"></polyline><path d=\"M37.6628216,91.5313739 L32.0458201,92.1388641\" id=\"Path-37\"></path><path d=\"M27.5651412,102.525892 L21.790122,101.765301\" id=\"Path-38\"></path><path d=\"M12.1152266,101.229445 C10.2869036,100.43842 8.45858055,99.6473957 6.63025755,98.8563709\" id=\"Path-39\"></path><path d=\"M10.7099227,109.99135 L5.1315477,112.002739\" id=\"Path-40\"></path><path d=\"M24.0332706,111.881943 L19.7379991,114.364577\" id=\"Path-41\"></path><path d=\"M36.0847518,115.390638 L31.8267023,118.845255\" id=\"Path-42\"></path><path d=\"M46.6642106,118.777132 L44.5130633,120.710566\" id=\"Path-43\"></path><polyline id=\"Path-44\" points=\"54.1718058 117.684352 54.1718058 118.268666 54.1718058 118.395081 54.1718058 118.600152 54.1718058 118.726567 54.1718058 118.852981 54.1718058 118.979395 54.1718058 119.037686 54.1718058 119.1641 54.1718058 119.222391 54.1718058 119.407096 54.1718058 119.465387 54.1718058 119.523678 54.1718058 119.64026 54.1718058 119.698551 54.1718058 119.756842 54.1718058 119.815133 54.1718058 119.873424 54.1718058 119.931715 54.1718058 119.990006 54.1718058 120.048297 54.1718058 120.164879 54.1718058 120.22317 54.1718058 120.28146 54.1718058 120.339751 54.1718058 120.398042 54.1718058 120.456333 54.1718058 120.572915 54.1718058 120.631206 54.1718058 120.747788 54.1718058 120.806079 54.1718058 120.86437 54.1718058 120.922661 54.1718058 120.980952 54.1718058 121.039243 54.1718058 121.097534 54.1718058 121.223948 54.1718058 121.282239 54.1718058 121.34053 54.1718058 121.398821 54.1718058 121.457112 54.1718058 121.573694 54.1718058 121.631985 54.1718058 121.690276 54.1718058 121.806858 54.1718058 121.92344 54.1718058 121.981731 54.1718058 122.040022 54.1718058 122.098313 54.1718058 122.156604 54.1718058 122.214895 54.1718058 122.273185 54.1718058 122.389767 54.1718058 122.448058 54.1718058 122.506349 54.1718058 122.56464 54.1718058 122.622931 54.1718058 122.681222 54.1718058 122.739513\"></polyline><path d=\"M61.3830301,117.855011 C61.9270791,118.96254 62.4711281,120.070068 63.0151771,121.177596\" id=\"Path-45\"></path><path d=\"M72.3262807,115.242452 L75.3637315,119.840416\" id=\"Path-46\"></path><path d=\"M84.0757726,112.583542 C85.3342956,113.863368 86.5928186,115.143194 87.8513415,116.42302\" id=\"Path-47\"></path><path d id=\"Path-48\"></path><path d=\"M92.0384587,109.778552 C93.9438007,111.292479 95.8491427,112.806405 97.7544847,114.320332\" id=\"Path-49\"></path><path d=\"M103.994427,103.052618 L109.519427,106.735483\" id=\"Path-50\"></path><path d=\"M92.6319029,87.7150715 L97.1329485,88.4925185\" id=\"Path-51\"></path><path d=\"M79.6386363,97.9595328 C81.2003191,98.1149754 82.762002,98.270418 84.3236848,98.4258606\" id=\"Path-52\"></path><path d=\"M71.091636,82.8024776 C72.2541778,83.3160936 73.4167197,83.8297096 74.5792616,84.3433255\" id=\"Path-53\"></path><path d=\"M65.2344476,88.7376214 L67.4066638,90.9189676\" id=\"Path-54\"></path><path d=\"M46.3288779,38.1331342 C45.0980733,35.9601061 43.8672688,33.7870781 42.6364643,31.6140501\" id=\"Path-55\"></path><polyline id=\"Path-56\" points=\"54.5994573 36.2349028 54.5994573 34.8209005 54.5994573 34.579453 54.5994573 34.1886014 54.5994573 33.4642587 54.5994573 33.3522057 54.5994573 33.2401527 54.5994573 32.9987051 54.5994573 32.7572576 54.5994573 32.51581 54.5994573 32.403757 54.5994573 32.291704 54.5994573 32.179651 54.5994573 32.067598 54.5994573 31.955545 54.5994573 31.8434919 54.5994573 31.7314389 54.5994573 31.6193859 54.5994573 31.5073329 54.5994573 31.3952799\"></polyline><path d=\"M60.9704713,36.8351868 L67.5909367,32.3517324\" id=\"Path-57\"></path><path d=\"M60.7303577,47.6322948 C62.1376902,46.811462 63.5450226,45.9906293 64.9523551,45.1697965\" id=\"Path-58\"></path><polyline id=\"Path-59\" points=\"53.6176594 49.2597314 53.6176594 47.8443952 53.6176594 47.2854641 53.6176594 46.8946125 53.6176594 46.3356814 53.6176594 45.1444512 53.6176594 44.7535996 53.6176594 43.8798529 53.6176594 43.6384053 53.6176594 43.0434572 53.6176594 42.9314042 53.6176594 42.8193512 53.6176594 42.5952452 53.6176594 42.4831922\"></polyline><path d=\"M49.4076677,47.8283876 L45.5978654,43.4583201\" id=\"Path-60\"></path><path d=\"M35.97598,29.9359228 L29.9891477,24.4159781\" id=\"Path-61\"></path><path d=\"M72.5412787,29.5384014 C73.7627454,28.055033 74.9842122,26.5716646 76.2056789,25.0882961\" id=\"Path-62\"></path><path d=\"M14.9833819,26.9451746 C13.3595026,26.130567 11.7356232,25.3159594 10.1117439,24.5013518\" id=\"Path-63\"></path><path d=\"M23.0752101,25.3857702 L18.7945183,22.2509538\" id=\"Path-64\"></path></g></g><g id=\"Face\"><path d=\"M88.2505545,131.027623 C88.2505545,131.027623 100.180114,137.891076 109.414596,131.197184\" id=\"Mouth\" stroke=\"#241808\" stroke-width=\"2\" stroke-linecap=\"round\"></path><g id=\"Eyes\" transform=\"translate(42.000000, 47.000000)\" stroke=\"#241808\"><circle id=\"Oval\" stroke-width=\"2\" fill=\"#FFFFFF\" cx=\"22\" cy=\"25\" r=\"22\"></circle><circle id=\"Oval\" stroke-width=\"2\" fill=\"#FFFFFF\" cx=\"93\" cy=\"22.972377\" r=\"22\"></circle><path d=\"M92.5,26 C94.4329966,26 96,24.4329966 96,22.5 C96,20.5670034 94.4329966,19 92.5,19 C90.5670034,19 89,20.5670034 89,22.5 C89,24.4329966 90.5670034,26 92.5,26 Z\" id=\"Oval-2\" fill=\"#241808\"></path><path d=\"M21.5,30 C23.4329966,30 25,28.4329966 25,26.5 C25,24.5670034 23.4329966,23 21.5,23 C19.5670034,23 18,24.5670034 18,26.5 C18,28.4329966 19.5670034,30 21.5,30 Z\" id=\"Oval-2\" fill=\"#241808\"></path></g><g id=\"Nose\" transform=\"translate(82.000000, 88.000000)\"><path d=\"M4.45885972,4.05779032 C0.851489687,-0.632108303 27.1247751,-0.243056215 30.6559407,2.23009408 C34.1871063,4.70324438 29.566444,10.0122079 17.6350002,15.9270615 C11.1153906,11.3608707 8.06622974,8.74768894 4.45885972,4.05779032 Z\" id=\"Path-12\" fill=\"#F0A08E\"></path><path d=\"M0.537612056,31.2762289 C0.537612056,31.2762289 17.59719,30.2455097 17.59719,14.3766542\" id=\"Path-2\" stroke=\"#241808\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M33.9634203,31.9844606 C33.9634203,31.9844606 17.7919227,32.6133103 17.7919227,14.9645734\" id=\"Path-3\" stroke=\"#241808\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></g><g id=\"Whiskers\" transform=\"translate(0.000000, 97.000000)\" stroke=\"#241808\" stroke-linecap=\"round\"><path d=\"M62.6537896,7.39964186 C62.6537896,7.39964186 42.6595785,-3.10352132 4.65072837,2.14806027\" id=\"Path-4\"></path><path d=\"M68.9968666,17.4463615 C68.9968666,17.4463615 55.55783,9.49829041 10.6440307,16.8286743\" id=\"Path-5\"></path><path d=\"M134.346437,7.2173125 C134.346437,7.2173125 155.155547,-1.65408217 193.629524,1.12354294\" id=\"Path-6\"></path><path d=\"M128.050492,17.0953464 C128.050492,17.0953464 144.432844,10.6133518 189.371452,16.4999853\" id=\"Path-7\"></path><path d=\"M143.635311,9.42262947 C143.635311,9.42262947 178.682241,1.65936839 198.86002,9.83566128\" id=\"Path-8\"></path><path d=\"M52.640559,8.06694249 C52.640559,8.06694249 24.6052494,2.05999643 0.702739665,12.8930889\" id=\"Path-9\"></path></g><g id=\"Ears\" transform=\"translate(53.000000, 0.000000)\"><path d=\"M8.8780118,31.2726475 L10.8953064,17.5945549 C10.8953064,17.5945549 12.0027723,15.4698974 13.7702402,16.703002 C15.5377082,17.9361066 20.0454179,22.327407 20.0454179,22.327407 L8.8780118,31.2726475 Z\" id=\"Path-13\" fill=\"#F0A08E\"></path><path d=\"M72.1599376,22.0297508 L77.2480268,16.0815628 C77.2480268,16.0815628 80.1581466,14.121639 80.3673069,17.5554595 C80.5764673,20.98928 81.9695413,29.2383358 81.9695413,29.2383358 L72.1599376,22.0297508 Z\" id=\"Path-14\" fill=\"#F0A08E\"></path><path d=\"M0.783541341,42.787721 C0.783541341,42.787721 10.3241841,25.7569268 26.0935203,19.8303835\" id=\"Path-15\" stroke=\"#241808\" stroke-width=\"2\"></path><path d=\"M88.9736418,38.4604504 C88.9736418,38.4604504 82.0779375,24.9813442 64.5747179,20.1482443\" id=\"Path-16\" stroke=\"#241808\" stroke-width=\"2\"></path><path d=\"M9.60807081,6.18419688 C8.05084188,6.50362914 5.07928798,11.0609249 5.07928798,11.0609249 L6.51116089,0.659254483 L16.888946,8.54967349 C16.888946,8.54967349 11.7470271,5.74543567 9.60807081,6.18419688 Z\" id=\"Path-107\" stroke=\"#241808\" stroke-linejoin=\"round\" fill=\"#241808\"></path><path d=\"M81.3919672,7.23783187 C79.7831467,6.92889135 75.7560336,8.55802134 75.7560336,8.55802134 L82.8757409,2.58890132 L85.1871001,11.4824016 C85.1871001,11.4824016 83.1235377,7.57034396 81.3919672,7.23783187 Z\" id=\"Path-108\" stroke=\"#241808\" stroke-linejoin=\"round\" fill=\"#241808\"></path></g></g></g><g id=\"Sweater\" transform=\"translate(34.000000, 135.000000)\"><path d=\"M0.484652061,65.8913384 L2.49271156,0.684489652 C2.49271156,0.684489652 53.8418936,27.7319522 125.514469,0.684489652 C126.637098,0.260837098 126.965823,8.75764212 126.965823,8.75764212 L131.049088,66.8944796 L0.484652061,65.8913384 Z\" id=\"Path-67\" stroke=\"#241808\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"#912F40\"></path><path d=\"M2,10 C2,10 55.2646948,35.7918277 126.425034,8.60296585\" id=\"Path-66\" stroke=\"#241808\" stroke-width=\"2\"></path><g id=\"Fibers-dark\" opacity=\"0.46020154\" transform=\"translate(9.000000, 20.000000)\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M0.471133401,0.702775986 L0.377336284,3.38995172\" id=\"Path-65\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M6.65169343,5.6399659 L6.74828213,8.05579998\" id=\"Path-68\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><polyline id=\"Path-69\" stroke=\"#241808\" stroke-linejoin=\"round\" points=\"3.23591509 31.4682303 3.23591509 31.0388852 3.23591509 30.9919867\"></polyline><path d=\"M12.390067,42.4408181 L12.2493714,39.8474395\" id=\"Path-70\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M16.5629221,18.6409163 L16.7946233,16.037488\" id=\"Path-71\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M21.1600975,32.5401974 L21.0663004,31.1594815\" id=\"Path-72\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M32.7111008,28.1842146 L32.1505513,25.8230955\" id=\"Path-73\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><polyline id=\"Path-74\" stroke=\"#241808\" stroke-linejoin=\"round\" points=\"30.9116478 11.9746212 30.9116478 11.515127 30.9116478 11.4682284 30.9116478 11.3671732 30.9116478 11.3202746 30.9116478 11.2192194 30.9116478 11.1723209 30.9116478 11.0712656 30.9116478 10.9702104 30.9116478 10.8764133 30.9116478 10.7753581 30.9116478 10.5732476 30.9116478 10.526349 30.9116478 10.3783953 30.9116478 10.3314967 30.9116478 10.2845981 30.9116478 10.2376996 30.9116478 10.190801 30.9116478 10.1439025 30.9116478 10.0970039 30.9116478 10.0032068 30.9116478 9.95630823 30.9116478 9.86251111 30.9116478 9.81561255 30.9116478 9.76871399 30.9116478 9.72181543 30.9116478 9.67491688 30.9116478 9.62801832 30.9116478 9.58111976 30.9116478 9.5342212 30.9116478 9.48732264 30.9116478 9.44042408 30.9116478 9.39352553 30.9116478 9.34662697 30.9116478 9.39296721\"></polyline><path d=\"M46.3786807,11.1293305 C46.3161493,10.6274043 46.2536179,10.125478 46.1910864,9.62355179\" id=\"Path-75\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M62.5832493,10.1109618 L62.6759297,9.59507766\" id=\"Path-76\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M77.3501537,14.1006892 L77.3032551,11.7920518\" id=\"Path-77\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M85.5216692,25.9621163 L85.4278721,23.3966534\" id=\"Path-78\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M79.1563065,39.9579861 L78.8280166,37.8436427\" id=\"Path-79\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M94.6713546,39.8373898 L94.4290454,36.9776943\" id=\"Path-80\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M99.5817454,21.2666772 C99.1416061,20.7109666 98.7014669,20.1552559 98.2613276,19.5995452\" id=\"Path-81\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M93.8098728,11.9695963 L93.2867305,8.8921576\" id=\"Path-82\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M106.915228,9.60512735 L106.127444,6.41211716\" id=\"Path-83\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M112.682634,21.5609099 L111.301918,18.9881889\" id=\"Path-84\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M112.155584,36.8660311 L111.089758,34.5311529\" id=\"Path-85\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d=\"M105.333519,41.0489359 C105.035192,40.083235 104.736865,39.1175341 104.438538,38.1518332\" id=\"Path-86\" stroke=\"#241808\" stroke-linejoin=\"round\"></path><path d id=\"Path-87\" stroke=\"#979797\" stroke-linejoin=\"round\"></path><path d=\"M37.0772584,36.9221381 L39.0706751,41.8616486\" id=\"Path-104\" stroke=\"#241808\"></path><path d=\"M70.148762,41.2147889 L72.0092843,36.6195231\" id=\"Path-105\" stroke=\"#241808\"></path><polyline id=\"Path-106\" stroke=\"#241808\" points=\"55.706498 41.8168167 55.706498 43.1457612 55.706498 43.2786556 55.706498 43.4115501 55.706498 43.5444445\"></polyline></g><g id=\"Fibers-light\" opacity=\"0.25928442\" transform=\"translate(7.000000, 19.000000)\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M20.5611357,9.32323342 C20.4973016,8.48873685 20.4334674,7.65424028 20.3696333,6.81974371\" id=\"Path-88\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M10.7783197,18.1965524 L10.1613804,15.9510047\" id=\"Path-89\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M12.1467527,30.3901776 L11.8581032,27.1240279\" id=\"Path-90\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M3.74130269,41.392356 L3.41301278,39.3321694\" id=\"Path-91\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M30.39755,43.1326276 L29.952572,40.8340399\" id=\"Path-92\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M28.2770652,22.1086738 C28.1343224,21.2090403 27.9915795,20.3094069 27.8488367,19.4097734\" id=\"Path-93\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><polyline id=\"Path-94\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\" points=\"39.5706847 19.8625678 39.5706847 19.3170929 39.5706847 19.1535063 39.5706847 18.826333 39.5706847 18.6627464 39.5706847 18.5616911 39.5706847 18.4606359 39.5706847 18.4137373 39.5706847 18.2657836 39.5706847 18.1647283 39.5706847 18.0709312 39.5706847 17.9771341 39.5706847 17.9302355 39.5706847 17.883337 39.5706847 17.8364384 39.5706847 17.7895399 39.5706847 17.7426413 39.5706847 17.6957427 39.5706847 17.6488442 39.5706847 17.6019456 39.5706847 17.6482859 39.5706847 17.6946261 39.5706847 17.7409664\"></polyline><path d=\"M78.7695049,28.1814788 L78.3250852,25.2497606\" id=\"Path-95\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><polyline id=\"Path-96\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\" points=\"89.5399822 36.8208632 89.5399822 35.7232136 89.5399822 35.6221584 89.5399822 35.4585718 89.5399822 35.3575165 89.5399822 35.1939299 89.5399822 35.1470313 89.5399822 34.9834447 89.5399822 34.8354909 89.5399822 34.6719043 89.5399822 34.6250057 89.5399822 34.5781072 89.5399822 34.4770519 89.5399822 34.4301534 89.5399822 34.2821996 89.5399822 34.235301 89.5399822 34.1884025 89.5399822 34.1415039 89.5399822 34.0946054 89.5399822 34.0477068 89.5399822 34.2107351\"></polyline><path d=\"M100.08155,33.0790282 L99.6605794,29.5594031\" id=\"Path-97\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M108.059888,29.1490407 L107.895743,26.483081\" id=\"Path-98\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M93.0690987,21.1455784 L92.9211449,17.8537462\" id=\"Path-99\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><path d=\"M113.346584,3.56866863 L113.065192,0.51188759\" id=\"Path-100\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><polyline id=\"Path-101\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\" points=\"104.567062 17.0397212 104.567062 16.603118 104.567062 16.5562194 104.567062 16.5093209 104.567062 16.4624223 104.567062 16.4155238 104.567062 16.3686252 104.567062 16.3217266 104.567062 16.2279295 104.567062 16.181031 104.567062 16.1341324 104.567062 16.0872339 104.567062 16.0403353 104.567062 15.9934367 104.567062 15.9465382 104.567062 15.8996396 104.567062 15.8527411 104.567062 15.8058425 104.567062 15.7589439 104.567062 15.7120454 104.567062 15.6651468 104.567062 15.6182483 104.567062 15.5244511 104.567062 15.4775526 104.567062 15.430654 104.567062 15.3837555 104.567062 15.3368569 104.567062 15.2899584 104.567062 15.2430598 104.567062 15.1961612 104.567062 15.1492627 104.567062 15.1023641 104.567062 15.0554656 104.567062 15.008567 104.567062 14.9616684 104.567062 14.9147699 104.567062 14.8678713 104.567062 14.8209728 104.567062 14.7740742 104.567062 14.7271757 104.567062 14.6802771 104.567062 14.6333785 104.567062 14.58648\"></polyline><path d=\"M115.779726,45.1626652 L115.584873,41.5632008\" id=\"Path-102\" stroke=\"#FFFEFE\" stroke-linejoin=\"round\"></path><polyline id=\"Path-103\" stroke=\"#FFFDFD\" points=\"0.986187431 18.3978624 0.986187431 19.6835761 0.986187431 19.8164706 0.986187431 20.1046754 0.986187431 20.3704643 0.986187431 20.5033588 0.986187431 20.924458 0.986187431 21.0573525 0.986187431 21.1902469 0.986187431 21.6113462 0.986187431 21.7442406 0.986187431 21.8771351 0.986187431 22.0100295 0.986187431 22.142924 0.986187431 22.5416073 0.986187431 22.6745018 0.986187431 22.8073962 0.986187431 23.0731851 0.986187431 23.338974 0.986187431 23.4718685 0.986187431 23.6047629 0.986187431 23.7376573 0.986187431 23.8705518 0.986187431 24.0034462 0.986187431 24.1363407 0.986187431 24.2692351\"></polyline></g><g id=\"Chrome-logo\" transform=\"translate(41.000000, 27.000000)\"><path d=\"M23.605168,32.8630368 C32.6315277,32.8630368 39.9488372,25.5584805 39.9488372,16.5478528 C39.9488372,12.6293195 38.5649892,9.03343816 36.2585401,6.22065176 C33.2613325,2.5654644 28.706153,0.232668712 23.605168,0.232668712 C14.5788082,0.232668712 7.26149871,7.53722497 7.26149871,16.5478528 C7.26149871,25.5584805 14.5788082,32.8630368 23.605168,32.8630368 Z\" id=\"Oval-1\" stroke=\"#979797\" fill=\"#FFE66D\"></path><path d=\"M20.1833549,9.98995311 C19.9176717,9.93659771 19.6043764,9.93449465 19.2219103,9.867733 C17.6010199,9.5847974 17.6038834,9.67372493 17.6038834,9.67372493 C17.6038834,9.67372493 15.9167179,9.62861001 14.38885,9.84316366 C13.4566862,9.97406448 12.4085775,10.2211569 11.9655652,10.3605764 C7.75466638,11.6857788 5.22251767,14.1788693 3.98541773,15.5688605 C3.13491193,16.5244789 3.17043529,16.6145458 3.17043529,16.6145458 L10.2198864,29.5098529 C10.2198864,29.5098529 10.705236,23.4531286 12.4419496,21.6648817 C13.2386447,20.8445465 16.0294511,19.9421049 16.808018,19.8914139 C17.5865849,19.8407229 17.6051737,21.9063059 21.026686,21.6648814 C22.4755179,21.5626507 20.9743456,21.7171851 22.4158424,21.4290084 C23.8573392,21.1408318 22.9711079,21.2746181 24.9584342,21.1408318 C28.405349,20.9087863 31.8685736,20.4217786 31.8685736,20.4217786 C31.8685736,20.4217786 30.7967494,17.8342423 29.8327669,16.5577972 C29.5032773,16.1215078 29.0774556,15.519032 28.5953562,14.9999489 C27.7434554,14.0826953 26.836486,13.3053873 26.836486,13.3053873 C26.836486,13.3053873 25.2740508,12.0477226 24.5298956,11.6593543 C24.2865288,11.5323433 24.0302396,11.3768823 23.6233823,11.1640337 C23.1193771,10.900362 22.4450927,10.5789609 21.9985215,10.4740733 C21.4047233,10.3346059 21.0436363,10.1627177 20.1833549,9.98995311 Z\" id=\"Path-1\" fill=\"#71DE85\" transform=\"translate(17.519399, 19.585165) rotate(-127.000000) translate(-17.519399, -19.585165) \"></path><path d=\"M26.033797,0.26967972 C24.4129066,-0.0132558872 24.4157701,0.0756716518 24.4157701,0.0756716518 C24.4157701,0.0756716518 23.6932159,0.000231824227 22.7708311,0.0441270085 C22.2601975,0.0684274482 21.6883209,0.168657551 21.1438891,0.245110382 C20.2117254,0.376011196 19.2204642,0.623103638 18.7774518,0.762523069 C11.6715617,2.99880165 9.20741683,8.31356204 9.20741683,8.31356204 C9.20741683,8.31356204 17.1035714,19.3412832 17.5866562,19.8290664 C18.069741,20.3168495 16.416223,14.5892147 17.2304708,15.435272 C17.7307511,15.9498068 19.2538366,17.6342751 19.2538366,17.6342751 C20.074353,16.0452601 18.1722616,13.1804966 19.2538363,12.0668284 C20.0505314,11.2464932 19.4743724,11.1107901 20.2529393,11.0600991 C21.0315062,11.0094082 17.7223771,11.3015237 21.1438894,11.0600991 C24.5654017,10.8186746 19.3239163,10.1765475 22.7708312,9.94450202 C23.7763857,9.87680834 19.1957039,10.0138831 21.1438894,9.94450202 C22.4575797,9.89771735 19.3948691,10.0087354 21.4529554,9.94450202 C22.5524617,9.91018616 23.0540226,9.64078186 24.5119842,9.59505096 C30.1509423,9.41817753 38.2505336,9.41862661 38.2505336,9.41862661 C38.2505336,9.41862661 38.0262865,8.91808832 37.7230343,8.36270632 C37.4593645,7.87981635 37.0929923,7.38316045 36.6446536,6.78949857 C36.500347,6.59841686 36.3287417,6.36877867 36.1477967,6.13262448 C35.878363,5.78098232 35.5882211,5.47164117 35.3366633,5.19688689 C35.067934,4.90337757 34.8164239,4.60381916 34.5787605,4.38962015 C34.2443487,4.08822464 33.9373514,3.84347532 33.6483727,3.59383707 C32.6795319,2.75689061 32.02909,2.3929209 31.2849347,2.00455259 C30.7400909,1.72020324 29.5606257,1.06557803 28.7535607,0.876019977 C27.976378,0.693480477 27.6546873,0.43911844 26.033797,0.26967972 Z\" id=\"Path-1\" fill=\"#FF6B6B\"></path><path d=\"M23.6904393,23.1590491 C27.3323792,23.1590491 30.2847545,20.2118194 30.2847545,16.576227 C30.2847545,12.9406346 27.3323792,9.99340491 23.6904393,9.99340491 C20.0484994,9.99340491 17.096124,12.9406346 17.096124,16.576227 C17.096124,20.2118194 20.0484994,23.1590491 23.6904393,23.1590491 Z\" id=\"Oval-2\" stroke=\"#FFFFFF\" stroke-width=\"2\" fill=\"#66B7F9\"></path><circle id=\"Oval-3\" stroke=\"#5F2526\" stroke-width=\"2\" cx=\"23.5\" cy=\"16.5\" r=\"16.5\"></circle></g></g></g></svg>"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartPage = exports.SpeechCodePage = exports.SpeechPage = undefined;

var _Speech = __webpack_require__(22);

var _Speech2 = _interopRequireDefault(_Speech);

var _SpeechCode = __webpack_require__(21);

var _SpeechCode2 = _interopRequireDefault(_SpeechCode);

var _Start = __webpack_require__(23);

var _Start2 = _interopRequireDefault(_Start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.SpeechPage = _Speech2.default;
exports.SpeechCodePage = _SpeechCode2.default;
exports.StartPage = _Start2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames2 = __webpack_require__(5);

var _classnames3 = _interopRequireDefault(_classnames2);

var _bubble = __webpack_require__(40);

var _bubble2 = _interopRequireDefault(_bubble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bubble = function Bubble(_ref) {
    var _classnames;

    var children = _ref.children,
        me = _ref.me,
        full = _ref.full;

    var classes = (0, _classnames3.default)(_bubble2.default.bubble, (_classnames = {}, _defineProperty(_classnames, _bubble2.default['bubble--me'], me), _defineProperty(_classnames, _bubble2.default['bubble--full'], full), _classnames));

    return (0, _preact.h)(
        'div',
        { className: classes },
        children
    );
};

Bubble.propTypes = {
    children: _proptypes.element,
    full: _proptypes.boolean,
    me: _proptypes.boolean
};

Bubble.defaultProps = {
    me: false
};

exports.default = Bubble;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _keycode = __webpack_require__(9);

var _keycode2 = _interopRequireDefault(_keycode);

var _bubbles = __webpack_require__(41);

var _bubbles2 = _interopRequireDefault(_bubbles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bubbles = function (_Component) {
    _inherits(Bubbles, _Component);

    function Bubbles() {
        var _ref;

        _classCallCheck(this, Bubbles);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Bubbles.__proto__ || Object.getPrototypeOf(Bubbles)).call.apply(_ref, [this].concat(props)));

        _this.nextBubbleInstance = function (event) {
            return _this.nextBubble(event);
        };

        _this.state = {
            shownBubbles: 1
        };

        if (typeof _this.props.onNextBubble !== 'undefined') {
            _this.props.onNextBubble(_this.state.shownBubbles);
        }

        window.addEventListener('keyup', _this.nextBubbleInstance);
        return _this;
    }

    _createClass(Bubbles, [{
        key: 'renderBubbles',
        value: function renderBubbles() {
            var _this2 = this;

            return this.props.children.map(function (child, index) {
                if (index <= _this2.state.shownBubbles - 1) {
                    return child;
                }

                return null;
            });
        }
    }, {
        key: 'nextBubble',
        value: function nextBubble(event) {
            if (this.state.shownBubbles <= this.props.children.length && (0, _keycode2.default)(event) === 'up') {
                this.setState({ shownBubbles: this.state.shownBubbles + 1 });

                if (typeof this.props.onNextBubble !== 'undefined') {
                    this.props.onNextBubble(this.state.shownBubbles);
                }
            } else {
                window.removeEventListener('keyup', this.nextBubbleInstance);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                { className: _bubbles2.default.bubbles },
                this.renderBubbles()
            );
        }
    }]);

    return Bubbles;
}(_preact.Component);

Bubbles.propTypes = {
    children: _proptypes.element,
    onNextBubble: _proptypes.func
};
exports.default = Bubbles;
;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _ = __webpack_require__(3);

var _button = __webpack_require__(42);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aliases = {};

var Button = function Button(_ref) {
    var children = _ref.children,
        type = _ref.type,
        onClick = _ref.onClick,
        href = _ref.href,
        icon = _ref.icon,
        className = _ref.className;

    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    var props = {
        className: (0, _classnames2.default)(_button2.default.button, _button2.default['button--' + type], _button2.default[className]),
        onClick: onClick
    };

    if (href) {
        props.href = href;
    }

    if (href) {
        return (0, _preact.h)(
            'a',
            props,
            icon && (0, _preact.h)(_.Icon, { name: icon, className: _button2.default['button__icon'] }),
            (0, _preact.h)(
                'span',
                { className: _button2.default['button__inner'] },
                children
            )
        );
    }

    return (0, _preact.h)(
        'button',
        props,
        icon && (0, _preact.h)(_.Icon, { name: icon, className: _button2.default['button__icon'] }),
        (0, _preact.h)(
            'span',
            { className: _button2.default['button__inner'] },
            children
        )
    );
};

Button.propTypes = {
    children: _proptypes.element.isRequired,
    className: _proptypes.string,
    icon: _proptypes.string,
    onClick: _proptypes.func,
    href: _proptypes.string,
    style: _proptypes.object,
    type: _proptypes.string
};

Button.defaultProps = {
    type: 'primary'
};

exports.default = Button;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _prismjs = __webpack_require__(55);

var _prismjs2 = _interopRequireDefault(_prismjs);

__webpack_require__(51);

__webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = function Code(_ref) {
    var code = _ref.code,
        lang = _ref.lang;

    return (0, _preact.h)(
        'pre',
        null,
        (0, _preact.h)('code', { dangerouslySetInnerHTML: { __html: _prismjs2.default.highlight(code, _prismjs2.default.languages[lang]) } })
    );
};

Code.propTypes = {
    code: _proptypes.string,
    lang: _proptypes.string
};

Code.defaultProps = {
    lang: 'javascript'
};

exports.default = Code;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _container = __webpack_require__(44);

var _container2 = _interopRequireDefault(_container);

var _Cat = __webpack_require__(7);

var _Cat2 = _interopRequireDefault(_Cat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        'div',
        { className: _container2.default.container },
        children,
        (0, _preact.h)(_Cat2.default, null)
    );
};

Container.propTypes = {
    children: _proptypes.element.isRequired
};

exports.default = Container;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _footer = __webpack_require__(45);

var _footer2 = _interopRequireDefault(_footer);

var _Icon = __webpack_require__(8);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
    return (0, _preact.h)(
        'footer',
        { className: _footer2.default.footer },
        (0, _preact.h)(
            'a',
            { className: _footer2.default['footer__twitter'], href: 'https://twitter.com/sambego' },
            (0, _preact.h)(_Icon2.default, { name: 'twitter', size: 'small', className: _footer2.default['footer__icon'] }),
            'Sambego'
        )
    );
};

Footer.propTypes = {};

exports.default = Footer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _keycode = __webpack_require__(9);

var _keycode2 = _interopRequireDefault(_keycode);

var _preactRouter = __webpack_require__(6);

var _preactRouter2 = _interopRequireDefault(_preactRouter);

var _ = __webpack_require__(3);

var _slide = __webpack_require__(47);

var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slide = function Slide(_ref) {
    var children = _ref.children,
        previous = _ref.previous,
        next = _ref.next;

    var navigate = function navigate(event) {
        var keys = {
            left: function left() {
                return previous && _preactRouter2.default.route(previous);
            },
            right: function right() {
                return next && _preactRouter2.default.route(next);
            }
        };

        var listener = keys[(0, _keycode2.default)(event)];
        if (typeof listener !== 'undefined') {
            listener();
        }
    };

    window.addEventListener('keyup', navigate);

    return (0, _preact.h)(
        'section',
        { className: _slide2.default.slide },
        previous && (0, _preact.h)(_.SlideNav, { direction: 'left', to: previous }),
        next && (0, _preact.h)(_.SlideNav, { direction: 'right', to: next }),
        children
    );
};

Slide.propTypes = {
    children: _proptypes.element.isRequired,
    previous: _proptypes.string,
    next: _proptypes.string
};

exports.default = Slide;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames2 = __webpack_require__(5);

var _classnames3 = _interopRequireDefault(_classnames2);

var _ = __webpack_require__(3);

var _slideNav = __webpack_require__(48);

var _slideNav2 = _interopRequireDefault(_slideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SlideNav = function SlideNav(_ref) {
    var _classnames;

    var direction = _ref.direction,
        to = _ref.to;

    var classes = (0, _classnames3.default)(_slideNav2.default['slide-nav'], (_classnames = {}, _defineProperty(_classnames, _slideNav2.default['slide-nav--left'], direction === 'left'), _defineProperty(_classnames, _slideNav2.default['slide-nav--right'], direction === 'right'), _classnames));

    return (0, _preact.h)(
        'a',
        { className: classes, href: to },
        (0, _preact.h)(_.Icon, { name: 'caret-' + direction, size: 'small', color: 'white' })
    );
};

SlideNav.propTypes = {
    direction: _proptypes.string,
    to: _proptypes.string
};

SlideNav.defaultProps = {
    direction: 'left'
};

exports.default = SlideNav;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var SpeechCodePage = function SpeechCodePage(_ref) {
    var children = _ref.children;

    var codeExample1 = 'const synth = window.speechSynthesis;';
    var codeExample2 = 'const utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');';
    var codeExample3 = 'synth.speak(utterThis);';
    var codeExample4 = 'const voice = voices.find(voice => voice.name === \'Fiona\');\nutterThis.voice = voice;';
    var codeExample5 = '// We start by creating a voice synthesizer\nconst synth = window.speechSynthesis;\n\n// Next we create a new speech synthesis utterance\nconst utterThis = new SpeechSynthesisUtterance(\'Hi everybody!\');\n\n// We choose an appropriate voce\nconst voice = voices.find(voice => voice.name === \'Fiona\');\n\nutterThis.voice = voice;\n\n// And last, let\'s speak!\nsynth.speak(utterThis);';

    return (0, _preact.h)(
        _Components.Slide,
        { previous: 'speech-code' },
        (0, _preact.h)(
            _Components.Bubbles,
            null,
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'So let\'s see how this speech API works.'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'We start by creating a new speech synthesizer.'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                { full: true },
                (0, _preact.h)(_Components.Code, { code: codeExample1 })
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'Once we have this synthesizer, we can create a new speech synthesis utterance.'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                { full: true },
                (0, _preact.h)(_Components.Code, { code: codeExample2 })
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'The last thing we have to do is let the synthesizer speak our words.'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                { full: true },
                (0, _preact.h)(_Components.Code, { code: codeExample3 })
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'Ok cool, but I\'m a female cat and the default English voice is a male one. How do I change this?'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                { full: true },
                (0, _preact.h)(_Components.Code, { code: codeExample4 })
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                'Let\'s recap shall we?'
            ),
            (0, _preact.h)(
                _Components.Bubble,
                { full: true },
                (0, _preact.h)(_Components.Code, { code: codeExample5 })
            )
        )
    );
};

SpeechCodePage.propTypes = {};

exports.default = SpeechCodePage;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var _speech = __webpack_require__(49);

var _speech2 = _interopRequireDefault(_speech);

var _Services = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpeechPage = function SpeechPage(_ref) {
    var children = _ref.children;

    var conf = 'Front Trends';
    var bubble1 = 'Hi ' + conf + ', did you know the browser could talk? Cool huh!';
    var bubble2 = 'The web speech API converts text to spoken words. You can even choose my voice, since I’m a female cat, I’ll be talking with a female voice. Meow!';

    var speak = function speak(bubbleId) {
        switch (bubbleId) {
            case 1:
                _Services.Speech.speak(bubble1);
                break;
            case 2:
                _Services.Speech.speak(bubble2);
                break;
        }
    };

    return (0, _preact.h)(
        _Components.Slide,
        { previous: '/', next: 'speech-code' },
        (0, _preact.h)(
            _Components.Bubbles,
            { onNextBubble: speak },
            (0, _preact.h)(
                _Components.Bubble,
                null,
                bubble1
            ),
            (0, _preact.h)(
                _Components.Bubble,
                null,
                bubble2
            )
        )
    );
};

SpeechPage.propTypes = {};

exports.default = SpeechPage;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var _start = __webpack_require__(50);

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartPage = function StartPage(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        _Components.Slide,
        { next: 'speech' },
        (0, _preact.h)(
            'h1',
            { className: _start2.default['start__title'] },
            'I didn\'t know the browser could do that!'
        )
    );
};

StartPage.propTypes = {};

exports.default = StartPage;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Speech = function () {
    function Speech() {
        _classCallCheck(this, Speech);
    }

    _createClass(Speech, null, [{
        key: 'speak',
        value: function speak(input) {
            var _this = this;

            var utterThis = new SpeechSynthesisUtterance(input);
            var voices = this.synth.getVoices();
            var doSpeak = function doSpeak() {
                var voice = voices.find(function (voice) {
                    return voice.name === 'Fiona';
                });

                // Set voice params
                utterThis.voice = voice;
                utterThis.pitch = 2;
                utterThis.rate = .8;

                // Speak§
                _this.synth.speak(utterThis);
            };

            if (voices.length) {
                doSpeak();
            } else {
                // http://stackoverflow.com/questions/21513706/getting-the-list-of-voices-in-speechsynthesis-of-chrome-web-speech-api
                window.speechSynthesis.onvoiceschanged = doSpeak;
            }
        }
    }]);

    return Speech;
}();

Speech.synth = window.speechSynthesis;
exports.default = Speech;
;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Speech = undefined;

var _Speech2 = __webpack_require__(24);

var _Speech3 = _interopRequireDefault(_Speech2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Speech = _Speech3.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "code[class*=language-],pre[class*=language-]{color:#000;background:none;text-shadow:0 1px #fff;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-]::-moz-selection,code[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-]::selection,code[class*=language-] ::selection,pre[class*=language-]::selection,pre[class*=language-] ::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#a67f59;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "code,code[class*=language-],pre[class*=language-]{color:#333;text-align:left;white-space:pre;word-spacing:normal;tab-size:4;hyphens:none;font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;line-height:1.4;direction:ltr;cursor:text}pre[class*=language-]{overflow:auto;margin:0;padding:0;border-radius:3px;font-size:85%}li code,p code,table code{margin:0;border-radius:3px;padding:.2em 0;font-size:85%}li code:after,li code:before,p code:after,p code:before,table code:after,table code:before{letter-spacing:-.2em;content:\"\\A0\"}:not(pre)>code[class*=language-],code,pre[class*=language-]{background:#fff}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#969896}.token.atrule,.token.attr-value,.token.punctuation,.token.string{color:#183691}.token.property,.token.tag{color:#63a35c}.token.boolean,.token.number{color:#0086b3}.language-css .token.string,.token.attr-name,.token.attr-value .punctuation:first-child,.token.entity,.token.important,.token.keyword,.token.operator,.token.regex,.token.selector,.token.url{color:#a71d5d}.token.entity{cursor:help}.namespace{opacity:.7}", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".bubble__bubble___2ajAp{-ms-flex-item-align:start;align-self:flex-start;width:auto;max-width:30rem;padding:1.5rem;margin:0 0 1.5rem;background:#fff;border:2px solid #241808;border-radius:1rem;font-size:2rem;line-height:150%}.bubble__bubble--full___R246Y{max-width:100%}.bubble__bubble--me___GrFh_{-ms-flex-item-align:end;align-self:flex-end;background:#71de85}", ""]);

// exports
exports.locals = {
	"bubble": "bubble__bubble___2ajAp",
	"bubble--full": "bubble__bubble--full___R246Y",
	"bubble--me": "bubble__bubble--me___GrFh_"
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".bubbles__bubbles___2yGAj{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;height:100%}", ""]);

// exports
exports.locals = {
	"bubbles": "bubbles__bubbles___2yGAj"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".button__button___1EbNH{-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out;display:inline-block;padding:1rem 1.5rem;margin:0 1rem 0 0;border:1px solid #66b7f9;border-radius:.3rem;color:#66b7f9;text-decoration:none;line-height:2.4rem}.button__button___1EbNH:hover{background:#66b7f9;border-color:#66b7f9;color:#fff}.button__button__icon___sLLuj,.button__button__inner___1hiP6{vertical-align:bottom}.button__button__icon___sLLuj{margin:0 1rem 0 0}.button__button--secondary___wUlJz{color:#fff;border-color:#fff}.button__button--secondary___wUlJz:hover{background:#fff;border-color:#fff;color:#66b7f9}", ""]);

// exports
exports.locals = {
	"button": "button__button___1EbNH",
	"button__inner": "button__button__inner___1hiP6",
	"button__icon": "button__button__icon___sLLuj",
	"button--secondary": "button__button--secondary___wUlJz"
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".cat__cat___31oSZ{position:absolute;bottom:4.5rem;left:0;width:30rem}", ""]);

// exports
exports.locals = {
	"cat": "cat__cat___31oSZ"
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".container__container___2d73f{position:relative;width:100rem;height:100%;padding:1rem 1rem 8rem 35rem;margin:0 auto}", ""]);

// exports
exports.locals = {
	"container": "container__container___2d73f"
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".footer__footer___2vT-1{position:fixed;z-index:1;bottom:0;left:0;width:100%;padding:1rem 2rem;background:#66b7f9}.footer__footer__twitter___-DbBX{float:right;color:#595959;text-decoration:none}.footer__footer__icon___2DCov{margin:.2rem .5rem 0 0}", ""]);

// exports
exports.locals = {
	"footer": "footer__footer___2vT-1",
	"footer__twitter": "footer__footer__twitter___-DbBX",
	"footer__icon": "footer__footer__icon___2DCov"
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".icon__icon___-HLTi{height:2.4rem;width:2.4rem;display:inline-block}.icon__icon___-HLTi circle,.icon__icon___-HLTi line,.icon__icon___-HLTi path,.icon__icon___-HLTi polygon,.icon__icon___-HLTi rect{fill:currentColor}.icon__icon___-HLTi svg{width:2.4rem;height:auto}.icon__icon-exposed-folder___1Gl_2 .icon__exposed___14Jj7 path{fill:rgba(36,24,8,.3)}.icon__icon--huge___8BJO4{width:21rem;height:21rem;line-height:21rem}.icon__icon--huge___8BJO4 svg{width:21rem;height:21rem}.icon__icon--small___6mxIJ{width:2rem;height:2rem;line-height:2rem}.icon__icon--small___6mxIJ svg{width:2rem;height:2rem}.icon__icon--tiny___1VJA1{width:.8rem;height:.8rem;line-height:.8rem}.icon__icon--tiny___1VJA1 svg{width:.8rem;height:.8rem}", ""]);

// exports
exports.locals = {
	"icon": "icon__icon___-HLTi",
	"icon-exposed-folder": "icon__icon-exposed-folder___1Gl_2",
	"exposed": "icon__exposed___14Jj7",
	"icon--huge": "icon__icon--huge___8BJO4",
	"icon--small": "icon__icon--small___6mxIJ",
	"icon--tiny": "icon__icon--tiny___1VJA1"
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".slide__slide___89aR2{width:100%;height:100%}", ""]);

// exports
exports.locals = {
	"slide": "slide__slide___89aR2"
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".slide-nav__slide-nav___3Uj6_{-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0);position:fixed;top:50%;left:2rem;width:4rem;height:4rem;padding:1rem 0 0;background:#66b7f9;border-radius:50%;text-align:center;line-height:4rem}.slide-nav__slide-nav--right___2h8eQ{left:auto;right:2rem}", ""]);

// exports
exports.locals = {
	"slide-nav": "slide-nav__slide-nav___3Uj6_",
	"slide-nav--right": "slide-nav__slide-nav--right___2h8eQ"
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".start__start__title___2csGc{padding:15rem 0 0;color:#66b7f9;font-size:6.9rem;text-align:center;line-height:150%}", ""]);

// exports
exports.locals = {
	"start__title": "start__start__title___2csGc"
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@font-face{font-family:Baloo Bhaina;font-style:normal;font-weight:400;src:local(\"Baloo Bhaina\"),local(\"BalooBhaina-Regular\"),url(" + __webpack_require__(54) + ") format(\"woff2\"),url(" + __webpack_require__(53) + ") format(\"woff\")}*{box-sizing:border-box}html{font-size:10px}body{padding:0;margin:0;background:#e7eef4;font-size:1.6rem;font-family:Baloo Bhaina,Helvetica,sans-serif;color:#241808}h1,h2,h3,p{margin:0 0 1.5rem}strong{color:#35a0f7}pre{overflow:auto;margin:0;font-size:1.6rem}", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./bubble.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./bubble.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./bubbles.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./bubbles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./button.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./button.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./cat.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./cat.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./container.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./container.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./footer.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./footer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./icon.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./icon.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide-nav.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide-nav.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./speech.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./speech.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./start.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./start.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../css-loader/index.js!./prism.css", function() {
			var newContent = require("!!./../../css-loader/index.js!./prism.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./prism.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./prism.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "baloo-bhaina-v1-latin-regular.woff";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "baloo-bhaina-v1-latin-regular.woff2";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || document.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				env.element.textContent = env.code;
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i=0, pos = 0; i<strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && p < to; ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
		    immediateClose = message.immediateClose;

		_self.postMessage(_.highlight(code, _.languages[lang], lang));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/i,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		if(Array.prototype.forEach) { // Check to prevent error in IE8
			Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
				var src = pre.getAttribute('data-src');

				var language, parent = pre;
				var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (pre.className.match(lang) || [, ''])[1];
				}

				if (!language) {
					var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
					language = Extensions[extension] || extension;
				}

				var code = document.createElement('code');
				code.className = 'language-' + language;

				pre.textContent = '';

				code.textContent = 'Loading…';

				pre.appendChild(code);

				var xhr = new XMLHttpRequest();

				xhr.open('GET', src, true);

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {

						if (xhr.status < 400 && xhr.responseText) {
							code.textContent = xhr.responseText;

							Prism.highlightElement(code);
						}
						else if (xhr.status >= 400) {
							code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
						}
						else {
							code.textContent = '✖ Error: File does not exist or is empty';
						}
					}
				};

				xhr.send(null);
			});
		}

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 376 300\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>browser</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"_x32_1\"><path d=\"M20.4959684,299.046 C9.45250001,299.046 0.5,290.084435 0.5,279.05421 L0.5,20.95579 C0.5,9.91462926 9.44569468,0.964 20.4959684,0.964 L355.504032,0.964 C366.5475,0.964 375.5,9.92556502 375.5,20.95579 L375.5,279.05421 C375.5,290.095371 366.554305,299.046 355.504032,299.046 L20.4959684,299.046 Z M328.508,32.897 C328.508,38.639 333.137,43.297 338.894,43.297 C344.672,43.297 349.338,38.639 349.338,32.897 C349.338,27.17 344.672,22.467 338.894,22.467 C333.137,22.468 328.508,27.171 328.508,32.897 L328.508,32.897 Z M256.071,32.897 C256.071,37.454 259.785,41.159 264.362,41.159 L307.707,41.159 C312.285,41.159 315.983,37.454 315.983,32.897 C315.983,28.297 312.285,24.606 307.707,24.606 L264.362,24.606 C259.785,24.606 256.071,28.298 256.071,32.897 L256.071,32.897 Z M358.684,60.143 L22.146,60.143 L22.146,263.815 C22.171,272.59 29.416,279.856 38.161,279.856 L342.643,279.856 C351.403,279.856 358.668,272.59 358.683,263.815 L358.683,60.143 L358.684,60.143 Z\" id=\"Shape\" fill=\"#000000\"></path><path d=\"M70.827,171.237 L137.031,138.147 L137.031,154.157 L91.427,175.296 L137.031,194.03 L137.031,209.968 L70.827,180.759 L70.827,171.237 L70.827,171.237 Z M170.008,223.518 L188.465,223.518 L224.812,126.032 L206.355,126.032 L170.008,223.518 L170.008,223.518 Z M231.345,138.147 L231.345,154.157 L276.96,175.296 L231.345,194.03 L231.345,209.968 L297.571,180.759 L297.571,171.237 L231.345,138.147 L231.345,138.147 Z\" id=\"Shape\" fill=\"#000000\"></path><g id=\"Group\" transform=\"translate(123.000000, 73.000000)\" fill=\"#FFFFFF\"><path d=\"M39.845,48.185 C42.522,45.49 44.338,40.581 44.852,38.384 C45.265,40.597 46.884,45.577 49.433,48.39 C52.623,51.876 56.245,54.015 58.497,53.941 C56.073,54.425 52.491,57.062 49.302,60.914 C46.251,64.605 44.395,67.974 44.2,70.406 C44.101,67.961 42.376,64.504 39.505,60.724 C36.485,56.753 33.028,53.956 30.644,53.341 C32.895,53.458 36.557,51.495 39.845,48.185 L39.845,48.185 Z\" id=\"Shape\"></path><path d=\"M67.775,24.337 C69.453,22.651 70.592,19.575 70.918,18.198 C71.179,19.591 72.178,22.71 73.781,24.483 C75.781,26.665 78.037,28.012 79.458,27.924 C77.935,28.262 75.701,29.916 73.701,32.319 C71.785,34.604 70.625,36.729 70.5,38.266 C70.435,36.729 69.354,34.575 67.557,32.188 C65.666,29.698 63.502,27.954 62.004,27.573 C63.414,27.647 65.707,26.417 67.775,24.337 L67.775,24.337 Z\" id=\"Shape\"></path><path d=\"M10.449,11.944 C13.203,8.735 14.829,3.139 15.22,0.62 C15.861,3.081 18.051,8.487 21.142,11.372 C24.921,14.962 29.071,17.042 31.568,16.837 C28.931,17.583 25.181,20.821 21.966,25.347 C18.882,29.669 17.073,33.579 17.066,36.349 C16.758,33.595 14.543,29.904 11.046,25.904 C7.333,21.744 3.264,18.931 0.547,18.433 C3.062,18.462 7.025,15.942 10.449,11.944 L10.449,11.944 Z\" id=\"Shape\"></path></g></g></g></svg>"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 308 181\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>caret-down</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M302.445,142.788 L164.63,4.959 C158.494,-1.171 148.556,-1.171 142.427,4.959 L4.597,142.788 C-1.532,148.92 -1.532,158.857 4.597,164.989 L15.698,176.09 C21.827,182.226 31.774,182.226 37.907,176.09 L153.527,60.464 L269.151,176.09 C275.279,182.226 285.221,182.226 291.352,176.09 L302.453,164.989 C308.589,158.85 308.589,148.92 302.445,142.788 L302.445,142.788 Z\" id=\"Shape\" fill=\"#000000\" transform=\"translate(153.527125, 90.526750) rotate(-180.000000) translate(-153.527125, -90.526750) \"></path></g></svg>"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 181 308\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>caret-left</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M239.445,205.788 L101.63,67.959 C95.494,61.829 85.556,61.829 79.427,67.959 L-58.403,205.788 C-64.532,211.92 -64.532,221.857 -58.403,227.989 L-47.302,239.09 C-41.173,245.226 -31.226,245.226 -25.093,239.09 L90.527,123.464 L206.151,239.09 C212.279,245.226 222.221,245.226 228.352,239.09 L239.453,227.989 C245.589,221.85 245.589,211.92 239.445,205.788 L239.445,205.788 Z\" id=\"Shape\" fill=\"#000000\" transform=\"translate(90.527125, 153.526750) rotate(-90.000000) translate(-90.527125, -153.526750) \"></path></g></svg>"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 181 308\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>caret-right</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M239.445,205.788 L101.63,67.959 C95.494,61.829 85.556,61.829 79.427,67.959 L-58.403,205.788 C-64.532,211.92 -64.532,221.857 -58.403,227.989 L-47.302,239.09 C-41.173,245.226 -31.226,245.226 -25.093,239.09 L90.527,123.464 L206.151,239.09 C212.279,245.226 222.221,245.226 228.352,239.09 L239.453,227.989 C245.589,221.85 245.589,211.92 239.445,205.788 L239.445,205.788 Z\" id=\"Shape\" fill=\"#000000\" transform=\"translate(90.527125, 153.526750) rotate(-270.000000) translate(-90.527125, -153.526750) \"></path></g></svg>"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 308 181\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>caret-up</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M302.445,142.788 L164.63,4.959 C158.494,-1.171 148.556,-1.171 142.427,4.959 L4.597,142.788 C-1.532,148.92 -1.532,158.857 4.597,164.989 L15.698,176.09 C21.827,182.226 31.774,182.226 37.907,176.09 L153.527,60.464 L269.151,176.09 C275.279,182.226 285.221,182.226 291.352,176.09 L302.453,164.989 C308.589,158.85 308.589,148.92 302.445,142.788 L302.445,142.788 Z\" id=\"Shape\" fill=\"#000000\"></path></g></svg>"

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 33 33\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>github</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M16.608,0.455 C7.614,0.455 0.32,7.748 0.32,16.745 C0.32,23.942 4.987,30.047 11.46,32.201 C12.275,32.351 12.572,31.848 12.572,31.416 C12.572,31.03 12.558,30.005 12.55,28.646 C8.019,29.63 7.063,26.462 7.063,26.462 C6.322,24.58 5.254,24.079 5.254,24.079 C3.775,23.069 5.366,23.089 5.366,23.089 C7.001,23.204 7.861,24.768 7.861,24.768 C9.314,27.257 11.674,26.538 12.602,26.121 C12.75,25.069 13.171,24.351 13.636,23.944 C10.019,23.533 6.216,22.135 6.216,15.893 C6.216,14.115 6.851,12.66 7.893,11.522 C7.725,11.11 7.166,9.453 8.053,7.211 C8.053,7.211 9.42,6.773 12.532,8.881 C13.831,8.519 15.225,8.339 16.61,8.332 C17.994,8.339 19.387,8.519 20.688,8.881 C23.798,6.773 25.163,7.211 25.163,7.211 C26.052,9.453 25.493,11.11 25.326,11.522 C26.37,12.66 27,14.115 27,15.893 C27,22.151 23.191,23.528 19.563,23.931 C20.147,24.434 20.668,25.428 20.668,26.948 C20.668,29.125 20.648,30.882 20.648,31.416 C20.648,31.852 20.942,32.359 21.768,32.2 C28.236,30.041 32.899,23.94 32.899,16.745 C32.899,7.748 25.605,0.455 16.608,0.455\" id=\"Fill-3\" fill=\"#151513\"></path></g></svg>"

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 14 12\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>Shape</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M4.40272,11.59 C9.68576,11.59 12.57536,7.21304 12.57536,3.41736 C12.57536,3.29304 12.57536,3.16928 12.56696,3.04608 C13.1291056,2.63947008 13.6143591,2.13601246 14,1.55928 C13.4757723,1.79156899 12.9196644,1.94390404 12.35024,2.0112 C12.9498566,1.65222995 13.3986292,1.08763231 13.61304,0.42248 C13.0492082,0.757054977 12.4323618,0.992846731 11.78912,1.11968 C10.8987664,0.172940796 9.48400284,-0.0587769528 8.33814759,0.55446076 C7.19229235,1.16769847 6.60031399,2.47338241 6.89416,3.73936 C4.58466161,3.62357974 2.43290644,2.53274103 0.9744,0.73832 C0.212028744,2.05076105 0.601433215,3.72976131 1.86368,4.57264 C1.40657507,4.55909223 0.959436448,4.43578338 0.56,4.21312 L0.56,4.24952 C0.560374154,5.61681206 1.52418083,6.79445969 2.8644,7.0652 C2.44152697,7.18052643 1.99784513,7.19738481 1.56744,7.11448 C1.94373084,8.28455678 3.02208175,9.08611896 4.25096,9.1092 C3.23385162,9.90856189 1.97739333,10.3425035 0.68376,10.3412 C0.455225999,10.3407613 0.226914277,10.3269242 0,10.29976 C1.31355613,11.1427149 2.8419515,11.5898415 4.40272,11.58776\" id=\"Shape\" fill=\"#595959\"></path></g></svg>"

/***/ }),
/* 63 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./browser.svg": 56,
	"./caret-down.svg": 57,
	"./caret-left.svg": 58,
	"./caret-right.svg": 59,
	"./caret-up.svg": 60,
	"./github.svg": 61,
	"./poes.svg": 10,
	"./twitter.svg": 62
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 64;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

var _preact = __webpack_require__(0);

var _preactRouter = __webpack_require__(6);

var _preactRouter2 = _interopRequireDefault(_preactRouter);

var _Components = __webpack_require__(3);

var _Pages = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _preact.render)((0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
        _Components.Container,
        null,
        (0, _preact.h)(
            _preactRouter2.default,
            null,
            (0, _preact.h)(_Pages.StartPage, { path: '/' }),
            (0, _preact.h)(_Pages.SpeechPage, { path: '/speech' }),
            (0, _preact.h)(_Pages.SpeechCodePage, { path: '/speech-code' })
        )
    ),
    (0, _preact.h)(_Components.Footer, null)
), document.body);

/***/ })
/******/ ]);
//# sourceMappingURL=script.2a5c8378266bdc53f6b2.js.map