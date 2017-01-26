var __wpo = {
  "assets": {
    "main": [
      "./app.js"
    ],
    "additional": [],
    "optional": []
  },
  "externals": [],
  "hashesMap": {
    "a66627db533354af9cc9d033d8798557cc892372": "./app.js"
  },
  "strategy": "changed",
  "responseStrategy": "cache-first",
  "version": "1/18/2017, 10:54:10 PM",
  "name": "webpack-offline",
  "pluginVersion": "4.5.5",
  "relativePaths": true
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "61813b4ff93c9bcfaef8"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	      'use strict';

	if (false) {
	  var DEBUG = false;
	}

	function WebpackServiceWorker(params, helpers) {
	  var loaders = helpers.loaders;
	  var cacheMaps = helpers.cacheMaps;

	  var strategy = params.strategy;
	  var responseStrategy = params.responseStrategy;

	  var assets = params.assets;
	  var loadersMap = params.loaders || {};

	  var hashesMap = params.hashesMap;
	  var externals = params.externals;

	  // Not used yet
	  // const alwaysRevalidate = params.alwaysRevalidate;
	  // const ignoreSearch = params.ignoreSearch;
	  // const preferOnline = params.preferOnline;

	  var CACHE_PREFIX = params.name;
	  var CACHE_TAG = params.version;
	  var CACHE_NAME = CACHE_PREFIX + ':' + CACHE_TAG;

	  var STORED_DATA_KEY = '__offline_webpack__data';

	  mapAssets();

	  var allAssets = [].concat(assets.main, assets.additional, assets.optional);
	  var navigateFallbackURL = params.navigateFallbackURL;

	  self.addEventListener('install', function (event) {
	    console.log('[SW]:', 'Install event');

	    var installing = undefined;

	    if (strategy === 'changed') {
	      installing = cacheChanged('main');
	    } else {
	      installing = cacheAssets('main');
	    }

	    event.waitUntil(installing);
	  });

	  self.addEventListener('activate', function (event) {
	    console.log('[SW]:', 'Activate event');

	    var activation = cacheAdditional();

	    // Delete all assets which name starts with CACHE_PREFIX and
	    // is not current cache (CACHE_NAME)
	    activation = activation.then(storeCacheData);
	    activation = activation.then(deleteObsolete);
	    activation = activation.then(function () {
	      if (self.clients && self.clients.claim) {
	        return self.clients.claim();
	      }
	    });

	    event.waitUntil(activation);
	  });

	  function cacheAdditional() {
	    if (!assets.additional.length) {
	      return Promise.resolve();
	    }

	    if (true) {
	      console.log('[SW]:', 'Caching additional');
	    }

	    var operation = undefined;

	    if (strategy === 'changed') {
	      operation = cacheChanged('additional');
	    } else {
	      operation = cacheAssets('additional');
	    }

	    // Ignore fail of `additional` cache section
	    return operation['catch'](function (e) {
	      console.error('[SW]:', 'Cache section `additional` failed to load');
	    });
	  }

	  function cacheAssets(section) {
	    var batch = assets[section];

	    return caches.open(CACHE_NAME).then(function (cache) {
	      return addAllNormalized(cache, batch, {
	        bust: params.version,
	        request: params.prefetchRequest
	      });
	    }).then(function () {
	      logGroup('Cached assets: ' + section, batch);
	    })['catch'](function (e) {
	      console.error(e);
	      throw e;
	    });
	  }

	  function cacheChanged(section) {
	    return getLastCache().then(function (args) {
	      if (!args) {
	        return cacheAssets(section);
	      }

	      var lastCache = args[0];
	      var lastKeys = args[1];
	      var lastData = args[2];

	      var lastMap = lastData.hashmap;
	      var lastVersion = lastData.version;

	      if (!lastData.hashmap || lastVersion === params.version) {
	        return cacheAssets(section);
	      }

	      var lastHashedAssets = Object.keys(lastMap).map(function (hash) {
	        return lastMap[hash];
	      });

	      var lastUrls = lastKeys.map(function (req) {
	        var url = new URL(req.url);
	        url.search = '';

	        return url.toString();
	      });

	      var sectionAssets = assets[section];
	      var moved = [];
	      var changed = sectionAssets.filter(function (url) {
	        if (lastUrls.indexOf(url) === -1 || lastHashedAssets.indexOf(url) === -1) {
	          return true;
	        }

	        return false;
	      });

	      Object.keys(hashesMap).forEach(function (hash) {
	        var asset = hashesMap[hash];

	        // Return if not in sectionAssets or in changed or moved array
	        if (sectionAssets.indexOf(asset) === -1 || changed.indexOf(asset) !== -1 || moved.indexOf(asset) !== -1) return;

	        var lastAsset = lastMap[hash];

	        if (lastAsset && lastUrls.indexOf(lastAsset) !== -1) {
	          moved.push([lastAsset, asset]);
	        } else {
	          changed.push(asset);
	        }
	      });

	      logGroup('Changed assets: ' + section, changed);
	      logGroup('Moved assets: ' + section, moved);

	      var movedResponses = Promise.all(moved.map(function (pair) {
	        return lastCache.match(pair[0]).then(function (response) {
	          return [pair[1], response];
	        });
	      }));

	      return caches.open(CACHE_NAME).then(function (cache) {
	        var move = movedResponses.then(function (responses) {
	          return Promise.all(responses.map(function (pair) {
	            return cache.put(pair[0], pair[1]);
	          }));
	        });

	        return Promise.all([move, addAllNormalized(cache, changed, {
	          bust: params.version,
	          request: params.prefetchRequest
	        })]);
	      });
	    });
	  }

	  function deleteObsolete() {
	    return caches.keys().then(function (keys) {
	      var all = keys.map(function (key) {
	        if (key.indexOf(CACHE_PREFIX) !== 0 || key.indexOf(CACHE_NAME) === 0) return;

	        console.log('[SW]:', 'Delete cache:', key);
	        return caches['delete'](key);
	      });

	      return Promise.all(all);
	    });
	  }

	  function getLastCache() {
	    return caches.keys().then(function (keys) {
	      var index = keys.length;
	      var key = undefined;

	      while (index--) {
	        key = keys[index];

	        if (key.indexOf(CACHE_PREFIX) === 0) {
	          break;
	        }
	      }

	      if (!key) return;

	      var cache = undefined;

	      return caches.open(key).then(function (_cache) {
	        cache = _cache;
	        return _cache.match(new URL(STORED_DATA_KEY, location).toString());
	      }).then(function (response) {
	        if (!response) return;

	        return Promise.all([cache, cache.keys(), response.json()]);
	      });
	    });
	  }

	  function storeCacheData() {
	    return caches.open(CACHE_NAME).then(function (cache) {
	      var data = new Response(JSON.stringify({
	        version: params.version,
	        hashmap: hashesMap
	      }));

	      return cache.put(new URL(STORED_DATA_KEY, location).toString(), data);
	    });
	  }

	  self.addEventListener('fetch', function (event) {
	    var requestUrl = event.request.url;
	    var url = new URL(requestUrl);
	    var urlString = undefined;

	    if (externals.indexOf(requestUrl) !== -1) {
	      urlString = requestUrl;
	    } else {
	      url.search = '';
	      urlString = url.toString();
	    }

	    // Handle only GET requests
	    var isGET = event.request.method === 'GET';
	    var assetMatches = allAssets.indexOf(urlString) !== -1;
	    var cacheUrl = urlString;

	    if (!assetMatches) {
	      var cacheRewrite = matchCacheMap(event.request);

	      if (cacheRewrite) {
	        cacheUrl = cacheRewrite;
	        assetMatches = true;
	      }
	    }

	    if (!assetMatches && isGET) {
	      // If isn't a cached asset and is a navigation request,
	      // fallback to navigateFallbackURL if available
	      if (navigateFallbackURL && isNavigateRequest(event.request)) {
	        event.respondWith(handleNavigateFallback(fetch(event.request)));

	        return;
	      }
	    }

	    if (!assetMatches || !isGET) {
	      // Fix for https://twitter.com/wanderview/status/696819243262873600
	      if (url.origin !== location.origin && navigator.userAgent.indexOf('Firefox/44.') !== -1) {
	        event.respondWith(fetch(event.request));
	      }

	      return;
	    }

	    // Logic of caching / fetching is here
	    // * urlString -- url to match from the CACHE_NAME
	    // * event.request -- original Request to perform fetch() if necessary
	    var resource = undefined;

	    if (responseStrategy === "network-first") {
	      resource = networkFirstResponse(event, urlString, cacheUrl);
	    }
	    // "cache-first"
	    // (responseStrategy has been validated before)
	    else {
	        resource = cacheFirstResponse(event, urlString, cacheUrl);
	      }

	    if (navigateFallbackURL && isNavigateRequest(event.request)) {
	      resource = handleNavigateFallback(resource);
	    }

	    event.respondWith(resource);
	  });

	  self.addEventListener('message', function (e) {
	    var data = e.data;
	    if (!data) return;

	    switch (data.action) {
	      case 'skipWaiting':
	        {
	          if (self.skipWaiting) self.skipWaiting();
	        }break;
	    }
	  });

	  function cacheFirstResponse(event, urlString, cacheUrl) {
	    return cachesMatch(cacheUrl, CACHE_NAME).then(function (response) {
	      if (response) {
	        if (true) {
	          console.log('[SW]:', 'URL [' + cacheUrl + '](' + urlString + ') from cache');
	        }

	        return response;
	      }

	      // Load and cache known assets
	      var fetching = fetch(event.request).then(function (response) {
	        if (!response.ok) {
	          if (true) {
	            console.log('[SW]:', 'URL [' + urlString + '] wrong response: [' + response.status + '] ' + response.type);
	          }

	          return response;
	        }

	        if (true) {
	          console.log('[SW]:', 'URL [' + urlString + '] from network');
	        }

	        if (cacheUrl === urlString) {
	          (function () {
	            var responseClone = response.clone();

	            caches.open(CACHE_NAME).then(function (cache) {
	              return cache.put(urlString, responseClone);
	            }).then(function () {
	              console.log('[SW]:', 'Cache asset: ' + urlString);
	            });
	          })();
	        }

	        return response;
	      });

	      return fetching;
	    });
	  }

	  function networkFirstResponse(event, urlString, cacheUrl) {
	    return fetch(event.request).then(function (response) {
	      if (response.ok) {
	        if (true) {
	          console.log('[SW]:', 'URL [' + urlString + '] from network');
	        }

	        return response;
	      }

	      // throw to reach the code in the catch below
	      throw new Error("response is not ok");
	    })
	    // this needs to be in a catch() and not just in the then() above
	    // cause if your network is down, the fetch() will throw
	    ['catch'](function () {
	      if (true) {
	        console.log('[SW]:', 'URL [' + urlString + '] from cache if possible');
	      }

	      return cachesMatch(cacheUrl, CACHE_NAME);
	    });
	  }

	  function handleNavigateFallback(fetching) {
	    return fetching['catch'](function () {}).then(function (response) {
	      if (!response || !response.ok) {
	        if (true) {
	          console.log('[SW]:', 'Loading navigation fallback [' + navigateFallbackURL + '] from cache');
	        }

	        return cachesMatch(navigateFallbackURL, CACHE_NAME);
	      }

	      return response;
	    });
	  }

	  function mapAssets() {
	    Object.keys(assets).forEach(function (key) {
	      assets[key] = assets[key].map(function (path) {
	        var url = new URL(path, location);

	        if (externals.indexOf(path) === -1) {
	          url.search = '';
	        } else {
	          // Remove hash from possible passed externals
	          url.hash = '';
	        }

	        return url.toString();
	      });
	    });

	    Object.keys(loadersMap).forEach(function (key) {
	      loadersMap[key] = loadersMap[key].map(function (path) {
	        var url = new URL(path, location);

	        if (externals.indexOf(path) === -1) {
	          url.search = '';
	        } else {
	          // Remove hash from possible passed externals
	          url.hash = '';
	        }

	        return url.toString();
	      });
	    });

	    hashesMap = Object.keys(hashesMap).reduce(function (result, hash) {
	      var url = new URL(hashesMap[hash], location);
	      url.search = '';

	      result[hash] = url.toString();
	      return result;
	    }, {});

	    externals = externals.map(function (path) {
	      var url = new URL(path, location);
	      url.hash = '';

	      return url.toString();
	    });
	  }

	  function addAllNormalized(cache, requests, options) {
	    var allowLoaders = options.allowLoaders !== false;
	    var bustValue = options && options.bust;
	    var requestInit = options.request || {
	      credentials: 'omit',
	      mode: 'cors'
	    };

	    return Promise.all(requests.map(function (request) {
	      if (bustValue) {
	        request = applyCacheBust(request, bustValue);
	      }

	      return fetch(request, requestInit);
	    })).then(function (responses) {
	      if (responses.some(function (response) {
	        return !response.ok;
	      })) {
	        return Promise.reject(new Error('Wrong response status'));
	      }

	      var extracted = [];
	      var addAll = responses.map(function (response, i) {
	        if (allowLoaders) {
	          extracted.push(extractAssetsWithLoaders(requests[i], response));
	        }

	        return cache.put(requests[i], response);
	      });

	      if (extracted.length) {
	        (function () {
	          var newOptions = copyObject(options);
	          newOptions.allowLoaders = false;

	          var waitAll = addAll;

	          addAll = Promise.all(extracted).then(function (all) {
	            var extractedRequests = [].concat.apply([], all);

	            if (requests.length) {
	              waitAll = waitAll.concat(addAllNormalized(cache, extractedRequests, newOptions));
	            }

	            return Promise.all(waitAll);
	          });
	        })();
	      } else {
	        addAll = Promise.all(addAll);
	      }

	      return addAll;
	    });
	  }

	  function extractAssetsWithLoaders(request, response) {
	    var all = Object.keys(loadersMap).map(function (key) {
	      var loader = loadersMap[key];

	      if (loader.indexOf(request) !== -1 && loaders[key]) {
	        return loaders[key](response.clone());
	      }
	    }).filter(function (a) {
	      return !!a;
	    });

	    return Promise.all(all).then(function (all) {
	      return [].concat.apply([], all);
	    });
	  }

	  function matchCacheMap(request) {
	    var urlString = request.url;
	    var url = new URL(urlString);

	    var requestType = undefined;

	    if (request.mode === 'navigate') {
	      requestType = 'navigate';
	    } else if (url.origin === location.origin) {
	      requestType = 'same-origin';
	    } else {
	      requestType = 'cross-origin';
	    }

	    for (var i = 0; i < cacheMaps.length; i++) {
	      var map = cacheMaps[i];

	      if (!map) continue;
	      if (map.requestTypes && map.requestTypes.indexOf(requestType) === -1) {
	        continue;
	      }

	      var newString = undefined;

	      if (typeof map.match === 'function') {
	        newString = map.match(url, request);
	      } else {
	        newString = urlString.replace(map.match, map.to);
	      }

	      if (newString && newString !== urlString) {
	        return newString;
	      }
	    }
	  }
	}

	function cachesMatch(request, cacheName) {
	  return caches.match(request, {
	    cacheName: cacheName
	  })
	  // Return void if error happened (cache not found)
	  ['catch'](function () {});
	}

	function applyCacheBust(asset, key) {
	  var hasQuery = asset.indexOf('?') !== -1;
	  return asset + (hasQuery ? '&' : '?') + '__uncache=' + encodeURIComponent(key);
	}

	function getClientsURLs() {
	  if (!self.clients) {
	    return Promise.resolve([]);
	  }

	  return self.clients.matchAll({
	    includeUncontrolled: true
	  }).then(function (clients) {
	    if (!clients.length) return [];

	    var result = [];

	    clients.forEach(function (client) {
	      var url = new URL(client.url);
	      url.search = '';
	      url.hash = '';
	      var urlString = url.toString();

	      if (!result.length || result.indexOf(urlString) === -1) {
	        result.push(urlString);
	      }
	    });

	    return result;
	  });
	}

	function isNavigateRequest(request) {
	  return request.mode === 'navigate' || request.headers.get('Upgrade-Insecure-Requests') || (request.headers.get('Accept') || '').indexOf('text/html') !== -1;
	}

	function copyObject(original) {
	  return Object.keys(original).reduce(function (result, key) {
	    result[key] = original[key];
	    return result;
	  }, {});
	}

	function logGroup(title, assets) {
	  console.groupCollapsed('[SW]:', title);

	  assets.forEach(function (asset) {
	    console.log('Asset:', asset);
	  });

	  console.groupEnd();
	}
	      WebpackServiceWorker(__wpo, {
	loaders: {},
	cacheMaps: [],
	});
	      module.exports = __webpack_require__(1)
	    

/***/ },
/* 1 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);