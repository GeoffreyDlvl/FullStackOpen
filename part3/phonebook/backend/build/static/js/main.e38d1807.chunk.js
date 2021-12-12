(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(3),o=t(2),u=t(0),i=function(e){var n=e.person,t=e.deletePerson;return Object(u.jsxs)("div",{children:[n.name," ",n.number,Object(u.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},s=function(e){var n=e.newName,t=e.newPhoneNumber,c=e.handleNewNameChange,r=e.handleNewPhoneNumberChange,a=e.addPerson;return Object(u.jsxs)("form",{onSubmit:a,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:n,onChange:c})]}),Object(u.jsxs)("div",{children:["phone: ",Object(u.jsx)("input",{value:t,onChange:r})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.searchTerms,t=e.handleSearchTermsChange;return Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{value:n,onChange:t})]})},h=function(e){var n=e.notification;return null===n?null:Object(u.jsx)("div",{className:n.type,children:n.message})},l=t(4),j=t.n(l),f="/api/persons",b=function(){return j.a.get(f).then((function(e){return e.data}))},m=function(e){return j.a.post(f,e).then((function(e){return e.data}))},O=function(e){return j.a.delete("".concat(f,"/").concat(e))},p=function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(){Object(o.useEffect)((function(){b().then((function(e){return c(e)}))}),[]);var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),l=Object(a.a)(r,2),j=l[0],f=l[1],v=Object(o.useState)(""),x=Object(a.a)(v,2),w=x[0],g=x[1],N=Object(o.useState)(""),C=Object(a.a)(N,2),P=C[0],y=C[1],S=Object(o.useState)(null),T=Object(a.a)(S,2),k=T[0],A=T[1],D=function(e){window.confirm("Delete ".concat(e.name,"?"))&&O(e.id).then((function(n){c(t.filter((function(n){return n.id!==e.id})))}))},E=""===P?t:t.filter((function(e){return e.name.toLowerCase().includes(P)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(h,{notification:k}),Object(u.jsx)(d,{searchTerms:P,handleSearchTermsChange:function(e){return y(e.target.value)}}),Object(u.jsx)("h3",{children:"Add a new"}),Object(u.jsx)(s,{newName:j,newPhoneNumber:w,handleNewNameChange:function(e){return f(e.target.value)},handleNewPhoneNumberChange:function(e){return g(e.target.value)},addPerson:function(e){e.preventDefault();var n={name:j,number:w};if(t.some((function(e){return e.name===j}))){if(window.confirm("".concat(j," is already added to phonebook, replace old number with new one?"))){var r=t.find((function(e){return e.name===j}));p(r.id,n).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),A({message:"Updated ".concat(r.name),type:"success"}),setTimeout((function(){A(null)}),3e3)})).catch((function(e){A({message:e.response.data.error,type:"error"}),setTimeout((function(){A(null)}),5e3)}))}}else m(n).then((function(e){c(t.concat(e)),f(""),g(""),A({message:"Added ".concat(n.name),type:"success"}),setTimeout((function(){A(null)}),3e3)})).catch((function(e){A({message:e.response.data.error,type:"error"}),setTimeout((function(){A(null)}),5e3)}))}}),Object(u.jsx)("h3",{children:"Numbers"}),E.map((function(e){return Object(u.jsx)(i,{person:e,deletePerson:D},e.id)}))]})};t(40);r.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.e38d1807.chunk.js.map