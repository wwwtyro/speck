(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/rye/Dropbox/src/speck/node_modules/keyboardjs/keyboard.js":[function(require,module,exports){
/**
 * Title: KeyboardJS
 * Version: v0.4.1
 * Description: KeyboardJS is a flexible and easy to use keyboard binding
 * library.
 * Author: Robert Hurst.
 *
 * Copyright 2011, Robert William Hurst
 * Licenced under the BSD License.
 * See https://raw.github.com/RobertWHurst/KeyboardJS/master/license.txt
 */
(function(context, factory) {

	//INDEXOF POLLYFILL
	[].indexOf||(Array.prototype.indexOf=function(a,b,c){for(c=this.length,b=(c+~~b)%c;b<c&&(!(b in this)||this[b]!==a);b++);return b^c?b:-1;});

	//AMD
	if(typeof define === 'function' && define.amd) { define(constructAMD); }

	//CommonJS
	else if(typeof module !== 'undefined') {constructCommonJS()}

	//GLOBAL
	else { constructGlobal(); }

	/**
	 * Construct AMD version of the library
	 */
	function constructAMD() {

		//create a library instance
		return init();

		//spawns a library instance
		function init() {
			var library;
			library = factory('amd');
			library.fork = init;
			return library;
		}
	}

	/**
	 * Construct CommonJS version of the library
	 */
	function constructCommonJS() {

		//create a library instance
		module.exports = init();

		return;

		//spawns a library instance
		function init() {
			var library;
			library = factory('CommonJS');
			library.fork = init;
			return library;

		}

	}

	/**
	 * Construct a Global version of the library
	 */
	function constructGlobal() {
		var library;

		//create a library instance
		library = init();
		library.noConflict('KeyboardJS', 'k');

		//spawns a library instance
		function init() {
			var library, namespaces = [], previousValues = {};

			library = factory('global');
			library.fork = init;
			library.noConflict = noConflict;
			return library;

			//sets library namespaces
			function noConflict(    ) {
				var args, nI, newNamespaces;

				newNamespaces = Array.prototype.slice.apply(arguments);

				for(nI = 0; nI < namespaces.length; nI += 1) {
					if(typeof previousValues[namespaces[nI]] === 'undefined') {
						delete context[namespaces[nI]];
					} else {
						context[namespaces[nI]] = previousValues[namespaces[nI]];
					}
				}

				previousValues = {};

				for(nI = 0; nI < newNamespaces.length; nI += 1) {
					if(typeof newNamespaces[nI] !== 'string') {
						throw new Error('Cannot replace namespaces. All new namespaces must be strings.');
					}
					previousValues[newNamespaces[nI]] = context[newNamespaces[nI]];
					context[newNamespaces[nI]] = library;
				}

				namespaces = newNamespaces;

				return namespaces;
			}
		}
	}

})(this, function(env) {
	var KeyboardJS = {}, locales = {}, locale, map, macros, activeKeys = [], bindings = [], activeBindings = [],
	activeMacros = [], aI, usLocale;


	///////////////////////
	// DEFUALT US LOCALE //
	///////////////////////

	//define US locale
	//If you create a new locale please submit it as a pull request or post
	// it in the issue tracker at
	// http://github.com/RobertWhurst/KeyboardJS/issues/
	usLocale = {
		"map": {

			//general
			"3": ["cancel"],
			"8": ["backspace"],
			"9": ["tab"],
			"12": ["clear"],
			"13": ["enter"],
			"16": ["shift"],
			"17": ["ctrl"],
			"18": ["alt", "menu"],
			"19": ["pause", "break"],
			"20": ["capslock"],
			"27": ["escape", "esc"],
			"32": ["space", "spacebar"],
			"33": ["pageup"],
			"34": ["pagedown"],
			"35": ["end"],
			"36": ["home"],
			"37": ["left"],
			"38": ["up"],
			"39": ["right"],
			"40": ["down"],
			"41": ["select"],
			"42": ["printscreen"],
			"43": ["execute"],
			"44": ["snapshot"],
			"45": ["insert", "ins"],
			"46": ["delete", "del"],
			"47": ["help"],
			"91": ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"],
			"92": ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"],
			"145": ["scrolllock", "scroll"],
			"186": ["semicolon", ";"],
			"187": ["equal", "equalsign", "="],
			"188": ["comma", ","],
			"189": ["dash", "-"],
			"190": ["period", "."],
			"191": ["slash", "forwardslash", "/"],
			"192": ["graveaccent", "`"],
			"219": ["openbracket", "["],
			"220": ["backslash", "\\"],
			"221": ["closebracket", "]"],
			"222": ["apostrophe", "'"],

			//0-9
			"48": ["zero", "0"],
			"49": ["one", "1"],
			"50": ["two", "2"],
			"51": ["three", "3"],
			"52": ["four", "4"],
			"53": ["five", "5"],
			"54": ["six", "6"],
			"55": ["seven", "7"],
			"56": ["eight", "8"],
			"57": ["nine", "9"],

			//numpad
			"96": ["numzero", "num0"],
			"97": ["numone", "num1"],
			"98": ["numtwo", "num2"],
			"99": ["numthree", "num3"],
			"100": ["numfour", "num4"],
			"101": ["numfive", "num5"],
			"102": ["numsix", "num6"],
			"103": ["numseven", "num7"],
			"104": ["numeight", "num8"],
			"105": ["numnine", "num9"],
			"106": ["nummultiply", "num*"],
			"107": ["numadd", "num+"],
			"108": ["numenter"],
			"109": ["numsubtract", "num-"],
			"110": ["numdecimal", "num."],
			"111": ["numdevide", "num/"],
			"144": ["numlock", "num"],

			//function keys
			"112": ["f1"],
			"113": ["f2"],
			"114": ["f3"],
			"115": ["f4"],
			"116": ["f5"],
			"117": ["f6"],
			"118": ["f7"],
			"119": ["f8"],
			"120": ["f9"],
			"121": ["f10"],
			"122": ["f11"],
			"123": ["f12"]
		},
		"macros": [

			//secondary key symbols
			['shift + `', ["tilde", "~"]],
			['shift + 1', ["exclamation", "exclamationpoint", "!"]],
			['shift + 2', ["at", "@"]],
			['shift + 3', ["number", "#"]],
			['shift + 4', ["dollar", "dollars", "dollarsign", "$"]],
			['shift + 5', ["percent", "%"]],
			['shift + 6', ["caret", "^"]],
			['shift + 7', ["ampersand", "and", "&"]],
			['shift + 8', ["asterisk", "*"]],
			['shift + 9', ["openparen", "("]],
			['shift + 0', ["closeparen", ")"]],
			['shift + -', ["underscore", "_"]],
			['shift + =', ["plus", "+"]],
			['shift + (', ["opencurlybrace", "opencurlybracket", "{"]],
			['shift + )', ["closecurlybrace", "closecurlybracket", "}"]],
			['shift + \\', ["verticalbar", "|"]],
			['shift + ;', ["colon", ":"]],
			['shift + \'', ["quotationmark", "\""]],
			['shift + !,', ["openanglebracket", "<"]],
			['shift + .', ["closeanglebracket", ">"]],
			['shift + /', ["questionmark", "?"]]
		]
	};
	//a-z and A-Z
	for (aI = 65; aI <= 90; aI += 1) {
		usLocale.map[aI] = String.fromCharCode(aI + 32);
		usLocale.macros.push(['shift + ' + String.fromCharCode(aI + 32) + ', capslock + ' + String.fromCharCode(aI + 32), [String.fromCharCode(aI)]]);
	}
	registerLocale('us', usLocale);
	getSetLocale('us');


	//////////
	// INIT //
	//////////

	//enable the library
	enable();


	/////////
	// API //
	/////////

	//assemble the library and return it
	KeyboardJS.enable = enable;
	KeyboardJS.disable = disable;
	KeyboardJS.activeKeys = getActiveKeys;
	KeyboardJS.on = createBinding;
	KeyboardJS.clear = removeBindingByKeyCombo;
	KeyboardJS.clear.key = removeBindingByKeyName;
	KeyboardJS.locale = getSetLocale;
	KeyboardJS.locale.register = registerLocale;
	KeyboardJS.macro = createMacro;
	KeyboardJS.macro.remove = removeMacro;
	KeyboardJS.key = {};
	KeyboardJS.key.name = getKeyName;
	KeyboardJS.key.code = getKeyCode;
	KeyboardJS.combo = {};
	KeyboardJS.combo.active = isSatisfiedCombo;
	KeyboardJS.combo.parse = parseKeyCombo;
	KeyboardJS.combo.stringify = stringifyKeyCombo;
	return KeyboardJS;


	//////////////////////
	// INSTANCE METHODS //
	//////////////////////

	/**
	 * Enables KeyboardJS
	 */
	function enable() {
		if(window.addEventListener) {
			document.addEventListener('keydown', keydown, false);
			document.addEventListener('keyup', keyup, false);
			window.addEventListener('blur', reset, false);
			window.addEventListener('webkitfullscreenchange', reset, false);
			window.addEventListener('mozfullscreenchange', reset, false);
		} else if(window.attachEvent) {
			document.attachEvent('onkeydown', keydown);
			document.attachEvent('onkeyup', keyup);
			window.attachEvent('onblur', reset);
		}
	}

	/**
	 * Exits all active bindings and disables KeyboardJS
	 */
	function disable() {
		reset();
		if(window.removeEventListener) {
			document.removeEventListener('keydown', keydown, false);
			document.removeEventListener('keyup', keyup, false);
			window.removeEventListener('blur', reset, false);
			window.removeEventListener('webkitfullscreenchange', reset, false);
			window.removeEventListener('mozfullscreenchange', reset, false);
		} else if(window.detachEvent) {
			document.detachEvent('onkeydown', keydown);
			document.detachEvent('onkeyup', keyup);
			window.detachEvent('onblur', reset);
		}
	}


	////////////////////
	// EVENT HANDLERS //
	////////////////////

	/**
	 * Exits all active bindings. Optionally passes an event to all binding
	 *  handlers.
	 * @param  {KeyboardEvent}	event	[Optional]
	 */
	function reset(event) {
		activeKeys = [];
		pruneMacros();
		pruneBindings(event);
	}

	/**
	 * Key down event handler.
	 * @param  {KeyboardEvent}	event
	 */
	function keydown(event) {
		var keyNames, keyName, kI;
		keyNames = getKeyName(event.keyCode);
		if(keyNames.length < 1) { return; }
		event.isRepeat = false;
		for(kI = 0; kI < keyNames.length; kI += 1) {
		    keyName = keyNames[kI];
		    if (getActiveKeys().indexOf(keyName) != -1)
		        event.isRepeat = true;
			addActiveKey(keyName);
		}
		executeMacros();
		executeBindings(event);
	}

	/**
	 * Key up event handler.
	 * @param  {KeyboardEvent} event
	 */
	function keyup(event) {
		var keyNames, kI;
		keyNames = getKeyName(event.keyCode);
		if(keyNames.length < 1) { return; }
		for(kI = 0; kI < keyNames.length; kI += 1) {
			removeActiveKey(keyNames[kI]);
		}
		pruneMacros();
		pruneBindings(event);
	}

	/**
	 * Accepts a key code and returns the key names defined by the current
	 *  locale.
	 * @param  {Number}	keyCode
	 * @return {Array}	keyNames	An array of key names defined for the key
	 *  code as defined by the current locale.
	 */
	function getKeyName(keyCode) {
		return map[keyCode] || [];
	}

	/**
	 * Accepts a key name and returns the key code defined by the current
	 *  locale.
	 * @param  {Number}	keyName
	 * @return {Number|false}
	 */
	function getKeyCode(keyName) {
		var keyCode;
		for(keyCode in map) {
			if(!map.hasOwnProperty(keyCode)) { continue; }
			if(map[keyCode].indexOf(keyName) > -1) { return keyCode; }
		}
		return false;
	}


	////////////
	// MACROS //
	////////////

	/**
	 * Accepts a key combo and an array of key names to inject once the key
	 *  combo is satisfied.
	 * @param  {String}	combo
	 * @param  {Array}	injectedKeys
	 */
	function createMacro(combo, injectedKeys) {
		if(typeof combo !== 'string' && (typeof combo !== 'object' || typeof combo.push !== 'function')) {
			throw new Error("Cannot create macro. The combo must be a string or array.");
		}
		if(typeof injectedKeys !== 'object' || typeof injectedKeys.push !== 'function') {
			throw new Error("Cannot create macro. The injectedKeys must be an array.");
		}
		macros.push([combo, injectedKeys]);
	}

	/**
	 * Accepts a key combo and clears any and all macros bound to that key
	 * combo.
	 * @param  {String} combo
	 */
	function removeMacro(combo) {
		var macro;
		if(typeof combo !== 'string' && (typeof combo !== 'object' || typeof combo.push !== 'function')) { throw new Error("Cannot remove macro. The combo must be a string or array."); }
		for(mI = 0; mI < macros.length; mI += 1) {
			macro = macros[mI];
			if(compareCombos(combo, macro[0])) {
				removeActiveKey(macro[1]);
				macros.splice(mI, 1);
				break;
			}
		}
	}

	/**
	 * Executes macros against the active keys. Each macro's key combo is
	 *  checked and if found to be satisfied, the macro's key names are injected
	 *  into active keys.
	 */
	function executeMacros() {
		var mI, combo, kI;
		for(mI = 0; mI < macros.length; mI += 1) {
			combo = parseKeyCombo(macros[mI][0]);
			if(activeMacros.indexOf(macros[mI]) === -1 && isSatisfiedCombo(combo)) {
				activeMacros.push(macros[mI]);
				for(kI = 0; kI < macros[mI][1].length; kI += 1) {
					addActiveKey(macros[mI][1][kI]);
				}
			}
		}
	}

	/**
	 * Prunes active macros. Checks each active macro's key combo and if found
	 *  to no longer to be satisfied, each of the macro's key names are removed
	 *  from active keys.
	 */
	function pruneMacros() {
		var mI, combo, kI;
		for(mI = 0; mI < activeMacros.length; mI += 1) {
			combo = parseKeyCombo(activeMacros[mI][0]);
			if(isSatisfiedCombo(combo) === false) {
				for(kI = 0; kI < activeMacros[mI][1].length; kI += 1) {
					removeActiveKey(activeMacros[mI][1][kI]);
				}
				activeMacros.splice(mI, 1);
				mI -= 1;
			}
		}
	}


	//////////////
	// BINDINGS //
	//////////////

	/**
	 * Creates a binding object, and, if provided, binds a key down hander and
	 *  a key up handler. Returns a binding object that emits keyup and
	 *  keydown events.
	 * @param  {String}		keyCombo
	 * @param  {Function}	keyDownCallback	[Optional]
	 * @param  {Function}	keyUpCallback	[Optional]
	 * @return {Object}		binding
	 */
	function createBinding(keyCombo, keyDownCallback, keyUpCallback) {
		var api = {}, binding, subBindings = [], bindingApi = {}, kI,
		subCombo;

		//break the combo down into a combo array
		if(typeof keyCombo === 'string') {
			keyCombo = parseKeyCombo(keyCombo);
		}

		//bind each sub combo contained within the combo string
		for(kI = 0; kI < keyCombo.length; kI += 1) {
			binding = {};

			//stringify the combo again
			subCombo = stringifyKeyCombo([keyCombo[kI]]);

			//validate the sub combo
			if(typeof subCombo !== 'string') { throw new Error('Failed to bind key combo. The key combo must be string.'); }

			//create the binding
			binding.keyCombo = subCombo;
			binding.keyDownCallback = [];
			binding.keyUpCallback = [];

			//inject the key down and key up callbacks if given
			if(keyDownCallback) { binding.keyDownCallback.push(keyDownCallback); }
			if(keyUpCallback) { binding.keyUpCallback.push(keyUpCallback); }

			//stash the new binding
			bindings.push(binding);
			subBindings.push(binding);
		}

		//build the binding api
		api.clear = clear;
		api.on = on;
		return api;

		/**
		 * Clears the binding
		 */
		function clear() {
			var bI;
			for(bI = 0; bI < subBindings.length; bI += 1) {
				bindings.splice(bindings.indexOf(subBindings[bI]), 1);
			}
		}

		/**
		 * Accepts an event name. and any number of callbacks. When the event is
		 *  emitted, all callbacks are executed. Available events are key up and
		 *  key down.
		 * @param  {String}	eventName
		 * @return {Object}	subBinding
		 */
		function on(eventName    ) {
			var api = {}, callbacks, cI, bI;

			//validate event name
			if(typeof eventName !== 'string') { throw new Error('Cannot bind callback. The event name must be a string.'); }
			if(eventName !== 'keyup' && eventName !== 'keydown') { throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".'); }

			//gather the callbacks
			callbacks = Array.prototype.slice.apply(arguments, [1]);

			//stash each the new binding
			for(cI = 0; cI < callbacks.length; cI += 1) {
				if(typeof callbacks[cI] === 'function') {
					if(eventName === 'keyup') {
						for(bI = 0; bI < subBindings.length; bI += 1) {
							subBindings[bI].keyUpCallback.push(callbacks[cI]);
						}
					} else if(eventName === 'keydown') {
						for(bI = 0; bI < subBindings.length; bI += 1) {
							subBindings[bI].keyDownCallback.push(callbacks[cI]);
						}
					}
				}
			}

			//construct and return the sub binding api
			api.clear = clear;
			return api;

			/**
			 * Clears the binding
			 */
			function clear() {
				var cI, bI;
				for(cI = 0; cI < callbacks.length; cI += 1) {
					if(typeof callbacks[cI] === 'function') {
						if(eventName === 'keyup') {
							for(bI = 0; bI < subBindings.length; bI += 1) {
								subBindings[bI].keyUpCallback.splice(subBindings[bI].keyUpCallback.indexOf(callbacks[cI]), 1);
							}
						} else {
							for(bI = 0; bI < subBindings.length; bI += 1) {
								subBindings[bI].keyDownCallback.splice(subBindings[bI].keyDownCallback.indexOf(callbacks[cI]), 1);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * Clears all binding attached to a given key combo. Key name order does not
	 * matter as long as the key combos equate.
	 * @param  {String}	keyCombo
	 */
	function removeBindingByKeyCombo(keyCombo) {
		var bI, binding, keyName;
		for(bI = 0; bI < bindings.length; bI += 1) {
			binding = bindings[bI];
			if(compareCombos(keyCombo, binding.keyCombo)) {
				bindings.splice(bI, 1); bI -= 1;
			}
		}
	}

	/**
	 * Clears all binding attached to key combos containing a given key name.
	 * @param  {String}	keyName
	 */
	function removeBindingByKeyName(keyName) {
		var bI, kI, binding;
		if(keyName) {
			for(bI = 0; bI < bindings.length; bI += 1) {
				binding = bindings[bI];
				for(kI = 0; kI < binding.keyCombo.length; kI += 1) {
					if(binding.keyCombo[kI].indexOf(keyName) > -1) {
						bindings.splice(bI, 1); bI -= 1;
						break;
					}
				}
			}
		} else {
			bindings = [];
		}
	}

	/**
	 * Executes bindings that are active. Only allows the keys to be used once
	 *  as to prevent binding overlap.
	 * @param  {KeyboardEvent}	event	The keyboard event.
	 */
	function executeBindings(event) {
		var bI, sBI, binding, bindingKeys, remainingKeys, cI, killEventBubble, kI, bindingKeysSatisfied,
		index, sortedBindings = [], bindingWeight;

		remainingKeys = [].concat(activeKeys);
		for(bI = 0; bI < bindings.length; bI += 1) {
			bindingWeight = extractComboKeys(bindings[bI].keyCombo).length;
			if(!sortedBindings[bindingWeight]) { sortedBindings[bindingWeight] = []; }
			sortedBindings[bindingWeight].push(bindings[bI]);
		}
		for(sBI = sortedBindings.length - 1; sBI >= 0; sBI -= 1) {
			if(!sortedBindings[sBI]) { continue; }
			for(bI = 0; bI < sortedBindings[sBI].length; bI += 1) {
				binding = sortedBindings[sBI][bI];
				bindingKeys = extractComboKeys(binding.keyCombo);
				bindingKeysSatisfied = true;
				for(kI = 0; kI < bindingKeys.length; kI += 1) {
					if(remainingKeys.indexOf(bindingKeys[kI]) === -1) {
						bindingKeysSatisfied = false;
						break;
					}
				}
				if(bindingKeysSatisfied && isSatisfiedCombo(binding.keyCombo)) {
					activeBindings.push(binding);
					for(kI = 0; kI < bindingKeys.length; kI += 1) {
						index = remainingKeys.indexOf(bindingKeys[kI]);
						if(index > -1) {
							remainingKeys.splice(index, 1);
							kI -= 1;
						}
					}
					for(cI = 0; cI < binding.keyDownCallback.length; cI += 1) {
						if (binding.keyDownCallback[cI](event, getActiveKeys(), binding.keyCombo) === false) {
							killEventBubble = true;
						}
					}
					if(killEventBubble === true) {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
		}
	}

	/**
	 * Removes bindings that are no longer satisfied by the active keys. Also
	 *  fires the key up callbacks.
	 * @param  {KeyboardEvent}	event
	 */
	function pruneBindings(event) {
		var bI, cI, binding, killEventBubble;
		for(bI = 0; bI < activeBindings.length; bI += 1) {
			binding = activeBindings[bI];
			if(isSatisfiedCombo(binding.keyCombo) === false) {
				for(cI = 0; cI < binding.keyUpCallback.length; cI += 1) {
					if (binding.keyUpCallback[cI](event, getActiveKeys(), binding.keyCombo) === false) {
						killEventBubble = true;
					}
				}
				if(killEventBubble === true) {
					event.preventDefault();
					event.stopPropagation();
				}
				activeBindings.splice(bI, 1);
				bI -= 1;
			}
		}
	}


	///////////////////
	// COMBO STRINGS //
	///////////////////

	/**
	 * Compares two key combos returning true when they are functionally
	 *  equivalent.
	 * @param  {String}	keyComboArrayA keyCombo A key combo string or array.
	 * @param  {String}	keyComboArrayB keyCombo A key combo string or array.
	 * @return {Boolean}
	 */
	function compareCombos(keyComboArrayA, keyComboArrayB) {
		var cI, sI, kI;
		keyComboArrayA = parseKeyCombo(keyComboArrayA);
		keyComboArrayB = parseKeyCombo(keyComboArrayB);
		if(keyComboArrayA.length !== keyComboArrayB.length) { return false; }
		for(cI = 0; cI < keyComboArrayA.length; cI += 1) {
			if(keyComboArrayA[cI].length !== keyComboArrayB[cI].length) { return false; }
			for(sI = 0; sI < keyComboArrayA[cI].length; sI += 1) {
				if(keyComboArrayA[cI][sI].length !== keyComboArrayB[cI][sI].length) { return false; }
				for(kI = 0; kI < keyComboArrayA[cI][sI].length; kI += 1) {
					if(keyComboArrayB[cI][sI].indexOf(keyComboArrayA[cI][sI][kI]) === -1) { return false; }
				}
			}
		}
		return true;
	}

	/**
	 * Checks to see if a key combo string or key array is satisfied by the
	 *  currently active keys. It does not take into account spent keys.
	 * @param  {String}	keyCombo	A key combo string or array.
	 * @return {Boolean}
	 */
	function isSatisfiedCombo(keyCombo) {
		var cI, sI, stage, kI, stageOffset = 0, index, comboMatches;
		keyCombo = parseKeyCombo(keyCombo);
		for(cI = 0; cI < keyCombo.length; cI += 1) {
			comboMatches = true;
			stageOffset = 0;
			for(sI = 0; sI < keyCombo[cI].length; sI += 1) {
				stage = [].concat(keyCombo[cI][sI]);
				for(kI = stageOffset; kI < activeKeys.length; kI += 1) {
					index = stage.indexOf(activeKeys[kI]);
					if(index > -1) {
						stage.splice(index, 1);
						stageOffset = kI;
					}
				}
				if(stage.length !== 0) { comboMatches = false; break; }
			}
			if(comboMatches) { return true; }
		}
		return false;
	}

	/**
	 * Accepts a key combo array or string and returns a flat array containing all keys referenced by
	 * the key combo.
	 * @param  {String}	keyCombo	A key combo string or array.
	 * @return {Array}
	 */
	function extractComboKeys(keyCombo) {
		var cI, sI, kI, keys = [];
		keyCombo = parseKeyCombo(keyCombo);
		for(cI = 0; cI < keyCombo.length; cI += 1) {
			for(sI = 0; sI < keyCombo[cI].length; sI += 1) {
				keys = keys.concat(keyCombo[cI][sI]);
			}
		}
		return keys;
	}

	/**
	 * Parses a key combo string into a 3 dimensional array.
	 * - Level 1 - sub combos.
	 * - Level 2 - combo stages. A stage is a set of key name pairs that must
	 *  be satisfied in the order they are defined.
	 * - Level 3 - each key name to the stage.
	 * @param  {String|Array}	keyCombo	A key combo string.
	 * @return {Array}
	 */
	function parseKeyCombo(keyCombo) {
		var s = keyCombo, i = 0, op = 0, ws = false, nc = false, combos = [], combo = [], stage = [], key = '';

		if(typeof keyCombo === 'object' && typeof keyCombo.push === 'function') { return keyCombo; }
		if(typeof keyCombo !== 'string') { throw new Error('Cannot parse "keyCombo" because its type is "' + (typeof keyCombo) + '". It must be a "string".'); }

		//remove leading whitespace
		while(s.charAt(i) === ' ') { i += 1; }
		while(true) {
			if(s.charAt(i) === ' ') {
				//white space & next combo op
				while(s.charAt(i) === ' ') { i += 1; }
				ws = true;
			} else if(s.charAt(i) === ',') {
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected , at character index ' + i + '.'); }
				nc = true;
				i += 1;
			} else if(s.charAt(i) === '+') {
				//next key
				if(key.length) { stage.push(key); key = ''; }
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected + at character index ' + i + '.'); }
				op = true;
				i += 1;
			} else if(s.charAt(i) === '>') {
				//next stage op
				if(key.length) { stage.push(key); key = ''; }
				if(stage.length) { combo.push(stage); stage = []; }
				if(op || nc) { throw new Error('Failed to parse key combo. Unexpected > at character index ' + i + '.'); }
				op = true;
				i += 1;
			} else if(i < s.length - 1 && s.charAt(i) === '!' && (s.charAt(i + 1) === '>' || s.charAt(i + 1) === ',' || s.charAt(i + 1) === '+')) {
				key += s.charAt(i + 1);
				op = false;
				ws = false;
				nc = false;
				i += 2;
			} else if(i < s.length && s.charAt(i) !== '+' && s.charAt(i) !== '>' && s.charAt(i) !== ',' && s.charAt(i) !== ' ') {
				//end combo
				if(op === false && ws === true || nc === true) {
					if(key.length) { stage.push(key); key = ''; }
					if(stage.length) { combo.push(stage); stage = []; }
					if(combo.length) { combos.push(combo); combo = []; }
				}
				op = false;
				ws = false;
				nc = false;
				//key
				while(i < s.length && s.charAt(i) !== '+' && s.charAt(i) !== '>' && s.charAt(i) !== ',' && s.charAt(i) !== ' ') {
					key += s.charAt(i);
					i += 1;
				}
			} else {
				//unknown char
				i += 1;
				continue;
			}
			//end of combos string
			if(i >= s.length) {
				if(key.length) { stage.push(key); key = ''; }
				if(stage.length) { combo.push(stage); stage = []; }
				if(combo.length) { combos.push(combo); combo = []; }
				break;
			}
		}
		return combos;
	}

	/**
	 * Stringifys a key combo.
	 * @param  {Array|String}	keyComboArray	A key combo array. If a key
	 *  combo string is given it will be returned.
	 * @return {String}
	 */
	function stringifyKeyCombo(keyComboArray) {
		var cI, ccI, output = [];
		if(typeof keyComboArray === 'string') { return keyComboArray; }
		if(typeof keyComboArray !== 'object' || typeof keyComboArray.push !== 'function') { throw new Error('Cannot stringify key combo.'); }
		for(cI = 0; cI < keyComboArray.length; cI += 1) {
			output[cI] = [];
			for(ccI = 0; ccI < keyComboArray[cI].length; ccI += 1) {
				output[cI][ccI] = keyComboArray[cI][ccI].join(' + ');
			}
			output[cI] = output[cI].join(' > ');
		}
		return output.join(' ');
	}


	/////////////////
	// ACTIVE KEYS //
	/////////////////

	/**
	 * Returns the a copy of the active keys array.
	 * @return {Array}
	 */
	function getActiveKeys() {
		return [].concat(activeKeys);
	}

	/**
	 * Adds a key to the active keys array, but only if it has not already been
	 *  added.
	 * @param {String}	keyName	The key name string.
	 */
	function addActiveKey(keyName) {
		if(keyName.match(/\s/)) { throw new Error('Cannot add key name ' + keyName + ' to active keys because it contains whitespace.'); }
		if(activeKeys.indexOf(keyName) > -1) { return; }
		activeKeys.push(keyName);
	}

	/**
	 * Removes a key from the active keys array.
	 * @param  {String}	keyNames	The key name string.
	 */
	function removeActiveKey(keyName) {
		var keyCode = getKeyCode(keyName);
		if(keyCode === '91' || keyCode === '92') { activeKeys = []; } //remove all key on release of super.
		else { activeKeys.splice(activeKeys.indexOf(keyName), 1); }
	}


	/////////////
	// LOCALES //
	/////////////

	/**
	 * Registers a new locale. This is useful if you would like to add support for a new keyboard layout. It could also be useful for
	 * alternative key names. For example if you program games you could create a locale for your key mappings. Instead of key 65 mapped
	 * to 'a' you could map it to 'jump'.
	 * @param  {String}	localeName	The name of the new locale.
	 * @param  {Object}	localeMap	The locale map.
	 */
	function registerLocale(localeName, localeMap) {

		//validate arguments
		if(typeof localeName !== 'string') { throw new Error('Cannot register new locale. The locale name must be a string.'); }
		if(typeof localeMap !== 'object') { throw new Error('Cannot register ' + localeName + ' locale. The locale map must be an object.'); }
		if(typeof localeMap.map !== 'object') { throw new Error('Cannot register ' + localeName + ' locale. The locale map is invalid.'); }

		//stash the locale
		if(!localeMap.macros) { localeMap.macros = []; }
		locales[localeName] = localeMap;
	}

	/**
	 * Swaps the current locale.
	 * @param  {String}	localeName	The locale to activate.
	 * @return {Object}
	 */
	function getSetLocale(localeName) {

		//if a new locale is given then set it
		if(localeName) {
			if(typeof localeName !== 'string') { throw new Error('Cannot set locale. The locale name must be a string.'); }
			if(!locales[localeName]) { throw new Error('Cannot set locale to ' + localeName + ' because it does not exist. If you would like to submit a ' + localeName + ' locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.'); }

			//set the current map and macros
			map = locales[localeName].map;
			macros = locales[localeName].macros;

			//set the current locale
			locale = localeName;
		}

		//return the current locale
		return locale;
	}
});

},{}],"/home/rye/Dropbox/src/speck/node_modules/lz-string/libs/lz-string.js":[function(require,module,exports){
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.1
var LZString = {

  // private property
  _f : String.fromCharCode,
  _keyStrBase64 : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  _keyStrUriSafe : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
  _getBaseValue : function(alphabet, character) {
    if (!LZString._baseReverseDic) LZString._baseReverseDic = {};
    if (!LZString._baseReverseDic[alphabet]) {
      LZString._baseReverseDic[alphabet] = {};
      for (var i=0 ; i<alphabet.length ; i++) {
        LZString._baseReverseDic[alphabet][alphabet[i]] = i;
      }
    }
    return LZString._baseReverseDic[alphabet][character];
  },

  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return LZString._keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return LZString._getBaseValue(LZString._keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return String.fromCharCode(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
	  result.push(String.fromCharCode(c));
	});
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return LZString._keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return LZString._getBaseValue(LZString._keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return String.fromCharCode(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii,
        f=LZString._f;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed[ii];
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        f = LZString._f,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w[0];
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry[0];
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};

if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}

},{}],"/home/rye/Dropbox/src/speck/src/atoms.js":[function(require,module,exports){
"use strict";

var elements = require("./elements");

var MIN_ATOM_RADIUS = Infinity;
var MAX_ATOM_RADIUS = -Infinity;
for (var i = 0; i <= 118; i++) {
    MIN_ATOM_RADIUS = Math.min(MIN_ATOM_RADIUS, elements[i].radius);
    MAX_ATOM_RADIUS = Math.max(MAX_ATOM_RADIUS, elements[i].radius);
}

module.exports = function() {

    var self = this;

    self.initialize = function() {
        self.atoms = [];
    };

    self.serialize = function() {
        return self.atoms;
    };

    self.deserialize = function(data) {
        self.atoms = data;
    }

    self.addAtom = function(symbol, x, y, z) {
        self.atoms.push({
            symbol: symbol,
            x: x,
            y: y,
            z: z,
        });
    };

    self.getCentroid = function() {
        var xsum = 0;
        var ysum = 0;
        var zsum = 0;
        for (var i = 0; i < self.atoms.length; i++) {
            xsum += self.atoms[i].x;
            ysum += self.atoms[i].y;
            zsum += self.atoms[i].z;
        }
        return {
            x: xsum/self.atoms.length,
            y: ysum/self.atoms.length,
            z: zsum/self.atoms.length
        };
    }

    self.center = function() {
        var shift = self.getCentroid();
        for (var i = 0; i < self.atoms.length; i++) {
            var a = self.atoms[i];
            a.x -= shift.x;
            a.y -= shift.y;
            a.z -= shift.z;
        }
    }

    self.getFarAtom = function() {
        if (self.farAtom !== undefined) {
            return self.farAtom;
        }
        self.farAtom = self.atoms[0];
        var maxd = 0.0;
        for (var i = 0; i < self.atoms.length; i++) {
            var a = self.atoms[i];
            var r = elements[a.symbol].radius;
            var rd = Math.sqrt(r*r + r*r + r*r) * 2.5;
            var d = Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) + rd;
            if (d > maxd) {
                maxd = d;
                self.farAtom = a;
            }
        }
        return self.farAtom;
    }

    self.getRadius = function() {
        var a = self.getFarAtom();
        var r = MAX_ATOM_RADIUS;
        var rd = Math.sqrt(r*r + r*r + r*r) * 2.5;
        return Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z) + rd;
    }

    self.initialize();
}
},{"./elements":"/home/rye/Dropbox/src/speck/src/elements.js"}],"/home/rye/Dropbox/src/speck/src/cube.js":[function(require,module,exports){

var n = -1;
var p = 1;

module.exports = {

	position: [

		// -X
		n, n, n,
		n, n, p,
		n, p, p,
		n, n, n,
		n, p, p,
		n, p, n,

		// +X
		p, n, p,
		p, n, n,
		p, p, n,
		p, n, p,
		p, p, n,
		p, p, p,

		// -Y
		n, n, n,
		p, n, n,
		p, n, p,
		n, n, n,
		p, n, p,
		n, n, p,

		// +Y
		n, p, p,
		p, p, p,
		p, p, n,
		n, p, p,
		p, p, n,
		n, p, n,

		// -Z
		p, n, n,
		n, n, n,
		n, p, n,
		p, n, n, 
		n, p, n,
		p, p, n,

		// +Z
		n, n, p,
		p, n, p,
		p, p, p,
		n, n, p,
		p, p, p,
		n, p, p

	],

	normal: [

		// -X
		n, 0, 0,
		n, 0, 0,
		n, 0, 0,
		n, 0, 0,
		n, 0, 0,
		n, 0, 0,

		// +X
		p, 0, 0,
		p, 0, 0,
		p, 0, 0,
		p, 0, 0,
		p, 0, 0,
		p, 0, 0,

		// -Y
		0, n, 0,
		0, n, 0,
		0, n, 0,
		0, n, 0,
		0, n, 0,
		0, n, 0,

		// +Y
		0, p, 0,	
		0, p, 0,	
		0, p, 0,	
		0, p, 0,	
		0, p, 0,	
		0, p, 0,	

		// -Z
		0, 0, n,
		0, 0, n,
		0, 0, n,
		0, 0, n,
		0, 0, n,
		0, 0, n,

		// +Z
		0, 0, p,
		0, 0, p,
		0, 0, p,
		0, 0, p,
		0, 0, p,
		0, 0, p

	]

};
},{}],"/home/rye/Dropbox/src/speck/src/elements.js":[function(require,module,exports){
module.exports = {};
module.exports[  0] = module.exports[ 'Xx'] = {'symbol':  'Xx', 'name':       'unknown', 'mass':   1.00000000, 'radius':  1.0000, 'color': [1.000, 0.078, 0.576], 'number': 0};
module.exports[  1] = module.exports[  'H'] = {'symbol':   'H', 'name':      'hydrogen', 'mass':   1.00794000, 'radius':  0.3100, 'color': [1.000, 1.000, 1.000], 'number': 1};
module.exports[  2] = module.exports[ 'He'] = {'symbol':  'He', 'name':        'helium', 'mass':   4.00260200, 'radius':  0.2800, 'color': [0.851, 1.000, 1.000], 'number': 2};
module.exports[  3] = module.exports[ 'Li'] = {'symbol':  'Li', 'name':       'lithium', 'mass':   6.94100000, 'radius':  1.2800, 'color': [0.800, 0.502, 1.000], 'number': 3};
module.exports[  4] = module.exports[ 'Be'] = {'symbol':  'Be', 'name':     'beryllium', 'mass':   9.01218200, 'radius':  0.9600, 'color': [0.761, 1.000, 0.000], 'number': 4};
module.exports[  5] = module.exports[  'B'] = {'symbol':   'B', 'name':         'boron', 'mass':  10.81100000, 'radius':  0.8400, 'color': [1.000, 0.710, 0.710], 'number': 5};
module.exports[  6] = module.exports[  'C'] = {'symbol':   'C', 'name':        'carbon', 'mass':  12.01070000, 'radius':  0.7300, 'color': [0.565, 0.565, 0.565], 'number': 6};
module.exports[  7] = module.exports[  'N'] = {'symbol':   'N', 'name':      'nitrogen', 'mass':  14.00670000, 'radius':  0.7100, 'color': [0.188, 0.314, 0.973], 'number': 7};
module.exports[  8] = module.exports[  'O'] = {'symbol':   'O', 'name':        'oxygen', 'mass':  15.99940000, 'radius':  0.6600, 'color': [1.000, 0.051, 0.051], 'number': 8};
module.exports[  9] = module.exports[  'F'] = {'symbol':   'F', 'name':      'fluorine', 'mass':  18.99840320, 'radius':  0.5700, 'color': [0.565, 0.878, 0.314], 'number': 9};
module.exports[ 10] = module.exports[ 'Ne'] = {'symbol':  'Ne', 'name':          'neon', 'mass':  20.17970000, 'radius':  0.5800, 'color': [0.702, 0.890, 0.961], 'number': 10};
module.exports[ 11] = module.exports[ 'Na'] = {'symbol':  'Na', 'name':        'sodium', 'mass':  22.98976928, 'radius':  1.6600, 'color': [0.671, 0.361, 0.949], 'number': 11};
module.exports[ 12] = module.exports[ 'Mg'] = {'symbol':  'Mg', 'name':     'magnesium', 'mass':  24.30500000, 'radius':  1.4100, 'color': [0.541, 1.000, 0.000], 'number': 12};
module.exports[ 13] = module.exports[ 'Al'] = {'symbol':  'Al', 'name':      'aluminum', 'mass':  26.98153860, 'radius':  1.2100, 'color': [0.749, 0.651, 0.651], 'number': 13};
module.exports[ 14] = module.exports[ 'Si'] = {'symbol':  'Si', 'name':       'silicon', 'mass':  28.08550000, 'radius':  1.1100, 'color': [0.941, 0.784, 0.627], 'number': 14};
module.exports[ 15] = module.exports[  'P'] = {'symbol':   'P', 'name':    'phosphorus', 'mass':  30.97376200, 'radius':  1.0700, 'color': [1.000, 0.502, 0.000], 'number': 15};
module.exports[ 16] = module.exports[  'S'] = {'symbol':   'S', 'name':        'sulfur', 'mass':  32.06500000, 'radius':  1.0500, 'color': [1.000, 1.000, 0.188], 'number': 16};
module.exports[ 17] = module.exports[ 'Cl'] = {'symbol':  'Cl', 'name':      'chlorine', 'mass':  35.45300000, 'radius':  1.0200, 'color': [0.122, 0.941, 0.122], 'number': 17};
module.exports[ 18] = module.exports[ 'Ar'] = {'symbol':  'Ar', 'name':         'argon', 'mass':  39.94800000, 'radius':  1.0600, 'color': [0.502, 0.820, 0.890], 'number': 18};
module.exports[ 19] = module.exports[  'K'] = {'symbol':   'K', 'name':     'potassium', 'mass':  39.09830000, 'radius':  2.0300, 'color': [0.561, 0.251, 0.831], 'number': 19};
module.exports[ 20] = module.exports[ 'Ca'] = {'symbol':  'Ca', 'name':       'calcium', 'mass':  40.07800000, 'radius':  1.7600, 'color': [0.239, 1.000, 0.000], 'number': 20};
module.exports[ 21] = module.exports[ 'Sc'] = {'symbol':  'Sc', 'name':      'scandium', 'mass':  44.95591200, 'radius':  1.7000, 'color': [0.902, 0.902, 0.902], 'number': 21};
module.exports[ 22] = module.exports[ 'Ti'] = {'symbol':  'Ti', 'name':      'titanium', 'mass':  47.86700000, 'radius':  1.6000, 'color': [0.749, 0.761, 0.780], 'number': 22};
module.exports[ 23] = module.exports[  'V'] = {'symbol':   'V', 'name':      'vanadium', 'mass':  50.94150000, 'radius':  1.5300, 'color': [0.651, 0.651, 0.671], 'number': 23};
module.exports[ 24] = module.exports[ 'Cr'] = {'symbol':  'Cr', 'name':      'chromium', 'mass':  51.99610000, 'radius':  1.3900, 'color': [0.541, 0.600, 0.780], 'number': 24};
module.exports[ 25] = module.exports[ 'Mn'] = {'symbol':  'Mn', 'name':     'manganese', 'mass':  54.93804500, 'radius':  1.3900, 'color': [0.611, 0.478, 0.780], 'number': 25};
module.exports[ 26] = module.exports[ 'Fe'] = {'symbol':  'Fe', 'name':          'iron', 'mass':  55.84500000, 'radius':  1.3200, 'color': [0.878, 0.400, 0.200], 'number': 26};
module.exports[ 27] = module.exports[ 'Co'] = {'symbol':  'Co', 'name':        'cobalt', 'mass':  58.69340000, 'radius':  1.2600, 'color': [0.941, 0.565, 0.627], 'number': 27};
module.exports[ 28] = module.exports[ 'Ni'] = {'symbol':  'Ni', 'name':        'nickel', 'mass':  58.93319500, 'radius':  1.2400, 'color': [0.314, 0.816, 0.314], 'number': 28};
module.exports[ 29] = module.exports[ 'Cu'] = {'symbol':  'Cu', 'name':        'copper', 'mass':  63.54600000, 'radius':  1.3200, 'color': [0.784, 0.502, 0.200], 'number': 29};
module.exports[ 30] = module.exports[ 'Zn'] = {'symbol':  'Zn', 'name':          'zinc', 'mass':  65.38000000, 'radius':  1.2200, 'color': [0.490, 0.502, 0.690], 'number': 30};
module.exports[ 31] = module.exports[ 'Ga'] = {'symbol':  'Ga', 'name':       'gallium', 'mass':  69.72300000, 'radius':  1.2200, 'color': [0.761, 0.561, 0.561], 'number': 31};
module.exports[ 32] = module.exports[ 'Ge'] = {'symbol':  'Ge', 'name':     'germanium', 'mass':  72.64000000, 'radius':  1.2000, 'color': [0.400, 0.561, 0.561], 'number': 32};
module.exports[ 33] = module.exports[ 'As'] = {'symbol':  'As', 'name':       'arsenic', 'mass':  74.92160000, 'radius':  1.1900, 'color': [0.741, 0.502, 0.890], 'number': 33};
module.exports[ 34] = module.exports[ 'Se'] = {'symbol':  'Se', 'name':      'selenium', 'mass':  78.96000000, 'radius':  1.2000, 'color': [1.000, 0.631, 0.000], 'number': 34};
module.exports[ 35] = module.exports[ 'Br'] = {'symbol':  'Br', 'name':       'bromine', 'mass':  79.90400000, 'radius':  1.2000, 'color': [0.651, 0.161, 0.161], 'number': 35};
module.exports[ 36] = module.exports[ 'Kr'] = {'symbol':  'Kr', 'name':       'krypton', 'mass':  83.79800000, 'radius':  1.1600, 'color': [0.361, 0.722, 0.820], 'number': 36};
module.exports[ 37] = module.exports[ 'Rb'] = {'symbol':  'Rb', 'name':      'rubidium', 'mass':  85.46780000, 'radius':  2.2000, 'color': [0.439, 0.180, 0.690], 'number': 37};
module.exports[ 38] = module.exports[ 'Sr'] = {'symbol':  'Sr', 'name':     'strontium', 'mass':  87.62000000, 'radius':  1.9500, 'color': [0.000, 1.000, 0.000], 'number': 38};
module.exports[ 39] = module.exports[  'Y'] = {'symbol':   'Y', 'name':       'yttrium', 'mass':  88.90585000, 'radius':  1.9000, 'color': [0.580, 1.000, 1.000], 'number': 39};
module.exports[ 40] = module.exports[ 'Zr'] = {'symbol':  'Zr', 'name':     'zirconium', 'mass':  91.22400000, 'radius':  1.7500, 'color': [0.580, 0.878, 0.878], 'number': 40};
module.exports[ 41] = module.exports[ 'Nb'] = {'symbol':  'Nb', 'name':       'niobium', 'mass':  92.90638000, 'radius':  1.6400, 'color': [0.451, 0.761, 0.788], 'number': 41};
module.exports[ 42] = module.exports[ 'Mo'] = {'symbol':  'Mo', 'name':    'molybdenum', 'mass':  95.96000000, 'radius':  1.5400, 'color': [0.329, 0.710, 0.710], 'number': 42};
module.exports[ 43] = module.exports[ 'Tc'] = {'symbol':  'Tc', 'name':    'technetium', 'mass':  98.00000000, 'radius':  1.4700, 'color': [0.231, 0.620, 0.620], 'number': 43};
module.exports[ 44] = module.exports[ 'Ru'] = {'symbol':  'Ru', 'name':     'ruthenium', 'mass': 101.07000000, 'radius':  1.4600, 'color': [0.141, 0.561, 0.561], 'number': 44};
module.exports[ 45] = module.exports[ 'Rh'] = {'symbol':  'Rh', 'name':       'rhodium', 'mass': 102.90550000, 'radius':  1.4200, 'color': [0.039, 0.490, 0.549], 'number': 45};
module.exports[ 46] = module.exports[ 'Pd'] = {'symbol':  'Pd', 'name':     'palladium', 'mass': 106.42000000, 'radius':  1.3900, 'color': [0.000, 0.412, 0.522], 'number': 46};
module.exports[ 47] = module.exports[ 'Ag'] = {'symbol':  'Ag', 'name':        'silver', 'mass': 107.86820000, 'radius':  1.4500, 'color': [0.753, 0.753, 0.753], 'number': 47};
module.exports[ 48] = module.exports[ 'Cd'] = {'symbol':  'Cd', 'name':       'cadmium', 'mass': 112.41100000, 'radius':  1.4400, 'color': [1.000, 0.851, 0.561], 'number': 48};
module.exports[ 49] = module.exports[ 'In'] = {'symbol':  'In', 'name':        'indium', 'mass': 114.81800000, 'radius':  1.4200, 'color': [0.651, 0.459, 0.451], 'number': 49};
module.exports[ 50] = module.exports[ 'Sn'] = {'symbol':  'Sn', 'name':           'tin', 'mass': 118.71000000, 'radius':  1.3900, 'color': [0.400, 0.502, 0.502], 'number': 50};
module.exports[ 51] = module.exports[ 'Sb'] = {'symbol':  'Sb', 'name':      'antimony', 'mass': 121.76000000, 'radius':  1.3900, 'color': [0.620, 0.388, 0.710], 'number': 51};
module.exports[ 52] = module.exports[ 'Te'] = {'symbol':  'Te', 'name':     'tellurium', 'mass': 127.60000000, 'radius':  1.3800, 'color': [0.831, 0.478, 0.000], 'number': 52};
module.exports[ 53] = module.exports[  'I'] = {'symbol':   'I', 'name':        'iodine', 'mass': 126.90470000, 'radius':  1.3900, 'color': [0.580, 0.000, 0.580], 'number': 53};
module.exports[ 54] = module.exports[ 'Xe'] = {'symbol':  'Xe', 'name':         'xenon', 'mass': 131.29300000, 'radius':  1.4000, 'color': [0.259, 0.620, 0.690], 'number': 54};
module.exports[ 55] = module.exports[ 'Cs'] = {'symbol':  'Cs', 'name':        'cesium', 'mass': 132.90545190, 'radius':  2.4400, 'color': [0.341, 0.090, 0.561], 'number': 55};
module.exports[ 56] = module.exports[ 'Ba'] = {'symbol':  'Ba', 'name':        'barium', 'mass': 137.32700000, 'radius':  2.1500, 'color': [0.000, 0.788, 0.000], 'number': 56};
module.exports[ 57] = module.exports[ 'La'] = {'symbol':  'La', 'name':     'lanthanum', 'mass': 138.90547000, 'radius':  2.0700, 'color': [0.439, 0.831, 1.000], 'number': 57};
module.exports[ 58] = module.exports[ 'Ce'] = {'symbol':  'Ce', 'name':        'cerium', 'mass': 140.11600000, 'radius':  2.0400, 'color': [1.000, 1.000, 0.780], 'number': 58};
module.exports[ 59] = module.exports[ 'Pr'] = {'symbol':  'Pr', 'name':  'praseodymium', 'mass': 140.90765000, 'radius':  2.0300, 'color': [0.851, 1.000, 0.780], 'number': 59};
module.exports[ 60] = module.exports[ 'Nd'] = {'symbol':  'Nd', 'name':     'neodymium', 'mass': 144.24200000, 'radius':  2.0100, 'color': [0.780, 1.000, 0.780], 'number': 60};
module.exports[ 61] = module.exports[ 'Pm'] = {'symbol':  'Pm', 'name':    'promethium', 'mass': 145.00000000, 'radius':  1.9900, 'color': [0.639, 1.000, 0.780], 'number': 61};
module.exports[ 62] = module.exports[ 'Sm'] = {'symbol':  'Sm', 'name':      'samarium', 'mass': 150.36000000, 'radius':  1.9800, 'color': [0.561, 1.000, 0.780], 'number': 62};
module.exports[ 63] = module.exports[ 'Eu'] = {'symbol':  'Eu', 'name':      'europium', 'mass': 151.96400000, 'radius':  1.9800, 'color': [0.380, 1.000, 0.780], 'number': 63};
module.exports[ 64] = module.exports[ 'Gd'] = {'symbol':  'Gd', 'name':    'gadolinium', 'mass': 157.25000000, 'radius':  1.9600, 'color': [0.271, 1.000, 0.780], 'number': 64};
module.exports[ 65] = module.exports[ 'Tb'] = {'symbol':  'Tb', 'name':       'terbium', 'mass': 158.92535000, 'radius':  1.9400, 'color': [0.189, 1.000, 0.780], 'number': 65};
module.exports[ 66] = module.exports[ 'Dy'] = {'symbol':  'Dy', 'name':    'dysprosium', 'mass': 162.50000000, 'radius':  1.9200, 'color': [0.122, 1.000, 0.780], 'number': 66};
module.exports[ 67] = module.exports[ 'Ho'] = {'symbol':  'Ho', 'name':       'holmium', 'mass': 164.93032000, 'radius':  1.9200, 'color': [0.000, 1.000, 0.612], 'number': 67};
module.exports[ 68] = module.exports[ 'Er'] = {'symbol':  'Er', 'name':        'erbium', 'mass': 167.25900000, 'radius':  1.8900, 'color': [0.000, 0.902, 0.459], 'number': 68};
module.exports[ 69] = module.exports[ 'Tm'] = {'symbol':  'Tm', 'name':       'thulium', 'mass': 168.93421000, 'radius':  1.9000, 'color': [0.000, 0.831, 0.322], 'number': 69};
module.exports[ 70] = module.exports[ 'Yb'] = {'symbol':  'Yb', 'name':     'ytterbium', 'mass': 173.05400000, 'radius':  1.8700, 'color': [0.000, 0.749, 0.220], 'number': 70};
module.exports[ 71] = module.exports[ 'Lu'] = {'symbol':  'Lu', 'name':      'lutetium', 'mass': 174.96680000, 'radius':  1.8700, 'color': [0.000, 0.671, 0.141], 'number': 71};
module.exports[ 72] = module.exports[ 'Hf'] = {'symbol':  'Hf', 'name':       'hafnium', 'mass': 178.49000000, 'radius':  1.7500, 'color': [0.302, 0.761, 1.000], 'number': 72};
module.exports[ 73] = module.exports[ 'Ta'] = {'symbol':  'Ta', 'name':      'tantalum', 'mass': 180.94788000, 'radius':  1.7000, 'color': [0.302, 0.651, 1.000], 'number': 73};
module.exports[ 74] = module.exports[  'W'] = {'symbol':   'W', 'name':      'tungsten', 'mass': 183.84000000, 'radius':  1.6200, 'color': [0.129, 0.580, 0.839], 'number': 74};
module.exports[ 75] = module.exports[ 'Re'] = {'symbol':  'Re', 'name':       'rhenium', 'mass': 186.20700000, 'radius':  1.5100, 'color': [0.149, 0.490, 0.671], 'number': 75};
module.exports[ 76] = module.exports[ 'Os'] = {'symbol':  'Os', 'name':        'osmium', 'mass': 190.23000000, 'radius':  1.4400, 'color': [0.149, 0.400, 0.588], 'number': 76};
module.exports[ 77] = module.exports[ 'Ir'] = {'symbol':  'Ir', 'name':       'iridium', 'mass': 192.21700000, 'radius':  1.4100, 'color': [0.090, 0.329, 0.529], 'number': 77};
module.exports[ 78] = module.exports[ 'Pt'] = {'symbol':  'Pt', 'name':      'platinum', 'mass': 195.08400000, 'radius':  1.3600, 'color': [0.816, 0.816, 0.878], 'number': 78};
module.exports[ 79] = module.exports[ 'Au'] = {'symbol':  'Au', 'name':          'gold', 'mass': 196.96656900, 'radius':  1.3600, 'color': [1.000, 0.820, 0.137], 'number': 79};
module.exports[ 80] = module.exports[ 'Hg'] = {'symbol':  'Hg', 'name':       'mercury', 'mass': 200.59000000, 'radius':  1.3200, 'color': [0.722, 0.722, 0.816], 'number': 80};
module.exports[ 81] = module.exports[ 'Tl'] = {'symbol':  'Tl', 'name':      'thallium', 'mass': 204.38330000, 'radius':  1.4500, 'color': [0.651, 0.329, 0.302], 'number': 81};
module.exports[ 82] = module.exports[ 'Pb'] = {'symbol':  'Pb', 'name':          'lead', 'mass': 207.20000000, 'radius':  1.4600, 'color': [0.341, 0.349, 0.380], 'number': 82};
module.exports[ 83] = module.exports[ 'Bi'] = {'symbol':  'Bi', 'name':       'bismuth', 'mass': 208.98040000, 'radius':  1.4800, 'color': [0.620, 0.310, 0.710], 'number': 83};
module.exports[ 84] = module.exports[ 'Po'] = {'symbol':  'Po', 'name':      'polonium', 'mass': 210.00000000, 'radius':  1.4000, 'color': [0.671, 0.361, 0.000], 'number': 84};
module.exports[ 85] = module.exports[ 'At'] = {'symbol':  'At', 'name':      'astatine', 'mass': 210.00000000, 'radius':  1.5000, 'color': [0.459, 0.310, 0.271], 'number': 85};
module.exports[ 86] = module.exports[ 'Rn'] = {'symbol':  'Rn', 'name':         'radon', 'mass': 220.00000000, 'radius':  1.5000, 'color': [0.259, 0.510, 0.588], 'number': 86};
module.exports[ 87] = module.exports[ 'Fr'] = {'symbol':  'Fr', 'name':      'francium', 'mass': 223.00000000, 'radius':  2.6000, 'color': [0.259, 0.000, 0.400], 'number': 87};
module.exports[ 88] = module.exports[ 'Ra'] = {'symbol':  'Ra', 'name':        'radium', 'mass': 226.00000000, 'radius':  2.2100, 'color': [0.000, 0.490, 0.000], 'number': 88};
module.exports[ 89] = module.exports[ 'Ac'] = {'symbol':  'Ac', 'name':      'actinium', 'mass': 227.00000000, 'radius':  2.1500, 'color': [0.439, 0.671, 0.980], 'number': 89};
module.exports[ 90] = module.exports[ 'Th'] = {'symbol':  'Th', 'name':       'thorium', 'mass': 231.03588000, 'radius':  2.0600, 'color': [0.000, 0.729, 1.000], 'number': 90};
module.exports[ 91] = module.exports[ 'Pa'] = {'symbol':  'Pa', 'name':  'protactinium', 'mass': 232.03806000, 'radius':  2.0000, 'color': [0.000, 0.631, 1.000], 'number': 91};
module.exports[ 92] = module.exports[  'U'] = {'symbol':   'U', 'name':       'uranium', 'mass': 237.00000000, 'radius':  1.9600, 'color': [0.000, 0.561, 1.000], 'number': 92};
module.exports[ 93] = module.exports[ 'Np'] = {'symbol':  'Np', 'name':     'neptunium', 'mass': 238.02891000, 'radius':  1.9000, 'color': [0.000, 0.502, 1.000], 'number': 93};
module.exports[ 94] = module.exports[ 'Pu'] = {'symbol':  'Pu', 'name':     'plutonium', 'mass': 243.00000000, 'radius':  1.8700, 'color': [0.000, 0.420, 1.000], 'number': 94};
module.exports[ 95] = module.exports[ 'Am'] = {'symbol':  'Am', 'name':     'americium', 'mass': 244.00000000, 'radius':  1.8000, 'color': [0.329, 0.361, 0.949], 'number': 95};
module.exports[ 96] = module.exports[ 'Cm'] = {'symbol':  'Cm', 'name':        'curium', 'mass': 247.00000000, 'radius':  1.6900, 'color': [0.471, 0.361, 0.890], 'number': 96};
module.exports[ 97] = module.exports[ 'Bk'] = {'symbol':  'Bk', 'name':     'berkelium', 'mass': 247.00000000, 'radius':  1.6600, 'color': [0.541, 0.310, 0.890], 'number': 97};
module.exports[ 98] = module.exports[ 'Cf'] = {'symbol':  'Cf', 'name':   'californium', 'mass': 251.00000000, 'radius':  1.6800, 'color': [0.631, 0.212, 0.831], 'number': 98};
module.exports[ 99] = module.exports[ 'Es'] = {'symbol':  'Es', 'name':   'einsteinium', 'mass': 252.00000000, 'radius':  1.6500, 'color': [0.702, 0.122, 0.831], 'number': 99};
module.exports[100] = module.exports[ 'Fm'] = {'symbol':  'Fm', 'name':       'fermium', 'mass': 257.00000000, 'radius':  1.6700, 'color': [0.702, 0.122, 0.729], 'number': 100};
module.exports[101] = module.exports[ 'Md'] = {'symbol':  'Md', 'name':   'mendelevium', 'mass': 258.00000000, 'radius':  1.7300, 'color': [0.702, 0.051, 0.651], 'number': 101};
module.exports[102] = module.exports[ 'No'] = {'symbol':  'No', 'name':      'nobelium', 'mass': 259.00000000, 'radius':  1.7600, 'color': [0.741, 0.051, 0.529], 'number': 102};
module.exports[103] = module.exports[ 'Lr'] = {'symbol':  'Lr', 'name':    'lawrencium', 'mass': 262.00000000, 'radius':  1.6100, 'color': [0.780, 0.000, 0.400], 'number': 103};
module.exports[104] = module.exports[ 'Rf'] = {'symbol':  'Rf', 'name': 'rutherfordium', 'mass': 261.00000000, 'radius':  1.5700, 'color': [0.800, 0.000, 0.349], 'number': 104};
module.exports[105] = module.exports[ 'Db'] = {'symbol':  'Db', 'name':       'dubnium', 'mass': 262.00000000, 'radius':  1.4900, 'color': [0.820, 0.000, 0.310], 'number': 105};
module.exports[106] = module.exports[ 'Sg'] = {'symbol':  'Sg', 'name':    'seaborgium', 'mass': 266.00000000, 'radius':  1.4300, 'color': [0.851, 0.000, 0.271], 'number': 106};
module.exports[107] = module.exports[ 'Bh'] = {'symbol':  'Bh', 'name':       'bohrium', 'mass': 264.00000000, 'radius':  1.4100, 'color': [0.878, 0.000, 0.220], 'number': 107};
module.exports[108] = module.exports[ 'Hs'] = {'symbol':  'Hs', 'name':       'hassium', 'mass': 277.00000000, 'radius':  1.3400, 'color': [0.902, 0.000, 0.180], 'number': 108};
module.exports[109] = module.exports[ 'Mt'] = {'symbol':  'Mt', 'name':    'meitnerium', 'mass': 268.00000000, 'radius':  1.2900, 'color': [0.922, 0.000, 0.149], 'number': 109};
module.exports[110] = module.exports[ 'Ds'] = {'symbol':  'Ds', 'name':            'Ds', 'mass': 271.00000000, 'radius':  1.2800, 'color': [0.922, 0.000, 0.149], 'number': 110};
module.exports[111] = module.exports['Uuu'] = {'symbol': 'Uuu', 'name':           'Uuu', 'mass': 272.00000000, 'radius':  1.2100, 'color': [0.922, 0.000, 0.149], 'number': 111};
module.exports[112] = module.exports['Uub'] = {'symbol': 'Uub', 'name':           'Uub', 'mass': 285.00000000, 'radius':  1.2200, 'color': [0.922, 0.000, 0.149], 'number': 112};
module.exports[113] = module.exports['Uut'] = {'symbol': 'Uut', 'name':           'Uut', 'mass': 284.00000000, 'radius':  1.3600, 'color': [0.922, 0.000, 0.149], 'number': 113};
module.exports[114] = module.exports['Uuq'] = {'symbol': 'Uuq', 'name':           'Uuq', 'mass': 289.00000000, 'radius':  1.4300, 'color': [0.922, 0.000, 0.149], 'number': 114};
module.exports[115] = module.exports['Uup'] = {'symbol': 'Uup', 'name':           'Uup', 'mass': 288.00000000, 'radius':  1.6200, 'color': [0.922, 0.000, 0.149], 'number': 115};
module.exports[116] = module.exports['Uuh'] = {'symbol': 'Uuh', 'name':           'Uuh', 'mass': 292.00000000, 'radius':  1.7500, 'color': [0.922, 0.000, 0.149], 'number': 116};
module.exports[117] = module.exports['Uus'] = {'symbol': 'Uus', 'name':           'Uus', 'mass': 294.00000000, 'radius':  1.6500, 'color': [0.922, 0.000, 0.149], 'number': 117};
module.exports[118] = module.exports['Uuo'] = {'symbol': 'Uuo', 'name':           'Uuo', 'mass': 296.00000000, 'radius':  1.5700, 'color': [0.922, 0.000, 0.149], 'number': 118};

},{}],"/home/rye/Dropbox/src/speck/src/gl-matrix.js":[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.2
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],"/home/rye/Dropbox/src/speck/src/imposter-renderer.js":[function(require,module,exports){
"use strict";

var glm = require('./gl-matrix');
var core = require('./webgl.js');

var cube = require("./cube");
var elements = require("./elements");
var View = require("./view");

module.exports = function (canvas, resolution) {

        var self = this;

        var range,
            samples,
            atoms;

        var gl, 
            canvas;

        var rScene = null,
            rBonds = null,
            rDispQuad = null,
            rAccumulator = null,
            rAO = null,
            rFXAA = null;

        var tSceneColor,
            tSceneNormal,
            tSceneDepth,
            tRandRotDepth,
            tRandRotNormal,
            tRandRotColor,
            tAccumulator,
            tAccumulatorOut,
            tAO;

        var tiSceneColor,
            tiSceneNormal,
            tiSceneDepth,
            tiRandRotDepth,
            tiRandRotNormal,
            tiRandRotColor,
            tiAccumulator,
            tiAccumulatorOut,
            tiAO;

        var fbScene,
            fbRandRot,
            fbAccumulator,
            fbAO;

        var progScene,
            progBonds,
            progAccumulator,
            progAO,
            progFXAA,
            progDisplayQuad;

        var extFragDepth,
            extDrawBuffers,
            extDepthTexture;

        var sampleCount = 0,
            initialRender = false;

        self.initialize = function() {

            // Initialize canvas/gl.
            canvas.width = canvas.height = resolution;
            gl = canvas.getContext('webgl');
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(0,0,0,0);
            gl.clearDepth(1);
            gl.viewport(0,0,resolution,resolution);

            window.gl = gl;

            extFragDepth = gl.getExtension("EXT_frag_depth");
            extDepthTexture = gl.getExtension("WEBGL_depth_texture");
            extDrawBuffers = gl.getExtension("WEBGL_draw_buffers");

            // Define texture locations.
            tiSceneColor     = 0;
            tiSceneDepth     = 1;
            tiSceneNormal    = 2;
            tiRandRotColor   = 3;
            tiRandRotDepth   = 4;
            tiRandRotNormal  = 5;
            tiAccumulator    = 6;
            tiAccumulatorOut = 7;
            tiAO             = 8;

            self.createTextures();

            // Initialize shaders.
            progScene = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aImposter;\nattribute vec3 aPosition;\nattribute float aRadius;\nattribute vec3 aColor;\n\nuniform mat4 uView;\nuniform mat4 uProjection;\nuniform mat4 uModel;\nuniform float uAtomScale;\nuniform float uRelativeAtomScale;\n\nvarying vec3 vColor;\nvarying vec3 vPosition;\nvarying float vRadius;\n\nvoid main() {\n    vRadius = uAtomScale * (1.0 + (aRadius - 1.0) * uRelativeAtomScale);\n    gl_Position = uProjection * uView * uModel * vec4(vRadius * aImposter + aPosition, 1.0);\n    vColor = aColor;\n    vPosition = vec3(uModel * vec4(aPosition, 1));\n}\n\n\n// __split__\n\n\n#version 100\n#extension GL_EXT_frag_depth: enable\n#extension GL_EXT_draw_buffers: require\nprecision highp float;\n\nuniform vec2 uBottomLeft;\nuniform vec2 uTopRight;\nuniform float uRes;\nuniform float uDepth;\n\nvarying vec3 vPosition;\nvarying float vRadius;\nvarying vec3 vColor;\n\nvec2 res = vec2(uRes, uRes);\n\nfloat raySphereIntersect(vec3 r0, vec3 rd) {\n    float a = dot(rd, rd);\n    vec3 s0_r0 = r0 - vPosition;\n    float b = 2.0 * dot(rd, s0_r0);\n    float c = dot(s0_r0, s0_r0) - (vRadius * vRadius);\n    float disc = b*b - 4.0*a*c;\n    if (disc <= 0.0) {\n        return -1.0;\n    }\n    return (-b - sqrt(disc))/(2.0*a);\n}\n\nvoid main() {\n    vec3 r0 = vec3(uBottomLeft + (gl_FragCoord.xy/res) * (uTopRight - uBottomLeft), 0.0);\n    vec3 rd = vec3(0, 0, -1);\n    float t = raySphereIntersect(r0, rd);\n    if (t < 0.0) {\n        discard;\n    }\n    vec3 coord = r0 + rd * t;\n    vec3 normal = normalize(coord - vPosition);\n    gl_FragData[0] = vec4(vColor, 1);\n    gl_FragData[1] = vec4(normal * 0.5 + 0.5, 1.0);\n    gl_FragDepthEXT = -coord.z/uDepth;\n}\n");
            progBonds = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aImposter;\nattribute vec3 aPosA;\nattribute vec3 aPosB;\nattribute float aRadA;\nattribute float aRadB;\nattribute vec3 aColA;\nattribute vec3 aColB;\n\nuniform mat4 uView;\nuniform mat4 uProjection;\nuniform mat4 uModel;\nuniform mat4 uRotation;\nuniform float uBondRadius;\nuniform float uAtomScale;\nuniform float uRelativeAtomScale;\n\nvarying vec3 vNormal;\nvarying vec3 vPosA, vPosB;\nvarying float vRadA, vRadB;\nvarying vec3 vColA, vColB;\nvarying float vRadius;\n\nmat3 alignVector(vec3 a, vec3 b) {\n    vec3 v = cross(a, b);\n    float s = length(v);\n    float c = dot(a, b);\n    mat3 I = mat3(\n        1, 0, 0,\n        0, 1, 0,\n        0, 0, 1\n    );\n    mat3 vx = mat3(\n        0, v.z, -v.y,\n        -v.z, 0, v.x,\n        v.y, -v.x, 0\n    );\n    return I + vx + vx * vx * ((1.0 - c) / (s * s));\n}\n\nvoid main() {\n    vRadius = uBondRadius;\n    vec3 pos = vec3(aImposter);\n    // Scale the box in x and z to be bond-radius.\n    pos = pos * vec3(vRadius, 1, vRadius);\n    // Shift the origin-centered cube so that the bottom is at the origin.\n    pos = pos + vec3(0, 1, 0);\n    // Stretch the box in y so that it is the length of the bond.\n    pos = pos * vec3(1, length(aPosA - aPosB) * 0.5, 1);\n    // Find the rotation that aligns vec3(0, 1, 0) with vec3(uPosB - uPosA) and apply it.\n    vec3 a = normalize(vec3(-0.000001, 1.000001, 0.000001));\n    vec3 b = normalize(aPosB - aPosA);\n    mat3 R = alignVector(a, b);\n    pos = R * pos;\n    // Shift the cube so that the bottom is centered at the middle of atom A.\n    pos = pos + aPosA;\n\n    vec4 position = uModel * vec4(pos, 1);\n    gl_Position = uProjection * uView * position;\n    vPosA = aPosA;\n    vPosB = aPosB;\n    vRadA = uAtomScale * (1.0 + (aRadA - 1.0) * uRelativeAtomScale);\n    vRadB = uAtomScale * (1.0 + (aRadB - 1.0) * uRelativeAtomScale);\n    vColA = aColA;\n    vColB = aColB;\n}\n\n\n// __split__\n\n\n#version 100\n#extension GL_EXT_frag_depth: enable\n#extension GL_EXT_draw_buffers: require\nprecision highp float;\n\nuniform mat4 uRotation;\nuniform vec2 uBottomLeft;\nuniform vec2 uTopRight;\nuniform float uDepth;\nuniform float uRes;\nuniform float uBondShade;\n\nvarying vec3 vPosA, vPosB;\nvarying float vRadA, vRadB;\nvarying vec3 vColA, vColB;\nvarying float vRadius;\n\nmat3 alignVector(vec3 a, vec3 b) {\n    vec3 v = cross(a, b);\n    float s = length(v);\n    float c = dot(a, b);\n    mat3 I = mat3(\n        1, 0, 0,\n        0, 1, 0,\n        0, 0, 1\n    );\n    mat3 vx = mat3(\n        0, v.z, -v.y,\n        -v.z, 0, v.x,\n        v.y, -v.x, 0\n    );\n    return I + vx + vx * vx * ((1.0 - c) / (s * s));\n}\n\nvoid main() {\n\n    vec2 res = vec2(uRes, uRes);\n    vec3 r0 = vec3(uBottomLeft + (gl_FragCoord.xy/res) * (uTopRight - uBottomLeft), uDepth/2.0);\n    vec3 rd = vec3(0, 0, -1);\n\n    vec3 i = normalize(vPosB - vPosA);\n         i = vec3(uRotation * vec4(i, 0));\n    vec3 j = normalize(vec3(-0.000001, 1.000001, 0.000001));\n    mat3 R = alignVector(i, j);\n\n    vec3 r0p = r0 - vec3(uRotation * vec4(vPosA, 0));\n    r0p = R * r0p;\n    vec3 rdp = R * rd;\n\n    float a = dot(rdp.xz, rdp.xz);\n    float b = 2.0 * dot(rdp.xz, r0p.xz);\n    float c = dot(r0p.xz, r0p.xz) - vRadius*vRadius;\n    float disc = b*b - 4.0*a*c;\n    if (disc <= 0.0) {\n        discard;\n    }\n    float t = (-b - sqrt(disc))/(2.0*a);\n    if (t < 0.0) {\n        discard;\n    }\n\n    vec3 coord = r0p + rdp * t;\n    if (coord.y < 0.0 || coord.y > length(vPosA - vPosB)) {\n        discard;\n    }\n\n    vec3 color;\n    if (coord.y < vRadA + 0.5 * (length(vPosA - vPosB) - (vRadA + vRadB))) {\n        color = vColA;\n    } else {\n        color = vColB;\n    }\n\n    color = mix(color, vec3(1,1,1), uBondShade);\n\n    R = alignVector(j, i);\n    vec3 normal = normalize(R * vec3(coord.x, 0, coord.z));\n\n    coord = r0 + rd * t;\n    gl_FragData[0] = vec4(color,1);\n    gl_FragData[1] = vec4(normal * 0.5 + 0.5, 1.0);\n    gl_FragDepthEXT = -(coord.z - uDepth/2.0)/uDepth;\n}\n");
            progDisplayQuad = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uTexture;\nuniform float uRes;\n\nvoid main() {\n    vec4 c = texture2D(uTexture, gl_FragCoord.xy/uRes);\n    gl_FragColor = vec4(c.rgb, 1);\n}\n");
            progAccumulator = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uSceneDepth;\nuniform sampler2D uSceneNormal;\nuniform sampler2D uRandRotDepth;\nuniform sampler2D uAccumulator;\nuniform mat4 uRot;\nuniform mat4 uInvRot;\nuniform vec2 uSceneBottomLeft;\nuniform vec2 uSceneTopRight;\nuniform vec2 uRotBottomLeft;\nuniform vec2 uRotTopRight;\nuniform float uDepth;\nuniform float uRes;\nuniform int uSampleCount;\n\nvoid main() {\n\n    vec4 dScene = texture2D(uSceneDepth, gl_FragCoord.xy/uRes);\n\n    vec3 r = vec3(uSceneBottomLeft + (gl_FragCoord.xy/uRes) * (uSceneTopRight - uSceneBottomLeft), 0.0);\n\n    r.z = -(dScene.r - 0.5) * uDepth;\n    r = vec3(uRot * vec4(r, 1));\n    float depth = -r.z/uDepth + 0.5;\n\n    vec2 p = (r.xy - uRotBottomLeft)/(uRotTopRight - uRotBottomLeft);\n\n    vec4 dRandRot = texture2D(uRandRotDepth, p);\n\n    float ao = step(dRandRot.r, depth * 0.99);\n\n    vec3 normal = texture2D(uSceneNormal, gl_FragCoord.xy/uRes).rgb * 2.0 - 1.0;\n    vec3 dir = vec3(uInvRot * vec4(0, 0, 1, 0));\n    float mag = dot(dir, normal);\n    float sampled = step(0.0, mag);\n\n    ao *= sampled;\n\n    vec4 acc = texture2D(uAccumulator, gl_FragCoord.xy/uRes);\n\n    if (uSampleCount < 256) {\n        acc.r += ao/255.0;\n    } else if (uSampleCount < 512) {\n        acc.g += ao/255.0;\n    } else if (uSampleCount < 768) {\n        acc.b += ao/255.0;\n    } else {\n        acc.a += ao/255.0;\n    }\n        \n    gl_FragColor = acc;\n\n}\n");
            progAO = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uSceneColor;\nuniform sampler2D uSceneDepth;\nuniform sampler2D uAccumulatorOut;\nuniform float uRes;\nuniform float uAO;\nuniform float uBrightness;\nuniform float uOutlineStrength;\n\nvoid main() {\n    vec2 p = gl_FragCoord.xy/uRes;\n    vec4 sceneColor = texture2D(uSceneColor, p);\n    if (uOutlineStrength > 0.0) {\n        float depth = texture2D(uSceneDepth, p).r;\n        float r = 1.0/uRes;\n        float d0 = abs(texture2D(uSceneDepth, p + vec2(-r,  0)).r - depth);\n        float d1 = abs(texture2D(uSceneDepth, p + vec2( r,  0)).r - depth);\n        float d2 = abs(texture2D(uSceneDepth, p + vec2( 0, -r)).r - depth);\n        float d3 = abs(texture2D(uSceneDepth, p + vec2( 0,  r)).r - depth);\n        float d = max(d0, d1);\n        d = max(d, d2);\n        d = max(d, d3);\n        sceneColor.rgb *= pow(1.0 - d, uOutlineStrength * 32.0);\n        sceneColor.a = max(step(0.003, d), sceneColor.a);\n    }\n    vec4 dAccum = texture2D(uAccumulatorOut, p);\n    float shade = max(0.0, 1.0 - (dAccum.r + dAccum.g + dAccum.b + dAccum.a) * 0.25 * uAO);\n    shade = pow(shade, 2.0);\n    gl_FragColor = vec4(uBrightness * sceneColor.rgb * shade, sceneColor.a);\n}\n");
            progFXAA = loadProgram(gl, "#version 100\nprecision highp float;\n\nattribute vec3 aPosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 1);\n}\n\n\n// __split__\n\n\n#version 100\nprecision highp float;\n\nuniform sampler2D uTexture;\nuniform float uRes;\n\nvoid main() {\n    float FXAA_SPAN_MAX = 8.0;\n    float FXAA_REDUCE_MUL = 1.0/8.0;\n    float FXAA_REDUCE_MIN = 1.0/128.0;\n\n    vec2 texCoords = gl_FragCoord.xy/uRes;\n\n    vec4 rgbNW = texture2D(uTexture, texCoords + (vec2(-1.0, -1.0) / uRes));\n    vec4 rgbNE = texture2D(uTexture, texCoords + (vec2(1.0, -1.0) / uRes));\n    vec4 rgbSW = texture2D(uTexture, texCoords + (vec2(-1.0, 1.0) / uRes));\n    vec4 rgbSE = texture2D(uTexture, texCoords + (vec2(1.0, 1.0) / uRes));\n    vec4 rgbM  = texture2D(uTexture, texCoords);\n\n    vec4 luma = vec4(0.299, 0.587, 0.114, 1.0);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);\n\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) / uRes;\n\n    vec4 rgbA = (1.0/2.0) * \n        (texture2D(uTexture, texCoords.xy + dir * (1.0/3.0 - 0.5)) + \n         texture2D(uTexture, texCoords.xy + dir * (2.0/3.0 - 0.5)));\n    vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * \n        (texture2D(uTexture, texCoords.xy + dir * (0.0/3.0 - 0.5)) +\n         texture2D(uTexture, texCoords.xy + dir * (3.0/3.0 - 0.5)));\n    float lumaB = dot(rgbB, luma);\n\n    if((lumaB < lumaMin) || (lumaB > lumaMax)){\n        gl_FragColor = rgbA;\n    } else {\n        gl_FragColor = rgbB;\n    }\n\n}");

            var position = [
                -1, -1, 0,
                 1, -1, 0,
                 1,  1, 0,
                -1, -1, 0,
                 1,  1, 0,
                -1,  1, 0
            ];

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rDispQuad = new core.Renderable(gl, progDisplayQuad, attribs, count);

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rAccumulator = new core.Renderable(gl, progAccumulator, attribs, count);

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rAO = new core.Renderable(gl, progAO, attribs, count);

            // Initialize geometry.
            var attribs = {
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };
            attribs.aPosition.buffer.set(new Float32Array(position));
            var count = position.length / 9;
            rFXAA = new core.Renderable(gl, progFXAA, attribs, count);

            samples = 0;

        }

        self.createTextures = function() {
            // fbRandRot
            gl.activeTexture(gl.TEXTURE0 + tiRandRotDepth);
            tRandRotDepth = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tRandRotDepth);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, resolution, resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);            

            gl.activeTexture(gl.TEXTURE0 + tiRandRotColor);
            tRandRotColor = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tRandRotColor);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE0 + tiRandRotNormal);
            tRandRotNormal = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tRandRotNormal);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            fbRandRot = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbRandRot);
            extDrawBuffers.drawBuffersWEBGL([
                extDrawBuffers.COLOR_ATTACHMENT0_WEBGL,
                extDrawBuffers.COLOR_ATTACHMENT1_WEBGL,
            ]);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffers.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, tRandRotColor, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffers.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, tRandRotNormal, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tRandRotDepth, 0);

            // fbScene
            gl.activeTexture(gl.TEXTURE0 + tiSceneColor);
            tSceneColor = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tSceneColor);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE0 + tiSceneNormal);
            tSceneNormal = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tSceneNormal);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE0 + tiSceneDepth);
            tSceneDepth = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tSceneDepth);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, resolution, resolution, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);            

            fbScene = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbScene);
            extDrawBuffers.drawBuffersWEBGL([
                extDrawBuffers.COLOR_ATTACHMENT0_WEBGL,
                extDrawBuffers.COLOR_ATTACHMENT1_WEBGL,
            ]);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffers.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, tSceneColor, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, extDrawBuffers.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, tSceneNormal, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, tSceneDepth, 0);

            // fbAccumulator
            gl.activeTexture(gl.TEXTURE0 + tiAccumulator);
            tAccumulator = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulator);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.activeTexture(gl.TEXTURE0 + tiAccumulatorOut);
            tAccumulatorOut = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulatorOut);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            fbAccumulator = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbAccumulator);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tAccumulatorOut, 0);

            // fbAO
            gl.activeTexture(gl.TEXTURE0 + tiAO);
            tAO = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tAO);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            fbAO = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbAO);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tAO, 0);

        }

        self.setResolution = function(res) {
            resolution = res;
            canvas.width = canvas.height = resolution;
            gl.viewport(0,0,resolution,resolution);
            self.createTextures();
        }


        self.setAtoms = function(newAtoms, view) {

            atoms = newAtoms;

            function make36(arr) {
                var out = [];
                for (var i = 0; i < 36; i++) {
                    out.push.apply(out, arr);
                }
                return out;
            }

            // Atoms

            var attribs = {
                aImposter: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
                aPosition: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
                aRadius: {
                    buffer: new core.Buffer(gl),
                    size: 1
                },
                aColor: {
                    buffer: new core.Buffer(gl),
                    size: 3
                },
            };

            var imposter = [];
            var position = [];
            var radius = [];
            var color = [];

            for (var i = 0; i < atoms.atoms.length; i++) {
                imposter.push.apply(imposter, cube.position);
                var a = atoms.atoms[i];
                position.push.apply(position, make36([a.x, a.y, a.z]));
                radius.push.apply(radius, make36([elements[a.symbol].radius]));
                var c = elements[a.symbol].color;
                color.push.apply(color, make36([c[0], c[1], c[2]]));
            }

            attribs.aImposter.buffer.set(new Float32Array(imposter));
            attribs.aPosition.buffer.set(new Float32Array(position));
            attribs.aRadius.buffer.set(new Float32Array(radius));
            attribs.aColor.buffer.set(new Float32Array(color));

            var count = imposter.length / 9;

            rScene = new core.Renderable(gl, progScene, attribs, count);

            // Bonds

            if (view.getBonds()) {

                var bonds = [];

                for (var i = 0; i < atoms.atoms.length - 1; i++) {
                    for (var j = i + 1; j < atoms.atoms.length; j++) {
                        var a = atoms.atoms[i];
                        var b = atoms.atoms[j];
                        var l = glm.vec3.fromValues(a.x, a.y, a.z);
                        var m = glm.vec3.fromValues(b.x, b.y, b.z);
                        var cutoff = elements[a.symbol].radius + elements[b.symbol].radius;
                        if (glm.vec3.distance(l,m) > cutoff * view.getBondThreshold()) {
                            continue;
                        }
                        var ca = elements[a.symbol].color;
                        var cb = elements[b.symbol].color;
                        var ra = elements[a.symbol].radius;
                        var rb = elements[b.symbol].radius;
                        bonds.push({
                            a: a,
                            b: b,
                            ra: ra,
                            rb: rb,
                            ca: ca,
                            cb: cb
                        });
                    }
                }

                rBonds = null;

                if (bonds.length > 0) {

                    var attribs = {
                        aImposter: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aPosA: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aPosB: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aRadA: {
                            buffer: new core.Buffer(gl),
                            size: 1
                        },
                        aRadB: {
                            buffer: new core.Buffer(gl),
                            size: 1
                        },
                        aColA: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        },
                        aColB: {
                            buffer: new core.Buffer(gl),
                            size: 3
                        }
                    };

                    var imposter = [];
                    var posa = [];
                    var posb = [];
                    var rada = [];
                    var radb = [];
                    var cola = [];
                    var colb = [];

                    for (var i = 0; i < bonds.length; i++) {
                        var b = bonds[i];
                        imposter.push.apply(imposter, cube.position);
                        posa.push.apply(posa, make36([b.a.x, b.a.y, b.a.z]));
                        posb.push.apply(posb, make36([b.b.x, b.b.y, b.b.z]));
                        rada.push.apply(rada, make36([b.ra]));
                        radb.push.apply(radb, make36([b.rb]));
                        cola.push.apply(cola, make36([b.ca[0], b.ca[1], b.ca[2]]));
                        colb.push.apply(colb, make36([b.cb[0], b.cb[1], b.cb[2]]));
                    }

                    attribs.aImposter.buffer.set(new Float32Array(imposter));
                    attribs.aPosA.buffer.set(new Float32Array(posa));
                    attribs.aPosB.buffer.set(new Float32Array(posb));
                    attribs.aRadA.buffer.set(new Float32Array(rada));
                    attribs.aRadB.buffer.set(new Float32Array(radb));
                    attribs.aColA.buffer.set(new Float32Array(cola));
                    attribs.aColB.buffer.set(new Float32Array(colb));

                    var count = imposter.length / 9;

                    rBonds = new core.Renderable(gl, progBonds, attribs, count);

                }

            }

        }

        self.reset = function() {
            sampleCount = 0;
            initialRender = false;
            gl.activeTexture(gl.TEXTURE0 + tiAccumulator);
            gl.bindTexture(gl.TEXTURE_2D, tAccumulator);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.activeTexture(gl.TEXTURE0 + tiAccumulatorOut);
            gl.bindTexture(gl.TEXTURE_2D, tAccumulatorOut);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }

        self.render = function(view) {
            if (atoms === undefined) {
                return;
            }
            if (rScene == null) {
                return;
            }

            range = atoms.getRadius(view) * 2.0;

            if (!initialRender) {
                scene(view);
                initialRender = true;
            } else {
                for (var i = 0; i < view.getSamplesPerFrame(); i++) {
                    if (sampleCount > 1024) {
                        break;
                    }
                    sample(view);
                    sampleCount++;
                }
            }
            display(view);
        }

        function scene(view) {
            // Render the depth/color buffers.
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbScene);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            var rect = view.getRect();
            var projection = glm.mat4.create();
            glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
            var viewMat = glm.mat4.create();
            glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
            var model = glm.mat4.create();
            glm.mat4.translate(model, model, [0, 0, -range/2]);
            glm.mat4.multiply(model, model, view.getRotation());
            progScene.setUniform("uProjection", "Matrix4fv", false, projection);
            progScene.setUniform("uView", "Matrix4fv", false, viewMat);
            progScene.setUniform("uModel", "Matrix4fv", false, model);
            progScene.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progScene.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progScene.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
            progScene.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
            progScene.setUniform("uRes", "1f", resolution);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();

            if (view.getBonds() && rBonds != null) {
                progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
                progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
                progBonds.setUniform("uModel", "Matrix4fv", false, model);
                progBonds.setUniform("uRotation", "Matrix4fv", false, view.getRotation());
                progBonds.setUniform("uDepth", "1f", range);
                progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
                progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
                progBonds.setUniform("uRes", "1f", resolution);
                progBonds.setUniform("uBondRadius", "1f", 2.5 * view.getBondRadius());
                progBonds.setUniform("uBondShade", "1f", view.getBondShade());
                progBonds.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
                progBonds.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
                rBonds.render();
            }
        }

        function sample(view) {
            var v = view.clone();
            v.setZoom(1/range);
            v.setTranslation(0, 0);
            var rot = glm.mat4.create();
            for (var i = 0; i < 3; i++) {
                var axis = glm.vec3.random(glm.vec3.create(), 1.0);
                glm.mat4.rotate(rot, rot, Math.random() * 10, axis);
            }
            v.setRotation(glm.mat4.multiply(glm.mat4.create(), rot, v.getRotation()));
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbRandRot);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            var rect = v.getRect();
            var projection = glm.mat4.create();
            glm.mat4.ortho(projection, rect.left, rect.right, rect.bottom, rect.top, 0, range);
            var viewMat = glm.mat4.create();
            glm.mat4.lookAt(viewMat, [0, 0, 0], [0, 0, -1], [0, 1, 0]);
            var model = glm.mat4.create();
            glm.mat4.translate(model, model, [0, 0, -range/2]);
            glm.mat4.multiply(model, model, v.getRotation());
            progScene.setUniform("uProjection", "Matrix4fv", false, projection);
            progScene.setUniform("uView", "Matrix4fv", false, viewMat);
            progScene.setUniform("uModel", "Matrix4fv", false, model);
            progScene.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
            progScene.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
            progScene.setUniform("uAtomScale", "1f", 2.5 * v.getAtomScale());
            progScene.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
            progScene.setUniform("uRes", "1f", resolution);
            progScene.setUniform("uDepth", "1f", range);
            rScene.render();

            if (view.getBonds() && rBonds != null) {
                progBonds.setUniform("uProjection", "Matrix4fv", false, projection);
                progBonds.setUniform("uView", "Matrix4fv", false, viewMat);
                progBonds.setUniform("uModel", "Matrix4fv", false, model);
                progBonds.setUniform("uRotation", "Matrix4fv", false, v.getRotation());
                progBonds.setUniform("uDepth", "1f", range);
                progBonds.setUniform("uBottomLeft", "2fv", [rect.left, rect.bottom]);
                progBonds.setUniform("uTopRight", "2fv", [rect.right, rect.top]);
                progBonds.setUniform("uRes", "1f", resolution);
                progBonds.setUniform("uBondRadius", "1f", 2.5 * view.getBondRadius());
                progBonds.setUniform("uBondShade", "1f", view.getBondShade());
                progBonds.setUniform("uAtomScale", "1f", 2.5 * view.getAtomScale());
                progBonds.setUniform("uRelativeAtomScale", "1f", view.getRelativeAtomScale());
                rBonds.render();
            }

            var sceneRect = view.getRect();
            var rotRect = v.getRect();
            var invRot = glm.mat4.invert(glm.mat4.create(), rot);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbAccumulator);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAccumulator.setUniform("uSceneDepth", "1i", tiSceneDepth);
            progAccumulator.setUniform("uSceneNormal", "1i", tiSceneNormal);
            progAccumulator.setUniform("uRandRotDepth", "1i", tiRandRotDepth);
            progAccumulator.setUniform("uAccumulator", "1i", tiAccumulator);
            progAccumulator.setUniform("uSceneBottomLeft", "2fv", [sceneRect.left, sceneRect.bottom]);
            progAccumulator.setUniform("uSceneTopRight", "2fv", [sceneRect.right, sceneRect.top]);
            progAccumulator.setUniform("uRotBottomLeft", "2fv", [rotRect.left, rotRect.bottom]);
            progAccumulator.setUniform("uRotTopRight", "2fv", [rotRect.right, rotRect.top]);
            progAccumulator.setUniform("uRes", "1f", resolution);
            progAccumulator.setUniform("uDepth", "1f", range);
            progAccumulator.setUniform("uRot", "Matrix4fv", false, rot);
            progAccumulator.setUniform("uInvRot", "Matrix4fv", false, invRot);
            progAccumulator.setUniform("uSampleCount", "1i", sampleCount);
            rAccumulator.render();
            gl.bindTexture(gl.TEXTURE_2D, tAccumulator);
            gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, resolution, resolution, 0);
        }

        function display(view) {
            if (view.getFXAA()) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbAO);
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            progAO.setUniform("uSceneColor", "1i", tiSceneColor);
            progAO.setUniform("uSceneDepth", "1i", tiSceneDepth);
            progAO.setUniform("uAccumulatorOut", "1i", tiAccumulatorOut);
            progAO.setUniform("uRes", "1f", resolution);
            progAO.setUniform("uAO", "1f", 2.0 * view.getAmbientOcclusion());
            progAO.setUniform("uBrightness", "1f", 2.0 * view.getBrightness());
            progAO.setUniform("uOutlineStrength", "1f", view.getOutlineStrength());
            rAO.render();

            if (view.getFXAA()) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                progFXAA.setUniform("uTexture", "1i", tiAO);
                progFXAA.setUniform("uRes", "1f", resolution);
                rFXAA.render();
            }

            // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // progDisplayQuad.setUniform("uTexture", "1i", tiSceneNormal);
            // progDisplayQuad.setUniform("uRes", "1f", resolution);
            // rDispQuad.render();
            // return;
        }

        self.initialize();
}


function loadProgram(gl, src) {
    src = src.split('// __split__');
    return new core.Program(gl, src[0], src[1]);
}
},{"./cube":"/home/rye/Dropbox/src/speck/src/cube.js","./elements":"/home/rye/Dropbox/src/speck/src/elements.js","./gl-matrix":"/home/rye/Dropbox/src/speck/src/gl-matrix.js","./view":"/home/rye/Dropbox/src/speck/src/view.js","./webgl.js":"/home/rye/Dropbox/src/speck/src/webgl.js"}],"/home/rye/Dropbox/src/speck/src/main.js":[function(require,module,exports){
"use strict";

var Imposter = require('./imposter-renderer');

var xyz = require('./xyz');
var elements = require('./elements');
var View = require("./view");
var Atoms = require("./atoms");
var kb = require("keyboardjs");
var lz = require("lz-string");

kb.active = function(key) {
    var keys = kb.activeKeys();
    for (var i = 0; i < keys.length; i++) {
        if (key === keys[i]) {
            return true;
        }
    }
    return false;
}

var atoms = new Atoms();
var view = new View();
var imposter = null;
var needReset = false;

var renderContainer;

function loadStructure(data) {
    atoms = new Atoms();
    for (var i = 0; i < data.length; i++) {
        var a = data[i];
        var x = a.position[0];
        var y = a.position[1];
        var z = a.position[2];
        atoms.addAtom(a.symbol, x,y,z);
    }
    atoms.center();
    imposter.setAtoms(atoms, view);
    needReset = true;
}


window.onload = function() {

    renderContainer = document.getElementById("render-container");

    var imposterCanvas = document.getElementById("imposter-canvas");

    imposter = new Imposter(imposterCanvas, view.getResolution());

    var structs = {};
    structs.protein0 = "681\n4E0O.pdb\nN         14.45600       -7.90000       10.95800\nC         13.86500       -7.78000       12.29000\nC         13.12700       -9.06500       12.68200\nC         11.85000       -9.33100       11.88500\nC         10.59800       -9.60200       12.72800\nN         10.37400       -8.60400       13.77200\nC         14.90600       -7.43400       13.35400\nO         16.07900       -7.80100       13.23700\nN         14.16100       -6.67500       14.37700\nC         15.10600       -6.10700       15.31800\nC         14.47100       -5.88700       16.69000\nO         13.24300       -5.87600       16.83300\nC         15.64300       -4.77700       14.77700\nO         14.63100       -3.79300       14.65300\nN         15.33300       -5.71900       17.68600\nC         14.93100       -5.41400       19.05500\nC         14.94200       -5.42100       19.06400\nC         14.33300       -4.00400       19.09600\nO         14.88900       -3.08500       18.50300\nC         16.12100       -5.56800       20.02900\nC         16.14300       -5.58300       20.04600\nC         17.24200       -4.59200       19.70800\nC         15.79900       -5.08500       21.44700\nC         15.67700       -5.45900       21.48300\nC         16.61400       -7.04600       20.10900\nN         13.20500       -3.83500       19.79000\nC         12.59100       -2.51500       19.90000\nC         12.17500       -2.35500       21.33700\nO         11.51600       -3.24900       21.88200\nC         11.38900       -2.35600       18.94600\nC         10.81300       -0.92700       18.97900\nC          9.93700       -0.58400       17.78700\nO          9.54600       -1.43900       16.98100\nN          9.63400        0.69300       17.63700\nN         12.63600       -1.26500       21.97200\nC         12.30500       -0.97600       23.36700\nC         11.69300        0.41100       23.37700\nO         12.27600        1.33700       22.79900\nC         13.54100       -1.05600       24.30600\nC         14.29000       -2.43400       24.24200\nC         13.13200       -0.67800       25.75800\nC         13.50900       -3.70400       24.76000\nN         10.51900        0.56000       24.02800\nC          9.79600        1.82000       24.02500\nC          9.51100        2.25400       25.43900\nO          9.10800        1.43800       26.26400\nC          8.46700        1.69500       23.18200\nC          7.65500        3.00800       23.21900\nC          8.78000        1.32200       21.72200\nN          9.69700        3.55200       25.70500\nC          9.28800        4.19500       26.94300\nC          8.25500        5.24600       26.50600\nO          8.57000        6.09700       25.67500\nC         10.48200        4.93300       27.60900\nC         10.08700        5.80500       28.77400\nC          9.78500        5.25200       30.01600\nC          9.95500        7.18900       28.62400\nC          9.41500        6.05300       31.09200\nC          9.61100        7.99800       29.69900\nC          9.34200        7.42700       30.93200\nO          9.05300        8.23900       31.99400\nN          7.03700        5.17600       27.02200\nC          6.04000        6.17700       26.65300\nC          5.31000        6.64200       27.91000\nO          4.51100        5.87500       28.45200\nC          5.05900        5.56800       25.61300\nC          4.14800        6.62400       25.00500\nC          3.12000        6.00500       24.06900\nC          2.34200        7.05400       23.31300\nN          1.24800        6.44100       22.50600\nN          4.17300        6.53300       33.01700\nC          4.63100        6.03000       31.72200\nC          5.93200        6.73200       31.28600\nC          5.76600        8.19200       30.80500\nC          4.87000        8.34400       29.57000\nN          5.57500        7.92800       28.35800\nC          4.82900        4.51800       31.79200\nO          4.92400        3.94100       32.88000\nN          4.84300        3.98300       30.54700\nC          4.99400        2.52600       30.40000\nC          6.34100        2.22700       29.75400\nO          6.86100        3.06500       29.03900\nC          3.90400        1.97700       29.47900\nC          2.49300        2.09000       30.01400\nC          1.52200        1.51000       29.01200\nO          1.34000        2.13000       27.93900\nO          1.02300        0.38800       29.25500\nN          6.85400        0.99400       29.92700\nC          8.13600        0.60200       29.37100\nC          8.01300       -0.78800       28.76800\nO          7.53900       -1.72800       29.44500\nC          9.23500        0.66800       30.47400\nC         10.59400        0.15000       30.06900\nC         10.95800       -1.17000       30.32300\nC         11.52800        0.99200       29.46700\nC         12.21300       -1.65900       29.93300\nC         12.79100        0.51100       29.09800\nC         13.12900       -0.81500       29.35500\nN          8.38000       -0.98800       27.45400\nN          8.46900       -2.21300       27.12400\nC          8.99500       -2.55900       25.94200\nO          9.41600       -1.74300       25.13000\nC          9.09400       -4.06500       25.58100\nC          9.70900       -4.38400       24.36200\nC          8.53500       -5.06900       26.37100\nC          7.33800       -5.81100       28.30000\nO          7.89200       -4.72700       27.52700\nC          8.68300       -6.40300       25.97000\nC          9.29900       -6.71300       24.75500\nC          9.83700       -5.70400       23.95500\nN         10.45600       -5.92900       22.77800\nC         10.50500       -7.08600       22.11600\nO          9.99700       -8.13000       22.49900\nC         11.23500       -7.08300       20.77900\nO         11.77700       -6.03000       20.47200\nC         14.32800       -9.28200       20.07300\nC         14.63900       -9.51500       17.64300\nC         15.70100       -9.30300       20.29400\nC         15.54700       -9.85200       16.62800\nC         16.54500       -9.52400       19.21300\nC         15.17500      -10.74000       15.61900\nBr        18.40600       -9.55400       19.45500\nBr        16.38800      -11.22200       14.24900\nC         16.06700       -9.74400       17.93700\nC         13.90000      -11.29000       15.61300\nC         14.70000       -9.75700       17.71500\nC         12.99000      -10.96000       16.61900\nC         13.84500       -9.51300       18.78300\nC         13.34300      -10.04800       17.61600\nC         12.38200       -9.57300       18.52600\nC         12.35000       -9.77600       18.72500\nC         11.74400       -8.24200       18.80000\nC         11.76100       -8.37300       18.80000\nN         11.23000       -8.29100       20.15800\nC         10.58400       -8.22300       17.84800\nO          9.56200       -8.86100       18.06200\nN         10.82200       -7.48000       16.76100\nC          9.83000       -7.34200       15.69200\nC         10.53800       -7.37100       14.34700\nO         11.21500       -6.41200       13.99700\nC          9.02300       -6.04700       15.88400\nN         -0.53400       14.60500       26.47100\nC          0.72100       14.38200       25.74800\nC          1.28400       15.69900       25.20100\nC          0.45300       16.33600       24.07400\nC          0.37300       15.49500       22.79700\nN          1.67500       15.33100       22.15600\nC          1.74900       13.73400       26.66800\nO          1.61800       13.77400       27.89500\nN          2.78600       13.10000       25.88000\nC          3.73200       12.34300       26.69000\nC          5.12200       12.27900       26.05100\nO          5.27400       12.35900       24.82900\nC          3.22200       10.91600       26.87200\nO          3.13800       10.23800       25.62800\nN          6.12700       12.06200       26.88500\nC          7.48100       11.80800       26.42400\nC          7.51400       10.38400       25.84200\nO          6.90500        9.47700       26.41600\nC          8.47400       12.00000       27.58900\nC          9.89300       11.61900       27.17000\nC          8.44900       13.46500       28.05800\nN          8.17900       10.21400       24.68100\nC          8.31500        8.92800       24.00800\nC          9.76300        8.77000       23.57900\nO         10.31300        9.66200       22.93600\nC          7.39600        8.82900       22.79000\nC          7.45900        7.42000       22.17100\nC          6.30500        7.05800       21.26300\nO          5.43400        7.87600       20.93700\nN          6.28100        5.80400       20.84400\nN         10.37700        7.64700       23.97000\nC         11.77300        7.33600       23.67700\nC         11.79400        5.94800       23.12500\nO         11.21300        5.03900       23.74000\nC         12.62900        7.41400       24.96300\nC         12.54000        8.82100       25.64500\nC         14.08600        7.00100       24.63800\nC         13.30400       10.01200       24.86000\nN         12.44400        5.78500       21.96000\nC         12.49300        4.51100       21.26900\nC         13.94200        4.09500       21.01600\nO         14.78700        4.90500       20.61700\nC         11.67800        4.56300       19.92300\nC         11.72400        3.20800       19.20900\nC         10.20700        4.93900       20.17900\nN         14.20500        2.82300       21.23000\nC         15.45900        2.15800       20.88300\nC         15.05800        1.07800       19.86800\nO         14.20100        0.25900       20.17400\nC         16.11200        1.52500       22.12700\nC         17.28100        0.61100       21.80300\nC         18.52800        1.13200       21.46600\nC         17.13000       -0.77700       21.79800\nC         19.58700        0.29700       21.10100\nC         18.20800       -1.62100       21.51200\nC         19.44200       -1.07600       21.19000\nO         20.51500       -1.90000       20.93200\nN         15.55200        1.14600       18.64000\nC         15.19100        0.18400       17.61700\nC         16.46700       -0.29100       16.92300\nO         17.06800        0.50200       16.20600\nC         14.17100        0.80100       16.62300\nC         13.62800       -0.22500       15.60800\nC         12.75000        0.47100       14.55300\nC         12.42200       -0.39700       13.36400\nN         11.87800        0.42400       12.24200\nN         21.51600       -0.27600       15.93900\nC         20.23800        0.25100       16.42200\nC         19.78500       -0.47300       17.70400\nC         19.39200       -1.95300       17.43300\nC         18.18400       -2.09500       16.49300\nN         16.95400       -1.55800       17.11000\nC         20.33700        1.75100       16.65800\nO         21.43900        2.27600       16.83700\nN         19.16000        2.37800       16.60200\nC         19.02300        3.82700       16.72600\nC         18.27200        4.14200       17.98700\nO         17.51600        3.28900       18.44400\nC         18.33300        4.43500       15.48600\nC         19.17400        4.32700       14.21000\nC         20.57100        4.92300       14.27800\nO         21.55900        4.15600       14.21700\nO         20.67800        6.15200       14.47500\nN         18.45900        5.37400       18.52500\nC         17.86300        5.79400       19.80700\nC         17.26300        7.18700       19.69600\nO         17.97600        8.11300       19.25500\nC         18.98000        5.79200       20.87400\nC         18.51700        6.24200       22.22900\nC         18.70100        7.55300       22.64200\nC         17.86500        5.36000       23.08600\nC         18.27000        7.96800       23.90000\nC         17.43800        5.78000       24.34700\nC         17.63300        7.09200       24.73700\nN         15.99600        7.36400       20.07100\nN         15.62400        8.57400       20.07700\nC         14.40400        8.90700       20.51300\nO         13.59500        8.10200       20.98400\nC         14.03100       10.42100       20.52800\nC         12.82300       10.71700       21.15400\nC         14.86500       11.43900       19.99700\nC         16.98900       12.22800       19.02900\nO         16.06900       11.13200       19.39500\nC         14.44400       12.77200       20.13500\nC         13.24700       13.05300       20.81700\nC         12.39300       12.04400       21.28100\nN         11.21300       12.26700       21.91800\nC         10.49200       13.39200       21.89700\nO         10.78200       14.42000       21.26300\nC          9.19400       13.40000       22.71000\nO          8.86000       12.41500       23.36700\nC          8.56400       15.71200       25.79300\nC          5.93400       15.75900       26.02200\nC          8.71900       15.71900       27.17700\nC          4.96600       16.28900       26.88700\nC          7.60200       15.89000       27.97900\nC          4.34300       17.49900       26.58800\nBr         7.80300       15.92000       29.83700\nBr         3.02300       18.26600       27.71300\nC          6.32900       16.07900       27.45800\nC          4.68900       18.20100       25.44300\nC          6.16800       16.08800       26.08200\nC          5.63400       17.68400       24.57100\nC          7.28600       15.91000       25.27200\nC          6.24800       16.45500       24.84400\nC          7.09800       15.96800       23.80000\nC          7.33300       16.03900       23.87400\nC          7.23000       14.59200       23.19000\nC          7.24100       14.67700       23.19400\nN          8.55600       14.53100       22.60200\nC          6.26100       14.65500       22.03700\nO          6.26800       15.59500       21.25400\nN          4.99000       14.35500       22.39300\nC          3.79600       14.37500       21.53400\nC          2.52300       14.21800       22.33900\nO          2.37800       13.22500       23.04400\nC          3.87900       13.35100       20.37500\nC          4.31800       11.93300       20.76800\nC          4.39000       10.98700       19.57200\nC          3.13700       10.15800       19.41100\nN          3.26600        9.17600       18.30300\nN          6.29700       17.34500      -12.97800\nC          6.39100       16.55100      -11.75800\nC          6.92600       17.38400      -10.59300\nC          8.34400       17.93200      -10.77900\nC          9.47000       16.93400      -10.48700\nN          9.29900       16.20900       -9.22700\nC          5.04700       15.94400      -11.38300\nO          3.99300       16.41100      -11.81400\nN          5.21400       14.79900      -10.50700\nC          3.97600       14.16100      -10.09600\nC          3.97800       13.80100       -8.61700\nO          5.04300       13.71400       -7.97900\nC          3.68400       12.93400      -10.96000\nO          4.67400       11.92800      -10.84700\nN          2.77200       13.62700       -8.06400\nC          2.61500       13.25300       -6.66300\nC          3.20000       11.85800       -6.41400\nO          3.03000       10.94900       -7.23200\nC          1.14000       13.34800       -6.19000\nC          0.26300       12.31100       -6.89300\nC          1.04400       13.21600       -4.66100\nN          3.90500       11.71300       -5.28500\nC          4.49400       10.44500       -4.89500\nC          4.29900       10.24300       -3.38600\nO          4.77900       11.05500       -2.57500\nC          5.97000       10.34200       -5.30400\nC          6.45600        8.89700       -5.18300\nC          7.86700        8.70200       -5.68600\nO          8.22600        9.09100       -6.80500\nN          8.69400        8.07900       -4.87400\nN          3.60600        9.15100       -3.02900\nC          3.33200        8.80400       -1.62600\nC          3.90400        7.41100       -1.38800\nO          3.60800        6.48600       -2.14000\nC          1.80400        8.89300       -1.28700\nC          1.19600       10.27400       -1.65100\nC          1.53200        8.50100        0.18300\nC          1.72500       11.53300       -0.82600\nN          4.75500        7.28300       -0.37000\nC          5.41700        6.02200       -0.03600\nC          5.09300        5.59300        1.39300\nO          5.12000        6.40700        2.33200\nC          6.96500        6.14500       -0.23000\nC          7.68800        4.84600        0.17900\nC          7.31200        6.50900       -1.67000\nN          4.83000        4.27900        1.54500\nC          4.69200        3.63300        2.82200\nC          5.81300        2.60200        2.79200\nO          5.85900        1.79500        1.85700\nC          3.33400        2.92200        2.93200\nC          3.25700        2.02300        4.14400\nC          2.91200        2.53100        5.39300\nC          3.54400        0.65800        4.04600\nC          2.80900        1.69900        6.50900\nC          3.47400       -0.17400        5.15800\nC          3.11600        0.35000        6.39000\nO          2.98800       -0.50300        7.45500\nN          6.74800        2.65400        3.76100\nC          7.83400        1.68000        3.79700\nC          7.94800        1.16900        5.22800\nO          8.32000        1.94800        6.10200\nC          9.15300        2.32800        3.29700\nC         10.30800        1.32400        3.18700\nC         11.62800        2.01800        2.90700\nC         12.76200        1.02200        2.81500\nN         14.07700        1.64200        3.14400\nN          6.97700        1.23500       10.44500\nC          7.11900        1.72800        9.08100\nC          6.09600        1.05100        8.15800\nC          6.39600       -0.42600        7.85600\nC          7.69900       -0.67800        7.07800\nN          7.62000       -0.16400        5.70600\nC          6.95300        3.23600        9.03800\nO          6.21700        3.81400        9.84400\nN          7.26300        3.84400        7.87800\nC          7.18600        5.28900        7.67200\nC          6.20800        5.58800        6.54900\nO          5.94800        4.72400        5.70700\nC          8.56800        5.87000        7.34200\nC          9.50500        5.96500        8.54300\nC         10.94200        6.37400        8.25900\nO         11.25500        6.74400        7.10300\nO         11.75800        6.33500        9.20900\nN          5.65400        6.80700        6.54700\nC          4.69000        7.20100        5.53100\nC          5.00900        8.61000        5.02600\nO          5.10700        9.54800        5.82500\nC          3.24100        7.12300        6.09900\nC          2.15600        7.59100        5.14900\nC          1.69900        8.91300        5.18000\nC          1.56800        6.70600        4.24800\nC          0.70500        9.35200        4.29500\nC          0.57100        7.14300        3.36300\nC          0.15000        8.46400        3.38900\nN          5.16600        8.86800        3.71300\nN          5.33900       10.05200        3.35100\nC          5.26900       10.39700        2.06200\nO          5.13100        9.58700        1.14900\nC          5.40600       11.89100        1.70500\nC          5.25300       12.22400        0.35100\nC          5.62100       12.89700        2.66100\nC          5.63400       13.62200        4.96400\nO          5.75300       12.56300        3.99400\nC          5.71400       14.23400        2.22700\nC          5.60500       14.53800        0.87400\nC          5.35000       13.54400       -0.07500\nN          5.25700       13.78800       -1.39800\nC          5.51200       14.94300       -2.02400\nO          5.86600       15.98700       -1.47200\nC          5.35400       14.92300       -3.53700\nO          4.94700       13.87400       -4.04500\nC          2.84700       16.98500       -5.52000\nC          3.85300       17.31700       -7.60200\nC          1.50200       17.03100       -5.88100\nC          3.22300       17.69500       -8.78700\nC          1.16600       17.30900       -7.20000\nC          3.63400       18.84200       -9.46000\nBr        -0.63900       17.32700       -7.71700\nBr         2.77600       19.34600      -11.06800\nC          2.12300       17.58200       -8.16500\nC          4.68200       19.60800       -8.96500\nC          3.46400       17.57900       -7.79800\nC          5.31900       19.22900       -7.78300\nC          3.81700       17.28500       -6.48100\nC          4.91700       18.07400       -7.10700\nC          5.27500       17.30700       -6.11300\nC          5.61200       17.70500       -5.81500\nC          5.70600       15.95200       -5.60900\nC          5.75800       16.20200       -5.59200\nN          5.62600       15.95500       -4.16000\nC          7.14600       15.78300       -6.02900\nO          8.08700       16.26800       -5.41400\nN          7.48700       14.85500       -6.95800\nC          8.79700       14.59300       -7.56300\nC          8.77700       15.01400       -9.02800\nO          7.90900       14.56700       -9.77900\nC          9.17900       13.10000       -7.43100\nC         10.61100       12.76700       -7.87900\nC         10.85900       11.26200       -7.86300\nC         12.29800       10.89000       -8.13400\nN         12.65400       11.03500       -9.56800\nN         13.88200       -7.20300        5.99500\nC         13.07100       -6.67800        4.90000\nC         12.77400       -7.78100        3.88100\nC         13.98200       -8.23000        3.07300\nC         14.54200       -7.16600        2.14400\nN         13.61500       -6.83300        1.06300\nC         11.76000       -6.08300        5.41300\nO         11.36100       -6.33000        6.55900\nN         11.05100       -5.22100        4.38700\nC          9.78300       -4.62900        4.79400\nC          8.80900       -4.43300        3.63100\nO          9.19600       -4.47200        2.45600\nC         10.01600       -3.29500        5.50500\nO         10.61600       -2.33600        4.64900\nN          7.53300       -4.19700        3.98000\nC          6.46800       -3.90200        3.02000\nC          6.71600       -2.51400        2.47700\nO          6.94400       -1.58300        3.25800\nC          5.06100       -3.98000        3.66500\nC          3.95400       -3.77200        2.63400\nC          4.87100       -5.30100        4.36600\nN          6.62500       -2.36500        1.15200\nC          6.79000       -1.06700        0.51500\nC          5.61800       -0.88700       -0.42900\nO          5.34900       -1.78400       -1.22900\nC          8.12200       -1.00700       -0.23700\nC          8.56300        0.41300       -0.55400\nC          9.94200        0.44500       -1.16700\nO         10.87700       -0.23600       -0.71700\nN         10.09100        1.23700       -2.21400\nN          4.87300        0.21300       -0.27500\nC          3.68200        0.50900       -1.09100\nC          3.89500        1.91900       -1.64400\nO          4.20500        2.82500       -0.88400\nC          2.35900        0.42100       -0.26900\nC          2.12000       -1.01300        0.33000\nC          1.15500        0.88400       -1.14000\nC          1.81500       -2.13600       -0.71100\nN          3.78200        2.07300       -2.96800\nC          4.01000        3.34700       -3.63100\nC          2.79100        3.74700       -4.42000\nO          2.19700        2.92600       -5.12100\nC          5.28400        3.27000       -4.56000\nC          5.49900        4.57000       -5.34600\nC          6.55100        2.94400       -3.75700\nN          2.47200        5.04500       -4.37400\nC          1.45300        5.65300       -5.22200\nC          2.23600        6.74300       -5.97400\nO          2.90000        7.54000       -5.33000\nC          0.32800        6.25300       -4.37600\nC         -0.62300        7.14800       -5.14800\nC         -1.61900        6.60900       -5.95600\nC         -0.54700        8.53200       -5.04100\nC         -2.49400        7.42900       -6.66700\nC         -1.43000        9.36000       -5.72600\nC         -2.40700        8.80400       -6.53400\nO         -3.27600        9.63500       -7.19400\nN          2.25900        6.71300       -7.31300\nC          2.99000        7.71200       -8.09600\nC          2.11100        8.15500       -9.24600\nO          1.86600        7.34500      -10.13900\nC          4.35100        7.14700       -8.58800\nC          5.25300        8.19700       -9.22700\nC          6.57000        7.61000       -9.69900\nC          7.39600        8.62800      -10.44300\nN          8.58700        8.00800      -11.07600\nN         -1.98700        8.01500      -12.15800\nC         -1.03800        7.45200      -11.20900\nC         -1.13400        8.20000       -9.87400\nC         -0.76000        9.69000       -9.94900\nC          0.71300        9.96000      -10.25100\nN          1.59600        9.39200       -9.22900\nC         -1.36100        5.97200      -10.99300\nO         -2.36300        5.46400      -11.51100\nN         -0.10000        5.42500      -10.71300\nC          0.00700        3.98200      -10.48600\nC          0.10800        3.67100       -9.00900\nO          0.57500        4.49900       -8.22800\nC          1.21200        3.38000      -11.23300\nC          1.18800        3.57200      -12.74300\nC          0.26800        2.62200      -13.48100\nO          0.69800        1.47900      -13.75500\nO         -0.88400        3.01500      -13.77500\nN         -0.27700        2.43900       -8.63400\nC         -0.24300        2.04600       -7.22700\nC          0.32200        0.64700       -7.07900\nO         -0.13900       -0.24300       -7.79100\nC         -1.67900        2.10400       -6.67800\nC         -1.84800        1.63100       -5.26000\nC         -2.19700        0.30800       -4.98600\nC         -1.66400        2.50400       -4.19500\nC         -2.32600       -0.13300       -3.66500\nC         -1.80700        2.06500       -2.88000\nC         -2.15900        0.75900       -2.62400\nN          1.27200        0.37300       -6.19100\nN          1.64800       -0.81200       -6.04100\nC          2.57200       -1.10600       -5.15000\nO          3.11900       -0.27100       -4.42400\nC          2.92900       -2.59100       -4.99100\nC          3.74800       -2.90300       -3.91700\nC          2.35600       -3.61100       -5.78800\nC          0.87100       -4.36300       -7.53800\nO          1.54200       -3.26900       -6.83600\nC          2.64600       -4.95300       -5.47600\nC          3.53300       -5.24000       -4.42500\nC          4.08600       -4.23400       -3.63700\nN          4.93100       -4.44300       -2.59800\nC          5.60800       -5.56500       -2.31900\nO          5.56200       -6.59300       -2.98400\nC          6.53300       -5.57000       -1.10100\nO          6.73800       -4.52000       -0.50000\nC          5.97400       -7.93200        2.08900\nC          8.17300       -7.90700        3.13400\nC          5.23900       -8.02600        3.26900\nC          8.65300       -8.34700        4.37200\nC          5.88700       -8.17800        4.49100\nC          9.47400       -9.46700        4.44300\nBr         4.87900       -8.19900        6.09400\nBr        10.11400      -10.09700        6.10700\nC          7.26800       -8.31100        4.54100\nC          9.83000      -10.16100        3.29800\nC          8.00600       -8.28000        3.35900\nC          9.35800       -9.72600        2.06300\nC          7.35600       -8.08500        2.14000\nC          8.55900       -8.59100        1.97800\nC          8.15500       -8.10100        0.87000\nC          8.03400       -8.23200        0.61400\nC          8.21300       -6.74500        0.18900\nC          8.20800       -6.78300        0.19300\nN          7.17000       -6.65500       -0.81500\nC          9.53600       -6.66600       -0.52300\nO          9.81000       -7.46300       -1.41000\nN         10.41600       -5.93100        0.18600\nC         11.81800       -5.69700       -0.15900\nC         12.68900       -5.85300        1.08400\nO         12.50400       -5.12900        2.05900\nC         11.99400       -4.31400       -0.80400\nC          2.82600       -2.52400       26.43600\nC          4.19000       -2.01700       26.89700\nO          4.00800       -1.13400       28.03400\nC          4.98400       -3.21700       27.39400\nC          4.95500       -1.31900       25.75800\nC          4.69700        0.16800       25.46600\nO          3.37700        0.58300       25.73600\nC          5.68400        1.10000       26.14900\nC         13.14800      -11.56000       25.42300\nC         12.40200      -10.22700       25.39500\nO         11.54300      -10.19400       24.23200\nC         11.50200      -10.15500       26.62100\nC         13.33900       -9.01100       25.38000\nC         14.24900       -8.85100       24.15600\nO         13.47500       -8.80000       22.97300\nC         15.08300       -7.58000       24.29300\nP         23.42800       -1.27000       19.11100\nO         24.97700       -1.47600       19.33000\nO         23.37500       -0.23800       17.91200\nO         22.86100       -2.67800       18.67500\nO         22.77100       -0.77500       20.48500\nC         14.80400        5.13300       17.10100\nC         14.56400        6.37700       16.25500\nO         14.48900        5.95500       14.87000\nC         13.21600        6.96700       16.65100\nC         15.71700        7.36700       16.48300\nC         15.89300        8.54500       15.51300\nO         16.52300        9.60300       16.20100\nC         16.79200        8.18500       14.33700\nC          8.32100        8.45300       18.63100\nC          9.66000        9.14300       18.38900\nO         10.67700        8.41300       19.13000\nC         10.01400        9.02900       16.90800\nC          9.65700       10.58400       18.93000\nC          8.88200       11.65900       18.15600\nO          7.94300       12.26400       19.02100\nC          9.83400       12.73200       17.63600\nC         10.80300       12.63700       -2.44400\nC          9.42900       13.12100       -1.98400\nO          9.62700       14.38900       -1.31000\nC          8.55200       13.39800       -3.19900\nC          8.71000       12.22800       -0.95400\nC          8.89300       10.70700       -0.98600\nO          8.50900       10.18700        0.26500\nC          8.01400       10.04400       -2.03300\nP         -5.22300        9.08500       -9.94500\nO         -4.26600       10.31500      -10.01500\nO         -6.70300        9.46400      -10.34000\nO         -4.73800        7.99400      -10.99600\nO         -5.25000        8.54200       -8.45600\nP         -2.90900       11.56100      -13.28800\nO         -2.28700       12.71200      -12.39600\nO         -3.06000       12.00400      -14.80400\nO         -1.89600       10.35700      -13.25300\nO         -4.34000       11.21300      -12.71300\nC          1.98700       -5.85200       -0.63600\nC          2.26200       -7.13800        0.13700\nO          3.64200       -7.52200       -0.06800\nC          2.08900       -6.87400        1.62100\nC          1.33200       -8.29200       -0.24600\nC          1.31300       -8.72600       -1.71200\nO          2.63300       -8.90200       -2.18800\nC          0.53300      -10.02600       -1.83500\nC          3.57500        2.56400       -8.40000\nC          4.21000        1.27100       -8.89100\nO          4.99100        1.59300      -10.07200\nC          5.14400        0.75500       -7.80300\nC          3.10800        0.25000       -9.20100\nC          3.38800       -0.78600      -10.29500\nO          4.20600       -1.81600       -9.79100\nC          2.08700       -1.38400      -10.82200\nO          5.57800       -0.44300       32.00800\nO         13.37600        3.17000       24.80100\nO          1.89500        5.16500       28.18200\nO          8.79300        7.22800       34.42700\nO         18.21000       -5.81300       16.72900\nO          7.14800       -3.03300       31.74400\nO          1.04500        5.57700       30.72000\nO          5.83100       -5.38000       32.05200\nO          6.23100        6.23500       34.89100\nO         15.80400       -1.94500       13.04300\nO          6.88300        0.90600       33.94700\nO         18.28100       -8.41700       15.04400\nO         20.62000        6.83700       17.44600\nO         20.19200        9.47900       19.00500\nO         24.10300       -0.58600       22.83800\nO         21.58600       -2.58900       14.70700\nO         21.86500        1.51500       13.74400\nO         21.39700       -9.49400       19.59000\nO         16.77100        1.22100       13.58400\nO         24.50500       -2.16000       14.83500\nO         22.32600       -4.22000       16.50400\nO         19.86500       -1.99300       13.14600\nO         19.61500        0.77200       12.61000\nO         26.48600       -1.40600       22.00500\nO         25.81500       -3.68500       18.99700\nO         23.45000        4.26800       16.62600\nO          7.67900       15.94900       32.63800\nO         15.00500        3.59100       13.45000\nO          0.59600       14.07200       -9.89300\nO          1.84500        4.72900       -0.67300\nO          5.88600        8.28300        8.98400\nO          4.30700        9.61300      -12.18800\nO          4.44400       10.84300        8.15200\nO          8.14900       12.09600      -10.87500\nO         11.03600        2.79200        6.55200\nO          6.44000       12.36400      -12.93400\nO          9.96900        7.43400       -8.11000\nO         -2.04200       13.17900       -9.78500\nO          3.11200        6.35800      -12.33700\nO         -1.99200        1.02000      -10.58300\nO         -1.81300       -2.01200       -8.96700\nO         -4.21000        0.46500      -12.44900\nO         -3.29000       17.19000       -9.08100\nO         -7.21300        8.22800       -6.92100\nO          0.40700        9.54100      -14.41100\nO         -8.10400       11.53400      -11.08400\nO         -5.21600        5.82400       -9.41100\nO         -1.93700        9.75300      -15.98700\nO          0.47500       12.77300      -12.48600\nO         -1.48700        6.53800      -14.59200\n";
    structs.protein1 = "8086\n4QCI.pdb\nN         24.33500        0.79100      -23.23000\nC         24.47200        1.89700      -24.17600\nC         25.68200        2.79300      -23.90000\nO         26.77700        2.26500      -23.69400\nC         23.15400        2.69300      -24.37100\nC         21.99300        1.86500      -24.88700\nC         21.97000        1.39900      -26.20000\nC         20.90700        1.56500      -24.06800\nC         20.91000        0.62400      -26.67700\nC         19.83500        0.80100      -24.53700\nC         19.84000        0.33400      -25.84400\nO         18.78800       -0.42000      -26.31500\nN         25.49100        4.13800      -23.90300\nC         26.56400        5.12100      -23.79200\nC         26.18000        6.46800      -23.15300\nO         25.03800        6.93000      -23.25100\nC         27.20200        5.35100      -25.19300\nC         26.27700        5.94100      -26.25100\nC         26.87300        6.33400      -27.59500\nO         28.10300        6.54800      -27.69000\nO         26.08800        6.43100      -28.56600\nN         27.16400        7.07500      -22.45900\nC         27.05900        8.40000      -21.84600\nC         27.54900        9.38000      -22.91800\nO         28.70300        9.32500      -23.32300\nC         27.90300        8.48600      -20.55800\nC         27.43200        7.67900      -19.35500\nC         28.47600        7.67800      -18.27100\nC         26.12900        8.22800      -18.80600\nN         26.64000       10.20300      -23.44300\nC         26.91300       11.10800      -24.56000\nC         27.37000       12.50000      -24.15000\nO         26.68300       13.18100      -23.39900\nC         25.72600       11.08400      -25.55400\nO         25.58100        9.76200      -26.06400\nC         25.89500       12.06600      -26.71700\nN         28.49800       12.93700      -24.70700\nC         29.08800       14.25500      -24.46300\nC         29.42000       14.89000      -25.80300\nO         29.86600       14.17700      -26.70200\nC         30.42900       14.13100      -23.71200\nC         30.36300       13.62700      -22.30400\nC         31.70500       13.78500      -21.66300\nO         32.23100       14.89300      -21.52900\nN         32.27400       12.68800      -21.22500\nN         29.33300       16.23400      -25.94000\nC         29.77600       16.86600      -27.20700\nC         31.28900       16.65400      -27.37200\nO         31.98600       16.78000      -26.37500\nC         29.41300       18.34600      -27.01900\nC         29.34400       18.54700      -25.52800\nC         28.86300       17.24000      -24.96000\nN         31.82900       16.26200      -28.55500\nC         33.28400       16.02500      -28.66100\nC         34.16300       17.22400      -28.33200\nO         35.30900       17.05800      -27.91500\nC         33.46500       15.58300      -30.11600\nC         32.13100       15.11600      -30.55000\nC         31.16400       16.01700      -29.84900\nN         33.61500       18.43000      -28.50200\nC         34.33900       19.66000      -28.22400\nC         33.41900       20.80200      -27.85500\nO         32.31600       20.89200      -28.38500\nC         35.22500       20.04900      -29.41100\nO         34.60000       20.96500      -30.29200\nN         33.90300       21.69100      -26.97100\nC         33.22600       22.91400      -26.54500\nC         34.25100       24.06100      -26.61200\nO         35.34400       23.94700      -26.05700\nC         32.51300       22.77800      -25.15500\nC         32.17000       24.13800      -24.53500\nC         31.26400       21.90600      -25.26000\nN         33.90600       25.14000      -27.33100\nC         34.75100       26.32600      -27.46700\nC         34.10900       27.50100      -26.75800\nO         32.91200       27.73100      -26.91000\nC         34.99800       26.65700      -28.93800\nO         36.35700       27.01100      -29.14900\nN         34.89400       28.21500      -25.94800\nC         34.45900       29.40100      -25.19000\nC         35.52300       30.50900      -25.25000\nO         36.69300       30.21800      -25.48700\nC         34.03800       29.11200      -23.72100\nC         32.66900       28.45400      -23.65900\nC         35.08600       28.28600      -22.97400\nN         35.11000       31.77100      -25.03900\nC         36.02800       32.90200      -25.01200\nC         36.58000       33.01100      -23.57600\nO         35.85600       32.65400      -22.64100\nC         35.28600       34.17500      -25.39300\nN         37.83100       33.48700      -23.34600\nC         38.31100       33.59400      -21.94900\nC         37.36800       34.44200      -21.08900\nO         36.85200       35.45400      -21.56600\nC         39.71200       34.22000      -22.06600\nC         40.04500       34.22200      -23.49700\nC         38.83200       33.97400      -24.32100\nN         37.09900       33.98100      -19.86800\nC         36.19700       34.65300      -18.93300\nC         34.73200       34.27900      -19.05800\nO         33.94000       34.63500      -18.18200\nN         34.34600       33.58200      -20.14900\nC         32.96300       33.14100      -20.36200\nC         32.66900       31.84200      -19.63000\nO         33.56000       31.23100      -19.04200\nC         32.61600       33.02300      -21.85400\nC         32.37800       34.36900      -22.56900\nC         31.48500       35.39400      -21.84300\nO         31.97600       36.28900      -21.12200\nN         30.17100       35.34000      -22.07200\nN         31.40200       31.44100      -19.64200\nC         30.94400       30.24900      -18.96100\nC         30.89000       29.07900      -19.92000\nO         30.17600       29.12100      -20.92400\nC         29.61700       30.53100      -18.22900\nO         29.85400       31.51900      -17.21800\nC         29.02900       29.29300      -17.59200\nN         31.64700       28.02500      -19.59900\nC         31.65900       26.80000      -20.37900\nC         30.64500       25.82400      -19.78600\nO         30.55900       25.67200      -18.56400\nC         33.05000       26.19400      -20.37300\nN         29.85600       25.18800      -20.65600\nC         28.85200       24.20700      -20.26000\nC         29.07000       22.93000      -21.05300\nO         29.02500       22.93700      -22.28200\nC         27.42800       24.76000      -20.42000\nC         27.07400       25.77600      -19.35400\nC         25.76000       26.47300      -19.65600\nN         25.78200       27.86900      -19.21300\nC         25.49100       28.27500      -17.98000\nN         25.56000       29.56100      -17.66600\nN         25.13700       27.39400      -17.04900\nN         29.38800       21.85000      -20.34200\nC         29.66300       20.54800      -20.93700\nC         28.57200       19.62500      -20.45500\nO         28.42600       19.42100      -19.25200\nC         31.09400       20.04100      -20.58100\nC         32.17300       20.99700      -21.14600\nC         31.30800       18.60500      -21.07400\nC         33.50300       20.94800      -20.44700\nN         27.79900       19.08300      -21.40000\nC         26.70300       18.17400      -21.10100\nC         27.11200       16.69600      -21.16600\nO         28.12900       16.33500      -21.75900\nC         25.52000       18.44500      -22.02200\nO         25.89400       18.23100      -23.37000\nN         26.29300       15.85000      -20.54700\nC         26.47600       14.41500      -20.47600\nC         25.08200       13.81600      -20.40500\nO         24.34300       14.11100      -19.46900\nC         27.31200       14.05300      -19.25300\nS         27.53300       12.27800      -19.00000\nN         24.71000       13.01500      -21.41300\nC         23.38100       12.41700      -21.49500\nC         23.40500       10.91500      -21.41300\nO         24.26500       10.26900      -22.00600\nC         22.66300       12.84900      -22.76800\nO         22.46200       14.25200      -22.80200\nN         22.42600       10.38100      -20.70200\nC         22.22300        8.95200      -20.51200\nC         20.81500        8.64700      -20.04900\nO         20.16400        9.50400      -19.43600\nN         20.34600        7.41100      -20.32400\nC         19.01200        6.93000      -19.95700\nC         18.81300        7.00300      -18.43600\nO         19.52700        6.32700      -17.68400\nC         18.78600        5.49100      -20.49800\nC         17.35100        4.94600      -20.45200\nO         16.42300        5.70800      -20.05900\nO         17.15100        3.77500      -20.83800\nN         17.88200        7.87800      -17.99400\nC         17.53500        8.13200      -16.58400\nC         18.75000        8.52800      -15.72300\nO         18.81300        8.17500      -14.54700\nC         16.77600        6.94900      -15.98100\nO         15.41200        6.96200      -16.36700\nN         19.70200        9.29100      -16.31400\nC         20.94200        9.75000      -15.67000\nC         20.71300       10.50600      -14.35200\nO         21.54700       10.43300      -13.43300\nC         21.79600       10.58400      -16.65400\nC         23.26300       10.82100      -16.25200\nC         24.05700        9.52600      -16.19400\nC         23.93200       11.80700      -17.16600\nN         19.58700       11.21600      -14.27600\nC         19.17600       11.97200      -13.09400\nC         18.97300       11.11600      -11.85900\nO         19.10700       11.61700      -10.74300\nN         18.68500        9.80800      -12.05600\nC         18.49200        8.84800      -10.96800\nC         19.80700        8.15800      -10.52500\nO         19.77400        7.23700       -9.70500\nC         17.38500        7.84900      -11.30500\nO         17.64800        7.10600      -12.48200\nN         20.95600        8.64500      -11.03600\nC         22.30300        8.16700      -10.71200\nC         23.20200        9.34000      -10.33800\nO         22.84600       10.49700      -10.58700\nC         22.91100        7.37500      -11.88100\nC         22.06200        6.21500      -12.35700\nC         22.06200        5.00000      -11.67200\nC         21.29900        6.31200      -13.51200\nC         21.30300        3.91900      -12.12300\nC         20.55300        5.23600      -13.98400\nC         20.55000        4.04200      -13.27900\nO         19.79800        2.98800      -13.73700\nN         24.36100        9.04700       -9.72600\nC         25.32400       10.06700       -9.28600\nC         26.40100       10.28200      -10.35100\nO         27.06500        9.32900      -10.74900\nC         25.95200        9.68500       -7.93600\nC         24.96600        9.51000       -6.80900\nC         24.62400       10.58100       -5.99100\nC         24.40000        8.26700       -6.54600\nC         23.72800       10.41100       -4.93100\nC         23.48700        8.10200       -5.50600\nC         23.17100        9.17000       -4.69200\nN         26.53900       11.53700      -10.83000\nC         27.47600       11.91700      -11.88800\nC         28.72500       12.60800      -11.34900\nO         28.64100       13.58700      -10.59800\nC         26.80500       12.69000      -13.05200\nC         27.80700       13.02100      -14.16300\nC         25.63600       11.89600      -13.62300\nN         29.88200       12.08200      -11.76700\nC         31.20200       12.59500      -11.42600\nC         31.85200       13.14900      -12.69200\nO         31.56600       12.67000      -13.79600\nC         32.05900       11.48400      -10.78500\nC         31.26000       10.59800       -9.86500\nN         30.62300       11.10800       -8.72900\nC         30.96700        9.28000       -9.96900\nC         29.98000       10.08900       -8.18900\nN         30.15600        8.96800       -8.89600\nN         32.69400       14.17500      -12.53700\nC         33.41200       14.80800      -13.63700\nC         34.90600       14.78200      -13.39000\nO         35.37500       15.09800      -12.28800\nC         32.91300       16.24000      -13.88100\nC         31.50100       16.32100      -14.40500\nC         30.35300       16.39700      -13.66900\nC         31.09600       16.32800      -15.78400\nN         29.26100       16.48600      -14.49900\nC         29.68700       16.43400      -15.80400\nC         31.79500       16.29600      -17.00900\nC         28.96000       16.50300      -17.00100\nC         31.07700       16.37600      -18.18800\nC         29.67700       16.48600      -18.17700\nN         35.65000       14.40300      -14.44200\nC         37.10000       14.32000      -14.44000\nC         37.68600       15.25600      -15.46400\nO         37.16400       15.37300      -16.57000\nC         37.58700       12.88400      -14.70000\nC         37.07100       11.89400      -13.68200\nC         35.88900       11.19000      -13.90400\nC         37.71500       11.71700      -12.46300\nC         35.38100       10.31300      -12.94500\nC         37.21500       10.84300      -11.49900\nC         36.04400       10.14900      -11.74200\nO         35.56000        9.27000      -10.81100\nN         38.76500       15.94500      -15.07400\nC         39.53200       16.83600      -15.91400\nC         40.86000       16.12600      -16.23900\nO         41.55500       15.65100      -15.33700\nC         39.78200       18.17400      -15.19500\nC         40.68900       19.12200      -15.97200\nC         41.16400       20.28100      -15.14100\nO         41.98300       20.13400      -14.22600\nN         40.69100       21.47000      -15.47000\nN         41.19600       16.04200      -17.52600\nC         42.44500       15.42000      -17.93500\nC         43.21300       16.28200      -18.90900\nO         42.69900       16.65800      -19.95800\nC         42.23300       14.00300      -18.47700\nC         43.53700       13.25800      -18.74800\nC         43.29600       11.91100      -19.37100\nO         42.38400       11.73600      -20.16200\nN         44.11700       10.93200      -19.05500\nN         44.45300       16.59600      -18.54100\nC         45.37600       17.37000      -19.36100\nC         46.30900       16.38400      -20.05100\nO         46.48300       15.27300      -19.53200\nC         46.12000       18.41300      -18.51700\nC         45.23300       19.62500      -18.24300\nC         45.66300       20.38600      -17.02200\nC         44.75400       21.55100      -16.78800\nN         45.31100       22.48500      -15.78200\nN         46.84000       16.70500      -21.26000\nC         47.68500       15.72400      -21.97400\nC         48.87200       15.22100      -21.16400\nO         49.55600       16.01000      -20.50600\nC         48.13300       16.48400      -23.23600\nC         47.12200       17.56300      -23.40900\nC         46.69800       17.95500      -22.04100\nN         49.06900       13.90300      -21.19100\nC         50.14400       13.24800      -20.45100\nC         49.90300       13.16000      -18.95600\nO         50.80700       12.77800      -18.20900\nN         48.69400       13.52100      -18.49500\nC         48.36100       13.49600      -17.06800\nC         47.24100       12.53000      -16.77600\nO         46.51500       12.12000      -17.67900\nC         48.02000       14.89800      -16.53900\nC         49.11100       15.94200      -16.77200\nC         49.18200       16.93300      -15.65200\nO         48.21700       17.65300      -15.34900\nN         50.34600       17.00900      -15.03400\nN         47.12900       12.13300      -15.50600\nC         46.07600       11.25200      -15.01000\nC         44.80700       12.10500      -14.82600\nO         44.92400       13.31300      -14.53300\nC         46.48700       10.64800      -13.67900\nN         43.58800       11.52100      -14.95800\nC         42.37400       12.32700      -14.73500\nC         42.30300       12.87500      -13.30700\nO         42.81300       12.24100      -12.38000\nC         41.22900       11.35300      -15.04300\nC         41.86300       10.26700      -15.88400\nC         43.25300       10.13500      -15.34400\nN         41.68600       14.06000      -13.13700\nC         41.49800       14.71400      -11.82900\nC         40.00600       14.87000      -11.56800\nO         39.30200       15.43600      -12.39800\nC         42.25400       16.08600      -11.71300\nC         41.86500       16.84800      -10.45000\nC         43.76600       15.89300      -11.76000\nN         39.53700       14.41900      -10.40200\nC         38.15400       14.56100       -9.98700\nC         37.86700       16.03100       -9.67000\nO         38.44200       16.57600       -8.72800\nC         37.88700       13.64500       -8.76100\nC         36.45800       13.58200       -8.20800\nC         35.49700       12.93700       -9.18200\nC         36.43100       12.85400       -6.90500\nN         36.99500       16.67200      -10.46800\nC         36.58400       18.07400      -10.30500\nC         35.19300       18.24000       -9.67400\nO         34.95400       19.24000       -8.99900\nC         36.80300       18.96800      -11.56600\nC         38.28100       19.09300      -11.89100\nC         36.01900       18.46300      -12.78000\nN         34.27200       17.29100       -9.92300\nC         32.91200       17.25100       -9.37600\nC         32.54300       15.79400       -9.09900\nO         32.80100       14.92800       -9.93600\nC         31.85800       17.93100      -10.33100\nC         32.11800       19.44500      -10.55200\nC         30.39700       17.65000       -9.96100\nC         32.06900       20.37700       -9.31500\nN         31.91600       15.52900       -7.93600\nC         31.43700       14.19600       -7.58100\nC         30.01700       14.35700       -7.10700\nO         29.69000       15.41200       -6.57400\nC         32.34200       13.48200       -6.54200\nC         32.33600       14.09400       -5.16100\nC         31.46500       13.63800       -4.17300\nC         33.21900       15.12200       -4.83400\nC         31.45100       14.20400       -2.90000\nC         33.22300       15.68900       -3.55600\nC         32.34000       15.22500       -2.59100\nO         32.33100       15.79900       -1.33400\nN         29.17600       13.33200       -7.29900\nC         27.76200       13.33400       -6.89400\nC         26.99900       14.56200       -7.39600\nO         26.45400       15.34700       -6.60300\nC         27.59500       13.12700       -5.37600\nC         28.16000       11.82400       -4.87000\nO         28.18700       10.84000       -5.65400\nO         28.57000       11.77900       -3.69000\nN         27.01700       14.73500       -8.72400\nC         26.32500       15.78700       -9.47900\nC         26.86000       17.20100       -9.32800\nO         27.05900       17.84500      -10.34900\nC         24.80000       15.78100       -9.20400\nC         24.16000       14.41700       -9.22000\nO         24.59900       13.56700      -10.02200\nO         23.18200       14.21500       -8.46900\nN         27.07200       17.69100       -8.07200\nC         27.41900       19.08300       -7.77100\nC         28.51500       19.32000       -6.75200\nO         28.82600       20.48500       -6.46400\nC         26.15700       19.80600       -7.30400\nO         25.49800       19.07400       -6.27900\nN         29.08800       18.25100       -6.17600\nC         30.07900       18.42200       -5.12100\nC         31.48600       18.59300       -5.59300\nO         31.98600       17.79600       -6.38500\nC         29.98300       17.33100       -4.07200\nC         28.66100       17.27100       -3.38100\nO         28.42900       17.96300       -2.38900\nN         27.76500       16.45600       -3.90600\nN         32.13900       19.62500       -5.06900\nC         33.50500       19.96400       -5.38900\nC         34.44500       19.37200       -4.35400\nO         34.34800       19.74600       -3.17500\nC         33.68200       21.47900       -5.35400\nC         33.73900       22.17300       -6.68900\nC         34.06900       23.63900       -6.50600\nN         33.26800       24.27200       -5.45700\nC         32.00900       24.68900       -5.59100\nN         31.37500       25.24200       -4.56600\nN         31.37400       24.55300       -6.75100\nN         35.42200       18.52700       -4.75700\nC         36.41400       18.05500       -3.78300\nC         37.26000       19.23100       -3.29500\nO         37.29500       20.26600       -3.95600\nC         37.27700       17.08800       -4.60600\nC         36.43500       16.72200       -5.77900\nC         35.69300       17.96600       -6.09600\nN         37.92000       19.08100       -2.13500\nC         38.79300       20.12200       -1.58400\nC         39.95400       20.39400       -2.54300\nO         40.53800       19.45300       -3.08800\nC         39.31200       19.73400       -0.19600\nO         39.52100       18.33800       -0.02500\nN         40.22400       21.66800       -2.79200\nC         41.28500       22.07100       -3.70500\nC         40.81500       22.37200       -5.11000\nO         41.62700       22.75300       -5.95400\nN         39.51100       22.18900       -5.37300\nC         38.89000       22.44900       -6.66400\nC         38.25700       23.85200       -6.64400\nO         37.45400       24.13000       -5.75200\nC         37.90100       21.30900       -7.09800\nC         38.61200       19.93000       -7.17500\nC         37.18600       21.63200       -8.41900\nC         39.94800       19.83400       -8.13300\nN         38.61000       24.74100       -7.61000\nC         38.03500       26.10100       -7.61700\nC         36.51900       26.18400       -7.71400\nO         35.90000       25.35600       -8.38100\nC         38.68200       26.75300       -8.84200\nC         39.90500       25.95000       -9.10200\nC         39.56500       24.56200       -8.72300\nN         35.94100       27.25700       -7.11500\nC         34.50000       27.57700       -7.06900\nC         33.85800       27.73200       -8.45600\nO         32.62900       27.66600       -8.56700\nC         34.22700       28.85100       -6.23700\nC         35.01500       28.95000       -4.94200\nC         34.98700       30.31700       -4.28300\nO         36.03200       31.00600       -4.29900\nO         33.94300       30.66600       -3.68400\nN         34.69300       27.95400       -9.49900\nC         34.31600       28.09300      -10.92500\nC         33.59400       26.85900      -11.42000\nO         32.71900       26.96700      -12.27800\nC         35.56000       28.27300      -11.80500\nC         36.34800       29.53600      -11.54100\nC         37.32500       29.84000      -12.67500\nN         38.27800       28.76000      -12.97100\nC         39.37700       28.51100      -12.26600\nN         40.19600       27.53500      -12.62700\nN         39.67000       29.24200      -11.19700\nN         34.00300       25.68100      -10.90200\nC         33.46400       24.38400      -11.26400\nC         32.23200       24.12700      -10.46300\nO         32.25500       24.23400       -9.24500\nC         34.50100       23.26300      -11.03800\nC         35.71700       23.38700      -11.92600\nC         36.82200       24.13200      -11.52200\nC         35.74800       22.78700      -13.17600\nC         37.92900       24.27800      -12.35800\nC         36.86000       22.92900      -14.00300\nC         37.94400       23.66500      -13.58500\nN         31.13800       23.82300      -11.14900\nC         29.86800       23.49000      -10.53800\nC         29.18500       22.49400      -11.46800\nO         29.51800       22.41200      -12.65200\nC         29.01100       24.74000      -10.33000\nO         28.61200       25.36400      -11.54200\nN         28.27300       21.72100      -10.92200\nC         27.56200       20.74500      -11.71900\nC         26.12100       20.58600      -11.33000\nO         25.69800       21.04300      -10.27000\nN         25.37100       19.92100      -12.19400\nC         23.96500       19.61600      -11.98100\nC         23.60200       18.36400      -12.75900\nO         24.24300       18.04000      -13.75300\nC         23.07200       20.79300      -12.38300\nO         23.23500       21.14400      -13.74900\nN         22.60300       17.64600      -12.27000\nC         22.09400       16.43100      -12.87900\nC         20.62600       16.32300      -12.53400\nO         20.24400       16.38600      -11.36000\nC         22.88100       15.20100      -12.41100\nC         22.41000       13.86900      -12.94500\nO         21.92000       13.75300      -14.07200\nN         22.59500       12.82200      -12.15600\nN         19.80200       16.21600      -13.58100\nC         18.34300       16.09600      -13.52800\nC         17.88200       15.47900      -14.82200\nO         18.46200       15.75800      -15.88000\nC         17.67800       17.46300      -13.32400\nO         18.11500       18.42700      -14.26700\nN         16.86900       14.62600      -14.71200\nC         16.27400       13.89900      -15.81800\nC         17.18800       12.93500      -16.54100\nO         17.48500       11.83500      -16.07700\nN         17.67200       13.39800      -17.66100\nC         18.43300       12.65000      -18.63600\nC         19.85500       13.21600      -18.81800\nO         20.68700       12.59600      -19.48800\nC         17.64600       12.80600      -19.91200\nC         18.20800       12.29500      -21.17100\nO         18.67400       11.17700      -21.25800\nN         18.09300       13.07200      -22.20900\nN         20.12000       14.42600      -18.28000\nC         21.34600       15.15600      -18.57500\nC         22.05000       15.74100      -17.36900\nO         21.44400       16.49000      -16.58400\nC         21.03200       16.24600      -19.64700\nO         20.48000       15.65400      -20.82800\nC         22.23200       17.11700      -20.01500\nN         23.38000       15.50400      -17.31200\nC         24.24600       16.11200      -16.32100\nC         25.02100       17.20800      -17.04300\nO         25.33600       17.06000      -18.22100\nC         25.20000       15.08500      -15.73900\nN         25.29800       18.31100      -16.35000\nC         26.01700       19.43200      -16.92900\nC         27.12100       19.89700      -15.99800\nO         26.87400       20.12900      -14.81500\nC         25.04700       20.59300      -17.25600\nO         23.98200       20.10500      -18.07500\nC         25.73500       21.78300      -17.94500\nN         28.32700       20.06800      -16.54900\nC         29.45800       20.63300      -15.83400\nC         29.52000       22.10400      -16.23800\nO         29.47900       22.41600      -17.42800\nC         30.75700       19.90800      -16.21600\nC         32.06500       20.48700      -15.66800\nC         32.15300       20.38900      -14.14700\nC         33.24100       19.82900      -16.31500\nN         29.60700       23.00000      -15.26200\nC         29.67400       24.43500      -15.53700\nC         30.98700       25.00300      -15.02000\nO         31.38000       24.74100      -13.88200\nC         28.40800       25.16100      -15.02100\nO         27.26700       24.55800      -15.61700\nC         28.38000       26.62700      -15.38600\nN         31.69400       25.72300      -15.88800\nC         32.94300       26.38400      -15.53700\nC         32.73300       27.87100      -15.82900\nO         32.73400       28.26700      -16.99500\nC         34.20700       25.82200      -16.25900\nC         34.25500       24.27600      -16.29600\nC         35.48100       26.43800      -15.65600\nC         35.28300       23.67300      -17.26800\nN         32.50400       28.67800      -14.78000\nC         32.33600       30.12400      -14.92100\nC         33.72900       30.75700      -14.92200\nO         34.64800       30.20300      -14.31500\nC         31.47300       30.68800      -13.79600\nO         32.09400       30.56700      -12.52700\nN         33.88000       31.87800      -15.63200\nC         35.14400       32.59500      -15.76400\nC         36.26600       31.72600      -16.29400\nO         37.34500       31.70400      -15.70400\nN         36.00200       30.98400      -17.40200\nC         36.94600       30.06100      -18.04900\nC         38.29100       30.72200      -18.41000\nO         38.31600       31.72400      -19.12900\nC         36.29100       29.33100      -19.25900\nO         35.01600       28.81400      -18.89500\nC         37.13700       28.18700      -19.77900\nN         39.39700       30.13500      -17.88400\nC         40.79100       30.54400      -18.12000\nC         41.49100       29.52200      -19.02500\nO         40.94800       28.43500      -19.25000\nC         41.58800       30.62700      -16.79500\nC         41.27100       31.83500      -15.92200\nC         40.20900       31.51400      -14.90700\nO         39.86700       30.34700      -14.68300\nN         39.62600       32.54400      -14.30800\nN         42.72000       29.85600      -19.50500\nC         43.54900       28.97200      -20.32700\nC         43.85900       27.65200      -19.61700\nO         43.90800       26.61800      -20.27400\nC         44.85000       29.66700      -20.72600\nN         44.04700       27.68700      -18.28500\nC         44.35600       26.52100      -17.45000\nC         43.20600       25.48700      -17.35300\nO         43.41900       24.39400      -16.84300\nC         44.83900       26.96400      -16.05600\nC         43.77200       27.60200      -15.17500\nC         44.15900       27.81100      -13.72600\nO         45.18500       27.24600      -13.28400\nO         43.42100       28.53900      -13.02200\nN         42.00000       25.84300      -17.83600\nC         40.80500       25.00100      -17.84900\nC         40.69700       24.22800      -19.16200\nO         39.81600       23.38300      -19.30600\nC         39.53700       25.84200      -17.58400\nC         39.50200       26.55900      -16.24500\nO         40.22300       26.12700      -15.31400\nO         38.73100       27.53000      -16.11600\nN         41.60100       24.52000      -20.12400\nC         41.69700       23.82700      -21.40900\nC         42.20100       22.41800      -21.08700\nO         43.29700       22.24900      -20.51600\nC         42.65900       24.54700      -22.35800\nC         41.98500       25.34900      -23.44900\nC         42.92200       25.74700      -24.57200\nO         43.35400       26.92000      -24.58800\nO         43.25400       24.87900      -25.41400\nN         41.34700       21.43100      -21.36900\nC         41.55800       20.02500      -21.05200\nC         40.43100       19.17700      -21.65100\nO         39.51300       19.70600      -22.29000\nC         41.55500       19.84400      -19.52800\nN         40.50700       17.85400      -21.40800\nC         39.47800       16.87600      -21.74600\nC         38.65800       16.66900      -20.46700\nO         39.22300       16.54600      -19.37400\nC         40.09500       15.54100      -22.18300\nC         40.66800       15.51600      -23.58600\nO         40.28400       16.37400      -24.40000\nO         41.43300       14.58300      -23.89300\nN         37.33600       16.67800      -20.59900\nC         36.42100       16.50700      -19.48300\nC         35.59100       15.28200      -19.71200\nO         34.99500       15.14800      -20.76900\nC         35.54200       17.75800      -19.28000\nC         36.33300       18.93800      -18.75500\nC         36.94600       19.83300      -19.62600\nC         36.52200       19.12300      -17.39100\nC         37.70800       20.89200      -19.15300\nC         37.28400       20.18200      -16.90500\nC         37.87600       21.06400      -17.78900\nO         38.63100       22.10600      -17.30500\nN         35.58800       14.36200      -18.73600\nC         34.83900       13.10600      -18.80100\nC         33.80500       13.05800      -17.69700\nO         34.14700       13.27500      -16.53300\nC         35.77400       11.88900      -18.65300\nC         36.77100       11.74500      -19.77900\nC         38.02300       12.34700      -19.71000\nC         36.47400       10.98600      -20.90600\nC         38.93900       12.23400      -20.75500\nC         37.38400       10.86100      -21.95100\nC         38.60900       11.49300      -21.87500\nO         39.50600       11.37000      -22.90100\nN         32.54900       12.75900      -18.05600\nC         31.51700       12.52400      -17.06800\nC         31.59000       11.02700      -16.74500\nO         32.10700       10.24400      -17.54800\nC         30.13500       12.93500      -17.56700\nS         29.55700       12.00900      -19.00400\nN         31.12900       10.64800      -15.55300\nC         31.14300        9.26100      -15.12600\nC         29.97900        8.98000      -14.21800\nO         29.62900        9.80000      -13.36200\nC         32.45300        8.92600      -14.41300\nO         32.47200        7.59500      -13.92900\nN         29.39400        7.79700      -14.38400\nC         28.29800        7.28600      -13.56100\nC         28.25000        5.77200      -13.71000\nO         28.56400        5.23700      -14.78300\nC         26.96100        7.91300      -13.97100\nN         27.90700        5.08100      -12.61300\nC         27.73500        3.62700      -12.58400\nC         26.22000        3.43900      -12.63400\nO         25.52000        3.68200      -11.64600\nC         28.36500        3.00500      -11.32300\nC         29.85600        2.74800      -11.37900\nC         30.35400        1.50900      -11.78000\nC         30.76200        3.73100      -10.99700\nC         31.72700        1.26400      -11.81600\nC         32.14100        3.48000      -11.02100\nC         32.61100        2.24500      -11.42600\nN         25.72400        3.13700      -13.83800\nC         24.30500        2.99900      -14.18900\nC         24.02300        1.56500      -14.65700\nO         24.91200        0.71100      -14.55600\nC         23.94800        4.00700      -15.32100\nO         24.50700        3.55900      -16.55100\nC         24.39100        5.44700      -15.03000\nN         22.80700        1.31000      -15.20600\nC         22.44500        0.00200      -15.75400\nC         23.11500       -0.29200      -17.11400\nO         23.34100       -1.46800      -17.42000\nC         20.92300       -0.22900      -15.74900\nC         20.41700       -0.79600      -14.44800\nN         20.09600        0.02600      -13.36700\nC         20.21800       -2.08700      -14.08500\nC         19.71200       -0.78800      -12.39300\nN         19.76800       -2.06800      -12.77500\nN         23.49000        0.76800      -17.89500\nC         24.22400        0.65200      -19.17200\nC         25.72500        0.36800      -18.92800\nO         26.27900        0.83400      -17.93100\nC         24.00700        1.87900      -20.09900\nC         24.73400        3.18200      -19.76900\nO         25.96700        3.25100      -19.62800\nN         23.99300        4.28700      -19.80300\nN         26.37900       -0.35500      -19.86300\nC         27.79000       -0.78100      -19.80500\nC         28.89400        0.30000      -19.69200\nO         29.96300       -0.01100      -19.13000\nC         28.11100       -1.76100      -20.93000\nO         27.89500       -1.17700      -22.20200\nN         28.63900        1.56700      -20.16500\nC         29.64600        2.63900      -20.09400\nC         29.67400        3.46300      -18.79200\nO         28.72500        4.18700      -18.48100\nC         29.60200        3.54600      -21.33200\nC         29.95100        2.87200      -22.65100\nO         30.10600        1.62000      -22.66700\nO         30.05400        3.58600      -23.66900\nN         30.81200        3.37200      -18.06700\nC         31.07600        4.07400      -16.81000\nC         31.53500        5.53000      -17.07600\nO         31.35200        6.39800      -16.22600\nC         32.03700        3.25500      -15.91000\nC         32.50400        4.04700      -14.68100\nC         31.38000        1.94500      -15.47800\nN         32.08400        5.79100      -18.25800\nC         32.54100        7.11800      -18.63900\nC         31.89200        7.55100      -19.93000\nO         31.59900        6.71500      -20.79500\nC         34.07600        7.12900      -18.83500\nC         34.87400        6.86000      -17.58600\nC         35.29100        5.56800      -17.26900\nC         35.20700        7.89600      -16.71500\nC         36.03900        5.32000      -16.11600\nC         35.91700        7.63800      -15.53800\nC         36.33700        6.35500      -15.25100\nN         31.74400        8.86300      -20.07700\nC         31.31300        9.48000      -21.32500\nC         32.49700        9.49900      -22.28500\nO         33.63100        9.23800      -21.87200\nN         32.24200        9.79800      -23.55900\nC         33.27400        9.85600      -24.59800\nC         34.30800       10.96200      -24.46700\nO         35.35700       10.90000      -25.11100\nN         34.02400       11.94300      -23.61400\nC         34.88000       13.09500      -23.36300\nC         34.56400       14.31400      -24.21400\nO         34.02800       14.20900      -25.32600\nN         34.89500       15.48900      -23.66800\nC         34.75200       16.78000      -24.33700\nC         36.05000       17.53700      -24.18300\nO         36.48700       17.81300      -23.05800\nC         33.61600       17.62200      -23.74400\nO         32.39700       16.89800      -23.79500\nC         33.45600       18.96200      -24.44500\nN         36.62400       17.94400      -25.30800\nC         37.81200       18.77800      -25.24900\nC         37.36400       20.24300      -25.13800\nO         36.63200       20.73100      -26.00000\nC         38.72200       18.55400      -26.47000\nC         40.06400       19.23300      -26.28500\nC         41.12100       18.67200      -27.18400\nC         42.45800       18.63800      -26.48800\nN         42.72600       19.90200      -25.71500\nN         37.77200       20.91500      -24.05600\nC         37.46700       22.32700      -23.85100\nC         38.60000       23.17800      -24.42100\nO         39.76000       23.00000      -24.05000\nC         37.21200       22.67500      -22.36700\nC         36.82300       24.14700      -22.06300\nC         35.48300       24.51400      -22.69900\nC         36.76900       24.41600      -20.58700\nN         38.24900       24.07700      -25.35300\nC         39.18400       24.99500      -25.98400\nC         38.76800       26.43600      -25.68300\nO         37.58400       26.74200      -25.60700\nC         39.35900       24.66200      -27.48300\nO         39.82800       23.32500      -27.62400\nC         40.35900       25.53300      -28.14800\nN         39.75800       27.30300      -25.48900\nC         39.57600       28.72100      -25.22000\nC         39.97000       29.53300      -26.46600\nO         41.08600       29.38200      -26.98500\nC         40.31000       29.14100      -23.92200\nC         40.54900       30.64400      -23.85900\nC         39.54200       28.67100      -22.69200\nN         39.02000       30.36800      -26.95700\nC         39.18300       31.26200      -28.11100\nC         40.39400       32.22400      -27.93700\nO         40.82400       32.43900      -26.79900\nC         37.87900       32.03700      -28.41600\nC         36.65000       31.20900      -28.85500\nC         35.38600       32.04200      -28.79600\nC         36.81600       30.63100      -30.25400\nN         41.04200       32.73000      -29.01700\nC         40.67400       32.62700      -30.43900\nC         41.00800       31.32300      -31.15200\nO         42.01800       30.66200      -30.85400\nC         41.40800       33.81900      -31.07000\nC         42.65900       33.92300      -30.25800\nC         42.21800       33.60900      -28.83800\nN         40.15200       30.99500      -32.13700\nC         40.32800       29.86100      -33.01600\nC         41.49800       30.11900      -33.97700\nO         41.84600       31.28000      -34.22700\nC         39.02300       29.48800      -33.72800\nC         38.42700       30.49500      -34.70100\nC         37.23700       29.87100      -35.43500\nC         36.76500       30.73600      -36.56000\nN         35.52900       30.18700      -37.17800\nN         42.13500       29.04600      -34.45600\nC         43.28500       29.14600      -35.34400\nC         43.10700       28.21000      -36.53200\nO         42.81800       27.02900      -36.34500\nC         44.55400       28.82700      -34.57000\nO         45.67900       29.51200      -35.08800\nN         43.23500       28.74800      -37.74900\nC         43.08900       27.98700      -38.98800\nC         44.34600       27.12100      -39.23700\nO         45.45900       27.57200      -38.93500\nC         42.75500       28.94800      -40.14500\nO         41.81600       29.91900      -39.66800\nC         42.15500       28.24000      -41.35200\nN         44.20400       25.87400      -39.76300\nC         45.40100       25.05200      -40.01800\nC         46.28000       25.57200      -41.15500\nO         45.76700       26.06200      -42.16500\nC         44.81200       23.69200      -40.36900\nC         43.45800       23.97600      -40.88500\nC         42.97100       25.15100      -40.13100\nN         47.61000       25.45100      -40.98700\nC         48.57900       25.79200      -42.02000\nC         49.04200       24.44600      -42.62500\nO         49.32400       23.50800      -41.87000\nC         49.74200       26.67700      -41.49600\nO         50.71400       25.89400      -40.81500\nC         49.28500       27.81100      -40.60300\nN         49.06600       24.31700      -43.96100\nC         49.50000       23.05200      -44.55200\nC         50.93100       23.14400      -45.10000\nO         51.38200       24.20700      -45.51200\nC         48.54400       22.49400      -45.63800\nC         47.01300       22.45800      -45.42000\nC         46.35400       21.62200      -46.47200\nC         46.63100       21.93000      -44.04600\nN         51.64400       22.02400      -45.05200\nC         52.97800       21.80600      -45.59200\nC         52.87900       20.43500      -46.26700\nO         52.50000       19.44600      -45.62700\nC         54.04600       21.90900      -44.50100\nO         53.90300       23.17900      -43.85800\nC         55.46400       21.76800      -45.05700\nN         53.09300       20.40500      -47.58800\nC         52.96500       19.17400      -48.36400\nC         54.28800       18.79300      -49.02900\nO         55.01200       19.66100      -49.52000\nC         51.73900       19.19000      -49.32200\nC         50.44400       19.33800      -48.52900\nC         51.85400       20.31700      -50.35400\nN         54.63200       17.50600      -48.98300\nC         55.87600       17.01800      -49.56200\nC         55.64800       15.95300      -50.61000\nO         54.86700       15.03500      -50.38300\nC         56.85600       16.50300      -48.48800\nC         57.45200       17.57800      -47.61500\nC         56.98100       17.78600      -46.31800\nC         58.48100       18.38300      -48.08200\nC         57.53900       18.78100      -45.50300\nC         59.04100       19.37800      -47.26800\nC         58.56500       19.57100      -45.98500\nN         56.34200       16.05100      -51.76600\nC         56.21000       14.99200      -52.77900\nC         57.08300       13.77800      -52.39800\nO         57.97400       13.93700      -51.55300\nC         56.71600       15.68000      -54.05400\nC         57.74400       16.65800      -53.56800\nC         57.32800       17.08000      -52.17800\nN         56.91500       12.58100      -53.02000\nC         57.82000       11.46800      -52.68500\nC         59.27200       11.76200      -53.06400\nO         59.51700       12.47400      -54.03500\nC         57.26100       10.29600      -53.49700\nC         56.52000       10.92500      -54.61100\nC         55.93100       12.17800      -54.04900\nN         60.23200       11.24900      -52.27700\nC         61.66800       11.38300      -52.54600\nC         62.03100       10.48200      -53.74400\nO         61.26000        9.58600      -54.10200\nC         62.48200       10.96300      -51.31900\nO         62.21400        9.62100      -50.93800\nN         63.20600       10.71200      -54.35000\nC         63.71800        9.90100      -55.45600\nC         64.03700        8.50400      -54.91900\nO         63.73800        7.50600      -55.57300\nC         64.97000       10.53700      -56.05800\nO         65.87200       10.94800      -55.04500\nN         64.58100        8.44700      -53.69300\nC         64.93100        7.22100      -52.96800\nC         63.74500        6.27000      -52.84700\nO         63.90400        5.06800      -53.07100\nC         65.50000        7.55400      -51.58600\nC         66.83100        8.29500      -51.60700\nC         66.78400        9.81600      -51.52300\nO         65.86800       10.43500      -52.11000\nO         67.71900       10.39000      -50.91600\nN         62.55000        6.81900      -52.54900\nC         61.30500        6.07400      -52.41100\nC         60.70800        5.67400      -53.75600\nO         60.10200        4.61000      -53.83800\nC         60.28200        6.84900      -51.58000\nC         59.34400        5.94200      -50.79900\nC         58.02200        6.53200      -50.35100\nO         57.84700        7.76900      -50.44400\nO         57.15200        5.74900      -49.90500\nN         60.83800        6.53900      -54.78900\nC         60.37400        6.26900      -56.15800\nC         61.24900        5.17700      -56.79100\nO         60.75000        4.38800      -57.59100\nC         60.39800        7.53400      -57.03100\nC         59.38000        8.61200      -56.70300\nC         59.74200        9.91700      -57.37900\nC         57.97100        8.17800      -57.06700\nN         62.53700        5.11000      -56.39400\nC         63.46800        4.06100      -56.81600\nC         63.00200        2.69000      -56.26000\nO         63.28400        1.66200      -56.88200\nC         64.90100        4.37500      -56.36500\nC         65.62800        5.37200      -57.26200\nC         66.98500        5.73800      -56.68500\nC         67.12600        7.22200      -56.44600\nN         68.20600        7.51800      -55.46900\nN         62.27200        2.68700      -55.11500\nC         61.70900        1.49200      -54.46600\nC         60.28100        1.19500      -54.98800\nO         59.59400        0.33300      -54.43200\nC         61.68000        1.66000      -52.93300\nC         63.02900        1.70300      -52.22800\nC         62.94100        1.86100      -50.72200\nO         62.07400        1.20300      -50.09800\nO         63.76000        2.62200      -50.15900\nN         59.82600        1.93000      -56.04000\nC         58.50900        1.81600      -56.71300\nC         57.28200        2.23300      -55.86000\nO         56.12900        1.91300      -56.17800\nC         58.31900        0.43300      -57.40100\nC         58.91500        0.28200      -58.79000\nO         58.32500       -0.37000      -59.66100\nN         60.09700        0.84900      -59.03500\nN         57.54100        2.99100      -54.80000\nC         56.51100        3.47600      -53.88500\nC         56.50300        4.99200      -53.93100\nO         57.43500        5.59300      -54.46600\nC         56.77600        2.96200      -52.45200\nC         56.49400        1.47700      -52.24600\nC         57.48000        0.85800      -51.26500\nC         57.18300       -0.60100      -50.99700\nN         58.20700       -1.22500      -50.11700\nN         55.44000        5.61200      -53.40400\nC         55.32700        7.06700      -53.35900\nC         54.46800        7.47100      -52.18700\nO         53.27400        7.17300      -52.18300\nC         54.73700        7.61000      -54.66200\nN         55.07600        8.09800      -51.16800\nC         54.35200        8.57000      -49.99800\nC         54.26800       10.08100      -50.05000\nO         55.29300       10.77100      -50.06600\nC         54.90500        8.00000      -48.67200\nO         54.95300        6.57400      -48.75900\nC         54.02600        8.36800      -47.47600\nN         53.03400       10.58400      -50.08900\nC         52.72200       12.00700      -50.10400\nC         52.44300       12.44000      -48.65000\nO         51.62800       11.82800      -47.95600\nC         51.52600       12.24900      -51.03100\nC         51.82500       12.42100      -52.52800\nC         52.37600       11.14900      -53.16800\nC         50.58800       12.78500      -53.26400\nN         53.19300       13.44100      -48.18200\nC         53.17500       13.92400      -46.80500\nC         52.41400       15.24000      -46.66500\nO         52.71900       16.18400      -47.36500\nC         54.62800       14.03200      -46.26100\nC         54.64800       14.45900      -44.80300\nC         55.39000       12.72600      -46.44300\nN         51.44300       15.29600      -45.73900\nC         50.67300       16.49500      -45.43200\nC         50.76900       16.78800      -43.92800\nO         50.27000       16.02400      -43.10200\nC         49.22600       16.35300      -45.89300\nS         48.25900       17.88800      -45.81600\nN         51.44900       17.87700      -43.59200\nC         51.67400       18.33000      -42.22100\nC         50.75300       19.49100      -41.84900\nO         50.78500       20.55600      -42.45300\nC         53.16100       18.66000      -42.01600\nC         54.15300       17.57600      -42.47800\nC         55.54600       18.06000      -42.31500\nC         53.97200       16.26900      -41.70200\nN         49.88800       19.23800      -40.87000\nC         48.85600       20.15400      -40.42500\nC         49.21300       20.76000      -39.08300\nO         49.34200       20.04700      -38.09100\nC         47.49300       19.42600      -40.45100\nC         47.37500       18.54200      -41.75000\nC         46.34100       20.44300      -40.33900\nC         46.51600       17.37000      -41.66500\nN         49.41700       22.08200      -39.06400\nC         49.83100       22.75700      -37.84800\nC         49.08900       24.05000      -37.58500\nO         48.32200       24.49700      -38.43000\nC         51.34200       22.97900      -37.85300\nO         51.74200       23.73000      -38.98300\nN         49.30900       24.62800      -36.39000\nC         48.74500       25.88700      -35.91600\nC         47.21600       26.00600      -35.93300\nO         46.68500       27.09400      -36.16900\nC         49.47500       27.10300      -36.53900\nC         50.91900       27.23800      -36.09200\nO         51.22200       27.43200      -34.90200\nN         51.84700       27.14200      -37.04000\nN         46.49700       24.88500      -35.66000\nC         45.04000       24.89400      -35.60000\nC         44.50900       24.73800      -34.18200\nO         45.09900       24.03900      -33.34800\nC         44.38500       23.90000      -36.57800\nC         44.72700       22.44500      -36.34200\nC         43.92700       21.65000      -35.52900\nC         45.83400       21.86600      -36.95300\nC         44.25000       20.31000      -35.30100\nC         46.15800       20.52800      -36.72100\nC         45.37600       19.75800      -35.88600\nN         43.39800       25.41700      -33.91600\nC         42.68400       25.38300      -32.64800\nC         41.21000       25.67700      -32.94500\nO         40.94200       26.66200      -33.62100\nC         43.24800       26.40000      -31.66700\nO         42.55500       26.32000      -30.43400\nN         40.23300       24.82700      -32.53800\nC         40.35900       23.58400      -31.75200\nC         40.94800       22.38600      -32.53500\nO         41.30900       22.52000      -33.70800\nC         38.94300       23.40000      -31.18700\nC         38.05600       23.95700      -32.22700\nC         38.81500       25.12200      -32.83500\nN         41.08000       21.23000      -31.87000\nC         41.72500       20.02000      -32.37700\nC         41.04800       19.23000      -33.50300\nO         41.73600       18.45400      -34.17500\nC         42.11600       19.10800      -31.22300\nO         40.97200       18.74700      -30.47000\nN         39.75000       19.43100      -33.71000\nC         38.98500       18.74800      -34.75000\nC         39.28100       19.15500      -36.18500\nO         39.02300       20.29800      -36.59500\nN         39.83700       18.19800      -36.95400\nC         40.15900       18.30600      -38.37400\nC         39.68100       17.07300      -39.13800\nO         39.63300       15.97000      -38.59200\nC         41.63100       18.69600      -38.73500\nC         41.94600       20.14100      -38.35400\nC         42.65900       17.72000      -38.14300\nN         39.31500       17.27800      -40.39500\nC         38.88000       16.24400      -41.31900\nC         39.83800       16.34200      -42.50000\nO         40.03300       17.42700      -43.05300\nC         37.37600       16.40600      -41.64400\nO         36.64300       15.72900      -40.62500\nC         36.98600       15.82600      -42.99400\nN         40.47600       15.22700      -42.84400\nC         41.44700       15.20100      -43.92800\nC         40.96700       14.32200      -45.07600\nO         40.60800       13.16100      -44.86500\nC         42.88700       14.86800      -43.44200\nC         43.89800       14.97400      -44.58300\nC         43.30300       15.78000      -42.28800\nN         40.93200       14.90500      -46.28800\nC         40.56900       14.23600      -47.52500\nC         41.67900       14.47700      -48.55100\nO         42.27400       15.55800      -48.57800\nC         39.24300       14.77700      -48.04700\nN         41.99800       13.45700      -49.35400\nC         42.99700       13.59200      -50.40600\nC         42.30400       13.49800      -51.75600\nO         41.24700       12.86600      -51.85600\nC         44.10600       12.53000      -50.29700\nC         45.11300       12.73100      -49.19000\nC         44.97100       12.37500      -47.88400\nC         46.45000       13.23700      -49.32300\nN         46.13100       12.63700      -47.19100\nC         47.05000       13.17900      -48.04500\nC         47.19400       13.76200      -50.39600\nC         48.37100       13.58100      -47.82000\nC         48.49700       14.18400      -50.16000\nC         49.07500       14.07800      -48.88900\nN         42.91200       14.11200      -52.79400\nC         42.41600       14.09400      -54.17700\nC         43.48300       13.73600      -55.21500\nO         44.58300       14.26800      -55.15900\nC         41.75800       15.43500      -54.56400\nC         40.25800       15.45600      -54.36300\nC         39.89100       16.29700      -53.17400\nC         38.40100       16.43800      -53.04700\nN         38.04100       17.69200      -52.34400\nN         43.13600       12.85000      -56.16800\nC         43.96300       12.46500      -57.31700\nC         43.36800       13.27700      -58.48400\nO         42.19900       13.07900      -58.82400\nC         43.83200       10.97300      -57.57900\nN         44.13700       14.24700      -59.02600\nC         43.69000       15.23100      -60.02900\nC         42.62400       16.09100      -59.31300\nO         42.98200       17.01700      -58.58200\nC         43.16100       14.58900      -61.34700\nC         44.15600       13.74600      -62.11100\nO         45.32900       14.09700      -62.26400\nN         43.69100       12.62700      -62.64600\nN         41.36200       15.69200      -59.42800\nC         40.22200       16.31100      -58.76200\nC         39.31200       15.27200      -58.13100\nO         38.42400       15.61000      -57.34800\nN         39.54600       13.99300      -58.47700\nC         38.83000       12.80100      -58.02100\nC         39.14400       12.52900      -56.52500\nO         40.32000       12.53200      -56.15800\nC         39.26300       11.59000      -58.89900\nO         39.17000       11.93000      -60.28300\nC         38.47500       10.31100      -58.61700\nN         38.14400       12.23200      -55.65900\nC         38.46800       11.91200      -54.25600\nC         39.11400       10.52700      -54.12200\nO         38.58500        9.55800      -54.67000\nC         37.11000       11.98200      -53.53500\nC         36.11300       12.41700      -54.55000\nC         36.69100       12.15700      -55.90300\nN         40.29400       10.45400      -53.45800\nC         41.05800        9.22000      -53.24400\nC         40.91800        8.76100      -51.79000\nO         41.07000        9.57300      -50.88300\nC         42.52800        9.29600      -53.78700\nC         43.22400        7.91700      -53.81400\nC         43.38100       10.34000      -53.07600\nC         44.36800        7.79100      -54.82300\nN         40.57600        7.48200      -51.57200\nC         40.34200        6.92700      -50.23200\nC         41.42900        5.96600      -49.79200\nO         41.83400        5.99300      -48.62800\nC         38.97700        6.21600      -50.16200\nO         38.93600        5.16200      -51.13000\nC         37.80300        7.16600      -50.35200\nN         41.84400        5.07100      -50.70600\nC         42.85500        4.04900      -50.45700\nC         44.24100        4.64500      -50.21400\nO         44.65900        5.57100      -50.92300\nC         42.91800        3.04900      -51.62100\nC         41.68200        2.17500      -51.76700\nC         41.81800        1.13300      -52.85200\nO         42.52800        1.29900      -53.85400\nN         41.09800        0.04100      -52.69600\nN         44.94000        4.07600      -49.22800\nC         46.29800        4.46100      -48.86800\nC         46.37900        5.70600      -48.02100\nO         47.47300        6.25300      -47.85400\nN         45.22300        6.15000      -47.45600\nC         45.15700        7.34200      -46.59900\nC         45.25500        6.98200      -45.10600\nO         44.43800        6.20700      -44.60200\nC         43.94500        8.28100      -46.89800\nC         43.97900        9.54000      -46.02000\nC         43.85900        8.65000      -48.37000\nN         46.23100        7.58900      -44.40300\nC         46.42300        7.40300      -42.96500\nC         46.62100        8.76400      -42.31500\nO         47.57800        9.47000      -42.61900\nC         47.59200        6.44000      -42.67300\nC         47.33900        4.99600      -43.08500\nO         46.47900        4.34300      -42.45700\nO         48.04300        4.50300      -44.00000\nN         45.66500        9.15700      -41.46700\nC         45.62900       10.44600      -40.77500\nC         45.82900       10.25500      -39.27000\nO         45.16100        9.42400      -38.65200\nC         44.33400       11.21300      -41.14700\nO         44.22800       11.28500      -42.57300\nC         44.28200       12.62000      -40.57400\nN         46.74500       11.03500      -38.68600\nC         47.07100       10.97000      -37.26400\nC         45.99600       11.63700      -36.40400\nO         45.17300       12.39500      -36.92400\nC         48.42700       11.62500      -37.00500\nO         48.31700       13.02400      -36.79900\nN         46.02000       11.35700      -35.08200\nC         45.18300       12.04200      -34.10300\nC         45.88900       13.39600      -33.86500\nO         47.11900       13.44700      -33.98400\nC         45.13500       11.27000      -32.75600\nC         44.33800        9.99200      -32.74400\nO         43.30000        9.84000      -33.40300\nN         44.79000        9.05700      -31.93500\nN         45.19200       14.49300      -33.51000\nC         45.92900       15.74100      -33.22100\nC         46.66700       15.68900      -31.88600\nO         46.27100       14.94200      -30.99000\nC         44.84500       16.82800      -33.23600\nC         43.55100       16.10900      -33.02200\nC         43.73700       14.63700      -33.28000\nN         47.75100       16.46200      -31.76400\nC         48.58700       16.54700      -30.56600\nC         48.79900       18.03200      -30.22300\nO         49.09100       18.83400      -31.11100\nC         49.88200       15.71100      -30.76200\nO         49.62300       14.34700      -30.44900\nC         51.05800       16.19800      -29.92700\nN         48.58800       18.38700      -28.94900\nC         48.71900       19.75100      -28.43800\nC         50.18300       20.15300      -28.33800\nO         50.97500       19.49700      -27.66900\nC         48.00300       19.90600      -27.08300\nC         47.46500       21.30000      -26.81400\nC         46.99600       21.42800      -25.37600\nC         46.17500       22.67100      -25.13800\nN         46.08000       22.99300      -23.68900\nN         50.52700       21.21700      -29.05800\nC         51.83900       21.83200      -29.14900\nC         51.63800       23.21900      -28.52100\nO         51.38400       24.21300      -29.22000\nC         52.23200       21.92800      -30.63300\nC         53.70000       22.23700      -30.87700\nC         54.00200       22.88300      -32.21700\nO         53.22900       22.67900      -33.18000\nO         55.03000       23.59600      -32.30200\nN         51.66300       23.23800      -27.19100\nC         51.39600       24.42700      -26.39500\nC         49.94400       24.84700      -26.51500\nO         49.05700       24.16500      -25.99800\nN         49.69200       25.93500      -27.26300\nC         48.35700       26.51700      -27.47300\nC         47.62000       26.04000      -28.71900\nO         46.43100       26.32600      -28.87300\nC         48.44800       28.04600      -27.49100\nC         48.34600       28.65600      -26.12100\nO         47.26900       28.70000      -25.50600\nN         49.47200       29.14000      -25.61100\nN         48.32100       25.36300      -29.62200\nC         47.74900       24.91100      -30.88700\nC         47.90400       23.41100      -31.04600\nO         48.58500       22.76300      -30.25500\nC         48.42000       25.63200      -32.07800\nC         48.59700       27.13600      -31.93000\nC         47.36900       27.91200      -32.33500\nC         47.56100       29.39300      -32.13100\nN         48.61000       29.96300      -33.02700\nN         47.28500       22.86900      -32.08500\nC         47.33300       21.44800      -32.39000\nC         48.04300       21.18300      -33.69300\nO         48.09400       22.03900      -34.59000\nC         45.92200       20.82700      -32.37400\nC         45.21200       20.97300      -31.05400\nC         45.33400       20.00000      -30.07000\nC         44.45700       22.11100      -30.77200\nC         44.69200       20.15200      -28.83100\nC         43.83900       22.27200      -29.52800\nC         43.95000       21.28600      -28.57000\nN         48.65700       20.00000      -33.76300\nC         49.34400       19.51700      -34.95500\nC         48.90500       18.10400      -35.30300\nO         48.64600       17.31200      -34.40700\nC         50.87400       19.67100      -34.88000\nC         51.54500       18.85100      -33.82300\nS         53.33300       19.11300      -33.82800\nC         53.77200       18.29900      -32.29000\nN         48.75700       17.80900      -36.60100\nC         48.36900       16.49200      -37.08400\nC         49.08600       16.23400      -38.40600\nO         49.66100       17.14600      -38.99600\nC         46.85600       16.41000      -37.25100\nN         49.08400       14.99200      -38.85800\nC         49.72100       14.62500      -40.11100\nC         48.83300       13.66600      -40.90900\nO         47.99800       12.95300      -40.33900\nC         51.09600       14.01200      -39.85200\nO         51.00000       12.80700      -39.11100\nN         49.00900       13.66100      -42.22500\nC         48.28600       12.74700      -43.09900\nC         49.20800       12.25600      -44.17800\nO         50.05000       13.00700      -44.67500\nC         47.04800       13.39400      -43.70400\nO         46.25300       12.38800      -44.31200\nN         49.07100       10.98000      -44.51000\nC         49.90300       10.33700      -45.51600\nC         49.04300        9.65700      -46.55700\nO         47.99800        9.08600      -46.21500\nC         50.88500        9.33900      -44.86200\nC         51.72700        9.93300      -43.74900\nC         52.94200       10.54800      -44.02400\nC         51.29400        9.89200      -42.42300\nC         53.72100       11.08500      -42.99000\nC         52.06000       10.44700      -41.40000\nC         53.27600       11.02200      -41.68300\nN         49.46200        9.75900      -47.83400\nC         48.81400        9.09000      -48.95600\nC         49.85200        8.21400      -49.63700\nO         50.73800        8.72800      -50.32900\nC         48.15200       10.08300      -49.95100\nC         47.56700        9.48300      -51.27000\nC         46.36100        8.60000      -51.01300\nC         47.24500       10.56200      -52.27500\nN         49.76600        6.88800      -49.39100\nC         50.69800        5.92200      -49.96900\nC         50.19100        5.38100      -51.30800\nO         49.07400        4.85800      -51.40600\nC         51.04000        4.78300      -48.99300\nC         52.11700        3.88600      -49.53700\nN         53.46100        4.23600      -49.46600\nC         52.00900        2.70800      -50.19700\nC         54.12000        3.24600      -50.05000\nN         53.28900        2.30900      -50.51000\nN         51.00400        5.59000      -52.35300\nC         50.73100        5.16800      -53.72200\nC         51.93900        4.43000      -54.29700\nO         53.02600        4.42900      -53.70800\nC         50.45000        6.39100      -54.63800\nC         49.59100        7.54400      -54.14900\nC         49.96600        8.81100      -54.87900\nC         48.11600        7.24400      -54.32400\nN         51.75500        3.85300      -55.49300\nC         52.83200        3.24600      -56.25700\nC         53.43900        4.42200      -57.03100\nO         52.78200        5.45800      -57.17900\nC         52.31000        2.11700      -57.16400\nO         51.39100        2.65100      -58.10700\nC         51.64000        0.98500      -56.38700\nN         54.69100        4.28200      -57.49200\nC         55.39200        5.31800      -58.25300\nC         54.66900        5.60000      -59.57900\nO         54.67300        6.73900      -60.04200\nC         56.83400        4.90200      -58.51600\nO         56.91500        3.74700      -59.33700\nN         54.01000        4.56600      -60.15100\nC         53.22600        4.63500      -61.38400\nC         51.97000        5.46600      -61.15900\nO         51.64900        6.30100      -62.00400\nC         52.85000        3.22500      -61.88700\nC         54.03400        2.36300      -62.30900\nO         54.84200        2.82400      -63.15500\nO         54.13400        1.21600      -61.82000\nN         51.27200        5.25800      -60.01700\nC         50.06700        6.00000      -59.62400\nC         50.39100        7.47600      -59.41300\nO         49.54500        8.32200      -59.70700\nC         49.45700        5.42500      -58.35000\nC         48.63800        4.16600      -58.55300\nC         48.37700        3.43900      -57.25000\nO         48.45600        4.01100      -56.16200\nN         48.05100        2.14600      -57.32800\nN         51.61400        7.78100      -58.90200\nC         52.11700        9.13800      -58.67900\nC         52.30300        9.82200      -60.02600\nO         51.72500       10.87800      -60.25300\nC         53.42900        9.10600      -57.86000\nC         54.32400       10.31800      -57.95500\nC         55.58800       10.34900      -58.46000\nC         54.07300       11.62800      -57.42600\nN         56.13600       11.60100      -58.29500\nC         55.22100       12.41100      -57.68000\nC         52.98400       12.22500      -56.77000\nC         55.31000       13.76100      -57.30600\nC         53.06100       13.56600      -56.42800\nC         54.21400       14.31900      -56.69100\nN         53.04700        9.17200      -60.93200\nC         53.36100        9.64000      -62.28000\nC         52.15100        9.82700      -63.20300\nO         52.11300       10.82400      -63.93100\nC         54.42100        8.74300      -62.91400\nC         55.80100        8.95800      -62.31200\nC         56.75500        7.85800      -62.70800\nN         58.04600        8.00900      -62.03300\nC         58.72800        7.01100      -61.47800\nN         58.25000        5.76800      -61.51300\nN         59.89400        7.24400      -60.88900\nN         51.16500        8.90200      -63.15900\nC         49.95000        8.94400      -63.99100\nC         49.02600       10.16900      -63.82000\nO         48.43800       10.62700      -64.80900\nC         49.14700        7.64800      -63.90200\nO         49.24500        6.93200      -62.68300\nN         48.88000       10.67400      -62.58000\nC         48.01300       11.81300      -62.28900\nC         48.71400       13.14700      -62.46800\nO         49.93600       13.22400      -62.35900\nC         47.39000       11.69700      -60.89500\nC         46.55200       10.48300      -60.70700\nN         47.12600        9.24200      -60.54000\nC         45.20600       10.35800      -60.66800\nC         46.11800        8.40100      -60.39700\nN         44.94200        9.03000      -60.46100\nN         47.92300       14.19900      -62.75300\nC         48.37500       15.57800      -62.98300\nC         48.67300       16.31600      -61.67000\nO         49.64000       17.07200      -61.58800\nC         47.34100       16.35600      -63.83200\nC         47.17800       15.82000      -65.24200\nO         48.15100       15.46200      -65.92600\nN         45.93800       15.77300      -65.72000\nN         47.81700       16.11100      -60.66500\nC         47.95100       16.69700      -59.34000\nC         47.40600       15.77200      -58.24300\nO         46.77100       14.75500      -58.52300\nC         47.25800       18.06000      -59.27900\nO         45.85100       17.94200      -59.13700\nN         47.69900       16.13200      -56.99600\nC         47.23700       15.49000      -55.76600\nC         46.98200       16.59900      -54.76900\nO         47.75200       17.55800      -54.72000\nC         48.25700       14.49000      -55.22100\nC         48.43300       13.26100      -56.07200\nC         47.58200       12.16800      -55.93100\nC         49.46800       13.18000      -56.99400\nC         47.74400       11.03400      -56.71900\nC         49.63300       12.04500      -57.77900\nC         48.77800       10.97300      -57.62800\nN         45.89900       16.49800      -54.00600\nC         45.51100       17.55200      -53.08600\nC         45.23300       17.02800      -51.70200\nO         44.53200       16.03400      -51.54400\nC         44.31300       18.34400      -53.68300\nO         44.58000       18.65400      -55.05300\nC         43.97300       19.62300      -52.91600\nN         45.79100       17.70400      -50.68800\nC         45.52500       17.43400      -49.28500\nC         44.52400       18.50300      -48.88400\nO         44.84000       19.69800      -48.91200\nC         46.79500       17.50700      -48.44100\nS         46.50300       17.31100      -46.66000\nN         43.30200       18.08100      -48.54400\nC         42.23000       18.98600      -48.14200\nC         41.88600       18.77100      -46.67200\nO         41.51900       17.66000      -46.27200\nC         41.01500       18.82000      -49.06400\nC         39.86100       19.75200      -48.76000\nC         38.65800       19.38000      -49.57600\nO         37.96600       18.39200      -49.30000\nN         38.39500       20.15600      -50.60800\nN         42.03400       19.84600      -45.86700\nC         41.78500       19.81800      -44.43700\nC         40.57200       20.67000      -44.07600\nO         40.58900       21.87800      -44.31200\nC         43.05400       20.18900      -43.60900\nC         42.77500       20.13400      -42.11200\nC         44.22600       19.27600      -43.95800\nN         39.54100       20.03700      -43.47000\nC         38.31800       20.70100      -43.01400\nC         38.42300       20.94900      -41.50200\nO         38.60500       20.00900      -40.72700\nC         37.06100       19.91300      -43.44000\nO         37.16300       19.58900      -44.82300\nC         35.77100       20.68600      -43.19600\nN         38.34400       22.22300      -41.10000\nC         38.47400       22.66600      -39.71600\nC         37.47900       23.79600      -39.44000\nO         37.64000       24.90200      -39.96600\nC         39.92400       23.12900      -39.44900\nC         40.14600       23.73000      -38.10000\nN         40.23400       25.09700      -37.93100\nC         40.30000       23.12500      -36.90100\nC         40.41900       25.28200      -36.63900\nN         40.46900       24.12200      -35.97800\nN         36.46500       23.51500      -38.58700\nC         35.40000       24.45400      -38.19200\nC         34.56500       24.89400      -39.40900\nO         34.20600       26.07000      -39.52500\nC         35.95100       25.67000      -37.39700\nC         36.64900       25.32600      -36.09400\nC         35.80000       24.55800      -35.09900\nO         34.86300       25.16500      -34.53500\nO         36.05100       23.34300      -34.91700\nN         34.29400       23.93900      -40.30400\nC         33.53300       24.16000      -41.53300\nC         34.28900       24.83700      -42.66900\nO         33.69600       25.14600      -43.70600\nN         35.60300       25.07600      -42.49100\nC         36.44000       25.72300      -43.49900\nC         37.44100       24.74900      -44.10500\nO         38.02500       23.95800      -43.36600\nC         37.19400       26.91900      -42.88200\nC         36.31200       28.02200      -42.33400\nO         35.25800       28.31000      -42.96000\nO         36.69100       28.62900      -41.30100\nN         37.65600       24.81400      -45.44000\nC         38.64700       23.96300      -46.09600\nC         39.92900       24.72200      -46.42000\nO         39.90500       25.92800      -46.68800\nC         38.09500       23.13200      -47.27200\nO         37.62800       23.98500      -48.31700\nC         37.02200       22.14300      -46.85600\nN         41.05900       24.00900      -46.30300\nC         42.41500       24.45600      -46.60600\nC         42.98700       23.37000      -47.52600\nO         42.76700       22.18200      -47.28400\nC         43.29500       24.69300      -45.34700\nC         44.63700       25.32300      -45.71800\nC         42.58100       25.57200      -44.33600\nN         43.66900       23.78600      -48.61000\nC         44.24800       22.89100      -49.61500\nC         45.65500       23.29900      -49.98800\nO         45.98500       24.48200      -50.00300\nC         43.41900       22.91000      -50.92300\nC         41.97000       22.48100      -50.81300\nC         41.36100       22.00800      -52.11700\nO         41.87400       22.36800      -53.20500\nO         40.40800       21.20100      -52.04500\nN         46.46000       22.30700      -50.34900\nC         47.79600       22.43000      -50.92300\nC         47.90700       21.28800      -51.90400\nO         47.44000       20.17900      -51.62000\nC         48.92800       22.40400      -49.88800\nC         49.04200       23.66600      -49.06200\nC         50.24100       24.49500      -49.39700\nC         50.43900       25.54900      -48.34900\nN         51.82600       26.05400      -48.36700\nN         48.44900       21.56800      -53.08800\nC         48.57800       20.55500      -54.11000\nC         50.02900       20.23900      -54.46400\nO         50.94500       21.00600      -54.14500\nC         47.73200       20.90700      -55.32900\nO         46.34700       20.78000      -55.03900\nN         50.22500       19.04700      -55.04400\nC         51.50000       18.51000      -55.48700\nC         51.34000       18.06800      -56.93100\nO         50.32600       17.45600      -57.27300\nC         51.91800       17.30100      -54.62400\nC         52.45400       17.56600      -53.22600\nC         52.47900       16.29400      -52.43500\nC         53.84300       18.19200      -53.25500\nN         52.33900       18.37000      -57.77100\nC         52.30500       18.00900      -59.18000\nC         53.51900       17.18200      -59.58900\nO         54.64800       17.66500      -59.49100\nC         52.15000       19.24800      -60.05800\nO         50.95200       19.95000      -59.77200\nN         53.27600       15.92000      -60.02000\nC         54.38100       15.05000      -60.46500\nC         55.27400       15.65400      -61.55600\nO         56.49600       15.48400      -61.50400\nC         53.65400       13.79500      -60.95300\nC         52.36300       13.82000      -60.24400\nC         51.97500       15.23400      -60.15600\nN         54.67300       16.41300      -62.50600\nC         55.39500       17.07600      -63.60300\nC         56.29100       18.26400      -63.15000\nO         56.91800       18.92100      -63.98400\nC         54.41900       17.49700      -64.69600\nN         56.37900       18.48100      -61.81600\nC         57.17600       19.47500      -61.08600\nC         56.62600       20.88800      -61.16500\nO         55.71200       21.21700      -60.41200\nC         58.68300       19.38600      -61.41400\nC         59.28500       18.04400      -61.02500\nC         60.75100       17.79500      -61.33400\nO         61.55300       18.75700      -61.29900\nO         61.10600       16.61300      -61.54200\nN         52.31700       11.32900        2.36500\nC         51.80000       11.76800        1.06800\nC         51.13800       10.60800        0.31800\nO         51.78500        9.61100       -0.03200\nC         52.90100       12.41200        0.21000\nC         53.44600       13.71800        0.75900\nC         54.82400       14.12900        0.26300\nO         55.60300       13.25800       -0.19600\nO         55.13500       15.33900        0.35500\nN         49.83100       10.74600        0.10600\nC         48.97100        9.78300       -0.58100\nC         49.43800        9.59700       -2.05700\nO         49.74100       10.57400       -2.74400\nC         47.49400       10.21800       -0.37700\nC         46.53000        9.41100       -1.22000\nC         47.12100       10.11100        1.09500\nN         49.58100        8.33200       -2.49300\nC         50.12200        7.99300       -3.80800\nC         49.74400        6.58300       -4.26500\nO         49.48800        5.69500       -3.44300\nC         51.66100        8.11200       -3.75100\nC         52.35500        8.36800       -5.07700\nC         53.84800        8.54300       -4.92600\nO         54.48200        9.26300       -5.70300\nN         54.46100        7.87500       -3.95400\nN         49.71700        6.39700       -5.59700\nC         49.45100        5.13700       -6.30300\nC         50.44100        5.05100       -7.45400\nO         50.61700        6.03000       -8.19100\nC         48.00200        5.05700       -6.85400\nC         46.86800        5.05900       -5.85900\nC         45.53800        5.16200       -6.57700\nC         46.87600        3.83300       -4.97400\nN         51.13900        3.90900       -7.57300\nC         52.15300        3.70500       -8.60700\nC         51.94800        2.38100       -9.34500\nO         52.17700        1.31700       -8.77400\nC         53.60700        3.82500       -8.03000\nC         54.66600        3.60200       -9.11900\nC         53.84000        5.18200       -7.33000\nN         51.54800        2.45300      -10.62200\nC         51.35800        1.27300      -11.47600\nC         52.66400        0.82700      -12.07800\nO         53.52600        1.65300      -12.40400\nC         50.41900        1.58300      -12.66900\nC         49.02400        2.07700      -12.26500\nC         48.91500        3.58400      -12.07500\nO         49.95500        4.29300      -12.10800\nO         47.76100        4.05200      -11.93400\nN         52.79200       -0.49400      -12.26600\nC         53.96100       -1.11500      -12.89600\nC         53.56400       -2.43100      -13.59100\nO         52.46500       -2.93300      -13.38100\nC         55.09300       -1.32200      -11.88700\nO         54.63000       -1.95200      -10.70600\nN         54.43300       -2.94000      -14.44800\nC         54.17500       -4.19400      -15.13300\nC         53.80000       -4.07400      -16.58400\nO         53.69400       -5.08900      -17.27100\nN         53.59500       -2.84600      -17.03800\nC         53.27600       -2.57300      -18.42800\nC         54.46800       -2.84800      -19.32300\nO         55.62600       -2.68400      -18.91400\nN         54.17000       -3.28400      -20.53500\nC         55.17400       -3.58900      -21.53600\nC         54.54000       -3.97200      -22.84300\nO         53.32000       -3.89500      -23.00200\nN         55.37900       -4.37100      -23.78000\nC         55.00400       -4.85000      -25.09100\nC         54.73200       -6.33500      -24.93100\nO         55.52100       -7.03900      -24.31300\nC         56.15000       -4.58900      -26.09800\nC         56.06000       -5.24300      -27.49200\nC         54.85400       -4.75000      -28.27300\nC         57.31000       -4.98200      -28.29400\nN         53.60200       -6.80600      -25.46600\nC         53.19000       -8.20400      -25.37300\nC         52.48800       -8.63700      -26.67500\nO         51.92900       -7.80200      -27.38800\nC         52.37000       -8.46700      -24.06700\nC         51.03300       -7.73100      -24.06500\nC         52.19300       -9.95700      -23.77600\nN         52.56300       -9.93100      -27.00300\nC         51.97400      -10.51100      -28.20800\nC         50.50700      -10.85600      -28.01100\nO         50.12500      -11.21300      -26.89500\nC         52.74100      -11.78700      -28.60200\nC         54.26400      -11.64000      -28.63800\nC         54.84900      -11.50900      -30.02200\nO         54.17800      -11.68200      -31.04500\nN         56.14600      -11.23400      -30.08100\nN         49.65500      -10.80300      -29.06200\nC         48.26100      -11.24300      -28.88000\nC         48.15700      -12.70100      -28.40300\nO         48.94500      -13.54900      -28.83300\nC         47.63700      -11.03600      -30.25700\nC         48.52100      -10.02500      -30.92200\nC         49.89300      -10.39100      -30.46100\nN         47.24100      -12.94500      -27.45500\nC         47.04400      -14.23900      -26.81600\nC         47.94800      -14.40000      -25.61300\nO         47.77800      -15.34000      -24.83700\nN         48.90100      -13.48000      -25.45100\nC         49.83200      -13.47900      -24.33000\nC         49.22500      -12.97100      -23.03300\nO         48.07000      -12.53200      -22.99900\nN         50.02300      -13.00400      -21.96100\nC         49.57700      -12.55500      -20.65000\nC         50.53800      -11.55400      -19.97800\nO         51.73500      -11.54500      -20.25000\nC         49.27200      -13.75200      -19.74500\nO         50.41700      -14.24400      -19.06700\nN         49.98300      -10.71300      -19.10000\nC         50.71800       -9.70000      -18.34700\nC         50.02100       -9.48500      -17.01400\nO         48.79400       -9.44800      -16.97200\nC         50.69000       -8.35200      -19.10900\nC         51.95100       -7.78000      -19.74400\nC         51.75800       -6.29500      -20.04000\nC         53.17500       -7.96100      -18.86100\nN         50.79400       -9.29700      -15.94200\nC         50.23300       -8.95500      -14.64700\nC         50.68500       -7.54600      -14.28900\nO         51.88700       -7.26900      -14.27500\nC         50.59200       -9.96300      -13.52900\nC         49.84700       -9.65500      -12.21900\nC         50.15700      -10.61800      -11.10400\nN         51.55400      -10.52900      -10.70300\nC         51.95500      -10.67000       -9.45500\nN         51.08300      -10.99300       -8.50300\nN         53.22700      -10.47700       -9.13600\nN         49.70400       -6.66300      -14.00800\nC         49.93800       -5.27600      -13.60100\nC         49.84500       -5.17900      -12.10200\nO         49.00100       -5.82900      -11.49200\nC         48.90400       -4.31300      -14.21800\nC         48.77700       -4.29300      -15.72700\nC         47.76600       -3.27200      -16.14000\nC         50.13600       -4.04000      -16.41800\nN         50.69400       -4.33700      -11.51400\nC         50.70500       -4.08600      -10.08300\nC         50.47800       -2.60800       -9.83100\nO         50.76500       -1.77500      -10.68300\nC         52.03100       -4.52600       -9.48000\nO         52.21100       -5.92200       -9.66700\nN         49.94600       -2.29200       -8.66500\nC         49.70500       -0.93300       -8.25400\nC         50.07200       -0.81500       -6.77800\nO         49.40500       -1.40100       -5.92100\nC         48.25900       -0.52700       -8.51800\nS         47.84100        1.10100       -7.86500\nN         51.14500       -0.08000       -6.49000\nC         51.61600        0.10500       -5.12800\nC         50.98100        1.33400       -4.49300\nO         51.14900        2.44700       -4.99500\nC         53.14000        0.20900       -5.10900\nN         50.24300        1.11800       -3.38800\nC         49.60200        2.17300       -2.61600\nC         50.49600        2.59000       -1.43800\nO         51.14500        1.73700       -0.81400\nC         48.26400        1.69700       -2.09200\nN         50.52400        3.90600       -1.14300\nC         51.27900        4.47000       -0.02400\nC         50.62900        5.75400        0.52300\nO         49.89800        6.43200       -0.20500\nC         52.74300        4.70400       -0.40500\nO         52.88500        5.56400       -1.52200\nN         50.88900        6.04700        1.80000\nC         50.39500        7.23700        2.48400\nC         49.00500        7.12700        3.07100\nO         48.50300        8.10100        3.64300\nN         48.36800        5.94900        2.93700\nC         47.00300        5.72500        3.41700\nC         46.75000        4.24000        3.67800\nO         47.52200        3.38100        3.22900\nC         45.95300        6.31000        2.42600\nC         45.78900        5.55100        1.12600\nC         44.75200        4.64400        0.95900\nC         46.68500        5.72700        0.07800\nC         44.60200        3.94400       -0.23400\nC         46.53800        5.02000       -1.11200\nC         45.49200        4.14200       -1.26400\nN         45.65500        3.94300        4.38800\nC         45.27700        2.58000        4.71800\nC         44.58900        1.96800        3.51400\nO         43.38000        2.11800        3.34200\nC         44.47800        2.54000        6.03100\nO         45.18800        3.29600        7.02400\nC         44.22800        1.11700        6.52300\nN         45.38600        1.28800        2.67500\nC         44.95100        0.63400        1.44100\nC         43.78500       -0.33100        1.63700\nO         42.92000       -0.39900        0.77300\nC         46.15500       -0.03100        0.72900\nC         45.84600       -0.92700       -0.45300\nC         45.50700       -0.38600       -1.68500\nC         45.91400       -2.30800       -0.33500\nC         45.24000       -1.20800       -2.77500\nC         45.64900       -3.12800       -1.42400\nC         45.31100       -2.57300       -2.63800\nN         43.75800       -1.06100        2.76500\nC         42.70800       -2.03700        3.09700\nC         41.30000       -1.45500        3.29400\nO         40.32200       -2.18400        3.13800\nC         43.11400       -2.88400        4.30000\nO         43.53000       -2.09400        5.40200\nN         41.18600       -0.16800        3.65400\nC         39.87300        0.44500        3.87000\nC         39.18000        0.96300        2.59300\nO         38.01600        1.39000        2.64900\nC         39.95100        1.53500        4.93500\nO         40.88400        2.53400        4.58800\nN         39.87000        0.89800        1.44000\nC         39.30800        1.42800        0.20000\nC         39.08900        0.45900       -0.94200\nO         39.93900       -0.39400       -1.22600\nC         40.12900        2.61500       -0.29300\nC         40.27300        3.73200        0.71700\nC         41.36400        3.77800        1.58300\nC         39.38100        4.79700        0.73500\nC         41.52500        4.82400        2.49000\nC         39.52700        5.84700        1.64000\nC         40.60300        5.85600        2.51600\nO         40.75500        6.89700        3.40300\nN         37.96000        0.64500       -1.64000\nC         37.64400       -0.08900       -2.85200\nC         38.51800        0.52000       -3.95700\nO         38.89700        1.70000       -3.87900\nC         36.17400        0.06000       -3.19500\nN         38.90400       -0.30800       -4.94000\nC         39.78800        0.10400       -6.02400\nC         39.23800       -0.28000       -7.39100\nO         38.49700       -1.26000       -7.51500\nC         41.18400       -0.51700       -5.82800\nC         41.88300       -0.07200       -4.55600\nS         42.59100        1.57300       -4.72000\nC         43.01800        1.88000       -3.09900\nN         39.60400        0.51700       -8.41600\nC         39.27800        0.27000       -9.81700\nC         40.47200        0.41400      -10.70600\nO         41.39800        1.17100      -10.39700\nC         38.19300        1.20300      -10.34400\nO         36.88400        0.78300       -9.99800\nN         40.43700       -0.33500      -11.83200\nC         41.36800       -0.20800      -12.93100\nC         40.57900        0.49900      -14.03300\nO         39.40800        0.18900      -14.26200\nC         41.95300       -1.55000      -13.40100\nC         43.02800       -2.10400      -12.50900\nC         42.87400       -3.06200      -11.55500\nC         44.43100       -1.78700      -12.53200\nN         44.08500       -3.37200      -10.98900\nC         45.05800       -2.59200      -11.55500\nC         45.22700       -0.90800      -13.29200\nC         46.44400       -2.54300      -11.31100\nC         46.59100       -0.84800      -13.03600\nC         47.18400       -1.64700      -12.04600\nN         41.19000        1.52200      -14.63000\nC         40.61300        2.33300      -15.70100\nC         41.67400        2.38800      -16.79500\nO         42.85000        2.60900      -16.49900\nC         40.16300        3.74500      -15.18700\nC         39.69900        4.66000      -16.33100\nC         39.07400        3.63100      -14.12200\nN         41.28400        2.12300      -18.04400\nC         42.25600        2.16500      -19.13200\nC         41.95400        3.26500      -20.14100\nO         40.84200        3.78400      -20.17100\nC         42.45400        0.79800      -19.78700\nC         41.32500        0.38100      -20.70200\nC         41.53400       -1.04000      -21.13000\nN         40.40600       -1.52500      -21.91600\nC         40.33400       -2.73800      -22.43800\nN         39.28400       -3.08700      -23.16500\nN         41.30700       -3.61500      -22.23500\nN         42.95800        3.65000      -20.92600\nC         42.80800        4.69600      -21.92500\nC         43.67500        4.39200      -23.14100\nO         44.90500        4.45700      -23.06100\nC         43.15400        6.07000      -21.31700\nC         42.77800        7.25000      -22.20600\nC         42.93400        8.56800      -21.51300\nO         43.86200        8.79100      -20.73800\nN         42.02600        9.48000      -21.79000\nN         43.03100        4.02500      -24.25800\nC         43.72200        3.76000      -25.51200\nC         44.34000        5.08000      -26.01900\nO         43.75600        6.14600      -25.78200\nC         42.74500        3.20700      -26.54900\nN         45.52200        5.03400      -26.69100\nC         46.14300        6.28000      -27.18900\nC         45.26500        7.12600      -28.11300\nO         44.88600        6.70400      -29.20700\nC         47.38600        5.80000      -27.94500\nC         47.67100        4.46300      -27.39300\nC         46.35300        3.85700      -27.01200\nN         45.00500        8.33300      -27.66500\nC         44.18600        9.31800      -28.36700\nC         42.69900        9.18600      -28.08600\nO         41.89100        9.99900      -28.55500\nN         42.34000        8.17300      -27.27500\nC         40.97200        7.81900      -26.92100\nC         40.54600        8.17200      -25.49100\nO         41.25000        8.87000      -24.77500\nC         40.68400        6.35900      -27.31100\nC         40.89200        6.11100      -28.80800\nC         40.40200        4.74200      -29.23800\nC         41.05000        4.29700      -30.53000\nN         41.08400        2.81200      -30.67200\nN         39.36300        7.73500      -25.10900\nC         38.78700        8.03900      -23.80900\nC         38.98000        7.00500      -22.72900\nO         39.52500        5.92500      -22.97200\nN         38.48300        7.34300      -21.52600\nC         38.53400        6.51300      -20.32500\nC         37.56000        5.32800      -20.37400\nO         36.37900        5.49500      -20.71100\nC         38.26300        7.37000      -19.08700\nC         39.22000        8.51900      -18.80900\nC         38.72900        9.31000      -17.64500\nC         40.66500        8.02900      -18.57500\nN         38.05600        4.13300      -20.02300\nC         37.23400        2.92600      -20.01000\nC         37.43600        2.20200      -18.70500\nO         38.55600        1.75600      -18.41400\nC         37.57900        2.01300      -21.20700\nC         36.67300        0.78900      -21.31900\nC         37.03700       -0.27000      -22.34200\nO         38.16800       -0.24100      -22.87800\nO         36.19900       -1.16600      -22.57400\nN         36.36200        2.09700      -17.89700\nC         36.42200        1.37100      -16.62700\nC         36.65200       -0.09900      -16.95800\nO         36.05800       -0.61600      -17.91500\nC         35.14800        1.58800      -15.80400\nC         35.05800        0.72300      -14.59100\nC         35.68200        0.91800      -13.39800\nC         34.35500       -0.51900      -14.48300\nN         35.40400       -0.12500      -12.54500\nC         34.60700       -1.03200      -13.19200\nC         33.54900       -1.26500      -15.36600\nC         34.07200       -2.24400      -12.75100\nC         33.02100       -2.46900      -14.92800\nC         33.28100       -2.94700      -13.63500\nN         37.57500       -0.74100      -16.22900\nC         37.99000       -2.11900      -16.50500\nC         37.45000       -3.09600      -15.45300\nO         36.76100       -4.06900      -15.77700\nC         39.55500       -2.19200      -16.64300\nC         40.08600       -3.63100      -16.63400\nC         40.04400       -1.44200      -17.87200\nN         37.82100       -2.85800      -14.20100\nC         37.50400       -3.75000      -13.10900\nC         37.42300       -2.99200      -11.79900\nO         38.02500       -1.93300      -11.67000\nC         38.55800       -4.85500      -13.02100\nO         38.18700       -5.86400      -12.10000\nN         36.65600       -3.54500      -10.84400\nC         36.41600       -3.02900       -9.50000\nC         36.66600       -4.13500       -8.48200\nO         36.23600       -5.27200       -8.67500\nC         34.95200       -2.55900       -9.39200\nC         34.53800       -1.99100       -8.04900\nC         34.38300       -0.62300       -7.87300\nC         34.21900       -2.82600       -6.97600\nC         33.97400       -0.09700       -6.65200\nC         33.83500       -2.30700       -5.74300\nC         33.69200       -0.94100       -5.59700\nO         33.27300       -0.41600       -4.41200\nN         37.31200       -3.78400       -7.37500\nC         37.55100       -4.69300       -6.26200\nC         37.16100       -4.01600       -4.94900\nO         37.53100       -2.85900       -4.72800\nC         38.97100       -5.33300       -6.24000\nC         38.99600       -6.58700       -5.32600\nC         40.06500       -4.32300       -5.86900\nC         40.24000       -7.41400       -5.31800\nN         36.42100       -4.75700       -4.08000\nC         35.99800       -4.34600       -2.72900\nC         37.22700       -4.11800       -1.86300\nO         38.31100       -4.61200       -2.18300\nC         35.17300       -5.45200       -2.07700\nO         33.86100       -5.52700       -2.60200\nN         37.05400       -3.42400       -0.73700\nC         38.14300       -3.14300        0.20200\nC         38.84900       -4.41000        0.74800\nO         40.03500       -4.36000        1.07000\nC         37.63300       -2.24300        1.34500\nC         36.52700       -2.80000        2.24800\nO         35.94000       -3.85500        1.90500\nO         36.22700       -2.15900        3.27900\nN         38.11700       -5.54000        0.80600\nC         38.57500       -6.83400        1.31700\nC         38.82100       -7.89100        0.22700\nO         39.34100       -8.97200        0.52600\nC         37.58500       -7.36600        2.37300\nC         36.14500       -7.54700        1.90900\nO         35.84900       -7.24200        0.73800\nO         35.31600       -7.98300        2.72500\nN         38.40800       -7.58600       -1.00000\nC         38.56700       -8.47900       -2.14000\nC         37.41200       -9.42900       -2.37800\nO         37.47500      -10.24800       -3.29900\nN         36.35200       -9.32700       -1.55700\nC         35.15400      -10.16600       -1.62200\nC         34.39300      -10.00700       -2.94100\nO         33.96300      -11.01000       -3.52100\nC         34.23400       -9.86200       -0.44500\nO         32.96200      -10.46400       -0.61700\nN         34.21500       -8.75000       -3.40200\nC         33.48700       -8.45800       -4.63600\nC         34.39300       -7.90000       -5.70800\nO         35.18000       -6.98000       -5.46800\nC         32.25700       -7.56800       -4.39400\nC         31.30300       -8.05800       -3.29800\nC         30.61600       -6.90200       -2.61200\nC         30.33700       -9.11400       -3.82100\nN         34.30000       -8.52500       -6.89300\nC         35.09400       -8.26700       -8.08400\nC         34.15500       -8.08100       -9.28400\nO         33.31900       -8.93900       -9.55400\nC         36.06000       -9.44500       -8.33600\nC         36.99300       -9.78900       -7.17500\nC         37.93200      -10.92200       -7.55000\nC         38.92600      -11.25900       -6.46400\nN         39.93200      -12.25300       -6.94200\nN         34.28900       -6.95500       -9.99200\nC         33.47200       -6.64600      -11.16600\nC         34.34400       -6.37500      -12.35600\nO         35.47000       -5.89800      -12.21400\nC         32.54600       -5.46200      -10.90800\nC         31.69800       -5.62600       -9.66800\nC         32.13200       -5.14300       -8.43700\nC         30.45900       -6.24800       -9.72300\nC         31.35000       -5.27700       -7.29300\nC         29.67300       -6.39500       -8.58700\nC         30.11900       -5.90100       -7.37400\nO         29.34200       -6.02900       -6.25300\nN         33.84200       -6.72400      -13.54200\nC         34.58000       -6.59500      -14.78100\nC         33.71200       -6.00000      -15.85000\nO         32.50100       -6.19700      -15.84600\nC         35.10600       -7.97400      -15.24000\nC         35.97500       -8.66700      -14.20700\nC         35.41900       -9.52500      -13.25800\nC         37.35000       -8.44900      -14.16300\nC         36.21100      -10.13100      -12.27800\nC         38.15300       -9.06200      -13.19900\nC         37.57900       -9.90500      -12.26000\nO         38.37300      -10.50700      -11.30900\nN         34.34200       -5.28400      -16.78900\nC         33.68000       -4.74000      -17.95700\nC         33.50800       -5.93400      -18.89800\nO         34.32300       -6.86400      -18.86500\nC         34.56500       -3.69300      -18.60700\nN         32.45500       -5.91600      -19.72500\nC         32.15100       -6.99300      -20.66600\nC         33.26900       -7.26400      -21.69000\nO         33.41900       -8.40500      -22.14500\nC         30.79400       -6.74600      -21.35700\nC         29.60100       -6.73100      -20.41400\nO         29.65700       -7.43200      -19.36500\nO         28.60700       -6.02800      -20.72400\nN         34.07800       -6.23000      -22.01400\nC         35.20300       -6.31900      -22.95600\nC         36.40100       -7.08900      -22.39200\nO         37.26500       -7.50300      -23.15900\nC         35.62700       -4.92600      -23.40200\nO         35.78000       -4.05200      -22.29600\nN         36.44400       -7.29900      -21.06000\nC         37.54800       -7.99000      -20.37200\nC         37.08500       -9.24200      -19.60400\nO         37.92600       -9.97500      -19.07900\nC         38.40400       -7.02300      -19.47500\nC         38.85500       -5.77500      -20.24400\nC         37.66700       -6.64100      -18.18700\nN         35.75300       -9.47100      -19.51800\nC         35.16000      -10.60500      -18.79300\nC         35.64900      -11.96000      -19.31000\nO         35.58800      -12.21800      -20.51100\nC         33.62900      -10.52100      -18.79200\nC         32.99700      -11.15000      -17.56700\nC         31.55300      -10.71400      -17.40700\nC         31.05400      -10.98600      -16.00400\nN         29.58200      -10.84000      -15.92600\nN         36.18800      -12.76700      -18.39300\nC         36.73900      -14.08600      -18.67800\nC         38.22400      -14.09800      -18.98700\nO         38.84700      -15.16500      -18.96700\nN         38.81300      -12.91400      -19.28000\nC         40.24300      -12.78400      -19.61300\nC         41.07700      -12.06700      -18.54700\nO         42.22100      -12.44600      -18.31000\nC         40.42500      -12.11400      -20.97200\nC         39.55800      -12.69400      -22.07700\nC         39.74600      -11.96400      -23.37800\nN         39.39800      -10.54900      -23.25200\nC         40.21400       -9.53800      -23.53600\nN         39.80600       -8.28700      -23.38500\nN         41.44200       -9.76900      -23.98400\nN         40.51400      -11.03700      -17.91000\nC         41.20500      -10.28600      -16.85700\nC         40.71600      -10.71700      -15.48600\nO         39.55500      -11.08600      -15.34000\nC         41.00400       -8.76400      -17.02100\nC         41.66700       -8.04600      -18.17700\nC         42.10400       -8.74400      -19.29900\nC         41.79000       -6.66500      -18.17400\nC         42.66400       -8.07200      -20.38700\nC         42.35400       -5.99200      -19.26400\nC         42.78500       -6.70000      -20.36100\nN         41.60000      -10.64300      -14.49000\nC         41.32100      -10.99000      -13.10300\nC         41.88700       -9.89300      -12.17800\nO         43.07200       -9.58000      -12.25200\nC         41.92900      -12.37600      -12.77600\nO         41.57100      -13.33100      -13.78000\nC         41.52600      -12.88000      -11.41200\nN         41.04000       -9.32100      -11.31600\nC         41.47000       -8.32400      -10.33200\nC         41.73900       -9.05900       -9.00000\nO         41.08100      -10.05800       -8.69800\nC         40.45300       -7.14400      -10.17600\nC         41.09800       -5.91000       -9.48400\nC         39.13700       -7.58500       -9.47600\nC         40.35300       -4.59100       -9.67500\nN         42.71700       -8.57800       -8.23500\nC         43.05800       -9.11600       -6.92500\nC         43.84300       -8.07100       -6.15100\nO         44.31700       -7.10400       -6.73700\nC         43.83100      -10.43000       -7.04000\nO         45.07900      -10.26300       -7.68700\nN         43.96800       -8.25000       -4.83900\nC         44.70800       -7.31900       -3.99800\nC         45.41300       -8.03100       -2.85600\nO         44.96900       -9.09400       -2.41600\nC         43.80900       -6.16300       -3.49500\nC         42.62300       -6.58700       -2.62200\nC         41.63500       -5.45700       -2.39900\nN         42.23100       -4.33200       -1.67700\nC         41.72800       -3.10400       -1.65200\nN         42.33300       -2.14800       -0.97200\nN         40.61600       -2.82100       -2.32200\nN         46.52200       -7.44400       -2.39100\nC         47.29800       -7.93200       -1.26200\nC         47.37800       -6.77700       -0.27200\nO         48.22600       -5.89000       -0.39800\nC         48.69100       -8.43600       -1.69000\nC         49.37300       -9.36600       -0.69400\nO         49.04100       -9.30000        0.50500\nO         50.24900      -10.14300       -1.11200\nN         46.43600       -6.76700        0.67800\nC         46.31400       -5.72600        1.69600\nC         47.52600       -5.63600        2.61900\nO         47.86200       -4.52800        3.04700\nC         44.97900       -5.83800        2.44300\nC         43.77100       -5.80600        1.51800\nO         43.76700       -6.38000        0.43200\nN         42.70000       -5.17600        1.93100\nN         48.22400       -6.78100        2.86000\nC         49.46100       -6.83700        3.66200\nC         50.63600       -6.17100        2.93800\nO         51.52200       -5.62700        3.59000\nC         49.80900       -8.27100        4.05700\nO         49.82500       -9.17100        2.96100\nN         50.60700       -6.17200        1.59300\nC         51.62500       -5.57800        0.72100\nC         51.24700       -4.19300        0.16600\nO         52.09600       -3.54200       -0.46300\nC         51.95500       -6.53600       -0.43100\nC         52.86700       -7.67400       -0.02300\nC         53.32200       -8.46300       -1.22600\nC         54.10200       -9.68600       -0.82800\nN         54.11200      -10.68900       -1.92000\nN         49.98600       -3.74500        0.40000\nC         49.41900       -2.47000       -0.07700\nC         49.48500       -2.41400       -1.60600\nO         49.89700       -1.40800       -2.19400\nC         50.09300       -1.25600        0.58900\nC         49.92800       -1.20700        2.07700\nO         48.82400       -1.03200        2.59800\nN         51.03100       -1.36700        2.79300\nN         49.12200       -3.54300       -2.24100\nC         49.21200       -3.70800       -3.68400\nC         47.94100       -4.26000       -4.31100\nO         47.34600       -5.21200       -3.79800\nC         50.49700       -4.48200       -4.06700\nO         51.63500       -3.83700       -3.49400\nC         50.71300       -4.57000       -5.56400\nN         47.53000       -3.61600       -5.42400\nC         46.40400       -4.00900       -6.25900\nC         46.99800       -4.74200       -7.46600\nO         48.10200       -4.41100       -7.89000\nC         45.62000       -2.75200       -6.69800\nC         44.46400       -2.92400       -7.67000\nC         43.37400       -3.79900       -7.10100\nC         43.93200       -1.57400       -8.13500\nN         46.29900       -5.75300       -7.99400\nC         46.78700       -6.49100       -9.15800\nC         45.72500       -6.61700      -10.22700\nO         44.53300       -6.60200       -9.94000\nC         47.29000       -7.90100       -8.77400\nC         48.35900       -7.94000       -7.70200\nC         48.04000       -8.27700       -6.38800\nC         49.68700       -7.66700       -8.00100\nC         49.02000       -8.31800       -5.39400\nC         50.68000       -7.71800       -7.02000\nC         50.34200       -8.04300       -5.71500\nO         51.32500       -8.06300       -4.74800\nN         46.17300       -6.75600      -11.46600\nC         45.32900       -7.01700      -12.62400\nC         46.06200       -8.03400      -13.46600\nO         47.12900       -7.73800      -14.00400\nC         44.98200       -5.75700      -13.45500\nC         43.90600       -5.96000      -14.53900\nC         42.53200       -6.17200      -13.93200\nC         43.88600       -4.81600      -15.50400\nN         45.51300       -9.25600      -13.51900\nC         46.05500      -10.35200      -14.31000\nC         45.33700      -10.32100      -15.63800\nO         44.14000      -10.54100      -15.68300\nC         45.84700      -11.71000      -13.58900\nC         46.37700      -12.91800      -14.36700\nC         47.86900      -12.87400      -14.59000\nO         48.66600      -12.70900      -13.65500\nN         48.27600      -13.04100      -15.83900\nN         46.05800      -10.02000      -16.70800\nC         45.46200       -9.93300      -18.03700\nC         45.93700      -11.09900      -18.88100\nO         47.13300      -11.23600      -19.11600\nC         45.81200       -8.59800      -18.71700\nC         45.51700       -7.36000      -17.87100\nS         46.12400       -5.82500      -18.63800\nC         47.82300       -6.13100      -18.69200\nN         45.00000      -11.95700      -19.29900\nC         45.26600      -13.15300      -20.10700\nC         44.53100      -12.99400      -21.43000\nO         43.63800      -12.15300      -21.51600\nC         44.79100      -14.43100      -19.36700\nC         45.47200      -14.67200      -18.04700\nO         46.67900      -14.87300      -17.96400\nN         44.70800      -14.66900      -16.97600\nN         44.90300      -13.78900      -22.46300\nC         44.28800      -13.76500      -23.79900\nC         44.21800      -12.34600      -24.38200\nO         43.18200      -11.91900      -24.90600\nC         42.91900      -14.44800      -23.78800\nO         43.04100      -15.80800      -23.40800\nN         45.34700      -11.62000      -24.27600\nC         45.48100      -10.24000      -24.73400\nC         45.27300      -10.06400      -26.22700\nO         45.66000      -10.91600      -27.01000\nC         46.79100       -9.60400      -24.24000\nC         46.80700       -9.25100      -22.74200\nC         48.21400       -9.14500      -22.21600\nC         46.02800       -7.98500      -22.45900\nN         44.58800       -8.98400      -26.60100\nC         44.23000       -8.61200      -27.96900\nC         44.74000       -7.19000      -28.25100\nO         44.96400       -6.43200      -27.31200\nC         42.70200       -8.62200      -28.11800\nC         42.03300       -9.95900      -27.84900\nC         40.54100       -9.76900      -27.70100\nN         39.86300      -11.00800      -27.33100\nC         38.63300      -11.06100      -26.83700\nN         37.94600       -9.94400      -26.62800\nN         38.08500      -12.23000      -26.53000\nN         44.89400       -6.81400      -29.53700\nC         45.37400       -5.48400      -29.92500\nC         44.56400       -4.33900      -29.29800\nO         45.15000       -3.32800      -28.92300\nC         45.40500       -5.34900      -31.43900\nN         43.23700       -4.53900      -29.12700\nC         42.25400       -3.59500      -28.54400\nC         42.47300       -3.36200      -27.03200\nO         41.86900       -2.45800      -26.45500\nC         40.79900       -4.06800      -28.79400\nC         40.52700       -4.71800      -30.14900\nC         40.72700       -6.22300      -30.19400\nO         41.58800       -6.68400      -30.97900\nO         40.03200       -6.94200      -29.44000\nN         43.32000       -4.19100      -26.39800\nC         43.67900       -4.08200      -24.99100\nC         44.82900       -3.10500      -24.78300\nO         45.17400       -2.79900      -23.64100\nC         44.02600       -5.46100      -24.41100\nC         42.85900       -6.41700      -24.29400\nO         41.70800       -5.94300      -24.09200\nO         43.09800       -7.63400      -24.32200\nN         45.42200       -2.62000      -25.88900\nC         46.49800       -1.63400      -25.90300\nC         45.96200       -0.34700      -25.31300\nO         44.97600        0.19300      -25.81500\nC         47.05600       -1.46500      -27.32500\nO         47.65800       -2.69500      -27.73100\nC         48.05200       -0.32200      -27.44200\nN         46.58700        0.10700      -24.21600\nC         46.17700        1.29700      -23.48000\nC         47.13600        1.59800      -22.35400\nO         48.00200        0.79300      -22.02900\nC         44.78300        1.06600      -22.87300\nN         46.93400        2.75600      -21.72900\nC         47.57400        3.17800      -20.49000\nC         46.57800        2.68400      -19.45400\nO         45.37200        2.92500      -19.57400\nC         47.79300        4.72400      -20.39200\nC         48.13900        5.15500      -18.95500\nC         48.87100        5.18900      -21.38300\nN         47.07200        1.95200      -18.47800\nC         46.25500        1.40400      -17.42500\nC         46.43500        2.17600      -16.15400\nO         47.54300        2.26100      -15.63200\nC         46.54700       -0.09400      -17.24800\nC         45.88900       -0.94200      -18.32100\nC         46.40000       -0.97800      -19.61700\nC         44.75800       -1.70900      -18.04200\nC         45.78700       -1.73300      -20.61600\nC         44.16100       -2.50600      -19.02700\nC         44.68300       -2.51700      -20.31500\nO         44.09100       -3.26100      -21.31700\nN         45.34700        2.77400      -15.67500\nC         45.33100        3.54100      -14.43200\nC         44.70300        2.73800      -13.31300\nO         43.74000        1.99200      -13.49100\nC         44.55500        4.84900      -14.55900\nC         45.15500        5.88500      -15.48000\nC         44.61800        6.11000      -16.74800\nC         46.18000        6.72000      -15.05000\nC         45.15100        7.07700      -17.59400\nC         46.72500        7.68900      -15.89100\nC         46.19900        7.87000      -17.15800\nO         46.70300        8.85000      -17.98200\nN         45.23600        2.96900      -12.15200\nC         44.85100        2.40000      -10.88400\nC         44.27000        3.58900      -10.10700\nO         44.88200        4.65800      -10.07600\nC         46.10900        1.84400      -10.23000\nS         45.93200        1.41900       -8.49900\nN         43.04900        3.44200       -9.58300\nC         42.37600        4.52800       -8.88300\nC         41.58000        4.08800       -7.65600\nO         41.08500        2.96600       -7.58600\nC         41.51000        5.33200       -9.85300\nN         41.47100        4.99500       -6.68700\nC         40.80900        4.75500       -5.42500\nC         39.41200        5.35200       -5.30000\nO         39.23600        6.55200       -5.49700\nC         41.70600        5.25300       -4.27400\nC         41.10400        5.00200       -2.89800\nC         41.90200        5.64300       -1.80000\nN         41.74800        7.09100       -1.74500\nC         42.45200        7.87100       -0.93600\nN         42.28900        9.18300       -0.95900\nN         43.33100        7.34000       -0.09700\nN         38.44100        4.52100       -4.88900\nC         37.08600        4.95500       -4.56100\nC         37.10900        5.38800       -3.08200\nO         37.35400        4.54000       -2.22300\nC         36.06200        3.83400       -4.74400\nC         35.95700        3.33400       -6.14800\nN         35.25300        3.99900       -7.13000\nC         36.49000        2.21500       -6.68400\nC         35.37100        3.24900       -8.21600\nN         36.11600        2.18200       -7.99800\nN         36.89600        6.68300       -2.75200\nC         36.95900        7.10000       -1.33500\nC         35.92500        6.47600       -0.39100\nO         36.18600        6.41800        0.80800\nC         36.82700        8.62200       -1.40400\nC         36.11800        8.88500       -2.69800\nC         36.61100        7.83000       -3.63800\nN         34.78100        5.99600       -0.92800\nC         33.66500        5.37900       -0.18700\nC         33.19100        4.09100       -0.84800\nO         33.20100        3.99300       -2.07900\nC         32.47600        6.35500       -0.06800\nC         32.87300        7.75900        0.33600\nC         33.38000        8.01800        1.60700\nC         32.74700        8.82500       -0.54700\nC         33.78600        9.29800        1.97200\nC         33.13900       10.11200       -0.19000\nC         33.65600       10.34400        1.07300\nO         34.04200       11.61100        1.43000\nN         32.73300        3.11800       -0.02600\nC         32.21100        1.81900       -0.46700\nC         30.88200        1.99500       -1.19900\nO         30.49300        1.13700       -1.98900\nC         32.04200        0.84600        0.73700\nC         30.98700        1.24100        1.74100\nC         31.17100        1.99600        2.86300\nC         29.58100        0.91200        1.70600\nN         29.97500        2.17500        3.51900\nC         28.97900        1.53400        2.82300\nC         28.76600        0.17900        0.81900\nC         27.60400        1.42200        3.09200\nC         27.40300        0.08600        1.07400\nC         26.83600        0.69500        2.20200\nN         30.17000        3.08200       -0.88400\nC         28.85100        3.43300       -1.41600\nC         28.91400        4.44000       -2.56700\nO         27.86600        4.90100       -3.03300\nC         27.94200        3.95600       -0.28000\nC         28.52000        5.10800        0.51700\nC         28.32800        6.42500        0.11200\nC         29.20900        4.88700        1.70600\nC         28.85200        7.49200        0.84300\nC         29.72100        5.94700        2.45700\nC         29.53700        7.25000        2.02000\nO         30.03200        8.31100        2.74000\nN         30.13100        4.76900       -3.01000\nC         30.36900        5.71200       -4.10000\nC         31.25400        5.16400       -5.20700\nO         32.16200        4.36500       -4.94600\nN         31.00500        5.63100       -6.43100\nC         31.75300        5.23400       -7.61900\nC         32.76800        6.25400       -8.10800\nO         33.48800        5.96900       -9.06200\nN         32.85500        7.44200       -7.47400\nC         33.83000        8.47400       -7.85700\nC         35.25000        7.98900       -7.55300\nO         35.42400        7.05200       -6.76400\nC         33.53100        9.83800       -7.17800\nC         33.91900        9.92400       -5.69000\nC         32.77000        9.67700       -4.75300\nO         31.90300        8.82900       -4.98400\nN         32.75200       10.42300       -3.66300\nN         36.25900        8.59500       -8.19800\nC         37.64800        8.19300       -8.03500\nC         38.50700        9.33400       -7.55800\nO         38.78100       10.28900       -8.28000\nC         38.21200        7.47700       -9.27200\nC         37.60700        6.09200       -9.58000\nC         37.74900        5.75400      -11.05300\nC         38.22500        4.98500       -8.71200\nN         38.88000        9.22100       -6.29400\nC         39.64900       10.12600       -5.44900\nC         41.06000       10.37300       -5.97900\nO         41.42900       11.48100       -6.36500\nC         39.76500        9.44100       -4.05400\nC         39.77700       10.33000       -2.84700\nO         39.66200       11.55300       -3.01100\nO         39.86500        9.79900       -1.73100\nN         41.85600        9.32500       -5.92600\nC         43.25900        9.29500       -6.22000\nC         43.54700        8.37500       -7.40700\nO         42.96200        7.30800       -7.51300\nC         43.93700        8.80600       -4.91700\nC         45.42200        8.49400       -4.92300\nC         46.24700        9.74700       -4.94600\nC         45.76600        7.63500       -3.75000\nN         44.42300        8.81900       -8.31600\nC         44.85100        8.07600       -9.50100\nC         46.36100        7.96300       -9.50100\nO         47.05900        8.85500       -9.00300\nC         44.43200        8.80800      -10.79800\nC         42.95300        8.96500      -11.00000\nC         42.09900        9.74300      -10.27400\nC         42.16200        8.34300      -12.02400\nN         40.82400        9.64000      -10.77600\nC         40.83100        8.78000      -11.84800\nC         42.45000        7.45100      -13.07300\nC         39.78800        8.36700      -12.69200\nC         41.42200        7.05100      -13.91400\nC         40.10800        7.50300      -13.71900\nN         46.85700        6.89400      -10.11200\nC         48.28400        6.70000      -10.34200\nC         48.65700        7.37000      -11.65400\nO         47.79700        7.95500      -12.32100\nN         49.92100        7.29200      -12.04900\nC         50.39100        7.92200      -13.28300\nC         50.07500        7.11900      -14.55500\nO         50.05700        7.68900      -15.65500\nC         51.89000        8.32800      -13.18200\nC         52.94600        7.19100      -13.18200\nC         52.98100        6.26700      -11.97600\nO         52.98400        6.69300      -10.80600\nN         53.13600        4.97400      -12.25200\nN         49.84400        5.81500      -14.37300\nC         49.49100        4.86200      -15.41800\nC         50.63400        3.99000      -15.89400\nO         51.80800        4.33100      -15.73000\nN         50.29300        2.84400      -16.48000\nC         51.28300        1.93000      -17.07500\nC         50.84400        1.53700      -18.47100\nO         49.69600        1.13600      -18.67300\nC         51.74000        0.78100      -16.14600\nO         52.88600        0.16600      -16.73800\nC         50.63800       -0.25800      -15.87900\nN         51.74800        1.69800      -19.44200\nC         51.42000        1.42400      -20.82400\nC         51.57700       -0.03800      -21.20000\nO         52.62600       -0.62900      -20.96300\nC         52.18200        2.36900      -21.79100\nC         52.00500        2.09400      -23.28800\nC         50.67300        2.62600      -23.81200\nC         53.14800        2.64700      -24.07500\nN         50.51800       -0.60200      -21.80700\nC         50.45300       -1.97500      -22.29400\nC         50.19300       -1.88600      -23.79400\nO         49.19800       -1.29500      -24.21700\nC         49.37700       -2.83000      -21.55000\nC         49.18300       -4.20000      -22.20600\nC         49.72000       -2.99100      -20.07000\nN         51.12900       -2.40900      -24.59000\nC         51.02600       -2.45000      -26.04000\nC         50.89400       -3.93000      -26.41500\nO         51.74000       -4.74400      -26.02900\nC         52.23800       -1.76100      -26.71700\nO         52.45700       -0.47400      -26.12200\nC         52.06500       -1.62100      -28.22400\nN         49.81400       -4.27900      -27.11300\nC         49.58200       -5.65600      -27.55600\nC         49.74000       -5.69500      -29.07700\nO         48.94100       -5.09600      -29.79600\nC         48.25200       -6.27900      -27.06600\nC         48.22800       -7.77700      -27.37000\nC         48.03700       -6.03400      -25.57100\nN         50.80500       -6.34800      -29.55600\nC         51.10000       -6.38700      -30.98800\nC         51.82400       -7.67000      -31.42600\nO         52.63700       -8.21400      -30.67200\nC         51.94800       -5.17400      -31.37500\nO         51.95900       -4.95000      -32.77300\nN         51.54300       -8.12700      -32.66500\nC         52.20100       -9.29300      -33.26100\nC         53.40200       -8.83800      -34.09100\nO         54.19100       -9.67200      -34.54300\nC         51.22500      -10.11600      -34.10300\nO         50.78900       -9.39400      -35.24000\nN         53.54600       -7.50000      -34.26600\nC         54.64000       -6.86900      -34.99800\nC         55.99800       -7.15000      -34.34700\nO         56.09400       -7.29400      -33.12600\nC         54.40700       -5.36800      -35.10400\nN         57.03100       -7.26000      -35.18900\nC         58.42700       -7.51500      -34.82300\nC         59.17700       -6.18300      -34.79100\nO         58.76400       -5.22600      -35.45500\nC         59.10200       -8.42700      -35.87900\nC         58.68400       -9.88700      -35.82800\nC         59.39100      -10.67000      -36.91400\nC         59.14800      -12.15700      -36.80800\nN         60.07300      -12.92500      -37.68600\nN         60.29300       -6.13900      -34.04300\nC         61.16400       -4.97900      -33.97900\nC         61.66300       -4.69000      -35.40800\nO         62.34900       -5.51300      -36.03000\nC         62.27800       -5.19700      -32.96200\nO         61.68200       -5.56600      -31.72400\nC         63.11300       -3.96700      -32.75400\nN         61.22400       -3.55900      -35.94000\nC         61.54900       -3.14500      -37.29000\nC         62.20000       -1.76400      -37.26100\nO         61.62300       -0.84600      -36.67700\nC         60.27200       -3.19500      -38.19700\nO         59.64000       -4.46100      -38.05300\nC         60.58400       -2.96700      -39.67500\nN         63.38700       -1.57700      -37.88500\nC         63.97100       -0.22100      -37.92600\nC         63.27200        0.61800      -38.99800\nO         62.74800        0.06300      -39.96400\nC         65.44800       -0.45800      -38.26600\nC         65.52200       -1.85800      -38.76200\nC         64.21500       -2.54900      -38.62900\nN         63.21300        1.95600      -38.85900\nC         62.53500        2.74900      -39.89400\nC         63.31500        2.84900      -41.20800\nO         64.52900        2.63000      -41.25100\nC         62.40400        4.12400      -39.23100\nC         63.54600        4.20900      -38.31900\nC         63.72000        2.82100      -37.77100\nN         62.59200        3.20300      -42.27800\nC         63.14700        3.53700      -43.58300\nC         63.04100        5.05500      -43.56100\nO         61.96600        5.58300      -43.25800\nC         62.32400        2.93400      -44.71700\nO         62.68400        1.57400      -44.91200\nN         64.16900        5.75500      -43.73600\nC         64.18000        7.21500      -43.62900\nC         64.34500        7.86700      -44.98300\nO         65.28700        7.54700      -45.70500\nC         65.16000        7.73500      -42.53000\nC         65.17200        9.25700      -42.46100\nC         64.78700        7.17100      -41.17000\nN         63.40800        8.76500      -45.33700\nC         63.43600        9.44800      -46.62700\nC         63.55700       10.95900      -46.48000\nO         62.84800       11.54800      -45.65900\nC         62.22500        9.07500      -47.48800\nC         62.03100        7.58600      -47.68100\nC         61.06800        6.88800      -46.95600\nC         62.80000        6.87600      -48.59200\nC         60.88200        5.52000      -47.13200\nC         62.63500        5.50400      -48.76400\nC         61.66300        4.83500      -48.04300\nO         61.47400        3.49200      -48.24600\nN         64.45700       11.61200      -47.26500\nC         64.57800       13.07500      -47.15000\nC         63.46000       13.75600      -47.91000\nO         63.05500       13.29300      -48.98000\nC         65.96600       13.38300      -47.71400\nC         66.32400       12.20700      -48.56300\nC         65.38200       11.06500      -48.28700\nN         62.92300       14.82800      -47.32100\nC         61.82600       15.55300      -47.94200\nC         62.23000       16.94800      -48.30800\nO         62.46800       17.80500      -47.43900\nC         60.54200       15.52300      -47.08700\nC         60.03500       14.16000      -46.64300\nC         58.88600       14.29400      -45.67100\nC         59.66200       13.30600      -47.83000\nN         62.33700       17.15800      -49.62300\nC         62.71300       18.44300      -50.19700\nC         61.47200       19.10100      -50.79200\nO         60.57800       18.38800      -51.26100\nC         63.79100       18.25100      -51.26600\nN         61.37300       20.45100      -50.71100\nC         60.20400       21.14100      -51.28700\nC         60.02600       20.95400      -52.80700\nO         60.99400       20.69800      -53.54300\nC         60.50900       22.62500      -51.01100\nC         61.51100       22.62500      -49.93400\nC         62.33400       21.41800      -50.13900\nN         58.78400       21.15100      -53.24800\nC         58.39800       21.17300      -54.65100\nC         58.23000       22.62100      -55.08900\nO         58.65000       23.02400      -56.18100\nN         61.48200       33.65300      -48.09300\nC         62.71300       33.95800      -47.36300\nC         63.09100       32.85800      -46.34500\nO         64.11800       32.96800      -45.66200\nC         62.60800       35.31700      -46.67900\nO         61.69700       35.26900      -45.59300\nN         62.24600       31.81600      -46.23100\nC         62.48500       30.65900      -45.36500\nC         62.07200       29.34900      -46.02000\nO         61.03200       29.29400      -46.68400\nC         61.92000       30.83600      -43.94600\nC         62.90300       31.53100      -43.04200\nS         62.79800       31.12300      -41.29600\nC         64.21900       31.99700      -40.69200\nN         62.92500       28.31000      -45.87700\nC         62.71100       26.98100      -46.47400\nC         62.26200       25.98000      -45.41800\nO         62.86700       25.89500      -44.34900\nC         63.94500       26.43400      -47.25500\nC         63.54900       25.27700      -48.16700\nC         64.61600       27.51800      -48.07500\nN         61.23400       25.17800      -45.73800\nC         60.80000       24.13100      -44.81400\nC         61.20600       22.79100      -45.38900\nO         60.78700       22.43500      -46.48700\nC         59.31600       24.21400      -44.46500\nO         58.55600       23.90100      -45.63100\nC         58.91700       25.56500      -43.91700\nN         62.04000       22.07300      -44.64500\nC         62.55600       20.76700      -45.03100\nC         61.97700       19.68800      -44.14800\nO         61.64100       19.94900      -43.00600\nC         64.08200       20.77800      -44.94300\nC         64.74700       21.84700      -45.80300\nC         66.17500       22.00100      -45.44300\nC         64.58100       21.54400      -47.28100\nN         61.83600       18.49600      -44.69000\nC         61.24700       17.40600      -43.93300\nC         62.01800       16.10500      -43.91800\nO         63.04100       15.94700      -44.57900\nN         61.46900       15.13900      -43.20100\nC         62.00500       13.80300      -43.01900\nC         60.87400       12.80200      -42.84500\nO         60.06000       12.95900      -41.95200\nC         62.92500       13.77400      -41.81100\nS         64.36000       12.71800      -42.04100\nN         60.82600       11.77800      -43.67700\nC         59.80700       10.73700      -43.58000\nC         60.41300        9.49000      -42.92900\nO         61.27400        8.84400      -43.50800\nC         59.19700       10.43000      -44.96200\nC         58.20000        9.26200      -45.04400\nC         56.89000        9.56600      -44.30000\nC         57.94100        8.87700      -46.48200\nN         59.96700        9.18200      -41.71000\nC         60.40400        8.03700      -40.88100\nC         59.28500        7.00500      -40.97300\nO         58.25200        7.16400      -40.33900\nC         60.72500        8.50100      -39.43200\nC         61.21200        7.33800      -38.57400\nC         61.75100        9.63800      -39.44100\nN         59.48600        5.99100      -41.82800\nC         58.49100        4.99600      -42.21700\nC         58.74700        3.53400      -41.82500\nO         59.83100        3.00400      -42.03500\nC         58.32800        5.09200      -43.73900\nC         56.96600        4.69700      -44.28500\nC         57.10900        3.81700      -45.51400\nC         56.94900        4.53100      -46.83700\nN         57.21500        3.62700      -48.00100\nN         57.70100        2.89500      -41.31200\nC         57.68000        1.47700      -40.97100\nC         58.55400        0.99800      -39.83400\nO         59.30600        0.03800      -39.99900\nN         58.42200        1.62400      -38.65600\nC         59.17500        1.21200      -37.48400\nC         58.26000        0.62800      -36.42200\nO         57.07000        0.92500      -36.38000\nC         60.03100        2.35800      -36.91300\nC         59.23500        3.55700      -36.45700\nC         58.78800        3.65700      -35.13900\nC         58.90500        4.57900      -37.34100\nC         58.05900        4.76000      -34.71300\nC         58.15400        5.67500      -36.93200\nC         57.75300        5.77200      -35.61100\nO         57.00700        6.85100      -35.22200\nN         58.82800       -0.23500      -35.59200\nC         58.15600       -0.88400      -34.48900\nC         59.18000       -1.36200      -33.45800\nO         60.15700       -2.00300      -33.81700\nC         57.24200       -2.05600      -34.93800\nC         56.34600       -2.50000      -33.80600\nC         55.13900       -1.85100      -33.56100\nC         56.75500       -3.49900      -32.92000\nC         54.34500       -2.20800      -32.46900\nC         55.97300       -3.84200      -31.82200\nC         54.76900       -3.19800      -31.60400\nN         58.94900       -1.12400      -32.16400\nC         57.85400       -0.34000      -31.58200\nC         58.20100        1.15300      -31.55000\nO         59.19500        1.58300      -32.11300\nC         57.73000       -0.96000      -30.18000\nC         59.13700       -1.34100      -29.81500\nC         59.87000       -1.61300      -31.12200\nN         57.38100        1.93900      -30.87800\nC         57.62800        3.36000      -30.65300\nC         58.60000        3.47600      -29.46400\nO         58.61500        2.58600      -28.61500\nC         56.30800        4.03500      -30.25300\nC         55.36800        4.26600      -31.41200\nC         54.50100        5.49000      -31.22700\nO         54.84800        6.55900      -31.78400\nO         53.49300        5.39000      -30.49200\nN         59.41100        4.54200      -29.32300\nC         59.53100        5.72500      -30.17900\nC         60.73000        5.68000      -31.12600\nO         61.55700        4.75700      -31.06300\nC         59.74200        6.83200      -29.13500\nC         60.60200        6.16300      -28.07100\nC         60.27000        4.68000      -28.12500\nN         60.80700        6.69800      -32.00300\nC         61.95300        7.08100      -32.81700\nC         62.34200        8.45200      -32.23200\nO         61.53200        9.06600      -31.53500\nC         61.73100        7.16700      -34.35800\nC         61.70700        5.78400      -35.00300\nC         60.49700        7.98800      -34.72100\nN         63.56300        8.91000      -32.47700\nC         64.01200       10.22300      -32.03300\nC         64.55200       10.91900      -33.27000\nO         65.46900       10.38500      -33.89900\nC         65.06300       10.11500      -30.90900\nO         64.60600        9.19000      -29.92400\nC         65.35800       11.46300      -30.24600\nN         63.95800       12.07700      -33.63900\nC         64.38200       12.87900      -34.78800\nC         65.10700       14.15800      -34.35700\nO         64.50700       15.01400      -33.71600\nC         63.26700       13.20200      -35.82800\nC         63.87600       13.77800      -37.10400\nC         62.41900       11.97400      -36.15500\nN         66.38400       14.30400      -34.74100\nC         67.13100       15.54900      -34.50600\nC         67.55900       16.07300      -35.85400\nO         67.50000       15.34800      -36.85700\nC         68.28200       15.44200      -33.46800\nO         69.38700       14.70100      -34.00100\nC         67.82300       14.90500      -32.11300\nN         67.93900       17.33800      -35.89800\nC         68.39400       17.98000      -37.12500\nC         69.77000       18.57100      -36.89900\nO         69.94600       19.32700      -35.94400\nC         67.40800       19.05300      -37.56300\nC         66.10800       18.50100      -38.02100\nC         65.00000       18.25500      -37.27000\nC         65.78400       18.12100      -39.34900\nN         63.99900       17.75100      -38.05500\nC         64.44500       17.67800      -39.34600\nC         66.48600       18.13100      -40.56000\nC         63.79200       17.25100      -40.50700\nC         65.83600       17.70700      -41.70800\nC         64.50700       17.28000      -41.67900\nN         70.75200       18.20300      -37.76200\nC         72.16600       18.62100      -37.66200\nC         72.72900       18.30900      -36.25800\nO         73.34600       19.16200      -35.62000\nC         72.36500       20.10400      -38.04700\nC         72.15200       20.45100      -39.49800\nO         72.18300       21.61500      -39.87700\nN         71.96800       19.47800      -40.35500\nN         72.45300       17.08400      -35.77800\nC         72.84300       16.53200      -34.48700\nC         72.47900       17.37200      -33.25200\nO         73.11900       17.23200      -32.20700\nC         74.30600       16.10100      -34.49700\nO         74.57800       15.25300      -35.60300\nN         71.42700       18.18800      -33.36000\nC         70.96800       19.02400      -32.25500\nC         71.21200       20.50700      -32.44400\nO         70.63200       21.31900      -31.71200\nN         72.07100       20.87300      -33.44200\nC         72.43600       22.24800      -33.81700\nC         71.20100       23.03500      -34.23800\nO         71.09000       24.22100      -33.93600\nC         73.43500       22.24900      -34.97000\nO         74.55600       21.41800      -34.72400\nN         70.29400       22.37400      -34.96500\nC         69.02500       22.93800      -35.38400\nC         68.00100       22.53800      -34.32400\nO         67.76200       21.34300      -34.13500\nC         68.63100       22.38900      -36.76300\nC         69.04600       23.21600      -37.97200\nC         68.98000       22.39000      -39.23900\nC         68.17200       24.44800      -38.12000\nN         67.45500       23.52300      -33.58400\nC         66.47700       23.29700      -32.50000\nC         65.20400       24.09100      -32.74900\nO         64.08900       23.55600      -32.65500\nC         67.06800       23.70800      -31.15300\nO         68.33400       23.11000      -30.93000\nN         65.38200       25.39300      -33.02000\nC         64.31200       26.32700      -33.33600\nC         63.74900       25.93300      -34.70900\nO         64.52700       25.62000      -35.61700\nC         64.87200       27.75000      -33.36700\nO         63.85900       28.73200      -33.52100\nN         62.42000       25.89500      -34.82500\nC         61.73500       25.56600      -36.07500\nC         61.57500       24.09000      -36.39600\nO         61.12200       23.74900      -37.49000\nN         61.92100       23.20800      -35.44000\nC         61.81700       21.75600      -35.55800\nC         60.43700       21.32900      -35.06500\nO         60.07000       21.66600      -33.94100\nC         62.94400       21.03800      -34.76800\nC         62.76600       19.52300      -34.80500\nC         64.32400       21.43000      -35.29000\nN         59.66900       20.60300      -35.90000\nC         58.35500       20.09500      -35.49400\nC         58.19800       18.64400      -35.88600\nO         58.14000       18.33400      -37.07400\nC         57.18700       20.97000      -36.01200\nC         57.31500       22.41700      -35.63700\nN         57.22600       22.83700      -34.31300\nC         57.56300       23.49500      -36.42100\nC         57.43400       24.14800      -34.33900\nN         57.63000       24.59100      -35.58400\nN         58.17700       17.74400      -34.87600\nC         58.01400       16.30700      -35.09900\nC         56.53800       15.97500      -34.91500\nO         56.00600       16.02800      -33.81000\nC         59.00800       15.46200      -34.28200\nO         60.34200       15.92200      -34.53200\nC         58.92600       13.98200      -34.62600\nN         55.89100       15.66700      -36.02500\nC         54.46300       15.37900      -36.12200\nC         54.05200       14.03800      -35.49600\nO         54.91400       13.18000      -35.30100\nC         53.98900       15.56700      -37.58300\nC         53.96000       17.03200      -37.97500\nC         55.12800       17.69500      -38.35100\nC         52.77700       17.76300      -37.91700\nC         55.10600       19.06000      -38.66200\nC         52.75800       19.12700      -38.23500\nC         53.92000       19.76300      -38.60600\nN         52.76100       13.85000      -35.10200\nC         52.40100       12.58200      -34.45700\nC         52.48300       11.38900      -35.39500\nO         52.24200       11.51700      -36.60200\nC         51.00200       12.82400      -33.85400\nC         50.51100       14.08800      -34.43200\nC         51.59200       14.74500      -35.24700\nN         52.88600       10.23700      -34.82300\nC         53.02700        8.97200      -35.54000\nC         51.66600        8.42100      -35.93500\nO         50.65800        8.69100      -35.28600\nC         53.78600        7.95500      -34.69200\nN         51.63000        7.69500      -37.03300\nC         50.40400        7.06200      -37.49500\nC         50.67700        5.56100      -37.66100\nO         51.78800        5.16800      -38.02700\nC         49.75800        7.77400      -38.72500\nC         50.36200        7.30800      -40.04900\nC         48.25200        7.58000      -38.72800\nN         49.69500        4.73000      -37.33400\nC         49.85400        3.28800      -37.44700\nC         49.38900        2.82100      -38.83300\nO         48.19500        2.58400      -39.03900\nC         49.07600        2.60100      -36.31200\nC         49.50600        1.20600      -35.85200\nC         51.00800        1.07000      -35.69700\nC         48.83400        0.87600      -34.55200\nN         50.34200        2.74000      -39.79200\nC         50.07500        2.36000      -41.18500\nC         49.49700        0.96200      -41.35000\nO         48.45900        0.82200      -41.99300\nC         51.28200        2.60600      -42.09300\nC         51.58000        4.08700      -42.29200\nC         52.85400        4.26700      -43.04300\nO         52.90600        4.45000      -44.25500\nN         53.94000        4.15700      -42.34000\nN         50.12300       -0.06300      -40.75700\nC         49.59100       -1.42500      -40.83800\nC         49.79000       -2.10700      -39.49800\nO         48.84700       -2.27100      -38.72600\nC         50.23900       -2.20200      -41.98200\nO         49.25900       -2.48900      -42.96500\nN         51.02400       -2.46500      -39.21500\nC         51.45900       -3.03500      -37.95300\nC         52.58400       -2.10800      -37.52300\nO         53.07100       -2.18300      -36.39700\nC         52.04100       -4.43800      -38.19200\nC         51.05400       -5.44500      -38.75900\nO         50.33000       -5.09500      -39.73000\nO         51.03200       -6.59600      -38.26700\nN         53.00400       -1.24000      -38.44900\nC         54.11800       -0.34300      -38.23100\nC         53.73800        1.11700      -38.13500\nO         52.69300        1.53600      -38.63800\nC         55.21400       -0.57300      -39.28900\nC         55.56400       -2.03600      -39.65400\nC         56.35800       -2.09400      -40.94200\nC         56.32000       -2.75500      -38.53000\nN         54.60700        1.89300      -37.48100\nC         54.43800        3.33100      -37.29500\nC         55.14600        4.14600      -38.35000\nO         56.20800        3.75800      -38.84300\nC         54.94400        3.76900      -35.91900\nC         54.17300        3.18200      -34.76700\nC         54.58300        1.99500      -34.15700\nC         53.02500        3.80700      -34.28400\nC         53.86500        1.44100      -33.10200\nC         52.29800        3.26000      -33.22800\nC         52.72000        2.07400      -32.64400\nO         52.02000        1.53400      -31.59700\nN         54.57900        5.31000      -38.65600\nC         55.15700        6.28300      -39.58200\nC         54.96500        7.65200      -39.01200\nO         53.90900        7.95900      -38.47100\nC         54.52300        6.16700      -40.96900\nO         54.99600        4.94700      -41.51900\nC         54.90200        7.28900      -41.94100\nN         55.99200        8.48600      -39.15200\nC         55.92500        9.89200      -38.80300\nC         56.81500       10.70500      -39.72100\nO         57.60200       10.13900      -40.48700\nC         56.16900       10.18800      -37.30000\nC         57.54900        9.98700      -36.63000\nC         58.57600       11.04000      -37.08400\nC         57.41200       10.10000      -35.11700\nN         56.67500       12.04000      -39.62300\nC         57.48900       13.00900      -40.32000\nC         57.86400       14.14200      -39.38800\nO         57.09600       14.51800      -38.49400\nC         56.79500       13.51900      -41.58500\nO         57.61700       14.45600      -42.26300\nN         59.07000       14.64200      -39.57300\nC         59.61600       15.78000      -38.84700\nC         59.88400       16.84600      -39.90600\nO         60.12800       16.52600      -41.06900\nC         60.91300       15.38900      -38.15600\nO         61.41400       16.41600      -37.32100\nN         59.79800       18.10500      -39.51800\nC         60.05500       19.21400      -40.42800\nC         60.95500       20.22700      -39.74300\nO         61.05000       20.23200      -38.52200\nC         58.74100       19.83800      -40.90800\nO         58.09300       20.60600      -39.90400\nN         61.67000       21.03200      -40.52700\nC         62.54800       22.09300      -40.03500\nC         62.45300       23.30200      -40.95500\nO         62.57900       23.16300      -42.17000\nC         64.01400       21.64900      -39.72500\nC         64.80200       21.29500      -40.99500\nC         64.75400       22.69800      -38.88600\nN         62.17300       24.47500      -40.37300\nC         62.11700       25.74300      -41.10100\nC         63.45700       26.43600      -40.90100\nO         63.82300       26.74000      -39.76800\nC         60.92500       26.59700      -40.67500\nO         59.74700       25.80100      -40.78200\nC         60.78400       27.85800      -41.53200\nN         64.22800       26.58800      -41.99100\nC         65.56100       27.20300      -41.98500\nC         65.60600       28.44500      -42.89700\nO         64.80200       28.52300      -43.82800\nC         66.69800       26.19200      -42.32000\nC         66.73000       25.03700      -41.33000\nC         66.61600       25.68100      -43.75300\nN         66.51800       29.42600      -42.68600\nC         66.57000       30.56300      -43.62200\nC         67.04200       30.10300      -45.00600\nO         67.92400       29.25900      -45.10200\nC         67.55700       31.53300      -42.95900\nC         67.77600       31.01600      -41.55900\nC         67.57000       29.54100      -41.65200\nN         66.42300       30.62700      -46.07400\nC         66.72400       30.28100      -47.46900\nC         68.20700       30.39700      -47.89200\nO         68.60900       29.73100      -48.84500\nC         65.82300       31.06100      -48.41500\nO         66.23800       32.41500      -48.45300\nN         69.00700       31.22900      -47.17400\nC         70.44900       31.44200      -47.41000\nC         71.29400       30.34900      -46.74100\nO         72.50700       30.25900      -46.97500\nC         70.87200       32.80800      -46.88200\nO         70.64800       32.93900      -45.48800\nN         70.63800       29.52400      -45.90400\nC         71.22100       28.41400      -45.15000\nC         71.06700       27.10000      -45.92200\nO         71.84600       26.18800      -45.70400\nC         70.62400       28.44200      -43.72400\nO         71.41400       29.30900      -42.92100\nC         70.47300       27.06500      -43.06300\nN         70.05300       26.98100      -46.79700\nC         69.82500       25.73900      -47.53300\nC         69.39200       26.02900      -48.96300\nO         68.50100       26.86700      -49.15500\nC         68.78400       24.85400      -46.81200\nC         68.64400       23.50200      -47.43700\nC         69.41000       22.40100      -47.18100\nC         67.77400       23.14400      -48.52300\nN         69.04500       21.36900      -48.01200\nC         68.06400       21.80600      -48.86800\nC         66.79700       23.83900      -49.26200\nC         67.36600       21.12500      -49.87500\nC         66.12300       23.17200      -50.27600\nC         66.39600       21.82700      -50.56300\nN         69.97200       25.36000      -49.99200\nC         70.98200       24.28800      -49.94900\nC         72.46200       24.66300      -49.85000\nO         73.30100       23.78200      -50.02300\nC         70.63100       23.43700      -51.16800\nC         69.93800       24.37000      -52.12800\nC         69.52900       25.61200      -51.37500\nN         72.78200       25.93500      -49.51200\nC         74.14900       26.45700      -49.34900\nC         74.94000       25.63900      -48.30400\nO         76.09800       25.27200      -48.52500\nC         74.09700       27.93400      -48.95400\nO         75.31200       28.43100      -48.41400\nN         74.27900       25.35800      -47.18100\nC         74.76800       24.61900      -46.02100\nC         74.05800       23.27100      -45.99000\nO         72.97600       23.11700      -46.56600\nC         74.37900       25.42100      -44.78500\nC         75.20800       25.26500      -43.52900\nC         74.55800       26.00800      -42.37300\nO         74.73100       25.57600      -41.21100\nO         73.84600       27.00800      -42.63100\nN         74.65800       22.29900      -45.31400\nC         74.10000       20.95700      -45.20900\nC         72.98200       20.89500      -44.15600\nO         73.19000       21.31000      -43.01900\nC         75.25900       19.94600      -45.02500\nO         75.87800       19.73900      -46.29900\nC         74.81100       18.60600      -44.45500\nN         71.81000       20.38400      -44.53900\nC         70.71000       20.13700      -43.59900\nC         70.46800       18.63400      -43.56300\nO         70.11100       18.02100      -44.57700\nC         69.44100       20.99400      -43.78300\nC         68.32000       20.51600      -42.86500\nC         69.74200       22.46400      -43.52100\nN         70.79100       18.04000      -42.40600\nC         70.71700       16.61000      -42.12400\nC         69.70100       16.28700      -41.02000\nO         69.59200       16.96800      -39.99300\nC         72.12400       16.05000      -41.80700\nO         72.97800       16.29800      -42.92100\nC         72.13100       14.53900      -41.52200\nN         69.01900       15.18600      -41.25600\nC         68.03100       14.55300      -40.43700\nC         68.68000       13.32700      -39.77600\nO         69.20300       12.45700      -40.48600\nC         66.87700       14.14500      -41.33900\nS         65.56800       13.24300      -40.50000\nN         68.66400       13.27200      -38.42400\nC         69.25000       12.16100      -37.65300\nC         68.14400       11.40500      -36.96600\nO         67.32900       11.99300      -36.25300\nC         70.27300       12.66000      -36.64400\nC         71.12100       13.77300      -37.18700\nO         71.98300       13.58800      -38.03500\nN         70.82700       14.96200      -36.76200\nN         68.03800       10.11200      -37.27300\nC         66.95100        9.27500      -36.76500\nC         67.46300        8.05200      -36.00400\nO         68.18500        7.22400      -36.55700\nC         65.95300        8.90800      -37.89700\nC         64.86600        7.95200      -37.40100\nC         65.33300       10.16300      -38.51600\nN         67.02200        7.91800      -34.75400\nC         67.37800        6.79400      -33.90900\nC         66.14700        5.99500      -33.51300\nO         65.13300        6.57100      -33.13300\nC         68.12000        7.28500      -32.67100\nN         66.22700        4.66600      -33.65500\nC         65.18900        3.74400      -33.23800\nC         65.80600        2.89600      -32.12200\nO         66.45500        1.88400      -32.41700\nC         64.68300        2.88900      -34.39700\nC         63.52700        2.00800      -34.01400\nN         63.57300        0.63900      -34.19200\nC         62.32600        2.34000      -33.48900\nC         62.41200        0.18600      -33.77300\nN         61.62600        1.17800      -33.34600\nN         65.65800        3.34500      -30.84500\nC         66.28000        2.63400      -29.71000\nC         65.97400        1.15100      -29.52800\nO         66.86200        0.40900      -29.10900\nC         65.84000        3.45800      -28.50200\nC         65.59200        4.80100      -29.05700\nC         64.95800        4.55500      -30.37300\nN         64.75100        0.71700      -29.86700\nC         64.34400       -0.67700      -29.75300\nC         65.17800       -1.62700      -30.63000\nO         65.40900       -2.77100      -30.23900\nC         62.87900       -0.81400      -30.08200\nN         65.65000       -1.15600      -31.78700\nC         66.46200       -1.97500      -32.69700\nC         67.92900       -1.50800      -32.72400\nO         68.74000       -2.05200      -33.48700\nC         65.86600       -1.94800      -34.09500\nO         65.83900       -0.61600      -34.57100\nN         68.25700       -0.49900      -31.88400\nC         69.58200        0.15000      -31.77400\nC         70.07200        0.68500      -33.12000\nO         71.22900        0.51100      -33.49400\nC         70.60100       -0.75600      -31.07700\nO         71.88800       -0.16500      -30.99600\nN         69.15600        1.31600      -33.85800\nC         69.42100        1.86300      -35.17900\nC         69.62700        3.34600      -35.12700\nO         69.05700        4.02300      -34.27900\nC         68.48700        1.29000      -36.28100\nO         67.16900        1.14100      -35.79200\nC         68.89900       -0.09800      -36.69900\nN         70.49600        3.82900      -35.99700\nC         70.85100        5.22600      -36.16100\nC         71.04400        5.48100      -37.66700\nO         71.84300        4.80000      -38.32000\nC         72.12400        5.56400      -35.35700\nC         71.85800        5.87500      -33.88500\nC         73.11200        6.30300      -33.15700\nC         72.84100        6.73200      -31.73600\nN         74.08800        7.20700      -31.07200\nN         70.24100        6.39500      -38.23000\nC         70.33000        6.72700      -39.65300\nC         70.34500        8.24700      -39.84600\nO         69.67400        8.96700      -39.10600\nC         69.26700        5.96200      -40.50900\nC         67.84900        6.39700      -40.17300\nC         69.53100        6.08200      -42.01000\nN         71.17200        8.72400      -40.78800\nC         71.27600       10.13400      -41.16600\nC         70.84000       10.28500      -42.62100\nO         71.25400        9.48700      -43.46500\nC         72.71300       10.66400      -41.01600\nC         73.26700       10.66000      -39.60400\nO         72.56700       11.12700      -38.68900\nO         74.42600       10.24300      -39.42400\nN         69.97000       11.26500      -42.91500\nC         69.58400       11.53200      -44.30500\nC         69.79900       12.98900      -44.60300\nO         69.26100       13.84900      -43.90200\nC         68.15700       11.06200      -44.68200\nC         67.99100        9.53900      -44.77100\nC         68.85000        8.82300      -45.83400\nC         68.69800        7.32200      -45.71300\nN         69.45300        6.58600      -46.76300\nN         70.64100       13.26800      -45.60500\nC         70.94900       14.62600      -46.03300\nC         69.81600       15.11900      -46.92900\nO         69.34300       14.38500      -47.79400\nC         72.29300       14.65900      -46.78000\nC         72.89700       16.05400      -46.91800\nC         74.11800       16.02800      -47.81800\nC         74.53700       17.40300      -48.26400\nN         75.70700       17.35100      -49.18200\nN         69.34600       16.33900      -46.69900\nC         68.29600       16.82700      -47.59200\nC         68.93000       17.54400      -48.78100\nO         69.46000       18.65300      -48.64500\nC         67.12900       17.57800      -46.90400\nC         66.43000       16.66500      -45.87400\nC         66.10700       18.05100      -47.92700\nC         66.90200       16.80900      -44.55800\nN         68.94600       16.84700      -49.92300\nC         69.53400       17.32200      -51.16400\nC         68.39200       17.69300      -52.14000\nO         67.39000       16.96000      -52.21100\nC         70.56400       16.28900      -51.74300\nC         69.92800       14.92100      -51.94500\nC         71.20300       16.76800      -53.04700\nN         68.48700       18.85200      -52.85800\nC         67.42900       19.19600      -53.83800\nC         67.39700       18.17600      -54.98800\nO         68.46500       17.81000      -55.48300\nC         67.83200       20.59900      -54.31700\nC         68.87100       21.07700      -53.33700\nC         69.56700       19.86100      -52.87200\nN         66.21700       17.63100      -55.35000\nC         66.16200       16.59600      -56.40200\nC         64.83300       16.54200      -57.14300\nO         64.77700       16.01300      -58.25400\nC         66.53200       15.20200      -55.83700\nC         67.33500       14.33000      -56.80800\nC         68.01800       13.16200      -56.10100\nN         68.55200       12.16800      -57.03900\nC         68.93000       10.93600      -56.70600\nN         69.39400       10.10400      -57.63100\nN         68.84100       10.52300      -55.44700\nN         17.66500       14.03400        1.45000\nC         18.97100       14.34100        2.05900\nC         19.11900       13.71500        3.46100\nO         19.20000       14.43500        4.46300\nC         18.99900       15.87500        2.05200\nC         17.53700       16.28400        2.11700\nC         16.68800       15.12500        1.64600\nN         19.15500       12.36200        3.52100\nC         19.23300       11.56400        4.75100\nC         20.51200       11.72400        5.56200\nO         21.61400       11.68900        5.01700\nC         18.99300       10.09700        4.44800\nN         20.34300       11.89700        6.87800\nC         21.42600       12.03600        7.85400\nC         21.48600       10.73300        8.63300\nO         20.45500       10.29400        9.14900\nC         21.15100       13.20400        8.83600\nC         21.16200       14.59100        8.19900\nS         19.97500       15.74600        8.97300\nC         21.03500       16.57000       10.20600\nN         22.68000       10.10700        8.71200\nC         22.88300        8.84100        9.43500\nC         22.55400        8.97500       10.92800\nO         22.80200       10.03000       11.52200\nC         24.30100        8.22700        9.18700\nC         24.32300        6.69900        9.47900\nC         25.41600        9.01000        9.93100\nC         25.56500        5.94000        9.14900\nN         21.97500        7.91500       11.51900\nC         21.69000        7.87500       12.94900\nC         23.01400        7.46900       13.59700\nO         23.51400        6.36900       13.35000\nC         20.60500        6.85300       13.25000\nN         23.63200        8.40600       14.33200\nC         24.92100        8.21600       14.99600\nC         24.88900        7.08200       16.00900\nO         23.85400        6.85000       16.63900\nC         25.34500        9.50400       15.71700\nC         26.67700       10.04800       15.24100\nC         27.43500       10.91600       16.23000\nO         26.87500       11.93600       16.69500\nO         28.56000       10.51900       16.60200\nN         26.03200        6.39000       16.17800\nC         26.17500        5.34800       17.18500\nC         26.44400        6.09300       18.49000\nO         27.53800        6.63300       18.69600\nC         27.29800        4.37800       16.83900\nS         27.61200        3.13200       18.11400\nN         25.39300        6.20500       19.31900\nC         25.38300        6.94300       20.58200\nC         24.27400        6.44700       21.52500\nO         23.41300        5.65500       21.13100\nC         25.21700        8.46600       20.32300\nC         24.04700        8.83000       19.39800\nC         23.32100       10.09400       19.83000\nC         23.61300       11.25600       18.91600\nN         22.65800       12.37200       19.14000\nN         24.31400        6.92700       22.78200\nC         23.31700        6.62700       23.80900\nC         22.06700        7.44000       23.50700\nO         22.15900        8.62900       23.17600\nC         23.84500        6.95300       25.21500\nO         24.29700        8.31100       25.26500\nC         24.94000        6.00900       25.66500\nN         20.90900        6.78800       23.58800\nC         19.60400        7.40700       23.36000\nC         18.58600        6.88300       24.35700\nO         18.62400        5.70400       24.71800\nC         19.10500        7.17100       21.91900\nC         19.70900        8.10200       20.87800\nC         19.13500        7.84100       19.50300\nN         19.89900        8.53000       18.46800\nC         20.90100        7.98300       17.78800\nN         21.26800        6.73200       18.02600\nN         21.54300        8.68500       16.86500\nN         17.67400        7.76600       24.79300\nC         16.58900        7.44500       25.72300\nC         15.66400        6.42700       25.04900\nO         15.18500        6.67000       23.94000\nC         15.81700        8.71100       26.16100\nO         15.86700        9.73900       25.16800\nC         16.24800        9.26400       27.50900\nN         15.47300        5.26600       25.70300\nC         14.63700        4.15600       25.25000\nC         13.64500        3.75500       26.33000\nO         13.83800        4.10500       27.49400\nC         15.51400        2.94100       24.91500\nC         15.95600        2.91400       23.46300\nC         16.60600        1.63400       22.97600\nO         16.43800        0.58100       23.63400\nO         17.26400        1.68700       21.91200\nN         12.61700        2.97400       25.96100\nC         11.60900        2.48900       26.90200\nC         11.82800        1.01700       27.17800\nO         11.81300        0.20300       26.25300\nC         10.16000        2.82900       26.46300\nC          9.12600        2.05900       27.28300\nC          9.90400        4.33300       26.53900\nN         12.03800        0.68900       28.45600\nC         12.26400       -0.66400       28.94800\nC         11.01600       -1.21300       29.65400\nO         10.59600       -0.66400       30.67200\nC         13.49200       -0.68300       29.89000\nC         13.86200       -2.04700       30.43000\nC         13.52900       -2.41000       31.72900\nC         14.51600       -2.97900       29.62800\nC         13.86200       -3.67700       32.22600\nC         14.82500       -4.25400       30.11800\nC         14.49800       -4.59300       31.41300\nN         10.45700       -2.32100       29.13900\nC          9.28700       -2.99100       29.72900\nC          9.73900       -3.83000       30.91600\nO         10.67700       -4.61900       30.78900\nC          8.58300       -3.91900       28.71200\nC          8.22000       -3.28900       27.37400\nC          6.94900       -2.46500       27.31600\nO          5.97700       -2.79900       28.03500\nO          6.90400       -1.51500       26.50100\nN          9.06200       -3.68200       32.05800\nC          9.37700       -4.47400       33.25200\nC          8.62400       -5.82200       33.22500\nO          7.42300       -5.88200       33.50300\nC          9.23300       -3.68900       34.58400\nC         10.06800       -2.40300       34.55600\nC          9.65700       -4.56300       35.77700\nC          9.35500       -1.22300       35.00000\nN          9.34900       -6.89300       32.85600\nC          8.83400       -8.25800       32.70400\nC          8.61000       -8.99600       34.03700\nO          9.15100       -8.59900       35.06900\nC          9.74800       -9.06000       31.77300\nO          9.46000      -10.45000       31.75000\nN          7.79600      -10.07300       34.00400\nC          7.50700      -10.91700       35.16500\nC          8.75900      -11.69700       35.60900\nO          8.98600      -11.81200       36.81200\nC          6.33000      -11.86400       34.88700\nC          4.95100      -11.23700       35.09500\nC          3.89200      -12.10600       34.44500\nN          2.52600      -11.68100       34.75800\nC          1.44900      -12.06000       34.07300\nN          1.56900      -12.86500       33.02500\nN          0.24500      -11.64000       34.43300\nN          9.59900      -12.17000       34.63900\nC         10.86300      -12.89200       34.88700\nC         11.84800      -12.03300       35.71100\nO         12.66800      -12.57700       36.45300\nC         11.50900      -13.33600       33.55200\nC         12.56500      -14.44800       33.69100\nC         13.25700      -14.80300       32.37700\nN         14.18000      -13.75500       31.92900\nC         14.86600      -13.78900       30.78800\nN         14.74100      -14.82100       29.95900\nN         15.67900      -12.79000       30.46600\nN         11.74000      -10.69400       35.58700\nC         12.55200       -9.69500       36.28500\nC         12.36200       -9.74900       37.80600\nO         13.33300       -9.57900       38.54800\nC         12.22400       -8.28400       35.75300\nC         13.05200       -7.73800       34.57700\nC         12.89500       -8.57300       33.31400\nC         12.64300       -6.33300       34.25500\nN         11.11900      -10.00400       38.26100\nC         10.76300      -10.08200       39.68400\nC         10.54800      -11.53600       40.14400\nO         11.11700      -11.93200       41.16400\nC          9.58500       -9.12200       40.03800\nC          9.90400       -7.67000       39.62600\nC          9.23100       -9.17700       41.53100\nC          9.13800       -7.18800       38.47600\nN          9.74000      -12.32300       39.39800\nC          9.46900      -13.73200       39.70900\nC          9.18400      -14.59700       38.46600\nO          8.19800      -14.37700       37.75300\nC          8.36600      -13.87700       40.77800\nC          8.27800      -15.24500       41.42700\nO          7.18300      -15.60100       41.91100\nO          9.31400      -15.94600       41.48400\nN         10.05800      -15.59500       38.22900\nC         10.02200      -16.52900       37.08800\nC          9.18500      -17.78000       37.40000\nO          8.77000      -18.49300       36.48000\nC         11.45600      -16.91800       36.66700\nC         12.49200      -15.89900       37.12700\nC         13.92600      -16.24500       36.81500\nN         14.43600      -17.41200       37.54900\nC         14.96700      -17.38300       38.77200\nN         15.02000      -16.24600       39.45700\nN         15.42700      -18.49600       39.32700\nN          8.93500      -18.02400       38.70800\nC          8.14500      -19.13000       39.26700\nC          6.70500      -19.14000       38.71200\nO          6.17000      -20.21900       38.44000\nC          8.17000      -19.06600       40.81600\nO          9.51300      -18.88900       41.27200\nC          7.56700      -20.30500       41.48100\nN          6.08500      -17.94600       38.54300\nC          4.71000      -17.82600       38.04700\nC          4.42700      -16.57600       37.20600\nO          5.20100      -15.61800       37.21900\nC          3.71400      -17.92300       39.21200\nC          3.20400      -19.32100       39.43700\nO          2.26700      -19.77900       38.76900\nN          3.82000      -20.03800       40.36800\nN          3.29800      -16.61200       36.46900\nC          2.76000      -15.52600       35.64300\nC          1.42900      -15.09100       36.28700\nO          0.50300      -14.61400       35.62100\nC          2.53400      -16.02100       34.21900\nN          1.35700      -15.27200       37.60700\nC          0.18600      -14.98400       38.41900\nC          0.29400      -13.63900       39.18000\nO         -0.22300      -13.52300       40.29500\nC         -0.07300      -16.17000       39.36900\nC         -0.68600      -17.42100       38.75400\nO         -1.35400      -17.39700       37.71000\nN         -0.53500      -18.54600       39.44200\nN          0.94600      -12.61800       38.56000\nC          1.10600      -11.29000       39.17300\nC          1.23200      -10.13300       38.18700\nO          1.44000      -10.36100       37.00100\nC          2.24200      -11.26800       40.21100\nC          3.61700      -11.47700       39.63900\nC          4.16200      -12.75200       39.54800\nC          4.38200      -10.39800       39.20600\nC          5.44100      -12.94500       39.02200\nC          5.66600      -10.59000       38.69300\nC          6.18800      -11.86200       38.60300\nN          1.11000       -8.88700       38.70600\nC          1.17500       -7.61900       37.97200\nC          2.30000       -6.71700       38.49200\nO          2.79400       -6.91800       39.60300\nC         -0.18700       -6.88700       37.98800\nC         -1.43900       -7.68900       37.54000\nC         -2.67800       -6.82700       37.56800\nC         -1.28200       -8.28400       36.14500\nN          2.74000       -5.73900       37.66700\nC          3.87400       -4.85200       37.98400\nC          3.53000       -3.39800       37.72300\nO          2.89900       -3.08800       36.70900\nC          5.17600       -5.28800       37.21400\nC          6.35000       -4.35400       37.50200\nC          5.55800       -6.74000       37.54400\nN          3.98900       -2.51200       38.62000\nC          3.79000       -1.08600       38.46500\nC          5.08700       -0.33000       38.78500\nO          5.65400       -0.54800       39.85600\nC          2.58600       -0.56100       39.28700\nC          2.50200        0.93600       39.26500\nC          3.07600        1.80400       40.14800\nC          1.95100        1.73300       38.22100\nN          2.89300        3.09900       39.72800\nC          2.20900        3.08500       38.54000\nC          1.25200        1.44000       37.04400\nC          1.77400        4.14000       37.73600\nC          0.82800        2.48300       36.24200\nC          1.08800        3.81500       36.58800\nN          5.55700        0.59600       37.91400\nC          5.03100        0.92400       36.57100\nC          5.31100       -0.19300       35.55000\nO          6.18800       -1.01500       35.82500\nC          5.67500        2.27900       36.26700\nC          6.94400        2.32900       37.07800\nC          6.80300        1.33600       38.21200\nN          4.53300       -0.33100       34.43700\nC          4.80300       -1.44000       33.49500\nC          6.09200       -1.28400       32.68600\nO          6.66200       -2.27600       32.23300\nC          3.57200       -1.46700       32.57800\nC          2.67800       -0.37700       33.04100\nC          3.43000        0.52400       33.95300\nN          6.54500       -0.03800       32.51400\nC          7.75600        0.30600       31.78800\nC          8.37200        1.60200       32.31500\nO          7.68200        2.41200       32.93100\nC          7.49900        0.36600       30.28400\nS          6.54900        1.81300       29.75000\nN          9.67100        1.79000       32.03700\nC         10.52600        2.90100       32.48000\nC         11.51900        3.29200       31.37200\nO         11.79300        2.49500       30.47600\nC         11.25300        2.47200       33.79200\nC         12.00100        1.14100       33.64800\nC         12.13600        3.54900       34.36900\nN         12.06500        4.51100       31.44300\nC         13.09200        4.98300       30.51500\nC         14.47600        4.41600       30.90000\nO         14.79200        4.31900       32.09200\nC         13.17700        6.51600       30.53400\nC         12.05800        7.25300       29.82000\nC         12.26300        8.75300       29.71500\nO         13.14300        9.29900       30.41900\nO         11.56500        9.38300       28.88800\nN         15.29300        4.05700       29.89300\nC         16.68100        3.58800       30.03500\nC         17.58700        4.31100       29.02500\nO         17.09000        5.06200       28.18000\nC         16.87000        2.03900       29.97500\nC         16.30500        1.34700       31.21500\nC         16.33000        1.42900       28.67900\nN         18.91500        4.10200       29.12900\nC         19.89500        4.64100       28.18900\nC         20.47200        3.46500       27.45300\nO         20.99600        2.54000       28.08100\nC         21.00600        5.47000       28.86700\nC         20.55300        6.80100       29.46800\nC         19.71100        7.64500       28.54700\nO         20.12500        8.04700       27.45600\nN         18.50300        7.91800       28.97800\nN         20.29000        3.45000       26.12900\nC         20.78500        2.35500       25.31400\nC         21.47100        2.83200       24.05400\nO         21.20100        3.93500       23.57600\nC         19.66500        1.34700       24.97700\nC         19.02200        0.64600       26.17600\nC         19.91100       -0.39700       26.83400\nN         19.33600       -0.89900       28.08300\nC         18.41100       -1.85300       28.15500\nN         17.93900       -2.41300       27.04800\nN         17.94700       -2.24900       29.33300\nN         22.35600        1.97900       23.51400\nC         23.05900        2.22700       22.26200\nC         22.11100        1.94600       21.11700\nO         21.41400        0.93000       21.11900\nC         24.32100        1.37400       22.14900\nS         25.65500        1.87000       23.26400\nN         22.07500        2.86200       20.15500\nC         21.29700        2.76900       18.92000\nC         22.00400        3.62800       17.87500\nO         22.77400        4.53100       18.22700\nC         19.84700        3.21400       19.12200\nO         19.74500        4.53000       19.64000\nN         21.77200        3.31400       16.61100\nC         22.40100        4.03300       15.51500\nC         23.16900        3.15700       14.55200\nO         23.15200        1.92400       14.65800\nN         23.84300        3.81700       13.59600\nC         24.58500        3.17300       12.52100\nC         26.03100        3.50900       12.42800\nO         26.51400        4.50700       12.97200\nC         23.90000        3.37400       11.17800\nS         22.43800        2.35800       10.95600\nN         26.69800        2.67800       11.64000\nC         28.10100        2.74800       11.34500\nC         28.29700        2.92500        9.85200\nO         27.61200        2.27100        9.05100\nC         28.78500        1.49500       11.86400\nS         28.70900        1.32100       13.66000\nN         29.20300        3.85100        9.48200\nC         29.51100        4.17000        8.08900\nC         30.04600        2.98000        7.29000\nO         29.49300        2.65800        6.23400\nC         30.39300        5.42400        7.97000\nC         29.72100        6.75100        8.34100\nO         28.51000        6.97600        8.25200\nN         30.51100        7.71500        8.69100\nN         31.05000        2.27500        7.83200\nC         31.63100        1.09700        7.18100\nC         30.67200       -0.09200        7.21500\nO         29.83200       -0.20200        8.11200\nC         32.99200        0.73100        7.78500\nC         33.80900        1.91600        8.23100\nO         34.29700        2.71400        7.42400\nN         33.93300        2.08100        9.53700\nN         30.79400       -0.96300        6.21200\nC         29.98200       -2.15800        6.02100\nC         30.22700       -3.22000        7.11700\nO         29.28500       -3.92900        7.49000\nC         30.28000       -2.72700        4.62600\nC         29.21800       -3.65100        4.05900\nC         29.64000       -4.16300        2.69400\nN         28.67400       -5.10300        2.12700\nC         28.67500       -6.41700        2.34000\nN         29.60000       -6.97100        3.11400\nN         27.75100       -7.18500        1.78300\nN         31.48000       -3.31700        7.63100\nC         31.90700       -4.30500        8.63800\nC         31.81600       -3.85000       10.12800\nO         32.54000       -4.38700       10.97700\nC         33.32800       -4.82000        8.30700\nC         33.47500       -5.57500        6.99900\nO         32.66100       -6.44100        6.64300\nN         34.56600       -5.31000        6.28900\nN         30.92700       -2.89000       10.44900\nC         30.77900       -2.39000       11.82300\nC         29.33300       -2.29100       12.32000\nO         28.44100       -1.85400       11.58300\nC         31.60700       -1.11000       12.14200\nC         33.06000       -1.44300       12.45500\nC         31.52900       -0.08600       11.01900\nN         29.11900       -2.70400       13.58900\nC         27.83600       -2.64700       14.30000\nC         27.98600       -1.76600       15.52300\nO         29.03500       -1.79800       16.17200\nC         27.37200       -4.03600       14.75600\nC         27.03900       -4.99700       13.63400\nC         27.76000       -6.30100       13.85000\nO         28.98600       -6.40700       13.68600\nN         27.01600       -7.32200       14.25800\nN         26.93600       -0.99600       15.84600\nC         26.93100       -0.12100       17.01600\nC         26.74700       -0.94900       18.30200\nO         25.78600       -1.72000       18.40700\nC         25.87300        0.96400       16.88400\nS         25.85400        2.12800       18.26300\nN         27.70000       -0.82300       19.25800\nC         27.69800       -1.60000       20.49700\nC         28.11100       -0.82900       21.75200\nO         28.91500        0.10100       21.63100\nC         28.58200       -2.84300       20.33200\nC         27.81500       -4.00000       19.72300\nC         28.64000       -5.25200       19.56800\nN         28.19800       -6.07700       18.44000\nC         27.29700       -7.05500       18.50900\nN         26.71200       -7.35000       19.66500\nN         26.97100       -7.74100       17.42200\nN         27.62000       -1.22600       22.97000\nC         28.04400       -0.52200       24.19300\nC         29.46200       -0.86200       24.63900\nO         29.85100       -2.03700       24.62200\nC         26.99900       -0.93800       25.24100\nC         26.44100       -2.21500       24.75700\nC         26.64800       -2.30500       23.27700\nN         30.23400        0.17800       25.01900\nC         31.61100        0.05100       25.51400\nC         31.52300       -0.37400       26.98100\nO         32.15600       -1.35400       27.38100\nC         32.39900        1.36300       25.32200\nO         32.25700        1.81400       23.97600\nC         33.88400        1.21000       25.64200\nN         30.72500        0.37000       27.77300\nC         30.47000        0.07700       29.17800\nC         29.01900        0.34200       29.58600\nO         28.36500        1.25400       29.07200\nC         31.51400        0.69900       30.14200\nC         31.30800        2.17100       30.50900\nC         31.91100        3.14100       29.52500\nO         32.51200        2.76700       28.51400\nN         31.77400        4.42600       29.81500\nN         28.52800       -0.49200       30.50400\nC         27.17700       -0.44700       31.05400\nC         27.22300       -0.01500       32.52800\nO         28.27200       -0.11600       33.16800\nC         26.40700       -1.79100       30.85500\nC         26.29700       -2.16800       29.37600\nC         27.03000       -2.92800       31.65800\nN         26.08800        0.46400       33.05400\nC         25.92000        0.84500       34.45400\nC         24.65000        0.19100       34.98200\nO         23.58400        0.33500       34.37100\nC         25.83200        2.36600       34.63800\nC         25.92500        2.79100       36.10300\nC         25.92000        4.27300       36.34400\nO         26.13100        5.09200       35.44500\nN         25.78300        4.65900       37.60400\nN         24.76600       -0.53200       36.11000\nC         23.60800       -1.14900       36.74200\nC         22.96800       -0.12100       37.67900\nO         23.66000        0.50000       38.49300\nC         23.97600       -2.45700       37.44600\nC         24.34400       -3.63500       36.53100\nC         24.61100       -4.88800       37.35300\nC         23.26900       -3.90300       35.46000\nN         21.66100        0.12600       37.47800\nC         20.86000        1.12400       38.19100\nC         19.59700        0.48800       38.82200\nO         18.65100        0.17000       38.09400\nC         20.47100        2.25800       37.21600\nC         19.58900        3.34200       37.81800\nC         19.37800        4.49700       36.87400\nN         18.36200        4.21100       35.86300\nC         17.94300        5.08300       34.95800\nN         18.45600        6.30900       34.91800\nN         17.01900        4.73700       34.07600\nN         19.54900        0.28500       40.16000\nC         18.34600       -0.31800       40.75200\nC         17.20900        0.67600       41.00500\nO         17.44200        1.81600       41.41800\nC         18.86500       -0.94200       42.04300\nC         20.05500       -0.13300       42.40600\nC         20.55900        0.58400       41.19300\nN         15.98100        0.24100       40.71600\nC         14.76800        1.02800       40.92700\nC         13.73000        0.23300       41.69500\nO         13.70200       -1.00000       41.61300\nC         14.16500        1.69900       39.65900\nC         15.10900        2.74400       39.07500\nC         13.72300        0.67600       38.60900\nN         12.88300        0.94500       42.45100\nC         11.81900        0.34100       43.24200\nC         10.51600        0.34000       42.44500\nO         10.09400        1.37200       41.91500\nC         11.64200        1.08300       44.56900\nC         10.83900        0.29200       45.59900\nC         10.15500        1.18800       46.61000\nO         10.78500        2.00400       47.30300\nN          8.84400        1.03800       46.72900\nN          9.91000       -0.84100       42.33800\nC          8.62700       -1.08800       41.66800\nC          7.71000       -1.82700       42.66300\nO          8.11200       -2.09000       43.80500\nC          8.75300       -1.85800       40.30400\nC          9.56100       -1.06600       39.27700\nC          9.31200       -3.27400       40.48800\nN          6.49600       -2.18100       42.22200\nC          5.60100       -2.95200       43.06400\nC          5.06100       -4.18400       42.37200\nO          4.73500       -4.14000       41.18400\nC          4.50900       -2.09600       43.70200\nC          3.64800       -1.33500       42.73600\nC          2.55600       -0.66000       43.49300\nN          2.96000        0.63700       44.03500\nC          2.27700        1.27900       44.97400\nN          1.17300        0.74600       45.48100\nN          2.69200        2.45700       45.41500\nN          5.00300       -5.29400       43.11700\nC          4.51200       -6.58400       42.64800\nC          3.10100       -6.78000       43.22800\nO          2.93800       -6.90000       44.44800\nC          5.48100       -7.71500       43.05800\nC          5.12000       -9.08900       42.49400\nC          5.81100      -10.23600       43.24600\nC          5.30400      -11.58400       42.78900\nN          5.88100      -12.71000       43.57300\nN          2.09200       -6.74300       42.33500\nC          0.66600       -6.88800       42.63400\nC          0.22600       -8.35500       42.43800\nO         -0.16900       -8.73900       41.34200\nC         -0.15300       -5.85300       41.80300\nC          0.36900       -4.42500       42.04200\nC         -1.67800       -5.93400       42.05500\nC          0.94100       -3.81100       40.85200\nN          0.34100       -9.17600       43.49700\nC         -0.05100      -10.58800       43.51300\nC         -1.58100      -10.74500       43.55700\nO         -2.24100      -10.22500       44.46400\nC          0.60500      -11.32500       44.68400\nC          2.05200      -11.67600       44.40800\nC          2.82100      -12.14400       45.62300\nO          3.44900      -11.29300       46.28900\nO          2.79600      -13.36100       45.91200\nN         -2.12200      -11.46600       42.54800\nC         -3.54800      -11.71000       42.31000\nC         -4.07500      -13.04900       42.88000\nO         -5.11800      -13.05300       43.53300\nC         -3.84100      -11.53400       40.79200\nC         -3.56000      -10.08000       40.27500\nC         -5.20500      -12.07100       40.37200\nC         -4.39500       -8.87100       40.90400\nN         -3.35500      -14.16400       42.65600\nC         -3.77700      -15.50800       43.08400\nC         -3.68400      -15.81800       44.59600\nO         -3.34200      -16.93700       45.00500\nC         -3.24300      -16.65200       42.17400\nC         -3.80400      -16.54600       40.75800\nC         -1.71400      -16.68900       42.16400\nN         -4.00700      -14.82400       45.42200\nC         -3.95600      -14.95000       46.87800\nC         -5.35000      -14.69600       47.44900\nO         -6.23600      -14.23200       46.72100\nC         -2.94700      -13.95000       47.45600\nC         -1.56600      -14.15700       46.91600\nC         -0.51200      -14.44200       47.91000\nN          0.60100      -15.13400       47.25900\nC          1.29800      -16.11800       47.82000\nN          1.02600      -16.51200       49.06000\nN          2.29000      -16.69800       47.15600\nN         -5.53400      -14.96400       48.76200\nC         -6.78500      -14.72800       49.50600\nC         -7.24500      -13.27200       49.36100\nO         -8.45000      -13.00100       49.30900\nC         -6.59800      -15.06500       50.99200\nC         -6.62300      -16.53100       51.30600\nC         -6.33700      -16.72500       52.77900\nC         -6.26700      -18.17700       53.11500\nN         -5.17000      -18.43800       54.07400\nN         -6.26500      -12.35200       49.26800\nC         -6.49200      -10.92300       49.08500\nC         -5.35100      -10.32000       48.24100\nO         -4.26200      -10.89500       48.17700\nC         -6.64400      -10.19700       50.44600\nC         -5.35100       -9.95400       51.19700\nC         -5.58100       -9.72800       52.66200\nC         -4.38500      -10.20300       53.45700\nN         -4.07800      -11.66400       53.25100\nN         -5.56100       -9.14800       47.59900\nC         -4.45900       -8.52100       46.84500\nC         -3.26300       -8.13400       47.73400\nO         -3.43400       -7.80000       48.91500\nC         -5.12300       -7.27600       46.23300\nC         -6.25800       -6.98000       47.12100\nC         -6.77200       -8.30200       47.57000\nN         -2.04900       -8.23300       47.17200\nC         -0.81800       -7.91100       47.88200\nC         -0.00400       -6.96400       47.01100\nO          0.27500       -7.26100       45.85100\nC         -0.04500       -9.18300       48.35700\nC         -0.85200       -9.91500       49.44900\nC          1.36400       -8.83000       48.88400\nC         -0.40200      -11.30100       49.76600\nN          0.32500       -5.80200       47.57600\nC          1.08000       -4.73600       46.93700\nC          2.44100       -4.63900       47.65600\nO          2.61700       -3.86800       48.60700\nC          0.28300       -3.41900       46.98300\nC         -1.16800       -3.54300       46.58200\nC         -2.15700       -3.73100       47.53900\nC         -1.54500       -3.50900       45.24500\nC         -3.49800       -3.87500       47.16900\nC         -2.88900       -3.63600       44.87700\nC         -3.85500       -3.80600       45.84500\nN          3.38000       -5.48500       47.21800\nC          4.72600       -5.63700       47.77300\nC          5.72700       -4.82100       46.98800\nO          5.64800       -4.76900       45.76100\nC          5.12700       -7.13100       47.75100\nC          6.36200       -7.51600       48.58700\nC          6.28900       -8.97900       49.02700\nC          7.43900       -9.83300       48.54400\nN          8.62700       -9.67500       49.40900\nN          6.68300       -4.19400       47.69800\nC          7.77700       -3.42400       47.09700\nC          8.73400       -4.43200       46.48500\nO          8.89400       -5.52800       47.02800\nC          8.53500       -2.60900       48.16500\nC          7.71000       -1.53800       48.83700\nC          8.46100       -0.87700       49.95800\nC          7.58400        0.15000       50.62400\nN          7.99700        0.40100       52.02300\nN          9.36200       -4.07600       45.36500\nC         10.33300       -4.93600       44.67700\nC         11.37200       -4.09100       43.98800\nO         11.04100       -3.04800       43.41200\nC          9.63600       -5.83500       43.66100\nN         12.64000       -4.51700       44.06500\nC         13.74300       -3.79700       43.42700\nC         14.10000       -4.45500       42.08200\nO         14.20200       -5.66900       42.00700\nC         14.91200       -3.63700       44.40900\nO         14.40400       -3.12700       45.64700\nC         15.99000       -2.69500       43.89200\nN         14.21000       -3.65900       41.01300\nC         14.56700       -4.13300       39.66700\nC         15.82200       -3.39800       39.15000\nO         15.88000       -2.16300       39.19000\nC         13.36600       -4.14400       38.65800\nC         12.68000       -2.79600       38.57300\nC         13.79200       -4.59700       37.26600\nN         16.83700       -4.17300       38.71600\nC         18.10000       -3.63900       38.21000\nC         18.02500       -3.27000       36.72400\nO         17.96600       -4.14600       35.84800\nC         19.26800       -4.59300       38.51400\nO         19.20600       -5.04100       39.86100\nC         20.63300       -3.96600       38.24200\nN         18.05600       -1.96200       36.44200\nC         18.03900       -1.45600       35.07300\nC         19.46300       -1.32700       34.54000\nO         20.32800       -0.79400       35.23400\nC         17.34100       -0.09000       34.99100\nC         15.90700        0.00600       35.47900\nC         15.42900        1.43400       35.40600\nC         14.98600       -0.91100       34.67800\nN         19.69300       -1.79200       33.30600\nC         20.98700       -1.69400       32.62700\nC         20.97900       -0.43700       31.73300\nO         20.13200       -0.30400       30.84800\nC         21.27800       -2.96900       31.80900\nC         22.71900       -3.11100       31.33600\nC         22.96400       -4.23400       30.34200\nO         23.50600       -5.28300       30.76300\nO         22.63400       -4.06100       29.14800\nN         21.87900        0.50700       32.02500\nC         22.05000        1.73900       31.25800\nC         23.39200        1.68000       30.51800\nO         24.36800        1.15900       31.06300\nC         22.00500        2.97200       32.18200\nC         20.66100        3.67700       32.28500\nO         19.66700        3.16800       31.70000\nO         20.60100        4.74500       32.94100\nN         23.43200        2.18600       29.27400\nC         24.65800        2.23900       28.47800\nC         25.22500        3.63500       28.62700\nO         24.46800        4.61200       28.61700\nC         24.38600        1.91600       27.00000\nC         23.90200        0.52000       26.73600\nN         23.45800        0.14300       25.48400\nC         23.80200       -0.54500       27.57100\nC         23.10700       -1.13000       25.58900\nN         23.29500       -1.58800       26.82600\nN         26.55100        3.72700       28.81700\nC         27.24200        5.00800       29.01000\nC         27.90700        5.49600       27.73300\nO         27.80800        6.67800       27.38200\nC         28.29400        4.87200       30.12100\nC         27.80800        5.15800       31.53700\nC         27.04900        3.99000       32.08900\nC         28.98100        5.47500       32.45600\nN         28.59600        4.58000       27.05500\nC         29.34700        4.86700       25.85100\nC         29.07500        3.83400       24.77500\nO         28.90300        2.64400       25.06700\nC         30.83700        4.91300       26.16900\nN         29.03100        4.30700       23.52700\nC         28.79400        3.47500       22.35900\nC         29.92100        3.69900       21.37300\nO         30.43000        4.81500       21.25400\nC         27.43900        3.79200       21.72300\nS         26.04800        3.82600       22.88300\nN         30.29100        2.63700       20.65600\nC         31.30200        2.69300       19.61200\nC         31.05400        1.66500       18.52900\nO         30.57000        0.56200       18.80100\nC         32.75500        2.68100       20.14800\nC         33.18900        1.40800       20.83800\nC         34.69900        1.36400       20.99300\nC         35.04400        0.43300       22.11300\nN         36.47600        0.52800       22.49000\nN         31.34800        2.07000       17.29100\nC         31.22900        1.25900       16.08800\nC         32.32800        0.20500       16.14800\nO         33.51900        0.53700       16.09700\nC         31.34000        2.13500       14.84200\nS         29.78200        2.91800       14.34700\nN         31.92600       -1.05400       16.36300\nC         32.86900       -2.15600       16.51400\nC         32.74700       -3.21700       15.43600\nO         31.64400       -3.50700       14.96200\nC         32.76000       -2.78400       17.91400\nC         34.10900       -3.17200       18.49500\nC         34.11700       -3.76300       19.89400\nO         33.28400       -3.34800       20.73500\nO         35.00100       -4.61000       20.16400\nN         33.90600       -3.78700       15.05800\nC         34.11300       -4.85100       14.07000\nC         33.17600       -6.04700       14.31600\nO         32.97900       -6.89000       13.44100\nC         35.58000       -5.30000       14.12800\nO         35.90400       -5.62000       15.48700\nC         36.54600       -4.23700       13.59300\nN         19.06600        2.74100       49.33700\nC         17.72100        3.17900       48.95800\nC         16.74400        1.96800       48.72500\nO         16.36500        1.39600       49.74900\nC         17.67900        4.41500       47.95900\nC         18.52800        5.58100       48.46700\nC         16.26900        4.96700       47.81600\nC         19.86200        5.69200       47.92900\nN         16.37000        1.50100       47.47800\nC         16.64300        1.98900       46.10700\nC         15.58500        3.00300       45.61300\nO         14.43500        3.01400       46.09700\nC         16.74900        0.83700       45.13000\nN         16.02100        3.90900       44.71300\nC         15.21200        4.98700       44.14900\nC         13.93600        4.48300       43.49600\nO         13.98900        3.52100       42.72500\nC         16.01500        5.75900       43.10700\nC         16.79100        6.93400       43.67900\nC         16.79700        8.07800       42.68400\nO         15.90000        8.95000       42.78300\nO         17.64000        8.05200       41.75600\nN         12.78600        5.13500       43.77100\nC         11.52300        4.69400       43.15100\nC         11.51100        4.87700       41.63700\nO         12.01300        5.88500       41.13200\nC         10.47700        5.59200       43.81600\nC         11.13500        6.07400       45.07700\nC         12.55600        6.27400       44.67900\nN         10.94800        3.89600       40.92700\nC         10.82500        3.93100       39.47500\nC          9.79700        4.95300       39.00400\nO          8.70900        5.06300       39.58000\nC         10.46600        2.55600       38.94500\nN         10.14800        5.69000       37.94900\nC          9.28500        6.66800       37.28600\nC          8.80800        6.02400       35.97600\nO          9.64300        5.55300       35.19500\nC         10.06000        7.96100       36.98100\nC         10.41400        8.76300       38.20300\nS         11.77500        9.87800       37.82200\nC         11.58900       11.03700       39.14400\nN          7.47200        5.99400       35.74100\nC          6.85900        5.43400       34.52700\nC          7.40000        6.11700       33.26200\nO          7.71500        7.31400       33.29900\nC          5.28900        5.46200       34.59200\nC          4.65700        4.47900       33.56600\nC          4.69500        6.88700       34.47600\nC          3.11400        4.32500       33.61300\nN          7.53900        5.35000       32.15700\nC          7.95800        5.91900       30.87900\nC          6.70400        6.55300       30.29500\nO          5.73300        5.84800       30.00400\nC          8.50300        4.84500       29.95600\nN          6.68800        7.89700       30.23900\nC          5.55100        8.69000       29.76200\nC          5.19600        8.39300       28.33100\nO          6.08600        8.07800       27.53400\nC          5.86600       10.18200       29.89100\nC          4.87900       10.95300       30.74100\nC          5.47700       12.21000       31.33400\nO          5.79300       13.14600       30.56100\nO          5.62500       12.26900       32.57600\nN          3.89700        8.50200       27.99400\nC          3.43500        8.34000       26.62800\nC          3.71600        9.68000       25.94600\nO          3.03200       10.67500       26.20200\nC          1.95900        7.97000       26.58000\nS          1.28000        7.87900       24.90600\nN          4.80500        9.71400       25.15900\nC          5.32300       10.89900       24.47500\nC          6.19800       10.53700       23.27000\nO          6.53800        9.36400       23.06600\nC          6.12600       11.78700       25.46100\nC          7.19900       11.03500       26.27000\nC          8.47400       11.84000       26.45900\nC          8.63300       12.33100       27.87100\nN         10.01300       12.81200       28.13100\nN          6.54600       11.56100       22.46700\nC          7.42200       11.42300       21.30600\nC          8.85500       11.30200       21.80600\nO          9.27100       12.04700       22.70600\nC          7.28900       12.60000       20.32600\nO          7.50200       13.82800       21.02700\nC          5.96800       12.61500       19.60400\nN          9.59600       10.34100       21.23500\nC         10.99400       10.09800       21.58000\nC         11.79200        9.78800       20.32600\nO         11.28300        9.11200       19.42100\nC         11.11800        8.93500       22.58100\nC         10.87600        9.32500       24.02800\nC         11.07200        8.15100       24.96200\nN         10.57800        8.44800       26.30300\nC          9.35700        8.15000       26.73500\nN          8.49400        7.53900       25.93500\nN          8.98900        8.46200       27.96900\nN         13.04700       10.27300       20.28300\nC         13.97700       10.02700       19.18600\nC         14.27800        8.53200       19.13700\nO         14.67000        7.93800       20.15500\nC         15.23500       10.88400       19.35300\nO         14.82500       12.24800       19.45500\nC         16.18600       10.72000       18.22200\nN         14.01700        7.92200       17.97100\nC         14.21900        6.50000       17.70200\nC         15.08100        6.32600       16.46200\nO         15.20200        7.25300       15.66100\nC         12.87100        5.79600       17.47700\nC         12.25400        5.23100       18.74100\nC         11.06000        4.31600       18.54300\nO         10.92900        3.70400       17.45900\nO         10.26100        4.18600       19.49900\nN         15.63900        5.12500       16.28000\nC         16.45500        4.80900       15.11700\nC         15.66000        3.91100       14.19100\nO         15.22600        2.82400       14.59000\nC         17.84600        4.23700       15.49700\nC         18.54900        3.63100       14.29200\nC         18.71400        5.31700       16.13200\nN         15.46600        4.38400       12.95300\nC         14.74100        3.68400       11.90400\nC         15.72000        3.07600       10.89800\nO         16.45500        3.80900       10.22900\nC         13.74200        4.63800       11.22500\nC         12.88700        4.00200       10.15400\nC         13.18600        4.18100        8.80900\nC         11.79500        3.21200       10.49200\nC         12.40900        3.57200        7.81900\nC         11.01000        2.61600        9.49900\nC         11.32200        2.79900        8.16900\nN         15.72700        1.73700       10.81300\nC         16.55800        0.92000        9.92700\nC         15.95900        0.94000        8.51600\nO         14.81500        0.50800        8.34300\nC         16.62000       -0.51700       10.49000\nC         17.33500       -1.55400        9.63700\nC         17.33300       -2.97100       10.18500\nO         16.72600       -3.21300       11.25700\nO         17.94300       -3.84900        9.53500\nN         16.72500        1.43200        7.51200\nC         16.24200        1.48600        6.13300\nC         16.33000        0.09400        5.52500\nO         17.40300       -0.36200        5.11000\nC         16.83700        2.63600        5.28100\nC         16.62400        4.00000        5.98400\nC         16.17400        2.66700        3.91100\nC         17.80400        4.84500        6.05800\nN         15.18000       -0.59600        5.57200\nC         14.97600       -1.97300        5.14900\nC         14.85500       -2.15900        3.65100\nO         14.30800       -1.31400        2.93400\nC         13.77100       -2.58000        5.86200\nO         13.96700       -2.58800        7.26700\nN         15.34400       -3.31800        3.20300\nC         15.35800       -3.78100        1.82400\nC         13.94800       -4.12500        1.32500\nO         13.71100       -4.05400        0.12400\nC         16.28100       -5.01200        1.70700\nC         17.74500       -4.74700        2.08400\nC         18.41000       -5.95900        2.71500\nN         19.81300       -6.08700        2.30700\nC         20.52100       -7.21400        2.36700\nN         19.96300       -8.33600        2.80600\nN         21.78600       -7.23100        1.96800\nN         13.02300       -4.48800        2.24100\nC         11.65100       -4.91000        1.93200\nC         10.63300       -3.80300        1.60100\nO          9.98000       -3.89600        0.56200\nC         11.09200       -5.83600        3.03400\nC         11.73600       -7.22100        3.11100\nC         11.14400       -8.02800        4.25400\nN         11.75300       -9.35300        4.38400\nC         11.39200      -10.26500        5.28400\nN         10.41500      -10.00900        6.14500\nN         12.00600      -11.44200        5.32700\nN         10.46000       -2.79800        2.49800\nC          9.45600       -1.72500        2.37000\nC          9.43500       -0.85800        1.09600\nO          8.36100       -0.69600        0.50500\nC          9.31700       -0.86900        3.64900\nC          8.65600       -1.52800        4.88300\nC          8.70100       -0.59600        6.08000\nC          7.20200       -1.93300        4.61400\nN         10.59700       -0.29500        0.68900\nC         10.71500        0.56200       -0.50400\nC         10.53900       -0.19400       -1.83400\nO          9.63100        0.13200       -2.61000\nC         11.96000        1.49300       -0.48600\nC         13.24100        0.75000       -0.04000\nC         11.70000        2.73600        0.36600\nC         14.42400        0.96400       -0.95100\nN         11.40100       -1.20400       -2.08800\nC         11.37300       -2.05000       -3.28900\nC         11.38900       -3.52500       -2.89300\nO         12.13800       -3.89600       -1.99100\nC         12.54700       -1.71900       -4.22600\nC         12.44800       -0.35400       -4.89100\nO         11.36000       -0.02400       -5.42100\nO         13.47100        0.36600       -4.92400\nN         10.56300       -4.36300       -3.54500\nC         10.49300       -5.79000       -3.21400\nC         11.10000       -6.74300       -4.25400\nO         10.83400       -7.94900       -4.21000\nC          9.07300       -6.19600       -2.79200\nC          8.96200       -6.44200       -1.29000\nC          7.52700       -6.54700       -0.81700\nN          6.83800       -5.25500       -0.86800\nC          5.61000       -5.03600       -0.41100\nN          4.91500       -6.02000        0.15000\nN          5.07100       -3.83200       -0.49900\nN         11.95500       -6.20800       -5.15500\nC         12.64300       -6.97700       -6.20100\nC         13.53600       -8.09300       -5.62400\nO         13.49100       -9.22300       -6.11600\nC         13.28400       -6.05200       -7.26300\nO         13.90500       -6.84400       -8.27800\nC         14.28300       -5.04900       -6.67200\nN         14.29700       -7.77000       -4.55100\nC         15.18700       -8.64500       -3.76600\nC         15.81900       -7.82400       -2.62000\nO         15.60500       -6.61100       -2.55200\nC         16.28400       -9.31800       -4.64300\nC         16.73100      -10.71000       -4.19600\nO         16.33500      -11.24100       -3.14800\nN         17.57200      -11.34300       -4.99700\nN         16.57200       -8.48900       -1.71500\nC         17.25900       -7.85300       -0.58700\nC         18.70500       -7.48500       -0.92200\nO         19.20100       -6.48800       -0.40400\nC         17.23100       -8.76200        0.63000\nN         19.37900       -8.28700       -1.78200\nC         20.77400       -8.10200       -2.20300\nC         21.06200       -6.79200       -2.95300\nO         21.36800       -6.76400       -4.15200\nC         21.33000       -9.34400       -2.91300\nC         20.43400       -9.93100       -3.97600\nO         19.71100       -9.22400       -4.70000\nN         20.51300      -11.24700       -4.13400\nN         20.93900       -5.70600       -2.19100\nC         21.19600       -4.31700       -2.51200\nC         21.33500       -3.62800       -1.16500\nO         20.53900       -3.87200       -0.25600\nC         20.10300       -3.68400       -3.41200\nC         18.79600       -3.26100       -2.78100\nC         18.67700       -2.03300       -2.13800\nC         17.66100       -4.05300       -2.89700\nC         17.46200       -1.62800       -1.58300\nC         16.44400       -3.64400       -2.34500\nC         16.35300       -2.43500       -1.69100\nN         22.37900       -2.83700       -1.00500\nC         22.58200       -2.15700        0.25600\nC         22.16100       -0.72300        0.16700\nO         22.15000       -0.14300       -0.91200\nC         24.01500       -2.31200        0.76200\nC         24.43500       -3.74600        1.09600\nC         25.88800       -3.79900        1.41600\nC         23.61800       -4.32400        2.25600\nN         21.73500       -0.17700        1.28900\nC         21.26200        1.18600        1.35100\nC         22.24700        2.01800        2.15200\nO         22.84500        1.52800        3.10800\nC         19.81400        1.27100        1.91300\nC         19.29700        2.70800        1.94900\nC         18.86000        0.39000        1.12500\nN         22.45100        3.26000        1.71800\nC         23.24200        4.23400        2.43900\nC         22.41500        5.53200        2.62600\nO         21.91800        6.07300        1.63300\nC         24.61500        4.50400        1.80000\nC         25.31200        5.65800        2.45900\nC         25.23900        6.97400        2.10100\nC         26.03700        5.61600        3.68900\nN         25.90700        7.75200        3.01800\nC         26.39900        6.94400        4.00900\nC         26.42700        4.57900        4.55100\nC         27.15700        7.25700        5.13300\nC         27.15400        4.89700        5.67600\nC         27.51500        6.22100        5.95000\nN         22.28300        6.06500        3.87000\nC         22.76000        5.49800        5.15200\nC         21.94100        4.26500        5.58900\nO         20.83200        4.09400        5.07400\nC         22.70300        6.69100        6.10300\nC         21.65000        7.60000        5.54800\nC         21.49800        7.29700        4.07800\nN         22.47800        3.32500        6.41700\nC         21.68300        2.12100        6.76500\nC         20.49500        2.39200        7.67900\nO         19.52900        1.62600        7.68600\nC         22.70100        1.17200        7.41500\nC         24.01000        1.89800        7.42900\nC         23.78600        3.32800        7.10400\nN         20.58000        3.47900        8.45700\nC         19.54400        3.90400        9.38500\nC         19.59000        5.41100        9.61300\nO         20.62200        6.04900        9.36200\nC         19.62600        3.13400       10.69900\nS         21.03300        3.59600       11.73100\nN         18.45300        5.96700       10.08400\nC         18.22600        7.39100       10.34600\nC         17.37600        7.56700       11.63200\nO         16.68200        6.64100       12.04600\nC         17.52100        8.07000        9.13200\nC         18.39500        8.12200        7.88500\nC         16.14000        7.46500        8.85800\nN         17.40700        8.76400       12.22500\nC         16.59500        9.10400       13.39400\nC         15.16300        9.45400       12.95500\nO         14.97300       10.09900       11.91800\nC         17.18600       10.31200       14.14800\nC         18.41100       10.01400       14.99500\nC         18.93600       11.17900       15.81000\nO         18.67300       12.34400       15.43000\nO         19.67100       10.92700       16.79100\nN         14.15900        9.02600       13.75100\nC         12.73000        9.32700       13.56400\nC         12.11600        9.76000       14.90300\nO         12.78100        9.68100       15.94200\nC         11.88700        8.20600       12.87600\nC         12.24800        8.03600       11.40300\nC         11.95200        6.87900       13.62800\nN         10.85600       10.23500       14.87400\nC         10.11000       10.59800       16.08100\nC          8.97900        9.60000       16.21300\nO          8.18600        9.44000       15.27900\nC          9.57300       12.04100       16.04000\nC         10.63600       13.13700       16.12100\nC         11.63300       12.94400       17.24000\nO         11.29800       12.88800       18.43100\nN         12.88800       12.84100       16.86500\nN          8.94300        8.85900       17.33500\nC          7.91200        7.84300       17.54900\nC          7.23900        7.93900       18.91500\nO          7.74700        8.60400       19.82300\nC          8.47400        6.42100       17.33900\nC          8.95500        6.11400       15.92900\nC          7.90000        5.42700       15.09800\nN          8.37400        5.22200       13.73300\nC          7.64400        5.43800       12.64600\nN          6.39100        5.86700       12.75300\nN          8.16300        5.23900       11.44200\nN          6.09700        7.26000       19.05200\nC          5.35900        7.19800       20.29600\nC          5.81500        5.98300       21.04900\nO          5.75000        4.85800       20.54200\nC          3.85100        7.18100       20.06100\nS          3.15700        8.78000       19.56400\nN          6.31700        6.21900       22.25100\nC          6.77700        5.16200       23.13600\nC          6.39900        5.55800       24.55700\nO          6.18700        6.74500       24.83800\nC          8.28300        4.93700       22.99400\nO          9.03200        6.12200       23.21200\nN          6.28400        4.56500       25.42800\nC          5.92400        4.79900       26.81500\nC          4.73100        4.00200       27.28600\nO          4.20500        3.15100       26.55700\nN          4.31300        4.28200       28.52800\nC          3.23100        3.58400       29.20400\nC          2.08400        4.44100       29.66000\nO          2.18800        5.66700       29.76900\nC          3.76100        2.72900       30.34900\nS          4.59900        1.22300       29.81500\nN          0.98800        3.74600       29.98700\nC         -0.24700        4.31800       30.48700\nC         -0.53700        3.81200       31.88400\nO         -0.35200        2.62600       32.18800\nC         -1.39600        4.03300       29.52700\nS         -1.14900        4.72200       27.87300\nN         -0.97400        4.74700       32.73600\nC         -1.33900        4.54400       34.13700\nC         -2.52700        3.59200       34.24900\nO         -2.53900        2.71600       35.11900\nC         -1.65200        5.88700       34.77500\nC         -0.51800        6.86200       34.63600\nO          0.41300        6.83400       35.43200\nN         -0.55100        7.68600       33.57900\nN         -3.50400        3.75300       33.33700\nC         -4.69500        2.91800       33.26900\nC         -4.31700        1.60800       32.61000\nO         -3.46400        1.58300       31.72200\nC         -5.82700        3.63800       32.52100\nC         -6.11400        5.05200       33.01500\nO         -5.90400        5.40200       34.18900\nN         -6.60100        5.90000       32.11500\nN         -4.91800        0.51800       33.08500\nC         -4.67400       -0.85600       32.63100\nC         -5.03400       -1.07600       31.15100\nO         -4.15600       -1.39200       30.34300\nC         -5.46800       -1.85600       33.49400\nC         -5.51100       -1.55300       34.99000\nC         -6.34400       -2.54200       35.81200\nN         -6.24900       -3.94000       35.36700\nC         -5.13500       -4.67200       35.33800\nN         -3.97200       -4.13900       35.68800\nN         -5.17100       -5.92900       34.91600\nN         -6.33300       -0.91600       30.82100\nC         -6.97900       -1.11100       29.51300\nC         -6.28900       -0.44100       28.32000\nO         -6.22800       -1.01500       27.23100\nC         -8.46100       -0.66100       29.59000\nC         -8.69500        0.78000       30.04100\nO         -8.08600        1.28400       30.99900\nN         -9.62000        1.46500       29.37400\nN         -5.77900        0.76600       28.55400\nC         -5.16900        1.69700       27.61300\nC         -3.74300        1.30300       27.10400\nO         -3.03500        0.54300       27.76800\nC         -5.20800        3.10000       28.28600\nC         -4.73300        4.17500       27.34600\nC         -6.61000        3.44100       28.78600\nN         -3.35700        1.83100       25.90700\nC         -2.05700        1.69600       25.22500\nC         -1.65300        3.06500       24.64900\nO         -2.52300        3.79600       24.16900\nC         -2.13900        0.68700       24.06200\nC         -2.02800       -0.78600       24.45500\nC         -1.79400       -1.71000       23.26700\nO         -1.98500       -1.35300       22.09400\nN         -1.37800       -2.93600       23.55100\nN         -0.34000        3.39700       24.66900\nC          0.20600        4.64300       24.11600\nC          0.11800        4.60700       22.58600\nO          0.57100        3.63500       21.97100\nC          1.64100        4.87000       24.58900\nS          2.37700        6.42100       24.00500\nN         -0.48700        5.65000       21.97300\nC         -0.70100        5.70900       20.52300\nC         -0.51800        7.10000       19.91000\nO         -0.79100        8.09400       20.58600\nC         -2.10300        5.18100       20.18100\nC         -2.16300        3.68300       19.99600\nC         -3.59700        3.23300       19.98300\nN         -3.67000        1.78000       20.04700\nC         -4.12500        1.02100       19.05900\nN         -4.57500        1.57700       17.94000\nN         -4.15600       -0.29700       19.18900\nN         -0.11400        7.18800       18.61200\nC          0.02500        8.51600       17.98400\nC         -1.31000        9.16000       17.61800\nO         -2.20400        8.48500       17.09200\nC          0.90000        8.25000       16.75800\nC          0.72700        6.81400       16.45400\nC          0.24300        6.09900       17.67200\nN         -1.44600       10.47100       17.92100\nC         -2.63900       11.27200       17.61500\nC         -2.55600       11.64300       16.13400\nO         -3.51400       11.42000       15.38800\nC         -2.73800       12.50800       18.53800\nO         -2.57900       12.10400       19.89600\nC         -4.06100       13.26000       18.37400\nN         -1.40000       12.20200       15.71700\nC         -1.12000       12.55100       14.33000\nC          0.32100       12.25000       13.92100\nO          1.25100       12.36400       14.73100\nC         -1.59300       13.97300       13.94300\nC         -0.66300       15.12400       14.33000\nC         -0.87600       15.64100       15.73300\nO         -1.72200       15.15800       16.49700\nN         -0.11000       16.65900       16.09900\nN          0.47600       11.82700       12.66400\nC          1.75100       11.48300       12.04600\nC          2.10200       12.52600       10.97300\nO          1.21900       13.24300       10.49600\nC          1.78400       10.02300       11.47900\nC          1.51200        8.99200       12.56500\nC          0.81300        9.83600       10.31400\nN          3.38400       12.59500       10.59300\nC          3.88500       13.47600        9.54000\nC          4.76200       12.64600        8.61600\nO          5.67900       11.96200        9.08500\nC          4.68600       14.65500       10.12500\nC          5.10800       15.72200        9.11400\nC          6.10700       16.69700        9.72300\nO          7.09300       16.30500       10.36500\nN          5.88600       17.98100        9.51500\nN          4.46400       12.68300        7.31200\nC          5.26600       11.97700        6.32700\nC          6.40900       12.89100        5.89500\nO          6.18100       14.05700        5.56800\nC          4.42900       11.45600        5.14300\nC          3.46300       10.30000        5.45700\nC          2.76600        9.81900        4.20600\nC          4.18600        9.11700        6.09100\nN          7.64600       12.37500        5.99400\nC          8.89000       13.09300        5.71400\nC          9.77100       12.32400        4.71000\nO         10.37400       11.32400        5.08800\nC          9.63000       13.34900        7.05100\nC         10.96900       14.05400        6.92000\nC         11.52100       14.41100        8.27800\nN         12.19000       13.28400        8.92500\nC         12.82000       13.36200       10.09400\nN         12.86900       14.51300       10.75500\nN         13.40000       12.28900       10.61400\nN          9.88300       12.76200        3.44100\nC         10.72900       12.00700        2.49500\nC         12.20500       12.37800        2.56000\nO         12.55900       13.55200        2.72700\nC         10.11300       12.31900        1.12800\nC          9.44700       13.66000        1.31100\nC          9.24900       13.92800        2.79200\nN         13.06900       11.36300        2.45600\nC         14.52200       11.54700        2.45500\nC         15.15900       10.81500        1.26900\nO         14.62200        9.80100        0.80400\nC         15.23800       11.23000        3.80700\nC         14.80300       12.18300        4.92300\nC         15.05900        9.78000        4.22400\nN         16.29900       11.33800        0.79000\nC         17.03600       10.73900       -0.31700\nC         18.12600        9.83700        0.23600\nO         18.91000       10.25400        1.09000\nC         17.63500       11.80800       -1.25800\nC         18.09100       11.23700       -2.61900\nC         19.14800       12.06400       -3.29100\nO         18.98900       13.26600       -3.51700\nN         20.24300       11.42700       -3.64700\nN         18.14600        8.59000       -0.23700\nC         19.13900        7.57300        0.10600\nC         19.72900        7.02200       -1.21000\nO         19.33200        7.44300       -2.30400\nC         18.57700        6.43400        1.02200\nC         18.10800        6.96700        2.37100\nC         17.47800        5.62200        0.33900\nN         20.65900        6.08100       -1.10200\nC         21.20500        5.44300       -2.28000\nC         21.11400        3.94100       -2.21100\nO         21.35000        3.34500       -1.16200\nC         22.61200        5.93400       -2.63700\nC         23.63000        5.78500       -1.52800\nC         25.00000        6.11000       -2.04400\nN         25.29900        7.53200       -1.91800\nC         26.24000        8.15900       -2.61200\nN         26.95500        7.50200       -3.51900\nN         26.46200        9.45000       -2.42000\nN         20.69800        3.35300       -3.32100\nC         20.58400        1.91500       -3.51000\nC         21.93900        1.49400       -4.08000\nO         22.42700        2.11900       -5.02300\nC         19.41200        1.61900       -4.47100\nC         19.16400        0.15500       -4.80300\nC         17.84600       -0.00700       -5.56500\nC         17.51500       -1.44200       -5.89700\nN         16.32100       -1.53600       -6.78500\nN         22.59500        0.52000       -3.44500\nC         23.89500        0.02700       -3.89400\nC         23.70400       -1.43000       -4.32000\nO         23.77400       -2.33400       -3.48500\nC         25.04000        0.23800       -2.85300\nC         25.16100        1.70500       -2.42200\nC         26.37600       -0.24200       -3.40000\nC         24.73500        1.98900       -1.02300\nN         23.41000       -1.64700       -5.61500\nC         23.20700       -2.99000       -6.16900\nC         24.53300       -3.69600       -6.38900\nO         25.36900       -3.21400       -7.15100\nC         22.36300       -2.94900       -7.44800\nC         20.88900       -2.73000       -7.16600\nC         20.04800       -2.36500       -8.37000\nO         19.85400       -1.15100       -8.61600\nO         19.56100       -3.29600       -9.05100\nN         24.72300       -4.83800       -5.70500\nC         25.94200       -5.66000       -5.71900\nC         25.88800       -6.85000       -6.70300\nO         26.86300       -7.07800       -7.41800\nC         26.27100       -6.09600       -4.24800\nC         26.62300       -4.89200       -3.31000\nC         27.26900       -7.25800       -4.14500\nC         27.87300       -4.04200       -3.62600\nN         24.77200       -7.60000       -6.74000\nC         24.62200       -8.79600       -7.58800\nC         24.44800       -8.55400       -9.10300\nO         23.76100       -9.31600       -9.79200\nC         23.64700       -9.85200       -7.00600\nC         24.17100      -10.42600       -5.69300\nC         22.24300       -9.28300       -6.84700\nN         25.12700       -7.53500       -9.62000\nC         25.10400       -7.16400      -11.02400\nC         26.47800       -7.30200      -11.64900\nO         27.45200       -7.51500      -10.92200\nC         24.54700       -5.73100      -11.17500\nC         23.08300       -5.60400      -10.73700\nC         22.24600       -6.18100      -11.91100\nN         20.79700       -6.12800      -11.72500\nC         19.94100       -6.87800      -12.41000\nN         20.38400       -7.76600      -13.29200\nN         18.63600       -6.77100      -12.19600\nN         26.55900       -7.18800      -12.99700\nC         27.81400       -7.26600      -13.75700\nC         28.81900       -6.22600      -13.22500\nO         30.02200       -6.47800      -13.21600\nC         27.55600       -7.04500      -15.24400\nC         26.91600       -8.24600      -15.93400\nC         26.68900       -7.98200      -17.40500\nC         25.58100       -8.83200      -18.01500\nN         26.06600      -10.13700      -18.55100\nN         28.31000       -5.07400      -12.74900\nC         29.08400       -4.00100      -12.14200\nC         28.28200       -3.29900      -11.04300\nO         27.05100       -3.37300      -11.07000\nC         29.58700       -3.02200      -13.21300\nC         28.54800       -2.04900      -13.70900\nC         29.03800       -1.36700      -14.95500\nC         27.92000       -0.57200      -15.52100\nN         28.43600        0.40200      -16.49000\nN         28.94500       -2.61000      -10.08800\nC         28.19300       -1.87700       -9.06300\nC         27.31900       -0.75100       -9.62600\nO         27.67900       -0.12800      -10.61200\nC         29.29500       -1.32500       -8.16100\nC         30.49300       -1.23500       -9.01500\nC         30.40000       -2.42700       -9.90700\nN         26.16400       -0.51400       -9.00600\nC         25.22000        0.52700       -9.40400\nC         24.82800        1.33800       -8.16900\nO         24.37000        0.77600       -7.17100\nC         23.99600       -0.04500      -10.18900\nC         24.44800       -0.68900      -11.53200\nC         22.90100        1.04600      -10.40100\nC         23.48900       -1.59000      -12.23000\nN         25.05600        2.65600       -8.22800\nC         24.77700        3.59500       -7.13500\nC         23.62400        4.51600       -7.57400\nO         23.83600        5.58400       -8.15300\nC         26.05900        4.36700       -6.73100\nC         27.29100        3.49200       -6.58900\nC         28.16400        3.30100       -7.66100\nC         27.56200        2.82900       -5.39400\nC         29.29000        2.47800       -7.53300\nC         28.70000        2.03000       -5.25900\nC         29.55800        1.86200       -6.32600\nN         22.39500        4.04100       -7.34300\nC         21.14600        4.69600       -7.72800\nC         20.55400        5.50400       -6.57800\nO         20.58300        5.05100       -5.44100\nC         20.15200        3.60800       -8.20000\nC         18.92400        4.10400       -8.94600\nC         18.42400        3.03500       -9.92400\nC         16.92400        2.93900       -9.97800\nN         16.29900        4.07600      -10.71800\nN         20.00000        6.68700       -6.88100\nC         19.30500        7.53000       -5.90300\nC         17.95900        6.86800       -5.61400\nO         17.37500        6.24500       -6.50900\nC         19.02700        8.93500       -6.46600\nC         20.25800        9.75600       -6.75500\nC         19.89700       11.06500       -7.40300\nC         21.15400       11.80300       -7.75900\nN         20.97600       12.69200       -8.93600\nN         17.47000        6.99700       -4.37700\nC         16.17600        6.45000       -3.97300\nC         15.55400        7.31900       -2.89300\nO         16.26100        7.78300       -1.99600\nC         16.33200        5.02000       -3.48200\nN         14.24200        7.56800       -2.99500\nC         13.52000        8.36300       -1.99700\nC         12.78700        7.42000       -1.03000\nO         12.14800        6.46500       -1.47700\nC         12.63800        9.43500       -2.66400\nO         13.42000       10.12400       -3.64100\nC         12.05700       10.44500       -1.65400\nN         12.93700        7.65300        0.28500\nC         12.28800        6.85600        1.32700\nC         11.43900        7.76200        2.24200\nO         11.93500        8.77000        2.74400\nC         13.25400        5.88400        2.07200\nC         14.47100        6.60100        2.63100\nC         12.53800        5.09500        3.16600\nN         10.15100        7.42100        2.40600\nC          9.20000        8.18100        3.22400\nC          9.25400        7.77700        4.69600\nO          8.83100        6.67400        5.06200\nC          7.78000        8.14600        2.62900\nO          7.62400        6.99000        1.79700\nC          7.47600        9.38900        1.82700\nN          9.77400        8.67800        5.53600\nC          9.87000        8.43900        6.97100\nC          8.60500        8.92600        7.66800\nO          8.15000       10.04100        7.40600\nC         11.09800        9.14400        7.57700\nC         12.47600        8.82800        7.00700\nC         13.52000        9.69700        7.65500\nC         12.83000        7.37500        7.18700\nN          8.04100        8.09000        8.56100\nC          6.85300        8.43000        9.34600\nC          7.31400        8.95400       10.71000\nO          8.01700        8.25400       11.44000\nC          5.90700        7.21200        9.48600\nC          4.50500        7.54800        9.98500\nC          3.63600        6.35200       10.33100\nO          2.72300        6.02200        9.54200\nO          3.85700        5.75200       11.40700\nN          6.97100       10.21200       11.01500\nC          7.28500       10.85700       12.28900\nC          5.98400       11.07100       13.06800\nO          4.95800       11.38800       12.46700\nC          7.99100       12.21100       12.06500\nC          9.50600       12.20100       12.13500\nO         10.08800       11.10800       12.28100\nO         10.11300       13.29800       12.07000\nN          6.01900       10.86400       14.39400\nC          4.86400       11.08300       15.26700\nC          5.03200       12.46100       15.89900\nO          6.14200       12.81500       16.30300\nC          4.76700       10.00000       16.35300\nC          4.51300        8.61100       15.84200\nN          4.54800        7.52200       16.69000\nC          4.23100        8.17700       14.59400\nC          4.29300        6.46700       15.93800\nN          4.09500        6.81100       14.67100\nN          3.95700       13.26100       15.94800\nC          4.02900       14.61300       16.50900\nC          3.40600       14.71600       17.90100\nO          3.89600       15.48700       18.73100\nC          3.41700       15.64400       15.54400\nC          4.12200       15.79400       14.18600\nC          3.12700       16.11900       13.09600\nC          5.25300       16.83100       14.24400\nN          2.33300       13.93300       18.15500\nC          1.62600       13.90000       19.43300\nC          1.23400       12.48000       19.80400\nO          0.87200       11.67400       18.93900\nC          0.39200       14.78400       19.37600\nN          1.32200       12.17300       21.09900\nC          0.98600       10.86100       21.64400\nC         -0.02200       11.04700       22.75300\nO          0.03400       12.03700       23.49000\nC          2.23000       10.13800       22.16200\nS          3.63500       10.12200       21.01700\nN         -0.93500       10.08300       22.88200\nC         -1.92900       10.07100       23.94500\nC         -2.36300        8.66600       24.29800\nO         -2.40000        7.77700       23.44400\nC         -3.12400       11.01600       23.69200\nC         -4.01100       10.67400       22.49100\nC         -5.36900       11.38400       22.53500\nC         -5.44500       12.72400       21.82600\nN         -6.83600       13.08300       21.44800\nN         -2.66900        8.46500       25.57600\nC         -3.12700        7.18600       26.07700\nC         -4.59300        6.99200       25.62900\nO         -5.47900        7.72200       26.08600\nC         -2.96100        7.13000       27.59400\nS         -1.27500        6.73500       28.13800\nN         -4.83000        6.04900       24.68300\nC         -6.16000        5.80600       24.10900\nC         -6.90200        4.52200       24.49400\nO         -6.33400        3.42500       24.48900\nC         -6.18400        6.05200       22.59600\nC         -6.17800        7.53400       22.24100\nC         -6.44400        7.88700       20.79100\nO         -6.20700        7.02900       19.90900\nO         -6.86600        9.03600       20.53400\nN         -8.20800        4.69300       24.79200\nC         -9.16000        3.66700       25.22200\nC         -9.41100        2.51300       24.22900\nO         -9.88100        2.73300       23.10800\nC        -10.42600        4.31000       25.84300\nO        -11.28700        3.28500       26.34000\nC        -11.19000        5.22900       24.87100\nN         -9.08500        1.28100       24.67600\nC         -9.24900       -0.00500       23.98300\nC         -9.41000       -1.13400       25.02300\nO         -9.00400       -0.99500       26.17900\nC         -8.12600       -0.28300       22.93500\nC         -7.73200       -1.76000       22.88500\nC         -8.53900        0.20500       21.54800\nN        -19.42500       16.76800       42.51400\nC        -18.88600       16.46800       43.83500\nC        -18.83100       14.96800       44.09600\nO        -19.86800       14.28800       44.08700\nC        -19.66200       17.21000       44.93900\nC        -19.36000       18.70600       44.99800\nC        -17.97800       19.09900       45.50200\nO        -17.46900       18.42100       46.42300\nO        -17.38800       20.04800       44.93700\nN        -17.60100       14.45700       44.28400\nC        -17.28700       13.05300       44.53900\nC        -17.98100       12.56500       45.84900\nO        -17.98200       13.27400       46.86500\nC        -15.74900       12.83900       44.46000\nC        -14.98900       13.56900       45.56200\nC        -15.36500       11.37300       44.40100\nN        -18.67800       11.41300       45.77700\nC        -19.46400       10.88300       46.89200\nC        -19.75600        9.38300       46.76300\nO        -19.78300        8.83900       45.65600\nC        -20.79900       11.64300       46.95600\nC        -21.47700       11.68800       48.31800\nC        -22.74200       12.51800       48.31100\nO        -23.07700       13.17100       49.30200\nN        -23.47500       12.52600       47.19600\nN        -19.97600        8.73200       47.92200\nC        -20.34400        7.33100       48.09500\nC        -21.44500        7.30600       49.17900\nO        -21.35500        7.98600       50.20600\nC        -19.14000        6.44900       48.52700\nC        -17.96400        6.31000       47.54800\nC        -16.78300        5.63000       48.20700\nC        -18.36700        5.56300       46.27000\nN        -22.51500        6.58300       48.90800\nC        -23.64500        6.50200       49.82000\nC        -24.07300        5.06300       49.93000\nO        -24.53100        4.47800       48.96300\nC        -24.84300        7.41200       49.37200\nC        -26.06400        7.19800       50.27500\nC        -24.45900        8.89900       49.36600\nN        -23.95200        4.52100       51.13300\nC        -24.35300        3.16500       51.48800\nC        -25.77800        3.18400       51.96400\nO        -26.23900        4.12800       52.61400\nC        -23.47800        2.59500       52.64000\nC        -21.98300        2.52100       52.31200\nC        -21.18000        3.69800       52.84500\nO        -21.76900        4.77300       53.12400\nO        -19.95400        3.51300       53.02700\nN        -26.46300        2.09100       51.67900\nC        -27.83600        1.87600       52.08300\nC        -28.07300        0.38000       52.21300\nO        -27.23700       -0.42200       51.77700\nC        -28.79900        2.49100       51.06300\nO        -28.49900        2.05800       49.75100\nN        -29.20400        0.01700       52.80200\nC        -29.58100       -1.38200       52.91300\nC        -29.38300       -1.96100       54.29000\nO        -29.79800       -3.10300       54.54000\nN        -28.73700       -1.18100       55.17900\nC        -28.51900       -1.60100       56.55300\nC        -29.82700       -1.62000       57.31500\nO        -30.73700       -0.81900       57.05800\nN        -29.90800       -2.53300       58.25200\nC        -31.07300       -2.68100       59.09700\nC        -30.84400       -3.72700       60.14500\nO        -29.74300       -4.26100       60.28500\nN        -31.89700       -3.99000       60.90300\nC        -31.94600       -4.99700       61.93300\nC        -32.33400       -6.25800       61.21000\nO        -33.27300       -6.28200       60.41100\nC        -32.99100       -4.61200       62.99300\nC        -33.39600       -5.64400       64.04500\nC        -32.19700       -6.11500       64.88700\nC        -34.51300       -5.08700       64.91100\nN        -31.53200       -7.26400       61.39900\nC        -31.72900       -8.56200       60.78900\nC        -31.40300       -9.57000       61.87200\nO        -30.76700       -9.26600       62.88300\nC        -30.93300       -8.72100       59.44600\nC        -29.41800       -8.80800       59.69000\nC        -31.42600       -9.92200       58.63600\nN        -31.88800      -10.75600       61.66500\nC        -31.84100      -11.86700       62.58500\nC        -30.75800      -12.90300       62.18300\nO        -30.44100      -12.99200       60.99200\nC        -33.20700      -12.46300       62.54300\nC        -33.69800      -12.98200       63.86800\nC        -35.17100      -13.16400       63.81600\nO        -35.89900      -12.44200       63.12500\nN        -35.64200      -14.12400       64.57300\nN        -30.17800      -13.68600       63.13000\nC        -29.10400      -14.62000       62.75000\nC        -29.55900      -15.68800       61.76000\nO        -30.68300      -16.18400       61.86700\nC        -28.61200      -15.17500       64.09300\nC        -29.09600      -14.19800       65.12800\nC        -30.40000      -13.71300       64.58800\nN        -28.70500      -15.95800       60.77100\nC        -28.99000      -16.89000       59.69000\nC        -29.69700      -16.20600       58.53100\nO        -29.82300      -16.77700       57.44200\nN        -30.14900      -14.97300       58.76800\nC        -30.82600      -14.15100       57.77700\nC        -29.88800      -13.53900       56.75800\nO        -28.66100      -13.68500       56.84200\nN        -30.47300      -12.84000       55.77900\nC        -29.71400      -12.21300       54.71600\nC        -30.06300      -10.73700       54.50400\nO        -31.16900      -10.29100       54.81700\nC        -29.82300      -13.01800       53.42200\nO        -30.96500      -12.67500       52.65000\nN        -29.08800       -9.98100       53.98300\nC        -29.21200       -8.55800       53.70500\nC        -28.32600       -8.22200       52.53300\nO        -27.19900       -8.71100       52.46100\nC        -28.72000       -7.72600       54.91900\nC        -29.69600       -6.93300       55.79100\nC        -28.94600       -5.90200       56.60200\nC        -30.75500       -6.24100       54.96400\nN        -28.80400       -7.35500       51.64000\nC        -27.98800       -6.87400       50.54500\nC        -27.76000       -5.38000       50.74800\nO        -28.72400       -4.61800       50.88800\nC        -28.59500       -7.16400       49.16500\nC        -27.64400       -6.75700       48.02500\nC        -28.18000       -6.96300       46.62100\nN        -29.47700       -6.33100       46.34000\nC        -29.70500       -5.09800       45.88200\nN        -28.73000       -4.21100       45.84200\nN        -30.94400       -4.70000       45.62400\nN        -26.47600       -4.97400       50.76500\nC        -26.04900       -3.58900       50.91800\nC        -25.73600       -3.02400       49.56100\nO        -25.18000       -3.71600       48.71300\nC        -24.79200       -3.46800       51.80500\nC        -24.86200       -4.03100       53.20900\nC        -23.58000       -3.76700       53.93300\nC        -26.05400       -3.45900       54.00200\nN        -26.06700       -1.75300       49.36600\nC        -25.78900       -1.04800       48.13300\nC        -24.92800        0.16400       48.43500\nO        -24.92800        0.67400       49.55400\nC        -27.09000       -0.61500       47.46600\nO        -27.86000       -1.75300       47.12300\nN        -24.16100        0.59700       47.45000\nC        -23.32500        1.76800       47.57100\nC        -23.42300        2.53200       46.27000\nO        -22.97100        2.05400       45.22900\nC        -21.88500        1.39100       47.91300\nS        -20.73800        2.79200       47.90400\nN        -24.04900        3.70400       46.31800\nC        -24.22600        4.53900       45.14400\nC        -23.06600        5.50700       44.99500\nO        -22.80300        6.31500       45.88700\nC        -25.54900        5.28900       45.22200\nN        -22.35600        5.40300       43.86700\nC        -21.22800        6.27200       43.53200\nC        -21.69500        7.40900       42.63800\nO        -22.53400        7.19200       41.75100\nC        -20.14600        5.47900       42.83200\nN        -21.16100        8.62200       42.88000\nC        -21.47100        9.81600       42.09300\nC        -20.29400       10.79300       42.05200\nO        -19.45100       10.77800       42.95700\nC        -22.74200       10.49500       42.60200\nO        -22.65900       10.87000       43.96800\nN        -20.23300       11.60000       40.98600\nC        -19.20800       12.62200       40.79100\nC        -17.90400       12.14500       40.18200\nO        -16.95300       12.92500       40.05800\nN        -17.83900       10.85400       39.80300\nC        -16.64400       10.24700       39.22700\nC        -16.98800        9.00300       38.40900\nO        -18.08900        8.47300       38.51700\nC        -15.59300        9.92900       40.32900\nC        -15.93000        8.76300       41.23100\nC        -15.39000        7.50600       40.99900\nC        -16.79300        8.92200       42.30900\nC        -15.69900        6.43400       41.83000\nC        -17.10600        7.84900       43.13400\nC        -16.55400        6.61300       42.89400\nN        -16.03200        8.53500       37.59600\nC        -16.21100        7.36400       36.75900\nC        -16.00100        6.12900       37.61000\nO        -14.87200        5.66800       37.77700\nC        -15.32800        7.44900       35.49400\nO        -15.49600        8.74000       34.89600\nC        -15.64800        6.33700       34.47900\nN        -17.10500        5.60900       38.16000\nC        -17.13900        4.43600       39.03200\nC        -16.45900        3.20300       38.44100\nO        -15.82100        2.46700       39.18700\nC        -18.58600        4.14600       39.48200\nC        -18.83200        2.85300       40.22700\nC        -18.46800        2.71600       41.56100\nC        -19.44300        1.77600       39.59700\nC        -18.70600        1.52600       42.25200\nC        -19.68700        0.59300       40.29200\nC        -19.31500        0.47500       41.61400\nN        -16.57700        2.99000       37.11700\nC        -15.99700        1.83800       36.41400\nC        -14.45500        1.78900       36.40600\nO        -13.89100        0.70400       36.25000\nC        -16.53400        1.74100       34.98600\nO        -16.42100        2.96700       34.27600\nN        -13.77600        2.94400       36.53600\nC        -12.30900        2.98100       36.52100\nC        -11.64400        2.64400       37.87900\nO        -10.41500        2.51300       37.94400\nC        -11.81100        4.32400       35.98700\nO        -12.09800        4.54000       34.61500\nN        -12.45000        2.48300       38.95200\nC        -11.88900        2.23900       40.27600\nC        -12.23100        0.93000       40.95400\nO        -13.38700        0.48200       40.92300\nC        -12.20500        3.40000       41.20900\nC        -11.75500        4.75200       40.69800\nC        -12.61100        5.56000       39.96200\nC        -10.51100        5.27200       41.04700\nC        -12.21600        6.82000       39.51700\nC        -10.10500        6.53200       40.61000\nC        -10.96300        7.30900       39.84600\nO        -10.58600        8.56700       39.42600\nN        -11.21400        0.34000       41.61900\nC        -11.38700       -0.84100       42.45100\nC        -12.07600       -0.34200       43.74200\nO        -11.93500        0.83400       44.12900\nC        -10.04900       -1.46600       42.77800\nN        -12.87600       -1.21600       44.35700\nC        -13.64400       -0.86800       45.54300\nC        -13.49400       -1.90800       46.62500\nO        -13.26900       -3.08400       46.33400\nC        -15.14200       -0.70900       45.17700\nC        -15.43000        0.41600       44.18600\nS        -15.40300        2.02100       44.98200\nC        -15.47000        3.03100       43.62800\nN        -13.63800       -1.47200       47.88100\nC        -13.63900       -2.35600       49.03200\nC        -14.79800       -2.02100       49.95400\nO        -15.30200       -0.90000       49.95100\nC        -12.32400       -2.25500       49.81200\nO        -11.45700       -3.36500       49.60900\nN        -15.20700       -3.00900       50.74900\nC        -16.13500       -2.87200       51.84500\nC        -15.27400       -3.03100       53.09900\nO        -14.38800       -3.89300       53.15000\nC        -17.28000       -3.89800       51.80000\nC        -18.36500       -3.57700       50.80500\nC        -18.50900       -4.10700       49.55700\nC        -19.50300       -2.72000       51.00800\nN        -19.65200       -3.63300       48.96400\nC        -20.27800       -2.76800       49.82500\nC        -19.94800       -1.91700       52.07800\nC        -21.46300       -2.03900       49.67600\nC        -21.11700       -1.18900       51.92300\nC        -21.85300       -1.24200       50.73100\nN        -15.46700       -2.12100       54.07100\nC        -14.74800       -2.09000       55.35100\nC        -15.81800       -1.97100       56.42300\nO        -16.76400       -1.19700       56.26300\nC        -13.69400       -0.94000       55.37800\nC        -13.04000       -0.78500       56.75900\nC        -12.62700       -1.13500       54.28100\nN        -15.74000       -2.79700       57.46700\nC        -16.74100       -2.72700       58.52200\nC        -16.13800       -2.30500       59.85200\nO        -14.92300       -2.38900       60.04300\nC        -17.58000       -4.01100       58.62400\nC        -16.85000       -5.17900       59.26700\nC        -17.68900       -6.41400       59.12400\nN        -16.98300       -7.58700       59.61100\nC        -17.49400       -8.80900       59.63500\nN        -16.79000       -9.81800       60.11700\nN        -18.71300       -9.03200       59.16400\nN        -16.98200       -1.82400       60.75800\nC        -16.54100       -1.39300       62.07600\nC        -17.59800       -1.72400       63.12300\nO        -18.66900       -1.11400       63.12400\nC        -16.20600        0.10900       62.05600\nC        -15.49200        0.59800       63.30300\nC        -14.99300        2.01000       63.17000\nO        -15.62700        2.87700       62.57700\nN        -13.83900        2.27700       63.72600\nN        -17.31400       -2.71600       63.99100\nC        -18.21300       -3.08000       65.09600\nC        -18.26800       -1.89200       66.08400\nO        -17.25700       -1.20100       66.22200\nC        -17.72600       -4.33400       65.80400\nN        -19.44000       -1.62400       66.72500\nC        -19.59500       -0.42200       67.57200\nC        -18.42900        0.31000       68.26500\nO        -18.06600        1.35500       67.73600\nC        -20.86300       -0.70300       68.36500\nC        -21.69700       -1.43400       67.31900\nC        -20.73600       -2.33100       66.60100\nN        -17.82000       -0.15900       69.33700\nC        -16.69000        0.59600       69.89500\nC        -15.35400        0.03300       69.46600\nO        -14.33200        0.24300       70.13000\nN        -15.35700       -0.67300       68.32500\nC        -14.22500       -1.40100       67.78700\nC        -13.51200       -0.76000       66.58800\nO        -13.78400        0.39200       66.23200\nC        -14.61200       -2.88000       67.56800\nC        -15.02700       -3.55800       68.85900\nC        -15.19000       -5.04400       68.72900\nC        -15.21700       -5.66800       70.10800\nN        -15.15600       -7.15200       70.04600\nN        -12.57400       -1.50300       66.01100\nC        -11.76100       -1.03500       64.90300\nC        -12.23100       -1.43900       63.52800\nO        -13.20400       -2.18300       63.37900\nN        -11.49600       -0.94700       62.51600\nC        -11.73500       -1.18500       61.09300\nC        -11.35400       -2.59500       60.65100\nO        -10.25500       -3.06100       60.93800\nC        -10.98900       -0.14100       60.24700\nC        -11.33000        1.32600       60.49800\nC        -10.40000        2.21500       59.72900\nC        -12.80400        1.64100       60.15100\nN        -12.25500       -3.25800       59.92300\nC        -12.01700       -4.61000       59.41900\nC        -12.34600       -4.65700       57.94100\nO        -13.49400       -4.43600       57.56100\nC        -12.85200       -5.64300       60.19800\nC        -12.57400       -7.08700       59.80300\nC        -13.48500       -8.16900       60.36600\nO        -14.54800       -7.83100       60.93900\nO        -13.14100       -9.36300       60.20700\nN        -11.33200       -4.91800       57.10600\nC        -11.51400       -5.05000       55.66400\nC        -12.38200       -6.28400       55.42800\nO        -12.19500       -7.30400       56.08900\nC        -10.16500       -5.13600       54.93600\nC        -10.28300       -5.46200       53.48400\nC        -10.60100       -4.60700       52.47600\nC        -10.14600       -6.75600       52.88600\nN        -10.67300       -5.28600       51.28600\nC        -10.42300       -6.61500       51.51400\nC         -9.86300       -8.03700       53.38800\nC        -10.40000       -7.69900       50.63100\nC         -9.84400       -9.11100       52.51000\nC        -10.10100       -8.93200       51.14700\nN        -13.37900       -6.15300       54.55600\nC        -14.36500       -7.20400       54.31100\nC        -14.14600       -7.87500       52.95000\nO        -13.98100       -9.09500       52.86300\nC        -15.82300       -6.62500       54.46700\nC        -16.90300       -7.57400       53.94300\nC        -16.10900       -6.23900       55.90600\nN        -14.20600       -7.06600       51.88800\nC        -14.16000       -7.56100       50.53400\nC        -13.59900       -6.51300       49.60600\nO        -13.67400       -5.32700       49.91000\nC        -15.56400       -7.98200       50.08600\nO        -15.53900       -8.65900       48.84200\nN        -13.01400       -6.97400       48.48500\nC        -12.40200       -6.17000       47.42900\nC        -12.95900       -6.61500       46.08300\nO        -13.09100       -7.81100       45.81500\nC        -10.87700       -6.38300       47.44700\nC        -10.08800       -5.61200       46.40800\nC         -9.35500       -4.48200       46.76100\nC         -9.99500       -6.06500       45.09300\nC         -8.60600       -3.77700       45.81600\nC         -9.26500       -5.36200       44.13300\nC         -8.54500       -4.23200       44.50400\nO         -7.77100       -3.54500       43.58100\nN        -13.23500       -5.65000       45.22200\nC        -13.68200       -5.90900       43.86300\nC        -12.87700       -5.05400       42.88900\nO        -12.69500       -3.85400       43.13400\nC        -15.23100       -5.81000       43.65600\nC        -15.66600       -6.52300       42.33900\nC        -15.74400       -4.35100       43.74400\nC        -17.12000       -6.65700       42.08600\nN        -12.41000       -5.69300       41.78100\nC        -11.67600       -5.07300       40.67200\nC        -12.56800       -4.02500       40.00600\nO        -13.78900       -4.08100       40.15100\nC        -11.32500       -6.13400       39.62600\nO        -10.25500       -6.97100       40.02800\nN        -11.97300       -3.12200       39.22400\nC        -12.70700       -2.08000       38.50600\nC        -13.79500       -2.63300       37.54200\nO        -14.78600       -1.95300       37.29200\nC        -11.72900       -1.14600       37.77600\nC        -10.84200       -1.76300       36.69100\nO        -10.78900       -3.02900       36.59200\nO        -10.15800       -0.98500       35.97200\nN        -13.60800       -3.87300       37.04100\nC        -14.48300       -4.56700       36.09200\nC        -15.29300       -5.71900       36.70600\nO        -16.16100       -6.29100       36.02900\nC        -13.65000       -5.07800       34.89100\nC        -12.50300       -6.02100       35.22300\nO        -11.49300       -6.00100       34.49300\nO        -12.60300       -6.75300       36.23800\nN        -14.97600       -6.07900       37.94800\nC        -15.65000       -7.15000       38.66900\nC        -15.05700       -8.53500       38.48700\nO        -15.59400       -9.51200       39.02200\nN        -13.95100       -8.63500       37.72800\nC        -13.26300       -9.90000       37.42900\nC        -12.67900      -10.56600       38.68100\nO        -12.78000      -11.78600       38.83000\nC        -12.15900       -9.66600       36.40200\nO        -11.29700      -10.78600       36.29600\nN        -12.04600       -9.76200       39.56100\nC        -11.42800      -10.27100       40.78600\nC        -12.14400       -9.77100       42.02400\nO        -12.41900       -8.57500       42.16800\nC         -9.91800       -9.99300       40.83900\nC         -9.13300      -10.46100       39.60900\nC         -7.93500       -9.56800       39.34300\nC         -8.80400      -11.96300       39.68400\nN        -12.48200      -10.73700       42.88400\nC        -13.23900      -10.58700       44.11100\nC        -12.47400      -11.27000       45.24800\nO        -12.12100      -12.45600       45.14800\nC        -14.63700      -11.22500       43.94500\nC        -15.47100      -10.69400       42.77800\nC        -16.84200      -11.36500       42.74400\nC        -17.73200      -10.81700       41.65900\nN        -19.10800      -11.37100       41.76200\nN        -12.21500      -10.52100       46.32500\nC        -11.50900      -11.04800       47.48800\nC        -12.33900      -10.86200       48.72700\nO        -13.12300       -9.92100       48.81800\nC        -10.13900      -10.38400       47.65700\nC         -9.28900      -10.45300       46.41700\nC         -9.30500       -9.42500       45.48000\nC         -8.45800      -11.54400       46.17900\nC         -8.50300       -9.47400       44.34000\nC         -7.64900      -11.60200       45.04400\nC         -7.67800      -10.56600       44.12700\nO         -6.87800      -10.61800       43.01500\nN        -12.18600      -11.78100       49.67300\nC        -12.95800      -11.77900       50.89700\nC        -12.07100      -12.05200       52.07000\nO        -11.06400      -12.75200       51.93300\nC        -14.07500      -12.85300       50.82700\nC        -15.00800      -12.68300       49.65300\nC        -14.74600      -13.30700       48.43600\nC        -16.15100      -11.89600       49.75300\nC        -15.57800      -13.11700       47.33500\nC        -16.99900      -11.71200       48.66500\nC        -16.71300      -12.33000       47.45800\nO        -17.54500      -12.15600       46.37800\nN        -12.45400      -11.52300       53.23200\nC        -11.77500      -11.78900       54.47700\nC        -12.24300      -13.19600       54.88900\nO        -13.35900      -13.60400       54.54300\nC        -12.20000      -10.76600       55.51700\nN        -11.39800      -13.93900       55.60900\nC        -11.71600      -15.29800       56.04800\nC        -12.96700      -15.39400       56.93900\nO        -13.64400      -16.42700       56.92400\nC        -10.49300      -15.97400       56.69900\nC         -9.29700      -16.15600       55.77100\nO         -9.51100      -16.30000       54.53900\nO         -8.15500      -16.19100       56.27600\nN        -13.29000      -14.31300       57.67500\nC        -14.45400      -14.21000       58.56300\nC        -15.78600      -14.11300       57.79900\nO        -16.84200      -14.35800       58.39300\nC        -14.29700      -13.02000       59.51000\nO        -13.93900      -11.83600       58.81200\nN        -15.73500      -13.73500       56.49300\nC        -16.91100      -13.55900       55.60800\nC        -16.91800      -14.52000       54.38300\nO        -17.88600      -14.51200       53.61800\nC        -17.14000      -12.07400       55.18000\nC        -17.12200      -11.11500       56.37900\nC        -16.15300      -11.62700       54.09400\nN        -15.84100      -15.32500       54.19700\nC        -15.69600      -16.25600       53.06400\nC        -16.76700      -17.35300       53.06500\nO        -16.94800      -18.03800       54.07300\nC        -14.28700      -16.86300       53.03600\nC        -13.82400      -17.25300       51.64600\nC        -12.32600      -17.46100       51.59900\nC        -11.93100      -18.30500       50.41500\nN        -10.55000      -18.85200       50.54700\nN        -17.47900      -17.46900       51.94800\nC        -18.55900      -18.43400       51.76300\nC        -19.94800      -17.93500       52.13000\nO        -20.94500      -18.58900       51.79900\nN        -20.03300      -16.77500       52.81900\nC        -21.30000      -16.17800       53.24700\nC        -21.60600      -14.87900       52.49400\nO        -22.73300      -14.68500       52.02300\nC        -21.27900      -15.93200       54.75500\nC        -21.02600      -17.18500       55.59700\nC        -21.14000      -16.89600       57.07400\nN        -20.21000      -15.84000       57.49500\nC        -20.56300      -14.73000       58.14000\nN        -19.64600      -13.83900       58.49000\nN        -21.83300      -14.51600       58.46200\nN        -20.59500      -14.00300       52.35900\nC        -20.73600      -12.70500       51.69000\nC        -20.30000      -12.79800       50.24600\nO        -19.41200      -13.58500       49.91100\nC        -19.94100      -11.58500       52.40300\nC        -20.38200      -11.11000       53.77000\nC        -21.20400      -11.89700       54.57400\nC        -19.91400       -9.90500       54.28900\nC        -21.56800      -11.47800       55.85000\nC        -20.27000       -9.49400       55.57600\nC        -21.09900      -10.27900       56.34200\nN        -20.91300      -11.97200       49.39200\nC        -20.63200      -11.89600       47.96100\nC        -20.56000      -10.41800       47.55600\nO        -21.50800       -9.67000       47.79500\nC        -21.73000      -12.65100       47.16600\nO        -21.92900      -13.95300       47.71600\nC        -21.42600      -12.75000       45.69800\nN        -19.44400      -10.00300       46.94400\nC        -19.27900       -8.64300       46.42300\nC        -19.65700       -8.66200       44.93300\nO        -19.45800       -9.67200       44.25700\nC        -17.85100       -8.05200       46.67800\nC        -17.82800       -6.50300       46.51000\nC        -16.76600       -8.73700       45.81300\nC        -16.62900       -5.78800       47.15700\nN        -20.23200       -7.56600       44.43800\nC        -20.59400       -7.41300       43.03400\nC        -20.76300       -5.94000       42.74200\nO        -20.86400       -5.13900       43.66600\nC        -21.85800       -8.20800       42.68700\nO        -23.00700       -7.78400       43.40100\nN        -20.75800       -5.57000       41.47200\nC        -20.92500       -4.18400       41.07100\nC        -21.70400       -4.06900       39.76700\nO        -21.70600       -5.00000       38.95400\nC        -19.56700       -3.44300       41.00100\nC        -18.55800       -3.99300       39.97700\nC        -17.16400       -3.40700       40.16000\nN        -17.13200       -1.96000       39.93100\nC        -16.16900       -1.15400       40.36200\nN        -16.23000        0.14600       40.11500\nN        -15.14000       -1.63800       41.04700\nN        -22.38200       -2.93500       39.58600\nC        -23.12400       -2.61700       38.37800\nC        -22.58800       -1.27700       37.89800\nO        -23.00400       -0.21900       38.37700\nC        -24.64500       -2.58700       38.63200\nC        -25.50200       -2.71000       37.38100\nO        -25.00600       -2.37600       36.27900\nO        -26.67500       -3.13000       37.50500\nN        -21.60400       -1.34200       36.99100\nC        -20.92700       -0.17200       36.43800\nC        -21.85100        0.76100       35.65700\nO        -21.64400        1.97700       35.69000\nC        -19.67900       -0.57700       35.65700\nC        -18.70000       -1.39600       36.48400\nO        -19.08000       -2.26000       37.28200\nN        -17.41800       -1.17900       36.29400\nN        -22.90900        0.19700       35.02200\nC        -23.93400        0.96700       34.29400\nC        -24.82400        1.77400       35.25800\nO        -25.31500        2.84500       34.89200\nC        -24.78000        0.05900       33.39800\nO        -25.29300       -1.08200       34.06700\nN        -24.97900        1.28000       36.50400\nC        -25.77800        1.90500       37.56400\nC        -24.95100        2.69300       38.59300\nO        -25.53700        3.36400       39.45700\nC        -26.63000        0.84600       38.28100\nC        -27.85800        0.42400       37.49400\nC        -28.75000       -0.46300       38.34000\nC        -29.91300       -1.00400       37.55400\nN        -30.47200       -2.21100       38.20300\nN        -23.59800        2.60800       38.50600\nC        -22.63100        3.24500       39.41300\nC        -22.86900        2.77100       40.85500\nO        -22.89900        3.57100       41.79600\nC        -22.65400        4.77700       39.28700\nC        -22.28800        5.27900       37.92200\nO        -21.15400        5.13900       37.46600\nN        -23.24300        5.88200       37.24700\nN        -23.08700        1.45400       41.00600\nC        -23.43400        0.85800       42.28300\nC        -22.60400       -0.37200       42.61100\nO        -22.40500       -1.24100       41.75400\nC        -24.97000        0.63600       42.38800\nO        -25.65200        1.87000       42.13300\nC        -25.40200        0.13100       43.75100\nN        -22.10800       -0.41700       43.86200\nC        -21.35500       -1.52800       44.43100\nC        -22.33900       -2.27200       45.36100\nO        -23.14300       -1.62600       46.02600\nC        -20.15600       -0.96700       45.22700\nC        -19.34200       -1.93600       46.07700\nC        -18.54400       -2.88600       45.22100\nC        -18.40800       -1.20300       47.00200\nN        -22.27400       -3.60900       45.39900\nC        -23.16000       -4.41300       46.22500\nC        -22.39400       -5.35400       47.12500\nO        -21.27100       -5.74900       46.82100\nC        -24.15600       -5.23500       45.36500\nC        -24.98700       -4.42800       44.38800\nC        -24.66100       -4.37700       43.03500\nC        -26.10600       -3.72000       44.81700\nC        -25.42500       -3.63800       42.13100\nC        -26.88200       -2.99100       43.92100\nC        -26.54300       -2.95700       42.57800\nO        -27.29400       -2.21200       41.70600\nN        -23.01700       -5.71700       48.24100\nC        -22.51400       -6.70100       49.17600\nC        -23.71400       -7.52200       49.60100\nO        -24.61500       -7.00400       50.25500\nC        -21.78400       -6.09200       50.39700\nC        -21.03700       -7.11200       51.28800\nC        -19.80500       -7.67300       50.58900\nC        -20.66100       -6.51300       52.61400\nN        -23.73800       -8.78900       49.17900\nC        -24.78500       -9.73600       49.51900\nC        -24.30200      -10.49400       50.72500\nO        -23.33200      -11.22200       50.62700\nC        -25.08700      -10.68700       48.34000\nC        -26.16500      -11.73400       48.63400\nC        -27.51600      -11.12400       48.91500\nO        -28.04800      -10.32100       48.14100\nN        -28.10800      -11.52300       50.01800\nN        -24.95700      -10.30600       51.87000\nC        -24.56300      -10.96400       53.10700\nC        -25.59500      -12.01900       53.47600\nO        -26.75500      -11.68700       53.69600\nC        -24.39700       -9.94300       54.24600\nC        -23.51000       -8.75300       53.90700\nS        -23.49100       -7.48600       55.21400\nC        -25.16500       -7.00800       55.24500\nN        -25.17800      -13.28500       53.49700\nC        -26.02500      -14.43300       53.81700\nC        -25.46900      -15.09800       55.07500\nO        -24.31900      -14.82900       55.44100\nC        -26.05400      -15.43400       52.63900\nC        -26.58200      -14.87100       51.34800\nO        -27.73700      -14.47100       51.24500\nN        -25.75200      -14.83900       50.33000\nN        -26.27900      -15.94800       55.74200\nC        -25.90400      -16.67400       56.96900\nC        -25.32000      -15.74500       58.04000\nO        -24.28500      -16.05000       58.65100\nC        -24.96800      -17.84400       56.66100\nO        -25.59600      -18.77900       55.79800\nN        -26.00400      -14.60600       58.25700\nC        -25.59900      -13.57200       59.20000\nC        -25.53900      -14.03900       60.63500\nO        -26.35700      -14.84200       61.06400\nC        -26.43100      -12.29100       59.03000\nC        -26.09600      -11.47200       57.77300\nC        -27.24700      -10.56600       57.38800\nC        -24.82600      -10.66500       57.94900\nN        -24.51400      -13.57900       61.35200\nC        -24.21000      -13.91100       62.74300\nC        -24.10600      -12.61000       63.55500\nO        -23.85600      -11.55700       62.97500\nC        -22.85500      -14.64400       62.81000\nC        -22.77900      -15.94100       62.03000\nC        -21.33900      -16.38800       61.92000\nN        -21.19100      -17.57800       61.08200\nC        -20.04400      -17.97400       60.54000\nN        -18.93300      -17.27200       60.73300\nN        -19.99900      -19.06600       59.79300\nN        -24.24800      -12.68700       64.89400\nC        -24.16300      -11.51000       65.77100\nC        -22.87400      -10.70200       65.57900\nO        -22.92600       -9.47900       65.63000\nC        -24.32500      -11.91600       67.22500\nN        -21.74500      -11.38900       65.29700\nC        -20.39000      -10.83800       65.06300\nC        -20.29100      -10.00900       63.75200\nO        -19.30300       -9.30300       63.54100\nC        -19.32000      -11.95200       65.05500\nC        -19.52600      -13.08200       66.06100\nC        -20.34000      -14.25800       65.55300\nO        -21.40500      -14.54500       66.14900\nO        -19.92300      -14.88500       64.55300\nN        -21.31600      -10.10300       62.88500\nC        -21.41300       -9.35900       61.64200\nC        -22.01400       -7.97700       61.86600\nO        -22.04200       -7.17200       60.94000\nC        -22.23000      -10.14300       60.61200\nC        -21.56300      -11.39800       60.09000\nO        -20.30100      -11.43000       60.03200\nO        -22.29400      -12.32200       59.67300\nN        -22.49300       -7.70300       63.10400\nC        -23.04900       -6.41900       63.53000\nC        -21.94200       -5.39000       63.44900\nO        -20.90000       -5.54900       64.08500\nC        -23.66100       -6.54200       64.93400\nO        -24.76900       -7.43500       64.87000\nC        -24.08800       -5.21200       65.51700\nN        -22.16100       -4.35500       62.63100\nC        -21.19400       -3.28800       62.38600\nC        -21.78600       -2.22100       61.50500\nO        -22.85600       -2.39600       60.92500\nC        -19.96200       -3.87200       61.67500\nN        -21.03400       -1.12500       61.35900\nC        -21.27300       -0.05600       60.39500\nC        -20.45000       -0.54300       59.19700\nO        -19.29000       -0.93100       59.34900\nC        -20.80200        1.34100       60.89100\nC        -20.71500        2.34500       59.73700\nC        -21.71800        1.86900       61.99800\nN        -21.07300       -0.57800       58.03600\nC        -20.43700       -1.01600       56.82200\nC        -20.11200        0.15800       55.94500\nO        -21.00600        0.91600       55.55500\nC        -21.29400       -2.06900       56.10900\nC        -21.20000       -3.43400       56.75900\nC        -21.84500       -3.70300       57.96100\nC        -20.48000       -4.46400       56.16000\nC        -21.74300       -4.94600       58.57600\nC        -20.40300       -5.72800       56.74900\nC        -21.04300       -5.96500       57.95700\nO        -20.96600       -7.18900       58.58400\nN        -18.82300        0.34100       55.68100\nC        -18.33000        1.40500       54.82100\nC        -17.96900        0.87300       53.45100\nO        -17.44500       -0.23400       53.28400\nC        -17.09300        2.10200       55.40200\nC        -17.31900        2.88900       56.66600\nC        -16.91300        2.39300       57.89800\nC        -17.82800        4.18800       56.61900\nC        -17.08200        3.12700       59.06600\nC        -17.99600        4.93500       57.78300\nC        -17.62600        4.39800       59.00400\nO        -17.76300        5.13200       60.15500\nN        -18.19200        1.72000       52.49100\nC        -17.92100        1.53000       51.09100\nC        -16.79700        2.54600       50.81000\nO        -16.89100        3.70800       51.21900\nC        -19.19400        1.84300       50.31300\nS        -18.97400        1.99100       48.53700\nN        -15.69900        2.08300       50.20300\nC        -14.54900        2.94200       49.95600\nC        -13.85500        2.65300       48.61500\nO        -13.84600        1.52100       48.10100\nC        -13.55900        2.87400       51.12500\nN        -13.27600        3.71300       48.05900\nC        -12.61900        3.66500       46.77500\nC        -11.09400        3.60800       46.83700\nO        -10.47100        4.45900       47.47800\nC        -13.06500        4.88400       45.95400\nC        -12.45900        4.89800       44.55500\nC        -12.76900        6.16300       43.81200\nN        -12.02900        7.32300       44.30900\nC        -12.24500        8.55600       43.87700\nN        -11.56400        9.57200       44.39100\nN        -13.14300        8.78900       42.93800\nN        -10.50600        2.64100       46.09300\nC         -9.06300        2.54200       45.90500\nC         -8.72100        3.45200       44.71600\nO         -9.18000        3.15300       43.61300\nC         -8.63800        1.10600       45.59000\nC         -8.84600        0.16600       46.72700\nN         -9.96300       -0.60100       46.83300\nC         -8.02300       -0.10000       47.76300\nC         -9.79800       -1.30800       47.93800\nN         -8.63500       -1.04700       48.51600\nN         -7.95800        4.56200       44.89600\nC         -7.67200        5.44900       43.75500\nC         -6.87200        4.84700       42.60500\nO         -6.97500        5.35500       41.48600\nC         -6.93800        6.63400       44.39400\nC         -6.36100        6.09500       45.65100\nC         -7.34800        5.08000       46.14000\nN         -6.09600        3.77000       42.87000\nC         -5.25800        3.07800       41.89200\nC         -5.43800        1.56200       41.97300\nO         -5.63600        1.02000       43.06700\nC         -3.76400        3.43600       42.10800\nC         -3.50800        4.91600       42.28200\nC         -3.72300        5.81000       41.24100\nC         -3.06200        5.42500       43.49800\nC         -3.52400        7.18000       41.40600\nC         -2.85100        6.79400       43.67400\nC         -3.09100        7.66900       42.62200\nO         -2.89400        9.02300       42.75600\nN         -5.32500        0.87600       40.81300\nC         -5.43900       -0.58200       40.68400\nC         -4.24900       -1.27200       41.34200\nO         -4.33800       -2.44000       41.71600\nC         -5.54500       -0.99400       39.18900\nC         -4.31300       -0.71100       38.34700\nC         -4.04300        0.42700       37.63900\nC         -3.18200       -1.58000       38.15400\nN         -2.80600        0.33600       37.04000\nC         -2.25100       -0.88300       37.34700\nC         -2.84600       -2.86300       38.62300\nC         -1.02500       -1.44400       36.96300\nC         -1.62000       -3.40600       38.26000\nC         -0.73000       -2.70400       37.43000\nN         -3.12300       -0.55200       41.42900\nC         -1.84500       -1.00700       41.98600\nC         -1.62700       -0.58100       43.44400\nO         -0.54500       -0.81800       43.98500\nC         -0.68100       -0.52400       41.10100\nC         -0.64000        0.96800       40.86300\nC          0.02300        1.81400       41.74400\nC         -1.21600        1.53000       39.72900\nC          0.07600        3.19000       41.52500\nC         -1.14400        2.90000       39.48200\nC         -0.49400        3.72600       40.38300\nO         -0.40300        5.07800       40.16200\nN         -2.64000        0.04300       44.05100\nC         -2.60500        0.50900       45.43600\nC         -3.75500        0.01300       46.28900\nO         -4.87500       -0.17500       45.78500\nN         -3.47900       -0.16600       47.58300\nC         -4.46700       -0.60600       48.56500\nC         -5.05900        0.49100       49.43700\nO         -5.91900        0.21100       50.27800\nN         -4.62000        1.74900       49.24400\nC         -5.12800        2.87200       50.02900\nC         -6.57600        3.20300       49.66900\nO         -7.06800        2.78400       48.61400\nC         -4.20700        4.10300       49.98300\nC         -4.39400        5.01300       48.75800\nC         -3.32700        4.80700       47.71100\nO         -2.94500        3.67600       47.40300\nN         -2.82700        5.90300       47.13300\nN         -7.27400        3.89800       50.58600\nC         -8.67200        4.23400       50.36900\nC         -8.90900        5.72800       50.40200\nO         -8.84800        6.37700       51.44000\nC         -9.62900        3.43400       51.26200\nC         -9.69100        1.92800       51.00600\nC        -10.12900        1.17600       52.24700\nC        -10.59400        1.58500       49.80200\nN         -9.12900        6.24700       49.20900\nC         -9.34200        7.62900       48.79800\nC        -10.58000        8.24500       49.43600\nO        -10.49900        9.18500       50.22800\nC         -9.56200        7.60700       47.25200\nC         -9.07300        8.79400       46.46800\nO         -8.49700        9.71100       47.07600\nO         -9.22600        8.78900       45.24200\nN        -11.72300        7.73500       49.01800\nC        -13.04300        8.20900       49.34100\nC        -13.82600        7.15500       50.10900\nO        -13.76200        5.97500       49.77700\nC        -13.69100        8.55900       47.98200\nC        -15.14800        8.94700       47.92600\nC        -15.37800       10.35400       48.46300\nC        -15.66100        8.79800       46.52000\nN        -14.51400        7.58300       51.16400\nC        -15.35900        6.72400       51.99600\nC        -16.78000        7.29400       52.02000\nO        -16.97200        8.51500       51.92000\nC        -14.85000        6.68600       53.44500\nC        -13.48000        6.10400       53.63900\nC        -12.29200        6.64400       53.23900\nC        -13.15900        4.87000       54.30200\nN        -11.25300        5.82900       53.61200\nC        -11.75600        4.73000       54.26700\nC        -13.92600        3.86100       54.91400\nC        -11.09900        3.63200       54.84200\nC        -13.27900        2.78500       55.49800\nC        -11.88100        2.67000       55.45100\nN        -17.75200        6.40400       52.18600\nC        -19.13600        6.77800       52.39400\nC        -19.35500        7.04000       53.87700\nO        -18.42200        6.89500       54.67400\nN        -20.59000        7.40800       54.27800\nC        -20.89200        7.66900       55.69300\nC        -21.11500        6.40400       56.53100\nO        -20.99200        6.45100       57.75400\nC        -22.01500        8.69600       55.84500\nC        -21.47600       10.09900       56.05600\nC        -21.21800       10.40600       57.51000\nO        -22.14400       10.70600       58.27200\nN        -19.94700       10.35900       57.91700\nN        -21.42300        5.29900       55.85100\nC        -21.64200        3.98400       56.44100\nC        -23.09300        3.59500       56.62200\nO        -23.97800        4.45300       56.70800\nN        -23.34700        2.28400       56.66500\nC        -24.68500        1.74600       56.92000\nC        -24.63100        0.73500       58.04000\nO        -23.80000       -0.18100       58.02100\nC        -25.45500        1.32600       55.65200\nO        -26.81700        1.08400       56.02700\nC        -24.86900        0.08500       54.95300\nN        -25.49300        0.92900       59.04800\nC        -25.49500        0.05800       60.21000\nC        -26.29600       -1.21400       60.00900\nO        -27.44800       -1.16300       59.61000\nC        -25.92100        0.82100       61.46900\nC        -26.07900       -0.00100       62.75600\nC        -24.71400       -0.32000       63.40000\nC        -27.05000        0.66400       63.70700\nN        -25.66600       -2.35300       60.31100\nC        -26.25700       -3.68700       60.24500\nC        -26.19100       -4.25700       61.66200\nO        -25.11400       -4.34300       62.24600\nC        -25.55800       -4.60500       59.18700\nC        -26.05400       -6.05200       59.27500\nC        -25.73100       -4.05700       57.76900\nN        -27.36200       -4.57500       62.22600\nC        -27.49200       -5.16100       63.55500\nC        -28.04400       -6.55900       63.35100\nO        -29.09200       -6.71500       62.72100\nC        -28.37800       -4.29500       64.48700\nO        -27.95000       -2.93300       64.43600\nC        -28.35300       -4.77600       65.93300\nN        -27.30500       -7.57400       63.83300\nC        -27.71000       -8.97000       63.72200\nC        -28.07800       -9.46800       65.10900\nO        -27.20700       -9.58000       65.97500\nC        -26.71800       -9.89800       62.96100\nC        -27.36700      -11.24700       62.67400\nC        -26.23700       -9.26400       61.65700\nN        -29.38800       -9.69300       65.34000\nC        -29.91000      -10.10600       66.64300\nC        -31.17900      -10.96600       66.55900\nO        -32.00800      -10.75800       65.66900\nC        -30.20300       -8.87300       67.48900\nO        -30.35300       -9.19600       68.86000\nN        -31.33600      -11.91700       67.51100\nC        -32.52700      -12.77500       67.60300\nC        -33.56000      -12.14400       68.55500\nO        -34.70400      -12.60900       68.63500\nC        -32.15300      -14.18600       68.04600\nO        -31.66300      -14.19800       69.37700\nN        -33.15200      -11.04900       69.24100\nC        -33.96400      -10.29100       70.18600\nC        -35.17100       -9.64700       69.51800\nO        -35.12000       -9.28900       68.33800\nC        -33.11400       -9.23500       70.87700\nN        -36.26700       -9.52500       70.29300\nC        -37.54800       -8.93000       69.89900\nC        -37.62300       -7.49900       70.41100\nO        -36.94000       -7.16400       71.38100\nC        -38.71900       -9.72900       70.51500\nC        -39.00400      -11.10800       69.88000\nC        -38.07100      -12.28300       70.29100\nC        -38.33000      -12.87900       71.65800\nN        -37.32300      -13.92300       71.98600\nN        -38.48500       -6.67000       69.79700\nC        -38.71700       -5.29400       70.24300\nC        -39.25100       -5.34600       71.68400\nO        -40.33500       -5.88400       71.94300\nC        -39.62500       -4.53900       69.27500\nO        -39.08200       -4.65600       67.97000\nC        -39.76000       -3.06800       69.62200\nN        -38.43100       -4.86300       72.61900\nC        -38.74600       -4.87600       74.04100\nC        -38.69800       -3.45400       74.60000\nO        -37.70000       -2.75800       74.39000\nC        -37.80300       -5.84900       74.78100\nO        -37.79100       -7.10800       74.10400\nC        -38.19900       -6.07100       76.24000\nN        -39.75200       -2.99800       75.32000\nC        -39.67900       -1.66000       75.93000\nC        -38.82800       -1.67900       77.20300\nO        -38.74800       -2.72000       77.84800\nC        -41.13500       -1.31700       76.23700\nC        -41.87800       -2.59700       76.20700\nC        -41.00400       -3.69300       75.68300\nN        -38.16500       -0.57600       77.59000\nC        -37.35300       -0.62300       78.81700\nC        -38.17400       -0.62600       80.10800\nO        -39.34200       -0.23000       80.11700\nC        -36.52300        0.65400       78.72800\nC        -37.38700        1.60000       77.97700\nC        -38.10200        0.75400       76.95500\nN        -37.54300       -1.08200       81.19700\nC        -38.07000       -1.02300       82.55800\nC        -37.27100        0.13700       83.13800\nO        -36.04400        0.15300       83.01000\nC        -37.79100       -2.32000       83.31400\nO        -38.70900       -3.33700       82.95000\nN        -37.95700        1.16200       83.64600\nC        -37.28100        2.36600       84.14000\nC        -37.29600        2.46100       85.67200\nO        -38.35900        2.38800       86.28700\nC        -37.75300        3.65100       83.40600\nC        -37.06500        4.89400       83.95800\nC        -37.51400        3.53200       81.89500\nN        -36.10800        2.58800       86.28000\nC        -35.98200        2.65500       87.73300\nC        -35.34400        3.95100       88.21600\nO        -34.34800        4.38500       87.63900\nC        -35.20800        1.44300       88.27600\nC        -35.76900        0.10500       87.84700\nC        -35.16200       -0.64100       86.84800\nC        -36.90800       -0.42500       88.45900\nC        -35.66600       -1.87800       86.45900\nC        -37.42800       -1.66000       88.07200\nC        -36.80200       -2.38400       87.07000\nO        -37.29800       -3.61100       86.69000\nN        -35.89500        4.58000       89.27800\nC        -35.28000        5.81100       89.78500\nC        -34.06200        5.51300       90.64600\nO        -34.03000        4.53400       91.39400\nC        -36.40400        6.48600       90.57000\nC        -37.32000        5.38300       90.97000\nC        -37.07100        4.18900       90.08300\nN        -33.03300        6.34600       90.49100\nC        -31.79100        6.18300       91.22500\nC        -31.50800        7.32900       92.18800\nO        -31.21000        8.45200       91.78400\nC        -30.60000        5.90000       90.29500\nC        -30.74700        4.74100       89.32500\nC        -29.56500        4.69300       88.38800\nC        -30.94100        3.40800       90.04500\nN        -31.66200        7.02800       93.46400\nC        -31.39300        7.89900       94.59200\nC        -30.16800        7.30200       95.33400\nO        -29.92800        6.09600       95.21200\nC        -32.61400        7.92800       95.50800\nN        -29.38500        8.09400       96.10400\nC        -28.21800        7.52500       96.81800\nC        -28.53600        6.40200       97.80400\nO        -29.61100        6.38100       98.39900\nC        -27.63300        8.73000       97.56300\nC        -28.15300        9.92000       96.84500\nC        -29.51000        9.54000       96.36800\nN        -24.01400       19.41400       97.07200\nC        -24.81300       19.15400       95.86900\nC        -24.91500       17.63800       95.61700\nO        -23.93300       16.92800       95.83300\nC        -24.21800       19.86100       94.62500\nC        -23.40900       21.13400       94.91200\nS        -24.37400       22.55500       95.48200\nC        -23.09600       23.78000       95.62500\nN        -26.09100       17.15000       95.15600\nC        -26.34400       15.71900       94.88800\nC        -26.44600       15.33100       93.40100\nO        -26.88900       16.12500       92.57200\nC        -27.51100       15.10900       95.72000\nC        -27.18100       15.07000       97.20900\nC        -28.83400       15.83200       95.46800\nN        -26.05900       14.08300       93.08900\nC        -26.09300       13.47600       91.75700\nC        -27.17800       12.38400       91.73300\nO        -27.08800       11.39100       92.46800\nC        -24.70100       12.92600       91.36900\nO        -24.35600       11.86100       92.25400\nC        -23.61000       13.98500       91.40800\nN        -28.22900       12.58500       90.92500\nC        -29.32100       11.61300       90.82400\nC        -29.37900       10.94200       89.46900\nO        -28.93600       11.51700       88.47100\nC        -30.67300       12.20600       91.24400\nC        -30.78800       12.66600       92.70400\nC        -32.13500       13.25400       92.96500\nC        -30.55400       11.52800       93.68100\nN        -29.88600        9.71000       89.44100\nC        -29.92500        8.92000       88.21100\nC        -31.23000        8.26900       87.78700\nO        -32.26700        8.40400       88.46300\nN        -31.14700        7.55400       86.64000\nC        -32.22800        6.84000       86.01700\nC        -31.72000        5.57200       85.36100\nO        -30.83800        5.65600       84.52200\nC        -32.99300        7.74100       85.03900\nS        -34.80900        7.55400       85.11000\nN        -32.25000        4.38500       85.74500\nC        -31.82100        3.10800       85.16100\nC        -32.84200        2.64500       84.11200\nO        -33.97400        2.32000       84.45100\nC        -31.60900        2.05300       86.26500\nC        -31.29400        0.61800       85.82100\nC        -29.91900        0.52200       85.20800\nC        -31.42400       -0.33800       86.97200\nN        -32.42700        2.64400       82.84100\nC        -33.22100        2.24800       81.67400\nC        -32.72100        0.85000       81.29800\nO        -31.65300        0.70700       80.71100\nC        -33.08800        3.29600       80.53100\nC        -33.91800        2.90700       79.31500\nC        -33.48500        4.67900       81.01300\nN        -33.47900       -0.17600       81.71300\nC        -33.11700       -1.59100       81.62700\nC        -33.95400       -2.48500       80.70300\nO        -35.17600       -2.46000       80.75400\nC        -33.14900       -2.17200       83.05600\nC        -32.21500       -3.33700       83.30500\nC        -32.92500       -4.40400       84.09800\nC        -31.96900       -5.25700       84.87000\nN        -32.70600       -6.07400       85.86600\nN        -33.26000       -3.32300       79.93500\nC        -33.83800       -4.34700       79.07200\nC        -34.64900       -3.89400       77.88100\nO        -35.76800       -4.36300       77.69000\nN        -34.06800       -3.03200       77.03500\nC        -34.73800       -2.57300       75.82500\nC        -34.03300       -3.10100       74.58800\nO        -32.84200       -3.42200       74.62200\nC        -34.88900       -1.03900       75.78400\nC        -33.57200       -0.29500       75.78900\nC        -32.92000        0.03000       74.59800\nC        -32.95800        0.06100       76.98700\nC        -31.70400        0.70800       74.59700\nC        -31.72800        0.71400       76.99900\nC        -31.11800        1.05500       75.80200\nO        -29.91100        1.70000       75.81900\nN        -34.78900       -3.20900       73.49900\nC        -34.30800       -3.64300       72.20200\nC        -35.24900       -3.16600       71.11200\nO        -36.45500       -3.34100       71.24000\nC        -34.10400       -5.17000       72.11700\nC        -33.33400       -5.54500       70.87100\nC        -31.94600       -5.51700       70.86100\nC        -33.99900       -5.82800       69.68100\nC        -31.23600       -5.78300       69.68900\nC        -33.29000       -6.07600       68.51100\nC        -31.91500       -6.05700       68.52300\nN        -34.72900       -2.60800       70.00200\nC        -33.32000       -2.29800       69.72800\nC        -32.92900       -0.93200       70.29800\nO        -33.68700       -0.30400       71.03500\nC        -33.27400       -2.35200       68.19600\nC        -34.62800       -1.82800       67.76700\nC        -35.59500       -2.16600       68.88800\nN        -31.74900       -0.47600       69.93800\nC        -31.28100        0.83600       70.30300\nC        -31.82400        1.83100       69.30000\nO        -32.08000        1.48500       68.14800\nC        -29.74200        0.89100       70.16300\nC        -28.99900        0.19500       71.28200\nC        -27.65900        0.83400       71.55700\nO        -27.60100        1.67900       72.47800\nO        -26.68500        0.52600       70.83800\nN        -31.94400        3.10200       69.72800\nC        -31.60300        3.62100       71.05800\nC        -32.81400        4.17900       71.82500\nO        -33.95100        4.18100       71.32500\nC        -30.64200        4.74500       70.68500\nC        -31.27700        5.32700       69.37800\nC        -32.22100        4.23500       68.82700\nN        -32.53600        4.69300       73.02400\nC        -33.48700        5.40500       73.86900\nC        -32.90700        6.79100       74.06800\nO        -31.68800        6.96000       73.98100\nC        -33.78400        4.74000       75.25600\nC        -34.10500        3.26000       75.11900\nC        -32.64100        4.95100       76.26000\nN        -33.75800        7.77000       74.37600\nC        -33.28600        9.12200       74.67100\nC        -33.82900        9.55600       75.99800\nO        -35.04700        9.57000       76.19700\nC        -33.63700       10.12300       73.57600\nO        -34.99100        9.92400       73.17500\nC        -32.68700       10.06200       72.39700\nN        -32.92300        9.91400       76.90800\nC        -33.31400       10.37800       78.23400\nC        -33.09600       11.87000       78.36500\nO        -32.01300       12.38100       78.05500\nC        -32.61100        9.62400       79.40500\nC        -33.30300        9.91100       80.74600\nC        -32.55100        8.11700       79.15600\nN        -34.12600       12.55900       78.84300\nC        -34.04700       13.97400       79.17000\nC        -34.39800       14.10200       80.65300\nO        -34.86400       13.13500       81.27700\nC        -34.90500       14.86200       78.24400\nO        -36.27300       14.50400       78.35200\nC        -34.47000       14.81200       76.79200\nN        -34.12700       15.27600       81.22500\nC        -34.45100       15.56300       82.61100\nC        -35.31800       16.78900       82.62600\nO        -34.92900       17.82600       82.08300\nC        -33.19200       15.75000       83.44900\nC        -32.43000       14.47500       83.64000\nC        -31.45500       13.97800       82.82600\nC        -32.62200       13.50100       84.68100\nN        -30.98900       12.78100       83.31700\nC        -31.68800       12.46300       84.45500\nC        -33.48500       13.41500       85.79600\nC        -31.59200       11.35200       85.29800\nC        -33.36400       12.33400       86.64700\nC        -32.43500       11.31300       86.39200\nN        -36.52900       16.64600       83.19100\nC        -37.55400       17.68800       83.28300\nC        -37.86300       18.37600       81.97200\nO        -37.91300       19.59900       81.89500\nC        -37.29700       18.65600       84.42100\nC        -37.81300       18.15100       85.73300\nO        -37.07900       18.04800       86.73000\nN        -39.10000       17.81700       85.75900\nN        -38.06800       17.55400       80.93100\nC        -38.43800       17.94300       79.56700\nC        -37.39700       18.87000       78.91600\nO        -37.75000       19.78800       78.17100\nC        -39.84700       18.53800       79.56100\nO        -40.65800       17.88800       80.52900\nN        -36.12500       18.59900       79.20900\nC        -35.00600       19.38900       78.71500\nC        -34.74600       20.63400       79.54100\nO        -33.92500       21.46700       79.14400\nN        -35.43900       20.77500       80.70900\nC        -35.26500       21.91600       81.62000\nC        -33.82700       21.98200       82.13100\nO        -33.28300       23.07300       82.29900\nC        -36.23400       21.83100       82.79700\nO        -36.01500       22.82800       83.78000\nN        -33.20700       20.80900       82.33300\nC        -31.85900       20.67200       82.87000\nC        -30.87200       20.38300       81.76000\nO        -30.52400       19.23600       81.49900\nC        -31.83400       19.60200       83.98100\nC        -32.81300       19.83100       85.13200\nC        -34.19800       19.46200       84.75700\nC        -32.46900       18.99500       86.31000\nN        -30.45900       21.44600       81.07600\nC        -29.51600       21.38000       79.96600\nC        -28.11600       20.98200       80.47500\nO        -27.44200       20.17500       79.82700\nC        -29.45900       22.72600       79.24700\nO        -30.67500       23.44100       79.40200\nN        -27.71800       21.50400       81.65700\nC        -26.41300       21.25700       82.25300\nC        -26.42200       20.26100       83.41400\nO        -27.28600       20.30400       84.29600\nC        -25.75600       22.56500       82.67200\nO        -24.35700       22.39700       82.83800\nN        -25.42200       19.38400       83.40100\nC        -25.24800       18.33200       84.39400\nC        -25.83000       17.01600       83.93100\nO        -25.77500       16.03200       84.66800\nN        -26.37700       16.99300       82.69800\nC        -26.99600       15.81800       82.07200\nC        -25.98200       14.96900       81.30700\nO        -25.42600       15.38700       80.28300\nC        -28.26600       16.16300       81.23800\nC        -28.74800       14.97600       80.40400\nC        -29.38300       16.65500       82.14800\nN        -25.75000       13.77100       81.83500\nC        -24.85900       12.77900       81.26000\nC        -25.66800       11.52200       81.00700\nO        -26.18000       10.92600       81.96000\nC        -23.71800       12.41900       82.23600\nC        -22.59600       13.40500       82.35200\nN        -21.62200       13.25900       83.32500\nC        -22.31400       14.50500       81.61500\nC        -20.78400       14.26700       83.14900\nN        -21.16100       15.04400       82.13500\nN        -25.80200       11.12100       79.73900\nC        -26.44100        9.85200       79.41700\nC        -25.29600        8.92700       79.05700\nO        -24.62300        9.12700       78.04300\nC        -27.56800        9.96900       78.37600\nO        -28.52600       10.91800       78.85000\nC        -28.26200        8.61200       78.11000\nN        -25.05300        7.94900       79.92600\nC        -23.95500        6.99600       79.81900\nC        -24.12000        5.97800       78.67500\nO        -25.24700        5.78000       78.20400\nC        -23.69500        6.35000       81.19200\nC        -23.05800        7.31000       82.16300\nC        -23.82400        8.25800       82.83500\nC        -21.68900        7.29900       82.37600\nC        -23.23600        9.15700       83.71600\nC        -21.10100        8.19100       83.27200\nC        -21.88000        9.11400       83.93700\nN        -23.01700        5.37000       78.15800\nC        -23.18600        4.40500       77.06000\nC        -23.93100        3.14100       77.49000\nO        -23.83400        2.69900       78.64200\nC        -21.75800        4.13100       76.55700\nC        -20.85300        4.65500       77.58900\nC        -21.60100        5.48800       78.57400\nN        -24.72500        2.60200       76.56100\nC        -25.51900        1.40400       76.77400\nC        -24.63300        0.18000       76.86500\nO        -23.54800        0.14700       76.28000\nC        -26.52400        1.24000       75.64600\nN        -25.08800       -0.82000       77.61400\nC        -24.37500       -2.07200       77.73400\nC        -25.31200       -3.20100       77.30300\nO        -26.52100       -3.14200       77.55100\nC        -23.66400       -2.26400       79.09600\nC        -24.59600       -2.83900       80.15300\nC        -22.42200       -3.13000       78.94300\nN        -24.78000       -4.14600       76.54100\nC        -25.57400       -5.25500       76.05500\nC        -25.51200       -6.34600       77.10400\nO        -24.45700       -6.94500       77.32600\nC        -25.07600       -5.72400       74.67100\nC        -25.93300       -6.73400       73.89800\nC        -27.31900       -6.18900       73.59300\nC        -25.25500       -7.13700       72.61100\nN        -26.63800       -6.54900       77.80200\nC        -26.78300       -7.56100       78.84900\nC        -26.84400       -8.96300       78.20200\nO        -25.85600       -9.38600       77.59200\nC        -28.00500       -7.25200       79.73400\nC        -27.67100       -7.24600       81.22400\nC        -28.42200       -6.19900       82.03000\nO        -29.50900       -5.73300       81.66200\nN        -27.85500       -5.83000       83.17200\nN        -27.97700       -9.67200       78.30200\nC        -28.06400      -10.98300       77.67000\nC        -28.37500      -10.81800       76.18100\nO        -27.53800      -11.14800       75.34000\nC        -29.06900      -11.88400       78.38500\nO        -28.49700      -12.39900       79.57900\nN        -29.54400      -10.25400       75.86600\nC        -29.98700       -9.99400       74.49600\nC        -30.41300       -8.53300       74.39000\nO        -30.59500       -8.01400       73.28700\nC        -31.20500      -10.88900       74.16200\nC        -30.93400      -12.37200       73.96000\nO        -30.27800      -12.98700       74.83800\nO        -31.46200      -12.94200       72.97500\nN        -30.59500       -7.88600       75.54900\nC        -31.12300       -6.53600       75.68000\nC        -30.10700       -5.51100       76.15800\nO        -29.08200       -5.86700       76.75100\nC        -32.36100       -6.55900       76.60300\nC        -33.38400       -7.69500       76.39300\nC        -34.30600       -7.82500       77.58800\nC        -34.19400       -7.49900       75.10900\nN        -30.41400       -4.23100       75.89900\nC        -29.58500       -3.09600       76.28200\nC        -30.00100       -2.47900       77.59000\nO        -31.18700       -2.44900       77.93200\nC        -29.61200       -2.00900       75.20200\nC        -29.01100       -2.43500       73.88800\nC        -29.81000       -2.96100       72.88000\nC        -27.64700       -2.32500       73.65100\nC        -29.25800       -3.37600       71.66900\nC        -27.08300       -2.72800       72.44100\nC        -27.89300       -3.25600       71.45100\nO        -27.34700       -3.64300       70.24500\nN        -29.01500       -1.93000       78.29600\nC        -29.21600       -1.21400       79.55200\nC        -28.33900        0.00700       79.55400\nO        -27.18600       -0.06200       79.13700\nC        -28.92500       -2.12900       80.76200\nO        -29.95800       -3.10400       80.81600\nC        -28.89100       -1.38400       82.09100\nN        -28.88400        1.11500       80.04000\nC        -28.14000        2.34400       80.24600\nC        -28.69100        3.09600       81.43900\nO        -29.74900        2.74100       81.96700\nC        -27.99300        3.23900       78.98100\nC        -29.20700        3.97100       78.35600\nC        -29.68800        5.15900       79.21800\nC        -28.82000        4.54600       76.99700\nN        -27.95900        4.13900       81.84900\nC        -28.33600        5.05700       82.90000\nC        -27.98500        6.49300       82.49300\nO        -27.01900        6.72000       81.76500\nC        -27.67700        4.68300       84.22600\nO        -28.07000        5.58200       85.25300\nN        -28.78900        7.45600       82.94800\nC        -28.53300        8.87700       82.73800\nC        -28.45200        9.51100       84.11400\nO        -29.20300        9.12000       85.01100\nC        -29.62000        9.54100       81.89700\nO        -29.22900       10.86200       81.55100\nN        -27.50900       10.44500       84.30000\nC        -27.30900       11.10400       85.58800\nC        -27.36200       12.60800       85.47700\nO        -27.00500       13.16900       84.43900\nC        -25.99500       10.66300       86.22800\nO        -24.87000       11.24500       85.58800\nN        -27.79900       13.25500       86.56400\nC        -27.87600       14.70500       86.65200\nC        -27.36400       15.22500       88.00500\nO        -27.78400       14.73400       89.05900\nC        -29.24700       15.28700       86.18800\nC        -30.37900       14.95500       87.16500\nC        -29.16100       16.78900       85.91000\nN        -26.41000       16.17400       87.95800\nC        -25.85500       16.81700       89.14700\nC        -26.63400       18.10200       89.37800\nO        -26.68300       18.97800       88.49700\nC        -24.34500       17.02900       89.02700\nO        -23.73000       15.78300       88.70900\nC        -23.73000       17.59600       90.30800\nN        -27.26000       18.18100       90.57100\nC        -28.13100       19.27100       91.02300\nC        -28.03500       19.53400       92.54300\nO        -27.98500       18.58100       93.32100\nC        -29.61500       19.03900       90.60300\nC        -29.89200       19.54200       89.18900\nC        -30.04100       17.57600       90.77300\nN        -28.12200       20.80800       92.99300\nC        -28.07500       21.08600       94.43900\nC        -29.42500       20.87900       95.13800\nO        -30.44500       21.47700       94.77800\nC        -27.62200       22.55300       94.49700\nC        -27.29400       22.94700       93.04800\nC        -28.17200       22.06900       92.23200\nN        -37.63600       14.27600       92.09700\nC        -36.97400       14.61900       90.83000\nC        -37.53100       13.80400       89.65800\nO        -38.00000       12.72300       89.91700\nC        -35.43000       14.46800       90.97600\nC        -34.80000       13.74900       89.78600\nC        -34.77300       15.82800       91.13700\nN        -37.46600       14.26700       88.37700\nC        -38.03200       13.44900       87.26300\nC        -37.23900       13.31100       85.91900\nO        -36.83600       14.33100       85.36000\nC        -39.51400       13.76000       87.05300\nO        -40.14600       13.92900       88.31100\nC        -40.25500       12.69500       86.22300\nN        -37.15000       12.05500       85.37900\nC        -36.47800       11.69600       84.12300\nC        -37.46200       11.26100       82.98800\nO        -38.43600       10.54700       83.24000\nC        -35.36900       10.65900       84.34300\nS        -35.83700        8.93500       83.98700\nN        -37.20100       11.69900       81.71900\nC        -38.03200       11.39100       80.54200\nC        -37.37000       10.36800       79.64000\nO        -36.32800       10.62700       79.03700\nC        -38.41300       12.63400       79.74600\nC        -38.53000       13.89000       80.56600\nO        -39.47000       14.07000       81.34800\nN        -37.55300       14.75900       80.45300\nN        -38.00300        9.20200       79.53800\nC        -37.50600        8.08900       78.73800\nC        -38.43000        7.81600       77.57100\nO        -39.64800        7.78300       77.73900\nC        -37.33100        6.80100       79.59900\nC        -36.42800        5.78600       78.89500\nC        -36.75600        7.12900       80.97900\nN        -37.84000        7.60400       76.39600\nC        -38.58100        7.24400       75.20300\nC        -37.81300        6.18200       74.43400\nO        -36.61300        6.33900       74.19500\nC        -38.83500        8.46500       74.32600\nN        -38.49300        5.06900       74.10500\nC        -37.95100        3.98000       73.28800\nC        -38.75800        3.97400       71.97500\nO        -39.80700        3.31500       71.89900\nC        -38.03100        2.62900       74.00200\nC        -37.31900        1.53100       73.27000\nN        -37.92300        0.31500       73.04000\nC        -36.07600        1.50700       72.73600\nC        -37.03500       -0.40700       72.37900\nN        -35.90600        0.26600       72.18500\nN        -38.31300        4.76500       70.95800\nC        -39.08200        4.88400       69.70300\nC        -39.45300        3.60400       68.97400\nO        -40.53600        3.55100       68.40600\nC        -38.22800        5.81700       68.84400\nC        -37.43000        6.59500       69.82600\nC        -37.11300        5.62400       70.91400\nN        -38.59000        2.57300       69.01100\nC        -38.84400        1.28700       68.35500\nC        -40.08200        0.58200       68.88100\nO        -40.77800       -0.06900       68.09700\nC        -37.64600        0.38700       68.49100\nN        -40.36300        0.73100       70.19800\nC        -41.51800        0.13600       70.87600\nC        -42.57400        1.18200       71.27100\nO        -43.49700        0.86700       72.03900\nC        -41.07300       -0.66600       72.09900\nO        -40.62500        0.17800       73.14700\nN        -42.43900        2.42200       70.73800\nC        -43.33500        3.57200       70.96600\nC        -43.67800        3.75900       72.45800\nO        -44.83200        4.00100       72.83100\nC        -44.57900        3.49100       70.07800\nO        -45.37900        2.36500       70.39300\nN        -42.63400        3.62300       73.30500\nC        -42.70200        3.74900       74.75700\nC        -42.29200        5.13500       75.17900\nO        -41.38700        5.72600       74.59200\nC        -41.75800        2.73200       75.41700\nO        -42.14100        1.44000       75.03400\nC        -41.75000        2.80800       76.94500\nN        -42.95600        5.63800       76.22100\nC        -42.69300        6.91100       76.87300\nC        -42.97200        6.69800       78.36000\nO        -44.06700        6.26200       78.73500\nC        -43.54900        8.04100       76.27800\nC        -42.95300        8.65500       75.01600\nC        -43.82000        9.78000       74.47100\nC        -43.07300       10.66400       73.50100\nN        -43.99700       11.36100       72.56700\nN        -41.94600        6.89800       79.19500\nC        -42.03200        6.70700       80.64200\nC        -41.45400        7.94100       81.34400\nO        -40.35400        8.38400       81.00400\nC        -41.33700        5.37900       81.08300\nC        -41.12800        5.31600       82.59800\nC        -42.12200        4.15600       80.60700\nN        -42.21300        8.51000       82.29400\nC        -41.77500        9.65900       83.08800\nC        -41.62600        9.18200       84.53300\nO        -42.59500        8.69600       85.12100\nC        -42.75000       10.85200       82.94900\nC        -42.56900       11.72900       81.70700\nO        -43.26200       12.76400       81.60400\nO        -41.72800       11.38300       80.84200\nN        -40.39000        9.23800       85.07100\nC        -40.08300        8.74300       86.41800\nC        -39.55500        9.78000       87.40000\nO        -38.47200       10.33600       87.18900\nC        -39.13800        7.52500       86.36100\nC        -38.89000        6.85800       87.71600\nC        -40.07100        6.00300       88.18200\nC        -40.62700        6.46100       89.50800\nN        -41.48700        5.41800       90.13400\nN        -40.31100        9.97600       88.50700\nC        -39.99800       10.89000       89.60200\nC        -39.07500       10.21100       90.63800\nO        -39.42700        9.16500       91.17200\nC        -41.27700       11.48500       90.25700\nC        -42.21200       12.25700       89.30200\nC        -43.45300       12.87800       89.95400\nC        -43.29000       14.31500       90.40600\nN        -44.52700       14.82100       91.06300\nN        -37.87600       10.80200       90.88400\nC        -36.85700       10.35400       91.84200\nC        -37.22600       10.88200       93.22700\nO        -37.16900       12.08600       93.49700\nC        -35.37200       10.65700       91.41100\nC        -35.01500       10.01000       90.05500\nC        -34.36000       10.20100       92.48100\nC        -35.13600       10.84200       88.90400\nN        -37.65700        9.95600       94.08400\nC        -38.06200       10.21500       95.47100\nC        -36.95700        9.73300       96.43100\nO        -36.41500        8.64500       96.20900\nC        -39.53500        9.79500       95.83000\nC        -40.17600        8.87000       94.80600\nC        -39.68400        9.23700       97.23600\nN        -36.56100       10.55300       97.43900\nC        -35.46900       10.13900       98.33200\nC        -35.82100        8.93400       99.18400\nO        -36.96500        8.77100       99.60700\nC        -35.22400       11.37500       99.20900\nC        -35.93800       12.49300       98.54300\nC        -37.09100       11.87400       97.82900\nN        -34.80800        8.10400       99.43400\nC        -34.89300        6.91100      100.25400\nC        -34.54600        7.26400      101.70400\nO        -33.57300        7.97400      101.95900\nC        -33.94500        5.83300       99.69700\nC        -33.91800        4.52800      100.48500\nC        -35.26700        3.83900      100.51400\nN        -35.30800        2.78800      101.52900\nC        -36.42300        2.32200      102.08100\nN        -36.36700        1.36100      102.99400\nN        -37.60400        2.81700      101.72900\nN         -1.24700      -10.05500       62.45900\nC         -1.82600       -8.80900       62.95700\nC         -0.85400       -7.61600       62.87600\nO          0.33900       -7.75100       63.15600\nC         -2.38600       -8.98500       64.39400\nC         -2.78600       -7.69400       65.10800\nC         -3.11200       -7.68900       66.59000\nO         -2.92200       -8.73400       67.24900\nO         -3.49900       -6.61500       67.10200\nN         -1.41800       -6.43300       62.55600\nC         -0.71700       -5.15500       62.52500\nC         -0.90000       -4.56200       63.92300\nO         -2.02900       -4.28800       64.34300\nC         -1.28600       -4.22600       61.44000\nC         -1.04500       -4.63200       59.99600\nC         -1.87000       -3.77900       59.05200\nC          0.42700       -4.53200       59.63700\nN          0.20200       -4.46900       64.67700\nC          0.19600       -4.02100       66.06900\nC          0.40800       -2.52600       66.25100\nO          1.39800       -1.98600       65.79600\nC          1.13400       -4.90900       66.91000\nO          0.64300       -6.25000       66.85500\nC          1.20300       -4.47100       68.36400\nN         -0.50800       -1.88600       66.97800\nC         -0.45100       -0.46400       67.31500\nC         -0.66000       -0.30700       68.81400\nO         -1.48900       -1.03700       69.37200\nC         -1.61100        0.29600       66.65100\nC         -1.57600        0.38500       65.16400\nC         -2.63700        1.33900       64.70500\nO         -2.62600        2.52700       65.03800\nN         -3.55400        0.84900       63.90200\nN         -0.02800        0.69600       69.47300\nC         -0.34100        0.93800       70.89600\nC         -1.81700        1.35400       71.03900\nO         -2.27000        2.12200       70.20300\nC          0.62800        2.05700       71.29100\nC          0.97700        2.74600       70.00200\nC          0.94700        1.68000       68.95200\nN         -2.61900        0.83500       72.01000\nC         -4.03900        1.21900       72.07000\nC         -4.29000        2.70600       72.28800\nO         -5.35000        3.21900       71.90700\nC         -4.58600        0.37500       73.22700\nC         -3.62500       -0.70000       73.41000\nC         -2.29500       -0.11700       73.08800\nN         -3.31400        3.39800       72.88300\nC         -3.41300        4.82100       73.15800\nC         -2.07000        5.48800       73.22900\nO         -1.10300        4.88400       73.68700\nC         -4.19700        5.06600       74.44900\nO         -3.35300        5.18500       75.58000\nN         -2.01900        6.75200       72.78500\nC         -0.84600        7.62500       72.83400\nC         -1.30700        8.97600       73.41100\nO         -2.26900        9.56400       72.91500\nC         -0.09400        7.73400       71.47200\nC          0.85300        8.93100       71.43400\nC          0.66900        6.44200       71.16800\nN         -0.65600        9.42000       74.49700\nC         -0.96400       10.69000       75.16100\nC          0.20100       11.64300       74.97800\nO          1.36100       11.25500       75.16800\nC         -1.25600       10.47800       76.64600\nO         -2.35700       11.27000       77.06600\nN         -0.10500       12.87800       74.55800\nC          0.87400       13.94700       74.31500\nC          0.34600       15.28100       74.86500\nO         -0.86200       15.44400       75.04100\nC          1.31900       14.08300       72.81300\nC          2.27200       12.97900       72.39800\nC          0.12800       14.15600       71.86300\nN          1.25700       16.22500       75.14300\nC          0.88600       17.55600       75.62200\nC          0.63500       18.42200       74.37700\nO          1.26900       18.16800       73.34200\nC          2.01500       18.15100       76.45400\nN         -0.26600       19.44100       74.41900\nC         -0.45900       20.26800       73.20500\nC          0.86300       20.87100       72.70200\nO          1.69400       21.28300       73.51400\nC         -1.48100       21.33400       73.62100\nC         -1.99000       20.93100       74.94300\nC         -1.10900       19.89600       75.55000\nN          1.07600       20.82800       71.38700\nC          2.28500       21.34200       70.74900\nC          3.43400       20.35200       70.63800\nO          4.39800       20.62000       69.92300\nN          3.35800       19.21000       71.34300\nC          4.39000       18.17100       71.28200\nC          4.20500       17.26100       70.06200\nO          3.21300       17.36700       69.33400\nC          4.40900       17.33000       72.56200\nC          5.06400       17.97100       73.77000\nC          4.90200       17.04600       74.95700\nO          4.30400       15.96400       74.87200\nN          5.41800       17.44700       76.10500\nN          5.18900       16.39900       69.82400\nC          5.19800       15.49300       68.69200\nC          4.64800       14.14000       69.09200\nO          5.18700       13.48500       69.97300\nC          6.59300       15.45000       68.05800\nO          6.90100       16.74700       67.55200\nC          6.69800       14.43300       66.93900\nN          3.56800       13.72900       68.43000\nC          2.95500       12.43400       68.66000\nC          3.55000       11.43100       67.66700\nO          3.71300       11.73600       66.48300\nC          1.44600       12.53700       68.49300\nN          3.91000       10.24000       68.17100\nC          4.45200        9.15300       67.35800\nC          3.63000        7.90700       67.60100\nO          3.50000        7.44800       68.73800\nC          5.95000        8.93000       67.62500\nC          6.81800       10.02500       67.02100\nC          8.25700        9.93000       67.48100\nN          8.84900       11.25900       67.64200\nC          9.43300       11.93900       66.66200\nN          9.93500       13.14300       66.89100\nN          9.52100       11.41700       65.44500\nN          2.99200        7.41900       66.54100\nC          2.11700        6.24900       66.58900\nC          2.76300        5.20200       65.72100\nO          2.96000        5.42100       64.52800\nC          0.65900        6.59400       66.14500\nC          0.01300        7.63700       67.08500\nC         -0.20100        5.33000       66.04000\nC         -1.11900        8.43600       66.49400\nN          3.12400        4.07700       66.33600\nC          3.77700        2.97200       65.64800\nC          2.78300        1.91000       65.15900\nO          1.64100        1.83200       65.63000\nC          4.83900        2.33900       66.54200\nO          4.22800        1.80900       67.70900\nN          3.24500        1.09000       64.21200\nC          2.48800        0.02100       63.60100\nC          3.50100       -1.04500       63.23100\nO          4.42000       -0.77400       62.45200\nC          1.73400        0.54200       62.38100\nS          0.81400       -0.72600       61.48500\nN          3.37600       -2.23900       63.82400\nC          4.31300       -3.32900       63.58700\nC          3.68100       -4.52100       62.92000\nO          2.56600       -4.90100       63.26100\nC          4.97900       -3.76600       64.88800\nO          5.75400       -2.71300       65.43100\nN          4.43400       -5.12600       62.00800\nC          4.03900       -6.32200       61.27600\nC          5.22300       -7.02400       60.64900\nO          6.23500       -6.38600       60.37400\nN          5.09300       -8.34100       60.40500\nC          6.11500       -9.19300       59.78200\nC          6.48400       -8.65700       58.39100\nO          5.64900       -8.62600       57.47600\nC          5.63500      -10.66600       59.72600\nC          6.65900      -11.73400       59.33100\nO          7.86000      -11.39600       59.17800\nO          6.25900      -12.91600       59.19700\nN          7.74800       -8.19400       58.26100\nC          8.32900       -7.60500       57.04400\nC          7.50400       -6.43400       56.47400\nO          7.45400       -6.25200       55.26100\nC          8.60000       -8.67500       55.98700\nO          9.78500       -9.39700       56.27100\nN          6.89000       -5.61500       57.36700\nC          6.05200       -4.44900       57.02500\nC          6.74800       -3.43700       56.10100\nO          6.08400       -2.78700       55.27900\nC          5.52700       -3.75600       58.31400\nC          4.38100       -2.75800       58.13500\nC          3.13000       -3.44600       57.61700\nC          4.09600       -1.99800       59.40300\nN          8.07200       -3.32900       56.24300\nC          8.91200       -2.44000       55.44500\nC          8.88800       -2.76100       53.96400\nO          9.12400       -1.87600       53.13300\nN          8.58900       -4.03000       53.61700\nC          8.50000       -4.48100       52.22400\nC          7.09000       -4.30600       51.60900\nO          6.84800       -4.76000       50.48700\nC          9.03500       -5.90400       52.07200\nO          8.34400       -6.83200       52.88800\nN          6.18100       -3.60300       52.34000\nC          4.81800       -3.28300       51.91900\nC          4.54900       -1.78700       52.08300\nO          5.31300       -1.09500       52.76000\nC          3.78800       -4.11000       52.70900\nC          4.00900       -5.60600       52.63500\nC          3.59300       -6.34400       51.53300\nC          4.60200       -6.29200       53.69500\nC          3.76100       -7.72300       51.47900\nC          4.76400       -7.67500       53.65500\nC          4.35600       -8.38400       52.54100\nO          4.53700       -9.73900       52.50200\nN          3.46200       -1.29500       51.47700\nC          3.07400        0.12400       51.53200\nC          2.06800        0.37100       52.66500\nO          1.01800       -0.26500       52.70400\nC          2.50700        0.58400       50.17600\nC          3.45800        0.43300       49.01200\nC          4.31900        1.46700       48.65400\nC          3.48100       -0.73900       48.25400\nC          5.18500        1.33100       47.56100\nC          4.37400       -0.88600       47.18800\nC          5.21400        0.15100       46.84200\nN          2.40900        1.27900       53.59300\nC          1.59600        1.60300       54.76900\nC          0.84100        2.92000       54.61400\nO          1.42700        3.96200       54.30900\nC          2.38200        1.51400       56.10400\nC          1.48900        1.81700       57.31000\nC          3.01700        0.13900       56.26000\nN         -0.46800        2.84800       54.84900\nC         -1.39900        3.97600       54.80100\nC         -1.91300        4.23900       56.21200\nO         -1.99700        3.30500       57.02700\nC         -2.55500        3.66800       53.82300\nC         -2.08700        2.94000       52.59700\nN         -1.17500        3.50900       51.72000\nC         -2.39300        1.69900       52.15900\nC         -0.95800        2.59700       50.78300\nN         -1.66900        1.49400       51.00300\nN         -2.22200        5.49900       56.50500\nC         -2.73600        5.92800       57.79900\nC         -4.04800        6.64900       57.63900\nO         -4.19200        7.52200       56.76300\nC         -1.71500        6.78800       58.57200\nC         -0.48400        6.03600       59.01300\nC          0.67500        5.87700       58.30800\nC         -0.29300        5.35100       60.26300\nN          1.58600        5.16300       59.05000\nC          1.01400        4.81600       60.25200\nC         -1.09300        5.17000       61.41500\nC          1.54600        4.11700       61.34500\nC         -0.56000        4.48100       62.50100\nC          0.74600        3.96800       62.46000\nN         -5.01000        6.27500       58.50000\nC         -6.35200        6.83400       58.55300\nC         -6.61100        7.47600       59.87900\nO         -6.24200        6.92900       60.91000\nC         -7.43300        5.77200       58.25600\nC         -7.25100        5.11100       56.90500\nC         -6.52300        3.93300       56.77300\nC         -7.73800        5.71200       55.74400\nC         -6.31900        3.34600       55.53200\nC         -7.51900        5.14200       54.49500\nC         -6.81200        3.95800       54.39100\nO         -6.61800        3.37700       53.15400\nN         -7.23400        8.66700       59.84200\nC         -7.65400        9.42500       61.01100\nC         -9.18700        9.31000       61.10200\nO         -9.89400        9.56700       60.12100\nC         -7.22700       10.89300       60.88800\nC         -7.73400       11.76700       62.02200\nC         -7.57200       13.23800       61.75500\nO         -8.25300       13.82000       60.91000\nN         -6.71400       13.88500       62.52600\nN         -9.68800        8.89600       62.26200\nC        -11.12200        8.78100       62.45500\nC        -11.57000        9.46300       63.72700\nO        -11.10800        9.12900       64.81300\nC        -11.60800        7.32800       62.38300\nC        -13.13100        7.19300       62.44000\nC        -13.55600        5.76200       62.45400\nO        -12.88300        4.89800       63.01800\nN        -14.70200        5.47600       61.84500\nN        -12.48700       10.42900       63.56400\nC        -13.08800       11.16200       64.66600\nC        -14.42400       10.52600       64.99200\nO        -14.98200        9.88200       64.10400\nC        -13.20200       12.64800       64.33100\nC        -11.87100       13.34200       64.52800\nC        -11.79600       14.63000       63.77000\nC        -10.44300       15.26400       63.96000\nN        -10.41400       16.66600       63.47000\nN        -14.90200       10.59000       66.26700\nC        -16.17500        9.92100       66.61900\nC        -17.35600       10.30700       65.74000\nO        -17.56200       11.49500       65.47800\nC        -16.39400       10.32500       68.08100\nC        -15.00700       10.56200       68.59700\nC        -14.31100       11.24700       67.45200\nN        -18.07400        9.28800       65.26200\nC        -19.22800        9.44700       64.38700\nC        -18.88200        9.85700       62.96800\nO        -19.77300       10.20900       62.18500\nN        -17.59000        9.80600       62.60900\nC        -17.13600       10.17200       61.26700\nC        -16.50500        9.00300       60.55600\nO        -16.13500        8.01500       61.19400\nC        -16.16400       11.35500       61.30900\nC        -16.72300       12.61300       61.97200\nC        -16.22000       13.85700       61.28000\nO        -15.01800       14.16600       61.29200\nN        -17.12500       14.56700       60.59500\nN        -16.43500        9.09400       59.22300\nC        -15.79600        8.10800       58.36200\nC        -14.26500        8.29800       58.45200\nO        -13.81300        9.44100       58.65300\nC        -16.25200        8.31600       56.93100\nN        -13.44500        7.23600       58.28700\nC        -11.97200        7.43400       58.31600\nC        -11.48200        8.37900       57.20900\nO        -12.10400        8.46700       56.14900\nC        -11.40500        6.01700       58.13700\nC        -12.54900        5.10100       58.52600\nC        -13.79300        5.81800       58.06900\nN        -10.40800        9.13000       57.48300\nC         -9.79700       10.06900       56.52800\nC         -8.34900        9.62900       56.27200\nO         -7.59400        9.45200       57.21200\nC         -9.86600       11.55800       57.00300\nC         -9.03900       12.47800       56.10800\nC        -11.30400       12.07000       57.09200\nN         -7.96400        9.47700       55.00400\nC         -6.60500        9.15000       54.59300\nC         -5.68900       10.36000       54.85600\nO         -5.85400       11.41000       54.24100\nC         -6.60300        8.75700       53.09800\nC         -5.28100        8.27900       52.48500\nC         -4.82500        6.95900       53.07800\nC         -5.40100        8.17200       51.01100\nN         -4.74800       10.20900       55.80700\nC         -3.78200       11.25300       56.18000\nC         -2.37500       11.01200       55.60700\nO         -1.65000       11.98000       55.39600\nC         -3.75600       11.58700       57.69800\nC         -5.07500       12.21600       58.12900\nC         -3.40200       10.36700       58.57500\nN         -2.00300        9.72700       55.35000\nC         -0.71600        9.27700       54.79800\nC         -0.94200        8.03200       53.95300\nO         -1.64100        7.12700       54.36400\nC          0.43500        9.08700       55.89100\nC          1.19500       10.38900       56.13000\nC          1.48700        8.02100       55.48000\nC          0.77700       11.09700       57.23200\nN         -0.35300        7.99000       52.76700\nC         -0.44000        6.82300       51.90900\nC          0.96000        6.50800       51.47200\nO          1.76300        7.42800       51.37100\nC         -1.41000        7.02600       50.72600\nC         -0.96400        8.04300       49.69900\nC         -0.26300        7.65000       48.56100\nC         -1.26600        9.38900       49.84200\nC          0.15700        8.58400       47.61400\nC         -0.87300       10.32800       48.88800\nC         -0.16100        9.91900       47.77800\nO          0.24700       10.84900       46.85700\nN          1.25700        5.22800       51.21100\nC          2.58200        4.75800       50.75400\nC          3.72000        5.23800       51.64800\nO          4.63100        5.94200       51.20300\nC          2.83900        5.08500       49.26300\nC          1.83800        4.45300       48.32500\nO          1.29100        3.37800       48.67400\nO          1.58400        5.03500       47.25200\nN          3.60400        4.89100       52.93800\nC          4.57700        5.16200       54.00300\nC          4.70900        6.61200       54.45600\nO          4.66000        6.85100       55.65600\nC          5.97500        4.59000       53.66300\nC          5.97300        3.18700       53.10200\nO          5.11900        2.38400       53.51900\nO          6.85900        2.87700       52.28700\nN          4.89700        7.56900       53.50600\nC          5.21800        8.96500       53.79900\nC          4.47200       10.02100       53.00300\nO          4.72100       11.21000       53.21600\nC          6.72000        9.17500       53.59200\nO          7.13500        8.69100       52.32100\nN          3.58600        9.62100       52.08300\nC          2.90400       10.59000       51.22800\nC          1.65300       11.17500       51.81300\nO          0.76200       10.46200       52.24900\nC          2.66000       10.04700       49.83500\nC          3.90800        9.67500       49.11000\nO          4.53900       10.51400       48.46300\nN          4.29400        8.41000       49.22300\nN          1.58400       12.48900       51.78300\nC          0.46100       13.24900       52.28300\nC         -0.48200       13.56900       51.14100\nO         -0.06700       14.27000       50.21300\nC          0.95700       14.57400       52.85500\nC          1.01500       14.65400       54.35600\nC          1.39300       16.06300       54.78500\nN          2.52000       16.60900       54.02400\nC          3.80100       16.32900       54.25300\nN          4.74500       16.87100       53.50500\nN          4.14400       15.50700       55.23100\nN         -1.77500       13.17100       51.21800\nC         -2.72700       13.59700       50.17800\nC         -2.87200       15.11700       50.21900\nO         -2.55300       15.71900       51.24400\nC         -4.03500       12.90100       50.59500\nC         -3.60500       11.76800       51.47800\nC         -2.44100       12.32700       52.23100\nN         -3.28600       15.74700       49.10600\nC         -3.49000       17.20500       49.04900\nC         -4.57400       17.60000       50.06800\nO         -5.59600       16.90700       50.20400\nC         -3.89800       17.64900       47.65000\nO         -3.05100       17.08900       46.66100\nN         -4.29400       18.65800       50.82100\nC         -5.19200       19.14500       51.85700\nC         -4.90400       18.62600       53.24600\nO         -5.60100       18.98600       54.19100\nN         -3.88400       17.76400       53.37500\nC         -3.44900       17.20200       54.65000\nC         -2.27400       18.05200       55.17100\nO         -1.31000       18.25800       54.43400\nC         -3.13100       15.66900       54.55800\nC         -4.36900       14.84400       54.10100\nC         -2.55100       15.12400       55.87900\nC         -5.73800       14.99800       54.98600\nN         -2.36100       18.58800       56.41600\nC         -1.26900       19.44100       56.93200\nC          0.09500       18.78100       56.98100\nO          0.20900       17.58300       57.25300\nC         -1.73700       19.80900       58.34000\nC         -3.21900       19.60600       58.30700\nC         -3.45400       18.46000       57.40000\nN          1.11700       19.58400       56.70800\nC          2.54700       19.27500       56.71800\nC          2.99700       18.53000       58.02000\nO          3.93200       17.73400       57.97500\nC          3.29800       20.60100       56.55100\nC          4.74800       20.48600       56.10900\nC          5.00200       20.12000       54.65800\nO          4.04900       20.15500       53.84400\nO          6.17300       19.80900       54.33300\nN          2.29600       18.77900       59.15700\nC          2.47000       18.21200       60.51300\nC          2.47500       16.68200       60.50100\nO          3.15800       16.06500       61.31500\nC          1.30100       18.64300       61.42000\nC          1.23000       20.11000       61.76800\nC          0.10400       20.35400       62.76500\nN         -1.21600       20.12100       62.17400\nC         -2.32500       19.92000       62.87200\nN         -3.47800       19.72100       62.25100\nN         -2.29300       19.92400       64.19700\nN          1.65600       16.08600       59.62000\nC          1.54700       14.65500       59.42200\nC          2.66300       14.19200       58.51700\nO          2.85600       14.72600       57.43500\nC          0.18000       14.28800       58.81400\nC         -0.97900       14.59100       59.72600\nC         -1.60900       15.83000       59.68500\nC         -1.42500       13.65000       60.64800\nC         -2.65600       16.12700       60.55500\nC         -2.48200       13.94200       61.50600\nC         -3.08500       15.18200       61.45900\nN          3.41700       13.21300       58.98000\nC          4.49800       12.61200       58.22300\nC          4.56700       11.15500       58.63900\nO          4.06900       10.79400       59.70300\nC          5.82800       13.34000       58.45900\nO          6.28000       13.20900       59.79600\nN          5.15200       10.32900       57.79100\nC          5.25900        8.91700       58.09300\nC          6.53200        8.29600       57.58700\nO          7.24300        8.88300       56.77500\nN          6.82400        7.09900       58.07800\nC          7.97900        6.31700       57.67400\nC          7.67200        4.84300       57.87500\nO          6.81900        4.49000       58.69000\nC          9.22900        6.72800       58.44700\nO          9.06700        6.57400       59.84600\nN          8.34400        3.99700       57.10300\nC          8.20600        2.55500       57.15900\nC          9.52000        1.94700       56.72100\nO         10.03900        2.27700       55.65400\nC          7.03100        2.07200       56.28700\nC          6.82200        0.58400       56.22800\nO          7.06500       -0.14800       57.18900\nN          6.31100        0.10400       55.10400\nN         10.08400        1.10900       57.59000\nC         11.33000        0.36500       57.40800\nC         11.31500       -0.80600       58.36100\nO         10.79200       -0.69400       59.46100\nC         12.55900        1.24300       57.64800\nO         12.50000        1.91000       58.89800\nN         11.84900       -1.93000       57.89800\nC         11.93000       -3.17300       58.65700\nC         10.59200       -3.81100       58.94900\nO          9.96700       -4.39000       58.06000\nN         10.16800       -3.75200       60.21300\nC          8.90500       -4.31600       60.69500\nC          7.99200       -3.23300       61.25100\nO          6.89800       -3.56300       61.68600\nC          9.17100       -5.33400       61.83300\nC          9.71300       -6.68900       61.43700\nO          9.97500       -6.99500       60.26600\nN          9.88300       -7.53800       62.43900\nN          8.44600       -1.96200       61.27500\nC          7.71600       -0.86700       61.89600\nC          7.42300        0.36500       61.03700\nO          8.34100        0.98500       60.50400\nC          8.40300       -0.49300       63.23300\nO          8.50300       -1.67400       64.04800\nC          7.63700        0.59400       64.02200\nN          6.13100        0.75300       60.96300\nC          5.70800        1.99400       60.32400\nC          5.37700        2.96100       61.44700\nO          4.88600        2.54300       62.49500\nC          4.49400        1.76700       59.43800\nN          5.68000        4.24000       61.25600\nC          5.43600        5.26300       62.26800\nC          4.75100        6.46800       61.65800\nO          5.21800        6.99500       60.65500\nC          6.75400        5.68000       62.96500\nO          7.39600        4.52000       63.48700\nC          6.54200        6.70500       64.09300\nN          3.66500        6.92400       62.30000\nC          2.97200        8.14300       61.93100\nC          3.47900        9.23000       62.88300\nO          3.50600        9.01900       64.09000\nC          1.44600        7.96800       62.07000\nC          0.58700        9.21200       61.85800\nC          0.67300        9.73600       60.42500\nC         -0.82400        8.94400       62.25800\nN          3.89500       10.37500       62.34400\nC          4.38600       11.47500       63.16600\nC          3.51100       12.69900       62.98700\nO          3.21300       13.08500       61.85600\nC          5.88700       11.73200       62.90600\nO          6.59900       10.52200       63.14300\nC          6.46600       12.80800       63.81600\nN          3.05400       13.27100       64.10400\nC          2.24400       14.49100       64.11500\nC          2.99100       15.50900       64.97500\nO          2.99500       15.38600       66.20200\nC          0.78000       14.29100       64.61900\nC          0.10600       13.02600       64.02800\nC         -0.05300       15.56900       64.38400\nC         -1.19200       12.62100       64.72600\nN          3.65500       16.47600       64.33100\nC          4.36900       17.54200       65.03100\nC          3.37600       18.65200       65.36600\nO          2.39600       18.83300       64.63000\nC          5.52900       18.07500       64.19100\nO          5.08600       18.70100       63.00100\nN          3.61200       19.34800       66.48200\nC          2.75200       20.41900       66.96200\nC          1.31800       19.98000       67.16100\nO          0.39400       20.64100       66.67000\nN          1.12500       18.84100       67.86900\nC         -0.18400       18.23800       68.14800\nC         -1.16700       19.21000       68.85400\nO         -0.83800       19.77700       69.89000\nC         -0.04100       16.90700       68.92000\nO          0.93800       16.08000       68.29400\nC         -1.34400       16.14100       68.99500\nN         -2.38100       19.37900       68.30200\nC         -3.37900       20.22700       68.95100\nC         -4.64900       19.42600       69.22700\nO         -4.68600       18.23500       68.91000\nC         -3.61300       21.56100       68.20300\nC         -2.37900       22.50200       68.11500\nC         -1.62900       22.83600       69.40800\nO         -2.17700       22.85500       70.52500\nN         -0.34500       23.15200       69.26900\nN         -5.66900       20.05300       69.85400\nC         -6.92900       19.38500       70.22200\nC         -7.63300       18.72400       69.05000\nO         -8.18000       17.63900       69.22200\nC         -7.86900       20.35600       70.91800\nN         -7.55600       19.34100       67.85900\nC         -8.15300       18.85800       66.61300\nC         -7.54000       17.55600       66.07000\nO         -8.10600       16.94900       65.16400\nC         -8.15900       19.97000       65.54700\nC         -6.79600       20.34100       64.98600\nC         -6.80800       21.20500       63.73600\nO         -7.88700       21.36900       63.11800\nO         -5.72300       21.69700       63.35400\nN         -6.38300       17.14300       66.60600\nC         -5.69200       15.92300       66.19600\nC         -6.14800       14.73300       67.02500\nO         -5.82500       13.59900       66.67600\nC         -4.17500       16.11000       66.27200\nC         -3.65000       17.21600       65.36900\nO         -4.14700       17.33900       64.22300\nO         -2.69300       17.91300       65.78000\nN         -6.91000       14.99300       68.11200\nC         -7.45600       13.97000       68.99000\nC         -8.43100       13.16200       68.14000\nO         -9.38900       13.71000       67.58500\nC         -8.16000       14.60300       70.19900\nC         -7.37500       14.53300       71.49300\nC         -8.20100       14.81900       72.72800\nO         -8.11100       15.95600       73.24100\nO         -8.95900       13.92400       73.16800\nN         -8.11600       11.88000       67.96000\nC         -8.84300       10.94400       67.10200\nC         -8.26200        9.53900       67.25600\nO         -7.32100        9.32500       68.03100\nC         -8.68900       11.38200       65.63700\nN         -8.84300        8.58400       66.51900\nC         -8.36400        7.20900       66.37500\nC         -7.55500        7.15800       65.08100\nO         -7.97700        7.69600       64.05300\nC         -9.53200        6.21800       66.28000\nC        -10.23400        5.89600       67.58400\nO         -9.65200        6.14900       68.65300\nO        -11.33400        5.32700       67.53300\nN         -6.37800        6.55100       65.14400\nC         -5.47400        6.43400       64.00300\nC         -5.26100        4.98500       63.68500\nO         -4.91500        4.22000       64.57400\nC         -4.14300        7.15700       64.26700\nC         -4.30300        8.65900       64.29300\nC         -4.58500        9.33000       65.48000\nC         -4.21300        9.40800       63.12300\nC         -4.76300       10.70900       65.50500\nC         -4.37100       10.78900       63.13900\nC         -4.65100       11.43400       64.33200\nO         -4.82700       12.79100       64.34800\nN         -5.52000        4.59700       62.43200\nC         -5.37200        3.22000       61.97000\nC         -4.33600        3.14300       60.87900\nO         -4.40700        3.90500       59.90700\nC         -6.70300        2.67400       61.40600\nC         -7.81100        2.57000       62.42700\nC         -8.67800        3.63100       62.65800\nC         -8.00000        1.39800       63.15700\nC         -9.69000        3.54200       63.60500\nC         -9.00700        1.30100       64.11400\nC         -9.84800        2.37400       64.33300\nO        -10.84700        2.27500       65.27100\nN         -3.37700        2.21900       61.02900\nC         -2.42000        1.93900       59.97500\nC         -3.06300        0.86900       59.10500\nO         -3.94000        0.13700       59.57300\nC         -1.06900        1.48700       60.52600\nS         -1.12400       -0.04500       61.48600\nN         -2.68100        0.81400       57.83800\nC         -3.21900       -0.17100       56.90400\nC         -2.17800       -0.57100       55.89000\nO         -1.43200        0.27700       55.39700\nC         -4.44900        0.38000       56.18600\nO         -4.96400       -0.52200       55.21400\nN         -2.15500       -1.86000       55.56800\nC         -1.29100       -2.45700       54.55300\nC         -1.89800       -3.78500       54.11200\nO         -2.52600       -4.48100       54.91700\nC          0.13100       -2.67300       55.09500\nN         -1.74800       -4.10600       52.83000\nC         -2.19900       -5.37400       52.24900\nC         -0.91600       -6.18800       52.12500\nO         -0.07900       -5.93000       51.25700\nC         -2.87700       -5.16600       50.88200\nC         -4.32800       -4.75100       50.90800\nC         -5.34000       -5.69800       50.81900\nC         -4.68600       -3.40500       50.97500\nC         -6.69000       -5.31000       50.81500\nC         -6.03500       -3.01900       50.97100\nC         -7.02700       -3.97300       50.88200\nN         -0.72600       -7.08000       53.10600\nC          0.44300       -7.93900       53.28800\nC          0.04000       -9.41400       53.15800\nO         -1.09400       -9.70800       52.77600\nC          1.07200       -7.67600       54.68500\nO          0.23900       -8.22300       55.70200\nC          1.30600       -6.20300       54.97800\nN          0.97000      -10.32800       53.49300\nC          0.76500      -11.77800       53.48700\nC         -0.11900      -12.21400       54.68500\nO         -0.75300      -13.27400       54.63200\nC          2.12200      -12.51200       53.47600\nC          2.97700      -12.28400       54.69600\nN          3.67000      -11.09300       54.89100\nC          3.26600      -13.12400       55.71800\nC          4.32600      -11.24000       56.03100\nN          4.10900      -12.44200       56.56900\nN         -0.16900      -11.35300       55.74600\nC         -0.95100      -11.48100       56.98300\nC         -2.43300      -11.16700       56.72800\nO         -2.73400      -10.29700       55.91000\nC         -0.42100      -10.50100       58.03400\nC          0.99900      -10.74800       58.47500\nO          1.45600      -11.89100       58.58400\nN          1.71600       -9.67300       58.77900\nN         -3.34600      -11.83800       57.46300\nC         -4.80900      -11.67400       57.34100\nC         -5.39400      -10.22600       57.57300\nO         -6.36600       -9.84400       56.90200\nC         -5.53100      -12.76700       58.14200\nO         -6.77000      -12.40100       58.73500\nN         -4.79100       -9.43900       58.49600\nC         -5.24200       -8.09200       58.86400\nC         -4.75500       -6.93800       57.98100\nO         -3.55600       -6.64000       57.92200\nC         -5.00000       -7.80600       60.35900\nC         -5.74000       -8.71100       61.33300\nO         -6.45200       -9.63200       60.87100\nO         -5.58400       -8.51900       62.55300\nN         -5.72700       -6.25700       57.33400\nC         -5.52200       -5.09900       56.46300\nC         -5.36500       -3.79600       57.28700\nO         -4.72900       -2.84800       56.83000\nC         -6.63200       -5.02100       55.38100\nC         -6.57100       -3.72500       54.58200\nC         -6.56300       -6.22100       54.45200\nN         -5.89900       -3.77600       58.50200\nC         -5.80200       -2.62500       59.39100\nC         -5.19700       -3.03700       60.70400\nO         -5.40400       -4.17000       61.16200\nC         -7.20000       -2.01700       59.65700\nC         -7.87700       -1.43300       58.43800\nC         -8.75800       -2.19500       57.68000\nC         -7.63200       -0.12300       58.04800\nC         -9.39000       -1.65400       56.56400\nC         -8.24100        0.41300       56.90800\nC         -9.10400       -0.36400       56.16400\nN         -4.53300       -2.08700       61.34600\nC         -4.05600       -2.24800       62.71000\nC         -5.23400       -2.06600       63.65500\nO         -6.30900       -1.62500       63.23100\nN         -5.04400       -2.40200       64.93300\nC         -6.07600       -2.29300       65.96100\nC         -6.52000       -0.88400       66.31500\nO         -7.57700       -0.70300       66.92600\nN         -5.73700        0.11300       65.89700\nC         -5.99800        1.52200       66.14900\nC         -5.30700        2.06500       67.37900\nO         -5.02800        1.33700       68.33500\nN         -5.05500        3.36800       67.36200\nC         -4.47500        4.10700       68.47900\nC         -5.30500        5.35200       68.69800\nO         -5.43600        6.18300       67.79300\nC         -3.02100        4.52800       68.20900\nO         -2.21800        3.38300       67.92900\nC         -2.41700        5.29100       69.36500\nN         -5.79700        5.51500       69.92000\nC         -6.52500        6.71200       70.25900\nC         -5.51200        7.75400       70.72000\nO         -4.75900        7.50700       71.66100\nC         -7.59400        6.44800       71.32600\nC         -8.51600        7.63600       71.51000\nC         -9.77900        7.19800       72.18600\nC        -10.95000        7.95500       71.63500\nN        -12.21800        7.36700       72.15000\nN         -5.46900        8.89800       70.02600\nC         -4.58000        9.99300       70.38900\nC         -5.32700       10.95000       71.32400\nO         -6.39400       11.45100       70.97800\nC         -4.01900       10.73800       69.15300\nC         -3.03000       11.88600       69.44000\nC         -1.74600       11.37100       70.10300\nC         -2.68300       12.63400       68.18200\nN         -4.76800       11.16800       72.51500\nC         -5.32200       12.06200       73.52500\nC         -4.31500       13.18000       73.80600\nO         -3.10600       12.95800       73.78800\nC         -5.81000       11.27200       74.77800\nO         -6.80800       10.33600       74.38400\nC         -6.43800       12.14600       75.80900\nN         -4.83700       14.38000       74.04600\nC         -4.05100       15.56600       74.34800\nC         -4.23600       15.92400       75.83000\nO         -5.37100       16.05900       76.31200\nC         -4.36500       16.72400       73.35800\nC         -3.95700       18.07800       73.91500\nC         -3.70100       16.48700       72.00400\nN         -3.09800       16.02400       76.55800\nC         -3.02600       16.37400       77.97900\nC         -3.70200       17.74600       78.27100\nO         -3.84600       18.55400       77.34000\nC         -1.57000       16.33000       78.48900\nC         -0.85200       14.96200       78.49300\nC          0.61200       15.14100       78.72500\nC         -1.39700       14.02500       79.55700\nN         -4.23200       17.99200       79.50100\nC         -4.11800       17.19000       80.73500\nC         -5.02800       15.98400       80.88700\nO         -6.16400       15.96600       80.41300\nC         -4.37000       18.22900       81.83400\nC         -5.36000       19.16700       81.20800\nC         -4.90800       19.28000       79.77100\nN         -4.50900       14.97700       81.60500\nC         -5.23900       13.76800       81.95500\nC         -6.27700       14.08100       83.02400\nO         -6.17200       15.09200       83.72400\nC         -4.29200       12.64500       82.41000\nC         -3.74700       11.87700       81.24400\nC         -2.86000       10.74100       81.67300\nC         -2.14300       10.13100       80.48500\nN         -1.16500        9.10600       80.91300\nN         -7.30700       13.24100       83.11600\nC         -8.40100       13.45400       84.06100\nC         -8.77000       12.14500       84.75400\nO         -8.99800       11.13900       84.09200\nC         -9.60400       14.04600       83.33100\nO        -10.38100       14.87600       84.17800\nN         -8.78200       12.15000       86.09100\nC         -9.11800       10.97400       86.90800\nC        -10.64000       10.69400       86.86800\nO        -11.42000       11.65400       86.87100\nC         -8.53100       11.12200       88.34800\nO         -8.42200        9.84700       88.99300\nC         -9.32100       12.10300       89.24600\nN        -11.08800        9.41600       86.85700\nC        -12.53400        9.16000       86.84400\nC        -13.22800        9.47900       88.16400\nO        -12.66500        9.23900       89.24500\nC        -12.63200        7.65900       86.55100\nC        -11.37000        7.08600       87.05100\nC        -10.32400        8.15200       86.82000\nN        -14.45600       10.02500       88.06800\nC        -15.28500       10.29700       89.24000\nC        -16.32500        9.17000       89.27600\nO        -16.90500        8.85500       88.23000\nC        -15.90200       11.73200       89.21900\nO        -17.03800       11.78700       88.36000\nC        -14.90300       12.82100       88.84000\nN        -16.52100        8.52100       90.43900\nC        -17.52900        7.45900       90.52300\nC        -18.80800        7.94100       91.19200\nO        -18.78000        8.81800       92.05900\nC        -17.05100        6.14700       91.19200\nC        -15.70700        5.52200       90.84200\nC        -15.62900        4.11600       91.40400\nC        -15.43200        5.51000       89.33100\nN        -19.93000        7.37800       90.74500\nC        -21.26800        7.59200       91.25500\nC        -21.87300        6.18700       91.27000\nO        -21.91700        5.50600       90.23800\nC        -22.02000        8.62100       90.40500\nO        -21.27100        9.83000       90.37300\nC        -23.39300        8.93400       90.96300\nN        -22.22900        5.71300       92.46900\nC        -22.76700        4.36400       92.63600\nC        -24.18100        4.40500       93.19700\nO        -24.47700        5.22000       94.07600\nC        -21.78800        3.38800       93.36500\nC        -22.17600        1.93600       93.15700\nC        -20.38500        3.54500       92.80500\nN        -25.07200        3.58800       92.61800\nC        -26.46400        3.55100       93.03600\nC        -26.89200        2.18400       93.50700\nO        -26.58700        1.19100       92.84700\nC        -27.40400        4.05200       91.93300\nC        -27.32200        5.53300       91.66800\nC        -26.66900        6.01600       90.54700\nC        -27.91100        6.44900       92.53900\nC        -26.61100        7.39000       90.29300\nC        -27.84900        7.82100       92.28600\nC        -27.19700        8.28300       91.16800\nN        -27.62600        2.11200       94.64200\nC        -28.13400        0.80900       95.09000\nC        -29.40300        0.44000       94.29900\nO        -29.98800        1.34100       93.68100\nC        -28.44600        1.05900       96.56900\nC        -28.83000        2.51400       96.63400\nC        -28.08500        3.21400       95.52600\nN        -29.89300       -0.82800       94.31000\nC        -31.15300       -1.11900       93.59600\nC        -32.34400       -0.34900       94.18800\nO        -32.37100       -0.08500       95.39400\nC        -31.32800       -2.63200       93.78000\nC        -30.54500       -2.95100       94.99400\nC        -29.36700       -2.03800       94.97200\nN        -33.30200        0.04100       93.33300\nC        -34.51300        0.73900       93.75400\nC        -35.43500       -0.25500       94.48700\nO        -35.25500       -1.47200       94.36100\nC        -35.23600        1.31800       92.54000\nO        -35.60400        0.30600       91.61500\nN        -36.42100        0.26700       95.24600\nC        -37.41100       -0.54900       95.95600\nC        -38.28300       -1.24800       94.90900\nO        -38.60500       -2.43000       95.06800\nC        -38.29800        0.31700       96.85400\nO        -37.65300        1.45700       97.39900\nN        -38.61100       -0.51600       93.81500\nC        -39.41600       -0.97100       92.67800\nC        -38.83800       -2.24200       92.07400\nO        -39.59200       -3.17100       91.78400\nC        -39.52600        0.13400       91.61200\nC        -40.30900        1.35800       92.05900\nC        -39.51000        2.52500       92.61300\nO        -38.51900        2.29200       93.34300\nO        -39.90200        3.68400       92.34100\nN        -37.49900       -2.29300       91.92500\nC        -36.79500       -3.44400       91.38100\nC        -36.71700       -4.59300       92.37900\nO        -36.87100       -5.74600       91.97400\nC        -35.39900       -3.06400       90.87500\nC        -34.92900       -4.01300       89.79000\nC        -33.46000       -3.98900       89.42100\nO        -32.69600       -3.17900       89.99500\nO        -33.07100       -4.79900       88.55100\nN        -36.46500       -4.29000       93.67300\nC        -36.39100       -5.29400       94.74400\nC        -37.74900       -5.97200       94.92000\nO        -37.79400       -7.15700       95.25700\nC        -35.91500       -4.67300       96.06800\nC        -34.45300       -4.20500       96.13300\nC        -34.23200       -3.30400       97.32600\nC        -33.47300       -5.37300       96.14500\nN        -38.84500       -5.21700       94.62100\nC        -40.26300       -5.60600       94.61700\nC        -40.52400       -6.61300       93.47100\nO        -41.50600       -7.36200       93.51900\nC        -41.13700       -4.34300       94.43400\nC        -42.60800       -4.45200       94.83500\nC        -43.25500       -3.05500       94.88800\nC        -44.76200       -3.06600       95.04700\nN        -45.46900       -3.06800       93.73600\nN        -39.64600       -6.61300       92.44000\nC        -39.68700       -7.52100       91.28500\nC        -38.71900       -8.68900       91.52200\nO        -38.47300       -9.48200       90.60800\nC        -39.32200       -6.78000       89.98000\nC        -40.35800       -5.79000       89.47100\nC        -39.98900       -5.09000       88.17500\nO        -39.46000       -5.76500       87.26200\nO        -40.25700       -3.87100       88.06200\nN        -38.17400       -8.77900       92.76100\nC        -37.23300       -9.79500       93.25600\nC        -35.84900       -9.76500       92.56100\nO        -35.10200      -10.74600       92.61100\nC        -37.88900      -11.19700       93.25800\nC        -37.33900      -12.19100       94.25900\nO        -36.75200      -11.83800       95.29000\nN        -37.55600      -13.47100       93.98400\nN        -35.49000       -8.61600       91.95700\nC        -34.20700       -8.41300       91.26800\nC        -33.45100       -7.20900       91.84000\nO        -34.05200       -6.36800       92.51300\nC        -34.40500       -8.28800       89.74200\nC        -34.88400       -9.58200       89.09500\nC        -35.04600       -9.46500       87.58700\nC        -35.56900      -10.74100       86.96800\nN        -34.57900      -11.85300       87.04500\nN        -32.12600       -7.13800       91.59400\nC        -31.28300       -6.04500       92.08500\nC        -30.12700       -5.72200       91.13500\nO        -29.31000       -6.59200       90.84200\nC        -30.76400       -6.37400       93.47800\nN        -30.08200       -4.47300       90.63800\nC        -29.03000       -3.98900       89.73100\nC        -28.26900       -2.83900       90.38400\nO        -28.85500       -1.82500       90.75000\nC        -29.57500       -3.65300       88.32600\nO        -30.27500       -4.78200       87.82000\nC        -28.47800       -3.25800       87.33900\nN        -26.96300       -3.02600       90.53100\nC        -26.04300       -2.06300       91.12200\nC        -25.41600       -1.26400       89.98200\nO        -24.87700       -1.84300       89.03900\nC        -24.99600       -2.79900       91.97400\nC        -25.40300       -3.13900       93.42200\nC        -26.56700       -4.15400       93.48900\nC        -24.24500       -3.70500       94.14900\nN        -25.56000        0.06500       90.04500\nC        -25.14500        0.99900       89.00200\nC        -23.86800        1.73700       89.36900\nO        -23.81000        2.34400       90.42700\nC        -26.30800        1.98500       88.68200\nC        -25.94500        2.92800       87.54400\nC        -27.60000        1.23600       88.36500\nN        -22.86200        1.71300       88.47600\nC        -21.59800        2.42700       88.65900\nC        -21.35100        3.31000       87.43900\nO        -21.15300        2.81000       86.33100\nC        -20.44300        1.46100       88.90600\nS        -18.88600        2.25900       89.38800\nN        -21.41000        4.62600       87.65300\nC        -21.24300        5.63800       86.61900\nC        -19.86700        6.28000       86.69500\nO        -19.53300        6.93500       87.68400\nC        -22.37400        6.67500       86.70000\nC        -23.79700        6.09800       86.73000\nC        -24.81000        7.18300       86.93700\nC        -24.11000        5.29900       85.45100\nN        -19.04400        6.03200       85.65900\nC        -17.66100        6.51700       85.54000\nC        -17.60600        7.71700       84.57400\nO        -17.85800        7.56000       83.37500\nC        -16.71700        5.35700       85.11500\nC        -17.04700        4.04900       85.87300\nC        -15.25900        5.73700       85.30900\nC        -17.16100        2.82600       85.01000\nN        -17.29700        8.91000       85.09700\nC        -17.25700       10.12400       84.29500\nC        -16.01300       10.96100       84.53500\nO        -15.21600       10.65200       85.42100\nC        -18.52200       10.95000       84.52600\nO        -18.68000       11.28300       85.89800\nN        -15.85100       12.01600       83.71500\nC        -14.76300       12.98800       83.74900\nC        -13.34100       12.40900       83.67900\nO        -12.42300       12.94500       84.30600\nC        -14.95500       14.01600       84.88500\nC        -16.14400       14.93200       84.67600\nO        -16.19500       15.71700       83.72200\nN        -17.12500       14.86000       85.57600\nN        -13.15700       11.33800       82.88800\nC        -11.85000       10.72100       82.72300\nC        -11.26700       10.88100       81.32800\nO        -11.99800       10.88600       80.34300\nC        -11.82700        9.26300       83.21000\nC        -12.67800        8.28100       82.44300\nC        -12.12100        7.47800       81.45300\nC        -14.03200        8.13600       82.72900\nC        -12.90800        6.56300       80.74800\nC        -14.81900        7.22500       82.01800\nC        -14.24800        6.43300       81.04200\nN         -9.94300       11.05400       81.26200\nC         -9.16300       11.21600       80.03400\nC         -7.74300       10.70400       80.31400\nO         -7.15700       11.12400       81.31100\nC         -9.13100       12.67500       79.58400\nO         -8.41200       12.81000       78.36800\nN         -7.18300        9.75600       79.52500\nC         -7.73300        9.12100       78.31200\nC         -8.83100        8.07100       78.56300\nO         -9.26100        7.86900       79.70500\nC         -6.47600        8.58500       77.61400\nC         -5.54100        8.24800       78.73100\nC         -5.81900        9.26400       79.82000\nN         -9.30100        7.43400       77.47100\nC        -10.37600        6.43700       77.37900\nC        -10.26800        5.19400       78.25100\nO        -11.29100        4.68300       78.70300\nC        -10.51000        5.95400       75.93700\nO        -11.02800        6.96400       75.09600\nN         -9.06300        4.65200       78.36500\nC         -8.79300        3.38300       79.02900\nC         -9.12900        3.27300       80.49200\nO         -8.49300        3.92800       81.31600\nN        -10.13100        2.42700       80.81400\nC        -10.56200        2.08800       82.17500\nC        -10.77200        0.58400       82.31800\nO        -11.17400       -0.08900       81.36300\nC        -11.75300        2.89900       82.77800\nC        -11.37800        4.35100       83.05500\nC        -13.01500        2.79400       81.93500\nN        -10.49400        0.06600       83.51500\nC        -10.68000       -1.33400       83.88600\nC        -11.64300       -1.32700       85.06900\nO        -11.41500       -0.59700       86.03600\nC         -9.31800       -2.00300       84.13000\nO         -8.79100       -2.42200       82.87100\nC         -9.39600       -3.19700       85.08000\nN        -12.74800       -2.06900       84.95600\nC        -13.76400       -2.10600       86.00700\nC        -13.87400       -3.49200       86.64100\nO        -14.03800       -4.49000       85.93800\nC        -15.13800       -1.53900       85.54300\nC        -16.14000       -1.48400       86.70100\nC        -14.97600       -0.15800       84.91100\nN        -13.77100       -3.53600       87.97500\nC        -13.90300       -4.74600       88.78400\nC        -14.91100       -4.48300       89.90200\nO        -14.94900       -3.38000       90.45100\nC        -12.55300       -5.12700       89.38100\nN        -15.75800       -5.47400       90.20100\nC        -16.72700       -5.37200       91.29900\nC        -16.31900       -6.33800       92.40000\nO        -15.69500       -7.36600       92.11700\nC        -18.17300       -5.67300       90.86000\nC        -18.83700       -4.61000       90.03400\nC        -18.70300       -4.42300       88.69200\nC        -19.82600       -3.66100       90.47400\nN        -19.52900       -3.41300       88.26700\nC        -20.22100       -2.91500       89.34200\nC        -20.39700       -3.34600       91.72100\nC        -21.18600       -1.90000       89.41000\nC        -21.33200       -2.32100       91.79000\nC        -21.72000       -1.61400       90.64400\nN        -16.66200       -6.01800       93.65100\nC        -16.35000       -6.88400       94.78000\nC        -17.52200       -6.97600       95.74800\nO        -18.04500       -5.94900       96.17700\nC        -15.06600       -6.43400       95.51400\nC        -13.75500       -6.80700       94.81500\nC        -12.63900       -5.76800       95.00200\nC        -11.93500       -5.85300       96.33800\nN        -10.81300       -4.88500       96.43800\nN        -17.94100       -8.20900       96.07100\nC        -18.98500       -8.47800       97.05900\nC        -18.22100       -8.55000       98.38700\nO        -17.35500       -9.41900       98.54500\nC        -19.67000       -9.80400       96.75400\nN        -18.47200       -7.57500       99.29700\nC        -17.77100       -7.35500      100.57900\nC        -16.33800       -6.89300      100.24500\nO        -16.09800       -5.68900      100.09100\nC        -17.77600       -8.59200      101.52200\nC        -19.13700       -9.16100      101.84200\nO        -20.05700       -8.45400      102.24600\nN        -19.27000      -10.47200      101.72600\nN        -15.44300       -7.87000      100.06200\nC        -14.05200       -7.68100       99.67400\nC        -13.63600       -8.72100       98.65400\nO        -12.57100       -8.60100       98.04500\nN        -14.48600       -9.75900       98.47000\nC        -14.31500      -10.88300       97.53900\nC        -14.52000      -10.40000       96.08900\nO        -15.52100       -9.72900       95.83400\nC        -15.33700      -11.99100       97.89200\nO        -15.28100      -12.27500       99.29500\nC        -15.15200      -13.27300       97.07400\nN        -13.64300      -10.74600       95.11600\nC        -13.89200      -10.29900       93.73500\nC        -15.01800      -11.07200       93.05300\nO        -15.06900      -12.30200       93.15100\nC        -12.54500      -10.50300       93.02300\nC        -11.60900      -11.08600       94.04200\nC        -12.41300      -11.55500       95.20700\nN        -15.92300      -10.34200       92.35900\nC        -17.02700      -10.93100       91.59200\nC        -17.04500      -10.48700       90.13900\nO        -17.13700       -9.29400       89.84000\nC        -18.42800      -10.93100       92.26300\nC        -18.88500       -9.51900       92.69000\nC        -18.48600      -11.94700       93.40900\nC        -20.33800       -9.43300       93.04500\nN        -16.91000      -11.47000       89.24400\nC        -16.89600      -11.30700       87.78900\nC        -18.17200      -11.94000       87.20200\nO        -18.30100      -12.08800       85.98300\nC        -15.58700      -11.87900       87.21000\nO        -15.37300      -13.19400       87.72900\nC        -14.37600      -10.99700       87.51800\nN        -19.12700      -12.27500       88.09500\nC        -20.41400      -12.90600       87.79500\nC        -21.54200      -11.85100       87.76800\nO        -21.76900      -11.16400       88.77100\nC        -20.71000      -14.01700       88.83600\nC        -19.63500      -15.12500       88.91800\nC        -19.05500      -15.33600       90.30700\nO        -19.21500      -16.40000       90.92200\nN        -18.32000      -14.35000       90.81600\nN        -22.20200      -11.72200       86.61200\nC        -23.29800      -10.78200       86.37200\nC        -22.90300       -9.35100       86.04300\nO        -23.76800       -8.46900       86.00400\nN        -21.59400       -9.12200       85.77900\nC        -20.95100       -7.84100       85.47800\nC        -20.98400       -7.47600       83.99000\nO        -20.55500       -8.26700       83.14600\nC        -19.51600       -7.76100       86.08200\nC        -18.56000       -8.76900       85.44600\nC        -18.94300       -6.34700       86.01200\nN        -21.49300       -6.27100       83.68200\nC        -21.56000       -5.74200       82.32600\nC        -21.03500       -4.30600       82.32000\nO        -21.62100       -3.42900       82.95800\nC        -22.98100       -5.85800       81.74100\nC        -23.43600       -7.28700       81.48500\nO        -22.86100       -7.94300       80.58100\nO        -24.40000       -7.73600       82.15400\nN        -19.88600       -4.09600       81.65800\nC        -19.21000       -2.80500       81.55700\nC        -19.28600       -2.25500       80.12400\nO        -19.00700       -2.97400       79.16200\nC        -17.77500       -2.93000       82.10300\nO        -17.82300       -3.50100       83.41500\nC        -17.04200       -1.59300       82.15800\nN        -19.69300       -0.98200       79.99300\nC        -19.81800       -0.30600       78.70100\nC        -18.44400        0.07800       78.14600\nO        -17.45500        0.10200       78.88300\nC        -20.68300        0.95000       78.83300\nO        -19.92800        2.08600       79.22600\nN        -18.39400        0.38500       76.83800\nC        -17.18700        0.89600       76.18900\nC        -17.18600        2.39900       76.54200\nO        -18.26800        2.95700       76.73500\nC        -17.25600        0.72300       74.65500\nC        -17.11800       -0.69100       74.13000\nO        -16.31900       -1.50100       74.62500\nN        -17.86700       -1.01100       73.07600\nN        -16.02900        3.08200       76.65200\nC        -16.07900        4.52600       76.94500\nC        -16.54500        5.33900       75.73900\nO        -16.38900        4.89800       74.59400\nC        -14.64900        4.87600       77.34900\nC        -13.80200        3.78800       76.79500\nC        -14.64400        2.60200       76.46100\nN        -17.11800        6.52000       76.00300\nC        -17.61700        7.43200       74.97600\nC        -17.24300        8.86300       75.27900\nO        -17.23100        9.25700       76.44600\nC        -19.12100        7.26000       74.74200\nO        -19.78700        7.05800       75.97800\nC        -19.42900        6.10200       73.80000\nN        -16.99900        9.65600       74.20800\nC        -16.61300       11.07200       74.23300\nC        -17.78600       12.00600       74.57200\nO        -18.60200       12.31500       73.69500\nC        -16.02300       11.48300       72.86800\nC        -14.51500       11.42100       72.75000\nC        -13.84200       12.75500       73.06500\nC        -12.81600       13.16600       72.03100\nN        -13.44400       13.69500       70.78500\nN        -17.84500       12.48400       75.83000\nC        -18.86300       13.42200       76.33500\nC        -18.72500       14.77300       75.59500\nO        -19.72500       15.37000       75.17700\nC        -18.69100       13.59000       77.86600\nC        -19.53800       14.67300       78.52600\nC        -18.78100       15.87300       79.07100\nO        -17.66800       15.68800       79.62300\nO        -19.32400       16.99900       78.98800\nN        -17.47400       15.19900       75.43800\nC        -17.04500       16.40800       74.75200\nC        -15.56600       16.25200       74.48900\nO        -15.17000       15.73500       73.44200\nN        -14.74500       16.61700       75.48700\nC        -13.28900       16.46400       75.44500\nC        -12.82900       15.44400       76.50300\nO        -11.65300       15.07800       76.53000\nC        -12.57400       17.82000       75.58000\nC        -12.63700       18.44500       76.95300\nO        -13.67200       18.43300       77.63400\nN        -11.53000       19.02400       77.38000\nN        -13.77200       14.97600       77.35100\nC        -13.56600       13.94800       78.38200\nC        -14.36900       12.68400       78.00200\nO        -15.15600       12.72600       77.05300\nC        -13.97800       14.45500       79.77900\nC        -13.05400       15.50500       80.36300\nC        -13.55700       15.94700       81.70900\nC        -12.70800       17.02900       82.32200\nN        -13.24200       17.45500       83.64100\nN        -14.17000       11.57600       78.73600\nC        -14.84400       10.29900       78.48900\nC        -15.76100        9.85800       79.63500\nO        -15.57400       10.27800       80.78000\nC        -13.82800        9.19400       78.13600\nC        -12.97100        9.52500       76.93500\nC        -13.40000        9.22200       75.64700\nC        -11.75100       10.17600       77.08800\nC        -12.61900        9.55400       74.53900\nC        -10.97700       10.52100       75.97600\nC        -11.41600       10.21000       74.70800\nN        -16.75400        9.00600       79.31000\nC        -17.72400        8.44900       80.25300\nC        -17.98600        6.98000       79.95800\nO        -17.98700        6.56800       78.79500\nC        -19.03100        9.27800       80.32100\nC        -19.82600        9.32400       79.02200\nS        -21.40600       10.18300       79.19800\nC        -21.82500       10.39500       77.46900\nN        -18.16600        6.18700       81.01600\nC        -18.47200        4.76100       80.91700\nC        -19.38500        4.35500       82.07400\nO        -19.54500        5.10100       83.03900\nC        -17.19100        3.93700       80.92900\nN        -19.99400        3.18200       81.97100\nC        -20.87700        2.67100       83.00000\nC        -20.63600        1.18100       83.24600\nO        -20.14600        0.46700       82.36700\nC        -22.33300        2.92600       82.62200\nO        -22.70500        2.24400       81.43400\nN        -20.95600        0.72000       84.45100\nC        -20.84300       -0.68300       84.79900\nC        -22.02500       -1.08900       85.63600\nO        -22.50400       -0.31200       86.47200\nC        -19.54400       -0.97800       85.53000\nO        -19.34700       -2.38000       85.59500\nN        -22.51900       -2.29800       85.38700\nC        -23.67400       -2.82700       86.08900\nC        -23.35900       -4.18800       86.67700\nO        -22.64800       -4.98100       86.05700\nC        -24.90600       -2.88800       85.15800\nC        -25.23600       -1.58000       84.46600\nC        -26.07800       -0.65000       85.06300\nC        -24.69500       -1.27600       83.22100\nC        -26.37800        0.56200       84.42300\nC        -24.99000       -0.06200       82.58500\nC        -25.83300        0.84800       83.18900\nN        -23.85600       -4.43500       87.89700\nC        -23.73400       -5.71600       88.58300\nC        -25.14700       -6.20800       88.90400\nO        -25.79600       -5.67200       89.80800\nC        -22.84300       -5.63200       89.84400\nC        -22.77200       -6.89600       90.73200\nC        -22.05900       -8.04800       90.04700\nC        -22.13300       -6.59200       92.05700\nN        -25.63900       -7.18700       88.11800\nC        -26.96800       -7.75800       88.31900\nC        -26.94100       -8.98000       89.22300\nO        -26.17000       -9.91700       89.00500\nC        -27.70300       -8.05500       87.00200\nC        -29.11700       -8.51600       87.21900\nN        -30.13700       -7.61300       87.48900\nC        -29.62300       -9.77400       87.26700\nC        -31.22900       -8.34300       87.66700\nN        -30.97400       -9.65000       87.54100\nN        -27.86100       -8.98700       90.20100\nC        -28.02400      -10.05500       91.18200\nC        -29.47100      -10.18100       91.69400\nO        -30.32700       -9.35800       91.36500\nC        -27.01600       -9.90000       92.35000\nC        -26.59900       -8.49200       92.76100\nC        -27.53100       -7.93300       93.78100\nC        -25.19800       -8.48700       93.30600\nN        -29.74200      -11.24900       92.46800\nC        -31.03500      -11.52500       93.09600\nC        -31.16600      -10.54800       94.26900\nO        -30.14600      -10.16700       94.85000\nC        -31.06300      -13.00300       93.58700\nO        -30.81000      -13.87300       92.48300\nC        -32.38800      -13.40300       94.23500\nN        -32.41400      -10.15200       94.62500\nC        -32.68000       -9.29800       95.78900\nC        -32.09800       -9.96900       97.05800\nO        -31.63200       -9.27300       97.95800\nC        -34.17700       -9.03500       95.94300\nO        -34.90000      -10.22600       96.20100\nN        -32.09300      -11.32700       97.08900\nC        -31.54700      -12.15800       98.16300\nC        -30.02200      -12.02500       98.22800\nO        -29.47200      -11.86700       99.31600\nC        -31.95900      -13.63300       97.97100\nC        -33.44500      -13.90200       98.07800\nO        -34.04900      -13.51000       99.10400\nO        -33.99700      -14.54200       97.15800\nN        -29.34900      -12.06000       97.05100\nC        -27.89400      -11.90000       96.90400\nC        -27.44400      -10.50300       97.34800\nO        -26.35100      -10.36400       97.90100\nC        -27.46000      -12.15400       95.45800\nC        -27.36800      -13.63000       95.10000\nC        -27.34600      -13.90300       93.61600\nO        -27.28700      -13.00100       92.76900\nN        -27.38000      -15.17400       93.26300\nN        -28.30100       -9.47900       97.12400\nC        -28.07200       -8.09000       97.53300\nC        -28.10700       -8.01600       99.05900\nO        -27.14500       -7.55400       99.66900\nC        -29.12900       -7.15900       96.88800\nC        -29.37700       -5.83000       97.55600\nC        -30.54600       -5.41300       98.12100\nC        -28.47200       -4.71400       97.63700\nN        -30.42500       -4.11600       98.56400\nC        -29.15900       -3.66600       98.28900\nC        -27.14000       -4.49700       97.23000\nC        -28.56200       -2.42700       98.55200\nC        -26.54700       -3.27300       97.50400\nC        -27.25400       -2.25600       98.15700\nN        -29.19000       -8.54200       99.66100\nC        -29.43600       -8.56600      101.10000\nC        -28.41000       -9.36800      101.91000\nO        -28.00000       -8.89200      102.97500\nC        -30.87500       -9.01700      101.39000\nC        -31.90600       -7.95200      101.04600\nC        -33.31300       -8.51700      100.99400\nN        -34.28300       -7.51100      100.55600\nC        -35.26700       -7.73700       99.69000\nN        -35.42700       -8.94100       99.15300\nN        -36.10300       -6.76200       99.35800\nN        -27.96900      -10.54900      101.39600\nC        -27.00200      -11.44200      102.06800\nC        -25.61000      -10.86600      102.34400\nO        -25.02600      -11.20200      103.37600\nC        -26.87100      -12.77800      101.34300\nO        -28.13200      -13.36000      101.07800\nN        -25.06500      -10.03500      101.43200\nC        -23.72600       -9.44500      101.59100\nC        -23.74500       -8.15000      102.38400\nO        -24.76600       -7.46500      102.42000\nC        -23.04000       -9.23500      100.24000\nC        -22.85400      -10.50400       99.47000\nN        -23.91600      -11.12900       98.83300\nC        -21.73400      -11.22700       99.25400\nC        -23.40700      -12.20500       98.25300\nN        -22.09800      -12.30400       98.47300\nN        -22.60600       -7.82500      103.02800\nC        -22.41900       -6.63300      103.86900\nC        -22.16800       -5.37300      103.04300\nO        -22.69400       -4.30200      103.36800\nC        -21.29000       -6.86000      104.89100\nC        -21.56800       -7.96300      105.90000\nO        -22.67900       -8.10300      106.43500\nN        -20.54400       -8.74700      106.21300\nN        -21.34700       -5.50800      101.98800\nC        -21.00700       -4.42300      101.07000\nC        -20.78900       -4.93200       99.64300\nO        -20.74100       -6.14900       99.40400\nC        -19.80600       -3.61600      101.56300\nO        -18.57600       -4.25900      101.28600\nN        -20.68400       -3.97900       98.70200\nC        -20.39900       -4.18000       97.28500\nC        -19.53400       -3.01300       96.84700\nO        -19.78400       -1.88100       97.27000\nC        -21.68400       -4.26900       96.45200\nC        -22.53000       -5.50300       96.70200\nC        -22.26000       -6.69700       96.04500\nC        -23.61600       -5.46100       97.57400\nC        -23.05200       -7.83100       96.26300\nC        -24.40100       -6.60300       97.79800\nC        -24.12300       -7.77200       97.12700\nN        -18.49100       -3.28300       96.04800\nC        -17.56400       -2.23500       95.61400\nC        -17.36700       -2.18200       94.10800\nO        -17.15800       -3.21600       93.48100\nC        -16.22900       -2.30100       96.41300\nO        -15.79300       -0.97100       96.71500\nC        -15.11500       -3.01000       95.67800\nN        -17.41400       -0.97500       93.54400\nC        -17.10600       -0.74000       92.14400\nC        -15.68600       -0.16400       92.14300\nO        -15.45100        0.91700       92.69100\nC        -18.10100        0.22000       91.49500\nS        -17.69700        0.66100       89.77900\nN        -14.74300       -0.90100       91.55200\nC        -13.34600       -0.48300       91.46900\nC        -12.94900       -0.19000       90.01500\nO        -13.05900       -1.06900       89.15500\nC        -12.43300       -1.53500       92.10800\nC        -10.94600       -1.15500       92.11600\nC        -10.11800       -2.31100       92.58500\nO         -9.91200       -3.29700       91.86500\nN         -9.66600       -2.22600       93.82000\nN        -12.50500        1.06000       89.75500\nC        -12.11900        1.52100       88.42000\nC        -10.62100        1.82400       88.35000\nO        -10.14600        2.69400       89.07100\nC        -12.99700        2.71200       87.92900\nC        -12.58700        3.17500       86.53000\nC        -14.47800        2.34200       87.95500\nN         -9.89600        1.12000       87.45600\nC         -8.46100        1.31400       87.21400\nC         -8.27100        2.19000       85.96300\nO         -8.73000        1.81600       84.88400\nC         -7.72000       -0.03900       87.15800\nO         -8.10900       -0.83500       88.28300\nC         -6.20400        0.12100       87.13500\nN         -7.62100        3.35700       86.12300\nC         -7.37300        4.34000       85.06000\nC         -5.96700        4.93100       85.19800\nO         -5.70400        5.66900       86.15100\nC         -8.43900        5.45400       85.11400\nC         -8.21300        6.58600       84.14100\nN         -7.68500        7.80100       84.54700\nC         -8.47300        6.65400       82.81400\nC         -7.62700        8.55300       83.46100\nN         -8.09200        7.90900       82.39600\nN         -5.07800        4.61800       84.22500\nC         -3.67600        5.06300       84.16000\nC         -2.88400        4.53800       85.37100\nO         -2.07300        5.26900       85.95000\nC         -3.55600        6.60700       84.00300\nC         -4.16200        7.18300       82.73100\nC         -3.61600        6.59800       81.44300\nO         -2.44800        6.89500       81.10800\nO         -4.33200        5.79900       80.79600\nN         -3.15800        3.28500       85.74900\nC         -2.53300        2.61100       86.88500\nC         -3.03400        3.02100       88.26300\nO         -2.47200        2.59300       89.27700\nN         -4.09200        3.84900       88.32300\nC         -4.67200        4.31800       89.58600\nC         -6.05500        3.72500       89.81000\nO         -6.83200        3.65100       88.85900\nC         -4.75800        5.86000       89.60500\nC         -3.42500        6.58100       89.48500\nO         -2.42400        6.08900       90.06000\nO         -3.38800        7.65600       88.84100\nN         -6.37200        3.31900       91.05900\nC         -7.70400        2.79000       91.38200\nC         -8.56700        3.81700       92.09600\nO         -8.06100        4.65800       92.84800\nC         -7.69900        1.39100       92.05000\nO         -7.01800        1.43100       93.29700\nC         -7.11900        0.30700       91.16800\nN         -9.87200        3.77900       91.79000\nC        -10.92100        4.61500       92.37000\nC        -12.01400        3.61400       92.80300\nO        -12.30700        2.66600       92.06600\nC        -11.45700        5.72100       91.39900\nC        -12.40500        6.66700       92.12500\nC        -10.32200        6.52500       90.75900\nN        -12.55000        3.79000       94.02300\nC        -13.57100        2.91100       94.60200\nC        -14.69700        3.68700       95.24400\nO        -14.46800        4.76900       95.78500\nC        -12.98000        2.01100       95.70200\nC        -11.84900        1.08400       95.29600\nC        -11.65500       -0.09200       96.23600\nO        -12.63000       -0.85100       96.43700\nO        -10.53700       -0.26000       96.77500\nN        -15.90100        3.10400       95.23400\nC        -17.10000        3.57900       95.92300\nC        -17.85800        2.32700       96.32700\nO        -17.87700        1.34900       95.57300\nC        -17.96700        4.50100       95.06000\nC        -17.38200        5.89000       94.82500\nC        -18.07600        6.99000       95.59400\nC        -17.67600        8.36100       95.07500\nN        -16.54000        8.99600       95.81300\nN        -18.39700        2.30900       97.54900\nC        -19.10800        1.13500       98.05000\nC        -20.57100        1.38200       98.35700\nO        -20.99600        2.53200       98.48500\nC        -18.38800        0.51100       99.24100\nO        -17.18000       -0.11000       98.83900\nN        -21.34900        0.28500       98.39700\nC        -22.78400        0.26100       98.68200\nC        -23.04800       -0.76200       99.77300\nO        -22.47400       -1.85000       99.73000\nC        -23.58600       -0.13800       97.43200\nC        -23.73300        0.88500       96.31500\nC        -24.22900        0.21400       95.05800\nC        -24.67600        2.02000       96.70800\nN        -23.92900       -0.43100      100.73200\nC        -24.27800       -1.33600      101.83500\nC        -25.80400       -1.53700      101.95800\nO        -26.52100       -0.53900      102.10900\nC        -23.71200       -0.81500      103.15300\nO        -22.30200       -0.68100      103.09900\nN        -26.33900       -2.79400      101.93600\nC        -27.80100       -2.96900      102.08800\nC        -28.31900       -2.67600      103.50000\nO        -27.64400       -2.95100      104.49200\nC        -28.03000       -4.43000      101.69600\nC        -26.75800       -5.09800      102.00600\nC        -25.66100       -4.09700      101.77100\nO         39.03500       27.64700      -30.08800\nO         29.51000       33.79600      -19.49500\nO         31.43900       33.36400      -16.29500\nO         44.93300       16.06700      -15.69100\nO         26.87900       17.02300      -13.01400\nO         52.50400       22.51100      -41.39300\nO         55.11000        1.70200      -59.36800\nO         28.84400        6.69500       -7.91300\nO         33.83300        7.59800      -11.39700\nO         19.77600       10.60500      -23.46200\nO         38.77000       11.17200      -26.55100\nO         37.40200       22.28500      -28.37500\nO         37.38200       20.62900      -32.60100\nO         45.45000       23.96700      -20.20000\nO         21.97300       19.36700      -16.32700\nO         48.22700       26.42300      -45.86900\nO         37.94200       13.64200      -25.64700\nO         41.46200       23.93900      -14.16600\nO         36.54100       14.44900      -27.72700\nO         22.01000        5.16400      -17.64600\nO         49.79100       11.99700      -13.53200\nO         40.55100       15.75400       -6.95200\nO         51.02500       23.67800      -34.34800\nO         25.29000       15.51400      -24.44100\nO         42.93300       21.11600      -11.51700\nO         32.43900       12.65600      -26.72600\nO         39.52700       32.12100      -37.90700\nO         45.94300        9.60400      -24.41900\nO         60.99000        3.65600      -60.47300\nO         43.90600       18.45400      -14.84700\nO         41.25900       15.92700      -35.58700\nO         48.96300       11.15800      -10.85300\nO         44.55300       36.23100      -29.17300\nO         39.04600       27.21900      -39.67200\nO         32.06500       32.13700      -25.09600\nO         27.56600       21.03100      -24.05400\nO         59.20300       17.12900      -65.35400\nO         27.87200       22.69800       -7.89000\nO         31.10000       25.25500      -28.66000\nO         57.28200       11.84100      -49.11700\nO         35.88200       26.58000      -47.10400\nO         45.64200       19.49900      -12.71700\nO         40.38800       11.09400      -48.81300\nO         16.84900        0.20300      -14.29200\nO         51.48100       11.04100      -16.03100\nO         30.13100        6.87600      -24.41000\nO         36.39800       37.31600      -23.99800\nO         30.86800       -2.87400      -18.92300\nO         28.17400       24.32800      -24.58600\nO         45.56600       30.55500      -17.51000\nO         59.64400        9.78300      -50.12000\nO         53.91900       22.72900      -48.73900\nO         35.54700        7.54800      -22.47100\nO         60.34300       15.19800      -50.93200\nO         25.78900       22.75600      -14.54600\nO         29.38900       26.39400      -23.25800\nO         38.64400       17.66700      -45.86400\nO         38.81400       20.40300      -30.13300\nO         54.60000       19.61200      -56.54200\nO         46.11300       11.65800      -22.78200\nO         30.41300       11.10900      -25.14800\nO         38.82600       13.57200      -51.41100\nO         16.02300       -1.04300      -26.76800\nO         30.40400        3.38100      -26.77000\nO         47.49500       11.69200      -20.70200\nO         21.39200       18.44000       -9.79000\nO         45.77000       23.84900      -54.10300\nO         52.27100       20.11100      -63.06500\nO         54.58900       23.32400      -59.47300\nO         43.50500        6.89700      -41.15300\nO         27.07100       27.34500      -22.71200\nO         45.39700       11.69400      -64.45600\nO         45.19800       21.22900      -21.95500\nO         55.44800       22.37400      -41.16200\nO         34.85800       37.31600      -21.11000\nO         50.50400        1.28000      -60.11900\nO         26.00100       15.59200      -27.40800\nO         44.04300       16.41700      -22.79900\nO         34.99100       28.49700       -2.19400\nO         42.84700       14.25600      -36.98900\nO         28.76100        8.32000       -5.53500\nO         47.20000       -0.55800        4.68200\nO         56.70900        6.03700       -4.99000\nO         33.33000       -0.84700      -21.97000\nO         42.83500       10.50300      -25.02300\nO         53.50800        0.01600       -1.04100\nO         55.06400       -5.25100      -11.98300\nO         45.17300      -10.74700      -10.26300\nO         58.12200        8.65100      -31.21100\nO         49.15900        9.74300      -17.08000\nO         33.61900        2.58600      -19.25200\nO         51.42000      -13.48800      -16.57200\nO         53.58300      -10.52500      -16.52800\nO         62.19700        2.21000      -29.95000\nO         37.69600      -13.77200      -13.88200\nO         47.80900        9.03900      -34.39300\nO         34.77500      -13.92800      -23.21800\nO         55.05500        0.48400      -29.40500\nO         66.74800        3.89300      -45.09500\nO         67.85400       11.42200      -33.16700\nO         46.46100       -9.63200        2.19700\nO         60.83300       10.33400      -28.86100\nO         48.83700        8.96600       -6.98300\nO         68.35900       26.24800      -34.57800\nO         57.40500       18.88200      -32.31800\nO         33.65700       -0.05900      -19.37700\nO         39.29200       -4.96400      -25.09000\nO         71.54500       19.38900      -47.08100\nO         43.33600       -9.47100        0.24000\nO         48.68900       -2.92200      -31.52500\nO         74.64200        7.31800      -37.86400\nO         32.68900       -3.64900      -21.82100\nO         69.19800        1.49900      -28.62100\nO         43.75100      -13.36200      -28.08600\nO         50.84900      -15.27200      -27.95900\nO         67.63700       18.77500      -33.35600\nO         40.04100        3.87200      -24.52700\nO         66.70500        2.73100      -39.65700\nO         50.41200        6.27800      -24.50400\nO         73.44600       31.80600      -49.67700\nO         61.93700       28.54100      -37.88400\nO         50.54600      -11.23700       -3.63800\nO         37.99400       -2.60300      -26.54800\nO         71.56700        3.11000      -47.91700\nO         56.52700       16.57200      -31.14000\nO         71.10200        4.20100      -44.89900\nO         58.63500       27.33900      -37.65300\nO         38.52900        3.26900      -26.99900\nO         53.14300        4.23400       -3.87600\nO         66.68300       14.99900      -50.44100\nO         34.42400      -10.06900      -24.77600\nO         72.23800       10.92700      -46.92100\nO         60.37800       -0.64200      -42.43200\nO         51.01500        1.74700      -27.58900\nO         65.53900        0.12000      -43.27400\nO         41.55600       13.55400       -8.20100\nO         72.75500       20.90300      -49.36500\nO         73.95000       12.28100      -35.32900\nO         35.14300        3.22900      -24.16800\nO         46.95100      -15.98600      -22.22700\nO         37.10500        6.45600      -26.64600\nO         60.83900       24.71800      -32.01200\nO         46.36100        7.96800      -20.84000\nO         77.13600       26.82800      -45.68100\nO         33.68800        6.42100       -3.75300\nO         71.06000       28.42600      -49.97200\nO         33.60000        4.08700      -21.86900\nO         40.04400        1.27500      -23.79300\nO         36.70200      -10.55200      -23.05500\nO         51.13000       -1.05400      -31.94400\nO         73.50600       -1.78000      -32.40600\nO         51.02100        4.50100      -26.80000\nO         46.51100        6.74500      -23.51900\nO         42.48400       -0.44300      -24.84300\nO         44.15400      -13.21100       -9.90200\nO         57.02100       -1.34400      -14.57900\nO         55.34700       12.11400        3.42500\nO         73.53000        6.24300      -41.71400\nO         54.41100        3.02000      -18.92500\nO         65.67900        6.42800      -48.80500\nO         52.87100       12.78100       -2.90500\nO         77.44400       22.98600      -44.52500\nO         35.29800        5.99700      -24.73100\nO         34.95700       12.26700       -3.02400\nO         61.25100       28.09600      -55.43900\nO         63.65900       -8.38000      -35.23100\nO         39.34500        0.34900      -26.57000\nO         58.74700       32.29800      -46.66200\nO         71.47000        8.33900      -36.00200\nO         66.81700       11.75700      -58.98100\nO         42.15600      -10.02500       -3.79500\nO         48.29200        5.47800        6.89500\nO         51.05900        5.29300      -29.52600\nO         43.93600        0.39600      -28.25200\nO         40.94700        1.01000      -28.66500\nO         61.80700       12.79100      -31.85400\nO        -10.55900      -14.49600       49.16100\nO         13.66000        7.71800       34.18600\nO         18.63300        3.97500       22.12100\nO         24.78000       11.44400        6.66000\nO         11.92000      -16.36100       40.47000\nO         29.79600       -3.91600       27.45400\nO         14.58000        5.30900       34.79500\nO         22.60300        9.01300       27.67200\nO         26.00400        0.05400       10.51300\nO         11.69500       -4.21300       27.01900\nO         31.34000       -5.90400       18.09600\nO         10.82800        1.34800       52.63500\nO         14.82100       -0.55700       25.93100\nO          6.84800        2.51700       43.75800\nO         14.14600      -13.80600       38.92500\nO         15.19200        8.50100       31.93100\nO         31.10800       -8.53800      -12.75500\nO         25.65800        6.20400       -9.63300\nO         27.53000        2.73600      -16.13900\nO         12.30100        0.73900        4.35300\nO         -3.15300        6.57100       31.69000\nO         -0.69400        0.45400       33.96900\nO         16.64700       12.25300       10.68800\nO          0.38600        0.79900       21.07800\nO         19.32100       -0.47300       50.77100\nO         -8.33800        4.47100       35.86500\nO          8.10300       -2.00200       -4.00300\nO          7.07600        8.97700       35.56800\nO         23.00600       10.05000       -0.41400\nO          4.73400       14.33100       23.08300\nO         -8.61700        7.49900       36.46000\nO         19.21600        3.95700       44.77700\nO          7.15000        2.07300       24.69000\nO         12.94400        4.92000       37.01000\nO          3.91200        0.14800       26.54900\nO         -6.63800        1.24800       35.81300\nO         18.63400      -15.12000       -4.82200\nO          2.19700       13.58600       23.15200\nO        -19.19300        5.49300       35.82500\nO        -21.82200        8.62700       38.31700\nO        -25.45100        7.12600       41.96700\nO        -19.18400        1.55500       64.10300\nO        -14.73400       -4.25400       63.90100\nO         -8.99600       -2.42400       63.24200\nO        -20.12800       -4.90900       36.13500\nO         -5.39200        2.54100       45.50500\nO        -18.40800       10.72400       50.45200\nO        -22.88800        5.78100       59.96400\nO        -24.18500       13.63400       85.03500\nO        -38.01000       -3.84000       66.09200\nO        -20.17500       -7.02800       66.66800\nO        -27.03500        3.43800       59.17400\nO        -34.49700       14.78400       94.37900\nO        -14.43300       10.36400       51.82100\nO        -24.92900       20.87700       91.54200\nO        -21.28200       20.09200       97.79600\nO        -31.29400      -10.86000       50.65600\nO        -18.45600       -6.84300       62.46300\nO        -36.43800       16.44600       98.67500\nO         -8.93300      -12.83000       56.28800\nO        -23.64900        8.82200       45.58800\nO         -9.86500        9.96100       52.84800\nO        -29.35300        0.88200       58.84800\nO        -16.25800        5.69800       65.33000\nO        -32.83700       20.37000       95.71500\nO        -17.67100        3.31800       65.90100\nO        -17.36500      -17.40100       56.95800\nO        -41.30400        6.33000       71.70800\nO        -28.96900       -8.46300       71.01800\nO        -44.49300        5.22000       84.23900\nO        -28.62800        4.47200       73.36600\nO        -23.79900      -18.63400       52.86000\nO        -38.15800       18.25000       92.92100\nO         -8.61300        1.24700       41.77100\nO         -9.32600       -3.65200       33.96300\nO        -29.64700       -2.67700       49.29600\nO        -45.74700        5.47500       75.23200\nO        -13.15700        2.77200       33.11900\nO        -10.76200      -10.27500       59.28500\nO        -27.33300        3.61400       47.96600\nO        -11.17800       -0.08300       69.88900\nO        -41.12200       -8.51600       73.47800\nO        -17.69900      -15.74900       49.58200\nO        -30.77900        2.60100       53.67100\nO        -21.01200       10.68800       51.93000\nO        -35.52400        3.26400       69.14800\nO        -10.05400       -8.37500       57.49100\nO        -13.94500       -1.82800       34.37000\nO        -10.73500      -13.01300       58.90700\nO        -28.79800      -16.23500       54.90900\nO        -16.08800       -5.87800       62.51600\nO        -35.03000       18.66700       96.34800\nO         -8.34400       -5.56000       61.21200\nO        -25.00700        5.89400       54.07500\nO        -24.87900       -7.61800       41.17100\nO        -25.29600        4.41900       74.54900\nO        -29.65000       -2.21900       68.41900\nO        -17.12600       10.33500       53.99300\nO        -37.67500       18.09700       89.45700\nO        -43.44300        0.93100       68.15200\nO        -24.99900       18.01100       80.28000\nO         -6.08200        0.88600       53.18200\nO         -4.48200       -1.17200       68.92100\nO         -1.17200       -0.81200       49.30400\nO        -12.80800       11.52200       60.67700\nO          9.36600        3.82500       61.70500\nO         -2.76100       -7.77000       55.26000\nO         -3.00500       -3.11800       67.05000\nO         -7.74300       16.40300       58.92100\nO          5.97900       11.96900       55.30600\nO         -8.68100       -6.17200       58.26000\nO         -0.28500        1.34100       47.72900\nO          3.99800        4.87500       57.62000\nO          8.23700       19.93100       72.22200\nO         -6.33000       16.97900       62.40200\nO         -5.46200       13.47600       78.40500\nO          0.29400       13.56200       47.71300\nO         -7.43500        6.83500       74.92200\nO         11.64300       -4.88900       54.98500\nO        -17.51100       12.37900       80.77600\nO         -0.62700       19.44000       51.87900\nO         -5.12400        8.06800       74.38100\nO         -7.51400       12.45300       52.35400\nO         -9.51400       13.36500       75.83400\nO         12.23400       -7.25200       58.50600\nO        -38.75300       -3.26500       97.68600\nO         -6.16000       -2.60000       70.55500\nO        -28.54900        6.19600      104.21100\nO         10.35600        5.14400       55.21900\nO          0.97600        7.14000       75.68000\nO          4.58400       -4.32200       68.50500\nO        -32.92400       -0.22900       90.24200\nO        -16.33500       14.26000       65.92500\nO          2.65300       -9.38900       61.62800\nO          7.17100        8.86000       61.19500\nO         -4.38800       -5.90800       63.60100\nO         -2.05300       -3.86100       70.56000\nO         -0.13600        4.91500       45.18800\nO          0.69600        7.02500       43.51600\nO        -27.24200        2.15800      104.16400\nO          7.08000      -11.65900       53.53500\nO         -6.90500       22.27600       67.66300\nO          4.19100        4.33600       69.45200\nO         -3.73400       13.77600       47.06100\nO         12.48500       -2.35400       54.82100\nO         12.05300       -2.20200       62.20300\nO          9.43400        6.00300       67.18300\nO         -6.12600        0.55500       83.62300\nO         10.22400        8.31400       55.11000\nO        -10.74900       16.14400       67.99000\nO        -15.42500        1.73200       98.48400\n";
    structs.testosterone = "46\ntestosterone.out\nC     -4.0599     -2.1760     -0.8224\nO     -4.9516     -2.8840     -1.2414\nC     -4.2163     -0.6676     -0.7586\nC     -2.8826      0.0343     -0.9993\nC     -2.7857     -2.7158     -0.3131\nC     -1.7443     -1.9501      0.0575\nC     -0.5249     -2.5861      0.6659\nC      0.7827     -1.9356      0.2082\nC      0.7295     -0.4182      0.4294\nC      2.0267      0.2733     -0.0072\nC      3.3706     -0.1900      0.5799\nC      4.3192      1.0027      0.3273\nC      3.4317      2.2202     -0.0268\nO      3.9384      3.3043      0.7679\nC      1.9714      1.7980      0.3340\nC      1.7106      2.0852      1.8182\nC      0.8686      2.4201     -0.5385\nC     -0.4798      1.7315     -0.2601\nC     -0.4282      0.1930     -0.4091\nC     -1.7900     -0.4363     -0.0132\nH     -2.7575     -3.8052     -0.2565\nH     -0.6135     -2.5201      1.7733\nH     -0.4925     -3.6738      0.4451\nH      1.6336     -2.3732      0.7646\nH      0.9690     -2.1675     -0.8583\nH      0.5479     -0.2168      1.5138\nH      2.1058      0.1678     -1.1210\nH      3.2853     -0.4094      1.6573\nH      3.7364     -1.1101      0.0994\nH      4.9267      1.2382      1.2217\nH      5.0342      0.7890     -0.4822\nH      3.5293      2.5237     -1.0880\nH      3.2906      4.0296      0.8195\nH      0.8832      1.4797      2.2078\nH      2.5972      1.8604      2.4268\nH      1.4613      3.1361      1.9910\nH      0.7818      3.5044     -0.3452\nH      1.1247      2.3262     -1.6107\nH     -0.8205      1.9959      0.7596\nH     -1.2411      2.1442     -0.9502\nH     -0.2361     -0.0466     -1.4843\nH     -4.6390     -0.3984      0.2304\nH     -4.9734     -0.3373     -1.4982\nH     -2.5493     -0.1544     -2.0405\nH     -3.0184      1.1303     -0.9178\nH     -2.0604     -0.0823      1.0166\n";
    structs.au = "147\n\nAu      0.863612620000000     10.165467520000000     14.256430499999999\nAu      9.158830980000001     10.168167879999999     14.257049560000000\nAu      9.159737340000000     10.174013459999999      7.103283459999999\nAu      9.155459819999999     10.164014380000001     21.403742619999999\nAu      3.536031720000000     10.168052180000000     14.258336300000000\nAu     11.991745740000001     10.168714400000001     14.260906660000002\nAu     11.963589560000001     10.211136260000000      7.356301680000000\nAu     11.967944559999999     10.132059860000000     21.159022040000000\nAu      6.325499960000000     10.168469220000000     14.260199719999999\nAu      6.355999780000000     10.208776240000001      7.353304919999999\nAu      6.345758120000000     10.132798780000000     21.157132100000002\nAu     14.781116220000001     10.170959760000001     14.262894100000000\nAu     10.534406219999999      2.845260080000000     14.250076879999998\nAu      2.125023160000000     12.641243160000000     14.251751020000000\nAu     10.575386119999999     12.624920880000001     14.262562860000001\nAu     10.593460540000001     12.587808480000000      7.352597719999999\nAu     10.526010300000001     12.616388980000000     21.164485679999999\nAu      5.012285460000000      2.984262840000000     14.262548819999999\nAu     13.311812800000000      2.985800480000000     14.264742440000001\nAu      4.905614480000001     12.622649259999999     14.230518640000000\nAu      5.008343600000000     12.565793240000000     21.030971000000001\nAu     13.410571460000002     12.626194099999999     14.236499159999999\nAu     13.302405999999998     12.568254659999999     21.033563980000000\nAu      7.788829099999999      2.843013420000000     14.251100499999998\nAu      7.742124260000000     12.624067300000000     14.260593880000000\nAu      7.724426060000000     12.586806440000000      7.351619339999999\nAu      7.784013120000000     12.618119539999999     21.162864319999997\nAu     16.191204639999999     12.645833459999999     14.257775740000001\nAu      9.158925620000000      5.257858060000000     14.228462040000000\nAu      9.154226120000001      5.380656060000000     21.033531220000000\nAu      9.155995420000000     15.077901019999999     14.288651519999998\nAu      9.157136820000000     14.963458899999999      7.483340020000000\nAu      3.498336660000000      5.313453600000000     14.265123080000000\nAu     11.972274340000000      5.298077720000000     14.259220819999999\nAu      3.496341940000000     15.018875820000000     14.251661060000000\nAu     11.967292740000000     15.037564879999998     14.261018720000001\nAu      6.347732820000000      5.298397520000000     14.258763999999999\nAu     14.819427740000002      5.317480220000000     14.269699859999999\nAu      6.346155400000000     15.036827519999999     14.259293099999999\nAu     14.818271520000000     15.023060259999999     14.258375300000001\nAu      2.128337120000000      7.691413079999999     14.258700560000001\nAu     10.576051979999999      7.711782260000000     14.255566260000000\nAu     10.533309279999999      7.722703300000000      7.353082360000000\nAu     10.593273080000001      7.753437900000000     21.159922160000001\nAu     10.527279360000000     17.493783839999999     14.268429500000000\nAu      4.907006520000000      7.711380820000000     14.279644339999999\nAu      5.018669500000000      7.770077900000000      7.485901800000000\nAu     13.410827040000001      7.713210700000000     14.284747100000001\nAu     13.308877400000002      7.781854340000001      7.490537860000000\nAu      5.008466060000000     17.349843940000000     14.252558840000001\nAu     13.301738060000000     17.351301240000002     14.256733400000000\nAu      7.740891340000000      7.712818360000000     14.255203040000000\nAu      7.791607720000001      7.721838539999999      7.350393700000001\nAu      7.717247200000000      7.753175820000000     21.158911800000002\nAu     16.191535620000000      7.695249380000001     14.267623240000001\nAu      7.784077079999999     17.493631480000001     14.266470920000001\nAu      2.125016660000000     10.985237120000001     16.593982340000000\nAu     10.573708079999999     10.988244540000000     16.573102259999999\nAu     10.599431700000000     11.008222159999999      9.640751379999999\nAu      4.904894800000000     10.958586340000000     16.582938060000000\nAu      4.797085020000000     11.072825139999999      9.559204720000000\nAu     13.409801340000000     10.962052139999999     16.584929400000000\nAu     13.523682900000001     11.076968500000000      9.561577480000000\nAu      7.740862480000000     10.986569099999999     16.572575239999999\nAu      7.722113360000001     11.005736560000001      9.638074940000001\nAu     16.190527599999999     10.988372719999999     16.601881660000000\nAu      9.159939619999999      3.421496780000000     16.643787680000003\nAu      9.154988959999999     13.524979000000000     16.633948759999999\nAu      9.158716840000000     13.421151380000001      9.667335599999999\nAu     11.968593520000001      3.669379740000000     16.598455380000001\nAu      3.313264760000000     13.539844239999999     16.642308539999998\nAu     11.971667240000000     13.456146860000000     16.585873460000002\nAu     12.127575459999999     13.497952780000000      9.555636480000000\nAu      6.351888400000000      3.670629560000000     16.597595560000002\nAu      6.339419840000000     13.453129820000001     16.581985159999999\nAu      6.191201640000000     13.493866359999998      9.552486840000000\nAu     14.999319140000001     13.543817040000000     16.649418499999999\nAu     10.597054520000000      6.083837760000000     16.581554340000000\nAu     10.557973140000000      5.936142159999999      9.549838220000000\nAu     10.553856560000000     16.015784200000002     16.684597279999998\nAu     10.593468339999999     15.876478800000001      9.679218120000000\nAu      4.793162400000000      6.033481480000000     16.674877179999999\nAu      4.936440340000001      6.071313819999999      9.682076820000001\nAu     13.522813459999998      6.034534480000000     16.680086020000001\nAu     13.385230820000000      6.076066880000000      9.684464920000000\nAu      4.930156400000000     15.848296879999999     16.592067180000001\nAu     13.381421820000000     15.849883660000000     16.595894120000001\nAu      7.721514060000000      6.085409720000000     16.581326839999999\nAu      7.763594800000001      5.935789339999999      9.548683560000001\nAu      7.756494200000000     16.015047100000000     16.683024799999998\nAu      7.720494340000000     15.877279600000000      9.677998200000001\nAu      9.158962540000001      8.531048500000001     16.568571500000001\nAu      9.161255220000001      8.508946419999999      9.637058860000000\nAu      3.395627820000001      8.452850639999999     16.673673640000001\nAu      3.503085820000000      8.555548040000000      9.682645960000000\nAu     12.061374519999999      8.488833860000000     16.628525159999999\nAu     11.969932780000001      8.550032659999999      9.670092900000000\nAu      6.254300520000000      8.485909380000001     16.626350780000003\nAu      6.351873840000000      8.547565260000001      9.666534020000000\nAu     14.918766460000001      8.456427460000000     16.676955880000001\nAu     14.818144380000001      8.559658380000000      9.690416579999999\nAu      9.155953300000000     11.832542540000000     18.878440359999999\nAu      9.159930259999999     11.809070520000001     11.945885380000000\nAu      3.496278240000000     11.779142960000001     18.835935820000000\nAu      3.396407820000000     11.877639539999999     11.836954220000001\nAu     11.966987760000000     11.794568500000000     18.850603979999999\nAu     12.063524980000000     11.851241220000000     11.891350900000001\nAu      6.344966680000000     11.793077139999999     18.849372880000001\nAu      6.256522740000000     11.847429880000000     11.888873360000000\nAu     14.815080799999999     11.783016699999999     18.840128060000001\nAu     14.920508979999999     11.884274999999999     11.845360019999999\nAu     10.593444939999999      4.462880240000000     18.839991040000001\nAu     10.555949040000000      4.323226180000000     11.832352740000001\nAu     10.552947860000000     14.404032239999999     18.966047620000001\nAu     10.596872520000000     14.252528939999999     11.935924520000000\nAu      4.935478860000000      4.481313980000000     11.922548039999999\nAu     13.379642120000000      4.483206260000000     11.923870920000001\nAu      4.927449540000000     14.264799120000001     18.833586459999999\nAu      4.794869560000000     14.298742900000001     11.836907940000000\nAu     13.380052139999998     14.269710519999999     18.839714920000002\nAu     13.523931460000000     14.305552559999999     11.842328160000001\nAu      7.723164800000000      4.461643680000000     18.838729520000001\nAu      7.760097540000000      4.322051240000000     11.832373799999999\nAu      7.755293519999999     14.403829180000001     18.964483200000000\nAu      7.718251580000000     14.250858699999998     11.933992979999999\nAu      9.158510660000001      6.921140459999999     18.847012339999999\nAu      9.159591480000000      6.814742740000000     11.883556100000000\nAu      9.156623059999999     16.913815880000001     11.873156880000000\nAu      3.322400380000000      6.792320080000001     11.872268720000001\nAu     12.126664420000001      6.843997420000000     18.958888520000002\nAu     11.969807980000001      6.880197220000000     11.932946480000000\nAu     11.963199299999999     16.669041220000000     11.921977340000000\nAu      6.188792220000000      6.840847259999999     18.957189679999999\nAu      6.351272460000001      6.877352559999999     11.929342100000000\nAu     14.997031919999998      6.796853700000000     11.879009999999999\nAu      6.350472180000000     16.667712359999999     11.920068940000000\nAu      2.127711300000000      9.346223119999999     11.921345280000001\nAu     10.596674139999999      9.336642899999999     18.876497380000000\nAu     10.575921200000000      9.351760080000000     11.944868000000000\nAu      4.792412820000000      9.261764200000000     18.955158559999997\nAu      4.909205600000000      9.374698320000000     11.934458380000001\nAu     13.523164459999998      9.264880300000000     18.959285800000000\nAu     13.410174699999999      9.379346080000001     11.938734600000000\nAu      7.716485660000000      9.334826280000001     18.874975599999999\nAu      7.742896460000000      9.351474339999999     11.943685000000000\nAu     16.191630000000000      9.352642260000000     11.928390240000001\nAu     17.453820800000003     10.170143879999999     14.266305039999999\n";
    structs.caffeine = "24\r\nCaffeine\r\nH      -3.3804130    -1.1272367     0.5733036\r\nN       0.9668296    -1.0737425    -0.8198227\r\nC       0.0567293     0.8527195     0.3923156\r\nN      -1.3751742    -1.0212243    -0.0570552\r\nC      -1.2615018     0.2590713     0.5234135\r\nC      -0.3068337    -1.6836331    -0.7169344\r\nC       1.1394235     0.1874122    -0.2700900\r\nN       0.5602627     2.0839095     0.8251589\r\nO      -0.4926797    -2.8180554    -1.2094732\r\nC      -2.6328073    -1.7303959    -0.0060953\r\nO      -2.2301338     0.7988624     1.0899730\r\nH       2.5496990     2.9734977     0.6229590\r\nC       2.0527432    -1.7360887    -1.4931279\r\nH      -2.4807715    -2.7269528     0.4882631\r\nH      -3.0089039    -1.9025254    -1.0498023\r\nH       2.9176101    -1.8481516    -0.7857866\r\nH       2.3787863    -1.1211917    -2.3743655\r\nH       1.7189877    -2.7489920    -1.8439205\r\nC      -0.1518450     3.0970046     1.5348347\r\nC       1.8934096     2.1181245     0.4193193\r\nN       2.2861252     0.9968439    -0.2440298\r\nH      -0.1687028     4.0436553     0.9301094\r\nH       0.3535322     3.2979060     2.5177747\r\nH      -1.2074498     2.7537592     1.7203047\r\n";
    structs.benzene = "12\nbenzene example\nC        0.00000        1.40272        0.00000\nH        0.00000        2.49029        0.00000\nC       -1.21479        0.70136        0.00000\nH       -2.15666        1.24515        0.00000\nC       -1.21479       -0.70136        0.00000\nH       -2.15666       -1.24515        0.00000\nC        0.00000       -1.40272        0.00000\nH        0.00000       -2.49029        0.00000\nC        1.21479       -0.70136        0.00000\nH        2.15666       -1.24515        0.00000\nC        1.21479        0.70136        0.00000\nH        2.15666        1.24515        0.00000\n  ";
    structs.methane = "5\nmethane molecule (in ångströms)\nC        0.000000        0.000000        0.000000\nH        0.000000        0.000000        1.089000\nH        1.026719        0.000000       -0.363000\nH       -0.513360       -0.889165       -0.363000\nH       -0.513360        0.889165       -0.363000\n";

    if (location.hash !== "") {
        var hash = location.hash.slice(1, location.hash.length);
        var data = lz.decompressFromEncodedURIComponent(hash);
        data = JSON.parse(data);
        atoms.deserialize(data.atoms);
        view.deserialize(data.view);
        imposter.setAtoms(atoms, view);
        imposter.setResolution(view.getResolution());
        needReset = true;
    } else {
        loadStructure(xyz(structs.testosterone)[0]);
    }

    var selector = document.getElementById("controls-sample");
    selector.addEventListener("change", function() {
        loadStructure(xyz(structs[selector.value])[0]);
    });
    
    var lastX = 0.0;
    var lastY = 0.0;
    var buttonDown = false;

    renderContainer.addEventListener("mousedown", function(e) {
        document.body.style.cursor = "none";
        if (e.button == 0) {
            buttonDown = true;
        }
        lastX = e.clientX;
        lastY = e.clientY;
    });

    window.addEventListener("mouseup", function(e) {
        document.body.style.cursor = "";
        if (e.button == 0) {
            buttonDown = false;
        }
    });

    setInterval(function() {
        if (!buttonDown) {
            document.body.style.cursor = "";
        }
    }, 10);

    window.addEventListener("mousemove", function(e) {
        if (!buttonDown) {
            return;
        }
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        if (dx == 0 && dy == 0) {
            return;
        }
        lastX = e.clientX;
        lastY = e.clientY;
        if (e.shiftKey) {
            view.translate(dx, dy);
        } else {
            view.rotate(dx, dy);
        }
        needReset = true;
    });

    renderContainer.addEventListener("mousewheel", function(e) {
        var wd = 0;
        if (e.wheelDelta > 0) {
            wd = 1;
        }
        else {
            wd = -1;
        }
        if (kb.active('a')) {
            var scale = view.getAtomScale();
            scale += wd/100;
            view.setAtomScale(scale);
            document.getElementById("atom-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active('z')) {
            var scale = view.getRelativeAtomScale();
            scale += wd/100;
            view.setRelativeAtomScale(scale);
            document.getElementById("relative-atom-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active('b')) {
            var scale = view.getBondScale();
            scale += wd/100;
            view.setBondScale(scale);
            document.getElementById("bond-radius").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active('s')) {
            var scale = view.getBondShade();
            scale += wd/100;
            view.setBondShade(scale);
            document.getElementById("bond-shade").value = Math.round(scale * 100);
            needReset = true;
        } else if (kb.active('o')) {
            var ao = view.getAmbientOcclusion();
            ao += wd/100;
            view.setAmbientOcclusion(ao);
            document.getElementById("ambient-occlusion").value = Math.round(ao * 100);
        } else if (kb.active('l')) {
            var bright = view.getBrightness();
            bright += wd/100;
            view.setBrightness(bright);
            document.getElementById("brightness").value = Math.round(bright * 100);
        } else if (kb.active('q')) {
            var outline = view.getOutlineStrength();
            outline += wd/100;
            view.setOutlineStrength(outline);
            document.getElementById("outline-strength").value = Math.round(outline * 100);
        } else {
            var zoom = view.getZoom() * (wd === 1 ? 1/0.9 : 0.9);
            view.setZoom(zoom);
            needReset = true;
        }
        e.preventDefault();
    });

    var buttonUpColor = "#bbb";
    var buttonDownColor = "#3bf";

    function hideAllControls() {
        document.getElementById("controls-structure").style.display = "none";
        document.getElementById("controls-render").style.display = "none";
        document.getElementById("controls-share").style.display = "none";
        document.getElementById("controls-help").style.display = "none";
        document.getElementById("controls-about").style.display = "none";
        document.getElementById("menu-button-structure").style.background = buttonUpColor;
        document.getElementById("menu-button-render").style.background = buttonUpColor;
        document.getElementById("menu-button-share").style.background = buttonUpColor;
        document.getElementById("menu-button-help").style.background = buttonUpColor;
        document.getElementById("menu-button-about").style.background = buttonUpColor;
    }

    function showControl(id) {
        hideAllControls();
        document.getElementById("controls-" + id).style.display = "block";
        document.getElementById("menu-button-" + id).style.background = buttonDownColor;
    }

    document.getElementById("menu-button-structure").addEventListener("click", function() {
        showControl("structure");
    });
    document.getElementById("menu-button-render").addEventListener("click", function() {
        showControl("render");
    });
    document.getElementById("menu-button-share").addEventListener("click", function() {
        showControl("share");
    });
    document.getElementById("menu-button-help").addEventListener("click", function() {
        showControl("help");
    });
    document.getElementById("menu-button-about").addEventListener("click", function() {
        showControl("about");
    });

    showControl("render");

    function reflow() {
        var menu = document.getElementById("controls-container");
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        var rcw = Math.round(wh * 0.95);
        var rcm = Math.round((wh - rcw) / 2);
        renderContainer.style.height = rcw + "px";
        renderContainer.style.width = rcw + "px";
        renderContainer.style.left = rcm + "px";
        renderContainer.style.top = rcm + "px";
        menu.style.left = 48 + rcw + rcm * 2 + "px";
        menu.style.top = 48 + rcm + "px";
    }

    reflow();

    window.addEventListener("resize", reflow);

    document.getElementById("xyz-button").addEventListener("click", function() {
        loadStructure(xyz(document.getElementById("xyz-data").value)[0]);
    });

    document.getElementById("atom-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("atom-radius").value);
        view.setAtomScale(scale/100);
        needReset = true;
    });

    document.getElementById("relative-atom-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("relative-atom-radius").value);
        view.setRelativeAtomScale(scale/100);
        needReset = true;
    });

    document.getElementById("bond-radius").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("bond-radius").value);
        view.setBondScale(scale/100);
        needReset = true;
    });

    document.getElementById("bond-shade").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("bond-shade").value);
        view.setBondShade(scale/100);
        needReset = true;
    });

    document.getElementById("ambient-occlusion").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("ambient-occlusion").value);
        view.setAmbientOcclusion(scale/100);
    });

    document.getElementById("brightness").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("brightness").value);
        view.setBrightness(scale/100);
    });

    document.getElementById("outline-strength").addEventListener("input", function(e) {
        var scale = parseInt(document.getElementById("outline-strength").value);
        view.setOutlineStrength(scale/100);
    });

    document.getElementById("samples-per-frame").addEventListener("change", function(e) {
        var spf = parseInt(document.getElementById("samples-per-frame").value);
        view.setSamplesPerFrame(spf);
    });

    document.getElementById("resolution").addEventListener("change", function(e) {
        var resolution = parseInt(document.getElementById("resolution").value);
        view.setResolution(resolution);
        imposter.setResolution(resolution);
        needReset = true;
    });

    document.getElementById("bonds").addEventListener("click", function(e) {
        view.setBonds(document.getElementById("bonds").checked)
        imposter.setAtoms(atoms, view);
        needReset = true;
    });

    document.getElementById("bond-threshold").addEventListener("change", function(e) {
        view.setBondThreshold(parseFloat(document.getElementById("bond-threshold").value));
        imposter.setAtoms(atoms, view);
        needReset = true;
    });

    document.getElementById("fxaa").addEventListener("click", function(e) {
        view.setFXAA(document.getElementById("fxaa").checked)
    });

    document.getElementById("share-url-button").addEventListener("click", function(e) {
        var data = {
            view: view.serialize(),
            atoms: atoms.serialize()
        }
        data = lz.compressToEncodedURIComponent(JSON.stringify(data));
        document.getElementById("share-url").value = location.href.split("#")[0] + "#" + data;
    });

    document.getElementById("share-url").addEventListener("click", function(e) {
        this.select();
    });

    document.getElementById("atom-radius").value = Math.round(view.getAtomScale() * 100);
    document.getElementById("relative-atom-radius").value = Math.round(view.getRelativeAtomScale() * 100);
    document.getElementById("bond-radius").value = Math.round(view.getBondScale() * 100);
    document.getElementById("bond-shade").value = Math.round(view.getBondShade() * 100);
    document.getElementById("bond-threshold").value = view.getBondThreshold();
    document.getElementById("ambient-occlusion").value = Math.round(view.getAmbientOcclusion() * 100);
    document.getElementById("brightness").value = Math.round(view.getBrightness() * 100);
    document.getElementById("outline-strength").value = Math.round(view.getOutlineStrength() * 100);
    document.getElementById("bonds").checked = view.getBonds();
    document.getElementById("fxaa").checked = view.getFXAA();
    document.getElementById("resolution").value = view.getResolution();
    document.getElementById("samples-per-frame").value = view.getSamplesPerFrame();


    function loop() {
        document.getElementById("atom-radius-text").innerHTML = Math.round(view.getAtomScale() * 100) + "%";
        document.getElementById("relative-atom-radius-text").innerHTML = Math.round(view.getRelativeAtomScale() * 100) + "%";
        document.getElementById("bond-radius-text").innerHTML = Math.round(view.getBondScale() * 100) + "%";
        document.getElementById("bond-shade-text").innerHTML = Math.round(view.getBondShade() * 100) + "%";
        document.getElementById("ambient-occlusion-text").innerHTML = Math.round(view.getAmbientOcclusion() * 100) + "%";
        document.getElementById("brightness-text").innerHTML = Math.round(view.getBrightness() * 100) + "%";
        document.getElementById("outline-strength-text").innerHTML = Math.round(view.getOutlineStrength() * 100) + "%";
        if (needReset) {
            imposter.reset();
            needReset = false;
        }
        imposter.render(view);
        requestAnimationFrame(loop);
    }

    loop();

}

},{"./atoms":"/home/rye/Dropbox/src/speck/src/atoms.js","./elements":"/home/rye/Dropbox/src/speck/src/elements.js","./imposter-renderer":"/home/rye/Dropbox/src/speck/src/imposter-renderer.js","./view":"/home/rye/Dropbox/src/speck/src/view.js","./xyz":"/home/rye/Dropbox/src/speck/src/xyz.js","keyboardjs":"/home/rye/Dropbox/src/speck/node_modules/keyboardjs/keyboard.js","lz-string":"/home/rye/Dropbox/src/speck/node_modules/lz-string/libs/lz-string.js"}],"/home/rye/Dropbox/src/speck/src/view.js":[function(require,module,exports){
"use strict";


var glm = require("./gl-matrix");
var elements = require("./elements")


var MIN_ATOM_RADIUS = Infinity;
var MAX_ATOM_RADIUS = -Infinity;
for (var i = 0; i <= 118; i++) {
    MIN_ATOM_RADIUS = Math.min(MIN_ATOM_RADIUS, elements[i].radius);
    MAX_ATOM_RADIUS = Math.max(MAX_ATOM_RADIUS, elements[i].radius);
}


function clamp(min, max, value) {
    return Math.min(max, Math.max(min, value));
}


module.exports = function View(serialized) {

    var self = this;

    var aspect = 1.0;
    var zoom = 0.125;
    var translation = {x: 0.0, y: 0.0};
    var atomScale = 0.6;
    var relativeAtomScale = 1.0;
    var bondScale = 0.5;
    var rotation = glm.mat4.create();
    var ao = 0.5;
    var brightness = 0.5;
    var outlineStrength = 0.0;
    var spf = 32;
    var bonds = false;
    var bondThreshold = 1.2;
    var bondShade = 0.0;
    var resolution = 768;
    var fxaa = true;

    self.initialize = function() {
        if (serialized !== undefined) {
            self.deserialize(serialized);
        }
    };

    self.serialize = function() {
        return {
            aspect: aspect,
            zoom: zoom,
            translation: {x: translation.x, y: translation.y},
            atomScale: atomScale,
            relativeAtomScale: relativeAtomScale,
            bondScale: bondScale,
            rotation: glm.mat4.clone(rotation),
            ao: ao,
            brightness: brightness,
            spf: spf,
            resolution: resolution,
            bonds: bonds,
            bondThreshold: bondThreshold,
            bondShade: bondShade,
            outlineStrength: outlineStrength,
            fxaa: fxaa
        }
    };

    self.deserialize = function(data) {
        aspect = data.aspect;
        zoom = data.zoom;
        translation = {x: data.translation.x, y: data.translation.y};
        atomScale = data.atomScale;
        relativeAtomScale = data.relativeAtomScale;
        bondScale = data.bondScale;
        rotation = glm.mat4.clone(data.rotation);
        ao = data.ao;
        brightness = data.brightness;
        spf = data.spf;
        resolution = data.resolution;
        bonds = data.bonds;
        bondThreshold = data.bondThreshold;
        bondShade = data.bondShade;
        fxaa = data.fxaa;
        outlineStrength = data.outlineStrength;
    };

    self.clone = function() {
        return new View(self.serialize());
    };

    self.setResolution = function(res) {
        resolution  = res;
    };

    self.getResolution = function() {
        return resolution;
    };

    self.setZoom = function(val) {
        zoom = clamp(0.001, 2.0, val);
    };

    self.getZoom = function() {
        return zoom;
    };

    self.translate = function(dx, dy) {
        translation.x -= dx/(resolution * zoom);
        translation.y += dy/(resolution * zoom);
    };

    self.getTranslation = function() {
        return {x: translation.x, y: translation.y};
    };

    self.setTranslation = function(x, y) {
        translation.x = x;
        translation.y = y;
    };

    self.rotate = function(dx, dy) {
        var m = glm.mat4.create();
        glm.mat4.rotateY(m, m, dx * 0.005);
        glm.mat4.rotateX(m, m, dy * 0.005);
        glm.mat4.multiply(rotation, m, rotation);
    };

    self.setRotation = function(rot) {
        rotation = glm.mat4.clone(rot);
    };

    self.getRotation = function() {
        return glm.mat4.clone(rotation);
    };

    self.setAtomScale = function(val) {
        atomScale = clamp(0, 1, val);
    };

    self.getAtomScale = function() {
        return atomScale;
    };

    self.setRelativeAtomScale = function(val) {
        relativeAtomScale = clamp(0, 1, val);
    };

    self.getRelativeAtomScale = function() {
        return relativeAtomScale;
    };

    self.setBondScale = function(val) {
        bondScale = clamp(0, 1, val);
    };

    self.getBondScale = function() {
        return bondScale;
    };

    self.setBondShade = function(val) {
        bondShade = clamp(0, 1, val);
    };

    self.getBondShade = function() {
        return bondShade;
    };

    self.setAmbientOcclusion = function(val) {
        ao = clamp(0, 1, val);
    };

    self.getAmbientOcclusion = function() {
        return ao;
    };

    self.setBrightness = function(val) {
        brightness = clamp(0, 1, val);
    };

    self.getBrightness = function() {
        return brightness;
    };

    self.setSamplesPerFrame = function(val) {
        spf = val;
    };

    self.getSamplesPerFrame = function() {
        return spf;
    };

    self.setBonds = function(val) {
        bonds = val;
    }

    self.getBonds = function() {
        return bonds;
    };

    self.setBondThreshold = function(val) {
        bondThreshold = val;
    };

    self.getBondThreshold = function() {
        return bondThreshold;
    };

    self.setOutlineStrength = function(val) {
        outlineStrength = clamp(0, 1, val);
    };

    self.getOutlineStrength = function() {
        return outlineStrength;
    };

    self.setFXAA = function(val) {
        fxaa = val;
    };

    self.getFXAA = function() {
        return fxaa;
    };

    self.getRect = function() {
        var width = 1.0/zoom;
        var height = width/aspect;
        var bottom = -height/2 + translation.y;
        var top = height/2 + translation.y;
        var left = -width/2 + translation.x;
        var right = width/2 + translation.x;
        return {
            bottom: bottom,
            top: top,
            left: left,
            right: right
        }
    };

    self.getBondRadius = function() {
        return bondScale * atomScale * (1 + (MIN_ATOM_RADIUS - 1) * relativeAtomScale);
    };

    self.initialize();
}


},{"./elements":"/home/rye/Dropbox/src/speck/src/elements.js","./gl-matrix":"/home/rye/Dropbox/src/speck/src/gl-matrix.js"}],"/home/rye/Dropbox/src/speck/src/webgl.js":[function(require,module,exports){



module.exports.Buffer = function(gl) {

    var self = this;

    self.initialize = function() {
        self.buffer = gl.createBuffer();
    }

    self.bind = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, self.buffer);
    }

    self.set = function(data) {
        self.bind();
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    self.initialize();
};



module.exports.Renderable = function(gl, program, buffers, primitiveCount) {

    var self = this;

    self.primitiveCount = primitiveCount;

    self.initialize = function() {
    }

    self.render = function() {
        program.use();
        for (name in buffers) {
            var buffer = buffers[name].buffer;
            var size = buffers[name].size;
            try {
                var location = program.attribs[name].location;
            } catch (e) {
                console.log("Could not find location for", name);
                throw e;
            }
            buffer.bind();
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3 * primitiveCount);
        for (name in self.buffers) {
            gl.disableVertexAttribArray(program.attributes[name].location);
        }
    }

    self.initialize();
};

module.exports.InstancedRenderable = function(gl, program, buffers, primitiveCount, instancedExt) {

    var self = this;

    self.initialize = function() {
    }

    self.render = function() {
        program.use();
        for (name in buffers) {
            var buffer = buffers[name].buffer;
            var size = buffers[name].size;
            try {
                var location = program.attribs[name].location;
            } catch (e) {
                console.log("Could not find location for", name);
                throw e;
            }
            buffer.bind();
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
            instancedExt.vertexAttribDivisorANGLE(location, buffers[name].divisor);                
        }
        instancedExt.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6*2*3, primitiveCount)
        for (name in self.buffers) {
            gl.disableVertexAttribArray(program.attributes[name].location);
        }
    }

    self.initialize();
};




module.exports.Program = function(gl, vertexSource, fragmentSource) {

    var self = this;

    self.initialize = function() {
        self.program = self.compileProgram(vertexSource, fragmentSource);
        self.attribs = self.gatherAttribs();
        self.uniforms = self.gatherUniforms();
    }

    self.use = function() {
        gl.useProgram(self.program);
    }

    self.compileProgram = function(vertexSource, fragmentSource) {
        var vertexShader = self.compileShader(vertexSource, gl.VERTEX_SHADER);
        var fragmentShader = self.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getProgramInfoLog(program));
            throw "Failed to compile program.";
        }
        return program;
    }

    self.compileShader = function(source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var err = gl.getShaderInfoLog(shader);
            var lineno = parseInt(err.split(':')[2]);
            var split = source.split("\n");
            for (var i in split) {
                var q = parseInt(i);
                console.log(q + "  " + split[i]);
                if (i == lineno - 1) {
                    console.warn(err);
                }
            }
            typeString = type == gl.VERTEX_SHADER ? "vertex" : "fragment";
            throw "Failed to compile " + typeString + " shader.";
        }
        return shader;
    }

    self.setUniform = function(name, type, value) {
        var args = Array.prototype.slice.call(arguments, 2);
        self.use(); // Make this idempotent. At the context level, perhaps?
        try {
            var location = self.uniforms[name].location;
        }
        catch(e) {
            console.log(name);
            throw e;
        }
        gl['uniform' + type].apply(gl, [location].concat(args));
    }

    self.gatherUniforms = function() {
        var uniforms = {};
        var nUniforms = gl.getProgramParameter(self.program, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < nUniforms; i++) {
            var uniform = gl.getActiveUniform(self.program, i);
            uniforms[uniform.name] = {
                name: uniform.name,
                location: gl.getUniformLocation(self.program, uniform.name),
                type: uniform.type,
                size: uniform.size
            };
        }
        return uniforms;
    }

    self.gatherAttribs = function() {
        var attribs = {};
        var nAttribs = gl.getProgramParameter(self.program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < nAttribs; i++) {
            var attrib = gl.getActiveAttrib(self.program, i);
            attribs[attrib.name] = {
                name: attrib.name,
                location: gl.getAttribLocation(self.program, attrib.name),
                type: attrib.type,
                size: attrib.size
            };
        }
        return attribs;
    }   

    self.initialize();
};


},{}],"/home/rye/Dropbox/src/speck/src/xyz.js":[function(require,module,exports){
module.exports = function(data) {
    var lines = data.split('\n');
    var natoms = parseInt(lines[0]);
    var nframes = Math.floor(lines.length/(natoms+2));
    var trajectory = []
    for(var i = 0; i < nframes; i++) {
        var atoms = [];
        for(var j = 0; j < natoms; j++) {
            var line = lines[i*(natoms+2)+j+2].split(/\s+/);
            var atom = {};
            var k = 0;
            while (line[k] == "") k++;
            atom.symbol = line[k++];
            atom.position = [parseFloat(line[k++]), parseFloat(line[k++]), parseFloat(line[k++])];
            atoms.push(atom);
        }
        trajectory.push(atoms);
    }
    return trajectory;
}

},{}]},{},["/home/rye/Dropbox/src/speck/src/main.js"]);
