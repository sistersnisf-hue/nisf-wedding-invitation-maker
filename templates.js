import bgt1 from './assets/bg-t1.jpg'
import calt1 from './assets/cal-t1.png'
import bgt2 from './assets/bg-t2.jpg'
import calt2 from './assets/cal-t2.png'
import bgt3 from './assets/bg-t3.jpg'
import calt3 from './assets/cal-t3.png'
import bgt4 from './assets/bg-t4.jpg'
import calt4 from './assets/cal-t4.png'
import bgt5 from './assets/bg-t5.jpg'
import calt5 from './assets/cal-t5.png'
import bgt6 from './assets/bg-t6.jpg'
import calt6 from './assets/cal-t6.png'

export const W=1240,H=1748
export const BGSRC={t1:bgt1,t2:bgt2,t3:bgt3,t4:bgt4,t5:bgt5,t6:bgt6}
export const CALSRC={t1:calt1,t2:calt2,t3:calt3,t4:calt4,t5:calt5,t6:calt6}
const CAL={"t1": {"cx": 475, "cy": 477, "w": 369, "h": 121, "col": "#c4a070"}, "t2": {"cx": 620, "cy": 412, "w": 386, "h": 129, "col": "#c4a070"}, "t3": {"cx": 621, "cy": 349, "w": 518, "h": 134, "col": "#563620"}, "t4": {"cx": 620, "cy": 481, "w": 516, "h": 133, "col": "#7f6680"}, "t5": {"cx": 652, "cy": 438, "w": 562, "h": 138, "col": "#ffffff"}, "t6": {"cx": 620, "cy": 426, "w": 584, "h": 124, "col": "#ffffff"}}
const CG='Cormorant Garamond',PS='Pinyon Script',CD='Cinzel Decorative',CZ='Cinzel',AR='Aref Ruqaa',AM='Amiri',GV='Great Vibes',PF='Playfair Display';
const FONTS=[CG,CZ,CD,PS,GV,PF,AR,AM];
const BISM='بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',DUA='بارك الله لكما وبارك عليكما وجمع بينكما في خير';
const HD2='WE CORDIALLY INVITE YOU TO GRACE THE AUSPICIOUS\nOCCASION OF THE NIKKAH OF OUR BELOVED SON';
const el=(id,l,o)=>({id,l,...o});
const cm=(x,y,s,c,o={})=>({x,y,s,c,f:CG,a:'center',ls:0,lh:1.3,w:400,...o});
const T={
t1:{n:'Burgundy Arch',bg:'t1',head:'YOU ARE CORDIALLY INVITED TO JOIN\nUS FOR THE WEDDING CEREMONY OF',dfmt:1,els:[
 el('bism','Arabic calligraphy',cm(478,482,60,'#c9a57a',{f:AR,ar:1,lh:1})),el('head','Heading',cm(475,583,28,'#f1d8c4',{w:700,u:1,lh:1.5,ls:.5})),
 el('gname','Groom name',cm(80,780,115,'#ffd9c4',{f:PS,a:'left',lh:1})),el('ginfo','Groom family',cm(80,863,24,'#f1d8c4',{a:'left',u:1,lh:1.3})),
 el('amp','“&”',cm(335,990,100,'#f1d8c4',{f:PS,lh:1})),el('bname','Bride name',cm(260,1150,115,'#ffd9c4',{f:PS,a:'left',lh:1})),
 el('binfo','Bride family',cm(583,1235,24,'#f1d8c4',{a:'right',u:1,lh:1.3})),
 el('dl','Date label',cm(800,1166,30,'#4a1519',{a:'left',w:700,u:1,sub:'DATE'})),el('date','Date',cm(795,1210,38,'#6b4a2a',{a:'left',w:700})),
 el('tl','Day label',cm(814,1329,30,'#4a1519',{a:'left',w:700,u:1,sub:'DAY'})),el('time','Day & time',cm(806,1368,38,'#6b4a2a',{a:'left',w:700,lh:1.1})),
 el('vl','Venue label',cm(808,1502,30,'#4a1519',{a:'left',w:700,u:1,sub:'VENUE'})),el('venue','Venue',cm(794,1547,30,'#6b4a2a',{a:'left',w:700,lh:1.3})),
 el('msg','Extra message',cm(305,1450,24,'#f1d8c4',{lh:1.35}))]},
t2:{n:'Burgundy Tulips',bg:'t2',head:'WE ARE CORDIALLY INVITE YOU TO GRACE THE\nAUSPICIOUS OCCASION OF THE NIKKAH OF OUR\nBELOVED SON',dy:[0,41,77],am:'AND',els:[
 el('bism','Arabic calligraphy',cm(620,410,70,'#c7a77a',{f:AR,ar:1,lh:1})),el('head','Heading',cm(620,548,26,'#ecd2c4',{ls:.5})),
 el('gname','Groom name',cm(335,745,105,'#c4a070',{f:PS,a:'left',lh:1})),el('ginfo','Groom family',cm(350,821,24,'#ecd2c4',{a:'left',u:1})),
 el('amp','“And”',cm(585,925,38,'#f0d6c8',{a:'left',u:1})),el('bname','Bride name',cm(640,1000,105,'#c4a070',{f:PS,a:'left',lh:1})),
 el('binfo','Bride family',cm(972,1080,24,'#ecd2c4',{a:'right',u:1})),el('date','Date',cm(466,1236,26,'#f0d6c8',{w:700,date:1,u:1})),
 el('time','Day & time',cm(600,1260,27,'#f0d6c8',{a:'left',w:700,u:1,lh:1.35})),el('venue','Venue',cm(783,1260,25,'#f0d6c8',{a:'left',w:700,u:1,lh:1.35})),
 el('msg','Extra message',cm(620,1480,24,'#ecd2c4',{lh:1.35}))]},
t3:{n:'Brown Linen',bg:'t3',head:HD2,dy:[0,40,85],three:1,els:[
 el('bism','Arabic calligraphy',cm(620,350,80,'#5a3a28',{f:AR,ar:1,lh:1})),el('head','Heading',cm(620,453,27,'#5a3a28',{w:700,lh:1.35,u:1})),
 el('gname','Groom name',cm(530,850,62,'#5a3a28',{a:'right',f:CG,w:700,u:1,ls:3,lh:1})),el('ginfo','Groom family',cm(150,935,23,'#5a3a28',{a:'left',w:700,u:1,lh:1.45})),
 el('bname','Bride name',cm(770,850,62,'#5a3a28',{a:'left',f:CG,w:700,u:1,ls:3,lh:1})),el('binfo','Bride family',cm(1160,930,23,'#5a3a28',{a:'right',w:700,u:1,lh:1.45})),
 el('date','Date',cm(417,1180,26,'#5a3a28',{w:700,date:1,u:1})),el('time','Day & time',cm(605,1206,26,'#5a3a28',{a:'left',w:700,u:1,lh:1.5})),
 el('venue','Venue',cm(832,1205,24,'#5a3a28',{a:'left',w:700,u:1,lh:1.5})),el('msg','Extra message',cm(620,1400,26,'#5a3a28',{lh:1.35}))]},
t4:{n:'Lilac Calligraphy',bg:'t4',head:HD2,dy:[0,43,86],els:[
 el('bism','Arabic calligraphy',cm(620,480,80,'#744a6e',{f:AR,ar:1,lh:1})),el('head','Heading',cm(635,595,27,'#744a6e',{w:700,lh:1.33,u:1})),
 el('gname','Groom name',cm(290,820,84,'#744a6e',{a:'left',f:CD,u:1,lh:1})),el('ginfo','Groom family',cm(305,901,25,'#744a6e',{a:'left',u:1})),
 el('amp','“&”',cm(640,1035,110,'#744a6e',{f:PS,lh:1})),el('bname','Bride name',cm(590,1170,84,'#744a6e',{a:'left',f:CD,u:1,lh:1})),
 el('binfo','Bride family',cm(956,1253,25,'#744a6e',{a:'right',u:1})),el('date','Date',cm(384,1397,26,'#744a6e',{w:700,date:1,u:1})),
 el('time','Day & time',cm(568,1425,27,'#744a6e',{a:'left',w:700,u:1,lh:1.4})),el('venue','Venue',cm(794,1425,25,'#744a6e',{a:'left',w:700,u:1,lh:1.4})),
 el('msg','Extra message',cm(620,1620,26,'#744a6e',{lh:1.35}))]},
t5:{n:'Olive Arch',bg:'t5',head:HD2,dy:[0,35,73],els:[
 el('bism','Arabic calligraphy',cm(655,440,82,'#ffffff',{f:AR,ar:1,lh:1})),el('sub','Sub-heading',cm(615,541,32,'#ffffff',{lh:1.95,u:1,ls:1,sub:'IN THE NAME OF ALLAH\nTHE MOST GRACIOUS & THE MOST MERCIFUL'})),
 el('head','Heading',cm(650,702,28,'#ffffff',{lh:1.25,u:1})),el('gname','Groom name',cm(208,920,82,'#ffffff',{a:'left',f:CZ,u:1,ls:14,lh:1,w:400})),
 el('ginfo','Groom family',cm(226,995,24,'#ffffff',{a:'left',u:1})),el('amp','“&”',cm(650,1135,140,'#ffffff',{f:PS,lh:1})),
 el('bname','Bride name',cm(625,1265,82,'#ffffff',{a:'left',f:CZ,u:1,ls:14,lh:1})),el('binfo','Bride family',cm(1057,1333,24,'#ffffff',{a:'right',u:1})),
 el('date','Date',cm(430,1455,26,'#ffffff',{w:700,date:1,u:1})),el('time','Day & time',cm(593,1477,26,'#ffffff',{a:'left',w:700,u:1,lh:1.35})),
 el('venue','Venue',cm(791,1477,24,'#ffffff',{a:'left',w:700,u:1,lh:1.35})),el('msg','Extra message',cm(650,1620,26,'#ffffff',{lh:1.35}))]},
t6:{n:'Emerald Flame',bg:'t6',head:HD2,dy:[0,40,85],els:[
 el('bism','Arabic calligraphy',cm(620,425,50,'#ffffff',{f:AR,ar:1,lh:1,dua:1})),el('head','Heading',cm(634,595,27,'#ffffff',{w:700,lh:1.33,u:1})),
 el('gname','Groom name',cm(615,762,88,'#ffffff',{f:CD,u:1,lh:1})),el('ginfo','Groom family',cm(630,841,24,'#ffffff',{u:1,lh:1.4})),
 el('amp','“&”',cm(628,958,95,'#ffffff',{f:PS,lh:1})),el('bname','Bride name',cm(625,1052,88,'#ffffff',{f:CD,u:1,lh:1})),
 el('binfo','Bride family',cm(616,1127,24,'#ffffff',{u:1,lh:1.4})),el('date','Date',cm(380,1330,26,'#ffffff',{w:700,date:1,u:1})),
 el('time','Day & time',cm(568,1356,27,'#ffffff',{a:'left',w:700,u:1,lh:1.4})),el('venue','Venue',cm(794,1355,25,'#ffffff',{a:'left',w:700,u:1,lh:1.4})),
 el('msg','Extra message',cm(620,1560,26,'#ffffff',{lh:1.35}))]}
};
for(const k in CAL){const b=T[k].els.find(e=>e.id=='bism');Object.assign(b,{x:CAL[k].cx,y:CAL[k].cy,s:100,c:null,img:1,l:'Bismillah (original calligraphy)'})}
const EVP={t1:[305,1400,22,'#f1d8c4',1610],t2:[620,1375,20,null,1545],t3:[620,1340,24,null,1480],t4:[620,1560,24,null,1670],t5:[650,1590,22,null,1675],t6:[620,1500,22,null,1620]};
for(const k in EVP){const[x,y,sz,c,my]=EVP[k],v=T[k].els.find(e=>e.id=='venue');T[k].els.push(el('events','Other events',cm(x,y,sz,c||v.c,{u:1,w:700,lh:1.4,ls:.5,maxw:{t1:500,t2:540}[k]||1000})));T[k].els.find(e=>e.id=='msg').y=my}

export const EVK=['mehendi','haldi','engagement','reception']
export const EVL={nikkah:'Nikkah',mehendi:'Mehendi',haldi:'Haldi',engagement:'Engagement',reception:'Wedding Reception'}
export {T,FONTS,CAL}
