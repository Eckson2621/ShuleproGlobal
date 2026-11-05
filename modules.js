/* SHULEPRO GLOBAL V30 — unified module workspace.
   Existing academic/payment modules remain intact. Additional records use a
   school-scoped table protected by Supabase RLS. Paid integrations are placeholders. */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var groups=[
{id:'school',name:'School Administration',icon:'🏫',items:[
['school_profile','School Profile','Identity, contacts and school information.',['School name','School address','Phone','Email','Website']],
['academic_calendar','Academic Years & Terms','Academic years, terms, semesters and calendars.',['Academic year','Term or semester','Start date','End date']],
['departments_subjects','Departments & Subjects','Departments, subjects and subject codes.',['Department','Subject name','Subject code','Education level']],
['classes_streams','Classes & Streams','Classes, streams, class teachers and capacity.',['Class name','Stream','Academic year','Class teacher']],
['school_policies','Policies & Documents','Policies, notices and document references.',['Document title','Document type','File reference or URL','Notes']]
]},
{id:'students',name:'Students & Admissions',icon:'🎓',items:[
['admissions','Admissions & Enrolment','Admission records and enrolment decisions.',['Student name','Admission number','Class','Admission date','Admission status']],
['guardians','Parents & Guardians','Parent details and guardian relationships.',['Parent or guardian name','Relationship','Phone','Email','Student admission number']],
['student_movement','Transfers, Promotion & Graduation','Student transfers, promotions, graduation and withdrawal.',['Student name or admission number','Action','From class','To class','Effective date']],
['student_welfare','Student Welfare & Discipline','Counselling, discipline, awards and welfare follow-ups.',['Student name or admission number','Record type','Date','Description','Action taken']],
['student_documents','Student Documents & ID Cards','Identity cards, certificates and student documents.',['Student name or admission number','Document type','Document number','Issue date','Expiry date']]
]},
{id:'staff',name:'Teachers & Human Resources',icon:'👩‍🏫',items:[
['staff_directory','Staff Directory & Roles','Staff directory, role assignments and contacts.',['Staff full name','Job title','Department','Phone','Email']],
['staff_workload','Teacher Workload & Appraisal','Teaching load, performance reviews and development.',['Teacher name','Review period','Workload','Performance notes','Next action']],
['staff_leave','Leave & Staff Requests','Leave applications and staff requests.',['Staff name','Leave type','Start date','End date','Status']],
['payroll_records','Payroll & Benefits','Payroll summaries and benefit references.',['Staff name or payroll reference','Pay period','Gross amount','Deductions','Status']]
]},
{id:'academic',name:'Academic Management',icon:'📚',items:[
['curriculum','Curriculum & Education Levels','Curriculum mapping, syllabi and learning standards.',['Curriculum name','Country','Education level','Version','Notes']],
['lesson_plans','Lesson Plans & Topic Coverage','Lesson preparation, schemes of work and topic coverage.',['Teacher','Class','Subject','Topic','Planned date','Coverage status']],
['examination_admin','Examination Administration','Exam calendars, invigilation and approvals.',['Examination name','Exam type','Class','Start date','End date','Status']],
['academic_interventions','Learning Support & Interventions','Learning gaps and student support plans.',['Student or class','Subject','Learning gap','Intervention','Review date']]
]},
{id:'attendance',name:'Attendance & Scheduling',icon:'🗓️',items:[
['attendance_alerts','Attendance Follow-ups','Absence follow-up, lateness and guardian contact logs.',['Student name or admission number','Date','Attendance status','Reason','Follow-up action']],
['room_schedule','Rooms & Facilities Scheduling','Room allocation, facility bookings and conflicts.',['Room or facility','Date','Start time','End time','Purpose']],
['substitution','Teacher Substitution','Cover lessons and teacher substitutions.',['Absent teacher','Cover teacher','Class','Subject','Date','Period']]
]},
{id:'finance',name:'Finance & Accounts',icon:'💳',items:[
['fee_structures','Fee Structures & Invoices','Fee categories, schedules, invoices and balances.',['Fee item','Academic year','Class','Amount','Due date']],
['receipts','Receipts & Other Income','Receipts and other income references.',['Receipt number','Payer','Income type','Amount','Date']],
['expenses','Expenses & Procurement','Expenses, purchase requests and approvals.',['Expense title','Category','Supplier','Amount','Date','Approval status']],
['budgets','Budgets & Financial Reports','Budget allocations and variance notes.',['Budget title','Period','Allocated amount','Actual amount','Notes']]
]},
{id:'parents',name:'Parent & Student Portals',icon:'👨‍👩‍👧',items:[
['parent_cases','Parent Communication Cases','Parent requests, meeting notes and follow-ups.',['Parent name','Student','Request type','Date','Resolution']],
['student_support','Student Portal Content','Learning resources and student announcements.',['Title','Audience','Class','Publish date','Content summary']]
]},
{id:'communications',name:'Communication & Notifications',icon:'📣',items:[
['announcements','Announcements & Notices','School notices and targeted announcements.',['Title','Audience','Publish date','Message','Status']],
['communication_log','Communication Log','Email, SMS and parent communication activity.',['Recipient','Channel','Subject','Date','Delivery status']]
]},
{id:'library',name:'Library Management',icon:'📖',items:[
['library_catalog','Library Catalogue','Books, authors, ISBNs and copies.',['Book title','Author','ISBN','Category','Number of copies']],
['library_loans','Book Loans & Returns','Issue, return and overdue records.',['Book title or ISBN','Borrower','Issue date','Due date','Return status']]
]},
{id:'boarding',name:'Hostel & Boarding',icon:'🛏️',items:[
['hostel_rooms','Hostels, Rooms & Beds','Hostel buildings, rooms and bed allocation.',['Hostel name','Room number','Bed capacity','Warden']],
['boarding_register','Boarding Register','Boarder allocation and roll calls.',['Student name or admission number','Hostel','Room','Bed','Start date']]
]},
{id:'transport',name:'Transport Management',icon:'🚌',items:[
['fleet','Vehicles & Drivers','Vehicle register, driver details and inspections.',['Vehicle registration','Vehicle type','Driver','Capacity','Insurance expiry']],
['routes','Routes & Stops','Transport routes, stops and student allocation.',['Route name','Stop','Pickup time','Drop-off time','Vehicle']]
]},
{id:'inventory',name:'Inventory & Assets',icon:'📦',items:[
['inventory_items','Stock & Inventory','Stock items, quantities, stores and reorder levels.',['Item name','Category','Quantity','Unit','Reorder level']],
['assets','School Assets & Maintenance','Asset register and maintenance history.',['Asset name','Asset tag','Location','Condition','Next service date']]
]},
{id:'events',name:'Events, Discipline & Welfare',icon:'🏆',items:[
['school_events','Events & Activities','School events, clubs, sports and activities.',['Event name','Event type','Venue','Event date','Coordinator']],
['counselling','Counselling & Safeguarding','Confidential case references and follow-up.',['Case reference','Student reference','Assigned officer','Review date','Status']]
]},
{id:'settings',name:'Settings, Security & Data',icon:'⚙️',items:[
['school_users','User Access Register','User role requests and access reviews.',['User email','Requested role','Requested by','Review date','Status']],
['school_audit','Operational Audit Notes','Operational decisions and audit references.',['Action','Record reference','Responsible person','Date','Notes']],
['school_backup_log','Backup & Recovery Log','Backup dates, exports and restore checks.',['Backup date','Backup type','File reference','Verified by','Notes']]
]},
{id:'ai',name:'ShulePro AI',icon:'✨',items:[
['ai_insights','AI Insights & Recommendations','Approved AI analysis outputs and follow-up actions. AI API connection is not active yet.',['Insight title','Analysis area','Date','Recommendation','Review status']],
['ai_reports','AI Report Requests','AI report requests and approved data scope.',['Report request','Class or department','Date','Requested by','Status']]
]}
];
var legacy=[
{id:'wanafunzi',name:'Students',icon:'🎓',desc:'Student registration and student list.'},
{id:'alama',name:'Marks & Results',icon:'📊',desc:'Marks entry and result records.'},
{id:'mahudhurio',name:'Attendance',icon:'✅',desc:'Daily attendance and attendance history.'},
{id:'ratiba',name:'Timetable',icon:'🗓️',desc:'Class timetable and periods.'},
{id:'ada',name:'Subscription & Payments',icon:'💳',desc:'Subscription, TxID and payment history.'},
{id:'report',name:'Reports & Report Cards',icon:'📄',desc:'School reports and print-to-PDF.'},
{id:'backup',name:'Backup & Language',icon:'🌐',desc:'JSON backup and language settings.'}
];
function style(){
if($('spWorkspaceStyles'))return;
var s=document.createElement('style');s.id='spWorkspaceStyles';s.textContent=
'#spGlobalHub{display:grid;grid-template-columns:250px minmax(0,1fr);gap:16px;margin:14px 0 20px;align-items:start}'+
'.sp-side{background:linear-gradient(165deg,#101d3b,#172d55 70%,#243d70);border-radius:18px;padding:15px;color:#eaf1ff;position:sticky;top:82px;max-height:calc(100vh - 100px);overflow:auto}'+
'.sp-side-brand{font-weight:900;font-size:18px;padding:8px 9px 14px;border-bottom:1px solid #ffffff20}.sp-side-sub{font-size:10px;color:#a9bddf;margin-top:4px}'+
'.sp-nav-label{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#9eb2d5;margin:16px 8px 6px}'+
'.sp-nav-btn{display:flex;width:100%;align-items:center;gap:9px;text-align:left;background:transparent;color:#dce8ff;border:0;border-radius:9px;padding:9px 10px;font-size:12px;margin:2px 0}.sp-nav-btn:hover,.sp-nav-btn.active{background:#ffffff1b;color:#fff}.sp-ico{width:20px;text-align:center}'+
'.sp-main{min-width:0}.sp-topline{display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap;background:#fff;border:1px solid #e4eaf3;border-radius:15px;padding:14px 17px;margin-bottom:14px}'+
'.sp-eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:1.3px;color:#64748b;font-weight:800}.sp-title{font-size:23px;font-weight:850;color:#14213d;margin:4px 0}.sp-subtitle{font-size:12px;color:#64748b}.sp-search{max-width:240px;margin:0}'+
'.sp-hero{border-radius:17px;padding:23px;color:#fff;background:linear-gradient(120deg,#1746a2,#4169e1 55%,#7656d8)}.sp-hero h2{font-size:24px;margin:0 0 8px}.sp-hero p{color:#e5edff;max-width:650px;font-size:12px;line-height:1.6;margin:0}'+
'.sp-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:13px 0}.sp-kpi{background:#fff;border:1px solid #e5eaf2;border-radius:14px;padding:13px}.sp-kpi-icon{font-size:19px}.sp-kpi-label{font-size:10px;color:#64748b;margin-top:8px}.sp-kpi-value{font-size:24px;font-weight:850;color:#14213d;margin-top:2px}'+
'.sp-section-head{display:flex;justify-content:space-between;align-items:end;gap:10px;margin:20px 0 10px}.sp-section-head h3{margin:0;color:#17233d;font-size:16px}.sp-section-head p{margin:3px 0 0;color:#64748b;font-size:11px}'+
'.sp-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.sp-module-card{background:#fff;border:1px solid #e4eaf3;border-radius:14px;padding:14px;text-align:left;cursor:pointer;min-height:128px;color:#1d2a44}.sp-module-card:hover{box-shadow:0 9px 24px #12264b12;border-color:#b9c9e7}.sp-card-icon{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-size:19px;margin-bottom:10px}.sp-module-card strong{display:block;font-size:12px;margin-bottom:5px}.sp-module-card small{display:block;color:#64748b;line-height:1.5;font-size:10px}.sp-chip{display:inline-flex;padding:4px 8px;border-radius:20px;background:#edf3ff;color:#2854a6;font-size:9px;font-weight:800;margin-top:8px}'+
'.sp-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;background:#fff;border:1px solid #e4eaf3;border-radius:15px;padding:15px;margin:12px 0}.sp-form label{display:block;font-size:11px;color:#475569;font-weight:750}.sp-form input{margin:5px 0 0;width:100%;padding:10px;border:1px solid #d8e0ec;border-radius:9px;font:inherit;font-size:12px}.sp-wide{grid-column:1/-1}.sp-btn{border:0;border-radius:9px;padding:10px 13px;background:#2454b5;color:#fff;font-weight:750;font-size:11px;cursor:pointer}.sp-btn.alt{background:#edf2fb;color:#254b91}.sp-btn.danger{background:#fff0f0;color:#a52a2a}'+
'.sp-records{display:grid;gap:8px}.sp-record{display:flex;justify-content:space-between;gap:10px;align-items:center;background:#fff;border:1px solid #e4eaf3;border-radius:11px;padding:11px 13px}.sp-record strong{font-size:12px;color:#17233d}.sp-record small{display:block;font-size:10px;color:#64748b;margin-top:4px}.sp-notice{border-radius:11px;padding:12px 14px;background:#fff8e7;border:1px solid #f5e1a9;color:#77530b;font-size:11px;line-height:1.6;margin:11px 0}.sp-connection{background:linear-gradient(135deg,#f5f7ff,#f0edff);border:1px solid #dedafa;border-radius:14px;padding:16px;margin-top:13px}.sp-connection strong{color:#45358b}.sp-muted{font-size:10px;color:#64748b}.sp-back{background:transparent;border:0;color:#2454b5;font-weight:800;padding:6px 0;cursor:pointer}'+
'@media(max-width:900px){#spGlobalHub{grid-template-columns:1fr}.sp-side{position:relative;top:0;max-height:none}.sp-side nav{display:flex;flex-wrap:wrap;gap:3px}.sp-nav-label{width:100%;margin:9px 5px 3px}.sp-nav-btn{width:auto}.sp-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'+
'@media(max-width:560px){.sp-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.sp-card-grid{grid-template-columns:1fr}.sp-form{grid-template-columns:1fr}.sp-title{font-size:20px}.sp-topline{padding:11px}}';
document.head.appendChild(s);
}
function createHub(){
if($('spGlobalHub'))return;
var hub=document.createElement('section');hub.id='spGlobalHub';
hub.innerHTML='<aside class="sp-side"><div class="sp-side-brand">SHULEPRO GLOBAL<div class="sp-side-sub">GLOBAL SCHOOL MANAGEMENT</div></div><nav id="spSideNav"></nav><div style="border-top:1px solid #ffffff20;margin-top:13px;padding-top:11px;font-size:9px;color:#a9bddf">Secure school workspace · EAM VENTURES LTD</div></aside><main class="sp-main"><div class="sp-topline"><div><div class="sp-eyebrow">School workspace</div><div class="sp-title" id="spPageTitle">Dashboard</div><div class="sp-subtitle" id="spPageSubtitle">A unified view of your school operations.</div></div><input class="sp-search" id="spSearch" placeholder="Search modules..." aria-label="Search modules"></div><div id="spPage"></div></main>';
var app=$('app'),nav=app.querySelector('.tabs');app.insertBefore(hub,nav||app.firstChild);if(nav)nav.classList.add('hidden');app.querySelectorAll('.pane').forEach(function(p){p.classList.add('hidden');});
$('spSearch').addEventListener('input',function(e){filterNav(e.target.value);});renderNav();renderHome();
}
function renderNav(){
var nav=$('spSideNav');if(!nav)return;
var html='<button class="sp-nav-btn active" data-home="1"><span class="sp-ico">🏠</span>Overview</button><div class="sp-nav-label">Core modules</div>';
legacy.forEach(function(m){html+='<button class="sp-nav-btn" data-legacy="'+m.id+'"><span class="sp-ico">'+m.icon+'</span>'+m.name+'</button>';});
groups.forEach(function(g){html+='<div class="sp-nav-label">'+g.icon+' '+g.name+'</div>';g.items.forEach(function(m){html+='<button class="sp-nav-btn" data-module="'+m[0]+'"><span class="sp-ico">•</span>'+m[1]+'</button>';});});
nav.innerHTML=html;
nav.querySelector('[data-home]').onclick=function(){setActive(this);renderHome();};
nav.querySelectorAll('[data-legacy]').forEach(function(b){b.onclick=function(){openLegacy(b.dataset.legacy,b);};});
nav.querySelectorAll('[data-module]').forEach(function(b){b.onclick=function(){openModule(b.dataset.module,b);};});
}
function setActive(b){document.querySelectorAll('.sp-nav-btn').forEach(function(x){x.classList.remove('active');});if(b)b.classList.add('active');}
function filterNav(q){q=q.trim().toLowerCase();document.querySelectorAll('#spSideNav .sp-nav-btn').forEach(function(b){b.classList.toggle('hidden',!!q&&b.textContent.toLowerCase().indexOf(q)<0);});}
function setTitle(t,s){$('spPageTitle').textContent=t;$('spPageSubtitle').textContent=s||'';}
function count(table){return db.from(table).select('*',{count:'exact',head:true}).eq('school_id',currentSchoolId).then(function(r){if(r.error)throw r.error;return r.count==null?'—':r.count;}).catch(function(){return '—';});}
function renderHome(){
if(!$('spPage'))return;setTitle('School Dashboard','Your school operations, academic activity and administration in one workspace.');
Promise.all([count('students'),count('teachers'),count('classes'),count('school_module_records')]).then(function(nums){
if(!$('spPage'))return;
var html='<div class="sp-hero"><div class="sp-eyebrow" style="color:#d5e2ff">WELCOME TO YOUR SCHOOL</div><h2>'+esc(currentSchool&&currentSchool.school_name||'School Dashboard')+'</h2><p>Manage learners, staff, academic performance, finance and daily operations from one secure workspace. Each school account is isolated by Supabase Row Level Security.</p></div><div class="sp-kpis">';
[['🎓','Students',nums[0]],['👩‍🏫','Teachers',nums[1]],['🏫','Classes',nums[2]],['🗂️','Workspace records',nums[3]]].forEach(function(k){html+='<div class="sp-kpi"><div class="sp-kpi-icon">'+k[0]+'</div><div class="sp-kpi-label">'+k[1]+'</div><div class="sp-kpi-value">'+k[2]+'</div></div>';});
html+='</div><div class="sp-section-head"><div><h3>Quick access</h3><p>Open a core ShulePro module.</p></div></div><div class="sp-card-grid">';
legacy.forEach(function(m){html+='<button class="sp-module-card" data-quick="'+m.id+'"><span class="sp-card-icon" style="background:#edf3ff">'+m.icon+'</span><strong>'+m.name+'</strong><small>'+m.desc+'</small><span class="sp-chip">Open module →</span></button>';});
html+='</div><div class="sp-section-head"><div><h3>All school departments</h3><p>Structured workspaces for the full ShuleProGlobal vision.</p></div></div><div class="sp-card-grid">';
groups.forEach(function(g){html+='<button class="sp-module-card" data-group="'+g.id+'"><span class="sp-card-icon" style="background:#edf3ff">'+g.icon+'</span><strong>'+g.name+'</strong><small>'+g.items.length+' workspaces · '+g.items.slice(0,2).map(function(x){return x[1];}).join(', ')+'...</small><span class="sp-chip">Explore department →</span></button>';});
html+='</div><div class="sp-connection"><strong>🔌 Paid services and external connections</strong><p class="sp-muted">DPO/card settlement, SMS delivery, AI API, custom domain and premium storage are connection-ready placeholders. No paid service is activated or charged from this workspace.</p></div>';
$('spPage').innerHTML=html;
$('spPage').querySelectorAll('[data-quick]').forEach(function(b){b.onclick=function(){openLegacy(b.dataset.quick);};});
$('spPage').querySelectorAll('[data-group]').forEach(function(b){b.onclick=function(){renderGroup(b.dataset.group);};});
});
}
function renderGroup(id){
var g=groups.find(function(x){return x.id===id;});if(!g)return;setTitle(g.name,'Select a workspace to open its records and management tools.');
var html='<button class="sp-back" id="spBackHome">← Back to dashboard</button><div class="sp-hero" style="background:linear-gradient(120deg,#18365f,#2859a8,#6557b8)"><div class="sp-eyebrow" style="color:#d5e2ff">DEPARTMENT</div><h2>'+g.icon+' '+g.name+'</h2><p>'+g.items.length+' workspaces organised for your school.</p></div><div class="sp-card-grid" style="margin-top:13px">';
g.items.forEach(function(m){html+='<button class="sp-module-card" data-open="'+m[0]+'"><span class="sp-card-icon" style="background:#edf3ff">'+g.icon+'</span><strong>'+m[1]+'</strong><small>'+m[2]+'</small><span class="sp-chip">Open workspace →</span></button>';});
$('spPage').innerHTML=html+'</div>';$('spBackHome').onclick=renderHome;
$('spPage').querySelectorAll('[data-open]').forEach(function(b){b.onclick=function(){openModule(b.dataset.open);};});
}
function openLegacy(id,button){
setActive(button||document.querySelector('[data-legacy="'+id+'"]'));$('spGlobalHub').classList.add('hidden');
var nav=document.querySelector('.tabs');if(nav)nav.classList.remove('hidden');document.querySelectorAll('.pane').forEach(function(p){p.classList.add('hidden');});
var pane=$(id);if(pane)pane.classList.remove('hidden');if(typeof showTab==='function'){var tab=document.querySelector('.tab[data-tab="'+id+'"]');if(tab)showTab(id,tab);}
var back=$('spReturnHub');if(!back){back=document.createElement('button');back.id='spReturnHub';back.className='sp-btn alt no-print';back.textContent='← Back to Global Dashboard';if(pane)pane.parentElement.insertBefore(back,pane);}
back.onclick=function(){document.querySelectorAll('.pane').forEach(function(p){p.classList.add('hidden');});if(nav)nav.classList.add('hidden');$('spGlobalHub').classList.remove('hidden');back.remove();renderHome();};
}
function findModule(key){for(var i=0;i<groups.length;i++){var m=groups[i].items.find(function(x){return x[0]===key;});if(m)return {group:groups[i],module:m};}return null;}
function openModule(key,button){
var found=findModule(key);if(!found)return;setActive(button||document.querySelector('[data-module="'+key+'"]'));
var m=found.module,fields=m[3];setTitle(m[1],m[2]);
var html='<button class="sp-back" id="spBackGroup">← Back to '+found.group.name+'</button><div class="sp-notice">This workspace stores school-scoped records in the protected ShulePro module workspace. Dedicated approvals, country-specific rules and specialised workflows can be expanded without changing your existing student, marks, attendance, timetable or subscription data.</div><form id="spRecordForm" class="sp-form">';
fields.forEach(function(f,i){html+='<div class="'+(i===fields.length-1&&fields.length%2?'sp-wide':'')+'"><label>'+esc(f)+'<input name="field'+i+'" placeholder="'+esc(f)+'" '+(/date/i.test(f)?'type="date"':'type="text"')+' '+(i===0?'required':'')+'></label></div>';});
html+='<div class="sp-wide"><button class="sp-btn" type="submit">＋ Save record</button> <button class="sp-btn alt" type="reset">Clear form</button></div></form><div class="sp-section-head"><div><h3>Saved records</h3><p>Records are scoped to the signed-in school.</p></div><button class="sp-btn alt" id="spRefresh">↻ Refresh</button></div><div id="spRecords" class="sp-records">Loading records…</div>';
$('spPage').innerHTML=html;$('spBackGroup').onclick=function(){renderGroup(found.group.id);};$('spRefresh').onclick=function(){loadRecords(key);};
$('spRecordForm').onsubmit=async function(e){e.preventDefault();var form=new FormData(e.currentTarget),payload={};fields.forEach(function(f,i){payload[f]=String(form.get('field'+i)||'').trim();});var title=String(Object.values(payload)[0]||m[1]).slice(0,200);
var result=await db.from('school_module_records').insert({school_id:currentSchoolId,module_key:key,record_type:'record',title:title,payload:payload,created_by:currentUser&&currentUser.id});
if(result.error){$('spRecords').innerHTML='<div class="sp-notice">Could not save record: '+esc(result.error.message)+'. Your account may have view-only access for this module.</div>';return;}e.currentTarget.reset();loadRecords(key);};
loadRecords(key);
}
async function loadRecords(key){
var box=$('spRecords');if(!box)return;box.textContent='Loading records…';
var result=await db.from('school_module_records').select('id,title,payload,status,created_at').eq('school_id',currentSchoolId).eq('module_key',key).order('created_at',{ascending:false}).limit(100);
if(result.error){box.innerHTML='<div class="sp-notice">Unable to load records: '+esc(result.error.message)+'</div>';return;}
var rows=result.data||[];if(!rows.length){box.innerHTML='<div class="sp-notice" style="background:#f4f7fb;border-color:#e2e8f0;color:#53647d">No records have been added to this workspace yet.</div>';return;}
box.innerHTML=rows.map(function(r){var extra=Object.entries(r.payload||{}).filter(function(x){return x[1];}).slice(1,4).map(function(x){return x[0]+': '+x[1];}).join(' · ');return '<article class="sp-record"><div><strong>'+esc(r.title)+'</strong><small>'+esc(extra||r.status)+' · '+esc(new Date(r.created_at).toLocaleDateString())+'</small></div><button class="sp-btn danger" data-delete="'+r.id+'">Delete</button></article>';}).join('');
box.querySelectorAll('[data-delete]').forEach(function(b){b.onclick=async function(){if(!confirm('Delete this record?'))return;var del=await db.from('school_module_records').delete().eq('id',b.dataset.delete).eq('school_id',currentSchoolId);if(del.error){alert('Delete failed: '+del.error.message);return;}loadRecords(key);};});
}
function init(){
style();var original=window.startApp;if(typeof original==='function'&&!original.__spWrapped){var wrapped=async function(user){await original(user);setTimeout(function(){if(currentSchoolId&&$('app')&&!$('app').classList.contains('hidden'))createHub();},0);};wrapped.__spWrapped=true;window.startApp=wrapped;}
if(currentSchoolId&&$('app')&&!$('app').classList.contains('hidden'))createHub();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();