"use strict";(self["webpackChunktemplate_project"]=self["webpackChunktemplate_project"]||[]).push([[4123],{1671:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var n=a(821);const s=(0,n._)("h5",{class:"leading-4"}," Specify contact service: ",-1),o=(0,n._)("small",{class:"text-placeholder font-semibold"}," Select at least one service ",-1),l=[s,o],c=(0,n.Uk)(" Submit ");function i(e,t,a,s,o,i){const r=(0,n.up)("ContactField"),d=(0,n.up)("zLoaderButton"),u=(0,n.up)("zForm");return(0,n.wg)(),(0,n.j4)(u,{"vuelidate-object":s.v$,onValidate:i.setUserContacts},{default:(0,n.w5)((()=>[(0,n._)("div",{class:(0,n.C_)(["mb-5",i.titleErrorClass])},l,2),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.contactTypes,(e=>((0,n.wg)(),(0,n.j4)(r,{key:e.id,class:"mb-6","model-value":o.filledContacts[e.id],"contact-type":e,"show-input-on-init":i.isFieldSelected(e.id),"onUpdate:modelValue":i.mutateUserContact},null,8,["model-value","contact-type","show-input-on-init","onUpdate:modelValue"])))),128)),(0,n.Wm)(d,{loader:o.form.loading,class:"form-button float-right"},{default:(0,n.w5)((()=>[c])),_:1},8,["loader"])])),_:1},8,["vuelidate-object","onValidate"])}a(6699);var r=a(2416);function d(){return{filledContacts:{atLeastOne:e=>Object.keys(e).length>=1}}}function u(e,t,a,s,o,l){const c=(0,n.up)("zCheckboxSingle"),i=(0,n.up)("zInput");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n.Wm)(c,{modelValue:l.showInput,"onUpdate:modelValue":t[0]||(t[0]=e=>l.showInput=e),class:"mb-4",label:a.contactType.name,onChange:l.emitUnselectService},null,8,["modelValue","label","onChange"]),l.showInput?((0,n.wg)(),(0,n.j4)(i,{key:0,value:a.modelValue,label:"Enter your identificator in service",class:"flex-grow",onInput:l.emitUpdateServiceId},null,8,["value","onInput"])):(0,n.kq)("",!0)])}var p={name:"UserContactField",props:{contactType:{type:Object,required:!0},modelValue:{required:!0},showInputOnInit:{type:Boolean,required:!0}},emits:["update:modelValue"],data(){return{fieldSelected:!1}},computed:{showInput:{get(){return this.fieldSelected||this.showInputOnInit},set(e){this.fieldSelected=e}}},methods:{emitUpdateServiceId(e){this.$emit("update:modelValue",{typeId:this.contactType.id,id:e.target.value})},emitUnselectService(){this.$emit("update:modelValue",{typeId:this.contactType.id,id:""})}}},m=a(3744);const h=(0,m.Z)(p,[["render",u]]);var f=h,v={name:"UserContact",setup(){return{v$:(0,r.ZP)()}},data(){return{filledContacts:{},form:{loading:!1},contactServices:["Facecall","WhatsApp","Zoom","Skype"]}},computed:{titleErrorClass(){return{"text-danger":this.v$.filledContacts.$error}},contactTypes(){return this.$store.getters["contacts/contactTypes"]},userContacts(){return this.$store.getters["contacts/userContacts"]},selectedContacts(){return Object.keys(this.filledContacts).map((e=>parseInt(e)))}},created(){this.fillForm()},methods:{mutateUserContact({typeId:e,id:t}){""!==t?this.filledContacts[e]=t:delete this.filledContacts[e]},async setUserContacts(e){if(e===STATUS_WORDS.ERROR)return;const t=this.prepareDataToSend(this.filledContacts);this.form.loading=!0,await this.$store.dispatch("contacts/setContacts",t),this.form.loading=!1,this.toast$.success({summary:"Your contacts have been successful updated!"})},prepareDataToSend(e){const t=[];for(const a of Object.entries(e))t.push({value:a[1],contactService:parseInt(a[0])});return t},fillForm(){for(const e of this.userContacts)this.filledContacts[e.contactService]=e.value},isFieldSelected(e){return this.selectedContacts.includes(e)}},validations:d(),components:{ContactField:f}};const C=(0,m.Z)(v,[["render",i]]);var y=C}}]);