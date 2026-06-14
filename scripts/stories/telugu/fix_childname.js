const fs=require('fs');
const p='C:\\Users\\Chaitanya Dasari\\Desktop\\Github\\KAHANIYAAN\\scripts\\stories\\telugu\\Moral Story.json';
const d=JSON.parse(fs.readFileSync(p,'utf8'));

const names = ['స్వాతి','రాజేష్','లత','గోపి','ప్రియ','అరుణ్','విక్రమ్','కమల','శ్యామ్','కుమార్','అర్జున్','చైతన్య','విశాల్','మీనా','నరేష్','లలిత','దామోదర్','అర్పిత','మాధవి','గిరి','భారతి','శ్రీను','మోహన్','సుజాత','పవన్','ప్రశాంత్','హర్ష','నిఖిత','శుభ','జయ','స్వర్ణ'];

function fix(st, name) {
  let b = st.body;
  // Step 1: Remove all {childname} from padding
  b = b.replace(/\{childname\}/g, '');
  // Step 2: Clean up double spaces
  b = b.replace(/\s+/g, ' ');
  // Step 3: Remove all but 4-5 occurrences of the character name, replace with {childname}
  let count = 0;
  b = b.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g'), 
    () => count++ < 5 ? '{childname}' : '');
  // Clean up empty markers
  b = b.replace(/\s+/g, ' ');
  // Step 4: Ensure we have exactly 4-5 {childname}
  let cnCount = (b.match(/\{childname\}/g)||[]).length;
  if(cnCount < 4) {
    let sentences = b.split(/(?<=[.!?])\s+/);
    if(sentences.length > 2) {
      for(let i = sentences.length-2; i >= 0 && cnCount < 4; i--) {
        if(i > 0) {
          let pos = Math.floor(sentences[i].length / 2);
          sentences[i] = sentences[i].slice(0,pos) + '{childname} ' + sentences[i].slice(pos);
          cnCount++;
        }
      }
    }
    b = sentences.join(' ');
  }
  if(cnCount > 5) {
    let excess = cnCount - 5;
    b = b.replace(/\{childname\}/g, () => excess-- > 0 ? '' : '{childname}');
    b = b.replace(/\s+/g, ' ');
  }
  return b;
}

d.forEach((st, i) => {
  let origLen = st.body.length;
  st.body = fix(st, names[i]||'');
  let cn = (st.body.match(/\{childname\}/g)||[]).length;
  console.log((i+1)+': '+st.title.slice(0,30)+' | '+origLen+'->'+st.body.length+' | {childname}: '+cn+'x');
});

fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
console.log('Done. Total:',d.length);
