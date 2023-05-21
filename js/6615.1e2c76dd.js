"use strict";(self["webpackChunktemplate_project"]=self["webpackChunktemplate_project"]||[]).push([[6615],{6615:function(e,t,o){o.r(t),o.d(t,{default:function(){return L}});var s=o(821);const a=e=>((0,s.dD)("data-v-1d8eded3"),e=e(),(0,s.Cn)(),e),n={class:"w-full bg-black-lighten rounded-lg px-4 py-3"},c=a((()=>(0,s._)("h3",{class:"mb-4"}," Upload documents ",-1))),i=a((()=>(0,s._)("h3",{class:"mb-4"}," Uploaded documents ",-1)));function l(e,t,o,a,l,r){const d=(0,s.up)("zInputFile"),u=(0,s.up)("zSpacer"),m=(0,s.up)("zDivider"),g=(0,s.up)("zDocumentImage"),p=(0,s.up)("zImagesCollection");return(0,s.wg)(),(0,s.iD)("div",n,[c,(0,s.Wm)(d,{"max-files":3,"max-file-size":3145728,"file-formats":l.fileFormats,loader:l.inputLoader,onFilesInputed:r.uploadDocuments},null,8,["file-formats","loader","onFilesInputed"]),(0,s.Wm)(u,{space:12}),(0,s.Wm)(m),(0,s.Wm)(u,{space:8}),i,(0,s.Wm)(p,{loader:l.collectionLoader,images:e.documents,class:"documents_images-grid",onLoaded:r.disableCollectionLoader},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.documents,(e=>((0,s.wg)(),(0,s.j4)(g,{key:e,class:"documents__image",src:e},null,8,["src"])))),128))])),_:1},8,["loader","images","onLoaded"])])}o(6699);var r=o(3907);function d(e,t,o,a,n,c){const i=(0,s.up)("zActionButton"),l=(0,s.up)("zImage");return(0,s.wg)(),(0,s.j4)(l,null,{actions:(0,s.w5)((()=>[(0,s._)("div",{class:"z-documents-image__actions",onClick:t[0]||(t[0]=(0,s.iM)((()=>{}),["stop"]))},[(0,s.Wm)(i,{class:"z-documents-image__action","is-title":!0,title:"Remove Image",icon:"close"})])])),_:1})}var u=o(6032),m={name:"ZDocumentImage",components:{zImage:u.Z}},g=o(3744);const p=(0,g.Z)(m,[["render",d],["__scopeId","data-v-072943aa"]]);var h=p;const _={class:"z-images-collection__wrapper"},v={key:0,class:"z-images-collection__loader"},w={class:"z-images-collection__viewer-wrapper"},f=["src"],z={class:"z-images-collection__counter"};function I(e,t,o,a,n,c){const i=(0,s.up)("zLoader");return(0,s.wg)(),(0,s.iD)("div",_,[o.loader?((0,s.wg)(),(0,s.iD)("div",v,[(0,s.Wm)(i,{width:72,height:72})])):(0,s.kq)("",!0),(0,s._)("div",(0,s.dG)(e.$attrs,{class:["z-images-collection",{"z-images-collection--loading":o.loader}],onView:t[0]||(t[0]=(...e)=>c.showImage&&c.showImage(...e)),onResourceLoad:t[1]||(t[1]=(...e)=>c.count&&c.count(...e))}),[(0,s.WI)(e.$slots,"default",{},void 0,!0)],16),null!==n.viewerSrc&&o.images.length>0?((0,s.wg)(),(0,s.iD)("div",{key:1,class:"z-images-collection__viewer",onClick:t[5]||(t[5]=e=>n.viewerSrc=null)},[(0,s._)("div",{class:"z-images-collection__viewer-inner",onClick:t[4]||(t[4]=(0,s.iM)((()=>{}),["stop"]))},[(0,s._)("button",{class:"z-images-collection__button",onClick:t[2]||(t[2]=(...e)=>c.prevSrc&&c.prevSrc(...e))}," ➬ "),(0,s._)("div",w,[(0,s._)("img",{draggable:"false",class:"z-images-collection__view-image",src:n.viewerSrc,alt:""},null,8,f)]),(0,s._)("span",z,(0,s.zw)(c.viewSrcIndex+1)+" / "+(0,s.zw)(o.images.length),1),(0,s._)("button",{class:"z-images-collection__button",onClick:t[3]||(t[3]=(...e)=>c.nextSrc&&c.nextSrc(...e))}," ➬ ")])])):(0,s.kq)("",!0)])}var D=o(7889),S={name:"ZImagesCollection",components:{zLoader:D["default"]},inheritAttrs:!1,props:{images:{type:Array,default(){return[]}},loader:{type:Boolean,default:!1}},data(){return{viewerSrc:null,loadedResources:0}},computed:{viewSrcIndex(){return this.images.indexOf(this.viewerSrc)}},methods:{showImage(e){this.viewerSrc=e.detail.src},nextSrc(){this.viewerSrc=this.images[this.changeSrcIndex(this.viewSrcIndex+1)]},prevSrc(){this.viewerSrc=this.images[this.changeSrcIndex(this.viewSrcIndex-1)]},changeSrcIndex(e){return-1===e?this.images.length-1:e===this.images.length?0:e},count(){this.loadedResources+=1,this.loadedResources===this.images.length&&this.$emit("loaded",!0)}}};const k=(0,g.Z)(S,[["render",I],["__scopeId","data-v-3ab9d662"]]);var b=k,x={name:"Documents",data(){return{fileFormats:["image/jpg","image/jpeg","image/png"],inputLoader:!1,collectionLoader:!0}},computed:{...(0,r.Se)({userData:"user/userData",access:"token/access",documents:["user/documents"]}),images(){const e=[],t=e=>parseInt(1e3*Math.random());for(let o=0;o<15;++o)e.push(`https://picsum.photos/id/${o}/${t()}/${t()}`);return e}},methods:{disableCollectionLoader(){this.collectionLoader=!1},checkFreeDocumentPlaces(){let e=0;return null===this.userData.documentPhotoOne&&e++,null===this.userData.documentPhotoTwo&&e++,null===this.userData.documentPhotoThree&&e++,e},getAvailDocumentKey(){const e=Object.keys(this.userData).filter((e=>e.includes("documentPhoto")));for(let t=0;t<3;++t)if(null===this.userData[e[t]])return t+2},uploadDocuments(e){const t=this.checkFreeDocumentPlaces();if(e.length>t||0===t)this.toast$.error({detail:"Maximum number of documents 3. Remove one of the documents to load new documents"});else{this.inputLoader=!0;for(let t=0;t<e.length;++t){const o=this.getAvailDocumentKey(),s=new FormData;s.append("image",e[t]),s.append("image_type",o),this.uploadRequest(s,o)}}},async uploadRequest(e){}},components:{zDocumentImage:h,zImagesCollection:b}};const C=(0,g.Z)(x,[["render",l],["__scopeId","data-v-1d8eded3"]]);var L=C}}]);