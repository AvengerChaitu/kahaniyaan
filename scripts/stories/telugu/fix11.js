const fs=require('fs');
const p='C:\\Users\\Chaitanya Dasari\\Desktop\\Github\\KAHANIYAAN\\scripts\\stories\\telugu\\Moral Story.json';
const d=JSON.parse(fs.readFileSync(p,'utf8'));

// Keep only stories 1-11
while(d.length > 11) d.pop();

const names = ['స్వాతి','రాజేష్','లత','గోపి','ప్రియ','అరుణ్','విక్రమ్','కమల','శ్యామ్','కుమార్','అర్జున్'];

d.forEach((st, idx) => {
  let name = names[idx];
  let b = st.body;
  // Replace first 5 occurrences of name with {childname}
  let count = 0;
  b = b.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g'), 
    function(m) { return count++ < 5 ? '{childname}' : m; });
  st.body = b;
  let cn = (b.match(/\{childname\}/g)||[]).length;
  console.log((idx+1)+' '+st.title.slice(0,25)+' -> {childname}:'+cn+'x');
});

fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
console.log('Kept '+d.length+' stories');
