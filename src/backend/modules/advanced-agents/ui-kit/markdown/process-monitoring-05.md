# UI Kit Process Monitoring Source Context

This file contains exact source snippets from the uploaded UI kit for the `process-monitoring` category.

## `process-monitoring-final/dist/assets/purify.es-BaNf_EpD.js`

- Category: `process-monitoring`
- Bytes: `24294`
- SHA-256: `e6a9da9087b71989d2e82292dc70225571e2aedf31ee118522b99900790aba51`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `purify.es-BaNf_EpD.js`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```js
/*! @license DOMPurify 3.4.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.2/LICENSE */const{entries:yt,setPrototypeOf:mt,isFrozen:Kt,getPrototypeOf:Zt,getOwnPropertyDescriptor:Jt}=Object;let{freeze:y,seal:N,create:X}=Object,{apply:Fe,construct:He}=typeof Reflect<"u"&&Reflect;y||(y=function(n){return n});N||(N=function(n){return n});Fe||(Fe=function(n,l){for(var a=arguments.length,f=new Array(a>2?a-2:0),b=2;b<a;b++)f[b-2]=arguments[b];return n.apply(l,f)});He||(He=function(n){for(var l=arguments.length,a=new Array(l>1?l-1:0),f=1;f<l;f++)a[f-1]=arguments[f];return new n(...a)});const ee=T(Array.prototype.forEach),Qt=T(Array.prototype.lastIndexOf),pt=T(Array.prototype.pop),te=T(Array.prototype.push),en=T(Array.prototype.splice),O=Array.isArray,ie=T(String.prototype.toLowerCase),Pe=T(String.prototype.toString),Tt=T(String.prototype.match),Y=T(String.prototype.replace),dt=T(String.prototype.indexOf),tn=T(String.prototype.trim),nn=T(Number.prototype.toString),on=T(Boolean.prototype.toString),_t=typeof BigInt>"u"?null:T(BigInt.prototype.toString),Et=typeof Symbol>"u"?null:T(Symbol.prototype.toString),u=T(Object.prototype.hasOwnProperty),ne=T(Object.prototype.toString),g=T(RegExp.prototype.test),de=rn(TypeError);function T(i){return function(n){n instanceof RegExp&&(n.lastIndex=0);for(var l=arguments.length,a=new Array(l>1?l-1:0),f=1;f<l;f++)a[f-1]=arguments[f];return Fe(i,n,a)}}function rn(i){return function(){for(var n=arguments.length,l=new Array(n),a=0;a<n;a++)l[a]=arguments[a];return He(i,l)}}function s(i,n){let l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ie;if(mt&&mt(i,null),!O(n))return i;let a=n.length;for(;a--;){let f=n[a];if(typeof f=="string"){const b=l(f);b!==f&&(Kt(n)||(n[a]=b),f=b)}i[f]=!0}return i}function an(i){for(let n=0;n<i.length;n++)u(i,n)||(i[n]=null);return i}function I(i){const n=X(null);for(const[l,a]of yt(i))u(i,l)&&(O(a)?n[l]=an(a):a&&typeof a=="object"&&a.constructor===Object?n[l]=I(a):n[l]=a);return n}function sn(i){switch(typeof i){case"string":return i;case"number":return nn(i);case"boolean":return on(i);case"bigint":return _t?_t(i):"0";case"symbol":return Et?Et(i):"Symbol()";case"undefined":return ne(i);case"function":case"object":{if(i===null)return ne(i);const n=i,l=j(n,"toString");if(typeof l=="function"){const a=l(n);return typeof a=="string"?a:ne(a)}return ne(i)}default:return ne(i)}}function j(i,n){for(;i!==null;){const a=Jt(i,n);if(a){if(a.get)return T(a.get);if(typeof a.value=="function")return T(a.value)}i=Zt(i)}function l(){return null}return l}function ln(i){try{return g(i,""),!0}catch{return!1}}const At=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),xe=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ke=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),cn=y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ue=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fn=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gt=y(["#text"]),ht=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),ve=y(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),St=y(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_e=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),un=N(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mn=N(/<%[\w\W]*|[\w\W]*%>/gm),pn=N(/\$\{[\w\W]*/gm),Tn=N(/^data-[\-\w.\u00B7-\uFFFF]+$/),dn=N(/^aria-[\-\w]+$/),bt=N(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_n=N(/^(?:\w+script|data):/i),En=N(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Dt=N(/^html$/i),An=N(/^[a-z][.\w]*(-[.\w]+)+$/i);var Rt=Object.freeze({__proto__:null,ARIA_ATTR:dn,ATTR_WHITESPACE:En,CUSTOM_ELEMENT:An,DATA_ATTR:Tn,DOCTYPE_NAME:Dt,ERB_EXPR:mn,IS_ALLOWED_URI:bt,IS_SCRIPT_OR_DATA:_n,MUSTACHE_EXPR:un,TMPLIT_EXPR:pn});const oe={element:1,text:3,progressingInstruction:7,comment:8,document:9},gn=function(){return typeof window>"u"?null:window},hn=function(n,l){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let a=null;const f="data-tt-policy-suffix";l&&l.hasAttribute(f)&&(a=l.getAttribute(f));const b="dompurify"+(a?"#"+a:"");try{return n.createPolicy(b,{createHTML(H){return H},createScriptURL(H){return H}})}catch{return console.warn("TrustedTypes policy "+b+" could not be created."),null}},Ot=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function It(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:gn();const n=r=>It(r);if(n.version="3.4.2",n.removed=[],!i||!i.document||i.document.nodeType!==oe.document||!i.Element)return n.isSupported=!1,n;let{document:l}=i;const a=l,f=a.currentScript,{DocumentFragment:b,HTMLTemplateElement:H,Node:Ee,Element:ze,NodeFilter:V,NamedNodeMap:Lt=i.NamedNodeMap||i.MozNamedAttrMap,HTMLFormElement:Nt,DOMParser:Ct,trustedTypes:re}=i,$=ze.prototype,Mt=j($,"cloneNode"),wt=j($,"remove"),Pt=j($,"nextSibling"),xt=j($,"childNodes"),ae=j($,"parentNode");if(typeof H=="function"){const r=l.createElement("template");r.content&&r.content.ownerDocument&&(l=r.content.ownerDocument)}let S,q="";const{implementation:Ae,createNodeIterator:kt,createDocumentFragment:Ut,getElementsByTagName:vt}=l,{importNode:Ft}=a;let R=Ot();n.isSupported=typeof yt=="function"&&typeof ae=="function"&&Ae&&Ae.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:se,ERB_EXPR:le,TMPLIT_EXPR:ce,DATA_ATTR:Ht,ARIA_ATTR:zt,IS_SCRIPT_OR_DATA:Gt,ATTR_WHITESPACE:Ge,CUSTOM_ELEMENT:Bt}=Rt;let{IS_ALLOWED_URI:Be}=Rt,_=null;const We=s({},[...At,...xe,...ke,...Ue,...gt]);let A=null;const Ye=s({},[...ht,...ve,...St,..._e]);let m=Object.seal(X(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),K=null,fe=null;const k=Object.seal(X(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Xe=!0,ge=!0,je=!1,Ve=!0,U=!1,Z=!0,v=!1,he=!1,Se=!1,z=!1,ue=!1,me=!1,$e=!0,qe=!1;const Ke="user-content-";let Re=!0,J=!1,G={},w=null;const Oe=s({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ze=null;const Je=s({},["audio","video","img","source","image","track"]);let ye=null;const Qe=s({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pe="http://www.w3.org/1998/Math/MathML",Te="http://www.w3.org/2000/svg",P="http://www.w3.org/1999/xhtml";let B=P,be=!1,De=null;const Wt=s({},[pe,Te,P],Pe);let Ie=s({},["mi","mo","mn","ms","mtext"]),Le=s({},["annotation-xml"]);const Yt=s({},["title","style","font","a","script"]);let Q=null;const Xt=["application/xhtml+xml","text/html"],jt="text/html";let d=null,W=null;const Vt=l.createElement("form"),et=function(e){return e instanceof RegExp||e instanceof Function},Ne=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(W&&W===e)return;(!e||typeof e!="object")&&(e={}),e=I(e),Q=Xt.indexOf(e.PARSER_MEDIA_TYPE)===-1?jt:e.PARSER_MEDIA_TYPE,d=Q==="application/xhtml+xml"?Pe:ie,_=u(e,"ALLOWED_TAGS")&&O(e.ALLOWED_TAGS)?s({},e.ALLOWED_TAGS,d):We,A=u(e,"ALLOWED_ATTR")&&O(e.ALLOWED_ATTR)?s({},e.ALLOWED_ATTR,d):Ye,De=u(e,"ALLOWED_NAMESPACES")&&O(e.ALLOWED_NAMESPACES)?s({},e.ALLOWED_NAMESPACES,Pe):Wt,ye=u(e,"ADD_URI_SAFE_ATTR")&&O(e.ADD_URI_SAFE_ATTR)?s(I(Qe),e.ADD_URI_SAFE_ATTR,d):Qe,Ze=u(e,"ADD_DATA_URI_TAGS")&&O(e.ADD_DATA_URI_TAGS)?s(I(Je),e.ADD_DATA_URI_TAGS,d):Je,w=u(e,"FORBID_CONTENTS")&&O(e.FORBID_CONTENTS)?s({},e.FORBID_CONTENTS,d):Oe,K=u(e,"FORBID_TAGS")&&O(e.FORBID_TAGS)?s({},e.FORBID_TAGS,d):I({}),fe=u(e,"FORBID_ATTR")&&O(e.FORBID_ATTR)?s({},e.FORBID_ATTR,d):I({}),G=u(e,"USE_PROFILES")?e.USE_PROFILES&&typeof e.USE_PROFILES=="object"?I(e.USE_PROFILES):e.USE_PROFILES:!1,Xe=e.ALLOW_ARIA_ATTR!==!1,ge=e.ALLOW_DATA_ATTR!==!1,je=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,U=e.SAFE_FOR_TEMPLATES||!1,Z=e.SAFE_FOR_XML!==!1,v=e.WHOLE_DOCUMENT||!1,z=e.RETURN_DOM||!1,ue=e.RETURN_DOM_FRAGMENT||!1,me=e.RETURN_TRUSTED_TYPE||!1,Se=e.FORCE_BODY||!1,$e=e.SANITIZE_DOM!==!1,qe=e.SANITIZE_NAMED_PROPS||!1,Re=e.KEEP_CONTENT!==!1,J=e.IN_PLACE||!1,Be=ln(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:bt,B=typeof e.NAMESPACE=="string"?e.NAMESPACE:P,Ie=u(e,"MATHML_TEXT_INTEGRATION_POINTS")&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS=="object"?I(e.MATHML_TEXT_INTEGRATION_POINTS):s({},["mi","mo","mn","ms","mtext"]),Le=u(e,"HTML_INTEGRATION_POINTS")&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS=="object"?I(e.HTML_INTEGRATION_POINTS):s({},["annotation-xml"]);const t=u(e,"CUSTOM_ELEMENT_HANDLING")&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING=="object"?I(e.CUSTOM_ELEMENT_HANDLING):X(null);if(m=X(null),u(t,"tagNameCheck")&&et(t.tagNameCheck)&&(m.tagNameCheck=t.tagNameCheck),u(t,"attributeNameCheck")&&et(t.attributeNameCheck)&&(m.attributeNameCheck=t.attributeNameCheck),u(t,"allowCustomizedBuiltInElements")&&typeof t.allowCustomizedBuiltInElements=="boolean"&&(m.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),U&&(ge=!1),ue&&(z=!0),G&&(_=s({},gt),A=X(null),G.html===!0&&(s(_,At),s(A,ht)),G.svg===!0&&(s(_,xe),s(A,ve),s(A,_e)),G.svgFilters===!0&&(s(_,ke),s(A,ve),s(A,_e)),G.mathMl===!0&&(s(_,Ue),s(A,St),s(A,_e))),k.tagCheck=null,k.attributeCheck=null,u(e,"ADD_TAGS")&&(typeof e.ADD_TAGS=="function"?k.tagCheck=e.ADD_TAGS:O(e.ADD_TAGS)&&(_===We&&(_=I(_)),s(_,e.ADD_TAGS,d))),u(e,"ADD_ATTR")&&(typeof e.ADD_ATTR=="function"?k.attributeCheck=e.ADD_ATTR:O(e.ADD_ATTR)&&(A===Ye&&(A=I(A)),s(A,e.ADD_ATTR,d))),u(e,"ADD_URI_SAFE_ATTR")&&O(e.ADD_URI_SAFE_ATTR)&&s(ye,e.ADD_URI_SAFE_ATTR,d),u(e,"FORBID_CONTENTS")&&O(e.FORBID_CONTENTS)&&(w===Oe&&(w=I(w)),s(w,e.FORBID_CONTENTS,d)),u(e,"ADD_FORBID_CONTENTS")&&O(e.ADD_FORBID_CONTENTS)&&(w===Oe&&(w=I(w)),s(w,e.ADD_FORBID_CONTENTS,d)),Re&&(_["#text"]=!0),v&&s(_,["html","head","body"]),_.table&&(s(_,["tbody"]),delete K.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw de('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw de('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=e.TRUSTED_TYPES_POLICY,q=S.createHTML("")}else S===void 0&&(S=hn(re,f)),S!==null&&typeof q=="string"&&(q=S.createHTML(""));y&&y(e),W=e},tt=s({},[...xe,...ke,...cn]),nt=s({},[...Ue,...fn]),$t=function(e){let t=ae(e);(!t||!t.tagName)&&(t={namespaceURI:B,tagName:"template"});const o=ie(e.tagName),c=ie(t.tagName);return De[e.namespaceURI]?e.namespaceURI===Te?t.namespaceURI===P?o==="svg":t.namespaceURI===pe?o==="svg"&&(c==="annotation-xml"||Ie[c]):!!tt[o]:e.namespaceURI===pe?t.namespaceURI===P?o==="math":t.namespaceURI===Te?o==="math"&&Le[c]:!!nt[o]:e.namespaceURI===P?t.namespaceURI===Te&&!Le[c]||t.namespaceURI===pe&&!Ie[c]?!1:!nt[o]&&(Yt[o]||!tt[o]):!!(Q==="application/xhtml+xml"&&De[e.namespaceURI]):!1},C=function(e){te(n.removed,{element:e});try{ae(e).removeChild(e)}catch{wt(e)}},F=function(e,t){try{te(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{te(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is")if(z||ue)try{C(t)}catch{}else try{t.setAttribute(e,"")}catch{}},ot=function(e){let t=null,o=null;if(Se)e="<remove></remove>"+e;else{const p=Tt(e,/^[\r\n\t ]+/);o=p&&p[0]}Q==="application/xhtml+xml"&&B===P&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const c=S?S.createHTML(e):e;if(B===P)try{t=new Ct().parseFromString(c,Q)}catch{}if(!t||!t.documentElement){t=Ae.createDocument(B,"template",null);try{t.documentElement.innerHTML=be?q:c}catch{}}const h=t.body||t.documentElement;return e&&o&&h.insertBefore(l.createTextNode(o),h.childNodes[0]||null),B===P?vt.call(t,v?"html":"body")[0]:v?t.documentElement:h},it=function(e){return kt.call(e.ownerDocument||e,e,V.SHOW_ELEMENT|V.SHOW_COMMENT|V.SHOW_TEXT|V.SHOW_PROCESSING_INSTRUCTION|V.SHOW_CDATA_SECTION,null)},Ce=function(e){return e instanceof Nt&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Lt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},Me=function(e){return typeof Ee=="function"&&e instanceof Ee};function x(r,e,t){ee(r,o=>{o.call(n,e,t,W)})}const rt=function(e){let t=null;if(x(R.beforeSanitizeElements,e,null),Ce(e))return C(e),!0;const o=d(e.nodeName);if(x(R.uponSanitizeElement,e,{tagName:o,allowedTags:_}),Z&&e.hasChildNodes()&&!Me(e.firstElementChild)&&g(/<[/\w!]/g,e.innerHTML)&&g(/<[/\w!]/g,e.textContent)||Z&&e.namespaceURI===P&&o==="style"&&Me(e.firstElementChild)||e.nodeType===oe.progressingInstruction||Z&&e.nodeType===oe.comment&&g(/<[/\w]/g,e.data))return C(e),!0;if(K[o]||!(k.tagCheck instanceof Function&&k.tagCheck(o))&&!_[o]){if(!K[o]&&st(o)&&(m.tagNameCheck instanceof RegExp&&g(m.tagNameCheck,o)||m.tagNameCheck instanceof Function&&m.tagNameCheck(o)))return!1;if(Re&&!w[o]){const c=ae(e)||e.parentNode,h=xt(e)||e.childNodes;if(h&&c){const p=h.length;for(let D=p-1;D>=0;--D){const L=Mt(h[D],!0);c.insertBefore(L,Pt(e))}}}return C(e),!0}return e instanceof ze&&!$t(e)||(o==="noscript"||o==="noembed"||o==="noframes")&&g(/<\/no(script|embed|frames)/i,e.innerHTML)?(C(e),!0):(U&&e.nodeType===oe.text&&(t=e.textContent,ee([se,le,ce],c=>{t=Y(t,c," ")}),e.textContent!==t&&(te(n.removed,{element:e.cloneNode()}),e.textContent=t)),x(R.afterSanitizeElements,e,null),!1)},at=function(e,t,o){if(fe[t]||$e&&(t==="id"||t==="name")&&(o in l||o in Vt))return!1;const c=A[t]||k.attributeCheck instanceof Function&&k.attributeCheck(t,e);if(!(ge&&!fe[t]&&g(Ht,t))){if(!(Xe&&g(zt,t))){if(!c||fe[t]){if(!(st(e)&&(m.tagNameCheck instanceof RegExp&&g(m.tagNameCheck,e)||m.tagNameCheck instanceof Function&&m.tagNameCheck(e))&&(m.attributeNameCheck instanceof RegExp&&g(m.attributeNameCheck,t)||m.attributeNameCheck instanceof Function&&m.attributeNameCheck(t,e))||t==="is"&&m.allowCustomizedBuiltInElements&&(m.tagNameCheck instanceof RegExp&&g(m.tagNameCheck,o)||m.tagNameCheck instanceof Function&&m.tagNameCheck(o))))return!1}else if(!ye[t]){if(!g(Be,Y(o,Ge,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&dt(o,"data:")===0&&Ze[e])){if(!(je&&!g(Gt,Y(o,Ge,"")))){if(o)return!1}}}}}}return!0},qt=s({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),st=function(e){return!qt[ie(e)]&&g(Bt,e)},lt=function(e){x(R.beforeSanitizeAttributes,e,null);const{attributes:t}=e;if(!t||Ce(e))return;const o={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:A,forceKeepAttr:void 0};let c=t.length;for(;c--;){const h=t[c],{name:p,namespaceURI:D,value:L}=h,M=d(p),we=L;let E=p==="value"?we:tn(we);if(o.attrName=M,o.attrValue=E,o.keepAttr=!0,o.forceKeepAttr=void 0,x(R.uponSanitizeAttribute,e,o),E=o.attrValue,qe&&(M==="id"||M==="name")&&dt(E,Ke)!==0&&(F(p,e),E=Ke+E),Z&&g(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,E)){F(p,e);continue}if(M==="attributename"&&Tt(E,"href")){F(p,e);continue}if(o.forceKeepAttr)continue;if(!o.keepAttr){F(p,e);continue}if(!Ve&&g(/\/>/i,E)){F(p,e);continue}U&&ee([se,le,ce],ut=>{E=Y(E,ut," ")});const ft=d(e.nodeName);if(!at(ft,M,E)){F(p,e);continue}if(S&&typeof re=="object"&&typeof re.getAttributeType=="function"&&!D)switch(re.getAttributeType(ft,M)){case"TrustedHTML":{E=S.createHTML(E);break}case"TrustedScriptURL":{E=S.createScriptURL(E);break}}if(E!==we)try{D?e.setAttributeNS(D,p,E):e.setAttribute(p,E),Ce(e)?C(e):pt(n.removed)}catch{F(p,e)}}x(R.afterSanitizeAttributes,e,null)},ct=function(e){let t=null;const o=it(e);for(x(R.beforeSanitizeShadowDOM,e,null);t=o.nextNode();)x(R.uponSanitizeShadowNode,t,null),rt(t),lt(t),t.content instanceof b&&ct(t.content);x(R.afterSanitizeShadowDOM,e,null)};return n.sanitize=function(r){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,o=null,c=null,h=null;if(be=!r,be&&(r="<!-->"),typeof r!="string"&&!Me(r)&&(r=sn(r),typeof r!="string"))throw de("dirty is not a string, aborting");if(!n.isSupported)return r;if(he||Ne(e),n.removed=[],typeof r=="string"&&(J=!1),J){const L=r.nodeName;if(typeof L=="string"){const M=d(L);if(!_[M]||K[M])throw de("root node is forbidden and cannot be sanitized in-place")}}else if(r instanceof Ee)t=ot("<!---->"),o=t.ownerDocument.importNode(r,!0),o.nodeType===oe.element&&o.nodeName==="BODY"||o.nodeName==="HTML"?t=o:t.appendChild(o);else{if(!z&&!U&&!v&&r.indexOf("<")===-1)return S&&me?S.createHTML(r):r;if(t=ot(r),!t)return z?null:me?q:""}t&&Se&&C(t.firstChild);const p=it(J?r:t);for(;c=p.nextNode();)rt(c),lt(c),c.content instanceof b&&ct(c.content);if(J)return r;if(z){if(U){t.normalize();let L=t.innerHTML;ee([se,le,ce],M=>{L=Y(L,M," ")}),t.innerHTML=L}if(ue)for(h=Ut.call(t.ownerDocument);t.firstChild;)h.appendChild(t.firstChild);else h=t;return(A.shadowroot||A.shadowrootmode)&&(h=Ft.call(a,h,!0)),h}let D=v?t.outerHTML:t.innerHTML;return v&&_["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&g(Dt,t.ownerDocument.doctype.name)&&(D="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+D),U&&ee([se,le,ce],L=>{D=Y(D,L," ")}),S&&me?S.createHTML(D):D},n.setConfig=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ne(r),he=!0},n.clearConfig=function(){W=null,he=!1},n.isValidAttribute=function(r,e,t){W||Ne({});const o=d(r),c=d(e);return at(o,c,t)},n.addHook=function(r,e){typeof e=="function"&&te(R[r],e)},n.removeHook=function(r,e){if(e!==void 0){const t=Qt(R[r],e);return t===-1?void 0:en(R[r],t,1)[0]}return pt(R[r])},n.removeHooks=function(r){R[r]=[]},n.removeAllHooks=function(){R=Ot()},n}var Sn=It();export{Sn as default};
```

## `process-monitoring-final/dist/favicon.svg`

- Category: `process-monitoring`
- Bytes: `283`
- SHA-256: `4d7e0622d4ebbf4b04f43699ff4ed6f0a4fcc2662455f49125f3e9392cbd6174`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `favicon.svg`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111827"/>
  <path d="M18 34c0-10 6-18 15-18 7 0 13 5 13 12H34v10h20v6c-5 4-11 6-18 6-11 0-18-6-18-16Z" fill="#6ee7b7"/>
  <circle cx="36" cy="28" r="4" fill="#ffffff"/>
</svg>
```

## `process-monitoring-final/dist/index.html`

- Category: `process-monitoring`
- Bytes: `596`
- SHA-256: `1f5a99e3ca9ce22805cd4b32fa2f7a36c944f964193a68945a756fb933423e1f`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `index.html`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```html

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>Design GIGA Intelligence PWA</title>
      <style>html, body { height: 100%; margin: 0; } #root { height: 100%; }</style>
      <script type="module" crossorigin src="/assets/index-P3Zvzax3.js"></script>
      <link rel="stylesheet" crossorigin href="/assets/index-DpgeOZeo.css">
    </head>

    <body>
      <div id="root"></div>
    </body>
  </html>
```

## `process-monitoring-final/guidelines/Guidelines.md`

- Category: `process-monitoring`
- Bytes: `2559`
- SHA-256: `8a4a52a8fac382f8b44d2f6b713e9643153bd1c732d34ed323d88cb290829257`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `Guidelines.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md
**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
```

## `process-monitoring-final/index.html`

- Category: `process-monitoring`
- Bytes: `496`
- SHA-256: `eddf78cf15dbf9e17856b6bdff123eac0a9acede47c2479355788e0044d9bdaf`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `index.html`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```html

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>Design GIGA Intelligence PWA</title>
      <style>html, body { height: 100%; margin: 0; } #root { height: 100%; }</style>
    </head>

    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
```

## `process-monitoring-final/public/favicon.svg`

- Category: `process-monitoring`
- Bytes: `283`
- SHA-256: `4d7e0622d4ebbf4b04f43699ff4ed6f0a4fcc2662455f49125f3e9392cbd6174`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `favicon.svg`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111827"/>
  <path d="M18 34c0-10 6-18 15-18 7 0 13 5 13 12H34v10h20v6c-5 4-11 6-18 6-11 0-18-6-18-16Z" fill="#6ee7b7"/>
  <circle cx="36" cy="28" r="4" fill="#ffffff"/>
</svg>
```

## `process-monitoring-final/src/app/App.tsx`

- Category: `process-monitoring`
- Bytes: `639`
- SHA-256: `bb174d5ceb2e8f210d01f07c96a7e5b82a3009ded91036a082646de67336db28`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `App.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ToastProvider } from './components/Toast';
import { AccentColorProvider } from './contexts/AccentColorContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { BookmarkProvider } from './contexts/BookmarkContext';

export default function App() {
  return (
    <DarkModeProvider>
      <AccentColorProvider>
        <BookmarkProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </BookmarkProvider>
      </AccentColorProvider>
    </DarkModeProvider>
  );
}
```

## `process-monitoring-final/src/app/contexts/AccentColorContext.tsx`

- Category: `process-monitoring`
- Bytes: `3923`
- SHA-256: `e942051187cba2c0ecd068a5c9af79ad2198b83938fe716af41f2c8b37ca609e`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `AccentColorContext.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const ACCENT_COLORS = {
  purple: { name: 'Purple', value: '#7C5CFF', dark: false },
  blue: { name: 'Blue', value: '#3B82F6', dark: false },
  green: { name: 'Green', value: '#10B981', dark: false },
  red: { name: 'Red', value: '#EF4444', dark: false },
  orange: { name: 'Orange', value: '#F59E0B', dark: false },
  pink: { name: 'Pink', value: '#EC4899', dark: false },
  teal: { name: 'Teal', value: '#14B8A6', dark: false },
  indigo: { name: 'Indigo', value: '#6366F1', dark: false },
  cyan: { name: 'Cyan', value: '#06B6D4', dark: false },
  emerald: { name: 'Emerald', value: '#059669', dark: false },
  violet: { name: 'Violet', value: '#8B5CF6', dark: false },
  fuchsia: { name: 'Fuchsia', value: '#D946EF', dark: false },
  // Dark variants
  darkPurple: { name: 'Dark Purple', value: '#5B21B6', dark: true },
  darkBlue: { name: 'Dark Blue', value: '#1E40AF', dark: true },
  darkGreen: { name: 'Dark Green', value: '#065F46', dark: true },
  darkRed: { name: 'Dark Red', value: '#991B1B', dark: true },
  darkOrange: { name: 'Dark Orange', value: '#C2410C', dark: true },
  darkPink: { name: 'Dark Pink', value: '#BE185D', dark: true },
  darkTeal: { name: 'Dark Teal', value: '#115E59', dark: true },
  darkIndigo: { name: 'Dark Indigo', value: '#3730A3', dark: true },
  slate: { name: 'Slate', value: '#475569', dark: true },
  gray: { name: 'Gray', value: '#6B7280', dark: true },
  zinc: { name: 'Zinc', value: '#52525B', dark: true },
  stone: { name: 'Stone', value: '#57534E', dark: true },
} as const;

export type AccentColorKey = keyof typeof ACCENT_COLORS;

interface AccentColorContextType {
  accentColor: AccentColorKey;
  setAccentColor: (color: AccentColorKey) => void;
  accentValue: string;
}

const AccentColorContext = createContext<AccentColorContextType | undefined>(undefined);

const STORAGE_KEY = 'giga-accent-color';

export function AccentColorProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColorState] = useState<AccentColorKey>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored && stored in ACCENT_COLORS ? stored : 'purple') as AccentColorKey;
  });

  const setAccentColor = (color: AccentColorKey) => {
    setAccentColorState(color);
    localStorage.setItem(STORAGE_KEY, color);
  };

  // Apply accent color to CSS variables
  useEffect(() => {
    const value = ACCENT_COLORS[accentColor].value;
    // Set light mode colors
    document.documentElement.style.setProperty('--primary', value);
    document.documentElement.style.setProperty('--accent', value);
    document.documentElement.style.setProperty('--ring', value);
    document.documentElement.style.setProperty('--sidebar-primary', value);
    document.documentElement.style.setProperty('--sidebar-ring', value);

    // For dark mode, we need to override the oklch values
    // We'll use a CSS class to apply the accent in dark mode
    const style = document.getElementById('accent-dark-override') || document.createElement('style');
    style.id = 'accent-dark-override';
    style.textContent = `
      .dark {
        --primary: ${value};
        --accent: ${value};
        --ring: ${value};
        --sidebar-primary: ${value};
        --sidebar-ring: ${value};
      }
    `;
    if (!document.getElementById('accent-dark-override')) {
      document.head.appendChild(style);
    }
  }, [accentColor]);

  return (
    <AccentColorContext.Provider
      value={{
        accentColor,
        setAccentColor,
        accentValue: ACCENT_COLORS[accentColor].value,
      }}
    >
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useAccentColor must be used within AccentColorProvider');
  }
  return context;
}
```

## `process-monitoring-final/src/app/contexts/BookmarkContext.tsx`

- Category: `process-monitoring`
- Bytes: `2581`
- SHA-256: `78c9be68d4c60fc00d5e9aec33cac62039e2a4357fa834bb3ea3414ae2460186`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `BookmarkContext.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Bookmark {
  id: string;
  type: 'channel' | 'category' | 'subject' | 'post';
  channelId?: string;
  categoryId?: string;
  subjectId?: string;
  postId?: string;
  name: string;
  description?: string;
  addedAt: string;
  metadata?: {
    postCount?: number;
    author?: string;
    date?: string;
  };
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'addedAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string, type: Bookmark['type']) => boolean;
  getBookmarksByType: (type: Bookmark['type']) => Bookmark[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'addedAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.type}-${bookmark.channelId || ''}-${bookmark.categoryId || ''}-${bookmark.subjectId || ''}-${bookmark.postId || ''}`,
      addedAt: new Date().toISOString(),
    };

    setBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id: string, type: Bookmark['type']) => {
    return bookmarks.some(b => {
      if (type === 'channel') return b.type === 'channel' && b.channelId === id;
      if (type === 'category') return b.type === 'category' && b.categoryId === id;
      if (type === 'subject') return b.type === 'subject' && b.subjectId === id;
      if (type === 'post') return b.type === 'post' && b.postId === id;
      return false;
    });
  };

  const getBookmarksByType = (type: Bookmark['type']) => {
    return bookmarks.filter(b => b.type === type);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, getBookmarksByType }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
```

## `process-monitoring-final/src/app/contexts/DarkModeContext.tsx`

- Category: `process-monitoring`
- Bytes: `1167`
- SHA-256: `b32fb8f3533786fad9ab40b9b7d3aee84b66e86a15d71a83d6404acef82905ae`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `DarkModeContext.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
}
```

## `process-monitoring-final/src/app/format.ts`

- Category: `process-monitoring`
- Bytes: `268`
- SHA-256: `c5df3379f5e4158c082b67dfaaf290b2907e2a02e66b2a091af08b7cc0ea7dbd`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `format.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
export function formatBytes(bytes?: number) {
  if (!bytes) return '0 B';

  const sizes = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return Math.round((bytes / Math.pow(1024, index)) * 100) / 100 + ' ' + sizes[index];
}
```

## `process-monitoring-final/src/app/process-monitoring/README.md`

- Category: `process-monitoring`
- Bytes: `1101`
- SHA-256: `d670a301d59e692ae3f8c1c28ee81b75b22cbc4debf5cfde41fe44b55b2cb964`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `README.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md
# Process monitoring module

This folder contains the reusable process-monitoring implementation used by:

- `/admin-dashboard` for the root/admin user view.
- `/process-monitoring` for the normal user view.

## Realtime subscription API

The UI renders from `processMonitorRealtime`, a small external-store API. Any service, websocket handler, SSE callback, polling function, or mock can push data into it.

```ts
import { processMonitorRealtime } from './src/app/process-monitoring';

processMonitorRealtime.upsertProcesses([
  {
    id: 'api-worker-1',
    pid: 8844,
    parentId: null,
    name: 'api-worker',
    userId: 'john',
    cpu: 12.4,
    memoryBytes: 180 * 1024 * 1024,
    status: 'running',
    type: 'node',
  },
]);

processMonitorRealtime.appendLogs([
  {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString(),
    processName: 'api-worker',
    pid: 8844,
    userId: 'john',
    level: 'INFO',
    message: 'Realtime process sample received',
  },
]);
```

The same API is also exposed on `window.processMonitorRealtime` for quick browser-console testing.
```

## `process-monitoring-final/src/app/process-monitoring/formatters.ts`

- Category: `process-monitoring`
- Bytes: `1105`
- SHA-256: `f099725a0665adcf5ff2c99864359dd2d7d16b78211f725d0c5169186dbe6c46`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `formatters.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

export function formatPercent(value: number, precision = 1): string {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(precision)}%`;
}

export function createTimestamp(date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function createSparkline(seed: number, points = 20): number[] {
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.sin((index + seed) / 2.4) * 8;
    const drift = Math.cos((index + seed) / 4.2) * 4;
    return Math.max(2, Math.round(34 + wave + drift + ((index + seed) % 5)));
  });
}
```

## `process-monitoring-final/src/app/process-monitoring/hooks/useProcessMonitorSubscription.ts`

- Category: `process-monitoring`
- Bytes: `2162`
- SHA-256: `66e554b61f7e29b364c850bb8e1dd5dade9c57af003e3ae92523386da7514c68`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `useProcessMonitorSubscription.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
import { useEffect, useSyncExternalStore } from 'react';
import { processMonitorRealtime } from '../realtimeProcessStore';
import type { ProcessMonitorSnapshot } from '../types';

export function useProcessMonitorSubscription(): ProcessMonitorSnapshot {
  return useSyncExternalStore(
    processMonitorRealtime.subscribe,
    processMonitorRealtime.getSnapshot,
    processMonitorRealtime.getServerSnapshot
  );
}

export function useDemoRealtimeFeed(enabled: boolean, logLineCap: number, refreshIntervalMs = 3500) {
  useEffect(() => {
    if (!enabled) return;

    const interval = window.setInterval(() => {
      const snapshot = processMonitorRealtime.getSnapshot();
      const jitter = Math.random() * 2 - 1;
      const nextCpuUsage = Math.max(1, Math.min(99, snapshot.metrics.cpuUsage + jitter));
      const process = snapshot.processes[Math.floor(Math.random() * snapshot.processes.length)];

      processMonitorRealtime.setMetrics({
        cpuUsage: Number(nextCpuUsage.toFixed(1)),
        networkGbps: Number(Math.max(0.1, snapshot.metrics.networkGbps + jitter / 12).toFixed(2)),
      });

      if (process) {
        processMonitorRealtime.upsertProcesses([
          {
            ...process,
            cpu: Number(Math.max(0, Math.min(95, process.cpu + jitter)).toFixed(1)),
          },
        ]);

        processMonitorRealtime.appendLogs(
          [
            {
              id: `live-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
              processId: process.id,
              processName: process.name,
              pid: process.pid,
              userId: process.userId,
              level: Math.random() > 0.93 ? 'WARN' : 'INFO',
              message: Math.random() > 0.93 ? 'Realtime threshold warning' : 'Realtime sample received',
            },
          ],
          logLineCap
        );
      }
    }, refreshIntervalMs);

    return () => window.clearInterval(interval);
  }, [enabled, logLineCap, refreshIntervalMs]);
}
```

## `process-monitoring-final/src/app/process-monitoring/index.ts`

- Category: `process-monitoring`
- Bytes: `109`
- SHA-256: `10ae56d477bdd768c0273169427272309a399e2ec76c236bf6481919fbb29ea1`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `index.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
export * from './types';
export * from './realtimeProcessStore';
export * from './views/ProcessMonitorView';
```

## `process-monitoring-final/src/app/process-monitoring/realtimeProcessStore.ts`

- Category: `process-monitoring`
- Bytes: `4542`
- SHA-256: `99a99bb1c883581369e1cde9cb3e722c6786d39ffce66d5ff1a709debc282816`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `realtimeProcessStore.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
import { initialProcessMonitorSnapshot } from './mockProcessMonitorData';
import type {
  ProcessMonitorMetrics,
  ProcessMonitorPatch,
  ProcessMonitorSnapshot,
  ProcessNode,
  RealtimeLogEntry,
  UserMetric,
} from './types';
import { createTimestamp } from './formatters';

export type ProcessMonitorListener = () => void;
export type ProcessMonitorDataSource = (api: ProcessMonitorRealtimeStore) => void | (() => void);

function cloneSnapshot(snapshot: ProcessMonitorSnapshot): ProcessMonitorSnapshot {
  return {
    ...snapshot,
    metrics: { ...snapshot.metrics, loadAverage: [...snapshot.metrics.loadAverage] as [number, number, number] },
    users: snapshot.users.map((user) => ({ ...user })),
    processes: snapshot.processes.map((process) => ({ ...process })),
    logs: snapshot.logs.map((log) => ({ ...log })),
    alerts: snapshot.alerts.map((alert) => ({ ...alert })),
  };
}

function mergeById<T extends { id: string }>(current: T[], updates: T[]): T[] {
  const next = new Map(current.map((item) => [item.id, item]));
  updates.forEach((item) => next.set(item.id, { ...next.get(item.id), ...item }));
  return Array.from(next.values());
}

export class ProcessMonitorRealtimeStore {
  private snapshot: ProcessMonitorSnapshot;
  private listeners = new Set<ProcessMonitorListener>();
  private teardownSource?: () => void;

  constructor(initialSnapshot: ProcessMonitorSnapshot = initialProcessMonitorSnapshot) {
    this.snapshot = cloneSnapshot(initialSnapshot);
  }

  subscribe = (listener: ProcessMonitorListener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.snapshot;

  getServerSnapshot = () => this.snapshot;

  replaceSnapshot = (nextSnapshot: ProcessMonitorSnapshot) => {
    this.snapshot = cloneSnapshot({ ...nextSnapshot, updatedAt: nextSnapshot.updatedAt || createTimestamp() });
    this.notify();
  };

  patchSnapshot = (patch: ProcessMonitorPatch) => {
    this.snapshot = {
      ...this.snapshot,
      ...patch,
      metrics: patch.metrics ? { ...this.snapshot.metrics, ...patch.metrics } : this.snapshot.metrics,
      users: patch.users ? patch.users.map((user) => ({ ...user })) : this.snapshot.users,
      processes: patch.processes ? patch.processes.map((process) => ({ ...process })) : this.snapshot.processes,
      logs: patch.logs ? patch.logs.map((log) => ({ ...log })) : this.snapshot.logs,
      alerts: patch.alerts ? patch.alerts.map((alert) => ({ ...alert })) : this.snapshot.alerts,
      updatedAt: patch.updatedAt || createTimestamp(),
    };
    this.notify();
  };

  setMetrics = (metrics: Partial<ProcessMonitorMetrics>) => {
    this.patchSnapshot({ metrics });
  };

  upsertUsers = (users: UserMetric[]) => {
    this.snapshot = {
      ...this.snapshot,
      users: mergeById(this.snapshot.users, users),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  upsertProcesses = (processes: ProcessNode[]) => {
    this.snapshot = {
      ...this.snapshot,
      processes: mergeById(this.snapshot.processes, processes),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  removeProcesses = (processIds: string[]) => {
    const removeSet = new Set(processIds);
    this.snapshot = {
      ...this.snapshot,
      processes: this.snapshot.processes.filter((process) => !removeSet.has(process.id)),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  appendLogs = (logs: RealtimeLogEntry[], cap = 5000) => {
    this.snapshot = {
      ...this.snapshot,
      logs: [...logs.map((log) => ({ ...log })), ...this.snapshot.logs].slice(0, cap),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  clearLogs = () => {
    this.snapshot = {
      ...this.snapshot,
      logs: [],
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  connectSource = (source: ProcessMonitorDataSource) => {
    this.teardownSource?.();
    const maybeTeardown = source(this);
    this.teardownSource = typeof maybeTeardown === 'function' ? maybeTeardown : undefined;
  };

  disconnectSource = () => {
    this.teardownSource?.();
    this.teardownSource = undefined;
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const processMonitorRealtime = new ProcessMonitorRealtimeStore();

if (typeof window !== 'undefined') {
  window.processMonitorRealtime = processMonitorRealtime;
}

declare global {
  interface Window {
    processMonitorRealtime?: ProcessMonitorRealtimeStore;
  }
}
```

## `process-monitoring-final/src/app/process-monitoring/types.ts`

- Category: `process-monitoring`
- Bytes: `2492`
- SHA-256: `29d3ccd15c1077150fff8b2fed7c035e96e8f45352df0891930220394d75770f`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `types.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
export type ProcessAccessMode = 'root' | 'normal';

export type UserStatus = 'active' | 'idle' | 'disconnected' | 'system';
export type ProcessStatus = 'running' | 'sleeping' | 'stopped' | 'zombie';
export type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

export interface UserMetric {
  id: string;
  name: string;
  cpu: number;
  memoryBytes: number;
  processCount: number;
  status: UserStatus;
  role?: 'root' | 'normal' | 'service' | 'system';
}

export interface ProcessNode {
  id: string;
  pid: number;
  parentId: string | null;
  name: string;
  command?: string;
  userId: string;
  cpu: number;
  memoryBytes: number;
  status: ProcessStatus;
  type?: 'system' | 'shell' | 'node' | 'database' | 'nginx' | 'docker' | 'python' | 'browser' | 'editor' | 'service' | 'other';
}

export interface RealtimeLogEntry {
  id: string;
  timestamp: string;
  processId?: string;
  processName: string;
  pid?: number;
  userId?: string;
  level: LogLevel;
  message: string;
}

export interface ProcessMonitorMetrics {
  totalProcesses: number;
  totalUsers: number;
  cpuUsage: number;
  memoryUsedBytes: number;
  memoryTotalBytes: number;
  loadAverage: [number, number, number];
  activeAlerts: number;
  uptime: string;
  networkGbps: number;
  diskMbps: number;
}

export interface MonitorAlert {
  id: string;
  title: string;
  message: string;
  level: Exclude<LogLevel, 'INFO' | 'DEBUG'>;
}

export interface ProcessMonitorSnapshot {
  updatedAt: string;
  metrics: ProcessMonitorMetrics;
  users: UserMetric[];
  processes: ProcessNode[];
  logs: RealtimeLogEntry[];
  alerts: MonitorAlert[];
}

export interface ProcessMonitorFilters {
  logLevels: Record<LogLevel, boolean>;
  processStatuses: Record<ProcessStatus, boolean>;
  minCpu: number;
}

export interface MonitorColumnState {
  users: {
    user: boolean;
    cpu: boolean;
    memory: boolean;
    processes: boolean;
    status: boolean;
  };
  processes: {
    process: boolean;
    pid: boolean;
    cpu: boolean;
    memory: boolean;
    status: boolean;
  };
  logs: {
    time: boolean;
    process: boolean;
    pid: boolean;
    level: boolean;
    message: boolean;
  };
}

export interface MonitorSettingsState {
  compactRows: boolean;
  showSparklines: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  refreshIntervalMs: number;
  logLineCap: number;
}

export type ProcessMonitorPatch = Partial<Omit<ProcessMonitorSnapshot, 'metrics'>> & {
  metrics?: Partial<ProcessMonitorMetrics>;
};
```

## `process-monitoring-final/src/app/process-monitoring/views/ProcessMonitorView.tsx`

- Category: `process-monitoring`
- Bytes: `8720`
- SHA-256: `e5ba640f9172d5e47eb3f5a59bb19129e563be9b9f716783c12bd04d55aa9ffc`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `ProcessMonitorView.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useMemo, useRef, useState } from 'react';
import { MonitorHeader } from '../components/MonitorHeader';
import { MetricsGrid } from '../components/MetricsGrid';
import { UserTreePanel } from '../components/UserTreePanel';
import { ProcessTreePanel } from '../components/ProcessTreePanel';
import { RealtimeLogsPanel } from '../components/RealtimeLogsPanel';
import { MonitorFooter } from '../components/MonitorFooter';
import { MonitorPopovers, createDefaultMonitorColumns, createDefaultMonitorFilters } from '../components/MonitorPopovers';
import { processMonitorRealtime } from '../realtimeProcessStore';
import { useDemoRealtimeFeed, useProcessMonitorSubscription } from '../hooks/useProcessMonitorSubscription';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAccentColor } from '../../contexts/AccentColorContext';
import type { MonitorSettingsState, ProcessAccessMode } from '../types';

interface ProcessMonitorViewProps {
  accessMode: ProcessAccessMode;
  title: string;
  normalUserId?: string;
}

const defaultSettings: MonitorSettingsState = {
  compactRows: false,
  showSparklines: true,
  highContrast: false,
  reduceMotion: false,
  refreshIntervalMs: 1400,
  logLineCap: 5000,
};

export function ProcessMonitorView({ accessMode, title, normalUserId = 'john' }: ProcessMonitorViewProps) {
  const snapshot = useProcessMonitorSubscription();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { accentColor, setAccentColor } = useAccentColor();

  const [isLive, setIsLive] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(accessMode === 'root' ? 'all' : normalUserId);
  const [userSearch, setUserSearch] = useState('');
  const [processSearch, setProcessSearch] = useState('');
  const [logSearch, setLogSearch] = useState('');
  const [filters, setFilters] = useState(createDefaultMonitorFilters());
  const [columns, setColumns] = useState(createDefaultMonitorColumns());
  const [settings, setSettings] = useState<MonitorSettingsState>(defaultSettings);
  const [timeRange, setTimeRange] = useState('Last 5 minutes');
  const [expandedUserGroups, setExpandedUserGroups] = useState(new Set(['logged-in', 'services']));
  const [expandedProcesses, setExpandedProcesses] = useState(new Set(['systemd', 'sshd', 'root-bash', 'node-server', 'nginx-master', 'postgres-master', 'docker-service', 'john-shell']));
  const [openPopover, setOpenPopover] = useState({ filter: false, columns: false, alerts: false, settings: false, timeRange: false });

  const filterRef = useRef<HTMLButtonElement>(null);
  const columnsRef = useRef<HTMLButtonElement>(null);
  const alertsRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const timeRangeRef = useRef<HTMLButtonElement>(null);

  useDemoRealtimeFeed(isLive, settings.logLineCap, settings.refreshIntervalMs);

  const visibleUsers = useMemo(() => {
    if (accessMode === 'normal') {
      return snapshot.users.filter((user) => user.id === normalUserId);
    }
    return snapshot.users;
  }, [accessMode, normalUserId, snapshot.users]);

  const effectiveSelectedUserId = accessMode === 'normal' ? normalUserId : selectedUserId;

  const setSinglePopover = (name: keyof typeof openPopover, value: boolean) => {
    setOpenPopover({ filter: false, columns: false, alerts: false, settings: false, timeRange: false, [name]: value });
  };

  const toggleUserGroup = (groupId: string) => {
    setExpandedUserGroups((previous) => {
      const next = new Set(previous);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const toggleProcess = (processId: string) => {
    setExpandedProcesses((previous) => {
      const next = new Set(previous);
      if (next.has(processId)) next.delete(processId);
      else next.add(processId);
      return next;
    });
  };

  const rootProcessesForScope = snapshot.processes.filter((process) => effectiveSelectedUserId === 'all' || process.userId === effectiveSelectedUserId);
  const scopedProcessIds = rootProcessesForScope.map((process) => process.id);

  const shellClassName = [
    'relative flex h-[calc(100vh-49px)] min-h-[760px] flex-col overflow-hidden bg-gradient-to-b from-background to-muted/70 text-foreground dark:from-[#050913] dark:to-[#0a1018]',
    settings.highContrast ? 'contrast-125' : '',
    settings.reduceMotion ? '[&_*]:!animate-none [&_*]:!transition-none' : '',
  ].join(' ');

  return (
    <div className={shellClassName}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <MonitorHeader
        title={title}
        accessMode={accessMode}
        isLive={isLive}
        isDarkMode={isDarkMode}
        timeRange={timeRange}
        alertCount={snapshot.alerts.length}
        onToggleLive={() => setIsLive((value) => !value)}
        onToggleTheme={toggleDarkMode}
        onOpenFilter={() => setSinglePopover('filter', !openPopover.filter)}
        onOpenColumns={() => setSinglePopover('columns', !openPopover.columns)}
        onOpenAlerts={() => setSinglePopover('alerts', !openPopover.alerts)}
        onOpenSettings={() => setSinglePopover('settings', !openPopover.settings)}
        onOpenTimeRange={() => setSinglePopover('timeRange', !openPopover.timeRange)}
        refs={{ filter: filterRef, columns: columnsRef, alerts: alertsRef, settings: settingsRef, timeRange: timeRangeRef }}
      />

      <main className="relative z-10 flex flex-1 min-h-0 flex-col gap-3 overflow-auto p-3 md:p-4">
        <MetricsGrid metrics={snapshot.metrics} showSparklines={settings.showSparklines} />

        <section className="grid flex-1 min-h-[560px] grid-cols-1 gap-3 xl:grid-cols-[minmax(310px,0.84fr)_minmax(430px,1.08fr)_minmax(520px,1.42fr)]">
          <UserTreePanel
            users={visibleUsers}
            accessMode={accessMode}
            selectedUserId={effectiveSelectedUserId}
            search={userSearch}
            columns={columns.users}
            compactRows={settings.compactRows}
            expandedGroups={expandedUserGroups}
            onSearchChange={setUserSearch}
            onSelectUser={(userId) => setSelectedUserId(userId)}
            onToggleGroup={toggleUserGroup}
            onExpandAll={() => setExpandedUserGroups(new Set(['logged-in', 'services']))}
            onCollapseAll={() => setExpandedUserGroups(new Set())}
          />

          <ProcessTreePanel
            processes={snapshot.processes}
            users={snapshot.users}
            selectedUserId={effectiveSelectedUserId}
            search={processSearch}
            filters={filters}
            columns={columns.processes}
            expandedProcesses={expandedProcesses}
            compactRows={settings.compactRows}
            onSearchChange={setProcessSearch}
            onToggleProcess={toggleProcess}
            onExpandAll={() => setExpandedProcesses(new Set(scopedProcessIds))}
            onCollapseAll={() => setExpandedProcesses(new Set())}
          />

          <RealtimeLogsPanel
            logs={snapshot.logs}
            users={snapshot.users}
            selectedUserId={effectiveSelectedUserId}
            search={logSearch}
            filters={filters}
            columns={columns.logs}
            isLive={isLive}
            compactRows={settings.compactRows}
            logLineCap={settings.logLineCap}
            onSearchChange={setLogSearch}
            onToggleLive={() => setIsLive((value) => !value)}
            onClearLogs={() => processMonitorRealtime.clearLogs()}
          />
        </section>
      </main>

      <MonitorFooter metrics={snapshot.metrics} updatedAt={snapshot.updatedAt} isLive={isLive} logLineCap={settings.logLineCap} />

      <MonitorPopovers
        refs={{ filter: filterRef, columns: columnsRef, alerts: alertsRef, settings: settingsRef, timeRange: timeRangeRef }}
        open={openPopover}
        onClose={(name) => setOpenPopover((previous) => ({ ...previous, [name]: false }))}
        filters={filters}
        setFilters={setFilters}
        columns={columns}
        setColumns={setColumns}
        settings={settings}
        setSettings={setSettings}
        alerts={snapshot.alerts}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
      />
    </div>
  );
}
```

## `process-monitoring-final/src/app/routes.tsx`

- Category: `process-monitoring`
- Bytes: `5095`
- SHA-256: `6533ddf03adf48810af6e72faea6aa5124dfe5d3ae3b11d7c9d5380071ece452`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `routes.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./screens/Home";
import { ExploreScreen } from "./screens/ExploreScreen";
import { ChannelScreen } from "./screens/ChannelScreen";
import { CategoryScreen } from "./screens/CategoryScreen";
import { SubjectHub } from "./screens/SubjectHub";
import { PostView } from "./screens/PostView";
import { PostCreate } from "./screens/PostCreate";
import { Activity } from "./screens/Activity";
import { BookmarksScreen } from "./screens/BookmarksScreen";
import { Profile } from "./screens/Profile";
import { ComponentsShowcase } from "./screens/ComponentsShowcase";
import { PricingPage } from "./screens/PricingPage";
import { PrivacyPage } from "./screens/PrivacyPage";
import { LandingPage } from "./screens/LandingPage";
import { UnifiedChat } from "./screens/UnifiedChat";
import { UserPermissions } from "./screens/UserPermissions";
import { OrganizationMembers } from "./screens/OrganizationMembers";
import { CredentialsManager } from "./screens/CredentialsManager";
import { ProcessMonitor } from "./screens/ProcessMonitor";
import { AdminDashboard } from "./screens/AdminDashboard";
import { PopoverDemo } from "./screens/PopoverDemo";
import WorkflowBuilder from "./screens/WorkflowBuilder";
import WorkflowsList from "./screens/WorkflowsList";
import WorkflowEditor from "./screens/WorkflowEditor";
import ChatConfigure from "./screens/ChatConfigure";
import AIAgents from "./screens/AIAgents";
import AIAgentEditor from "./screens/AIAgentEditor";
import Nodes from "./screens/Nodes";
import NodeEditor from "./screens/NodeEditor";
import Settings from "./screens/Settings";
import PlansAndPolicies from "./screens/PlansAndPolicies";
import AdminPlansAndPoliciesEnhanced from "./screens/AdminPlansAndPoliciesEnhanced";
import AIAgentProjects from "./screens/AIAgentProjects";
import AIAgentProjectEditor from "./screens/AIAgentProjectEditor";
import OrganizationDrive from "./screens/OrganizationDrive";
import SharedSpaceFiles from "./screens/SharedSpaceFiles";
import FileViewer from "./screens/FileViewer";
import OrganizationDefaults from "./screens/OrganizationDefaults";
import GlobalDefaults from "./screens/GlobalDefaults";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";

export const router = createBrowserRouter([
  { path: "login", Component: Login },
  { path: "signup", Component: Signup },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "landing", Component: LandingPage },
      { path: "explore", Component: ExploreScreen },
      { path: "channel/:channelId", Component: ChannelScreen },
      { path: "channel/:channelId/category/:categoryId", Component: CategoryScreen },
      { path: "channel/:channelId/category/:categoryId/subject/:subjectId", Component: SubjectHub },
      { path: "channel/:channelId/category/:categoryId/subject/:subjectId/post/:postId", Component: PostView },
      { path: "channel/:channelId/category/:categoryId/subject/:subjectId/create", Component: PostCreate },
      { path: "activity", Component: Activity },
      { path: "bookmarks", Component: BookmarksScreen },
      { path: "components", Component: ComponentsShowcase },
      { path: "dashboard-chat", Component: UnifiedChat },
      { path: "process-monitoring", Component: ProcessMonitor },
      { path: "process-monitor", Component: ProcessMonitor },
      { path: "admin-dashboard", Component: AdminDashboard },
      { path: "permissions", Component: UserPermissions },
      { path: "members", Component: OrganizationMembers },
      { path: "credentials", Component: CredentialsManager },
      { path: "plans-policies", Component: PlansAndPolicies },
      { path: "admin-plans-policies", Component: AdminPlansAndPoliciesEnhanced },
      { path: "pricing", Component: PricingPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "profile", Component: Profile },
      { path: "popover-demo", Component: PopoverDemo },
      { path: "workflow-builder", Component: WorkflowBuilder },
      { path: "workflows", Component: WorkflowsList },
      { path: "workflow-editor", Component: WorkflowEditor },
      { path: "chat-configure", Component: ChatConfigure },
      { path: "ai-agents", Component: AIAgents },
      { path: "ai-agent-editor", Component: AIAgentEditor },
      { path: "nodes", Component: Nodes },
      { path: "node-editor", Component: NodeEditor },
      { path: "ai-agent-projects", Component: AIAgentProjects },
      { path: "ai-agent-project-editor", Component: AIAgentProjectEditor },
      { path: "organization-drive", Component: OrganizationDrive },
      { path: "organization-drive/:spaceId", Component: SharedSpaceFiles },
      { path: "organization-drive/:spaceId/file/:fileId", Component: FileViewer },
      { path: "organization-defaults", Component: OrganizationDefaults },
      { path: "global-defaults", Component: GlobalDefaults },
      { path: "settings", Component: Settings },
    ],
  },
]);
```

## `process-monitoring-final/src/imports/README.md`

- Category: `process-monitoring`
- Bytes: `207`
- SHA-256: `1a6e6a5b022d9dedd11b3fd9d319f3fb3532efd11603af4a6b34c3b48e78c14b`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `README.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md
# Airtable

Read/write Airtable through centralized backend capabilities.

This node is command-capable and routes backend operations through `executeBackend`. It does not access Supabase or Neo4j directly.
```

## `process-monitoring-final/src/imports/advanced-swarm-v2-schema.json`

- Category: `process-monitoring`
- Bytes: `510`
- SHA-256: `fdcce46aa481d2cd3e7179a9e8c33a9cac03f8ce5f879ff7b62b7ab8120c1958`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `advanced-swarm-v2-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "advanced-swarm-v2",
  "name": "Advanced Swarm V2",
  "type": "advanced-swarm-v2",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.swarm.v2 through executeBackend.",
  "kind": "agent",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
```

## `process-monitoring-final/src/imports/agent-memory-schema.json`

- Category: `process-monitoring`
- Bytes: `507`
- SHA-256: `a5237b7d6ba4bc329fde19c3e2043a40982482c61fbf86a26aec0fe4ea4c7ff2`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `agent-memory-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "agent-memory",
  "name": "Agent Memory",
  "type": "agent-memory",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.memory.search.v2 through executeBackend.",
  "kind": "knowledge",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
```

## `process-monitoring-final/src/imports/agent-task-graph-schema.json`

- Category: `process-monitoring`
- Bytes: `509`
- SHA-256: `2cf9ada3d3b643997e8e709920f414ba8a3c1f25838de77987714f7b4b942947`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `agent-task-graph-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "agent-task-graph",
  "name": "Agent Task Graph",
  "type": "agent-task-graph",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.task_graph through executeBackend.",
  "kind": "agent",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
```

## `process-monitoring-final/src/imports/ai-agent-schema.json`

- Category: `process-monitoring`
- Bytes: `12225`
- SHA-256: `12aebd9c66d3bb9b42802f7abdf47603e94d52282c4b1f792e6a648577504ce2`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `ai-agent-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "ai-agent",
  "group": "Giga AI Nodes",
  "iconClass": "pi pi-sparkles",
  "executorKey": "ai-agent",
  "render": {
    "iconKey": "ai-agent",
    "iconClass": "pi pi-sparkles",
    "iconSize": 64,
    "nodeSize": 180,
    "nodeWidth": 252,
    "iconColor": "#0f766e",
    "iconBackground": "#ccfbf1"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Plan, confirm, execute, and respond through connected LLM, tools, and workflow nodes.",
      "label": "Description",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "selectionPromptMd": {
      "type": "markdown",
      "editable": true,
      "defaultValue": "Use the Node Rules and the connected commandToolSpec catalog to plan. Return direct replies for greetings. For mutations, read/resolve targets first, ask confirmation when required, then execute through connected tools. Do not hardcode backend actions that are not present in the connected tool catalog. Keep Giga answers grounded in local/scoped Giga knowledge. For workflow requests, create valid executable workflow definitions and execute/publish/attach only through connected tools. For charts/maps, preserve labels, values, legends, and [chart] markup.",
      "label": "Planning Prompt",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "executionMode": {
      "type": "select",
      "editable": true,
      "defaultValue": "plan-and-run",
      "label": "Execution Mode",
      "options": [
        {
          "label": "Plan And Run",
          "value": "plan-and-run"
        },
        {
          "label": "Plan Only",
          "value": "plan-only"
        },
        {
          "label": "Execute Approved Plan",
          "value": "execute-plan"
        },
        {
          "label": "Quick Reply",
          "value": "quick-reply"
        }
      ],
      "allowVariables": true
    },
    "confirmationPolicy": {
      "type": "select",
      "editable": true,
      "defaultValue": "mutations",
      "label": "Confirmation Policy",
      "options": [
        {
          "label": "Mutations Only",
          "value": "mutations-only"
        },
        {
          "label": "Always",
          "value": "always"
        },
        {
          "label": "Never",
          "value": "never"
        }
      ],
      "allowVariables": true
    },
    "modelActionPolicy": {
      "type": "select",
      "editable": true,
      "defaultValue": "prefer-tools",
      "label": "Model Action Policy",
      "options": [
        {
          "label": "Allow",
          "value": "allow"
        },
        {
          "label": "Prefer Direct Replies",
          "value": "prefer-direct-replies"
        },
        {
          "label": "Tools Only",
          "value": "tools-only"
        }
      ],
      "allowVariables": true
    },
    "quickReplyMaxWords": {
      "type": "number",
      "editable": true,
      "defaultValue": 14,
      "label": "Quick Reply Max Words",
      "allowVariables": true,
      "visibleWhen": {
        "field": "executionMode",
        "notEquals": "execute-plan"
      }
    },
    "nodeLibraryId": {
      "type": "string",
      "hidden": true,
      "editable": false,
      "defaultValue": "",
      "allowVariables": false
    },
    "status": {
      "type": "string",
      "hidden": true,
      "auto": true,
      "defaultValue": "stopped",
      "allowVariables": false
    },
    "source": {
      "type": "string",
      "hidden": true,
      "defaultValue": "",
      "allowVariables": false
    },
    "timestamp": {
      "type": "timestamp",
      "hidden": true,
      "auto": true,
      "allowVariables": false
    },
    "message": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Message",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "analysisSummary": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Analysis Summary",
      "allowVariables": true
    },
    "context": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Context",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "pendingPlan": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Pending Plan",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "confirmed": {
      "type": "boolean",
      "editable": true,
      "defaultValue": false,
      "label": "Confirmed",
      "allowVariables": true
    },
    "nodeRules": {
      "type": "markdown",
      "editable": true,
      "defaultValue": "AI Agent Node Rules\n\n- Use connected commandToolSpec tools; never assume backend action names that are not advertised by a connected peer.\n- Common greetings, thanks, and small talk should return a direct response without tool calls.\n- Read before mutate whenever the target is ambiguous.\n- Reuse/link existing tree nodes when the request asks for shared concepts or when matching nodes already exist.\n- Posts support create/read/update/delete only; never link or unlink posts.\n- Destructive operations require confirmation unless the request explicitly says to cancel/remove a pending flow.\n- Use permissions and entity/relation results as source of truth; do not bypass permissions in the agent.\n- For Giga questions, prefer local Giga knowledge and scoped posts/attachments over model priors.\n- Large knowledge sections must be chunked and summarized into smaller units before workflow/tool creation.\n- Workflow requests may create workflows, create workflows that create workflows, execute newly created workflows, publish workflows, and attach workflows when the connected tools support those operations.\n- Chart requests must preserve chart labels, values, title, legend, and map-region names.\n- US/Pakistan/India population map requests should use map chart tools with shaded blue values when requested.\n- RCM manager/training/data-analysis requests should create separate child workflows, place generated test data in Organisation shared space, then execute/report training results.\n- After successful tree mutations, return metadata that lets the UI refetch/realtime-refresh the affected tree scope.",
      "label": "Node Rules",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "maxToolPasses": {
      "type": "number",
      "editable": true,
      "defaultValue": 4,
      "label": "Max Tool Passes",
      "min": 1,
      "max": 10,
      "step": 1
    }
  },
  "inputs": {
    "input": {
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true
    },
    "nodeRules": {
      "type": "json",
      "label": "Node Rules"
    }
  },
  "commands": {
    "llm": {
      "label": "LLM",
      "portType": "bi-directional",
      "acceptedSourceGroups": [
        "AI Models"
      ],
      "acceptedSourceModelIds": [
        "openai",
        "claude",
        "gemini",
        "groq",
        "deepseek",
        "perplexity",
        "mistral"
      ],
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 1
    },
    "tools": {
      "label": "Tools",
      "portType": "bi-directional",
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 2,
      "acceptedSourceModelIds": [
        "action-router",
        "chart"
      ]
    },
    "workflow": {
      "label": "Workflow",
      "portType": "bi-directional",
      "acceptedSourceModelIds": [
        "workflow",
        "execute-workflow"
      ],
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 3
    }
  },
  "documentation": {
    "nodeTypeLabel": "AI Agent",
    "summary": "Composite worker-owned AI node that plans connected tools, handles confirmation, executes approved actions, and emits the final chat response payload.",
    "usage": "Connect one LLM on LLM, reusable backend tools on Tools, and workflow authoring/execution nodes on Workflow. Use this node when the workflow should both decide and answer without a separate AI Governor plus response merge chain.",
    "inputs": [
      {
        "key": "selectionPromptMd",
        "label": "Planning Prompt",
        "description": "Instructions for when the agent should use tools and how it should shape action plans.",
        "required": false
      },
      {
        "key": "confirmationPolicy",
        "label": "Confirmation Policy",
        "description": "When the agent should return a confirmation request before executing a plan.",
        "required": false
      },
      {
        "key": "workflowToolAllowlist",
        "label": "Workflow Tools",
        "description": "Optional subset of connected workflow-port tools that may be used for workflow output actions.",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "text",
        "label": "Text",
        "description": "Final assistant response text.",
        "required": false
      },
      {
        "key": "agent",
        "label": "Agent",
        "description": "Structured planning, execution, and response metadata.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Direct reply",
        "description": "Use the connected LLM to answer without tool execution when the request is conversational.",
        "setup": "Model Action Policy = Prefer Direct Replies",
        "output": "{ \"text\": \"Hello Rich, how are you?\", \"agent\": { \"response_format\": \"plain_text\" } }"
      },
      {
        "title": "Confirmation required",
        "description": "Mutating plans return a confirmation request and pending actions.",
        "setup": "Confirmation Policy = Mutations Only",
        "output": "{ \"text\": \"I can make these Giga changes after you confirm:\", \"agent\": { \"requires_confirmation\": true } }"
      },
      {
        "title": "Workflow output",
        "description": "Connected Workflow plus Execute Workflow nodes return the final workflow output directly.",
        "setup": "Workflow nodes connected on cmd:workflow",
        "output": "{ \"text\": \"Requested workflow output.\", \"agent\": { \"response_format\": \"workflow_output\" } }"
      }
    ],
    "failureCases": [
      "Fails when the planning prompt is missing in plan modes.",
      "Fails when a connected tool port peer does not expose commandToolSpec().",
      "Fails when execute-plan runs without a plan input."
    ],
    "backend": null,
    "nodeRules": "The AI Agent is tool-spec driven. It plans only from connected commandToolSpec peers, applies nodeRules, supports multiple LLM/tool passes, and confirmation-gates mutations."
  },
  "properties": {
    "agentId": {
      "type": "string",
      "title": "Stored AI Agent",
      "description": "Reusable ai_agents.id to run with the OpenAI Agents SDK."
    },
    "agentRuntimeMode": {
      "type": "string",
      "enum": [
        "inline",
        "stored-agent",
        "swarm"
      ],
      "default": "stored-agent"
    },
    "openAgentEditor": {
      "type": "boolean",
      "default": false,
      "ui": {
        "action": "open-ai-agent-editor"
      }
    },
    "persistSession": {
      "type": "boolean",
      "default": true
    },
    "memoryMode": {
      "type": "string",
      "enum": [
        "none",
        "session",
        "user",
        "organization"
      ],
      "default": "session"
    },
    "modelProvider": {
      "type": "string",
      "default": "openai"
    },
    "modelId": {
      "type": "string",
      "default": "gpt-4.1-mini"
    }
  },
  "ui": {
    "customInspector": "ai-agent-editor"
  },
  "supportsStoredAgents": true
}
```

## `process-monitoring-final/src/imports/airtable-node.ts`

- Category: `process-monitoring`
- Bytes: `349`
- SHA-256: `b84cf096d4e7ef580ca9f558c160592630ef74ab1569d56444a6782913af0875`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `airtable-node.ts`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```ts
import rawSchema from './airtable-schema.json';
import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';

export default createAgentBackendNodeModule({ id: 'airtable', rawSchema, label: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', order: 512 });
```

## `process-monitoring-final/src/imports/airtable-schema.json`

- Category: `process-monitoring`
- Bytes: `2984`
- SHA-256: `25ff2e76179026b7493954f293cf88978d777206f024e7ae36bcd7fffa159cd7`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `airtable-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "airtable",
  "group": "Data and Integrations",
  "iconClass": "pi pi-bolt",
  "executorKey": "airtable",
  "render": {
    "iconKey": "airtable",
    "iconClass": "pi pi-bolt",
    "iconSize": 64,
    "nodeSize": 180,
    "iconColor": "#2563eb",
    "iconBackground": "#dbeafe"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "markdown",
      "label": "Markdown",
      "type": "markdown"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "instruction": {
    "code": false,
    "markdown": false
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Description",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "operation": {
      "type": "string",
      "editable": true,
      "defaultValue": "auto",
      "label": "Operation",
      "allowVariables": true
    },
    "prompt": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Prompt",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "credentialKey": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Credential Key",
      "allowVariables": true
    },
    "config": {
      "type": "json",
      "editable": true,
      "defaultValue": {},
      "label": "Config",
      "allowVariables": true
    },
    "query": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Query / Command",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    }
  },
  "inputs": {
    "input": {
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true
    }
  },
  "commands": {
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "acceptedSourceModelIds": [
        "ai-agent"
      ],
      "allowMultipleArrows": true
    }
  },
  "documentation": {
    "nodeTypeLabel": "Airtable",
    "summary": "Read/write Airtable through centralized backend capabilities.",
    "usage": "This node exposes a reusable command tool to the AI Agent. Backend operations are routed through executeBackend -> Entities or centralized capabilities.",
    "inputs": [
      {
        "key": "operation",
        "label": "Operation",
        "required": false
      },
      {
        "key": "prompt",
        "label": "Prompt",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "output",
        "label": "Output"
      }
    ]
  }
}
```

## `process-monitoring-final/src/imports/merge-schema.json`

- Category: `process-monitoring`
- Bytes: `5502`
- SHA-256: `aa1d19ce85e1edeeaea0a32b854fa41d0628ffe4cffa9afd3d296c97394afb27`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `merge-schema.json`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```json
{
  "id": "merge",
  "group": "Data",
  "iconClass": "pi pi-clone",
  "executorKey": "merge",
  "render": {
    "iconKey": "merge",
    "iconClass": "pi pi-clone",
    "iconSize": 64,
    "nodeSize": 180,
    "iconColor": "#1d4ed8",
    "iconBackground": "#dbeafe"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "instruction": {
    "code": false,
    "markdown": false
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Combine upstream outputs into one payload.",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "nodeLibraryId": {
      "type": "string",
      "hidden": true,
      "editable": false,
      "defaultValue": "",
      "allowVariables": false
    },
    "status": {
      "type": "string",
      "hidden": true,
      "auto": true,
      "defaultValue": "stopped",
      "allowVariables": false
    },
    "source": {
      "type": "string",
      "hidden": true,
      "defaultValue": "",
      "allowVariables": false
    },
    "timestamp": {
      "type": "timestamp",
      "hidden": true,
      "auto": true,
      "allowVariables": false
    },
    "input1Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 1 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input2Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 2 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input3Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 3 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input4Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 4 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input5Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 5 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    }
  },
  "inputs": {
    "input1": {
      "label": "Input 1",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 1
    },
    "input2": {
      "label": "Input 2",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 2
    },
    "input3": {
      "label": "Input 3",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 3
    },
    "input4": {
      "label": "Input 4",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 4
    },
    "input5": {
      "label": "Input 5",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 5
    },
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true,
      "side": "right",
      "order": 1
    },
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "allowMultipleArrows": true
    }
  },
  "documentation": {
    "nodeTypeLabel": "Merge",
    "summary": "Combines up to five input ports into a single output payload.",
    "usage": "Bind Input 1 Value through Input 5 Value from other nodes using variables. Plain objects are shallow-merged in order and non-object payloads are preserved under their configured input key.",
    "inputs": [
      {
        "key": "port:command",
        "label": "Control Port: Command",
        "description": "Bi-directional control-state input from connected command peers.",
        "required": false
      },
      {
        "key": "port:input1",
        "label": "Input Port: Input 1",
        "description": "Optional graph dependency. Bind Input 1 Value explicitly to merge data.",
        "required": false
      },
      {
        "key": "port:input2",
        "label": "Input Port: Input 2",
        "description": "Incoming payload merged after Input 1.",
        "required": false
      },
      {
        "key": "port:input3",
        "label": "Input Port: Input 3",
        "description": "Incoming payload merged after Input 2.",
        "required": false
      },
      {
        "key": "port:input4",
        "label": "Input Port: Input 4",
        "description": "Incoming payload merged after Input 3.",
        "required": false
      },
      {
        "key": "port:input5",
        "label": "Input Port: Input 5",
        "description": "Incoming payload merged last.",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "port:command",
        "label": "Control Port: Command",
        "description": "Publishes this node control state for connected command peers.",
        "required": false
      },
      {
        "key": "port:output",
        "label": "Output Port: Output",
        "description": "Outgoing payload emitted after node execution.",
        "required": false
      }
    ],
    "failureCases": []
  }
}
```
