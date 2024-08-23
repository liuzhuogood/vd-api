import{y as E,ai as de,ak as ce,c as r,h as k,J as ve,g as V,u as me,an as Qe,ao as pe,aJ as Te,aK as Be,aL as Pe,r as $,D as De,E as Oe,aM as Ne,aN as Ee,aO as Le,w as J,l as U,aP as K,aQ as X,N as Ie,ar as ze,n as Ae,Z as f,_ as q,$ as m,f as i,a6 as B,aa as Z,a1 as z,m as Ve,ab as He,aB as C,a2 as P,a7 as Re,a8 as O,a3 as N,b as Me,F as G,ac as je,a9 as Fe}from"./index.f55f3359.js";import{Q as We,S as Je,a as Ue}from"./SearchDetail.b38d1cb8.js";import{Q as Ke}from"./QPage.371332a3.js";import{a as Xe,b as A,Q as Y,c as T,s as Ze,n as ee,e as te}from"./QChip.205ae7e6.js";import"./index.a25e0bef.js";import{u as Ge,v as ae,a as Ye,p as le,b as et,c as tt,r as oe,s as at,d as ne,e as lt}from"./position-engine.d8e8a000.js";import"./QToolbar.4d821819.js";import"./plugin-vue_export-helper.21dcd24c.js";const ot=["text","rect","circle","QBtn","QBadge","QChip","QToolbar","QCheckbox","QRadio","QToggle","QSlider","QRange","QInput","QAvatar"],nt=["wave","pulse","pulse-x","pulse-y","fade","blink","none"];var se=E({name:"QSkeleton",props:{...de,tag:{type:String,default:"div"},type:{type:String,validator:e=>ot.includes(e),default:"rect"},animation:{type:String,validator:e=>nt.includes(e),default:"wave"},animationSpeed:{type:[String,Number],default:1500},square:Boolean,bordered:Boolean,size:String,width:String,height:String},setup(e,{slots:o}){const n=V(),d=ce(e,n.proxy.$q),u=r(()=>{const g=e.size!==void 0?[e.size,e.size]:[e.width,e.height];return{"--q-skeleton-speed":`${e.animationSpeed}ms`,width:g[0],height:g[1]}}),c=r(()=>`q-skeleton q-skeleton--${d.value===!0?"dark":"light"} q-skeleton--type-${e.type}`+(e.animation!=="none"?` q-skeleton--anim q-skeleton--anim-${e.animation}`:"")+(e.square===!0?" q-skeleton--square":"")+(e.bordered===!0?" q-skeleton--bordered":""));return()=>k(e.tag,{class:c.value,style:u.value},ve(o.default))}});const st=["top","middle","bottom"];var it=E({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>st.includes(e)}},setup(e,{slots:o}){const n=r(()=>e.align!==void 0?{verticalAlign:e.align}:null),d=r(()=>{const u=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(u!==void 0?` text-${u}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>k("div",{class:d.value,style:n.value,role:"status","aria-label":e.label},me(o.default,e.label!==void 0?[e.label]:[]))}});const rt={xs:2,sm:4,md:6,lg:10,xl:14};function ie(e,o,n){return{transform:o===!0?`translateX(${n.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var ut=E({name:"QLinearProgress",props:{...de,...Qe,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:o}){const{proxy:n}=V(),d=ce(e,n.$q),u=pe(e,rt),c=r(()=>e.indeterminate===!0||e.query===!0),g=r(()=>e.reverse!==e.query),a=r(()=>({...u.value!==null?u.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),h=r(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),b=r(()=>ie(e.buffer!==void 0?e.buffer:1,g.value,n.$q)),_=r(()=>`with${e.instantFeedback===!0?"out":""}-transition`),S=r(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${_.value} q-linear-progress__track--${d.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),t=r(()=>ie(c.value===!0?1:e.value,g.value,n.$q)),s=r(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${_.value} q-linear-progress__model--${c.value===!0?"in":""}determinate`),l=r(()=>({width:`${e.value*100}%`})),w=r(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${_.value}`);return()=>{const D=[k("div",{class:S.value,style:b.value}),k("div",{class:s.value,style:t.value})];return e.stripe===!0&&c.value===!1&&D.push(k("div",{class:w.value,style:l.value})),k("div",{class:h.value,style:a.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},me(o.default,D))}}}),re=E({name:"QTooltip",inheritAttrs:!1,props:{...Ge,...Te,...Be,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ae},self:{type:String,default:"top middle",validator:ae},offset:{type:Array,default:()=>[14,14],validator:Ye},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...Pe],setup(e,{slots:o,emit:n,attrs:d}){let u,c;const g=V(),{proxy:{$q:a}}=g,h=$(null),b=$(!1),_=r(()=>le(e.anchor,a.lang.rtl)),S=r(()=>le(e.self,a.lang.rtl)),t=r(()=>e.persistent!==!0),{registerTick:s,removeTick:l}=De(),{registerTimeout:w}=Oe(),{transitionProps:D,transitionStyle:ge}=Ne(e),{localScrollTarget:H,changeScrollEvent:fe,unconfigureScrollTarget:he}=et(e,F),{anchorEl:y,canShow:ye,anchorEvents:Q}=tt({showing:b,configureAnchorEl:qe}),{show:be,hide:L}=Ee({showing:b,canShow:ye,handleShow:ke,handleHide:_e,hideOnRouteChange:t,processOnMount:!0});Object.assign(Q,{delayShow:Se,delayHide:xe});const{showPortal:R,hidePortal:M,renderPortal:we}=Le(g,h,Ce,"tooltip");if(a.platform.is.mobile===!0){const v={anchorEl:y,innerRef:h,onClickOutside(x){return L(x),x.target.classList.contains("q-dialog__backdrop")&&Ae(x),!0}},I=r(()=>e.modelValue===null&&e.persistent!==!0&&b.value===!0);J(I,x=>{(x===!0?lt:oe)(v)}),U(()=>{oe(v)})}function ke(v){R(),s(()=>{c=new MutationObserver(()=>p()),c.observe(h.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),p(),F()}),u===void 0&&(u=J(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,p)),w(()=>{R(!0),n("show",v)},e.transitionDuration)}function _e(v){l(),M(),j(),w(()=>{M(!0),n("hide",v)},e.transitionDuration)}function j(){c!==void 0&&(c.disconnect(),c=void 0),u!==void 0&&(u(),u=void 0),he(),K(Q,"tooltipTemp")}function p(){at({targetEl:h.value,offset:e.offset,anchorEl:y.value,anchorOrigin:_.value,selfOrigin:S.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function Se(v){if(a.platform.is.mobile===!0){ne(),document.body.classList.add("non-selectable");const I=y.value,x=["touchmove","touchcancel","touchend","click"].map(W=>[I,W,"delayHide","passiveCapture"]);X(Q,"tooltipTemp",x)}w(()=>{be(v)},e.delay)}function xe(v){a.platform.is.mobile===!0&&(K(Q,"tooltipTemp"),ne(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),w(()=>{L(v)},e.hideDelay)}function qe(){if(e.noParentEvent===!0||y.value===null)return;const v=a.platform.is.mobile===!0?[[y.value,"touchstart","delayShow","passive"]]:[[y.value,"mouseenter","delayShow","passive"],[y.value,"mouseleave","delayHide","passive"]];X(Q,"anchor",v)}function F(){if(y.value!==null||e.scrollTarget!==void 0){H.value=Ie(y.value,e.scrollTarget);const v=e.noParentEvent===!0?p:L;fe(H.value,v)}}function $e(){return b.value===!0?k("div",{...d,ref:h,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",d.class],style:[d.style,ge.value],role:"tooltip"},ve(o.default)):null}function Ce(){return k(ze,D.value,$e)}return U(j),Object.assign(g.proxy,{updatePosition:p}),we}});const dt={class:"text-weight-medium"},ct={class:"absolute-full flex flex-center"},vt={class:"text-grey-8 q-gutter-sm q-pt-sm text-right"},ue=Object.assign({name:"ItemCard"},{__name:"ItemCard",props:{name:{type:String,required:!0},caption:{type:String,default:""},progress:{type:Number,default:60},cover:{type:String,default:"#"},state:{type:Number,default:0},download_path:{type:String,default:""},download_error:{type:String,default:""},speed_str:{type:String,default:""}},setup(e){return(o,n)=>(f(),q(Xe,{clickable:"",style:{width:"100%"}},{default:m(()=>[i(A,{avatar:"",top:""},{default:m(()=>[i(We,{src:e.cover,ratio:16/9,width:"120px"},null,8,["src"])]),_:1}),i(A,{top:""},{default:m(()=>[i(Y,{lines:"1"},{default:m(()=>[B("span",dt,Z(e.name),1)]),_:1}),i(Y,{caption:"",class:"no-wrap"},{default:m(()=>[z(Z(e.caption)+" ",1),i(ut,{value:e.progress*.01,stripe:"",rounded:"",size:"20px",color:"primary"},{default:m(()=>[B("div",ct,[Ve(i(it,{color:"white","text-color":"accent",label:e.speed_str},null,8,["label"]),[[He,e.speed_str&&e.state===10]])])]),_:1},8,["value"]),e.state===30?(f(),q(T,{key:0,color:"negative","text-color":"white",icon:"ion-ios-information-circle",label:"\u4E0B\u8F7D\u5931\u8D25",dense:""})):C("",!0),e.state===20?(f(),q(T,{key:1,color:"positive","text-color":"white",icon:"ion-ios-checkmark-circle",label:"\u4E0B\u8F7D\u6210\u529F",dense:""})):C("",!0),e.state===10?(f(),q(T,{key:2,color:"primary","text-color":"white",icon:"ion-ios-cloud-download",label:"\u4E0B\u8F7D\u4E2D",dense:""})):C("",!0),e.state===15?(f(),q(T,{key:3,color:"orange","text-color":"white",icon:"ion-ios-outlet",label:"\u89C6\u9891\u8F6C\u7801\u4E2D",dense:""})):C("",!0),e.state===0?(f(),q(T,{key:4,"text-color":"white",icon:"ion-ios-alarm",label:"\u7B49\u5F85\u4E0B\u8F7D",dense:""})):C("",!0)]),_:1})]),_:1}),i(A,{side:""},{default:m(()=>[B("div",vt,[i(P,{outline:"",flat:"",dense:"",icon:"ion-ios-trash",color:"gray",onClick:n[0]||(n[0]=d=>o.$emit("delete"))},{default:m(()=>[i(re,null,{default:m(()=>[z("\u5220\u9664\u4EFB\u52A1")]),_:1})]),_:1}),i(P,{outline:"",flat:"",dense:"",icon:"ion-ios-refresh",color:"gray",onClick:n[1]||(n[1]=d=>o.$emit("retry"))},{default:m(()=>[i(re,null,{default:m(()=>[z("\u91CD\u8BD5\u4EFB\u52A1")]),_:1})]),_:1})])]),_:1})]),_:1}))}}),mt={style:{"border-radius":"10px"}},gt={class:"q-ma-md q-gutter-sm"},ft={key:0,class:"col q-pa-sm q-gutter-sm"},ht={key:1,class:"q-pa-md text-center text-grey-8"},$t=Object.assign({name:"Download",components:{ItemCard:ue}},{__name:"Download",setup(e){const o=Ze.init("/download");let n=$(!1),d=$(!1),u=$({}),c=$(!1);const g=Re(),a=$([]),h=()=>{o.emit("list",{},t=>{n.value=!0,a.value=t.data})};o.on("download_event",t=>{console.log(t.data);const s=a.value.findIndex(l=>l.download_id===t.data.download_id);s!==-1?(a.value[s]=t.data,t.data.state===10&&t.data.progress===0&&ee(t.data.vod_model.vod_pic,t.data.download_name+" \u5F00\u59CB\u4E0B\u8F7D","info"),t.data.state===20&&ee(t.data.vod_model.vod_pic,t.data.download_name+" \u4E0B\u8F7D\u6210\u529F","primary")):(a.value=a.value.concat(t.data),a.value=a.value.sort(l=>-l.download_id))}),o.on("delete_event",t=>{a.value=a.value.filter(s=>s.download_id!==t.data.download_id),te(t.msg)});const b=t=>{o.emit("delete",{download_id:t})},_=t=>{u.value=a.value.find(s=>s.download_id===t),c.value=!0,g.loading.show(),o.emit("retry",{download_id:t,vod:u.value},s=>{c.value=!1,g.loading.hide(),d.value=!0,u.value=s.data})},S=t=>{o.emit("clear",{tag:t})};return o.on("message",t=>{te(t.msg)}),o.on("list",t=>{h()}),h(),(t,s)=>(f(),O(G,null,[i(Ke,{style:{"max-width":"1000px",margin:"auto"}},{default:m(()=>[B("div",mt,[B("div",gt,[i(P,{label:"\u6E05\u9664\u5DF2\u5B8C\u6210",color:"white",class:"content text-white",onClick:s[0]||(s[0]=l=>S("Finished"))}),i(P,{label:"\u6E05\u9664\u5931\u8D25",color:"white",class:"content text-white",onClick:s[1]||(s[1]=l=>S("Failed"))}),i(P,{label:"\u6E05\u9664\u672A\u4E0B\u8F7D",color:"white",class:"content text-white",onClick:s[2]||(s[2]=l=>S("None"))})]),i(je,{class:"q-ma-md no-box-shadow content",bordered:"",style:{"border-radius":"10px"}},{default:m(()=>[i(Ue,{class:"flex flex-wrap",bordered:"",separator:""},{default:m(()=>[(f(!0),O(G,null,Fe(a.value,l=>(f(),q(ue,{name:l.download_name,cover:l.vod_model.vod_pic,progress:l.progress,state:l.state,download_path:l.download_path,download_error:l.error,speed_str:l.speed_str,onDelete:w=>b(l.download_id),onRetry:w=>_(l.download_id),key:l.download_id},null,8,["name","cover","progress","state","download_path","download_error","speed_str","onDelete","onRetry"]))),128)),N(n)?C("",!0):(f(),O("div",ft,[i(se,{height:"60px"}),i(se,{height:"60px"})])),N(n)&&a.value.length===0?(f(),O("div",ht," \u6CA1\u6709\u4E0B\u8F7D\u8BB0\u5F55 ")):C("",!0)]),_:1})]),_:1})])]),_:1}),i(Je,{modelValue:N(d),"onUpdate:modelValue":s[3]||(s[3]=l=>Me(d)?d.value=l:d=l),vod:N(u)},null,8,["modelValue","vod"])],64))}});export{$t as default};