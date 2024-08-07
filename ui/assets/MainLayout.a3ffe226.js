import{i as ae,k as M,r as q,c as f,l as j,o as G,t as Be,m as Je,R as Ye,h as w,n as Re,p as Ze,q as et,Q as ne,u as be,g as W,v as tt,x as nt,y as N,z as ge,A as Ve,B as $e,C as he,D as se,E as ze,w as B,G as me,H as at,I as ot,J as Ie,K as lt,L as oe,M as it,N as rt,O as ut,P as st,S as ce,U as te,a as ct,V as dt,W as ft,X as de,Y as fe,Z as F,f as A,_ as vt,$ as ht,a0 as bt,a1 as gt,a2 as mt,a3 as yt}from"./index.b387db58.js";import{Q as wt,a as Tt,b as qt}from"./QToolbar.953ee902.js";import{r as Ct}from"./rtl.276c3f1b.js";import"./index.a1ffc747.js";let _t=0;const St=["click","keydown"],xt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${_t++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Lt(e,C,l,a){const t=ae(Be,M);if(t===M)return console.error("QTab/QRouteTab component needs to be child of QTabs"),M;const{proxy:v}=W(),b=q(null),L=q(null),m=q(null),c=f(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),S=f(()=>t.currentModel.value===e.name),P=f(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(S.value===!0?" q-tab--active"+(t.tabProps.value.activeClass?" "+t.tabProps.value.activeClass:"")+(t.tabProps.value.activeColor?` text-${t.tabProps.value.activeColor}`:"")+(t.tabProps.value.activeBgColor?` bg-${t.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&t.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||t.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(a!==void 0?a.linkClass.value:"")),k=f(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(t.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),h=f(()=>e.disable===!0||t.hasFocus.value===!0||S.value===!1&&t.hasActiveTab.value===!0?-1:e.tabindex||0);function _(r,u){if(u!==!0&&b.value!==null&&b.value.focus(),e.disable===!0){a!==void 0&&a.hasRouterLink.value===!0&&Re(r);return}if(a===void 0){t.updateModel({name:e.name}),l("click",r);return}if(a.hasRouterLink.value===!0){const o=(g={})=>{let z;const H=g.to===void 0||tt(g.to,e.to)===!0?t.avoidRouteWatcher=nt():null;return a.navigateToRouterLink(r,{...g,returnRouterError:!0}).catch(p=>{z=p}).then(p=>{if(H===t.avoidRouteWatcher&&(t.avoidRouteWatcher=!1,z===void 0&&(p===void 0||p.message!==void 0&&p.message.startsWith("Avoided redundant navigation")===!0)&&t.updateModel({name:e.name})),g.returnRouterError===!0)return z!==void 0?Promise.reject(z):p})};l("click",r,o),r.defaultPrevented!==!0&&o();return}l("click",r)}function x(r){Ze(r,[13,32])?_(r,!0):et(r)!==!0&&r.keyCode>=35&&r.keyCode<=40&&r.altKey!==!0&&r.metaKey!==!0&&t.onKbdNavigate(r.keyCode,v.$el)===!0&&Re(r),l("keydown",r)}function V(){const r=t.tabProps.value.narrowIndicator,u=[],o=w("div",{ref:m,class:["q-tab__indicator",t.tabProps.value.indicatorClass]});e.icon!==void 0&&u.push(w(ne,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&u.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&u.push(e.alertIcon!==void 0?w(ne,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),r===!0&&u.push(o);const g=[w("div",{class:"q-focus-helper",tabindex:-1,ref:b}),w("div",{class:k.value},be(C.default,u))];return r===!1&&g.push(o),g}const Q={name:f(()=>e.name),rootRef:L,tabIndicatorRef:m,routeData:a};j(()=>{t.unregisterTab(Q)}),G(()=>{t.registerTab(Q)});function s(r,u){const o={ref:L,class:P.value,tabindex:h.value,role:"tab","aria-selected":S.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:_,onKeydown:x,...u};return Je(w(r,o,V()),[[Ye,c.value]])}return{renderTab:s,$tabs:t}}var ve=N({name:"QTab",props:xt,emits:St,setup(e,{slots:C,emit:l}){const{renderTab:a}=Lt(e,C,l);return()=>a("div")}});function Rt(){const e=q(!ge.value);return e.value===!1&&G(()=>{e.value=!0}),{isHydrated:e}}const Qe=typeof ResizeObserver!="undefined",Pe=Qe===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var X=N({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:C}){let l=null,a,t={width:-1,height:-1};function v(m){m===!0||e.debounce===0||e.debounce==="0"?b():l===null&&(l=setTimeout(b,e.debounce))}function b(){if(l!==null&&(clearTimeout(l),l=null),a){const{offsetWidth:m,offsetHeight:c}=a;(m!==t.width||c!==t.height)&&(t={width:m,height:c},C("resize",t))}}const{proxy:L}=W();if(L.trigger=v,Qe===!0){let m;const c=S=>{a=L.$el.parentNode,a?(m=new ResizeObserver(v),m.observe(a),b()):S!==!0&&$e(()=>{c(!0)})};return G(()=>{c()}),j(()=>{l!==null&&clearTimeout(l),m!==void 0&&(m.disconnect!==void 0?m.disconnect():a&&m.unobserve(a))}),Ve}else{let S=function(){l!==null&&(clearTimeout(l),l=null),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",v,he.passive),c=void 0)},P=function(){S(),a&&a.contentDocument&&(c=a.contentDocument.defaultView,c.addEventListener("resize",v,he.passive),b())};const{isHydrated:m}=Rt();let c;return G(()=>{$e(()=>{a=L.$el,a&&P()})}),j(S),()=>{if(m.value===!0)return w("object",{class:"q--avoid-card-border",style:Pe.style,tabindex:-1,type:"text/html",data:Pe.url,"aria-hidden":"true",onLoad:P})}}}});function $t(e,C,l){const a=l===!0?["left","right"]:["top","bottom"];return`absolute-${C===!0?a[0]:a[1]}${e?` text-${e}`:""}`}const zt=["left","center","right","justify"];var Pt=N({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>zt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:C,emit:l}){const{proxy:a}=W(),{$q:t}=a,{registerTick:v}=se(),{registerTick:b}=se(),{registerTick:L}=se(),{registerTimeout:m,removeTimeout:c}=ze(),{registerTimeout:S,removeTimeout:P}=ze(),k=q(null),h=q(null),_=q(e.modelValue),x=q(!1),V=q(!0),Q=q(!1),s=q(!1),r=[],u=q(0),o=q(!1);let g=null,z=null,H;const p=f(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:$t(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),He=f(()=>{const n=u.value,i=_.value;for(let d=0;d<n;d++)if(r[d].name.value===i)return!0;return!1}),Ae=f(()=>`q-tabs__content--align-${x.value===!0?"left":s.value===!0?"justify":e.align}`),Me=f(()=>`q-tabs row no-wrap items-center q-tabs--${x.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),pe=f(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Ae.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),J=f(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),Y=f(()=>e.vertical!==!0&&t.lang.rtl===!0),le=f(()=>Ct===!1&&Y.value===!0);B(Y,U),B(()=>e.modelValue,n=>{ie({name:n,setCurrent:!0,skipEmit:!0})}),B(()=>e.outsideArrows,Z);function ie({name:n,setCurrent:i,skipEmit:d}){_.value!==n&&(d!==!0&&e["onUpdate:modelValue"]!==void 0&&l("update:modelValue",n),(i===!0||e["onUpdate:modelValue"]===void 0)&&(Ee(_.value,n),_.value=n))}function Z(){v(()=>{ye({width:k.value.offsetWidth,height:k.value.offsetHeight})})}function ye(n){if(J.value===void 0||h.value===null)return;const i=n[J.value.container],d=Math.min(h.value[J.value.scroll],Array.prototype.reduce.call(h.value.children,($,T)=>$+(T[J.value.content]||0),0)),R=i>0&&d>i;x.value=R,R===!0&&b(U),s.value=i<parseInt(e.breakpoint,10)}function Ee(n,i){const d=n!=null&&n!==""?r.find($=>$.name.value===n):null,R=i!=null&&i!==""?r.find($=>$.name.value===i):null;if(d&&R){const $=d.tabIndicatorRef.value,T=R.tabIndicatorRef.value;g!==null&&(clearTimeout(g),g=null),$.style.transition="none",$.style.transform="none",T.style.transition="none",T.style.transform="none";const y=$.getBoundingClientRect(),I=T.getBoundingClientRect();T.style.transform=e.vertical===!0?`translate3d(0,${y.top-I.top}px,0) scale3d(1,${I.height?y.height/I.height:1},1)`:`translate3d(${y.left-I.left}px,0,0) scale3d(${I.width?y.width/I.width:1},1,1)`,L(()=>{g=setTimeout(()=>{g=null,T.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",T.style.transform="none"},70)})}R&&x.value===!0&&K(R.rootRef.value)}function K(n){const{left:i,width:d,top:R,height:$}=h.value.getBoundingClientRect(),T=n.getBoundingClientRect();let y=e.vertical===!0?T.top-R:T.left-i;if(y<0){h.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(y),U();return}y+=e.vertical===!0?T.height-$:T.width-d,y>0&&(h.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(y),U())}function U(){const n=h.value;if(n===null)return;const i=n.getBoundingClientRect(),d=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);Y.value===!0?(V.value=Math.ceil(d+i.width)<n.scrollWidth-1,Q.value=d>0):(V.value=d>0,Q.value=e.vertical===!0?Math.ceil(d+i.height)<n.scrollHeight:Math.ceil(d+i.width)<n.scrollWidth)}function we(n){z!==null&&clearInterval(z),z=setInterval(()=>{De(n)===!0&&O()},5)}function Te(){we(le.value===!0?Number.MAX_SAFE_INTEGER:0)}function qe(){we(le.value===!0?0:Number.MAX_SAFE_INTEGER)}function O(){z!==null&&(clearInterval(z),z=null)}function Fe(n,i){const d=Array.prototype.filter.call(h.value.children,I=>I===i||I.matches&&I.matches(".q-tab.q-focusable")===!0),R=d.length;if(R===0)return;if(n===36)return K(d[0]),d[0].focus(),!0;if(n===35)return K(d[R-1]),d[R-1].focus(),!0;const $=n===(e.vertical===!0?38:37),T=n===(e.vertical===!0?40:39),y=$===!0?-1:T===!0?1:void 0;if(y!==void 0){const I=Y.value===!0?-1:1,E=d.indexOf(i)+y*I;return E>=0&&E<R&&(K(d[E]),d[E].focus({preventScroll:!0})),!0}}const Oe=f(()=>le.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,i)=>{n.scrollLeft=-i}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,i)=>{n.scrollTop=i}}:{get:n=>n.scrollLeft,set:(n,i)=>{n.scrollLeft=i}});function De(n){const i=h.value,{get:d,set:R}=Oe.value;let $=!1,T=d(i);const y=n<T?-1:1;return T+=y*5,T<0?($=!0,T=0):(y===-1&&T<=n||y===1&&T>=n)&&($=!0,T=n),R(i,T),U(),$}function Ce(n,i){for(const d in n)if(n[d]!==i[d])return!1;return!0}function We(){let n=null,i={matchedLen:0,queryDiff:9999,hrefLen:0};const d=r.filter(y=>y.routeData!==void 0&&y.routeData.hasRouterLink.value===!0),{hash:R,query:$}=a.$route,T=Object.keys($).length;for(const y of d){const I=y.routeData.exact.value===!0;if(y.routeData[I===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:E,query:re,matched:Ge,href:Xe}=y.routeData.resolvedLink.value,ue=Object.keys(re).length;if(I===!0){if(E!==R||ue!==T||Ce($,re)===!1)continue;n=y.name.value;break}if(E!==""&&E!==R||ue!==0&&Ce(re,$)===!1)continue;const D={matchedLen:Ge.length,queryDiff:T-ue,hrefLen:Xe.length-E.length};if(D.matchedLen>i.matchedLen){n=y.name.value,i=D;continue}else if(D.matchedLen!==i.matchedLen)continue;if(D.queryDiff<i.queryDiff)n=y.name.value,i=D;else if(D.queryDiff!==i.queryDiff)continue;D.hrefLen>i.hrefLen&&(n=y.name.value,i=D)}n===null&&r.some(y=>y.routeData===void 0&&y.name.value===_.value)===!0||ie({name:n,setCurrent:!0})}function Ne(n){if(c(),o.value!==!0&&k.value!==null&&n.target&&typeof n.target.closest=="function"){const i=n.target.closest(".q-tab");i&&k.value.contains(i)===!0&&(o.value=!0,x.value===!0&&K(i))}}function je(){m(()=>{o.value=!1},30)}function ee(){Se.avoidRouteWatcher===!1?S(We):P()}function _e(){if(H===void 0){const n=B(()=>a.$route.fullPath,ee);H=()=>{n(),H=void 0}}}function Ke(n){r.push(n),u.value++,Z(),n.routeData===void 0||a.$route===void 0?S(()=>{if(x.value===!0){const i=_.value,d=i!=null&&i!==""?r.find(R=>R.name.value===i):null;d&&K(d.rootRef.value)}}):(_e(),n.routeData.hasRouterLink.value===!0&&ee())}function Ue(n){r.splice(r.indexOf(n),1),u.value--,Z(),H!==void 0&&n.routeData!==void 0&&(r.every(i=>i.routeData===void 0)===!0&&H(),ee())}const Se={currentModel:_,tabProps:p,hasFocus:o,hasActiveTab:He,registerTab:Ke,unregisterTab:Ue,verifyRouteModel:ee,updateModel:ie,onKbdNavigate:Fe,avoidRouteWatcher:!1};me(Be,Se);function xe(){g!==null&&clearTimeout(g),O(),H!==void 0&&H()}let Le;return j(xe),at(()=>{Le=H!==void 0,xe()}),ot(()=>{Le===!0&&_e(),Z()}),()=>w("div",{ref:k,class:Me.value,role:"tablist",onFocusin:Ne,onFocusout:je},[w(X,{onResize:ye}),w("div",{ref:h,class:pe.value,onScroll:U},Ie(C.default)),w(ne,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(V.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||t.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Te,onTouchstartPassive:Te,onMouseupPassive:O,onMouseleavePassive:O,onTouchendPassive:O}),w(ne,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(Q.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||t.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:qe,onTouchstartPassive:qe,onMouseupPassive:O,onMouseleavePassive:O,onTouchendPassive:O})])}}),kt=N({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:C,emit:l}){const{proxy:{$q:a}}=W(),t=ae(oe,M);if(t===M)return console.error("QHeader needs to be child of QLayout"),M;const v=q(parseInt(e.heightHint,10)),b=q(!0),L=f(()=>e.reveal===!0||t.view.value.indexOf("H")!==-1||a.platform.is.ios&&t.isContainer.value===!0),m=f(()=>{if(e.modelValue!==!0)return 0;if(L.value===!0)return b.value===!0?v.value:0;const s=v.value-t.scroll.value.position;return s>0?s:0}),c=f(()=>e.modelValue!==!0||L.value===!0&&b.value!==!0),S=f(()=>e.modelValue===!0&&c.value===!0&&e.reveal===!0),P=f(()=>"q-header q-layout__section--marginal "+(L.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(c.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),k=f(()=>{const s=t.rows.value.top,r={};return s[0]==="l"&&t.left.space===!0&&(r[a.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),s[2]==="r"&&t.right.space===!0&&(r[a.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),r});function h(s,r){t.update("header",s,r)}function _(s,r){s.value!==r&&(s.value=r)}function x({height:s}){_(v,s),h("size",s)}function V(s){S.value===!0&&_(b,!0),l("focusin",s)}B(()=>e.modelValue,s=>{h("space",s),_(b,!0),t.animate()}),B(m,s=>{h("offset",s)}),B(()=>e.reveal,s=>{s===!1&&_(b,e.modelValue)}),B(b,s=>{t.animate(),l("reveal",s)}),B(t.scroll,s=>{e.reveal===!0&&_(b,s.direction==="up"||s.position<=e.revealOffset||s.position-s.inflectionPoint<100)});const Q={};return t.instances.header=Q,e.modelValue===!0&&h("size",v.value),h("space",e.modelValue),h("offset",m.value),j(()=>{t.instances.header===Q&&(t.instances.header=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const s=lt(C.default,[]);return e.elevated===!0&&s.push(w("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(w(X,{debounce:0,onResize:x})),w("header",{class:P.value,style:k.value,onFocusin:V},s)}}}),Bt=N({name:"QPageContainer",setup(e,{slots:C}){const{proxy:{$q:l}}=W(),a=ae(oe,M);if(a===M)return console.error("QPageContainer needs to be child of QLayout"),M;me(it,!0);const t=f(()=>{const v={};return a.header.space===!0&&(v.paddingTop=`${a.header.size}px`),a.right.space===!0&&(v[`padding${l.lang.rtl===!0?"Left":"Right"}`]=`${a.right.size}px`),a.footer.space===!0&&(v.paddingBottom=`${a.footer.size}px`),a.left.space===!0&&(v[`padding${l.lang.rtl===!0?"Right":"Left"}`]=`${a.left.size}px`),v});return()=>w("div",{class:"q-page-container",style:t.value},Ie(C.default))}}),Vt=N({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:C,emit:l}){const{proxy:{$q:a}}=W(),t=ae(oe,M);if(t===M)return console.error("QFooter needs to be child of QLayout"),M;const v=q(parseInt(e.heightHint,10)),b=q(!0),L=q(ge.value===!0||t.isContainer.value===!0?0:window.innerHeight),m=f(()=>e.reveal===!0||t.view.value.indexOf("F")!==-1||a.platform.is.ios&&t.isContainer.value===!0),c=f(()=>t.isContainer.value===!0?t.containerHeight.value:L.value),S=f(()=>{if(e.modelValue!==!0)return 0;if(m.value===!0)return b.value===!0?v.value:0;const o=t.scroll.value.position+c.value+v.value-t.height.value;return o>0?o:0}),P=f(()=>e.modelValue!==!0||m.value===!0&&b.value!==!0),k=f(()=>e.modelValue===!0&&P.value===!0&&e.reveal===!0),h=f(()=>"q-footer q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(P.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(m.value!==!0?" hidden":""):"")),_=f(()=>{const o=t.rows.value.bottom,g={};return o[0]==="l"&&t.left.space===!0&&(g[a.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),o[2]==="r"&&t.right.space===!0&&(g[a.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),g});function x(o,g){t.update("footer",o,g)}function V(o,g){o.value!==g&&(o.value=g)}function Q({height:o}){V(v,o),x("size",o)}function s(){if(e.reveal!==!0)return;const{direction:o,position:g,inflectionPoint:z}=t.scroll.value;V(b,o==="up"||g-z<100||t.height.value-c.value-g-v.value<300)}function r(o){k.value===!0&&V(b,!0),l("focusin",o)}B(()=>e.modelValue,o=>{x("space",o),V(b,!0),t.animate()}),B(S,o=>{x("offset",o)}),B(()=>e.reveal,o=>{o===!1&&V(b,e.modelValue)}),B(b,o=>{t.animate(),l("reveal",o)}),B([v,t.scroll,t.height],s),B(()=>a.screen.height,o=>{t.isContainer.value!==!0&&V(L,o)});const u={};return t.instances.footer=u,e.modelValue===!0&&x("size",v.value),x("space",e.modelValue),x("offset",S.value),j(()=>{t.instances.footer===u&&(t.instances.footer=void 0,x("size",0),x("offset",0),x("space",!1))}),()=>{const o=be(C.default,[w(X,{debounce:0,onResize:Q})]);return e.elevated===!0&&o.push(w("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),w("footer",{class:h.value,style:_.value,onFocusin:r},o)}}});const{passive:ke}=he,It=["both","horizontal","vertical"];var Qt=N({name:"QScrollObserver",props:{axis:{type:String,validator:e=>It.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:C}){const l={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let a=null,t,v;B(()=>e.scrollTarget,()=>{m(),L()});function b(){a!==null&&a();const P=Math.max(0,ut(t)),k=st(t),h={top:P-l.position.top,left:k-l.position.left};if(e.axis==="vertical"&&h.top===0||e.axis==="horizontal"&&h.left===0)return;const _=Math.abs(h.top)>=Math.abs(h.left)?h.top<0?"up":"down":h.left<0?"left":"right";l.position={top:P,left:k},l.directionChanged=l.direction!==_,l.delta=h,l.directionChanged===!0&&(l.direction=_,l.inflectionPoint=l.position),C("scroll",{...l})}function L(){t=rt(v,e.scrollTarget),t.addEventListener("scroll",c,ke),c(!0)}function m(){t!==void 0&&(t.removeEventListener("scroll",c,ke),t=void 0)}function c(P){if(P===!0||e.debounce===0||e.debounce==="0")b();else if(a===null){const[k,h]=e.debounce?[setTimeout(b,e.debounce),clearTimeout]:[requestAnimationFrame(b),cancelAnimationFrame];a=()=>{h(k),a=null}}}const{proxy:S}=W();return B(()=>S.$q.lang.rtl,b),G(()=>{v=S.$el.parentNode,L()}),j(()=>{a!==null&&a(),m()}),Object.assign(S,{trigger:c,getPosition:()=>l}),Ve}}),Ht=N({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:C,emit:l}){const{proxy:{$q:a}}=W(),t=q(null),v=q(a.screen.height),b=q(e.container===!0?0:a.screen.width),L=q({position:0,direction:"down",inflectionPoint:0}),m=q(0),c=q(ge.value===!0?0:ce()),S=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),P=f(()=>e.container===!1?{minHeight:a.screen.height+"px"}:null),k=f(()=>c.value!==0?{[a.lang.rtl===!0?"left":"right"]:`${c.value}px`}:null),h=f(()=>c.value!==0?{[a.lang.rtl===!0?"right":"left"]:0,[a.lang.rtl===!0?"left":"right"]:`-${c.value}px`,width:`calc(100% + ${c.value}px)`}:null);function _(u){if(e.container===!0||document.qScrollPrevented!==!0){const o={position:u.position.top,direction:u.direction,directionChanged:u.directionChanged,inflectionPoint:u.inflectionPoint.top,delta:u.delta.top};L.value=o,e.onScroll!==void 0&&l("scroll",o)}}function x(u){const{height:o,width:g}=u;let z=!1;v.value!==o&&(z=!0,v.value=o,e.onScrollHeight!==void 0&&l("scrollHeight",o),Q()),b.value!==g&&(z=!0,b.value=g),z===!0&&e.onResize!==void 0&&l("resize",u)}function V({height:u}){m.value!==u&&(m.value=u,Q())}function Q(){if(e.container===!0){const u=v.value>m.value?ce():0;c.value!==u&&(c.value=u)}}let s=null;const r={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:t,height:v,containerHeight:m,scrollbarWidth:c,totalWidth:f(()=>b.value+c.value),rows:f(()=>{const u=e.view.toLowerCase().split(" ");return{top:u[0].split(""),middle:u[1].split(""),bottom:u[2].split("")}}),header:te({size:0,offset:0,space:!1}),right:te({size:300,offset:0,space:!1}),footer:te({size:0,offset:0,space:!1}),left:te({size:300,offset:0,space:!1}),scroll:L,animate(){s!==null?clearTimeout(s):document.body.classList.add("q-body--layout-animate"),s=setTimeout(()=>{s=null,document.body.classList.remove("q-body--layout-animate")},155)},update(u,o,g){r[u][o]=g}};if(me(oe,r),ce()>0){let g=function(){u=null,o.classList.remove("hide-scrollbar")},z=function(){if(u===null){if(o.scrollHeight>a.screen.height)return;o.classList.add("hide-scrollbar")}else clearTimeout(u);u=setTimeout(g,300)},H=function(p){u!==null&&p==="remove"&&(clearTimeout(u),g()),window[`${p}EventListener`]("resize",z)},u=null;const o=document.body;B(()=>e.container!==!0?"add":"remove",H),e.container!==!0&&H("add"),ct(()=>{H("remove")})}return()=>{const u=be(C.default,[w(Qt,{onScroll:_}),w(X,{onResize:x})]),o=w("div",{class:S.value,style:P.value,ref:e.container===!0?void 0:t,tabindex:-1},u);return e.container===!0?w("div",{class:"q-layout-container overflow-hidden",ref:t},[w(X,{onResize:V}),w("div",{class:"absolute-full",style:k.value},[w("div",{class:"scroll",style:h.value},[o])])]):o}}});const At=yt("img",{src:"/icons/Icon-256.png"},null,-1),Ot=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){return dt(),q(!1),q(""),q(!1),(C,l)=>{const a=ft("router-view");return de(),fe(Ht,{view:"lHh lpR fFf"},{default:F(()=>[A(kt,{class:"header",bordered:""},{default:F(()=>[A(wt,{class:"rounded-borders text-grey-8"},{default:F(()=>[A(vt,{rounded:""},{default:F(()=>[At]),_:1}),A(Tt,null,{default:F(()=>[ht("Video Downloader")]),_:1}),A(Pt,{dense:"",modelValue:C.tab,"onUpdate:modelValue":l[0]||(l[0]=t=>C.tab=t),align:"center","active-color":"primary",class:"text-grey-8",onClick:l[1]||(l[1]=t=>C.$router.push({name:C.tab}))},{default:F(()=>[A(ve,{name:"search",icon:"ion-ios-search",label:"\u641C\u7D22"}),A(ve,{name:"download",icon:"ion-ios-cloud-download",label:"\u4E0B\u8F7D"}),A(ve,{name:"setting",icon:"ion-ios-cog",label:"\u8BBE\u7F6E"})]),_:1},8,["modelValue"]),A(qt)]),_:1})]),_:1}),A(Bt,null,{default:F(()=>[A(a,null,{default:F(({Component:t,route:v})=>[(de(),fe(bt,null,[(de(),fe(gt(t),{key:v.name}))],1024))]),_:1})]),_:1}),A(Vt,{bordered:"",class:"bg-white text-center text-grey-8"},{default:F(()=>[A(mt,{icon:"ion-logo-github",flat:"",size:"sm",label:"Powered by liuzhuogood"})]),_:1})]),_:1})}}});export{Ot as default};