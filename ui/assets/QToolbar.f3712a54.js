import{y as o,c as t,h as r,J as l}from"./index.e6b14d87.js";var p=o({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:a}){const s=t(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>r("div",{class:s.value},l(a.default))}});const n=r("div",{class:"q-space"});var i=o({name:"QSpace",setup(){return()=>n}}),u=o({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:a}){const s=t(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>r("div",{class:s.value,role:"toolbar"},l(a.default))}});export{u as Q,p as a,i as b};
