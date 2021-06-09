/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/tk-comCelebration2020-web/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App'\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"403ca227-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"403ca227-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"app\" } }, [\n    _c(\"div\", { staticClass: \"main\" }, [_c(\"router-view\")], 1)\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22403ca227-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=less&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=less& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body,\\ndiv,\\ndl,\\ndt,\\ndd,\\nul,\\nol,\\nli,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\npre,\\ncode,\\nform,\\nfieldset,\\nlegend,\\ninput,\\ntextarea,\\np,\\nblockquote,\\nth,\\ntd,\\nhr,\\nbutton,\\narticle,\\naside,\\ndetails,\\nfigcaption,\\nfigure,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\nsection {\\n  margin: 0;\\n  padding: 0;\\n}\\nbody,\\nhtml {\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n  -moz-user-select: none;\\n   -ms-user-select: none;\\n       user-select: none;\\n  -webkit-user-select: none;\\n}\\nbody {\\n  padding-bottom: env(safe-area-inset-bottom);\\n  -webkit-text-size-adjust: 100% !important;\\n  -moz-text-size-adjust: 100% !important;\\n   -ms-text-size-adjust: 100% !important;\\n       text-size-adjust: 100% !important;\\n}\\nh1,\\nh2 {\\n  font-weight: normal;\\n}\\nli {\\n  list-style-type: none;\\n}\\ni {\\n  font-style: normal;\\n}\\ninput {\\n  outline: none;\\n}\\n#app {\\n  width: 100%;\\n  height: 100%;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n}\\n.main {\\n  -webkit-box-flex: 1;\\n      -ms-flex: 1;\\n          flex: 1;\\n  overflow: hidden;\\n}\\n.home {\\n  width: 100%;\\n  height: 100%;\\n  padding-bottom: env(safe-area-inset-bottom);\\n}\\n.van-share-sheet .van-share-sheet__title {\\n  font-size: 0.53333rem;\\n  color: #333;\\n  font-weight: 600;\\n}\\n.van-share-sheet .van-share-sheet__options {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  -ms-flex-pack: distribute;\\n      justify-content: space-around;\\n}\\n.van-share-sheet .van-share-sheet__options .van-share-sheet__icon {\\n  margin-bottom: 0.4rem;\\n}\\n.van-share-sheet .van-share-sheet__options .van-share-sheet__name {\\n  color: #999;\\n  font-size: 0.37333rem;\\n}\\n.van-share-sheet .van-share-sheet__cancel {\\n  color: #999;\\n  font-size: 0.42667rem;\\n  font-weight: 400;\\n}\\n.van-icon-ellipsis::before {\\n  content: \\\"\\\\F04E\\\";\\n  font-size: 0.69333rem;\\n}\\n#app {\\n  font-family: Avenir, Helvetica, Arial, sans-serif;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n  color: #2c3e50;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--10-oneOf-1-2!../node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=less& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=less&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"24513734\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-2!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=less& */ \"./src/App.vue?vue&type=style&index=0&lang=less&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--10-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--10-oneOf-1-2!../node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=less& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=less&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_403ca227_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"403ca227-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"403ca227-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_403ca227_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_403ca227_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/js/getInterfaceData.js":
/*!*******************************************!*\
  !*** ./src/assets/js/getInterfaceData.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _tool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tool */ \"./src/assets/js/tool.js\");\n/* harmony import */ var vant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vant */ \"./node_modules/vant/es/index.js\");\n\n\n\n\n\nvar loadinginstace; //http request 拦截器\n\naxios__WEBPACK_IMPORTED_MODULE_2___default.a.interceptors.request.use(function (config) {\n  return config;\n}, function (err) {\n  vant__WEBPACK_IMPORTED_MODULE_4__[\"Toast\"].fail('加载超时');\n  return Promise.reject(err);\n}); // http response 拦截器\n\naxios__WEBPACK_IMPORTED_MODULE_2___default.a.interceptors.response.use(function (response) {\n  return response;\n}, function (error) {\n  if (error.response) {\n    switch (error.response.status) {\n      // 401 清除token信息并跳转到登录页面(store.commit(types.LOGOUT);)\n      case 401:\n        vant__WEBPACK_IMPORTED_MODULE_4__[\"Toast\"].fail({\n          message: 'token失效',\n          duration: 2500\n        });\n        break;\n    }\n  }\n\n  return Promise.reject(error.response.data);\n});\nvar Plugin = {\n  install: function install(vue, options) {\n    vue.prototype.$getInterfaceData = function (url, type, data, isPushRequestHeaders) {\n      var configHeaders = {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json; charset=UTF-8'\n      };\n      var token = localStorage.getItem('token');\n      console.log('token===' + token); //let token = 'e11edb48-29f0-435a-963f-85ff762b6b25'\n\n      var urlHref = window.location.href;\n      configHeaders = Object.assign({\n        'token': token,\n        'urlHref': urlHref\n      }, configHeaders);\n\n      if (isPushRequestHeaders) {\n        configHeaders['X-Auth-Token'] = token;\n      }\n\n      var Public = {//公共参数\n\n        /*'srAppid': \"\"*/\n      };\n      var httpDefaultOpts = {\n        //http默认配置\n        method: type,\n        url: url,\n        headers: configHeaders,\n        timeout: 20000,\n        //超时时间\n        params: Object.assign(Public, data),\n        data: data,\n        transformRequest: function transformRequest(data) {\n          // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等...\n          data = JSON.stringify(data);\n          return data;\n        },\n        transformResponse: function transformResponse(data) {\n          // 这里提前处理返回的数据\n          data = JSON.parse(data);\n          return data;\n        }\n      };\n\n      if (type == 'GET') {\n        delete httpDefaultOpts.data;\n      } else {\n        delete httpDefaultOpts.params;\n      }\n\n      var promise = new Promise(function (resolve, reject) {\n        axios__WEBPACK_IMPORTED_MODULE_2___default()(httpDefaultOpts).then(function (res) {\n          resolve(res);\n        }).catch(function (response) {\n          reject(response);\n        });\n      });\n      return promise;\n    };\n  }\n}; //生成随机uuid\n\nfunction S4() {\n  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);\n}\n\nfunction guid() {\n  return S4() + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + \"-\" + S4() + S4() + S4();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Plugin);\n\n//# sourceURL=webpack:///./src/assets/js/getInterfaceData.js?");

/***/ }),

/***/ "./src/assets/js/interface.js":
/*!************************************!*\
  !*** ./src/assets/js/interface.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar ApiSetting = {\n  commitNum: '/f1-tkcc/v1.0/census/commit',\n  //数据统计接口\n  getTaskList: '/f1-tkcc/v1.0/activity-task-record/list/{openId}',\n  //获取任务列表接口\n  checkActive: '/f1-tkcc/v1.0/activities/activityStatus',\n  //是否在活动中的接口\n  applyNowMain: '/f1-mds/api/v1/masterData/find/101/2',\n  //所在地区主数据\n  saveAdress: '/f1-tkcc/v1.0/customer/addOrupdate',\n  //保存收货地址\n  saveApponitment: '/f1-tkcc/v1.0/order/',\n  //保存预约\n  threeGroupNetWork: '/f1-tkcc/v1.0/activities/threeBoyGroup?interOpKey={interOpKey}&userId={userId}&channel={channel}&openId={openId}&prevOpenId={prevOpenId}',\n  // 短信送祝福校验接口，判断跳转哪个页面（验证码/送祝福/抽奖）\n  getCodeAuthority: '/f1-msg/sms/api/v1/getShortMsgToken/{mobile}',\n  // 获取发送短信权限接口\n  sendCode: '/f1-msg/sms/api/v1/sendMsgValidationCode',\n  // 发送短信接口\n  verifyCode: '/f1-msg/sms/api/v1/isValidationCodeByTokenAndTakeEffectCustomer?validationCodeToken={validationCodeToken}&validationCode={validationCode}&openId={openId}',\n  // 短信认证接口\n  queryNum: '/f1-tkcc/v1.0/customer/queryNum/',\n  //查询抽奖次数接口文档\n  findRecentPrizeInfo: '/f1-tkcc/v1.0/lottery-records/findRecentPrizeInfo',\n  //查询最近一次中奖信息接口\n  activities: '/f1-tkcc/v1.0/activities/',\n  //判断当前是否在活动中接口\n  getPrizes: '/f1-tkcc/v1.0/prizes?',\n  //奖品列表\n  luckDraw: '/f1-tkcc/v1.0/lotteries/luckDraw',\n  //抽奖接口\n  customer: '/f1-tkcc/v1.0/customer/{openId}',\n  //查询弹幕列表接口\n  sendBlessing: '/f1-tkcc/v1.0/activities/sendBlessing',\n  //发送祝福接口\n  applyBlessing: '/f1-mds/api/v1/masterData/find/109/1',\n  //祝福语主数据\n  myPrizes: '/f1-tkcc/v1.0/lottery-records/findPrizeList',\n  //奖品列表查询接口\n  prizeAddress: '/f1-tkcc/v1.0/customer/address' //实物奖品地址详情接口\n\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (ApiSetting);\n\n//# sourceURL=webpack:///./src/assets/js/interface.js?");

/***/ }),

/***/ "./src/assets/js/tool.js":
/*!*******************************!*\
  !*** ./src/assets/js/tool.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor */ \"./node_modules/core-js/modules/es.regexp.constructor.js\");\n/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.match */ \"./node_modules/core-js/modules/es.string.match.js\");\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.split */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interface */ \"./src/assets/js/interface.js\");\n/* harmony import */ var vant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vant */ \"./node_modules/vant/es/index.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar tool = {\n  //姓名正则\n  regName: /(^[A-Za-z\\s]{1,30}$)|(^[\\u4e00-\\u9fa5]{1,30}$)|(^[\\u4e00-\\u9fa5A-Za-z]{1,30}$)/,\n  //手机号\n  regPhone: /^(1)\\d{10}$/,\n  //座机号\n  regTelephone: /^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,}))?$/,\n  //身份证号\n  regCertificationNum: /^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$|^[1-9]\\\\d{5}\\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\\d{3}$/,\n  //邮箱\n  regEmail: /^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/g,\n  //住址邮编\n  regPostCode: /^[0-9]*$/,\n\n  /**\n   * 非空判断\n   * @author \n   * @param {String} obj\n   * @returns boolean\n   */\n  isnotNull: function isnotNull(obj) {\n    if (obj == \"\" || obj == null || obj == \"undefined\") return false;else return true;\n  },\n\n  /**\n   * 表单清空\n   * @author\n   * @param {Object} data(表单字段)\n   * @returns\n   */\n  clearForm: function clearForm(data) {\n    for (var name in data.ruleForm) {\n      data.ruleForm[name] = \"\";\n    }\n  },\n\n  /**\n   * 验证文本框值的字符串长度(按字节)\n   * @author\n   * @param {String} val(文本框的值)\n   * @returns len\n   */\n  getByteLen: function getByteLen(val) {\n    var len = 0;\n\n    for (var i = 0; i < val.length; i++) {\n      var a = val.charAt(i);\n\n      if (a.match(/[^\\x00-\\xff]/ig) != null) {\n        len += 2;\n      } else {\n        len += 1;\n      }\n    }\n\n    return len;\n  },\n\n  /**\n   * url参数截取\n   * @author\n   * @param {String} url\n   * @returns obj\n   */\n  parseQueryStr: function parseQueryStr(url) {\n    if (url.indexOf('?') >= 0) {\n      var obj = {};\n      var ary = url.split('?')[1].split('&');\n\n      for (var i = 0; i < ary.length; i++) {\n        var cur = ary[i].split('=');\n        obj[cur[0]] = cur[1];\n      }\n\n      return obj;\n    }\n  },\n\n  /**\n   * 设置cookie\n   */\n  setCookie: function setCookie(cname, cvalue, exdays) {\n    var d = new Date();\n    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);\n    var expires = \"expires=\" + d.toUTCString();\n    document.cookie = cname + \"=\" + cvalue + \"; \" + \"expires=\" + 'Session';\n  },\n\n  /**\n   * 获取cookie\n   */\n  getCookie: function getCookie(cname) {\n    var name = cname + \"=\";\n    var ca = document.cookie.split(';');\n\n    for (var i = 0; i < ca.length; i++) {\n      var c = ca[i];\n\n      while (c.charAt(0) == ' ') {\n        c = c.substring(1);\n      }\n\n      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);\n    }\n\n    return \"\";\n  },\n\n  /**\n   * 设置cookie,session有效\n   */\n  setCookieNoDate: function setCookieNoDate(key, val) {\n    document.cookie = key + \"=\" + val + \";path=/\";\n  },\n\n  /**\n   * 清除cookie,session\n   */\n  clearCookie: function clearCookie() {\n    var myDate = new Date();\n    var data = document.cookie;\n    var dataArray = data.split(\"; \");\n\n    for (var i = 0; i < dataArray.length; i++) {\n      var varName = dataArray[i].split(\"=\");\n      document.cookie = varName[0] + \"='';path=/;expires=\" + myDate.toGMTString();\n    }\n  },\n\n  /**\n   * 字典name转code\n   * @author\n   * @param {Object} optionsArr\n   * @param {String} value\n   * @returns code\n   */\n  changeValue: function changeValue(optionsArr, value) {\n    var arr = [];\n    arr = optionsArr.filter(function (item) {\n      return item.name === value;\n    });\n    return arr[0].code;\n  },\n\n  /**\n   * 字典code转name\n   * @author liry 2018/06/15\n   * @param {Object} optionsArr\n   * @param {String} value\n   * @param {String} keyStr:数组中对应的键名\n   * @param {String} valStr：数组中对应的value键名\n   * @returns name\n   */\n  changeCode: function changeCode(optionsArr, value, keyStr, valStr) {\n    var arr = [];\n    arr = optionsArr.filter(function (item) {\n      return item[keyStr] === value;\n    });\n\n    try {\n      return arr[0][valStr];\n    } catch (e) {\n      console.log(e);\n    }\n  },\n\n  /**\n   * 时间格式转换\n   */\n  timeToTransfer: function timeToTransfer(time) {\n    var str = '';\n\n    if (time) {\n      var transfer = new Date(time);\n      var month = transfer.getMonth() + 1,\n          year = transfer.getFullYear(),\n          dates = transfer.getDate(),\n          hours = transfer.getHours(),\n          minutes = transfer.getMinutes();\n\n      if (month < 10) {\n        month = '0' + month;\n      }\n\n      ;\n\n      if (dates < 10) {\n        dates = '0' + dates;\n      }\n\n      ;\n      str = year + '-' + month + '-' + dates;\n    }\n\n    return str;\n  },\n\n  /**\n   * 毫秒值转成时间格式，精确到分\n   */\n  timeToDate: function timeToDate(time) {\n    var transfer = new Date(time);\n    var month = transfer.getMonth() + 1,\n        year = transfer.getFullYear(),\n        dates = transfer.getDate(),\n        hours = transfer.getHours(),\n        minutes = transfer.getMinutes();\n\n    if (month < 10) {\n      month = '0' + month;\n    }\n\n    ;\n\n    if (dates < 10) {\n      dates = '0' + dates;\n    }\n\n    ;\n\n    if (hours < 10) {\n      hours = '0' + hours;\n    }\n\n    ;\n\n    if (minutes < 10) {\n      minutes = '0' + minutes;\n    }\n\n    ;\n    return year + '-' + month + '-' + dates + \" \" + hours + \":\" + minutes;\n  },\n\n  /**\n   * 毫秒值转成时间格式，精确到秒\n   */\n  timeToDateScond: function timeToDateScond(time) {\n    var transfer = new Date(time);\n    var month = transfer.getMonth() + 1,\n        year = transfer.getFullYear(),\n        dates = transfer.getDate(),\n        hours = transfer.getHours(),\n        minutes = transfer.getMinutes(),\n        second = transfer.getSeconds();\n\n    if (month < 10) {\n      month = '0' + month;\n    }\n\n    ;\n\n    if (dates < 10) {\n      dates = '0' + dates;\n    }\n\n    ;\n\n    if (hours < 10) {\n      hours = '0' + hours;\n    }\n\n    ;\n\n    if (minutes < 10) {\n      minutes = '0' + minutes;\n    }\n\n    ;\n\n    if (second < 10) {\n      second = '0' + second;\n    }\n\n    ;\n    return year + '-' + month + '-' + dates + \" \" + hours + \":\" + minutes + \":\" + second;\n  },\n\n  /**\n   * 毫秒值转成时间格式,yyyy-MM(回传给服务器的格式)\n   */\n  timeToMonth: function timeToMonth(time) {\n    var transfer = new Date(time);\n    var month = transfer.getMonth() + 1,\n        year = transfer.getFullYear();\n\n    if (month < 10) {\n      month = '0' + month;\n    }\n\n    ;\n    return year + '-' + month;\n  },\n\n  /**\n   * 时间转换为XX年XX月\n   */\n  timeToShowMonth: function timeToShowMonth(time) {\n    var transfer = new Date(time);\n    var month = transfer.getMonth() + 1,\n        year = transfer.getFullYear(),\n        dates = transfer.getDate();\n    return year + '年' + month + '月' + dates + '日';\n  },\n\n  /*\n   *url 传参序列化\n   * @param {Object} obj\n   *@returns str\n   */\n  serialization: function serialization(obj) {\n    var str = \"\",\n        i;\n\n    for (i in obj) {\n      if (obj[i] != \"\") {\n        str += i + \"=\" + obj[i] + \"&\";\n      }\n    }\n\n    return str.substr(0, str.length - 1);\n  },\n\n  /**\n   * 计算年龄\n   * @author liry 2018/07/20\n   * @param birthday //1992-08-08\n   * @param {String} birthday\n   * @returns age\n   */\n  countAge: function countAge(birthday) {\n    var birthDate = new Date(birthday);\n    var nowDate = new Date();\n    var age = nowDate.getFullYear() - birthDate.getFullYear();\n\n    if (nowDate.getMonth() < birthDate.getMonth() || nowDate.getMonth() == birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()) {\n      age--;\n    }\n\n    return age;\n  },\n\n  /**\n   * input输入框中特殊字符去除\n   * @param str\n   */\n  inputValidate: function inputValidate(val) {\n    var pattern = new RegExp(\"[`~@#￥$%^&*()=|{}<>`]\");\n    var result = \"\";\n\n    for (var i = 0, len = val.length; i < len; i++) {\n      result = result + val[i].replace(pattern, '');\n    }\n\n    return result;\n  },\n\n  /**\n   * 获取当前页面宽度\n   */\n  getClientWidth: function getClientWidth() {\n    var clientW = document.documentElement.clientWidth || document.body.clientWidth;\n    return clientW;\n  },\n\n  /**\n   * 获取当前页面高度\n   */\n  getClientHeight: function getClientHeight() {\n    var clientH = document.documentElement.clientHeight || document.body.clientHeight;\n    return clientH;\n  },\n\n  /**\n   * 判断当前环境类型\n   */\n  getPlatType: function getPlatType() {\n    var result = '';\n    var nav = navigator.userAgent;\n\n    if (nav.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {\n      //微信环境\n      result = 'wx';\n    } else if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {\n      //android环境\n      result = 'android';\n    } else if (!!nav.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/)) {\n      //ios环境\n      result = 'ios';\n    } else {\n      result = 'pc';\n    }\n\n    return result;\n  },\n\n  /**\n   * 页面访问插码统计\n   * @param name ⾃定义的⻚⾯名称 示例 HWP招募系统\n   * @param title ⻚⾯标题 示例 HWP招募系统\n   */\n  getPageVisit: function getPageVisit(id, name) {\n    try {\n      TDAPP.onCustomPage(id, name);\n    } catch (e) {\n      console.log(e);\n    }\n  },\n\n  /**\n   * 事件访问插码统计\n   * @param EventId 事件的id \"点击⼴告\",\n   * @param Label ⻚⾯⾏为事件 示例 Banner⼴告位第⼀屏\n   */\n  getEventVisit: function getEventVisit(EventId, Label) {\n    try {\n      if (this.getPlatType() == \"wx\") {\n        var channel = this.parseQueryStr(window.location.href).channel;\n        var companyCode = this.parseQueryStr(window.location.href).companyCode;\n        var userCode = this.parseQueryStr(window.location.href).userCode;\n        var kv = {\n          \"channel\": channel,\n          \"orgCode\": companyCode,\n          \"staffNumber\": userCode\n        };\n      } else {\n        var info = JSON.parse(sessionStorage.getItem('userInfo'));\n        var kv = {\n          \"channel\": info.channel,\n          \"orgCode\": info.companyCode,\n          \"staffNumber\": info.userCode\n        };\n      }\n    } catch (_unused) {}\n  },\n\n  /**\n   * 数据统计\n   * @param EventId 事件的id \"点击⼴告\",\n   * @param Label ⻚⾯⾏为事件 示例 Banner⼴告位第⼀屏\n   */\n  getCommitNum: function getCommitNum(vue, type) {\n    try {\n      var openId = localStorage.getItem('openId');\n      var param = {\n        \"openId\": openId,\n        \"type\": type\n      };\n      vue.$getInterfaceData(_interface__WEBPACK_IMPORTED_MODULE_9__[\"default\"].commitNum, 'post', param).then(function (res) {\n        switch (res.data.code) {\n          case '200':\n            break;\n          //\t\t\t\t\t\tcase '400000000':\n          //\t\t\t\t\t\t\tToast('必填参数为空');\n          //\t\t\t\t\t\t\tbreak;\t\n          //\t\t\t\t\t\tcase '400000006':\n          //\t\t\t\t\t\t\tToast('统计表数据更新失败');\n          //\t\t\t\t\t\t\tbreak;\n          //\t\t\t\t\t\tdefault:\n          //\t\t\t\t\t\t\tToast('服务器开小差了');\n          //\t\t\t\t\t\t\tbreak;\n        }\n      });\n    } catch (e) {\n      console.log(e);\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (tool);\n\n//# sourceURL=webpack:///./src/assets/js/tool.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_by_user_by_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_by_user_by_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_by_user_by_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_by_user_by_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_by_user_by_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var lib_flexible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib-flexible */ \"./node_modules/lib-flexible/flexible.js\");\n/* harmony import */ var lib_flexible__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lib_flexible__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var vant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vant */ \"./node_modules/vant/es/index.js\");\n/* harmony import */ var vant_lib_index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vant/lib/index.css */ \"./node_modules/vant/lib/index.css\");\n/* harmony import */ var vant_lib_index_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vant_lib_index_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var vant_lib_icon_local_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vant/lib/icon/local.css */ \"./node_modules/vant/lib/icon/local.css\");\n/* harmony import */ var vant_lib_icon_local_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vant_lib_icon_local_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _assets_js_tool__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./assets/js/tool */ \"./src/assets/js/tool.js\");\n/* harmony import */ var _assets_js_getInterfaceData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./assets/js/getInterfaceData */ \"./src/assets/js/getInterfaceData.js\");\n/* harmony import */ var _assets_js_interface__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./assets/js/interface */ \"./src/assets/js/interface.js\");\n\n\n\n\n//import 'babel-polyfill'\n //import Es6Promise from 'es6-promise'\n//require('es6-promise').polyfill()\n//Es6Promise.polyfill()\n\n\n\n //import vconsole from 'vconsole';\n//new vconsole();\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vant__WEBPACK_IMPORTED_MODULE_9__[\"default\"]); //import VueAwesomeSwiper from 'vue-awesome-swiper'\n//import 'swiper/css/swiper.css'\n//Vue.use(VueAwesomeSwiper)\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\n/*全局引用工具方法*/\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].prototype.$tool = _assets_js_tool__WEBPACK_IMPORTED_MODULE_12__[\"default\"];\n/*全局引用调用接口方法*/\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(_assets_js_getInterfaceData__WEBPACK_IMPORTED_MODULE_13__[\"default\"]);\n/*全局引用接口配置*/\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].prototype.$ApiSetting = _assets_js_interface__WEBPACK_IMPORTED_MODULE_14__[\"default\"];\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n\n\n\n/*重写路由push方法*/\n\nvar routerPush = vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"].prototype.push;\n\nvue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"].prototype.push = function push(location) {\n  return routerPush.call(this, location).catch(function (error) {\n    return error;\n  });\n};\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar routes = [{\n  path: '/celebrationMain',\n  //泰康24周年庆首页\n  name: 'celebrationMain',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../views/celebrationMain.vue */ \"./src/views/celebrationMain.vue\"));\n  }\n}, {\n  path: '/luckDrawPage',\n  //抽奖页\n  name: 'luckDrawPage',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../views/luckDrawPage.vue */ \"./src/views/luckDrawPage.vue\"));\n  }\n}, {\n  path: '/localInformation',\n  //填写物流信息页\n  name: 'localInformation',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ../views/localInformation.vue */ \"./src/views/localInformation.vue\"));\n  }\n}, {\n  path: '/myPrizes',\n  //我的奖品页\n  name: 'myPrizes',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../views/myPrizes.vue */ \"./src/views/myPrizes.vue\"));\n  }\n}, {\n  path: '/prizesDetail',\n  //奖品详情页\n  name: 'prizesDetail',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ../views/prizesDetail.vue */ \"./src/views/prizesDetail.vue\"));\n  }\n}, {\n  path: '/appointment',\n  //预约咨询页面\n  name: 'appointment',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ../views/appointment.vue */ \"./src/views/appointment.vue\"));\n  }\n}, {\n  path: '/tdbPage',\n  //泰多倍宣传页面\n  name: 'appointment',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ../views/tdbPage.vue */ \"./src/views/tdbPage.vue\"));\n  }\n}, {\n  path: '/prizesDetailHealth',\n  //健康服务奖品详情页\n  name: 'prizesDetailHealth',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ../views/prizesDetailHealth.vue */ \"./src/views/prizesDetailHealth.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  mode: 'history',\n  base: '/tk-comCelebration2020-web/',\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  state: {\n    tabFlag: false\n  },\n  // 数据我们在页面是获取到了，但是如果我们需要修改count值怎么办？\n  // 如果需要修改store中的值唯一的方法就是提交mutation来修改，\n  mutations: {\n    changeFlag: function changeFlag(state, val) {\n      state.tabFlag = val;\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });