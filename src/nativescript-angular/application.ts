import {Type} from 'angular2/src/facade/lang';
import {Promise, PromiseWrapper} from 'angular2/src/facade/async';
import {ApplicationRef} from 'angular2/src/core/application';
import {bind, Binding} from 'angular2/di';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {Renderer} from 'angular2/src/render/api';
import {NativeScriptRenderer} from 'nativescript-angular/renderer';
import {Parse5DomAdapter} from 'angular2/src/dom/parse5_adapter';

import {bootstrap as angularBootstrap} from 'angular2/src/core/application';


type BindingList = List<Type | Binding | List<any>>;

export function nativeScriptBootstrap(appComponentType: Type,
                          componentInjectableBindings: BindingList = null,
                          errorReporter: Function = null): Promise<ApplicationRef> {
  Parse5DomAdapter.makeCurrent();

  let nativeScriptBindings: BindingList = [
      NativeScriptRenderer,
      bind(Renderer).toAlias(NativeScriptRenderer)
  ];
  let augmentedBindings = nativeScriptBindings.concat(componentInjectableBindings);

  return angularBootstrap(appComponentType, augmentedBindings, errorReporter)
}

//TODO: move to a separate file
if (![].fill)  {
  Array.prototype.fill = function(value) {
 
    var O = Object(this);
    var len = parseInt(O.length, 10);
    var start = arguments[1];
    var relativeStart = parseInt(start, 10) || 0;
    var k = relativeStart < 0
            ? Math.max( len + relativeStart, 0) 
            : Math.min( relativeStart, len );
    var end = arguments[2];
    var relativeEnd = end === undefined
                      ? len 
                      : (parseInt( end) || 0) ;
    var final = relativeEnd < 0
                ? Math.max(len + relativeEnd, 0)
                : Math.min(relativeEnd, len);
 
    for (; k < final; k++) {
        O[k] = value;
    }
 
    return O;
  };
}
