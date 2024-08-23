import{i as oe,k as H,r as q,c as v,l as j,o as G,t as Ae,m as tt,R as nt,h as T,n as ze,p as ot,q as at,Q as ne,u as ge,g as W,v as lt,x as it,y as N,z as me,A as ye,B as Pe,C as he,D as se,E as pe,w as k,G as we,H as rt,I as ut,J as Qe,K as st,L as ae,M as ct,N as dt,O as ft,P as vt,S as ce,U as te,a as ht,V as be,W as bt,X as gt,Y as mt,Z as de,_ as fe,$ as F,f as Q,a0 as yt,a1 as ke,a2 as wt,a3 as Tt,a4 as Ct,a5 as qt,a6 as He}from"./index.f2aceeba.js";import{Q as St,a as _t,b as xt}from"./QToolbar.3546b98a.js";import{r as Lt}from"./rtl.276c3f1b.js";let Rt=0;const $t=["click","keydown"],zt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Rt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Pt(e,y,a,n){const t=oe(Ae,H);if(t===H)return console.error("QTab/QRouteTab component needs to be child of QTabs"),H;const{proxy:h}=W(),c=q(null),S=q(null),m=q(null),d=v(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),x=v(()=>t.currentModel.value===e.name),P=v(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(x.value===!0?" q-tab--active"+(t.tabProps.value.activeClass?" "+t.tabProps.value.activeClass:"")+(t.tabProps.value.activeColor?` text-${t.tabProps.value.activeColor}`:"")+(t.tabProps.value.activeBgColor?` bg-${t.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&t.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||t.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(n!==void 0?n.linkClass.value:"")),p=v(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(t.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),b=v(()=>e.disable===!0||t.hasFocus.value===!0||x.value===!1&&t.hasActiveTab.value===!0?-1:e.tabindex||0);function _(r,u){if(u!==!0&&c.value!==null&&c.value.focus(),e.disable===!0){n!==void 0&&n.hasRouterLink.value===!0&&ze(r);return}if(n===void 0){t.updateModel({name:e.name}),a("click",r);return}if(n.hasRouterLink.value===!0){const l=(g={})=>{let z;const A=g.to===void 0||lt(g.to,e.to)===!0?t.avoidRouteWatcher=it():null;return n.navigateToRouterLink(r,{...g,returnRouterError:!0}).catch(M=>{z=M}).then(M=>{if(A===t.avoidRouteWatcher&&(t.avoidRouteWatcher=!1,z===void 0&&(M===void 0||M.message!==void 0&&M.message.startsWith("Avoided redundant navigation")===!0)&&t.updateModel({name:e.name})),g.returnRouterError===!0)return z!==void 0?Promise.reject(z):M})};a("click",r,l),r.defaultPrevented!==!0&&l();return}a("click",r)}function L(r){ot(r,[13,32])?_(r,!0):at(r)!==!0&&r.keyCode>=35&&r.keyCode<=40&&r.altKey!==!0&&r.metaKey!==!0&&t.onKbdNavigate(r.keyCode,h.$el)===!0&&ze(r),a("keydown",r)}function B(){const r=t.tabProps.value.narrowIndicator,u=[],l=T("div",{ref:m,class:["q-tab__indicator",t.tabProps.value.indicatorClass]});e.icon!==void 0&&u.push(T(ne,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&u.push(T("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&u.push(e.alertIcon!==void 0?T(ne,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):T("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),r===!0&&u.push(l);const g=[T("div",{class:"q-focus-helper",tabindex:-1,ref:c}),T("div",{class:p.value},ge(y.default,u))];return r===!1&&g.push(l),g}const I={name:v(()=>e.name),rootRef:S,tabIndicatorRef:m,routeData:n};j(()=>{t.unregisterTab(I)}),G(()=>{t.registerTab(I)});function s(r,u){const l={ref:S,class:P.value,tabindex:b.value,role:"tab","aria-selected":x.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:_,onKeydown:L,...u};return tt(T(r,l,B()),[[nt,d.value]])}return{renderTab:s,$tabs:t}}var ve=N({name:"QTab",props:zt,emits:$t,setup(e,{slots:y,emit:a}){const{renderTab:n}=Pt(e,y,a);return()=>n("div")}});function pt(){const e=q(!me.value);return e.value===!1&&G(()=>{e.value=!0}),{isHydrated:e}}const Me=typeof ResizeObserver!="undefined",Be=Me===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var X=N({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:y}){let a=null,n,t={width:-1,height:-1};function h(m){m===!0||e.debounce===0||e.debounce==="0"?c():a===null&&(a=setTimeout(c,e.debounce))}function c(){if(a!==null&&(clearTimeout(a),a=null),n){const{offsetWidth:m,offsetHeight:d}=n;(m!==t.width||d!==t.height)&&(t={width:m,height:d},y("resize",t))}}const{proxy:S}=W();if(S.trigger=h,Me===!0){let m;const d=x=>{n=S.$el.parentNode,n?(m=new ResizeObserver(h),m.observe(n),c()):x!==!0&&Pe(()=>{d(!0)})};return G(()=>{d()}),j(()=>{a!==null&&clearTimeout(a),m!==void 0&&(m.disconnect!==void 0?m.disconnect():n&&m.unobserve(n))}),ye}else{let x=function(){a!==null&&(clearTimeout(a),a=null),d!==void 0&&(d.removeEventListener!==void 0&&d.removeEventListener("resize",h,he.passive),d=void 0)},P=function(){x(),n&&n.contentDocument&&(d=n.contentDocument.defaultView,d.addEventListener("resize",h,he.passive),c())};const{isHydrated:m}=pt();let d;return G(()=>{Pe(()=>{n=S.$el,n&&P()})}),j(x),()=>{if(m.value===!0)return T("object",{class:"q--avoid-card-border",style:Be.style,tabindex:-1,type:"text/html",data:Be.url,"aria-hidden":"true",onLoad:P})}}}});function kt(e,y,a){const n=a===!0?["left","right"]:["top","bottom"];return`absolute-${y===!0?n[0]:n[1]}${e?` text-${e}`:""}`}const Bt=["left","center","right","justify"];var Vt=N({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Bt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:y,emit:a}){const{proxy:n}=W(),{$q:t}=n,{registerTick:h}=se(),{registerTick:c}=se(),{registerTick:S}=se(),{registerTimeout:m,removeTimeout:d}=pe(),{registerTimeout:x,removeTimeout:P}=pe(),p=q(null),b=q(null),_=q(e.modelValue),L=q(!1),B=q(!0),I=q(!1),s=q(!1),r=[],u=q(0),l=q(!1);let g=null,z=null,A;const M=v(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:kt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Ee=v(()=>{const o=u.value,i=_.value;for(let f=0;f<o;f++)if(r[f].name.value===i)return!0;return!1}),Fe=v(()=>`q-tabs__content--align-${L.value===!0?"left":s.value===!0?"justify":e.align}`),Oe=v(()=>`q-tabs row no-wrap items-center q-tabs--${L.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),De=v(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Fe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),J=v(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),Y=v(()=>e.vertical!==!0&&t.lang.rtl===!0),le=v(()=>Lt===!1&&Y.value===!0);k(Y,U),k(()=>e.modelValue,o=>{ie({name:o,setCurrent:!0,skipEmit:!0})}),k(()=>e.outsideArrows,Z);function ie({name:o,setCurrent:i,skipEmit:f}){_.value!==o&&(f!==!0&&e["onUpdate:modelValue"]!==void 0&&a("update:modelValue",o),(i===!0||e["onUpdate:modelValue"]===void 0)&&(We(_.value,o),_.value=o))}function Z(){h(()=>{Te({width:p.value.offsetWidth,height:p.value.offsetHeight})})}function Te(o){if(J.value===void 0||b.value===null)return;const i=o[J.value.container],f=Math.min(b.value[J.value.scroll],Array.prototype.reduce.call(b.value.children,($,C)=>$+(C[J.value.content]||0),0)),R=i>0&&f>i;L.value=R,R===!0&&c(U),s.value=i<parseInt(e.breakpoint,10)}function We(o,i){const f=o!=null&&o!==""?r.find($=>$.name.value===o):null,R=i!=null&&i!==""?r.find($=>$.name.value===i):null;if(f&&R){const $=f.tabIndicatorRef.value,C=R.tabIndicatorRef.value;g!==null&&(clearTimeout(g),g=null),$.style.transition="none",$.style.transform="none",C.style.transition="none",C.style.transform="none";const w=$.getBoundingClientRect(),V=C.getBoundingClientRect();C.style.transform=e.vertical===!0?`translate3d(0,${w.top-V.top}px,0) scale3d(1,${V.height?w.height/V.height:1},1)`:`translate3d(${w.left-V.left}px,0,0) scale3d(${V.width?w.width/V.width:1},1,1)`,S(()=>{g=setTimeout(()=>{g=null,C.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",C.style.transform="none"},70)})}R&&L.value===!0&&K(R.rootRef.value)}function K(o){const{left:i,width:f,top:R,height:$}=b.value.getBoundingClientRect(),C=o.getBoundingClientRect();let w=e.vertical===!0?C.top-R:C.left-i;if(w<0){b.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(w),U();return}w+=e.vertical===!0?C.height-$:C.width-f,w>0&&(b.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(w),U())}function U(){const o=b.value;if(o===null)return;const i=o.getBoundingClientRect(),f=e.vertical===!0?o.scrollTop:Math.abs(o.scrollLeft);Y.value===!0?(B.value=Math.ceil(f+i.width)<o.scrollWidth-1,I.value=f>0):(B.value=f>0,I.value=e.vertical===!0?Math.ceil(f+i.height)<o.scrollHeight:Math.ceil(f+i.width)<o.scrollWidth)}function Ce(o){z!==null&&clearInterval(z),z=setInterval(()=>{Ke(o)===!0&&O()},5)}function qe(){Ce(le.value===!0?Number.MAX_SAFE_INTEGER:0)}function Se(){Ce(le.value===!0?0:Number.MAX_SAFE_INTEGER)}function O(){z!==null&&(clearInterval(z),z=null)}function Ne(o,i){const f=Array.prototype.filter.call(b.value.children,V=>V===i||V.matches&&V.matches(".q-tab.q-focusable")===!0),R=f.length;if(R===0)return;if(o===36)return K(f[0]),f[0].focus(),!0;if(o===35)return K(f[R-1]),f[R-1].focus(),!0;const $=o===(e.vertical===!0?38:37),C=o===(e.vertical===!0?40:39),w=$===!0?-1:C===!0?1:void 0;if(w!==void 0){const V=Y.value===!0?-1:1,E=f.indexOf(i)+w*V;return E>=0&&E<R&&(K(f[E]),f[E].focus({preventScroll:!0})),!0}}const je=v(()=>le.value===!0?{get:o=>Math.abs(o.scrollLeft),set:(o,i)=>{o.scrollLeft=-i}}:e.vertical===!0?{get:o=>o.scrollTop,set:(o,i)=>{o.scrollTop=i}}:{get:o=>o.scrollLeft,set:(o,i)=>{o.scrollLeft=i}});function Ke(o){const i=b.value,{get:f,set:R}=je.value;let $=!1,C=f(i);const w=o<C?-1:1;return C+=w*5,C<0?($=!0,C=0):(w===-1&&C<=o||w===1&&C>=o)&&($=!0,C=o),R(i,C),U(),$}function _e(o,i){for(const f in o)if(o[f]!==i[f])return!1;return!0}function Ue(){let o=null,i={matchedLen:0,queryDiff:9999,hrefLen:0};const f=r.filter(w=>w.routeData!==void 0&&w.routeData.hasRouterLink.value===!0),{hash:R,query:$}=n.$route,C=Object.keys($).length;for(const w of f){const V=w.routeData.exact.value===!0;if(w.routeData[V===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:E,query:re,matched:Ze,href:et}=w.routeData.resolvedLink.value,ue=Object.keys(re).length;if(V===!0){if(E!==R||ue!==C||_e($,re)===!1)continue;o=w.name.value;break}if(E!==""&&E!==R||ue!==0&&_e(re,$)===!1)continue;const D={matchedLen:Ze.length,queryDiff:C-ue,hrefLen:et.length-E.length};if(D.matchedLen>i.matchedLen){o=w.name.value,i=D;continue}else if(D.matchedLen!==i.matchedLen)continue;if(D.queryDiff<i.queryDiff)o=w.name.value,i=D;else if(D.queryDiff!==i.queryDiff)continue;D.hrefLen>i.hrefLen&&(o=w.name.value,i=D)}o===null&&r.some(w=>w.routeData===void 0&&w.name.value===_.value)===!0||ie({name:o,setCurrent:!0})}function Ge(o){if(d(),l.value!==!0&&p.value!==null&&o.target&&typeof o.target.closest=="function"){const i=o.target.closest(".q-tab");i&&p.value.contains(i)===!0&&(l.value=!0,L.value===!0&&K(i))}}function Xe(){m(()=>{l.value=!1},30)}function ee(){Le.avoidRouteWatcher===!1?x(Ue):P()}function xe(){if(A===void 0){const o=k(()=>n.$route.fullPath,ee);A=()=>{o(),A=void 0}}}function Je(o){r.push(o),u.value++,Z(),o.routeData===void 0||n.$route===void 0?x(()=>{if(L.value===!0){const i=_.value,f=i!=null&&i!==""?r.find(R=>R.name.value===i):null;f&&K(f.rootRef.value)}}):(xe(),o.routeData.hasRouterLink.value===!0&&ee())}function Ye(o){r.splice(r.indexOf(o),1),u.value--,Z(),A!==void 0&&o.routeData!==void 0&&(r.every(i=>i.routeData===void 0)===!0&&A(),ee())}const Le={currentModel:_,tabProps:M,hasFocus:l,hasActiveTab:Ee,registerTab:Je,unregisterTab:Ye,verifyRouteModel:ee,updateModel:ie,onKbdNavigate:Ne,avoidRouteWatcher:!1};we(Ae,Le);function Re(){g!==null&&clearTimeout(g),O(),A!==void 0&&A()}let $e;return j(Re),rt(()=>{$e=A!==void 0,Re()}),ut(()=>{$e===!0&&xe(),Z()}),()=>T("div",{ref:p,class:Oe.value,role:"tablist",onFocusin:Ge,onFocusout:Xe},[T(X,{onResize:Te}),T("div",{ref:b,class:De.value,onScroll:U},Qe(y.default)),T(ne,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||t.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:qe,onTouchstartPassive:qe,onMouseupPassive:O,onMouseleavePassive:O,onTouchendPassive:O}),T(ne,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(I.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||t.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Se,onTouchstartPassive:Se,onMouseupPassive:O,onMouseleavePassive:O,onTouchendPassive:O})])}}),It=N({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:y,emit:a}){const{proxy:{$q:n}}=W(),t=oe(ae,H);if(t===H)return console.error("QHeader needs to be child of QLayout"),H;const h=q(parseInt(e.heightHint,10)),c=q(!0),S=v(()=>e.reveal===!0||t.view.value.indexOf("H")!==-1||n.platform.is.ios&&t.isContainer.value===!0),m=v(()=>{if(e.modelValue!==!0)return 0;if(S.value===!0)return c.value===!0?h.value:0;const s=h.value-t.scroll.value.position;return s>0?s:0}),d=v(()=>e.modelValue!==!0||S.value===!0&&c.value!==!0),x=v(()=>e.modelValue===!0&&d.value===!0&&e.reveal===!0),P=v(()=>"q-header q-layout__section--marginal "+(S.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(d.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=v(()=>{const s=t.rows.value.top,r={};return s[0]==="l"&&t.left.space===!0&&(r[n.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),s[2]==="r"&&t.right.space===!0&&(r[n.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),r});function b(s,r){t.update("header",s,r)}function _(s,r){s.value!==r&&(s.value=r)}function L({height:s}){_(h,s),b("size",s)}function B(s){x.value===!0&&_(c,!0),a("focusin",s)}k(()=>e.modelValue,s=>{b("space",s),_(c,!0),t.animate()}),k(m,s=>{b("offset",s)}),k(()=>e.reveal,s=>{s===!1&&_(c,e.modelValue)}),k(c,s=>{t.animate(),a("reveal",s)}),k(t.scroll,s=>{e.reveal===!0&&_(c,s.direction==="up"||s.position<=e.revealOffset||s.position-s.inflectionPoint<100)});const I={};return t.instances.header=I,e.modelValue===!0&&b("size",h.value),b("space",e.modelValue),b("offset",m.value),j(()=>{t.instances.header===I&&(t.instances.header=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const s=st(y.default,[]);return e.elevated===!0&&s.push(T("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(T(X,{debounce:0,onResize:L})),T("header",{class:P.value,style:p.value,onFocusin:B},s)}}}),At=N({name:"QPageContainer",setup(e,{slots:y}){const{proxy:{$q:a}}=W(),n=oe(ae,H);if(n===H)return console.error("QPageContainer needs to be child of QLayout"),H;we(ct,!0);const t=v(()=>{const h={};return n.header.space===!0&&(h.paddingTop=`${n.header.size}px`),n.right.space===!0&&(h[`padding${a.lang.rtl===!0?"Left":"Right"}`]=`${n.right.size}px`),n.footer.space===!0&&(h.paddingBottom=`${n.footer.size}px`),n.left.space===!0&&(h[`padding${a.lang.rtl===!0?"Right":"Left"}`]=`${n.left.size}px`),h});return()=>T("div",{class:"q-page-container",style:t.value},Qe(y.default))}}),Qt=N({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:y,emit:a}){const{proxy:{$q:n}}=W(),t=oe(ae,H);if(t===H)return console.error("QFooter needs to be child of QLayout"),H;const h=q(parseInt(e.heightHint,10)),c=q(!0),S=q(me.value===!0||t.isContainer.value===!0?0:window.innerHeight),m=v(()=>e.reveal===!0||t.view.value.indexOf("F")!==-1||n.platform.is.ios&&t.isContainer.value===!0),d=v(()=>t.isContainer.value===!0?t.containerHeight.value:S.value),x=v(()=>{if(e.modelValue!==!0)return 0;if(m.value===!0)return c.value===!0?h.value:0;const l=t.scroll.value.position+d.value+h.value-t.height.value;return l>0?l:0}),P=v(()=>e.modelValue!==!0||m.value===!0&&c.value!==!0),p=v(()=>e.modelValue===!0&&P.value===!0&&e.reveal===!0),b=v(()=>"q-footer q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(P.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(m.value!==!0?" hidden":""):"")),_=v(()=>{const l=t.rows.value.bottom,g={};return l[0]==="l"&&t.left.space===!0&&(g[n.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),l[2]==="r"&&t.right.space===!0&&(g[n.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),g});function L(l,g){t.update("footer",l,g)}function B(l,g){l.value!==g&&(l.value=g)}function I({height:l}){B(h,l),L("size",l)}function s(){if(e.reveal!==!0)return;const{direction:l,position:g,inflectionPoint:z}=t.scroll.value;B(c,l==="up"||g-z<100||t.height.value-d.value-g-h.value<300)}function r(l){p.value===!0&&B(c,!0),a("focusin",l)}k(()=>e.modelValue,l=>{L("space",l),B(c,!0),t.animate()}),k(x,l=>{L("offset",l)}),k(()=>e.reveal,l=>{l===!1&&B(c,e.modelValue)}),k(c,l=>{t.animate(),a("reveal",l)}),k([h,t.scroll,t.height],s),k(()=>n.screen.height,l=>{t.isContainer.value!==!0&&B(S,l)});const u={};return t.instances.footer=u,e.modelValue===!0&&L("size",h.value),L("space",e.modelValue),L("offset",x.value),j(()=>{t.instances.footer===u&&(t.instances.footer=void 0,L("size",0),L("offset",0),L("space",!1))}),()=>{const l=ge(y.default,[T(X,{debounce:0,onResize:I})]);return e.elevated===!0&&l.push(T("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),T("footer",{class:b.value,style:_.value,onFocusin:r},l)}}});const{passive:Ve}=he,Ht=["both","horizontal","vertical"];var Mt=N({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Ht.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:y}){const a={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,t,h;k(()=>e.scrollTarget,()=>{m(),S()});function c(){n!==null&&n();const P=Math.max(0,ft(t)),p=vt(t),b={top:P-a.position.top,left:p-a.position.left};if(e.axis==="vertical"&&b.top===0||e.axis==="horizontal"&&b.left===0)return;const _=Math.abs(b.top)>=Math.abs(b.left)?b.top<0?"up":"down":b.left<0?"left":"right";a.position={top:P,left:p},a.directionChanged=a.direction!==_,a.delta=b,a.directionChanged===!0&&(a.direction=_,a.inflectionPoint=a.position),y("scroll",{...a})}function S(){t=dt(h,e.scrollTarget),t.addEventListener("scroll",d,Ve),d(!0)}function m(){t!==void 0&&(t.removeEventListener("scroll",d,Ve),t=void 0)}function d(P){if(P===!0||e.debounce===0||e.debounce==="0")c();else if(n===null){const[p,b]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];n=()=>{b(p),n=null}}}const{proxy:x}=W();return k(()=>x.$q.lang.rtl,c),G(()=>{h=x.$el.parentNode,S()}),j(()=>{n!==null&&n(),m()}),Object.assign(x,{trigger:d,getPosition:()=>a}),ye}}),Et=N({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:y,emit:a}){const{proxy:{$q:n}}=W(),t=q(null),h=q(n.screen.height),c=q(e.container===!0?0:n.screen.width),S=q({position:0,direction:"down",inflectionPoint:0}),m=q(0),d=q(me.value===!0?0:ce()),x=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),P=v(()=>e.container===!1?{minHeight:n.screen.height+"px"}:null),p=v(()=>d.value!==0?{[n.lang.rtl===!0?"left":"right"]:`${d.value}px`}:null),b=v(()=>d.value!==0?{[n.lang.rtl===!0?"right":"left"]:0,[n.lang.rtl===!0?"left":"right"]:`-${d.value}px`,width:`calc(100% + ${d.value}px)`}:null);function _(u){if(e.container===!0||document.qScrollPrevented!==!0){const l={position:u.position.top,direction:u.direction,directionChanged:u.directionChanged,inflectionPoint:u.inflectionPoint.top,delta:u.delta.top};S.value=l,e.onScroll!==void 0&&a("scroll",l)}}function L(u){const{height:l,width:g}=u;let z=!1;h.value!==l&&(z=!0,h.value=l,e.onScrollHeight!==void 0&&a("scrollHeight",l),I()),c.value!==g&&(z=!0,c.value=g),z===!0&&e.onResize!==void 0&&a("resize",u)}function B({height:u}){m.value!==u&&(m.value=u,I())}function I(){if(e.container===!0){const u=h.value>m.value?ce():0;d.value!==u&&(d.value=u)}}let s=null;const r={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:h,containerHeight:m,scrollbarWidth:d,totalWidth:v(()=>c.value+d.value),rows:v(()=>{const u=e.view.toLowerCase().split(" ");return{top:u[0].split(""),middle:u[1].split(""),bottom:u[2].split("")}}),header:te({size:0,offset:0,space:!1}),right:te({size:300,offset:0,space:!1}),footer:te({size:0,offset:0,space:!1}),left:te({size:300,offset:0,space:!1}),scroll:S,animate(){s!==null?clearTimeout(s):document.body.classList.add("q-body--layout-animate"),s=setTimeout(()=>{s=null,document.body.classList.remove("q-body--layout-animate")},155)},update(u,l,g){r[u][l]=g}};if(we(ae,r),ce()>0){let g=function(){u=null,l.classList.remove("hide-scrollbar")},z=function(){if(u===null){if(l.scrollHeight>n.screen.height)return;l.classList.add("hide-scrollbar")}else clearTimeout(u);u=setTimeout(g,300)},A=function(M){u!==null&&M==="remove"&&(clearTimeout(u),g()),window[`${M}EventListener`]("resize",z)},u=null;const l=document.body;k(()=>e.container!==!0?"add":"remove",A),e.container!==!0&&A("add"),ht(()=>{A("remove")})}return()=>{const u=ge(y.default,[T(Mt,{onScroll:_}),T(X,{onResize:L})]),l=T("div",{class:x.value,style:P.value,ref:e.container===!0?void 0:t,tabindex:-1},u);return e.container===!0?T("div",{class:"q-layout-container overflow-hidden",ref:t},[T(X,{onResize:B}),T("div",{class:"absolute-full",style:p.value},[T("div",{class:"scroll",style:b.value},[l])])]):l}}});function Ft(e){const y=Object.assign({noopener:!0},e),a=[];for(const n in y){const t=y[n];t===!0?a.push(n):(bt(t)||typeof t=="string"&&t!=="")&&a.push(n+"="+t)}return a.join(",")}function Ie(e,y,a){let n=window.open;if(be.is.cordova===!0){if(cordova!==void 0&&cordova.InAppBrowser!==void 0&&cordova.InAppBrowser.open!==void 0)n=cordova.InAppBrowser.open;else if(navigator!==void 0&&navigator.app!==void 0)return navigator.app.loadUrl(e,{openExternal:!0})}const t=n(e,"_blank",Ft(a));if(t)return be.is.desktop&&t.focus(),t;y&&y()}var Ot=(e,y,a)=>{if(be.is.ios===!0&&window.SafariViewController!==void 0){window.SafariViewController.isAvailable(n=>{n?window.SafariViewController.show({url:e},ye,y):Ie(e,y,a)});return}return Ie(e,y,a)};const Dt=He("div",{class:"background"},null,-1),Wt=He("img",{src:"/icons/Icon-256.png"},null,-1),Ut=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){const y=gt(),a=q("search");return G(()=>{y.name?a.value=y.name:a.value="search"}),(n,t)=>{const h=mt("router-view");return de(),fe(Et,{view:"lHh lpR fFf"},{default:F(()=>[Dt,Q(It,{class:"header",bordered:""},{default:F(()=>[Q(St,{class:"rounded-borders text-grey-12"},{default:F(()=>[Q(yt,{rounded:""},{default:F(()=>[Wt]),_:1}),Q(_t,null,{default:F(()=>[ke("Video Downloader")]),_:1}),Q(Vt,{dense:"",modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=c=>a.value=c),align:"center","active-color":"primary",class:"text-grey-4",onClick:t[1]||(t[1]=c=>n.$router.push({name:a.value}))},{default:F(()=>[Q(ve,{name:"search",icon:"ion-ios-search",label:"\u641C\u7D22"}),Q(ve,{name:"download",icon:"ion-ios-cloud-download",label:"\u4E0B\u8F7D"}),Q(ve,{name:"setting",icon:"ion-ios-cog",label:"\u8BBE\u7F6E"})]),_:1},8,["modelValue"]),Q(xt),Q(wt,{icon:"ion-logo-github",flat:"",size:"sm",onClick:t[2]||(t[2]=c=>Tt(Ot)("https://github.com/liuzhuogood/vd-api.git"))})]),_:1})]),_:1}),Q(At,null,{default:F(()=>[Q(h,null,{default:F(({Component:c,route:S})=>[(de(),fe(Ct,null,[(de(),fe(qt(c),{key:S.name}))],1024))]),_:1})]),_:1}),Q(Qt,{bordered:"",class:"footer text-center text-grey-2 text-body2 ellipsis"},{default:F(()=>[ke(" \u8BF7\u6CE8\u610F\u8D44\u6E90\u7684\u5408\u6CD5\u6027\uFF0C\u5982\u6709\u4FB5\u6743\u5C3D\u5FEB\u5220\u9664\uFF0C\u52FF\u76F8\u4FE1\u89C6\u9891\u4E2D\u4EFB\u4F55\u5E7F\u544A ")]),_:1})]),_:1})}}});export{Ut as default};