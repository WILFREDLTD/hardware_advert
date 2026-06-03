"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},9523:e=>{e.exports=require("dns")},2361:e=>{e.exports=require("events")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},1808:e=>{e.exports=require("net")},2037:e=>{e.exports=require("os")},1017:e=>{e.exports=require("path")},4577:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},4404:e=>{e.exports=require("tls")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},9796:e=>{e.exports=require("zlib")},7382:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>g,originalPathname:()=>S,requestAsyncStorage:()=>l,routeModule:()=>u,serverHooks:()=>d,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>h});var s={};t.r(s),t.d(s,{POST:()=>POST});var o=t(884),n=t(6132),a=t(5798),i=t(4600);t(1639);var c=t(6709),p=t(7709);function buildTransport(){return c.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:465===Number(process.env.SMTP_PORT||587),auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}})}async function sendContactEmail(e){try{let r=buildTransport(),t=`${e.firstName??""} ${e.lastName??""}`.trim()||"—",s={from:process.env.SMTP_USER,replyTo:e.email,to:process.env.SMTP_TO||process.env.SMTP_USER,subject:`📩 Demo / Contact request from ${t}`,text:`Name: ${t}
Email: ${e.email}
Phone: ${e.phone||"—"}
Service: ${e.service||"demo"}

Message:
${e.message||""}`,html:`
        <h2>Demo / Contact Request</h2>
        <p><strong>Name:</strong> ${t}</p>
        <p><strong>Email:</strong> <a href="mailto:${e.email}">${e.email}</a></p>
        <p><strong>Phone:</strong> ${e.phone||"—"}</p>
        <p><strong>Service:</strong> ${e.service||"Demo"}</p>
        <hr/>
        <p>${(e.message||"").replace(/\n/g,"<br/>")}</p>
      `};if(await r.sendMail(s),"true"===process.env.SMTP_SEND_CONFIRMATION){let t={from:process.env.SMTP_USER,to:e.email,subject:`Thanks — we received your demo request`,html:`
          <p>Hi ${e.firstName??""},</p>
          <p>Thanks for requesting a demo. We'll review your message and get back to you soon.</p>
          <p>— The team</p>
        `};r.sendMail(t).catch(()=>{})}return{success:!0}}catch(e){return console.error("sendContactEmail error",e),{success:!1,error:e?.message}}}async function scheduleConsultation(e){try{let r=buildTransport(),t=e.googleMeetLink&&e.googleMeetLink.trim().length>0?e.googleMeetLink:process.env.GOOGLE_MEET_URL||process.env.GOOGLE_MEET_LINK||"",s=(0,p.Z)(new Date(e.selectedDate),"MMMM dd, yyyy"),o=(0,p.Z)(new Date(e.selectedDate),"EEEE"),n={from:process.env.SMTP_USER,to:e.email,subject:`✅ Consultation Confirmed - ${e.service||"Demo"}`,html:`
        <h2>Consultation Confirmed</h2>
        <p>Hi ${e.firstName??""},</p>
        <p>Your consultation is scheduled for <strong>${o}, ${s} at ${e.selectedTime}</strong>.</p>
        <p><a href="${t}">Join Google Meet</a></p>
      `},a={from:process.env.SMTP_USER,to:process.env.SMTP_TO||process.env.SMTP_USER,subject:`📅 New Consultation: ${e.firstName??""} ${e.lastName??""}`,html:`
        <h2>New Consultation Scheduled</h2>
        <p><strong>Name:</strong> ${e.firstName??""} ${e.lastName??""}</p>
        <p><strong>Email:</strong> ${e.email}</p>
        <p><strong>Phone:</strong> ${e.phone||"—"}</p>
        <p><strong>When:</strong> ${o}, ${s} at ${e.selectedTime}</p>
        <p><strong>Meet:</strong> <a href="${t}">${t}</a></p>
      `};return await Promise.all([r.sendMail(n),r.sendMail(a)]),{success:!0}}catch(e){return console.error("scheduleConsultation error",e),{success:!1,error:e?.message}}}async function POST(e){try{let r=await e.formData(),t=r.get("name")?.toString()??"",s=r.get("email")?.toString()??"",o=r.get("message")?.toString()??"",[n,...i]=t.split(" "),c=i.join(" "),p=await sendContactEmail({firstName:n,lastName:c,email:s,message:o});if(p.success)return a.Z.json({ok:!0});return a.Z.json({ok:!1,error:p.error},{status:500})}catch(e){return console.error("api/contact error",e),a.Z.json({ok:!1,error:e?.message||"unknown"},{status:500})}}(0,t(2990).h)([sendContactEmail,scheduleConsultation]),(0,i.U)("f2fbd005e86a59112cda5ec5a63095c2ef7b3901",null,sendContactEmail),(0,i.U)("d0643f62a84a101e7743360cbfe882c494a5cbb6",null,scheduleConsultation);let u=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/home/wilfred/hardware_stocks/campaign/src/app/api/contact/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:d,headerHooks:g,staticGenerationBailout:h}=u,S="/api/contact/route"}};var r=require("../../../webpack-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),t=r.X(0,[481,54],()=>__webpack_exec__(7382));module.exports=t})();