(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,n,t){var a=t(43),o={_path:"/api/v1/users",run:function(e,n,t,o){var c={hostname:"ethpoasanboxwb-ohtlvu-api.azurewebsites.net",method:e,path:this.path,headers:{accept:"application/json",Authorization:"Bearer "+t}};a.get(c,function(e){var n="";e.on("data",function(e){console.log(e),n+=e}),e.on("end",function(){o(!1,n)}),e.on("error",function(){o(!0,null)})})}};e.exports=o},36:function(e,n,t){e.exports=t(67)},41:function(e,n,t){},48:function(e,n){},50:function(e,n){},67:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(33),r=t.n(c),l=(t(41),t(9)),i=t(10),u=t(12),s=t(11),h=t(13),m=function(e){function n(){return Object(l.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(h.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("center",null,o.a.createElement("h1",null,"Choose which version of our app to use"),o.a.createElement("a",{href:"/dashboard"}," Workbench "),o.a.createElement("p",null,o.a.createElement("h3",null,"Eth Baas"))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var d=t(68),b=t(69),p=t(16),f=t.n(p),v={clientId:"134a2a3a-6224-4584-93f6-b1f38ce5fbdc"},k=function(e){function n(){return Object(l.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(h.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this,n=new f.a(v);return n.handleWindowCallback(),o.a.createElement("div",{className:"App"},o.a.createElement("center",null,o.a.createElement("h1",null,"Azure login test"),o.a.createElement("button",{onClick:function(){e.login(n)},className:"btn btn-secondary btn-sm"},"Login"),o.a.createElement("button",{onClick:function(){e.logout(n)},className:"btn btn-secondary btn-sm"},"Logout")))}},{key:"login",value:function(e){var n=e.getCachedUser();n?console.log(n):e.login()}},{key:"logout",value:function(e){e.logOut()}}]),n}(a.Component),E=t(34),g=t.n(E),w={clientId:"134a2a3a-6224-4584-93f6-b1f38ce5fbdc"},j=function(e){function n(){return Object(l.a)(this,n),Object(u.a)(this,Object(s.a)(n).apply(this,arguments))}return Object(h.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this,n=new f.a(w);return n.handleWindowCallback(),n.getCachedUser()?n.acquireToken(w.clientId,function(n,t){n?e.setToken(n):e.context.token=t}):n.login(),g.a.run("GET","/api/v2/users/me",this.context.token,function(n,t){e.context.data=n||t}),o.a.createElement("div",null,o.a.createElement("center",null,o.a.createElement("h1",null,"Welcome to the dasboard"),o.a.createElement("h4",null,e.context.data)))}},{key:"setToken",value:function(e){console.log("assign token"),this.context.token=e}}]),n}(a.Component),O=o.a.createElement(d.a,null,o.a.createElement("div",null,o.a.createElement(b.a,{exact:!0,path:"/",component:m}),o.a.createElement(b.a,{path:"/workbench",component:k}),o.a.createElement(b.a,{path:"/dashboard",component:j})));r.a.render(O,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,2,1]]]);
//# sourceMappingURL=main.e35ace7b.chunk.js.map