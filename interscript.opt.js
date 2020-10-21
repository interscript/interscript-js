(function(undefined) {
  var global_object = this, console;
  if(typeof (global) !== 'undefined') {
    global_object = global;
  }
  if(typeof (window) !== 'undefined') {
    global_object = window;
  }
  if(typeof (global_object.console) === 'object') {
    console = global_object.console;
  } else if(global_object.console == null) {
    console = global_object.console = { };
  } else {
    console = { };
  }
  if(!('log' in console)) {
    console.log = function() {

    };
  }
  if(!('warn' in console)) {
    console.warn = console.log;
  }
  if(typeof (this.Opal) !== 'undefined') {
    console.warn('Opal already loaded. Loading twice can cause troubles, please fix your setup.');
    return this.Opal;
  }
  var nil;
  var BasicObject;
  var _Object;
  var Module;
  var Class;
  var Opal = this.Opal = { };
  Opal.global = global_object;
  global_object.Opal = Opal;
  Opal.config = {
    missing_require_severity: 'error',
    unsupported_features_severity: 'warning',
    enable_stack_trace: true
};
  var $hasOwn = Object.hasOwnProperty;
  var $bind = Function.prototype.bind;
  var $setPrototype = Object.setPrototypeOf;
  var $slice = Array.prototype.slice;
  var $splice = Array.prototype.splice;
  var nil_id = 4;
  var unique_id = nil_id;
  Opal.uid = function() {
    unique_id += 2;
    return unique_id;
  };
  Opal.id = function(obj) {
    if(obj.$$is_number) return (obj * 2) + 1;
    if(obj.$$id != null) {
      return obj.$$id;
    }
    $defineProperty(obj, '$$id', Opal.uid());
    return obj.$$id;
  };
  Opal.gvars = { };
  Opal.exit = function(status) {
    if(Opal.gvars.DEBUG) console.log('Exited with status ' + status);
  };
  Opal.exceptions = [];
  Opal.pop_exception = function() {
    Opal.gvars["!"] = Opal.exceptions.pop() || nil;
  };
  Opal.inspect = function(obj) {
    if(obj === undefined) {
      return "undefined";
    } else if(obj === null) {
      return "null";
    } else if(!obj.$$class) {
      return obj.toString();
    } else {
      return obj.$inspect();
    }
  };
    function $defineProperty(object, name, initialValue) {
    if(typeof (object) === "string") {
      object[name] = initialValue;
    } else {
      Object.defineProperty(object, name, {
        value: initialValue,
        enumerable: false,
        configurable: true,
        writable: true
});
    }
  }
  Opal.defineProperty = $defineProperty;
  Opal.slice = $slice;
  Opal.truthy = function(val) {
    return (val !== nil && val != null && (!val.$$is_boolean || val == true));
  };
  Opal.falsy = function(val) {
    return (val === nil || val == null || (val.$$is_boolean && val == false));
  };
    function const_get_name(cref, name) {
    if(cref) return cref.$$const[name];
  }
    function const_lookup_nesting(nesting, name) {
    var i, ii, result, constant;
    if(nesting.length === 0) return;
    for(i = 0, ii = nesting.length; i < ii; i++) {
      constant = nesting[i].$$const[name];
      if(constant != null) return constant;
    }
  }
    function const_lookup_ancestors(cref, name) {
    var i, ii, result, ancestors;
    if(cref == null) return;
    ancestors = Opal.ancestors(cref);
    for(i = 0, ii = ancestors.length; i < ii; i++) {
      if(ancestors[i].$$const && $hasOwn.call(ancestors[i].$$const, name)) {
        return ancestors[i].$$const[name];
      }
    }
  }
    function const_lookup_Object(cref, name) {
    if(cref == null || cref.$$is_module) {
      return const_lookup_ancestors(_Object, name);
    }
  }
    function const_missing(cref, name, skip_missing) {
    if(!skip_missing) {
      return (cref || _Object).$const_missing(name);
    }
  }
  Opal.const_get_local = function(cref, name, skip_missing) {
    var result;
    if(cref == null) return;
    if(cref === '::') cref = _Object;
    if(!cref.$$is_module && !cref.$$is_class) {
      throw new Opal.TypeError(cref.toString() + " is not a class/module");
    }
    result = const_get_name(cref, name);
    if(result != null) return result;
    result = const_missing(cref, name, skip_missing);
    if(result != null) return result;
  };
  Opal.const_get_qualified = function(cref, name, skip_missing) {
    var result, cache, cached, current_version = Opal.const_cache_version;
    if(cref == null) return;
    if(cref === '::') cref = _Object;
    if(!cref.$$is_module && !cref.$$is_class) {
      throw new Opal.TypeError(cref.toString() + " is not a class/module");
    }
    if((cache = cref.$$const_cache) == null) {
      $defineProperty(cref, '$$const_cache', Object.create(null));
      cache = cref.$$const_cache;
    }
    cached = cache[name];
    if(cached == null || cached[0] !== current_version) {
      ((result = const_get_name(cref, name)) != null) || ((result = const_lookup_ancestors(cref, name)) != null);
      cache[name] = [current_version, result];
    } else {
      result = cached[1];
    }
    return result != null ? result : const_missing(cref, name, skip_missing);
  };
  Opal.const_cache_version = 1;
  Opal.const_get_relative = function(nesting, name, skip_missing) {
    var cref = nesting[0], result, current_version = Opal.const_cache_version, cache, cached;
    if((cache = nesting.$$const_cache) == null) {
      $defineProperty(nesting, '$$const_cache', Object.create(null));
      cache = nesting.$$const_cache;
    }
    cached = cache[name];
    if(cached == null || cached[0] !== current_version) {
      ((result = const_get_name(cref, name)) != null) || ((result = const_lookup_nesting(nesting, name)) != null) || ((result = const_lookup_ancestors(cref, name)) != null) || ((result = const_lookup_Object(cref, name)) != null);
      cache[name] = [current_version, result];
    } else {
      result = cached[1];
    }
    return result != null ? result : const_missing(cref, name, skip_missing);
  };
  Opal.const_set = function(cref, name, value) {
    if(cref == null || cref === '::') cref = _Object;
    if(value.$$is_a_module) {
      if(value.$$name == null || value.$$name === nil) value.$$name = name;
      if(value.$$base_module == null) value.$$base_module = cref;
    }
    cref.$$const = (cref.$$const || Object.create(null));
    cref.$$const[name] = value;
    cref.$$ = cref.$$const;
    Opal.const_cache_version++;
    if(cref === _Object) Opal[name] = value;
    $defineProperty(cref, name, value);
    return value;
  };
  Opal.constants = function(cref, inherit) {
    if(inherit == null) inherit = true;
    var module, modules = [cref], module_constants, i, ii, constants = { }, constant;
    if(inherit) modules = modules.concat(Opal.ancestors(cref));
    if(inherit && cref.$$is_module) modules = modules.concat([Opal.Object]).concat(Opal.ancestors(Opal.Object));
    for(i = 0, ii = modules.length; i < ii; i++) {
      module = modules[i];
      if(cref !== _Object && module == _Object) break;
      for(constant in module.$$const) {
        constants[constant] = true;
      }
    }
    return Object.keys(constants);
  };
  Opal.const_remove = function(cref, name) {
    Opal.const_cache_version++;
    if(cref.$$const[name] != null) {
      var old = cref.$$const[name];
      delete cref.$$const[name];
      return old;
    }
    if(cref.$$autoload != null && cref.$$autoload[name] != null) {
      delete cref.$$autoload[name];
      return nil;
    }
    throw Opal.NameError.$new("constant " + cref + "::" + cref.$name() + " not defined");
  };
  Opal.allocate_class = function(name, superclass) {
    var klass, constructor;
    if(superclass != null && superclass.$$bridge) {
      constructor = function() {
        var args = $slice.call(arguments), self = new ($bind.apply(superclass.$$constructor, [null].concat(args)))();
        $setPrototype(self, klass.$$prototype);
        return self;
      };
    } else {
      constructor = function() {

      };
    }
    if(name) {
      $defineProperty(constructor, 'displayName', '::' + name);
    }
    klass = constructor;
    $defineProperty(klass, '$$name', name);
    $defineProperty(klass, '$$constructor', constructor);
    $defineProperty(klass, '$$prototype', constructor.prototype);
    $defineProperty(klass, '$$const', { });
    $defineProperty(klass, '$$is_class', true);
    $defineProperty(klass, '$$is_a_module', true);
    $defineProperty(klass, '$$super', superclass);
    $defineProperty(klass, '$$cvars', { });
    $defineProperty(klass, '$$own_included_modules', []);
    $defineProperty(klass, '$$own_prepended_modules', []);
    $defineProperty(klass, '$$ancestors', []);
    $defineProperty(klass, '$$ancestors_cache_version', null);
    $defineProperty(klass.$$prototype, '$$class', klass);
    if(Opal.Class) {
      $setPrototype(klass, Opal.Class.prototype);
    }
    if(superclass != null) {
      $setPrototype(klass.$$prototype, superclass.$$prototype);
      if(superclass.$$meta) {
        Opal.build_class_singleton_class(klass);
      }
    }
    return klass;
  };
    function find_existing_class(scope, name) {
    var klass = const_get_name(scope, name);
    if(klass) {
      if(!klass.$$is_class) {
        throw Opal.TypeError.$new(name + " is not a class");
      }
      return klass;
    }
  }
    function ensureSuperclassMatch(klass, superclass) {
    if(klass.$$super !== superclass) {
      throw Opal.TypeError.$new("superclass mismatch for class " + klass.$$name);
    }
  }
  Opal.klass = function(scope, superclass, name) {
    var bridged;
    if(scope == null) {
      scope = _Object;
    } else if(!scope.$$is_class && !scope.$$is_module) {
      scope = scope.$$class;
    }
    if(superclass != null && !superclass.hasOwnProperty('$$is_class')) {
      bridged = superclass;
      superclass = _Object;
    }
    var klass = find_existing_class(scope, name);
    if(klass) {
      if(superclass) {
        ensureSuperclassMatch(klass, superclass);
      }
      return klass;
    }
    if(superclass == null) {
      superclass = _Object;
    }
    klass = Opal.allocate_class(name, superclass);
    Opal.const_set(scope, name, klass);
    if(superclass.$inherited) {
      superclass.$inherited(klass);
    }
    if(bridged) {
      Opal.bridge(bridged, klass);
    }
    return klass;
  };
  Opal.allocate_module = function(name) {
    var constructor = function() {

    };
    if(name) {
      $defineProperty(constructor, 'displayName', name + '.$$constructor');
    }
    var module = constructor;
    if(name) $defineProperty(constructor, 'displayName', name + '.constructor');
    $defineProperty(module, '$$name', name);
    $defineProperty(module, '$$prototype', constructor.prototype);
    $defineProperty(module, '$$const', { });
    $defineProperty(module, '$$is_module', true);
    $defineProperty(module, '$$is_a_module', true);
    $defineProperty(module, '$$cvars', { });
    $defineProperty(module, '$$iclasses', []);
    $defineProperty(module, '$$own_included_modules', []);
    $defineProperty(module, '$$own_prepended_modules', []);
    $defineProperty(module, '$$ancestors', [module]);
    $defineProperty(module, '$$ancestors_cache_version', null);
    $setPrototype(module, Opal.Module.prototype);
    return module;
  };
    function find_existing_module(scope, name) {
    var module = const_get_name(scope, name);
    if(module == null && scope === _Object) module = const_lookup_ancestors(_Object, name);
    if(module) {
      if(!module.$$is_module && module !== _Object) {
        throw Opal.TypeError.$new(name + " is not a module");
      }
    }
    return module;
  }
  Opal.module = function(scope, name) {
    var module;
    if(scope == null) {
      scope = _Object;
    } else if(!scope.$$is_class && !scope.$$is_module) {
      scope = scope.$$class;
    }
    module = find_existing_module(scope, name);
    if(module) {
      return module;
    }
    module = Opal.allocate_module(name);
    Opal.const_set(scope, name, module);
    return module;
  };
  Opal.get_singleton_class = function(object) {
    if(object.$$meta) {
      return object.$$meta;
    }
    if(object.hasOwnProperty('$$is_class')) {
      return Opal.build_class_singleton_class(object);
    } else if(object.hasOwnProperty('$$is_module')) {
      return Opal.build_module_singletin_class(object);
    } else {
      return Opal.build_object_singleton_class(object);
    }
  };
  Opal.build_class_singleton_class = function(klass) {
    var superclass, meta;
    if(klass.$$meta) {
      return klass.$$meta;
    }
    superclass = klass === BasicObject ? Class : Opal.get_singleton_class(klass.$$super);
    meta = Opal.allocate_class(null, superclass, function() {

    });
    $defineProperty(meta, '$$is_singleton', true);
    $defineProperty(meta, '$$singleton_of', klass);
    $defineProperty(klass, '$$meta', meta);
    $setPrototype(klass, meta.$$prototype);
    $defineProperty(klass, '$$class', Opal.Class);
    return meta;
  };
  Opal.build_module_singletin_class = function(mod) {
    if(mod.$$meta) {
      return mod.$$meta;
    }
    var meta = Opal.allocate_class(null, Opal.Module, function() {

    });
    $defineProperty(meta, '$$is_singleton', true);
    $defineProperty(meta, '$$singleton_of', mod);
    $defineProperty(mod, '$$meta', meta);
    $setPrototype(mod, meta.$$prototype);
    $defineProperty(mod, '$$class', Opal.Module);
    return meta;
  };
  Opal.build_object_singleton_class = function(object) {
    var superclass = object.$$class, klass = Opal.allocate_class(nil, superclass, function() {

    });
    $defineProperty(klass, '$$is_singleton', true);
    $defineProperty(klass, '$$singleton_of', object);
    delete klass.$$prototype.$$class;
    $defineProperty(object, '$$meta', klass);
    $setPrototype(object, object.$$meta.$$prototype);
    return klass;
  };
  Opal.is_method = function(prop) {
    return (prop[0] === '$' && prop[1] !== '$');
  };
  Opal.instance_methods = function(mod) {
    var exclude = [], results = [], ancestors = Opal.ancestors(mod);
    for(var i = 0, l = ancestors.length; i < l; i++) {
      var ancestor = ancestors[i], proto = ancestor.$$prototype;
      if(proto.hasOwnProperty('$$dummy')) {
        proto = proto.$$define_methods_on;
      }
      var props = Object.getOwnPropertyNames(proto);
      for(var j = 0, ll = props.length; j < ll; j++) {
        var prop = props[j];
        if(Opal.is_method(prop)) {
          var method_name = prop.slice(1), method = proto[prop];
          if(method.$$stub && exclude.indexOf(method_name) === -1) {
            exclude.push(method_name);
          }
          if(!method.$$stub && results.indexOf(method_name) === -1 && exclude.indexOf(method_name) === -1) {
            results.push(method_name);
          }
        }
      }
    }
    return results;
  };
  Opal.own_instance_methods = function(mod) {
    var results = [], proto = mod.$$prototype;
    if(proto.hasOwnProperty('$$dummy')) {
      proto = proto.$$define_methods_on;
    }
    var props = Object.getOwnPropertyNames(proto);
    for(var i = 0, length = props.length; i < length; i++) {
      var prop = props[i];
      if(Opal.is_method(prop)) {
        var method = proto[prop];
        if(!method.$$stub) {
          var method_name = prop.slice(1);
          results.push(method_name);
        }
      }
    }
    return results;
  };
  Opal.methods = function(obj) {
    return Opal.instance_methods(Opal.get_singleton_class(obj));
  };
  Opal.own_methods = function(obj) {
    return Opal.own_instance_methods(Opal.get_singleton_class(obj));
  };
  Opal.receiver_methods = function(obj) {
    var mod = Opal.get_singleton_class(obj);
    var singleton_methods = Opal.own_instance_methods(mod);
    var instance_methods = Opal.own_instance_methods(mod.$$super);
    return singleton_methods.concat(instance_methods);
  };
  Opal.class_variables = function(module) {
    var ancestors = Opal.ancestors(module), i, length = ancestors.length, result = { };
    for(i = length - 1; i >= 0; i--) {
      var ancestor = ancestors[i];
      for(var cvar in ancestor.$$cvars) {
        result[cvar] = ancestor.$$cvars[cvar];
      }
    }
    return result;
  };
  Opal.class_variable_set = function(module, name, value) {
    var ancestors = Opal.ancestors(module), i, length = ancestors.length;
    for(i = length - 2; i >= 0; i--) {
      var ancestor = ancestors[i];
      if($hasOwn.call(ancestor.$$cvars, name)) {
        ancestor.$$cvars[name] = value;
        return value;
      }
    }
    module.$$cvars[name] = value;
    return value;
  };
    function isRoot(proto) {
    return proto.hasOwnProperty('$$iclass') && proto.hasOwnProperty('$$root');
  }
    function own_included_modules(module) {
    var result = [], mod, proto = Object.getPrototypeOf(module.$$prototype);
    while(proto) {
      if(proto.hasOwnProperty('$$class')) {
        break;
      }
      mod = protoToModule(proto);
      if(mod) {
        result.push(mod);
      }
      proto = Object.getPrototypeOf(proto);
    }
    return result;
  }
    function own_prepended_modules(module) {
    var result = [], mod, proto = Object.getPrototypeOf(module.$$prototype);
    if(module.$$prototype.hasOwnProperty('$$dummy')) {
      while(proto) {
        if(proto === module.$$prototype.$$define_methods_on) {
          break;
        }
        mod = protoToModule(proto);
        if(mod) {
          result.push(mod);
        }
        proto = Object.getPrototypeOf(proto);
      }
    }
    return result;
  }
  Opal.append_features = function(module, includer) {
    var module_ancestors = Opal.ancestors(module);
    var iclasses = [];
    if(module_ancestors.indexOf(includer) !== -1) {
      throw Opal.ArgumentError.$new('cyclic include detected');
    }
    for(var i = 0, length = module_ancestors.length; i < length; i++) {
      var ancestor = module_ancestors[i], iclass = create_iclass(ancestor);
      $defineProperty(iclass, '$$included', true);
      iclasses.push(iclass);
    }
    var includer_ancestors = Opal.ancestors(includer), chain = chain_iclasses(iclasses), start_chain_after, end_chain_on;
    if(includer_ancestors.indexOf(module) === -1) {
      start_chain_after = includer.$$prototype;
      end_chain_on = Object.getPrototypeOf(includer.$$prototype);
    } else {
      var proto = includer.$$prototype, parent = proto, module_iclass = Object.getPrototypeOf(parent);
      while(module_iclass != null) {
        if(isRoot(module_iclass) && module_iclass.$$module === module) {
          break;
        }
        parent = module_iclass;
        module_iclass = Object.getPrototypeOf(module_iclass);
      }
      var next_ancestor = Object.getPrototypeOf(module_iclass);
      while(next_ancestor.hasOwnProperty('$$iclass') && !isRoot(next_ancestor)) {
        next_ancestor = Object.getPrototypeOf(next_ancestor);
      }
      start_chain_after = parent;
      end_chain_on = next_ancestor;
    }
    $setPrototype(start_chain_after, chain.first);
    $setPrototype(chain.last, end_chain_on);
    includer.$$own_included_modules = own_included_modules(includer);
    Opal.const_cache_version++;
  };
  Opal.prepend_features = function(module, prepender) {
    var module_ancestors = Opal.ancestors(module);
    var iclasses = [];
    if(module_ancestors.indexOf(prepender) !== -1) {
      throw Opal.ArgumentError.$new('cyclic prepend detected');
    }
    for(var i = 0, length = module_ancestors.length; i < length; i++) {
      var ancestor = module_ancestors[i], iclass = create_iclass(ancestor);
      $defineProperty(iclass, '$$prepended', true);
      iclasses.push(iclass);
    }
    var chain = chain_iclasses(iclasses), dummy_prepender = prepender.$$prototype, previous_parent = Object.getPrototypeOf(dummy_prepender), prepender_iclass, start_chain_after, end_chain_on;
    if(dummy_prepender.hasOwnProperty('$$dummy')) {
      prepender_iclass = dummy_prepender.$$define_methods_on;
    } else {
      prepender_iclass = create_dummy_iclass(prepender);
      flush_methods_in(prepender);
      $defineProperty(dummy_prepender, '$$dummy', true);
      $defineProperty(dummy_prepender, '$$define_methods_on', prepender_iclass);
      $setPrototype(dummy_prepender, prepender_iclass);
      $setPrototype(prepender_iclass, previous_parent);
    }
    var prepender_ancestors = Opal.ancestors(prepender);
    if(prepender_ancestors.indexOf(module) === -1) {
      start_chain_after = dummy_prepender;
      end_chain_on = Object.getPrototypeOf(dummy_prepender);
      while(end_chain_on != null) {
        if(end_chain_on.hasOwnProperty('$$root') || end_chain_on === prepender_iclass || !end_chain_on.hasOwnProperty('$$iclass')) {
          break;
        }
        end_chain_on = Object.getPrototypeOf(end_chain_on);
      }
    } else {
      throw Opal.RuntimeError.$new("Prepending a module multiple times is not supported");
    }
    $setPrototype(start_chain_after, chain.first);
    $setPrototype(chain.last, end_chain_on);
    prepender.$$own_prepended_modules = own_prepended_modules(prepender);
    Opal.const_cache_version++;
  };
    function flush_methods_in(module) {
    var proto = module.$$prototype, props = Object.getOwnPropertyNames(proto);
    for(var i = 0; i < props.length; i++) {
      var prop = props[i];
      if(Opal.is_method(prop)) {
        delete proto[prop];
      }
    }
  }
    function create_iclass(module) {
    var iclass = create_dummy_iclass(module);
    if(module.$$is_module) {
      module.$$iclasses.push(iclass);
    }
    return iclass;
  }
    function create_dummy_iclass(module) {
    var iclass = { }, proto = module.$$prototype;
    if(proto.hasOwnProperty('$$dummy')) {
      proto = proto.$$define_methods_on;
    }
    var props = Object.getOwnPropertyNames(proto), length = props.length, i;
    for(i = 0; i < length; i++) {
      var prop = props[i];
      $defineProperty(iclass, prop, proto[prop]);
    }
    $defineProperty(iclass, '$$iclass', true);
    $defineProperty(iclass, '$$module', module);
    return iclass;
  }
    function chain_iclasses(iclasses) {
    var length = iclasses.length, first = iclasses[0];
    $defineProperty(first, '$$root', true);
    if(length === 1) {
      return {
        first: first,
        last: first
};
    }
    var previous = first;
    for(var i = 1; i < length; i++) {
      var current = iclasses[i];
      $setPrototype(previous, current);
      previous = current;
    }
    return {
      first: iclasses[0],
      last: iclasses[length - 1]
};
  }
  Opal.bridge = function(native_klass, klass) {
    if(native_klass.hasOwnProperty('$$bridge')) {
      throw Opal.ArgumentError.$new("already bridged");
    }
    var klass_to_inject, klass_reference;
    klass_to_inject = klass.$$super || Opal.Object;
    klass_reference = klass;
    var original_prototype = klass.$$prototype;
    $defineProperty(native_klass, '$$bridge', klass);
    $setPrototype(native_klass.prototype, (klass.$$super || Opal.Object).$$prototype);
    $defineProperty(klass, '$$prototype', native_klass.prototype);
    $defineProperty(klass.$$prototype, '$$class', klass);
    $defineProperty(klass, '$$constructor', native_klass);
    $defineProperty(klass, '$$bridge', true);
  };
    function protoToModule(proto) {
    if(proto.hasOwnProperty('$$dummy')) {
      return;
    } else if(proto.hasOwnProperty('$$iclass')) {
      return proto.$$module;
    } else if(proto.hasOwnProperty('$$class')) {
      return proto.$$class;
    }
  }
    function own_ancestors(module) {
    return module.$$own_prepended_modules.concat([module]).concat(module.$$own_included_modules);
  }
  Opal.ancestors = function(module) {
    if(!module) {
      return [];
    }
    if(module.$$ancestors_cache_version === Opal.const_cache_version) {
      return module.$$ancestors;
    }
    var result = [], i, mods, length;
    for(i = 0, mods = own_ancestors(module), length = mods.length; i < length; i++) {
      result.push(mods[i]);
    }
    if(module.$$super) {
      for(i = 0, mods = Opal.ancestors(module.$$super), length = mods.length; i < length; i++) {
        result.push(mods[i]);
      }
    }
    module.$$ancestors_cache_version = Opal.const_cache_version;
    module.$$ancestors = result;
    return result;
  };
  Opal.included_modules = function(module) {
    var result = [], mod = null, proto = Object.getPrototypeOf(module.$$prototype);
    for(; proto && Object.getPrototypeOf(proto); proto = Object.getPrototypeOf(proto)) {
      mod = protoToModule(proto);
      if(mod && mod.$$is_module && proto.$$iclass && proto.$$included) {
        result.push(mod);
      }
    }
    return result;
  };
  Opal.add_stubs = function(stubs) {
    var proto = Opal.BasicObject.$$prototype;
    for(var i = 0, length = stubs.length; i < length; i++) {
      var stub = stubs[i], existing_method = proto[stub];
      if(existing_method == null || existing_method.$$stub) {
        Opal.add_stub_for(proto, stub);
      }
    }
  };
  Opal.add_stub_for = function(prototype, stub) {
    var method_missing_stub = Opal.stub_for(stub);
    $defineProperty(prototype, stub, method_missing_stub);
  };
  Opal.stub_for = function(method_name) {
        function method_missing_stub() {
      this.$method_missing.$$p = method_missing_stub.$$p;
      method_missing_stub.$$p = null;
      var args_ary = new Array(arguments.length);
      for(var i = 0, l = args_ary.length; i < l; i++) {
        args_ary[i] = arguments[i];
      }
      return this.$method_missing.apply(this, [method_name.slice(1)].concat(args_ary));
    }
    method_missing_stub.$$stub = true;
    return method_missing_stub;
  };
  Opal.ac = function(actual, expected, object, meth) {
    var inspect = '';
    if(object.$$is_a_module) {
      inspect += object.$$name + '.';
    } else {
      inspect += object.$$class.$$name + '#';
    }
    inspect += meth;
    throw Opal.ArgumentError.$new('[' + inspect + '] wrong number of arguments(' + actual + ' for ' + expected + ')');
  };
  Opal.block_ac = function(actual, expected, context) {
    var inspect = "`block in " + context + "'";
    throw Opal.ArgumentError.$new(inspect + ': wrong number of arguments (' + actual + ' for ' + expected + ')');
  };
  Opal.find_super_dispatcher = function(obj, mid, current_func, defcheck, defs) {
    var jsid = '$' + mid, ancestors, super_method;
    if(obj.hasOwnProperty('$$meta')) {
      ancestors = Opal.ancestors(obj.$$meta);
    } else {
      ancestors = Opal.ancestors(obj.$$class);
    }
    var current_index = ancestors.indexOf(current_func.$$owner);
    for(var i = current_index + 1; i < ancestors.length; i++) {
      var ancestor = ancestors[i], proto = ancestor.$$prototype;
      if(proto.hasOwnProperty('$$dummy')) {
        proto = proto.$$define_methods_on;
      }
      if(proto.hasOwnProperty(jsid)) {
        var method = proto[jsid];
        if(!method.$$stub) {
          super_method = method;
        }
        break;
      }
    }
    if(!defcheck && super_method == null && Opal.Kernel.$method_missing === obj.$method_missing) {
      throw Opal.NoMethodError.$new('super: no superclass method `' + mid + "' for " + obj, mid);
    }
    return super_method;
  };
  Opal.find_iter_super_dispatcher = function(obj, jsid, current_func, defcheck, implicit) {
    var call_jsid = jsid;
    if(!current_func) {
      throw Opal.RuntimeError.$new("super called outside of method");
    }
    if(implicit && current_func.$$define_meth) {
      throw Opal.RuntimeError.$new("implicit argument passing of super from method defined by define_method() is not supported. Specify all arguments explicitly");
    }
    if(current_func.$$def) {
      call_jsid = current_func.$$jsid;
    }
    return Opal.find_super_dispatcher(obj, call_jsid, current_func, defcheck);
  };
  Opal.ret = function(val) {
    Opal.returner.$v = val;
    throw Opal.returner;
  };
  Opal.brk = function(val, breaker) {
    breaker.$v = val;
    throw breaker;
  };
  Opal.new_brk = function() {
    return new Error('unexpected break');
  };
  Opal.yield1 = function(block, arg) {
    if(typeof (block) !== "function") {
      throw Opal.LocalJumpError.$new("no block given");
    }
    var has_mlhs = block.$$has_top_level_mlhs_arg, has_trailing_comma = block.$$has_trailing_comma_in_args;
    if(block.length > 1 || ((has_mlhs || has_trailing_comma) && block.length === 1)) {
      arg = Opal.to_ary(arg);
    }
    if((block.length > 1 || (has_trailing_comma && block.length === 1)) && arg.$$is_array) {
      return block.apply(null, arg);
    } else {
      return block(arg);
    }
  };
  Opal.yieldX = function(block, args) {
    if(typeof (block) !== "function") {
      throw Opal.LocalJumpError.$new("no block given");
    }
    if(block.length > 1 && args.length === 1) {
      if(args[0].$$is_array) {
        return block.apply(null, args[0]);
      }
    }
    if(!args.$$is_array) {
      var args_ary = new Array(args.length);
      for(var i = 0, l = args_ary.length; i < l; i++) {
        args_ary[i] = args[i];
      }
      return block.apply(null, args_ary);
    }
    return block.apply(null, args);
  };
  Opal.rescue = function(exception, candidates) {
    for(var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      if(candidate.$$is_array) {
        var result = Opal.rescue(exception, candidate);
        if(result) {
          return result;
        }
      } else if(candidate === Opal.JS.Error) {
        return candidate;
      } else if(candidate['$==='](exception)) {
        return candidate;
      }
    }
    return null;
  };
  Opal.is_a = function(object, klass) {
    if(klass != null && object.$$meta === klass || object.$$class === klass) {
      return true;
    }
    if(object.$$is_number && klass.$$is_number_class) {
      return true;
    }
    var i, length, ancestors = Opal.ancestors(object.$$is_class ? Opal.get_singleton_class(object) : (object.$$meta || object.$$class));
    for(i = 0, length = ancestors.length; i < length; i++) {
      if(ancestors[i] === klass) {
        return true;
      }
    }
    return false;
  };
  Opal.to_hash = function(value) {
    if(value.$$is_hash) {
      return value;
    } else if(value['$respond_to?']('to_hash', true)) {
      var hash = value.$to_hash();
      if(hash.$$is_hash) {
        return hash;
      } else {
        throw Opal.TypeError.$new("Can't convert " + value.$$class + " to Hash (" + value.$$class + "#to_hash gives " + hash.$$class + ")");
      }
    } else {
      throw Opal.TypeError.$new("no implicit conversion of " + value.$$class + " into Hash");
    }
  };
  Opal.to_ary = function(value) {
    if(value.$$is_array) {
      return value;
    } else if(value['$respond_to?']('to_ary', true)) {
      var ary = value.$to_ary();
      if(ary === nil) {
        return [value];
      } else if(ary.$$is_array) {
        return ary;
      } else {
        throw Opal.TypeError.$new("Can't convert " + value.$$class + " to Array (" + value.$$class + "#to_ary gives " + ary.$$class + ")");
      }
    } else {
      return [value];
    }
  };
  Opal.to_a = function(value) {
    if(value.$$is_array) {
      return value.slice();
    } else if(value['$respond_to?']('to_a', true)) {
      var ary = value.$to_a();
      if(ary === nil) {
        return [value];
      } else if(ary.$$is_array) {
        return ary;
      } else {
        throw Opal.TypeError.$new("Can't convert " + value.$$class + " to Array (" + value.$$class + "#to_a gives " + ary.$$class + ")");
      }
    } else {
      return [value];
    }
  };
  Opal.extract_kwargs = function(parameters) {
    var kwargs = parameters[parameters.length - 1];
    if(kwargs != null && kwargs['$respond_to?']('to_hash', true)) {
      $splice.call(parameters, parameters.length - 1, 1);
      return kwargs.$to_hash();
    } else {
      return Opal.hash2([], { });
    }
  };
  Opal.kwrestargs = function(given_args, used_args) {
    var keys = [], map = { }, key, given_map = given_args.$$smap;
    for(key in given_map) {
      if(!used_args[key]) {
        keys.push(key);
        map[key] = given_map[key];
      }
    }
    return Opal.hash2(keys, map);
  };
  Opal.send = function(recv, method, args, block) {
    var body = (typeof (method) === 'string') ? recv['$' + method] : method;
    if(body != null) {
      if(typeof block === 'function') {
        body.$$p = block;
      }
      return body.apply(recv, args);
    }
    return recv.$method_missing.apply(recv, [method].concat(args));
  };
  Opal.lambda = function(block) {
    block.$$is_lambda = true;
    return block;
  };
  Opal.def = function(obj, jsid, body) {
    if(obj === Opal.top) {
      Opal.defn(Opal.Object, jsid, body);
    } else if(!obj.$$eval && obj.$$is_a_module) {
      Opal.defn(obj, jsid, body);
    } else {
      Opal.defs(obj, jsid, body);
    }
  };
  Opal.defn = function(module, jsid, body) {
    body.displayName = jsid;
    body.$$owner = module;
    var proto = module.$$prototype;
    if(proto.hasOwnProperty('$$dummy')) {
      proto = proto.$$define_methods_on;
    }
    $defineProperty(proto, jsid, body);
    if(module.$$is_module) {
      if(module.$$module_function) {
        Opal.defs(module, jsid, body);
      }
      for(var i = 0, iclasses = module.$$iclasses, length = iclasses.length; i < length; i++) {
        var iclass = iclasses[i];
        $defineProperty(iclass, jsid, body);
      }
    }
    var singleton_of = module.$$singleton_of;
    if(module.$method_added && !module.$method_added.$$stub && !singleton_of) {
      module.$method_added(jsid.substr(1));
    } else if(singleton_of && singleton_of.$singleton_method_added && !singleton_of.$singleton_method_added.$$stub) {
      singleton_of.$singleton_method_added(jsid.substr(1));
    }
  };
  Opal.defs = function(obj, jsid, body) {
    if(obj.$$is_string || obj.$$is_number) {
      throw Opal.TypeError.$new("can't define singleton");
    }
    Opal.defn(Opal.get_singleton_class(obj), jsid, body);
  };
  Opal.rdef = function(obj, jsid) {
    if(!$hasOwn.call(obj.$$prototype, jsid)) {
      throw Opal.NameError.$new("method '" + jsid.substr(1) + "' not defined in " + obj.$name());
    }
    delete obj.$$prototype[jsid];
    if(obj.$$is_singleton) {
      if(obj.$$prototype.$singleton_method_removed && !obj.$$prototype.$singleton_method_removed.$$stub) {
        obj.$$prototype.$singleton_method_removed(jsid.substr(1));
      }
    } else {
      if(obj.$method_removed && !obj.$method_removed.$$stub) {
        obj.$method_removed(jsid.substr(1));
      }
    }
  };
  Opal.udef = function(obj, jsid) {
    if(!obj.$$prototype[jsid] || obj.$$prototype[jsid].$$stub) {
      throw Opal.NameError.$new("method '" + jsid.substr(1) + "' not defined in " + obj.$name());
    }
    Opal.add_stub_for(obj.$$prototype, jsid);
    if(obj.$$is_singleton) {
      if(obj.$$prototype.$singleton_method_undefined && !obj.$$prototype.$singleton_method_undefined.$$stub) {
        obj.$$prototype.$singleton_method_undefined(jsid.substr(1));
      }
    } else {
      if(obj.$method_undefined && !obj.$method_undefined.$$stub) {
        obj.$method_undefined(jsid.substr(1));
      }
    }
  };
    function is_method_body(body) {
    return (typeof (body) === "function" && !body.$$stub);
  }
  Opal.alias = function(obj, name, old) {
    var id = '$' + name, old_id = '$' + old, body = obj.$$prototype['$' + old], alias;
    if(obj.$$eval) {
      return Opal.alias(Opal.get_singleton_class(obj), name, old);
    }
    if(!is_method_body(body)) {
      var ancestor = obj.$$super;
      while(typeof (body) !== "function" && ancestor) {
        body = ancestor[old_id];
        ancestor = ancestor.$$super;
      }
      if(!is_method_body(body) && obj.$$is_module) {
        body = Opal.Object.$$prototype[old_id];
      }
      if(!is_method_body(body)) {
        throw Opal.NameError.$new("undefined method `" + old + "' for class `" + obj.$name() + "'");
      }
    }
    if(body.$$alias_of) body = body.$$alias_of;
    alias = function() {
      var block = alias.$$p, args, i, ii;
      args = new Array(arguments.length);
      for(i = 0, ii = arguments.length; i < ii; i++) {
        args[i] = arguments[i];
      }
      if(block != null) {
        alias.$$p = null;
      }
      return Opal.send(this, body, args, block);
    };
    alias.displayName = name;
    alias.length = body.length;
    alias.$$arity = body.$$arity;
    alias.$$parameters = body.$$parameters;
    alias.$$source_location = body.$$source_location;
    alias.$$alias_of = body;
    alias.$$alias_name = name;
    Opal.defn(obj, id, alias);
    return obj;
  };
  Opal.alias_native = function(obj, name, native_name) {
    var id = '$' + name, body = obj.$$prototype[native_name];
    if(typeof (body) !== "function" || body.$$stub) {
      throw Opal.NameError.$new("undefined native method `" + native_name + "' for class `" + obj.$name() + "'");
    }
    Opal.defn(obj, id, body);
    return obj;
  };
  Opal.hash_init = function(hash) {
    hash.$$smap = Object.create(null);
    hash.$$map = Object.create(null);
    hash.$$keys = [];
  };
  Opal.hash_clone = function(from_hash, to_hash) {
    to_hash.$$none = from_hash.$$none;
    to_hash.$$proc = from_hash.$$proc;
    for(var i = 0, keys = from_hash.$$keys, smap = from_hash.$$smap, len = keys.length, key, value; i < len; i++) {
      key = keys[i];
      if(key.$$is_string) {
        value = smap[key];
      } else {
        value = key.value;
        key = key.key;
      }
      Opal.hash_put(to_hash, key, value);
    }
  };
  Opal.hash_put = function(hash, key, value) {
    if(key.$$is_string) {
      if(!$hasOwn.call(hash.$$smap, key)) {
        hash.$$keys.push(key);
      }
      hash.$$smap[key] = value;
      return;
    }
    var key_hash, bucket, last_bucket;
    key_hash = hash.$$by_identity ? Opal.id(key) : key.$hash();
    if(!$hasOwn.call(hash.$$map, key_hash)) {
      bucket = {
        key: key,
        key_hash: key_hash,
        value: value
};
      hash.$$keys.push(bucket);
      hash.$$map[key_hash] = bucket;
      return;
    }
    bucket = hash.$$map[key_hash];
    while(bucket) {
      if(key === bucket.key || key['$eql?'](bucket.key)) {
        last_bucket = undefined;
        bucket.value = value;
        break;
      }
      last_bucket = bucket;
      bucket = bucket.next;
    }
    if(last_bucket) {
      bucket = {
        key: key,
        key_hash: key_hash,
        value: value
};
      hash.$$keys.push(bucket);
      last_bucket.next = bucket;
    }
  };
  Opal.hash_get = function(hash, key) {
    if(key.$$is_string) {
      if($hasOwn.call(hash.$$smap, key)) {
        return hash.$$smap[key];
      }
      return;
    }
    var key_hash, bucket;
    key_hash = hash.$$by_identity ? Opal.id(key) : key.$hash();
    if($hasOwn.call(hash.$$map, key_hash)) {
      bucket = hash.$$map[key_hash];
      while(bucket) {
        if(key === bucket.key || key['$eql?'](bucket.key)) {
          return bucket.value;
        }
        bucket = bucket.next;
      }
    }
  };
  Opal.hash_delete = function(hash, key) {
    var i, keys = hash.$$keys, length = keys.length, value;
    if(key.$$is_string) {
      if(!$hasOwn.call(hash.$$smap, key)) {
        return;
      }
      for(i = 0; i < length; i++) {
        if(keys[i] === key) {
          keys.splice(i, 1);
          break;
        }
      }
      value = hash.$$smap[key];
      delete hash.$$smap[key];
      return value;
    }
    var key_hash = key.$hash();
    if(!$hasOwn.call(hash.$$map, key_hash)) {
      return;
    }
    var bucket = hash.$$map[key_hash], last_bucket;
    while(bucket) {
      if(key === bucket.key || key['$eql?'](bucket.key)) {
        value = bucket.value;
        for(i = 0; i < length; i++) {
          if(keys[i] === bucket) {
            keys.splice(i, 1);
            break;
          }
        }
        if(last_bucket && bucket.next) {
          last_bucket.next = bucket.next;
        } else if(last_bucket) {
          delete last_bucket.next;
        } else if(bucket.next) {
          hash.$$map[key_hash] = bucket.next;
        } else {
          delete hash.$$map[key_hash];
        }
        return value;
      }
      last_bucket = bucket;
      bucket = bucket.next;
    }
  };
  Opal.hash_rehash = function(hash) {
    for(var i = 0, length = hash.$$keys.length, key_hash, bucket, last_bucket; i < length; i++) {
      if(hash.$$keys[i].$$is_string) {
        continue;
      }
      key_hash = hash.$$keys[i].key.$hash();
      if(key_hash === hash.$$keys[i].key_hash) {
        continue;
      }
      bucket = hash.$$map[hash.$$keys[i].key_hash];
      last_bucket = undefined;
      while(bucket) {
        if(bucket === hash.$$keys[i]) {
          if(last_bucket && bucket.next) {
            last_bucket.next = bucket.next;
          } else if(last_bucket) {
            delete last_bucket.next;
          } else if(bucket.next) {
            hash.$$map[hash.$$keys[i].key_hash] = bucket.next;
          } else {
            delete hash.$$map[hash.$$keys[i].key_hash];
          }
          break;
        }
        last_bucket = bucket;
        bucket = bucket.next;
      }
      hash.$$keys[i].key_hash = key_hash;
      if(!$hasOwn.call(hash.$$map, key_hash)) {
        hash.$$map[key_hash] = hash.$$keys[i];
        continue;
      }
      bucket = hash.$$map[key_hash];
      last_bucket = undefined;
      while(bucket) {
        if(bucket === hash.$$keys[i]) {
          last_bucket = undefined;
          break;
        }
        last_bucket = bucket;
        bucket = bucket.next;
      }
      if(last_bucket) {
        last_bucket.next = hash.$$keys[i];
      }
    }
  };
  Opal.hash = function() {
    var arguments_length = arguments.length, args, hash, i, length, key, value;
    if(arguments_length === 1 && arguments[0].$$is_hash) {
      return arguments[0];
    }
    hash = new Opal.Hash();
    Opal.hash_init(hash);
    if(arguments_length === 1 && arguments[0].$$is_array) {
      args = arguments[0];
      length = args.length;
      for(i = 0; i < length; i++) {
        if(args[i].length !== 2) {
          throw Opal.ArgumentError.$new("value not of length 2: " + args[i].$inspect());
        }
        key = args[i][0];
        value = args[i][1];
        Opal.hash_put(hash, key, value);
      }
      return hash;
    }
    if(arguments_length === 1) {
      args = arguments[0];
      for(key in args) {
        if($hasOwn.call(args, key)) {
          value = args[key];
          Opal.hash_put(hash, key, value);
        }
      }
      return hash;
    }
    if(arguments_length % 2 !== 0) {
      throw Opal.ArgumentError.$new("odd number of arguments for Hash");
    }
    for(i = 0; i < arguments_length; i += 2) {
      key = arguments[i];
      value = arguments[i + 1];
      Opal.hash_put(hash, key, value);
    }
    return hash;
  };
  Opal.hash2 = function(keys, smap) {
    var hash = new Opal.Hash();
    hash.$$smap = smap;
    hash.$$map = Object.create(null);
    hash.$$keys = keys;
    return hash;
  };
  Opal.range = function(first, last, exc) {
    var range = new Opal.Range();
    range.begin = first;
    range.end = last;
    range.excl = exc;
    return range;
  };
  Opal.ivar = function(name) {
    if(name === "constructor" || name === "displayName" || name === "__count__" || name === "__noSuchMethod__" || name === "__parent__" || name === "__proto__" || name === "hasOwnProperty" || name === "valueOf") {
      return name + "$";
    }
    return name;
  };
  Opal.escape_regexp = function(str) {
    return str.replace(/([-[\]\/{}()*+?.^$\\| ])/g, '\\$1').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\f]/g, '\\f').replace(/[\t]/g, '\\t');
  };
  Opal.global_regexp = function(pattern) {
    if(pattern.global) {
      return pattern;
    }
    if(pattern.$$g == null) {
      pattern.$$g = new RegExp(pattern.source, (pattern.multiline ? 'gm' : 'g') + (pattern.ignoreCase ? 'i' : ''));
    } else {
      pattern.$$g.lastIndex = null;
    }
    return pattern.$$g;
  };
  Opal.global_multiline_regexp = function(pattern) {
    var result;
    if(pattern.multiline) {
      if(pattern.global) {
        return pattern;
      }
      if(pattern.$$g != null) {
        result = pattern.$$g;
      } else {
        result = pattern.$$g = new RegExp(pattern.source, 'gm' + (pattern.ignoreCase ? 'i' : ''));
      }
    } else if(pattern.$$gm != null) {
      result = pattern.$$gm;
    } else {
      result = pattern.$$gm = new RegExp(pattern.source, 'gm' + (pattern.ignoreCase ? 'i' : ''));
    }
    result.lastIndex = null;
    return result;
  };
  Opal.modules = { };
  Opal.loaded_features = ['corelib/runtime'];
  Opal.current_dir = '.';
  Opal.require_table = {
    'corelib/runtime': true
};
  Opal.normalize = function(path) {
    var parts, part, new_parts = [], SEPARATOR = '/';
    if(Opal.current_dir !== '.') {
      path = Opal.current_dir.replace(/\/*$/, '/') + path;
    }
    path = path.replace(/^\.\//, '');
    path = path.replace(/\.(rb|opal|js)$/, '');
    parts = path.split(SEPARATOR);
    for(var i = 0, ii = parts.length; i < ii; i++) {
      part = parts[i];
      if(part === '') continue;
      (part === '..') ? new_parts.pop() : new_parts.push(part);
    }
    return new_parts.join(SEPARATOR);
  };
  Opal.loaded = function(paths) {
    var i, l, path;
    for(i = 0, l = paths.length; i < l; i++) {
      path = Opal.normalize(paths[i]);
      if(Opal.require_table[path]) {
        continue;
      }
      Opal.loaded_features.push(path);
      Opal.require_table[path] = true;
    }
  };
  Opal.load = function(path) {
    path = Opal.normalize(path);
    Opal.loaded([path]);
    var module = Opal.modules[path];
    if(module) {
      module(Opal);
    } else {
      var severity = Opal.config.missing_require_severity;
      var message = 'cannot load such file -- ' + path;
      if(severity === "error") {
        if(Opal.LoadError) {
          throw Opal.LoadError.$new(message);
        } else {
          throw message;
        }
      } else if(severity === "warning") {
        console.warn('WARNING: LoadError: ' + message);
      }
    }
    return true;
  };
  Opal.require = function(path) {
    path = Opal.normalize(path);
    if(Opal.require_table[path]) {
      return false;
    }
    return Opal.load(path);
  };
    function $BasicObject() {

  }
    function $Object() {

  }
    function $Module() {

  }
    function $Class() {

  }
  Opal.BasicObject = BasicObject = Opal.allocate_class('BasicObject', null, $BasicObject);
  Opal.Object = _Object = Opal.allocate_class('Object', Opal.BasicObject, $Object);
  Opal.Module = Module = Opal.allocate_class('Module', Opal.Object, $Module);
  Opal.Class = Class = Opal.allocate_class('Class', Opal.Module, $Class);
  $setPrototype(Opal.BasicObject, Opal.Class.$$prototype);
  $setPrototype(Opal.Object, Opal.Class.$$prototype);
  $setPrototype(Opal.Module, Opal.Class.$$prototype);
  $setPrototype(Opal.Class, Opal.Class.$$prototype);
  BasicObject.$$const["BasicObject"] = BasicObject;
  Opal.const_set(_Object, "BasicObject", BasicObject);
  Opal.const_set(_Object, "Object", _Object);
  Opal.const_set(_Object, "Module", Module);
  Opal.const_set(_Object, "Class", Class);
  BasicObject.$$class = Class;
  _Object.$$class = Class;
  Module.$$class = Class;
  Class.$$class = Class;
  $defineProperty(_Object.$$prototype, 'toString', function() {
    var to_s = this.$to_s();
    if(to_s.$$is_string && typeof (to_s) === 'object') {
      return to_s.valueOf();
    } else {
      return to_s;
    }
  });
  $defineProperty(_Object.$$prototype, '$require', Opal.require);
  Opal.$$ = _Object.$$;
  Opal.top = new _Object();
  Opal.top.$to_s = Opal.top.$inspect = function() {
    return 'main';
  };
    function $NilClass() {

  }
  Opal.NilClass = Opal.allocate_class('NilClass', Opal.Object, $NilClass);
  Opal.const_set(_Object, 'NilClass', Opal.NilClass);
  nil = Opal.nil = new Opal.NilClass();
  nil.$$id = nil_id;
  nil.call = nil.apply = function() {
    throw Opal.LocalJumpError.$new('no block given');
  };
  Opal.breaker = new Error('unexpected break (old)');
  Opal.returner = new Error('unexpected return');
  TypeError.$$super = Error;
  var stubs = '$new#$===#$respond_to?#$raise#$type_error#$coerce_to#$nil?#$<=>#$coerce_to!#$[]#$upcase#$module_eval#$to_proc#$<#$>#$attr_reader#$attr_writer#$const_name!#$=~#$inject#$split#$const_get#$!~#$start_with?#$bind#$call#$append_features#$included#$name#$cover?#$size#$merge#$compile#$proc#$any?#$to_s#$include?#$copy_class_variables#$copy_constants#$require#$class_eval#$initialize_copy#$allocate#$inspect#$object_id#$coerce_to?#$<<#$copy_instance_variables#$copy_singleton_methods#$initialize_clone#$define_method#$singleton_class#$initialize_dup#$for#$empty?#$pop#$extend_object#$extended#$to_int#$Integer#$enum_for#$result#$print#$format#$puts#$each#$<=#$length#$exception#$is_a?#$rand#$respond_to_missing?#$try_convert!#$join#$new_seed#$srand#$sym#$arg#$open#$include#$clone#$+#$Rational#$escape#$options#$to_str#$match#$begin#$to_a#$force_encoding#$ljust#$ceil#$/#$rjust#$floor#$each_char#$chomp#$to_i#$encoding#$match?#$captures#$succ#$public_send#$destructure#$enumerator_size#$yield#$flatten#$map#$warn#$*#$try_convert#$-#$push#$[]=#$first#$reverse#$sort#$compare#$dup#$sort!#$map!#$key?#$values#$zip#$instance_of?#$Float#$coerce#$div#$-@#$to_f#$denominator#$to_r#$%#$Complex#$zero?#$numerator#$abs#$round#$truncate#$replace#$to_ary#$hash#$bsearch_index#$dig#$end#$exclude_end?#$max#$min#$>=#$**#$sort_by#$times#$last#$upto#$reject#$pristine#$merge!#$fetch#$compare_by_identity#$lambda?#$arity#$default#$default_proc#$default_proc=#$default=#$bridge#$__coerced__#$nan?#$infinite?#$gcd#$lcm#$frexp#$ldexp#$rationalize#$loop#$each_with_index#$bsearch#$source_location#$const_set#$sub#$default_external#$attr_accessor#$register#$bytes#$each_byte#$bytesize#$find#$getbyte#$module_function#$checked#$float!#$gamma#$integer!#$real?#$cos#$sin#$real#$imag#$conj#$abs2#$quo#$polar#$exp#$log#$divmod#$hypot#$atan2#$finite?#$positive?#$reduce#$with_precision#$send#$convert#$strftime#$year#$month#$day#$wday#$utc?#$mon#$yday#$hour#$sec#$zone#$cweek_cyear#$isdst#$unshift#$define_struct_attribute#$alias_method#$members#$keys#$to_sym#$each_pair#$each_with_object#$write#$String#$concat#$getc#$write_proc=#$extend#$to_path#$basename#$rindex#$gsub#$end_with?#$__register_clock__#$now#$reseed#$seed#$encode#$chr#$state#$const_defined?#$generator=#$native?#$to_n#$Native#$_Array#$instance_method#$slice#$_initialize#$tap#$exports#$Array#$name_for#$loaded#$load_from_buffer#$all?#$libs#$reset#$reset_readers#$reset_serializers#$private#$providers#$contains?#$file_format#$clear#$configured_providers#$configured_default#$extname#$slice!#$provider_instances#$letter#$terminal?#$children_tree#$root?#$compressible?#$compress_child_and_merge#$compress_children_and_copy#$compress#$first_child#$new_compressed_node#$parent#$compress_children#$terminal!#$each_value#$parent=#$add#$root#$char_symbols#$compressed?#$compress_root#$root=#$compressor#$partial_word?#$chars#$word?#$scan#$children#$match_prefix#$as_word#$class_name#$attributes#$letter_inspect#$terminal_inspect#$children_inspect#$terminal#$foreach#$chomp!#$read#$load#$serializer#$dump#$safe_load#$terminal=#$partial_word_chars?#$word_chars?#$closest_node#$children_match_prefix#$delete#$protected#$missing#$add_to_children_tree#$new_node#$shift#$root_builder#$resolve#$readers#$each_word#$serializers#$properties#$create_id#$json_create#$create_id=#$parse#$generate#$from_object#$to_json#$responds_to?#$to_io#$load_and_serialize_system_mappings#$depth#$load_system_mappings#$serialize_system_mappings#$system_code#$root_path#$load_opal_mappings#$load_file#$system_path#$include_inherited_mappings#$build_hashes#$build_trie#$rules#$postrules#$characters#$dictionary#$compact!#$to_h#$create#$dictionary_trie#$b#$pack#$packformat#$unpack#$signed#$value#$address#$from_string#$alignment#$pointer#$read_string#$find_type#$typedef#$has_key?#$get_bytes#$get_string#$put_bytes#$get#$put#$buffer#$from_native_mem#$from_native#$to_native_mem#$to_native#$count#$memory#$library#$context#$malloc#$type#$address=#$realloc#$free#$by_ptr#$set#$offset#$type=#$struct#$kind_of?#$attach_function#$define_singleton_method#$contexts#$decode64#$ffi_lib#$layout#$ptr#$grow#$evaluate#$js_matches#$pattern#$default_compile_info#$cached#$options=#$|#$onig_new_deluxe#$js_exec#$onig_region_new#$onig_search#$onig_region_free#$onig_free#$ffi_evaluate#$matches#$ffi_region#$resize#$write_string#$match_before_onigmo#$match_before_onigmo?#$gsub_before_onigmo#$map_resolve#$map_loaded?#$load_map_json#$uniq#$load_maps#$chain#$transliterate#$character_separator#$word_separator#$title_case#$downcase#$characters_hash#$dictionary_hash#$external_processing#$sub_replace#$mkregexp#$up_case_around?#$add_separator#$unicode_normalize#$aliases#$map_exist?#$strip#$wait_for#$on_load'.split('#'), stubs_obj = { };
  for(var i = 0; i < stubs.length; i++) stubs_obj[stubs[i]] = {
    value: Opal.stub_for(stubs[i]),
    enumerable: false,
    configurable: true,
    writable: true
};
  Object.defineProperties(Opal.BasicObject.$$prototype, stubs_obj);
}).call(this);
Opal.loaded(["corelib/runtime.js"]);
Opal.modules["corelib/helpers"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Opal');
    var $nesting = [self].concat($parent_nesting), $Opal_bridge$1, $Opal_type_error$2, $Opal_coerce_to$3, $Opal_coerce_to$excl$4, $Opal_coerce_to$ques$5, $Opal_try_convert$6, $Opal_compare$7, $Opal_destructure$8, $Opal_respond_to$ques$9, $Opal_inspect_obj$10, $Opal_instance_variable_name$excl$11, $Opal_class_variable_name$excl$12, $Opal_const_name$excl$13, $Opal_pristine$14;
    Opal.defs(self, '$bridge', $Opal_bridge$1 = function $$bridge(constructor, klass) {
      var self = this;
      return Opal.bridge(constructor, klass);
    }, $Opal_bridge$1.$$arity = 2);
    Opal.defs(self, '$type_error', $Opal_type_error$2 = function $$type_error(object, type, method, coerced) {
      var $a, self = this;
      if(method == null) {
        method = nil;
      }
      ;
      if(coerced == null) {
        coerced = nil;
      }
      ;
      if($truthy(($truthy($a = method) ? coerced : $a))) {
        return $$($nesting, 'TypeError').$new("" + "can't convert " + (object.$class()) + " into " + (type) + " (" + (object.$class()) + "#" + (method) + " gives " + (coerced.$class()) + ")");
      } else {
        return $$($nesting, 'TypeError').$new("" + "no implicit conversion of " + (object.$class()) + " into " + (type));
      }
      ;
    }, $Opal_type_error$2.$$arity = -3);
    Opal.defs(self, '$coerce_to', $Opal_coerce_to$3 = function $$coerce_to(object, type, method) {
      var self = this;
      if($truthy(type['$==='](object))) {
        return object;
      }
      ;
      if($truthy(object['$respond_to?'](method))) {

      } else {
        self.$raise(self.$type_error(object, type));
      }
      ;
      return object.$__send__(method);
    }, $Opal_coerce_to$3.$$arity = 3);
    Opal.defs(self, '$coerce_to!', $Opal_coerce_to$excl$4 = function(object, type, method) {
      var self = this, coerced = nil;
      coerced = self.$coerce_to(object, type, method);
      if($truthy(type['$==='](coerced))) {

      } else {
        self.$raise(self.$type_error(object, type, method, coerced));
      }
      ;
      return coerced;
    }, $Opal_coerce_to$excl$4.$$arity = 3);
    Opal.defs(self, '$coerce_to?', $Opal_coerce_to$ques$5 = function(object, type, method) {
      var self = this, coerced = nil;
      if($truthy(object['$respond_to?'](method))) {

      } else {
        return nil;
      }
      ;
      coerced = self.$coerce_to(object, type, method);
      if($truthy(coerced['$nil?']())) {
        return nil;
      }
      ;
      if($truthy(type['$==='](coerced))) {

      } else {
        self.$raise(self.$type_error(object, type, method, coerced));
      }
      ;
      return coerced;
    }, $Opal_coerce_to$ques$5.$$arity = 3);
    Opal.defs(self, '$try_convert', $Opal_try_convert$6 = function $$try_convert(object, type, method) {
      var self = this;
      if($truthy(type['$==='](object))) {
        return object;
      }
      ;
      if($truthy(object['$respond_to?'](method))) {
        return object.$__send__(method);
      } else {
        return nil;
      }
      ;
    }, $Opal_try_convert$6.$$arity = 3);
    Opal.defs(self, '$compare', $Opal_compare$7 = function $$compare(a, b) {
      var self = this, compare = nil;
      compare = a['$<=>'](b);
      if($truthy(compare === nil)) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + (a.$class()) + " with " + (b.$class()) + " failed");
      }
      ;
      return compare;
    }, $Opal_compare$7.$$arity = 2);
    Opal.defs(self, '$destructure', $Opal_destructure$8 = function $$destructure(args) {
      var self = this;
      if(args.length == 1) {
        return args[0];
      } else if(args.$$is_array) {
        return args;
      } else {
        var args_ary = new Array(args.length);
        for(var i = 0, l = args_ary.length; i < l; i++) {
          args_ary[i] = args[i];
        }
        return args_ary;
      }
    }, $Opal_destructure$8.$$arity = 1);
    Opal.defs(self, '$respond_to?', $Opal_respond_to$ques$9 = function(obj, method, include_all) {
      var self = this;
      if(include_all == null) {
        include_all = false;
      }
      ;
      if(obj == null || !obj.$$class) {
        return false;
      }
      ;
      return obj['$respond_to?'](method, include_all);
    }, $Opal_respond_to$ques$9.$$arity = -3);
    /* destroyed: TreeShaking#shake_methods/$inspect_obj */0;
    /* destroyed: TreeShaking#shake_methods/$instance_variable_name! */0;
    /* destroyed: TreeShaking#shake_methods/$class_variable_name! */0;
    Opal.defs(self, '$const_name!', $Opal_const_name$excl$13 = function(const_name) {
      var self = this;
      const_name = $$($nesting, 'Opal')['$coerce_to!'](const_name, $$($nesting, 'String'), "to_str");
      if($truthy(const_name['$[]'](0)['$!='](const_name['$[]'](0).$upcase()))) {
        self.$raise($$($nesting, 'NameError'), "" + "wrong constant name " + (const_name));
      }
      ;
      return const_name;
    }, $Opal_const_name$excl$13.$$arity = 1);
    Opal.defs(self, '$pristine', $Opal_pristine$14 = function $$pristine(owner_class, $a) {
      var $post_args, method_names, self = this;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      method_names = $post_args;
      ;
      var method_name, method;
      for(var i = method_names.length - 1; i >= 0; i--) {
        method_name = method_names[i];
        method = owner_class.$$prototype['$' + method_name];
        if(method && !method.$$stub) {
          method.$$pristine = true;
        }
      }
      ;
      return nil;
    }, $Opal_pristine$14.$$arity = -2);
  })($nesting[0], $nesting);
};
Opal.modules["corelib/module"] = function(Opal) {
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $lambda = Opal.lambda, $range = Opal.range, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Module');
    var $nesting = [self].concat($parent_nesting), $Module_allocate$1, $Module_initialize$2, $Module_$eq_eq_eq$3, $Module_$lt$4, $Module_$lt_eq$5, $Module_$gt$6, $Module_$gt_eq$7, $Module_$lt_eq_gt$8, $Module_alias_method$9, $Module_alias_native$10, $Module_ancestors$11, $Module_append_features$12, $Module_attr_accessor$13, $Module_attr_reader$14, $Module_attr_writer$15, $Module_autoload$16, $Module_class_variables$17, $Module_class_variable_get$18, $Module_class_variable_set$19, $Module_class_variable_defined$ques$20, $Module_remove_class_variable$21, $Module_constants$22, $Module_constants$23, $Module_nesting$24, $Module_const_defined$ques$25, $Module_const_get$26, $Module_const_missing$28, $Module_const_set$29, $Module_public_constant$30, $Module_define_method$31, $Module_remove_method$33, $Module_singleton_class$ques$34, $Module_include$35, $Module_included_modules$36, $Module_include$ques$37, $Module_instance_method$38, $Module_instance_methods$39, $Module_included$40, $Module_extended$41, $Module_extend_object$42, $Module_method_added$43, $Module_method_removed$44, $Module_method_undefined$45, $Module_module_eval$46, $Module_module_exec$48, $Module_method_defined$ques$49, $Module_module_function$50, $Module_name$51, $Module_prepend$52, $Module_prepend_features$53, $Module_prepended$54, $Module_remove_const$55, $Module_to_s$56, $Module_undef_method$57, $Module_instance_variables$58, $Module_dup$59, $Module_copy_class_variables$60, $Module_copy_constants$61;
    Opal.defs(self, '$allocate', $Module_allocate$1 = function $$allocate() {
      var self = this;
      var module = Opal.allocate_module(nil, function() {

      });
      if(self !== Opal.Module) Object.setPrototypeOf(module, self.$$prototype);
      return module;
    }, $Module_allocate$1.$$arity = 0);
    Opal.def(self, '$initialize', $Module_initialize$2 = function $$initialize() {
      var $iter = $Module_initialize$2.$$p, block = $iter || nil, self = this;
      if($iter) $Module_initialize$2.$$p = null;
      if($iter) $Module_initialize$2.$$p = null;
      ;
      if((block !== nil)) {
        return $send(self, 'module_eval', [], block.$to_proc());
      } else {
        return nil;
      }
      ;
    }, $Module_initialize$2.$$arity = 0);
    Opal.def(self, '$===', $Module_$eq_eq_eq$3 = function(object) {
      var self = this;
      if($truthy(object == null)) {
        return false;
      }
      ;
      return Opal.is_a(object, self);
      ;
    }, $Module_$eq_eq_eq$3.$$arity = 1);
    Opal.def(self, '$<', $Module_$lt$4 = function(other) {
      var self = this;
      if($truthy($$($nesting, 'Module')['$==='](other))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "compared with non class/module");
      }
      ;
      var working = self, ancestors, i, length;
      if(working === other) {
        return false;
      }
      for(i = 0, ancestors = Opal.ancestors(self), length = ancestors.length; i < length; i++) {
        if(ancestors[i] === other) {
          return true;
        }
      }
      for(i = 0, ancestors = Opal.ancestors(other), length = ancestors.length; i < length; i++) {
        if(ancestors[i] === self) {
          return false;
        }
      }
      return nil;
      ;
    }, $Module_$lt$4.$$arity = 1);
    Opal.def(self, '$<=', $Module_$lt_eq$5 = function(other) {
      var $a, self = this;
      return ($truthy($a = self['$equal?'](other)) ? $a : $rb_lt(self, other));
    }, $Module_$lt_eq$5.$$arity = 1);
    Opal.def(self, '$>', $Module_$gt$6 = function(other) {
      var self = this;
      if($truthy($$($nesting, 'Module')['$==='](other))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "compared with non class/module");
      }
      ;
      return $rb_lt(other, self);
    }, $Module_$gt$6.$$arity = 1);
    Opal.def(self, '$>=', $Module_$gt_eq$7 = function(other) {
      var $a, self = this;
      return ($truthy($a = self['$equal?'](other)) ? $a : $rb_gt(self, other));
    }, $Module_$gt_eq$7.$$arity = 1);
    Opal.def(self, '$<=>', $Module_$lt_eq_gt$8 = function(other) {
      var self = this, lt = nil;
      if(self === other) {
        return 0;
      }
      ;
      if($truthy($$($nesting, 'Module')['$==='](other))) {

      } else {
        return nil;
      }
      ;
      lt = $rb_lt(self, other);
      if($truthy(lt['$nil?']())) {
        return nil;
      }
      ;
      if($truthy(lt)) {
        return -1;
      } else {
        return 1;
      }
      ;
    }, $Module_$lt_eq_gt$8.$$arity = 1);
    Opal.def(self, '$alias_method', $Module_alias_method$9 = function $$alias_method(newname, oldname) {
      var self = this;
      Opal.alias(self, newname, oldname);
      return self;
    }, $Module_alias_method$9.$$arity = 2);
    /* destroyed: TreeShaking#shake_methods/$alias_native */0;
    /* destroyed: TreeShaking#shake_methods/$ancestors */0;
    Opal.def(self, '$append_features', $Module_append_features$12 = function $$append_features(includer) {
      var self = this;
      Opal.append_features(self, includer);
      return self;
    }, $Module_append_features$12.$$arity = 1);
    Opal.def(self, '$attr_accessor', $Module_attr_accessor$13 = function $$attr_accessor($a) {
      var $post_args, names, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      names = $post_args;
      ;
      $send(self, 'attr_reader', Opal.to_a(names));
      return $send(self, 'attr_writer', Opal.to_a(names));
    }, $Module_attr_accessor$13.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$attr */0;
    Opal.def(self, '$attr_reader', $Module_attr_reader$14 = function $$attr_reader($a) {
      var $post_args, names, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      names = $post_args;
      ;
      var proto = self.$$prototype;
      for(var i = names.length - 1; i >= 0; i--) {
        var name = names[i], id = '$' + name, ivar = Opal.ivar(name);
        var body = (function(ivar) {
          return function() {
            if(this[ivar] == null) {
              return nil;
            } else {
              return this[ivar];
            }
          };
        })(ivar);
        Opal.defineProperty(proto, ivar, nil);
        body.$$parameters = [];
        body.$$arity = 0;
        Opal.defn(self, id, body);
      }
      ;
      return nil;
    }, $Module_attr_reader$14.$$arity = -1);
    Opal.def(self, '$attr_writer', $Module_attr_writer$15 = function $$attr_writer($a) {
      var $post_args, names, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      names = $post_args;
      ;
      var proto = self.$$prototype;
      for(var i = names.length - 1; i >= 0; i--) {
        var name = names[i], id = '$' + name + '=', ivar = Opal.ivar(name);
        var body = (function(ivar) {
          return function(value) {
            return this[ivar] = value;
          };
        })(ivar);
        body.$$parameters = [['req']];
        body.$$arity = 1;
        Opal.defineProperty(proto, ivar, nil);
        Opal.defn(self, id, body);
      }
      ;
      return nil;
    }, $Module_attr_writer$15.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$autoload */0;
    /* destroyed: TreeShaking#shake_methods/$class_variables */0;
    /* destroyed: TreeShaking#shake_methods/$class_variable_get */0;
    /* destroyed: TreeShaking#shake_methods/$class_variable_set */0;
    /* destroyed: TreeShaking#shake_methods/$class_variable_defined? */0;
    /* destroyed: TreeShaking#shake_methods/$remove_class_variable */0;
    /* destroyed: TreeShaking#shake_methods/$constants */0;
    /* destroyed: TreeShaking#shake_methods/$constants */0;
    /* destroyed: TreeShaking#shake_methods/$nesting */0;
    Opal.def(self, '$const_defined?', $Module_const_defined$ques$25 = function(name, inherit) {
      var self = this;
      if(inherit == null) {
        inherit = true;
      }
      ;
      name = $$($nesting, 'Opal')['$const_name!'](name);
      if($truthy(name['$=~']($$$($$($nesting, 'Opal'), 'CONST_NAME_REGEXP')))) {

      } else {
        self.$raise($$($nesting, 'NameError').$new("" + "wrong constant name " + (name), name));
      }
      ;
      var module, modules = [self], module_constants, i, ii;
      if(inherit) {
        modules = modules.concat(Opal.ancestors(self));
        if(self.$$is_module) {
          modules = modules.concat([Opal.Object]).concat(Opal.ancestors(Opal.Object));
        }
      }
      for(i = 0, ii = modules.length; i < ii; i++) {
        module = modules[i];
        if(module.$$const[name] != null) {
          return true;
        }
      }
      return false;
      ;
    }, $Module_const_defined$ques$25.$$arity = -2);
    Opal.def(self, '$const_get', $Module_const_get$26 = function $$const_get(name, inherit) {
      var $$27, self = this;
      if(inherit == null) {
        inherit = true;
      }
      ;
      name = $$($nesting, 'Opal')['$const_name!'](name);
      if(name.indexOf('::') === 0 && name !== '::') {
        name = name.slice(2);
      }
      ;
      if($truthy(name.indexOf('::') != -1 && name != '::')) {
        return $send(name.$split("::"), 'inject', [self], ($$27 = function(o, c) {
          var self = $$27.$$s || this;
          if(o == null) {
            o = nil;
          }
          ;
          if(c == null) {
            c = nil;
          }
          ;
          return o.$const_get(c);
        }, $$27.$$s = self, $$27.$$arity = 2, $$27));
      }
      ;
      if($truthy(name['$=~']($$$($$($nesting, 'Opal'), 'CONST_NAME_REGEXP')))) {

      } else {
        self.$raise($$($nesting, 'NameError').$new("" + "wrong constant name " + (name), name));
      }
      ;
      if(inherit) {
        return $$([self], name);
      } else {
        return Opal.const_get_local(self, name);
      }
      ;
    }, $Module_const_get$26.$$arity = -2);
    Opal.def(self, '$const_missing', $Module_const_missing$28 = function $$const_missing(name) {
      var self = this, full_const_name = nil;
      if(self.$$autoload) {
        var file = self.$$autoload[name];
        if(file) {
          self.$require(file);
          return self.$const_get(name);
        }
      }
      ;
      full_const_name = (function() {
        if(self['$==']($$($nesting, 'Object'))) {
          return name;
        } else {
          return "" + (self) + "::" + (name);
        }
        ;
        return nil;
      })();
      return self.$raise($$($nesting, 'NameError').$new("" + "uninitialized constant " + (full_const_name), name));
    }, $Module_const_missing$28.$$arity = 1);
    Opal.def(self, '$const_set', $Module_const_set$29 = function $$const_set(name, value) {
      var $a, self = this;
      name = $$($nesting, 'Opal')['$const_name!'](name);
      if($truthy(($truthy($a = name['$!~']($$$($$($nesting, 'Opal'), 'CONST_NAME_REGEXP'))) ? $a : name['$start_with?']("::")))) {
        self.$raise($$($nesting, 'NameError').$new("" + "wrong constant name " + (name), name));
      }
      ;
      Opal.const_set(self, name, value);
      return value;
    }, $Module_const_set$29.$$arity = 2);
    /* destroyed: TreeShaking#shake_methods/$public_constant */0;
    Opal.def(self, '$define_method', $Module_define_method$31 = function $$define_method(name, method) {
      var $iter = $Module_define_method$31.$$p, block = $iter || nil, $a, $$32, self = this, $case = nil;
      if($iter) $Module_define_method$31.$$p = null;
      if($iter) $Module_define_method$31.$$p = null;
      ;
      ;
      if($truthy(method === undefined && block === nil)) {
        self.$raise($$($nesting, 'ArgumentError'), "tried to create a Proc object without a block");
      }
      ;
      block = ($truthy($a = block) ? $a : (function() {
        $case = method;
        if($$($nesting, 'Proc')['$===']($case)) {
          return method;
        } else if($$($nesting, 'Method')['$===']($case)) {
          return method.$to_proc().$$unbound;
        } else if($$($nesting, 'UnboundMethod')['$===']($case)) {
          return $lambda(($$32 = function($b) {
            var self = $$32.$$s || this, $post_args, args, bound = nil;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            args = $post_args;
            ;
            bound = method.$bind(self);
            return $send(bound, 'call', Opal.to_a(args));
          }, $$32.$$s = self, $$32.$$arity = -1, $$32));
        } else {
          return self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + (block.$class()) + " (expected Proc/Method)");
        }
      })());
      var id = '$' + name;
      block.$$jsid = name;
      block.$$s = null;
      block.$$def = block;
      block.$$define_meth = true;
      Opal.defn(self, id, block);
      return name;
      ;
    }, $Module_define_method$31.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$remove_method */0;
    /* destroyed: TreeShaking#shake_methods/$singleton_class? */0;
    Opal.def(self, '$include', $Module_include$35 = function $$include($a) {
      var $post_args, mods, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      mods = $post_args;
      ;
      for(var i = mods.length - 1; i >= 0; i--) {
        var mod = mods[i];
        if(!mod.$$is_module) {
          self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + ((mod).$class()) + " (expected Module)");
        }
        (mod).$append_features(self);
        (mod).$included(self);
      }
      ;
      return self;
    }, $Module_include$35.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$included_modules */0;
    Opal.def(self, '$include?', $Module_include$ques$37 = function(mod) {
      var self = this;
      if(!mod.$$is_module) {
        self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + ((mod).$class()) + " (expected Module)");
      }
      var i, ii, mod2, ancestors = Opal.ancestors(self);
      for(i = 0, ii = ancestors.length; i < ii; i++) {
        mod2 = ancestors[i];
        if(mod2 === mod && mod2 !== self) {
          return true;
        }
      }
      return false;
    }, $Module_include$ques$37.$$arity = 1);
    Opal.def(self, '$instance_method', $Module_instance_method$38 = function $$instance_method(name) {
      var self = this;
      var meth = self.$$prototype['$' + name];
      if(!meth || meth.$$stub) {
        self.$raise($$($nesting, 'NameError').$new("" + "undefined method `" + (name) + "' for class `" + (self.$name()) + "'", name));
      }
      return $$($nesting, 'UnboundMethod').$new(self, meth.$$owner || self, meth, name);
    }, $Module_instance_method$38.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$instance_methods */0;
    Opal.def(self, '$included', $Module_included$40 = function $$included(mod) {
      var self = this;
      return nil;
    }, $Module_included$40.$$arity = 1);
    Opal.def(self, '$extended', $Module_extended$41 = function $$extended(mod) {
      var self = this;
      return nil;
    }, $Module_extended$41.$$arity = 1);
    Opal.def(self, '$extend_object', $Module_extend_object$42 = function $$extend_object(object) {
      var self = this;
      return nil;
    }, $Module_extend_object$42.$$arity = 1);
    Opal.def(self, '$method_added', $Module_method_added$43 = function $$method_added($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $Module_method_added$43.$$arity = -1);
    Opal.def(self, '$method_removed', $Module_method_removed$44 = function $$method_removed($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $Module_method_removed$44.$$arity = -1);
    Opal.def(self, '$method_undefined', $Module_method_undefined$45 = function $$method_undefined($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $Module_method_undefined$45.$$arity = -1);
    Opal.def(self, '$module_eval', $Module_module_eval$46 = function $$module_eval($a) {
      var $iter = $Module_module_eval$46.$$p, block = $iter || nil, $post_args, args, $b, $$47, self = this, string = nil, file = nil, _lineno = nil, default_eval_options = nil, compiling_options = nil, compiled = nil;
      if($iter) $Module_module_eval$46.$$p = null;
      if($iter) $Module_module_eval$46.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if($truthy(($truthy($b = block['$nil?']()) ? !!Opal.compile : $b))) {
        if($truthy($range(1, 3, false)['$cover?'](args.$size()))) {

        } else {
          $$($nesting, 'Kernel').$raise($$($nesting, 'ArgumentError'), "wrong number of arguments (0 for 1..3)");
        }
        ;
        $b = [].concat(Opal.to_a(args)), (string = ($b[0] == null ? nil : $b[0])), (file = ($b[1] == null ? nil : $b[1])), (_lineno = ($b[2] == null ? nil : $b[2])), $b;
        default_eval_options = $hash2(["file", "eval"], {
          "file": ($truthy($b = file) ? $b : "(eval)"),
          "eval": true
});
        compiling_options = Opal.hash({
          arity_check: false
}).$merge(default_eval_options);
        compiled = $$($nesting, 'Opal').$compile(string, compiling_options);
        block = $send($$($nesting, 'Kernel'), 'proc', [], ($$47 = function() {
          var self = $$47.$$s || this;
          return (function(self) {
            return eval(compiled);
          })(self);
        }, $$47.$$s = self, $$47.$$arity = 0, $$47));
      } else if($truthy(args['$any?']())) {
        $$($nesting, 'Kernel').$raise($$($nesting, 'ArgumentError'), "" + ("" + "wrong number of arguments (" + (args.$size()) + " for 0)") + "\n\n  NOTE:If you want to enable passing a String argument please add \"require 'opal-parser'\" to your script\n");
      }
      ;
      var old = block.$$s, result;
      block.$$s = null;
      result = block.apply(self, [self]);
      block.$$s = old;
      return result;
      ;
    }, $Module_module_eval$46.$$arity = -1);
    Opal.alias(self, "class_eval", "module_eval");
    /* destroyed: TreeShaking#shake_methods/$module_exec */0;
    /* destroyed: TreeShaking#shake_methods/$class_exec */0;
    /* destroyed: TreeShaking#shake_methods/$method_defined? */0;
    Opal.def(self, '$module_function', $Module_module_function$50 = function $$module_function($a) {
      var $post_args, methods, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      methods = $post_args;
      ;
      if(methods.length === 0) {
        self.$$module_function = true;
      } else {
        for(var i = 0, length = methods.length; i < length; i++) {
          var meth = methods[i], id = '$' + meth, func = self.$$prototype[id];
          Opal.defs(self, id, func);
        }
      }
      return self;
      ;
    }, $Module_module_function$50.$$arity = -1);
    Opal.def(self, '$name', $Module_name$51 = function $$name() {
      var self = this;
      if(self.$$full_name) {
        return self.$$full_name;
      }
      var result = [], base = self;
      while(base) {
        if(base.$$name === nil || base.$$name == null) return nil;
        result.unshift(base.$$name);
        base = base.$$base_module;
        if(base === Opal.Object) {
          break;
        }
      }
      if(result.length === 0) {
        return nil;
      }
      return self.$$full_name = result.join('::');
    }, $Module_name$51.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$prepend */0;
    /* destroyed: TreeShaking#shake_methods/$prepend_features */0;
    /* destroyed: TreeShaking#shake_methods/$prepended */0;
    /* destroyed: TreeShaking#shake_methods/$remove_const */0;
    Opal.def(self, '$to_s', $Module_to_s$56 = function $$to_s() {
      var $a, self = this;
      return ($truthy($a = Opal.Module.$name.call(self)) ? $a : "" + "#<" + (self.$$is_module ? 'Module' : 'Class') + ":0x" + (self.$__id__().$to_s(16)) + ">");
    }, $Module_to_s$56.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$undef_method */0;
    /* destroyed: TreeShaking#shake_methods/$instance_variables */0;
    Opal.def(self, '$dup', $Module_dup$59 = function $$dup() {
      var $iter = $Module_dup$59.$$p, $yield = $iter || nil, self = this, copy = nil, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Module_dup$59.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      copy = $send(self, Opal.find_super_dispatcher(self, 'dup', $Module_dup$59, false), $zuper, $iter);
      copy.$copy_class_variables(self);
      copy.$copy_constants(self);
      return copy;
    }, $Module_dup$59.$$arity = 0);
    Opal.def(self, '$copy_class_variables', $Module_copy_class_variables$60 = function $$copy_class_variables(other) {
      var self = this;
      for(var name in other.$$cvars) {
        self.$$cvars[name] = other.$$cvars[name];
      }
    }, $Module_copy_class_variables$60.$$arity = 1);
    return (Opal.def(self, '$copy_constants', $Module_copy_constants$61 = function $$copy_constants(other) {
      var self = this;
      var name, other_constants = other.$$const;
      for(name in other_constants) {
        Opal.const_set(self, name, other_constants[name]);
      }
    }, $Module_copy_constants$61.$$arity = 1), nil) && 'copy_constants';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/class"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/module");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Class');
    var $nesting = [self].concat($parent_nesting), $Class_new$1, $Class_allocate$2, $Class_inherited$3, $Class_initialize_dup$4, $Class_new$5, $Class_superclass$6, $Class_to_s$7;
    Opal.defs(self, '$new', $Class_new$1 = function(superclass) {
      var $iter = $Class_new$1.$$p, block = $iter || nil, self = this;
      if($iter) $Class_new$1.$$p = null;
      if($iter) $Class_new$1.$$p = null;
      ;
      if(superclass == null) {
        superclass = $$($nesting, 'Object');
      }
      ;
      if(!superclass.$$is_class) {
        throw Opal.TypeError.$new("superclass must be a Class");
      }
      var klass = Opal.allocate_class(nil, superclass);
      superclass.$inherited(klass);
      (function() {
        if((block !== nil)) {
          return $send((klass), 'class_eval', [], block.$to_proc());
        } else {
          return nil;
        }
        ;
        return nil;
      })();
      return klass;
      ;
    }, $Class_new$1.$$arity = -1);
    Opal.def(self, '$allocate', $Class_allocate$2 = function $$allocate() {
      var self = this;
      var obj = new self.$$constructor();
      obj.$$id = Opal.uid();
      return obj;
    }, $Class_allocate$2.$$arity = 0);
    Opal.def(self, '$inherited', $Class_inherited$3 = function $$inherited(cls) {
      var self = this;
      return nil;
    }, $Class_inherited$3.$$arity = 1);
    Opal.def(self, '$initialize_dup', $Class_initialize_dup$4 = function $$initialize_dup(original) {
      var self = this;
      self.$initialize_copy(original);
      self.$$name = null;
      self.$$full_name = null;
      ;
    }, $Class_initialize_dup$4.$$arity = 1);
    Opal.def(self, '$new', $Class_new$5 = function($a) {
      var $iter = $Class_new$5.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Class_new$5.$$p = null;
      if($iter) $Class_new$5.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      var object = self.$allocate();
      Opal.send(object, object.$initialize, args, block);
      return object;
      ;
    }, $Class_new$5.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$superclass */0;
    return (Opal.def(self, '$to_s', $Class_to_s$7 = function $$to_s() {
      var $iter = $Class_to_s$7.$$p, $yield = $iter || nil, self = this;
      if($iter) $Class_to_s$7.$$p = null;
      var singleton_of = self.$$singleton_of;
      if(singleton_of && (singleton_of.$$is_a_module)) {
        return "" + "#<Class:" + ((singleton_of).$name()) + ">";
      } else if(singleton_of) {
        return "" + "#<Class:#<" + ((singleton_of.$$class).$name()) + ":0x" + ((Opal.id(singleton_of)).$to_s(16)) + ">>";
      }
      return $send(self, Opal.find_super_dispatcher(self, 'to_s', $Class_to_s$7, false), [], null);
    }, $Class_to_s$7.$$arity = 0), nil) && 'to_s';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/basic_object"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $range = Opal.range, $hash2 = Opal.hash2, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'BasicObject');
    var $nesting = [self].concat($parent_nesting), $BasicObject_initialize$1, $BasicObject_$eq_eq$2, $BasicObject_eql$ques$3, $BasicObject___id__$4, $BasicObject___send__$5, $BasicObject_$excl$6, $BasicObject_$not_eq$7, $BasicObject_instance_eval$8, $BasicObject_instance_exec$10, $BasicObject_singleton_method_added$11, $BasicObject_singleton_method_removed$12, $BasicObject_singleton_method_undefined$13, $BasicObject_class$14, $BasicObject_method_missing$15;
    Opal.def(self, '$initialize', $BasicObject_initialize$1 = function $$initialize($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $BasicObject_initialize$1.$$arity = -1);
    Opal.def(self, '$==', $BasicObject_$eq_eq$2 = function(other) {
      var self = this;
      return self === other;
    }, $BasicObject_$eq_eq$2.$$arity = 1);
    Opal.def(self, '$eql?', $BasicObject_eql$ques$3 = function(other) {
      var self = this;
      return self['$=='](other);
    }, $BasicObject_eql$ques$3.$$arity = 1);
    Opal.alias(self, "equal?", "==");
    Opal.def(self, '$__id__', $BasicObject___id__$4 = function $$__id__() {
      var self = this;
      if(self.$$id != null) {
        return self.$$id;
      }
      Opal.defineProperty(self, '$$id', Opal.uid());
      return self.$$id;
    }, $BasicObject___id__$4.$$arity = 0);
    Opal.def(self, '$__send__', $BasicObject___send__$5 = function $$__send__(symbol, $a) {
      var $iter = $BasicObject___send__$5.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $BasicObject___send__$5.$$p = null;
      if($iter) $BasicObject___send__$5.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      var func = self['$' + symbol];
      if(func) {
        if(block !== nil) {
          func.$$p = block;
        }
        return func.apply(self, args);
      }
      if(block !== nil) {
        self.$method_missing.$$p = block;
      }
      return self.$method_missing.apply(self, [symbol].concat(args));
      ;
    }, $BasicObject___send__$5.$$arity = -2);
    Opal.def(self, '$!', $BasicObject_$excl$6 = function() {
      var self = this;
      return false;
    }, $BasicObject_$excl$6.$$arity = 0);
    Opal.def(self, '$!=', $BasicObject_$not_eq$7 = function(other) {
      var self = this;
      return self['$=='](other)['$!']();
    }, $BasicObject_$not_eq$7.$$arity = 1);
    Opal.def(self, '$instance_eval', $BasicObject_instance_eval$8 = function $$instance_eval($a) {
      var $iter = $BasicObject_instance_eval$8.$$p, block = $iter || nil, $post_args, args, $b, $$9, self = this, string = nil, file = nil, _lineno = nil, default_eval_options = nil, compiling_options = nil, compiled = nil;
      if($iter) $BasicObject_instance_eval$8.$$p = null;
      if($iter) $BasicObject_instance_eval$8.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if($truthy(($truthy($b = block['$nil?']()) ? !!Opal.compile : $b))) {
        if($truthy($range(1, 3, false)['$cover?'](args.$size()))) {

        } else {
          $$$('::', 'Kernel').$raise($$$('::', 'ArgumentError'), "wrong number of arguments (0 for 1..3)");
        }
        ;
        $b = [].concat(Opal.to_a(args)), (string = ($b[0] == null ? nil : $b[0])), (file = ($b[1] == null ? nil : $b[1])), (_lineno = ($b[2] == null ? nil : $b[2])), $b;
        default_eval_options = $hash2(["file", "eval"], {
          "file": ($truthy($b = file) ? $b : "(eval)"),
          "eval": true
});
        compiling_options = Opal.hash({
          arity_check: false
}).$merge(default_eval_options);
        compiled = $$$('::', 'Opal').$compile(string, compiling_options);
        block = $send($$$('::', 'Kernel'), 'proc', [], ($$9 = function() {
          var self = $$9.$$s || this;
          return (function(self) {
            return eval(compiled);
          })(self);
        }, $$9.$$s = self, $$9.$$arity = 0, $$9));
      } else if($truthy(args['$any?']())) {
        $$$('::', 'Kernel').$raise($$$('::', 'ArgumentError'), "" + "wrong number of arguments (" + (args.$size()) + " for 0)");
      }
      ;
      var old = block.$$s, result;
      block.$$s = null;
      if(self.$$is_a_module) {
        self.$$eval = true;
        try {
          result = block.call(self, self);
        } finally {
          self.$$eval = false;
        }
      } else {
        result = block.call(self, self);
      }
      block.$$s = old;
      return result;
      ;
    }, $BasicObject_instance_eval$8.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$instance_exec */0;
    Opal.def(self, '$singleton_method_added', $BasicObject_singleton_method_added$11 = function $$singleton_method_added($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $BasicObject_singleton_method_added$11.$$arity = -1);
    Opal.def(self, '$singleton_method_removed', $BasicObject_singleton_method_removed$12 = function $$singleton_method_removed($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $BasicObject_singleton_method_removed$12.$$arity = -1);
    Opal.def(self, '$singleton_method_undefined', $BasicObject_singleton_method_undefined$13 = function $$singleton_method_undefined($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return nil;
    }, $BasicObject_singleton_method_undefined$13.$$arity = -1);
    Opal.def(self, '$class', $BasicObject_class$14 = function() {
      var self = this;
      return self.$$class;
    }, $BasicObject_class$14.$$arity = 0);
    return (Opal.def(self, '$method_missing', $BasicObject_method_missing$15 = function $$method_missing(symbol, $a) {
      var $iter = $BasicObject_method_missing$15.$$p, block = $iter || nil, $post_args, args, self = this, message = nil;
      if($iter) $BasicObject_method_missing$15.$$p = null;
      if($iter) $BasicObject_method_missing$15.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      message = (function() {
        if($truthy(self.$inspect && !self.$inspect.$$stub)) {
          return "" + "undefined method `" + (symbol) + "' for " + (self.$inspect()) + ":" + (self.$$class);
        } else {
          return "" + "undefined method `" + (symbol) + "' for " + (self.$$class);
        }
        ;
        return nil;
      })();
      return $$$('::', 'Kernel').$raise($$$('::', 'NoMethodError').$new(message, symbol));
    }, $BasicObject_method_missing$15.$$arity = -2), nil) && 'method_missing';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/kernel"] = function(Opal) {
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $gvars = Opal.gvars, $hash2 = Opal.hash2, $send = Opal.send, $klass = Opal.klass;
  /* destroyed: CollapseStubs */0;
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_method_missing$1, $Kernel_$eq_tilde$2, $Kernel_$excl_tilde$3, $Kernel_$eq_eq_eq$4, $Kernel_$lt_eq_gt$5, $Kernel_method$6, $Kernel_methods$7, $Kernel_public_methods$8, $Kernel_Array$9, $Kernel_at_exit$10, $Kernel_caller$11, $Kernel_class$12, $Kernel_copy_instance_variables$13, $Kernel_copy_singleton_methods$14, $Kernel_clone$15, $Kernel_initialize_clone$16, $Kernel_define_singleton_method$17, $Kernel_dup$18, $Kernel_initialize_dup$19, $Kernel_enum_for$20, $Kernel_equal$ques$21, $Kernel_exit$22, $Kernel_extend$23, $Kernel_hash$24, $Kernel_initialize_copy$25, $Kernel_inspect$26, $Kernel_instance_of$ques$27, $Kernel_instance_variable_defined$ques$28, $Kernel_instance_variable_get$29, $Kernel_instance_variable_set$30, $Kernel_remove_instance_variable$31, $Kernel_instance_variables$32, $Kernel_Integer$33, $Kernel_Float$34, $Kernel_Hash$35, $Kernel_is_a$ques$36, $Kernel_itself$37, $Kernel_lambda$38, $Kernel_load$39, $Kernel_loop$40, $Kernel_nil$ques$42, $Kernel_printf$43, $Kernel_proc$44, $Kernel_puts$45, $Kernel_p$46, $Kernel_print$48, $Kernel_warn$49, $Kernel_raise$50, $Kernel_rand$51, $Kernel_respond_to$ques$52, $Kernel_respond_to_missing$ques$53, $Kernel_require$54, $Kernel_require_relative$55, $Kernel_require_tree$56, $Kernel_singleton_class$57, $Kernel_sleep$58, $Kernel_srand$59, $Kernel_String$60, $Kernel_tap$61, $Kernel_to_proc$62, $Kernel_to_s$63, $Kernel_catch$64, $Kernel_throw$65, $Kernel_open$66, $Kernel_yield_self$67;
    Opal.def(self, '$method_missing', $Kernel_method_missing$1 = function $$method_missing(symbol, $a) {
      var $iter = $Kernel_method_missing$1.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Kernel_method_missing$1.$$p = null;
      if($iter) $Kernel_method_missing$1.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      return self.$raise($$($nesting, 'NoMethodError').$new("" + "undefined method `" + (symbol) + "' for " + (self.$inspect()), symbol, args));
    }, $Kernel_method_missing$1.$$arity = -2);
    Opal.def(self, '$=~', $Kernel_$eq_tilde$2 = function(obj) {
      var self = this;
      return false;
    }, $Kernel_$eq_tilde$2.$$arity = 1);
    Opal.def(self, '$!~', $Kernel_$excl_tilde$3 = function(obj) {
      var self = this;
      return self['$=~'](obj)['$!']();
    }, $Kernel_$excl_tilde$3.$$arity = 1);
    Opal.def(self, '$===', $Kernel_$eq_eq_eq$4 = function(other) {
      var $a, self = this;
      return ($truthy($a = self.$object_id()['$=='](other.$object_id())) ? $a : self['$=='](other));
    }, $Kernel_$eq_eq_eq$4.$$arity = 1);
    Opal.def(self, '$<=>', $Kernel_$lt_eq_gt$5 = function(other) {
      var self = this;
      self.$$comparable = true;
      var x = self['$=='](other);
      if(x && x !== nil) {
        return 0;
      }
      return nil;
    }, $Kernel_$lt_eq_gt$5.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$method */0;
    /* destroyed: TreeShaking#shake_methods/$methods */0;
    /* destroyed: TreeShaking#shake_methods/$public_methods */0;
    Opal.def(self, '$Array', $Kernel_Array$9 = function $$Array(object) {
      var self = this;
      var coerced;
      if(object === nil) {
        return [];
      }
      if(object.$$is_array) {
        return object;
      }
      coerced = $$($nesting, 'Opal')['$coerce_to?'](object, $$($nesting, 'Array'), "to_ary");
      if(coerced !== nil) {
        return coerced;
      }
      coerced = $$($nesting, 'Opal')['$coerce_to?'](object, $$($nesting, 'Array'), "to_a");
      if(coerced !== nil) {
        return coerced;
      }
      return [object];
    }, $Kernel_Array$9.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$at_exit */0;
    /* destroyed: TreeShaking#shake_methods/$caller */0;
    Opal.def(self, '$class', $Kernel_class$12 = function() {
      var self = this;
      return self.$$class;
    }, $Kernel_class$12.$$arity = 0);
    Opal.def(self, '$copy_instance_variables', $Kernel_copy_instance_variables$13 = function $$copy_instance_variables(other) {
      var self = this;
      var keys = Object.keys(other), i, ii, name;
      for(i = 0, ii = keys.length; i < ii; i++) {
        name = keys[i];
        if(name.charAt(0) !== '$' && other.hasOwnProperty(name)) {
          self[name] = other[name];
        }
      }
    }, $Kernel_copy_instance_variables$13.$$arity = 1);
    Opal.def(self, '$copy_singleton_methods', $Kernel_copy_singleton_methods$14 = function $$copy_singleton_methods(other) {
      var self = this;
      var i, name, names, length;
      if(other.hasOwnProperty('$$meta')) {
        var other_singleton_class = Opal.get_singleton_class(other);
        var self_singleton_class = Opal.get_singleton_class(self);
        names = Object.getOwnPropertyNames(other_singleton_class.$$prototype);
        for(i = 0, length = names.length; i < length; i++) {
          name = names[i];
          if(Opal.is_method(name)) {
            self_singleton_class.$$prototype[name] = other_singleton_class.$$prototype[name];
          }
        }
        self_singleton_class.$$const = Object.assign({ }, other_singleton_class.$$const);
        Object.setPrototypeOf(self_singleton_class.$$prototype, Object.getPrototypeOf(other_singleton_class.$$prototype));
      }
      for(i = 0, names = Object.getOwnPropertyNames(other), length = names.length; i < length; i++) {
        name = names[i];
        if(name.charAt(0) === '$' && name.charAt(1) !== '$' && other.hasOwnProperty(name)) {
          self[name] = other[name];
        }
      }
    }, $Kernel_copy_singleton_methods$14.$$arity = 1);
    Opal.def(self, '$clone', $Kernel_clone$15 = function $$clone($kwargs) {
      var freeze, self = this, copy = nil;
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      freeze = $kwargs.$$smap["freeze"];
      if(freeze == null) {
        freeze = true;
      }
      ;
      copy = self.$class().$allocate();
      copy.$copy_instance_variables(self);
      copy.$copy_singleton_methods(self);
      copy.$initialize_clone(self);
      return copy;
    }, $Kernel_clone$15.$$arity = -1);
    Opal.def(self, '$initialize_clone', $Kernel_initialize_clone$16 = function $$initialize_clone(other) {
      var self = this;
      return self.$initialize_copy(other);
    }, $Kernel_initialize_clone$16.$$arity = 1);
    Opal.def(self, '$define_singleton_method', $Kernel_define_singleton_method$17 = function $$define_singleton_method(name, method) {
      var $iter = $Kernel_define_singleton_method$17.$$p, block = $iter || nil, self = this;
      if($iter) $Kernel_define_singleton_method$17.$$p = null;
      if($iter) $Kernel_define_singleton_method$17.$$p = null;
      ;
      ;
      return $send(self.$singleton_class(), 'define_method', [name, method], block.$to_proc());
    }, $Kernel_define_singleton_method$17.$$arity = -2);
    Opal.def(self, '$dup', $Kernel_dup$18 = function $$dup() {
      var self = this, copy = nil;
      copy = self.$class().$allocate();
      copy.$copy_instance_variables(self);
      copy.$initialize_dup(self);
      return copy;
    }, $Kernel_dup$18.$$arity = 0);
    Opal.def(self, '$initialize_dup', $Kernel_initialize_dup$19 = function $$initialize_dup(other) {
      var self = this;
      return self.$initialize_copy(other);
    }, $Kernel_initialize_dup$19.$$arity = 1);
    Opal.def(self, '$enum_for', $Kernel_enum_for$20 = function $$enum_for($a, $b) {
      var $iter = $Kernel_enum_for$20.$$p, block = $iter || nil, $post_args, method, args, self = this;
      if($iter) $Kernel_enum_for$20.$$p = null;
      if($iter) $Kernel_enum_for$20.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      if($post_args.length > 0) {
        method = $post_args[0];
        $post_args.splice(0, 1);
      }
      if(method == null) {
        method = "each";
      }
      ;
      args = $post_args;
      ;
      return $send($$($nesting, 'Enumerator'), 'for', [self, method].concat(Opal.to_a(args)), block.$to_proc());
    }, $Kernel_enum_for$20.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$to_enum */0;
    Opal.def(self, '$equal?', $Kernel_equal$ques$21 = function(other) {
      var self = this;
      return self === other;
    }, $Kernel_equal$ques$21.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$exit */0;
    Opal.def(self, '$extend', $Kernel_extend$23 = function $$extend($a) {
      var $post_args, mods, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      mods = $post_args;
      ;
      var singleton = self.$singleton_class();
      for(var i = mods.length - 1; i >= 0; i--) {
        var mod = mods[i];
        if(!mod.$$is_module) {
          self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + ((mod).$class()) + " (expected Module)");
        }
        (mod).$append_features(singleton);
        (mod).$extend_object(self);
        (mod).$extended(self);
      }
      ;
      return self;
    }, $Kernel_extend$23.$$arity = -1);
    Opal.def(self, '$hash', $Kernel_hash$24 = function $$hash() {
      var self = this;
      return self.$__id__();
    }, $Kernel_hash$24.$$arity = 0);
    Opal.def(self, '$initialize_copy', $Kernel_initialize_copy$25 = function $$initialize_copy(other) {
      var self = this;
      return nil;
    }, $Kernel_initialize_copy$25.$$arity = 1);
    Opal.def(self, '$inspect', $Kernel_inspect$26 = function $$inspect() {
      var self = this;
      return self.$to_s();
    }, $Kernel_inspect$26.$$arity = 0);
    Opal.def(self, '$instance_of?', $Kernel_instance_of$ques$27 = function(klass) {
      var self = this;
      if(!klass.$$is_class && !klass.$$is_module) {
        self.$raise($$($nesting, 'TypeError'), "class or module required");
      }
      return self.$$class === klass;
    }, $Kernel_instance_of$ques$27.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$instance_variable_defined? */0;
    /* destroyed: TreeShaking#shake_methods/$instance_variable_get */0;
    /* destroyed: TreeShaking#shake_methods/$instance_variable_set */0;
    /* destroyed: TreeShaking#shake_methods/$remove_instance_variable */0;
    /* destroyed: TreeShaking#shake_methods/$instance_variables */0;
    Opal.def(self, '$Integer', $Kernel_Integer$33 = function $$Integer(value, base) {
      var self = this;
      ;
      var i, str, base_digits;
      if(!value.$$is_string) {
        if(base !== undefined) {
          self.$raise($$($nesting, 'ArgumentError'), "base specified for non string value");
        }
        if(value === nil) {
          self.$raise($$($nesting, 'TypeError'), "can't convert nil into Integer");
        }
        if(value.$$is_number) {
          if(value === Infinity || value === -Infinity || isNaN(value)) {
            self.$raise($$($nesting, 'FloatDomainError'), value);
          }
          return Math.floor(value);
        }
        if(value['$respond_to?']("to_int")) {
          i = value.$to_int();
          if(i !== nil) {
            return i;
          }
        }
        return $$($nesting, 'Opal')['$coerce_to!'](value, $$($nesting, 'Integer'), "to_i");
      }
      if(value === "0") {
        return 0;
      }
      if(base === undefined) {
        base = 0;
      } else {
        base = $$($nesting, 'Opal').$coerce_to(base, $$($nesting, 'Integer'), "to_int");
        if(base === 1 || base < 0 || base > 36) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "invalid radix " + (base));
        }
      }
      str = value.toLowerCase();
      str = str.replace(/(\d)_(?=\d)/g, '$1');
      str = str.replace(/^(\s*[+-]?)(0[bodx]?)/, function(_, head, flag) {
        switch(flag) {
          case '0b':
            if(base === 0 || base === 2) {
              base = 2;
              return head;
            }
          case '0':

          case '0o':
            if(base === 0 || base === 8) {
              base = 8;
              return head;
            }
          case '0d':
            if(base === 0 || base === 10) {
              base = 10;
              return head;
            }
          case '0x':
            if(base === 0 || base === 16) {
              base = 16;
              return head;
            }
        }
        self.$raise($$($nesting, 'ArgumentError'), "" + "invalid value for Integer(): \"" + (value) + "\"");
      });
      base = (base === 0 ? 10 : base);
      base_digits = '0-' + (base <= 10 ? base - 1 : '9a-' + String.fromCharCode(97 + (base - 11)));
      if(!(new RegExp('^\\s*[+-]?[' + base_digits + ']+\\s*$')).test(str)) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "invalid value for Integer(): \"" + (value) + "\"");
      }
      i = parseInt(str, base);
      if(isNaN(i)) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "invalid value for Integer(): \"" + (value) + "\"");
      }
      return i;
      ;
    }, $Kernel_Integer$33.$$arity = -2);
    Opal.def(self, '$Float', $Kernel_Float$34 = function $$Float(value) {
      var self = this;
      var str;
      if(value === nil) {
        self.$raise($$($nesting, 'TypeError'), "can't convert nil into Float");
      }
      if(value.$$is_string) {
        str = value.toString();
        str = str.replace(/(\d)_(?=\d)/g, '$1');
        if(/^\s*[-+]?0[xX][0-9a-fA-F]+\s*$/.test(str)) {
          return self.$Integer(str);
        }
        if(!/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/.test(str)) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "invalid value for Float(): \"" + (value) + "\"");
        }
        return parseFloat(str);
      }
      return $$($nesting, 'Opal')['$coerce_to!'](value, $$($nesting, 'Float'), "to_f");
    }, $Kernel_Float$34.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$Hash */0;
    Opal.def(self, '$is_a?', $Kernel_is_a$ques$36 = function(klass) {
      var self = this;
      if(!klass.$$is_class && !klass.$$is_module) {
        self.$raise($$($nesting, 'TypeError'), "class or module required");
      }
      return Opal.is_a(self, klass);
    }, $Kernel_is_a$ques$36.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$itself */0;
    Opal.alias(self, "kind_of?", "is_a?");
    /* destroyed: TreeShaking#shake_methods/$lambda */0;
    Opal.def(self, '$load', $Kernel_load$39 = function $$load(file) {
      var self = this;
      file = $$($nesting, 'Opal')['$coerce_to!'](file, $$($nesting, 'String'), "to_str");
      return Opal.load(file);
    }, $Kernel_load$39.$$arity = 1);
    Opal.def(self, '$loop', $Kernel_loop$40 = function $$loop() {
      var $$41, $a, $iter = $Kernel_loop$40.$$p, $yield = $iter || nil, self = this, e = nil;
      if($iter) $Kernel_loop$40.$$p = null;
      if(($yield !== nil)) {

      } else {
        return $send(self, 'enum_for', ["loop"], ($$41 = function() {
          var self = $$41.$$s || this;
          return $$$($$($nesting, 'Float'), 'INFINITY');
        }, $$41.$$s = self, $$41.$$arity = 0, $$41));
      }
      ;
      while($truthy(true)) {
        try {
          Opal.yieldX($yield, []);
        } catch($err) {
          if(Opal.rescue($err, [$$($nesting, 'StopIteration')])) {
            e = $err;
            try {
              return e.$result();
            } finally {
              Opal.pop_exception();
            }
          } else {
            throw $err;
          }
        }
        ;
      }
      ;
      return self;
    }, $Kernel_loop$40.$$arity = 0);
    Opal.def(self, '$nil?', $Kernel_nil$ques$42 = function() {
      var self = this;
      return false;
    }, $Kernel_nil$ques$42.$$arity = 0);
    Opal.alias(self, "object_id", "__id__");
    /* destroyed: TreeShaking#shake_methods/$printf */0;
    Opal.def(self, '$proc', $Kernel_proc$44 = function $$proc() {
      var $iter = $Kernel_proc$44.$$p, block = $iter || nil, self = this;
      if($iter) $Kernel_proc$44.$$p = null;
      if($iter) $Kernel_proc$44.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        self.$raise($$($nesting, 'ArgumentError'), "tried to create Proc object without a block");
      }
      ;
      block.$$is_lambda = false;
      return block;
    }, $Kernel_proc$44.$$arity = 0);
    Opal.def(self, '$puts', $Kernel_puts$45 = function $$puts($a) {
      var $post_args, strs, self = this;
      if($gvars.stdout == null) $gvars.stdout = nil;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      strs = $post_args;
      ;
      return $send($gvars.stdout, 'puts', Opal.to_a(strs));
    }, $Kernel_puts$45.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$p */0;
    Opal.def(self, '$print', $Kernel_print$48 = function $$print($a) {
      var $post_args, strs, self = this;
      if($gvars.stdout == null) $gvars.stdout = nil;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      strs = $post_args;
      ;
      return $send($gvars.stdout, 'print', Opal.to_a(strs));
    }, $Kernel_print$48.$$arity = -1);
    Opal.def(self, '$warn', $Kernel_warn$49 = function $$warn($a) {
      var $post_args, strs, $b, self = this;
      if($gvars.VERBOSE == null) $gvars.VERBOSE = nil;
      if($gvars.stderr == null) $gvars.stderr = nil;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      strs = $post_args;
      ;
      if($truthy(($truthy($b = $gvars.VERBOSE['$nil?']()) ? $b : strs['$empty?']()))) {
        return nil;
      } else {
        return $send($gvars.stderr, 'puts', Opal.to_a(strs));
      }
      ;
    }, $Kernel_warn$49.$$arity = -1);
    Opal.def(self, '$raise', $Kernel_raise$50 = function $$raise(exception, string, _backtrace) {
      var self = this;
      if($gvars["!"] == null) $gvars["!"] = nil;
      ;
      if(string == null) {
        string = nil;
      }
      ;
      if(_backtrace == null) {
        _backtrace = nil;
      }
      ;
      if(exception == null && $gvars["!"] !== nil) {
        throw $gvars["!"];
      }
      if(exception == null) {
        exception = $$($nesting, 'RuntimeError').$new();
      } else if(exception.$$is_string) {
        exception = $$($nesting, 'RuntimeError').$new(exception);
      } else if(exception.$$is_class && exception['$respond_to?']("exception")) {
        exception = exception.$exception(string);
      } else if(exception['$is_a?']($$($nesting, 'Exception'))) {

      } else {
        exception = $$($nesting, 'TypeError').$new("exception class/object expected");
      }
      if($gvars["!"] !== nil) {
        Opal.exceptions.push($gvars["!"]);
      }
      $gvars["!"] = exception;
      throw exception;
      ;
    }, $Kernel_raise$50.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$fail */0;
    Opal.def(self, '$rand', $Kernel_rand$51 = function $$rand(max) {
      var self = this;
      ;
      if(max === undefined) {
        return $$$($$($nesting, 'Random'), 'DEFAULT').$rand();
      }
      if(max.$$is_number) {
        if(max < 0) {
          max = Math.abs(max);
        }
        if(max % 1 !== 0) {
          max = max.$to_i();
        }
        if(max === 0) {
          max = undefined;
        }
      }
      ;
      return $$$($$($nesting, 'Random'), 'DEFAULT').$rand(max);
    }, $Kernel_rand$51.$$arity = -1);
    Opal.def(self, '$respond_to?', $Kernel_respond_to$ques$52 = function(name, include_all) {
      var self = this;
      if(include_all == null) {
        include_all = false;
      }
      ;
      if($truthy(self['$respond_to_missing?'](name, include_all))) {
        return true;
      }
      ;
      var body = self['$' + name];
      if(typeof (body) === "function" && !body.$$stub) {
        return true;
      }
      ;
      return false;
    }, $Kernel_respond_to$ques$52.$$arity = -2);
    Opal.def(self, '$respond_to_missing?', $Kernel_respond_to_missing$ques$53 = function(method_name, include_all) {
      var self = this;
      if(include_all == null) {
        include_all = false;
      }
      ;
      return false;
    }, $Kernel_respond_to_missing$ques$53.$$arity = -2);
    Opal.def(self, '$require', $Kernel_require$54 = function $$require(file) {
      var self = this;
      file = $$($nesting, 'Opal')['$coerce_to!'](file, $$($nesting, 'String'), "to_str");
      return Opal.require(file);
    }, $Kernel_require$54.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$require_relative */0;
    /* destroyed: TreeShaking#shake_methods/$require_tree */0;
    Opal.alias(self, "send", "__send__");
    Opal.alias(self, "public_send", "__send__");
    Opal.def(self, '$singleton_class', $Kernel_singleton_class$57 = function $$singleton_class() {
      var self = this;
      return Opal.get_singleton_class(self);
    }, $Kernel_singleton_class$57.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$sleep */0;
    Opal.def(self, '$srand', $Kernel_srand$59 = function $$srand(seed) {
      var self = this;
      if(seed == null) {
        seed = $$($nesting, 'Random').$new_seed();
      }
      ;
      return $$($nesting, 'Random').$srand(seed);
    }, $Kernel_srand$59.$$arity = -1);
    Opal.def(self, '$String', $Kernel_String$60 = function $$String(str) {
      var $a, self = this;
      return ($truthy($a = $$($nesting, 'Opal')['$coerce_to?'](str, $$($nesting, 'String'), "to_str")) ? $a : $$($nesting, 'Opal')['$coerce_to!'](str, $$($nesting, 'String'), "to_s"));
    }, $Kernel_String$60.$$arity = 1);
    Opal.def(self, '$tap', $Kernel_tap$61 = function $$tap() {
      var $iter = $Kernel_tap$61.$$p, block = $iter || nil, self = this;
      if($iter) $Kernel_tap$61.$$p = null;
      if($iter) $Kernel_tap$61.$$p = null;
      ;
      Opal.yield1(block, self);
      return self;
    }, $Kernel_tap$61.$$arity = 0);
    Opal.def(self, '$to_proc', $Kernel_to_proc$62 = function $$to_proc() {
      var self = this;
      return self;
    }, $Kernel_to_proc$62.$$arity = 0);
    Opal.def(self, '$to_s', $Kernel_to_s$63 = function $$to_s() {
      var self = this;
      return "" + "#<" + (self.$class()) + ":0x" + (self.$__id__().$to_s(16)) + ">";
    }, $Kernel_to_s$63.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$catch */0;
    /* destroyed: TreeShaking#shake_methods/$throw */0;
    Opal.def(self, '$open', $Kernel_open$66 = function $$open($a) {
      var $iter = $Kernel_open$66.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Kernel_open$66.$$p = null;
      if($iter) $Kernel_open$66.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      return $send($$($nesting, 'File'), 'open', Opal.to_a(args), block.$to_proc());
    }, $Kernel_open$66.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$yield_self */0;
  })($nesting[0], $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Object');
    var $nesting = [self].concat($parent_nesting);
    return self.$include($$($nesting, 'Kernel'));
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/error"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $module = Opal.module, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Exception');
    var $nesting = [self].concat($parent_nesting), $Exception_new$1, $Exception_exception$2, $Exception_initialize$3, $Exception_backtrace$4, $Exception_exception$5, $Exception_message$6, $Exception_inspect$7, $Exception_set_backtrace$8, $Exception_to_s$9;
    self.$$prototype.message = nil;
    var stack_trace_limit;
    Opal.defs(self, '$new', $Exception_new$1 = function($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      var message = (args.length > 0) ? args[0] : nil;
      var error = new self.$$constructor(message);
      error.name = self.$$name;
      error.message = message;
      Opal.send(error, error.$initialize, args);
      if(Opal.config.enable_stack_trace && Error.captureStackTrace) {
        Error.captureStackTrace(error, stack_trace_limit);
      }
      return error;
      ;
    }, $Exception_new$1.$$arity = -1);
    stack_trace_limit = self.$new;
    Opal.defs(self, '$exception', $Exception_exception$2 = function $$exception($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      return $send(self, 'new', Opal.to_a(args));
    }, $Exception_exception$2.$$arity = -1);
    Opal.def(self, '$initialize', $Exception_initialize$3 = function $$initialize($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      return self.message = (args.length > 0) ? args[0] : nil;
      ;
    }, $Exception_initialize$3.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$backtrace */0;
    Opal.def(self, '$exception', $Exception_exception$5 = function $$exception(str) {
      var self = this;
      if(str == null) {
        str = nil;
      }
      ;
      if(str === nil || self === str) {
        return self;
      }
      var cloned = self.$clone();
      cloned.message = str;
      cloned.stack = self.stack;
      return cloned;
      ;
    }, $Exception_exception$5.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$message */0;
    Opal.def(self, '$inspect', $Exception_inspect$7 = function $$inspect() {
      var self = this, as_str = nil;
      as_str = self.$to_s();
      if($truthy(as_str['$empty?']())) {
        return self.$class().$to_s();
      } else {
        return "" + "#<" + (self.$class().$to_s()) + ": " + (self.$to_s()) + ">";
      }
      ;
    }, $Exception_inspect$7.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$set_backtrace */0;
    return (Opal.def(self, '$to_s', $Exception_to_s$9 = function $$to_s() {
      var $a, $b, self = this;
      return ($truthy($a = ($truthy($b = self.message) ? self.message.$to_s() : $b)) ? $a : self.$class().$to_s());
    }, $Exception_to_s$9.$$arity = 0), nil) && 'to_s';
  })($nesting[0], Error, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'ScriptError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'SyntaxError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'ScriptError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'LoadError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'ScriptError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NotImplementedError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'ScriptError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'SystemExit');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NoMemoryError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'SignalException');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Interrupt');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'SecurityError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'StandardError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'Exception'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'EncodingError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'ZeroDivisionError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NameError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NoMethodError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'NameError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'RuntimeError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'FrozenError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'RuntimeError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'LocalJumpError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'TypeError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'ArgumentError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'IndexError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'StopIteration');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'IndexError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'KeyError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'IndexError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'RangeError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'FloatDomainError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'RangeError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'IOError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'SystemCallError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Errno');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'EINVAL');
      var $nesting = [self].concat($parent_nesting), $EINVAL_new$10;
      return (Opal.defs(self, '$new', $EINVAL_new$10 = function(name) {
        var $iter = $EINVAL_new$10.$$p, $yield = $iter || nil, self = this, message = nil;
        if($iter) $EINVAL_new$10.$$p = null;
        if(name == null) {
          name = nil;
        }
        ;
        message = "Invalid argument";
        if($truthy(name)) {
          message = $rb_plus(message, "" + " - " + (name));
        }
        ;
        return $send(self, Opal.find_super_dispatcher(self, 'new', $EINVAL_new$10, false, self.$$class.$$prototype), [message], null);
      }, $EINVAL_new$10.$$arity = -1), nil) && 'new';
    })($nesting[0], $$($nesting, 'SystemCallError'), $nesting);
  })($nesting[0], $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'UncaughtThrowError');
    var $nesting = [self].concat($parent_nesting), $UncaughtThrowError_initialize$11;
    self.$$prototype.sym = nil;
    self.$attr_reader("sym", "arg");
    return (Opal.def(self, '$initialize', $UncaughtThrowError_initialize$11 = function $$initialize(args) {
      var $iter = $UncaughtThrowError_initialize$11.$$p, $yield = $iter || nil, self = this;
      if($iter) $UncaughtThrowError_initialize$11.$$p = null;
      self.sym = args['$[]'](0);
      if($truthy($rb_gt(args.$length(), 1))) {
        self.arg = args['$[]'](1);
      }
      ;
      return $send(self, Opal.find_super_dispatcher(self, 'initialize', $UncaughtThrowError_initialize$11, false), ["" + "uncaught throw " + (self.sym.$inspect())], null);
    }, $UncaughtThrowError_initialize$11.$$arity = 1), nil) && 'initialize';
  })($nesting[0], $$($nesting, 'ArgumentError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NameError');
    var $nesting = [self].concat($parent_nesting), $NameError_initialize$12;
    self.$attr_reader("name");
    return (Opal.def(self, '$initialize', $NameError_initialize$12 = function $$initialize(message, name) {
      var $iter = $NameError_initialize$12.$$p, $yield = $iter || nil, self = this;
      if($iter) $NameError_initialize$12.$$p = null;
      if(name == null) {
        name = nil;
      }
      ;
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $NameError_initialize$12, false), [message], null);
      return (self.name = name);
    }, $NameError_initialize$12.$$arity = -2), nil) && 'initialize';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NoMethodError');
    var $nesting = [self].concat($parent_nesting), $NoMethodError_initialize$13;
    self.$attr_reader("args");
    return (Opal.def(self, '$initialize', $NoMethodError_initialize$13 = function $$initialize(message, name, args) {
      var $iter = $NoMethodError_initialize$13.$$p, $yield = $iter || nil, self = this;
      if($iter) $NoMethodError_initialize$13.$$p = null;
      if(name == null) {
        name = nil;
      }
      ;
      if(args == null) {
        args = [];
      }
      ;
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $NoMethodError_initialize$13, false), [message, name], null);
      return (self.args = args);
    }, $NoMethodError_initialize$13.$$arity = -2), nil) && 'initialize';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'StopIteration');
    var $nesting = [self].concat($parent_nesting);
    return self.$attr_reader("result");
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'KeyError');
    var $nesting = [self].concat($parent_nesting), $KeyError_initialize$14, $KeyError_receiver$15, $KeyError_key$16;
    self.$$prototype.receiver = self.$$prototype.key = nil;
    Opal.def(self, '$initialize', $KeyError_initialize$14 = function $$initialize(message, $kwargs) {
      var receiver, key, $iter = $KeyError_initialize$14.$$p, $yield = $iter || nil, self = this;
      if($iter) $KeyError_initialize$14.$$p = null;
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      receiver = $kwargs.$$smap["receiver"];
      if(receiver == null) {
        receiver = nil;
      }
      ;
      key = $kwargs.$$smap["key"];
      if(key == null) {
        key = nil;
      }
      ;
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $KeyError_initialize$14, false), [message], null);
      self.receiver = receiver;
      return (self.key = key);
    }, $KeyError_initialize$14.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$receiver */0;
    return (/* destroyed: TreeShaking#shake_methods/$key */0, nil) && 'key';
  })($nesting[0], null, $nesting);
  return (function($base, $parent_nesting) {
    var self = $module($base, 'JS');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Error');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], null, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["corelib/constants"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  Opal.const_set($nesting[0], 'RUBY_PLATFORM', "opal");
  Opal.const_set($nesting[0], 'RUBY_ENGINE', "opal");
  Opal.const_set($nesting[0], 'RUBY_VERSION', "2.5.7");
  Opal.const_set($nesting[0], 'RUBY_ENGINE_VERSION', "1.0.3");
  Opal.const_set($nesting[0], 'RUBY_RELEASE_DATE', "2020-02-01");
  Opal.const_set($nesting[0], 'RUBY_PATCHLEVEL', 0);
  Opal.const_set($nesting[0], 'RUBY_REVISION', 0);
  Opal.const_set($nesting[0], 'RUBY_COPYRIGHT', "opal - Copyright (C) 2013-2020 Adam Beynon and the Opal contributors");
  return Opal.const_set($nesting[0], 'RUBY_DESCRIPTION', "" + "opal " + ($$($nesting, 'RUBY_ENGINE_VERSION')) + " (" + ($$($nesting, 'RUBY_RELEASE_DATE')) + " revision " + ($$($nesting, 'RUBY_REVISION')) + ")");
};
Opal.modules["opal/base"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/runtime");
  self.$require("corelib/helpers");
  self.$require("corelib/module");
  self.$require("corelib/class");
  self.$require("corelib/basic_object");
  self.$require("corelib/kernel");
  self.$require("corelib/error");
  return self.$require("corelib/constants");
};
Opal.modules["corelib/nil"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NilClass');
    var $nesting = [self].concat($parent_nesting), $NilClass_$excl$2, $NilClass_$$3, $NilClass_$$4, $NilClass_$$5, $NilClass_$eq_eq$6, $NilClass_dup$7, $NilClass_clone$8, $NilClass_inspect$9, $NilClass_nil$ques$10, $NilClass_singleton_class$11, $NilClass_to_a$12, $NilClass_to_h$13, $NilClass_to_i$14, $NilClass_to_s$15, $NilClass_to_c$16, $NilClass_rationalize$17, $NilClass_to_r$18, $NilClass_instance_variables$19;
    self.$$prototype.$$meta = self;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$1;
      Opal.def(self, '$allocate', $allocate$1 = function $$allocate() {
        var self = this;
        return self.$raise($$($nesting, 'TypeError'), "" + "allocator undefined for " + (self.$name()));
      }, $allocate$1.$$arity = 0);
      Opal.udef(self, '$' + "new");
      ;
      return nil;
      ;
    })(Opal.get_singleton_class(self), $nesting);
    Opal.def(self, '$!', $NilClass_$excl$2 = function() {
      var self = this;
      return true;
    }, $NilClass_$excl$2.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$& */0;
    Opal.def(self, '$|', $NilClass_$$4 = function(other) {
      var self = this;
      return other !== false && other !== nil;
    }, $NilClass_$$4.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$^ */0;
    Opal.def(self, '$==', $NilClass_$eq_eq$6 = function(other) {
      var self = this;
      return other === nil;
    }, $NilClass_$eq_eq$6.$$arity = 1);
    Opal.def(self, '$dup', $NilClass_dup$7 = function $$dup() {
      var self = this;
      return nil;
    }, $NilClass_dup$7.$$arity = 0);
    Opal.def(self, '$clone', $NilClass_clone$8 = function $$clone($kwargs) {
      var freeze, self = this;
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      freeze = $kwargs.$$smap["freeze"];
      if(freeze == null) {
        freeze = true;
      }
      ;
      return nil;
    }, $NilClass_clone$8.$$arity = -1);
    Opal.def(self, '$inspect', $NilClass_inspect$9 = function $$inspect() {
      var self = this;
      return "nil";
    }, $NilClass_inspect$9.$$arity = 0);
    Opal.def(self, '$nil?', $NilClass_nil$ques$10 = function() {
      var self = this;
      return true;
    }, $NilClass_nil$ques$10.$$arity = 0);
    Opal.def(self, '$singleton_class', $NilClass_singleton_class$11 = function $$singleton_class() {
      var self = this;
      return $$($nesting, 'NilClass');
    }, $NilClass_singleton_class$11.$$arity = 0);
    Opal.def(self, '$to_a', $NilClass_to_a$12 = function $$to_a() {
      var self = this;
      return [];
    }, $NilClass_to_a$12.$$arity = 0);
    Opal.def(self, '$to_h', $NilClass_to_h$13 = function $$to_h() {
      var self = this;
      return Opal.hash();
    }, $NilClass_to_h$13.$$arity = 0);
    Opal.def(self, '$to_i', $NilClass_to_i$14 = function $$to_i() {
      var self = this;
      return 0;
    }, $NilClass_to_i$14.$$arity = 0);
    Opal.alias(self, "to_f", "to_i");
    Opal.def(self, '$to_s', $NilClass_to_s$15 = function $$to_s() {
      var self = this;
      return "";
    }, $NilClass_to_s$15.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$to_c */0;
    Opal.def(self, '$rationalize', $NilClass_rationalize$17 = function $$rationalize($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if($truthy($rb_gt(args.$length(), 1))) {
        self.$raise($$($nesting, 'ArgumentError'));
      }
      ;
      return self.$Rational(0, 1);
    }, $NilClass_rationalize$17.$$arity = -1);
    Opal.def(self, '$to_r', $NilClass_to_r$18 = function $$to_r() {
      var self = this;
      return self.$Rational(0, 1);
    }, $NilClass_to_r$18.$$arity = 0);
    return (/* destroyed: TreeShaking#shake_methods/$instance_variables */0, nil) && 'instance_variables';
  })($nesting[0], null, $nesting);
  return Opal.const_set($nesting[0], 'NIL', nil);
};
Opal.modules["corelib/boolean"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Boolean');
    var $nesting = [self].concat($parent_nesting), $Boolean___id__$2, $Boolean_$excl$3, $Boolean_$$4, $Boolean_$$5, $Boolean_$$6, $Boolean_$eq_eq$7, $Boolean_singleton_class$8, $Boolean_to_s$9, $Boolean_dup$10, $Boolean_clone$11;
    Opal.defineProperty(self.$$prototype, '$$is_boolean', true);
    Opal.defineProperty(self.$$prototype, '$$meta', self);
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$1;
      Opal.def(self, '$allocate', $allocate$1 = function $$allocate() {
        var self = this;
        return self.$raise($$($nesting, 'TypeError'), "" + "allocator undefined for " + (self.$name()));
      }, $allocate$1.$$arity = 0);
      Opal.udef(self, '$' + "new");
      ;
      return nil;
      ;
    })(Opal.get_singleton_class(self), $nesting);
    Opal.def(self, '$__id__', $Boolean___id__$2 = function $$__id__() {
      var self = this;
      return self.valueOf() ? 2 : 0;
    }, $Boolean___id__$2.$$arity = 0);
    Opal.alias(self, "object_id", "__id__");
    Opal.def(self, '$!', $Boolean_$excl$3 = function() {
      var self = this;
      return self != true;
    }, $Boolean_$excl$3.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$& */0;
    Opal.def(self, '$|', $Boolean_$$5 = function(other) {
      var self = this;
      return (self == true) ? true : (other !== false && other !== nil);
    }, $Boolean_$$5.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$^ */0;
    Opal.def(self, '$==', $Boolean_$eq_eq$7 = function(other) {
      var self = this;
      return (self == true) === other.valueOf();
    }, $Boolean_$eq_eq$7.$$arity = 1);
    Opal.alias(self, "equal?", "==");
    Opal.alias(self, "eql?", "==");
    Opal.def(self, '$singleton_class', $Boolean_singleton_class$8 = function $$singleton_class() {
      var self = this;
      return $$($nesting, 'Boolean');
    }, $Boolean_singleton_class$8.$$arity = 0);
    Opal.def(self, '$to_s', $Boolean_to_s$9 = function $$to_s() {
      var self = this;
      return (self == true) ? 'true' : 'false';
    }, $Boolean_to_s$9.$$arity = 0);
    Opal.def(self, '$dup', $Boolean_dup$10 = function $$dup() {
      var self = this;
      return self;
    }, $Boolean_dup$10.$$arity = 0);
    return (Opal.def(self, '$clone', $Boolean_clone$11 = function $$clone($kwargs) {
      var freeze, self = this;
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      freeze = $kwargs.$$smap["freeze"];
      if(freeze == null) {
        freeze = true;
      }
      ;
      return self;
    }, $Boolean_clone$11.$$arity = -1), nil) && 'clone';
  })($nesting[0], Boolean, $nesting);
  Opal.const_set($nesting[0], 'TrueClass', $$($nesting, 'Boolean'));
  Opal.const_set($nesting[0], 'FalseClass', $$($nesting, 'Boolean'));
  Opal.const_set($nesting[0], 'TRUE', true);
  return Opal.const_set($nesting[0], 'FALSE', false);
};
Opal.modules["corelib/comparable"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Comparable');
    var $nesting = [self].concat($parent_nesting), $Comparable_$eq_eq$1, $Comparable_$gt$2, $Comparable_$gt_eq$3, $Comparable_$lt$4, $Comparable_$lt_eq$5, $Comparable_between$ques$6, $Comparable_clamp$7, $case = nil;
        function normalize(what) {
      if(Opal.is_a(what, Opal.Integer)) {
        return what;
      }
      if($rb_gt(what, 0)) {
        return 1;
      }
      if($rb_lt(what, 0)) {
        return -1;
      }
      return 0;
    }
        function fail_comparison(lhs, rhs) {
      var class_name;
      (function() {
        $case = rhs;
        if(nil['$===']($case) || true['$===']($case) || false['$===']($case) || $$($nesting, 'Integer')['$===']($case) || $$($nesting, 'Float')['$===']($case)) {
          return class_name = rhs.$inspect();
        } else {
          return class_name = rhs.$$class;
        }
      })();
      self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + ((lhs).$class()) + " with " + (class_name) + " failed");
    }
    ;
    Opal.def(self, '$==', $Comparable_$eq_eq$1 = function(other) {
      var self = this, cmp = nil;
      if($truthy(self['$equal?'](other))) {
        return true;
      }
      ;
      if(self["$<=>"] == Opal.Kernel["$<=>"]) {
        return false;
      }
      if(self.$$comparable) {
        delete self.$$comparable;
        return false;
      }
      ;
      if($truthy((cmp = self['$<=>'](other)))) {

      } else {
        return false;
      }
      ;
      return normalize(cmp) == 0;
      ;
    }, $Comparable_$eq_eq$1.$$arity = 1);
    Opal.def(self, '$>', $Comparable_$gt$2 = function(other) {
      var self = this, cmp = nil;
      if($truthy((cmp = self['$<=>'](other)))) {

      } else {
        fail_comparison(self, other);
      }
      ;
      return normalize(cmp) > 0;
      ;
    }, $Comparable_$gt$2.$$arity = 1);
    Opal.def(self, '$>=', $Comparable_$gt_eq$3 = function(other) {
      var self = this, cmp = nil;
      if($truthy((cmp = self['$<=>'](other)))) {

      } else {
        fail_comparison(self, other);
      }
      ;
      return normalize(cmp) >= 0;
      ;
    }, $Comparable_$gt_eq$3.$$arity = 1);
    Opal.def(self, '$<', $Comparable_$lt$4 = function(other) {
      var self = this, cmp = nil;
      if($truthy((cmp = self['$<=>'](other)))) {

      } else {
        fail_comparison(self, other);
      }
      ;
      return normalize(cmp) < 0;
      ;
    }, $Comparable_$lt$4.$$arity = 1);
    Opal.def(self, '$<=', $Comparable_$lt_eq$5 = function(other) {
      var self = this, cmp = nil;
      if($truthy((cmp = self['$<=>'](other)))) {

      } else {
        fail_comparison(self, other);
      }
      ;
      return normalize(cmp) <= 0;
      ;
    }, $Comparable_$lt_eq$5.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$between? */0;
    /* destroyed: TreeShaking#shake_methods/$clamp */0;
  })($nesting[0], $nesting);
};
Opal.modules["corelib/regexp"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $gvars = Opal.gvars;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'RegexpError');
    var $nesting = [self].concat($parent_nesting);
    return nil;
  })($nesting[0], $$($nesting, 'StandardError'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Regexp');
    var $nesting = [self].concat($parent_nesting), $Regexp_$eq_eq$6, $Regexp_$eq_eq_eq$7, $Regexp_$eq_tilde$8, $Regexp_inspect$9, $Regexp_match$10, $Regexp_match$ques$11, $Regexp_$$12, $Regexp_source$13, $Regexp_options$14, $Regexp_casefold$ques$15;
    Opal.const_set($nesting[0], 'IGNORECASE', 1);
    Opal.const_set($nesting[0], 'EXTENDED', 2);
    Opal.const_set($nesting[0], 'MULTILINE', 4);
    Opal.defineProperty(self.$$prototype, '$$is_regexp', true);
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$1, $escape$2, $last_match$3, $union$4, $new$5;
      Opal.def(self, '$allocate', $allocate$1 = function $$allocate() {
        var $iter = $allocate$1.$$p, $yield = $iter || nil, self = this, allocated = nil, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
        if($iter) $allocate$1.$$p = null;
        for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
          $zuper[$zuper_i] = arguments[$zuper_i];
        }
        allocated = $send(self, Opal.find_super_dispatcher(self, 'allocate', $allocate$1, false), $zuper, $iter);
        allocated.uninitialized = true;
        return allocated;
      }, $allocate$1.$$arity = 0);
      Opal.def(self, '$escape', $escape$2 = function $$escape(string) {
        var self = this;
        return Opal.escape_regexp(string);
      }, $escape$2.$$arity = 1);
      /* destroyed: TreeShaking#shake_methods/$last_match */0;
      /* destroyed: TreeShaking#shake_methods/$quote */0;
      /* destroyed: TreeShaking#shake_methods/$union */0;
      return (Opal.def(self, '$new', $new$5 = function(regexp, options) {
        var self = this;
        ;
        if(regexp.$$is_regexp) {
          return new RegExp(regexp);
        }
        regexp = $$($nesting, 'Opal')['$coerce_to!'](regexp, $$($nesting, 'String'), "to_str");
        if(regexp.charAt(regexp.length - 1) === '\\' && regexp.charAt(regexp.length - 2) !== '\\') {
          self.$raise($$($nesting, 'RegexpError'), "" + "too short escape sequence: /" + (regexp) + "/");
        }
        if(options === undefined || options['$!']()) {
          return new RegExp(regexp);
        }
        if(options.$$is_number) {
          var temp = '';
          if($$($nesting, 'IGNORECASE') & options) {
            temp += 'i';
          }
          if($$($nesting, 'MULTILINE') & options) {
            temp += 'm';
          }
          options = temp;
        } else {
          options = 'i';
        }
        return new RegExp(regexp, options);
        ;
      }, $new$5.$$arity = -2), nil) && 'new';
    })(Opal.get_singleton_class(self), $nesting);
    Opal.def(self, '$==', $Regexp_$eq_eq$6 = function(other) {
      var self = this;
      return other instanceof RegExp && self.toString() === other.toString();
    }, $Regexp_$eq_eq$6.$$arity = 1);
    Opal.def(self, '$===', $Regexp_$eq_eq_eq$7 = function(string) {
      var self = this;
      return self.$match($$($nesting, 'Opal')['$coerce_to?'](string, $$($nesting, 'String'), "to_str")) !== nil;
    }, $Regexp_$eq_eq_eq$7.$$arity = 1);
    Opal.def(self, '$=~', $Regexp_$eq_tilde$8 = function(string) {
      var $a, self = this;
      if($gvars["~"] == null) $gvars["~"] = nil;
      return ($truthy($a = self.$match(string)) ? $gvars["~"].$begin(0) : $a);
    }, $Regexp_$eq_tilde$8.$$arity = 1);
    Opal.alias(self, "eql?", "==");
    Opal.def(self, '$inspect', $Regexp_inspect$9 = function $$inspect() {
      var self = this;
      var regexp_format = /^\/(.*)\/([^\/]*)$/;
      var value = self.toString();
      var matches = regexp_format.exec(value);
      if(matches) {
        var regexp_pattern = matches[1];
        var regexp_flags = matches[2];
        var chars = regexp_pattern.split('');
        var chars_length = chars.length;
        var char_escaped = false;
        var regexp_pattern_escaped = '';
        for(var i = 0; i < chars_length; i++) {
          var current_char = chars[i];
          if(!char_escaped && current_char == '/') {
            regexp_pattern_escaped = regexp_pattern_escaped.concat('\\');
          }
          regexp_pattern_escaped = regexp_pattern_escaped.concat(current_char);
          if(current_char == '\\') {
            if(char_escaped) {
              char_escaped = false;
            } else {
              char_escaped = true;
            }
          } else {
            char_escaped = false;
          }
        }
        return '/' + regexp_pattern_escaped + '/' + regexp_flags;
      } else {
        return value;
      }
    }, $Regexp_inspect$9.$$arity = 0);
    Opal.def(self, '$match', $Regexp_match$10 = function $$match(string, pos) {
      var $iter = $Regexp_match$10.$$p, block = $iter || nil, self = this;
      if($gvars["~"] == null) $gvars["~"] = nil;
      if($iter) $Regexp_match$10.$$p = null;
      if($iter) $Regexp_match$10.$$p = null;
      ;
      ;
      if(self.uninitialized) {
        self.$raise($$($nesting, 'TypeError'), "uninitialized Regexp");
      }
      if(pos === undefined) {
        if(string === nil) return ($gvars["~"] = nil);
        var m = self.exec($$($nesting, 'Opal').$coerce_to(string, $$($nesting, 'String'), "to_str"));
        if(m) {
          ($gvars["~"] = $$($nesting, 'MatchData').$new(self, m));
          return block === nil ? $gvars["~"] : Opal.yield1(block, $gvars["~"]);
        } else {
          return ($gvars["~"] = nil);
        }
      }
      pos = $$($nesting, 'Opal').$coerce_to(pos, $$($nesting, 'Integer'), "to_int");
      if(string === nil) {
        return ($gvars["~"] = nil);
      }
      string = $$($nesting, 'Opal').$coerce_to(string, $$($nesting, 'String'), "to_str");
      if(pos < 0) {
        pos += string.length;
        if(pos < 0) {
          return ($gvars["~"] = nil);
        }
      }
      var md, re = Opal.global_regexp(self);
      while(true) {
        md = re.exec(string);
        if(md === null) {
          return ($gvars["~"] = nil);
        }
        if(md.index >= pos) {
          ($gvars["~"] = $$($nesting, 'MatchData').$new(re, md));
          return block === nil ? $gvars["~"] : Opal.yield1(block, $gvars["~"]);
        }
        re.lastIndex = md.index + 1;
      }
      ;
    }, $Regexp_match$10.$$arity = -2);
    Opal.def(self, '$match?', $Regexp_match$ques$11 = function(string, pos) {
      var self = this;
      ;
      if(self.uninitialized) {
        self.$raise($$($nesting, 'TypeError'), "uninitialized Regexp");
      }
      if(pos === undefined) {
        return string === nil ? false : self.test($$($nesting, 'Opal').$coerce_to(string, $$($nesting, 'String'), "to_str"));
      }
      pos = $$($nesting, 'Opal').$coerce_to(pos, $$($nesting, 'Integer'), "to_int");
      if(string === nil) {
        return false;
      }
      string = $$($nesting, 'Opal').$coerce_to(string, $$($nesting, 'String'), "to_str");
      if(pos < 0) {
        pos += string.length;
        if(pos < 0) {
          return false;
        }
      }
      var md, re = Opal.global_regexp(self);
      md = re.exec(string);
      if(md === null || md.index < pos) {
        return false;
      } else {
        return true;
      }
      ;
    }, $Regexp_match$ques$11.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$~ */0;
    Opal.def(self, '$source', $Regexp_source$13 = function $$source() {
      var self = this;
      return self.source;
    }, $Regexp_source$13.$$arity = 0);
    Opal.def(self, '$options', $Regexp_options$14 = function $$options() {
      var self = this;
      if(self.uninitialized) {
        self.$raise($$($nesting, 'TypeError'), "uninitialized Regexp");
      }
      var result = 0;
      if(self.multiline) {
        result |= $$($nesting, 'MULTILINE');
      }
      if(self.ignoreCase) {
        result |= $$($nesting, 'IGNORECASE');
      }
      return result;
    }, $Regexp_options$14.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$casefold? */0;
    return Opal.alias(self, "to_s", "source");
  })($nesting[0], RegExp, $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'MatchData');
    var $nesting = [self].concat($parent_nesting), $MatchData_initialize$16, $MatchData_$$$17, $MatchData_offset$18, $MatchData_$eq_eq$19, $MatchData_begin$20, $MatchData_end$21, $MatchData_captures$22, $MatchData_inspect$23, $MatchData_length$24, $MatchData_to_a$25, $MatchData_to_s$26, $MatchData_values_at$27;
    self.$$prototype.matches = nil;
    self.$attr_reader("post_match", "pre_match", "regexp", "string");
    Opal.def(self, '$initialize', $MatchData_initialize$16 = function $$initialize(regexp, match_groups) {
      var self = this;
      $gvars["~"] = self;
      self.regexp = regexp;
      self.begin = match_groups.index;
      self.string = match_groups.input;
      self.pre_match = match_groups.input.slice(0, match_groups.index);
      self.post_match = match_groups.input.slice(match_groups.index + match_groups[0].length);
      self.matches = [];
      for(var i = 0, length = match_groups.length; i < length; i++) {
        var group = match_groups[i];
        if(group == null) {
          self.matches.push(nil);
        } else {
          self.matches.push(group);
        }
      }
      ;
    }, $MatchData_initialize$16.$$arity = 2);
    Opal.def(self, '$[]', $MatchData_$$$17 = function($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      return $send(self.matches, '[]', Opal.to_a(args));
    }, $MatchData_$$$17.$$arity = -1);
    Opal.def(self, '$offset', $MatchData_offset$18 = function $$offset(n) {
      var self = this;
      if(n !== 0) {
        self.$raise($$($nesting, 'ArgumentError'), "MatchData#offset only supports 0th element");
      }
      return [self.begin, self.begin + self.matches[n].length];
    }, $MatchData_offset$18.$$arity = 1);
    Opal.def(self, '$==', $MatchData_$eq_eq$19 = function(other) {
      var $a, $b, $c, $d, self = this;
      if($truthy($$($nesting, 'MatchData')['$==='](other))) {

      } else {
        return false;
      }
      ;
      return ($truthy($a = ($truthy($b = ($truthy($c = ($truthy($d = self.string == other.string) ? self.regexp.toString() == other.regexp.toString() : $d)) ? self.pre_match == other.pre_match : $c)) ? self.post_match == other.post_match : $b)) ? self.begin == other.begin : $a);
    }, $MatchData_$eq_eq$19.$$arity = 1);
    Opal.alias(self, "eql?", "==");
    Opal.def(self, '$begin', $MatchData_begin$20 = function $$begin(n) {
      var self = this;
      if(n !== 0) {
        self.$raise($$($nesting, 'ArgumentError'), "MatchData#begin only supports 0th element");
      }
      return self.begin;
    }, $MatchData_begin$20.$$arity = 1);
    Opal.def(self, '$end', $MatchData_end$21 = function $$end(n) {
      var self = this;
      if(n !== 0) {
        self.$raise($$($nesting, 'ArgumentError'), "MatchData#end only supports 0th element");
      }
      return self.begin + self.matches[n].length;
    }, $MatchData_end$21.$$arity = 1);
    Opal.def(self, '$captures', $MatchData_captures$22 = function $$captures() {
      var self = this;
      return self.matches.slice(1);
    }, $MatchData_captures$22.$$arity = 0);
    Opal.def(self, '$inspect', $MatchData_inspect$23 = function $$inspect() {
      var self = this;
      var str = "#<MatchData " + (self.matches[0]).$inspect();
      for(var i = 1, length = self.matches.length; i < length; i++) {
        str += " " + i + ":" + (self.matches[i]).$inspect();
      }
      return str + ">";
    }, $MatchData_inspect$23.$$arity = 0);
    Opal.def(self, '$length', $MatchData_length$24 = function $$length() {
      var self = this;
      return self.matches.length;
    }, $MatchData_length$24.$$arity = 0);
    Opal.alias(self, "size", "length");
    Opal.def(self, '$to_a', $MatchData_to_a$25 = function $$to_a() {
      var self = this;
      return self.matches;
    }, $MatchData_to_a$25.$$arity = 0);
    Opal.def(self, '$to_s', $MatchData_to_s$26 = function $$to_s() {
      var self = this;
      return self.matches[0];
    }, $MatchData_to_s$26.$$arity = 0);
    return (/* destroyed: TreeShaking#shake_methods/$values_at */0, nil) && 'values_at';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/string"] = function(Opal) {
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $gvars = Opal.gvars;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/comparable");
  self.$require("corelib/regexp");
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String___id__$1, $String_try_convert$2, $String_new$3, $String_initialize$4, $String_$percent$5, $String_$$6, $String_$plus$7, $String_$lt_eq_gt$8, $String_$eq_eq$9, $String_$eq_tilde$10, $String_$$$11, $String_b$12, $String_capitalize$13, $String_casecmp$14, $String_casecmp$ques$15, $String_center$16, $String_chars$17, $String_chomp$18, $String_chop$19, $String_chr$20, $String_clone$21, $String_dup$22, $String_count$23, $String_delete$24, $String_delete_prefix$25, $String_delete_suffix$26, $String_downcase$27, $String_each_char$28, $String_each_line$30, $String_empty$ques$31, $String_end_with$ques$32, $String_gsub$33, $String_hash$34, $String_hex$35, $String_include$ques$36, $String_index$37, $String_inspect$38, $String_intern$39, $String_lines$40, $String_length$41, $String_ljust$42, $String_lstrip$43, $String_ascii_only$ques$44, $String_match$45, $String_match$ques$46, $String_next$47, $String_oct$48, $String_ord$49, $String_partition$50, $String_reverse$51, $String_rindex$52, $String_rjust$53, $String_rpartition$54, $String_rstrip$55, $String_scan$56, $String_split$57, $String_squeeze$58, $String_start_with$ques$59, $String_strip$60, $String_sub$61, $String_sum$62, $String_swapcase$63, $String_to_f$64, $String_to_i$65, $String_to_proc$66, $String_to_s$68, $String_tr$69, $String_tr_s$70, $String_upcase$71, $String_upto$72, $String_instance_variables$73, $String__load$74, $String_unicode_normalize$75, $String_unicode_normalized$ques$76, $String_unpack$77, $String_unpack1$78;
    self.$include($$($nesting, 'Comparable'));
    Opal.defineProperty(self.$$prototype, '$$is_string', true);
    Opal.defineProperty(self.$$prototype, '$$cast', function(string) {
      var klass = this.$$class;
      if(klass.$$constructor === String) {
        return string;
      } else {
        return new klass.$$constructor(string);
      }
    });
    ;
    Opal.def(self, '$__id__', $String___id__$1 = function $$__id__() {
      var self = this;
      return self.toString();
    }, $String___id__$1.$$arity = 0);
    Opal.alias(self, "object_id", "__id__");
    Opal.defs(self, '$try_convert', $String_try_convert$2 = function $$try_convert(what) {
      var self = this;
      return $$($nesting, 'Opal')['$coerce_to?'](what, $$($nesting, 'String'), "to_str");
    }, $String_try_convert$2.$$arity = 1);
    Opal.defs(self, '$new', $String_new$3 = function(str) {
      var self = this;
      if(str == null) {
        str = "";
      }
      ;
      str = $$($nesting, 'Opal').$coerce_to(str, $$($nesting, 'String'), "to_str");
      return new self.$$constructor(str);
      ;
    }, $String_new$3.$$arity = -1);
    Opal.def(self, '$initialize', $String_initialize$4 = function $$initialize(str) {
      var self = this;
      ;
      if(str === undefined) {
        return self;
      }
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), "Mutable strings are not supported in Opal.");
    }, $String_initialize$4.$$arity = -1);
    Opal.def(self, '$%', $String_$percent$5 = function(data) {
      var self = this;
      if($truthy($$($nesting, 'Array')['$==='](data))) {
        return $send(self, 'format', [self].concat(Opal.to_a(data)));
      } else {
        return self.$format(self, data);
      }
    }, $String_$percent$5.$$arity = 1);
    Opal.def(self, '$*', $String_$$6 = function(count) {
      var self = this;
      count = $$($nesting, 'Opal').$coerce_to(count, $$($nesting, 'Integer'), "to_int");
      if(count < 0) {
        self.$raise($$($nesting, 'ArgumentError'), "negative argument");
      }
      if(count === 0) {
        return self.$$cast('');
      }
      var result = '', string = self.toString();
      if(string.length * count >= 1 << 28) {
        self.$raise($$($nesting, 'RangeError'), "multiply count must not overflow maximum string size");
      }
      for(; ; ) {
        if((count & 1) === 1) {
          result += string;
        }
        count >>>= 1;
        if(count === 0) {
          break;
        }
        string += string;
      }
      return self.$$cast(result);
    }, $String_$$6.$$arity = 1);
    Opal.def(self, '$+', $String_$plus$7 = function(other) {
      var self = this;
      other = $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'String'), "to_str");
      return self + other.$to_s();
    }, $String_$plus$7.$$arity = 1);
    Opal.def(self, '$<=>', $String_$lt_eq_gt$8 = function(other) {
      var self = this;
      if($truthy(other['$respond_to?']("to_str"))) {
        other = other.$to_str().$to_s();
        return self > other ? 1 : (self < other ? -1 : 0);
        ;
      } else {
        var cmp = other['$<=>'](self);
        if(cmp === nil) {
          return nil;
        } else {
          return cmp > 0 ? -1 : (cmp < 0 ? 1 : 0);
        }
      }
    }, $String_$lt_eq_gt$8.$$arity = 1);
    Opal.def(self, '$==', $String_$eq_eq$9 = function(other) {
      var self = this;
      if(other.$$is_string) {
        return self.toString() === other.toString();
      }
      if($$($nesting, 'Opal')['$respond_to?'](other, "to_str")) {
        return other['$=='](self);
      }
      return false;
    }, $String_$eq_eq$9.$$arity = 1);
    Opal.alias(self, "eql?", "==");
    Opal.alias(self, "===", "==");
    Opal.def(self, '$=~', $String_$eq_tilde$10 = function(other) {
      var self = this;
      if(other.$$is_string) {
        self.$raise($$($nesting, 'TypeError'), "type mismatch: String given");
      }
      return other['$=~'](self);
    }, $String_$eq_tilde$10.$$arity = 1);
    Opal.def(self, '$[]', $String_$$$11 = function(index, length) {
      var self = this;
      ;
      var size = self.length, exclude;
      if(index.$$is_range) {
        exclude = index.excl;
        length = $$($nesting, 'Opal').$coerce_to(index.end, $$($nesting, 'Integer'), "to_int");
        index = $$($nesting, 'Opal').$coerce_to(index.begin, $$($nesting, 'Integer'), "to_int");
        if(Math.abs(index) > size) {
          return nil;
        }
        if(index < 0) {
          index += size;
        }
        if(length < 0) {
          length += size;
        }
        if(!exclude) {
          length += 1;
        }
        length = length - index;
        if(length < 0) {
          length = 0;
        }
        return self.$$cast(self.substr(index, length));
      }
      if(index.$$is_string) {
        if(length != null) {
          self.$raise($$($nesting, 'TypeError'));
        }
        return self.indexOf(index) !== -1 ? self.$$cast(index) : nil;
      }
      if(index.$$is_regexp) {
        var match = self.match(index);
        if(match === null) {
          ($gvars["~"] = nil);
          return nil;
        }
        ($gvars["~"] = $$($nesting, 'MatchData').$new(index, match));
        if(length == null) {
          return self.$$cast(match[0]);
        }
        length = $$($nesting, 'Opal').$coerce_to(length, $$($nesting, 'Integer'), "to_int");
        if(length < 0 && -length < match.length) {
          return self.$$cast(match[length += match.length]);
        }
        if(length >= 0 && length < match.length) {
          return self.$$cast(match[length]);
        }
        return nil;
      }
      index = $$($nesting, 'Opal').$coerce_to(index, $$($nesting, 'Integer'), "to_int");
      if(index < 0) {
        index += size;
      }
      if(length == null) {
        if(index >= size || index < 0) {
          return nil;
        }
        return self.$$cast(self.substr(index, 1));
      }
      length = $$($nesting, 'Opal').$coerce_to(length, $$($nesting, 'Integer'), "to_int");
      if(length < 0) {
        return nil;
      }
      if(index > size || index < 0) {
        return nil;
      }
      return self.$$cast(self.substr(index, length));
      ;
    }, $String_$$$11.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$byteslice */0;
    Opal.def(self, '$b', $String_b$12 = function $$b() {
      var self = this;
      return self.$force_encoding("binary");
    }, $String_b$12.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$capitalize */0;
    /* destroyed: TreeShaking#shake_methods/$casecmp */0;
    /* destroyed: TreeShaking#shake_methods/$casecmp? */0;
    /* destroyed: TreeShaking#shake_methods/$center */0;
    Opal.def(self, '$chars', $String_chars$17 = function $$chars() {
      var $iter = $String_chars$17.$$p, block = $iter || nil, self = this;
      if($iter) $String_chars$17.$$p = null;
      if($iter) $String_chars$17.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return self.$each_char().$to_a();
      }
      ;
      return $send(self, 'each_char', [], block.$to_proc());
    }, $String_chars$17.$$arity = 0);
    Opal.def(self, '$chomp', $String_chomp$18 = function $$chomp(separator) {
      var self = this;
      if($gvars["/"] == null) $gvars["/"] = nil;
      if(separator == null) {
        separator = $gvars["/"];
      }
      ;
      if($truthy(separator === nil || self.length === 0)) {
        return self;
      }
      ;
      separator = $$($nesting, 'Opal')['$coerce_to!'](separator, $$($nesting, 'String'), "to_str").$to_s();
      var result;
      if(separator === "\n") {
        result = self.replace(/\r?\n?$/, '');
      } else if(separator === "") {
        result = self.replace(/(\r?\n)+$/, '');
      } else if(self.length >= separator.length) {
        var tail = self.substr(self.length - separator.length, separator.length);
        if(tail === separator) {
          result = self.substr(0, self.length - separator.length);
        }
      }
      if(result != null) {
        return self.$$cast(result);
      }
      ;
      return self;
    }, $String_chomp$18.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$chop */0;
    Opal.def(self, '$chr', $String_chr$20 = function $$chr() {
      var self = this;
      return self.charAt(0);
    }, $String_chr$20.$$arity = 0);
    Opal.def(self, '$clone', $String_clone$21 = function $$clone() {
      var self = this, copy = nil;
      copy = self.slice();
      copy.$copy_singleton_methods(self);
      copy.$initialize_clone(self);
      return copy;
    }, $String_clone$21.$$arity = 0);
    Opal.def(self, '$dup', $String_dup$22 = function $$dup() {
      var self = this, copy = nil;
      copy = self.slice();
      copy.$initialize_dup(self);
      return copy;
    }, $String_dup$22.$$arity = 0);
    Opal.def(self, '$count', $String_count$23 = function $$count($a) {
      var $post_args, sets, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      sets = $post_args;
      ;
      if(sets.length === 0) {
        self.$raise($$($nesting, 'ArgumentError'), "ArgumentError: wrong number of arguments (0 for 1+)");
      }
      var char_class = char_class_from_char_sets(sets);
      if(char_class === null) {
        return 0;
      }
      return self.length - self.replace(new RegExp(char_class, 'g'), '').length;
      ;
    }, $String_count$23.$$arity = -1);
    Opal.def(self, '$delete', $String_delete$24 = function($a) {
      var $post_args, sets, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      sets = $post_args;
      ;
      if(sets.length === 0) {
        self.$raise($$($nesting, 'ArgumentError'), "ArgumentError: wrong number of arguments (0 for 1+)");
      }
      var char_class = char_class_from_char_sets(sets);
      if(char_class === null) {
        return self;
      }
      return self.$$cast(self.replace(new RegExp(char_class, 'g'), ''));
      ;
    }, $String_delete$24.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$delete_prefix */0;
    /* destroyed: TreeShaking#shake_methods/$delete_suffix */0;
    Opal.def(self, '$downcase', $String_downcase$27 = function $$downcase() {
      var self = this;
      return self.$$cast(self.toLowerCase());
    }, $String_downcase$27.$$arity = 0);
    Opal.def(self, '$each_char', $String_each_char$28 = function $$each_char() {
      var $iter = $String_each_char$28.$$p, block = $iter || nil, $$29, self = this;
      if($iter) $String_each_char$28.$$p = null;
      if($iter) $String_each_char$28.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each_char"], ($$29 = function() {
          var self = $$29.$$s || this;
          return self.$size();
        }, $$29.$$s = self, $$29.$$arity = 0, $$29));
      }
      ;
      for(var i = 0, length = self.length; i < length; i++) {
        Opal.yield1(block, self.charAt(i));
      }
      ;
      return self;
    }, $String_each_char$28.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$each_line */0;
    Opal.def(self, '$empty?', $String_empty$ques$31 = function() {
      var self = this;
      return self.length === 0;
    }, $String_empty$ques$31.$$arity = 0);
    Opal.def(self, '$end_with?', $String_end_with$ques$32 = function($a) {
      var $post_args, suffixes, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      suffixes = $post_args;
      ;
      for(var i = 0, length = suffixes.length; i < length; i++) {
        var suffix = $$($nesting, 'Opal').$coerce_to(suffixes[i], $$($nesting, 'String'), "to_str").$to_s();
        if(self.length >= suffix.length && self.substr(self.length - suffix.length, suffix.length) == suffix) {
          return true;
        }
      }
      ;
      return false;
    }, $String_end_with$ques$32.$$arity = -1);
    Opal.alias(self, "equal?", "===");
    Opal.def(self, '$gsub', $String_gsub$33 = function $$gsub(pattern, replacement) {
      var $iter = $String_gsub$33.$$p, block = $iter || nil, self = this;
      if($iter) $String_gsub$33.$$p = null;
      if($iter) $String_gsub$33.$$p = null;
      ;
      ;
      if(replacement === undefined && block === nil) {
        return self.$enum_for("gsub", pattern);
      }
      var result = '', match_data = nil, index = 0, match, _replacement;
      if(pattern.$$is_regexp) {
        pattern = Opal.global_multiline_regexp(pattern);
      } else {
        pattern = $$($nesting, 'Opal').$coerce_to(pattern, $$($nesting, 'String'), "to_str");
        pattern = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gm');
      }
      var lastIndex;
      while(true) {
        match = pattern.exec(self);
        if(match === null) {
          ($gvars["~"] = nil);
          result += self.slice(index);
          break;
        }
        match_data = $$($nesting, 'MatchData').$new(pattern, match);
        if(replacement === undefined) {
          lastIndex = pattern.lastIndex;
          _replacement = block(match[0]);
          pattern.lastIndex = lastIndex;
        } else if(replacement.$$is_hash) {
          _replacement = (replacement)['$[]'](match[0]).$to_s();
        } else {
          if(!replacement.$$is_string) {
            replacement = $$($nesting, 'Opal').$coerce_to(replacement, $$($nesting, 'String'), "to_str");
          }
          _replacement = replacement.replace(/([\\]+)([0-9+&`'])/g, function(original, slashes, command) {
            if(slashes.length % 2 === 0) {
              return original;
            }
            switch(command) {
              case "+":
                for(var i = match.length - 1; i > 0; i--) {
                  if(match[i] !== undefined) {
                    return slashes.slice(1) + match[i];
                  }
                }
                return '';
              case "&":
                return slashes.slice(1) + match[0];
              case "`":
                return slashes.slice(1) + self.slice(0, match.index);
              case "'":
                return slashes.slice(1) + self.slice(match.index + match[0].length);
              default:
                return slashes.slice(1) + (match[command] || '');
            }
          }).replace(/\\\\/g, '\\');
        }
        if(pattern.lastIndex === match.index) {
          result += (_replacement + self.slice(index, match.index + 1));
          pattern.lastIndex += 1;
        } else {
          result += (self.slice(index, match.index) + _replacement);
        }
        index = pattern.lastIndex;
      }
      ($gvars["~"] = match_data);
      return self.$$cast(result);
      ;
    }, $String_gsub$33.$$arity = -2);
    Opal.def(self, '$hash', $String_hash$34 = function $$hash() {
      var self = this;
      return self.toString();
    }, $String_hash$34.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$hex */0;
    Opal.def(self, '$include?', $String_include$ques$36 = function(other) {
      var self = this;
      if(!other.$$is_string) {
        (other = $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'String'), "to_str"));
      }
      return self.indexOf(other) !== -1;
    }, $String_include$ques$36.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$index */0;
    Opal.def(self, '$inspect', $String_inspect$38 = function $$inspect() {
      var self = this;
      var escapable = /[\\\"\x00-\x1f\u007F-\u009F\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
        '\u0007': '\\a',
        '\u001b': '\\e',
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\v': '\\v',
        '"': '\\"',
        '\\': '\\\\'
}, escaped = self.replace(escapable, function(chr) {
        return meta[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16).toUpperCase()).slice(-4);
      });
      return '"' + escaped.replace(/\#[\$\@\{]/g, '\\$&') + '"';
    }, $String_inspect$38.$$arity = 0);
    Opal.def(self, '$intern', $String_intern$39 = function $$intern() {
      var self = this;
      return self.toString();
    }, $String_intern$39.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$lines */0;
    Opal.def(self, '$length', $String_length$41 = function $$length() {
      var self = this;
      return self.length;
    }, $String_length$41.$$arity = 0);
    Opal.def(self, '$ljust', $String_ljust$42 = function $$ljust(width, padstr) {
      var self = this;
      if(padstr == null) {
        padstr = " ";
      }
      ;
      width = $$($nesting, 'Opal').$coerce_to(width, $$($nesting, 'Integer'), "to_int");
      padstr = $$($nesting, 'Opal').$coerce_to(padstr, $$($nesting, 'String'), "to_str").$to_s();
      if($truthy(padstr['$empty?']())) {
        self.$raise($$($nesting, 'ArgumentError'), "zero width padding");
      }
      ;
      if($truthy(width <= self.length)) {
        return self;
      }
      ;
      var index = -1, result = "";
      width -= self.length;
      while(++index < width) {
        result += padstr;
      }
      return self.$$cast(self + result.slice(0, width));
      ;
    }, $String_ljust$42.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$lstrip */0;
    /* destroyed: TreeShaking#shake_methods/$ascii_only? */0;
    Opal.def(self, '$match', $String_match$45 = function $$match(pattern, pos) {
      var $iter = $String_match$45.$$p, block = $iter || nil, $a, self = this;
      if($iter) $String_match$45.$$p = null;
      if($iter) $String_match$45.$$p = null;
      ;
      ;
      if($truthy(($truthy($a = $$($nesting, 'String')['$==='](pattern)) ? $a : pattern['$respond_to?']("to_str")))) {
        pattern = $$($nesting, 'Regexp').$new(pattern.$to_str());
      }
      ;
      if($truthy($$($nesting, 'Regexp')['$==='](pattern))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + (pattern.$class()) + " (expected Regexp)");
      }
      ;
      return $send(pattern, 'match', [self, pos], block.$to_proc());
    }, $String_match$45.$$arity = -2);
    Opal.def(self, '$match?', $String_match$ques$46 = function(pattern, pos) {
      var $a, self = this;
      ;
      if($truthy(($truthy($a = $$($nesting, 'String')['$==='](pattern)) ? $a : pattern['$respond_to?']("to_str")))) {
        pattern = $$($nesting, 'Regexp').$new(pattern.$to_str());
      }
      ;
      if($truthy($$($nesting, 'Regexp')['$==='](pattern))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + (pattern.$class()) + " (expected Regexp)");
      }
      ;
      return pattern['$match?'](self, pos);
    }, $String_match$ques$46.$$arity = -2);
    Opal.def(self, '$next', $String_next$47 = function $$next() {
      var self = this;
      var i = self.length;
      if(i === 0) {
        return self.$$cast('');
      }
      var result = self;
      var first_alphanum_char_index = self.search(/[a-zA-Z0-9]/);
      var carry = false;
      var code;
      while(i--) {
        code = self.charCodeAt(i);
        if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
          switch(code) {
            case 57:
              carry = true;
              code = 48;
              break;
            case 90:
              carry = true;
              code = 65;
              break;
            case 122:
              carry = true;
              code = 97;
              break;
            default:
              carry = false;
              code += 1;
          }
        } else {
          if(first_alphanum_char_index === -1) {
            if(code === 255) {
              carry = true;
              code = 0;
            } else {
              carry = false;
              code += 1;
            }
          } else {
            carry = true;
          }
        }
        result = result.slice(0, i) + String.fromCharCode(code) + result.slice(i + 1);
        if(carry && (i === 0 || i === first_alphanum_char_index)) {
          switch(code) {
            case 65:
              break;
            case 97:
              break;
            default:
              code += 1;
          }
          if(i === 0) {
            result = String.fromCharCode(code) + result;
          } else {
            result = result.slice(0, i) + String.fromCharCode(code) + result.slice(i);
          }
          carry = false;
        }
        if(!carry) {
          break;
        }
      }
      return self.$$cast(result);
    }, $String_next$47.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$oct */0;
    Opal.def(self, '$ord', $String_ord$49 = function $$ord() {
      var self = this;
      return self.charCodeAt(0);
    }, $String_ord$49.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$partition */0;
    Opal.def(self, '$reverse', $String_reverse$51 = function $$reverse() {
      var self = this;
      return self.split('').reverse().join('');
    }, $String_reverse$51.$$arity = 0);
    Opal.def(self, '$rindex', $String_rindex$52 = function $$rindex(search, offset) {
      var self = this;
      ;
      var i, m, r, _m;
      if(offset === undefined) {
        offset = self.length;
      } else {
        offset = $$($nesting, 'Opal').$coerce_to(offset, $$($nesting, 'Integer'), "to_int");
        if(offset < 0) {
          offset += self.length;
          if(offset < 0) {
            return nil;
          }
        }
      }
      if(search.$$is_regexp) {
        m = null;
        r = Opal.global_multiline_regexp(search);
        while(true) {
          _m = r.exec(self);
          if(_m === null || _m.index > offset) {
            break;
          }
          m = _m;
          r.lastIndex = m.index + 1;
        }
        if(m === null) {
          ($gvars["~"] = nil);
          i = -1;
        } else {
          $$($nesting, 'MatchData').$new(r, m);
          i = m.index;
        }
      } else {
        search = $$($nesting, 'Opal').$coerce_to(search, $$($nesting, 'String'), "to_str");
        i = self.lastIndexOf(search, offset);
      }
      return i === -1 ? nil : i;
      ;
    }, $String_rindex$52.$$arity = -2);
    Opal.def(self, '$rjust', $String_rjust$53 = function $$rjust(width, padstr) {
      var self = this;
      if(padstr == null) {
        padstr = " ";
      }
      ;
      width = $$($nesting, 'Opal').$coerce_to(width, $$($nesting, 'Integer'), "to_int");
      padstr = $$($nesting, 'Opal').$coerce_to(padstr, $$($nesting, 'String'), "to_str").$to_s();
      if($truthy(padstr['$empty?']())) {
        self.$raise($$($nesting, 'ArgumentError'), "zero width padding");
      }
      ;
      if($truthy(width <= self.length)) {
        return self;
      }
      ;
      var chars = Math.floor(width - self.length), patterns = Math.floor(chars / padstr.length), result = Array(patterns + 1).join(padstr), remaining = chars - result.length;
      return self.$$cast(result + padstr.slice(0, remaining) + self);
      ;
    }, $String_rjust$53.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$rpartition */0;
    /* destroyed: TreeShaking#shake_methods/$rstrip */0;
    Opal.def(self, '$scan', $String_scan$56 = function $$scan(pattern) {
      var $iter = $String_scan$56.$$p, block = $iter || nil, self = this;
      if($iter) $String_scan$56.$$p = null;
      if($iter) $String_scan$56.$$p = null;
      ;
      var result = [], match_data = nil, match;
      if(pattern.$$is_regexp) {
        pattern = Opal.global_multiline_regexp(pattern);
      } else {
        pattern = $$($nesting, 'Opal').$coerce_to(pattern, $$($nesting, 'String'), "to_str");
        pattern = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gm');
      }
      while((match = pattern.exec(self)) != null) {
        match_data = $$($nesting, 'MatchData').$new(pattern, match);
        if(block === nil) {
          match.length == 1 ? result.push(match[0]) : result.push((match_data).$captures());
        } else {
          match.length == 1 ? block(match[0]) : block.call(self, (match_data).$captures());
        }
        if(pattern.lastIndex === match.index) {
          pattern.lastIndex += 1;
        }
      }
      ($gvars["~"] = match_data);
      return (block !== nil ? self : result);
      ;
    }, $String_scan$56.$$arity = 1);
    Opal.alias(self, "size", "length");
    Opal.alias(self, "slice", "[]");
    Opal.def(self, '$split', $String_split$57 = function $$split(pattern, limit) {
      var $a, self = this;
      if($gvars[";"] == null) $gvars[";"] = nil;
      ;
      ;
      if(self.length === 0) {
        return [];
      }
      if(limit === undefined) {
        limit = 0;
      } else {
        limit = $$($nesting, 'Opal')['$coerce_to!'](limit, $$($nesting, 'Integer'), "to_int");
        if(limit === 1) {
          return [self];
        }
      }
      if(pattern === undefined || pattern === nil) {
        pattern = ($truthy($a = $gvars[";"]) ? $a : " ");
      }
      var result = [], string = self.toString(), index = 0, match, i, ii;
      if(pattern.$$is_regexp) {
        pattern = Opal.global_multiline_regexp(pattern);
      } else {
        pattern = $$($nesting, 'Opal').$coerce_to(pattern, $$($nesting, 'String'), "to_str").$to_s();
        if(pattern === ' ') {
          pattern = /\s+/gm;
          string = string.replace(/^\s+/, '');
        } else {
          pattern = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gm');
        }
      }
      result = string.split(pattern);
      if(result.length === 1 && result[0] === string) {
        return [self.$$cast(result[0])];
      }
      while((i = result.indexOf(undefined)) !== -1) {
        result.splice(i, 1);
      }
            function castResult() {
        for(i = 0; i < result.length; i++) {
          result[i] = self.$$cast(result[i]);
        }
      }
      if(limit === 0) {
        while(result[result.length - 1] === '') {
          result.length -= 1;
        }
        castResult();
        return result;
      }
      match = pattern.exec(string);
      if(limit < 0) {
        if(match !== null && match[0] === '' && pattern.source.indexOf('(?=') === -1) {
          for(i = 0, ii = match.length; i < ii; i++) {
            result.push('');
          }
        }
        castResult();
        return result;
      }
      if(match !== null && match[0] === '') {
        result.splice(limit - 1, result.length - 1, result.slice(limit - 1).join(''));
        castResult();
        return result;
      }
      if(limit >= result.length) {
        castResult();
        return result;
      }
      i = 0;
      while(match !== null) {
        i++;
        index = pattern.lastIndex;
        if(i + 1 === limit) {
          break;
        }
        match = pattern.exec(string);
      }
      result.splice(limit - 1, result.length - 1, string.slice(index));
      castResult();
      return result;
      ;
    }, $String_split$57.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$squeeze */0;
    Opal.def(self, '$start_with?', $String_start_with$ques$59 = function($a) {
      var $post_args, prefixes, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      prefixes = $post_args;
      ;
      for(var i = 0, length = prefixes.length; i < length; i++) {
        var prefix = $$($nesting, 'Opal').$coerce_to(prefixes[i], $$($nesting, 'String'), "to_str").$to_s();
        if(self.indexOf(prefix) === 0) {
          return true;
        }
      }
      return false;
      ;
    }, $String_start_with$ques$59.$$arity = -1);
    Opal.def(self, '$strip', $String_strip$60 = function $$strip() {
      var self = this;
      return self.replace(/^\s*/, '').replace(/[\s\u0000]*$/, '');
    }, $String_strip$60.$$arity = 0);
    Opal.def(self, '$sub', $String_sub$61 = function $$sub(pattern, replacement) {
      var $iter = $String_sub$61.$$p, block = $iter || nil, self = this;
      if($iter) $String_sub$61.$$p = null;
      if($iter) $String_sub$61.$$p = null;
      ;
      ;
      if(!pattern.$$is_regexp) {
        pattern = $$($nesting, 'Opal').$coerce_to(pattern, $$($nesting, 'String'), "to_str");
        pattern = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      }
      var result, match = pattern.exec(self);
      if(match === null) {
        ($gvars["~"] = nil);
        result = self.toString();
      } else {
        $$($nesting, 'MatchData').$new(pattern, match);
        if(replacement === undefined) {
          if(block === nil) {
            self.$raise($$($nesting, 'ArgumentError'), "wrong number of arguments (1 for 2)");
          }
          result = self.slice(0, match.index) + block(match[0]) + self.slice(match.index + match[0].length);
        } else if(replacement.$$is_hash) {
          result = self.slice(0, match.index) + (replacement)['$[]'](match[0]).$to_s() + self.slice(match.index + match[0].length);
        } else {
          replacement = $$($nesting, 'Opal').$coerce_to(replacement, $$($nesting, 'String'), "to_str");
          replacement = replacement.replace(/([\\]+)([0-9+&`'])/g, function(original, slashes, command) {
            if(slashes.length % 2 === 0) {
              return original;
            }
            switch(command) {
              case "+":
                for(var i = match.length - 1; i > 0; i--) {
                  if(match[i] !== undefined) {
                    return slashes.slice(1) + match[i];
                  }
                }
                return '';
              case "&":
                return slashes.slice(1) + match[0];
              case "`":
                return slashes.slice(1) + self.slice(0, match.index);
              case "'":
                return slashes.slice(1) + self.slice(match.index + match[0].length);
              default:
                return slashes.slice(1) + (match[command] || '');
            }
          }).replace(/\\\\/g, '\\');
          result = self.slice(0, match.index) + replacement + self.slice(match.index + match[0].length);
        }
      }
      return self.$$cast(result);
      ;
    }, $String_sub$61.$$arity = -2);
    Opal.alias(self, "succ", "next");
    /* destroyed: TreeShaking#shake_methods/$sum */0;
    /* destroyed: TreeShaking#shake_methods/$swapcase */0;
    Opal.def(self, '$to_f', $String_to_f$64 = function $$to_f() {
      var self = this;
      if(self.charAt(0) === '_') {
        return 0;
      }
      var result = parseFloat(self.replace(/_/g, ''));
      if(isNaN(result) || result == Infinity || result == -Infinity) {
        return 0;
      } else {
        return result;
      }
    }, $String_to_f$64.$$arity = 0);
    Opal.def(self, '$to_i', $String_to_i$65 = function $$to_i(base) {
      var self = this;
      if(base == null) {
        base = 10;
      }
      ;
      var result, string = self.toLowerCase(), radix = $$($nesting, 'Opal').$coerce_to(base, $$($nesting, 'Integer'), "to_int");
      if(radix === 1 || radix < 0 || radix > 36) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "invalid radix " + (radix));
      }
      if(/^\s*_/.test(string)) {
        return 0;
      }
      string = string.replace(/^(\s*[+-]?)(0[bodx]?)(.+)$/, function(original, head, flag, tail) {
        switch(tail.charAt(0)) {
          case '+':

          case '-':
            return original;
          case '0':
            if(tail.charAt(1) === 'x' && flag === '0x' && (radix === 0 || radix === 16)) {
              return original;
            }
        }
        switch(flag) {
          case '0b':
            if(radix === 0 || radix === 2) {
              radix = 2;
              return head + tail;
            }
            break;
          case '0':

          case '0o':
            if(radix === 0 || radix === 8) {
              radix = 8;
              return head + tail;
            }
            break;
          case '0d':
            if(radix === 0 || radix === 10) {
              radix = 10;
              return head + tail;
            }
            break;
          case '0x':
            if(radix === 0 || radix === 16) {
              radix = 16;
              return head + tail;
            }
            break;
        }
        return original;
      });
      result = parseInt(string.replace(/_(?!_)/g, ''), radix);
      return isNaN(result) ? 0 : result;
      ;
    }, $String_to_i$65.$$arity = -1);
    Opal.def(self, '$to_proc', $String_to_proc$66 = function $$to_proc() {
      var $$67, $iter = $String_to_proc$66.$$p, $yield = $iter || nil, self = this, method_name = nil;
      if($iter) $String_to_proc$66.$$p = null;
      method_name = $rb_plus("$", self.valueOf());
      return $send(self, 'proc', [], ($$67 = function($a) {
        var self = $$67.$$s || this, $iter = $$67.$$p, block = $iter || nil, $post_args, args;
        if($iter) $$67.$$p = null;
        ;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        if(args.length === 0) {
          self.$raise($$($nesting, 'ArgumentError'), "no receiver given");
        }
        var recv = args[0];
        if(recv == null) recv = nil;
        var body = recv[method_name];
        if(!body) {
          return recv.$method_missing.apply(recv, args);
        }
        if(typeof block === 'function') {
          body.$$p = block;
        }
        if(args.length === 1) {
          return body.call(recv);
        } else {
          return body.apply(recv, args.slice(1));
        }
        ;
      }, $$67.$$s = self, $$67.$$arity = -1, $$67));
    }, $String_to_proc$66.$$arity = 0);
    Opal.def(self, '$to_s', $String_to_s$68 = function $$to_s() {
      var self = this;
      return self.toString();
    }, $String_to_s$68.$$arity = 0);
    Opal.alias(self, "to_str", "to_s");
    Opal.alias(self, "to_sym", "intern");
    /* destroyed: TreeShaking#shake_methods/$tr */0;
    /* destroyed: TreeShaking#shake_methods/$tr_s */0;
    Opal.def(self, '$upcase', $String_upcase$71 = function $$upcase() {
      var self = this;
      return self.$$cast(self.toUpperCase());
    }, $String_upcase$71.$$arity = 0);
    Opal.def(self, '$upto', $String_upto$72 = function $$upto(stop, excl) {
      var $iter = $String_upto$72.$$p, block = $iter || nil, self = this;
      if($iter) $String_upto$72.$$p = null;
      if($iter) $String_upto$72.$$p = null;
      ;
      if(excl == null) {
        excl = false;
      }
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("upto", stop, excl);
      }
      ;
      stop = $$($nesting, 'Opal').$coerce_to(stop, $$($nesting, 'String'), "to_str");
      var a, b, s = self.toString();
      if(s.length === 1 && stop.length === 1) {
        a = s.charCodeAt(0);
        b = stop.charCodeAt(0);
        while(a <= b) {
          if(excl && a === b) {
            break;
          }
          block(String.fromCharCode(a));
          a += 1;
        }
      } else if(parseInt(s, 10).toString() === s && parseInt(stop, 10).toString() === stop) {
        a = parseInt(s, 10);
        b = parseInt(stop, 10);
        while(a <= b) {
          if(excl && a === b) {
            break;
          }
          block(a.toString());
          a += 1;
        }
      } else {
        while(s.length <= stop.length && s <= stop) {
          if(excl && s === stop) {
            break;
          }
          block(s);
          s = (s).$succ();
        }
      }
      return self;
      ;
    }, $String_upto$72.$$arity = -2);
        function char_class_from_char_sets(sets) {
            function explode_sequences_in_character_set(set) {
        var result = '', i, len = set.length, curr_char, skip_next_dash, char_code_from, char_code_upto, char_code;
        for(i = 0; i < len; i++) {
          curr_char = set.charAt(i);
          if(curr_char === '-' && i > 0 && i < (len - 1) && !skip_next_dash) {
            char_code_from = set.charCodeAt(i - 1);
            char_code_upto = set.charCodeAt(i + 1);
            if(char_code_from > char_code_upto) {
              self.$raise($$($nesting, 'ArgumentError'), "" + "invalid range \"" + (char_code_from) + "-" + (char_code_upto) + "\" in string transliteration");
            }
            for(char_code = char_code_from + 1; char_code < char_code_upto + 1; char_code++) {
              result += String.fromCharCode(char_code);
            }
            skip_next_dash = true;
            i++;
          } else {
            skip_next_dash = (curr_char === '\\');
            result += curr_char;
          }
        }
        return result;
      }
            function intersection(setA, setB) {
        if(setA.length === 0) {
          return setB;
        }
        var result = '', i, len = setA.length, chr;
        for(i = 0; i < len; i++) {
          chr = setA.charAt(i);
          if(setB.indexOf(chr) !== -1) {
            result += chr;
          }
        }
        return result;
      }
      var i, len, set, neg, chr, tmp, pos_intersection = '', neg_intersection = '';
      for(i = 0, len = sets.length; i < len; i++) {
        set = $$($nesting, 'Opal').$coerce_to(sets[i], $$($nesting, 'String'), "to_str");
        neg = (set.charAt(0) === '^' && set.length > 1);
        set = explode_sequences_in_character_set(neg ? set.slice(1) : set);
        if(neg) {
          neg_intersection = intersection(neg_intersection, set);
        } else {
          pos_intersection = intersection(pos_intersection, set);
        }
      }
      if(pos_intersection.length > 0 && neg_intersection.length > 0) {
        tmp = '';
        for(i = 0, len = pos_intersection.length; i < len; i++) {
          chr = pos_intersection.charAt(i);
          if(neg_intersection.indexOf(chr) === -1) {
            tmp += chr;
          }
        }
        pos_intersection = tmp;
        neg_intersection = '';
      }
      if(pos_intersection.length > 0) {
        return '[' + $$($nesting, 'Regexp').$escape(pos_intersection) + ']';
      }
      if(neg_intersection.length > 0) {
        return '[^' + $$($nesting, 'Regexp').$escape(neg_intersection) + ']';
      }
      return null;
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$instance_variables */0;
    /* destroyed: TreeShaking#shake_methods/$_load */0;
    Opal.def(self, '$unicode_normalize', $String_unicode_normalize$75 = function $$unicode_normalize(form) {
      var self = this;
      ;
      return self.toString();
      ;
    }, $String_unicode_normalize$75.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$unicode_normalized? */0;
    Opal.def(self, '$unpack', $String_unpack$77 = function $$unpack(format) {
      var self = this;
      return self.$raise("To use String#unpack, you must first require 'corelib/string/unpack'.");
    }, $String_unpack$77.$$arity = 1);
    return (/* destroyed: TreeShaking#shake_methods/$unpack1 */0, nil) && 'unpack1';
  })($nesting[0], String, $nesting);
  return Opal.const_set($nesting[0], 'Symbol', $$($nesting, 'String'));
};
Opal.modules["corelib/enumerable"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $send = Opal.send, $falsy = Opal.falsy, $hash2 = Opal.hash2, $lambda = Opal.lambda;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Enumerable');
    var $nesting = [self].concat($parent_nesting), $Enumerable_all$ques$1, $Enumerable_any$ques$5, $Enumerable_chunk$9, $Enumerable_chunk_while$12, $Enumerable_collect$14, $Enumerable_collect_concat$16, $Enumerable_count$19, $Enumerable_cycle$23, $Enumerable_detect$25, $Enumerable_drop$27, $Enumerable_drop_while$28, $Enumerable_each_cons$29, $Enumerable_each_entry$31, $Enumerable_each_slice$33, $Enumerable_each_with_index$35, $Enumerable_each_with_object$37, $Enumerable_entries$39, $Enumerable_find_all$40, $Enumerable_find_index$42, $Enumerable_first$45, $Enumerable_grep$48, $Enumerable_grep_v$50, $Enumerable_group_by$52, $Enumerable_include$ques$54, $Enumerable_inject$56, $Enumerable_lazy$57, $Enumerable_enumerator_size$59, $Enumerable_max$60, $Enumerable_max_by$61, $Enumerable_min$63, $Enumerable_min_by$64, $Enumerable_minmax$66, $Enumerable_minmax_by$68, $Enumerable_none$ques$69, $Enumerable_one$ques$73, $Enumerable_partition$77, $Enumerable_reject$79, $Enumerable_reverse_each$81, $Enumerable_slice_before$83, $Enumerable_slice_after$85, $Enumerable_slice_when$88, $Enumerable_sort$90, $Enumerable_sort_by$92, $Enumerable_sum$97, $Enumerable_take$99, $Enumerable_take_while$100, $Enumerable_uniq$102, $Enumerable_zip$104;
        function comparableForPattern(value) {
      if(value.length === 0) {
        value = [nil];
      }
      if(value.length > 1) {
        value = [value];
      }
      return value;
    }
    ;
    Opal.def(self, '$all?', $Enumerable_all$ques$1 = function(pattern) {
      try {
        var $iter = $Enumerable_all$ques$1.$$p, block = $iter || nil, $$2, $$3, $$4, self = this;
        if($iter) $Enumerable_all$ques$1.$$p = null;
        if($iter) $Enumerable_all$ques$1.$$p = null;
        ;
        ;
        if($truthy(pattern !== undefined)) {
          $send(self, 'each', [], ($$2 = function($a) {
            var self = $$2.$$s || this, $post_args, value, comparable = nil;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            comparable = comparableForPattern(value);
            if($truthy($send(pattern, 'public_send', ["==="].concat(Opal.to_a(comparable))))) {
              return nil;
            } else {
              Opal.ret(false);
            }
            ;
          }, $$2.$$s = self, $$2.$$arity = -1, $$2));
        } else if((block !== nil)) {
          $send(self, 'each', [], ($$3 = function($a) {
            var self = $$3.$$s || this, $post_args, value;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            if($truthy(Opal.yieldX(block, Opal.to_a(value)))) {
              return nil;
            } else {
              Opal.ret(false);
            }
            ;
          }, $$3.$$s = self, $$3.$$arity = -1, $$3));
        } else {
          $send(self, 'each', [], ($$4 = function($a) {
            var self = $$4.$$s || this, $post_args, value;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            if($truthy($$($nesting, 'Opal').$destructure(value))) {
              return nil;
            } else {
              Opal.ret(false);
            }
            ;
          }, $$4.$$s = self, $$4.$$arity = -1, $$4));
        }
        ;
        return true;
      } catch($returner) {
        if($returner === Opal.returner) {
          return $returner.$v;
        }
        throw $returner;
      }
    }, $Enumerable_all$ques$1.$$arity = -1);
    Opal.def(self, '$any?', $Enumerable_any$ques$5 = function(pattern) {
      try {
        var $iter = $Enumerable_any$ques$5.$$p, block = $iter || nil, $$6, $$7, $$8, self = this;
        if($iter) $Enumerable_any$ques$5.$$p = null;
        if($iter) $Enumerable_any$ques$5.$$p = null;
        ;
        ;
        if($truthy(pattern !== undefined)) {
          $send(self, 'each', [], ($$6 = function($a) {
            var self = $$6.$$s || this, $post_args, value, comparable = nil;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            comparable = comparableForPattern(value);
            if($truthy($send(pattern, 'public_send', ["==="].concat(Opal.to_a(comparable))))) {
              Opal.ret(true);
            } else {
              return nil;
            }
            ;
          }, $$6.$$s = self, $$6.$$arity = -1, $$6));
        } else if((block !== nil)) {
          $send(self, 'each', [], ($$7 = function($a) {
            var self = $$7.$$s || this, $post_args, value;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            if($truthy(Opal.yieldX(block, Opal.to_a(value)))) {
              Opal.ret(true);
            } else {
              return nil;
            }
            ;
          }, $$7.$$s = self, $$7.$$arity = -1, $$7));
        } else {
          $send(self, 'each', [], ($$8 = function($a) {
            var self = $$8.$$s || this, $post_args, value;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            value = $post_args;
            ;
            if($truthy($$($nesting, 'Opal').$destructure(value))) {
              Opal.ret(true);
            } else {
              return nil;
            }
            ;
          }, $$8.$$s = self, $$8.$$arity = -1, $$8));
        }
        ;
        return false;
      } catch($returner) {
        if($returner === Opal.returner) {
          return $returner.$v;
        }
        throw $returner;
      }
    }, $Enumerable_any$ques$5.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$chunk */0;
    /* destroyed: TreeShaking#shake_methods/$chunk_while */0;
    Opal.def(self, '$collect', $Enumerable_collect$14 = function $$collect() {
      var $iter = $Enumerable_collect$14.$$p, block = $iter || nil, $$15, self = this;
      if($iter) $Enumerable_collect$14.$$p = null;
      if($iter) $Enumerable_collect$14.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["collect"], ($$15 = function() {
          var self = $$15.$$s || this;
          return self.$enumerator_size();
        }, $$15.$$s = self, $$15.$$arity = 0, $$15));
      }
      ;
      var result = [];
      self.$each.$$p = function() {
        var value = Opal.yieldX(block, arguments);
        result.push(value);
      };
      self.$each();
      return result;
      ;
    }, $Enumerable_collect$14.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$collect_concat */0;
    Opal.def(self, '$count', $Enumerable_count$19 = function $$count(object) {
      var $iter = $Enumerable_count$19.$$p, block = $iter || nil, $$20, $$21, $$22, self = this, result = nil;
      if($iter) $Enumerable_count$19.$$p = null;
      if($iter) $Enumerable_count$19.$$p = null;
      ;
      ;
      result = 0;
      if(object != null && block !== nil) {
        self.$warn("warning: given block not used");
      }
      ;
      if($truthy(object != null)) {
        block = $send(self, 'proc', [], ($$20 = function($a) {
          var self = $$20.$$s || this, $post_args, args;
          $post_args = Opal.slice.call(arguments, 0, arguments.length);
          args = $post_args;
          ;
          return $$($nesting, 'Opal').$destructure(args)['$=='](object);
        }, $$20.$$s = self, $$20.$$arity = -1, $$20));
      } else if($truthy(block['$nil?']())) {
        block = $send(self, 'proc', [], ($$21 = function() {
          var self = $$21.$$s || this;
          return true;
        }, $$21.$$s = self, $$21.$$arity = 0, $$21));
      }
      ;
      $send(self, 'each', [], ($$22 = function($a) {
        var self = $$22.$$s || this, $post_args, args;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        if($truthy(Opal.yieldX(block, args))) {
          return result++;
        } else {
          return nil;
        }
        ;
      }, $$22.$$s = self, $$22.$$arity = -1, $$22));
      return result;
    }, $Enumerable_count$19.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$cycle */0;
    Opal.def(self, '$detect', $Enumerable_detect$25 = function $$detect(ifnone) {
      try {
        var $iter = $Enumerable_detect$25.$$p, block = $iter || nil, $$26, self = this;
        if($iter) $Enumerable_detect$25.$$p = null;
        if($iter) $Enumerable_detect$25.$$p = null;
        ;
        ;
        if((block !== nil)) {

        } else {
          return self.$enum_for("detect", ifnone);
        }
        ;
        $send(self, 'each', [], ($$26 = function($a) {
          var self = $$26.$$s || this, $post_args, args, value = nil;
          $post_args = Opal.slice.call(arguments, 0, arguments.length);
          args = $post_args;
          ;
          value = $$($nesting, 'Opal').$destructure(args);
          if($truthy(Opal.yield1(block, value))) {
            Opal.ret(value);
          } else {
            return nil;
          }
          ;
        }, $$26.$$s = self, $$26.$$arity = -1, $$26));
        if(ifnone !== undefined) {
          if(typeof (ifnone) === 'function') {
            return ifnone();
          } else {
            return ifnone;
          }
        }
        ;
        return nil;
      } catch($returner) {
        if($returner === Opal.returner) {
          return $returner.$v;
        }
        throw $returner;
      }
    }, $Enumerable_detect$25.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$drop */0;
    /* destroyed: TreeShaking#shake_methods/$drop_while */0;
    /* destroyed: TreeShaking#shake_methods/$each_cons */0;
    /* destroyed: TreeShaking#shake_methods/$each_entry */0;
    /* destroyed: TreeShaking#shake_methods/$each_slice */0;
    Opal.def(self, '$each_with_index', $Enumerable_each_with_index$35 = function $$each_with_index($a) {
      var $iter = $Enumerable_each_with_index$35.$$p, block = $iter || nil, $post_args, args, $$36, self = this;
      if($iter) $Enumerable_each_with_index$35.$$p = null;
      if($iter) $Enumerable_each_with_index$35.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each_with_index"].concat(Opal.to_a(args)), ($$36 = function() {
          var self = $$36.$$s || this;
          return self.$enumerator_size();
        }, $$36.$$s = self, $$36.$$arity = 0, $$36));
      }
      ;
      var result, index = 0;
      self.$each.$$p = function() {
        var param = $$($nesting, 'Opal').$destructure(arguments);
        block(param, index);
        index++;
      };
      self.$each.apply(self, args);
      if(result !== undefined) {
        return result;
      }
      ;
      return self;
    }, $Enumerable_each_with_index$35.$$arity = -1);
    Opal.def(self, '$each_with_object', $Enumerable_each_with_object$37 = function $$each_with_object(object) {
      var $iter = $Enumerable_each_with_object$37.$$p, block = $iter || nil, $$38, self = this;
      if($iter) $Enumerable_each_with_object$37.$$p = null;
      if($iter) $Enumerable_each_with_object$37.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each_with_object", object], ($$38 = function() {
          var self = $$38.$$s || this;
          return self.$enumerator_size();
        }, $$38.$$s = self, $$38.$$arity = 0, $$38));
      }
      ;
      var result;
      self.$each.$$p = function() {
        var param = $$($nesting, 'Opal').$destructure(arguments);
        block(param, object);
      };
      self.$each();
      if(result !== undefined) {
        return result;
      }
      ;
      return object;
    }, $Enumerable_each_with_object$37.$$arity = 1);
    Opal.def(self, '$entries', $Enumerable_entries$39 = function $$entries($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      var result = [];
      self.$each.$$p = function() {
        result.push($$($nesting, 'Opal').$destructure(arguments));
      };
      self.$each.apply(self, args);
      return result;
      ;
    }, $Enumerable_entries$39.$$arity = -1);
    Opal.alias(self, "find", "detect");
    /* destroyed: TreeShaking#shake_methods/$find_all */0;
    /* destroyed: TreeShaking#shake_methods/$find_index */0;
    Opal.def(self, '$first', $Enumerable_first$45 = function $$first(number) {
      try {
        var $$46, $$47, self = this, result = nil, current = nil;
        ;
        if($truthy(number === undefined)) {
          return $send(self, 'each', [], ($$46 = function(value) {
            var self = $$46.$$s || this;
            if(value == null) {
              value = nil;
            }
            ;
            Opal.ret(value);
          }, $$46.$$s = self, $$46.$$arity = 1, $$46));
        } else {
          result = [];
          number = $$($nesting, 'Opal').$coerce_to(number, $$($nesting, 'Integer'), "to_int");
          if($truthy(number < 0)) {
            self.$raise($$($nesting, 'ArgumentError'), "attempt to take negative size");
          }
          ;
          if($truthy(number == 0)) {
            return [];
          }
          ;
          current = 0;
          $send(self, 'each', [], ($$47 = function($a) {
            var self = $$47.$$s || this, $post_args, args;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            args = $post_args;
            ;
            result.push($$($nesting, 'Opal').$destructure(args));
            if($truthy(number <= ++current)) {
              Opal.ret(result);
            } else {
              return nil;
            }
            ;
          }, $$47.$$s = self, $$47.$$arity = -1, $$47));
          return result;
        }
        ;
      } catch($returner) {
        if($returner === Opal.returner) {
          return $returner.$v;
        }
        throw $returner;
      }
    }, $Enumerable_first$45.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$flat_map */0;
    /* destroyed: TreeShaking#shake_methods/$grep */0;
    /* destroyed: TreeShaking#shake_methods/$grep_v */0;
    /* destroyed: TreeShaking#shake_methods/$group_by */0;
    Opal.def(self, '$include?', $Enumerable_include$ques$54 = function(obj) {
      try {
        var $$55, self = this;
        $send(self, 'each', [], ($$55 = function($a) {
          var self = $$55.$$s || this, $post_args, args;
          $post_args = Opal.slice.call(arguments, 0, arguments.length);
          args = $post_args;
          ;
          if($$($nesting, 'Opal').$destructure(args)['$=='](obj)) {
            Opal.ret(true);
          } else {
            return nil;
          }
          ;
        }, $$55.$$s = self, $$55.$$arity = -1, $$55));
        return false;
      } catch($returner) {
        if($returner === Opal.returner) {
          return $returner.$v;
        }
        throw $returner;
      }
    }, $Enumerable_include$ques$54.$$arity = 1);
    Opal.def(self, '$inject', $Enumerable_inject$56 = function $$inject(object, sym) {
      var $iter = $Enumerable_inject$56.$$p, block = $iter || nil, self = this;
      if($iter) $Enumerable_inject$56.$$p = null;
      if($iter) $Enumerable_inject$56.$$p = null;
      ;
      ;
      ;
      var result = object;
      if(block !== nil && sym === undefined) {
        self.$each.$$p = function() {
          var value = $$($nesting, 'Opal').$destructure(arguments);
          if(result === undefined) {
            result = value;
            return;
          }
          value = Opal.yieldX(block, [result, value]);
          result = value;
        };
      } else {
        if(sym === undefined) {
          if(!$$($nesting, 'Symbol')['$==='](object)) {
            self.$raise($$($nesting, 'TypeError'), "" + (object.$inspect()) + " is not a Symbol");
          }
          sym = object;
          result = undefined;
        }
        self.$each.$$p = function() {
          var value = $$($nesting, 'Opal').$destructure(arguments);
          if(result === undefined) {
            result = value;
            return;
          }
          result = (result).$__send__(sym, value);
        };
      }
      self.$each();
      return result == undefined ? nil : result;
      ;
    }, $Enumerable_inject$56.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$lazy */0;
    Opal.def(self, '$enumerator_size', $Enumerable_enumerator_size$59 = function $$enumerator_size() {
      var self = this;
      if($truthy(self['$respond_to?']("size"))) {
        return self.$size();
      } else {
        return nil;
      }
    }, $Enumerable_enumerator_size$59.$$arity = 0);
    Opal.alias(self, "map", "collect");
    Opal.def(self, '$max', $Enumerable_max$60 = function $$max(n) {
      var $iter = $Enumerable_max$60.$$p, block = $iter || nil, self = this;
      if($iter) $Enumerable_max$60.$$p = null;
      if($iter) $Enumerable_max$60.$$p = null;
      ;
      ;
      if(n === undefined || n === nil) {
        var result, value;
        self.$each.$$p = function() {
          var item = $$($nesting, 'Opal').$destructure(arguments);
          if(result === undefined) {
            result = item;
            return;
          }
          if(block !== nil) {
            value = Opal.yieldX(block, [item, result]);
          } else {
            value = (item)['$<=>'](result);
          }
          if(value === nil) {
            self.$raise($$($nesting, 'ArgumentError'), "comparison failed");
          }
          if(value > 0) {
            result = item;
          }
        };
        self.$each();
        if(result === undefined) {
          return nil;
        } else {
          return result;
        }
      }
      ;
      n = $$($nesting, 'Opal').$coerce_to(n, $$($nesting, 'Integer'), "to_int");
      return $send(self, 'sort', [], block.$to_proc()).$reverse().$first(n);
    }, $Enumerable_max$60.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$max_by */0;
    /* destroyed: TreeShaking#shake_methods/$member? */0;
    Opal.def(self, '$min', $Enumerable_min$63 = function $$min() {
      var $iter = $Enumerable_min$63.$$p, block = $iter || nil, self = this;
      if($iter) $Enumerable_min$63.$$p = null;
      if($iter) $Enumerable_min$63.$$p = null;
      ;
      var result;
      if(block !== nil) {
        self.$each.$$p = function() {
          var param = $$($nesting, 'Opal').$destructure(arguments);
          if(result === undefined) {
            result = param;
            return;
          }
          var value = block(param, result);
          if(value === nil) {
            self.$raise($$($nesting, 'ArgumentError'), "comparison failed");
          }
          if(value < 0) {
            result = param;
          }
        };
      } else {
        self.$each.$$p = function() {
          var param = $$($nesting, 'Opal').$destructure(arguments);
          if(result === undefined) {
            result = param;
            return;
          }
          if($$($nesting, 'Opal').$compare(param, result) < 0) {
            result = param;
          }
        };
      }
      self.$each();
      return result === undefined ? nil : result;
      ;
    }, $Enumerable_min$63.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$min_by */0;
    /* destroyed: TreeShaking#shake_methods/$minmax */0;
    /* destroyed: TreeShaking#shake_methods/$minmax_by */0;
    /* destroyed: TreeShaking#shake_methods/$none? */0;
    /* destroyed: TreeShaking#shake_methods/$one? */0;
    /* destroyed: TreeShaking#shake_methods/$partition */0;
    Opal.alias(self, "reduce", "inject");
    Opal.def(self, '$reject', $Enumerable_reject$79 = function $$reject() {
      var $iter = $Enumerable_reject$79.$$p, block = $iter || nil, $$80, self = this;
      if($iter) $Enumerable_reject$79.$$p = null;
      if($iter) $Enumerable_reject$79.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["reject"], ($$80 = function() {
          var self = $$80.$$s || this;
          return self.$enumerator_size();
        }, $$80.$$s = self, $$80.$$arity = 0, $$80));
      }
      ;
      var result = [];
      self.$each.$$p = function() {
        var param = $$($nesting, 'Opal').$destructure(arguments), value = Opal.yield1(block, param);
        if($falsy(value)) {
          result.push(param);
        }
      };
      self.$each();
      return result;
      ;
    }, $Enumerable_reject$79.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$reverse_each */0;
    /* destroyed: TreeShaking#shake_methods/$select */0;
    /* destroyed: TreeShaking#shake_methods/$slice_before */0;
    /* destroyed: TreeShaking#shake_methods/$slice_after */0;
    /* destroyed: TreeShaking#shake_methods/$slice_when */0;
    Opal.def(self, '$sort', $Enumerable_sort$90 = function $$sort() {
      var $iter = $Enumerable_sort$90.$$p, block = $iter || nil, $$91, self = this, ary = nil;
      if($iter) $Enumerable_sort$90.$$p = null;
      if($iter) $Enumerable_sort$90.$$p = null;
      ;
      ary = self.$to_a();
      if((block !== nil)) {

      } else {
        block = $lambda(($$91 = function(a, b) {
          var self = $$91.$$s || this;
          if(a == null) {
            a = nil;
          }
          ;
          if(b == null) {
            b = nil;
          }
          ;
          return a['$<=>'](b);
        }, $$91.$$s = self, $$91.$$arity = 2, $$91));
      }
      ;
      return $send(ary, 'sort', [], block.$to_proc());
    }, $Enumerable_sort$90.$$arity = 0);
    Opal.def(self, '$sort_by', $Enumerable_sort_by$92 = function $$sort_by() {
      var $iter = $Enumerable_sort_by$92.$$p, block = $iter || nil, $$93, $$94, $$95, $$96, self = this, dup = nil;
      if($iter) $Enumerable_sort_by$92.$$p = null;
      if($iter) $Enumerable_sort_by$92.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["sort_by"], ($$93 = function() {
          var self = $$93.$$s || this;
          return self.$enumerator_size();
        }, $$93.$$s = self, $$93.$$arity = 0, $$93));
      }
      ;
      dup = $send(self, 'map', [], ($$94 = function() {
        var self = $$94.$$s || this, arg = nil;
        arg = $$($nesting, 'Opal').$destructure(arguments);
        return [Opal.yield1(block, arg), arg];
      }, $$94.$$s = self, $$94.$$arity = 0, $$94));
      $send(dup, 'sort!', [], ($$95 = function(a, b) {
        var self = $$95.$$s || this;
        if(a == null) {
          a = nil;
        }
        ;
        if(b == null) {
          b = nil;
        }
        ;
        return (a[0])['$<=>'](b[0]);
      }, $$95.$$s = self, $$95.$$arity = 2, $$95));
      return $send(dup, 'map!', [], ($$96 = function(i) {
        var self = $$96.$$s || this;
        if(i == null) {
          i = nil;
        }
        ;
        return i[1];
        ;
      }, $$96.$$s = self, $$96.$$arity = 1, $$96));
    }, $Enumerable_sort_by$92.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$sum */0;
    Opal.def(self, '$take', $Enumerable_take$99 = function $$take(num) {
      var self = this;
      return self.$first(num);
    }, $Enumerable_take$99.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$take_while */0;
    Opal.def(self, '$uniq', $Enumerable_uniq$102 = function $$uniq() {
      var $iter = $Enumerable_uniq$102.$$p, block = $iter || nil, $$103, self = this, hash = nil;
      if($iter) $Enumerable_uniq$102.$$p = null;
      if($iter) $Enumerable_uniq$102.$$p = null;
      ;
      hash = $hash2([], { });
      $send(self, 'each', [], ($$103 = function($a) {
        var self = $$103.$$s || this, $post_args, args, value = nil, produced = nil, $writer = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        value = $$($nesting, 'Opal').$destructure(args);
        produced = (function() {
          if((block !== nil)) {
            return Opal.yield1(block, value);
          } else {
            return value;
          }
          ;
          return nil;
        })();
        if($truthy(hash['$key?'](produced))) {
          return nil;
        } else {
          $writer = [produced, value];
          $send(hash, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }
        ;
      }, $$103.$$s = self, $$103.$$arity = -1, $$103));
      return hash.$values();
    }, $Enumerable_uniq$102.$$arity = 0);
    Opal.alias(self, "to_a", "entries");
    Opal.def(self, '$zip', $Enumerable_zip$104 = function $$zip($a) {
      var $iter = $Enumerable_zip$104.$$p, block = $iter || nil, $post_args, others, self = this;
      if($iter) $Enumerable_zip$104.$$p = null;
      if($iter) $Enumerable_zip$104.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      others = $post_args;
      ;
      return $send(self.$to_a(), 'zip', Opal.to_a(others));
    }, $Enumerable_zip$104.$$arity = -1);
  })($nesting[0], $nesting);
};
Opal.modules["corelib/enumerator"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $falsy = Opal.falsy;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/enumerable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Enumerator');
    var $nesting = [self].concat($parent_nesting), $Enumerator_for$1, $Enumerator_initialize$2, $Enumerator_each$3, $Enumerator_size$4, $Enumerator_with_index$5, $Enumerator_inspect$7;
    self.$$prototype.size = self.$$prototype.args = self.$$prototype.object = self.$$prototype.method = nil;
    self.$include($$($nesting, 'Enumerable'));
    self.$$prototype.$$is_enumerator = true;
    Opal.defs(self, '$for', $Enumerator_for$1 = function(object, $a, $b) {
      var $iter = $Enumerator_for$1.$$p, block = $iter || nil, $post_args, method, args, self = this;
      if($iter) $Enumerator_for$1.$$p = null;
      if($iter) $Enumerator_for$1.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      if($post_args.length > 0) {
        method = $post_args[0];
        $post_args.splice(0, 1);
      }
      if(method == null) {
        method = "each";
      }
      ;
      args = $post_args;
      ;
      var obj = self.$allocate();
      obj.object = object;
      obj.size = block;
      obj.method = method;
      obj.args = args;
      return obj;
      ;
    }, $Enumerator_for$1.$$arity = -2);
    Opal.def(self, '$initialize', $Enumerator_initialize$2 = function $$initialize($a) {
      var $iter = $Enumerator_initialize$2.$$p, block = $iter || nil, $post_args, self = this;
      if($iter) $Enumerator_initialize$2.$$p = null;
      if($iter) $Enumerator_initialize$2.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      if($truthy(block)) {
        self.object = $send($$($nesting, 'Generator'), 'new', [], block.$to_proc());
        self.method = "each";
        self.args = [];
        self.size = arguments[0] || nil;
        if($truthy(self.size)) {
          return (self.size = $$($nesting, 'Opal').$coerce_to(self.size, $$($nesting, 'Integer'), "to_int"));
        } else {
          return nil;
        }
        ;
      } else {
        self.object = arguments[0];
        self.method = arguments[1] || "each";
        self.args = $slice.call(arguments, 2);
        return (self.size = nil);
      }
      ;
    }, $Enumerator_initialize$2.$$arity = -1);
    Opal.def(self, '$each', $Enumerator_each$3 = function $$each($a) {
      var $iter = $Enumerator_each$3.$$p, block = $iter || nil, $post_args, args, $b, self = this;
      if($iter) $Enumerator_each$3.$$p = null;
      if($iter) $Enumerator_each$3.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if($truthy(($truthy($b = block['$nil?']()) ? args['$empty?']() : $b))) {
        return self;
      }
      ;
      args = $rb_plus(self.args, args);
      if($truthy(block['$nil?']())) {
        return $send(self.$class(), 'new', [self.object, self.method].concat(Opal.to_a(args)));
      }
      ;
      return $send(self.object, '__send__', [self.method].concat(Opal.to_a(args)), block.$to_proc());
    }, $Enumerator_each$3.$$arity = -1);
    Opal.def(self, '$size', $Enumerator_size$4 = function $$size() {
      var self = this;
      if($truthy($$($nesting, 'Proc')['$==='](self.size))) {
        return $send(self.size, 'call', Opal.to_a(self.args));
      } else {
        return self.size;
      }
    }, $Enumerator_size$4.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$with_index */0;
    /* destroyed: TreeShaking#shake_methods/$with_object */0;
    Opal.def(self, '$inspect', $Enumerator_inspect$7 = function $$inspect() {
      var self = this, result = nil;
      result = "" + "#<" + (self.$class()) + ": " + (self.object.$inspect()) + ":" + (self.method);
      if($truthy(self.args['$any?']())) {
        result = $rb_plus(result, "" + "(" + (self.args.$inspect()['$[]']($$($nesting, 'Range').$new(1, -2))) + ")");
      }
      ;
      return $rb_plus(result, ">");
    }, $Enumerator_inspect$7.$$arity = 0);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Generator');
      var $nesting = [self].concat($parent_nesting), $Generator_initialize$8, $Generator_each$9;
      self.$$prototype.block = nil;
      self.$include($$($nesting, 'Enumerable'));
      Opal.def(self, '$initialize', $Generator_initialize$8 = function $$initialize() {
        var $iter = $Generator_initialize$8.$$p, block = $iter || nil, self = this;
        if($iter) $Generator_initialize$8.$$p = null;
        if($iter) $Generator_initialize$8.$$p = null;
        ;
        if($truthy(block)) {

        } else {
          self.$raise($$($nesting, 'LocalJumpError'), "no block given");
        }
        ;
        return (self.block = block);
      }, $Generator_initialize$8.$$arity = 0);
      return (Opal.def(self, '$each', $Generator_each$9 = function $$each($a) {
        var $iter = $Generator_each$9.$$p, block = $iter || nil, $post_args, args, self = this, yielder = nil;
        if($iter) $Generator_each$9.$$p = null;
        if($iter) $Generator_each$9.$$p = null;
        ;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        yielder = $send($$($nesting, 'Yielder'), 'new', [], block.$to_proc());
        try {
          args.unshift(yielder);
          Opal.yieldX(self.block, args);
        } catch(e) {
          if(e === $breaker) {
            return $breaker.$v;
          } else {
            throw e;
          }
        }
        ;
        return self;
      }, $Generator_each$9.$$arity = -1), nil) && 'each';
    })($nesting[0], null, $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Yielder');
      var $nesting = [self].concat($parent_nesting), $Yielder_initialize$10, $Yielder_yield$11, $Yielder_$lt$lt$12;
      self.$$prototype.block = nil;
      Opal.def(self, '$initialize', $Yielder_initialize$10 = function $$initialize() {
        var $iter = $Yielder_initialize$10.$$p, block = $iter || nil, self = this;
        if($iter) $Yielder_initialize$10.$$p = null;
        if($iter) $Yielder_initialize$10.$$p = null;
        ;
        return (self.block = block);
      }, $Yielder_initialize$10.$$arity = 0);
      Opal.def(self, '$yield', $Yielder_yield$11 = function($a) {
        var $post_args, values, self = this;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        values = $post_args;
        ;
        var value = Opal.yieldX(self.block, values);
        if(value === $breaker) {
          throw $breaker;
        }
        return value;
        ;
      }, $Yielder_yield$11.$$arity = -1);
      return (Opal.def(self, '$<<', $Yielder_$lt$lt$12 = function($a) {
        var $post_args, values, self = this;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        values = $post_args;
        ;
        $send(self, 'yield', Opal.to_a(values));
        return self;
      }, $Yielder_$lt$lt$12.$$arity = -1), nil) && '<<';
    })($nesting[0], null, $nesting);
    return (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Lazy');
      var $nesting = [self].concat($parent_nesting), $Lazy_initialize$13, $Lazy_lazy$16, $Lazy_collect$17, $Lazy_collect_concat$19, $Lazy_drop$23, $Lazy_drop_while$25, $Lazy_enum_for$27, $Lazy_find_all$28, $Lazy_grep$30, $Lazy_reject$33, $Lazy_take$35, $Lazy_take_while$37, $Lazy_inspect$39;
      self.$$prototype.enumerator = nil;
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'StopLazyError');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'Exception'), $nesting);
      Opal.def(self, '$initialize', $Lazy_initialize$13 = function $$initialize(object, size) {
        var $iter = $Lazy_initialize$13.$$p, block = $iter || nil, $$14, self = this;
        if($iter) $Lazy_initialize$13.$$p = null;
        if($iter) $Lazy_initialize$13.$$p = null;
        ;
        if(size == null) {
          size = nil;
        }
        ;
        if((block !== nil)) {

        } else {
          self.$raise($$($nesting, 'ArgumentError'), "tried to call lazy new without a block");
        }
        ;
        self.enumerator = object;
        return $send(self, Opal.find_super_dispatcher(self, 'initialize', $Lazy_initialize$13, false), [size], ($$14 = function(yielder, $a) {
          var self = $$14.$$s || this, $post_args, each_args, $$15;
          if(yielder == null) {
            yielder = nil;
          }
          ;
          $post_args = Opal.slice.call(arguments, 1, arguments.length);
          each_args = $post_args;
          ;
          try {
            return $send(object, 'each', Opal.to_a(each_args), ($$15 = function($b) {
              var self = $$15.$$s || this, $post_args, args;
              $post_args = Opal.slice.call(arguments, 0, arguments.length);
              args = $post_args;
              ;
              args.unshift(yielder);
              Opal.yieldX(block, args);
              ;
            }, $$15.$$s = self, $$15.$$arity = -1, $$15));
          } catch($err) {
            if(Opal.rescue($err, [$$($nesting, 'Exception')])) {
              try {
                return nil;
              } finally {
                Opal.pop_exception();
              }
            } else {
              throw $err;
            }
          }
          ;
        }, $$14.$$s = self, $$14.$$arity = -2, $$14));
      }, $Lazy_initialize$13.$$arity = -2);
      /* destroyed: TreeShaking#shake_methods/$force */0;
      /* destroyed: TreeShaking#shake_methods/$lazy */0;
      Opal.def(self, '$collect', $Lazy_collect$17 = function $$collect() {
        var $iter = $Lazy_collect$17.$$p, block = $iter || nil, $$18, self = this;
        if($iter) $Lazy_collect$17.$$p = null;
        if($iter) $Lazy_collect$17.$$p = null;
        ;
        if($truthy(block)) {

        } else {
          self.$raise($$($nesting, 'ArgumentError'), "tried to call lazy map without a block");
        }
        ;
        return $send($$($nesting, 'Lazy'), 'new', [self, self.$enumerator_size()], ($$18 = function(enum$, $a) {
          var self = $$18.$$s || this, $post_args, args;
          if(enum$ == null) {
            enum$ = nil;
          }
          ;
          $post_args = Opal.slice.call(arguments, 1, arguments.length);
          args = $post_args;
          ;
          var value = Opal.yieldX(block, args);
          enum$.$yield(value);
          ;
        }, $$18.$$s = self, $$18.$$arity = -2, $$18));
      }, $Lazy_collect$17.$$arity = 0);
      /* destroyed: TreeShaking#shake_methods/$collect_concat */0;
      /* destroyed: TreeShaking#shake_methods/$drop */0;
      /* destroyed: TreeShaking#shake_methods/$drop_while */0;
      Opal.def(self, '$enum_for', $Lazy_enum_for$27 = function $$enum_for($a, $b) {
        var $iter = $Lazy_enum_for$27.$$p, block = $iter || nil, $post_args, method, args, self = this;
        if($iter) $Lazy_enum_for$27.$$p = null;
        if($iter) $Lazy_enum_for$27.$$p = null;
        ;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        if($post_args.length > 0) {
          method = $post_args[0];
          $post_args.splice(0, 1);
        }
        if(method == null) {
          method = "each";
        }
        ;
        args = $post_args;
        ;
        return $send(self.$class(), 'for', [self, method].concat(Opal.to_a(args)), block.$to_proc());
      }, $Lazy_enum_for$27.$$arity = -1);
      /* destroyed: TreeShaking#shake_methods/$find_all */0;
      /* destroyed: TreeShaking#shake_methods/$flat_map */0;
      /* destroyed: TreeShaking#shake_methods/$grep */0;
      Opal.alias(self, "map", "collect");
      /* destroyed: TreeShaking#shake_methods/$select */0;
      Opal.def(self, '$reject', $Lazy_reject$33 = function $$reject() {
        var $iter = $Lazy_reject$33.$$p, block = $iter || nil, $$34, self = this;
        if($iter) $Lazy_reject$33.$$p = null;
        if($iter) $Lazy_reject$33.$$p = null;
        ;
        if($truthy(block)) {

        } else {
          self.$raise($$($nesting, 'ArgumentError'), "tried to call lazy reject without a block");
        }
        ;
        return $send($$($nesting, 'Lazy'), 'new', [self, nil], ($$34 = function(enum$, $a) {
          var self = $$34.$$s || this, $post_args, args;
          if(enum$ == null) {
            enum$ = nil;
          }
          ;
          $post_args = Opal.slice.call(arguments, 1, arguments.length);
          args = $post_args;
          ;
          var value = Opal.yieldX(block, args);
          if($falsy(value)) {
            $send(enum$, 'yield', Opal.to_a(args));
          }
          ;
        }, $$34.$$s = self, $$34.$$arity = -2, $$34));
      }, $Lazy_reject$33.$$arity = 0);
      Opal.def(self, '$take', $Lazy_take$35 = function $$take(n) {
        var $$36, self = this, current_size = nil, set_size = nil, taken = nil;
        n = $$($nesting, 'Opal').$coerce_to(n, $$($nesting, 'Integer'), "to_int");
        if($truthy($rb_lt(n, 0))) {
          self.$raise($$($nesting, 'ArgumentError'), "attempt to take negative size");
        }
        ;
        current_size = self.$enumerator_size();
        set_size = (function() {
          if($truthy($$($nesting, 'Integer')['$==='](current_size))) {
            if($truthy($rb_lt(n, current_size))) {
              return n;
            } else {
              return current_size;
            }
          } else {
            return current_size;
          }
          ;
          return nil;
        })();
        taken = 0;
        return $send($$($nesting, 'Lazy'), 'new', [self, set_size], ($$36 = function(enum$, $a) {
          var self = $$36.$$s || this, $post_args, args;
          if(enum$ == null) {
            enum$ = nil;
          }
          ;
          $post_args = Opal.slice.call(arguments, 1, arguments.length);
          args = $post_args;
          ;
          if($truthy($rb_lt(taken, n))) {
            $send(enum$, 'yield', Opal.to_a(args));
            return (taken = $rb_plus(taken, 1));
          } else {
            return self.$raise($$($nesting, 'StopLazyError'));
          }
          ;
        }, $$36.$$s = self, $$36.$$arity = -2, $$36));
      }, $Lazy_take$35.$$arity = 1);
      /* destroyed: TreeShaking#shake_methods/$take_while */0;
      /* destroyed: TreeShaking#shake_methods/$to_enum */0;
      return (Opal.def(self, '$inspect', $Lazy_inspect$39 = function $$inspect() {
        var self = this;
        return "" + "#<" + (self.$class()) + ": " + (self.enumerator.$inspect()) + ">";
      }, $Lazy_inspect$39.$$arity = 0), nil) && 'inspect';
    })($nesting[0], self, $nesting);
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/numeric"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/comparable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Numeric');
    var $nesting = [self].concat($parent_nesting), $Numeric_coerce$1, $Numeric___coerced__$2, $Numeric_$lt_eq_gt$3, $Numeric_$plus$$4, $Numeric_$minus$$5, $Numeric_$percent$6, $Numeric_abs$7, $Numeric_abs2$8, $Numeric_angle$9, $Numeric_ceil$10, $Numeric_conj$11, $Numeric_denominator$12, $Numeric_div$13, $Numeric_divmod$14, $Numeric_fdiv$15, $Numeric_floor$16, $Numeric_i$17, $Numeric_imag$18, $Numeric_integer$ques$19, $Numeric_nonzero$ques$20, $Numeric_numerator$21, $Numeric_polar$22, $Numeric_quo$23, $Numeric_real$24, $Numeric_real$ques$25, $Numeric_rect$26, $Numeric_round$27, $Numeric_to_c$28, $Numeric_to_int$29, $Numeric_truncate$30, $Numeric_zero$ques$31, $Numeric_positive$ques$32, $Numeric_negative$ques$33, $Numeric_dup$34, $Numeric_clone$35, $Numeric_finite$ques$36, $Numeric_infinite$ques$37;
    self.$include($$($nesting, 'Comparable'));
    Opal.def(self, '$coerce', $Numeric_coerce$1 = function $$coerce(other) {
      var self = this;
      if($truthy(other['$instance_of?'](self.$class()))) {
        return [other, self];
      }
      ;
      return [self.$Float(other), self.$Float(self)];
    }, $Numeric_coerce$1.$$arity = 1);
    Opal.def(self, '$__coerced__', $Numeric___coerced__$2 = function $$__coerced__(method, other) {
      var $a, $b, self = this, a = nil, b = nil, $case = nil;
      if($truthy(other['$respond_to?']("coerce"))) {
        $b = other.$coerce(self), $a = Opal.to_ary($b), (a = ($a[0] == null ? nil : $a[0])), (b = ($a[1] == null ? nil : $a[1])), $b;
        return a.$__send__(method, b);
      } else {
        return (function() {
          $case = method;
          if("+"['$===']($case) || "-"['$===']($case) || "*"['$===']($case) || "/"['$===']($case) || "%"['$===']($case) || "&"['$===']($case) || "|"['$===']($case) || "^"['$===']($case) || "**"['$===']($case)) {
            return self.$raise($$($nesting, 'TypeError'), "" + (other.$class()) + " can't be coerced into Numeric");
          } else if(">"['$===']($case) || ">="['$===']($case) || "<"['$===']($case) || "<="['$===']($case) || "<=>"['$===']($case)) {
            return self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + (self.$class()) + " with " + (other.$class()) + " failed");
          } else {
            return nil;
          }
        })();
      }
    }, $Numeric___coerced__$2.$$arity = 2);
    Opal.def(self, '$<=>', $Numeric_$lt_eq_gt$3 = function(other) {
      var self = this;
      if($truthy(self['$equal?'](other))) {
        return 0;
      }
      ;
      return nil;
    }, $Numeric_$lt_eq_gt$3.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$+@ */0;
    Opal.def(self, '$-@', $Numeric_$minus$$5 = function() {
      var self = this;
      return $rb_minus(0, self);
    }, $Numeric_$minus$$5.$$arity = 0);
    Opal.def(self, '$%', $Numeric_$percent$6 = function(other) {
      var self = this;
      return $rb_minus(self, $rb_times(other, self.$div(other)));
    }, $Numeric_$percent$6.$$arity = 1);
    Opal.def(self, '$abs', $Numeric_abs$7 = function $$abs() {
      var self = this;
      if($rb_lt(self, 0)) {
        return self['$-@']();
      } else {
        return self;
      }
    }, $Numeric_abs$7.$$arity = 0);
    Opal.def(self, '$abs2', $Numeric_abs2$8 = function $$abs2() {
      var self = this;
      return $rb_times(self, self);
    }, $Numeric_abs2$8.$$arity = 0);
    Opal.def(self, '$angle', $Numeric_angle$9 = function $$angle() {
      var self = this;
      if($rb_lt(self, 0)) {
        return $$$($$($nesting, 'Math'), 'PI');
      } else {
        return 0;
      }
    }, $Numeric_angle$9.$$arity = 0);
    Opal.alias(self, "arg", "angle");
    Opal.def(self, '$ceil', $Numeric_ceil$10 = function $$ceil(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      return self.$to_f().$ceil(ndigits);
    }, $Numeric_ceil$10.$$arity = -1);
    Opal.def(self, '$conj', $Numeric_conj$11 = function $$conj() {
      var self = this;
      return self;
    }, $Numeric_conj$11.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$conjugate */0;
    Opal.def(self, '$denominator', $Numeric_denominator$12 = function $$denominator() {
      var self = this;
      return self.$to_r().$denominator();
    }, $Numeric_denominator$12.$$arity = 0);
    Opal.def(self, '$div', $Numeric_div$13 = function $$div(other) {
      var self = this;
      if(other['$=='](0)) {
        self.$raise($$($nesting, 'ZeroDivisionError'), "divided by o");
      }
      ;
      return $rb_divide(self, other).$floor();
    }, $Numeric_div$13.$$arity = 1);
    Opal.def(self, '$divmod', $Numeric_divmod$14 = function $$divmod(other) {
      var self = this;
      return [self.$div(other), self['$%'](other)];
    }, $Numeric_divmod$14.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$fdiv */0;
    Opal.def(self, '$floor', $Numeric_floor$16 = function $$floor(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      return self.$to_f().$floor(ndigits);
    }, $Numeric_floor$16.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$i */0;
    Opal.def(self, '$imag', $Numeric_imag$18 = function $$imag() {
      var self = this;
      return 0;
    }, $Numeric_imag$18.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$imaginary */0;
    /* destroyed: TreeShaking#shake_methods/$integer? */0;
    /* destroyed: TreeShaking#shake_methods/$magnitude */0;
    /* destroyed: TreeShaking#shake_methods/$modulo */0;
    /* destroyed: TreeShaking#shake_methods/$nonzero? */0;
    Opal.def(self, '$numerator', $Numeric_numerator$21 = function $$numerator() {
      var self = this;
      return self.$to_r().$numerator();
    }, $Numeric_numerator$21.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$phase */0;
    Opal.def(self, '$polar', $Numeric_polar$22 = function $$polar() {
      var self = this;
      return [self.$abs(), self.$arg()];
    }, $Numeric_polar$22.$$arity = 0);
    Opal.def(self, '$quo', $Numeric_quo$23 = function $$quo(other) {
      var self = this;
      return $rb_divide($$($nesting, 'Opal')['$coerce_to!'](self, $$($nesting, 'Rational'), "to_r"), other);
    }, $Numeric_quo$23.$$arity = 1);
    Opal.def(self, '$real', $Numeric_real$24 = function $$real() {
      var self = this;
      return self;
    }, $Numeric_real$24.$$arity = 0);
    Opal.def(self, '$real?', $Numeric_real$ques$25 = function() {
      var self = this;
      return true;
    }, $Numeric_real$ques$25.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$rect */0;
    /* destroyed: TreeShaking#shake_methods/$rectangular */0;
    Opal.def(self, '$round', $Numeric_round$27 = function $$round(digits) {
      var self = this;
      ;
      return self.$to_f().$round(digits);
    }, $Numeric_round$27.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$to_c */0;
    Opal.def(self, '$to_int', $Numeric_to_int$29 = function $$to_int() {
      var self = this;
      return self.$to_i();
    }, $Numeric_to_int$29.$$arity = 0);
    Opal.def(self, '$truncate', $Numeric_truncate$30 = function $$truncate(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      return self.$to_f().$truncate(ndigits);
    }, $Numeric_truncate$30.$$arity = -1);
    Opal.def(self, '$zero?', $Numeric_zero$ques$31 = function() {
      var self = this;
      return self['$=='](0);
    }, $Numeric_zero$ques$31.$$arity = 0);
    Opal.def(self, '$positive?', $Numeric_positive$ques$32 = function() {
      var self = this;
      return $rb_gt(self, 0);
    }, $Numeric_positive$ques$32.$$arity = 0);
    Opal.def(self, '$negative?', $Numeric_negative$ques$33 = function() {
      var self = this;
      return $rb_lt(self, 0);
    }, $Numeric_negative$ques$33.$$arity = 0);
    Opal.def(self, '$dup', $Numeric_dup$34 = function $$dup() {
      var self = this;
      return self;
    }, $Numeric_dup$34.$$arity = 0);
    Opal.def(self, '$clone', $Numeric_clone$35 = function $$clone($kwargs) {
      var freeze, self = this;
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      freeze = $kwargs.$$smap["freeze"];
      if(freeze == null) {
        freeze = true;
      }
      ;
      return self;
    }, $Numeric_clone$35.$$arity = -1);
    Opal.def(self, '$finite?', $Numeric_finite$ques$36 = function() {
      var self = this;
      return true;
    }, $Numeric_finite$ques$36.$$arity = 0);
    return (Opal.def(self, '$infinite?', $Numeric_infinite$ques$37 = function() {
      var self = this;
      return nil;
    }, $Numeric_infinite$ques$37.$$arity = 0), nil) && 'infinite?';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/array"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $hash2 = Opal.hash2, $send = Opal.send, $gvars = Opal.gvars;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/enumerable");
  self.$require("corelib/numeric");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Array');
    var $nesting = [self].concat($parent_nesting), $Array_$$$1, $Array_initialize$2, $Array_try_convert$3, $Array_$$4, $Array_$$5, $Array_$$6, $Array_$plus$7, $Array_$minus$8, $Array_$lt$lt$9, $Array_$lt_eq_gt$10, $Array_$eq_eq$11, $Array_$$$12, $Array_$$$eq$13, $Array_any$ques$14, $Array_assoc$15, $Array_at$16, $Array_bsearch_index$17, $Array_bsearch$18, $Array_cycle$19, $Array_clear$21, $Array_count$22, $Array_initialize_copy$23, $Array_collect$24, $Array_collect$excl$26, $Array_combination$28, $Array_repeated_combination$30, $Array_compact$32, $Array_compact$excl$33, $Array_concat$34, $Array_delete$37, $Array_delete_at$38, $Array_delete_if$39, $Array_dig$41, $Array_drop$42, $Array_dup$43, $Array_each$44, $Array_each_index$46, $Array_empty$ques$48, $Array_eql$ques$49, $Array_fetch$50, $Array_fill$51, $Array_first$52, $Array_flatten$53, $Array_flatten$excl$54, $Array_hash$55, $Array_include$ques$56, $Array_index$57, $Array_insert$58, $Array_inspect$59, $Array_join$60, $Array_keep_if$61, $Array_last$63, $Array_length$64, $Array_max$65, $Array_min$66, $Array_permutation$67, $Array_repeated_permutation$69, $Array_pop$71, $Array_product$72, $Array_push$73, $Array_rassoc$74, $Array_reject$75, $Array_reject$excl$77, $Array_replace$79, $Array_reverse$80, $Array_reverse$excl$81, $Array_reverse_each$82, $Array_rindex$84, $Array_rotate$85, $Array_rotate$excl$86, $Array_sample$89, $Array_select$90, $Array_select$excl$92, $Array_shift$94, $Array_shuffle$95, $Array_shuffle$excl$96, $Array_slice$excl$97, $Array_sort$98, $Array_sort$excl$99, $Array_sort_by$excl$100, $Array_take$102, $Array_take_while$103, $Array_to_a$104, $Array_to_h$105, $Array_transpose$106, $Array_uniq$109, $Array_uniq$excl$110, $Array_unshift$111, $Array_values_at$112, $Array_zip$115, $Array_inherited$116, $Array_instance_variables$117, $Array_pack$119;
    self.$include($$($nesting, 'Enumerable'));
    Opal.defineProperty(self.$$prototype, '$$is_array', true);
        function toArraySubclass(obj, klass) {
      if(klass.$$name === Opal.Array) {
        return obj;
      } else {
        return klass.$allocate().$replace((obj).$to_a());
      }
    }
    ;
    Opal.defs(self, '$[]', $Array_$$$1 = function($a) {
      var $post_args, objects, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      objects = $post_args;
      ;
      return toArraySubclass(objects, self);
      ;
    }, $Array_$$$1.$$arity = -1);
    Opal.def(self, '$initialize', $Array_initialize$2 = function $$initialize(size, obj) {
      var $iter = $Array_initialize$2.$$p, block = $iter || nil, self = this;
      if($iter) $Array_initialize$2.$$p = null;
      if($iter) $Array_initialize$2.$$p = null;
      ;
      if(size == null) {
        size = nil;
      }
      ;
      if(obj == null) {
        obj = nil;
      }
      ;
      if(obj !== nil && block !== nil) {
        self.$warn("warning: block supersedes default value argument");
      }
      if(size > $$$($$($nesting, 'Integer'), 'MAX')) {
        self.$raise($$($nesting, 'ArgumentError'), "array size too big");
      }
      if(arguments.length > 2) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "wrong number of arguments (" + (arguments.length) + " for 0..2)");
      }
      if(arguments.length === 0) {
        self.splice(0, self.length);
        return self;
      }
      if(arguments.length === 1) {
        if(size.$$is_array) {
          self.$replace(size.$to_a());
          return self;
        } else if(size['$respond_to?']("to_ary")) {
          self.$replace(size.$to_ary());
          return self;
        }
      }
      size = $$($nesting, 'Opal').$coerce_to(size, $$($nesting, 'Integer'), "to_int");
      if(size < 0) {
        self.$raise($$($nesting, 'ArgumentError'), "negative array size");
      }
      self.splice(0, self.length);
      var i, value;
      if(block === nil) {
        for(i = 0; i < size; i++) {
          self.push(obj);
        }
      } else {
        for(i = 0, value; i < size; i++) {
          value = block(i);
          self[i] = value;
        }
      }
      return self;
      ;
    }, $Array_initialize$2.$$arity = -1);
    Opal.defs(self, '$try_convert', $Array_try_convert$3 = function $$try_convert(obj) {
      var self = this;
      return $$($nesting, 'Opal')['$coerce_to?'](obj, $$($nesting, 'Array'), "to_ary");
    }, $Array_try_convert$3.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$& */0;
    Opal.def(self, '$|', $Array_$$5 = function(other) {
      var self = this;
      other = (function() {
        if($truthy($$($nesting, 'Array')['$==='](other))) {
          return other.$to_a();
        } else {
          return $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Array'), "to_ary").$to_a();
        }
        ;
        return nil;
      })();
      var hash = $hash2([], { }), i, length, item;
      for(i = 0, length = self.length; i < length; i++) {
        Opal.hash_put(hash, self[i], true);
      }
      for(i = 0, length = other.length; i < length; i++) {
        Opal.hash_put(hash, other[i], true);
      }
      return hash.$keys();
      ;
    }, $Array_$$5.$$arity = 1);
    Opal.def(self, '$*', $Array_$$6 = function(other) {
      var self = this;
      if($truthy(other['$respond_to?']("to_str"))) {
        return self.$join(other.$to_str());
      }
      ;
      other = $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Integer'), "to_int");
      if($truthy(other < 0)) {
        self.$raise($$($nesting, 'ArgumentError'), "negative argument");
      }
      ;
      var result = [], converted = self.$to_a();
      for(var i = 0; i < other; i++) {
        result = result.concat(converted);
      }
      return toArraySubclass(result, self.$class());
      ;
    }, $Array_$$6.$$arity = 1);
    Opal.def(self, '$+', $Array_$plus$7 = function(other) {
      var self = this;
      other = (function() {
        if($truthy($$($nesting, 'Array')['$==='](other))) {
          return other.$to_a();
        } else {
          return $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Array'), "to_ary").$to_a();
        }
        ;
        return nil;
      })();
      return self.concat(other);
      ;
    }, $Array_$plus$7.$$arity = 1);
    Opal.def(self, '$-', $Array_$minus$8 = function(other) {
      var self = this;
      other = (function() {
        if($truthy($$($nesting, 'Array')['$==='](other))) {
          return other.$to_a();
        } else {
          return $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Array'), "to_ary").$to_a();
        }
        ;
        return nil;
      })();
      if($truthy(self.length === 0)) {
        return [];
      }
      ;
      if($truthy(other.length === 0)) {
        return self.slice();
      }
      ;
      var result = [], hash = $hash2([], { }), i, length, item;
      for(i = 0, length = other.length; i < length; i++) {
        Opal.hash_put(hash, other[i], true);
      }
      for(i = 0, length = self.length; i < length; i++) {
        item = self[i];
        if(Opal.hash_get(hash, item) === undefined) {
          result.push(item);
        }
      }
      return result;
      ;
    }, $Array_$minus$8.$$arity = 1);
    Opal.def(self, '$<<', $Array_$lt$lt$9 = function(object) {
      var self = this;
      self.push(object);
      return self;
    }, $Array_$lt$lt$9.$$arity = 1);
    Opal.def(self, '$<=>', $Array_$lt_eq_gt$10 = function(other) {
      var self = this;
      if($truthy($$($nesting, 'Array')['$==='](other))) {
        other = other.$to_a();
      } else if($truthy(other['$respond_to?']("to_ary"))) {
        other = other.$to_ary().$to_a();
      } else {
        return nil;
      }
      ;
      if(self.$hash() === other.$hash()) {
        return 0;
      }
      var count = Math.min(self.length, other.length);
      for(var i = 0; i < count; i++) {
        var tmp = (self[i])['$<=>'](other[i]);
        if(tmp !== 0) {
          return tmp;
        }
      }
      return (self.length)['$<=>'](other.length);
      ;
    }, $Array_$lt_eq_gt$10.$$arity = 1);
    Opal.def(self, '$==', $Array_$eq_eq$11 = function(other) {
      var self = this;
      var recursed = { };
            function _eqeq(array, other) {
        var i, length, a, b;
        if(array === other) return true;
        if(!other.$$is_array) {
          if($$($nesting, 'Opal')['$respond_to?'](other, "to_ary")) {
            return (other)['$=='](array);
          } else {
            return false;
          }
        }
        if(array.$$constructor !== Array) array = (array).$to_a();
        if(other.$$constructor !== Array) other = (other).$to_a();
        if(array.length !== other.length) {
          return false;
        }
        recursed[(array).$object_id()] = true;
        for(i = 0, length = array.length; i < length; i++) {
          a = array[i];
          b = other[i];
          if(a.$$is_array) {
            if(b.$$is_array && b.length !== a.length) {
              return false;
            }
            if(!recursed.hasOwnProperty((a).$object_id())) {
              if(!_eqeq(a, b)) {
                return false;
              }
            }
          } else {
            if(!(a)['$=='](b)) {
              return false;
            }
          }
        }
        return true;
      }
      return _eqeq(self, other);
    }, $Array_$eq_eq$11.$$arity = 1);
        function $array_slice_range(self, index) {
      var size = self.length, exclude, from, to, result;
      exclude = index.excl;
      from = Opal.Opal.$coerce_to(index.begin, Opal.Integer, 'to_int');
      to = Opal.Opal.$coerce_to(index.end, Opal.Integer, 'to_int');
      if(from < 0) {
        from += size;
        if(from < 0) {
          return nil;
        }
      }
      if(from > size) {
        return nil;
      }
      if(to < 0) {
        to += size;
        if(to < 0) {
          return [];
        }
      }
      if(!exclude) {
        to += 1;
      }
      result = self.slice(from, to);
      return toArraySubclass(result, self.$class());
    }
        function $array_slice_index_length(self, index, length) {
      var size = self.length, exclude, from, to, result;
      index = Opal.Opal.$coerce_to(index, Opal.Integer, 'to_int');
      if(index < 0) {
        index += size;
        if(index < 0) {
          return nil;
        }
      }
      if(length === undefined) {
        if(index >= size || index < 0) {
          return nil;
        }
        return self[index];
      } else {
        length = Opal.Opal.$coerce_to(length, Opal.Integer, 'to_int');
        if(length < 0 || index > size || index < 0) {
          return nil;
        }
        result = self.slice(index, index + length);
      }
      return toArraySubclass(result, self.$class());
    }
    ;
    Opal.def(self, '$[]', $Array_$$$12 = function(index, length) {
      var self = this;
      ;
      if(index.$$is_range) {
        return $array_slice_range(self, index);
      } else {
        return $array_slice_index_length(self, index, length);
      }
      ;
    }, $Array_$$$12.$$arity = -2);
    Opal.def(self, '$[]=', $Array_$$$eq$13 = function(index, value, extra) {
      var self = this, data = nil, length = nil;
      ;
      var i, size = self.length;
      ;
      if($truthy($$($nesting, 'Range')['$==='](index))) {
        data = (function() {
          if($truthy($$($nesting, 'Array')['$==='](value))) {
            return value.$to_a();
          } else if($truthy(value['$respond_to?']("to_ary"))) {
            return value.$to_ary().$to_a();
          } else {
            return [value];
          }
          ;
          return nil;
        })();
        var exclude = index.excl, from = $$($nesting, 'Opal').$coerce_to(index.begin, $$($nesting, 'Integer'), "to_int"), to = $$($nesting, 'Opal').$coerce_to(index.end, $$($nesting, 'Integer'), "to_int");
        if(from < 0) {
          from += size;
          if(from < 0) {
            self.$raise($$($nesting, 'RangeError'), "" + (index.$inspect()) + " out of range");
          }
        }
        if(to < 0) {
          to += size;
        }
        if(!exclude) {
          to += 1;
        }
        if(from > size) {
          for(i = size; i < from; i++) {
            self[i] = nil;
          }
        }
        if(to < 0) {
          self.splice.apply(self, [from, 0].concat(data));
        } else {
          self.splice.apply(self, [from, to - from].concat(data));
        }
        return value;
        ;
      } else {
        if($truthy(extra === undefined)) {
          length = 1;
        } else {
          length = value;
          value = extra;
          data = (function() {
            if($truthy($$($nesting, 'Array')['$==='](value))) {
              return value.$to_a();
            } else if($truthy(value['$respond_to?']("to_ary"))) {
              return value.$to_ary().$to_a();
            } else {
              return [value];
            }
            ;
            return nil;
          })();
        }
        ;
        var old;
        index = $$($nesting, 'Opal').$coerce_to(index, $$($nesting, 'Integer'), "to_int");
        length = $$($nesting, 'Opal').$coerce_to(length, $$($nesting, 'Integer'), "to_int");
        if(index < 0) {
          old = index;
          index += size;
          if(index < 0) {
            self.$raise($$($nesting, 'IndexError'), "" + "index " + (old) + " too small for array; minimum " + (-self.length));
          }
        }
        if(length < 0) {
          self.$raise($$($nesting, 'IndexError'), "" + "negative length (" + (length) + ")");
        }
        if(index > size) {
          for(i = size; i < index; i++) {
            self[i] = nil;
          }
        }
        if(extra === undefined) {
          self[index] = value;
        } else {
          self.splice.apply(self, [index, length].concat(data));
        }
        return value;
        ;
      }
      ;
    }, $Array_$$$eq$13.$$arity = -3);
    Opal.def(self, '$any?', $Array_any$ques$14 = function(pattern) {
      var $iter = $Array_any$ques$14.$$p, block = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Array_any$ques$14.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($iter) $Array_any$ques$14.$$p = null;
      ;
      ;
      if(self.length === 0) return false;
      return $send(self, Opal.find_super_dispatcher(self, 'any?', $Array_any$ques$14, false), $zuper, $iter);
    }, $Array_any$ques$14.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$assoc */0;
    /* destroyed: TreeShaking#shake_methods/$at */0;
    Opal.def(self, '$bsearch_index', $Array_bsearch_index$17 = function $$bsearch_index() {
      var $iter = $Array_bsearch_index$17.$$p, block = $iter || nil, self = this;
      if($iter) $Array_bsearch_index$17.$$p = null;
      if($iter) $Array_bsearch_index$17.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("bsearch_index");
      }
      ;
      var min = 0, max = self.length, mid, val, ret, smaller = false, satisfied = nil;
      while(min < max) {
        mid = min + Math.floor((max - min) / 2);
        val = self[mid];
        ret = Opal.yield1(block, val);
        if(ret === true) {
          satisfied = mid;
          smaller = true;
        } else if(ret === false || ret === nil) {
          smaller = false;
        } else if(ret.$$is_number) {
          if(ret === 0) {
            return mid;
          }
          smaller = (ret < 0);
        } else {
          self.$raise($$($nesting, 'TypeError'), "" + "wrong argument type " + ((ret).$class()) + " (must be numeric, true, false or nil)");
        }
        if(smaller) {
          max = mid;
        } else {
          min = mid + 1;
        }
      }
      return satisfied;
      ;
    }, $Array_bsearch_index$17.$$arity = 0);
    Opal.def(self, '$bsearch', $Array_bsearch$18 = function $$bsearch() {
      var $iter = $Array_bsearch$18.$$p, block = $iter || nil, self = this, index = nil;
      if($iter) $Array_bsearch$18.$$p = null;
      if($iter) $Array_bsearch$18.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("bsearch");
      }
      ;
      index = $send(self, 'bsearch_index', [], block.$to_proc());
      if(index != null && index.$$is_number) {
        return self[index];
      } else {
        return index;
      }
      ;
    }, $Array_bsearch$18.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$cycle */0;
    Opal.def(self, '$clear', $Array_clear$21 = function $$clear() {
      var self = this;
      self.splice(0, self.length);
      return self;
    }, $Array_clear$21.$$arity = 0);
    Opal.def(self, '$count', $Array_count$22 = function $$count(object) {
      var $iter = $Array_count$22.$$p, block = $iter || nil, $a, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Array_count$22.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($iter) $Array_count$22.$$p = null;
      ;
      if(object == null) {
        object = nil;
      }
      ;
      if($truthy(($truthy($a = object) ? $a : block))) {
        return $send(self, Opal.find_super_dispatcher(self, 'count', $Array_count$22, false), $zuper, $iter);
      } else {
        return self.$size();
      }
      ;
    }, $Array_count$22.$$arity = -1);
    Opal.def(self, '$initialize_copy', $Array_initialize_copy$23 = function $$initialize_copy(other) {
      var self = this;
      return self.$replace(other);
    }, $Array_initialize_copy$23.$$arity = 1);
    Opal.def(self, '$collect', $Array_collect$24 = function $$collect() {
      var $iter = $Array_collect$24.$$p, block = $iter || nil, $$25, self = this;
      if($iter) $Array_collect$24.$$p = null;
      if($iter) $Array_collect$24.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["collect"], ($$25 = function() {
          var self = $$25.$$s || this;
          return self.$size();
        }, $$25.$$s = self, $$25.$$arity = 0, $$25));
      }
      ;
      var result = [];
      for(var i = 0, length = self.length; i < length; i++) {
        var value = Opal.yield1(block, self[i]);
        result.push(value);
      }
      return result;
      ;
    }, $Array_collect$24.$$arity = 0);
    Opal.def(self, '$collect!', $Array_collect$excl$26 = function() {
      var $iter = $Array_collect$excl$26.$$p, block = $iter || nil, $$27, self = this;
      if($iter) $Array_collect$excl$26.$$p = null;
      if($iter) $Array_collect$excl$26.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["collect!"], ($$27 = function() {
          var self = $$27.$$s || this;
          return self.$size();
        }, $$27.$$s = self, $$27.$$arity = 0, $$27));
      }
      ;
      for(var i = 0, length = self.length; i < length; i++) {
        var value = Opal.yield1(block, self[i]);
        self[i] = value;
      }
      ;
      return self;
    }, $Array_collect$excl$26.$$arity = 0);
        function binomial_coefficient(n, k) {
      if(n === k || k === 0) {
        return 1;
      }
      if(k > 0 && n > k) {
        return binomial_coefficient(n - 1, k - 1) + binomial_coefficient(n - 1, k);
      }
      return 0;
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$combination */0;
    /* destroyed: TreeShaking#shake_methods/$repeated_combination */0;
    /* destroyed: TreeShaking#shake_methods/$compact */0;
    Opal.def(self, '$compact!', $Array_compact$excl$33 = function() {
      var self = this;
      var original = self.length;
      for(var i = 0, length = self.length; i < length; i++) {
        if(self[i] === nil) {
          self.splice(i, 1);
          length--;
          i--;
        }
      }
      return self.length === original ? nil : self;
    }, $Array_compact$excl$33.$$arity = 0);
    Opal.def(self, '$concat', $Array_concat$34 = function $$concat($a) {
      var $post_args, others, $$35, $$36, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      others = $post_args;
      ;
      others = $send(others, 'map', [], ($$35 = function(other) {
        var self = $$35.$$s || this;
        if(other == null) {
          other = nil;
        }
        ;
        other = (function() {
          if($truthy($$($nesting, 'Array')['$==='](other))) {
            return other.$to_a();
          } else {
            return $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Array'), "to_ary").$to_a();
          }
          ;
          return nil;
        })();
        if($truthy(other['$equal?'](self))) {
          other = other.$dup();
        }
        ;
        return other;
      }, $$35.$$s = self, $$35.$$arity = 1, $$35));
      $send(others, 'each', [], ($$36 = function(other) {
        var self = $$36.$$s || this;
        if(other == null) {
          other = nil;
        }
        ;
        for(var i = 0, length = other.length; i < length; i++) {
          self.push(other[i]);
        }
        ;
      }, $$36.$$s = self, $$36.$$arity = 1, $$36));
      return self;
    }, $Array_concat$34.$$arity = -1);
    Opal.def(self, '$delete', $Array_delete$37 = function(object) {
      var $iter = $Array_delete$37.$$p, $yield = $iter || nil, self = this;
      if($iter) $Array_delete$37.$$p = null;
      var original = self.length;
      for(var i = 0, length = original; i < length; i++) {
        if((self[i])['$=='](object)) {
          self.splice(i, 1);
          length--;
          i--;
        }
      }
      if(self.length === original) {
        if(($yield !== nil)) {
          return Opal.yieldX($yield, []);
        }
        return nil;
      }
      return object;
    }, $Array_delete$37.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$delete_at */0;
    /* destroyed: TreeShaking#shake_methods/$delete_if */0;
    Opal.def(self, '$dig', $Array_dig$41 = function $$dig(idx, $a) {
      var $post_args, idxs, self = this, item = nil;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      idxs = $post_args;
      ;
      item = self['$[]'](idx);
      if(item === nil || idxs.length === 0) {
        return item;
      }
      ;
      if($truthy(item['$respond_to?']("dig"))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + (item.$class()) + " does not have #dig method");
      }
      ;
      return $send(item, 'dig', Opal.to_a(idxs));
    }, $Array_dig$41.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$drop */0;
    Opal.def(self, '$dup', $Array_dup$43 = function $$dup() {
      var $iter = $Array_dup$43.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Array_dup$43.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if(self.$$class === Opal.Array && self.$$class.$allocate.$$pristine && self.$copy_instance_variables.$$pristine && self.$initialize_dup.$$pristine) {
        return self.slice(0);
      }
      ;
      return $send(self, Opal.find_super_dispatcher(self, 'dup', $Array_dup$43, false), $zuper, $iter);
    }, $Array_dup$43.$$arity = 0);
    Opal.def(self, '$each', $Array_each$44 = function $$each() {
      var $iter = $Array_each$44.$$p, block = $iter || nil, $$45, self = this;
      if($iter) $Array_each$44.$$p = null;
      if($iter) $Array_each$44.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each"], ($$45 = function() {
          var self = $$45.$$s || this;
          return self.$size();
        }, $$45.$$s = self, $$45.$$arity = 0, $$45));
      }
      ;
      for(var i = 0, length = self.length; i < length; i++) {
        var value = Opal.yield1(block, self[i]);
      }
      ;
      return self;
    }, $Array_each$44.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$each_index */0;
    Opal.def(self, '$empty?', $Array_empty$ques$48 = function() {
      var self = this;
      return self.length === 0;
    }, $Array_empty$ques$48.$$arity = 0);
    Opal.def(self, '$eql?', $Array_eql$ques$49 = function(other) {
      var self = this;
      var recursed = { };
            function _eql(array, other) {
        var i, length, a, b;
        if(!other.$$is_array) {
          return false;
        }
        other = other.$to_a();
        if(array.length !== other.length) {
          return false;
        }
        recursed[(array).$object_id()] = true;
        for(i = 0, length = array.length; i < length; i++) {
          a = array[i];
          b = other[i];
          if(a.$$is_array) {
            if(b.$$is_array && b.length !== a.length) {
              return false;
            }
            if(!recursed.hasOwnProperty((a).$object_id())) {
              if(!_eql(a, b)) {
                return false;
              }
            }
          } else {
            if(!(a)['$eql?'](b)) {
              return false;
            }
          }
        }
        return true;
      }
      return _eql(self, other);
    }, $Array_eql$ques$49.$$arity = 1);
    Opal.def(self, '$fetch', $Array_fetch$50 = function $$fetch(index, defaults) {
      var $iter = $Array_fetch$50.$$p, block = $iter || nil, self = this;
      if($iter) $Array_fetch$50.$$p = null;
      if($iter) $Array_fetch$50.$$p = null;
      ;
      ;
      var original = index;
      index = $$($nesting, 'Opal').$coerce_to(index, $$($nesting, 'Integer'), "to_int");
      if(index < 0) {
        index += self.length;
      }
      if(index >= 0 && index < self.length) {
        return self[index];
      }
      if(block !== nil && defaults != null) {
        self.$warn("warning: block supersedes default value argument");
      }
      if(block !== nil) {
        return block(original);
      }
      if(defaults != null) {
        return defaults;
      }
      if(self.length === 0) {
        self.$raise($$($nesting, 'IndexError'), "" + "index " + (original) + " outside of array bounds: 0...0");
      } else {
        self.$raise($$($nesting, 'IndexError'), "" + "index " + (original) + " outside of array bounds: -" + (self.length) + "..." + (self.length));
      }
      ;
    }, $Array_fetch$50.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$fill */0;
    Opal.def(self, '$first', $Array_first$52 = function $$first(count) {
      var self = this;
      ;
      if(count == null) {
        return self.length === 0 ? nil : self[0];
      }
      count = $$($nesting, 'Opal').$coerce_to(count, $$($nesting, 'Integer'), "to_int");
      if(count < 0) {
        self.$raise($$($nesting, 'ArgumentError'), "negative array size");
      }
      return self.slice(0, count);
      ;
    }, $Array_first$52.$$arity = -1);
    Opal.def(self, '$flatten', $Array_flatten$53 = function $$flatten(level) {
      var self = this;
      ;
            function _flatten(array, level) {
        var result = [], i, length, item, ary;
        array = (array).$to_a();
        for(i = 0, length = array.length; i < length; i++) {
          item = array[i];
          if(!$$($nesting, 'Opal')['$respond_to?'](item, "to_ary", true)) {
            result.push(item);
            continue;
          }
          ary = (item).$to_ary();
          if(ary === nil) {
            result.push(item);
            continue;
          }
          if(!ary.$$is_array) {
            self.$raise($$($nesting, 'TypeError'));
          }
          if(ary === self) {
            self.$raise($$($nesting, 'ArgumentError'));
          }
          switch(level) {
            case undefined:
              result = result.concat(_flatten(ary));
              break;
            case 0:
              result.push(ary);
              break;
            default:
              result.push.apply(result, _flatten(ary, level - 1));
          }
        }
        return result;
      }
      if(level !== undefined) {
        level = $$($nesting, 'Opal').$coerce_to(level, $$($nesting, 'Integer'), "to_int");
      }
      return toArraySubclass(_flatten(self, level), self.$class());
      ;
    }, $Array_flatten$53.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$flatten! */0;
    Opal.def(self, '$hash', $Array_hash$55 = function $$hash() {
      var self = this;
      var top = (Opal.hash_ids === undefined), result = ['A'], hash_id = self.$object_id(), item, i, key;
      try {
        if(top) {
          Opal.hash_ids = Object.create(null);
        }
        if(Opal.hash_ids[hash_id]) {
          return 'self';
        }
        for(key in Opal.hash_ids) {
          item = Opal.hash_ids[key];
          if(self['$eql?'](item)) {
            return 'self';
          }
        }
        Opal.hash_ids[hash_id] = self;
        for(i = 0; i < self.length; i++) {
          item = self[i];
          result.push(item.$hash());
        }
        return result.join(',');
      } finally {
        if(top) {
          Opal.hash_ids = undefined;
        }
      }
    }, $Array_hash$55.$$arity = 0);
    Opal.def(self, '$include?', $Array_include$ques$56 = function(member) {
      var self = this;
      for(var i = 0, length = self.length; i < length; i++) {
        if((self[i])['$=='](member)) {
          return true;
        }
      }
      return false;
    }, $Array_include$ques$56.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$index */0;
    /* destroyed: TreeShaking#shake_methods/$insert */0;
    Opal.def(self, '$inspect', $Array_inspect$59 = function $$inspect() {
      var self = this;
      var result = [], id = self.$__id__();
      for(var i = 0, length = self.length; i < length; i++) {
        var item = self['$[]'](i);
        if((item).$__id__() === id) {
          result.push('[...]');
        } else {
          result.push((item).$inspect());
        }
      }
      return '[' + result.join(', ') + ']';
    }, $Array_inspect$59.$$arity = 0);
    Opal.def(self, '$join', $Array_join$60 = function $$join(sep) {
      var self = this;
      if($gvars[","] == null) $gvars[","] = nil;
      if(sep == null) {
        sep = nil;
      }
      ;
      if($truthy(self.length === 0)) {
        return "";
      }
      ;
      if($truthy(sep === nil)) {
        sep = $gvars[","];
      }
      ;
      var result = [];
      var i, length, item, tmp;
      for(i = 0, length = self.length; i < length; i++) {
        item = self[i];
        if($$($nesting, 'Opal')['$respond_to?'](item, "to_str")) {
          tmp = (item).$to_str();
          if(tmp !== nil) {
            result.push((tmp).$to_s());
            continue;
          }
        }
        if($$($nesting, 'Opal')['$respond_to?'](item, "to_ary")) {
          tmp = (item).$to_ary();
          if(tmp === self) {
            self.$raise($$($nesting, 'ArgumentError'));
          }
          if(tmp !== nil) {
            result.push((tmp).$join(sep));
            continue;
          }
        }
        if($$($nesting, 'Opal')['$respond_to?'](item, "to_s")) {
          tmp = (item).$to_s();
          if(tmp !== nil) {
            result.push(tmp);
            continue;
          }
        }
        self.$raise($$($nesting, 'NoMethodError').$new("" + (Opal.inspect(item)) + " doesn't respond to #to_str, #to_ary or #to_s", "to_str"));
      }
      if(sep === nil) {
        return result.join('');
      } else {
        return result.join($$($nesting, 'Opal')['$coerce_to!'](sep, $$($nesting, 'String'), "to_str").$to_s());
      }
      ;
    }, $Array_join$60.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$keep_if */0;
    Opal.def(self, '$last', $Array_last$63 = function $$last(count) {
      var self = this;
      ;
      if(count == null) {
        return self.length === 0 ? nil : self[self.length - 1];
      }
      count = $$($nesting, 'Opal').$coerce_to(count, $$($nesting, 'Integer'), "to_int");
      if(count < 0) {
        self.$raise($$($nesting, 'ArgumentError'), "negative array size");
      }
      if(count > self.length) {
        count = self.length;
      }
      return self.slice(self.length - count, self.length);
      ;
    }, $Array_last$63.$$arity = -1);
    Opal.def(self, '$length', $Array_length$64 = function $$length() {
      var self = this;
      return self.length;
    }, $Array_length$64.$$arity = 0);
    Opal.alias(self, "map", "collect");
    Opal.alias(self, "map!", "collect!");
    Opal.def(self, '$max', $Array_max$65 = function $$max(n) {
      var $iter = $Array_max$65.$$p, block = $iter || nil, self = this;
      if($iter) $Array_max$65.$$p = null;
      if($iter) $Array_max$65.$$p = null;
      ;
      ;
      return $send(self.$each(), 'max', [n], block.$to_proc());
    }, $Array_max$65.$$arity = -1);
    Opal.def(self, '$min', $Array_min$66 = function $$min() {
      var $iter = $Array_min$66.$$p, block = $iter || nil, self = this;
      if($iter) $Array_min$66.$$p = null;
      if($iter) $Array_min$66.$$p = null;
      ;
      return $send(self.$each(), 'min', [], block.$to_proc());
    }, $Array_min$66.$$arity = 0);
        function descending_factorial(from, how_many) {
      var count = how_many >= 0 ? 1 : 0;
      while(how_many) {
        count *= from;
        from--;
        how_many--;
      }
      return count;
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$permutation */0;
    /* destroyed: TreeShaking#shake_methods/$repeated_permutation */0;
    Opal.def(self, '$pop', $Array_pop$71 = function $$pop(count) {
      var self = this;
      ;
      if($truthy(count === undefined)) {
        if($truthy(self.length === 0)) {
          return nil;
        }
        ;
        return self.pop();
      }
      ;
      count = $$($nesting, 'Opal').$coerce_to(count, $$($nesting, 'Integer'), "to_int");
      if($truthy(count < 0)) {
        self.$raise($$($nesting, 'ArgumentError'), "negative array size");
      }
      ;
      if($truthy(self.length === 0)) {
        return [];
      }
      ;
      if($truthy(count > self.length)) {
        return self.splice(0, self.length);
      } else {
        return self.splice(self.length - count, self.length);
      }
      ;
    }, $Array_pop$71.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$product */0;
    Opal.def(self, '$push', $Array_push$73 = function $$push($a) {
      var $post_args, objects, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      objects = $post_args;
      ;
      for(var i = 0, length = objects.length; i < length; i++) {
        self.push(objects[i]);
      }
      ;
      return self;
    }, $Array_push$73.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$append */0;
    /* destroyed: TreeShaking#shake_methods/$rassoc */0;
    Opal.def(self, '$reject', $Array_reject$75 = function $$reject() {
      var $iter = $Array_reject$75.$$p, block = $iter || nil, $$76, self = this;
      if($iter) $Array_reject$75.$$p = null;
      if($iter) $Array_reject$75.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["reject"], ($$76 = function() {
          var self = $$76.$$s || this;
          return self.$size();
        }, $$76.$$s = self, $$76.$$arity = 0, $$76));
      }
      ;
      var result = [];
      for(var i = 0, length = self.length, value; i < length; i++) {
        value = block(self[i]);
        if(value === false || value === nil) {
          result.push(self[i]);
        }
      }
      return result;
      ;
    }, $Array_reject$75.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$reject! */0;
    Opal.def(self, '$replace', $Array_replace$79 = function $$replace(other) {
      var self = this;
      other = (function() {
        if($truthy($$($nesting, 'Array')['$==='](other))) {
          return other.$to_a();
        } else {
          return $$($nesting, 'Opal').$coerce_to(other, $$($nesting, 'Array'), "to_ary").$to_a();
        }
        ;
        return nil;
      })();
      self.splice(0, self.length);
      self.push.apply(self, other);
      ;
      return self;
    }, $Array_replace$79.$$arity = 1);
    Opal.def(self, '$reverse', $Array_reverse$80 = function $$reverse() {
      var self = this;
      return self.slice(0).reverse();
    }, $Array_reverse$80.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$reverse! */0;
    /* destroyed: TreeShaking#shake_methods/$reverse_each */0;
    Opal.def(self, '$rindex', $Array_rindex$84 = function $$rindex(object) {
      var $iter = $Array_rindex$84.$$p, block = $iter || nil, self = this;
      if($iter) $Array_rindex$84.$$p = null;
      if($iter) $Array_rindex$84.$$p = null;
      ;
      ;
      var i, value;
      if(object != null && block !== nil) {
        self.$warn("warning: given block not used");
      }
      if(object != null) {
        for(i = self.length - 1; i >= 0; i--) {
          if(i >= self.length) {
            break;
          }
          if((self[i])['$=='](object)) {
            return i;
          }
        }
      } else if(block !== nil) {
        for(i = self.length - 1; i >= 0; i--) {
          if(i >= self.length) {
            break;
          }
          value = block(self[i]);
          if(value !== false && value !== nil) {
            return i;
          }
        }
      } else if(object == null) {
        return self.$enum_for("rindex");
      }
      return nil;
      ;
    }, $Array_rindex$84.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$rotate */0;
    /* destroyed: TreeShaking#shake_methods/$rotate! */0;
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'SampleRandom');
      var $nesting = [self].concat($parent_nesting), $SampleRandom_initialize$87, $SampleRandom_rand$88;
      self.$$prototype.rng = nil;
      Opal.def(self, '$initialize', $SampleRandom_initialize$87 = function $$initialize(rng) {
        var self = this;
        return (self.rng = rng);
      }, $SampleRandom_initialize$87.$$arity = 1);
      return (Opal.def(self, '$rand', $SampleRandom_rand$88 = function $$rand(size) {
        var self = this, random = nil;
        random = $$($nesting, 'Opal').$coerce_to(self.rng.$rand(size), $$($nesting, 'Integer'), "to_int");
        if($truthy(random < 0)) {
          self.$raise($$($nesting, 'RangeError'), "random value must be >= 0");
        }
        ;
        if($truthy(random < size)) {

        } else {
          self.$raise($$($nesting, 'RangeError'), "random value must be less than Array size");
        }
        ;
        return random;
      }, $SampleRandom_rand$88.$$arity = 1), nil) && 'rand';
    })($nesting[0], null, $nesting);
    /* destroyed: TreeShaking#shake_methods/$sample */0;
    /* destroyed: TreeShaking#shake_methods/$select */0;
    /* destroyed: TreeShaking#shake_methods/$select! */0;
    Opal.def(self, '$shift', $Array_shift$94 = function $$shift(count) {
      var self = this;
      ;
      if($truthy(count === undefined)) {
        if($truthy(self.length === 0)) {
          return nil;
        }
        ;
        return self.shift();
      }
      ;
      count = $$($nesting, 'Opal').$coerce_to(count, $$($nesting, 'Integer'), "to_int");
      if($truthy(count < 0)) {
        self.$raise($$($nesting, 'ArgumentError'), "negative array size");
      }
      ;
      if($truthy(self.length === 0)) {
        return [];
      }
      ;
      return self.splice(0, count);
      ;
    }, $Array_shift$94.$$arity = -1);
    Opal.alias(self, "size", "length");
    /* destroyed: TreeShaking#shake_methods/$shuffle */0;
    /* destroyed: TreeShaking#shake_methods/$shuffle! */0;
    Opal.alias(self, "slice", "[]");
    Opal.def(self, '$slice!', $Array_slice$excl$97 = function(index, length) {
      var self = this, result = nil, range = nil, range_start = nil, range_end = nil, start = nil;
      ;
      result = nil;
      if($truthy(length === undefined)) {
        if($truthy($$($nesting, 'Range')['$==='](index))) {
          range = index;
          result = self['$[]'](range);
          range_start = $$($nesting, 'Opal').$coerce_to(range.$begin(), $$($nesting, 'Integer'), "to_int");
          range_end = $$($nesting, 'Opal').$coerce_to(range.$end(), $$($nesting, 'Integer'), "to_int");
          if(range_start < 0) {
            range_start += self.length;
          }
          if(range_end < 0) {
            range_end += self.length;
          } else if(range_end >= self.length) {
            range_end = self.length - 1;
            if(range.excl) {
              range_end += 1;
            }
          }
          var range_length = range_end - range_start;
          if(range.excl) {
            range_end -= 1;
          } else {
            range_length += 1;
          }
          if(range_start < self.length && range_start >= 0 && range_end < self.length && range_end >= 0 && range_length > 0) {
            self.splice(range_start, range_length);
          }
          ;
        } else {
          start = $$($nesting, 'Opal').$coerce_to(index, $$($nesting, 'Integer'), "to_int");
          if(start < 0) {
            start += self.length;
          }
          if(start < 0 || start >= self.length) {
            return nil;
          }
          result = self[start];
          if(start === 0) {
            self.shift();
          } else {
            self.splice(start, 1);
          }
          ;
        }
      } else {
        start = $$($nesting, 'Opal').$coerce_to(index, $$($nesting, 'Integer'), "to_int");
        length = $$($nesting, 'Opal').$coerce_to(length, $$($nesting, 'Integer'), "to_int");
        if(length < 0) {
          return nil;
        }
        var end = start + length;
        result = self['$[]'](start, length);
        if(start < 0) {
          start += self.length;
        }
        if(start + length > self.length) {
          length = self.length - start;
        }
        if(start < self.length && start >= 0) {
          self.splice(start, length);
        }
        ;
      }
      ;
      return result;
    }, $Array_slice$excl$97.$$arity = -2);
    Opal.def(self, '$sort', $Array_sort$98 = function $$sort() {
      var $iter = $Array_sort$98.$$p, block = $iter || nil, self = this;
      if($iter) $Array_sort$98.$$p = null;
      if($iter) $Array_sort$98.$$p = null;
      ;
      if($truthy(self.length > 1)) {

      } else {
        return self;
      }
      ;
      if(block === nil) {
        block = function(a, b) {
          return (a)['$<=>'](b);
        };
      }
      return self.slice().sort(function(x, y) {
        var ret = block(x, y);
        if(ret === nil) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + ((x).$inspect()) + " with " + ((y).$inspect()) + " failed");
        }
        return $rb_gt(ret, 0) ? 1 : ($rb_lt(ret, 0) ? -1 : 0);
      });
      ;
    }, $Array_sort$98.$$arity = 0);
    Opal.def(self, '$sort!', $Array_sort$excl$99 = function() {
      var $iter = $Array_sort$excl$99.$$p, block = $iter || nil, self = this;
      if($iter) $Array_sort$excl$99.$$p = null;
      if($iter) $Array_sort$excl$99.$$p = null;
      ;
      var result;
      if((block !== nil)) {
        result = $send((self.slice()), 'sort', [], block.$to_proc());
      } else {
        result = (self.slice()).$sort();
      }
      self.length = 0;
      for(var i = 0, length = result.length; i < length; i++) {
        self.push(result[i]);
      }
      return self;
      ;
    }, $Array_sort$excl$99.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$sort_by! */0;
    Opal.def(self, '$take', $Array_take$102 = function $$take(count) {
      var self = this;
      if(count < 0) {
        self.$raise($$($nesting, 'ArgumentError'));
      }
      return self.slice(0, count);
    }, $Array_take$102.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$take_while */0;
    Opal.def(self, '$to_a', $Array_to_a$104 = function $$to_a() {
      var self = this;
      return self;
    }, $Array_to_a$104.$$arity = 0);
    Opal.alias(self, "to_ary", "to_a");
    Opal.def(self, '$to_h', $Array_to_h$105 = function $$to_h() {
      var self = this;
      var i, len = self.length, ary, key, val, hash = $hash2([], { });
      for(i = 0; i < len; i++) {
        ary = $$($nesting, 'Opal')['$coerce_to?'](self[i], $$($nesting, 'Array'), "to_ary");
        if(!ary.$$is_array) {
          self.$raise($$($nesting, 'TypeError'), "" + "wrong element type " + ((ary).$class()) + " at " + (i) + " (expected array)");
        }
        if(ary.length !== 2) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "wrong array length at " + (i) + " (expected 2, was " + ((ary).$length()) + ")");
        }
        key = ary[0];
        val = ary[1];
        Opal.hash_put(hash, key, val);
      }
      return hash;
    }, $Array_to_h$105.$$arity = 0);
    Opal.alias(self, "to_s", "inspect");
    /* destroyed: TreeShaking#shake_methods/$transpose */0;
    Opal.def(self, '$uniq', $Array_uniq$109 = function $$uniq() {
      var $iter = $Array_uniq$109.$$p, block = $iter || nil, self = this;
      if($iter) $Array_uniq$109.$$p = null;
      if($iter) $Array_uniq$109.$$p = null;
      ;
      var hash = $hash2([], { }), i, length, item, key;
      if(block === nil) {
        for(i = 0, length = self.length; i < length; i++) {
          item = self[i];
          if(Opal.hash_get(hash, item) === undefined) {
            Opal.hash_put(hash, item, item);
          }
        }
      } else {
        for(i = 0, length = self.length; i < length; i++) {
          item = self[i];
          key = Opal.yield1(block, item);
          if(Opal.hash_get(hash, key) === undefined) {
            Opal.hash_put(hash, key, item);
          }
        }
      }
      return toArraySubclass((hash).$values(), self.$class());
      ;
    }, $Array_uniq$109.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$uniq! */0;
    Opal.def(self, '$unshift', $Array_unshift$111 = function $$unshift($a) {
      var $post_args, objects, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      objects = $post_args;
      ;
      for(var i = objects.length - 1; i >= 0; i--) {
        self.unshift(objects[i]);
      }
      ;
      return self;
    }, $Array_unshift$111.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$prepend */0;
    /* destroyed: TreeShaking#shake_methods/$values_at */0;
    Opal.def(self, '$zip', $Array_zip$115 = function $$zip($a) {
      var $iter = $Array_zip$115.$$p, block = $iter || nil, $post_args, others, $b, self = this;
      if($iter) $Array_zip$115.$$p = null;
      if($iter) $Array_zip$115.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      others = $post_args;
      ;
      var result = [], size = self.length, part, o, i, j, jj;
      for(j = 0, jj = others.length; j < jj; j++) {
        o = others[j];
        if(o.$$is_array) {
          continue;
        }
        if(o.$$is_enumerator) {
          if(o.$size() === Infinity) {
            others[j] = o.$take(size);
          } else {
            others[j] = o.$to_a();
          }
          continue;
        }
        others[j] = ($truthy($b = $$($nesting, 'Opal')['$coerce_to?'](o, $$($nesting, 'Array'), "to_ary")) ? $b : $$($nesting, 'Opal')['$coerce_to!'](o, $$($nesting, 'Enumerator'), "each")).$to_a();
      }
      for(i = 0; i < size; i++) {
        part = [self[i]];
        for(j = 0, jj = others.length; j < jj; j++) {
          o = others[j][i];
          if(o == null) {
            o = nil;
          }
          part[j + 1] = o;
        }
        result[i] = part;
      }
      if(block !== nil) {
        for(i = 0; i < size; i++) {
          block(result[i]);
        }
        return nil;
      }
      return result;
      ;
    }, $Array_zip$115.$$arity = -1);
    Opal.defs(self, '$inherited', $Array_inherited$116 = function $$inherited(klass) {
      var self = this;
      klass.$$prototype.$to_a = function() {
        return this.slice(0, this.length);
      };
    }, $Array_inherited$116.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$instance_variables */0;
    $$($nesting, 'Opal').$pristine(self.$singleton_class(), "allocate");
    $$($nesting, 'Opal').$pristine(self, "copy_instance_variables", "initialize_dup");
    return (Opal.def(self, '$pack', $Array_pack$119 = function $$pack($a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      return self.$raise("To use Array#pack, you must first require 'corelib/array/pack'.");
    }, $Array_pack$119.$$arity = -1), nil) && 'pack';
  })($nesting[0], Array, $nesting);
};
Opal.modules["corelib/hash"] = function(Opal) {
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $hash2 = Opal.hash2, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/enumerable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Hash');
    var $nesting = [self].concat($parent_nesting), $Hash_$$$1, $Hash_allocate$2, $Hash_try_convert$3, $Hash_initialize$4, $Hash_$eq_eq$5, $Hash_$gt_eq$6, $Hash_$gt$8, $Hash_$lt$9, $Hash_$lt_eq$10, $Hash_$$$11, $Hash_$$$eq$12, $Hash_assoc$13, $Hash_clear$14, $Hash_clone$15, $Hash_compact$16, $Hash_compact$excl$17, $Hash_compare_by_identity$18, $Hash_compare_by_identity$ques$19, $Hash_default$20, $Hash_default$eq$21, $Hash_default_proc$22, $Hash_default_proc$eq$23, $Hash_delete$24, $Hash_delete_if$25, $Hash_dig$27, $Hash_each$28, $Hash_each_key$30, $Hash_each_value$32, $Hash_empty$ques$34, $Hash_fetch$35, $Hash_fetch_values$36, $Hash_flatten$38, $Hash_has_key$ques$39, $Hash_has_value$ques$40, $Hash_hash$41, $Hash_index$42, $Hash_indexes$43, $Hash_inspect$44, $Hash_invert$45, $Hash_keep_if$46, $Hash_keys$48, $Hash_length$49, $Hash_merge$50, $Hash_merge$excl$51, $Hash_rassoc$52, $Hash_rehash$53, $Hash_reject$54, $Hash_reject$excl$56, $Hash_replace$58, $Hash_select$59, $Hash_select$excl$61, $Hash_shift$63, $Hash_slice$64, $Hash_to_a$65, $Hash_to_h$66, $Hash_to_hash$67, $Hash_to_proc$68, $Hash_transform_keys$70, $Hash_transform_keys$excl$72, $Hash_transform_values$74, $Hash_transform_values$excl$76, $Hash_values$78;
    self.$include($$($nesting, 'Enumerable'));
    self.$$prototype.$$is_hash = true;
    Opal.defs(self, '$[]', $Hash_$$$1 = function($a) {
      var $post_args, argv, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      argv = $post_args;
      ;
      var hash, argc = argv.length, i;
      if(argc === 1) {
        hash = $$($nesting, 'Opal')['$coerce_to?'](argv['$[]'](0), $$($nesting, 'Hash'), "to_hash");
        if(hash !== nil) {
          return self.$allocate()['$merge!'](hash);
        }
        argv = $$($nesting, 'Opal')['$coerce_to?'](argv['$[]'](0), $$($nesting, 'Array'), "to_ary");
        if(argv === nil) {
          self.$raise($$($nesting, 'ArgumentError'), "odd number of arguments for Hash");
        }
        argc = argv.length;
        hash = self.$allocate();
        for(i = 0; i < argc; i++) {
          if(!argv[i].$$is_array) continue;
          switch(argv[i].length) {
            case 1:
              hash.$store(argv[i][0], nil);
              break;
            case 2:
              hash.$store(argv[i][0], argv[i][1]);
              break;
            default:
              self.$raise($$($nesting, 'ArgumentError'), "" + "invalid number of elements (" + (argv[i].length) + " for 1..2)");
          }
        }
        return hash;
      }
      if(argc % 2 !== 0) {
        self.$raise($$($nesting, 'ArgumentError'), "odd number of arguments for Hash");
      }
      hash = self.$allocate();
      for(i = 0; i < argc; i += 2) {
        hash.$store(argv[i], argv[i + 1]);
      }
      return hash;
      ;
    }, $Hash_$$$1.$$arity = -1);
    Opal.defs(self, '$allocate', $Hash_allocate$2 = function $$allocate() {
      var self = this;
      var hash = new self.$$constructor();
      Opal.hash_init(hash);
      hash.$$none = nil;
      hash.$$proc = nil;
      return hash;
    }, $Hash_allocate$2.$$arity = 0);
    Opal.defs(self, '$try_convert', $Hash_try_convert$3 = function $$try_convert(obj) {
      var self = this;
      return $$($nesting, 'Opal')['$coerce_to?'](obj, $$($nesting, 'Hash'), "to_hash");
    }, $Hash_try_convert$3.$$arity = 1);
    Opal.def(self, '$initialize', $Hash_initialize$4 = function $$initialize(defaults) {
      var $iter = $Hash_initialize$4.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_initialize$4.$$p = null;
      if($iter) $Hash_initialize$4.$$p = null;
      ;
      ;
      if(defaults !== undefined && block !== nil) {
        self.$raise($$($nesting, 'ArgumentError'), "wrong number of arguments (1 for 0)");
      }
      self.$$none = (defaults === undefined ? nil : defaults);
      self.$$proc = block;
      return self;
      ;
    }, $Hash_initialize$4.$$arity = -1);
    Opal.def(self, '$==', $Hash_$eq_eq$5 = function(other) {
      var self = this;
      if(self === other) {
        return true;
      }
      if(!other.$$is_hash) {
        return false;
      }
      if(self.$$keys.length !== other.$$keys.length) {
        return false;
      }
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value, other_value; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
          other_value = other.$$smap[key];
        } else {
          value = key.value;
          other_value = Opal.hash_get(other, key.key);
        }
        if(other_value === undefined || !value['$eql?'](other_value)) {
          return false;
        }
      }
      return true;
    }, $Hash_$eq_eq$5.$$arity = 1);
    Opal.def(self, '$>=', $Hash_$gt_eq$6 = function(other) {
      var $$7, self = this, result = nil;
      other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      if(self.$$keys.length < other.$$keys.length) {
        return false;
      }
      ;
      result = true;
      $send(other, 'each', [], ($$7 = function(other_key, other_val) {
        var self = $$7.$$s || this, val = nil;
        if(other_key == null) {
          other_key = nil;
        }
        ;
        if(other_val == null) {
          other_val = nil;
        }
        ;
        val = self.$fetch(other_key, null);
        if(val == null || val !== other_val) {
          result = false;
          return;
        }
        ;
      }, $$7.$$s = self, $$7.$$arity = 2, $$7));
      return result;
    }, $Hash_$gt_eq$6.$$arity = 1);
    Opal.def(self, '$>', $Hash_$gt$8 = function(other) {
      var self = this;
      other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      if(self.$$keys.length <= other.$$keys.length) {
        return false;
      }
      ;
      return $rb_ge(self, other);
    }, $Hash_$gt$8.$$arity = 1);
    Opal.def(self, '$<', $Hash_$lt$9 = function(other) {
      var self = this;
      other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      return $rb_gt(other, self);
    }, $Hash_$lt$9.$$arity = 1);
    Opal.def(self, '$<=', $Hash_$lt_eq$10 = function(other) {
      var self = this;
      other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      return $rb_ge(other, self);
    }, $Hash_$lt_eq$10.$$arity = 1);
    Opal.def(self, '$[]', $Hash_$$$11 = function(key) {
      var self = this;
      var value = Opal.hash_get(self, key);
      if(value !== undefined) {
        return value;
      }
      return self.$default(key);
    }, $Hash_$$$11.$$arity = 1);
    Opal.def(self, '$[]=', $Hash_$$$eq$12 = function(key, value) {
      var self = this;
      Opal.hash_put(self, key, value);
      return value;
    }, $Hash_$$$eq$12.$$arity = 2);
    /* destroyed: TreeShaking#shake_methods/$assoc */0;
    Opal.def(self, '$clear', $Hash_clear$14 = function $$clear() {
      var self = this;
      Opal.hash_init(self);
      return self;
    }, $Hash_clear$14.$$arity = 0);
    Opal.def(self, '$clone', $Hash_clone$15 = function $$clone() {
      var self = this;
      var hash = new self.$$class();
      Opal.hash_init(hash);
      Opal.hash_clone(self, hash);
      return hash;
    }, $Hash_clone$15.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$compact */0;
    Opal.def(self, '$compact!', $Hash_compact$excl$17 = function() {
      var self = this;
      var changes_were_made = false;
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value, obj; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        if(value === nil) {
          if(Opal.hash_delete(self, key) !== undefined) {
            changes_were_made = true;
            length--;
            i--;
          }
        }
      }
      return changes_were_made ? self : nil;
    }, $Hash_compact$excl$17.$$arity = 0);
    Opal.def(self, '$compare_by_identity', $Hash_compare_by_identity$18 = function $$compare_by_identity() {
      var self = this;
      var i, ii, key, keys = self.$$keys, identity_hash;
      if(self.$$by_identity) return self;
      if(self.$$keys.length === 0) {
        self.$$by_identity = true;
        return self;
      }
      identity_hash = $hash2([], { }).$compare_by_identity();
      for(i = 0, ii = keys.length; i < ii; i++) {
        key = keys[i];
        if(!key.$$is_string) key = key.key;
        Opal.hash_put(identity_hash, key, Opal.hash_get(self, key));
      }
      self.$$by_identity = true;
      self.$$map = identity_hash.$$map;
      self.$$smap = identity_hash.$$smap;
      return self;
    }, $Hash_compare_by_identity$18.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$compare_by_identity? */0;
    Opal.def(self, '$default', $Hash_default$20 = function(key) {
      var self = this;
      ;
      if(key !== undefined && self.$$proc !== nil && self.$$proc !== undefined) {
        return self.$$proc.$call(self, key);
      }
      if(self.$$none === undefined) {
        return nil;
      }
      return self.$$none;
      ;
    }, $Hash_default$20.$$arity = -1);
    Opal.def(self, '$default=', $Hash_default$eq$21 = function(object) {
      var self = this;
      self.$$proc = nil;
      self.$$none = object;
      return object;
    }, $Hash_default$eq$21.$$arity = 1);
    Opal.def(self, '$default_proc', $Hash_default_proc$22 = function $$default_proc() {
      var self = this;
      if(self.$$proc !== undefined) {
        return self.$$proc;
      }
      return nil;
    }, $Hash_default_proc$22.$$arity = 0);
    Opal.def(self, '$default_proc=', $Hash_default_proc$eq$23 = function(default_proc) {
      var self = this;
      var proc = default_proc;
      if(proc !== nil) {
        proc = $$($nesting, 'Opal')['$coerce_to!'](proc, $$($nesting, 'Proc'), "to_proc");
        if((proc)['$lambda?']() && (proc).$arity().$abs() !== 2) {
          self.$raise($$($nesting, 'TypeError'), "default_proc takes two arguments");
        }
      }
      self.$$none = nil;
      self.$$proc = proc;
      return default_proc;
    }, $Hash_default_proc$eq$23.$$arity = 1);
    Opal.def(self, '$delete', $Hash_delete$24 = function(key) {
      var $iter = $Hash_delete$24.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_delete$24.$$p = null;
      if($iter) $Hash_delete$24.$$p = null;
      ;
      var value = Opal.hash_delete(self, key);
      if(value !== undefined) {
        return value;
      }
      if(block !== nil) {
        return Opal.yield1(block, key);
      }
      return nil;
      ;
    }, $Hash_delete$24.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$delete_if */0;
    Opal.alias(self, "dup", "clone");
    Opal.def(self, '$dig', $Hash_dig$27 = function $$dig(key, $a) {
      var $post_args, keys, self = this, item = nil;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      keys = $post_args;
      ;
      item = self['$[]'](key);
      if(item === nil || keys.length === 0) {
        return item;
      }
      ;
      if($truthy(item['$respond_to?']("dig"))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + (item.$class()) + " does not have #dig method");
      }
      ;
      return $send(item, 'dig', Opal.to_a(keys));
    }, $Hash_dig$27.$$arity = -2);
    Opal.def(self, '$each', $Hash_each$28 = function $$each() {
      var $iter = $Hash_each$28.$$p, block = $iter || nil, $$29, self = this;
      if($iter) $Hash_each$28.$$p = null;
      if($iter) $Hash_each$28.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return $send(self, 'enum_for', ["each"], ($$29 = function() {
          var self = $$29.$$s || this;
          return self.$size();
        }, $$29.$$s = self, $$29.$$arity = 0, $$29));
      }
      ;
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        Opal.yield1(block, [key, value]);
      }
      return self;
      ;
    }, $Hash_each$28.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$each_key */0;
    Opal.alias(self, "each_pair", "each");
    Opal.def(self, '$each_value', $Hash_each_value$32 = function $$each_value() {
      var $iter = $Hash_each_value$32.$$p, block = $iter || nil, $$33, self = this;
      if($iter) $Hash_each_value$32.$$p = null;
      if($iter) $Hash_each_value$32.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return $send(self, 'enum_for', ["each_value"], ($$33 = function() {
          var self = $$33.$$s || this;
          return self.$size();
        }, $$33.$$s = self, $$33.$$arity = 0, $$33));
      }
      ;
      for(var i = 0, keys = self.$$keys, length = keys.length, key; i < length; i++) {
        key = keys[i];
        block(key.$$is_string ? self.$$smap[key] : key.value);
      }
      return self;
      ;
    }, $Hash_each_value$32.$$arity = 0);
    Opal.def(self, '$empty?', $Hash_empty$ques$34 = function() {
      var self = this;
      return self.$$keys.length === 0;
    }, $Hash_empty$ques$34.$$arity = 0);
    Opal.alias(self, "eql?", "==");
    Opal.def(self, '$fetch', $Hash_fetch$35 = function $$fetch(key, defaults) {
      var $iter = $Hash_fetch$35.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_fetch$35.$$p = null;
      if($iter) $Hash_fetch$35.$$p = null;
      ;
      ;
      var value = Opal.hash_get(self, key);
      if(value !== undefined) {
        return value;
      }
      if(block !== nil) {
        return block(key);
      }
      if(defaults !== undefined) {
        return defaults;
      }
      ;
      return self.$raise($$($nesting, 'KeyError').$new("" + "key not found: " + (key.$inspect()), $hash2(["key", "receiver"], {
        "key": key,
        "receiver": self
})));
    }, $Hash_fetch$35.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$fetch_values */0;
    Opal.def(self, '$flatten', $Hash_flatten$38 = function $$flatten(level) {
      var self = this;
      if(level == null) {
        level = 1;
      }
      ;
      level = $$($nesting, 'Opal')['$coerce_to!'](level, $$($nesting, 'Integer'), "to_int");
      var result = [];
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        result.push(key);
        if(value.$$is_array) {
          if(level === 1) {
            result.push(value);
            continue;
          }
          result = result.concat((value).$flatten(level - 2));
          continue;
        }
        result.push(value);
      }
      return result;
      ;
    }, $Hash_flatten$38.$$arity = -1);
    Opal.def(self, '$has_key?', $Hash_has_key$ques$39 = function(key) {
      var self = this;
      return Opal.hash_get(self, key) !== undefined;
    }, $Hash_has_key$ques$39.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$has_value? */0;
    Opal.def(self, '$hash', $Hash_hash$41 = function $$hash() {
      var self = this;
      var top = (Opal.hash_ids === undefined), hash_id = self.$object_id(), result = ['Hash'], key, item;
      try {
        if(top) {
          Opal.hash_ids = Object.create(null);
        }
        if(Opal[hash_id]) {
          return 'self';
        }
        for(key in Opal.hash_ids) {
          item = Opal.hash_ids[key];
          if(self['$eql?'](item)) {
            return 'self';
          }
        }
        Opal.hash_ids[hash_id] = self;
        for(var i = 0, keys = self.$$keys, length = keys.length; i < length; i++) {
          key = keys[i];
          if(key.$$is_string) {
            result.push([key, self.$$smap[key].$hash()]);
          } else {
            result.push([key.key_hash, key.value.$hash()]);
          }
        }
        return result.sort().join();
      } finally {
        if(top) {
          Opal.hash_ids = undefined;
        }
      }
    }, $Hash_hash$41.$$arity = 0);
    Opal.alias(self, "include?", "has_key?");
    /* destroyed: TreeShaking#shake_methods/$index */0;
    /* destroyed: TreeShaking#shake_methods/$indexes */0;
    /* destroyed: TreeShaking#shake_methods/$indices */0;
    var inspect_ids;
    Opal.def(self, '$inspect', $Hash_inspect$44 = function $$inspect() {
      var self = this;
      var top = (inspect_ids === undefined), hash_id = self.$object_id(), result = [];
      try {
        if(top) {
          inspect_ids = { };
        }
        if(inspect_ids.hasOwnProperty(hash_id)) {
          return '{...}';
        }
        inspect_ids[hash_id] = true;
        for(var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
          key = keys[i];
          if(key.$$is_string) {
            value = self.$$smap[key];
          } else {
            value = key.value;
            key = key.key;
          }
          result.push(key.$inspect() + '=>' + value.$inspect());
        }
        return '{' + result.join(', ') + '}';
      } finally {
        if(top) {
          inspect_ids = undefined;
        }
      }
    }, $Hash_inspect$44.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$invert */0;
    /* destroyed: TreeShaking#shake_methods/$keep_if */0;
    /* destroyed: TreeShaking#shake_methods/$key */0;
    Opal.alias(self, "key?", "has_key?");
    Opal.def(self, '$keys', $Hash_keys$48 = function $$keys() {
      var self = this;
      var result = [];
      for(var i = 0, keys = self.$$keys, length = keys.length, key; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          result.push(key);
        } else {
          result.push(key.key);
        }
      }
      return result;
    }, $Hash_keys$48.$$arity = 0);
    Opal.def(self, '$length', $Hash_length$49 = function $$length() {
      var self = this;
      return self.$$keys.length;
    }, $Hash_length$49.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$member? */0;
    Opal.def(self, '$merge', $Hash_merge$50 = function $$merge(other) {
      var $iter = $Hash_merge$50.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_merge$50.$$p = null;
      if($iter) $Hash_merge$50.$$p = null;
      ;
      return $send(self.$dup(), 'merge!', [other], block.$to_proc());
    }, $Hash_merge$50.$$arity = 1);
    Opal.def(self, '$merge!', $Hash_merge$excl$51 = function(other) {
      var $iter = $Hash_merge$excl$51.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_merge$excl$51.$$p = null;
      if($iter) $Hash_merge$excl$51.$$p = null;
      ;
      if(!other.$$is_hash) {
        other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      }
      var i, other_keys = other.$$keys, length = other_keys.length, key, value, other_value;
      if(block === nil) {
        for(i = 0; i < length; i++) {
          key = other_keys[i];
          if(key.$$is_string) {
            other_value = other.$$smap[key];
          } else {
            other_value = key.value;
            key = key.key;
          }
          Opal.hash_put(self, key, other_value);
        }
        return self;
      }
      for(i = 0; i < length; i++) {
        key = other_keys[i];
        if(key.$$is_string) {
          other_value = other.$$smap[key];
        } else {
          other_value = key.value;
          key = key.key;
        }
        value = Opal.hash_get(self, key);
        if(value === undefined) {
          Opal.hash_put(self, key, other_value);
          continue;
        }
        Opal.hash_put(self, key, block(key, value, other_value));
      }
      return self;
      ;
    }, $Hash_merge$excl$51.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$rassoc */0;
    /* destroyed: TreeShaking#shake_methods/$rehash */0;
    Opal.def(self, '$reject', $Hash_reject$54 = function $$reject() {
      var $iter = $Hash_reject$54.$$p, block = $iter || nil, $$55, self = this;
      if($iter) $Hash_reject$54.$$p = null;
      if($iter) $Hash_reject$54.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return $send(self, 'enum_for', ["reject"], ($$55 = function() {
          var self = $$55.$$s || this;
          return self.$size();
        }, $$55.$$s = self, $$55.$$arity = 0, $$55));
      }
      ;
      var hash = Opal.hash();
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value, obj; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        obj = block(key, value);
        if(obj === false || obj === nil) {
          Opal.hash_put(hash, key, value);
        }
      }
      return hash;
      ;
    }, $Hash_reject$54.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$reject! */0;
    Opal.def(self, '$replace', $Hash_replace$58 = function $$replace(other) {
      var self = this, $writer = nil;
      other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Hash'), "to_hash");
      Opal.hash_init(self);
      for(var i = 0, other_keys = other.$$keys, length = other_keys.length, key, value, other_value; i < length; i++) {
        key = other_keys[i];
        if(key.$$is_string) {
          other_value = other.$$smap[key];
        } else {
          other_value = key.value;
          key = key.key;
        }
        Opal.hash_put(self, key, other_value);
      }
      ;
      if($truthy(other.$default_proc())) {
        $writer = [other.$default_proc()];
        $send(self, 'default_proc=', Opal.to_a($writer));
        $writer[$rb_minus($writer["length"], 1)];
      } else {
        $writer = [other.$default()];
        $send(self, 'default=', Opal.to_a($writer));
        $writer[$rb_minus($writer["length"], 1)];
      }
      ;
      return self;
    }, $Hash_replace$58.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$select */0;
    /* destroyed: TreeShaking#shake_methods/$select! */0;
    Opal.def(self, '$shift', $Hash_shift$63 = function $$shift() {
      var self = this;
      var keys = self.$$keys, key;
      if(keys.length > 0) {
        key = keys[0];
        key = key.$$is_string ? key : key.key;
        return [key, Opal.hash_delete(self, key)];
      }
      return self.$default(nil);
    }, $Hash_shift$63.$$arity = 0);
    Opal.alias(self, "size", "length");
    Opal.def(self, '$slice', $Hash_slice$64 = function $$slice($a) {
      var $post_args, keys, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      keys = $post_args;
      ;
      var result = Opal.hash();
      for(var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i], value = Opal.hash_get(self, key);
        if(value !== undefined) {
          Opal.hash_put(result, key, value);
        }
      }
      return result;
      ;
    }, $Hash_slice$64.$$arity = -1);
    Opal.alias(self, "store", "[]=");
    Opal.def(self, '$to_a', $Hash_to_a$65 = function $$to_a() {
      var self = this;
      var result = [];
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        result.push([key, value]);
      }
      return result;
    }, $Hash_to_a$65.$$arity = 0);
    Opal.def(self, '$to_h', $Hash_to_h$66 = function $$to_h() {
      var self = this;
      if(self.$$class === Opal.Hash) {
        return self;
      }
      var hash = new Opal.Hash();
      Opal.hash_init(hash);
      Opal.hash_clone(self, hash);
      return hash;
    }, $Hash_to_h$66.$$arity = 0);
    Opal.def(self, '$to_hash', $Hash_to_hash$67 = function $$to_hash() {
      var self = this;
      return self;
    }, $Hash_to_hash$67.$$arity = 0);
    Opal.def(self, '$to_proc', $Hash_to_proc$68 = function $$to_proc() {
      var $$69, self = this;
      return $send(self, 'proc', [], ($$69 = function(key) {
        var self = $$69.$$s || this;
        ;
        if(key == null) {
          self.$raise($$($nesting, 'ArgumentError'), "no key given");
        }
        ;
        return self['$[]'](key);
      }, $$69.$$s = self, $$69.$$arity = -1, $$69));
    }, $Hash_to_proc$68.$$arity = 0);
    Opal.alias(self, "to_s", "inspect");
    /* destroyed: TreeShaking#shake_methods/$transform_keys */0;
    /* destroyed: TreeShaking#shake_methods/$transform_keys! */0;
    /* destroyed: TreeShaking#shake_methods/$transform_values */0;
    /* destroyed: TreeShaking#shake_methods/$transform_values! */0;
    /* destroyed: TreeShaking#shake_methods/$update */0;
    /* destroyed: TreeShaking#shake_methods/$value? */0;
    /* destroyed: TreeShaking#shake_methods/$values_at */0;
    return (Opal.def(self, '$values', $Hash_values$78 = function $$values() {
      var self = this;
      var result = [];
      for(var i = 0, keys = self.$$keys, length = keys.length, key; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          result.push(self.$$smap[key]);
        } else {
          result.push(key.value);
        }
      }
      return result;
    }, $Hash_values$78.$$arity = 0), nil) && 'values';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/number"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/numeric");
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Number');
    var $nesting = [self].concat($parent_nesting), $Number_coerce$2, $Number___id__$3, $Number_$plus$4, $Number_$minus$5, $Number_$$6, $Number_$slash$7, $Number_$percent$8, $Number_$$9, $Number_$$10, $Number_$$11, $Number_$lt$12, $Number_$lt_eq$13, $Number_$gt$14, $Number_$gt_eq$15, $Number_$lt_eq_gt$16, $Number_$lt$lt$17, $Number_$gt$gt$18, $Number_$$$19, $Number_$plus$$20, $Number_$minus$$21, $Number_$$22, $Number_$$$23, $Number_$eq_eq_eq$24, $Number_$eq_eq$25, $Number_abs$26, $Number_abs2$27, $Number_allbits$ques$28, $Number_anybits$ques$29, $Number_angle$30, $Number_bit_length$31, $Number_ceil$32, $Number_chr$33, $Number_denominator$34, $Number_downto$35, $Number_equal$ques$37, $Number_even$ques$38, $Number_floor$39, $Number_gcd$40, $Number_gcdlcm$41, $Number_integer$ques$42, $Number_is_a$ques$43, $Number_instance_of$ques$44, $Number_lcm$45, $Number_next$46, $Number_nobits$ques$47, $Number_nonzero$ques$48, $Number_numerator$49, $Number_odd$ques$50, $Number_ord$51, $Number_pow$52, $Number_pred$53, $Number_quo$54, $Number_rationalize$55, $Number_remainder$56, $Number_round$57, $Number_step$58, $Number_times$60, $Number_to_f$62, $Number_to_i$63, $Number_to_r$64, $Number_to_s$65, $Number_truncate$66, $Number_digits$67, $Number_divmod$68, $Number_upto$69, $Number_zero$ques$71, $Number_size$72, $Number_nan$ques$73, $Number_finite$ques$74, $Number_infinite$ques$75, $Number_positive$ques$76, $Number_negative$ques$77;
    $$($nesting, 'Opal').$bridge(Number, self);
    Opal.defineProperty(self.$$prototype, '$$is_number', true);
    self.$$is_number_class = true;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$1;
      Opal.def(self, '$allocate', $allocate$1 = function $$allocate() {
        var self = this;
        return self.$raise($$($nesting, 'TypeError'), "" + "allocator undefined for " + (self.$name()));
      }, $allocate$1.$$arity = 0);
      Opal.udef(self, '$' + "new");
      ;
      return nil;
      ;
    })(Opal.get_singleton_class(self), $nesting);
    Opal.def(self, '$coerce', $Number_coerce$2 = function $$coerce(other) {
      var self = this;
      if(other === nil) {
        self.$raise($$($nesting, 'TypeError'), "" + "can't convert " + (other.$class()) + " into Float");
      } else if(other.$$is_string) {
        return [self.$Float(other), self];
      } else if(other['$respond_to?']("to_f")) {
        return [$$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Float'), "to_f"), self];
      } else if(other.$$is_number) {
        return [other, self];
      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "can't convert " + (other.$class()) + " into Float");
      }
    }, $Number_coerce$2.$$arity = 1);
    Opal.def(self, '$__id__', $Number___id__$3 = function $$__id__() {
      var self = this;
      return (self * 2) + 1;
    }, $Number___id__$3.$$arity = 0);
    Opal.alias(self, "object_id", "__id__");
    Opal.def(self, '$+', $Number_$plus$4 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self + other;
      } else {
        return self.$__coerced__("+", other);
      }
    }, $Number_$plus$4.$$arity = 1);
    Opal.def(self, '$-', $Number_$minus$5 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self - other;
      } else {
        return self.$__coerced__("-", other);
      }
    }, $Number_$minus$5.$$arity = 1);
    Opal.def(self, '$*', $Number_$$6 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self * other;
      } else {
        return self.$__coerced__("*", other);
      }
    }, $Number_$$6.$$arity = 1);
    Opal.def(self, '$/', $Number_$slash$7 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self / other;
      } else {
        return self.$__coerced__("/", other);
      }
    }, $Number_$slash$7.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$fdiv */0;
    Opal.def(self, '$%', $Number_$percent$8 = function(other) {
      var self = this;
      if(other.$$is_number) {
        if(other == -Infinity) {
          return other;
        } else if(other == 0) {
          self.$raise($$($nesting, 'ZeroDivisionError'), "divided by 0");
        } else if(other < 0 || self < 0) {
          return (self % other + other) % other;
        } else {
          return self % other;
        }
      } else {
        return self.$__coerced__("%", other);
      }
    }, $Number_$percent$8.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$& */0;
    Opal.def(self, '$|', $Number_$$10 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self | other;
      } else {
        return self.$__coerced__("|", other);
      }
    }, $Number_$$10.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$^ */0;
    Opal.def(self, '$<', $Number_$lt$12 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self < other;
      } else {
        return self.$__coerced__("<", other);
      }
    }, $Number_$lt$12.$$arity = 1);
    Opal.def(self, '$<=', $Number_$lt_eq$13 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self <= other;
      } else {
        return self.$__coerced__("<=", other);
      }
    }, $Number_$lt_eq$13.$$arity = 1);
    Opal.def(self, '$>', $Number_$gt$14 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self > other;
      } else {
        return self.$__coerced__(">", other);
      }
    }, $Number_$gt$14.$$arity = 1);
    Opal.def(self, '$>=', $Number_$gt_eq$15 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self >= other;
      } else {
        return self.$__coerced__(">=", other);
      }
    }, $Number_$gt_eq$15.$$arity = 1);
    var spaceship_operator = function(self, other) {
      if(other.$$is_number) {
        if(isNaN(self) || isNaN(other)) {
          return nil;
        }
        if(self > other) {
          return 1;
        } else if(self < other) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return self.$__coerced__("<=>", other);
      }
    };
    Opal.def(self, '$<=>', $Number_$lt_eq_gt$16 = function(other) {
      var self = this;
      try {
        return spaceship_operator(self, other);
      } catch($err) {
        if(Opal.rescue($err, [$$($nesting, 'ArgumentError')])) {
          try {
            return nil;
          } finally {
            Opal.pop_exception();
          }
        } else {
          throw $err;
        }
      }
    }, $Number_$lt_eq_gt$16.$$arity = 1);
    Opal.def(self, '$<<', $Number_$lt$lt$17 = function(count) {
      var self = this;
      count = $$($nesting, 'Opal')['$coerce_to!'](count, $$($nesting, 'Integer'), "to_int");
      return count > 0 ? self << count : self >> -count;
    }, $Number_$lt$lt$17.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$>> */0;
    Opal.def(self, '$[]', $Number_$$$19 = function(bit) {
      var self = this;
      bit = $$($nesting, 'Opal')['$coerce_to!'](bit, $$($nesting, 'Integer'), "to_int");
      if(bit < 0) {
        return 0;
      }
      if(bit >= 32) {
        return self < 0 ? 1 : 0;
      }
      return (self >> bit) & 1;
      ;
    }, $Number_$$$19.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$+@ */0;
    Opal.def(self, '$-@', $Number_$minus$$21 = function() {
      var self = this;
      return -self;
    }, $Number_$minus$$21.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$~ */0;
    Opal.def(self, '$**', $Number_$$$23 = function(other) {
      var $a, $b, self = this;
      if($truthy($$($nesting, 'Integer')['$==='](other))) {
        if($truthy(($truthy($a = $$($nesting, 'Integer')['$==='](self)['$!']()) ? $a : $rb_gt(other, 0)))) {
          return Math.pow(self, other);
        } else {
          return $$($nesting, 'Rational').$new(self, 1)['$**'](other);
        }
      } else if($truthy((($a = $rb_lt(self, 0)) ? ($truthy($b = $$($nesting, 'Float')['$==='](other)) ? $b : $$($nesting, 'Rational')['$==='](other)) : $rb_lt(self, 0)))) {
        return $$($nesting, 'Complex').$new(self, 0)['$**'](other.$to_f());
      } else if($truthy(other.$$is_number != null)) {
        return Math.pow(self, other);
      } else {
        return self.$__coerced__("**", other);
      }
    }, $Number_$$$23.$$arity = 1);
    Opal.def(self, '$===', $Number_$eq_eq_eq$24 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self.valueOf() === other.valueOf();
      } else if(other['$respond_to?']("==")) {
        return other['$=='](self);
      } else {
        return false;
      }
    }, $Number_$eq_eq_eq$24.$$arity = 1);
    Opal.def(self, '$==', $Number_$eq_eq$25 = function(other) {
      var self = this;
      if(other.$$is_number) {
        return self.valueOf() === other.valueOf();
      } else if(other['$respond_to?']("==")) {
        return other['$=='](self);
      } else {
        return false;
      }
    }, $Number_$eq_eq$25.$$arity = 1);
    Opal.def(self, '$abs', $Number_abs$26 = function $$abs() {
      var self = this;
      return Math.abs(self);
    }, $Number_abs$26.$$arity = 0);
    Opal.def(self, '$abs2', $Number_abs2$27 = function $$abs2() {
      var self = this;
      return Math.abs(self * self);
    }, $Number_abs2$27.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$allbits? */0;
    /* destroyed: TreeShaking#shake_methods/$anybits? */0;
    Opal.def(self, '$angle', $Number_angle$30 = function $$angle() {
      var self = this;
      if($truthy(self['$nan?']())) {
        return self;
      }
      ;
      if(self == 0) {
        if(1 / self > 0) {
          return 0;
        } else {
          return Math.PI;
        }
      } else if(self < 0) {
        return Math.PI;
      } else {
        return 0;
      }
      ;
    }, $Number_angle$30.$$arity = 0);
    Opal.alias(self, "arg", "angle");
    /* destroyed: TreeShaking#shake_methods/$phase */0;
    /* destroyed: TreeShaking#shake_methods/$bit_length */0;
    Opal.def(self, '$ceil', $Number_ceil$32 = function $$ceil(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      var f = self.$to_f();
      if(f % 1 === 0 && ndigits >= 0) {
        return f;
      }
      var factor = Math.pow(10, ndigits), result = Math.ceil(f * factor) / factor;
      if(f % 1 === 0) {
        result = Math.round(result);
      }
      return result;
      ;
    }, $Number_ceil$32.$$arity = -1);
    Opal.def(self, '$chr', $Number_chr$33 = function $$chr(encoding) {
      var self = this;
      ;
      return String.fromCharCode(self);
      ;
    }, $Number_chr$33.$$arity = -1);
    Opal.def(self, '$denominator', $Number_denominator$34 = function $$denominator() {
      var $a, $iter = $Number_denominator$34.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_denominator$34.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy(($truthy($a = self['$nan?']()) ? $a : self['$infinite?']()))) {
        return 1;
      } else {
        return $send(self, Opal.find_super_dispatcher(self, 'denominator', $Number_denominator$34, false), $zuper, $iter);
      }
    }, $Number_denominator$34.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$downto */0;
    Opal.alias(self, "eql?", "==");
    Opal.def(self, '$equal?', $Number_equal$ques$37 = function(other) {
      var $a, self = this;
      return ($truthy($a = self['$=='](other)) ? $a : isNaN(self) && isNaN(other));
    }, $Number_equal$ques$37.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$even? */0;
    Opal.def(self, '$floor', $Number_floor$39 = function $$floor(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      var f = self.$to_f();
      if(f % 1 === 0 && ndigits >= 0) {
        return f;
      }
      var factor = Math.pow(10, ndigits), result = Math.floor(f * factor) / factor;
      if(f % 1 === 0) {
        result = Math.round(result);
      }
      return result;
      ;
    }, $Number_floor$39.$$arity = -1);
    Opal.def(self, '$gcd', $Number_gcd$40 = function $$gcd(other) {
      var self = this;
      if($truthy($$($nesting, 'Integer')['$==='](other))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "not an integer");
      }
      ;
      var min = Math.abs(self), max = Math.abs(other);
      while(min > 0) {
        var tmp = min;
        min = max % min;
        max = tmp;
      }
      return max;
      ;
    }, $Number_gcd$40.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$gcdlcm */0;
    /* destroyed: TreeShaking#shake_methods/$integer? */0;
    Opal.def(self, '$is_a?', $Number_is_a$ques$43 = function(klass) {
      var $a, $iter = $Number_is_a$ques$43.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_is_a$ques$43.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy((($a = klass['$==']($$($nesting, 'Integer'))) ? $$($nesting, 'Integer')['$==='](self) : klass['$==']($$($nesting, 'Integer'))))) {
        return true;
      }
      ;
      if($truthy((($a = klass['$==']($$($nesting, 'Integer'))) ? $$($nesting, 'Integer')['$==='](self) : klass['$==']($$($nesting, 'Integer'))))) {
        return true;
      }
      ;
      if($truthy((($a = klass['$==']($$($nesting, 'Float'))) ? $$($nesting, 'Float')['$==='](self) : klass['$==']($$($nesting, 'Float'))))) {
        return true;
      }
      ;
      return $send(self, Opal.find_super_dispatcher(self, 'is_a?', $Number_is_a$ques$43, false), $zuper, $iter);
    }, $Number_is_a$ques$43.$$arity = 1);
    Opal.alias(self, "kind_of?", "is_a?");
    Opal.def(self, '$instance_of?', $Number_instance_of$ques$44 = function(klass) {
      var $a, $iter = $Number_instance_of$ques$44.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_instance_of$ques$44.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy((($a = klass['$==']($$($nesting, 'Integer'))) ? $$($nesting, 'Integer')['$==='](self) : klass['$==']($$($nesting, 'Integer'))))) {
        return true;
      }
      ;
      if($truthy((($a = klass['$==']($$($nesting, 'Integer'))) ? $$($nesting, 'Integer')['$==='](self) : klass['$==']($$($nesting, 'Integer'))))) {
        return true;
      }
      ;
      if($truthy((($a = klass['$==']($$($nesting, 'Float'))) ? $$($nesting, 'Float')['$==='](self) : klass['$==']($$($nesting, 'Float'))))) {
        return true;
      }
      ;
      return $send(self, Opal.find_super_dispatcher(self, 'instance_of?', $Number_instance_of$ques$44, false), $zuper, $iter);
    }, $Number_instance_of$ques$44.$$arity = 1);
    Opal.def(self, '$lcm', $Number_lcm$45 = function $$lcm(other) {
      var self = this;
      if($truthy($$($nesting, 'Integer')['$==='](other))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "not an integer");
      }
      ;
      if(self == 0 || other == 0) {
        return 0;
      } else {
        return Math.abs(self * other / self.$gcd(other));
      }
      ;
    }, $Number_lcm$45.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$magnitude */0;
    /* destroyed: TreeShaking#shake_methods/$modulo */0;
    Opal.def(self, '$next', $Number_next$46 = function $$next() {
      var self = this;
      return self + 1;
    }, $Number_next$46.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$nobits? */0;
    /* destroyed: TreeShaking#shake_methods/$nonzero? */0;
    Opal.def(self, '$numerator', $Number_numerator$49 = function $$numerator() {
      var $a, $iter = $Number_numerator$49.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_numerator$49.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy(($truthy($a = self['$nan?']()) ? $a : self['$infinite?']()))) {
        return self;
      } else {
        return $send(self, Opal.find_super_dispatcher(self, 'numerator', $Number_numerator$49, false), $zuper, $iter);
      }
    }, $Number_numerator$49.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$odd? */0;
    Opal.def(self, '$ord', $Number_ord$51 = function $$ord() {
      var self = this;
      return self;
    }, $Number_ord$51.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$pow */0;
    /* destroyed: TreeShaking#shake_methods/$pred */0;
    Opal.def(self, '$quo', $Number_quo$54 = function $$quo(other) {
      var $iter = $Number_quo$54.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_quo$54.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy($$($nesting, 'Integer')['$==='](self))) {
        return $send(self, Opal.find_super_dispatcher(self, 'quo', $Number_quo$54, false), $zuper, $iter);
      } else {
        return $rb_divide(self, other);
      }
    }, $Number_quo$54.$$arity = 1);
    Opal.def(self, '$rationalize', $Number_rationalize$55 = function $$rationalize(eps) {
      var $a, $b, self = this, f = nil, n = nil;
      ;
      if(arguments.length > 1) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "wrong number of arguments (" + (arguments.length) + " for 0..1)");
      }
      ;
      if($truthy($$($nesting, 'Integer')['$==='](self))) {
        return $$($nesting, 'Rational').$new(self, 1);
      } else if($truthy(self['$infinite?']())) {
        return self.$raise($$($nesting, 'FloatDomainError'), "Infinity");
      } else if($truthy(self['$nan?']())) {
        return self.$raise($$($nesting, 'FloatDomainError'), "NaN");
      } else if($truthy(eps == null)) {
        $b = $$($nesting, 'Math').$frexp(self), $a = Opal.to_ary($b), (f = ($a[0] == null ? nil : $a[0])), (n = ($a[1] == null ? nil : $a[1])), $b;
        f = $$($nesting, 'Math').$ldexp(f, $$$($$($nesting, 'Float'), 'MANT_DIG')).$to_i();
        n = $rb_minus(n, $$$($$($nesting, 'Float'), 'MANT_DIG'));
        return $$($nesting, 'Rational').$new($rb_times(2, f), (1)['$<<']($rb_minus(1, n))).$rationalize($$($nesting, 'Rational').$new(1, (1)['$<<']($rb_minus(1, n))));
      } else {
        return self.$to_r().$rationalize(eps);
      }
      ;
    }, $Number_rationalize$55.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$remainder */0;
    Opal.def(self, '$round', $Number_round$57 = function $$round(ndigits) {
      var $a, $b, self = this, _ = nil, exp = nil;
      ;
      if($truthy($$($nesting, 'Integer')['$==='](self))) {
        if($truthy(ndigits == null)) {
          return self;
        }
        ;
        if($truthy(($truthy($a = $$($nesting, 'Float')['$==='](ndigits)) ? ndigits['$infinite?']() : $a))) {
          self.$raise($$($nesting, 'RangeError'), "Infinity");
        }
        ;
        ndigits = $$($nesting, 'Opal')['$coerce_to!'](ndigits, $$($nesting, 'Integer'), "to_int");
        if($truthy($rb_lt(ndigits, $$$($$($nesting, 'Integer'), 'MIN')))) {
          self.$raise($$($nesting, 'RangeError'), "out of bounds");
        }
        ;
        if($truthy(ndigits >= 0)) {
          return self;
        }
        ;
        ndigits = ndigits['$-@']();
        if(0.415241 * ndigits - 0.125 > self.$size()) {
          return 0;
        }
        var f = Math.pow(10, ndigits), x = Math.floor((Math.abs(x) + f / 2) / f) * f;
        return self < 0 ? -x : x;
        ;
      } else {
        if($truthy(($truthy($a = self['$nan?']()) ? ndigits == null : $a))) {
          self.$raise($$($nesting, 'FloatDomainError'), "NaN");
        }
        ;
        ndigits = $$($nesting, 'Opal')['$coerce_to!'](ndigits || 0, $$($nesting, 'Integer'), "to_int");
        if($truthy($rb_le(ndigits, 0))) {
          if($truthy(self['$nan?']())) {
            self.$raise($$($nesting, 'RangeError'), "NaN");
          } else if($truthy(self['$infinite?']())) {
            self.$raise($$($nesting, 'FloatDomainError'), "Infinity");
          }
        } else if(ndigits['$=='](0)) {
          return Math.round(self);
        } else if($truthy(($truthy($a = self['$nan?']()) ? $a : self['$infinite?']()))) {
          return self;
        }
        ;
        $b = $$($nesting, 'Math').$frexp(self), $a = Opal.to_ary($b), (_ = ($a[0] == null ? nil : $a[0])), (exp = ($a[1] == null ? nil : $a[1])), $b;
        if($truthy($rb_ge(ndigits, $rb_minus($rb_plus($$$($$($nesting, 'Float'), 'DIG'), 2), (function() {
          if($truthy($rb_gt(exp, 0))) {
            return $rb_divide(exp, 4);
          } else {
            return $rb_minus($rb_divide(exp, 3), 1);
          }
          ;
          return nil;
        })())))) {
          return self;
        }
        ;
        if($truthy($rb_lt(ndigits, (function() {
          if($truthy($rb_gt(exp, 0))) {
            return $rb_plus($rb_divide(exp, 3), 1);
          } else {
            return $rb_divide(exp, 4);
          }
          ;
          return nil;
        })()['$-@']()))) {
          return 0;
        }
        ;
        return Math.round(self * Math.pow(10, ndigits)) / Math.pow(10, ndigits);
        ;
      }
      ;
    }, $Number_round$57.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$step */0;
    Opal.alias(self, "succ", "next");
    Opal.def(self, '$times', $Number_times$60 = function $$times() {
      var $iter = $Number_times$60.$$p, block = $iter || nil, $$61, self = this;
      if($iter) $Number_times$60.$$p = null;
      if($iter) $Number_times$60.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return $send(self, 'enum_for', ["times"], ($$61 = function() {
          var self = $$61.$$s || this;
          return self;
        }, $$61.$$s = self, $$61.$$arity = 0, $$61));
      }
      ;
      for(var i = 0; i < self; i++) {
        block(i);
      }
      ;
      return self;
    }, $Number_times$60.$$arity = 0);
    Opal.def(self, '$to_f', $Number_to_f$62 = function $$to_f() {
      var self = this;
      return self;
    }, $Number_to_f$62.$$arity = 0);
    Opal.def(self, '$to_i', $Number_to_i$63 = function $$to_i() {
      var self = this;
      return parseInt(self, 10);
    }, $Number_to_i$63.$$arity = 0);
    Opal.alias(self, "to_int", "to_i");
    Opal.def(self, '$to_r', $Number_to_r$64 = function $$to_r() {
      var $a, $b, self = this, f = nil, e = nil;
      if($truthy($$($nesting, 'Integer')['$==='](self))) {
        return $$($nesting, 'Rational').$new(self, 1);
      } else {
        $b = $$($nesting, 'Math').$frexp(self), $a = Opal.to_ary($b), (f = ($a[0] == null ? nil : $a[0])), (e = ($a[1] == null ? nil : $a[1])), $b;
        f = $$($nesting, 'Math').$ldexp(f, $$$($$($nesting, 'Float'), 'MANT_DIG')).$to_i();
        e = $rb_minus(e, $$$($$($nesting, 'Float'), 'MANT_DIG'));
        return $rb_times(f, $$$($$($nesting, 'Float'), 'RADIX')['$**'](e)).$to_r();
      }
    }, $Number_to_r$64.$$arity = 0);
    Opal.def(self, '$to_s', $Number_to_s$65 = function $$to_s(base) {
      var $a, self = this;
      if(base == null) {
        base = 10;
      }
      ;
      base = $$($nesting, 'Opal')['$coerce_to!'](base, $$($nesting, 'Integer'), "to_int");
      if($truthy(($truthy($a = $rb_lt(base, 2)) ? $a : $rb_gt(base, 36)))) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "invalid radix " + (base));
      }
      ;
      return self.toString(base);
      ;
    }, $Number_to_s$65.$$arity = -1);
    Opal.def(self, '$truncate', $Number_truncate$66 = function $$truncate(ndigits) {
      var self = this;
      if(ndigits == null) {
        ndigits = 0;
      }
      ;
      var f = self.$to_f();
      if(f % 1 === 0 && ndigits >= 0) {
        return f;
      }
      var factor = Math.pow(10, ndigits), result = parseInt(f * factor, 10) / factor;
      if(f % 1 === 0) {
        result = Math.round(result);
      }
      return result;
      ;
    }, $Number_truncate$66.$$arity = -1);
    Opal.alias(self, "inspect", "to_s");
    /* destroyed: TreeShaking#shake_methods/$digits */0;
    Opal.def(self, '$divmod', $Number_divmod$68 = function $$divmod(other) {
      var $a, $iter = $Number_divmod$68.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Number_divmod$68.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if($truthy(($truthy($a = self['$nan?']()) ? $a : other['$nan?']()))) {
        return self.$raise($$($nesting, 'FloatDomainError'), "NaN");
      } else if($truthy(self['$infinite?']())) {
        return self.$raise($$($nesting, 'FloatDomainError'), "Infinity");
      } else {
        return $send(self, Opal.find_super_dispatcher(self, 'divmod', $Number_divmod$68, false), $zuper, $iter);
      }
    }, $Number_divmod$68.$$arity = 1);
    Opal.def(self, '$upto', $Number_upto$69 = function $$upto(stop) {
      var $iter = $Number_upto$69.$$p, block = $iter || nil, $$70, self = this;
      if($iter) $Number_upto$69.$$p = null;
      if($iter) $Number_upto$69.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return $send(self, 'enum_for', ["upto", stop], ($$70 = function() {
          var self = $$70.$$s || this;
          if($truthy($$($nesting, 'Numeric')['$==='](stop))) {

          } else {
            self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + (self.$class()) + " with " + (stop.$class()) + " failed");
          }
          ;
          if($truthy($rb_lt(stop, self))) {
            return 0;
          } else {
            return $rb_plus($rb_minus(stop, self), 1);
          }
          ;
        }, $$70.$$s = self, $$70.$$arity = 0, $$70));
      }
      ;
      if(!stop.$$is_number) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "comparison of " + (self.$class()) + " with " + (stop.$class()) + " failed");
      }
      for(var i = self; i <= stop; i++) {
        block(i);
      }
      ;
      return self;
    }, $Number_upto$69.$$arity = 1);
    Opal.def(self, '$zero?', $Number_zero$ques$71 = function() {
      var self = this;
      return self == 0;
    }, $Number_zero$ques$71.$$arity = 0);
    Opal.def(self, '$size', $Number_size$72 = function $$size() {
      var self = this;
      return 4;
    }, $Number_size$72.$$arity = 0);
    Opal.def(self, '$nan?', $Number_nan$ques$73 = function() {
      var self = this;
      return isNaN(self);
    }, $Number_nan$ques$73.$$arity = 0);
    Opal.def(self, '$finite?', $Number_finite$ques$74 = function() {
      var self = this;
      return self != Infinity && self != -Infinity && !isNaN(self);
    }, $Number_finite$ques$74.$$arity = 0);
    Opal.def(self, '$infinite?', $Number_infinite$ques$75 = function() {
      var self = this;
      if(self == Infinity) {
        return +1;
      } else if(self == -Infinity) {
        return -1;
      } else {
        return nil;
      }
    }, $Number_infinite$ques$75.$$arity = 0);
    Opal.def(self, '$positive?', $Number_positive$ques$76 = function() {
      var self = this;
      return self != 0 && (self == Infinity || 1 / self > 0);
    }, $Number_positive$ques$76.$$arity = 0);
    return (Opal.def(self, '$negative?', $Number_negative$ques$77 = function() {
      var self = this;
      return self == -Infinity || 1 / self < 0;
    }, $Number_negative$ques$77.$$arity = 0), nil) && 'negative?';
  })($nesting[0], $$($nesting, 'Numeric'), $nesting);
  Opal.const_set($nesting[0], 'Fixnum', $$($nesting, 'Number'));
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Integer');
    var $nesting = [self].concat($parent_nesting);
    self.$$is_number_class = true;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$78, $eq_eq_eq$79, $sqrt$80;
      Opal.def(self, '$allocate', $allocate$78 = function $$allocate() {
        var self = this;
        return self.$raise($$($nesting, 'TypeError'), "" + "allocator undefined for " + (self.$name()));
      }, $allocate$78.$$arity = 0);
      Opal.udef(self, '$' + "new");
      ;
      Opal.def(self, '$===', $eq_eq_eq$79 = function(other) {
        var self = this;
        if(!other.$$is_number) {
          return false;
        }
        return (other % 1) === 0;
      }, $eq_eq_eq$79.$$arity = 1);
      return (/* destroyed: TreeShaking#shake_methods/$sqrt */0, nil) && 'sqrt';
    })(Opal.get_singleton_class(self), $nesting);
    Opal.const_set($nesting[0], 'MAX', Math.pow(2, 30) - 1);
    return Opal.const_set($nesting[0], 'MIN', -Math.pow(2, 30));
  })($nesting[0], $$($nesting, 'Numeric'), $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Float');
    var $nesting = [self].concat($parent_nesting);
    self.$$is_number_class = true;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $allocate$81, $eq_eq_eq$82;
      Opal.def(self, '$allocate', $allocate$81 = function $$allocate() {
        var self = this;
        return self.$raise($$($nesting, 'TypeError'), "" + "allocator undefined for " + (self.$name()));
      }, $allocate$81.$$arity = 0);
      Opal.udef(self, '$' + "new");
      ;
      return (Opal.def(self, '$===', $eq_eq_eq$82 = function(other) {
        var self = this;
        return !!other.$$is_number;
      }, $eq_eq_eq$82.$$arity = 1), nil) && '===';
    })(Opal.get_singleton_class(self), $nesting);
    Opal.const_set($nesting[0], 'INFINITY', Infinity);
    Opal.const_set($nesting[0], 'MAX', Number.MAX_VALUE);
    Opal.const_set($nesting[0], 'MIN', Number.MIN_VALUE);
    Opal.const_set($nesting[0], 'NAN', NaN);
    Opal.const_set($nesting[0], 'DIG', 15);
    Opal.const_set($nesting[0], 'MANT_DIG', 53);
    Opal.const_set($nesting[0], 'RADIX', 2);
    return Opal.const_set($nesting[0], 'EPSILON', Number.EPSILON || 2.220446049250313e-16);
  })($nesting[0], $$($nesting, 'Numeric'), $nesting);
};
Opal.modules["corelib/range"] = function(Opal) {
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/enumerable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Range');
    var $nesting = [self].concat($parent_nesting), $Range_initialize$1, $Range_$eq_eq$2, $Range_$eq_eq_eq$3, $Range_cover$ques$4, $Range_each$5, $Range_eql$ques$6, $Range_exclude_end$ques$7, $Range_first$8, $Range_last$9, $Range_max$10, $Range_min$11, $Range_size$12, $Range_step$13, $Range_bsearch$17, $Range_to_s$18, $Range_inspect$19, $Range_marshal_load$20, $Range_hash$21;
    self.$$prototype.begin = self.$$prototype.end = self.$$prototype.excl = nil;
    self.$include($$($nesting, 'Enumerable'));
    self.$$prototype.$$is_range = true;
    self.$attr_reader("begin", "end");
    Opal.def(self, '$initialize', $Range_initialize$1 = function $$initialize(first, last, exclude) {
      var self = this;
      if(exclude == null) {
        exclude = false;
      }
      ;
      if($truthy(self.begin)) {
        self.$raise($$($nesting, 'NameError'), "'initialize' called twice");
      }
      ;
      if($truthy(first['$<=>'](last))) {

      } else {
        self.$raise($$($nesting, 'ArgumentError'), "bad value for range");
      }
      ;
      self.begin = first;
      self.end = last;
      return (self.excl = exclude);
    }, $Range_initialize$1.$$arity = -3);
    Opal.def(self, '$==', $Range_$eq_eq$2 = function(other) {
      var self = this;
      if(!other.$$is_range) {
        return false;
      }
      return self.excl === other.excl && self.begin == other.begin && self.end == other.end;
    }, $Range_$eq_eq$2.$$arity = 1);
    Opal.def(self, '$===', $Range_$eq_eq_eq$3 = function(value) {
      var self = this;
      return self['$include?'](value);
    }, $Range_$eq_eq_eq$3.$$arity = 1);
    Opal.def(self, '$cover?', $Range_cover$ques$4 = function(value) {
      var $a, self = this, beg_cmp = nil, end_cmp = nil;
      beg_cmp = self.begin['$<=>'](value);
      if($truthy(($truthy($a = beg_cmp) ? $rb_le(beg_cmp, 0) : $a))) {

      } else {
        return false;
      }
      ;
      end_cmp = value['$<=>'](self.end);
      if($truthy(self.excl)) {
        return ($truthy($a = end_cmp) ? $rb_lt(end_cmp, 0) : $a);
      } else {
        return ($truthy($a = end_cmp) ? $rb_le(end_cmp, 0) : $a);
      }
      ;
    }, $Range_cover$ques$4.$$arity = 1);
    Opal.def(self, '$each', $Range_each$5 = function $$each() {
      var $iter = $Range_each$5.$$p, block = $iter || nil, $a, self = this, current = nil, last = nil;
      if($iter) $Range_each$5.$$p = null;
      if($iter) $Range_each$5.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("each");
      }
      ;
      var i, limit;
      if(self.begin.$$is_number && self.end.$$is_number) {
        if(self.begin % 1 !== 0 || self.end % 1 !== 0) {
          self.$raise($$($nesting, 'TypeError'), "can't iterate from Float");
        }
        for(i = self.begin, limit = self.end + (function() {
          if($truthy(self.excl)) {
            return 0;
          } else {
            return 1;
          }
          ;
          return nil;
        })(); i < limit; i++) {
          block(i);
        }
        return self;
      }
      if(self.begin.$$is_string && self.end.$$is_string) {
        $send(self.begin, 'upto', [self.end, self.excl], block.$to_proc());
        return self;
      }
      ;
      current = self.begin;
      last = self.end;
      if($truthy(current['$respond_to?']("succ"))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "can't iterate from " + (current.$class()));
      }
      ;
      while($truthy($rb_lt(current['$<=>'](last), 0))) {
        Opal.yield1(block, current);
        current = current.$succ();
      }
      ;
      if($truthy(($truthy($a = self.excl['$!']()) ? current['$=='](last) : $a))) {
        Opal.yield1(block, current);
      }
      ;
      return self;
    }, $Range_each$5.$$arity = 0);
    Opal.def(self, '$eql?', $Range_eql$ques$6 = function(other) {
      var $a, $b, self = this;
      if($truthy($$($nesting, 'Range')['$==='](other))) {

      } else {
        return false;
      }
      ;
      return ($truthy($a = ($truthy($b = self.excl['$==='](other['$exclude_end?']())) ? self.begin['$eql?'](other.$begin()) : $b)) ? self.end['$eql?'](other.$end()) : $a);
    }, $Range_eql$ques$6.$$arity = 1);
    Opal.def(self, '$exclude_end?', $Range_exclude_end$ques$7 = function() {
      var self = this;
      return self.excl;
    }, $Range_exclude_end$ques$7.$$arity = 0);
    Opal.def(self, '$first', $Range_first$8 = function $$first(n) {
      var $iter = $Range_first$8.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Range_first$8.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      ;
      if($truthy(n == null)) {
        return self.begin;
      }
      ;
      return $send(self, Opal.find_super_dispatcher(self, 'first', $Range_first$8, false), $zuper, $iter);
    }, $Range_first$8.$$arity = -1);
    Opal.alias(self, "include?", "cover?");
    Opal.def(self, '$last', $Range_last$9 = function $$last(n) {
      var self = this;
      ;
      if($truthy(n == null)) {
        return self.end;
      }
      ;
      return self.$to_a().$last(n);
    }, $Range_last$9.$$arity = -1);
    Opal.def(self, '$max', $Range_max$10 = function $$max() {
      var $a, $iter = $Range_max$10.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Range_max$10.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if(($yield !== nil)) {
        return $send(self, Opal.find_super_dispatcher(self, 'max', $Range_max$10, false), $zuper, $iter);
      } else if($truthy($rb_gt(self.begin, self.end))) {
        return nil;
      } else if($truthy(($truthy($a = self.excl) ? self.begin['$=='](self.end) : $a))) {
        return nil;
      } else {
        return self.excl ? self.end - 1 : self.end;
      }
    }, $Range_max$10.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$member? */0;
    Opal.def(self, '$min', $Range_min$11 = function $$min() {
      var $a, $iter = $Range_min$11.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
      if($iter) $Range_min$11.$$p = null;
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      if(($yield !== nil)) {
        return $send(self, Opal.find_super_dispatcher(self, 'min', $Range_min$11, false), $zuper, $iter);
      } else if($truthy($rb_gt(self.begin, self.end))) {
        return nil;
      } else if($truthy(($truthy($a = self.excl) ? self.begin['$=='](self.end) : $a))) {
        return nil;
      } else {
        return self.begin;
      }
    }, $Range_min$11.$$arity = 0);
    Opal.def(self, '$size', $Range_size$12 = function $$size() {
      var $a, self = this, range_begin = nil, range_end = nil, infinity = nil;
      range_begin = self.begin;
      range_end = self.end;
      if($truthy(self.excl)) {
        range_end = $rb_minus(range_end, 1);
      }
      ;
      if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](range_begin)) ? $$($nesting, 'Numeric')['$==='](range_end) : $a))) {

      } else {
        return nil;
      }
      ;
      if($truthy($rb_lt(range_end, range_begin))) {
        return 0;
      }
      ;
      infinity = $$$($$($nesting, 'Float'), 'INFINITY');
      if($truthy([range_begin.$abs(), range_end.$abs()]['$include?'](infinity))) {
        return infinity;
      }
      ;
      return (Math.abs(range_end - range_begin) + 1).$to_i();
    }, $Range_size$12.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$step */0;
    Opal.def(self, '$bsearch', $Range_bsearch$17 = function $$bsearch() {
      var $iter = $Range_bsearch$17.$$p, block = $iter || nil, self = this;
      if($iter) $Range_bsearch$17.$$p = null;
      if($iter) $Range_bsearch$17.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("bsearch");
      }
      ;
      if($truthy(self.begin.$$is_number && self.end.$$is_number)) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "can't do binary search for " + (self.begin.$class()));
      }
      ;
      return $send(self.$to_a(), 'bsearch', [], block.$to_proc());
    }, $Range_bsearch$17.$$arity = 0);
    Opal.def(self, '$to_s', $Range_to_s$18 = function $$to_s() {
      var self = this;
      return "" + (self.begin) + ((function() {
        if($truthy(self.excl)) {
          return "...";
        } else {
          return "..";
        }
        ;
        return nil;
      })()) + (self.end);
    }, $Range_to_s$18.$$arity = 0);
    Opal.def(self, '$inspect', $Range_inspect$19 = function $$inspect() {
      var self = this;
      return "" + (self.begin.$inspect()) + ((function() {
        if($truthy(self.excl)) {
          return "...";
        } else {
          return "..";
        }
        ;
        return nil;
      })()) + (self.end.$inspect());
    }, $Range_inspect$19.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$marshal_load */0;
    return (Opal.def(self, '$hash', $Range_hash$21 = function $$hash() {
      var self = this;
      return [self.begin, self.end, self.excl].$hash();
    }, $Range_hash$21.$$arity = 0), nil) && 'hash';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/proc"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Proc');
    var $nesting = [self].concat($parent_nesting), $Proc_new$1, $Proc_call$2, $Proc_to_proc$3, $Proc_lambda$ques$4, $Proc_arity$5, $Proc_source_location$6, $Proc_binding$7, $Proc_parameters$8, $Proc_curry$9, $Proc_dup$10;
    Opal.defineProperty(self.$$prototype, '$$is_proc', true);
    Opal.defineProperty(self.$$prototype, '$$is_lambda', false);
    Opal.defs(self, '$new', $Proc_new$1 = function() {
      var $iter = $Proc_new$1.$$p, block = $iter || nil, self = this;
      if($iter) $Proc_new$1.$$p = null;
      if($iter) $Proc_new$1.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        self.$raise($$($nesting, 'ArgumentError'), "tried to create a Proc object without a block");
      }
      ;
      return block;
    }, $Proc_new$1.$$arity = 0);
    Opal.def(self, '$call', $Proc_call$2 = function $$call($a) {
      var $iter = $Proc_call$2.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Proc_call$2.$$p = null;
      if($iter) $Proc_call$2.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if(block !== nil) {
        self.$$p = block;
      }
      var result, $brk = self.$$brk;
      if($brk) {
        try {
          if(self.$$is_lambda) {
            result = self.apply(null, args);
          } else {
            result = Opal.yieldX(self, args);
          }
        } catch(err) {
          if(err === $brk) {
            return $brk.$v;
          } else {
            throw err;
          }
        }
      } else {
        if(self.$$is_lambda) {
          result = self.apply(null, args);
        } else {
          result = Opal.yieldX(self, args);
        }
      }
      return result;
      ;
    }, $Proc_call$2.$$arity = -1);
    Opal.alias(self, "[]", "call");
    Opal.alias(self, "===", "call");
    Opal.alias(self, "yield", "call");
    Opal.def(self, '$to_proc', $Proc_to_proc$3 = function $$to_proc() {
      var self = this;
      return self;
    }, $Proc_to_proc$3.$$arity = 0);
    Opal.def(self, '$lambda?', $Proc_lambda$ques$4 = function() {
      var self = this;
      return !!self.$$is_lambda;
    }, $Proc_lambda$ques$4.$$arity = 0);
    Opal.def(self, '$arity', $Proc_arity$5 = function $$arity() {
      var self = this;
      if(self.$$is_curried) {
        return -1;
      } else {
        return self.$$arity;
      }
    }, $Proc_arity$5.$$arity = 0);
    Opal.def(self, '$source_location', $Proc_source_location$6 = function $$source_location() {
      var self = this;
      if(self.$$is_curried) {
        return nil;
      }
      ;
      return nil;
    }, $Proc_source_location$6.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$binding */0;
    /* destroyed: TreeShaking#shake_methods/$parameters */0;
    /* destroyed: TreeShaking#shake_methods/$curry */0;
    Opal.def(self, '$dup', $Proc_dup$10 = function $$dup() {
      var self = this;
      var original_proc = self.$$original_proc || self, proc = function() {
        return original_proc.apply(this, arguments);
      };
      for(var prop in self) {
        if(self.hasOwnProperty(prop)) {
          proc[prop] = self[prop];
        }
      }
      return proc;
    }, $Proc_dup$10.$$arity = 0);
    return Opal.alias(self, "clone", "dup");
  })($nesting[0], Function, $nesting);
};
Opal.modules["corelib/method"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Method');
    var $nesting = [self].concat($parent_nesting), $Method_initialize$1, $Method_arity$2, $Method_parameters$3, $Method_source_location$4, $Method_comments$5, $Method_call$6, $Method_unbind$7, $Method_to_proc$8, $Method_inspect$9;
    self.$$prototype.method = self.$$prototype.receiver = self.$$prototype.owner = self.$$prototype.name = nil;
    self.$attr_reader("owner", "receiver", "name");
    Opal.def(self, '$initialize', $Method_initialize$1 = function $$initialize(receiver, owner, method, name) {
      var self = this;
      self.receiver = receiver;
      self.owner = owner;
      self.name = name;
      return (self.method = method);
    }, $Method_initialize$1.$$arity = 4);
    Opal.def(self, '$arity', $Method_arity$2 = function $$arity() {
      var self = this;
      return self.method.$arity();
    }, $Method_arity$2.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$parameters */0;
    Opal.def(self, '$source_location', $Method_source_location$4 = function $$source_location() {
      var $a, self = this;
      return ($truthy($a = self.method.$$source_location) ? $a : ["(eval)", 0]);
    }, $Method_source_location$4.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$comments */0;
    Opal.def(self, '$call', $Method_call$6 = function $$call($a) {
      var $iter = $Method_call$6.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Method_call$6.$$p = null;
      if($iter) $Method_call$6.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      self.method.$$p = block;
      return self.method.apply(self.receiver, args);
      ;
    }, $Method_call$6.$$arity = -1);
    Opal.alias(self, "[]", "call");
    /* destroyed: TreeShaking#shake_methods/$unbind */0;
    Opal.def(self, '$to_proc', $Method_to_proc$8 = function $$to_proc() {
      var self = this;
      var proc = self.$call.bind(self);
      proc.$$unbound = self.method;
      proc.$$is_lambda = true;
      proc.$$arity = self.method.$$arity;
      proc.$$parameters = self.method.$$parameters;
      return proc;
    }, $Method_to_proc$8.$$arity = 0);
    return (Opal.def(self, '$inspect', $Method_inspect$9 = function $$inspect() {
      var self = this;
      return "" + "#<" + (self.$class()) + ": " + (self.receiver.$class()) + "#" + (self.name) + " (defined in " + (self.owner) + " in " + (self.$source_location().$join(":")) + ")>";
    }, $Method_inspect$9.$$arity = 0), nil) && 'inspect';
  })($nesting[0], null, $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'UnboundMethod');
    var $nesting = [self].concat($parent_nesting), $UnboundMethod_initialize$10, $UnboundMethod_arity$11, $UnboundMethod_parameters$12, $UnboundMethod_source_location$13, $UnboundMethod_comments$14, $UnboundMethod_bind$15, $UnboundMethod_inspect$16;
    self.$$prototype.method = self.$$prototype.owner = self.$$prototype.name = self.$$prototype.source = nil;
    self.$attr_reader("source", "owner", "name");
    Opal.def(self, '$initialize', $UnboundMethod_initialize$10 = function $$initialize(source, owner, method, name) {
      var self = this;
      self.source = source;
      self.owner = owner;
      self.method = method;
      return (self.name = name);
    }, $UnboundMethod_initialize$10.$$arity = 4);
    Opal.def(self, '$arity', $UnboundMethod_arity$11 = function $$arity() {
      var self = this;
      return self.method.$arity();
    }, $UnboundMethod_arity$11.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$parameters */0;
    Opal.def(self, '$source_location', $UnboundMethod_source_location$13 = function $$source_location() {
      var $a, self = this;
      return ($truthy($a = self.method.$$source_location) ? $a : ["(eval)", 0]);
    }, $UnboundMethod_source_location$13.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$comments */0;
    Opal.def(self, '$bind', $UnboundMethod_bind$15 = function $$bind(object) {
      var self = this;
      if(self.owner.$$is_module || Opal.is_a(object, self.owner)) {
        return $$($nesting, 'Method').$new(object, self.owner, self.method, self.name);
      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "can't bind singleton method to a different class (expected " + (object) + ".kind_of?(" + (self.owner) + " to be true)");
      }
    }, $UnboundMethod_bind$15.$$arity = 1);
    return (Opal.def(self, '$inspect', $UnboundMethod_inspect$16 = function $$inspect() {
      var self = this;
      return "" + "#<" + (self.$class()) + ": " + (self.source) + "#" + (self.name) + " (defined in " + (self.owner) + " in " + (self.$source_location().$join(":")) + ")>";
    }, $UnboundMethod_inspect$16.$$arity = 0), nil) && 'inspect';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/variables"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $gvars = Opal.gvars, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  $gvars['&'] = $gvars['~'] = $gvars['`'] = $gvars["'"] = nil;
  $gvars.LOADED_FEATURES = ($gvars["\""] = Opal.loaded_features);
  $gvars.LOAD_PATH = ($gvars[":"] = []);
  $gvars["/"] = "\n";
  $gvars[","] = nil;
  Opal.const_set($nesting[0], 'ARGV', []);
  Opal.const_set($nesting[0], 'ARGF', $$($nesting, 'Object').$new());
  Opal.const_set($nesting[0], 'ENV', $hash2([], { }));
  $gvars.VERBOSE = false;
  $gvars.DEBUG = false;
  return ($gvars.SAFE = 0);
};
Opal.modules["opal/regexp_anchors"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Opal');
    var $nesting = [self].concat($parent_nesting);
    Opal.const_set($nesting[0], 'REGEXP_START', (function() {
      if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
        return "^";
      } else {
        return nil;
      }
      ;
      return nil;
    })());
    Opal.const_set($nesting[0], 'REGEXP_END', (function() {
      if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
        return "$";
      } else {
        return nil;
      }
      ;
      return nil;
    })());
    Opal.const_set($nesting[0], 'FORBIDDEN_STARTING_IDENTIFIER_CHARS', "\\u0001-\\u002F\\u003A-\\u0040\\u005B-\\u005E\\u0060\\u007B-\\u007F");
    Opal.const_set($nesting[0], 'FORBIDDEN_ENDING_IDENTIFIER_CHARS', "\\u0001-\\u0020\\u0022-\\u002F\\u003A-\\u003E\\u0040\\u005B-\\u005E\\u0060\\u007B-\\u007F");
    Opal.const_set($nesting[0], 'INLINE_IDENTIFIER_REGEXP', $$($nesting, 'Regexp').$new("" + "[^" + ($$($nesting, 'FORBIDDEN_STARTING_IDENTIFIER_CHARS')) + "]*[^" + ($$($nesting, 'FORBIDDEN_ENDING_IDENTIFIER_CHARS')) + "]"));
    Opal.const_set($nesting[0], 'FORBIDDEN_CONST_NAME_CHARS', "\\u0001-\\u0020\\u0021-\\u002F\\u003B-\\u003F\\u0040\\u005B-\\u005E\\u0060\\u007B-\\u007F");
    Opal.const_set($nesting[0], 'CONST_NAME_REGEXP', $$($nesting, 'Regexp').$new("" + ($$($nesting, 'REGEXP_START')) + "(::)?[A-Z][^" + ($$($nesting, 'FORBIDDEN_CONST_NAME_CHARS')) + "]*" + ($$($nesting, 'REGEXP_END'))));
  })($nesting[0], $nesting);
};
Opal.modules["opal/mini"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  self.$require("opal/base");
  self.$require("corelib/nil");
  self.$require("corelib/boolean");
  self.$require("corelib/string");
  self.$require("corelib/comparable");
  self.$require("corelib/enumerable");
  self.$require("corelib/enumerator");
  self.$require("corelib/array");
  self.$require("corelib/hash");
  self.$require("corelib/number");
  self.$require("corelib/range");
  self.$require("corelib/proc");
  self.$require("corelib/method");
  self.$require("corelib/regexp");
  self.$require("corelib/variables");
  return self.$require("opal/regexp_anchors");
};
Opal.modules["corelib/kernel/format"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $gvars = Opal.gvars;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_format$1;
    Opal.def(self, '$format', $Kernel_format$1 = function $$format(format_string, $a) {
      var $post_args, args, $b, self = this, ary = nil;
      if($gvars.DEBUG == null) $gvars.DEBUG = nil;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      if($truthy((($b = args.$length()['$=='](1)) ? args['$[]'](0)['$respond_to?']("to_ary") : args.$length()['$=='](1)))) {
        ary = $$($nesting, 'Opal')['$coerce_to?'](args['$[]'](0), $$($nesting, 'Array'), "to_ary");
        if($truthy(ary['$nil?']())) {

        } else {
          args = ary.$to_a();
        }
        ;
      }
      ;
      var result = '', begin_slice = 0, end_slice, i, len = format_string.length, arg, str, exponent, width, precision, tmp_num, hash_parameter_key, closing_brace_char, base_number, base_prefix, base_neg_zero_regex, base_neg_zero_digit, next_arg, seq_arg_num = 1, pos_arg_num = 0, flags, FNONE = 0, FSHARP = 1, FMINUS = 2, FPLUS = 4, FZERO = 8, FSPACE = 16, FWIDTH = 32, FPREC = 64, FPREC0 = 128;
            function CHECK_FOR_FLAGS() {
        if(flags & FWIDTH) {
          self.$raise($$($nesting, 'ArgumentError'), "flag after width");
        }
        if(flags & FPREC0) {
          self.$raise($$($nesting, 'ArgumentError'), "flag after precision");
        }
      }
            function CHECK_FOR_WIDTH() {
        if(flags & FWIDTH) {
          self.$raise($$($nesting, 'ArgumentError'), "width given twice");
        }
        if(flags & FPREC0) {
          self.$raise($$($nesting, 'ArgumentError'), "width after precision");
        }
      }
            function GET_NTH_ARG(num) {
        if(num >= args.length) {
          self.$raise($$($nesting, 'ArgumentError'), "too few arguments");
        }
        return args[num];
      }
            function GET_NEXT_ARG() {
        switch(pos_arg_num) {
          case -1:
            self.$raise($$($nesting, 'ArgumentError'), "" + "unnumbered(" + (seq_arg_num) + ") mixed with numbered");
          case -2:
            self.$raise($$($nesting, 'ArgumentError'), "" + "unnumbered(" + (seq_arg_num) + ") mixed with named");
        }
        pos_arg_num = seq_arg_num++;
        return GET_NTH_ARG(pos_arg_num - 1);
      }
            function GET_POS_ARG(num) {
        if(pos_arg_num > 0) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "numbered(" + (num) + ") after unnumbered(" + (pos_arg_num) + ")");
        }
        if(pos_arg_num === -2) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "numbered(" + (num) + ") after named");
        }
        if(num < 1) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "invalid index - " + (num) + "$");
        }
        pos_arg_num = -1;
        return GET_NTH_ARG(num - 1);
      }
            function GET_ARG() {
        return (next_arg === undefined ? GET_NEXT_ARG() : next_arg);
      }
            function READ_NUM(label) {
        var num, str = '';
        for(; ; i++) {
          if(i === len) {
            self.$raise($$($nesting, 'ArgumentError'), "malformed format string - %*[0-9]");
          }
          if(format_string.charCodeAt(i) < 48 || format_string.charCodeAt(i) > 57) {
            i--;
            num = parseInt(str, 10) || 0;
            if(num > 2147483647) {
              self.$raise($$($nesting, 'ArgumentError'), "" + (label) + " too big");
            }
            return num;
          }
          str += format_string.charAt(i);
        }
      }
            function READ_NUM_AFTER_ASTER(label) {
        var arg, num = READ_NUM(label);
        if(format_string.charAt(i + 1) === '$') {
          i++;
          arg = GET_POS_ARG(num);
        } else {
          arg = GET_NEXT_ARG();
        }
        return (arg).$to_int();
      }
      for(i = format_string.indexOf('%'); i !== -1; i = format_string.indexOf('%', i)) {
        str = undefined;
        flags = FNONE;
        width = -1;
        precision = -1;
        next_arg = undefined;
        end_slice = i;
        i++;
        switch(format_string.charAt(i)) {
          case '%':
            begin_slice = i;
          case '':

          case '\n':

          case '\0':
            i++;
            continue;
        }
        format_sequence: for(; i < len; i++) {
          switch(format_string.charAt(i)) {
            case ' ':
              CHECK_FOR_FLAGS();
              flags |= FSPACE;
              continue format_sequence;
            case '#':
              CHECK_FOR_FLAGS();
              flags |= FSHARP;
              continue format_sequence;
            case '+':
              CHECK_FOR_FLAGS();
              flags |= FPLUS;
              continue format_sequence;
            case '-':
              CHECK_FOR_FLAGS();
              flags |= FMINUS;
              continue format_sequence;
            case '0':
              CHECK_FOR_FLAGS();
              flags |= FZERO;
              continue format_sequence;
            case '1':

            case '2':

            case '3':

            case '4':

            case '5':

            case '6':

            case '7':

            case '8':

            case '9':
              tmp_num = READ_NUM('width');
              if(format_string.charAt(i + 1) === '$') {
                if(i + 2 === len) {
                  str = '%';
                  i++;
                  break format_sequence;
                }
                if(next_arg !== undefined) {
                  self.$raise($$($nesting, 'ArgumentError'), "" + "value given twice - %" + (tmp_num) + "$");
                }
                next_arg = GET_POS_ARG(tmp_num);
                i++;
              } else {
                CHECK_FOR_WIDTH();
                flags |= FWIDTH;
                width = tmp_num;
              }
              continue format_sequence;
            case '<':

            case '\{':
              closing_brace_char = (format_string.charAt(i) === '<' ? '>' : '\}');
              hash_parameter_key = '';
              i++;
              for(; ; i++) {
                if(i === len) {
                  self.$raise($$($nesting, 'ArgumentError'), "malformed name - unmatched parenthesis");
                }
                if(format_string.charAt(i) === closing_brace_char) {
                  if(pos_arg_num > 0) {
                    self.$raise($$($nesting, 'ArgumentError'), "" + "named " + (hash_parameter_key) + " after unnumbered(" + (pos_arg_num) + ")");
                  }
                  if(pos_arg_num === -1) {
                    self.$raise($$($nesting, 'ArgumentError'), "" + "named " + (hash_parameter_key) + " after numbered");
                  }
                  pos_arg_num = -2;
                  if(args[0] === undefined || !args[0].$$is_hash) {
                    self.$raise($$($nesting, 'ArgumentError'), "one hash required");
                  }
                  next_arg = (args[0]).$fetch(hash_parameter_key);
                  if(closing_brace_char === '>') {
                    continue format_sequence;
                  } else {
                    str = next_arg.toString();
                    if(precision !== -1) {
                      str = str.slice(0, precision);
                    }
                    if(flags & FMINUS) {
                      while(str.length < width) {
                        str = str + ' ';
                      }
                    } else {
                      while(str.length < width) {
                        str = ' ' + str;
                      }
                    }
                    break format_sequence;
                  }
                }
                hash_parameter_key += format_string.charAt(i);
              }
            case '*':
              i++;
              CHECK_FOR_WIDTH();
              flags |= FWIDTH;
              width = READ_NUM_AFTER_ASTER('width');
              if(width < 0) {
                flags |= FMINUS;
                width = -width;
              }
              continue format_sequence;
            case '.':
              if(flags & FPREC0) {
                self.$raise($$($nesting, 'ArgumentError'), "precision given twice");
              }
              flags |= FPREC | FPREC0;
              precision = 0;
              i++;
              if(format_string.charAt(i) === '*') {
                i++;
                precision = READ_NUM_AFTER_ASTER('precision');
                if(precision < 0) {
                  flags &= ~FPREC;
                }
                continue format_sequence;
              }
              precision = READ_NUM('precision');
              continue format_sequence;
            case 'd':

            case 'i':

            case 'u':
              arg = self.$Integer(GET_ARG());
              if(arg >= 0) {
                str = arg.toString();
                while(str.length < precision) {
                  str = '0' + str;
                }
                if(flags & FMINUS) {
                  if(flags & FPLUS || flags & FSPACE) {
                    str = (flags & FPLUS ? '+' : ' ') + str;
                  }
                  while(str.length < width) {
                    str = str + ' ';
                  }
                } else {
                  if(flags & FZERO && precision === -1) {
                    while(str.length < width - ((flags & FPLUS || flags & FSPACE) ? 1 : 0)) {
                      str = '0' + str;
                    }
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                  } else {
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                    while(str.length < width) {
                      str = ' ' + str;
                    }
                  }
                }
              } else {
                str = (-arg).toString();
                while(str.length < precision) {
                  str = '0' + str;
                }
                if(flags & FMINUS) {
                  str = '-' + str;
                  while(str.length < width) {
                    str = str + ' ';
                  }
                } else {
                  if(flags & FZERO && precision === -1) {
                    while(str.length < width - 1) {
                      str = '0' + str;
                    }
                    str = '-' + str;
                  } else {
                    str = '-' + str;
                    while(str.length < width) {
                      str = ' ' + str;
                    }
                  }
                }
              }
              break format_sequence;
            case 'b':

            case 'B':

            case 'o':

            case 'x':

            case 'X':
              switch(format_string.charAt(i)) {
                case 'b':

                case 'B':
                  base_number = 2;
                  base_prefix = '0b';
                  base_neg_zero_regex = /^1+/;
                  base_neg_zero_digit = '1';
                  break;
                case 'o':
                  base_number = 8;
                  base_prefix = '0';
                  base_neg_zero_regex = /^3?7+/;
                  base_neg_zero_digit = '7';
                  break;
                case 'x':

                case 'X':
                  base_number = 16;
                  base_prefix = '0x';
                  base_neg_zero_regex = /^f+/;
                  base_neg_zero_digit = 'f';
                  break;
              }
              arg = self.$Integer(GET_ARG());
              if(arg >= 0) {
                str = arg.toString(base_number);
                while(str.length < precision) {
                  str = '0' + str;
                }
                if(flags & FMINUS) {
                  if(flags & FPLUS || flags & FSPACE) {
                    str = (flags & FPLUS ? '+' : ' ') + str;
                  }
                  if(flags & FSHARP && arg !== 0) {
                    str = base_prefix + str;
                  }
                  while(str.length < width) {
                    str = str + ' ';
                  }
                } else {
                  if(flags & FZERO && precision === -1) {
                    while(str.length < width - ((flags & FPLUS || flags & FSPACE) ? 1 : 0) - ((flags & FSHARP && arg !== 0) ? base_prefix.length : 0)) {
                      str = '0' + str;
                    }
                    if(flags & FSHARP && arg !== 0) {
                      str = base_prefix + str;
                    }
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                  } else {
                    if(flags & FSHARP && arg !== 0) {
                      str = base_prefix + str;
                    }
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                    while(str.length < width) {
                      str = ' ' + str;
                    }
                  }
                }
              } else {
                if(flags & FPLUS || flags & FSPACE) {
                  str = (-arg).toString(base_number);
                  while(str.length < precision) {
                    str = '0' + str;
                  }
                  if(flags & FMINUS) {
                    if(flags & FSHARP) {
                      str = base_prefix + str;
                    }
                    str = '-' + str;
                    while(str.length < width) {
                      str = str + ' ';
                    }
                  } else {
                    if(flags & FZERO && precision === -1) {
                      while(str.length < width - 1 - (flags & FSHARP ? 2 : 0)) {
                        str = '0' + str;
                      }
                      if(flags & FSHARP) {
                        str = base_prefix + str;
                      }
                      str = '-' + str;
                    } else {
                      if(flags & FSHARP) {
                        str = base_prefix + str;
                      }
                      str = '-' + str;
                      while(str.length < width) {
                        str = ' ' + str;
                      }
                    }
                  }
                } else {
                  str = (arg >>> 0).toString(base_number).replace(base_neg_zero_regex, base_neg_zero_digit);
                  while(str.length < precision - 2) {
                    str = base_neg_zero_digit + str;
                  }
                  if(flags & FMINUS) {
                    str = '..' + str;
                    if(flags & FSHARP) {
                      str = base_prefix + str;
                    }
                    while(str.length < width) {
                      str = str + ' ';
                    }
                  } else {
                    if(flags & FZERO && precision === -1) {
                      while(str.length < width - 2 - (flags & FSHARP ? base_prefix.length : 0)) {
                        str = base_neg_zero_digit + str;
                      }
                      str = '..' + str;
                      if(flags & FSHARP) {
                        str = base_prefix + str;
                      }
                    } else {
                      str = '..' + str;
                      if(flags & FSHARP) {
                        str = base_prefix + str;
                      }
                      while(str.length < width) {
                        str = ' ' + str;
                      }
                    }
                  }
                }
              }
              if(format_string.charAt(i) === format_string.charAt(i).toUpperCase()) {
                str = str.toUpperCase();
              }
              break format_sequence;
            case 'f':

            case 'e':

            case 'E':

            case 'g':

            case 'G':
              arg = self.$Float(GET_ARG());
              if(arg >= 0 || isNaN(arg)) {
                if(arg === Infinity) {
                  str = 'Inf';
                } else {
                  switch(format_string.charAt(i)) {
                    case 'f':
                      str = arg.toFixed(precision === -1 ? 6 : precision);
                      break;
                    case 'e':

                    case 'E':
                      str = arg.toExponential(precision === -1 ? 6 : precision);
                      break;
                    case 'g':

                    case 'G':
                      str = arg.toExponential();
                      exponent = parseInt(str.split('e')[1], 10);
                      if(!(exponent < -4 || exponent >= (precision === -1 ? 6 : precision))) {
                        str = arg.toPrecision(precision === -1 ? (flags & FSHARP ? 6 : undefined) : precision);
                      }
                      break;
                  }
                }
                if(flags & FMINUS) {
                  if(flags & FPLUS || flags & FSPACE) {
                    str = (flags & FPLUS ? '+' : ' ') + str;
                  }
                  while(str.length < width) {
                    str = str + ' ';
                  }
                } else {
                  if(flags & FZERO && arg !== Infinity && !isNaN(arg)) {
                    while(str.length < width - ((flags & FPLUS || flags & FSPACE) ? 1 : 0)) {
                      str = '0' + str;
                    }
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                  } else {
                    if(flags & FPLUS || flags & FSPACE) {
                      str = (flags & FPLUS ? '+' : ' ') + str;
                    }
                    while(str.length < width) {
                      str = ' ' + str;
                    }
                  }
                }
              } else {
                if(arg === -Infinity) {
                  str = 'Inf';
                } else {
                  switch(format_string.charAt(i)) {
                    case 'f':
                      str = (-arg).toFixed(precision === -1 ? 6 : precision);
                      break;
                    case 'e':

                    case 'E':
                      str = (-arg).toExponential(precision === -1 ? 6 : precision);
                      break;
                    case 'g':

                    case 'G':
                      str = (-arg).toExponential();
                      exponent = parseInt(str.split('e')[1], 10);
                      if(!(exponent < -4 || exponent >= (precision === -1 ? 6 : precision))) {
                        str = (-arg).toPrecision(precision === -1 ? (flags & FSHARP ? 6 : undefined) : precision);
                      }
                      break;
                  }
                }
                if(flags & FMINUS) {
                  str = '-' + str;
                  while(str.length < width) {
                    str = str + ' ';
                  }
                } else {
                  if(flags & FZERO && arg !== -Infinity) {
                    while(str.length < width - 1) {
                      str = '0' + str;
                    }
                    str = '-' + str;
                  } else {
                    str = '-' + str;
                    while(str.length < width) {
                      str = ' ' + str;
                    }
                  }
                }
              }
              if(format_string.charAt(i) === format_string.charAt(i).toUpperCase() && arg !== Infinity && arg !== -Infinity && !isNaN(arg)) {
                str = str.toUpperCase();
              }
              str = str.replace(/([eE][-+]?)([0-9])$/, '$10$2');
              break format_sequence;
            case 'a':

            case 'A':
              self.$raise($$($nesting, 'NotImplementedError'), "`A` and `a` format field types are not implemented in Opal yet");
            case 'c':
              arg = GET_ARG();
              if((arg)['$respond_to?']("to_ary")) {
                arg = (arg).$to_ary()[0];
              }
              if((arg)['$respond_to?']("to_str")) {
                str = (arg).$to_str();
              } else {
                str = String.fromCharCode($$($nesting, 'Opal').$coerce_to(arg, $$($nesting, 'Integer'), "to_int"));
              }
              if(str.length !== 1) {
                self.$raise($$($nesting, 'ArgumentError'), "%c requires a character");
              }
              if(flags & FMINUS) {
                while(str.length < width) {
                  str = str + ' ';
                }
              } else {
                while(str.length < width) {
                  str = ' ' + str;
                }
              }
              break format_sequence;
            case 'p':
              str = (GET_ARG()).$inspect();
              if(precision !== -1) {
                str = str.slice(0, precision);
              }
              if(flags & FMINUS) {
                while(str.length < width) {
                  str = str + ' ';
                }
              } else {
                while(str.length < width) {
                  str = ' ' + str;
                }
              }
              break format_sequence;
            case 's':
              str = (GET_ARG()).$to_s();
              if(precision !== -1) {
                str = str.slice(0, precision);
              }
              if(flags & FMINUS) {
                while(str.length < width) {
                  str = str + ' ';
                }
              } else {
                while(str.length < width) {
                  str = ' ' + str;
                }
              }
              break format_sequence;
            default:
              self.$raise($$($nesting, 'ArgumentError'), "" + "malformed format string - %" + (format_string.charAt(i)));
          }
        }
        if(str === undefined) {
          self.$raise($$($nesting, 'ArgumentError'), "malformed format string - %");
        }
        result += format_string.slice(begin_slice, end_slice) + str;
        begin_slice = i + 1;
      }
      if($gvars.DEBUG && pos_arg_num >= 0 && seq_arg_num < args.length) {
        self.$raise($$($nesting, 'ArgumentError'), "too many arguments for format string");
      }
      return result + format_string.slice(begin_slice);
      ;
    }, $Kernel_format$1.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$sprintf */0;
  })($nesting[0], $nesting);
};
Opal.modules["corelib/string/encoding"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var $$12, $$15, $$18, $$21, $$24, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/string");
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Encoding');
    var $nesting = [self].concat($parent_nesting), $Encoding_register$1, $Encoding_find$3, $Encoding_initialize$4, $Encoding_ascii_compatible$ques$5, $Encoding_dummy$ques$6, $Encoding_to_s$7, $Encoding_inspect$8, $Encoding_each_byte$9, $Encoding_getbyte$10, $Encoding_bytesize$11;
    self.$$prototype.ascii = self.$$prototype.dummy = self.$$prototype.name = nil;
    Opal.defineProperty(self, '$$register', { });
    Opal.defs(self, '$register', $Encoding_register$1 = function $$register(name, options) {
      var $iter = $Encoding_register$1.$$p, block = $iter || nil, $a, $$2, self = this, names = nil, encoding = nil, register = nil;
      if($iter) $Encoding_register$1.$$p = null;
      if($iter) $Encoding_register$1.$$p = null;
      ;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      names = $rb_plus([name], ($truthy($a = options['$[]']("aliases")) ? $a : []));
      encoding = $send($$($nesting, 'Class'), 'new', [self], block.$to_proc()).$new(name, names, ($truthy($a = options['$[]']("ascii")) ? $a : false), ($truthy($a = options['$[]']("dummy")) ? $a : false));
      register = self["$$register"];
      return $send(names, 'each', [], ($$2 = function(encoding_name) {
        var self = $$2.$$s || this;
        if(encoding_name == null) {
          encoding_name = nil;
        }
        ;
        self.$const_set(encoding_name.$sub("-", "_"), encoding);
        return register["" + "$$" + (encoding_name)] = encoding;
      }, $$2.$$s = self, $$2.$$arity = 1, $$2));
    }, $Encoding_register$1.$$arity = -2);
    Opal.defs(self, '$find', $Encoding_find$3 = function $$find(name) {
      var $a, self = this, register = nil, encoding = nil;
      if(name['$==']("default_external")) {
        return self.$default_external();
      }
      ;
      register = self["$$register"];
      encoding = ($truthy($a = register["" + "$$" + (name)]) ? $a : register["" + "$$" + (name.$upcase())]);
      if($truthy(encoding)) {

      } else {
        self.$raise($$($nesting, 'ArgumentError'), "" + "unknown encoding name - " + (name));
      }
      ;
      return encoding;
    }, $Encoding_find$3.$$arity = 1);
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting);
      return self.$attr_accessor("default_external");
    })(Opal.get_singleton_class(self), $nesting);
    self.$attr_reader("name", "names");
    Opal.def(self, '$initialize', $Encoding_initialize$4 = function $$initialize(name, names, ascii, dummy) {
      var self = this;
      self.name = name;
      self.names = names;
      self.ascii = ascii;
      return (self.dummy = dummy);
    }, $Encoding_initialize$4.$$arity = 4);
    /* destroyed: TreeShaking#shake_methods/$ascii_compatible? */0;
    /* destroyed: TreeShaking#shake_methods/$dummy? */0;
    Opal.def(self, '$to_s', $Encoding_to_s$7 = function $$to_s() {
      var self = this;
      return self.name;
    }, $Encoding_to_s$7.$$arity = 0);
    Opal.def(self, '$inspect', $Encoding_inspect$8 = function $$inspect() {
      var self = this;
      return "" + "#<Encoding:" + (self.name) + ((function() {
        if($truthy(self.dummy)) {
          return " (dummy)";
        } else {
          return nil;
        }
        ;
        return nil;
      })()) + ">";
    }, $Encoding_inspect$8.$$arity = 0);
    Opal.def(self, '$each_byte', $Encoding_each_byte$9 = function $$each_byte($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'));
    }, $Encoding_each_byte$9.$$arity = -1);
    Opal.def(self, '$getbyte', $Encoding_getbyte$10 = function $$getbyte($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'));
    }, $Encoding_getbyte$10.$$arity = -1);
    Opal.def(self, '$bytesize', $Encoding_bytesize$11 = function $$bytesize($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'));
    }, $Encoding_bytesize$11.$$arity = -1);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'EncodingError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    return (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'CompatibilityError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'EncodingError'), $nesting);
  })($nesting[0], null, $nesting);
  $send($$($nesting, 'Encoding'), 'register', ["UTF-8", $hash2(["aliases", "ascii"], {
    "aliases": ["CP65001"],
    "ascii": true
})], ($$12 = function() {
    var self = $$12.$$s || this, $each_byte$13, $bytesize$14;
    Opal.def(self, '$each_byte', $each_byte$13 = function $$each_byte(string) {
      var $iter = $each_byte$13.$$p, block = $iter || nil, self = this;
      if($iter) $each_byte$13.$$p = null;
      if($iter) $each_byte$13.$$p = null;
      ;
      for(var i = 0, length = string.length; i < length; i++) {
        var code = string.charCodeAt(i);
        if(code <= 127) {
          Opal.yield1(block, code);
        } else {
          var encoded = encodeURIComponent(string.charAt(i)).substr(1).split('%');
          for(var j = 0, encoded_length = encoded.length; j < encoded_length; j++) {
            Opal.yield1(block, parseInt(encoded[j], 16));
          }
        }
      }
      ;
    }, $each_byte$13.$$arity = 1);
    return (Opal.def(self, '$bytesize', $bytesize$14 = function $$bytesize(string) {
      var self = this;
      return string.$bytes().$length();
    }, $bytesize$14.$$arity = 1), nil) && 'bytesize';
  }, $$12.$$s = self, $$12.$$arity = 0, $$12));
  $send($$($nesting, 'Encoding'), 'register', ["UTF-16LE"], ($$15 = function() {
    var self = $$15.$$s || this, $each_byte$16, $bytesize$17;
    Opal.def(self, '$each_byte', $each_byte$16 = function $$each_byte(string) {
      var $iter = $each_byte$16.$$p, block = $iter || nil, self = this;
      if($iter) $each_byte$16.$$p = null;
      if($iter) $each_byte$16.$$p = null;
      ;
      for(var i = 0, length = string.length; i < length; i++) {
        var code = string.charCodeAt(i);
        Opal.yield1(block, code & 255);
        Opal.yield1(block, code >> 8);
      }
      ;
    }, $each_byte$16.$$arity = 1);
    return (Opal.def(self, '$bytesize', $bytesize$17 = function $$bytesize(string) {
      var self = this;
      return string.$bytes().$length();
    }, $bytesize$17.$$arity = 1), nil) && 'bytesize';
  }, $$15.$$s = self, $$15.$$arity = 0, $$15));
  $send($$($nesting, 'Encoding'), 'register', ["UTF-16BE"], ($$18 = function() {
    var self = $$18.$$s || this, $each_byte$19, $bytesize$20;
    Opal.def(self, '$each_byte', $each_byte$19 = function $$each_byte(string) {
      var $iter = $each_byte$19.$$p, block = $iter || nil, self = this;
      if($iter) $each_byte$19.$$p = null;
      if($iter) $each_byte$19.$$p = null;
      ;
      for(var i = 0, length = string.length; i < length; i++) {
        var code = string.charCodeAt(i);
        Opal.yield1(block, code >> 8);
        Opal.yield1(block, code & 255);
      }
      ;
    }, $each_byte$19.$$arity = 1);
    return (Opal.def(self, '$bytesize', $bytesize$20 = function $$bytesize(string) {
      var self = this;
      return string.$bytes().$length();
    }, $bytesize$20.$$arity = 1), nil) && 'bytesize';
  }, $$18.$$s = self, $$18.$$arity = 0, $$18));
  $send($$($nesting, 'Encoding'), 'register', ["UTF-32LE"], ($$21 = function() {
    var self = $$21.$$s || this, $each_byte$22, $bytesize$23;
    Opal.def(self, '$each_byte', $each_byte$22 = function $$each_byte(string) {
      var $iter = $each_byte$22.$$p, block = $iter || nil, self = this;
      if($iter) $each_byte$22.$$p = null;
      if($iter) $each_byte$22.$$p = null;
      ;
      for(var i = 0, length = string.length; i < length; i++) {
        var code = string.charCodeAt(i);
        Opal.yield1(block, code & 255);
        Opal.yield1(block, code >> 8);
      }
      ;
    }, $each_byte$22.$$arity = 1);
    return (Opal.def(self, '$bytesize', $bytesize$23 = function $$bytesize(string) {
      var self = this;
      return string.$bytes().$length();
    }, $bytesize$23.$$arity = 1), nil) && 'bytesize';
  }, $$21.$$s = self, $$21.$$arity = 0, $$21));
  $send($$($nesting, 'Encoding'), 'register', ["ASCII-8BIT", $hash2(["aliases", "ascii", "dummy"], {
    "aliases": ["BINARY", "US-ASCII", "ASCII"],
    "ascii": true,
    "dummy": true
})], ($$24 = function() {
    var self = $$24.$$s || this, $each_byte$25, $bytesize$26;
    Opal.def(self, '$each_byte', $each_byte$25 = function $$each_byte(string) {
      var $iter = $each_byte$25.$$p, block = $iter || nil, self = this;
      if($iter) $each_byte$25.$$p = null;
      if($iter) $each_byte$25.$$p = null;
      ;
      for(var i = 0, length = string.length; i < length; i++) {
        var code = string.charCodeAt(i);
        Opal.yield1(block, code & 255);
        Opal.yield1(block, code >> 8);
      }
      ;
    }, $each_byte$25.$$arity = 1);
    return (Opal.def(self, '$bytesize', $bytesize$26 = function $$bytesize(string) {
      var self = this;
      return string.$bytes().$length();
    }, $bytesize$26.$$arity = 1), nil) && 'bytesize';
  }, $$24.$$s = self, $$24.$$arity = 0, $$24));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_bytes$27, $String_bytesize$28, $String_each_byte$29, $String_each_codepoint$30, $String_codepoints$31, $String_encode$32, $String_force_encoding$33, $String_getbyte$34, $String_valid_encoding$ques$35;
    self.$$prototype.encoding = nil;
    self.$attr_reader("encoding");
    Opal.defineProperty(String.prototype, 'encoding', $$$($$($nesting, 'Encoding'), 'UTF_16LE'));
    Opal.def(self, '$bytes', $String_bytes$27 = function $$bytes() {
      var self = this;
      return self.$each_byte().$to_a();
    }, $String_bytes$27.$$arity = 0);
    Opal.def(self, '$bytesize', $String_bytesize$28 = function $$bytesize() {
      var self = this;
      return self.encoding.$bytesize(self);
    }, $String_bytesize$28.$$arity = 0);
    Opal.def(self, '$each_byte', $String_each_byte$29 = function $$each_byte() {
      var $iter = $String_each_byte$29.$$p, block = $iter || nil, self = this;
      if($iter) $String_each_byte$29.$$p = null;
      if($iter) $String_each_byte$29.$$p = null;
      ;
      if((block !== nil)) {

      } else {
        return self.$enum_for("each_byte");
      }
      ;
      $send(self.encoding, 'each_byte', [self], block.$to_proc());
      return self;
    }, $String_each_byte$29.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$each_codepoint */0;
    /* destroyed: TreeShaking#shake_methods/$codepoints */0;
    Opal.def(self, '$encode', $String_encode$32 = function $$encode(encoding) {
      var self = this;
      return self.$dup().$force_encoding(encoding);
    }, $String_encode$32.$$arity = 1);
    Opal.def(self, '$force_encoding', $String_force_encoding$33 = function $$force_encoding(encoding) {
      var self = this;
      if(encoding === self.encoding) {
        return self;
      }
      encoding = $$($nesting, 'Opal')['$coerce_to!'](encoding, $$($nesting, 'String'), "to_s");
      encoding = $$($nesting, 'Encoding').$find(encoding);
      if(encoding === self.encoding) {
        return self;
      }
      self.encoding = encoding;
      return self;
    }, $String_force_encoding$33.$$arity = 1);
    Opal.def(self, '$getbyte', $String_getbyte$34 = function $$getbyte(idx) {
      var self = this;
      return self.encoding.$getbyte(self, idx);
    }, $String_getbyte$34.$$arity = 1);
    return (/* destroyed: TreeShaking#shake_methods/$valid_encoding? */0, nil) && 'valid_encoding?';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/math"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Math');
    var $nesting = [self].concat($parent_nesting), $Math_checked$1, $Math_float$excl$2, $Math_integer$excl$3, $Math_acos$4, $Math_acosh$5, $Math_asin$6, $Math_asinh$7, $Math_atan$8, $Math_atan2$9, $Math_atanh$10, $Math_cbrt$11, $Math_cos$12, $Math_cosh$13, $Math_erf$14, $Math_erfc$15, $Math_exp$16, $Math_frexp$17, $Math_gamma$18, $Math_hypot$19, $Math_ldexp$20, $Math_lgamma$21, $Math_log$22, $Math_log10$23, $Math_log2$24, $Math_sin$25, $Math_sinh$26, $Math_sqrt$27, $Math_tan$28, $Math_tanh$29;
    Opal.const_set($nesting[0], 'E', Math.E);
    Opal.const_set($nesting[0], 'PI', Math.PI);
    Opal.const_set($nesting[0], 'DomainError', $$($nesting, 'Class').$new($$($nesting, 'StandardError')));
    Opal.defs(self, '$checked', $Math_checked$1 = function $$checked(method, $a) {
      var $post_args, args, self = this;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      if(isNaN(args[0]) || (args.length == 2 && isNaN(args[1]))) {
        return NaN;
      }
      var result = Math[method].apply(null, args);
      if(isNaN(result)) {
        self.$raise($$($nesting, 'DomainError'), "" + "Numerical argument is out of domain - \"" + (method) + "\"");
      }
      return result;
      ;
    }, $Math_checked$1.$$arity = -2);
    Opal.defs(self, '$float!', $Math_float$excl$2 = function(value) {
      var self = this;
      try {
        return self.$Float(value);
      } catch($err) {
        if(Opal.rescue($err, [$$($nesting, 'ArgumentError')])) {
          try {
            return self.$raise($$($nesting, 'Opal').$type_error(value, $$($nesting, 'Float')));
          } finally {
            Opal.pop_exception();
          }
        } else {
          throw $err;
        }
      }
    }, $Math_float$excl$2.$$arity = 1);
    Opal.defs(self, '$integer!', $Math_integer$excl$3 = function(value) {
      var self = this;
      try {
        return self.$Integer(value);
      } catch($err) {
        if(Opal.rescue($err, [$$($nesting, 'ArgumentError')])) {
          try {
            return self.$raise($$($nesting, 'Opal').$type_error(value, $$($nesting, 'Integer')));
          } finally {
            Opal.pop_exception();
          }
        } else {
          throw $err;
        }
      }
    }, $Math_integer$excl$3.$$arity = 1);
    self.$module_function();
    /* destroyed: TreeShaking#shake_methods/$acos */0;
    if($truthy((typeof (Math.acosh) !== "undefined"))) {

    } else {
      Math.acosh = function(x) {
        return Math.log(x + Math.sqrt(x * x - 1));
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$acosh */0;
    /* destroyed: TreeShaking#shake_methods/$asin */0;
    if($truthy((typeof (Math.asinh) !== "undefined"))) {

    } else {
      Math.asinh = function(x) {
        return Math.log(x + Math.sqrt(x * x + 1));
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$asinh */0;
    /* destroyed: TreeShaking#shake_methods/$atan */0;
    Opal.def(self, '$atan2', $Math_atan2$9 = function $$atan2(y, x) {
      var self = this;
      return $$($nesting, 'Math').$checked("atan2", $$($nesting, 'Math')['$float!'](y), $$($nesting, 'Math')['$float!'](x));
    }, $Math_atan2$9.$$arity = 2);
    if($truthy((typeof (Math.atanh) !== "undefined"))) {

    } else {
      Math.atanh = function(x) {
        return 0.5 * Math.log((1 + x) / (1 - x));
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$atanh */0;
    if($truthy((typeof (Math.cbrt) !== "undefined"))) {

    } else {
      Math.cbrt = function(x) {
        if(x == 0) {
          return 0;
        }
        if(x < 0) {
          return -Math.cbrt(-x);
        }
        var r = x, ex = 0;
        while(r < 0.125) {
          r *= 8;
          ex--;
        }
        while(r > 1.0) {
          r *= 0.125;
          ex++;
        }
        r = (-0.46946116 * r + 1.072302) * r + 0.3812513;
        while(ex < 0) {
          r *= 0.5;
          ex++;
        }
        while(ex > 0) {
          r *= 2;
          ex--;
        }
        r = (2.0 / 3.0) * r + (1.0 / 3.0) * x / (r * r);
        r = (2.0 / 3.0) * r + (1.0 / 3.0) * x / (r * r);
        r = (2.0 / 3.0) * r + (1.0 / 3.0) * x / (r * r);
        r = (2.0 / 3.0) * r + (1.0 / 3.0) * x / (r * r);
        return r;
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$cbrt */0;
    Opal.def(self, '$cos', $Math_cos$12 = function $$cos(x) {
      var self = this;
      return $$($nesting, 'Math').$checked("cos", $$($nesting, 'Math')['$float!'](x));
    }, $Math_cos$12.$$arity = 1);
    if($truthy((typeof (Math.cosh) !== "undefined"))) {

    } else {
      Math.cosh = function(x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$cosh */0;
    if($truthy((typeof (Math.erf) !== "undefined"))) {

    } else {
      Opal.defineProperty(Math, 'erf', function(x) {
        var A1 = 0.254829592, A2 = -0.284496736, A3 = 1.421413741, A4 = -1.453152027, A5 = 1.061405429, P = 0.3275911;
        var sign = 1;
        if(x < 0) {
          sign = -1;
        }
        x = Math.abs(x);
        var t = 1.0 / (1.0 + P * x);
        var y = 1.0 - (((((A5 * t + A4) * t) + A3) * t + A2) * t + A1) * t * Math.exp(-x * x);
        return sign * y;
      });
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$erf */0;
    if($truthy((typeof (Math.erfc) !== "undefined"))) {

    } else {
      Opal.defineProperty(Math, 'erfc', function(x) {
        var z = Math.abs(x), t = 1.0 / (0.5 * z + 1.0);
        var A1 = t * 0.17087277 + -0.82215223, A2 = t * A1 + 1.48851587, A3 = t * A2 + -1.13520398, A4 = t * A3 + 0.27886807, A5 = t * A4 + -0.18628806, A6 = t * A5 + 0.09678418, A7 = t * A6 + 0.37409196, A8 = t * A7 + 1.00002368, A9 = t * A8, A10 = -z * z - 1.26551223 + A9;
        var a = t * Math.exp(A10);
        if(x < 0.0) {
          return 2.0 - a;
        } else {
          return a;
        }
      });
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$erfc */0;
    Opal.def(self, '$exp', $Math_exp$16 = function $$exp(x) {
      var self = this;
      return $$($nesting, 'Math').$checked("exp", $$($nesting, 'Math')['$float!'](x));
    }, $Math_exp$16.$$arity = 1);
    Opal.def(self, '$frexp', $Math_frexp$17 = function $$frexp(x) {
      var self = this;
      x = $$($nesting, 'Math')['$float!'](x);
      if(isNaN(x)) {
        return [NaN, 0];
      }
      var ex = Math.floor(Math.log(Math.abs(x)) / Math.log(2)) + 1, frac = x / Math.pow(2, ex);
      return [frac, ex];
      ;
    }, $Math_frexp$17.$$arity = 1);
    Opal.def(self, '$gamma', $Math_gamma$18 = function $$gamma(n) {
      var self = this;
      n = $$($nesting, 'Math')['$float!'](n);
      var i, t, x, value, result, twoN, threeN, fourN, fiveN;
      var G = 4.7421875;
      var P = [0.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -0.4919138160976202, 3.399464998481189e-05, 4.652362892704858e-05, -9.837447530487956e-05, 0.0001580887032249125, -0.00021026444172410488, 0.00021743961811521265, -0.0001643181065367639, 8.441822398385275e-05, -2.6190838401581408e-05, 3.6899182659531625e-06];
      if(isNaN(n)) {
        return NaN;
      }
      if(n === 0 && 1 / n < 0) {
        return -Infinity;
      }
      if(n === -1 || n === -Infinity) {
        self.$raise($$($nesting, 'DomainError'), "Numerical argument is out of domain - \"gamma\"");
      }
      if($$($nesting, 'Integer')['$==='](n)) {
        if(n <= 0) {
          return isFinite(n) ? Infinity : NaN;
        }
        if(n > 171) {
          return Infinity;
        }
        value = n - 2;
        result = n - 1;
        while(value > 1) {
          result *= value;
          value--;
        }
        if(result == 0) {
          result = 1;
        }
        return result;
      }
      if(n < 0.5) {
        return Math.PI / (Math.sin(Math.PI * n) * $$($nesting, 'Math').$gamma($rb_minus(1, n)));
      }
      if(n >= 171.35) {
        return Infinity;
      }
      if(n > 85.0) {
        twoN = n * n;
        threeN = twoN * n;
        fourN = threeN * n;
        fiveN = fourN * n;
        return Math.sqrt(2 * Math.PI / n) * Math.pow((n / Math.E), n) * (1 + 1 / (12 * n) + 1 / (288 * twoN) - 139 / (51840 * threeN) - 571 / (2488320 * fourN) + 163879 / (209018880 * fiveN) + 5246819 / (75246796800 * fiveN * n));
      }
      n -= 1;
      x = P[0];
      for(i = 1; i < P.length; ++i) {
        x += P[i] / (n + i);
      }
      t = n + G + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
      ;
    }, $Math_gamma$18.$$arity = 1);
    if($truthy((typeof (Math.hypot) !== "undefined"))) {

    } else {
      Math.hypot = function(x, y) {
        return Math.sqrt(x * x + y * y);
      };
    }
    ;
    Opal.def(self, '$hypot', $Math_hypot$19 = function $$hypot(x, y) {
      var self = this;
      return $$($nesting, 'Math').$checked("hypot", $$($nesting, 'Math')['$float!'](x), $$($nesting, 'Math')['$float!'](y));
    }, $Math_hypot$19.$$arity = 2);
    Opal.def(self, '$ldexp', $Math_ldexp$20 = function $$ldexp(mantissa, exponent) {
      var self = this;
      mantissa = $$($nesting, 'Math')['$float!'](mantissa);
      exponent = $$($nesting, 'Math')['$integer!'](exponent);
      if(isNaN(exponent)) {
        self.$raise($$($nesting, 'RangeError'), "float NaN out of range of integer");
      }
      return mantissa * Math.pow(2, exponent);
      ;
    }, $Math_ldexp$20.$$arity = 2);
    /* destroyed: TreeShaking#shake_methods/$lgamma */0;
    Opal.def(self, '$log', $Math_log$22 = function $$log(x, base) {
      var self = this;
      ;
      if($truthy($$($nesting, 'String')['$==='](x))) {
        self.$raise($$($nesting, 'Opal').$type_error(x, $$($nesting, 'Float')));
      }
      ;
      if($truthy(base == null)) {
        return $$($nesting, 'Math').$checked("log", $$($nesting, 'Math')['$float!'](x));
      } else {
        if($truthy($$($nesting, 'String')['$==='](base))) {
          self.$raise($$($nesting, 'Opal').$type_error(base, $$($nesting, 'Float')));
        }
        ;
        return $rb_divide($$($nesting, 'Math').$checked("log", $$($nesting, 'Math')['$float!'](x)), $$($nesting, 'Math').$checked("log", $$($nesting, 'Math')['$float!'](base)));
      }
      ;
    }, $Math_log$22.$$arity = -2);
    if($truthy((typeof (Math.log10) !== "undefined"))) {

    } else {
      Math.log10 = function(x) {
        return Math.log(x) / Math.LN10;
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$log10 */0;
    if($truthy((typeof (Math.log2) !== "undefined"))) {

    } else {
      Math.log2 = function(x) {
        return Math.log(x) / Math.LN2;
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$log2 */0;
    Opal.def(self, '$sin', $Math_sin$25 = function $$sin(x) {
      var self = this;
      return $$($nesting, 'Math').$checked("sin", $$($nesting, 'Math')['$float!'](x));
    }, $Math_sin$25.$$arity = 1);
    if($truthy((typeof (Math.sinh) !== "undefined"))) {

    } else {
      Math.sinh = function(x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$sinh */0;
    /* destroyed: TreeShaking#shake_methods/$sqrt */0;
    /* destroyed: TreeShaking#shake_methods/$tan */0;
    if($truthy((typeof (Math.tanh) !== "undefined"))) {

    } else {
      Math.tanh = function(x) {
        if(x == Infinity) {
          return 1;
        } else if(x == -Infinity) {
          return -1;
        } else {
          return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
        }
      };
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$tanh */0;
  })($nesting[0], $nesting);
};
Opal.modules["corelib/complex"] = function(Opal) {
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/numeric");
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Complex');
    var $nesting = [self].concat($parent_nesting), $Complex_rect$1, $Complex_polar$2, $Complex_initialize$3, $Complex_coerce$4, $Complex_$eq_eq$5, $Complex_$minus$$6, $Complex_$plus$7, $Complex_$minus$8, $Complex_$$9, $Complex_$slash$10, $Complex_$$$11, $Complex_abs$12, $Complex_abs2$13, $Complex_angle$14, $Complex_conj$15, $Complex_denominator$16, $Complex_eql$ques$17, $Complex_fdiv$18, $Complex_finite$ques$19, $Complex_hash$20, $Complex_infinite$ques$21, $Complex_inspect$22, $Complex_numerator$23, $Complex_polar$24, $Complex_rationalize$25, $Complex_real$ques$26, $Complex_rect$27, $Complex_to_f$28, $Complex_to_i$29, $Complex_to_r$30, $Complex_to_s$31;
    self.$$prototype.real = self.$$prototype.imag = nil;
    /* destroyed: TreeShaking#shake_methods/$rect */0;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting);
      return /* destroyed: TreeShaking#shake_methods/$rectangular */0;
    })(Opal.get_singleton_class(self), $nesting);
    Opal.defs(self, '$polar', $Complex_polar$2 = function $$polar(r, theta) {
      var $a, $b, $c, self = this;
      if(theta == null) {
        theta = 0;
      }
      ;
      if($truthy(($truthy($a = ($truthy($b = ($truthy($c = $$($nesting, 'Numeric')['$==='](r)) ? r['$real?']() : $c)) ? $$($nesting, 'Numeric')['$==='](theta) : $b)) ? theta['$real?']() : $a))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "not a real");
      }
      ;
      return self.$new($rb_times(r, $$($nesting, 'Math').$cos(theta)), $rb_times(r, $$($nesting, 'Math').$sin(theta)));
    }, $Complex_polar$2.$$arity = -2);
    self.$attr_reader("real", "imag");
    Opal.def(self, '$initialize', $Complex_initialize$3 = function $$initialize(real, imag) {
      var self = this;
      if(imag == null) {
        imag = 0;
      }
      ;
      self.real = real;
      return (self.imag = imag);
    }, $Complex_initialize$3.$$arity = -2);
    Opal.def(self, '$coerce', $Complex_coerce$4 = function $$coerce(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        return [other, self];
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return [$$($nesting, 'Complex').$new(other, 0), self];
      } else {
        return self.$raise($$($nesting, 'TypeError'), "" + (other.$class()) + " can't be coerced into Complex");
      }
    }, $Complex_coerce$4.$$arity = 1);
    Opal.def(self, '$==', $Complex_$eq_eq$5 = function(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        return (($a = self.real['$=='](other.$real())) ? self.imag['$=='](other.$imag()) : self.real['$=='](other.$real()));
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return (($a = self.real['$=='](other)) ? self.imag['$=='](0) : self.real['$=='](other));
      } else {
        return other['$=='](self);
      }
    }, $Complex_$eq_eq$5.$$arity = 1);
    Opal.def(self, '$-@', $Complex_$minus$$6 = function() {
      var self = this;
      return self.$Complex(self.real['$-@'](), self.imag['$-@']());
    }, $Complex_$minus$$6.$$arity = 0);
    Opal.def(self, '$+', $Complex_$plus$7 = function(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        return self.$Complex($rb_plus(self.real, other.$real()), $rb_plus(self.imag, other.$imag()));
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return self.$Complex($rb_plus(self.real, other), self.imag);
      } else {
        return self.$__coerced__("+", other);
      }
    }, $Complex_$plus$7.$$arity = 1);
    Opal.def(self, '$-', $Complex_$minus$8 = function(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        return self.$Complex($rb_minus(self.real, other.$real()), $rb_minus(self.imag, other.$imag()));
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return self.$Complex($rb_minus(self.real, other), self.imag);
      } else {
        return self.$__coerced__("-", other);
      }
    }, $Complex_$minus$8.$$arity = 1);
    Opal.def(self, '$*', $Complex_$$9 = function(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        return self.$Complex($rb_minus($rb_times(self.real, other.$real()), $rb_times(self.imag, other.$imag())), $rb_plus($rb_times(self.real, other.$imag()), $rb_times(self.imag, other.$real())));
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return self.$Complex($rb_times(self.real, other), $rb_times(self.imag, other));
      } else {
        return self.$__coerced__("*", other);
      }
    }, $Complex_$$9.$$arity = 1);
    Opal.def(self, '$/', $Complex_$slash$10 = function(other) {
      var $a, $b, $c, $d, self = this;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        if($truthy(($truthy($a = ($truthy($b = ($truthy($c = ($truthy($d = $$($nesting, 'Number')['$==='](self.real)) ? self.real['$nan?']() : $d)) ? $c : ($truthy($d = $$($nesting, 'Number')['$==='](self.imag)) ? self.imag['$nan?']() : $d))) ? $b : ($truthy($c = $$($nesting, 'Number')['$==='](other.$real())) ? other.$real()['$nan?']() : $c))) ? $a : ($truthy($b = $$($nesting, 'Number')['$==='](other.$imag())) ? other.$imag()['$nan?']() : $b)))) {
          return $$($nesting, 'Complex').$new($$$($$($nesting, 'Float'), 'NAN'), $$$($$($nesting, 'Float'), 'NAN'));
        } else {
          return $rb_divide($rb_times(self, other.$conj()), other.$abs2());
        }
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](other)) ? other['$real?']() : $a))) {
        return self.$Complex(self.real.$quo(other), self.imag.$quo(other));
      } else {
        return self.$__coerced__("/", other);
      }
    }, $Complex_$slash$10.$$arity = 1);
    Opal.def(self, '$**', $Complex_$$$11 = function(other) {
      var $a, $b, $c, $d, self = this, r = nil, theta = nil, ore = nil, oim = nil, nr = nil, ntheta = nil, x = nil, z = nil, n = nil, div = nil, mod = nil;
      if(other['$=='](0)) {
        return $$($nesting, 'Complex').$new(1, 0);
      }
      ;
      if($truthy($$($nesting, 'Complex')['$==='](other))) {
        $b = self.$polar(), $a = Opal.to_ary($b), (r = ($a[0] == null ? nil : $a[0])), (theta = ($a[1] == null ? nil : $a[1])), $b;
        ore = other.$real();
        oim = other.$imag();
        nr = $$($nesting, 'Math').$exp($rb_minus($rb_times(ore, $$($nesting, 'Math').$log(r)), $rb_times(oim, theta)));
        ntheta = $rb_plus($rb_times(theta, ore), $rb_times(oim, $$($nesting, 'Math').$log(r)));
        return $$($nesting, 'Complex').$polar(nr, ntheta);
      } else if($truthy($$($nesting, 'Integer')['$==='](other))) {
        if($truthy($rb_gt(other, 0))) {
          x = self;
          z = x;
          n = $rb_minus(other, 1);
          while($truthy(n['$!='](0))) {
            $c = n.$divmod(2), $b = Opal.to_ary($c), (div = ($b[0] == null ? nil : $b[0])), (mod = ($b[1] == null ? nil : $b[1])), $c;
            while(mod['$=='](0)) {
              x = self.$Complex($rb_minus($rb_times(x.$real(), x.$real()), $rb_times(x.$imag(), x.$imag())), $rb_times($rb_times(2, x.$real()), x.$imag()));
              n = div;
              $d = n.$divmod(2), $c = Opal.to_ary($d), (div = ($c[0] == null ? nil : $c[0])), (mod = ($c[1] == null ? nil : $c[1])), $d;
            }
            ;
            z = $rb_times(z, x);
            n = $rb_minus(n, 1);
          }
          ;
          return z;
        } else {
          return $rb_divide($$($nesting, 'Rational').$new(1, 1), self)['$**'](other['$-@']());
        }
      } else if($truthy(($truthy($a = $$($nesting, 'Float')['$==='](other)) ? $a : $$($nesting, 'Rational')['$==='](other)))) {
        $b = self.$polar(), $a = Opal.to_ary($b), (r = ($a[0] == null ? nil : $a[0])), (theta = ($a[1] == null ? nil : $a[1])), $b;
        return $$($nesting, 'Complex').$polar(r['$**'](other), $rb_times(theta, other));
      } else {
        return self.$__coerced__("**", other);
      }
      ;
    }, $Complex_$$$11.$$arity = 1);
    Opal.def(self, '$abs', $Complex_abs$12 = function $$abs() {
      var self = this;
      return $$($nesting, 'Math').$hypot(self.real, self.imag);
    }, $Complex_abs$12.$$arity = 0);
    Opal.def(self, '$abs2', $Complex_abs2$13 = function $$abs2() {
      var self = this;
      return $rb_plus($rb_times(self.real, self.real), $rb_times(self.imag, self.imag));
    }, $Complex_abs2$13.$$arity = 0);
    Opal.def(self, '$angle', $Complex_angle$14 = function $$angle() {
      var self = this;
      return $$($nesting, 'Math').$atan2(self.imag, self.real);
    }, $Complex_angle$14.$$arity = 0);
    Opal.alias(self, "arg", "angle");
    Opal.def(self, '$conj', $Complex_conj$15 = function $$conj() {
      var self = this;
      return self.$Complex(self.real, self.imag['$-@']());
    }, $Complex_conj$15.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$conjugate */0;
    Opal.def(self, '$denominator', $Complex_denominator$16 = function $$denominator() {
      var self = this;
      return self.real.$denominator().$lcm(self.imag.$denominator());
    }, $Complex_denominator$16.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$divide */0;
    Opal.def(self, '$eql?', $Complex_eql$ques$17 = function(other) {
      var $a, $b, self = this;
      return ($truthy($a = ($truthy($b = $$($nesting, 'Complex')['$==='](other)) ? self.real.$class()['$=='](self.imag.$class()) : $b)) ? self['$=='](other) : $a);
    }, $Complex_eql$ques$17.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$fdiv */0;
    Opal.def(self, '$finite?', $Complex_finite$ques$19 = function() {
      var $a, self = this;
      return ($truthy($a = self.real['$finite?']()) ? self.imag['$finite?']() : $a);
    }, $Complex_finite$ques$19.$$arity = 0);
    Opal.def(self, '$hash', $Complex_hash$20 = function $$hash() {
      var self = this;
      return "" + "Complex:" + (self.real) + ":" + (self.imag);
    }, $Complex_hash$20.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$imaginary */0;
    Opal.def(self, '$infinite?', $Complex_infinite$ques$21 = function() {
      var $a, self = this;
      return ($truthy($a = self.real['$infinite?']()) ? $a : self.imag['$infinite?']());
    }, $Complex_infinite$ques$21.$$arity = 0);
    Opal.def(self, '$inspect', $Complex_inspect$22 = function $$inspect() {
      var self = this;
      return "" + "(" + (self) + ")";
    }, $Complex_inspect$22.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$magnitude */0;
    Opal.udef(self, '$' + "negative?");
    ;
    Opal.def(self, '$numerator', $Complex_numerator$23 = function $$numerator() {
      var self = this, d = nil;
      d = self.$denominator();
      return self.$Complex($rb_times(self.real.$numerator(), $rb_divide(d, self.real.$denominator())), $rb_times(self.imag.$numerator(), $rb_divide(d, self.imag.$denominator())));
    }, $Complex_numerator$23.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$phase */0;
    Opal.def(self, '$polar', $Complex_polar$24 = function $$polar() {
      var self = this;
      return [self.$abs(), self.$arg()];
    }, $Complex_polar$24.$$arity = 0);
    Opal.udef(self, '$' + "positive?");
    ;
    Opal.alias(self, "quo", "/");
    Opal.def(self, '$rationalize', $Complex_rationalize$25 = function $$rationalize(eps) {
      var self = this;
      ;
      if(arguments.length > 1) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "wrong number of arguments (" + (arguments.length) + " for 0..1)");
      }
      ;
      if($truthy(self.imag['$!='](0))) {
        self.$raise($$($nesting, 'RangeError'), "" + "can't' convert " + (self) + " into Rational");
      }
      ;
      return self.$real().$rationalize(eps);
    }, $Complex_rationalize$25.$$arity = -1);
    Opal.def(self, '$real?', $Complex_real$ques$26 = function() {
      var self = this;
      return false;
    }, $Complex_real$ques$26.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$rect */0;
    /* destroyed: TreeShaking#shake_methods/$rectangular */0;
    Opal.def(self, '$to_f', $Complex_to_f$28 = function $$to_f() {
      var self = this;
      if(self.imag['$=='](0)) {

      } else {
        self.$raise($$($nesting, 'RangeError'), "" + "can't convert " + (self) + " into Float");
      }
      ;
      return self.real.$to_f();
    }, $Complex_to_f$28.$$arity = 0);
    Opal.def(self, '$to_i', $Complex_to_i$29 = function $$to_i() {
      var self = this;
      if(self.imag['$=='](0)) {

      } else {
        self.$raise($$($nesting, 'RangeError'), "" + "can't convert " + (self) + " into Integer");
      }
      ;
      return self.real.$to_i();
    }, $Complex_to_i$29.$$arity = 0);
    Opal.def(self, '$to_r', $Complex_to_r$30 = function $$to_r() {
      var self = this;
      if(self.imag['$=='](0)) {

      } else {
        self.$raise($$($nesting, 'RangeError'), "" + "can't convert " + (self) + " into Rational");
      }
      ;
      return self.real.$to_r();
    }, $Complex_to_r$30.$$arity = 0);
    Opal.def(self, '$to_s', $Complex_to_s$31 = function $$to_s() {
      var $a, $b, $c, self = this, result = nil;
      result = self.real.$inspect();
      result = $rb_plus(result, (function() {
        if($truthy(($truthy($a = ($truthy($b = ($truthy($c = $$($nesting, 'Number')['$==='](self.imag)) ? self.imag['$nan?']() : $c)) ? $b : self.imag['$positive?']())) ? $a : self.imag['$zero?']()))) {
          return "+";
        } else {
          return "-";
        }
        ;
        return nil;
      })());
      result = $rb_plus(result, self.imag.$abs().$inspect());
      if($truthy(($truthy($a = $$($nesting, 'Number')['$==='](self.imag)) ? ($truthy($b = self.imag['$nan?']()) ? $b : self.imag['$infinite?']()) : $a))) {
        result = $rb_plus(result, "*");
      }
      ;
      return $rb_plus(result, "i");
    }, $Complex_to_s$31.$$arity = 0);
    return Opal.const_set($nesting[0], 'I', self.$new(0, 1));
  })($nesting[0], $$($nesting, 'Numeric'), $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_Complex$32;
    Opal.def(self, '$Complex', $Kernel_Complex$32 = function $$Complex(real, imag) {
      var self = this;
      if(imag == null) {
        imag = nil;
      }
      ;
      if($truthy(imag)) {
        return $$($nesting, 'Complex').$new(real, imag);
      } else {
        return $$($nesting, 'Complex').$new(real, 0);
      }
      ;
    }, $Kernel_Complex$32.$$arity = -2);
  })($nesting[0], $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_to_c$33;
    return (/* destroyed: TreeShaking#shake_methods/$to_c */0, nil) && 'to_c';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/rational"] = function(Opal) {
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/numeric");
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Rational');
    var $nesting = [self].concat($parent_nesting), $Rational_reduce$1, $Rational_convert$2, $Rational_initialize$3, $Rational_numerator$4, $Rational_denominator$5, $Rational_coerce$6, $Rational_$eq_eq$7, $Rational_$lt_eq_gt$8, $Rational_$plus$9, $Rational_$minus$10, $Rational_$$11, $Rational_$slash$12, $Rational_$$$13, $Rational_abs$14, $Rational_ceil$15, $Rational_floor$16, $Rational_hash$17, $Rational_inspect$18, $Rational_rationalize$19, $Rational_round$20, $Rational_to_f$21, $Rational_to_i$22, $Rational_to_r$23, $Rational_to_s$24, $Rational_truncate$25, $Rational_with_precision$26;
    self.$$prototype.num = self.$$prototype.den = nil;
    Opal.defs(self, '$reduce', $Rational_reduce$1 = function $$reduce(num, den) {
      var self = this, gcd = nil;
      num = num.$to_i();
      den = den.$to_i();
      if(den['$=='](0)) {
        self.$raise($$($nesting, 'ZeroDivisionError'), "divided by 0");
      } else if($truthy($rb_lt(den, 0))) {
        num = num['$-@']();
        den = den['$-@']();
      } else if(den['$=='](1)) {
        return self.$new(num, den);
      }
      ;
      gcd = num.$gcd(den);
      return self.$new($rb_divide(num, gcd), $rb_divide(den, gcd));
    }, $Rational_reduce$1.$$arity = 2);
    Opal.defs(self, '$convert', $Rational_convert$2 = function $$convert(num, den) {
      var $a, $b, self = this;
      if($truthy(($truthy($a = num['$nil?']()) ? $a : den['$nil?']()))) {
        self.$raise($$($nesting, 'TypeError'), "cannot convert nil into Rational");
      }
      ;
      if($truthy(($truthy($a = $$($nesting, 'Integer')['$==='](num)) ? $$($nesting, 'Integer')['$==='](den) : $a))) {
        return self.$reduce(num, den);
      }
      ;
      if($truthy(($truthy($a = ($truthy($b = $$($nesting, 'Float')['$==='](num)) ? $b : $$($nesting, 'String')['$==='](num))) ? $a : $$($nesting, 'Complex')['$==='](num)))) {
        num = num.$to_r();
      }
      ;
      if($truthy(($truthy($a = ($truthy($b = $$($nesting, 'Float')['$==='](den)) ? $b : $$($nesting, 'String')['$==='](den))) ? $a : $$($nesting, 'Complex')['$==='](den)))) {
        den = den.$to_r();
      }
      ;
      if($truthy(($truthy($a = den['$equal?'](1)) ? $$($nesting, 'Integer')['$==='](num)['$!']() : $a))) {
        return $$($nesting, 'Opal')['$coerce_to!'](num, $$($nesting, 'Rational'), "to_r");
      } else if($truthy(($truthy($a = $$($nesting, 'Numeric')['$==='](num)) ? $$($nesting, 'Numeric')['$==='](den) : $a))) {
        return $rb_divide(num, den);
      } else {
        return self.$reduce(num, den);
      }
      ;
    }, $Rational_convert$2.$$arity = 2);
    Opal.def(self, '$initialize', $Rational_initialize$3 = function $$initialize(num, den) {
      var self = this;
      self.num = num;
      return (self.den = den);
    }, $Rational_initialize$3.$$arity = 2);
    Opal.def(self, '$numerator', $Rational_numerator$4 = function $$numerator() {
      var self = this;
      return self.num;
    }, $Rational_numerator$4.$$arity = 0);
    Opal.def(self, '$denominator', $Rational_denominator$5 = function $$denominator() {
      var self = this;
      return self.den;
    }, $Rational_denominator$5.$$arity = 0);
    Opal.def(self, '$coerce', $Rational_coerce$6 = function $$coerce(other) {
      var self = this, $case = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          return [other, self];
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return [other.$to_r(), self];
        } else if($$($nesting, 'Float')['$===']($case)) {
          return [other, self.$to_f()];
        } else {
          return nil;
        }
      })();
    }, $Rational_coerce$6.$$arity = 1);
    Opal.def(self, '$==', $Rational_$eq_eq$7 = function(other) {
      var $a, self = this, $case = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          return (($a = self.num['$=='](other.$numerator())) ? self.den['$=='](other.$denominator()) : self.num['$=='](other.$numerator()));
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return (($a = self.num['$=='](other)) ? self.den['$=='](1) : self.num['$=='](other));
        } else if($$($nesting, 'Float')['$===']($case)) {
          return self.$to_f()['$=='](other);
        } else {
          return other['$=='](self);
        }
      })();
    }, $Rational_$eq_eq$7.$$arity = 1);
    Opal.def(self, '$<=>', $Rational_$lt_eq_gt$8 = function(other) {
      var self = this, $case = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          return $rb_minus($rb_times(self.num, other.$denominator()), $rb_times(self.den, other.$numerator()))['$<=>'](0);
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return $rb_minus(self.num, $rb_times(self.den, other))['$<=>'](0);
        } else if($$($nesting, 'Float')['$===']($case)) {
          return self.$to_f()['$<=>'](other);
        } else {
          return self.$__coerced__("<=>", other);
        }
      })();
    }, $Rational_$lt_eq_gt$8.$$arity = 1);
    Opal.def(self, '$+', $Rational_$plus$9 = function(other) {
      var self = this, $case = nil, num = nil, den = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          num = $rb_plus($rb_times(self.num, other.$denominator()), $rb_times(self.den, other.$numerator()));
          den = $rb_times(self.den, other.$denominator());
          return self.$Rational(num, den);
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return self.$Rational($rb_plus(self.num, $rb_times(other, self.den)), self.den);
        } else if($$($nesting, 'Float')['$===']($case)) {
          return $rb_plus(self.$to_f(), other);
        } else {
          return self.$__coerced__("+", other);
        }
      })();
    }, $Rational_$plus$9.$$arity = 1);
    Opal.def(self, '$-', $Rational_$minus$10 = function(other) {
      var self = this, $case = nil, num = nil, den = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          num = $rb_minus($rb_times(self.num, other.$denominator()), $rb_times(self.den, other.$numerator()));
          den = $rb_times(self.den, other.$denominator());
          return self.$Rational(num, den);
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return self.$Rational($rb_minus(self.num, $rb_times(other, self.den)), self.den);
        } else if($$($nesting, 'Float')['$===']($case)) {
          return $rb_minus(self.$to_f(), other);
        } else {
          return self.$__coerced__("-", other);
        }
      })();
    }, $Rational_$minus$10.$$arity = 1);
    Opal.def(self, '$*', $Rational_$$11 = function(other) {
      var self = this, $case = nil, num = nil, den = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          num = $rb_times(self.num, other.$numerator());
          den = $rb_times(self.den, other.$denominator());
          return self.$Rational(num, den);
        } else if($$($nesting, 'Integer')['$===']($case)) {
          return self.$Rational($rb_times(self.num, other), self.den);
        } else if($$($nesting, 'Float')['$===']($case)) {
          return $rb_times(self.$to_f(), other);
        } else {
          return self.$__coerced__("*", other);
        }
      })();
    }, $Rational_$$11.$$arity = 1);
    Opal.def(self, '$/', $Rational_$slash$12 = function(other) {
      var self = this, $case = nil, num = nil, den = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Rational')['$===']($case)) {
          num = $rb_times(self.num, other.$denominator());
          den = $rb_times(self.den, other.$numerator());
          return self.$Rational(num, den);
        } else if($$($nesting, 'Integer')['$===']($case)) {
          if(other['$=='](0)) {
            return $rb_divide(self.$to_f(), 0.0);
          } else {
            return self.$Rational(self.num, $rb_times(self.den, other));
          }
        } else if($$($nesting, 'Float')['$===']($case)) {
          return $rb_divide(self.$to_f(), other);
        } else {
          return self.$__coerced__("/", other);
        }
      })();
    }, $Rational_$slash$12.$$arity = 1);
    Opal.def(self, '$**', $Rational_$$$13 = function(other) {
      var $a, self = this, $case = nil;
      return (function() {
        $case = other;
        if($$($nesting, 'Integer')['$===']($case)) {
          if($truthy((($a = self['$=='](0)) ? $rb_lt(other, 0) : self['$=='](0)))) {
            return $$$($$($nesting, 'Float'), 'INFINITY');
          } else if($truthy($rb_gt(other, 0))) {
            return self.$Rational(self.num['$**'](other), self.den['$**'](other));
          } else if($truthy($rb_lt(other, 0))) {
            return self.$Rational(self.den['$**'](other['$-@']()), self.num['$**'](other['$-@']()));
          } else {
            return self.$Rational(1, 1);
          }
        } else if($$($nesting, 'Float')['$===']($case)) {
          return self.$to_f()['$**'](other);
        } else if($$($nesting, 'Rational')['$===']($case)) {
          if(other['$=='](0)) {
            return self.$Rational(1, 1);
          } else if(other.$denominator()['$=='](1)) {
            if($truthy($rb_lt(other, 0))) {
              return self.$Rational(self.den['$**'](other.$numerator().$abs()), self.num['$**'](other.$numerator().$abs()));
            } else {
              return self.$Rational(self.num['$**'](other.$numerator()), self.den['$**'](other.$numerator()));
            }
          } else if($truthy((($a = self['$=='](0)) ? $rb_lt(other, 0) : self['$=='](0)))) {
            return self.$raise($$($nesting, 'ZeroDivisionError'), "divided by 0");
          } else {
            return self.$to_f()['$**'](other);
          }
        } else {
          return self.$__coerced__("**", other);
        }
      })();
    }, $Rational_$$$13.$$arity = 1);
    Opal.def(self, '$abs', $Rational_abs$14 = function $$abs() {
      var self = this;
      return self.$Rational(self.num.$abs(), self.den.$abs());
    }, $Rational_abs$14.$$arity = 0);
    Opal.def(self, '$ceil', $Rational_ceil$15 = function $$ceil(precision) {
      var self = this;
      if(precision == null) {
        precision = 0;
      }
      ;
      if(precision['$=='](0)) {
        return $rb_divide(self.num['$-@'](), self.den)['$-@']().$ceil();
      } else {
        return self.$with_precision("ceil", precision);
      }
      ;
    }, $Rational_ceil$15.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$divide */0;
    Opal.def(self, '$floor', $Rational_floor$16 = function $$floor(precision) {
      var self = this;
      if(precision == null) {
        precision = 0;
      }
      ;
      if(precision['$=='](0)) {
        return $rb_divide(self.num['$-@'](), self.den)['$-@']().$floor();
      } else {
        return self.$with_precision("floor", precision);
      }
      ;
    }, $Rational_floor$16.$$arity = -1);
    Opal.def(self, '$hash', $Rational_hash$17 = function $$hash() {
      var self = this;
      return "" + "Rational:" + (self.num) + ":" + (self.den);
    }, $Rational_hash$17.$$arity = 0);
    Opal.def(self, '$inspect', $Rational_inspect$18 = function $$inspect() {
      var self = this;
      return "" + "(" + (self) + ")";
    }, $Rational_inspect$18.$$arity = 0);
    Opal.alias(self, "quo", "/");
    Opal.def(self, '$rationalize', $Rational_rationalize$19 = function $$rationalize(eps) {
      var self = this;
      ;
      if(arguments.length > 1) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "wrong number of arguments (" + (arguments.length) + " for 0..1)");
      }
      if(eps == null) {
        return self;
      }
      var e = eps.$abs(), a = $rb_minus(self, e), b = $rb_plus(self, e);
      var p0 = 0, p1 = 1, q0 = 1, q1 = 0, p2, q2;
      var c, k, t;
      while(true) {
        c = (a).$ceil();
        if($rb_le(c, b)) {
          break;
        }
        k = c - 1;
        p2 = k * p1 + p0;
        q2 = k * q1 + q0;
        t = $rb_divide(1, $rb_minus(b, k));
        b = $rb_divide(1, $rb_minus(a, k));
        a = t;
        p0 = p1;
        q0 = q1;
        p1 = p2;
        q1 = q2;
      }
      return self.$Rational(c * p1 + p0, c * q1 + q0);
      ;
    }, $Rational_rationalize$19.$$arity = -1);
    Opal.def(self, '$round', $Rational_round$20 = function $$round(precision) {
      var self = this, num = nil, den = nil, approx = nil;
      if(precision == null) {
        precision = 0;
      }
      ;
      if(precision['$=='](0)) {

      } else {
        return self.$with_precision("round", precision);
      }
      ;
      if(self.num['$=='](0)) {
        return 0;
      }
      ;
      if(self.den['$=='](1)) {
        return self.num;
      }
      ;
      num = $rb_plus($rb_times(self.num.$abs(), 2), self.den);
      den = $rb_times(self.den, 2);
      approx = $rb_divide(num, den).$truncate();
      if($truthy($rb_lt(self.num, 0))) {
        return approx['$-@']();
      } else {
        return approx;
      }
      ;
    }, $Rational_round$20.$$arity = -1);
    Opal.def(self, '$to_f', $Rational_to_f$21 = function $$to_f() {
      var self = this;
      return $rb_divide(self.num, self.den);
    }, $Rational_to_f$21.$$arity = 0);
    Opal.def(self, '$to_i', $Rational_to_i$22 = function $$to_i() {
      var self = this;
      return self.$truncate();
    }, $Rational_to_i$22.$$arity = 0);
    Opal.def(self, '$to_r', $Rational_to_r$23 = function $$to_r() {
      var self = this;
      return self;
    }, $Rational_to_r$23.$$arity = 0);
    Opal.def(self, '$to_s', $Rational_to_s$24 = function $$to_s() {
      var self = this;
      return "" + (self.num) + "/" + (self.den);
    }, $Rational_to_s$24.$$arity = 0);
    Opal.def(self, '$truncate', $Rational_truncate$25 = function $$truncate(precision) {
      var self = this;
      if(precision == null) {
        precision = 0;
      }
      ;
      if(precision['$=='](0)) {
        if($truthy($rb_lt(self.num, 0))) {
          return self.$ceil();
        } else {
          return self.$floor();
        }
      } else {
        return self.$with_precision("truncate", precision);
      }
      ;
    }, $Rational_truncate$25.$$arity = -1);
    return (Opal.def(self, '$with_precision', $Rational_with_precision$26 = function $$with_precision(method, precision) {
      var self = this, p = nil, s = nil;
      if($truthy($$($nesting, 'Integer')['$==='](precision))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "not an Integer");
      }
      ;
      p = (10)['$**'](precision);
      s = $rb_times(self, p);
      if($truthy($rb_lt(precision, 1))) {
        return $rb_divide(s.$send(method), p).$to_i();
      } else {
        return self.$Rational(s.$send(method), p);
      }
      ;
    }, $Rational_with_precision$26.$$arity = 2), nil) && 'with_precision';
  })($nesting[0], $$($nesting, 'Numeric'), $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_Rational$27;
    Opal.def(self, '$Rational', $Kernel_Rational$27 = function $$Rational(numerator, denominator) {
      var self = this;
      if(denominator == null) {
        denominator = 1;
      }
      ;
      return $$($nesting, 'Rational').$convert(numerator, denominator);
    }, $Kernel_Rational$27.$$arity = -2);
  })($nesting[0], $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_to_r$28;
    return (Opal.def(self, '$to_r', $String_to_r$28 = function $$to_r() {
      var self = this;
      var str = self.trimLeft(), re = /^[+-]?[\d_]+(\.[\d_]+)?/, match = str.match(re), numerator, denominator;
            function isFloat() {
        return re.test(str);
      }
            function cutFloat() {
        var match = str.match(re);
        var number = match[0];
        str = str.slice(number.length);
        return number.replace(/_/g, '');
      }
      if(isFloat()) {
        numerator = parseFloat(cutFloat());
        if(str[0] === '/') {
          str = str.slice(1);
          if(isFloat()) {
            denominator = parseFloat(cutFloat());
            return self.$Rational(numerator, denominator);
          } else {
            return self.$Rational(numerator, 1);
          }
        } else {
          return self.$Rational(numerator, 1);
        }
      } else {
        return self.$Rational(0, 1);
      }
    }, $String_to_r$28.$$arity = 0), nil) && 'to_r';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/time"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $range = Opal.range;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/comparable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Time');
    var $nesting = [self].concat($parent_nesting), $Time_at$1, $Time_new$2, $Time_local$3, $Time_gm$4, $Time_now$5, $Time_$plus$6, $Time_$minus$7, $Time_$lt_eq_gt$8, $Time_$eq_eq$9, $Time_asctime$10, $Time_day$11, $Time_yday$12, $Time_isdst$13, $Time_dup$14, $Time_eql$ques$15, $Time_friday$ques$16, $Time_hash$17, $Time_hour$18, $Time_inspect$19, $Time_min$20, $Time_mon$21, $Time_monday$ques$22, $Time_saturday$ques$23, $Time_sec$24, $Time_succ$25, $Time_usec$26, $Time_zone$27, $Time_getgm$28, $Time_gmtime$29, $Time_gmt$ques$30, $Time_gmt_offset$31, $Time_strftime$32, $Time_sunday$ques$33, $Time_thursday$ques$34, $Time_to_a$35, $Time_to_f$36, $Time_to_i$37, $Time_tuesday$ques$38, $Time_wday$39, $Time_wednesday$ques$40, $Time_year$41, $Time_cweek_cyear$42;
    self.$include($$($nesting, 'Comparable'));
    var days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], short_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], short_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], long_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    ;
    /* destroyed: TreeShaking#shake_methods/$at */0;
        function time_params(year, month, day, hour, min, sec) {
      if(year.$$is_string) {
        year = parseInt(year, 10);
      } else {
        year = $$($nesting, 'Opal')['$coerce_to!'](year, $$($nesting, 'Integer'), "to_int");
      }
      if(month === nil) {
        month = 1;
      } else if(!month.$$is_number) {
        if((month)['$respond_to?']("to_str")) {
          month = (month).$to_str();
          switch(month.toLowerCase()) {
            case 'jan':
              month = 1;
              break;
            case 'feb':
              month = 2;
              break;
            case 'mar':
              month = 3;
              break;
            case 'apr':
              month = 4;
              break;
            case 'may':
              month = 5;
              break;
            case 'jun':
              month = 6;
              break;
            case 'jul':
              month = 7;
              break;
            case 'aug':
              month = 8;
              break;
            case 'sep':
              month = 9;
              break;
            case 'oct':
              month = 10;
              break;
            case 'nov':
              month = 11;
              break;
            case 'dec':
              month = 12;
              break;
            default:
              month = (month).$to_i();
          }
        } else {
          month = $$($nesting, 'Opal')['$coerce_to!'](month, $$($nesting, 'Integer'), "to_int");
        }
      }
      if(month < 1 || month > 12) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "month out of range: " + (month));
      }
      month = month - 1;
      if(day === nil) {
        day = 1;
      } else if(day.$$is_string) {
        day = parseInt(day, 10);
      } else {
        day = $$($nesting, 'Opal')['$coerce_to!'](day, $$($nesting, 'Integer'), "to_int");
      }
      if(day < 1 || day > 31) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "day out of range: " + (day));
      }
      if(hour === nil) {
        hour = 0;
      } else if(hour.$$is_string) {
        hour = parseInt(hour, 10);
      } else {
        hour = $$($nesting, 'Opal')['$coerce_to!'](hour, $$($nesting, 'Integer'), "to_int");
      }
      if(hour < 0 || hour > 24) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "hour out of range: " + (hour));
      }
      if(min === nil) {
        min = 0;
      } else if(min.$$is_string) {
        min = parseInt(min, 10);
      } else {
        min = $$($nesting, 'Opal')['$coerce_to!'](min, $$($nesting, 'Integer'), "to_int");
      }
      if(min < 0 || min > 59) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "min out of range: " + (min));
      }
      if(sec === nil) {
        sec = 0;
      } else if(!sec.$$is_number) {
        if(sec.$$is_string) {
          sec = parseInt(sec, 10);
        } else {
          sec = $$($nesting, 'Opal')['$coerce_to!'](sec, $$($nesting, 'Integer'), "to_int");
        }
      }
      if(sec < 0 || sec > 60) {
        self.$raise($$($nesting, 'ArgumentError'), "" + "sec out of range: " + (sec));
      }
      return [year, month, day, hour, min, sec];
    }
    ;
    Opal.defs(self, '$new', $Time_new$2 = function(year, month, day, hour, min, sec, utc_offset) {
      var self = this;
      ;
      if(month == null) {
        month = nil;
      }
      ;
      if(day == null) {
        day = nil;
      }
      ;
      if(hour == null) {
        hour = nil;
      }
      ;
      if(min == null) {
        min = nil;
      }
      ;
      if(sec == null) {
        sec = nil;
      }
      ;
      if(utc_offset == null) {
        utc_offset = nil;
      }
      ;
      var args, result;
      if(year === undefined) {
        return new Date();
      }
      if(utc_offset !== nil) {
        self.$raise($$($nesting, 'ArgumentError'), "Opal does not support explicitly specifying UTC offset for Time");
      }
      args = time_params(year, month, day, hour, min, sec);
      year = args[0];
      month = args[1];
      day = args[2];
      hour = args[3];
      min = args[4];
      sec = args[5];
      result = new Date(year, month, day, hour, min, 0, sec * 1000);
      if(year < 100) {
        result.setFullYear(year);
      }
      return result;
      ;
    }, $Time_new$2.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$local */0;
    /* destroyed: TreeShaking#shake_methods/$gm */0;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting);
      /* destroyed: TreeShaking#shake_methods/$mktime */0;
      return /* destroyed: TreeShaking#shake_methods/$utc */0;
    })(Opal.get_singleton_class(self), $nesting);
    Opal.defs(self, '$now', $Time_now$5 = function $$now() {
      var self = this;
      return self.$new();
    }, $Time_now$5.$$arity = 0);
    Opal.def(self, '$+', $Time_$plus$6 = function(other) {
      var self = this;
      if($truthy($$($nesting, 'Time')['$==='](other))) {
        self.$raise($$($nesting, 'TypeError'), "time + time?");
      }
      ;
      if(!other.$$is_number) {
        other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Integer'), "to_int");
      }
      var result = new Date(self.getTime() + (other * 1000));
      result.is_utc = self.is_utc;
      return result;
      ;
    }, $Time_$plus$6.$$arity = 1);
    Opal.def(self, '$-', $Time_$minus$7 = function(other) {
      var self = this;
      if($truthy($$($nesting, 'Time')['$==='](other))) {
        return (self.getTime() - other.getTime()) / 1000;
      }
      ;
      if(!other.$$is_number) {
        other = $$($nesting, 'Opal')['$coerce_to!'](other, $$($nesting, 'Integer'), "to_int");
      }
      var result = new Date(self.getTime() - (other * 1000));
      result.is_utc = self.is_utc;
      return result;
      ;
    }, $Time_$minus$7.$$arity = 1);
    Opal.def(self, '$<=>', $Time_$lt_eq_gt$8 = function(other) {
      var self = this, r = nil;
      if($truthy($$($nesting, 'Time')['$==='](other))) {
        return self.$to_f()['$<=>'](other.$to_f());
      } else {
        r = other['$<=>'](self);
        if($truthy(r['$nil?']())) {
          return nil;
        } else if($truthy($rb_gt(r, 0))) {
          return -1;
        } else if($truthy($rb_lt(r, 0))) {
          return 1;
        } else {
          return 0;
        }
        ;
      }
    }, $Time_$lt_eq_gt$8.$$arity = 1);
    Opal.def(self, '$==', $Time_$eq_eq$9 = function(other) {
      var $a, self = this;
      return ($truthy($a = $$($nesting, 'Time')['$==='](other)) ? self.$to_f() === other.$to_f() : $a);
    }, $Time_$eq_eq$9.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$asctime */0;
    /* destroyed: TreeShaking#shake_methods/$ctime */0;
    Opal.def(self, '$day', $Time_day$11 = function $$day() {
      var self = this;
      return self.is_utc ? self.getUTCDate() : self.getDate();
    }, $Time_day$11.$$arity = 0);
    Opal.def(self, '$yday', $Time_yday$12 = function $$yday() {
      var self = this, start_of_year = nil, start_of_day = nil, one_day = nil;
      start_of_year = $$($nesting, 'Time').$new(self.$year()).$to_i();
      start_of_day = $$($nesting, 'Time').$new(self.$year(), self.$month(), self.$day()).$to_i();
      one_day = 86400;
      return $rb_plus($rb_divide($rb_minus(start_of_day, start_of_year), one_day).$round(), 1);
    }, $Time_yday$12.$$arity = 0);
    Opal.def(self, '$isdst', $Time_isdst$13 = function $$isdst() {
      var self = this;
      var jan = new Date(self.getFullYear(), 0, 1), jul = new Date(self.getFullYear(), 6, 1);
      return self.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }, $Time_isdst$13.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$dst? */0;
    Opal.def(self, '$dup', $Time_dup$14 = function $$dup() {
      var self = this, copy = nil;
      copy = new Date(self.getTime());
      copy.$copy_instance_variables(self);
      copy.$initialize_dup(self);
      return copy;
    }, $Time_dup$14.$$arity = 0);
    Opal.def(self, '$eql?', $Time_eql$ques$15 = function(other) {
      var $a, self = this;
      return ($truthy($a = other['$is_a?']($$($nesting, 'Time'))) ? self['$<=>'](other)['$zero?']() : $a);
    }, $Time_eql$ques$15.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$friday? */0;
    Opal.def(self, '$hash', $Time_hash$17 = function $$hash() {
      var self = this;
      return 'Time:' + self.getTime();
    }, $Time_hash$17.$$arity = 0);
    Opal.def(self, '$hour', $Time_hour$18 = function $$hour() {
      var self = this;
      return self.is_utc ? self.getUTCHours() : self.getHours();
    }, $Time_hour$18.$$arity = 0);
    Opal.def(self, '$inspect', $Time_inspect$19 = function $$inspect() {
      var self = this;
      if($truthy(self['$utc?']())) {
        return self.$strftime("%Y-%m-%d %H:%M:%S UTC");
      } else {
        return self.$strftime("%Y-%m-%d %H:%M:%S %z");
      }
    }, $Time_inspect$19.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$mday */0;
    Opal.def(self, '$min', $Time_min$20 = function $$min() {
      var self = this;
      return self.is_utc ? self.getUTCMinutes() : self.getMinutes();
    }, $Time_min$20.$$arity = 0);
    Opal.def(self, '$mon', $Time_mon$21 = function $$mon() {
      var self = this;
      return (self.is_utc ? self.getUTCMonth() : self.getMonth()) + 1;
    }, $Time_mon$21.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$monday? */0;
    Opal.alias(self, "month", "mon");
    /* destroyed: TreeShaking#shake_methods/$saturday? */0;
    Opal.def(self, '$sec', $Time_sec$24 = function $$sec() {
      var self = this;
      return self.is_utc ? self.getUTCSeconds() : self.getSeconds();
    }, $Time_sec$24.$$arity = 0);
    Opal.def(self, '$succ', $Time_succ$25 = function $$succ() {
      var self = this;
      var result = new Date(self.getTime() + 1000);
      result.is_utc = self.is_utc;
      return result;
    }, $Time_succ$25.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$usec */0;
    Opal.def(self, '$zone', $Time_zone$27 = function $$zone() {
      var self = this;
      var string = self.toString(), result;
      if(string.indexOf('(') == -1) {
        result = string.match(/[A-Z]{3,4}/)[0];
      } else {
        result = string.match(/\((.+)\)(?:\s|$)/)[1];
      }
      if(result == "GMT" && /(GMT\W*\d{4})/.test(string)) {
        return RegExp.$1;
      } else {
        return result;
      }
    }, $Time_zone$27.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$getgm */0;
    /* destroyed: TreeShaking#shake_methods/$getutc */0;
    /* destroyed: TreeShaking#shake_methods/$gmtime */0;
    /* destroyed: TreeShaking#shake_methods/$utc */0;
    Opal.def(self, '$gmt?', $Time_gmt$ques$30 = function() {
      var self = this;
      return self.is_utc === true;
    }, $Time_gmt$ques$30.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$gmt_offset */0;
    Opal.def(self, '$strftime', $Time_strftime$32 = function $$strftime(format) {
      var self = this;
      return format.replace(/%([\-_#^0]*:{0,2})(\d+)?([EO]*)(.)/g, function(full, flags, width, _, conv) {
        var result = "", zero = flags.indexOf('0') !== -1, pad = flags.indexOf('-') === -1, blank = flags.indexOf('_') !== -1, upcase = flags.indexOf('^') !== -1, invert = flags.indexOf('#') !== -1, colons = (flags.match(':') || []).length;
        width = parseInt(width, 10);
        if(zero && blank) {
          if(flags.indexOf('0') < flags.indexOf('_')) {
            zero = false;
          } else {
            blank = false;
          }
        }
        switch(conv) {
          case 'Y':
            result += self.$year();
            break;
          case 'C':
            zero = !blank;
            result += Math.round(self.$year() / 100);
            break;
          case 'y':
            zero = !blank;
            result += (self.$year() % 100);
            break;
          case 'm':
            zero = !blank;
            result += self.$mon();
            break;
          case 'B':
            result += long_months[self.$mon() - 1];
            break;
          case 'b':

          case 'h':
            blank = !zero;
            result += short_months[self.$mon() - 1];
            break;
          case 'd':
            zero = !blank;
            result += self.$day();
            break;
          case 'e':
            blank = !zero;
            result += self.$day();
            break;
          case 'j':
            result += self.$yday();
            break;
          case 'H':
            zero = !blank;
            result += self.$hour();
            break;
          case 'k':
            blank = !zero;
            result += self.$hour();
            break;
          case 'I':
            zero = !blank;
            result += (self.$hour() % 12 || 12);
            break;
          case 'l':
            blank = !zero;
            result += (self.$hour() % 12 || 12);
            break;
          case 'P':
            result += (self.$hour() >= 12 ? "pm" : "am");
            break;
          case 'p':
            result += (self.$hour() >= 12 ? "PM" : "AM");
            break;
          case 'M':
            zero = !blank;
            result += self.$min();
            break;
          case 'S':
            zero = !blank;
            result += self.$sec();
            break;
          case 'L':
            zero = !blank;
            width = isNaN(width) ? 3 : width;
            result += self.getMilliseconds();
            break;
          case 'N':
            width = isNaN(width) ? 9 : width;
            result += (self.getMilliseconds().toString()).$rjust(3, "0");
            result = (result).$ljust(width, "0");
            break;
          case 'z':
            var offset = self.getTimezoneOffset(), hours = Math.floor(Math.abs(offset) / 60), minutes = Math.abs(offset) % 60;
            result += offset < 0 ? "+" : "-";
            result += hours < 10 ? "0" : "";
            result += hours;
            if(colons > 0) {
              result += ":";
            }
            result += minutes < 10 ? "0" : "";
            result += minutes;
            if(colons > 1) {
              result += ":00";
            }
            break;
          case 'Z':
            result += self.$zone();
            break;
          case 'A':
            result += days_of_week[self.$wday()];
            break;
          case 'a':
            result += short_days[self.$wday()];
            break;
          case 'u':
            result += (self.$wday() + 1);
            break;
          case 'w':
            result += self.$wday();
            break;
          case 'V':
            result += self.$cweek_cyear()['$[]'](0).$to_s().$rjust(2, "0");
            break;
          case 'G':
            result += self.$cweek_cyear()['$[]'](1);
            break;
          case 'g':
            result += self.$cweek_cyear()['$[]'](1)['$[]']($range(-2, -1, false));
            break;
          case 's':
            result += self.$to_i();
            break;
          case 'n':
            result += "\n";
            break;
          case 't':
            result += "\t";
            break;
          case '%':
            result += "%";
            break;
          case 'c':
            result += self.$strftime("%a %b %e %T %Y");
            break;
          case 'D':

          case 'x':
            result += self.$strftime("%m/%d/%y");
            break;
          case 'F':
            result += self.$strftime("%Y-%m-%d");
            break;
          case 'v':
            result += self.$strftime("%e-%^b-%4Y");
            break;
          case 'r':
            result += self.$strftime("%I:%M:%S %p");
            break;
          case 'R':
            result += self.$strftime("%H:%M");
            break;
          case 'T':

          case 'X':
            result += self.$strftime("%H:%M:%S");
            break;
          default:
            return full;
        }
        if(upcase) {
          result = result.toUpperCase();
        }
        if(invert) {
          result = result.replace(/[A-Z]/, function(c) {
            c.toLowerCase();
          }).replace(/[a-z]/, function(c) {
            c.toUpperCase();
          });
        }
        if(pad && (zero || blank)) {
          result = (result).$rjust(isNaN(width) ? 2 : width, blank ? " " : "0");
        }
        return result;
      });
    }, $Time_strftime$32.$$arity = 1);
    /* destroyed: TreeShaking#shake_methods/$sunday? */0;
    /* destroyed: TreeShaking#shake_methods/$thursday? */0;
    Opal.def(self, '$to_a', $Time_to_a$35 = function $$to_a() {
      var self = this;
      return [self.$sec(), self.$min(), self.$hour(), self.$day(), self.$month(), self.$year(), self.$wday(), self.$yday(), self.$isdst(), self.$zone()];
    }, $Time_to_a$35.$$arity = 0);
    Opal.def(self, '$to_f', $Time_to_f$36 = function $$to_f() {
      var self = this;
      return self.getTime() / 1000;
    }, $Time_to_f$36.$$arity = 0);
    Opal.def(self, '$to_i', $Time_to_i$37 = function $$to_i() {
      var self = this;
      return parseInt(self.getTime() / 1000, 10);
    }, $Time_to_i$37.$$arity = 0);
    Opal.alias(self, "to_s", "inspect");
    /* destroyed: TreeShaking#shake_methods/$tuesday? */0;
    /* destroyed: TreeShaking#shake_methods/$tv_sec */0;
    /* destroyed: TreeShaking#shake_methods/$tv_usec */0;
    Opal.alias(self, "utc?", "gmt?");
    /* destroyed: TreeShaking#shake_methods/$gmtoff */0;
    /* destroyed: TreeShaking#shake_methods/$utc_offset */0;
    Opal.def(self, '$wday', $Time_wday$39 = function $$wday() {
      var self = this;
      return self.is_utc ? self.getUTCDay() : self.getDay();
    }, $Time_wday$39.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$wednesday? */0;
    Opal.def(self, '$year', $Time_year$41 = function $$year() {
      var self = this;
      return self.is_utc ? self.getUTCFullYear() : self.getFullYear();
    }, $Time_year$41.$$arity = 0);
    return (Opal.def(self, '$cweek_cyear', $Time_cweek_cyear$42 = function $$cweek_cyear() {
      var $a, self = this, jan01 = nil, jan01_wday = nil, first_monday = nil, year = nil, offset = nil, week = nil, dec31 = nil, dec31_wday = nil;
      jan01 = $$($nesting, 'Time').$new(self.$year(), 1, 1);
      jan01_wday = jan01.$wday();
      first_monday = 0;
      year = self.$year();
      if($truthy(($truthy($a = $rb_le(jan01_wday, 4)) ? jan01_wday['$!='](0) : $a))) {
        offset = $rb_minus(jan01_wday, 1);
      } else {
        offset = $rb_minus($rb_minus(jan01_wday, 7), 1);
        if(offset['$=='](-8)) {
          offset = -1;
        }
        ;
      }
      ;
      week = $rb_divide($rb_plus(self.$yday(), offset), 7.0).$ceil();
      if($truthy($rb_le(week, 0))) {
        return $$($nesting, 'Time').$new($rb_minus(self.$year(), 1), 12, 31).$cweek_cyear();
      } else if(week['$=='](53)) {
        dec31 = $$($nesting, 'Time').$new(self.$year(), 12, 31);
        dec31_wday = dec31.$wday();
        if($truthy(($truthy($a = $rb_le(dec31_wday, 3)) ? dec31_wday['$!='](0) : $a))) {
          week = 1;
          year = $rb_plus(year, 1);
        }
        ;
      }
      ;
      return [week, year];
    }, $Time_cweek_cyear$42.$$arity = 0), nil) && 'cweek_cyear';
  })($nesting[0], Date, $nesting);
};
Opal.modules["corelib/struct"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/enumerable");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Struct');
    var $nesting = [self].concat($parent_nesting), $Struct_new$1, $Struct_define_struct_attribute$6, $Struct_members$9, $Struct_inherited$10, $Struct_initialize$12, $Struct_members$15, $Struct_hash$16, $Struct_$$$17, $Struct_$$$eq$18, $Struct_$eq_eq$19, $Struct_eql$ques$20, $Struct_each$21, $Struct_each_pair$24, $Struct_length$27, $Struct_to_a$28, $Struct_inspect$30, $Struct_to_h$32, $Struct_values_at$34, $Struct_dig$36;
    self.$include($$($nesting, 'Enumerable'));
    Opal.defs(self, '$new', $Struct_new$1 = function(const_name, $a, $b) {
      var $iter = $Struct_new$1.$$p, block = $iter || nil, $post_args, $kwargs, args, keyword_init, $$2, $$3, self = this, klass = nil;
      if($iter) $Struct_new$1.$$p = null;
      if($iter) $Struct_new$1.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      $kwargs = Opal.extract_kwargs($post_args);
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      args = $post_args;
      ;
      keyword_init = $kwargs.$$smap["keyword_init"];
      if(keyword_init == null) {
        keyword_init = false;
      }
      ;
      if($truthy(const_name)) {
        try {
          const_name = $$($nesting, 'Opal')['$const_name!'](const_name);
        } catch($err) {
          if(Opal.rescue($err, [$$($nesting, 'TypeError'), $$($nesting, 'NameError')])) {
            try {
              args.$unshift(const_name);
              const_name = nil;
            } finally {
              Opal.pop_exception();
            }
          } else {
            throw $err;
          }
        }
        ;
      }
      ;
      $send(args, 'map', [], ($$2 = function(arg) {
        var self = $$2.$$s || this;
        if(arg == null) {
          arg = nil;
        }
        ;
        return $$($nesting, 'Opal')['$coerce_to!'](arg, $$($nesting, 'String'), "to_str");
      }, $$2.$$s = self, $$2.$$arity = 1, $$2));
      klass = $send($$($nesting, 'Class'), 'new', [self], ($$3 = function() {
        var self = $$3.$$s || this, $$4;
        $send(args, 'each', [], ($$4 = function(arg) {
          var self = $$4.$$s || this;
          if(arg == null) {
            arg = nil;
          }
          ;
          return self.$define_struct_attribute(arg);
        }, $$4.$$s = self, $$4.$$arity = 1, $$4));
        return (function(self, $parent_nesting) {
          var $nesting = [self].concat($parent_nesting), $new$5;
          Opal.def(self, '$new', $new$5 = function($a) {
            var $post_args, args, self = this, instance = nil;
            $post_args = Opal.slice.call(arguments, 0, arguments.length);
            args = $post_args;
            ;
            instance = self.$allocate();
            instance.$$data = { };
            $send(instance, 'initialize', Opal.to_a(args));
            return instance;
          }, $new$5.$$arity = -1);
          return self.$alias_method("[]", "new");
        })(Opal.get_singleton_class(self), $nesting);
      }, $$3.$$s = self, $$3.$$arity = 0, $$3));
      if($truthy(block)) {
        $send(klass, 'module_eval', [], block.$to_proc());
      }
      ;
      klass.$$keyword_init = keyword_init;
      if($truthy(const_name)) {
        $$($nesting, 'Struct').$const_set(const_name, klass);
      }
      ;
      return klass;
    }, $Struct_new$1.$$arity = -2);
    Opal.defs(self, '$define_struct_attribute', $Struct_define_struct_attribute$6 = function $$define_struct_attribute(name) {
      var $$7, $$8, self = this;
      if(self['$==']($$($nesting, 'Struct'))) {
        self.$raise($$($nesting, 'ArgumentError'), "you cannot define attributes to the Struct class");
      }
      ;
      self.$members()['$<<'](name);
      $send(self, 'define_method', [name], ($$7 = function() {
        var self = $$7.$$s || this;
        return self.$$data[name];
      }, $$7.$$s = self, $$7.$$arity = 0, $$7));
      return $send(self, 'define_method', ["" + (name) + "="], ($$8 = function(value) {
        var self = $$8.$$s || this;
        if(value == null) {
          value = nil;
        }
        ;
        return self.$$data[name] = value;
        ;
      }, $$8.$$s = self, $$8.$$arity = 1, $$8));
    }, $Struct_define_struct_attribute$6.$$arity = 1);
    Opal.defs(self, '$members', $Struct_members$9 = function $$members() {
      var $a, self = this;
      if(self.members == null) self.members = nil;
      if(self['$==']($$($nesting, 'Struct'))) {
        self.$raise($$($nesting, 'ArgumentError'), "the Struct class has no members");
      }
      ;
      return (self.members = ($truthy($a = self.members) ? $a : []));
    }, $Struct_members$9.$$arity = 0);
    Opal.defs(self, '$inherited', $Struct_inherited$10 = function $$inherited(klass) {
      var $$11, self = this, members = nil;
      if(self.members == null) self.members = nil;
      members = self.members;
      return $send(klass, 'instance_eval', [], ($$11 = function() {
        var self = $$11.$$s || this;
        return (self.members = members);
      }, $$11.$$s = self, $$11.$$arity = 0, $$11));
    }, $Struct_inherited$10.$$arity = 1);
    Opal.def(self, '$initialize', $Struct_initialize$12 = function $$initialize($a) {
      var $post_args, args, $b, $$13, $$14, self = this, kwargs = nil, extra = nil;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if($truthy(self.$class().$$keyword_init)) {
        kwargs = ($truthy($b = args.$last()) ? $b : $hash2([], { }));
        if($truthy(($truthy($b = $rb_gt(args.$length(), 1)) ? $b : (args.length === 1 && !kwargs.$$is_hash)))) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "wrong number of arguments (given " + (args.$length()) + ", expected 0)");
        }
        ;
        extra = $rb_minus(kwargs.$keys(), self.$class().$members());
        if($truthy(extra['$any?']())) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "unknown keywords: " + (extra.$join(", ")));
        }
        ;
        return $send(self.$class().$members(), 'each', [], ($$13 = function(name) {
          var self = $$13.$$s || this, $writer = nil;
          if(name == null) {
            name = nil;
          }
          ;
          $writer = [name, kwargs['$[]'](name)];
          $send(self, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }, $$13.$$s = self, $$13.$$arity = 1, $$13));
      } else {
        if($truthy($rb_gt(args.$length(), self.$class().$members().$length()))) {
          self.$raise($$($nesting, 'ArgumentError'), "struct size differs");
        }
        ;
        return $send(self.$class().$members(), 'each_with_index', [], ($$14 = function(name, index) {
          var self = $$14.$$s || this, $writer = nil;
          if(name == null) {
            name = nil;
          }
          ;
          if(index == null) {
            index = nil;
          }
          ;
          $writer = [name, args['$[]'](index)];
          $send(self, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }, $$14.$$s = self, $$14.$$arity = 2, $$14));
      }
      ;
    }, $Struct_initialize$12.$$arity = -1);
    Opal.def(self, '$members', $Struct_members$15 = function $$members() {
      var self = this;
      return self.$class().$members();
    }, $Struct_members$15.$$arity = 0);
    Opal.def(self, '$hash', $Struct_hash$16 = function $$hash() {
      var self = this;
      return $$($nesting, 'Hash').$new(self.$$data).$hash();
    }, $Struct_hash$16.$$arity = 0);
    Opal.def(self, '$[]', $Struct_$$$17 = function(name) {
      var self = this;
      if($truthy($$($nesting, 'Integer')['$==='](name))) {
        if($truthy($rb_lt(name, self.$class().$members().$size()['$-@']()))) {
          self.$raise($$($nesting, 'IndexError'), "" + "offset " + (name) + " too small for struct(size:" + (self.$class().$members().$size()) + ")");
        }
        ;
        if($truthy($rb_ge(name, self.$class().$members().$size()))) {
          self.$raise($$($nesting, 'IndexError'), "" + "offset " + (name) + " too large for struct(size:" + (self.$class().$members().$size()) + ")");
        }
        ;
        name = self.$class().$members()['$[]'](name);
      } else if($truthy($$($nesting, 'String')['$==='](name))) {
        if(!self.$$data.hasOwnProperty(name)) {
          self.$raise($$($nesting, 'NameError').$new("" + "no member '" + (name) + "' in struct", name));
        }
      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "no implicit conversion of " + (name.$class()) + " into Integer");
      }
      ;
      name = $$($nesting, 'Opal')['$coerce_to!'](name, $$($nesting, 'String'), "to_str");
      return self.$$data[name];
      ;
    }, $Struct_$$$17.$$arity = 1);
    Opal.def(self, '$[]=', $Struct_$$$eq$18 = function(name, value) {
      var self = this;
      if($truthy($$($nesting, 'Integer')['$==='](name))) {
        if($truthy($rb_lt(name, self.$class().$members().$size()['$-@']()))) {
          self.$raise($$($nesting, 'IndexError'), "" + "offset " + (name) + " too small for struct(size:" + (self.$class().$members().$size()) + ")");
        }
        ;
        if($truthy($rb_ge(name, self.$class().$members().$size()))) {
          self.$raise($$($nesting, 'IndexError'), "" + "offset " + (name) + " too large for struct(size:" + (self.$class().$members().$size()) + ")");
        }
        ;
        name = self.$class().$members()['$[]'](name);
      } else if($truthy($$($nesting, 'String')['$==='](name))) {
        if($truthy(self.$class().$members()['$include?'](name.$to_sym()))) {

        } else {
          self.$raise($$($nesting, 'NameError').$new("" + "no member '" + (name) + "' in struct", name));
        }
      } else {
        self.$raise($$($nesting, 'TypeError'), "" + "no implicit conversion of " + (name.$class()) + " into Integer");
      }
      ;
      name = $$($nesting, 'Opal')['$coerce_to!'](name, $$($nesting, 'String'), "to_str");
      return self.$$data[name] = value;
      ;
    }, $Struct_$$$eq$18.$$arity = 2);
    Opal.def(self, '$==', $Struct_$eq_eq$19 = function(other) {
      var self = this;
      if($truthy(other['$instance_of?'](self.$class()))) {

      } else {
        return false;
      }
      ;
      var recursed1 = { }, recursed2 = { };
            function _eqeq(struct, other) {
        var key, a, b;
        recursed1[(struct).$__id__()] = true;
        recursed2[(other).$__id__()] = true;
        for(key in struct.$$data) {
          a = struct.$$data[key];
          b = other.$$data[key];
          if($$($nesting, 'Struct')['$==='](a)) {
            if(!recursed1.hasOwnProperty((a).$__id__()) || !recursed2.hasOwnProperty((b).$__id__())) {
              if(!_eqeq(a, b)) {
                return false;
              }
            }
          } else {
            if(!(a)['$=='](b)) {
              return false;
            }
          }
        }
        return true;
      }
      return _eqeq(self, other);
      ;
    }, $Struct_$eq_eq$19.$$arity = 1);
    Opal.def(self, '$eql?', $Struct_eql$ques$20 = function(other) {
      var self = this;
      if($truthy(other['$instance_of?'](self.$class()))) {

      } else {
        return false;
      }
      ;
      var recursed1 = { }, recursed2 = { };
            function _eqeq(struct, other) {
        var key, a, b;
        recursed1[(struct).$__id__()] = true;
        recursed2[(other).$__id__()] = true;
        for(key in struct.$$data) {
          a = struct.$$data[key];
          b = other.$$data[key];
          if($$($nesting, 'Struct')['$==='](a)) {
            if(!recursed1.hasOwnProperty((a).$__id__()) || !recursed2.hasOwnProperty((b).$__id__())) {
              if(!_eqeq(a, b)) {
                return false;
              }
            }
          } else {
            if(!(a)['$eql?'](b)) {
              return false;
            }
          }
        }
        return true;
      }
      return _eqeq(self, other);
      ;
    }, $Struct_eql$ques$20.$$arity = 1);
    Opal.def(self, '$each', $Struct_each$21 = function $$each() {
      var $$22, $$23, $iter = $Struct_each$21.$$p, $yield = $iter || nil, self = this;
      if($iter) $Struct_each$21.$$p = null;
      if(($yield !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each"], ($$22 = function() {
          var self = $$22.$$s || this;
          return self.$size();
        }, $$22.$$s = self, $$22.$$arity = 0, $$22));
      }
      ;
      $send(self.$class().$members(), 'each', [], ($$23 = function(name) {
        var self = $$23.$$s || this;
        if(name == null) {
          name = nil;
        }
        ;
        return Opal.yield1($yield, self['$[]'](name));
        ;
      }, $$23.$$s = self, $$23.$$arity = 1, $$23));
      return self;
    }, $Struct_each$21.$$arity = 0);
    Opal.def(self, '$each_pair', $Struct_each_pair$24 = function $$each_pair() {
      var $$25, $$26, $iter = $Struct_each_pair$24.$$p, $yield = $iter || nil, self = this;
      if($iter) $Struct_each_pair$24.$$p = null;
      if(($yield !== nil)) {

      } else {
        return $send(self, 'enum_for', ["each_pair"], ($$25 = function() {
          var self = $$25.$$s || this;
          return self.$size();
        }, $$25.$$s = self, $$25.$$arity = 0, $$25));
      }
      ;
      $send(self.$class().$members(), 'each', [], ($$26 = function(name) {
        var self = $$26.$$s || this;
        if(name == null) {
          name = nil;
        }
        ;
        return Opal.yield1($yield, [name, self['$[]'](name)]);
        ;
      }, $$26.$$s = self, $$26.$$arity = 1, $$26));
      return self;
    }, $Struct_each_pair$24.$$arity = 0);
    Opal.def(self, '$length', $Struct_length$27 = function $$length() {
      var self = this;
      return self.$class().$members().$length();
    }, $Struct_length$27.$$arity = 0);
    Opal.alias(self, "size", "length");
    Opal.def(self, '$to_a', $Struct_to_a$28 = function $$to_a() {
      var $$29, self = this;
      return $send(self.$class().$members(), 'map', [], ($$29 = function(name) {
        var self = $$29.$$s || this;
        if(name == null) {
          name = nil;
        }
        ;
        return self['$[]'](name);
      }, $$29.$$s = self, $$29.$$arity = 1, $$29));
    }, $Struct_to_a$28.$$arity = 0);
    Opal.alias(self, "values", "to_a");
    Opal.def(self, '$inspect', $Struct_inspect$30 = function $$inspect() {
      var $a, $$31, self = this, result = nil;
      result = "#<struct ";
      if($truthy(($truthy($a = $$($nesting, 'Struct')['$==='](self)) ? self.$class().$name() : $a))) {
        result = $rb_plus(result, "" + (self.$class()) + " ");
      }
      ;
      result = $rb_plus(result, $send(self.$each_pair(), 'map', [], ($$31 = function(name, value) {
        var self = $$31.$$s || this;
        if(name == null) {
          name = nil;
        }
        ;
        if(value == null) {
          value = nil;
        }
        ;
        return "" + (name) + "=" + (value.$inspect());
      }, $$31.$$s = self, $$31.$$arity = 2, $$31)).$join(", "));
      result = $rb_plus(result, ">");
      return result;
    }, $Struct_inspect$30.$$arity = 0);
    Opal.alias(self, "to_s", "inspect");
    Opal.def(self, '$to_h', $Struct_to_h$32 = function $$to_h() {
      var $$33, self = this;
      return $send(self.$class().$members(), 'each_with_object', [$hash2([], { })], ($$33 = function(name, h) {
        var self = $$33.$$s || this, $writer = nil;
        if(name == null) {
          name = nil;
        }
        ;
        if(h == null) {
          h = nil;
        }
        ;
        $writer = [name, self['$[]'](name)];
        $send(h, '[]=', Opal.to_a($writer));
        return $writer[$rb_minus($writer["length"], 1)];
      }, $$33.$$s = self, $$33.$$arity = 2, $$33));
    }, $Struct_to_h$32.$$arity = 0);
    /* destroyed: TreeShaking#shake_methods/$values_at */0;
    return (Opal.def(self, '$dig', $Struct_dig$36 = function $$dig(key, $a) {
      var $post_args, keys, self = this, item = nil;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      keys = $post_args;
      ;
      item = (function() {
        if($truthy(key.$$is_string && self.$$data.hasOwnProperty(key))) {
          return self.$$data[key] || nil;
        } else {
          return nil;
        }
        ;
        return nil;
      })();
      if(item === nil || keys.length === 0) {
        return item;
      }
      ;
      if($truthy(item['$respond_to?']("dig"))) {

      } else {
        self.$raise($$($nesting, 'TypeError'), "" + (item.$class()) + " does not have #dig method");
      }
      ;
      return $send(item, 'dig', Opal.to_a(keys));
    }, $Struct_dig$36.$$arity = -2), nil) && 'dig';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/io"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $module = Opal.module, $send = Opal.send, $gvars = Opal.gvars, $truthy = Opal.truthy, $writer = nil;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'IO');
    var $nesting = [self].concat($parent_nesting), $IO_tty$ques$1, $IO_closed$ques$2, $IO_write$3, $IO_flush$4;
    self.$$prototype.tty = self.$$prototype.closed = nil;
    Opal.const_set($nesting[0], 'SEEK_SET', 0);
    Opal.const_set($nesting[0], 'SEEK_CUR', 1);
    Opal.const_set($nesting[0], 'SEEK_END', 2);
    /* destroyed: TreeShaking#shake_methods/$tty? */0;
    /* destroyed: TreeShaking#shake_methods/$closed? */0;
    self.$attr_accessor("write_proc");
    Opal.def(self, '$write', $IO_write$3 = function $$write(string) {
      var self = this;
      self.write_proc(string);
      return string.$size();
    }, $IO_write$3.$$arity = 1);
    self.$attr_accessor("sync", "tty");
    /* destroyed: TreeShaking#shake_methods/$flush */0;
    (function($base, $parent_nesting) {
      var self = $module($base, 'Writable');
      var $nesting = [self].concat($parent_nesting), $Writable_$lt$lt$5, $Writable_print$6, $Writable_puts$8;
      Opal.def(self, '$<<', $Writable_$lt$lt$5 = function(string) {
        var self = this;
        self.$write(string);
        return self;
      }, $Writable_$lt$lt$5.$$arity = 1);
      Opal.def(self, '$print', $Writable_print$6 = function $$print($a) {
        var $post_args, args, $$7, self = this;
        if($gvars[","] == null) $gvars[","] = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        self.$write($send(args, 'map', [], ($$7 = function(arg) {
          var self = $$7.$$s || this;
          if(arg == null) {
            arg = nil;
          }
          ;
          return self.$String(arg);
        }, $$7.$$s = self, $$7.$$arity = 1, $$7)).$join($gvars[","]));
        return nil;
      }, $Writable_print$6.$$arity = -1);
      Opal.def(self, '$puts', $Writable_puts$8 = function $$puts($a) {
        var $post_args, args, $$9, self = this, newline = nil;
        if($gvars["/"] == null) $gvars["/"] = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        newline = $gvars["/"];
        if($truthy(args['$empty?']())) {
          self.$write($gvars["/"]);
        } else {
          self.$write($send(args, 'map', [], ($$9 = function(arg) {
            var self = $$9.$$s || this;
            if(arg == null) {
              arg = nil;
            }
            ;
            return self.$String(arg).$chomp();
          }, $$9.$$s = self, $$9.$$arity = 1, $$9)).$concat([nil]).$join(newline));
        }
        ;
        return nil;
      }, $Writable_puts$8.$$arity = -1);
    })($nesting[0], $nesting);
    return (function($base, $parent_nesting) {
      var self = $module($base, 'Readable');
      var $nesting = [self].concat($parent_nesting), $Readable_readbyte$10, $Readable_readchar$11, $Readable_readline$12, $Readable_readpartial$13;
      /* destroyed: TreeShaking#shake_methods/$readbyte */0;
      /* destroyed: TreeShaking#shake_methods/$readchar */0;
      /* destroyed: TreeShaking#shake_methods/$readline */0;
      /* destroyed: TreeShaking#shake_methods/$readpartial */0;
    })($nesting[0], $nesting);
  })($nesting[0], null, $nesting);
  Opal.const_set($nesting[0], 'STDERR', ($gvars.stderr = $$($nesting, 'IO').$new()));
  Opal.const_set($nesting[0], 'STDIN', ($gvars.stdin = $$($nesting, 'IO').$new()));
  Opal.const_set($nesting[0], 'STDOUT', ($gvars.stdout = $$($nesting, 'IO').$new()));
  var console = Opal.global.console;
  $writer = [typeof (process) === 'object' && typeof (process.stdout) === 'object' ? function(s) {
    process.stdout.write(s);
  } : function(s) {
    console.log(s);
  }];
  $send($$($nesting, 'STDOUT'), 'write_proc=', Opal.to_a($writer));
  $writer[$rb_minus($writer["length"], 1)];
  ;
  $writer = [typeof (process) === 'object' && typeof (process.stderr) === 'object' ? function(s) {
    process.stderr.write(s);
  } : function(s) {
    console.warn(s);
  }];
  $send($$($nesting, 'STDERR'), 'write_proc=', Opal.to_a($writer));
  $writer[$rb_minus($writer["length"], 1)];
  ;
  $$($nesting, 'STDOUT').$extend($$$($$($nesting, 'IO'), 'Writable'));
  return $$($nesting, 'STDERR').$extend($$$($$($nesting, 'IO'), 'Writable'));
};
Opal.modules["corelib/main"] = function(Opal) {
  var $to_s$1, $include$2, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  Opal.defs(self, '$to_s', $to_s$1 = function $$to_s() {
    var self = this;
    return "main";
  }, $to_s$1.$$arity = 0);
  return (Opal.defs(self, '$include', $include$2 = function $$include(mod) {
    var self = this;
    return $$($nesting, 'Object').$include(mod);
  }, $include$2.$$arity = 1), nil) && 'include';
};
Opal.modules["corelib/dir"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Dir');
    var $nesting = [self].concat($parent_nesting);
    return (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $chdir$1, $pwd$2, $home$3;
      /* destroyed: TreeShaking#shake_methods/$chdir */0;
      /* destroyed: TreeShaking#shake_methods/$pwd */0;
      /* destroyed: TreeShaking#shake_methods/$getwd */0;
      return (/* destroyed: TreeShaking#shake_methods/$home */0, nil) && 'home';
    })(Opal.get_singleton_class(self), $nesting);
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/file"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $range = Opal.range, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'File');
    var $nesting = [self].concat($parent_nesting), windows_root_rx = nil;
    Opal.const_set($nesting[0], 'Separator', Opal.const_set($nesting[0], 'SEPARATOR', "/"));
    Opal.const_set($nesting[0], 'ALT_SEPARATOR', nil);
    Opal.const_set($nesting[0], 'PATH_SEPARATOR', ":");
    Opal.const_set($nesting[0], 'FNM_SYSCASE', 0);
    windows_root_rx = /^[a-zA-Z]:(?:\\|\/)/;
    return (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $absolute_path$1, $expand_path$2, $dirname$3, $basename$4, $extname$5, $exist$ques$6, $directory$ques$7, $join$9, $split$12;
      /* destroyed: TreeShaking#shake_methods/$absolute_path */0;
      /* destroyed: TreeShaking#shake_methods/$expand_path */0;
      /* destroyed: TreeShaking#shake_methods/$realpath */0;
            function $coerce_to_path(path) {
        if($truthy((path)['$respond_to?']("to_path"))) {
          path = path.$to_path();
        }
        path = $$($nesting, 'Opal')['$coerce_to!'](path, $$($nesting, 'String'), "to_str");
        return path;
      }
            function $sep_chars() {
        if($$($nesting, 'ALT_SEPARATOR') === nil) {
          return Opal.escape_regexp($$($nesting, 'SEPARATOR'));
        } else {
          return Opal.escape_regexp($rb_plus($$($nesting, 'SEPARATOR'), $$($nesting, 'ALT_SEPARATOR')));
        }
      }
      ;
      /* destroyed: TreeShaking#shake_methods/$dirname */0;
      Opal.def(self, '$basename', $basename$4 = function $$basename(name, suffix) {
        var self = this, sep_chars = nil;
        if(suffix == null) {
          suffix = nil;
        }
        ;
        sep_chars = $sep_chars();
        name = $coerce_to_path(name);
        if(name.length == 0) {
          return name;
        }
        if(suffix !== nil) {
          suffix = $$($nesting, 'Opal')['$coerce_to!'](suffix, $$($nesting, 'String'), "to_str");
        } else {
          suffix = null;
        }
        name = name.replace(new RegExp("" + "(.)[" + (sep_chars) + "]*$"), '$1');
        name = name.replace(new RegExp("" + "^(?:.*[" + (sep_chars) + "])?([^" + (sep_chars) + "]+)$"), '$1');
        if(suffix === ".*") {
          name = name.replace(/\.[^\.]+$/, '');
        } else if(suffix !== null) {
          suffix = Opal.escape_regexp(suffix);
          name = name.replace(new RegExp("" + (suffix) + "$"), '');
        }
        return name;
        ;
      }, $basename$4.$$arity = -2);
      Opal.def(self, '$extname', $extname$5 = function $$extname(path) {
        var $a, self = this, filename = nil, last_dot_idx = nil;
        path = $coerce_to_path(path);
        filename = self.$basename(path);
        if($truthy(filename['$empty?']())) {
          return "";
        }
        ;
        last_dot_idx = filename['$[]']($range(1, -1, false)).$rindex(".");
        if($truthy(($truthy($a = last_dot_idx['$nil?']()) ? $a : $rb_plus(last_dot_idx, 1)['$==']($rb_minus(filename.$length(), 1))))) {
          return "";
        } else {
          return filename['$[]'](Opal.Range.$new($rb_plus(last_dot_idx, 1), -1, false));
        }
        ;
      }, $extname$5.$$arity = 1);
      /* destroyed: TreeShaking#shake_methods/$exist? */0;
      /* destroyed: TreeShaking#shake_methods/$exists? */0;
      /* destroyed: TreeShaking#shake_methods/$directory? */0;
      Opal.def(self, '$join', $join$9 = function $$join($a) {
        var $post_args, paths, $$10, $$11, self = this, result = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        paths = $post_args;
        ;
        if($truthy(paths['$empty?']())) {
          return "";
        }
        ;
        result = "";
        paths = $send(paths.$flatten().$each_with_index(), 'map', [], ($$10 = function(item, index) {
          var self = $$10.$$s || this, $b;
          if(item == null) {
            item = nil;
          }
          ;
          if(index == null) {
            index = nil;
          }
          ;
          if($truthy((($b = index['$=='](0)) ? item['$empty?']() : index['$=='](0)))) {
            return $$($nesting, 'SEPARATOR');
          } else if($truthy((($b = paths.$length()['$==']($rb_plus(index, 1))) ? item['$empty?']() : paths.$length()['$==']($rb_plus(index, 1))))) {
            return $$($nesting, 'SEPARATOR');
          } else {
            return item;
          }
          ;
        }, $$10.$$s = self, $$10.$$arity = 2, $$10));
        paths = $send(paths, 'reject', [], "empty?".$to_proc());
        $send(paths, 'each_with_index', [], ($$11 = function(item, index) {
          var self = $$11.$$s || this, $b, next_item = nil;
          if(item == null) {
            item = nil;
          }
          ;
          if(index == null) {
            index = nil;
          }
          ;
          next_item = paths['$[]']($rb_plus(index, 1));
          if($truthy(next_item['$nil?']())) {
            return (result = "" + (result) + (item));
          } else {
            if($truthy(($truthy($b = item['$end_with?']($$($nesting, 'SEPARATOR'))) ? next_item['$start_with?']($$($nesting, 'SEPARATOR')) : $b))) {
              item = item.$sub(new RegExp("" + ($$($nesting, 'SEPARATOR')) + "+$"), "");
            }
            ;
            return (result = (function() {
              if($truthy(($truthy($b = item['$end_with?']($$($nesting, 'SEPARATOR'))) ? $b : next_item['$start_with?']($$($nesting, 'SEPARATOR'))))) {
                return "" + (result) + (item);
              } else {
                return "" + (result) + (item) + ($$($nesting, 'SEPARATOR'));
              }
              ;
              return nil;
            })());
          }
          ;
        }, $$11.$$s = self, $$11.$$arity = 2, $$11));
        return result;
      }, $join$9.$$arity = -1);
      return (Opal.def(self, '$split', $split$12 = function $$split(path) {
        var self = this;
        return path.$split($$($nesting, 'SEPARATOR'));
      }, $split$12.$$arity = 1), nil) && 'split';
    })(Opal.get_singleton_class(self), $nesting);
  })($nesting[0], $$($nesting, 'IO'), $nesting);
};
Opal.modules["corelib/process"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Process');
    var $nesting = [self].concat($parent_nesting), $Process___register_clock__$1, $Process_pid$2, $Process_times$3, $Process_clock_gettime$4, monotonic = nil;
    self.__clocks__ = [];
    Opal.defs(self, '$__register_clock__', $Process___register_clock__$1 = function $$__register_clock__(name, func) {
      var self = this;
      if(self.__clocks__ == null) self.__clocks__ = nil;
      self.$const_set(name, self.__clocks__.$size());
      return self.__clocks__['$<<'](func);
    }, $Process___register_clock__$1.$$arity = 2);
    self.$__register_clock__("CLOCK_REALTIME", function() {
      return Date.now();
    });
    monotonic = false;
    if(Opal.global.performance) {
      monotonic = function() {
        return performance.now();
      };
    } else if(Opal.global.process && process.hrtime) {
      var hrtime_base = process.hrtime();
      monotonic = function() {
        var hrtime = process.hrtime(hrtime_base);
        var us = (hrtime[1] / 1000) | 0;
        return ((hrtime[0] * 1000) + (us / 1000));
      };
    }
    ;
    if($truthy(monotonic)) {
      self.$__register_clock__("CLOCK_MONOTONIC", monotonic);
    }
    ;
    /* destroyed: TreeShaking#shake_methods/$pid */0;
    Opal.defs(self, '$times', $Process_times$3 = function $$times() {
      var self = this, t = nil;
      t = $$($nesting, 'Time').$now().$to_f();
      return $$$($$($nesting, 'Benchmark'), 'Tms').$new(t, t, t, t, t);
    }, $Process_times$3.$$arity = 0);
    return (/* destroyed: TreeShaking#shake_methods/$clock_gettime */0, nil) && 'clock_gettime';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Signal');
    var $nesting = [self].concat($parent_nesting), $Signal_trap$5;
    return (/* destroyed: TreeShaking#shake_methods/$trap */0, nil) && 'trap';
  })($nesting[0], null, $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'GC');
    var $nesting = [self].concat($parent_nesting), $GC_start$6;
    return (/* destroyed: TreeShaking#shake_methods/$start */0, nil) && 'start';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/random"] = function(Opal) {
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Random');
    var $nesting = [self].concat($parent_nesting), $Random_initialize$1, $Random_reseed$2, $Random_new_seed$3, $Random_rand$4, $Random_srand$5, $Random_urandom$6, $Random_$eq_eq$8, $Random_bytes$9, $Random_rand$11, $Random_generator$eq$12;
    self.$attr_reader("seed", "state");
    Opal.def(self, '$initialize', $Random_initialize$1 = function $$initialize(seed) {
      var self = this;
      if(seed == null) {
        seed = $$($nesting, 'Random').$new_seed();
      }
      ;
      seed = $$($nesting, 'Opal')['$coerce_to!'](seed, $$($nesting, 'Integer'), "to_int");
      self.state = seed;
      return self.$reseed(seed);
    }, $Random_initialize$1.$$arity = -1);
    Opal.def(self, '$reseed', $Random_reseed$2 = function $$reseed(seed) {
      var self = this;
      self.seed = seed;
      return self.$rng = Opal.$$rand.reseed(seed);
      ;
    }, $Random_reseed$2.$$arity = 1);
    Opal.defs(self, '$new_seed', $Random_new_seed$3 = function $$new_seed() {
      var self = this;
      return Opal.$$rand.new_seed();
    }, $Random_new_seed$3.$$arity = 0);
    Opal.defs(self, '$rand', $Random_rand$4 = function $$rand(limit) {
      var self = this;
      ;
      return $$($nesting, 'DEFAULT').$rand(limit);
    }, $Random_rand$4.$$arity = -1);
    Opal.defs(self, '$srand', $Random_srand$5 = function $$srand(n) {
      var self = this, previous_seed = nil;
      if(n == null) {
        n = $$($nesting, 'Random').$new_seed();
      }
      ;
      n = $$($nesting, 'Opal')['$coerce_to!'](n, $$($nesting, 'Integer'), "to_int");
      previous_seed = $$($nesting, 'DEFAULT').$seed();
      $$($nesting, 'DEFAULT').$reseed(n);
      return previous_seed;
    }, $Random_srand$5.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$urandom */0;
    Opal.def(self, '$==', $Random_$eq_eq$8 = function(other) {
      var $a, self = this;
      if($truthy($$($nesting, 'Random')['$==='](other))) {

      } else {
        return false;
      }
      ;
      return (($a = self.$seed()['$=='](other.$seed())) ? self.$state()['$=='](other.$state()) : self.$seed()['$=='](other.$seed()));
    }, $Random_$eq_eq$8.$$arity = 1);
    Opal.def(self, '$bytes', $Random_bytes$9 = function $$bytes(length) {
      var $$10, self = this;
      length = $$($nesting, 'Opal')['$coerce_to!'](length, $$($nesting, 'Integer'), "to_int");
      return $send($$($nesting, 'Array'), 'new', [length], ($$10 = function() {
        var self = $$10.$$s || this;
        return self.$rand(255).$chr();
      }, $$10.$$s = self, $$10.$$arity = 0, $$10)).$join().$encode("ASCII-8BIT");
    }, $Random_bytes$9.$$arity = 1);
    Opal.def(self, '$rand', $Random_rand$11 = function $$rand(limit) {
      var self = this;
      ;
            function randomFloat() {
        self.state++;
        return Opal.$$rand.rand(self.$rng);
      }
            function randomInt() {
        return Math.floor(randomFloat() * limit);
      }
            function randomRange() {
        var min = limit.begin, max = limit.end;
        if(min === nil || max === nil) {
          return nil;
        }
        var length = max - min;
        if(length < 0) {
          return nil;
        }
        if(length === 0) {
          return min;
        }
        if(max % 1 === 0 && min % 1 === 0 && !limit.excl) {
          length++;
        }
        return self.$rand(length) + min;
      }
      if(limit == null) {
        return randomFloat();
      } else if(limit.$$is_range) {
        return randomRange();
      } else if(limit.$$is_number) {
        if(limit <= 0) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "invalid argument - " + (limit));
        }
        if(limit % 1 === 0) {
          return randomInt();
        } else {
          return randomFloat() * limit;
        }
      } else {
        limit = $$($nesting, 'Opal')['$coerce_to!'](limit, $$($nesting, 'Integer'), "to_int");
        if(limit <= 0) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "invalid argument - " + (limit));
        }
        return randomInt();
      }
      ;
    }, $Random_rand$11.$$arity = -1);
    return (Opal.defs(self, '$generator=', $Random_generator$eq$12 = function(generator) {
      var self = this;
      Opal.$$rand = generator;
      if($truthy(self['$const_defined?']("DEFAULT"))) {
        return $$($nesting, 'DEFAULT').$reseed();
      } else {
        return self.$const_set("DEFAULT", self.$new(self.$new_seed()));
      }
      ;
    }, $Random_generator$eq$12.$$arity = 1), nil) && 'generator=';
  })($nesting[0], null, $nesting);
};
var MersenneTwister = (function() {
  var N = 624;
  var M = 397;
  var MATRIX_A = 2567483615;
  var UMASK = 2147483648;
  var LMASK = 2147483647;
  var MIXBITS = function(u, v) {
    return (((u) & UMASK) | ((v) & LMASK));
  };
  var TWIST = function(u, v) {
    return (MIXBITS((u), (v)) >>> 1) ^ ((v & 1) ? MATRIX_A : 0);
  };
    function init(s) {
    var mt = {
      left: 0,
      next: N,
      state: new Array(N)
};
    init_genrand(mt, s);
    return mt;
  }
    function init_genrand(mt, s) {
    var j, i;
    mt.state[0] = s >>> 0;
    for(j = 1; j < N; j++) {
      mt.state[j] = (1812433253 * ((mt.state[j - 1] ^ (mt.state[j - 1] >> 30) >>> 0)) + j);
      mt.state[j] &= 4294967295;
    }
    mt.left = 1;
    mt.next = N;
  }
    function next_state(mt) {
    var p = 0, _p = mt.state;
    var j;
    mt.left = N;
    mt.next = 0;
    for(j = N - M + 1; --j; p++) _p[p] = _p[p + (M)] ^ TWIST(_p[p + (0)], _p[p + (1)]);
    for(j = M; --j; p++) _p[p] = _p[p + (M - N)] ^ TWIST(_p[p + (0)], _p[p + (1)]);
    _p[p] = _p[p + (M - N)] ^ TWIST(_p[p + (0)], _p[0]);
  }
    function genrand_int32(mt) {
    var y;
    if(--mt.left <= 0) next_state(mt);
    y = mt.state[mt.next++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 2636928640;
    y ^= (y << 15) & 4022730752;
    y ^= (y >>> 18);
    return y >>> 0;
  }
    function int_pair_to_real_exclusive(a, b) {
    a >>>= 5;
    b >>>= 6;
    return (a * 67108864.0 + b) * (1.0 / 9.007199254740992e+15);
  }
    function genrand_real(mt) {
    var a = genrand_int32(mt), b = genrand_int32(mt);
    return int_pair_to_real_exclusive(a, b);
  }
  return {
    genrand_real: genrand_real,
    init: init
};
})();
Opal.loaded(["corelib/random/MersenneTwister.js"]);
Opal.modules["corelib/random/mersenne_twister"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/random/MersenneTwister");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Random');
    var $nesting = [self].concat($parent_nesting), $writer = nil;
    var MAX_INT = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
    Opal.const_set($nesting[0], 'MERSENNE_TWISTER_GENERATOR', {
      new_seed: function() {
        return Math.round(Math.random() * MAX_INT);
      },
      reseed: function(seed) {
        return MersenneTwister.init(seed);
      },
      rand: function(mt) {
        return MersenneTwister.genrand_real(mt);
      }
});
    $writer = [$$($nesting, 'MERSENNE_TWISTER_GENERATOR')];
    $send(self, 'generator=', Opal.to_a($writer));
    return $writer[$rb_minus($writer["length"], 1)];
    ;
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/unsupported"] = function(Opal) {
  var $public$35, $private$36, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  var warnings = { };
    function handle_unsupported_feature(message) {
    switch(Opal.config.unsupported_features_severity) {
      case 'error':
        $$($nesting, 'Kernel').$raise($$($nesting, 'NotImplementedError'), message);
        break;
      case 'warning':
        warn(message);
        break;
      default:

    }
  }
    function warn(string) {
    if(warnings[string]) {
      return;
    }
    warnings[string] = true;
    self.$warn(string);
  }
  ;
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_$lt$lt$1, $String_capitalize$excl$2, $String_chomp$excl$3, $String_chop$excl$4, $String_downcase$excl$5, $String_gsub$excl$6, $String_lstrip$excl$7, $String_next$excl$8, $String_reverse$excl$9, $String_slice$excl$10, $String_squeeze$excl$11, $String_strip$excl$12, $String_sub$excl$13, $String_succ$excl$14, $String_swapcase$excl$15, $String_tr$excl$16, $String_tr_s$excl$17, $String_upcase$excl$18, $String_prepend$19, $String_$$$eq$20, $String_clear$21, $String_encode$excl$22, $String_unicode_normalize$excl$23;
    var ERROR = "String#%s not supported. Mutable String methods are not supported in Opal.";
    Opal.def(self, '$<<', $String_$lt$lt$1 = function($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), (ERROR)['$%']("<<"));
    }, $String_$lt$lt$1.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$capitalize! */0;
    Opal.def(self, '$chomp!', $String_chomp$excl$3 = function($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), (ERROR)['$%']("chomp!"));
    }, $String_chomp$excl$3.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$chop! */0;
    /* destroyed: TreeShaking#shake_methods/$downcase! */0;
    /* destroyed: TreeShaking#shake_methods/$gsub! */0;
    /* destroyed: TreeShaking#shake_methods/$lstrip! */0;
    /* destroyed: TreeShaking#shake_methods/$next! */0;
    /* destroyed: TreeShaking#shake_methods/$reverse! */0;
    Opal.def(self, '$slice!', $String_slice$excl$10 = function($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), (ERROR)['$%']("slice!"));
    }, $String_slice$excl$10.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$squeeze! */0;
    /* destroyed: TreeShaking#shake_methods/$strip! */0;
    /* destroyed: TreeShaking#shake_methods/$sub! */0;
    /* destroyed: TreeShaking#shake_methods/$succ! */0;
    /* destroyed: TreeShaking#shake_methods/$swapcase! */0;
    /* destroyed: TreeShaking#shake_methods/$tr! */0;
    /* destroyed: TreeShaking#shake_methods/$tr_s! */0;
    /* destroyed: TreeShaking#shake_methods/$upcase! */0;
    /* destroyed: TreeShaking#shake_methods/$prepend */0;
    Opal.def(self, '$[]=', $String_$$$eq$20 = function($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), (ERROR)['$%']("[]="));
    }, $String_$$$eq$20.$$arity = -1);
    Opal.def(self, '$clear', $String_clear$21 = function $$clear($a) {
      var $post_args, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      ;
      return self.$raise($$($nesting, 'NotImplementedError'), (ERROR)['$%']("clear"));
    }, $String_clear$21.$$arity = -1);
    /* destroyed: TreeShaking#shake_methods/$encode! */0;
    return (/* destroyed: TreeShaking#shake_methods/$unicode_normalize! */0, nil) && 'unicode_normalize!';
  })($nesting[0], null, $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_freeze$24, $Kernel_frozen$ques$25;
    var ERROR = "Object freezing is not supported by Opal";
    /* destroyed: TreeShaking#shake_methods/$freeze */0;
    /* destroyed: TreeShaking#shake_methods/$frozen? */0;
  })($nesting[0], $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_taint$26, $Kernel_untaint$27, $Kernel_tainted$ques$28;
    var ERROR = "Object tainting is not supported by Opal";
    /* destroyed: TreeShaking#shake_methods/$taint */0;
    /* destroyed: TreeShaking#shake_methods/$untaint */0;
    /* destroyed: TreeShaking#shake_methods/$tainted? */0;
  })($nesting[0], $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Module');
    var $nesting = [self].concat($parent_nesting), $Module_public$29, $Module_private_class_method$30, $Module_private_method_defined$ques$31, $Module_private_constant$32;
    Opal.def(self, '$public', $Module_public$29 = function($a) {
      var $post_args, methods, self = this;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      methods = $post_args;
      ;
      if(methods.length === 0) {
        self.$$module_function = false;
      }
      return nil;
      ;
    }, $Module_public$29.$$arity = -1);
    Opal.alias(self, "private", "public");
    Opal.alias(self, "protected", "public");
    /* destroyed: TreeShaking#shake_methods/$nesting */0;
    /* destroyed: TreeShaking#shake_methods/$private_class_method */0;
    /* destroyed: TreeShaking#shake_methods/$public_class_method */0;
    /* destroyed: TreeShaking#shake_methods/$private_method_defined? */0;
    /* destroyed: TreeShaking#shake_methods/$private_constant */0;
    /* destroyed: TreeShaking#shake_methods/$protected_method_defined? */0;
    /* destroyed: TreeShaking#shake_methods/$public_instance_methods */0;
    /* destroyed: TreeShaking#shake_methods/$public_instance_method */0;
    return /* destroyed: TreeShaking#shake_methods/$public_method_defined? */0;
  })($nesting[0], null, $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_private_methods$33;
    /* destroyed: TreeShaking#shake_methods/$private_methods */0;
    /* destroyed: TreeShaking#shake_methods/$private_instance_methods */0;
  })($nesting[0], $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_eval$34;
    /* destroyed: TreeShaking#shake_methods/$eval */0;
  })($nesting[0], $nesting);
  Opal.defs(self, '$public', $public$35 = function($a) {
    var $post_args, self = this;
    $post_args = Opal.slice.call(arguments, 0, arguments.length);
    ;
    return nil;
  }, $public$35.$$arity = -1);
  return (Opal.defs(self, '$private', $private$36 = function($a) {
    var $post_args, self = this;
    $post_args = Opal.slice.call(arguments, 0, arguments.length);
    ;
    return nil;
  }, $private$36.$$arity = -1), nil) && 'private';
};
Opal.modules["opal"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  self.$require("opal/base");
  self.$require("opal/mini");
  self.$require("corelib/kernel/format");
  self.$require("corelib/string/encoding");
  self.$require("corelib/math");
  self.$require("corelib/complex");
  self.$require("corelib/rational");
  self.$require("corelib/time");
  self.$require("corelib/struct");
  self.$require("corelib/io");
  self.$require("corelib/main");
  self.$require("corelib/dir");
  self.$require("corelib/file");
  self.$require("corelib/process");
  self.$require("corelib/random");
  self.$require("corelib/random/mersenne_twister.js");
  return self.$require("corelib/unsupported");
};
Opal.modules["interscript/opal/maps"] = function() {
  Opal.global.InterscriptMaps = {
    "un-ukr-Cyrl-Latn-1998": null,
    "acadsin-zho-Hani-Latn-2002": null,
    "bgnpcgn-uzb-Cyrl-Latn-2000": null,
    "sasm-mon-Mong-Latn-phonetic-1978": null,
    "alalc-ara-Arab-Latn-1997": null,
    "icao-ukr-Cyrl-Latn-9303": null,
    "bgnpcgn-ukr-Cyrl-Latn-2019": null,
    "var-mar-Deva-Latn-hunterian-1872": null,
    "bgnpcgn-prs-Arab-Latn-2007": null,
    "odni-aze-Cyrl-Latn-2015": null,
    "mns-mon-Cyrl-Latn-5217-2012": null,
    "alalc-mar-Deva-Latn-1997": null,
    "bgnpcgn-ell-Grek-Latn-1996": null,
    "alalc-tam-Taml-Latn-2011": null,
    "dos-nep-Deva-Latn-1997": null,
    "royin-tha-Thai-Latn-1939-generic": null,
    "bgnpcgn-bel-Cyrl-Latn-1979": null,
    "din-hin-Deva-Latn-33904-2018": null,
    "iso-pan-Guru-Latn-15919-2001": null,
    "alalc-ukr-Cyrl-Latn-2011": null,
    "iso-mal-Mlym-Latn-15919-2001": null,
    "odni-fas-Arab-Latn-2015": null,
    "iso-jpn-Hrkt-Latn-3602-1989": null,
    "din-mar-Deva-Latn-33904-2018": null,
    "bgnpcgn-che-Cyrl-Latn-2008": null,
    "kp-kor-Hang-Latn-2002": null,
    "un-ukr-Cyrl-Latn-2012": null,
    "var-hin-Deva-Latn-hunterian-1872": null,
    "elot-ell-Grek-Latn-743-1982-ts": null,
    "iso-tam-Taml-Latn-15919-2001": null,
    "odni-kor-Hang-Latn-2015": null,
    "icao-heb-Hebr-Latn-9303": null,
    "iso-pli-Beng-Latn-15919-2001": null,
    "var-zho-Hani-Latn-wd-1979": null,
    "elot-ell-Grek-Latn-743-1982-tl": null,
    "iso-tel-Telu-Latn-15919-2001": null,
    "bgnpcgn-kat-Geor-Latn-1981": null,
    "odni-per-Arab-Latn-2015": null,
    "un-mar-Deva-Latn-2016": null,
    "bis-knd-Knda-Latn-13194-1991": null,
    "bgn-kor-Kore-Latn-1943": null,
    "var-kor-Kore-Latn-mr-1939": null,
    "alalc-ukr-Cyrl-Latn-1997": null,
    "un-ben-Beng-Latn-2016": null,
    "var-san-Deva-Latn-iast-1912": null,
    "alalc-mal-Mlym-Latn-2012": null,
    "iso-prs-Arab-Latn-233-3-1999": null,
    "bgna-bul-Cyrl-Latn-2009": null,
    "bis-ori-Orya-Latn-13194-1991": null,
    "un-ell-Grek-Latn-1987-tl": null,
    "alalc-rus-Cyrl-Latn-1997": null,
    "royin-tha-Thai-Latn-1999-chained": null,
    "bis-asm-Beng-Latn-13194-1991": null,
    "mofa-jpn-Hrkt-Latn-1989": null,
    "mext-jpn-Hrkt-Latn-1954": null,
    "elot-ell-Grek-Latn-743-2001-ts": null,
    "din-nep-Deva-Latn-33904-2018": null,
    "alalc-mkd-Cyrl-Latn-2013": null,
    "alalc-ell-Grek-Latn-1997": null,
    "un-ara-Arab-Latn-2017": null,
    "iso-ara-Arab-Latn-233-1984": null,
    "bgnpcgn-tgk-Cyrl-Latn-1994": null,
    "alalc-hin-Deva-Latn-1997": null,
    "iso-nep-Deva-Latn-15919-2001": null,
    "by-bel-Cyrl-Latn-2007": null,
    "moct-kor-Hang-Latn-2000": null,
    "bis-tel-Telu-Latn-13194-1991": null,
    "bgnpcgn-mkd-Cyrl-Latn-2013": null,
    "alalc-tam-Taml-Latn-1997": null,
    "bgnpcgn-bul-Cyrl-Latn-2013": null,
    "iso-ell-Grek-Latn-843-1997-t2": null,
    "bgnpcgn-ell-Grek-Latn-1962": null,
    "iso-guj-Gujr-Latn-15919-2001": null,
    "mvd-bel-Cyrl-Latn-2008": null,
    "un-hin-Deva-Latn-2016": null,
    "bgnpcgn-per-Arab-Latn-1958": null,
    "din-grc-Grek-Latn-31634-2011-t1": null,
    "bis-pnj-Guru-Latn-13194-1991": null,
    "gost-rus-Cyrl-Latn-7.79-2000-2002": null,
    "alalc-asm-Deva-Latn-1997": null,
    "bgnpcgn-kor-Hang-Latn-rok-2011": null,
    "bis-tml-Taml-Latn-13194-1991": null,
    "alalc-amh-Ethi-Latn-2011": null,
    "icao-srp-Cyrl-Latn-9303": null,
    "bis-dev-Deva-Latn-13194-1991": null,
    "odni-ara-Arab-Latn-2015": null,
    "alalc-srp-Cyrl-Latn-2013": null,
    "alalc-amh-Ethi-Latn-1997": null,
    "icao-fas-Arab-Latn-9303": null,
    "iso-asm-Beng-Latn-15919-2001": null,
    "bgn-kor-Hang-Latn-1943": null,
    "alalc-bul-Cyrl-Latn-1997": null,
    "iso-kat-Geor-Latn-9984-1996": null,
    "bgnpcgn-fas-Arab-Latn-1956": null,
    "un-ell-Grek-Latn-1987-phonetic": null,
    "alalc-hin-Deva-Latn-2011": null,
    "un-mon-Mong-Latn-general-2013": null,
    "gki-bel-Cyrl-Latn-1992": null,
    "iso-ell-Grek-Latn-843-1997-t1": null,
    "bas-rus-Cyrl-Latn-2017-oss": null,
    "alalc-kor-Hang-Latn-1997": null,
    "royin-tha-Thai-Latn-1968": null,
    "odni-rus-Cyrl-Latn-2015": null,
    "alalc-rus-Cyrl-Latn-2012": null,
    "iso-rus-Cyrl-Latn-9-1995": null,
    "alalc-pan-Guru-Latn-2011": null,
    "alalc-pra-Deva-Latn-2012": null,
    "mvd-rus-Cyrl-Latn-2010": null,
    "un-prs-Arab-Latn-1967": null,
    "iso-pli-Sinh-Latn-15919-2001": null,
    "alalc-mar-Deva-Latn-2011": null,
    "un-amh-Ethi-Latn-2016": null,
    "bgnpcgn-amh-Ethi-Latn-1967": null,
    "odni-urd-Arab-Latn-2015": null,
    "iso-kan-Knda-Latn-15919-2001": null,
    "alalc-kat-Geok-Latn-1997": null,
    "royin-tha-Thai-Latn-1999": null,
    "odni-uig-Cyrl-Latn-2015": null,
    "odni-uzb-Cyrl-Latn-2015": null,
    "alalc-aze-Cyrl-Latn-1997": null,
    "odni-kir-Cyrl-Latn-2015": null,
    "odni-kaz-Cyrl-Latn-2015": null,
    "var-mon-Mong-Latn-vpmc": null,
    "iso-pli-Deva-Latn-15919-2001": null,
    "bgnpcgn-mon-Cyrl-Latn-1964": null,
    "mvd-rus-Cyrl-Latn-2008": null,
    "bgnpcgn-tat-Cyrl-Latn-2007": null,
    "icao-mkd-Cyrl-Latn-9303": null,
    "din-san-Deva-Latn-33904-2018": null,
    "odni-hin-Deva-Latn-2015": null,
    "bgn-jpn-Hrkt-Latn-1962": null,
    "din-tam-Taml-Latn-33903-2016": null,
    "alalc-san-Deva-Latn-2012": null,
    "bgnpcgn-bak-Cyrl-Latn-2007": null,
    "var-jpn-Hrkt-Latn-hepburn-1954": null,
    "din-kat-Geor-Latn-32707-2010": null,
    "alalc-sin-Sinh-Latn-2011": null,
    "bgnpcgn-aze-Cyrl-Latn-1993": null,
    "alalc-mal-Mlym-Latn-1997": null,
    "var-mon-Mong-Latn-1930": null,
    "var-tha-Thai-Thai-phonemic": null,
    "din-pli-Deva-Latn-33904-2018": null,
    "alalc-sin-Sinh-Latn-1997": null,
    "by-bel-Cyrl-Latn-1998": null,
    "alalc-kat-Geor-Latn-1997": null,
    "iso-tha-Thai-Latn-11940-1998": null,
    "apcbg-bul-Cyrl-Latn-1995": null,
    "ggg-kat-Geor-Latn-2002": null,
    "bgnpcgn-pus-Arab-Latn-1968": null,
    "sasm-mon-Mong-Latn-general-1978": null,
    "alalc-bel-Cyrl-Latn-1997": null,
    "din-pra-Deva-Latn-33904-2018": null,
    "bis-ben-Beng-Latn-13194-1991": null,
    "bgnpcgn-ukr-Cyrl-Latn-1965": null,
    "alalc-asm-Deva-Latn-2012": null,
    "un-ell-Grek-Latn-1987-ts": null,
    "iso-ori-Orya-Latn-15919-2001": null,
    "iso-pra-Deva-Latn-15919-2001": null,
    "alalc-pli-Deva-Latn-2012": null,
    "gost-rus-Cyrl-Latn-16876-71-1983": null,
    "bgnpcgn-mkd-Cyrl-Latn-1981": null,
    "alalc-ell-Grek-Latn-2010": null,
    "mns-mon-Latn-Cyrl-5217-2012": null,
    "bgnpcgn-zho-Hans-Latn-1979": null,
    "bgnpcgn-kor-Kore-Latn-rok-2011": null,
    "alalc-mkd-Cyrl-Latn-1997": null,
    "bgnpcgn-rus-Cyrl-Latn-1947": null,
    "iso-ben-Beng-Latn-15919-2001": null,
    "var-tha-Thai-Zsym-ipa": null,
    "alalc-srp-Cyrl-Latn-1997": null,
    "bas-rus-Cyrl-Latn-2017-bss": null,
    "iso-san-Deva-Latn-15919-2001": null,
    "bgnpcgn-kor-Hang-Latn-kn-1945": null,
    "alalc-per-Arab-Latn-1997": null,
    "elot-ell-Grek-Latn-743-2001-tl": null,
    "ua-ukr-Cyrl-Latn-2010": null,
    "alalc-pan-Guru-Latn-1997": null,
    "gki-bel-Cyrl-Latn-2000": null,
    "var-kor-Kore-Hang-2013": null,
    "odni-tat-Cyrl-Latn-2015": null,
    "un-nep-Deva-Latn-1972": null,
    "iso-hin-Deva-Latn-15919-2001": null,
    "un-ara-Arab-Latn-1971": null,
    "bgnpcgn-prs-Arab-Latn-yaghoubi": null,
    "un-mon-Mong-Latn-phonetic-2013": null,
    "bis-guj-Gujr-Latn-13194-1991": null,
    "bgnpcgn-arm-Armn-Latn-1981": null,
    "odni-tgk-Cyrl-Latn-2015": null,
    "ua-ukr-Cyrl-Latn-2007": null,
    "iso-mar-Deva-Latn-15919-2001": null,
    "un-bel-Cyrl-Latn-2007": null,
    "odni-ukr-Cyrl-Latn-2015": null,
    "alalc-guj-Gujr-Latn-2011": null,
    "az-aze-Cyrl-Latn-1939": null,
    "mvd-bel-Cyrl-Latn-2010": null,
    "icao-rus-Cyrl-Latn-9303": null,
    "bgnpcgn-kat-Geor-Latn-2009": null,
    "var-kor-Hang-Hang-jamo": null,
    "alalc-guj-Gujr-Latn-1997": null,
    "alalc-ben-Beng-Latn-2017": null,
    "iso-kor-Hang-Latn-1996-method2": null,
    "iso-inc-Deva-Latn-15919-2001": null,
    "lshk-yue-Hani-Latn-jyutping-1993": null,
    "odni-bul-Cyrl-Latn-2015": null,
    "sac-zho-Hans-Latn-1979": null,
    "ua-ukr-Cyrl-Latn-1996": null,
    "hk-yue-Hani-Latn-1888": null,
    "az-aze-Cyrl-Latn-1958": null,
    "un-nep-Deva-Latn-2013": null,
    "alalc-mon-Cyrl-Latn-1997": null,
    "odni-srp-Cyrl-Latn-2015": null,
    "odni-mkd-Cyrl-Latn-2015": null,
    "var-kor-Hang-Latn-mr-1939": null,
    "icao-bul-Cyrl-Latn-9303": null,
    "odni-bel-Cyrl-Latn-2015": null,
    "iso-pli-Thai-Latn-15919-2001": null,
    "bis-mlm-Mlym-Latn-13194-1991": null,
    "ses-ara-Arab-Latn-1930": null,
    "un-rus-Cyrl-Latn-1987": null,
    "bgnpcgn-uzb-Cyrl-Latn-1979": null,
    "un-ara-Arab-Latn-1972": null,
    "bgnpcgn-nep-Deva-Latn-2011": null,
    "bgnpcgn-bul-Cyrl-Latn-1952": null,
    "var-jpn-Hrkt-Latn-hepburn-1886": null,
    "icao-bel-Cyrl-Latn-9303": null,
    "bgna-bul-Cyrl-Latn-2006": null,
    "stategeocadastre-ukr-Cyrl-Latn-1993": null,
    "odni-kat-Geor-Latn-2015": null,
    "var-mon-Mong-Latn-lessing": null,
    "bgnpcgn-srp-Cyrl-Latn-2005": null,
    "var-pra-Deva-Latn-iast-1912": null,
    "iso-kor-Hang-Latn-1996-method1": null,
    "bgnpcgn-rue-Cyrl-Latn-2016": null,
    "odni-che-Cyrl-Latn-2015": null,
    "bgnpcgn-ara-Arab-Latn-1956": null,
    "bgnpcgn-jpn-Hrkt-Latn-1976": null
};
  Opal.global.InterscriptMapAliases = {
    "zho_Hani2Latn_AcadSin_2002": "acadsin-zho-Hani-Latn-2002",
    "ara_Arab2Latn_ALA_1997": "alalc-ara-Arab-Latn-1997",
    "uas_Arab2Latn_BGN_2007": "bgnpcgn-prs-Arab-Latn-2007",
    "mar_Deva2Latn_ALA_1997": "alalc-mar-Deva-Latn-1997",
    "ell_Grek2Latn_ELOT743_1996": "bgnpcgn-ell-Grek-Latn-1996",
    "tam_Taml2Latn_ALA_2011": "alalc-tam-Taml-Latn-2011",
    "bel_Cyrl2Latn_BGN_1979": "bgnpcgn-bel-Cyrl-Latn-1979",
    "kor_Hang2Latn_GKN_2002": "kp-kor-Hang-Latn-2002",
    "zho_Hani2Latn_WDG_1979": "var-zho-Hani-Latn-wd-1979",
    "kat_Geor2Latn_BGN_1981": "bgnpcgn-kat-Geor-Latn-1981",
    "ukr_Cyrl2Latn_ALA_1997": "alalc-ukr-Cyrl-Latn-1997",
    "mal_Mlym2Latn_ALA_2012": "alalc-mal-Mlym-Latn-2012",
    "rus_Cyrl2Latn_ALA_1997": "alalc-rus-Cyrl-Latn-1997",
    "ell_Grek2Latn_ALA_1997": "alalc-ell-Grek-Latn-1997",
    "tgk_Cyrl2Latn_BGN_1994": "bgnpcgn-tgk-Cyrl-Latn-1994",
    "hin_Deva2Latn_ALA_1997": "alalc-hin-Deva-Latn-1997",
    "kor_Hang2Latn_MOCT_2000": "moct-kor-Hang-Latn-2000",
    "tam_Taml2Latn_ALA_1997": "alalc-tam-Taml-Latn-1997",
    "bul_Cyrl2Latn_BGN_2013": "bgnpcgn-bul-Cyrl-Latn-2013",
    "ell_Grek2Latn_BGN_1962": "bgnpcgn-ell-Grek-Latn-1962",
    "asm_Deva2Latn_ALA_1997": "alalc-asm-Deva-Latn-1997",
    "amh_Ethi2Latn_ALA_1997": "alalc-amh-Ethi-Latn-1997",
    "kor_Hang2Latn_MR_1939": "bgn-kor-Hang-Latn-1943",
    "bul_Cyrl2Latn_ALA_1997": "alalc-bul-Cyrl-Latn-1997",
    "fas_Arab2Latn_BGN_1958": "bgnpcgn-fas-Arab-Latn-1956",
    "kor_Hang2Latn_ALA_1997": "alalc-kor-Hang-Latn-1997",
    "tha_Thai2Latn_RIT_1968": "royin-tha-Thai-Latn-1968",
    "pan_Deva2Latn_ALA_2011": "alalc-pan-Guru-Latn-2011",
    "amh_Ethi2Latn_BGN_1967": "bgnpcgn-amh-Ethi-Latn-1967",
    "tir_Thai2Latn_RIT_2000": "royin-tha-Thai-Latn-1999",
    "aze_Cyrl2Latn_ALA_1997": "alalc-aze-Cyrl-Latn-1997",
    "mon_Cyrl2Latn_BGN_1964": "bgnpcgn-mon-Cyrl-Latn-1964",
    "tat_Cyrl2Latn_BGN_2005": "bgnpcgn-tat-Cyrl-Latn-2007",
    "bak_Cyrl2Latn_BGN_2007": "bgnpcgn-bak-Cyrl-Latn-2007",
    "sin_Sinh2Latn_ALA_2011": "alalc-sin-Sinh-Latn-2011",
    "mal_Mlym2Latn_ALA_1997": "alalc-mal-Mlym-Latn-1997",
    "sin_Sinh2Latn_ALA_1997": "alalc-sin-Sinh-Latn-1997",
    "bel_Cyrl2Latn_GBO_1998": "by-bel-Cyrl-Latn-1998",
    "kat_Geor2Latn_ALA_1997": "alalc-kat-Geor-Latn-1997",
    "kat_Geor2Latn_GGG_2002": "ggg-kat-Geor-Latn-2002",
    "bel_Cyrl2Latn_ALA_1997": "alalc-bel-Cyrl-Latn-1997",
    "ukr_Cyrl2Latn_BGN_1965": "bgnpcgn-ukr-Cyrl-Latn-1965",
    "rus_Cyrl2Latn_GOST_1983": "gost-rus-Cyrl-Latn-16876-71-1983",
    "mkd_Cyrl2Latn_BGN_1981": "bgnpcgn-mkd-Cyrl-Latn-1981",
    "rus_Cyrl2Latn_BGN_1947": "bgnpcgn-rus-Cyrl-Latn-1947",
    "srp_Cyrl2Latn_ALA_1997": "alalc-srp-Cyrl-Latn-1997",
    "pan_Deva2Latn_ALA_1997": "alalc-pan-Guru-Latn-1997",
    "guj_Gujr2Latn_ALA_2011": "alalc-guj-Gujr-Latn-2011",
    "guj_Gujr2Latn_ALA_1997": "alalc-guj-Gujr-Latn-1997",
    "zho_Hani2Latn_GCH_1979": "sac-zho-Hans-Latn-1979",
    "ukr_Cyrl2Latn_GUP_1996": "ua-ukr-Cyrl-Latn-1996",
    "mon_Cyrl2Latn_ALA_1997": "alalc-mon-Cyrl-Latn-1997",
    "ara_Arab2Latn_SES_1930": "ses-ara-Arab-Latn-1930",
    "bul_Cyrl2Latn_BGN_1952": "bgnpcgn-bul-Cyrl-Latn-1952",
    "srp_Cyrl2Latn_BGN_2005": "bgnpcgn-srp-Cyrl-Latn-2005",
    "rue_Cyrl2Latn_BGN_2016": "bgnpcgn-rue-Cyrl-Latn-2016",
    "ara_Arab2Latn_BGN_1956": "bgnpcgn-ara-Arab-Latn-1956"
};
};
Opal.modules["native"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $send = Opal.send, $hash2 = Opal.hash2, $range = Opal.range, $klass = Opal.klass, $gvars = Opal.gvars;
  /* destroyed: CollapseStubs */0;
  (function($base, $parent_nesting) {
    var self = $module($base, 'Native');
    var $nesting = [self].concat($parent_nesting), $Native_is_a$ques$1, $Native_try_convert$2, $Native_convert$3, $Native_call$4, $Native_proc$5, $Native_included$22;
    Opal.defs(self, '$is_a?', $Native_is_a$ques$1 = function(object, klass) {
      var self = this;
      try {
        return object instanceof self.$try_convert(klass);
      } catch(e) {
        return false;
      }
    }, $Native_is_a$ques$1.$$arity = 2);
    Opal.defs(self, '$try_convert', $Native_try_convert$2 = function $$try_convert(value, default$) {
      var self = this;
      if(default$ == null) {
        default$ = nil;
      }
      ;
      if(self['$native?'](value)) {
        return value;
      } else if(value['$respond_to?']("to_n")) {
        return value.$to_n();
      } else {
        return default$;
      }
      ;
    }, $Native_try_convert$2.$$arity = -2);
    Opal.defs(self, '$convert', $Native_convert$3 = function $$convert(value) {
      var self = this;
      if(self['$native?'](value)) {
        return value;
      } else if(value['$respond_to?']("to_n")) {
        return value.$to_n();
      } else {
        self.$raise($$($nesting, 'ArgumentError'), "" + (value.$inspect()) + " isn't native");
      }
    }, $Native_convert$3.$$arity = 1);
    Opal.defs(self, '$call', $Native_call$4 = function $$call(obj, key, $a) {
      var $iter = $Native_call$4.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Native_call$4.$$p = null;
      if($iter) $Native_call$4.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 2, arguments.length);
      args = $post_args;
      ;
      var prop = obj[key];
      if(prop instanceof Function) {
        var converted = new Array(args.length);
        for(var i = 0, l = args.length; i < l; i++) {
          var item = args[i], conv = self.$try_convert(item);
          converted[i] = conv === nil ? item : conv;
        }
        if(block !== nil) {
          converted.push(block);
        }
        return self.$Native(prop.apply(obj, converted));
      } else {
        return self.$Native(prop);
      }
      ;
    }, $Native_call$4.$$arity = -3);
    Opal.defs(self, '$proc', $Native_proc$5 = function $$proc() {
      var $iter = $Native_proc$5.$$p, block = $iter || nil, $$6, self = this;
      if($iter) $Native_proc$5.$$p = null;
      if($iter) $Native_proc$5.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        self.$raise($$($nesting, 'LocalJumpError'), "no block given");
      }
      ;
      return $send($$$('::', 'Kernel'), 'proc', [], ($$6 = function($a) {
        var self = $$6.$$s || this, $post_args, args, $$7, instance = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        args = $post_args;
        ;
        $send(args, 'map!', [], ($$7 = function(arg) {
          var self = $$7.$$s || this;
          if(arg == null) {
            arg = nil;
          }
          ;
          return self.$Native(arg);
        }, $$7.$$s = self, $$7.$$arity = 1, $$7));
        instance = self.$Native(this);
        if(this === Opal.global) {
          return block.apply(self, args);
        }
        var self_ = block.$$s;
        block.$$s = null;
        try {
          return block.apply(instance, args);
        } finally {
          block.$$s = self_;
        }
        ;
      }, $$6.$$s = self, $$6.$$arity = -1, $$6));
    }, $Native_proc$5.$$arity = 0);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Helpers');
      var $nesting = [self].concat($parent_nesting), $Helpers_alias_native$8, $Helpers_native_reader$12, $Helpers_native_writer$15, $Helpers_native_accessor$18;
      /* destroyed: TreeShaking#shake_methods/$alias_native */0;
      /* destroyed: TreeShaking#shake_methods/$native_reader */0;
      /* destroyed: TreeShaking#shake_methods/$native_writer */0;
      /* destroyed: TreeShaking#shake_methods/$native_accessor */0;
    })($nesting[0], $nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Wrapper');
      var $nesting = [self].concat($parent_nesting), $Wrapper_initialize$19, $Wrapper_to_n$20, $Wrapper_included$21;
      Opal.def(self, '$initialize', $Wrapper_initialize$19 = function $$initialize(native$) {
        var self = this;
        if($truthy($$$('::', 'Kernel')['$native?'](native$))) {

        } else {
          $$$('::', 'Kernel').$raise($$($nesting, 'ArgumentError'), "" + (native$.$inspect()) + " isn't native");
        }
        ;
        return (self["native"] = native$);
      }, $Wrapper_initialize$19.$$arity = 1);
      Opal.def(self, '$to_n', $Wrapper_to_n$20 = function $$to_n() {
        var self = this;
        if(self["native"] == null) self["native"] = nil;
        return self["native"];
      }, $Wrapper_to_n$20.$$arity = 0);
      Opal.defs(self, '$included', $Wrapper_included$21 = function $$included(klass) {
        var self = this;
        return klass.$extend($$($nesting, 'Helpers'));
      }, $Wrapper_included$21.$$arity = 1);
    })($nesting[0], $nesting);
    Opal.defs(self, '$included', $Native_included$22 = function $$included(base) {
      var self = this;
      self.$warn("Including ::Native is deprecated. Please include Native::Wrapper instead.");
      return base.$include($$($nesting, 'Wrapper'));
    }, $Native_included$22.$$arity = 1);
  })($nesting[0], $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Kernel');
    var $nesting = [self].concat($parent_nesting), $Kernel_native$ques$23, $Kernel_Native$24, $Kernel_Array$27;
    Opal.def(self, '$native?', $Kernel_native$ques$23 = function(value) {
      var self = this;
      return value == null || !value.$$class;
    }, $Kernel_native$ques$23.$$arity = 1);
    Opal.def(self, '$Native', $Kernel_Native$24 = function $$Native(obj) {
      var $$25, $$26, $iter = $Kernel_Native$24.$$p, $yield = $iter || nil, self = this;
      if($iter) $Kernel_Native$24.$$p = null;
      if($truthy(obj == null)) {
        return nil;
      } else if($truthy(self['$native?'](obj))) {
        return $$$($$($nesting, 'Native'), 'Object').$new(obj);
      } else if($truthy(obj['$is_a?']($$($nesting, 'Array')))) {
        return $send(obj, 'map', [], ($$25 = function(o) {
          var self = $$25.$$s || this;
          if(o == null) {
            o = nil;
          }
          ;
          return self.$Native(o);
        }, $$25.$$s = self, $$25.$$arity = 1, $$25));
      } else if($truthy(obj['$is_a?']($$($nesting, 'Proc')))) {
        return $send(self, 'proc', [], ($$26 = function($a) {
          var self = $$26.$$s || this, $iter = $$26.$$p, block = $iter || nil, $post_args, args;
          if($iter) $$26.$$p = null;
          ;
          $post_args = Opal.slice.call(arguments, 0, arguments.length);
          args = $post_args;
          ;
          return self.$Native($send(obj, 'call', Opal.to_a(args), block.$to_proc()));
        }, $$26.$$s = self, $$26.$$arity = -1, $$26));
      } else {
        return obj;
      }
    }, $Kernel_Native$24.$$arity = 1);
    Opal.alias(self, "_Array", "Array");
    Opal.def(self, '$Array', $Kernel_Array$27 = function $$Array(object, $a) {
      var $iter = $Kernel_Array$27.$$p, block = $iter || nil, $post_args, args, self = this;
      if($iter) $Kernel_Array$27.$$p = null;
      if($iter) $Kernel_Array$27.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      if($truthy(self['$native?'](object))) {
        return $send($$$($$($nesting, 'Native'), 'Array'), 'new', [object].concat(Opal.to_a(args)), block.$to_proc()).$to_a();
      }
      ;
      return self.$_Array(object);
    }, $Kernel_Array$27.$$arity = -2);
  })($nesting[0], $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Object');
    var $nesting = [self].concat($parent_nesting), $Object_$eq_eq$28, $Object_has_key$ques$29, $Object_each$30, $Object_$$$31, $Object_$$$eq$32, $Object_merge$excl$33, $Object_respond_to$ques$34, $Object_respond_to_missing$ques$35, $Object_method_missing$36, $Object_nil$ques$37, $Object_is_a$ques$38, $Object_instance_of$ques$39, $Object_class$40, $Object_to_a$41, $Object_inspect$42;
    self.$$prototype["native"] = nil;
    self.$include($$$($$$('::', 'Native'), 'Wrapper'));
    Opal.def(self, '$==', $Object_$eq_eq$28 = function(other) {
      var self = this;
      return self["native"] === $$$('::', 'Native').$try_convert(other);
    }, $Object_$eq_eq$28.$$arity = 1);
    Opal.def(self, '$has_key?', $Object_has_key$ques$29 = function(name) {
      var self = this;
      return Opal.hasOwnProperty.call(self["native"], name);
    }, $Object_has_key$ques$29.$$arity = 1);
    Opal.alias(self, "key?", "has_key?");
    Opal.alias(self, "include?", "has_key?");
    /* destroyed: TreeShaking#shake_methods/$member? */0;
    Opal.def(self, '$each', $Object_each$30 = function $$each($a) {
      var $post_args, args, $iter = $Object_each$30.$$p, $yield = $iter || nil, self = this;
      if($iter) $Object_each$30.$$p = null;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      args = $post_args;
      ;
      if(($yield !== nil)) {
        for(var key in self["native"]) {
          Opal.yieldX($yield, [key, self["native"][key]]);
        }
        ;
        return self;
      } else {
        return $send(self, 'method_missing', ["each"].concat(Opal.to_a(args)));
      }
      ;
    }, $Object_each$30.$$arity = -1);
    Opal.def(self, '$[]', $Object_$$$31 = function(key) {
      var self = this;
      var prop = self["native"][key];
      if(prop instanceof Function) {
        return prop;
      } else {
        return $$$('::', 'Native').$call(self["native"], key);
      }
    }, $Object_$$$31.$$arity = 1);
    Opal.def(self, '$[]=', $Object_$$$eq$32 = function(key, value) {
      var self = this, native$ = nil;
      native$ = $$$('::', 'Native').$try_convert(value);
      if($truthy(native$ === nil)) {
        return self["native"][key] = value;
      } else {
        return self["native"][key] = native$;
      }
      ;
    }, $Object_$$$eq$32.$$arity = 2);
    Opal.def(self, '$merge!', $Object_merge$excl$33 = function(other) {
      var self = this;
      other = $$$('::', 'Native').$convert(other);
      for(var prop in other) {
        self["native"][prop] = other[prop];
      }
      ;
      return self;
    }, $Object_merge$excl$33.$$arity = 1);
    Opal.def(self, '$respond_to?', $Object_respond_to$ques$34 = function(name, include_all) {
      var self = this;
      if(include_all == null) {
        include_all = false;
      }
      ;
      return $$$('::', 'Kernel').$instance_method("respond_to?").$bind(self).$call(name, include_all);
    }, $Object_respond_to$ques$34.$$arity = -2);
    Opal.def(self, '$respond_to_missing?', $Object_respond_to_missing$ques$35 = function(name, include_all) {
      var self = this;
      if(include_all == null) {
        include_all = false;
      }
      ;
      return Opal.hasOwnProperty.call(self["native"], name);
    }, $Object_respond_to_missing$ques$35.$$arity = -2);
    Opal.def(self, '$method_missing', $Object_method_missing$36 = function $$method_missing(mid, $a) {
      var $iter = $Object_method_missing$36.$$p, block = $iter || nil, $post_args, args, self = this, $writer = nil;
      if($iter) $Object_method_missing$36.$$p = null;
      if($iter) $Object_method_missing$36.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      args = $post_args;
      ;
      if(mid.charAt(mid.length - 1) === '=') {
        return (($writer = [mid.$slice(0, $rb_minus(mid.$length(), 1)), args['$[]'](0)]), $send(self, '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]);
      } else {
        return $send($$$('::', 'Native'), 'call', [self["native"], mid].concat(Opal.to_a(args)), block.$to_proc());
      }
      ;
    }, $Object_method_missing$36.$$arity = -2);
    Opal.def(self, '$nil?', $Object_nil$ques$37 = function() {
      var self = this;
      return false;
    }, $Object_nil$ques$37.$$arity = 0);
    Opal.def(self, '$is_a?', $Object_is_a$ques$38 = function(klass) {
      var self = this;
      return Opal.is_a(self, klass);
    }, $Object_is_a$ques$38.$$arity = 1);
    Opal.alias(self, "kind_of?", "is_a?");
    Opal.def(self, '$instance_of?', $Object_instance_of$ques$39 = function(klass) {
      var self = this;
      return self.$$class === klass;
    }, $Object_instance_of$ques$39.$$arity = 1);
    Opal.def(self, '$class', $Object_class$40 = function() {
      var self = this;
      return self.$$class;
    }, $Object_class$40.$$arity = 0);
    Opal.def(self, '$to_a', $Object_to_a$41 = function $$to_a(options) {
      var $iter = $Object_to_a$41.$$p, block = $iter || nil, self = this;
      if($iter) $Object_to_a$41.$$p = null;
      if($iter) $Object_to_a$41.$$p = null;
      ;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      return $send($$$($$$('::', 'Native'), 'Array'), 'new', [self["native"], options], block.$to_proc()).$to_a();
    }, $Object_to_a$41.$$arity = -1);
    return (Opal.def(self, '$inspect', $Object_inspect$42 = function $$inspect() {
      var self = this;
      return "" + "#<Native:" + (String(self["native"])) + ">";
    }, $Object_inspect$42.$$arity = 0), nil) && 'inspect';
  })($$($nesting, 'Native'), $$($nesting, 'BasicObject'), $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Array');
    var $nesting = [self].concat($parent_nesting), $Array_initialize$43, $Array_each$44, $Array_$$$45, $Array_$$$eq$46, $Array_last$47, $Array_length$48, $Array_inspect$49;
    self.$$prototype.named = self.$$prototype["native"] = self.$$prototype.get = self.$$prototype.block = self.$$prototype.set = self.$$prototype.length = nil;
    self.$include($$$($$($nesting, 'Native'), 'Wrapper'));
    self.$include($$($nesting, 'Enumerable'));
    Opal.def(self, '$initialize', $Array_initialize$43 = function $$initialize(native$, options) {
      var $iter = $Array_initialize$43.$$p, block = $iter || nil, $a, self = this;
      if($iter) $Array_initialize$43.$$p = null;
      if($iter) $Array_initialize$43.$$p = null;
      ;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      $send(self, Opal.find_super_dispatcher(self, 'initialize', $Array_initialize$43, false), [native$], null);
      self.get = ($truthy($a = options['$[]']("get")) ? $a : options['$[]']("access"));
      self.named = options['$[]']("named");
      self.set = ($truthy($a = options['$[]']("set")) ? $a : options['$[]']("access"));
      self.length = ($truthy($a = options['$[]']("length")) ? $a : "length");
      self.block = block;
      if($truthy(self.$length() == null)) {
        return self.$raise($$($nesting, 'ArgumentError'), "no length found on the array-like object");
      } else {
        return nil;
      }
      ;
    }, $Array_initialize$43.$$arity = -2);
    Opal.def(self, '$each', $Array_each$44 = function $$each() {
      var $iter = $Array_each$44.$$p, block = $iter || nil, self = this;
      if($iter) $Array_each$44.$$p = null;
      if($iter) $Array_each$44.$$p = null;
      ;
      if($truthy(block)) {

      } else {
        return self.$enum_for("each");
      }
      ;
      for(var i = 0, length = self.$length(); i < length; i++) {
        Opal.yield1(block, self['$[]'](i));
      }
      ;
      return self;
    }, $Array_each$44.$$arity = 0);
    Opal.def(self, '$[]', $Array_$$$45 = function(index) {
      var self = this, result = nil, $case = nil;
      result = (function() {
        $case = index;
        if($$($nesting, 'String')['$===']($case) || $$($nesting, 'Symbol')['$===']($case)) {
          if($truthy(self.named)) {
            return self["native"][self.named](index);
          } else {
            return self["native"][index];
          }
        } else if($$($nesting, 'Integer')['$===']($case)) {
          if($truthy(self.get)) {
            return self["native"][self.get](index);
          } else {
            return self["native"][index];
          }
        } else {
          return nil;
        }
      })();
      if($truthy(result)) {
        if($truthy(self.block)) {
          return self.block.$call(result);
        } else {
          return self.$Native(result);
        }
      } else {
        return nil;
      }
      ;
    }, $Array_$$$45.$$arity = 1);
    Opal.def(self, '$[]=', $Array_$$$eq$46 = function(index, value) {
      var self = this;
      if($truthy(self.set)) {
        return self["native"][self.set](index, $$($nesting, 'Native').$convert(value));
      } else {
        return self["native"][index] = $$($nesting, 'Native').$convert(value);
      }
    }, $Array_$$$eq$46.$$arity = 2);
    Opal.def(self, '$last', $Array_last$47 = function $$last(count) {
      var $a, self = this, index = nil, result = nil;
      if(count == null) {
        count = nil;
      }
      ;
      if($truthy(count)) {
        index = $rb_minus(self.$length(), 1);
        result = [];
        while($truthy($rb_ge(index, 0))) {
          result['$<<'](self['$[]'](index));
          index = $rb_minus(index, 1);
        }
        ;
        return result;
      } else {
        return self['$[]']($rb_minus(self.$length(), 1));
      }
      ;
    }, $Array_last$47.$$arity = -1);
    Opal.def(self, '$length', $Array_length$48 = function $$length() {
      var self = this;
      return self["native"][self.length];
    }, $Array_length$48.$$arity = 0);
    Opal.alias(self, "to_ary", "to_a");
    return (Opal.def(self, '$inspect', $Array_inspect$49 = function $$inspect() {
      var self = this;
      return self.$to_a().$inspect();
    }, $Array_inspect$49.$$arity = 0), nil) && 'inspect';
  })($$($nesting, 'Native'), null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Numeric');
    var $nesting = [self].concat($parent_nesting), $Numeric_to_n$50;
    return (Opal.def(self, '$to_n', $Numeric_to_n$50 = function $$to_n() {
      var self = this;
      return self.valueOf();
    }, $Numeric_to_n$50.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Proc');
    var $nesting = [self].concat($parent_nesting), $Proc_to_n$51;
    return (Opal.def(self, '$to_n', $Proc_to_n$51 = function $$to_n() {
      var self = this;
      return self;
    }, $Proc_to_n$51.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_to_n$52;
    return (Opal.def(self, '$to_n', $String_to_n$52 = function $$to_n() {
      var self = this;
      return self.valueOf();
    }, $String_to_n$52.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Regexp');
    var $nesting = [self].concat($parent_nesting), $Regexp_to_n$53;
    return (Opal.def(self, '$to_n', $Regexp_to_n$53 = function $$to_n() {
      var self = this;
      return self.valueOf();
    }, $Regexp_to_n$53.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'MatchData');
    var $nesting = [self].concat($parent_nesting), $MatchData_to_n$54;
    self.$$prototype.matches = nil;
    return (Opal.def(self, '$to_n', $MatchData_to_n$54 = function $$to_n() {
      var self = this;
      return self.matches;
    }, $MatchData_to_n$54.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Struct');
    var $nesting = [self].concat($parent_nesting), $Struct_to_n$55;
    return (Opal.def(self, '$to_n', $Struct_to_n$55 = function $$to_n() {
      var $$56, self = this, result = nil;
      result = { };
      $send(self, 'each_pair', [], ($$56 = function(name, value) {
        var self = $$56.$$s || this;
        if(name == null) {
          name = nil;
        }
        ;
        if(value == null) {
          value = nil;
        }
        ;
        return result[name] = $$($nesting, 'Native').$try_convert(value, value);
      }, $$56.$$s = self, $$56.$$arity = 2, $$56));
      return result;
    }, $Struct_to_n$55.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Array');
    var $nesting = [self].concat($parent_nesting), $Array_to_n$57;
    return (Opal.def(self, '$to_n', $Array_to_n$57 = function $$to_n() {
      var self = this;
      var result = [];
      for(var i = 0, length = self.length; i < length; i++) {
        var obj = self[i];
        result.push($$($nesting, 'Native').$try_convert(obj, obj));
      }
      return result;
    }, $Array_to_n$57.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Boolean');
    var $nesting = [self].concat($parent_nesting), $Boolean_to_n$58;
    return (Opal.def(self, '$to_n', $Boolean_to_n$58 = function $$to_n() {
      var self = this;
      return self.valueOf();
    }, $Boolean_to_n$58.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Time');
    var $nesting = [self].concat($parent_nesting), $Time_to_n$59;
    return (Opal.def(self, '$to_n', $Time_to_n$59 = function $$to_n() {
      var self = this;
      return self;
    }, $Time_to_n$59.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NilClass');
    var $nesting = [self].concat($parent_nesting), $NilClass_to_n$60;
    return (Opal.def(self, '$to_n', $NilClass_to_n$60 = function $$to_n() {
      var self = this;
      return null;
    }, $NilClass_to_n$60.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Hash');
    var $nesting = [self].concat($parent_nesting), $Hash_initialize$61, $Hash_to_n$62;
    Opal.alias(self, "_initialize", "initialize");
    Opal.def(self, '$initialize', $Hash_initialize$61 = function $$initialize(defaults) {
      var $iter = $Hash_initialize$61.$$p, block = $iter || nil, self = this;
      if($iter) $Hash_initialize$61.$$p = null;
      if($iter) $Hash_initialize$61.$$p = null;
      ;
      ;
      if(defaults != null && (defaults.constructor === undefined || defaults.constructor === Object)) {
        var smap = self.$$smap, keys = self.$$keys, key, value;
        for(key in defaults) {
          value = defaults[key];
          if(value && (value.constructor === undefined || value.constructor === Object)) {
            smap[key] = $$($nesting, 'Hash').$new(value);
          } else if(value && value.$$is_array) {
            value = value.map(function(item) {
              if(item && (item.constructor === undefined || item.constructor === Object)) {
                return $$($nesting, 'Hash').$new(item);
              }
              return self.$Native(item);
            });
            smap[key] = value;
          } else {
            smap[key] = self.$Native(value);
          }
          keys.push(key);
        }
        return self;
      }
      return $send(self, '_initialize', [defaults], block.$to_proc());
      ;
    }, $Hash_initialize$61.$$arity = -1);
    return (Opal.def(self, '$to_n', $Hash_to_n$62 = function $$to_n() {
      var self = this;
      var result = { }, keys = self.$$keys, smap = self.$$smap, key, value;
      for(var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = smap[key];
        } else {
          key = key.key;
          value = key.value;
        }
        result[key] = $$($nesting, 'Native').$try_convert(value, value);
      }
      return result;
    }, $Hash_to_n$62.$$arity = 0), nil) && 'to_n';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Module');
    var $nesting = [self].concat($parent_nesting), $Module_native_module$63;
    return (/* destroyed: TreeShaking#shake_methods/$native_module */0, nil) && 'native_module';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Class');
    var $nesting = [self].concat($parent_nesting), $Class_native_alias$64, $Class_native_class$65;
    /* destroyed: TreeShaking#shake_methods/$native_alias */0;
    return (/* destroyed: TreeShaking#shake_methods/$native_class */0, nil) && 'native_class';
  })($nesting[0], null, $nesting);
  return ($gvars.$ = ($gvars.global = self.$Native(Opal.global)));
};
Opal.modules["webassembly/instance"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("native");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Instance');
      var $nesting = [self].concat($parent_nesting), $Instance_new$1, $Instance_exports$2, $Instance_method_missing$4, $Instance_$$$5, $Instance_to_h$6, $Instance_memory$7, $Instance_each$8;
      self.$$prototype.exports_cache = nil;
      self.$include($$($nesting, 'Enumerable'));
      Opal.defs(self, '$new', $Instance_new$1 = function(mod, imports) {
        var self = this;
        if(imports == null) {
          imports = $hash2([], { });
        }
        ;
        return new WebAssembly.Instance(mod, imports.$to_n());
      }, $Instance_new$1.$$arity = -2);
      Opal.def(self, '$exports', $Instance_exports$2 = function $$exports() {
        var $a, $$3, self = this;
        return (self.exports_cache = ($truthy($a = self.exports_cache) ? $a : $send($hash2([], { }), 'tap', [], ($$3 = function(hash) {
          var self = $$3.$$s || this, $writer = nil;
          if(hash == null) {
            hash = nil;
          }
          ;
          var hasOwnProperty = Object.prototype.hasOwnProperty.bind(self.exports);
          for(var key in self.exports) {
            if(hasOwnProperty(key)) {
              (($writer = [key, self.exports[key]]), $send(hash, '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]);
            }
          }
          ;
        }, $$3.$$s = self, $$3.$$arity = 1, $$3))));
      }, $Instance_exports$2.$$arity = 0);
      Opal.def(self, '$method_missing', $Instance_method_missing$4 = function $$method_missing(meth, $a) {
        var $post_args, args, self = this;
        $post_args = Opal.slice.call(arguments, 1, arguments.length);
        args = $post_args;
        ;
        return $send(self.$exports()['$[]'](meth), 'call', Opal.to_a(args));
      }, $Instance_method_missing$4.$$arity = -2);
      Opal.def(self, '$[]', $Instance_$$$5 = function(export$) {
        var self = this;
        return self.$exports()['$[]'](export$);
      }, $Instance_$$$5.$$arity = 1);
      Opal.def(self, '$to_h', $Instance_to_h$6 = function $$to_h() {
        var self = this;
        return self.$exports();
      }, $Instance_to_h$6.$$arity = 0);
      Opal.def(self, '$memory', $Instance_memory$7 = function $$memory() {
        var self = this;
        return self.$exports()['$[]']("memory");
      }, $Instance_memory$7.$$arity = 0);
      return (Opal.def(self, '$each', $Instance_each$8 = function $$each() {
        var $iter = $Instance_each$8.$$p, block = $iter || nil, self = this;
        if($iter) $Instance_each$8.$$p = null;
        if($iter) $Instance_each$8.$$p = null;
        ;
        return $send(self.$exports(), 'each', [], block.$to_proc());
      }, $Instance_each$8.$$arity = 0), nil) && 'each';
    })($nesting[0], WebAssembly.Instance, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["webassembly/module"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  self.$require("native");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'CantLoadSyncError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Module');
      var $nesting = [self].concat($parent_nesting), $Module_new$1;
      return (Opal.defs(self, '$new', $Module_new$1 = function(buffer) {
        var self = this;
        if($truthy(self['$native?'](buffer))) {

        } else {
          buffer = buffer.$to_n();
        }
        ;
        try {
          return new WebAssembly.Module(buffer);
        } catch(e) {
          if(e.name == "RangeError") {
            self.$raise($$$($$($nesting, 'WebAssembly'), 'CantLoadSyncError'));
          } else throw e;
        }
        ;
      }, $Module_new$1.$$arity = 1), nil) && 'new';
    })($nesting[0], WebAssembly.Module, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["webassembly/table"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Table');
      var $nesting = [self].concat($parent_nesting), $Table_new$1, $Table_to_a$2, $Table_each$3, $Table_get$4, $Table_set$5, $Table_grow$6, $Table_length$7;
      self.$include($$($nesting, 'Enumerable'));
      Opal.defs(self, '$new', $Table_new$1 = function(initial, maximum) {
        var self = this;
        if(initial == null) {
          initial = 1;
        }
        ;
        if(maximum == null) {
          maximum = 100;
        }
        ;
        return new WebAssembly.Table({
          initial: initial,
          maximum: maximum,
          element: "anyfunc"
});
      }, $Table_new$1.$$arity = -1);
      Opal.def(self, '$to_a', $Table_to_a$2 = function $$to_a() {
        var self = this;
        return self.$Array(self);
      }, $Table_to_a$2.$$arity = 0);
      Opal.def(self, '$each', $Table_each$3 = function $$each() {
        var $iter = $Table_each$3.$$p, block = $iter || nil, self = this;
        if($iter) $Table_each$3.$$p = null;
        if($iter) $Table_each$3.$$p = null;
        ;
        return $send(self.$to_a(), 'each', [], block.$to_proc());
      }, $Table_each$3.$$arity = 0);
      Opal.def(self, '$get', $Table_get$4 = function $$get(i) {
        var self = this;
        return self.get(i);
      }, $Table_get$4.$$arity = 1);
      Opal.alias(self, "[]", "get");
      Opal.def(self, '$set', $Table_set$5 = function $$set(i, val) {
        var self = this;
        return self.set(i, val);
      }, $Table_set$5.$$arity = 2);
      Opal.alias(self, "[]=", "set");
      Opal.def(self, '$grow', $Table_grow$6 = function $$grow(by) {
        var self = this;
        return self.grow(by);
      }, $Table_grow$6.$$arity = 1);
      return (Opal.def(self, '$length', $Table_length$7 = function $$length() {
        var self = this;
        return self["length"];
      }, $Table_length$7.$$arity = 0), nil) && 'length';
    })($nesting[0], WebAssembly.Table, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["buffer/array"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars, $send = Opal.send, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Buffer');
    var $nesting = [self].concat($parent_nesting);
    return (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Array');
      var $nesting = [self].concat($parent_nesting), $Array_for$1, $Array_initialize$2, $Array_bits$3, $Array_$$$4, $Array_$$$eq$5, $Array_bytesize$6, $Array_each$7, $Array_length$8, $Array_merge$excl$9;
      self.$$prototype["native"] = nil;
      self.$include($$$($$($nesting, 'Native'), 'Wrapper'));
      Opal.defs(self, '$for', $Array_for$1 = function(bits, type) {
        var self = this;
        if($gvars.$ == null) $gvars.$ = nil;
        return $gvars.$['$[]']("" + ($$($nesting, 'Buffer').$name_for(bits, type)) + "Array");
      }, $Array_for$1.$$arity = 2);
      self.$include($$($nesting, 'Enumerable'));
      self.$attr_reader("buffer", "type");
      Opal.def(self, '$initialize', $Array_initialize$2 = function $$initialize(buffer, bits, type) {
        var $iter = $Array_initialize$2.$$p, $yield = $iter || nil, self = this;
        if($iter) $Array_initialize$2.$$p = null;
        if(bits == null) {
          bits = nil;
        }
        ;
        if(type == null) {
          type = nil;
        }
        ;
        if($$($nesting, 'Native')['$=='](buffer)) {
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $Array_initialize$2, false), [buffer], null);
        } else {
          var klass = $$($nesting, 'Array').$for(bits, type);
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $Array_initialize$2, false), [new klass(buffer.$to_n())], null);
        }
        ;
        self.buffer = buffer;
        return (self.type = type);
      }, $Array_initialize$2.$$arity = -2);
      /* destroyed: TreeShaking#shake_methods/$bits */0;
      Opal.def(self, '$[]', $Array_$$$4 = function(index, offset) {
        var self = this;
        if(offset == null) {
          offset = nil;
        }
        ;
        if($truthy(offset)) {
          return self["native"].subarray(index, offset);
        } else {
          return self["native"][index];
        }
        ;
      }, $Array_$$$4.$$arity = -2);
      Opal.def(self, '$[]=', $Array_$$$eq$5 = function(index, value) {
        var self = this;
        return self["native"][index] = value;
      }, $Array_$$$eq$5.$$arity = 2);
      Opal.def(self, '$bytesize', $Array_bytesize$6 = function $$bytesize() {
        var self = this;
        return self["native"].byteLength;
      }, $Array_bytesize$6.$$arity = 0);
      Opal.def(self, '$each', $Array_each$7 = function $$each() {
        var $iter = $Array_each$7.$$p, $yield = $iter || nil, self = this;
        if($iter) $Array_each$7.$$p = null;
        if(($yield !== nil)) {

        } else {
          return self.$enum_for("each");
        }
        ;
        for(var i = 0, length = self["native"].length; i < length; i++) {
          Opal.yield1($yield, self["native"][i]);
        }
        ;
        return self;
      }, $Array_each$7.$$arity = 0);
      Opal.def(self, '$length', $Array_length$8 = function $$length() {
        var self = this;
        return self["native"].length;
      }, $Array_length$8.$$arity = 0);
      Opal.def(self, '$merge!', $Array_merge$excl$9 = function(other, offset) {
        var self = this;
        ;
        return self["native"].set(other.$to_n(), offset);
      }, $Array_merge$excl$9.$$arity = -2);
      return Opal.alias(self, "size", "length");
    })($nesting[0], null, $nesting);
  })($nesting[0], null, $nesting);
};
Opal.modules["buffer/view"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Buffer');
    var $nesting = [self].concat($parent_nesting);
    return (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'View');
      var $nesting = [self].concat($parent_nesting), $View_supported$ques$1, $View_initialize$2, $View_length$3, $View_get$4, $View_set$5, $View_get_int8$6, $View_set_int8$7, $View_get_uint8$8, $View_set_uint8$9, $View_get_int16$10, $View_set_int16$11, $View_get_uint16$12, $View_set_uint16$13, $View_get_int32$14, $View_set_int32$15, $View_get_uint32$16, $View_set_uint32$17, $View_get_float32$18, $View_set_float32$19, $View_get_float64$20, $View_set_float64$21;
      self.$$prototype["native"] = nil;
      self.$include($$$($$($nesting, 'Native'), 'Wrapper'));
      /* destroyed: TreeShaking#shake_methods/$supported? */0;
      self.$attr_reader("buffer", "offset");
      Opal.def(self, '$initialize', $View_initialize$2 = function $$initialize(buffer, offset, length) {
        var $a, $iter = $View_initialize$2.$$p, $yield = $iter || nil, self = this;
        if($iter) $View_initialize$2.$$p = null;
        if(offset == null) {
          offset = nil;
        }
        ;
        if(length == null) {
          length = nil;
        }
        ;
        if($truthy(self['$native?'](buffer))) {
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $View_initialize$2, false), [buffer], null);
        } else if($truthy(($truthy($a = offset) ? length : $a))) {
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $View_initialize$2, false), [new DataView(buffer.$to_n(), offset.$to_n(), length.$to_n())], null);
        } else if($truthy(offset)) {
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $View_initialize$2, false), [new DataView(buffer.$to_n(), offset.$to_n())], null);
        } else {
          $send(self, Opal.find_super_dispatcher(self, 'initialize', $View_initialize$2, false), [new DataView(buffer.$to_n())], null);
        }
        ;
        self.buffer = buffer;
        return (self.offset = offset);
      }, $View_initialize$2.$$arity = -2);
      Opal.def(self, '$length', $View_length$3 = function $$length() {
        var self = this;
        return self["native"].byteLength;
      }, $View_length$3.$$arity = 0);
      Opal.alias(self, "size", "length");
      Opal.def(self, '$get', $View_get$4 = function $$get(offset, bits, type, little) {
        var self = this;
        if(bits == null) {
          bits = 8;
        }
        ;
        if(type == null) {
          type = "unsigned";
        }
        ;
        if(little == null) {
          little = false;
        }
        ;
        return self["native"]["get" + $$($nesting, 'Buffer').$name_for(bits, type)](offset, little);
      }, $View_get$4.$$arity = -2);
      Opal.alias(self, "[]", "get");
      Opal.def(self, '$set', $View_set$5 = function $$set(offset, value, bits, type, little) {
        var self = this;
        if(bits == null) {
          bits = 8;
        }
        ;
        if(type == null) {
          type = "unsigned";
        }
        ;
        if(little == null) {
          little = false;
        }
        ;
        return self["native"]["set" + $$($nesting, 'Buffer').$name_for(bits, type)](offset, value, little);
      }, $View_set$5.$$arity = -3);
      Opal.alias(self, "[]=", "set");
      /* destroyed: TreeShaking#shake_methods/$get_int8 */0;
      /* destroyed: TreeShaking#shake_methods/$set_int8 */0;
      /* destroyed: TreeShaking#shake_methods/$get_uint8 */0;
      /* destroyed: TreeShaking#shake_methods/$set_uint8 */0;
      /* destroyed: TreeShaking#shake_methods/$get_int16 */0;
      /* destroyed: TreeShaking#shake_methods/$set_int16 */0;
      /* destroyed: TreeShaking#shake_methods/$get_uint16 */0;
      /* destroyed: TreeShaking#shake_methods/$set_uint16 */0;
      /* destroyed: TreeShaking#shake_methods/$get_int32 */0;
      /* destroyed: TreeShaking#shake_methods/$set_int32 */0;
      /* destroyed: TreeShaking#shake_methods/$get_uint32 */0;
      /* destroyed: TreeShaking#shake_methods/$set_uint32 */0;
      /* destroyed: TreeShaking#shake_methods/$get_float32 */0;
      /* destroyed: TreeShaking#shake_methods/$set_float32 */0;
      /* destroyed: TreeShaking#shake_methods/$get_float64 */0;
      return (/* destroyed: TreeShaking#shake_methods/$set_float64 */0, nil) && 'set_float64';
    })($nesting[0], null, $nesting);
  })($nesting[0], null, $nesting);
};
Opal.modules["buffer"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("native");
  self.$require("buffer/array");
  self.$require("buffer/view");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Buffer');
    var $nesting = [self].concat($parent_nesting), $Buffer_supported$ques$1, $Buffer_name_for$2, $Buffer_initialize$3, $Buffer_length$4, $Buffer_to_a$5, $Buffer_view$6;
    self.$$prototype["native"] = nil;
    self.$include($$$($$($nesting, 'Native'), 'Wrapper'));
    /* destroyed: TreeShaking#shake_methods/$supported? */0;
    Opal.defs(self, '$name_for', $Buffer_name_for$2 = function $$name_for(bits, type) {
      var self = this, part = nil, $case = nil;
      part = (function() {
        $case = type;
        if("unsigned"['$===']($case)) {
          return "Uint";
        } else if("signed"['$===']($case)) {
          return "Int";
        } else if("float"['$===']($case)) {
          return "Float";
        } else {
          return nil;
        }
      })();
      return "" + (part) + (bits);
    }, $Buffer_name_for$2.$$arity = 2);
    Opal.def(self, '$initialize', $Buffer_initialize$3 = function $$initialize(size, bits) {
      var $iter = $Buffer_initialize$3.$$p, $yield = $iter || nil, self = this;
      if($iter) $Buffer_initialize$3.$$p = null;
      if(bits == null) {
        bits = 8;
      }
      ;
      if($truthy(self['$native?'](size))) {
        return $send(self, Opal.find_super_dispatcher(self, 'initialize', $Buffer_initialize$3, false), [size], null);
      } else {
        return $send(self, Opal.find_super_dispatcher(self, 'initialize', $Buffer_initialize$3, false), [new ArrayBuffer(size * (bits / 8))], null);
      }
      ;
    }, $Buffer_initialize$3.$$arity = -2);
    Opal.def(self, '$length', $Buffer_length$4 = function $$length() {
      var self = this;
      return self["native"].byteLength;
    }, $Buffer_length$4.$$arity = 0);
    Opal.alias(self, "size", "length");
    Opal.def(self, '$to_a', $Buffer_to_a$5 = function $$to_a(bits, type) {
      var self = this;
      if(bits == null) {
        bits = 8;
      }
      ;
      if(type == null) {
        type = "unsigned";
      }
      ;
      return $$($nesting, 'Array').$new(self, bits, type);
    }, $Buffer_to_a$5.$$arity = -1);
    return (/* destroyed: TreeShaking#shake_methods/$view */0, nil) && 'view';
  })($nesting[0], null, $nesting);
};
Opal.modules["webassembly/memory"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;
  /* destroyed: CollapseStubs */0;
  self.$require("buffer");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Memory');
      var $nesting = [self].concat($parent_nesting), $Memory_new$1, $Memory_grow$2, $Memory_buffer$3;
      Opal.defs(self, '$new', $Memory_new$1 = function(initial, maximum, shared) {
        var self = this;
        if(initial == null) {
          initial = 1;
        }
        ;
        if(maximum == null) {
          maximum = 100;
        }
        ;
        if(shared == null) {
          shared = false;
        }
        ;
        return new WebAssembly.Memory({
          initial: initial,
          maximum: maximum,
          shared: shared
});
      }, $Memory_new$1.$$arity = -1);
      Opal.def(self, '$grow', $Memory_grow$2 = function $$grow(by) {
        var self = this;
        return self.grow(by);
      }, $Memory_grow$2.$$arity = 1);
      return (Opal.def(self, '$buffer', $Memory_buffer$3 = function $$buffer() {
        var self = this;
        return $$($nesting, 'Buffer').$new(self["buffer"]);
      }, $Memory_buffer$3.$$arity = 0), nil) && 'buffer';
    })($nesting[0], WebAssembly.Memory, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["webassembly/global"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Global');
      var $nesting = [self].concat($parent_nesting), $Global_new$1, $Global_value$2, $Global_value$eq$3;
      Opal.defs(self, '$new', $Global_new$1 = function(value, type, mutable) {
        var self = this;
        if(type == null) {
          type = "i32";
        }
        ;
        if(mutable == null) {
          mutable = true;
        }
        ;
        return new WebAssembly.Global({
          value: type,
          mutable: mutable
}, value);
      }, $Global_new$1.$$arity = -2);
      Opal.def(self, '$value', $Global_value$2 = function $$value() {
        var self = this;
        return self["value"];
      }, $Global_value$2.$$arity = 0);
      return (/* destroyed: TreeShaking#shake_methods/$value= */0, nil) && 'value=';
    })($nesting[0], WebAssembly.Global, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["webassembly"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $hash2 = Opal.hash2, $send = Opal.send, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  self.$require("native");
  self.$require("webassembly/instance");
  self.$require("webassembly/module");
  self.$require("webassembly/table");
  self.$require("webassembly/memory");
  self.$require("webassembly/global");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'WebAssembly');
    var $nesting = [self].concat($parent_nesting), $WebAssembly_libs$1, $WebAssembly_load_from_buffer$2, $WebAssembly_load_from_base64$3, $WebAssembly_wait_for$4, $WebAssembly_loaded$6, $WebAssembly_$$$9;
    self.libs = $hash2([], { });
    Opal.defs(self, '$libs', $WebAssembly_libs$1 = function $$libs() {
      var self = this;
      if(self.libs == null) self.libs = nil;
      return self.libs;
    }, $WebAssembly_libs$1.$$arity = 0);
    Opal.defs(self, '$load_from_buffer', $WebAssembly_load_from_buffer$2 = function $$load_from_buffer(buffer, name) {
      var self = this, mod = nil, $writer = nil;
      if(self.libs == null) self.libs = nil;
      try {
        mod = $$($nesting, 'Module').$new(buffer);
        $writer = [name, $$($nesting, 'Instance').$new(mod)];
        $send(self.libs, '[]=', Opal.to_a($writer));
        $writer[$rb_minus($writer["length"], 1)];
        ;
        return self.$loaded(name);
      } catch($err) {
        if(Opal.rescue($err, [$$($nesting, 'CantLoadSyncError')])) {
          try {
            WebAssembly.instantiate(buffer).then(function(d) {
              ((($writer = [name, d.instance]), $send(self.libs, '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]), self.$loaded(name));
            });
          } finally {
            Opal.pop_exception();
          }
        } else {
          throw $err;
        }
      }
    }, $WebAssembly_load_from_buffer$2.$$arity = 2);
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = new Uint8Array(256);
    for(var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }
        function base64_to_arraybuffer(base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if(base64[base64.length - 1] === "=") {
        bufferLength--;
        if(base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
      for(i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return arraybuffer;
    }
    ;
    Opal.defs(self, '$load_from_base64', $WebAssembly_load_from_base64$3 = function $$load_from_base64(base64, name) {
      var self = this;
      return self.$load_from_buffer(base64_to_arraybuffer(base64), name);
    }, $WebAssembly_load_from_base64$3.$$arity = 2);
    self.waiting_for = [];
    Opal.defs(self, '$wait_for', $WebAssembly_wait_for$4 = function $$wait_for($a) {
      var $iter = $WebAssembly_wait_for$4.$$p, block = $iter || nil, $post_args, libs, $$5, self = this, prom = nil;
      if(self.waiting_for == null) self.waiting_for = nil;
      if($iter) $WebAssembly_wait_for$4.$$p = null;
      if($iter) $WebAssembly_wait_for$4.$$p = null;
      ;
      $post_args = Opal.slice.call(arguments, 0, arguments.length);
      libs = $post_args;
      ;
      prom = nil;
      if((block !== nil)) {

      } else {
        prom = new Promise(function(ok, fail) {
          (block = ok);
        });
      }
      ;
      if($truthy($send(libs, 'all?', [], ($$5 = function(lib) {
        var self = $$5.$$s || this;
        if(self.libs == null) self.libs = nil;
        if(lib == null) {
          lib = nil;
        }
        ;
        return self.libs['$[]'](lib);
      }, $$5.$$s = self, $$5.$$arity = 1, $$5)))) {
        Opal.yieldX(block, []);
      } else {
        self.waiting_for['$<<']([libs, block]);
      }
      ;
      return prom;
    }, $WebAssembly_wait_for$4.$$arity = -1);
    Opal.defs(self, '$loaded', $WebAssembly_loaded$6 = function $$loaded(lib) {
      var $$7, self = this;
      if(self.waiting_for == null) self.waiting_for = nil;
      return $send(self.waiting_for, 'each', [], ($$7 = function(libs, block) {
        var self = $$7.$$s || this, $$8;
        if(libs == null) {
          libs = nil;
        }
        ;
        if(block == null) {
          block = nil;
        }
        ;
        if($truthy($send(libs, 'all?', [], ($$8 = function(lib) {
          var self = $$8.$$s || this;
          if(self.libs == null) self.libs = nil;
          if(lib == null) {
            lib = nil;
          }
          ;
          return self.libs['$[]'](lib);
        }, $$8.$$s = self, $$8.$$arity = 1, $$8)))) {
          return block.$call();
        } else {
          return nil;
        }
        ;
      }, $$7.$$s = self, $$7.$$arity = 2, $$7));
    }, $WebAssembly_loaded$6.$$arity = 1);
    Opal.defs(self, '$[]', $WebAssembly_$$$9 = function(name) {
      var self = this;
      return self.$libs()['$[]'](name);
    }, $WebAssembly_$$$9.$$arity = 1);
  })($nesting[0], $nesting);
};
Opal.modules["onigmo/onigmo-wasm"] = function() {
  var self = Opal.top;
  self.$require("webassembly");
};
Opal.modules["rambling/trie/configuration/properties"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $lambda = Opal.lambda, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Configuration');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Properties');
          var $nesting = [self].concat($parent_nesting), $Properties_initialize$1, $Properties_reset$2, $Properties_reset_readers$4, $Properties_reset_serializers$5;
          self.$attr_reader("readers");
          self.$attr_reader("serializers");
          self.$attr_accessor("compressor");
          self.$attr_accessor("root_builder");
          self.$attr_accessor("tmp_path");
          Opal.def(self, '$initialize', $Properties_initialize$1 = function $$initialize() {
            var self = this;
            return self.$reset();
          }, $Properties_initialize$1.$$arity = 0);
          Opal.def(self, '$reset', $Properties_reset$2 = function $$reset() {
            var $$3, self = this;
            self.$reset_readers();
            self.$reset_serializers();
            self.compressor = $$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Compressor').$new();
            self.root_builder = $lambda(($$3 = function() {
              var self = $$3.$$s || this;
              return $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Raw').$new();
            }, $$3.$$s = self, $$3.$$arity = 0, $$3));
            return (self.tmp_path = "/tmp");
          }, $Properties_reset$2.$$arity = 0);
          self.$private();
          self.$attr_writer("readers", "serializers");
          Opal.def(self, '$reset_readers', $Properties_reset_readers$4 = function $$reset_readers() {
            var self = this, plain_text_reader = nil;
            plain_text_reader = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Readers'), 'PlainText').$new();
            return (self.readers = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Configuration'), 'ProviderCollection').$new("reader", $hash2(["txt"], {
              "txt": plain_text_reader
})));
          }, $Properties_reset_readers$4.$$arity = 0);
          return (Opal.def(self, '$reset_serializers', $Properties_reset_serializers$5 = function $$reset_serializers() {
            var self = this, marshal_serializer = nil, yaml_serializer = nil;
            marshal_serializer = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Serializers'), 'Marshal').$new();
            yaml_serializer = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Serializers'), 'Yaml').$new();
            if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {

            } else {
              nil;
            }
            ;
            if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
              return (self.serializers = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Configuration'), 'ProviderCollection').$new("serializer", $hash2(["marshal", "yml", "yaml"], {
                "marshal": marshal_serializer,
                "yml": yaml_serializer,
                "yaml": yaml_serializer
})));
            } else {
              return nil;
            }
            ;
          }, $Properties_reset_serializers$5.$$arity = 0), nil) && 'reset_serializers';
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/configuration/provider_collection"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Configuration');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'ProviderCollection');
          var $nesting = [self].concat($parent_nesting), $ProviderCollection_initialize$1, $ProviderCollection_add$2, $ProviderCollection_default$eq$3, $ProviderCollection_providers$4, $ProviderCollection_resolve$5, $ProviderCollection_reset$6, $ProviderCollection_formats$8, $ProviderCollection_$$$9, $ProviderCollection_$$$eq$10, $ProviderCollection_values$11, $ProviderCollection_file_format$12, $ProviderCollection_contains$ques$13;
          self.$$prototype.providers = nil;
          self.$attr_reader("name");
          self.$attr_reader("default");
          Opal.def(self, '$initialize', $ProviderCollection_initialize$1 = function $$initialize(name, providers, default$) {
            var $a, self = this;
            if(providers == null) {
              providers = $hash2([], { });
            }
            ;
            if(default$ == null) {
              default$ = nil;
            }
            ;
            self.name = name;
            self.configured_providers = providers;
            self.configured_default = ($truthy($a = default$) ? $a : providers.$values().$first());
            return self.$reset();
          }, $ProviderCollection_initialize$1.$$arity = -2);
          Opal.def(self, '$add', $ProviderCollection_add$2 = function $$add(extension, provider) {
            var self = this, $writer = nil;
            $writer = [extension, provider];
            $send(self.$providers(), '[]=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
          }, $ProviderCollection_add$2.$$arity = 2);
          Opal.def(self, '$default=', $ProviderCollection_default$eq$3 = function(provider) {
            var self = this;
            if($truthy(self['$contains?'](provider))) {

            } else {
              self.$raise($$($nesting, 'ArgumentError'), "" + "default " + (self.$name()) + " should be part of configured " + (self.$name()) + "s");
            }
            ;
            return (self["default"] = provider);
          }, $ProviderCollection_default$eq$3.$$arity = 1);
          Opal.def(self, '$providers', $ProviderCollection_providers$4 = function $$providers() {
            var $a, self = this;
            return (self.providers = ($truthy($a = self.providers) ? $a : $hash2([], { })));
          }, $ProviderCollection_providers$4.$$arity = 0);
          Opal.def(self, '$resolve', $ProviderCollection_resolve$5 = function $$resolve(filepath) {
            var $a, self = this;
            return ($truthy($a = self.$providers()['$[]'](self.$file_format(filepath))) ? $a : self.$default());
          }, $ProviderCollection_resolve$5.$$arity = 1);
          Opal.def(self, '$reset', $ProviderCollection_reset$6 = function $$reset() {
            var $$7, self = this, $writer = nil;
            self.$providers().$clear();
            $send(self.$configured_providers(), 'each', [], ($$7 = function(k, v) {
              var self = $$7.$$s || this, $writer = nil;
              if(k == null) {
                k = nil;
              }
              ;
              if(v == null) {
                v = nil;
              }
              ;
              $writer = [k, v];
              $send(self, '[]=', Opal.to_a($writer));
              return $writer[$rb_minus($writer["length"], 1)];
            }, $$7.$$s = self, $$7.$$arity = 2, $$7));
            $writer = [self.$configured_default()];
            $send(self, 'default=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
            ;
          }, $ProviderCollection_reset$6.$$arity = 0);
          /* destroyed: TreeShaking#shake_methods/$formats */0;
          Opal.def(self, '$[]', $ProviderCollection_$$$9 = function(format) {
            var self = this;
            return self.$providers()['$[]'](format);
          }, $ProviderCollection_$$$9.$$arity = 1);
          self.$private();
          self.$attr_reader("configured_providers", "configured_default");
          Opal.def(self, '$[]=', $ProviderCollection_$$$eq$10 = function(format, instance) {
            var self = this, $writer = nil;
            $writer = [format, instance];
            $send(self.$providers(), '[]=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
          }, $ProviderCollection_$$$eq$10.$$arity = 2);
          Opal.def(self, '$values', $ProviderCollection_values$11 = function $$values() {
            var self = this;
            return self.$providers().$values();
          }, $ProviderCollection_values$11.$$arity = 0);
          Opal.def(self, '$file_format', $ProviderCollection_file_format$12 = function $$file_format(filepath) {
            var self = this, format = nil;
            format = $$($nesting, 'File').$extname(filepath);
            format['$slice!'](0);
            return format.$to_sym();
          }, $ProviderCollection_file_format$12.$$arity = 1);
          Opal.def(self, '$contains?', $ProviderCollection_contains$ques$13 = function(provider) {
            var $a, $b, self = this;
            return ($truthy($a = provider['$nil?']()) ? $a : ($truthy($b = self.$providers()['$any?']()) ? self.$provider_instances()['$include?'](provider) : $b));
          }, $ProviderCollection_contains$ques$13.$$arity = 1);
          return self.$alias_method("provider_instances", "values");
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/configuration"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    self.$require("rambling/trie/configuration/properties");
    self.$require("rambling/trie/configuration/provider_collection");
  } else {
    nil;
  }
  ;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Configuration');
        var $nesting = [self].concat($parent_nesting);
        nil;
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/comparable"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Comparable');
        var $nesting = [self].concat($parent_nesting), $Comparable_$eq_eq$1;
        Opal.def(self, '$==', $Comparable_$eq_eq$1 = function(other) {
          var $a, $b, self = this;
          return ($truthy($a = (($b = self.$letter()['$=='](other.$letter())) ? self['$terminal?']()['$=='](other['$terminal?']()) : self.$letter()['$=='](other.$letter()))) ? self.$children_tree()['$=='](other.$children_tree()) : $a);
        }, $Comparable_$eq_eq$1.$$arity = 1);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/compressible"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Compressible');
        var $nesting = [self].concat($parent_nesting), $Compressible_compressible$ques$1;
        Opal.def(self, '$compressible?', $Compressible_compressible$ques$1 = function() {
          var $a, $b, self = this;
          return ($truthy($a = ($truthy($b = self['$root?']()) ? $b : self['$terminal?']())['$!']()) ? self.$children_tree().$size()['$=='](1) : $a);
        }, $Compressible_compressible$ques$1.$$arity = 0);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/compressor"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $hash2 = Opal.hash2, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Compressor');
        var $nesting = [self].concat($parent_nesting), $Compressor_compress$1, $Compressor_compress_child_and_merge$2, $Compressor_merge$3, $Compressor_compress_children_and_copy$4, $Compressor_compress_children$5, $Compressor_new_compressed_node$7;
        Opal.def(self, '$compress', $Compressor_compress$1 = function $$compress(node) {
          var self = this;
          if($truthy(node['$compressible?']())) {
            return self.$compress_child_and_merge(node);
          } else {
            return self.$compress_children_and_copy(node);
          }
        }, $Compressor_compress$1.$$arity = 1);
        self.$private();
        Opal.def(self, '$compress_child_and_merge', $Compressor_compress_child_and_merge$2 = function $$compress_child_and_merge(node) {
          var self = this;
          return self.$merge(node, self.$compress(node.$first_child()));
        }, $Compressor_compress_child_and_merge$2.$$arity = 1);
        Opal.def(self, '$merge', $Compressor_merge$3 = function $$merge(node, other) {
          var self = this, letter = nil;
          letter = node.$letter().$to_s()['$<<'](other.$letter().$to_s());
          return self.$new_compressed_node(letter.$to_sym(), node.$parent(), other.$children_tree(), other['$terminal?']());
        }, $Compressor_merge$3.$$arity = 2);
        Opal.def(self, '$compress_children_and_copy', $Compressor_compress_children_and_copy$4 = function $$compress_children_and_copy(node) {
          var self = this;
          return self.$new_compressed_node(node.$letter(), node.$parent(), self.$compress_children(node.$children_tree()), node['$terminal?']());
        }, $Compressor_compress_children_and_copy$4.$$arity = 1);
        Opal.def(self, '$compress_children', $Compressor_compress_children$5 = function $$compress_children(tree) {
          var $$6, self = this, new_tree = nil;
          new_tree = $hash2([], { });
          $send(tree, 'each', [], ($$6 = function(letter, child) {
            var self = $$6.$$s || this, compressed_child = nil, $writer = nil;
            if(letter == null) {
              letter = nil;
            }
            ;
            if(child == null) {
              child = nil;
            }
            ;
            compressed_child = self.$compress(child);
            $writer = [letter, compressed_child];
            $send(new_tree, '[]=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
            ;
          }, $$6.$$s = self, $$6.$$arity = 2, $$6));
          return new_tree;
        }, $Compressor_compress_children$5.$$arity = 1);
        return (Opal.def(self, '$new_compressed_node', $Compressor_new_compressed_node$7 = function $$new_compressed_node(letter, parent, tree, terminal) {
          var $$8, self = this, node = nil;
          node = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Compressed').$new(letter, parent, tree);
          if($truthy(terminal)) {
            node['$terminal!']();
          }
          ;
          $send(tree, 'each_value', [], ($$8 = function(child) {
            var self = $$8.$$s || this, $writer = nil;
            if(child == null) {
              child = nil;
            }
            ;
            $writer = [node];
            $send(child, 'parent=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
          }, $$8.$$s = self, $$8.$$arity = 1, $$8));
          return node;
        }, $Compressor_new_compressed_node$7.$$arity = 4), nil) && 'new_compressed_node';
      })($nesting[0], null, $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/container"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Container');
        var $nesting = [self].concat($parent_nesting), $Container_initialize$1, $Container_add$2, $Container_concat$3, $Container_compress$excl$5, $Container_compress$6, $Container_partial_word$ques$7, $Container_word$ques$8, $Container_scan$9, $Container_words_within$10, $Container_words_within$ques$11, $Container_$eq_eq$12, $Container_each$13, $Container_inspect$15, $Container_$$$16, $Container_children$17, $Container_children_tree$18, $Container_compressed$ques$19, $Container_to_a$20, $Container_key$ques$21, $Container_size$22, $Container_words_within_root$23, $Container_compress_root$26, $Container_char_symbols$27;
        self.$include($$$('::', 'Enumerable'));
        self.$attr_reader("root");
        Opal.def(self, '$initialize', $Container_initialize$1 = function $$initialize(root, compressor) {
          var $iter = $Container_initialize$1.$$p, $yield = $iter || nil, self = this;
          if($iter) $Container_initialize$1.$$p = null;
          self.root = root;
          self.compressor = compressor;
          if(($yield !== nil)) {
            return Opal.yield1($yield, self);
          } else {
            return nil;
          }
          ;
        }, $Container_initialize$1.$$arity = 2);
        Opal.def(self, '$add', $Container_add$2 = function $$add(word) {
          var self = this;
          return self.$root().$add(self.$char_symbols(word));
        }, $Container_add$2.$$arity = 1);
        Opal.def(self, '$concat', $Container_concat$3 = function $$concat(words) {
          var $$4, self = this;
          return $send(words, 'map', [], ($$4 = function(word) {
            var self = $$4.$$s || this;
            if(word == null) {
              word = nil;
            }
            ;
            return self.$add(word);
          }, $$4.$$s = self, $$4.$$arity = 1, $$4));
        }, $Container_concat$3.$$arity = 1);
        /* destroyed: TreeShaking#shake_methods/$compress! */0;
        Opal.def(self, '$compress', $Container_compress$6 = function $$compress() {
          var self = this;
          if($truthy(self.$root()['$compressed?']())) {
            return self;
          }
          ;
          return $$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Container').$new(self.$compress_root(), self.$compressor());
        }, $Container_compress$6.$$arity = 0);
        Opal.def(self, '$partial_word?', $Container_partial_word$ques$7 = function(word) {
          var self = this;
          if(word == null) {
            word = "";
          }
          ;
          return self.$root()['$partial_word?'](word.$chars());
        }, $Container_partial_word$ques$7.$$arity = -1);
        Opal.def(self, '$word?', $Container_word$ques$8 = function(word) {
          var self = this;
          if(word == null) {
            word = "";
          }
          ;
          return self.$root()['$word?'](word.$chars());
        }, $Container_word$ques$8.$$arity = -1);
        Opal.def(self, '$scan', $Container_scan$9 = function $$scan(word) {
          var self = this;
          if(word == null) {
            word = "";
          }
          ;
          return self.$root().$scan(word.$chars()).$to_a();
        }, $Container_scan$9.$$arity = -1);
        /* destroyed: TreeShaking#shake_methods/$words_within */0;
        /* destroyed: TreeShaking#shake_methods/$words_within? */0;
        Opal.def(self, '$==', $Container_$eq_eq$12 = function(other) {
          var self = this;
          return self.$root()['$=='](other.$root());
        }, $Container_$eq_eq$12.$$arity = 1);
        Opal.def(self, '$each', $Container_each$13 = function $$each() {
          var $$14, $iter = $Container_each$13.$$p, $yield = $iter || nil, self = this;
          if($iter) $Container_each$13.$$p = null;
          if(($yield !== nil)) {

          } else {
            return self.$enum_for("each");
          }
          ;
          return $send(self.$root(), 'each', [], ($$14 = function(word) {
            var self = $$14.$$s || this;
            if(word == null) {
              word = nil;
            }
            ;
            return Opal.yield1($yield, word);
            ;
          }, $$14.$$s = self, $$14.$$arity = 1, $$14));
        }, $Container_each$13.$$arity = 0);
        Opal.def(self, '$inspect', $Container_inspect$15 = function $$inspect() {
          var self = this;
          return "" + "#<" + (self.$class().$name()) + " root: " + (self.$root().$inspect()) + ">";
        }, $Container_inspect$15.$$arity = 0);
        Opal.def(self, '$[]', $Container_$$$16 = function(letter) {
          var self = this;
          return self.$root()['$[]'](letter);
        }, $Container_$$$16.$$arity = 1);
        Opal.def(self, '$children', $Container_children$17 = function $$children() {
          var self = this;
          return self.$root().$children();
        }, $Container_children$17.$$arity = 0);
        Opal.def(self, '$children_tree', $Container_children_tree$18 = function $$children_tree() {
          var self = this;
          return self.$root().$children_tree();
        }, $Container_children_tree$18.$$arity = 0);
        Opal.def(self, '$compressed?', $Container_compressed$ques$19 = function() {
          var self = this;
          return self.$root()['$compressed?']();
        }, $Container_compressed$ques$19.$$arity = 0);
        Opal.def(self, '$to_a', $Container_to_a$20 = function $$to_a() {
          var self = this;
          return self.$root().$to_a();
        }, $Container_to_a$20.$$arity = 0);
        Opal.def(self, '$key?', $Container_key$ques$21 = function(letter) {
          var self = this;
          return self.$root()['$key?'](letter);
        }, $Container_key$ques$21.$$arity = 1);
        Opal.def(self, '$size', $Container_size$22 = function $$size() {
          var self = this;
          return self.$root().$size();
        }, $Container_size$22.$$arity = 0);
        self.$alias_method("include?", "word?");
        self.$alias_method("match?", "partial_word?");
        self.$alias_method("words", "scan");
        self.$alias_method("<<", "add");
        self.$alias_method("has_key?", "key?");
        self.$alias_method("has_letter?", "key?");
        self.$private();
        self.$attr_reader("compressor");
        self.$attr_writer("root");
        /* destroyed: TreeShaking#shake_methods/$words_within_root */0;
        Opal.def(self, '$compress_root', $Container_compress_root$26 = function $$compress_root() {
          var self = this;
          return self.$compressor().$compress(self.$root());
        }, $Container_compress_root$26.$$arity = 0);
        return (Opal.def(self, '$char_symbols', $Container_char_symbols$27 = function $$char_symbols(word) {
          var $$28, self = this, symbols = nil;
          symbols = [];
          $send(word.$reverse(), 'each_char', [], ($$28 = function(c) {
            var self = $$28.$$s || this;
            if(c == null) {
              c = nil;
            }
            ;
            return symbols['$<<'](c.$to_sym());
          }, $$28.$$s = self, $$28.$$arity = 1, $$28));
          return symbols;
        }, $Container_char_symbols$27.$$arity = 1), nil) && 'char_symbols';
      })($nesting[0], null, $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/enumerable"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Enumerable');
        var $nesting = [self].concat($parent_nesting), $Enumerable_each$1;
        self.$include($$$('::', 'Enumerable'));
        self.$alias_method("size", "count");
        Opal.def(self, '$each', $Enumerable_each$1 = function $$each() {
          var $$2, $iter = $Enumerable_each$1.$$p, $yield = $iter || nil, self = this;
          if($iter) $Enumerable_each$1.$$p = null;
          if(($yield !== nil)) {

          } else {
            return self.$enum_for("each");
          }
          ;
          if($truthy(self['$terminal?']())) {
            Opal.yield1($yield, self.$as_word());
          }
          ;
          return $send(self.$children_tree(), 'each_value', [], ($$2 = function(child) {
            var self = $$2.$$s || this, $$3;
            if(child == null) {
              child = nil;
            }
            ;
            return $send(child, 'each', [], ($$3 = function(word) {
              var self = $$3.$$s || this;
              if(word == null) {
                word = nil;
              }
              ;
              return Opal.yield1($yield, word);
              ;
            }, $$3.$$s = self, $$3.$$arity = 1, $$3));
          }, $$2.$$s = self, $$2.$$arity = 1, $$2));
        }, $Enumerable_each$1.$$arity = 0);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/inspectable"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Inspectable');
        var $nesting = [self].concat($parent_nesting), $Inspectable_inspect$1, $Inspectable_class_name$2, $Inspectable_attributes$3, $Inspectable_letter_inspect$4, $Inspectable_terminal_inspect$5, $Inspectable_children_inspect$6;
        Opal.def(self, '$inspect', $Inspectable_inspect$1 = function $$inspect() {
          var self = this;
          return "" + "#<" + (self.$class_name()) + " " + (self.$attributes()) + ">";
        }, $Inspectable_inspect$1.$$arity = 0);
        self.$private();
        Opal.def(self, '$class_name', $Inspectable_class_name$2 = function $$class_name() {
          var self = this;
          return self.$class().$name();
        }, $Inspectable_class_name$2.$$arity = 0);
        Opal.def(self, '$attributes', $Inspectable_attributes$3 = function $$attributes() {
          var self = this;
          return [self.$letter_inspect(), self.$terminal_inspect(), self.$children_inspect()].$join(", ");
        }, $Inspectable_attributes$3.$$arity = 0);
        Opal.def(self, '$letter_inspect', $Inspectable_letter_inspect$4 = function $$letter_inspect() {
          var self = this;
          return "" + "letter: " + (self.$letter().$inspect());
        }, $Inspectable_letter_inspect$4.$$arity = 0);
        Opal.def(self, '$terminal_inspect', $Inspectable_terminal_inspect$5 = function $$terminal_inspect() {
          var self = this;
          return "" + "terminal: " + (self.$terminal().$inspect());
        }, $Inspectable_terminal_inspect$5.$$arity = 0);
        Opal.def(self, '$children_inspect', $Inspectable_children_inspect$6 = function $$children_inspect() {
          var self = this;
          return "" + "children: " + (self.$children_tree().$keys().$inspect());
        }, $Inspectable_children_inspect$6.$$arity = 0);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/invalid_operation"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'InvalidOperation');
        var $nesting = [self].concat($parent_nesting), $InvalidOperation_initialize$1;
        return (Opal.def(self, '$initialize', $InvalidOperation_initialize$1 = function $$initialize(message) {
          var $iter = $InvalidOperation_initialize$1.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
          if($iter) $InvalidOperation_initialize$1.$$p = null;
          for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
            $zuper[$zuper_i] = arguments[$zuper_i];
          }
          if(message == null) {
            message = nil;
          }
          ;
          return $send(self, Opal.find_super_dispatcher(self, 'initialize', $InvalidOperation_initialize$1, false), $zuper, $iter);
        }, $InvalidOperation_initialize$1.$$arity = -1), nil) && 'initialize';
      })($nesting[0], $$($nesting, 'RuntimeError'), $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/readers/plain_text"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Readers');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'PlainText');
          var $nesting = [self].concat($parent_nesting), $PlainText_each_word$1;
          return (Opal.def(self, '$each_word', $PlainText_each_word$1 = function $$each_word(filepath) {
            var $$2, $iter = $PlainText_each_word$1.$$p, $yield = $iter || nil, self = this;
            if($iter) $PlainText_each_word$1.$$p = null;
            return $send($$($nesting, 'File'), 'foreach', [filepath], ($$2 = function(line) {
              var self = $$2.$$s || this;
              if(line == null) {
                line = nil;
              }
              ;
              return Opal.yield1($yield, line['$chomp!']());
              ;
            }, $$2.$$s = self, $$2.$$arity = 1, $$2));
          }, $PlainText_each_word$1.$$arity = 1), nil) && 'each_word';
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/readers"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    self.$require("rambling/trie/readers/plain_text");
  } else {
    nil;
  }
  ;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Readers');
        var $nesting = [self].concat($parent_nesting);
        nil;
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/serializers/file"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Serializers');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'File');
          var $nesting = [self].concat($parent_nesting), $File_load$1, $File_dump$2;
          Opal.def(self, '$load', $File_load$1 = function $$load(filepath) {
            var self = this;
            return $$$('::', 'File').$read(filepath);
          }, $File_load$1.$$arity = 1);
          return (Opal.def(self, '$dump', $File_dump$2 = function $$dump(contents, filepath) {
            var $$3, self = this;
            return $send($$$('::', 'File'), 'open', [filepath, "w+"], ($$3 = function(f) {
              var self = $$3.$$s || this;
              if(f == null) {
                f = nil;
              }
              ;
              return f.$write(contents);
            }, $$3.$$s = self, $$3.$$arity = 1, $$3));
          }, $File_dump$2.$$arity = 2), nil) && 'dump';
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/serializers/marshal"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Serializers');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Marshal');
          var $nesting = [self].concat($parent_nesting), $Marshal_initialize$1, $Marshal_load$2, $Marshal_dump$3;
          Opal.def(self, '$initialize', $Marshal_initialize$1 = function $$initialize(serializer) {
            var $a, self = this;
            if(serializer == null) {
              serializer = nil;
            }
            ;
            return (self.serializer = ($truthy($a = serializer) ? $a : $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Serializers'), 'File').$new()));
          }, $Marshal_initialize$1.$$arity = -1);
          Opal.def(self, '$load', $Marshal_load$2 = function $$load(filepath) {
            var self = this;
            return $$$('::', 'Marshal').$load(self.$serializer().$load(filepath));
          }, $Marshal_load$2.$$arity = 1);
          Opal.def(self, '$dump', $Marshal_dump$3 = function $$dump(node, filepath) {
            var self = this;
            return self.$serializer().$dump($$$('::', 'Marshal').$dump(node), filepath);
          }, $Marshal_dump$3.$$arity = 2);
          self.$private();
          return self.$attr_reader("serializer");
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["yaml"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  return self.$warn("REMOVED: use `require 'nodejs/yaml'` instead");
};
Opal.modules["rambling/trie/serializers/yaml"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Serializers');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Yaml');
          var $nesting = [self].concat($parent_nesting), $Yaml_initialize$1, $Yaml_load$2, $Yaml_dump$3;
          Opal.def(self, '$initialize', $Yaml_initialize$1 = function $$initialize(serializer) {
            var $a, self = this;
            if(serializer == null) {
              serializer = nil;
            }
            ;
            return (self.serializer = ($truthy($a = serializer) ? $a : $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Serializers'), 'File').$new()));
          }, $Yaml_initialize$1.$$arity = -1);
          Opal.def(self, '$load', $Yaml_load$2 = function $$load(filepath) {
            var self = this;
            self.$require("yaml");
            return $$$('::', 'YAML').$safe_load(self.$serializer().$load(filepath), [$$($nesting, 'Symbol'), $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Raw'), $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Compressed')], [], true);
          }, $Yaml_load$2.$$arity = 1);
          Opal.def(self, '$dump', $Yaml_dump$3 = function $$dump(node, filepath) {
            var self = this;
            self.$require("yaml");
            return self.$serializer().$dump($$$('::', 'YAML').$dump(node), filepath);
          }, $Yaml_dump$3.$$arity = 2);
          self.$private();
          return self.$attr_reader("serializer");
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/serializers"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    self.$require("rambling/trie/serializers/file");
    self.$require("rambling/trie/serializers/marshal");
    self.$require("rambling/trie/serializers/yaml");
  } else {
    nil;
  }
  ;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Serializers');
        var $nesting = [self].concat($parent_nesting);
        nil;
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/stringifyable"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Stringifyable');
        var $nesting = [self].concat($parent_nesting), $Stringifyable_as_word$1, $Stringifyable_to_s$2;
        Opal.def(self, '$as_word', $Stringifyable_as_word$1 = function $$as_word() {
          var $a, self = this;
          if($truthy(($truthy($a = self.$letter()) ? self['$terminal?']()['$!']() : $a))) {
            self.$raise($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'InvalidOperation'), "Cannot represent branch as a word");
          }
          ;
          return self.$to_s();
        }, $Stringifyable_as_word$1.$$arity = 0);
        Opal.def(self, '$to_s', $Stringifyable_to_s$2 = function $$to_s() {
          var self = this;
          return $rb_plus(self.$parent().$to_s(), self.$letter().$to_s());
        }, $Stringifyable_to_s$2.$$arity = 0);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/nodes/node"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Nodes');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Node');
          var $nesting = [self].concat($parent_nesting), $Node_initialize$1, $Node_children$2, $Node_first_child$3, $Node_root$ques$5, $Node_terminal$ques$6, $Node_terminal$excl$7, $Node_letter$eq$8, $Node_partial_word$ques$9, $Node_word$ques$10, $Node_scan$11, $Node_match_prefix$12, $Node_$$$14, $Node_$$$eq$15, $Node_key$ques$16, $Node_delete$17, $Node_missing$18;
          self.$include($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Compressible'));
          self.$include($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Enumerable'));
          self.$include($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Comparable'));
          self.$include($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Stringifyable'));
          self.$include($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Inspectable'));
          self.$attr_reader("letter");
          self.$attr_accessor("children_tree");
          self.$attr_accessor("parent");
          Opal.def(self, '$initialize', $Node_initialize$1 = function $$initialize(letter, parent, children_tree) {
            var self = this;
            if(letter == null) {
              letter = nil;
            }
            ;
            if(parent == null) {
              parent = nil;
            }
            ;
            if(children_tree == null) {
              children_tree = $hash2([], { });
            }
            ;
            self.letter = letter;
            self.parent = parent;
            return (self.children_tree = children_tree);
          }, $Node_initialize$1.$$arity = -1);
          Opal.def(self, '$children', $Node_children$2 = function $$children() {
            var self = this;
            return self.$children_tree().$values();
          }, $Node_children$2.$$arity = 0);
          Opal.def(self, '$first_child', $Node_first_child$3 = function $$first_child() {
            try {
              var $$4, self = this;
              if($truthy(self.$children_tree()['$empty?']())) {
                return nil;
              }
              ;
              return $send(self.$children_tree(), 'each_value', [], ($$4 = function(child) {
                var self = $$4.$$s || this;
                if(child == null) {
                  child = nil;
                }
                ;
                Opal.ret(child);
              }, $$4.$$s = self, $$4.$$arity = 1, $$4));
            } catch($returner) {
              if($returner === Opal.returner) {
                return $returner.$v;
              }
              throw $returner;
            }
          }, $Node_first_child$3.$$arity = 0);
          Opal.def(self, '$root?', $Node_root$ques$5 = function() {
            var self = this;
            return self.$parent()['$!']();
          }, $Node_root$ques$5.$$arity = 0);
          Opal.def(self, '$terminal?', $Node_terminal$ques$6 = function() {
            var self = this;
            return self.$terminal()['$!']()['$!']();
          }, $Node_terminal$ques$6.$$arity = 0);
          Opal.def(self, '$terminal!', $Node_terminal$excl$7 = function() {
            var self = this, $writer = nil;
            $writer = [true];
            $send(self, 'terminal=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
            ;
            return self;
          }, $Node_terminal$excl$7.$$arity = 0);
          /* destroyed: TreeShaking#shake_methods/$letter= */0;
          Opal.def(self, '$partial_word?', $Node_partial_word$ques$9 = function(chars) {
            var self = this;
            if($truthy(chars['$empty?']())) {
              return true;
            }
            ;
            return self['$partial_word_chars?'](chars);
          }, $Node_partial_word$ques$9.$$arity = 1);
          Opal.def(self, '$word?', $Node_word$ques$10 = function(chars) {
            var self = this;
            if(chars == null) {
              chars = [];
            }
            ;
            if($truthy(chars['$empty?']())) {
              return self['$terminal?']();
            }
            ;
            return self['$word_chars?'](chars);
          }, $Node_word$ques$10.$$arity = -1);
          Opal.def(self, '$scan', $Node_scan$11 = function $$scan(chars) {
            var self = this;
            if($truthy(chars['$empty?']())) {
              return self;
            }
            ;
            return self.$closest_node(chars);
          }, $Node_scan$11.$$arity = 1);
          Opal.def(self, '$match_prefix', $Node_match_prefix$12 = function $$match_prefix(chars) {
            var $$13, $iter = $Node_match_prefix$12.$$p, $yield = $iter || nil, self = this;
            if($iter) $Node_match_prefix$12.$$p = null;
            if(($yield !== nil)) {

            } else {
              return self.$enum_for("match_prefix", chars);
            }
            ;
            if($truthy(self['$terminal?']())) {
              Opal.yield1($yield, self.$as_word());
            }
            ;
            return $send(self, 'children_match_prefix', [chars], ($$13 = function(word) {
              var self = $$13.$$s || this;
              if(word == null) {
                word = nil;
              }
              ;
              return Opal.yield1($yield, word);
              ;
            }, $$13.$$s = self, $$13.$$arity = 1, $$13));
          }, $Node_match_prefix$12.$$arity = 1);
          Opal.def(self, '$[]', $Node_$$$14 = function(letter) {
            var self = this;
            return self.$children_tree()['$[]'](letter);
          }, $Node_$$$14.$$arity = 1);
          Opal.def(self, '$[]=', $Node_$$$eq$15 = function(letter, node) {
            var self = this, $writer = nil;
            $writer = [letter, node];
            $send(self.$children_tree(), '[]=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];
          }, $Node_$$$eq$15.$$arity = 2);
          Opal.def(self, '$key?', $Node_key$ques$16 = function(letter) {
            var self = this;
            return self.$children_tree()['$key?'](letter);
          }, $Node_key$ques$16.$$arity = 1);
          Opal.def(self, '$delete', $Node_delete$17 = function(letter) {
            var self = this;
            return self.$children_tree().$delete(letter);
          }, $Node_delete$17.$$arity = 1);
          self.$alias_method("has_key?", "key?");
          self.$protected();
          Opal.def(self, '$missing', $Node_missing$18 = function $$missing() {
            var self = this;
            return $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Missing').$new();
          }, $Node_missing$18.$$arity = 0);
          self.$private();
          return self.$attr_accessor("terminal");
        })($nesting[0], null, $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/nodes/compressed"] = function(Opal) {
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Nodes');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Compressed');
          var $nesting = [self].concat($parent_nesting), $Compressed_add$1, $Compressed_compressed$ques$2, $Compressed_partial_word_chars$ques$3, $Compressed_word_chars$ques$4, $Compressed_closest_node$6, $Compressed_children_match_prefix$7;
          Opal.def(self, '$add', $Compressed_add$1 = function $$add(_) {
            var self = this;
            return self.$raise($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'InvalidOperation'), "Cannot add word to compressed trie");
          }, $Compressed_add$1.$$arity = 1);
          Opal.def(self, '$compressed?', $Compressed_compressed$ques$2 = function() {
            var self = this;
            return true;
          }, $Compressed_compressed$ques$2.$$arity = 0);
          self.$private();
          Opal.def(self, '$partial_word_chars?', $Compressed_partial_word_chars$ques$3 = function(chars) {
            var self = this, child = nil, child_letter = nil, letter = nil;
            child = self.$children_tree()['$[]'](chars.$first().$to_sym());
            if($truthy(child)) {

            } else {
              return false;
            }
            ;
            child_letter = child.$letter().$to_s();
            if($truthy($rb_ge(chars.$size(), child_letter.$size()))) {
              letter = chars['$slice!'](0, child_letter.$size()).$join();
              if(child_letter['$=='](letter)) {
                return child['$partial_word?'](chars);
              }
              ;
            }
            ;
            letter = chars.$join();
            child_letter = child_letter.$slice(0, letter.$size());
            return child_letter['$=='](letter);
          }, $Compressed_partial_word_chars$ques$3.$$arity = 1);
          Opal.def(self, '$word_chars?', $Compressed_word_chars$ques$4 = function(chars) {
            try {
              var $$5, self = this, letter = nil, letter_sym = nil, child = nil;
              letter = chars['$slice!'](0);
              letter_sym = letter.$to_sym();
              child = self.$children_tree()['$[]'](letter_sym);
              if($truthy(child)) {

              } else {
                return false;
              }
              ;
              (function() {
                var $brk = Opal.new_brk();
                try {
                  return $send(self, 'loop', [], ($$5 = function() {
                    var self = $$5.$$s || this;
                    if(letter_sym['$=='](child.$letter())) {
                      Opal.ret(child['$word?'](chars));
                    }
                    ;
                    if($truthy(chars['$empty?']())) {
                      Opal.brk(nil, $brk);
                    }
                    ;
                    letter['$<<'](chars['$slice!'](0));
                    return (letter_sym = letter.$to_sym());
                  }, $$5.$$s = self, $$5.$$brk = $brk, $$5.$$arity = 0, $$5));
                } catch(err) {
                  if(err === $brk) {
                    return err.$v;
                  } else {
                    throw err;
                  }
                }
              })();
              return false;
            } catch($returner) {
              if($returner === Opal.returner) {
                return $returner.$v;
              }
              throw $returner;
            }
          }, $Compressed_word_chars$ques$4.$$arity = 1);
          Opal.def(self, '$closest_node', $Compressed_closest_node$6 = function $$closest_node(chars) {
            var self = this, child = nil, child_letter = nil, letter = nil;
            child = self.$children_tree()['$[]'](chars.$first().$to_sym());
            if($truthy(child)) {

            } else {
              return self.$missing();
            }
            ;
            child_letter = child.$letter().$to_s();
            if($truthy($rb_ge(chars.$size(), child_letter.$size()))) {
              letter = chars['$slice!'](0, child_letter.$size()).$join();
              if(child_letter['$=='](letter)) {
                return child.$scan(chars);
              }
              ;
            }
            ;
            letter = chars.$join();
            child_letter = child_letter.$slice(0, letter.$size());
            if(child_letter['$=='](letter)) {
              return child;
            } else {
              return self.$missing();
            }
            ;
          }, $Compressed_closest_node$6.$$arity = 1);
          return (Opal.def(self, '$children_match_prefix', $Compressed_children_match_prefix$7 = function $$children_match_prefix(chars) {
            var $$8, $iter = $Compressed_children_match_prefix$7.$$p, $yield = $iter || nil, self = this, child = nil, child_letter = nil, letter = nil;
            if($iter) $Compressed_children_match_prefix$7.$$p = null;
            if(($yield !== nil)) {

            } else {
              return self.$enum_for("children_match_prefix", chars);
            }
            ;
            if($truthy(chars['$empty?']())) {
              return nil;
            }
            ;
            child = self.$children_tree()['$[]'](chars.$first().$to_sym());
            if($truthy(child)) {

            } else {
              return nil;
            }
            ;
            child_letter = child.$letter().$to_s();
            letter = chars['$slice!'](0, child_letter.$size()).$join();
            if(child_letter['$=='](letter)) {

            } else {
              return nil;
            }
            ;
            return $send(child, 'match_prefix', [chars], ($$8 = function(word) {
              var self = $$8.$$s || this;
              if(word == null) {
                word = nil;
              }
              ;
              return Opal.yield1($yield, word);
              ;
            }, $$8.$$s = self, $$8.$$arity = 1, $$8));
          }, $Compressed_children_match_prefix$7.$$arity = 1), nil) && 'children_match_prefix';
        })($nesting[0], $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Node'), $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/nodes/missing"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Nodes');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Missing');
          var $nesting = [self].concat($parent_nesting);
          return nil;
        })($nesting[0], $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Node'), $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/nodes/raw"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Nodes');
        var $nesting = [self].concat($parent_nesting);
        (function($base, $super, $parent_nesting) {
          var self = $klass($base, $super, 'Raw');
          var $nesting = [self].concat($parent_nesting), $Raw_add$1, $Raw_compressed$ques$2, $Raw_add_to_children_tree$3, $Raw_new_node$4, $Raw_partial_word_chars$ques$5, $Raw_word_chars$ques$6, $Raw_closest_node$7, $Raw_children_match_prefix$8;
          Opal.def(self, '$add', $Raw_add$1 = function $$add(chars) {
            var self = this;
            if($truthy(chars['$empty?']())) {
              return self['$terminal!']();
            } else {
              return self.$add_to_children_tree(chars);
            }
          }, $Raw_add$1.$$arity = 1);
          Opal.def(self, '$compressed?', $Raw_compressed$ques$2 = function() {
            var self = this;
            return false;
          }, $Raw_compressed$ques$2.$$arity = 0);
          self.$private();
          Opal.def(self, '$add_to_children_tree', $Raw_add_to_children_tree$3 = function $$add_to_children_tree(chars) {
            var $a, self = this, letter = nil, child = nil;
            letter = chars.$pop();
            child = ($truthy($a = self.$children_tree()['$[]'](letter)) ? $a : self.$new_node(letter));
            child.$add(chars);
            return child;
          }, $Raw_add_to_children_tree$3.$$arity = 1);
          Opal.def(self, '$new_node', $Raw_new_node$4 = function $$new_node(letter) {
            var self = this, node = nil, $writer = nil;
            node = $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Raw').$new(letter, self);
            $writer = [letter, node];
            $send(self.$children_tree(), '[]=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
            ;
            return node;
          }, $Raw_new_node$4.$$arity = 1);
          Opal.def(self, '$partial_word_chars?', $Raw_partial_word_chars$ques$5 = function(chars) {
            var self = this, letter = nil, child = nil;
            if(chars == null) {
              chars = [];
            }
            ;
            letter = chars.$shift().$to_sym();
            child = self.$children_tree()['$[]'](letter);
            if($truthy(child)) {

            } else {
              return false;
            }
            ;
            return child['$partial_word?'](chars);
          }, $Raw_partial_word_chars$ques$5.$$arity = -1);
          Opal.def(self, '$word_chars?', $Raw_word_chars$ques$6 = function(chars) {
            var self = this, letter = nil, child = nil;
            if(chars == null) {
              chars = [];
            }
            ;
            letter = chars.$shift().$to_sym();
            child = self.$children_tree()['$[]'](letter);
            if($truthy(child)) {

            } else {
              return false;
            }
            ;
            return child['$word?'](chars);
          }, $Raw_word_chars$ques$6.$$arity = -1);
          Opal.def(self, '$closest_node', $Raw_closest_node$7 = function $$closest_node(chars) {
            var self = this, letter = nil, child = nil;
            letter = chars.$shift().$to_sym();
            child = self.$children_tree()['$[]'](letter);
            if($truthy(child)) {

            } else {
              return self.$missing();
            }
            ;
            return child.$scan(chars);
          }, $Raw_closest_node$7.$$arity = 1);
          return (Opal.def(self, '$children_match_prefix', $Raw_children_match_prefix$8 = function $$children_match_prefix(chars) {
            var $$9, $iter = $Raw_children_match_prefix$8.$$p, $yield = $iter || nil, self = this, letter = nil, child = nil;
            if($iter) $Raw_children_match_prefix$8.$$p = null;
            if(($yield !== nil)) {

            } else {
              return self.$enum_for("children_match_prefix", chars);
            }
            ;
            if($truthy(chars['$empty?']())) {
              return nil;
            }
            ;
            letter = chars.$shift().$to_sym();
            child = self.$children_tree()['$[]'](letter);
            if($truthy(child)) {

            } else {
              return nil;
            }
            ;
            return $send(child, 'match_prefix', [chars], ($$9 = function(word) {
              var self = $$9.$$s || this;
              if(word == null) {
                word = nil;
              }
              ;
              return Opal.yield1($yield, word);
              ;
            }, $$9.$$s = self, $$9.$$arity = 1, $$9));
          }, $Raw_children_match_prefix$8.$$arity = 1), nil) && 'children_match_prefix';
        })($nesting[0], $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Nodes'), 'Node'), $nesting);
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/nodes"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    self.$require("rambling/trie/nodes/node");
    self.$require("rambling/trie/nodes/compressed");
    self.$require("rambling/trie/nodes/missing");
    self.$require("rambling/trie/nodes/raw");
  } else {
    nil;
  }
  ;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function($base, $parent_nesting) {
        var self = $module($base, 'Nodes');
        var $nesting = [self].concat($parent_nesting);
        nil;
      })($nesting[0], $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie/version"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      Opal.const_set($nesting[0], 'VERSION', "2.1.1.1");
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling/trie"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $send = Opal.send, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    self.$require("rambling/trie/configuration");
    self.$require("rambling/trie/comparable");
    self.$require("rambling/trie/compressible");
    self.$require("rambling/trie/compressor");
    self.$require("rambling/trie/container");
    self.$require("rambling/trie/enumerable");
    self.$require("rambling/trie/inspectable");
    self.$require("rambling/trie/invalid_operation");
    self.$require("rambling/trie/readers");
    self.$require("rambling/trie/serializers");
    self.$require("rambling/trie/stringifyable");
    self.$require("rambling/trie/nodes");
    self.$require("rambling/trie/version");
  } else {
    nil;
  }
  ;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Rambling');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Trie');
      var $nesting = [self].concat($parent_nesting);
      (function(self, $parent_nesting) {
        var $nesting = [self].concat($parent_nesting), $create$1, $load$4, $dump$6, $config$7, $properties$8, $readers$9, $serializers$10, $compressor$11, $root_builder$12;
        Opal.def(self, '$create', $create$1 = function $$create(filepath, reader) {
          var $$2, $iter = $create$1.$$p, $yield = $iter || nil, self = this, root = nil;
          if($iter) $create$1.$$p = null;
          if(filepath == null) {
            filepath = nil;
          }
          ;
          if(reader == null) {
            reader = nil;
          }
          ;
          root = self.$root_builder().$call();
          return $send($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Container'), 'new', [root, self.$compressor()], ($$2 = function(container) {
            var self = $$2.$$s || this, $a, $$3;
            if(container == null) {
              container = nil;
            }
            ;
            if($truthy(filepath)) {
              reader = ($truthy($a = reader) ? $a : self.$readers().$resolve(filepath));
              $send(reader, 'each_word', [filepath], ($$3 = function(word) {
                var self = $$3.$$s || this;
                if(word == null) {
                  word = nil;
                }
                ;
                return container['$<<'](word);
              }, $$3.$$s = self, $$3.$$arity = 1, $$3));
            }
            ;
            if(($yield !== nil)) {
              return Opal.yield1($yield, container);
            } else {
              return nil;
            }
            ;
          }, $$2.$$s = self, $$2.$$arity = 1, $$2));
        }, $create$1.$$arity = -1);
        Opal.def(self, '$load', $load$4 = function $$load(filepath, serializer) {
          var $a, $$5, $iter = $load$4.$$p, $yield = $iter || nil, self = this, root = nil;
          if($iter) $load$4.$$p = null;
          if(serializer == null) {
            serializer = nil;
          }
          ;
          serializer = ($truthy($a = serializer) ? $a : self.$serializers().$resolve(filepath));
          root = serializer.$load(filepath);
          return $send($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Container'), 'new', [root, self.$compressor()], ($$5 = function(container) {
            var self = $$5.$$s || this;
            if(container == null) {
              container = nil;
            }
            ;
            if(($yield !== nil)) {
              return Opal.yield1($yield, container);
            } else {
              return nil;
            }
            ;
          }, $$5.$$s = self, $$5.$$arity = 1, $$5));
        }, $load$4.$$arity = -2);
        Opal.def(self, '$dump', $dump$6 = function $$dump(trie, filepath, serializer) {
          var $a, self = this;
          if(serializer == null) {
            serializer = nil;
          }
          ;
          serializer = ($truthy($a = serializer) ? $a : self.$serializers().$resolve(filepath));
          return serializer.$dump(trie.$root(), filepath);
        }, $dump$6.$$arity = -3);
        /* destroyed: TreeShaking#shake_methods/$config */0;
        self.$private();
        Opal.def(self, '$properties', $properties$8 = function $$properties() {
          var $a, self = this;
          if(self.properties == null) self.properties = nil;
          return (self.properties = ($truthy($a = self.properties) ? $a : $$$($$$($$$($$($nesting, 'Rambling'), 'Trie'), 'Configuration'), 'Properties').$new()));
        }, $properties$8.$$arity = 0);
        Opal.def(self, '$readers', $readers$9 = function $$readers() {
          var self = this;
          return self.$properties().$readers();
        }, $readers$9.$$arity = 0);
        Opal.def(self, '$serializers', $serializers$10 = function $$serializers() {
          var self = this;
          return self.$properties().$serializers();
        }, $serializers$10.$$arity = 0);
        Opal.def(self, '$compressor', $compressor$11 = function $$compressor() {
          var self = this;
          return self.$properties().$compressor();
        }, $compressor$11.$$arity = 0);
        return (Opal.def(self, '$root_builder', $root_builder$12 = function $$root_builder() {
          var self = this;
          return self.$properties().$root_builder();
        }, $root_builder$12.$$arity = 0), nil) && 'root_builder';
      })(Opal.get_singleton_class(self), $nesting);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["rambling-trie"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;
  /* destroyed: CollapseStubs */0;
  return self.$require("rambling/trie");
};
Opal.modules["json"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $send = Opal.send, $hash2 = Opal.hash2, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  (function($base, $parent_nesting) {
    var self = $module($base, 'JSON');
    var $nesting = [self].concat($parent_nesting), $JSON_$$$1, $JSON_parse$2, $JSON_parse$excl$3, $JSON_load$4, $JSON_from_object$5, $JSON_generate$6, $JSON_dump$7, $writer = nil;
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'JSONError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'ParserError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'JSONError'), $nesting);
    var $hasOwn = Opal.hasOwnProperty;
        function $parse(source) {
      try {
        return JSON.parse(source);
      } catch(e) {
        self.$raise($$$($$($nesting, 'JSON'), 'ParserError'), e.message);
      }
    }
    ;
        function to_opal(value, options) {
      var klass, arr, hash, i, ii, k;
      switch(typeof value) {
        case 'string':
          return value;
        case 'number':
          return value;
        case 'boolean':
          return !!value;
        case 'null':
          return nil;
        case 'object':
          if(!value) return nil;
          if(value.$$is_array) {
            arr = (options.array_class).$new();
            for(i = 0, ii = value.length; i < ii; i++) {
              (arr).$push(to_opal(value[i], options));
            }
            return arr;
          } else {
            hash = (options.object_class).$new();
            for(k in value) {
              if($hasOwn.call(value, k)) {
                (($writer = [k, to_opal(value[k], options)]), $send((hash), '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]);
              }
            }
            if(!options.parse && (klass = (hash)['$[]']($$($nesting, 'JSON').$create_id())) != nil) {
              return $$$('::', 'Object').$const_get(klass).$json_create(hash);
            } else {
              return hash;
            }
          }
      }
    }
    ;
    ;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting);
      return self.$attr_accessor("create_id");
    })(Opal.get_singleton_class(self), $nesting);
    $writer = ["json_class"];
    $send(self, 'create_id=', Opal.to_a($writer));
    $writer[$rb_minus($writer["length"], 1)];
    ;
    Opal.defs(self, '$[]', $JSON_$$$1 = function(value, options) {
      var self = this;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      if($truthy($$($nesting, 'String')['$==='](value))) {
        return self.$parse(value, options);
      } else {
        return self.$generate(value, options);
      }
      ;
    }, $JSON_$$$1.$$arity = -2);
    Opal.defs(self, '$parse', $JSON_parse$2 = function $$parse(source, options) {
      var self = this;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      return self.$from_object($parse(source), options.$merge($hash2(["parse"], {
        "parse": true
})));
    }, $JSON_parse$2.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$parse! */0;
    Opal.defs(self, '$load', $JSON_load$4 = function $$load(source, options) {
      var self = this;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      return self.$from_object($parse(source), options);
    }, $JSON_load$4.$$arity = -2);
    Opal.defs(self, '$from_object', $JSON_from_object$5 = function $$from_object(js_object, options) {
      var $a, self = this, $writer = nil;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      ($truthy($a = options['$[]']("object_class")) ? $a : (($writer = ["object_class", $$($nesting, 'Hash')]), $send(options, '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]));
      ($truthy($a = options['$[]']("array_class")) ? $a : (($writer = ["array_class", $$($nesting, 'Array')]), $send(options, '[]=', Opal.to_a($writer)), $writer[$rb_minus($writer["length"], 1)]));
      return to_opal(js_object, options.$$smap);
      ;
    }, $JSON_from_object$5.$$arity = -2);
    Opal.defs(self, '$generate', $JSON_generate$6 = function $$generate(obj, options) {
      var self = this;
      if(options == null) {
        options = $hash2([], { });
      }
      ;
      return obj.$to_json(options);
    }, $JSON_generate$6.$$arity = -2);
    Opal.defs(self, '$dump', $JSON_dump$7 = function $$dump(obj, io, limit) {
      var self = this, string = nil;
      if(io == null) {
        io = nil;
      }
      ;
      if(limit == null) {
        limit = nil;
      }
      ;
      string = self.$generate(obj);
      if($truthy(io)) {
        if($truthy(io['$responds_to?']("to_io"))) {
          io = io.$to_io();
        }
        ;
        io.$write(string);
        return io;
      } else {
        return string;
      }
      ;
    }, $JSON_dump$7.$$arity = -2);
  })($nesting[0], $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Object');
    var $nesting = [self].concat($parent_nesting), $Object_to_json$8;
    return (Opal.def(self, '$to_json', $Object_to_json$8 = function $$to_json() {
      var self = this;
      return self.$to_s().$to_json();
    }, $Object_to_json$8.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Enumerable');
    var $nesting = [self].concat($parent_nesting), $Enumerable_to_json$9;
    Opal.def(self, '$to_json', $Enumerable_to_json$9 = function $$to_json() {
      var self = this;
      return self.$to_a().$to_json();
    }, $Enumerable_to_json$9.$$arity = 0);
  })($nesting[0], $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Array');
    var $nesting = [self].concat($parent_nesting), $Array_to_json$10;
    return (Opal.def(self, '$to_json', $Array_to_json$10 = function $$to_json() {
      var self = this;
      var result = [];
      for(var i = 0, length = self.length; i < length; i++) {
        result.push((self[i]).$to_json());
      }
      return '[' + result.join(', ') + ']';
    }, $Array_to_json$10.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Boolean');
    var $nesting = [self].concat($parent_nesting), $Boolean_to_json$11;
    return (Opal.def(self, '$to_json', $Boolean_to_json$11 = function $$to_json() {
      var self = this;
      return (self == true) ? 'true' : 'false';
    }, $Boolean_to_json$11.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Hash');
    var $nesting = [self].concat($parent_nesting), $Hash_to_json$12;
    return (Opal.def(self, '$to_json', $Hash_to_json$12 = function $$to_json() {
      var self = this;
      var result = [];
      for(var i = 0, keys = self.$$keys, length = keys.length, key, value; i < length; i++) {
        key = keys[i];
        if(key.$$is_string) {
          value = self.$$smap[key];
        } else {
          value = key.value;
          key = key.key;
        }
        result.push((key).$to_s().$to_json() + ':' + (value).$to_json());
      }
      return '{' + result.join(', ') + '}';
    }, $Hash_to_json$12.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'NilClass');
    var $nesting = [self].concat($parent_nesting), $NilClass_to_json$13;
    return (Opal.def(self, '$to_json', $NilClass_to_json$13 = function $$to_json() {
      var self = this;
      return "null";
    }, $NilClass_to_json$13.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Numeric');
    var $nesting = [self].concat($parent_nesting), $Numeric_to_json$14;
    return (Opal.def(self, '$to_json', $Numeric_to_json$14 = function $$to_json() {
      var self = this;
      return self.toString();
    }, $Numeric_to_json$14.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting);
    return Opal.alias(self, "to_json", "inspect");
  })($nesting[0], null, $nesting);
  (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Time');
    var $nesting = [self].concat($parent_nesting), $Time_to_json$15;
    return (Opal.def(self, '$to_json', $Time_to_json$15 = function $$to_json() {
      var self = this;
      return self.$strftime("%FT%T%z").$to_json();
    }, $Time_to_json$15.$$arity = 0), nil) && 'to_json';
  })($nesting[0], null, $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Date');
    var $nesting = [self].concat($parent_nesting), $Date_to_json$16, $Date_as_json$17;
    Opal.def(self, '$to_json', $Date_to_json$16 = function $$to_json() {
      var self = this;
      return self.$to_s().$to_json();
    }, $Date_to_json$16.$$arity = 0);
    return (/* destroyed: TreeShaking#shake_methods/$as_json */0, nil) && 'as_json';
  })($nesting[0], null, $nesting);
};
Opal.modules["interscript/mapping"] = function(Opal) {
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("rambling-trie");
  if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {

  } else {
    nil;
  }
  ;
  self.$require("json");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Interscript');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Mapping');
      var $nesting = [self].concat($parent_nesting), $Mapping_initialize$1, $Mapping_for$2, $Mapping_load_and_serialize_system_mappings$3, $Mapping_system_code_file$4, $Mapping_default_path$5, $Mapping_load_system_mappings$6, $Mapping_load_opal_mappings$7, $Mapping_load_fs_mappings$8, $Mapping_serialize_system_mappings$9, $Mapping_include_inherited_mappings$10, $Mapping_build_hashes$12, $Mapping_build_trie$15;
      self.$$prototype.default_path = self.$$prototype.characters = nil;
      self.$attr_reader("id", "url", "name", "notes", "rules", "tests", "language", "postrules", "characters", "description", "authority_id", "creation_date", "source_script", "destination_script", "chain", "character_separator", "word_separator", "title_case", "downcase", "dictionary", "characters_hash", "dictionary_hash", "segmentation", "transcription", "dictionary_trie");
      Opal.def(self, '$initialize', $Mapping_initialize$1 = function $$initialize(system_code, options) {
        var self = this;
        if(options == null) {
          options = $hash2([], { });
        }
        ;
        self.system_code = system_code;
        self.depth = options.$fetch("depth", 0).$to_i();
        if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {

        } else {
          nil;
        }
        ;
        return self.$load_and_serialize_system_mappings();
      }, $Mapping_initialize$1.$$arity = -2);
      Opal.defs(self, '$for', $Mapping_for$2 = function(system_code, options) {
        var self = this;
        if(options == null) {
          options = $hash2([], { });
        }
        ;
        return self.$new(system_code, options);
      }, $Mapping_for$2.$$arity = -2);
      Opal.def(self, '$load_and_serialize_system_mappings', $Mapping_load_and_serialize_system_mappings$3 = function $$load_and_serialize_system_mappings() {
        var self = this, mappings = nil;
        if($truthy($rb_ge(self.$depth(), 5))) {
          return nil;
        }
        ;
        mappings = self.$load_system_mappings();
        return self.$serialize_system_mappings(mappings);
      }, $Mapping_load_and_serialize_system_mappings$3.$$arity = 0);
      self.$private();
      self.$attr_reader("depth", "system_code", "system_path");
      /* destroyed: TreeShaking#shake_methods/$system_code_file */0;
      /* destroyed: TreeShaking#shake_methods/$default_path */0;
      Opal.def(self, '$load_system_mappings', $Mapping_load_system_mappings$6 = function $$load_system_mappings() {
        var self = this;
        if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
          return self.$load_opal_mappings();
        } else {
          return nil;
        }
      }, $Mapping_load_system_mappings$6.$$arity = 0);
      Opal.def(self, '$load_opal_mappings', $Mapping_load_opal_mappings$7 = function $$load_opal_mappings() {
        var self = this;
        return $$($nesting, 'JSON').$parse(Opal.global.InterscriptMaps[self.$system_code()]);
      }, $Mapping_load_opal_mappings$7.$$arity = 0);
      /* destroyed: TreeShaking#shake_methods/$load_fs_mappings */0;
      Opal.def(self, '$serialize_system_mappings', $Mapping_serialize_system_mappings$9 = function $$serialize_system_mappings(mappings) {
        var $a, self = this;
        self.id = mappings.$fetch("id", nil);
        self.url = mappings.$fetch("url", nil);
        self.name = mappings.$fetch("name", nil);
        self.notes = mappings.$fetch("notes", nil);
        self.tests = mappings.$fetch("tests", []);
        self.language = mappings.$fetch("language", nil);
        self.description = mappings.$fetch("description", nil);
        self.authority_id = mappings.$fetch("authority_id", nil);
        self.creation_date = mappings.$fetch("creation_date", nil);
        self.source_script = mappings.$fetch("source_script", nil);
        self.destination_script = mappings.$fetch("destination_script", nil);
        self.chain = mappings.$fetch("chain", []);
        self.character_separator = ($truthy($a = mappings['$[]']("map")['$[]']("character_separator")) ? $a : nil);
        self.word_separator = ($truthy($a = mappings['$[]']("map")['$[]']("word_separator")) ? $a : nil);
        self.title_case = ($truthy($a = mappings['$[]']("map")['$[]']("title_case")) ? $a : false);
        self.downcase = ($truthy($a = mappings['$[]']("map")['$[]']("downcase")) ? $a : false);
        self.rules = ($truthy($a = mappings['$[]']("map")['$[]']("rules")) ? $a : []);
        self.postrules = ($truthy($a = mappings['$[]']("map")['$[]']("postrules")) ? $a : []);
        self.characters = ($truthy($a = mappings['$[]']("map")['$[]']("characters")) ? $a : $hash2([], { }));
        self.dictionary = ($truthy($a = mappings['$[]']("map")['$[]']("dictionary")) ? $a : $hash2([], { }));
        self.segmentation = ($truthy($a = mappings['$[]']("map")['$[]']("segementation")) ? $a : nil);
        self.transcription = ($truthy($a = mappings['$[]']("map")['$[]']("transcription")) ? $a : nil);
        self.$include_inherited_mappings(mappings);
        self.$build_hashes();
        return self.$build_trie();
      }, $Mapping_serialize_system_mappings$9.$$arity = 1);
      Opal.def(self, '$include_inherited_mappings', $Mapping_include_inherited_mappings$10 = function $$include_inherited_mappings(mappings) {
        var $$11, self = this, inherit_systems = nil;
        inherit_systems = [].$push(mappings['$[]']("map")['$[]']("inherit")).$flatten();
        $send(inherit_systems, 'each', [], ($$11 = function(inherit_system) {
          var self = $$11.$$s || this, $a, inherited_mapping = nil;
          if(inherit_system == null) {
            inherit_system = nil;
          }
          ;
          if($truthy(inherit_system)) {

          } else {
            return nil;
          }
          ;
          inherited_mapping = $$($nesting, 'Mapping').$for(inherit_system, $hash2(["depth"], {
            "depth": $rb_plus(self.$depth(), 1)
}));
          self.rules = [self.$rules(), inherited_mapping.$rules()].$flatten();
          self.postrules = [inherited_mapping.$postrules(), self.$postrules()].$flatten();
          self.characters = ($truthy($a = inherited_mapping.$characters()) ? $a : $hash2([], { })).$merge(self.$characters());
          return (self.dictionary = ($truthy($a = inherited_mapping.$dictionary()) ? $a : $hash2([], { })).$merge(self.$dictionary()));
        }, $$11.$$s = self, $$11.$$arity = 1, $$11));
        return self.characters['$compact!']();
      }, $Mapping_include_inherited_mappings$10.$$arity = 1);
      Opal.def(self, '$build_hashes', $Mapping_build_hashes$12 = function $$build_hashes() {
        var $a, $$13, $b, $c, $d, $$14, $e, $f, self = this;
        self.characters_hash = ($c = ($b = ($a = self.$characters(), ($a === nil || $a == null) ? nil : $send($a, 'sort_by', [], ($$13 = function(k, _v) {
          var self = $$13.$$s || this;
          if(k == null) {
            k = nil;
          }
          ;
          if(_v == null) {
            _v = nil;
          }
          ;
          return k.$size();
        }, $$13.$$s = self, $$13.$$arity = 2, $$13))), ($b === nil || $b == null) ? nil : $send($b, 'reverse', [])), ($c === nil || $c == null) ? nil : $send($c, 'to_h', []));
        return (self.dictionary_hash = ($f = ($e = ($d = self.$dictionary(), ($d === nil || $d == null) ? nil : $send($d, 'sort_by', [], ($$14 = function(k, _v) {
          var self = $$14.$$s || this;
          if(k == null) {
            k = nil;
          }
          ;
          if(_v == null) {
            _v = nil;
          }
          ;
          return k.$size();
        }, $$14.$$s = self, $$14.$$arity = 2, $$14))), ($e === nil || $e == null) ? nil : $send($e, 'reverse', [])), ($f === nil || $f == null) ? nil : $send($f, 'to_h', [])));
      }, $Mapping_build_hashes$12.$$arity = 0);
      return (Opal.def(self, '$build_trie', $Mapping_build_trie$15 = function $$build_trie() {
        var self = this;
        self.dictionary_trie = $$$($$($nesting, 'Rambling'), 'Trie').$create();
        return self.$dictionary_trie().$concat(self.$dictionary().$keys());
      }, $Mapping_build_trie$15.$$arity = 0), nil) && 'build_trie';
    })($nesting[0], null, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["onigmo/constants"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Onigmo');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Constants');
      var $nesting = [self].concat($parent_nesting);
      Opal.const_set($nesting[0], 'ONIGMO_VERSION_MAJOR', 6);
      Opal.const_set($nesting[0], 'ONIGMO_VERSION_MINOR', 2);
      Opal.const_set($nesting[0], 'ONIGMO_VERSION_TEENY', 0);
      Opal.const_set($nesting[0], 'OnigCodePointMaskWidth', 3);
      Opal.const_set($nesting[0], 'OnigCodePointMask', $rb_minus((1)['$<<']($$($nesting, 'OnigCodePointMaskWidth')), 1));
      Opal.const_set($nesting[0], 'OnigSpecialIndexShift', 3);
      Opal.const_set($nesting[0], 'OnigSpecialIndexWidth', 10);
      Opal.const_set($nesting[0], 'ONIGENC_CASE_UPCASE', (1)['$<<'](13));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_DOWNCASE', (1)['$<<'](14));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_TITLECASE', (1)['$<<'](15));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_SPECIAL_OFFSET', 3);
      Opal.const_set($nesting[0], 'ONIGENC_CASE_UP_SPECIAL', (1)['$<<'](16));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_DOWN_SPECIAL', (1)['$<<'](17));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_MODIFIED', (1)['$<<'](18));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_FOLD', (1)['$<<'](19));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_FOLD_TURKISH_AZERI', (1)['$<<'](20));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_FOLD_LITHUANIAN', (1)['$<<'](21));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_ASCII_ONLY', (1)['$<<'](22));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_IS_TITLECASE', (1)['$<<'](23));
      Opal.const_set($nesting[0], 'INTERNAL_ONIGENC_CASE_FOLD_MULTI_CHAR', (1)['$<<'](30));
      Opal.const_set($nesting[0], 'ONIGENC_CASE_FOLD_MIN', $$($nesting, 'INTERNAL_ONIGENC_CASE_FOLD_MULTI_CHAR'));
      Opal.const_set($nesting[0], 'ONIGENC_MAX_COMP_CASE_FOLD_CODE_LEN', 3);
      Opal.const_set($nesting[0], 'ONIGENC_GET_CASE_FOLD_CODES_MAX_NUM', 13);
      Opal.const_set($nesting[0], 'ONIGENC_CODE_TO_MBC_MAXLEN', 7);
      Opal.const_set($nesting[0], 'ONIGENC_MBC_CASE_FOLD_MAXLEN', 18);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_NEWLINE', 0);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_ALPHA', 1);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_BLANK', 2);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_CNTRL', 3);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_DIGIT', 4);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_GRAPH', 5);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_LOWER', 6);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_PRINT', 7);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_PUNCT', 8);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_SPACE', 9);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_UPPER', 10);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_XDIGIT', 11);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_WORD', 12);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_ALNUM', 13);
      Opal.const_set($nesting[0], 'ONIGENC_CTYPE_ASCII', 14);
      Opal.const_set($nesting[0], 'ONIGENC_MAX_STD_CTYPE', $$($nesting, 'ONIGENC_CTYPE_ASCII'));
      Opal.const_set($nesting[0], 'ONIGENC_FLAG_NONE', 0);
      Opal.const_set($nesting[0], 'ONIGENC_FLAG_UNICODE', 1);
      Opal.const_set($nesting[0], 'ONIG_NREGION', 10);
      Opal.const_set($nesting[0], 'ONIG_MAX_CAPTURE_GROUP_NUM', 32767);
      Opal.const_set($nesting[0], 'ONIG_MAX_BACKREF_NUM', 1000);
      Opal.const_set($nesting[0], 'ONIG_MAX_REPEAT_NUM', 100000);
      Opal.const_set($nesting[0], 'ONIG_MAX_MULTI_BYTE_RANGES_NUM', 10000);
      Opal.const_set($nesting[0], 'ONIG_MAX_ERROR_MESSAGE_LEN', 90);
      Opal.const_set($nesting[0], 'ONIG_OPTION_NONE', 0);
      Opal.const_set($nesting[0], 'ONIG_OPTION_IGNORECASE', 1);
      Opal.const_set($nesting[0], 'ONIG_OPTION_EXTEND', $$($nesting, 'ONIG_OPTION_IGNORECASE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_MULTILINE', $$($nesting, 'ONIG_OPTION_EXTEND')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_DOTALL', $$($nesting, 'ONIG_OPTION_MULTILINE'));
      Opal.const_set($nesting[0], 'ONIG_OPTION_SINGLELINE', $$($nesting, 'ONIG_OPTION_MULTILINE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_FIND_LONGEST', $$($nesting, 'ONIG_OPTION_SINGLELINE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_FIND_NOT_EMPTY', $$($nesting, 'ONIG_OPTION_FIND_LONGEST')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NEGATE_SINGLELINE', $$($nesting, 'ONIG_OPTION_FIND_NOT_EMPTY')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_DONT_CAPTURE_GROUP', $$($nesting, 'ONIG_OPTION_NEGATE_SINGLELINE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_CAPTURE_GROUP', $$($nesting, 'ONIG_OPTION_DONT_CAPTURE_GROUP')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NOTBOL', $$($nesting, 'ONIG_OPTION_CAPTURE_GROUP')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NOTEOL', $$($nesting, 'ONIG_OPTION_NOTBOL')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NOTBOS', $$($nesting, 'ONIG_OPTION_NOTEOL')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NOTEOS', $$($nesting, 'ONIG_OPTION_NOTBOS')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_ASCII_RANGE', $$($nesting, 'ONIG_OPTION_NOTEOS')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_POSIX_BRACKET_ALL_RANGE', $$($nesting, 'ONIG_OPTION_ASCII_RANGE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_WORD_BOUND_ALL_RANGE', $$($nesting, 'ONIG_OPTION_POSIX_BRACKET_ALL_RANGE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_NEWLINE_CRLF', $$($nesting, 'ONIG_OPTION_WORD_BOUND_ALL_RANGE')['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_OPTION_MAXBIT', $$($nesting, 'ONIG_OPTION_NEWLINE_CRLF'));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_VARIABLE_META_CHARACTERS', (1)['$<<'](0));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_DOT_ANYCHAR', (1)['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ASTERISK_ZERO_INF', (1)['$<<'](2));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_ASTERISK_ZERO_INF', (1)['$<<'](3));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_PLUS_ONE_INF', (1)['$<<'](4));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_PLUS_ONE_INF', (1)['$<<'](5));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_QMARK_ZERO_ONE', (1)['$<<'](6));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_QMARK_ZERO_ONE', (1)['$<<'](7));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_BRACE_INTERVAL', (1)['$<<'](8));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_BRACE_INTERVAL', (1)['$<<'](9));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_VBAR_ALT', (1)['$<<'](10));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_VBAR_ALT', (1)['$<<'](11));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_LPAREN_SUBEXP', (1)['$<<'](12));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_LPAREN_SUBEXP', (1)['$<<'](13));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_AZ_BUF_ANCHOR', (1)['$<<'](14));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_CAPITAL_G_BEGIN_ANCHOR', (1)['$<<'](15));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_DECIMAL_BACKREF', (1)['$<<'](16));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_BRACKET_CC', (1)['$<<'](17));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_W_WORD', (1)['$<<'](18));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_LTGT_WORD_BEGIN_END', (1)['$<<'](19));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_B_WORD_BOUND', (1)['$<<'](20));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_S_WHITE_SPACE', (1)['$<<'](21));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_D_DIGIT', (1)['$<<'](22));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_LINE_ANCHOR', (1)['$<<'](23));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_POSIX_BRACKET', (1)['$<<'](24));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_QMARK_NON_GREEDY', (1)['$<<'](25));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_CONTROL_CHARS', (1)['$<<'](26));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_C_CONTROL', (1)['$<<'](27));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_OCTAL3', (1)['$<<'](28));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_X_HEX2', (1)['$<<'](29));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_X_BRACE_HEX8', (1)['$<<'](30));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP_ESC_O_BRACE_OCTAL', (1)['$<<'](31));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_Q_QUOTE', (1)['$<<'](0));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_GROUP_EFFECT', (1)['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_OPTION_PERL', (1)['$<<'](2));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_OPTION_RUBY', (1)['$<<'](3));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_PLUS_POSSESSIVE_REPEAT', (1)['$<<'](4));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_PLUS_POSSESSIVE_INTERVAL', (1)['$<<'](5));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_CCLASS_SET_OP', (1)['$<<'](6));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_LT_NAMED_GROUP', (1)['$<<'](7));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_K_NAMED_BACKREF', (1)['$<<'](8));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_G_SUBEXP_CALL', (1)['$<<'](9));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ATMARK_CAPTURE_HISTORY', (1)['$<<'](10));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_C_BAR_CONTROL', (1)['$<<'](11));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_M_BAR_META', (1)['$<<'](12));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_V_VTAB', (1)['$<<'](13));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_U_HEX4', (1)['$<<'](14));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_GNU_BUF_ANCHOR', (1)['$<<'](15));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_P_BRACE_CHAR_PROPERTY', (1)['$<<'](16));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_P_BRACE_CIRCUMFLEX_NOT', (1)['$<<'](17));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_H_XDIGIT', (1)['$<<'](19));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_INEFFECTIVE_ESCAPE', (1)['$<<'](20));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_R_LINEBREAK', (1)['$<<'](21));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_X_EXTENDED_GRAPHEME_CLUSTER', (1)['$<<'](22));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_V_VERTICAL_WHITESPACE', (1)['$<<'](23));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_H_HORIZONTAL_WHITESPACE', (1)['$<<'](24));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_CAPITAL_K_KEEP', (1)['$<<'](25));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_ESC_G_BRACE_BACKREF', (1)['$<<'](26));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_SUBEXP_CALL', (1)['$<<'](27));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_VBAR_BRANCH_RESET', (1)['$<<'](28));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_LPAREN_CONDITION', (1)['$<<'](29));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_CAPITAL_P_NAMED_GROUP', (1)['$<<'](30));
      Opal.const_set($nesting[0], 'ONIG_SYN_OP2_QMARK_TILDE_ABSENT', (1)['$<<'](31));
      Opal.const_set($nesting[0], 'ONIG_SYN_CONTEXT_INDEP_ANCHORS', (1)['$<<'](31));
      Opal.const_set($nesting[0], 'ONIG_SYN_CONTEXT_INDEP_REPEAT_OPS', (1)['$<<'](0));
      Opal.const_set($nesting[0], 'ONIG_SYN_CONTEXT_INVALID_REPEAT_OPS', (1)['$<<'](1));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_UNMATCHED_CLOSE_SUBEXP', (1)['$<<'](2));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_INVALID_INTERVAL', (1)['$<<'](3));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_INTERVAL_LOW_ABBREV', (1)['$<<'](4));
      Opal.const_set($nesting[0], 'ONIG_SYN_STRICT_CHECK_BACKREF', (1)['$<<'](5));
      Opal.const_set($nesting[0], 'ONIG_SYN_DIFFERENT_LEN_ALT_LOOK_BEHIND', (1)['$<<'](6));
      Opal.const_set($nesting[0], 'ONIG_SYN_CAPTURE_ONLY_NAMED_GROUP', (1)['$<<'](7));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_MULTIPLEX_DEFINITION_NAME', (1)['$<<'](8));
      Opal.const_set($nesting[0], 'ONIG_SYN_FIXED_INTERVAL_IS_GREEDY_ONLY', (1)['$<<'](9));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_MULTIPLEX_DEFINITION_NAME_CALL', (1)['$<<'](10));
      Opal.const_set($nesting[0], 'ONIG_SYN_USE_LEFT_MOST_NAMED_GROUP', (1)['$<<'](11));
      Opal.const_set($nesting[0], 'ONIG_SYN_NOT_NEWLINE_IN_NEGATIVE_CC', (1)['$<<'](20));
      Opal.const_set($nesting[0], 'ONIG_SYN_BACKSLASH_ESCAPE_IN_CC', (1)['$<<'](21));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_EMPTY_RANGE_IN_CC', (1)['$<<'](22));
      Opal.const_set($nesting[0], 'ONIG_SYN_ALLOW_DOUBLE_RANGE_OP_IN_CC', (1)['$<<'](23));
      Opal.const_set($nesting[0], 'ONIG_SYN_WARN_CC_OP_NOT_ESCAPED', (1)['$<<'](24));
      Opal.const_set($nesting[0], 'ONIG_SYN_WARN_REDUNDANT_NESTED_REPEAT', (1)['$<<'](25));
      Opal.const_set($nesting[0], 'ONIG_SYN_WARN_CC_DUP', (1)['$<<'](26));
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ESCAPE', 0);
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ANYCHAR', 1);
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ANYTIME', 2);
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ZERO_OR_ONE_TIME', 3);
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ONE_OR_MORE_TIME', 4);
      Opal.const_set($nesting[0], 'ONIG_META_CHAR_ANYCHAR_ANYTIME', 5);
      Opal.const_set($nesting[0], 'ONIG_INEFFECTIVE_META_CHAR', 0);
      Opal.const_set($nesting[0], 'ONIG_NORMAL', 0);
      Opal.const_set($nesting[0], 'ONIG_MISMATCH', -1);
      Opal.const_set($nesting[0], 'ONIG_NO_SUPPORT_CONFIG', -2);
      Opal.const_set($nesting[0], 'ONIGERR_MEMORY', -5);
      Opal.const_set($nesting[0], 'ONIGERR_TYPE_BUG', -6);
      Opal.const_set($nesting[0], 'ONIGERR_PARSER_BUG', -11);
      Opal.const_set($nesting[0], 'ONIGERR_STACK_BUG', -12);
      Opal.const_set($nesting[0], 'ONIGERR_UNDEFINED_BYTECODE', -13);
      Opal.const_set($nesting[0], 'ONIGERR_UNEXPECTED_BYTECODE', -14);
      Opal.const_set($nesting[0], 'ONIGERR_MATCH_STACK_LIMIT_OVER', -15);
      Opal.const_set($nesting[0], 'ONIGERR_PARSE_DEPTH_LIMIT_OVER', -16);
      Opal.const_set($nesting[0], 'ONIGERR_DEFAULT_ENCODING_IS_NOT_SET', -21);
      Opal.const_set($nesting[0], 'ONIGERR_SPECIFIED_ENCODING_CANT_CONVERT_TO_WIDE_CHAR', -22);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_ARGUMENT', -30);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_AT_LEFT_BRACE', -100);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_AT_LEFT_BRACKET', -101);
      Opal.const_set($nesting[0], 'ONIGERR_EMPTY_CHAR_CLASS', -102);
      Opal.const_set($nesting[0], 'ONIGERR_PREMATURE_END_OF_CHAR_CLASS', -103);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_AT_ESCAPE', -104);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_AT_META', -105);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_AT_CONTROL', -106);
      Opal.const_set($nesting[0], 'ONIGERR_META_CODE_SYNTAX', -108);
      Opal.const_set($nesting[0], 'ONIGERR_CONTROL_CODE_SYNTAX', -109);
      Opal.const_set($nesting[0], 'ONIGERR_CHAR_CLASS_VALUE_AT_END_OF_RANGE', -110);
      Opal.const_set($nesting[0], 'ONIGERR_CHAR_CLASS_VALUE_AT_START_OF_RANGE', -111);
      Opal.const_set($nesting[0], 'ONIGERR_UNMATCHED_RANGE_SPECIFIER_IN_CHAR_CLASS', -112);
      Opal.const_set($nesting[0], 'ONIGERR_TARGET_OF_REPEAT_OPERATOR_NOT_SPECIFIED', -113);
      Opal.const_set($nesting[0], 'ONIGERR_TARGET_OF_REPEAT_OPERATOR_INVALID', -114);
      Opal.const_set($nesting[0], 'ONIGERR_NESTED_REPEAT_OPERATOR', -115);
      Opal.const_set($nesting[0], 'ONIGERR_UNMATCHED_CLOSE_PARENTHESIS', -116);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_WITH_UNMATCHED_PARENTHESIS', -117);
      Opal.const_set($nesting[0], 'ONIGERR_END_PATTERN_IN_GROUP', -118);
      Opal.const_set($nesting[0], 'ONIGERR_UNDEFINED_GROUP_OPTION', -119);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_POSIX_BRACKET_TYPE', -121);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_LOOK_BEHIND_PATTERN', -122);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_REPEAT_RANGE_PATTERN', -123);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_CONDITION_PATTERN', -124);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_BIG_NUMBER', -200);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_BIG_NUMBER_FOR_REPEAT_RANGE', -201);
      Opal.const_set($nesting[0], 'ONIGERR_UPPER_SMALLER_THAN_LOWER_IN_REPEAT_RANGE', -202);
      Opal.const_set($nesting[0], 'ONIGERR_EMPTY_RANGE_IN_CHAR_CLASS', -203);
      Opal.const_set($nesting[0], 'ONIGERR_MISMATCH_CODE_LENGTH_IN_CLASS_RANGE', -204);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_MANY_MULTI_BYTE_RANGES', -205);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_SHORT_MULTI_BYTE_STRING', -206);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_BIG_BACKREF_NUMBER', -207);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_BACKREF', -208);
      Opal.const_set($nesting[0], 'ONIGERR_NUMBERED_BACKREF_OR_CALL_NOT_ALLOWED', -209);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_MANY_CAPTURE_GROUPS', -210);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_SHORT_DIGITS', -211);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_LONG_WIDE_CHAR_VALUE', -212);
      Opal.const_set($nesting[0], 'ONIGERR_EMPTY_GROUP_NAME', -214);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_GROUP_NAME', -215);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_CHAR_IN_GROUP_NAME', -216);
      Opal.const_set($nesting[0], 'ONIGERR_UNDEFINED_NAME_REFERENCE', -217);
      Opal.const_set($nesting[0], 'ONIGERR_UNDEFINED_GROUP_REFERENCE', -218);
      Opal.const_set($nesting[0], 'ONIGERR_MULTIPLEX_DEFINED_NAME', -219);
      Opal.const_set($nesting[0], 'ONIGERR_MULTIPLEX_DEFINITION_NAME_CALL', -220);
      Opal.const_set($nesting[0], 'ONIGERR_NEVER_ENDING_RECURSION', -221);
      Opal.const_set($nesting[0], 'ONIGERR_GROUP_NUMBER_OVER_FOR_CAPTURE_HISTORY', -222);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_CHAR_PROPERTY_NAME', -223);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_CODE_POINT_VALUE', -400);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_WIDE_CHAR_VALUE', -400);
      Opal.const_set($nesting[0], 'ONIGERR_TOO_BIG_WIDE_CHAR_VALUE', -401);
      Opal.const_set($nesting[0], 'ONIGERR_NOT_SUPPORTED_ENCODING_COMBINATION', -402);
      Opal.const_set($nesting[0], 'ONIGERR_INVALID_COMBINATION_OF_OPTIONS', -403);
      Opal.const_set($nesting[0], 'ONIG_MAX_CAPTURE_HISTORY_GROUP', 31);
      Opal.const_set($nesting[0], 'ONIG_TRAVERSE_CALLBACK_AT_FIRST', 1);
      Opal.const_set($nesting[0], 'ONIG_TRAVERSE_CALLBACK_AT_LAST', 2);
      Opal.const_set($nesting[0], 'ONIG_REGION_NOTPOS', -1);
      Opal.const_set($nesting[0], 'ONIG_CHAR_TABLE_SIZE', 256);
      Opal.const_set($nesting[0], 'ONIG_OPTION_DEFAULT', $$($nesting, 'ONIG_OPTION_NONE'));
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["ffi/types"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $hash2 = Opal.hash2, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'FFI');
    var $nesting = [self].concat($parent_nesting), $FFI_typedef$52, $FFI_add_typedef$53, $FFI_find_type$54, $FFI_type_size$55;
    Opal.const_set($nesting[0], 'TypeDefs', $hash2([], { }));
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Type');
      var $nesting = [self].concat($parent_nesting), $Type_alignment$1, $Type_$$$51;
      Opal.defs(self, '$alignment', $Type_alignment$1 = function $$alignment() {
        var self = this;
        return self.$size();
      }, $Type_alignment$1.$$arity = 0);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Numeric');
        var $nesting = [self].concat($parent_nesting), $Numeric_signed$2, $Numeric_pack$3, $Numeric_unpack$4;
        Opal.defs(self, '$signed', $Numeric_signed$2 = function $$signed() {
          var self = this;
          return false;
        }, $Numeric_signed$2.$$arity = 0);
        Opal.defs(self, '$pack', $Numeric_pack$3 = function $$pack(x) {
          var self = this;
          return [x].$pack(self.$packformat()).$b();
        }, $Numeric_pack$3.$$arity = 1);
        return (Opal.defs(self, '$unpack', $Numeric_unpack$4 = function $$unpack(x) {
          var self = this;
          return x.$unpack(self.$packformat().$b()).$first();
        }, $Numeric_unpack$4.$$arity = 1), nil) && 'unpack';
      })($nesting[0], self, $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Integer');
        var $nesting = [self].concat($parent_nesting), $Integer_from_native$5, $Integer_to_native$6, $Integer_packformat$7;
        Opal.defs(self, '$from_native', $Integer_from_native$5 = function $$from_native(x) {
          var self = this;
          return x.$to_i();
        }, $Integer_from_native$5.$$arity = 1);
        Opal.defs(self, '$to_native', $Integer_to_native$6 = function $$to_native(x) {
          var self = this;
          return x.$to_i();
        }, $Integer_to_native$6.$$arity = 1);
        return (Opal.defs(self, '$packformat', $Integer_packformat$7 = function $$packformat() {
          var self = this, $case = nil;
          return (function() {
            $case = self.$size();
            if((1)['$===']($case)) {
              if($truthy(self.$signed())) {
                return "c";
              } else {
                return "C";
              }
            } else if((2)['$===']($case)) {
              if($truthy(self.$signed())) {
                return "s<";
              } else {
                return "S<";
              }
            } else if((4)['$===']($case)) {
              if($truthy(self.$signed())) {
                return "l<";
              } else {
                return "L<";
              }
            } else if((8)['$===']($case)) {
              if($truthy(self.$signed())) {
                return "q<";
              } else {
                return "Q<";
              }
            } else {
              return nil;
            }
          })();
        }, $Integer_packformat$7.$$arity = 0), nil) && 'packformat';
      })($nesting[0], $$($nesting, 'Numeric'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Float');
        var $nesting = [self].concat($parent_nesting), $Float_from_native$8, $Float_to_native$9, $Float_packformat$10;
        Opal.defs(self, '$from_native', $Float_from_native$8 = function $$from_native(x) {
          var self = this;
          return x.$to_f();
        }, $Float_from_native$8.$$arity = 1);
        Opal.defs(self, '$to_native', $Float_to_native$9 = function $$to_native(x) {
          var self = this;
          return x.$to_f();
        }, $Float_to_native$9.$$arity = 1);
        return (Opal.defs(self, '$packformat', $Float_packformat$10 = function $$packformat() {
          var self = this, $case = nil;
          return (function() {
            $case = self.$size();
            if((2)['$===']($case)) {
              return "e";
            } else if((4)['$===']($case)) {
              return "E";
            } else if((8)['$===']($case)) {
              return self.$raise($$($nesting, 'TypeError'), "We can't pack/unpack a long double unfortunately.");
            } else {
              return nil;
            }
          })();
        }, $Float_packformat$10.$$arity = 0), nil) && 'packformat';
      })($nesting[0], $$($nesting, 'Numeric'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'VOID');
        var $nesting = [self].concat($parent_nesting), $VOID_size$11, $VOID_from_native$12, $VOID_to_native$13, $VOID_pack$14, $VOID_unpack$15;
        Opal.defs(self, '$size', $VOID_size$11 = function $$size() {
          var self = this;
          return 1;
        }, $VOID_size$11.$$arity = 0);
        Opal.defs(self, '$from_native', $VOID_from_native$12 = function $$from_native(x) {
          var self = this;
          return nil;
        }, $VOID_from_native$12.$$arity = 1);
        Opal.defs(self, '$to_native', $VOID_to_native$13 = function $$to_native(x) {
          var self = this;
          return self.$raise($$($nesting, 'TypeError'), "Can't convert VOID to a native value");
        }, $VOID_to_native$13.$$arity = 1);
        Opal.defs(self, '$pack', $VOID_pack$14 = function $$pack(x) {
          var self = this;
          return "";
        }, $VOID_pack$14.$$arity = 1);
        return (Opal.defs(self, '$unpack', $VOID_unpack$15 = function $$unpack(x) {
          var self = this;
          return nil;
        }, $VOID_unpack$15.$$arity = 1), nil) && 'unpack';
      })($nesting[0], self, $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'BOOL');
        var $nesting = [self].concat($parent_nesting), $BOOL_size$16, $BOOL_from_native$17, $BOOL_to_native$18, $BOOL_pack$19, $BOOL_unpack$20;
        Opal.defs(self, '$size', $BOOL_size$16 = function $$size() {
          var self = this;
          return 1;
        }, $BOOL_size$16.$$arity = 0);
        Opal.defs(self, '$from_native', $BOOL_from_native$17 = function $$from_native(x) {
          var self = this;
          return x['$!']()['$!']();
        }, $BOOL_from_native$17.$$arity = 1);
        Opal.defs(self, '$to_native', $BOOL_to_native$18 = function $$to_native(x) {
          var self = this;
          if($truthy(x)) {
            return 1;
          } else {
            return 0;
          }
        }, $BOOL_to_native$18.$$arity = 1);
        Opal.defs(self, '$pack', $BOOL_pack$19 = function $$pack(x) {
          var self = this;
          if($truthy(x)) {
            return "\u0001";
          } else {
            return "\u0000";
          }
        }, $BOOL_pack$19.$$arity = 1);
        return (Opal.defs(self, '$unpack', $BOOL_unpack$20 = function $$unpack(x) {
          var self = this;
          return x['$!=']("\u0000");
        }, $BOOL_unpack$20.$$arity = 1), nil) && 'unpack';
      })($nesting[0], self, $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'POINTER');
        var $nesting = [self].concat($parent_nesting), $POINTER_size$21, $POINTER_from_native_mem$22, $POINTER_to_native$23;
        Opal.defs(self, '$size', $POINTER_size$21 = function $$size() {
          var self = this;
          return 4;
        }, $POINTER_size$21.$$arity = 0);
        Opal.defs(self, '$from_native_mem', $POINTER_from_native_mem$22 = function $$from_native_mem(x, memory) {
          var self = this;
          return $$($nesting, 'Pointer').$new([memory, x]);
        }, $POINTER_from_native_mem$22.$$arity = 2);
        return (Opal.defs(self, '$to_native', $POINTER_to_native$23 = function $$to_native(x) {
          var self = this;
          if($truthy(x['$!']())) {
            return 0;
          } else if($truthy(x['$respond_to?']("value"))) {
            return x.$value();
          } else if($truthy(x['$respond_to?']("address"))) {
            return x.$address();
          } else if($truthy(x['$respond_to?']("to_int"))) {
            return x.$to_int();
          } else if($truthy(x['$respond_to?']("to_str"))) {
            return $$$($$($nesting, 'FFI'), 'Pointer').$from_string(x.$to_str()).$address();
          } else {
            return self.$raise($$($nesting, 'ArgumentError'), "" + "Wrong argument " + (x) + " can't be coerced to a pointer.");
          }
        }, $POINTER_to_native$23.$$arity = 1), nil) && 'to_native';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'WrappedStruct');
        var $nesting = [self].concat($parent_nesting), $WrappedStruct_alignment$24, $WrappedStruct_size$25, $WrappedStruct_pack$26, $WrappedStruct_unpack$27, $WrappedStruct_initialize$28, $WrappedStruct_from_native_mem$29, $WrappedStruct_to_native$30;
        self.$$prototype.struct = nil;
        Opal.def(self, '$alignment', $WrappedStruct_alignment$24 = function $$alignment() {
          var self = this;
          return $$$($$$($$($nesting, 'FFI'), 'Type'), 'POINTER').$alignment();
        }, $WrappedStruct_alignment$24.$$arity = 0);
        Opal.def(self, '$size', $WrappedStruct_size$25 = function $$size() {
          var self = this;
          return $$$($$$($$($nesting, 'FFI'), 'Type'), 'POINTER').$size();
        }, $WrappedStruct_size$25.$$arity = 0);
        Opal.def(self, '$pack', $WrappedStruct_pack$26 = function $$pack(x) {
          var self = this;
          return $$$($$$($$($nesting, 'FFI'), 'Type'), 'POINTER').$pack(x);
        }, $WrappedStruct_pack$26.$$arity = 1);
        Opal.def(self, '$unpack', $WrappedStruct_unpack$27 = function $$unpack(x) {
          var self = this;
          return $$$($$$($$($nesting, 'FFI'), 'Type'), 'POINTER').$unpack(x);
        }, $WrappedStruct_unpack$27.$$arity = 1);
        Opal.def(self, '$initialize', $WrappedStruct_initialize$28 = function $$initialize(x) {
          var self = this;
          return (self.struct = x);
        }, $WrappedStruct_initialize$28.$$arity = 1);
        Opal.def(self, '$from_native_mem', $WrappedStruct_from_native_mem$29 = function $$from_native_mem(x, memory) {
          var self = this;
          return self.struct.$new($$$($$($nesting, 'FFI'), 'Pointer').$new([memory, x], self.struct));
        }, $WrappedStruct_from_native_mem$29.$$arity = 2);
        return (Opal.def(self, '$to_native', $WrappedStruct_to_native$30 = function $$to_native(x) {
          var self = this;
          return x.$pointer().$address();
        }, $WrappedStruct_to_native$30.$$arity = 1), nil) && 'to_native';
      })($nesting[0], self, $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'STRING');
        var $nesting = [self].concat($parent_nesting), $STRING_size$31, $STRING_from_native_mem$32, $STRING_to_native$33, $STRING_pack$34, $STRING_unpack$35;
        Opal.defs(self, '$size', $STRING_size$31 = function $$size() {
          var self = this;
          return 4;
        }, $STRING_size$31.$$arity = 0);
        Opal.defs(self, '$from_native_mem', $STRING_from_native_mem$32 = function $$from_native_mem(x, memory) {
          var self = this;
          return $$$($$($nesting, 'FFI'), 'Pointer').$new([memory, x]).$read_string();
        }, $STRING_from_native_mem$32.$$arity = 2);
        Opal.defs(self, '$to_native', $STRING_to_native$33 = function $$to_native(x) {
          var self = this;
          return $$$($$($nesting, 'FFI'), 'Pointer').$from_string(x).$address();
        }, $STRING_to_native$33.$$arity = 1);
        Opal.defs(self, '$pack', $STRING_pack$34 = function $$pack(x) {
          var self = this;
          return x.$to_s();
        }, $STRING_pack$34.$$arity = 1);
        return (Opal.defs(self, '$unpack', $STRING_unpack$35 = function $$unpack(x) {
          var self = this;
          return x.$to_s();
        }, $STRING_unpack$35.$$arity = 1), nil) && 'unpack';
      })($nesting[0], self, $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'CHAR');
        var $nesting = [self].concat($parent_nesting), $CHAR_size$36, $CHAR_signed$37;
        Opal.defs(self, '$size', $CHAR_size$36 = function $$size() {
          var self = this;
          return 1;
        }, $CHAR_size$36.$$arity = 0);
        return (Opal.defs(self, '$signed', $CHAR_signed$37 = function $$signed() {
          var self = this;
          return true;
        }, $CHAR_signed$37.$$arity = 0), nil) && 'signed';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UCHAR');
        var $nesting = [self].concat($parent_nesting), $UCHAR_size$38;
        return (Opal.defs(self, '$size', $UCHAR_size$38 = function $$size() {
          var self = this;
          return 1;
        }, $UCHAR_size$38.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'SHORT');
        var $nesting = [self].concat($parent_nesting), $SHORT_size$39, $SHORT_signed$40;
        Opal.defs(self, '$size', $SHORT_size$39 = function $$size() {
          var self = this;
          return 2;
        }, $SHORT_size$39.$$arity = 0);
        return (Opal.defs(self, '$signed', $SHORT_signed$40 = function $$signed() {
          var self = this;
          return true;
        }, $SHORT_signed$40.$$arity = 0), nil) && 'signed';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'USHORT');
        var $nesting = [self].concat($parent_nesting), $USHORT_size$41;
        return (Opal.defs(self, '$size', $USHORT_size$41 = function $$size() {
          var self = this;
          return 2;
        }, $USHORT_size$41.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'INT');
        var $nesting = [self].concat($parent_nesting), $INT_size$42, $INT_signed$43;
        Opal.defs(self, '$size', $INT_size$42 = function $$size() {
          var self = this;
          return 4;
        }, $INT_size$42.$$arity = 0);
        return (Opal.defs(self, '$signed', $INT_signed$43 = function $$signed() {
          var self = this;
          return true;
        }, $INT_signed$43.$$arity = 0), nil) && 'signed';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UINT');
        var $nesting = [self].concat($parent_nesting), $UINT_size$44;
        return (Opal.defs(self, '$size', $UINT_size$44 = function $$size() {
          var self = this;
          return 4;
        }, $UINT_size$44.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'LONG');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'INT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'ULONG');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'INT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'LONG_LONG');
        var $nesting = [self].concat($parent_nesting), $LONG_LONG_size$45, $LONG_LONG_signed$46;
        Opal.defs(self, '$size', $LONG_LONG_size$45 = function $$size() {
          var self = this;
          return 8;
        }, $LONG_LONG_size$45.$$arity = 0);
        return (Opal.defs(self, '$signed', $LONG_LONG_signed$46 = function $$signed() {
          var self = this;
          return true;
        }, $LONG_LONG_signed$46.$$arity = 0), nil) && 'signed';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'ULONG_LONG');
        var $nesting = [self].concat($parent_nesting), $ULONG_LONG_size$47;
        return (Opal.defs(self, '$size', $ULONG_LONG_size$47 = function $$size() {
          var self = this;
          return 8;
        }, $ULONG_LONG_size$47.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Integer'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'FLOAT');
        var $nesting = [self].concat($parent_nesting), $FLOAT_size$48;
        return (Opal.defs(self, '$size', $FLOAT_size$48 = function $$size() {
          var self = this;
          return 4;
        }, $FLOAT_size$48.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Float'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'DOUBLE');
        var $nesting = [self].concat($parent_nesting), $DOUBLE_size$49;
        return (Opal.defs(self, '$size', $DOUBLE_size$49 = function $$size() {
          var self = this;
          return 8;
        }, $DOUBLE_size$49.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Float'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'LONG_DOUBLE');
        var $nesting = [self].concat($parent_nesting), $LONG_DOUBLE_size$50;
        return (Opal.defs(self, '$size', $LONG_DOUBLE_size$50 = function $$size() {
          var self = this;
          return 16;
        }, $LONG_DOUBLE_size$50.$$arity = 0), nil) && 'size';
      })($nesting[0], $$($nesting, 'Float'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'INT8');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'CHAR'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UINT8');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'CHAR'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'INT16');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'SHORT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UINT16');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'USHORT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'INT32');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'INT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UINT32');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'UINT'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'INT64');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'LONG_LONG'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'UINT64');
        var $nesting = [self].concat($parent_nesting);
        return nil;
      })($nesting[0], $$($nesting, 'ULONG_LONG'), $nesting);
      return (Opal.defs(self, '$[]', $Type_$$$51 = function(name, purpose) {
        var self = this;
        if(purpose == null) {
          purpose = nil;
        }
        ;
        return $$($nesting, 'FFI').$find_type(name, $hash2(["purpose"], {
          "purpose": purpose
}));
      }, $Type_$$$51.$$arity = -2), nil) && '[]';
    })($nesting[0], null, $nesting);
    Opal.defs(self, '$typedef', $FFI_typedef$52 = function $$typedef(old, new$) {
      var self = this, $writer = nil;
      $writer = [new$, self.$find_type(old)];
      $send($$($nesting, 'TypeDefs'), '[]=', Opal.to_a($writer));
      return $writer[$rb_minus($writer["length"], 1)];
    }, $FFI_typedef$52.$$arity = 2);
    /* destroyed: TreeShaking#shake_methods/$add_typedef */0;
    Opal.defs(self, '$find_type', $FFI_find_type$54 = function $$find_type(name, $a, $b) {
      var $post_args, $kwargs, type_map, purpose, $c, $d, self = this;
      $post_args = Opal.slice.call(arguments, 1, arguments.length);
      $kwargs = Opal.extract_kwargs($post_args);
      if($kwargs == null) {
        $kwargs = $hash2([], { });
      } else if(!$kwargs.$$is_hash) {
        throw Opal.ArgumentError.$new('expected kwargs');
      }
      ;
      if($post_args.length > 0) {
        type_map = $post_args[0];
        $post_args.splice(0, 1);
      }
      if(type_map == null) {
        type_map = nil;
      }
      ;
      purpose = $kwargs.$$smap["purpose"];
      if(purpose == null) {
        purpose = nil;
      }
      ;
      if($truthy(($truthy($c = name['$is_a?']($$$($$($nesting, 'FFI'), 'Type'))) ? $c : ($truthy($d = name['$is_a?']($$($nesting, 'Class'))) ? $rb_le(name, $$$($$($nesting, 'FFI'), 'Type')) : $d)))) {
        return name;
      } else if($truthy(($truthy($c = type_map) ? type_map['$has_key?'](name) : $c))) {
        return type_map['$[]'](name);
      } else if($truthy($$($nesting, 'TypeDefs')['$has_key?'](name))) {
        return $$($nesting, 'TypeDefs')['$[]'](name);
      } else if($truthy(($truthy($c = name['$is_a?']($$($nesting, 'Class'))) ? $rb_le(name, $$$($$($nesting, 'FFI'), 'Struct')) : $c))) {
        if(purpose['$=='](nil)) {
          return $$$($$($nesting, 'Type'), 'WrappedStruct').$new(name);
        } else if(purpose['$==']("struct")) {
          return name;
        } else {
          return self.$raise($$($nesting, 'ArgumentError'), "" + "Wrong purpose provided. Can't resolve type '" + (name) + "'.");
        }
      } else {
        return self.$raise($$($nesting, 'TypeError'), "" + "unable to resolve type '" + (name) + "'");
      }
      ;
    }, $FFI_find_type$54.$$arity = -2);
    /* destroyed: TreeShaking#shake_methods/$type_size */0;
    self.$typedef($$$($$($nesting, 'Type'), 'VOID'), nil);
    self.$typedef($$$($$($nesting, 'Type'), 'VOID'), "void");
    self.$typedef($$$($$($nesting, 'Type'), 'BOOL'), "bool");
    self.$typedef($$$($$($nesting, 'Type'), 'CHAR'), "char");
    self.$typedef($$$($$($nesting, 'Type'), 'UCHAR'), "uchar");
    self.$typedef($$$($$($nesting, 'Type'), 'SHORT'), "short");
    self.$typedef($$$($$($nesting, 'Type'), 'USHORT'), "ushort");
    self.$typedef($$$($$($nesting, 'Type'), 'INT'), "int");
    self.$typedef($$$($$($nesting, 'Type'), 'UINT'), "uint");
    self.$typedef($$$($$($nesting, 'Type'), 'LONG'), "long");
    self.$typedef($$$($$($nesting, 'Type'), 'ULONG'), "ulong");
    self.$typedef($$$($$($nesting, 'Type'), 'LONG_LONG'), "long_long");
    self.$typedef($$$($$($nesting, 'Type'), 'ULONG_LONG'), "ulong_long");
    self.$typedef($$$($$($nesting, 'Type'), 'FLOAT'), "float");
    self.$typedef($$$($$($nesting, 'Type'), 'DOUBLE'), "double");
    self.$typedef($$$($$($nesting, 'Type'), 'LONG_DOUBLE'), "long_double");
    self.$typedef($$$($$($nesting, 'Type'), 'INT8'), "int8");
    self.$typedef($$$($$($nesting, 'Type'), 'UINT8'), "uint8");
    self.$typedef($$$($$($nesting, 'Type'), 'INT16'), "int16");
    self.$typedef($$$($$($nesting, 'Type'), 'UINT16'), "uint16");
    self.$typedef($$$($$($nesting, 'Type'), 'INT32'), "int32");
    self.$typedef($$$($$($nesting, 'Type'), 'UINT32'), "uint32");
    self.$typedef($$$($$($nesting, 'Type'), 'INT64'), "int64");
    self.$typedef($$$($$($nesting, 'Type'), 'UINT64'), "uint64");
    self.$typedef($$$($$($nesting, 'Type'), 'POINTER'), "pointer");
    self.$typedef($$$($$($nesting, 'Type'), 'STRING'), "string");
    self.$typedef("uint8", "byte");
    self.$typedef("long", "size_t");
    self.$typedef("pointer", "buffer_in");
    self.$typedef("pointer", "buffer_out");
    self.$typedef("pointer", "buffer_inout");
  })($nesting[0], $nesting);
};
Opal.modules["ffi/pointer"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'FFI');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Pointer');
      var $nesting = [self].concat($parent_nesting), $Pointer_size$1, $Pointer_read_string$2, $Pointer_read_string_length$3, $Pointer_read_string_to_null$4, $Pointer_write_string_length$5, $Pointer_write_string$6, $Pointer_read_array_of_type$7, $Pointer_write_array_of_type$9, $Pointer_to_ptr$11, $Pointer_pointer$12, $Pointer_read$13, $Pointer_write$14, $Pointer_get_bytes$15, $Pointer_put_bytes$16, $Pointer_get$17, $Pointer_put$18, $Pointer_get_string$19, $Pointer_put_string$21, $Pointer_from_string$22, $Pointer_alloc_out$23, $Pointer_alloc_in$24, $Pointer_method_missing$25, $Pointer_initialize$26, $Pointer_$eq_eq$27, $Pointer_$plus$28, $Pointer_$$$30, $Pointer_$$$eq$31, $Pointer_resize$32, $Pointer_free$33, $Pointer_inspect$34;
      self.$$prototype.memory = self.$$prototype.address = nil;
      Opal.const_set($nesting[0], 'SIZE', 4);
      Opal.defs(self, '$size', $Pointer_size$1 = function $$size() {
        var self = this;
        return $$($nesting, 'SIZE');
      }, $Pointer_size$1.$$arity = 0);
      Opal.def(self, '$read_string', $Pointer_read_string$2 = function $$read_string(len) {
        var self = this;
        if(len == null) {
          len = nil;
        }
        ;
        if($truthy(len)) {
          if(len['$=='](0)) {
            return "".$b();
          }
          ;
          return self.$get_bytes(0, len);
        } else {
          return self.$get_string(0);
        }
        ;
      }, $Pointer_read_string$2.$$arity = -1);
      /* destroyed: TreeShaking#shake_methods/$read_string_length */0;
      /* destroyed: TreeShaking#shake_methods/$read_string_to_null */0;
      /* destroyed: TreeShaking#shake_methods/$write_string_length */0;
      Opal.def(self, '$write_string', $Pointer_write_string$6 = function $$write_string(str, len) {
        var self = this;
        if(len == null) {
          len = nil;
        }
        ;
        return self.$put_bytes(0, str, 0, len);
      }, $Pointer_write_string$6.$$arity = -2);
      /* destroyed: TreeShaking#shake_methods/$read_array_of_type */0;
      /* destroyed: TreeShaking#shake_methods/$write_array_of_type */0;
      /* destroyed: TreeShaking#shake_methods/$to_ptr */0;
      Opal.def(self, '$pointer', $Pointer_pointer$12 = function $$pointer() {
        var self = this;
        return self;
      }, $Pointer_pointer$12.$$arity = 0);
      Opal.def(self, '$read', $Pointer_read$13 = function $$read(type) {
        var self = this;
        return self.$get(type, 0);
      }, $Pointer_read$13.$$arity = 1);
      Opal.def(self, '$write', $Pointer_write$14 = function $$write(type, value) {
        var self = this;
        return self.$put(type, 0, value);
      }, $Pointer_write$14.$$arity = 2);
      Opal.def(self, '$get_bytes', $Pointer_get_bytes$15 = function $$get_bytes(pos, len) {
        var $a, self = this, ary = nil, out = nil, i = nil;
        ary = self.memory.$buffer().$to_a();
        out = [];
        i = 0;
        while($truthy($rb_lt(i, len))) {
          out['$<<'](ary['$[]']($rb_plus($rb_plus(self.address, pos), i)));
          i = $rb_plus(i, 1);
        }
        ;
        return out.$pack("c*").$b();
      }, $Pointer_get_bytes$15.$$arity = 2);
      Opal.def(self, '$put_bytes', $Pointer_put_bytes$16 = function $$put_bytes(pos, src, src_pos, len) {
        var $a, self = this, ary = nil, i = nil, $writer = nil;
        if(src_pos == null) {
          src_pos = 0;
        }
        ;
        if(len == null) {
          len = nil;
        }
        ;
        if($truthy(src['$respond_to?']("bytes"))) {
          src = (function() {
            if(src.$encoding()['$==']($$$($$($nesting, 'Encoding'), 'BINARY'))) {
              return $send(src.$chars(), 'map', [], "ord".$to_proc());
            } else {
              return src.$bytes();
            }
            ;
            return nil;
          })();
        }
        ;
        len = ($truthy($a = len) ? $a : $rb_minus(src.$length(), src_pos));
        ary = self.memory.$buffer().$to_a();
        i = 0;
        while($truthy($rb_lt(i, len))) {
          $writer = [$rb_plus($rb_plus(self.address, i), pos), src['$[]']($rb_plus(src_pos, i))];
          $send(ary, '[]=', Opal.to_a($writer));
          $writer[$rb_minus($writer["length"], 1)];
          ;
          i = $rb_plus(i, 1);
        }
        ;
      }, $Pointer_put_bytes$16.$$arity = -3);
      Opal.def(self, '$get', $Pointer_get$17 = function $$get(type, pos) {
        var self = this, bytes = nil;
        type = $$$($$($nesting, 'FFI'), 'Type')['$[]'](type);
        bytes = self.$get_bytes(pos, type.$size());
        if($truthy(type['$respond_to?']("from_native_mem"))) {
          return type.$from_native_mem(type.$unpack(bytes), self.memory);
        } else {
          return type.$from_native(type.$unpack(bytes));
        }
        ;
      }, $Pointer_get$17.$$arity = 2);
      Opal.def(self, '$put', $Pointer_put$18 = function $$put(type, pos, value) {
        var self = this;
        type = $$$($$($nesting, 'FFI'), 'Type')['$[]'](type);
        value = (function() {
          if($truthy(type['$respond_to?']("to_native_mem"))) {
            return type.$to_native_mem(value, self.memory);
          } else {
            return type.$to_native(value);
          }
          ;
          return nil;
        })();
        value = type.$pack(value);
        return self.$put_bytes(pos, value);
      }, $Pointer_put$18.$$arity = 3);
      Opal.def(self, '$get_string', $Pointer_get_string$19 = function $$get_string(pos) {
        var $$20, self = this, out = nil, ary = nil;
        out = [];
        ary = self.memory.$buffer().$to_a();
        pos = $rb_plus(pos, self.address);
        (function() {
          var $brk = Opal.new_brk();
          try {
            return $send(self, 'loop', [], ($$20 = function() {
              var self = $$20.$$s || this, byte$ = nil;
              byte$ = ary['$[]'](pos);
              if(byte$['$=='](0)) {
                Opal.brk(nil, $brk);
              }
              ;
              out['$<<'](byte$);
              return (pos = $rb_plus(pos, 1));
            }, $$20.$$s = self, $$20.$$brk = $brk, $$20.$$arity = 0, $$20));
          } catch(err) {
            if(err === $brk) {
              return err.$v;
            } else {
              throw err;
            }
          }
        })();
        return out.$pack("c*").$b();
      }, $Pointer_get_string$19.$$arity = 1);
      /* destroyed: TreeShaking#shake_methods/$put_string */0;
      Opal.defs(self, '$from_string', $Pointer_from_string$22 = function $$from_string(src) {
        var self = this, bs = nil, out = nil;
        bs = (function() {
          if(src.$encoding()['$==']($$$($$($nesting, 'Encoding'), 'BINARY'))) {
            return $send(src.$chars(), 'map', [], "ord".$to_proc());
          } else {
            return src.$bytes();
          }
          ;
          return nil;
        })();
        bs = $rb_plus(bs, [0, 0]);
        out = self.$new("uint8", bs.$count());
        out.$put_bytes(0, bs);
        return out;
      }, $Pointer_from_string$22.$$arity = 1);
      /* destroyed: TreeShaking#shake_methods/$alloc_out */0;
      /* destroyed: TreeShaking#shake_methods/$alloc_in */0;
      Opal.def(self, '$method_missing', $Pointer_method_missing$25 = function $$method_missing(method, $a) {
        var $post_args, args, $iter = $Pointer_method_missing$25.$$p, $yield = $iter || nil, self = this, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;
        if($iter) $Pointer_method_missing$25.$$p = null;
        for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
          $zuper[$zuper_i] = arguments[$zuper_i];
        }
        $post_args = Opal.slice.call(arguments, 1, arguments.length);
        args = $post_args;
        ;
        method = method.$to_s();
        return $send(self, Opal.find_super_dispatcher(self, 'method_missing', $Pointer_method_missing$25, false), $zuper, $iter);
      }, $Pointer_method_missing$25.$$arity = -2);
      Opal.def(self, '$initialize', $Pointer_initialize$26 = function $$initialize(address, type, size) {
        var $a, $b, self = this, count = nil;
        if(type == null) {
          type = nil;
        }
        ;
        if(size == null) {
          size = nil;
        }
        ;
        if($truthy(address['$respond_to?']("address"))) {
          if($truthy(address['$respond_to?']("memory"))) {
            self.memory = ($truthy($a = address.$memory()) ? $a : $$($nesting, 'FFI').$context().$library().$memory());
          } else {
            self.memory = $$($nesting, 'FFI').$context().$library().$memory();
          }
          ;
          self.address = address.$address();
        } else if($truthy(($truthy($a = ($truthy($b = address['$respond_to?']("to_sym")) ? $b : address['$is_a?']($$($nesting, 'Type')))) ? $a : address['$is_a?']($$($nesting, 'Class'))))) {
          $a = [address, type], (type = $a[0]), (count = $a[1]), $a;
          self.memory = $$($nesting, 'FFI').$context().$library().$memory();
          self.address = $$($nesting, 'FFI').$context().$malloc($rb_times($$$($$($nesting, 'FFI'), 'Type')['$[]'](type).$size(), ($truthy($a = count) ? $a : 1))).$address();
        } else if($truthy(address['$respond_to?']("to_ary"))) {
          $b = address.$to_ary(), $a = Opal.to_ary($b), (self.memory = ($a[0] == null ? nil : $a[0])), (self.address = ($a[1] == null ? nil : $a[1])), $b;
          self.size = size;
        } else if($truthy(address['$respond_to?']("to_int"))) {
          self.memory = $$($nesting, 'FFI').$context().$library().$memory();
          self.address = address.$to_int();
          self.size = size;
        } else {
          self.$raise($$($nesting, 'TypeError'), "Address has an invalid type");
        }
        ;
        return (self.type = (function() {
          if($truthy(type)) {
            return $$$($$($nesting, 'FFI'), 'Type')['$[]'](type);
          } else {
            return $$$($$($nesting, 'FFI'), 'Type')['$[]']("uint8");
          }
          ;
          return nil;
        })());
      }, $Pointer_initialize$26.$$arity = -2);
      self.$attr_accessor("memory", "address", "type");
      Opal.def(self, '$==', $Pointer_$eq_eq$27 = function(other) {
        var $a, $b, self = this;
        return ($truthy($a = self.$address()['$=='](other.$address())) ? ($truthy($b = self.$address()['$=='](0)) ? $b : self.$memory()['$=='](other.$memory())) : $a);
      }, $Pointer_$eq_eq$27.$$arity = 1);
      Opal.def(self, '$+', $Pointer_$plus$28 = function(offset) {
        var $$29, self = this;
        return $send(self.$dup(), 'tap', [], ($$29 = function(i) {
          var self = $$29.$$s || this, $writer = nil;
          if(i == null) {
            i = nil;
          }
          ;
          $writer = [$rb_plus(i.$address(), $rb_times(offset, self.$type().$size()))];
          $send(i, 'address=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }, $$29.$$s = self, $$29.$$arity = 1, $$29));
      }, $Pointer_$plus$28.$$arity = 1);
      Opal.def(self, '$[]', $Pointer_$$$30 = function(offset) {
        var self = this;
        return self.$get(self.$type(), $rb_times(offset, self.$type().$size()));
      }, $Pointer_$$$30.$$arity = 1);
      Opal.def(self, '$[]=', $Pointer_$$$eq$31 = function(offset, value) {
        var self = this;
        return self.$put(self.$type(), $rb_times(offset, self.$type().$size()), value);
      }, $Pointer_$$$eq$31.$$arity = 2);
      Opal.def(self, '$resize', $Pointer_resize$32 = function $$resize(new_size) {
        var self = this, $writer = nil;
        $writer = [$$($nesting, 'FFI').$context().$realloc(self, new_size).$address()];
        $send(self, 'address=', Opal.to_a($writer));
        return $writer[$rb_minus($writer["length"], 1)];
      }, $Pointer_resize$32.$$arity = 1);
      Opal.def(self, '$free', $Pointer_free$33 = function $$free() {
        var self = this;
        return $$($nesting, 'FFI').$context().$free(self);
      }, $Pointer_free$33.$$arity = 0);
      Opal.def(self, '$inspect', $Pointer_inspect$34 = function $$inspect() {
        var self = this, out = nil;
        return (out = "" + "#<" + (self.$class().$name()) + ":" + ("0x%08x"['$%'](self.$address())) + " of " + (self.$type().$inspect()) + ">");
      }, $Pointer_inspect$34.$$arity = 0);
      return Opal.const_set($nesting[0], 'NULL', self.$new([nil, 0]));
    })($nesting[0], null, $nesting);
    Opal.const_set($nesting[0], 'AutoPointer', Opal.const_set($nesting[0], 'MemoryPointer', Opal.const_set($nesting[0], 'Buffer', $$($nesting, 'Pointer'))));
  })($nesting[0], $nesting);
};
Opal.modules["ffi/struct"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_le(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'FFI');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Struct');
      var $nesting = [self].concat($parent_nesting), $Struct_size$1, $Struct_alignment$2, $Struct_by_value$3, $Struct_by_ptr$4, $Struct_pack$5, $Struct_unpack$6, $Struct_from_native_mem$7, $Struct_to_native$8, $Struct_ptr$9, $Struct_layout$10, $Struct_members$12, $Struct_members$13, $Struct_$$$14, $Struct_$$$eq$15, $Struct_offset_of$16, $Struct_address$17, $Struct_initialize$18, $Struct_free$19, $Struct_inspect$20;
      self.$$prototype.pointer = nil;
      Opal.defs(self, '$size', $Struct_size$1 = function $$size() {
        var $a, self = this;
        if(self.size == null) self.size = nil;
        return ($truthy($a = self.size) ? $a : 4);
      }, $Struct_size$1.$$arity = 0);
      Opal.defs(self, '$alignment', $Struct_alignment$2 = function $$alignment() {
        var $a, $b, $c, $d, $e, $f, self = this;
        if(self.alignment == null) self.alignment = nil;
        if(self.layout == null) self.layout = nil;
        return (self.alignment = ($truthy($a = self.alignment) ? $a : ($truthy($b = ($f = ($e = ($d = ($c = self.layout, ($c === nil || $c == null) ? nil : $send($c, 'values', [])), ($d === nil || $d == null) ? nil : $send($d, 'map', [], "type".$to_proc())), ($e === nil || $e == null) ? nil : $send($e, 'map', [], "alignment".$to_proc())), ($f === nil || $f == null) ? nil : $send($f, 'max', []))) ? $b : 4)));
      }, $Struct_alignment$2.$$arity = 0);
      /* destroyed: TreeShaking#shake_methods/$by_value */0;
      Opal.defs(self, '$by_ptr', $Struct_by_ptr$4 = function $$by_ptr() {
        var self = this;
        return $$$($$$($$($nesting, 'FFI'), 'Type'), 'WrappedStruct').$new(self);
      }, $Struct_by_ptr$4.$$arity = 0);
      Opal.defs(self, '$pack', $Struct_pack$5 = function $$pack(x) {
        var self = this;
        return self.$raise($$($nesting, 'ArgumentError'), "Packing Struct directly is forbidden");
      }, $Struct_pack$5.$$arity = 1);
      Opal.defs(self, '$unpack', $Struct_unpack$6 = function $$unpack(x) {
        var self = this;
        return self.$raise($$($nesting, 'ArgumentError'), "Unpacking Struct directly is forbidden");
      }, $Struct_unpack$6.$$arity = 1);
      Opal.def(self, '$from_native_mem', $Struct_from_native_mem$7 = function $$from_native_mem(x, memory) {
        var self = this;
        return self.$new($$$($$($nesting, 'FFI'), 'Pointer').$new([memory, x], self));
      }, $Struct_from_native_mem$7.$$arity = 2);
      Opal.def(self, '$to_native', $Struct_to_native$8 = function $$to_native(x) {
        var self = this;
        return x.$pointer().$address();
      }, $Struct_to_native$8.$$arity = 1);
      Opal.defs(self, '$ptr', $Struct_ptr$9 = function $$ptr() {
        var self = this;
        return self.$by_ptr();
      }, $Struct_ptr$9.$$arity = 0);
      Opal.defs(self, '$layout', $Struct_layout$10 = function $$layout($a, $b) {
        var $post_args, $kwargs, fs, fields, $c, $d, $e, $$11, self = this, z = nil, k = nil, v = nil, $writer = nil, offset = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        $kwargs = Opal.extract_kwargs($post_args);
        if($kwargs == null) {
          $kwargs = $hash2([], { });
        } else if(!$kwargs.$$is_hash) {
          throw Opal.ArgumentError.$new('expected kwargs');
        }
        ;
        fs = $post_args;
        ;
        fields = Opal.kwrestargs($kwargs, { });
        ;
        if($truthy($rb_gt(fs.$length(), 0))) {
          while((z = fs.$shift(2)).$length()['$=='](2)) {
            $e = z, $d = Opal.to_ary($e), (k = ($d[0] == null ? nil : $d[0])), (v = ($d[1] == null ? nil : $d[1])), $e;
            $writer = [k, v];
            $send(fields, '[]=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
            ;
          }
        }
        ;
        offset = 0;
        self.layout = $hash2([], { });
        $send(fields, 'each', [], ($$11 = function(name, type) {
          var self = $$11.$$s || this, $f, $g, count = nil;
          if(self.layout == null) self.layout = nil;
          if(name == null) {
            name = nil;
          }
          ;
          if(type == null) {
            type = nil;
          }
          ;
          count = nil;
          if($truthy(type['$is_a?']($$($nesting, 'Array')))) {
            $g = type, $f = Opal.to_ary($g), (type = ($f[0] == null ? nil : $f[0])), (count = ($f[1] == null ? nil : $f[1])), $g;
          }
          ;
          type = $$$($$($nesting, 'FFI'), 'Type')['$[]'](type, "struct");
          while(!(offset['$%'](type.$alignment())['$=='](0))) {
            offset = $rb_plus(offset, 1);
          }
          ;
          $writer = [name, $$($nesting, 'Field').$new(self, name, type, offset, count)];
          $send(self.layout, '[]=', Opal.to_a($writer));
          $writer[$rb_minus($writer["length"], 1)];
          ;
          if($truthy(count)) {
            return (offset = $rb_plus(offset, $rb_times(type.$size(), count)));
          } else {
            return (offset = $rb_plus(offset, type.$size()));
          }
          ;
        }, $$11.$$s = self, $$11.$$arity = 2, $$11));
        return (self.size = offset);
      }, $Struct_layout$10.$$arity = -1);
      Opal.defs(self, '$members', $Struct_members$12 = function $$members() {
        var self = this;
        if(self.layout == null) self.layout = nil;
        return self.layout;
      }, $Struct_members$12.$$arity = 0);
      Opal.def(self, '$members', $Struct_members$13 = function $$members() {
        var self = this;
        return self.$class().$members();
      }, $Struct_members$13.$$arity = 0);
      Opal.def(self, '$[]', $Struct_$$$14 = function(field) {
        var self = this;
        return self.$members()['$[]'](field).$get(self);
      }, $Struct_$$$14.$$arity = 1);
      Opal.def(self, '$[]=', $Struct_$$$eq$15 = function(field, value) {
        var self = this;
        return self.$members()['$[]'](field).$set(self, value);
      }, $Struct_$$$eq$15.$$arity = 2);
      /* destroyed: TreeShaking#shake_methods/$offset_of */0;
      self.$attr_reader("pointer");
      Opal.def(self, '$address', $Struct_address$17 = function $$address() {
        var self = this;
        return self.$pointer().$address();
      }, $Struct_address$17.$$arity = 0);
      Opal.def(self, '$initialize', $Struct_initialize$18 = function $$initialize(pointer) {
        var self = this, $writer = nil;
        if(pointer == null) {
          pointer = nil;
        }
        ;
        if($truthy(pointer)) {
          return (self.pointer = pointer);
        } else {
          self.pointer = $$($nesting, 'FFI').$context().$malloc(self.$class().$size());
          $writer = [$$$($$($nesting, 'FFI'), 'Type')['$[]'](self.$class())];
          $send(self.pointer, 'type=', Opal.to_a($writer));
          $writer[$rb_minus($writer["length"], 1)];
          ;
          return self.pointer;
        }
        ;
      }, $Struct_initialize$18.$$arity = -1);
      Opal.def(self, '$free', $Struct_free$19 = function $$free() {
        var self = this;
        return self.pointer.$free();
      }, $Struct_free$19.$$arity = 0);
      return (Opal.def(self, '$inspect', $Struct_inspect$20 = function $$inspect() {
        var $$21, self = this, out = nil;
        out = ["" + "#<" + (self.$class().$name()) + ":" + ("0x%08x"['$%'](self.$address())) + ": "];
        out['$<<']($send(self.$members().$keys(), 'map', [], ($$21 = function(key) {
          var self = $$21.$$s || this;
          if(key == null) {
            key = nil;
          }
          ;
          return "" + ":" + (key) + " => " + (self['$[]'](key).$inspect());
        }, $$21.$$s = self, $$21.$$arity = 1, $$21)).$join(", "));
        out['$<<'](">");
        return out.$join();
      }, $Struct_inspect$20.$$arity = 0), nil) && 'inspect';
    })($nesting[0], null, $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Field');
      var $nesting = [self].concat($parent_nesting), $Field_initialize$22, $Field_get$23, $Field_set$24;
      self.$attr_accessor("struct", "name", "type", "offset", "count");
      Opal.def(self, '$initialize', $Field_initialize$22 = function $$initialize(struct, name, type, offset, count) {
        var $a, self = this;
        return $a = [struct, name, type, offset, count], (self.struct = $a[0]), (self.name = $a[1]), (self.type = $a[2]), (self.offset = $a[3]), (self.count = $a[4]), $a;
      }, $Field_initialize$22.$$arity = 5);
      Opal.def(self, '$get', $Field_get$23 = function $$get(from) {
        var $a, self = this;
        if($truthy(self.$count())) {
          return $$$($$($nesting, 'FFI'), 'Pointer').$new([from.$pointer().$memory(), $rb_plus(from.$address(), self.$offset())], self.$type());
        } else if($truthy(($truthy($a = self.$type()['$is_a?']($$($nesting, 'Class'))) ? $rb_le(self.$type(), $$$($$($nesting, 'FFI'), 'Struct')) : $a))) {
          return self.$type().$new($$$($$($nesting, 'FFI'), 'Pointer').$new([from.$pointer().$memory(), $rb_plus(from.$address(), self.$offset())], self.$type()));
        } else {
          return from.$pointer().$get(self.$type(), self.$offset());
        }
      }, $Field_get$23.$$arity = 1);
      return (Opal.def(self, '$set', $Field_set$24 = function $$set(from, value) {
        var $a, self = this;
        if($truthy(self.$count())) {
          return self.$raise($$($nesting, 'ArgumentError'), "" + "Can't set an array " + (self.$name()) + " of " + (self.$struct()) + ".");
        } else if($truthy(($truthy($a = self.$type()['$is_a?']($$($nesting, 'Class'))) ? $rb_le(self.$type(), $$$($$($nesting, 'FFI'), 'Struct')) : $a))) {
          return self.$raise($$($nesting, 'ArgumentError'), "" + "Can't set a nested struct " + (self.$name()) + ".");
        } else {
          return from.$pointer().$put(self.$type(), self.$offset(), value);
        }
      }, $Field_set$24.$$arity = 2), nil) && 'set';
    })($nesting[0], null, $nesting);
    Opal.const_set($nesting[0], 'ManagedStruct', $$($nesting, 'Struct'));
  })($nesting[0], $nesting);
};
Opal.modules["ffi/library"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $hash2 = Opal.hash2, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'FFI');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Library');
      var $nesting = [self].concat($parent_nesting), $Library_extended$1, $Library_ffi_lib$2, $Library_library$3, $Library_attach_function$4, $Library_context$7;
      Opal.defs(self, '$extended', $Library_extended$1 = function $$extended(mod) {
        var self = this;
        if($truthy(mod['$kind_of?']($$($nesting, 'Module')))) {
          return nil;
        } else {
          return self.$raise($$($nesting, 'RuntimeError').$new("must only be extended by module"));
        }
      }, $Library_extended$1.$$arity = 1);
      Opal.def(self, '$ffi_lib', $Library_ffi_lib$2 = function $$ffi_lib($a) {
        var $post_args, names, self = this;
        if(self.ffi_lib == null) self.ffi_lib = nil;
        $post_args = Opal.slice.call(arguments, 0, arguments.length);
        names = $post_args;
        ;
        self.ffi_lib = $$($nesting, 'WebAssembly').$libs()['$[]'](names.$first());
        if($truthy(self.ffi_lib['$!']())) {
          self.$raise($$($nesting, 'LoadError'), "" + "Library " + (names.$first()) + " not loaded");
        }
        ;
        try {
          self.$attach_function("malloc", ["long"], "pointer");
          self.$attach_function("free", ["pointer"], "void");
          return self.$attach_function("realloc", ["pointer", "long"], "pointer");
        } catch($err) {
          if(Opal.rescue($err, [$$($nesting, 'LoadError')])) {
            try {
              return nil;
            } finally {
              Opal.pop_exception();
            }
          } else {
            throw $err;
          }
        }
        ;
        ;
      }, $Library_ffi_lib$2.$$arity = -1);
      Opal.def(self, '$library', $Library_library$3 = function $$library() {
        var self = this;
        if(self.ffi_lib == null) self.ffi_lib = nil;
        return self.ffi_lib;
      }, $Library_library$3.$$arity = 0);
      Opal.def(self, '$attach_function', $Library_attach_function$4 = function $$attach_function(name, func, $a, $b, $c) {
        var $post_args, $kwargs, args, returns, options, $d, $$5, self = this, fun = nil;
        if(self.ffi_lib == null) self.ffi_lib = nil;
        $post_args = Opal.slice.call(arguments, 2, arguments.length);
        $kwargs = Opal.extract_kwargs($post_args);
        if($kwargs == null) {
          $kwargs = $hash2([], { });
        } else if(!$kwargs.$$is_hash) {
          throw Opal.ArgumentError.$new('expected kwargs');
        }
        ;
        if($post_args.length > 0) {
          args = $post_args[0];
          $post_args.splice(0, 1);
        }
        if(args == null) {
          args = nil;
        }
        ;
        if($post_args.length > 0) {
          returns = $post_args[0];
          $post_args.splice(0, 1);
        }
        if(returns == null) {
          returns = nil;
        }
        ;
        options = Opal.kwrestargs($kwargs, { });
        ;
        if($truthy(func['$is_a?']($$($nesting, 'Array')))) {
          $d = [name, func, args], (func = $d[0]), (args = $d[1]), (returns = $d[2]), $d;
        }
        ;
        if($truthy(self.ffi_lib.$exports()['$has_key?'](func))) {

        } else {
          self.$raise($$($nesting, 'LoadError'), "" + "No library responds to " + (func));
        }
        ;
        fun = self.ffi_lib.$exports()['$[]'](func);
        return $send(self, 'define_singleton_method', [name], ($$5 = function($e) {
          var self = $$5.$$s || this, $post_args, as, $$6, ret = nil, type = nil;
          if(self.ffi_lib == null) self.ffi_lib = nil;
          $post_args = Opal.slice.call(arguments, 0, arguments.length);
          as = $post_args;
          ;
          if($truthy(as.$count()['$!='](args.$count()))) {
            self.$raise($$($nesting, 'ArgumentError'), "" + "Provided " + (as.$count()) + " arguments, expected " + (args.$count()));
          }
          ;
          as = $send(as.$each_with_index(), 'map', [], ($$6 = function(a, ind) {
            var self = $$6.$$s || this, type = nil;
            if(self.ffi_lib == null) self.ffi_lib = nil;
            if(a == null) {
              a = nil;
            }
            ;
            if(ind == null) {
              ind = nil;
            }
            ;
            type = $$($nesting, 'Type')['$[]'](args['$[]'](ind));
            if($truthy(type['$respond_to?']("to_native_mem"))) {
              return type.$to_native_mem(a, self.ffi_lib.$memory());
            } else {
              return type.$to_native(a);
            }
            ;
          }, $$6.$$s = self, $$6.$$arity = 2, $$6));
          ret = $send(fun, 'call', Opal.to_a(as));
          type = $$($nesting, 'Type')['$[]'](returns);
          if($truthy(type['$respond_to?']("from_native_mem"))) {
            return type.$from_native_mem(ret, self.ffi_lib.$memory());
          } else {
            return type.$from_native(ret);
          }
          ;
        }, $$5.$$s = self, $$5.$$arity = -1, $$5));
      }, $Library_attach_function$4.$$arity = -3);
      Opal.def(self, '$context', $Library_context$7 = function $$context() {
        var $iter = $Library_context$7.$$p, block = $iter || nil, self = this, out = nil;
        if($iter) $Library_context$7.$$p = null;
        if($iter) $Library_context$7.$$p = null;
        ;
        $$($nesting, 'FFI').$contexts().$push(self);
        out = Opal.yieldX(block, []);
        $$($nesting, 'FFI').$contexts().$pop();
        return out;
      }, $Library_context$7.$$arity = 0);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["ffi"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("webassembly");
  (function($base, $parent_nesting) {
    var self = $module($base, 'FFI');
    var $nesting = [self].concat($parent_nesting), $FFI_contexts$1, $FFI_context$2;
    Opal.defs(self, '$contexts', $FFI_contexts$1 = function $$contexts() {
      var $a, self = this;
      if(self.contexts == null) self.contexts = nil;
      return (self.contexts = ($truthy($a = self.contexts) ? $a : []));
    }, $FFI_contexts$1.$$arity = 0);
    Opal.defs(self, '$context', $FFI_context$2 = function $$context() {
      var $a, $$3, self = this;
      if(self.contexts == null) self.contexts = nil;
      return $send((self.contexts = ($truthy($a = self.contexts) ? $a : [])).$last(), 'tap', [], ($$3 = function(lib) {
        var self = $$3.$$s || this;
        if(lib == null) {
          lib = nil;
        }
        ;
        if($truthy(lib)) {
          return nil;
        } else {
          return self.$raise($$($nesting, 'RuntimeError'), $rb_plus("This call needs to be done in a FFI::Library#context ", "block (Opal-WebAssembly limitation)."));
        }
        ;
      }, $$3.$$s = self, $$3.$$arity = 1, $$3));
    }, $FFI_context$2.$$arity = 0);
  })($nesting[0], $nesting);
  self.$require("ffi/types");
  self.$require("ffi/pointer");
  self.$require("ffi/struct");
  return self.$require("ffi/library");
};
Opal.modules["corelib/pack_unpack/format_string_parser"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'PackUnpack');
    var $nesting = [self].concat($parent_nesting);
    var directives = ['C', 'S', 'L', 'Q', 'J', 'c', 's', 'l', 'q', 'j', 'n', 'N', 'v', 'V', 'U', 'w', 'D', 'd', 'F', 'f', 'E', 'e', 'G', 'g', 'A', 'a', 'Z', 'B', 'b', 'H', 'h', 'u', 'M', 'm', 'P', 'p', '@', 'X', 'x'];
    var modifiers = ['!', '_', '>', '<'];
    self.eachDirectiveAndCount = function(format, callback) {
      var currentDirective, currentCount, currentModifiers, countSpecified;
            function reset() {
        currentDirective = null;
        currentCount = 0;
        currentModifiers = [];
        countSpecified = false;
      }
      reset();
            function yieldAndReset() {
        if(currentDirective == null) {
          reset();
          return;
        }
        var directiveSupportsModifiers = /[sSiIlLqQjJ]/.test(currentDirective);
        if(!directiveSupportsModifiers && currentModifiers.length > 0) {
          self.$raise($$($nesting, 'ArgumentError'), "" + "'" + (currentModifiers[0]) + "' allowed only after types sSiIlLqQjJ");
        }
        if(currentModifiers.indexOf('<') !== -1 && currentModifiers.indexOf('>') !== -1) {
          self.$raise($$($nesting, 'RangeError'), "Can't use both '<' and '>'");
        }
        if(!countSpecified) {
          currentCount = 1;
        }
        if(currentModifiers.indexOf('>') !== -1) {
          currentDirective = currentDirective + '>';
        }
        callback(currentDirective, currentCount);
        reset();
      }
      for(var i = 0; i < format.length; i++) {
        var currentChar = format[i];
        if(directives.indexOf(currentChar) !== -1) {
          yieldAndReset();
          currentDirective = currentChar;
        } else if(currentDirective) {
          if(/\d/.test(currentChar)) {
            currentCount = currentCount * 10 + parseInt(currentChar, 10);
            countSpecified = true;
          } else if(currentChar === '*' && countSpecified === false) {
            currentCount = Infinity;
            countSpecified = true;
          } else if(modifiers.indexOf(currentChar) !== -1 && countSpecified === false) {
            currentModifiers.push(currentChar);
          } else {
            yieldAndReset();
          }
        }
      }
      yieldAndReset();
    };
  })($nesting[0], $nesting);
};
Opal.modules["corelib/array/pack"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/pack_unpack/format_string_parser");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'Array');
    var $nesting = [self].concat($parent_nesting), $Array_pack$1;
    var eachDirectiveAndCount = Opal.PackUnpack.eachDirectiveAndCount;
        function identityFunction(value) {
      return value;
    }
        function utf8BytesToUtf16LEString(bytes) {
      var str = String.fromCharCode.apply(null, bytes), out = "", i = 0, len = str.length, c, char2, char3;
      while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4) {
          case 0:

          case 1:

          case 2:

          case 3:

          case 4:

          case 5:

          case 6:

          case 7:
            out += str.charAt(i - 1);
            break;
          case 12:

          case 13:
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 31) << 6) | (char2 & 63));
            break;
          case 14:
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 15) << 12) | ((char2 & 63) << 6) | ((char3 & 63) << 0));
            break;
        }
      }
      return out;
    }
        function asciiBytesToUtf16LEString(bytes) {
      return String.fromCharCode.apply(null, bytes);
    }
        function asciiStringFromUnsignedInt(bytes, callback) {
      return function(data) {
        var buffer = callback(data);
        return buffer.map(function(item) {
          var result = [];
          for(var i = 0; i < bytes; i++) {
            var bit = item & 255;
            result.push(bit);
            item = item >> 8;
          }
          ;
          return asciiBytesToUtf16LEString(result);
        });
      };
    }
        function asciiStringFromSignedInt(bytes, callback) {
      return function(data) {
        var buffer = callback(data), bits = bytes * 8, limit = Math.pow(2, bits);
        return buffer.map(function(item) {
          if(item < 0) {
            item += limit;
          }
          var result = [];
          for(var i = 0; i < bytes; i++) {
            var bit = item & 255;
            result.push(bit);
            item = item >> 8;
          }
          ;
          return asciiBytesToUtf16LEString(result);
        });
      };
    }
        function toInt(callback) {
      return function(data) {
        var buffer = callback(data);
        return buffer.map(function(item) {
          return $$($nesting, 'Opal').$coerce_to(item, $$($nesting, 'Integer'), "to_int");
        });
      };
    }
        function ToStr(callback) {
      return function(data) {
        var buffer = callback(data);
        return buffer.map(function(item) {
          return $$($nesting, 'Opal').$coerce_to(item, $$($nesting, 'String'), "to_str");
        });
      };
    }
        function fromCodePoint(callback) {
      return function(data) {
        var buffer = callback(data);
        return buffer.map(function(item) {
          try {
            return String.fromCodePoint(item);
          } catch(error) {
            if(error instanceof RangeError) {
              self.$raise($$($nesting, 'RangeError'), "value out of range");
            }
            throw error;
          }
        });
      };
    }
        function joinChars(callback) {
      return function(data) {
        var buffer = callback(data);
        return buffer.join('');
      };
    }
    var handlers = {
      'C': joinChars(asciiStringFromUnsignedInt(1, toInt(identityFunction))),
      'S': joinChars(asciiStringFromUnsignedInt(2, toInt(identityFunction))),
      'L': joinChars(asciiStringFromUnsignedInt(4, toInt(identityFunction))),
      'Q': joinChars(asciiStringFromUnsignedInt(8, toInt(identityFunction))),
      'J': null,
      'S>': null,
      'L>': null,
      'Q>': null,
      'c': joinChars(asciiStringFromSignedInt(1, toInt(identityFunction))),
      's': joinChars(asciiStringFromSignedInt(2, toInt(identityFunction))),
      'l': joinChars(asciiStringFromSignedInt(4, toInt(identityFunction))),
      'q': joinChars(asciiStringFromSignedInt(8, toInt(identityFunction))),
      'j': null,
      's>': null,
      'l>': null,
      'q>': null,
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': joinChars(fromCodePoint(toInt(identityFunction))),
      'w': null,
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': joinChars(identityFunction),
      'a': joinChars(identityFunction),
      'Z': null,
      'B': null,
      'b': null,
      'H': null,
      'h': null,
      'u': null,
      'M': null,
      'm': null,
      'P': null,
      'p': null
};
        function readNTimesFromBufferAndMerge(callback) {
      return function(buffer, count) {
        var chunk = [], chunkData;
        if(count === Infinity) {
          while(buffer.length > 0) {
            chunkData = callback(buffer);
            buffer = chunkData.rest;
            chunk = chunk.concat(chunkData.chunk);
          }
        } else {
          if(buffer.length < count) {
            self.$raise($$($nesting, 'ArgumentError'), "too few arguments");
          }
          for(var i = 0; i < count; i++) {
            chunkData = callback(buffer);
            buffer = chunkData.rest;
            chunk = chunk.concat(chunkData.chunk);
          }
        }
        return {
          chunk: chunk,
          rest: buffer
};
      };
    }
        function readItem(buffer) {
      var chunk = buffer.slice(0, 1);
      buffer = buffer.slice(1, buffer.length);
      return {
        chunk: chunk,
        rest: buffer
};
    }
        function readNCharsFromTheFirstItemAndMergeWithFallback(fallback, callback) {
      return function(buffer, count) {
        var chunk = [], source = buffer[0];
        if(source === nil) {
          source = '';
        } else if(source === undefined) {
          self.$raise($$($nesting, 'ArgumentError'), "too few arguments");
        } else {
          source = $$($nesting, 'Opal').$coerce_to(source, $$($nesting, 'String'), "to_str");
        }
        buffer = buffer.slice(1, buffer.length);
                function infiniteReeder() {
          var chunkData = callback(source);
          source = chunkData.rest;
          var subChunk = chunkData.chunk;
          if(subChunk.length === 1 && subChunk[0] === nil) {
            subChunk = [];
          }
          chunk = chunk.concat(subChunk);
        }
                function finiteReeder() {
          var chunkData = callback(source);
          source = chunkData.rest;
          var subChunk = chunkData.chunk;
          if(subChunk.length === 0) {
            subChunk = [fallback];
          }
          if(subChunk.length === 1 && subChunk[0] === nil) {
            subChunk = [fallback];
          }
          chunk = chunk.concat(subChunk);
        }
        if(count === Infinity) {
          while(source.length > 0) {
            infiniteReeder();
          }
        } else {
          for(var i = 0; i < count; i++) {
            finiteReeder();
          }
        }
        return {
          chunk: chunk,
          rest: buffer
};
      };
    }
    var readChunk = {
      'C': readNTimesFromBufferAndMerge(readItem),
      'S': readNTimesFromBufferAndMerge(readItem),
      'L': readNTimesFromBufferAndMerge(readItem),
      'Q': readNTimesFromBufferAndMerge(readItem),
      'J': null,
      'S>': null,
      'L>': null,
      'Q>': null,
      'c': readNTimesFromBufferAndMerge(readItem),
      's': readNTimesFromBufferAndMerge(readItem),
      'l': readNTimesFromBufferAndMerge(readItem),
      'q': readNTimesFromBufferAndMerge(readItem),
      'j': null,
      's>': null,
      'l>': null,
      'q>': null,
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': readNTimesFromBufferAndMerge(readItem),
      'w': null,
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': readNCharsFromTheFirstItemAndMergeWithFallback(" ", readItem),
      'a': readNCharsFromTheFirstItemAndMergeWithFallback("\x00", readItem),
      'Z': null,
      'B': null,
      'b': null,
      'H': null,
      'h': null,
      'u': null,
      'M': null,
      'm': null,
      'P': null,
      'p': null
};
    var autocompletion = {
      'C': false,
      'S': false,
      'L': false,
      'Q': false,
      'J': null,
      'S>': null,
      'L>': null,
      'Q>': null,
      'c': false,
      's': false,
      'l': false,
      'q': false,
      'j': null,
      's>': null,
      'l>': null,
      'q>': null,
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': false,
      'w': null,
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': false,
      'a': false,
      'Z': null,
      'B': null,
      'b': null,
      'H': null,
      'h': null,
      'u': false,
      'M': null,
      'm': null,
      'P': null,
      'p': null
};
    ;
    return (Opal.def(self, '$pack', $Array_pack$1 = function $$pack(format) {
      var self = this;
      format = $$($nesting, 'Opal')['$coerce_to!'](format, $$($nesting, 'String'), "to_str").$gsub(/\s/, "").$delete("\u0000");
      var output = '';
      var buffer = self.slice();
            function autocomplete(array, size) {
        while(array.length < size) {
          array.push(nil);
        }
        return array;
      }
            function processChunk(directive, count) {
        var chunk, chunkReader = readChunk[directive];
        if(chunkReader == null) {
          self.$raise("" + "Unsupported pack directive " + ((directive).$inspect()) + " (no chunk reader defined)");
        }
        var chunkData = chunkReader(buffer, count);
        chunk = chunkData.chunk;
        buffer = chunkData.rest;
        var handler = handlers[directive];
        if(handler == null) {
          self.$raise("" + "Unsupported pack directive " + ((directive).$inspect()) + " (no handler defined)");
        }
        return handler(chunk);
      }
      eachDirectiveAndCount(format, function(directive, count) {
        var part = processChunk(directive, count);
        if(count !== Infinity) {
          var shouldAutocomplete = autocompletion[directive];
          if(shouldAutocomplete == null) {
            self.$raise("" + "Unsupported pack directive " + ((directive).$inspect()) + " (no autocompletion rule defined)");
          }
          if(shouldAutocomplete) {
            autocomplete(part, count);
          }
        }
        output = output.concat(part);
      });
      return output;
      ;
    }, $Array_pack$1.$$arity = 1), nil) && 'pack';
  })($nesting[0], null, $nesting);
};
Opal.modules["corelib/string/unpack"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;
  /* destroyed: CollapseStubs */0;
  self.$require("corelib/pack_unpack/format_string_parser");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $a, $String_unpack$1, $String_unpack1$2, expected = nil, given = nil;
    var eachDirectiveAndCount = Opal.PackUnpack.eachDirectiveAndCount;
        function flattenArray(callback) {
      return function(data) {
        var array = callback(data);
        return (array).$flatten();
      };
    }
        function mapChunksToWords(callback) {
      return function(data) {
        var chunks = callback(data);
        return chunks.map(function(chunk) {
          return chunk.reverse().reduce(function(result, singleByte) {
            return result * 256 + singleByte;
          }, 0);
        });
      };
    }
        function chunkBy(chunkSize, callback) {
      return function(data) {
        var array = callback(data), chunks = [], chunksCount = (array.length / chunkSize);
        for(var i = 0; i < chunksCount; i++) {
          var chunk = array.splice(0, chunkSize);
          if(chunk.length === chunkSize) {
            chunks.push(chunk);
          }
        }
        return chunks;
      };
    }
        function utf16LEToBytes(string) {
      var utf8 = [];
      for(var i = 0; i < string.length; i++) {
        var charcode = string.charCodeAt(i);
        if(charcode < 256) utf8.push(charcode); else if(charcode < 2048) {
          utf8.push(192 | (charcode >> 6), 128 | (charcode & 63));
        } else if(charcode < 55296 || charcode >= 57344) {
          utf8.push(224 | (charcode >> 12), 128 | ((charcode >> 6) & 63), 128 | (charcode & 63));
        } else {
          i++;
          charcode = 65536 + (((charcode & 1023) << 10) | (string.charCodeAt(i) & 1023));
          utf8.push(240 | (charcode >> 18), 128 | ((charcode >> 12) & 63), 128 | ((charcode >> 6) & 63), 128 | (charcode & 63));
        }
      }
      return utf8;
    }
        function toNByteSigned(bytesCount, callback) {
      return function(data) {
        var unsignedBits = callback(data), bitsCount = bytesCount * 8, limit = Math.pow(2, bitsCount);
        return unsignedBits.map(function(n) {
          if(n >= limit / 2) {
            n -= limit;
          }
          return n;
        });
      };
    }
        function bytesToAsciiChars(callback) {
      return function(data) {
        var bytes = callback(data);
        return bytes.map(function(singleByte) {
          return String.fromCharCode(singleByte);
        });
      };
    }
        function joinChars(callback) {
      return function(data) {
        var chars = callback(data);
        return chars.join('');
      };
    }
        function wrapIntoArray(callback) {
      return function(data) {
        var object = callback(data);
        return [object];
      };
    }
        function filterTrailingChars(chars) {
      var charCodesToFilter = chars.map(function(s) {
        return s.charCodeAt(0);
      });
      return function(callback) {
        return function(data) {
          var charCodes = callback(data);
          while(charCodesToFilter.indexOf(charCodes[charCodes.length - 1]) !== -1) {
            charCodes = charCodes.slice(0, charCodes.length - 1);
          }
          return charCodes;
        };
      };
    }
    var filterTrailingZerosAndSpaces = filterTrailingChars(["\u0000", " "]);
        function invertChunks(callback) {
      return function(data) {
        var chunks = callback(data);
        return chunks.map(function(chunk) {
          return chunk.reverse();
        });
      };
    }
        function uudecode(callback) {
      return function(data) {
        var bytes = callback(data);
        var stop = false;
        var i = 0, length = 0;
        var result = [];
        do {
          if(i < bytes.length) {
            var n = bytes[i] - 32 & 63;
            ;
            ++i;
            if(bytes[i] === 10) {
              continue;
            }
            if(n > 45) {
              return '';
            }
            length += n;
            while(n > 0) {
              var c1 = bytes[i];
              var c2 = bytes[i + 1];
              var c3 = bytes[i + 2];
              var c4 = bytes[i + 3];
              var b1 = (c1 - 32 & 63) << 2 | (c2 - 32 & 63) >> 4;
              var b2 = (c2 - 32 & 63) << 4 | (c3 - 32 & 63) >> 2;
              var b3 = (c3 - 32 & 63) << 6 | c4 - 32 & 63;
              result.push(b1 & 255);
              result.push(b2 & 255);
              result.push(b3 & 255);
              i += 4;
              n -= 3;
            }
            ;
            ++i;
          } else {
            break;
          }
        } while(true);
        return result.slice(0, length);
      };
    }
        function toBits(callback) {
      return function(data) {
        var bytes = callback(data);
        var bits = bytes.map(function(singleByte) {
          return singleByte.toString(2);
        });
        return bits;
      };
    }
        function decodeBERCompressedIntegers(callback) {
      return function(data) {
        var bytes = callback(data), result = [], buffer = '';
        for(var i = 0; i < bytes.length; i++) {
          var singleByte = bytes[i], bits = singleByte.toString(2);
          bits = Array(8 - bits.length + 1).join('0').concat(bits);
          var firstBit = bits[0];
          bits = bits.slice(1, bits.length);
          buffer = buffer.concat(bits);
          if(firstBit === '0') {
            var decoded = parseInt(buffer, 2);
            result.push(decoded);
            buffer = '';
          }
        }
        return result;
      };
    }
        function base64Decode(callback) {
      return function(data) {
        var string = callback(data);
        if(typeof (atob) === 'function') {
          return atob(string);
        } else if(typeof (Buffer) === 'function') {
          if(typeof (Buffer.from) === 'function') {
            return Buffer.from(string, 'base64').toString();
          } else {
            return new Buffer(string, 'base64').toString();
          }
        } else if((($a = $$($nesting, 'Base64', 'skip_raise')) ? 'constant' : nil)) {
          return $$($nesting, 'Base64').$decode64(string);
        } else {
          self.$raise("To use String#unpack('m'), you must first require 'base64'.");
        }
      };
    }
        function qpdecode(callback) {
      return function(data) {
        var string = callback(data);
        return string.replace(/[\t\x20]$/gm, '').replace(/=(?:\r\n?|\n|$)/g, '').replace(/=([a-fA-F0-9]{2})/g, function($0, $1) {
          var codePoint = parseInt($1, 16);
          return String.fromCharCode(codePoint);
        });
      };
    }
        function identityFunction(value) {
      return value;
    }
    var handlers = {
      'C': identityFunction,
      'S': mapChunksToWords(chunkBy(2, identityFunction)),
      'L': mapChunksToWords(chunkBy(4, identityFunction)),
      'Q': mapChunksToWords(chunkBy(8, identityFunction)),
      'J': null,
      'S>': mapChunksToWords(invertChunks(chunkBy(2, identityFunction))),
      'L>': mapChunksToWords(invertChunks(chunkBy(4, identityFunction))),
      'Q>': mapChunksToWords(invertChunks(chunkBy(8, identityFunction))),
      'c': toNByteSigned(1, identityFunction),
      's': toNByteSigned(2, mapChunksToWords(chunkBy(2, identityFunction))),
      'l': toNByteSigned(4, mapChunksToWords(chunkBy(4, identityFunction))),
      'q': toNByteSigned(8, mapChunksToWords(chunkBy(8, identityFunction))),
      'j': null,
      's>': toNByteSigned(2, mapChunksToWords(invertChunks(chunkBy(2, identityFunction)))),
      'l>': toNByteSigned(4, mapChunksToWords(invertChunks(chunkBy(4, identityFunction)))),
      'q>': toNByteSigned(8, mapChunksToWords(invertChunks(chunkBy(8, identityFunction)))),
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': identityFunction,
      'w': decodeBERCompressedIntegers(identityFunction),
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': wrapIntoArray(joinChars(bytesToAsciiChars(filterTrailingZerosAndSpaces(identityFunction)))),
      'a': wrapIntoArray(joinChars(bytesToAsciiChars(identityFunction))),
      'Z': joinChars(bytesToAsciiChars(identityFunction)),
      'B': joinChars(identityFunction),
      'b': joinChars(identityFunction),
      'H': joinChars(identityFunction),
      'h': joinChars(identityFunction),
      'u': joinChars(bytesToAsciiChars(uudecode(identityFunction))),
      'M': qpdecode(joinChars(bytesToAsciiChars(identityFunction))),
      'm': base64Decode(joinChars(bytesToAsciiChars(identityFunction))),
      'P': null,
      'p': null
};
        function readBytes(n) {
      return function(bytes) {
        var chunk = bytes.slice(0, n);
        bytes = bytes.slice(n, bytes.length);
        return {
          chunk: chunk,
          rest: bytes
};
      };
    }
        function readUnicodeCharChunk(bytes) {
            function readByte() {
        var result = bytes[0];
        bytes = bytes.slice(1, bytes.length);
        return result;
      }
      var c = readByte(), extraLength;
      if(c >> 7 == 0) {
        return {
          chunk: [c],
          rest: bytes
};
      }
      if(c >> 6 == 2) {
        self.$raise($$($nesting, 'ArgumentError'), "malformed UTF-8 character");
      }
      if(c >> 5 == 6) {
        extraLength = 1;
      } else if(c >> 4 == 14) {
        extraLength = 2;
      } else if(c >> 3 == 30) {
        extraLength = 3;
      } else if(c >> 2 == 62) {
        extraLength = 4;
      } else if(c >> 1 == 126) {
        extraLength = 5;
      } else {
        self.$raise("malformed UTF-8 character");
      }
      if(extraLength > bytes.length) {
        ((expected = extraLength + 1), (given = bytes.length + 1), self.$raise($$($nesting, 'ArgumentError'), "" + "malformed UTF-8 character (expected " + (expected) + " bytes, given " + (given) + " bytes)"));
      }
      var mask = (1 << (8 - extraLength - 1)) - 1, result = c & mask;
      for(var i = 0; i < extraLength; i++) {
        c = readByte();
        if(c >> 6 != 2) {
          self.$raise("Invalid multibyte sequence");
        }
        result = (result << 6) | (c & 63);
      }
      if(result <= 65535) {
        return {
          chunk: [result],
          rest: bytes
};
      } else {
        result -= 65536;
        var high = ((result >> 10) & 1023) + 55296, low = (result & 1023) + 56320;
        return {
          chunk: [high, low],
          rest: bytes
};
      }
    }
        function readUuencodingChunk(buffer) {
      var length = buffer.indexOf(32);
      if(length === -1) {
        return {
          chunk: buffer,
          rest: []
};
      } else {
        return {
          chunk: buffer.slice(0, length),
          rest: buffer.slice(length, buffer.length)
};
      }
    }
        function readNBitsLSBFirst(buffer, count) {
      var result = '';
      while(count > 0 && buffer.length > 0) {
        var singleByte = buffer[0], bitsToTake = Math.min(count, 8), bytesToTake = Math.ceil(bitsToTake / 8);
        buffer = buffer.slice(1, buffer.length);
        if(singleByte != null) {
          var bits = singleByte.toString(2);
          bits = Array(8 - bits.length + 1).join('0').concat(bits).split('').reverse().join('');
          for(var j = 0; j < bitsToTake; j++) {
            result += bits[j] || '0';
            count--;
          }
        }
      }
      return {
        chunk: [result],
        rest: buffer
};
    }
        function readNBitsMSBFirst(buffer, count) {
      var result = '';
      while(count > 0 && buffer.length > 0) {
        var singleByte = buffer[0], bitsToTake = Math.min(count, 8), bytesToTake = Math.ceil(bitsToTake / 8);
        buffer = buffer.slice(1, buffer.length);
        if(singleByte != null) {
          var bits = singleByte.toString(2);
          bits = Array(8 - bits.length + 1).join('0').concat(bits);
          for(var j = 0; j < bitsToTake; j++) {
            result += bits[j] || '0';
            count--;
          }
        }
      }
      return {
        chunk: [result],
        rest: buffer
};
    }
        function readWhileFirstBitIsOne(buffer) {
      var result = [];
      for(var i = 0; i < buffer.length; i++) {
        var singleByte = buffer[i];
        result.push(singleByte);
        if((singleByte & 128) === 0) {
          break;
        }
      }
      return {
        chunk: result,
        rest: buffer.slice(result.length, buffer.length)
};
    }
        function readTillNullCharacter(buffer, count) {
      var result = [];
      for(var i = 0; i < count && i < buffer.length; i++) {
        var singleByte = buffer[i];
        if(singleByte === 0) {
          break;
        } else {
          result.push(singleByte);
        }
      }
      if(count === Infinity) {
        count = result.length;
      }
      if(buffer[count] === 0) {
        count++;
      }
      buffer = buffer.slice(count, buffer.length);
      return {
        chunk: result,
        rest: buffer
};
    }
        function readHexCharsHighNibbleFirst(buffer, count) {
      var result = [];
      while(count > 0 && buffer.length > 0) {
        var singleByte = buffer[0], hex = singleByte.toString(16);
        buffer = buffer.slice(1, buffer.length);
        hex = Array(2 - hex.length + 1).join('0').concat(hex);
        if(count === 1) {
          result.push(hex[0]);
          count--;
        } else {
          result.push(hex[0], hex[1]);
          count -= 2;
        }
      }
      return {
        chunk: result,
        rest: buffer
};
    }
        function readHexCharsLowNibbleFirst(buffer, count) {
      var result = [];
      while(count > 0 && buffer.length > 0) {
        var singleByte = buffer[0], hex = singleByte.toString(16);
        buffer = buffer.slice(1, buffer.length);
        hex = Array(2 - hex.length + 1).join('0').concat(hex);
        if(count === 1) {
          result.push(hex[1]);
          count--;
        } else {
          result.push(hex[1], hex[0]);
          count -= 2;
        }
      }
      return {
        chunk: result,
        rest: buffer
};
    }
        function readNTimesAndMerge(callback) {
      return function(buffer, count) {
        var chunk = [], chunkData;
        if(count === Infinity) {
          while(buffer.length > 0) {
            chunkData = callback(buffer);
            buffer = chunkData.rest;
            chunk = chunk.concat(chunkData.chunk);
          }
        } else {
          for(var i = 0; i < count; i++) {
            chunkData = callback(buffer);
            buffer = chunkData.rest;
            chunk = chunk.concat(chunkData.chunk);
          }
        }
        return {
          chunk: chunk,
          rest: buffer
};
      };
    }
        function readAll(buffer, count) {
      return {
        chunk: buffer,
        rest: []
};
    }
    var readChunk = {
      'C': readNTimesAndMerge(readBytes(1)),
      'S': readNTimesAndMerge(readBytes(2)),
      'L': readNTimesAndMerge(readBytes(4)),
      'Q': readNTimesAndMerge(readBytes(8)),
      'J': null,
      'S>': readNTimesAndMerge(readBytes(2)),
      'L>': readNTimesAndMerge(readBytes(4)),
      'Q>': readNTimesAndMerge(readBytes(8)),
      'c': readNTimesAndMerge(readBytes(1)),
      's': readNTimesAndMerge(readBytes(2)),
      'l': readNTimesAndMerge(readBytes(4)),
      'q': readNTimesAndMerge(readBytes(8)),
      'j': null,
      's>': readNTimesAndMerge(readBytes(2)),
      'l>': readNTimesAndMerge(readBytes(4)),
      'q>': readNTimesAndMerge(readBytes(8)),
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': readNTimesAndMerge(readUnicodeCharChunk),
      'w': readNTimesAndMerge(readWhileFirstBitIsOne),
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': readNTimesAndMerge(readBytes(1)),
      'a': readNTimesAndMerge(readBytes(1)),
      'Z': readTillNullCharacter,
      'B': readNBitsMSBFirst,
      'b': readNBitsLSBFirst,
      'H': readHexCharsHighNibbleFirst,
      'h': readHexCharsLowNibbleFirst,
      'u': readNTimesAndMerge(readUuencodingChunk),
      'M': readAll,
      'm': readAll,
      'P': null,
      'p': null
};
    var autocompletion = {
      'C': true,
      'S': true,
      'L': true,
      'Q': true,
      'J': null,
      'S>': true,
      'L>': true,
      'Q>': true,
      'c': true,
      's': true,
      'l': true,
      'q': true,
      'j': null,
      's>': true,
      'l>': true,
      'q>': true,
      'n': null,
      'N': null,
      'v': null,
      'V': null,
      'U': false,
      'w': false,
      'D': null,
      'd': null,
      'F': null,
      'f': null,
      'E': null,
      'e': null,
      'G': null,
      'g': null,
      'A': false,
      'a': false,
      'Z': false,
      'B': false,
      'b': false,
      'H': false,
      'h': false,
      'u': false,
      'M': false,
      'm': false,
      'P': null,
      'p': null
};
    var optimized = {
      'C*': handlers['C'],
      'c*': handlers['c'],
      'A*': handlers['A'],
      'a*': handlers['a'],
      'M*': wrapIntoArray(handlers['M']),
      'm*': wrapIntoArray(handlers['m']),
      'S*': handlers['S'],
      's*': handlers['s'],
      'L*': handlers['L'],
      'l*': handlers['l'],
      'Q*': handlers['Q'],
      'q*': handlers['q'],
      'S>*': handlers['S>'],
      's>*': handlers['s>'],
      'L>*': handlers['L>'],
      'l>*': handlers['l>'],
      'Q>*': handlers['Q>'],
      'q>*': handlers['q>']
};
        function alias(existingDirective, newDirective) {
      readChunk[newDirective] = readChunk[existingDirective];
      handlers[newDirective] = handlers[existingDirective];
      autocompletion[newDirective] = autocompletion[existingDirective];
    }
    alias('S>', 'n');
    alias('L>', 'N');
    alias('S', 'v');
    alias('L', 'V');
    ;
    Opal.def(self, '$unpack', $String_unpack$1 = function $$unpack(format) {
      var self = this;
      format = $$($nesting, 'Opal')['$coerce_to!'](format, $$($nesting, 'String'), "to_str").$gsub(/\s/, "").$delete("\u0000");
      var output = [];
      var buffer = utf16LEToBytes(self);
      var optimizedHandler = optimized[format];
      if(optimizedHandler) {
        return optimizedHandler(buffer);
      }
            function autocomplete(array, size) {
        while(array.length < size) {
          array.push(nil);
        }
        return array;
      }
            function processChunk(directive, count) {
        var chunk, chunkReader = readChunk[directive];
        if(chunkReader == null) {
          self.$raise("" + "Unsupported unpack directive " + ((directive).$inspect()) + " (no chunk reader defined)");
        }
        var chunkData = chunkReader(buffer, count);
        chunk = chunkData.chunk;
        buffer = chunkData.rest;
        var handler = handlers[directive];
        if(handler == null) {
          self.$raise("" + "Unsupported unpack directive " + ((directive).$inspect()) + " (no handler defined)");
        }
        return handler(chunk);
      }
      eachDirectiveAndCount(format, function(directive, count) {
        var part = processChunk(directive, count);
        if(count !== Infinity) {
          var shouldAutocomplete = autocompletion[directive];
          if(shouldAutocomplete == null) {
            self.$raise("" + "Unsupported unpack directive " + ((directive).$inspect()) + " (no autocompletion rule defined)");
          }
          if(shouldAutocomplete) {
            autocomplete(part, count);
          }
        }
        output = output.concat(part);
      });
      return output;
      ;
    }, $String_unpack$1.$$arity = 1);
    return (/* destroyed: TreeShaking#shake_methods/$unpack1 */0, nil) && 'unpack1';
  })($nesting[0], null, $nesting);
};
Opal.modules["onigmo/ffi"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("ffi");
  self.$require("corelib/array/pack");
  self.$require("corelib/string/unpack");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Onigmo');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'FFI');
      var $nesting = [self].concat($parent_nesting);
      self.$include($$$($$($nesting, 'Onigmo'), 'Constants'));
      self.$extend($$$($$$('::', 'FFI'), 'Library'));
      self.$ffi_lib("onigmo/onigmo-wasm");
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Regexp');
        var $nesting = [self].concat($parent_nesting);
        return self.$layout("p", "pointer", "used", "uint", "alloc", "uint", "num_mem", "int", "num_repeat", "int", "num_null_check", "int", "num_comb_exp_check", "int", "num_call", "int", "capture_history", "uint", "bt_mem_start", "uint", "bt_mem_end", "uint", "stack_pop_level", "int", "repeat_range_alloc", "int", "options", "int", "repeat_range", "pointer", "encoding", "pointer", "syntax", "pointer", "name_table", "pointer", "casefold", "int", "optimize", "int", "threshold_len", "int", "anchor", "int", "anchor_dmin", "long", "anchor_dmax", "long", "sub_anchor", "int", "exact", "pointer", "exact_end", "pointer", "map", ["uchar", 256], "reserved1", "pointer", "reserved2", "pointer", "dmin", "long", "dmax", "long", "chain", "pointer");
      })($nesting[0], $$$($$$('::', 'FFI'), 'Struct'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'RegexpPtr');
        var $nesting = [self].concat($parent_nesting), $RegexpPtr_value$1;
        self.$layout("value", $$($nesting, 'Regexp').$ptr());
        return (Opal.def(self, '$value', $RegexpPtr_value$1 = function $$value() {
          var self = this;
          return self['$[]']("value");
        }, $RegexpPtr_value$1.$$arity = 0), nil) && 'value';
      })($nesting[0], $$$($$$('::', 'FFI'), 'Struct'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'Region');
        var $nesting = [self].concat($parent_nesting);
        return self.$layout("allocated", "int", "num_regs", "int", "beg", "pointer", "end", "pointer");
      })($nesting[0], $$$($$$('::', 'FFI'), 'Struct'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'CompileInfo');
        var $nesting = [self].concat($parent_nesting), $CompileInfo_default_compile_info$2, $CompileInfo_options$5, $CompileInfo_options$eq$6;
        self.$layout("num_of_elements", "int", "pattern_enc", "pointer", "target_enc", "pointer", "syntax", "pointer", "option", "uint", "case_fold_flag", "uint");
        Opal.defs(self, '$default_compile_info', $CompileInfo_default_compile_info$2 = function $$default_compile_info() {
          var $a, $$3, self = this;
          if(self["default"] == null) self["default"] = nil;
          return (self["default"] = ($truthy($a = self["default"]) ? $a : $send($$$($$($nesting, 'Onigmo'), 'FFI'), 'context', [], ($$3 = function() {
            var self = $$3.$$s || this, $$4;
            return $send(self.$new(), 'tap', [], ($$4 = function(ci) {
              var self = $$4.$$s || this, $writer = nil;
              if(ci == null) {
                ci = nil;
              }
              ;
              $writer = ["num_of_elements", 5];
              $send(ci, '[]=', Opal.to_a($writer));
              $writer[$rb_minus($writer["length"], 1)];
              ;
              $writer = ["pattern_enc", $$$($$($nesting, 'Onigmo'), 'FFI').$library().$exports()['$[]']("OnigEncodingUTF_16LE")];
              $send(ci, '[]=', Opal.to_a($writer));
              $writer[$rb_minus($writer["length"], 1)];
              ;
              $writer = ["target_enc", $$$($$($nesting, 'Onigmo'), 'FFI').$library().$exports()['$[]']("OnigEncodingUTF_16LE")];
              $send(ci, '[]=', Opal.to_a($writer));
              $writer[$rb_minus($writer["length"], 1)];
              ;
              $writer = ["syntax", $$$($$($nesting, 'Onigmo'), 'FFI').$library().$exports()['$[]']("OnigSyntaxRuby")];
              $send(ci, '[]=', Opal.to_a($writer));
              $writer[$rb_minus($writer["length"], 1)];
              ;
              $writer = ["option", $$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_NONE')];
              $send(ci, '[]=', Opal.to_a($writer));
              $writer[$rb_minus($writer["length"], 1)];
              ;
              $writer = ["case_fold_flag", $$$($$($nesting, 'Onigmo'), 'FFI').$library().$exports()['$[]']("OnigDefaultCaseFoldFlag").$value()];
              $send(ci, '[]=', Opal.to_a($writer));
              return $writer[$rb_minus($writer["length"], 1)];
              ;
            }, $$4.$$s = self, $$4.$$arity = 1, $$4));
          }, $$3.$$s = self, $$3.$$arity = 0, $$3))));
        }, $CompileInfo_default_compile_info$2.$$arity = 0);
        Opal.def(self, '$options', $CompileInfo_options$5 = function $$options() {
          var self = this;
          return self['$[]']("option");
        }, $CompileInfo_options$5.$$arity = 0);
        return (Opal.def(self, '$options=', $CompileInfo_options$eq$6 = function(value) {
          var self = this, $writer = nil;
          $writer = ["option", value];
          $send(self, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }, $CompileInfo_options$eq$6.$$arity = 1), nil) && 'options=';
      })($nesting[0], $$$($$$('::', 'FFI'), 'Struct'), $nesting);
      (function($base, $super, $parent_nesting) {
        var self = $klass($base, $super, 'ErrorInfo');
        var $nesting = [self].concat($parent_nesting), $ErrorInfo_cached$7;
        self.$layout("enc", "pointer", "par", "pointer", "par_end", "pointer");
        return (Opal.defs(self, '$cached', $ErrorInfo_cached$7 = function $$cached() {
          var $a, self = this;
          if(self.cached == null) self.cached = nil;
          return (self.cached = ($truthy($a = self.cached) ? $a : self.$new()));
        }, $ErrorInfo_cached$7.$$arity = 0), nil) && 'cached';
      })($nesting[0], $$$($$$('::', 'FFI'), 'Struct'), $nesting);
      self.$attach_function("onig_new_deluxe", [$$($nesting, 'RegexpPtr'), "pointer", "pointer", $$($nesting, 'CompileInfo'), $$($nesting, 'ErrorInfo')], "int");
      self.$attach_function("onig_match", [$$($nesting, 'Regexp'), "pointer", "pointer", "pointer", $$($nesting, 'Region'), "uint"], "int");
      self.$attach_function("onig_search", [$$($nesting, 'Regexp'), "pointer", "pointer", "pointer", "pointer", $$($nesting, 'Region'), "uint"], "int");
      self.$attach_function("onig_free", [$$($nesting, 'Regexp')], "void");
      self.$attach_function("onig_region_new", [], $$($nesting, 'Region'));
      self.$attach_function("onig_region_free", [$$($nesting, 'Region'), "int"], "void");
    })($nesting[0], $nesting);
    $$$($$($nesting, 'Onigmo'), 'FFI').$library().$memory().$grow(128);
  })($nesting[0], $nesting);
};
Opal.modules["onigmo/regexp"] = function(Opal) {
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $gvars = Opal.gvars, $range = Opal.range, $hash2 = Opal.hash2;
  /* destroyed: CollapseStubs */0;
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Onigmo');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'Regexp');
      var $nesting = [self].concat($parent_nesting), $Regexp_match$1, $Regexp_match$ques$3, $Regexp_$eq_tilde$4, $Regexp_inspect$5, $Regexp_initialize$6, $Regexp_ffi_evaluate$9, $Regexp_ffi_region$13, $Regexp_matches$14, $Regexp_ffi_free$15, $Regexp_evaluate$16, $Regexp_js_matches$17, $Regexp_js_exec$20, $Regexp_reset$21;
      self.$$prototype.ffi_region = self.$$prototype.region = self.$$prototype.matches = self.$$prototype.ffi_regexp = self.$$prototype.lastIndex = nil;
      Opal.defineProperty(self.$$prototype, '$$is_regexp', true);
      Opal.defineProperty(self.$$prototype, 'global', true);
      Opal.defineProperty(self.$$prototype, 'multiline', true);
      Opal.def(self, '$match', $Regexp_match$1 = function $$match(str, offset) {
        var $iter = $Regexp_match$1.$$p, block = $iter || nil, $a, $$2, self = this;
        if($iter) $Regexp_match$1.$$p = null;
        if($iter) $Regexp_match$1.$$p = null;
        ;
        if(offset == null) {
          offset = nil;
        }
        ;
        block = ($truthy($a = block) ? $a : $send(self, 'proc', [], ($$2 = function(i) {
          var self = $$2.$$s || this;
          if(i == null) {
            i = nil;
          }
          ;
          return i;
        }, $$2.$$s = self, $$2.$$arity = 1, $$2)));
        return ($truthy($a = self.$evaluate(str, offset)) ? block.$call($$($nesting, 'MatchData').$new(self, self.$js_matches(str))) : $a);
      }, $Regexp_match$1.$$arity = -2);
      Opal.def(self, '$match?', $Regexp_match$ques$3 = function(str, offset) {
        var self = this;
        if(offset == null) {
          offset = nil;
        }
        ;
        return self.$evaluate(str, offset)['$!']()['$!']();
      }, $Regexp_match$ques$3.$$arity = -2);
      Opal.def(self, '$=~', $Regexp_$eq_tilde$4 = function(str) {
        var $a, self = this;
        if($gvars["~"] == null) $gvars["~"] = nil;
        return ($truthy($a = self.$match(str)) ? $gvars["~"].$begin(0) : $a);
      }, $Regexp_$eq_tilde$4.$$arity = 1);
      Opal.def(self, '$inspect', $Regexp_inspect$5 = function $$inspect() {
        var self = this;
        return "" + "/" + (self.$pattern().$inspect()['$[]']($range(1, -2, false))) + "/O" + (self.$options());
      }, $Regexp_inspect$5.$$arity = 0);
      Opal.def(self, '$initialize', $Regexp_initialize$6 = function $$initialize(pattern, options) {
        var $$7, $$8, self = this, out = nil;
        if(options == null) {
          options = "";
        }
        ;
        if($truthy(pattern['$is_a?']($$$($$($nesting, 'Onigmo'), 'Regexp')))) {
          pattern = pattern.$pattern();
        }
        ;
        self.lastIndex = 0;
        self.pattern = pattern.$encode("UTF-16LE");
        self.options = options;
        out = nil;
        $send($$$($$($nesting, 'Onigmo'), 'FFI'), 'context', [], ($$7 = function() {
          var self = $$7.$$s || this, ffi_regexpptr = nil, ffi_options = nil, ffi_errorinfo = nil, ffi_pattern = nil, ffi_pattern_end = nil, $writer = nil;
          if(self.pattern == null) self.pattern = nil;
          ffi_regexpptr = $$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'RegexpPtr').$new();
          ffi_options = $$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'CompileInfo').$default_compile_info();
          ffi_errorinfo = $$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ErrorInfo').$cached();
          ffi_pattern = $$($nesting, 'Onigmo').$buffer(self.pattern);
          ffi_pattern_end = $rb_plus(ffi_pattern, $rb_times(self.pattern.$length(), 2));
          $writer = [$$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_NONE')];
          $send(ffi_options, 'options=', Opal.to_a($writer));
          $writer[$rb_minus($writer["length"], 1)];
          ;
          if($truthy(options['$include?']("i"))) {
            $writer = [ffi_options.$options()['$|']($$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_IGNORECASE'))];
            $send(ffi_options, 'options=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
          }
          ;
          if($truthy(options['$include?']("m"))) {
            $writer = [ffi_options.$options()['$|']($$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_MULTILINE'))];
            $send(ffi_options, 'options=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
          }
          ;
          if($truthy(options['$include?']("x"))) {
            $writer = [ffi_options.$options()['$|']($$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_EXTEND'))];
            $send(ffi_options, 'options=', Opal.to_a($writer));
            $writer[$rb_minus($writer["length"], 1)];
          }
          ;
          out = $$$($$($nesting, 'Onigmo'), 'FFI').$onig_new_deluxe(ffi_regexpptr, ffi_pattern, ffi_pattern_end, ffi_options, ffi_errorinfo);
          self.ffi_regexp = ffi_regexpptr.$value();
          return ffi_regexpptr.$free();
        }, $$7.$$s = self, $$7.$$arity = 0, $$7));
        self.exec = $send(self, 'proc', [], ($$8 = function(re) {
          var self = $$8.$$s || this;
          if(re == null) {
            re = nil;
          }
          ;
          return self.$js_exec(re);
        }, $$8.$$s = self, $$8.$$arity = 1, $$8));
        if(out['$==']($$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_NORMAL'))) {
          return nil;
        } else {
          return self.$raise($$($nesting, 'RuntimeError'), "" + "Onigmo has failed with an error code '" + (out) + "'");
        }
        ;
      }, $Regexp_initialize$6.$$arity = -2);
      self.$attr_accessor("pattern", "options");
      Opal.def(self, '$ffi_evaluate', $Regexp_ffi_evaluate$9 = function $$ffi_evaluate(string, offset) {
        var $a, $$10, $$11, $$12, self = this, out = nil;
        if(offset == null) {
          offset = 0;
        }
        ;
        offset = ($truthy($a = offset) ? $a : 0);
        self.ffi_region = $$$($$($nesting, 'Onigmo'), 'FFI').$onig_region_new();
        string = string.$encode("UTF-16LE");
        out = $send($$$($$($nesting, 'Onigmo'), 'FFI'), 'context', [], ($$10 = function() {
          var self = $$10.$$s || this, ffi_string = nil, ffi_string_end = nil, ffi_string_offset = nil;
          if(self.ffi_regexp == null) self.ffi_regexp = nil;
          if(self.ffi_region == null) self.ffi_region = nil;
          ffi_string = $$($nesting, 'Onigmo').$buffer(string);
          ffi_string_end = $rb_plus(ffi_string, $rb_times(string.$length(), 2));
          ffi_string_offset = $rb_plus(ffi_string, $rb_times(offset, 2));
          return $$$($$($nesting, 'Onigmo'), 'FFI').$onig_search(self.ffi_regexp, ffi_string, ffi_string_end, ffi_string_offset, ffi_string_end, self.ffi_region, $$$($$$($$($nesting, 'Onigmo'), 'FFI'), 'ONIG_OPTION_NONE'));
        }, $$10.$$s = self, $$10.$$arity = 0, $$10));
        self.region = $send(self.ffi_region['$[]']("num_regs").$times(), 'map', [], ($$11 = function(i) {
          var self = $$11.$$s || this;
          if(self.ffi_region == null) self.ffi_region = nil;
          if(i == null) {
            i = nil;
          }
          ;
          return [self.ffi_region['$[]']("beg").$get("long", $rb_times(i, 4)), self.ffi_region['$[]']("end").$get("long", $rb_times(i, 4))];
        }, $$11.$$s = self, $$11.$$arity = 1, $$11));
        $$$($$($nesting, 'Onigmo'), 'FFI').$onig_region_free(self.ffi_region, 1);
        self.matches = $send(self.region, 'map', [], ($$12 = function(b, e) {
          var self = $$12.$$s || this;
          if(b == null) {
            b = nil;
          }
          ;
          if(e == null) {
            e = nil;
          }
          ;
          return string['$[]'](Opal.Range.$new($rb_divide(b, 2), $rb_divide(e, 2), true));
        }, $$12.$$s = self, $$12.$$arity = 2, $$12));
        return out;
      }, $Regexp_ffi_evaluate$9.$$arity = -2);
      Opal.def(self, '$ffi_region', $Regexp_ffi_region$13 = function $$ffi_region() {
        var self = this;
        return self.region;
      }, $Regexp_ffi_region$13.$$arity = 0);
      Opal.def(self, '$matches', $Regexp_matches$14 = function $$matches() {
        var self = this;
        return self.matches;
      }, $Regexp_matches$14.$$arity = 0);
      /* destroyed: TreeShaking#shake_methods/$ffi_free */0;
      Opal.def(self, '$evaluate', $Regexp_evaluate$16 = function $$evaluate(string, offset) {
        var self = this, out = nil;
        if(offset == null) {
          offset = 0;
        }
        ;
        out = self.$ffi_evaluate(string, offset);
        if($truthy($rb_lt(out, 0))) {
          return nil;
        } else {
          return $rb_divide(out, 2);
        }
        ;
      }, $Regexp_evaluate$16.$$arity = -2);
      Opal.def(self, '$js_matches', $Regexp_js_matches$17 = function $$js_matches(str) {
        var $$18, $$19, self = this, ms = nil, region = nil, out = nil;
        ms = self.$matches();
        region = self.$ffi_region();
        out = $hash2(["input", "index", "length", "slice"], {
          "input": str,
          "index": $rb_divide(region['$[]'](0)['$[]'](0), 2),
          "length": ms.$length(),
          "slice": $send(self, 'proc', [], ($$18 = function(i) {
            var self = $$18.$$s || this;
            if(i == null) {
              i = nil;
            }
            ;
            return self.$matches()['$[]'](Opal.Range.$new(i, -1, false));
          }, $$18.$$s = self, $$18.$$arity = 1, $$18))
});
        out = out.$to_n();
        $send(ms, 'each_with_index', [], ($$19 = function(m, i) {
          var self = $$19.$$s || this;
          if(m == null) {
            m = nil;
          }
          ;
          if(i == null) {
            i = nil;
          }
          ;
          return out[i] = m;
        }, $$19.$$s = self, $$19.$$arity = 2, $$19));
        self.lastIndex = $rb_divide(region['$[]'](0)['$[]'](1), 2);
        return out;
      }, $Regexp_js_matches$17.$$arity = 1);
      Opal.def(self, '$js_exec', $Regexp_js_exec$20 = function $$js_exec(str) {
        var $a, self = this;
        if($truthy(self.$evaluate(str, ($truthy($a = self.lastIndex) ? $a : 0)))) {
          return self.$js_matches(str);
        } else {
          self.lastIndex = 0;
          return nil.$to_n();
        }
      }, $Regexp_js_exec$20.$$arity = 1);
      return (Opal.def(self, '$reset', $Regexp_reset$21 = function $$reset() {
        var self = this;
        self.lastIndex = 0;
        return self;
      }, $Regexp_reset$21.$$arity = 0), nil) && 'reset';
    })($nesting[0], null, $nesting);
  })($nesting[0], $nesting);
};
Opal.modules["onigmo"] = function(Opal) {
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_times(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $send = Opal.send, $truthy = Opal.truthy;
  /* destroyed: CollapseStubs */0;
  self.$require("onigmo/constants");
  self.$require("onigmo/onigmo-wasm");
  self.$require("onigmo/ffi");
  self.$require("onigmo/regexp");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Onigmo');
    var $nesting = [self].concat($parent_nesting), $Onigmo_buffer$1;
    Opal.defs(self, '$buffer', $Onigmo_buffer$1 = function $$buffer(str) {
      var $$2, self = this;
      return $send($$$($$($nesting, 'Onigmo'), 'FFI'), 'context', [], ($$2 = function() {
        var self = $$2.$$s || this, $a, current_size = nil;
        if(self.buffer_size == null) self.buffer_size = nil;
        if(self.buffer == null) self.buffer = nil;
        self.buffer_size = ($truthy($a = self.buffer_size) ? $a : 1024);
        self.buffer = ($truthy($a = self.buffer) ? $a : $$$($$$('::', 'FFI'), 'Pointer').$new("uint8", 640000));
        current_size = self.buffer_size;
        while($truthy($rb_gt($rb_times(str.$length(), 2), self.buffer_size))) {
          self.buffer_size = $rb_times(self.buffer_size, 2);
        }
        ;
        if($truthy(current_size['$!='](self.buffer_size))) {
          self.buffer.$resize(self.buffer_size);
        }
        ;
        self.buffer.$write_string(str);
        return self.buffer;
      }, $$2.$$s = self, $$2.$$arity = 0, $$2));
    }, $Onigmo_buffer$1.$$arity = 1);
  })($nesting[0], $nesting);
};
Opal.modules["onigmo/core_ext"] = function(Opal) {
    function $rb_divide(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $range = Opal.range;
  /* destroyed: CollapseStubs */0;
  self.$require("onigmo");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_match$1, $String_match$ques$2, $String_gsub$3;
    Opal.alias(self, "match_before_onigmo", "match");
    Opal.def(self, '$match', $String_match$1 = function $$match(re, pos) {
      var $iter = $String_match$1.$$p, block = $iter || nil, self = this;
      if($iter) $String_match$1.$$p = null;
      if($iter) $String_match$1.$$p = null;
      ;
      ;
      if($truthy($$$($$($nesting, 'Onigmo'), 'Regexp')['$==='](re))) {
        return $send(re, 'match', [self, pos], block.$to_proc());
      } else {
        return $send(self, 'match_before_onigmo', [re, pos], block.$to_proc());
      }
      ;
    }, $String_match$1.$$arity = -2);
    Opal.alias(self, "match_before_onigmo?", "match?");
    Opal.def(self, '$match?', $String_match$ques$2 = function(re, pos) {
      var $iter = $String_match$ques$2.$$p, block = $iter || nil, self = this;
      if($iter) $String_match$ques$2.$$p = null;
      if($iter) $String_match$ques$2.$$p = null;
      ;
      ;
      if($truthy($$$($$($nesting, 'Onigmo'), 'Regexp')['$==='](re))) {
        return $send(re, 'match?', [self, pos], block.$to_proc());
      } else {
        return $send(self, 'match_before_onigmo?', [re, pos], block.$to_proc());
      }
      ;
    }, $String_match$ques$2.$$arity = -2);
    Opal.alias(self, "gsub_before_onigmo", "gsub");
    return (Opal.def(self, '$gsub', $String_gsub$3 = function $$gsub(from, to) {
      var $iter = $String_gsub$3.$$p, block = $iter || nil, $$4, self = this, out = nil, index = nil;
      if($iter) $String_gsub$3.$$p = null;
      if($iter) $String_gsub$3.$$p = null;
      ;
      ;
      if($truthy($$$($$($nesting, 'Onigmo'), 'Regexp')['$==='](from))) {
        out = [];
        index = 0;
        (function() {
          var $brk = Opal.new_brk();
          try {
            return $send(self, 'loop', [], ($$4 = function() {
              var self = $$4.$$s || this, $a, $b, $$5, $$6, o = nil, bgn = nil, fin = nil, matches = nil, md = nil, _to = nil;
              o = from.$evaluate(self, index);
              if(o['$=='](nil)) {
                out['$<<'](self['$[]'](Opal.Range.$new(index, -1, false)));
                Opal.brk(nil, $brk);
              }
              ;
              $b = $send(from.$ffi_region()['$[]'](0), 'map', [], ($$5 = function(i) {
                var self = $$5.$$s || this;
                if(i == null) {
                  i = nil;
                }
                ;
                return $rb_divide(i, 2);
              }, $$5.$$s = self, $$5.$$arity = 1, $$5)), $a = Opal.to_ary($b), (bgn = ($a[0] == null ? nil : $a[0])), (fin = ($a[1] == null ? nil : $a[1])), $b;
              matches = from.$matches();
              md = $$($nesting, 'MatchData').$new(from, from.$js_matches(self));
              out['$<<'](self['$[]'](Opal.Range.$new(index, bgn, true)));
              if($truthy(($truthy($a = block) ? to === undefined : $a))) {
                out['$<<'](block.$call(matches['$[]'](0)));
              } else {
                _to = to.replace(/([\\]+)([0-9+&`'\\])/g, ($$6 = function(original, slashes, command) {
                  var self = $$6.$$s || this, $c, $case = nil;
                  if(original == null) {
                    original = nil;
                  }
                  ;
                  if(slashes == null) {
                    slashes = nil;
                  }
                  ;
                  if(command == null) {
                    command = nil;
                  }
                  ;
                  if(slashes.$length()['$%'](2)['$=='](0)) {
                    return original;
                  } else {
                    slashes = slashes['$[]']($range(0, -2, false));
                    return (function() {
                      $case = command;
                      if("+"['$===']($case) || "&"['$===']($case) || "`"['$===']($case) || "'"['$===']($case)) {
                        return self.$raise($$($nesting, 'NotImplementedError'));
                      } else if("\\"['$===']($case)) {
                        return $rb_plus(slashes, "\\");
                      } else {
                        return $rb_plus(slashes, ($truthy($c = matches['$[]'](command.$to_i())) ? $c : ""));
                      }
                    })();
                  }
                  ;
                }, $$6.$$s = self, $$6.$$arity = 3, $$6));
                out['$<<'](_to);
              }
              ;
              if(bgn['$=='](fin)) {
                fin = $rb_plus(fin, 1);
                out['$<<'](self['$[]'](bgn));
              }
              ;
              return (index = fin);
            }, $$4.$$s = self, $$4.$$brk = $brk, $$4.$$arity = 0, $$4));
          } catch(err) {
            if(err === $brk) {
              return err.$v;
            } else {
              throw err;
            }
          }
        })();
        return out.$join();
      } else {
        return $send(self, 'gsub_before_onigmo', [from, to], block.$to_proc());
      }
      ;
    }, $String_gsub$3.$$arity = -2), nil) && 'gsub';
  })($nesting[0], null, $nesting);
};
Opal.modules["interscript/opal"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $truthy = Opal.truthy, $hash2 = Opal.hash2, $send = Opal.send, $klass = Opal.klass;
  /* destroyed: CollapseStubs */0;
  self.$require("onigmo");
  self.$require("onigmo/core_ext");
  $$$($$($nesting, 'Onigmo'), 'FFI').$library().$memory().$grow(128);
  (function($base, $parent_nesting) {
    var self = $module($base, 'Interscript');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $parent_nesting) {
      var self = $module($base, 'Opal');
      var $nesting = [self].concat($parent_nesting), $Opal_mkregexp$1, $Opal_sub_replace$2, $Opal_external_processing$3, $Opal_load_map_json$4, $Opal_load_maps$6, $Opal_aliases$15, $Opal_map_exist$ques$16, $Opal_map_loaded$ques$17;
      Opal.def(self, '$mkregexp', $Opal_mkregexp$1 = function $$mkregexp(regexpstring) {
        var $a, self = this, s = nil, $writer = nil;
        if(self.cache == null) self.cache = nil;
        self.cache = ($truthy($a = self.cache) ? $a : $hash2([], { }));
        if($truthy((s = self.cache['$[]'](regexpstring)))) {
          return s;
        } else if($truthy(/[\\$^\[\]]|\(\?/['$match?'](regexpstring))) {
          $writer = [regexpstring, $$$($$($nesting, 'Onigmo'), 'Regexp').$new(regexpstring)];
          $send(self.cache, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        } else {
          $writer = [regexpstring, $$($nesting, 'Regexp').$new(regexpstring)];
          $send(self.cache, '[]=', Opal.to_a($writer));
          return $writer[$rb_minus($writer["length"], 1)];
        }
        ;
      }, $Opal_mkregexp$1.$$arity = 1);
      Opal.def(self, '$sub_replace', $Opal_sub_replace$2 = function $$sub_replace(string, pos, size, repl) {
        var self = this;
        return $rb_plus($rb_plus(string['$[]'](0, pos), repl), string['$[]'](Opal.Range.$new($rb_plus(pos, size), -1, false)));
      }, $Opal_sub_replace$2.$$arity = 4);
      Opal.def(self, '$external_processing', $Opal_external_processing$3 = function $$external_processing(mapping, string) {
        var self = this;
        return string;
      }, $Opal_external_processing$3.$$arity = 2);
      Opal.def(self, '$load_map_json', $Opal_load_map_json$4 = function $$load_map_json(_, json) {
        var $$5, self = this;
        if($truthy(self['$native?'](json))) {
          json = $$($nesting, 'Hash').$new(json);
        }
        ;
        if($truthy($$($nesting, 'String')['$==='](json))) {
          json = $$($nesting, 'JSON').$load(json);
        }
        ;
        return $send(json, 'each', [], ($$5 = function(k, v) {
          var self = $$5.$$s || this;
          if(k == null) {
            k = nil;
          }
          ;
          if(v == null) {
            v = nil;
          }
          ;
          return Opal.global.InterscriptMaps[k] = $$($nesting, 'JSON').$dump(v);
        }, $$5.$$s = self, $$5.$$arity = 2, $$5));
      }, $Opal_load_map_json$4.$$arity = 2);
      Opal.def(self, '$load_maps', $Opal_load_maps$6 = function $$load_maps(opts) {
        var $iter = $Opal_load_maps$6.$$p, block = $iter || nil, $$7, $a, $$8, $$9, $$10, self = this, defaults = nil, $writer = nil, prom = nil, maps = nil;
        if($iter) $Opal_load_maps$6.$$p = null;
        if($iter) $Opal_load_maps$6.$$p = null;
        ;
        if($truthy(self['$native?'](opts))) {
          opts = $$($nesting, 'Hash').$new(opts);
        }
        ;
        defaults = $hash2(["maps", "path", "node_path", "ajax_path", "loader", "processor"], {
          "maps": [],
          "path": nil,
          "node_path": "./maps/",
          "ajax_path": "maps/",
          "loader": nil,
          "processor": $send(self, 'proc', [], ($$7 = function(i) {
            var self = $$7.$$s || this;
            if(i == null) {
              i = nil;
            }
            ;
            return i;
          }, $$7.$$s = self, $$7.$$arity = 1, $$7))
});
        opts = defaults.$merge(opts);
        $writer = ["maps", self.$Array(opts['$[]']("maps"))];
        $send(opts, '[]=', Opal.to_a($writer));
        $writer[$rb_minus($writer["length"], 1)];
        ;
        var ajax_loader = function(map) {
          return new Promise(function(ok, fail) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
              if(httpRequest.readyState === XMLHttpRequest.DONE) {
                if(httpRequest.responseText) {
                  ok(JSON.parse(httpRequest.responseText));
                } else {
                  if(is_local) {
                    console.log(httpRequest.responseText);
                    fail("Ajax failed load: " + map + ". Status: " + httpRequest.statusText + ". " + "Are you running this locally? Try adding: " + "--allow-file-access-from-files to your Chromium command line.");
                  } else fail("Ajax failed load: " + map + ". Status: " + httpRequest.statusText);
                }
              }
            };
            httpRequest.open('GET', ($truthy($a = opts['$[]']("path")) ? $a : opts['$[]']("ajax_path")) + map + ".json", true);
            httpRequest.send();
          });
        };
        var fetch_loader = function(map) {
          return fetch(($truthy($a = opts['$[]']("path")) ? $a : opts['$[]']("ajax_path")) + map + ".json").then(function(response) {
            return response.json();
          });
        };
        var node_loader = function(map) {
          var resolve = null, error = null;
          var prom = new Promise(function(ok, fail) {
            resolve = ok;
            error = fail;
          });
          try {
            var node_require = eval("require");
            var data = node_require(($truthy($a = opts['$[]']("path")) ? $a : opts['$[]']("node_path")) + map + '.json');
            resolve(data);
          } catch(e) {
            error("Node failed load: " + map + ". Error: " + e);
          }
          return prom;
        };
        var is_local = false;
        if(typeof document !== "undefined" && typeof document.location !== "undefined" && typeof document.location.protocol !== "undefined") {
          is_local = document.location.protocol == "file:";
        }
        var loader = function(map) {
          if(opts['$[]']("loader")['$!='](nil)) {
            return opts['$[]']("loader")(opts['$[]']("path") + map + '.json').then(opts['$[]']("processor"));
          } else if(typeof window !== "undefined") {
            return ajax_loader(map);
          } else if(typeof global !== "undefined") {
            return node_loader(map);
          } else if(!is_local && typeof fetch === "function") {
            return fetch_loader(map);
          } else {
            self.$raise($$($nesting, 'StandardError'), "We couldn't find a good way to load a map");
          }
        };
        ;
        prom = new Promise(function(ok, fail) {
          ((maps = opts['$[]']("maps")), (maps = $send(maps, 'map', [], ($$8 = function(i) {
            var self = $$8.$$s || this;
            if(i == null) {
              i = nil;
            }
            ;
            return self.$map_resolve(i);
          }, $$8.$$s = self, $$8.$$arity = 1, $$8))), (maps = $send(maps, 'reject', [], ($$9 = function(i) {
            var self = $$9.$$s || this;
            if(i == null) {
              i = nil;
            }
            ;
            return self['$map_loaded?'](i);
          }, $$9.$$s = self, $$9.$$arity = 1, $$9))), (maps = $send(maps, 'map', [], ($$10 = function(i) {
            var self = $$10.$$s || this, $$11, $$14;
            if(i == null) {
              i = nil;
            }
            ;
            return (loader(i)).then(($$11 = function(map) {
              var self = $$11.$$s || this, $$12, $$13, m = nil, inherits = nil;
              if(map == null) {
                map = nil;
              }
              ;
              self.$load_map_json(nil, map);
              m = self.$Native(map);
              inherits = [];
              $send(m, 'each', [], ($$12 = function(mapname, mapvalue) {
                var self = $$12.$$s || this;
                if(mapname == null) {
                  mapname = nil;
                }
                ;
                if(mapvalue == null) {
                  mapvalue = nil;
                }
                ;
                inherits = $rb_plus(inherits, self.$Array(self.$Native(mapvalue)['$[]']("map")['$[]']("inherit")));
                return (inherits = $rb_plus(inherits, self.$Array(self.$Native(mapvalue)['$[]']("chain"))));
              }, $$12.$$s = self, $$12.$$arity = 2, $$12));
              inherits = inherits.$uniq();
              inherits = $send(inherits, 'reject', [], ($$13 = function(i) {
                var self = $$13.$$s || this;
                if(i == null) {
                  i = nil;
                }
                ;
                return self['$map_loaded?'](i);
              }, $$13.$$s = self, $$13.$$arity = 1, $$13));
              if($truthy(inherits['$empty?']())) {
                return nil;
              } else {
                return self.$load_maps(opts.$merge($hash2(["maps"], {
                  "maps": inherits
})));
              }
              ;
            }, $$11.$$s = self, $$11.$$arity = 1, $$11)).catch(($$14 = function(response) {
              var self = $$14.$$s || this;
              if(response == null) {
                response = nil;
              }
              ;
              return fail(response);
            }, $$14.$$s = self, $$14.$$arity = 1, $$14));
          }, $$10.$$s = self, $$10.$$arity = 1, $$10))));
          Promise.all(maps).then(ok).catch(fail);
        });
        if((block !== nil)) {
          return prom.then(block);
        } else {
          return prom;
        }
        ;
      }, $Opal_load_maps$6.$$arity = 1);
      Opal.def(self, '$aliases', $Opal_aliases$15 = function $$aliases() {
        var $a, self = this;
        if(self.aliases == null) self.aliases = nil;
        return (self.aliases = ($truthy($a = self.aliases) ? $a : $$($nesting, 'Hash').$new(Opal.global.InterscriptMapAliases)));
      }, $Opal_aliases$15.$$arity = 0);
      Opal.def(self, '$map_exist?', $Opal_map_exist$ques$16 = function(map) {
        var self = this;
        return typeof (Opal.global.InterscriptMaps[map]) !== 'undefined';
      }, $Opal_map_exist$ques$16.$$arity = 1);
      Opal.def(self, '$map_loaded?', $Opal_map_loaded$ques$17 = function(map) {
        var self = this;
        return !!Opal.global.InterscriptMaps[map];
      }, $Opal_map_loaded$ques$17.$$arity = 1);
    })($nesting[0], $nesting);
  })($nesting[0], $nesting);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'String');
    var $nesting = [self].concat($parent_nesting), $String_unicode_normalize$18;
    return (Opal.def(self, '$unicode_normalize', $String_unicode_normalize$18 = function $$unicode_normalize() {
      var self = this;
      return self.normalize();
    }, $String_unicode_normalize$18.$$arity = 0), nil) && 'unicode_normalize';
  })($nesting[0], null, $nesting);
};
Opal.modules["interscript"] = function(Opal) {
    function $rb_minus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
    function $rb_gt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
    function $rb_lt(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
    function $rb_plus(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
    function $rb_ge(lhs, rhs) {
    return (typeof (lhs) === 'number' && typeof (rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2, $truthy = Opal.truthy, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("interscript/mapping");
  return (function($base, $parent_nesting) {
    var self = $module($base, 'Interscript');
    var $nesting = [self].concat($parent_nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'InvalidSystemError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'ExternalProcessNotRecognizedError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    (function($base, $super, $parent_nesting) {
      var self = $klass($base, $super, 'ExternalProcessUnavailableError');
      var $nesting = [self].concat($parent_nesting);
      return nil;
    })($nesting[0], $$($nesting, 'StandardError'), $nesting);
    if($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
      self.$require("interscript/opal");
      self.$extend($$($nesting, 'Opal'));
    } else {
      nil;
    }
    ;
    (function(self, $parent_nesting) {
      var $nesting = [self].concat($parent_nesting), $transliterate$1, $map_resolve$5, $add_separator$6, $up_case_around$ques$7;
      Opal.def(self, '$transliterate', $transliterate$1 = function $$transliterate(system_code, string, maps) {
        var $a, $b, $c, $$2, $$3, $$4, self = this, $writer = nil, mapping = nil, chain = nil, separator = nil, word_separator = nil, title_case = nil, downcase = nil, charmap = nil, dictmap = nil, trie = nil, pos = nil, m = nil, wordmatch = nil, repl = nil, output = nil, offsets = nil, re = nil;
        if(maps == null) {
          maps = $hash2([], { });
        }
        ;
        system_code = self.$map_resolve(system_code);
        if($truthy(maps['$has_key?'](system_code))) {

        } else {
          $writer = [system_code, $$$($$($nesting, 'Interscript'), 'Mapping').$for(system_code)];
          $send(maps, '[]=', Opal.to_a($writer));
          $writer[$rb_minus($writer["length"], 1)];
        }
        ;
        mapping = maps['$[]'](system_code);
        chain = mapping.$chain().$dup();
        while($truthy($rb_gt(chain.$length(), 0))) {
          string = self.$transliterate(chain.$shift(), string, maps);
        }
        ;
        separator = ($truthy($a = mapping.$character_separator()) ? $a : "");
        word_separator = ($truthy($a = mapping.$word_separator()) ? $a : "");
        title_case = mapping.$title_case();
        downcase = mapping.$downcase();
        charmap = mapping.$characters_hash();
        dictmap = mapping.$dictionary_hash();
        trie = mapping.$dictionary_trie();
        string = self.$external_processing(mapping, string);
        pos = 0;
        while($truthy($rb_lt(pos, string.$to_s().$size()))) {
          m = 0;
          wordmatch = "";
          while($truthy(($truthy($c = $rb_lt($rb_plus(pos, m), string.$to_s().$size())) ? trie['$partial_word?'](string['$[]'](Opal.Range.$new(pos, $rb_plus(pos, m), false))) : $c))) {
            if($truthy(trie['$word?'](string['$[]'](Opal.Range.$new(pos, $rb_plus(pos, m), false))))) {
              wordmatch = string['$[]'](Opal.Range.$new(pos, $rb_plus(pos, m), false));
            }
            ;
            m = $rb_plus(m, 1);
          }
          ;
          m = wordmatch.$length();
          if($truthy($rb_gt(m, 0))) {
            repl = dictmap['$[]'](string['$[]'](Opal.Range.$new(pos, $rb_minus($rb_plus(pos, m), 1), false)));
            string = self.$sub_replace(string, pos, m, repl);
            pos = $rb_plus(pos, repl.$length());
          } else {
            pos = $rb_plus(pos, 1);
          }
          ;
        }
        ;
        output = string.$clone();
        offsets = $$($nesting, 'Array').$new(string.$to_s().$size(), 1);
        $send(mapping.$rules(), 'each', [], ($$2 = function(r) {
          var self = $$2.$$s || this, re = nil;
          if(r == null) {
            r = nil;
          }
          ;
          if($truthy(output)) {

          } else {
            return nil;
          }
          ;
          re = self.$mkregexp(r['$[]']("pattern"));
          return (output = output.$gsub(re, r['$[]']("result")));
        }, $$2.$$s = self, $$2.$$arity = 1, $$2));
        $send(charmap, 'each', [], ($$3 = function(k, v) {
          var self = $$3.$$s || this, $d, $e, $f, re = nil, match = nil, result = nil;
          if(k == null) {
            k = nil;
          }
          ;
          if(v == null) {
            v = nil;
          }
          ;
          re = self.$mkregexp(k);
          while($truthy((match = ($e = output, ($e === nil || $e == null) ? nil : $send($e, 'match', [re]))))) {
            pos = match.$offset(0).$first();
            result = (function() {
              if($truthy(($truthy($f = downcase['$!']()) ? self['$up_case_around?'](output, pos) : $f))) {
                return v.$upcase();
              } else {
                return v;
              }
              ;
              return nil;
            })();
            if($truthy(result['$is_a?']($$($nesting, 'Array')))) {
              result = result['$[]'](0);
            }
            ;
            output = self.$sub_replace(output, pos, match['$[]'](0).$size(), self.$add_separator(separator, pos, result));
          }
          ;
        }, $$3.$$s = self, $$3.$$arity = 2, $$3));
        $send(mapping.$postrules(), 'each', [], ($$4 = function(r) {
          var self = $$4.$$s || this, re = nil;
          if(r == null) {
            r = nil;
          }
          ;
          if($truthy(output)) {

          } else {
            return nil;
          }
          ;
          re = self.$mkregexp(r['$[]']("pattern"));
          return (output = (function() {
            if(r['$[]']("result")['$==']("upcase")) {
              return $send(output, 'gsub', [re], "upcase".$to_proc());
            } else {
              return output.$gsub(re, r['$[]']("result"));
            }
            ;
            return nil;
          })());
        }, $$4.$$s = self, $$4.$$arity = 1, $$4));
        if($truthy(output)) {

        } else {
          return nil;
        }
        ;
        re = self.$mkregexp("^(.)");
        if($truthy(title_case)) {
          output = $send(output, 'gsub', [re], "upcase".$to_proc());
        }
        ;
        if($truthy(word_separator['$!='](""))) {
          re = self.$mkregexp("" + (word_separator) + (separator));
          output = output.$gsub(re, word_separator);
          if($truthy(title_case)) {
            re = self.$mkregexp("" + (word_separator) + "(.)");
            output = $send(output, 'gsub', [re], "upcase".$to_proc());
          }
          ;
        }
        ;
        return output.$unicode_normalize();
      }, $transliterate$1.$$arity = -3);
      Opal.def(self, '$map_resolve', $map_resolve$5 = function $$map_resolve(map) {
        var self = this;
        if($truthy(self.$aliases()['$key?'](map))) {
          map = self.$aliases()['$[]'](map);
        }
        ;
        if($truthy(self['$map_exist?'](map))) {

        } else {
          self.$raise($$($nesting, 'ArgumentError'), "" + "Map " + (map) + " doesn't exist");
        }
        ;
        return map;
      }, $map_resolve$5.$$arity = 1);
      self.$private();
      Opal.def(self, '$add_separator', $add_separator$6 = function $$add_separator(separator, pos, result) {
        var self = this;
        if(pos['$=='](0)) {
          return result;
        } else {
          return $rb_plus(separator, result);
        }
      }, $add_separator$6.$$arity = 3);
      return (Opal.def(self, '$up_case_around?', $up_case_around$ques$7 = function(string, pos) {
        var $a, $b, self = this, i = nil, before = nil, after = nil, before_uc = nil, after_uc = nil;
        if(string['$[]'](pos)['$=='](string['$[]'](pos).$downcase())) {
          return false;
        }
        ;
        i = $rb_minus(pos, 1);
        while($truthy(($truthy($b = i['$positive?']()) ? string['$[]'](i)['$!~'](self.$mkregexp("[[:alpha:]]")) : $b))) {
          i = $rb_minus(i, 1);
        }
        ;
        before = (function() {
          if($truthy(($truthy($a = $rb_ge(i, 0)) ? $rb_lt(i, pos) : $a))) {
            return string['$[]'](i).$to_s().$strip();
          } else {
            return "";
          }
          ;
          return nil;
        })();
        i = $rb_plus(pos, 1);
        while($truthy(($truthy($b = $rb_lt(i, $rb_minus(string.$size(), 1))) ? string['$[]'](i)['$!~'](self.$mkregexp("[[:alpha:]]")) : $b))) {
          i = $rb_plus(i, 1);
        }
        ;
        after = (function() {
          if($truthy($rb_gt(i, pos))) {
            return string['$[]'](i).$to_s().$strip();
          } else {
            return "";
          }
          ;
          return nil;
        })();
        before_uc = ($truthy($a = before['$empty?']()['$!']()) ? before['$=='](before.$upcase()) : $a);
        after_uc = ($truthy($a = after['$empty?']()['$!']()) ? after['$=='](after.$upcase()) : $a);
        return ($truthy($a = before_uc) ? $a : after_uc);
      }, $up_case_around$ques$7.$$arity = 2), nil) && 'up_case_around?';
    })(Opal.get_singleton_class(self), $nesting);
  })($nesting[0], $nesting);
};
(function(Opal) {
  var $$4, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $send = Opal.send;
  /* destroyed: CollapseStubs */0;
  self.$require("opal");
  self.$require("interscript/opal/maps");
  self.$require("onigmo/onigmo-wasm");
  (function($base, $parent_nesting) {
    var self = $module($base, 'Interscript');
    var $nesting = [self].concat($parent_nesting), $Interscript_on_load$1, $Interscript_on_load_maps$2;
    Opal.defs(self, '$on_load', $Interscript_on_load$1 = function $$on_load() {
      var $iter = $Interscript_on_load$1.$$p, block = $iter || nil, self = this;
      if($iter) $Interscript_on_load$1.$$p = null;
      if($iter) $Interscript_on_load$1.$$p = null;
      ;
      return $send($$($nesting, 'WebAssembly'), 'wait_for', ["onigmo/onigmo-wasm"], block.$to_proc());
    }, $Interscript_on_load$1.$$arity = 0);
    Opal.defs(self, '$on_load_maps', $Interscript_on_load_maps$2 = function $$on_load_maps(arg) {
      var $iter = $Interscript_on_load_maps$2.$$p, block = $iter || nil, $$3, self = this;
      if($iter) $Interscript_on_load_maps$2.$$p = null;
      if($iter) $Interscript_on_load_maps$2.$$p = null;
      ;
      return self.$on_load().then(($$3 = function() {
        var self = $$3.$$s || this;
        return $send(self, 'load_maps', [arg], block.$to_proc());
      }, $$3.$$s = self, $$3.$$arity = 0, $$3));
    }, $Interscript_on_load_maps$2.$$arity = 1);
  })($nesting[0], $nesting);
  return $send($$($nesting, 'Interscript'), 'on_load', [], ($$4 = function() {
    var self = $$4.$$s || this;
    return self.$require("interscript");
  }, $$4.$$s = self, $$4.$$arity = 0, $$4));
})(Opal);