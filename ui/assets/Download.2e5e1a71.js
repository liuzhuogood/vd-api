import{y as B,ax as de,az as ce,c as i,h,J as me,g as M,u as ve,aC as pe,aD as Qe,aI as Te,aJ as Be,aK as Pe,r as T,D as Oe,E as De,aL as Ne,aM as Ee,aN as Ie,w as K,l as U,aO as X,aP as Z,N as Le,al as ze,n as Ae,Z as v,_ as f,$ as m,f as r,a6 as S,ad as L,ai as k,a1 as z,m as He,ae as Me,a2 as C,aa as A,ak as je,F as Fe,a3 as G,aq as Ve}from"./index.1a81d3c1.js";import{Q as Re,a as We}from"./QList.8ca3094a.js";import{Q as Je}from"./QPage.15cd96af.js";import{b as Ke,c as H,Q as Y,d as $,n as ee,a as Q,s as te}from"./QChip.52bb1e54.js";import{l as Ue}from"./index.a1ffc747.js";import{u as Xe,v as ae,a as Ze,p as le,b as Ge,c as Ye,r as oe,s as et,d as ne,e as tt}from"./position-engine.f491650b.js";const at=["text","rect","circle","QBtn","QBadge","QChip","QToolbar","QCheckbox","QRadio","QToggle","QSlider","QRange","QInput","QAvatar"],lt=["wave","pulse","pulse-x","pulse-y","fade","blink","none"];var se=B({name:"QSkeleton",props:{...de,tag:{type:String,default:"div"},type:{type:String,validator:e=>at.includes(e),default:"rect"},animation:{type:String,validator:e=>lt.includes(e),default:"wave"},animationSpeed:{type:[String,Number],default:1500},square:Boolean,bordered:Boolean,size:String,width:String,height:String},setup(e,{slots:s}){const n=M(),l=ce(e,n.proxy.$q),u=i(()=>{const t=e.size!==void 0?[e.size,e.size]:[e.width,e.height];return{"--q-skeleton-speed":`${e.animationSpeed}ms`,width:t[0],height:t[1]}}),d=i(()=>`q-skeleton q-skeleton--${l.value===!0?"dark":"light"} q-skeleton--type-${e.type}`+(e.animation!=="none"?` q-skeleton--anim q-skeleton--anim-${e.animation}`:"")+(e.square===!0?" q-skeleton--square":"")+(e.bordered===!0?" q-skeleton--bordered":""));return()=>h(e.tag,{class:d.value,style:u.value},me(s.default))}});const ot=["top","middle","bottom"];var nt=B({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>ot.includes(e)}},setup(e,{slots:s}){const n=i(()=>e.align!==void 0?{verticalAlign:e.align}:null),l=i(()=>{const u=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(u!==void 0?` text-${u}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>h("div",{class:l.value,style:n.value,role:"status","aria-label":e.label},ve(s.default,e.label!==void 0?[e.label]:[]))}});const st={xs:2,sm:4,md:6,lg:10,xl:14};function re(e,s,n){return{transform:s===!0?`translateX(${n.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var rt=B({name:"QLinearProgress",props:{...de,...pe,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:s}){const{proxy:n}=M(),l=ce(e,n.$q),u=Qe(e,st),d=i(()=>e.indeterminate===!0||e.query===!0),t=i(()=>e.reverse!==e.query),o=i(()=>({...u.value!==null?u.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),a=i(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),y=i(()=>re(e.buffer!==void 0?e.buffer:1,t.value,n.$q)),_=i(()=>`with${e.instantFeedback===!0?"out":""}-transition`),P=i(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${_.value} q-linear-progress__track--${l.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),O=i(()=>re(d.value===!0?1:e.value,t.value,n.$q)),D=i(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${_.value} q-linear-progress__model--${d.value===!0?"in":""}determinate`),N=i(()=>({width:`${e.value*100}%`})),w=i(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${_.value}`);return()=>{const p=[h("div",{class:P.value,style:y.value}),h("div",{class:D.value,style:O.value})];return e.stripe===!0&&d.value===!1&&p.push(h("div",{class:w.value,style:N.value})),h("div",{class:a.value,style:o.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},ve(s.default,p))}}}),ie=B({name:"QTooltip",inheritAttrs:!1,props:{...Xe,...Te,...Be,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ae},self:{type:String,default:"top middle",validator:ae},offset:{type:Array,default:()=>[14,14],validator:Ze},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...Pe],setup(e,{slots:s,emit:n,attrs:l}){let u,d;const t=M(),{proxy:{$q:o}}=t,a=T(null),y=T(!1),_=i(()=>le(e.anchor,o.lang.rtl)),P=i(()=>le(e.self,o.lang.rtl)),O=i(()=>e.persistent!==!0),{registerTick:D,removeTick:N}=Oe(),{registerTimeout:w}=De(),{transitionProps:p,transitionStyle:ge}=Ne(e),{localScrollTarget:j,changeScrollEvent:fe,unconfigureScrollTarget:he}=Ge(e,W),{anchorEl:g,canShow:ye,anchorEvents:x}=Ye({showing:y,configureAnchorEl:qe}),{show:be,hide:E}=Ee({showing:y,canShow:ye,handleShow:we,handleHide:Se,hideOnRouteChange:O,processOnMount:!0});Object.assign(x,{delayShow:_e,delayHide:xe});const{showPortal:F,hidePortal:V,renderPortal:ke}=Ie(t,a,Ce,"tooltip");if(o.platform.is.mobile===!0){const c={anchorEl:g,innerRef:a,onClickOutside(b){return E(b),b.target.classList.contains("q-dialog__backdrop")&&Ae(b),!0}},I=i(()=>e.modelValue===null&&e.persistent!==!0&&y.value===!0);K(I,b=>{(b===!0?tt:oe)(c)}),U(()=>{oe(c)})}function we(c){F(),D(()=>{d=new MutationObserver(()=>q()),d.observe(a.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),q(),W()}),u===void 0&&(u=K(()=>o.screen.width+"|"+o.screen.height+"|"+e.self+"|"+e.anchor+"|"+o.lang.rtl,q)),w(()=>{F(!0),n("show",c)},e.transitionDuration)}function Se(c){N(),V(),R(),w(()=>{V(!0),n("hide",c)},e.transitionDuration)}function R(){d!==void 0&&(d.disconnect(),d=void 0),u!==void 0&&(u(),u=void 0),he(),X(x,"tooltipTemp")}function q(){et({targetEl:a.value,offset:e.offset,anchorEl:g.value,anchorOrigin:_.value,selfOrigin:P.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function _e(c){if(o.platform.is.mobile===!0){ne(),document.body.classList.add("non-selectable");const I=g.value,b=["touchmove","touchcancel","touchend","click"].map(J=>[I,J,"delayHide","passiveCapture"]);Z(x,"tooltipTemp",b)}w(()=>{be(c)},e.delay)}function xe(c){o.platform.is.mobile===!0&&(X(x,"tooltipTemp"),ne(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),w(()=>{E(c)},e.hideDelay)}function qe(){if(e.noParentEvent===!0||g.value===null)return;const c=o.platform.is.mobile===!0?[[g.value,"touchstart","delayShow","passive"]]:[[g.value,"mouseenter","delayShow","passive"],[g.value,"mouseleave","delayHide","passive"]];Z(x,"anchor",c)}function W(){if(g.value!==null||e.scrollTarget!==void 0){j.value=Le(g.value,e.scrollTarget);const c=e.noParentEvent===!0?q:E;fe(j.value,c)}}function $e(){return y.value===!0?h("div",{...l,ref:a,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",l.class],style:[l.style,ge.value],role:"tooltip"},me(s.default)):null}function Ce(){return h(ze,p.value,$e)}return U(R),Object.assign(t.proxy,{updatePosition:q}),ke}});const it={class:"text-weight-medium"},ut={class:"absolute-full flex flex-center"},dt={class:"text-grey-8 ellipsis q-pr-lg block"},ct={class:"text-grey-8 q-gutter-sm q-pt-sm text-right"},ue=Object.assign({name:"ItemCard"},{__name:"ItemCard",props:{name:{type:String,required:!0},caption:{type:String,default:""},progress:{type:Number,default:60},cover:{type:String,default:"#"},state:{type:Number,default:0},download_path:{type:String,default:""},download_error:{type:String,default:""},speed_str:{type:String,default:""}},setup(e){return(s,n)=>(v(),f(Ke,{clickable:"",style:{width:"100%"}},{default:m(()=>[r(H,{avatar:"",top:""},{default:m(()=>[r(Re,{src:e.cover,ratio:16/9,width:"120px"},null,8,["src"])]),_:1}),r(H,{top:""},{default:m(()=>[r(Y,{lines:"1"},{default:m(()=>[S("span",it,L(e.name),1),e.state===30?(v(),f($,{key:0,color:"negative","text-color":"white",icon:"ion-ios-information-circle",label:"\u4E0B\u8F7D\u5931\u8D25",dense:""})):k("",!0),e.state===20?(v(),f($,{key:1,color:"positive","text-color":"white",icon:"ion-ios-checkmark-circle",label:"\u4E0B\u8F7D\u6210\u529F",dense:""})):k("",!0),e.state===10?(v(),f($,{key:2,color:"primary","text-color":"white",icon:"ion-ios-cloud-download",label:"\u4E0B\u8F7D\u4E2D",dense:""})):k("",!0),e.state===15?(v(),f($,{key:3,color:"orange","text-color":"white",icon:"ion-ios-outlet",label:"\u89C6\u9891\u8F6C\u7801\u4E2D",dense:""})):k("",!0),e.state===0?(v(),f($,{key:4,"text-color":"white",icon:"ion-ios-alarm",label:"\u7B49\u5F85\u4E0B\u8F7D",dense:""})):k("",!0)]),_:1}),r(Y,{caption:"",class:"no-wrap"},{default:m(()=>[z(L(e.caption)+" ",1),r(rt,{value:e.progress*.01,stripe:"",rounded:"",size:"20px",color:"primary"},{default:m(()=>[S("div",ut,[He(r(nt,{color:"white","text-color":"accent",label:e.speed_str},null,8,["label"]),[[Me,e.speed_str&&e.state===10]])])]),_:1},8,["value"]),S("span",dt,"\u4E0B\u8F7D\u4F4D\u7F6E\uFF1A"+L(e.download_path),1)]),_:1})]),_:1}),r(H,{side:""},{default:m(()=>[S("div",ct,[r(C,{outline:"",flat:"",dense:"",icon:"ion-ios-trash",color:"gray",onClick:n[0]||(n[0]=l=>s.$emit("delete"))},{default:m(()=>[r(ie,null,{default:m(()=>[z("\u5220\u9664\u4EFB\u52A1")]),_:1})]),_:1}),r(C,{outline:"",flat:"",dense:"",icon:"ion-ios-refresh",color:"gray",onClick:n[1]||(n[1]=l=>s.$emit("delete"))},{default:m(()=>[r(ie,null,{default:m(()=>[z("\u91CD\u8BD5\u4EFB\u52A1")]),_:1})]),_:1})])]),_:1})]),_:1}))}}),mt={style:{"border-radius":"10px"}},vt={class:"q-ma-md q-gutter-sm"},gt={key:0,class:"col q-pa-sm q-gutter-sm"},ft={key:1,class:"q-pa-md text-center text-grey-8"},_t=Object.assign({name:"Download",components:{ItemCard:ue}},{__name:"Download",setup(e){const s=Ue("/download");let n=T(!1);const l=T([]),u=()=>{s.emit("list",{},t=>{t.code==="200"?(n.value=!0,l.value=t.data):Q(t.msg)})};s.on("download_event",t=>{if(t.code==="200"){console.log(t.data);const o=l.value.findIndex(a=>a.download_id===t.data.download_id);o!==-1?(l.value[o]=t.data,t.data.state===10&&t.data.progress===0&&ee(t.data.source.search.details[0].cover,t.data.download_name+" \u5F00\u59CB\u4E0B\u8F7D","info"),t.data.state===20&&ee(t.data.source.search.details[0].cover,t.data.download_name+" \u4E0B\u8F7D\u6210\u529F","primary")):(l.value=l.value.concat(t.data),l.value=l.value.sort(a=>-a.download_id))}else Q(t.msg)}),s.on("delete_event",t=>{t.code==="200"?(l.value=l.value.filter(o=>o.download_id!==t.data.download_id),te(t.msg)):Q(t.msg)});const d=t=>{s.emit("clear",{tag:t})};return s.on("message",t=>{t.code==="200"?te(t.msg):Q(t.msg)}),s.on("list",t=>{u()}),u(),(t,o)=>(v(),f(Je,{style:{"max-width":"1000px",margin:"auto"}},{default:m(()=>[S("div",mt,[S("div",vt,[r(C,{label:"\u6E05\u9664\u5DF2\u5B8C\u6210",outline:"",color:"primary",onClick:o[0]||(o[0]=a=>d("Finished"))}),r(C,{label:"\u6E05\u9664\u5931\u8D25",outline:"",color:"primary",onClick:o[1]||(o[1]=a=>d("Failed"))}),r(C,{label:"\u6E05\u9664\u672A\u4E0B\u8F7D",outline:"",color:"primary",onClick:o[2]||(o[2]=a=>d("None"))})]),r(Ve,{class:"q-ma-md no-box-shadow",bordered:"",style:{"border-radius":"10px"}},{default:m(()=>[r(We,{class:"flex flex-wrap",bordered:"",separator:""},{default:m(()=>[(v(!0),A(Fe,null,je(l.value,a=>(v(),f(ue,{name:a.download_name,cover:a.vod_model.vod_pic,progress:a.progress,state:a.state,download_path:a.download_path,download_error:a.error,speed_str:a.speed_str,onDelete:y=>t.$emit("delete",a.download_id),key:a.download_id},null,8,["name","cover","progress","state","download_path","download_error","speed_str","onDelete"]))),128)),G(n)?k("",!0):(v(),A("div",gt,[r(se,{height:"60px"}),r(se,{height:"60px"})])),G(n)&&l.value.length===0?(v(),A("div",ft," \u6CA1\u6709\u4E0B\u8F7D\u8BB0\u5F55 ")):k("",!0)]),_:1})]),_:1})])]),_:1}))}});export{_t as default};
