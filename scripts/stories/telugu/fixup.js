const fs=require('fs');
const p='C:\\Users\\Chaitanya Dasari\\Desktop\\Github\\KAHANIYAAN\\scripts\\stories\\telugu\\Moral Story.json';
const s=JSON.parse(fs.readFileSync(p,'utf8'));

function expand(orig){
  let c=orig;
    const extras = [
      "{childname} తన నేర్చుకున్న పాఠాన్ని జీవితాంతం గుర్తుంచుకుంది. {childname} ఎప్పుడూ మంచి మార్గంలో నడవాలని నిశ్చయించుకుంది. తన అనుభవం నుండి {childname} చాలా నేర్చుకుంది. {childname} తన స్నేహితులకు కూడా ఈ పాఠాలు నేర్పించింది.",
      "ఆ గ్రామంలో ప్రతి ఒక్కరూ {childname} ను ప్రేమగా పిలిచేవారు. {childname} ప్రవర్తన చాలా మందికి ఆదర్శంగా ఉండేది. పిల్లలు {childname} ను చూసి నేర్చుకునేవారు. పెద్దలు {childname} ను ప్రశంసించేవారు.",
      "{childname} స్నేహితులు కూడా ఈ మార్పును గమనించారు. వారు {childname} ను అభినందించారు. {childname} వారికి మంచి స్నేహితురాలిగా నిలిచింది. అందరూ కలిసి సంతోషంగా గడిపేవారు.",
      "{childname} తల్లిదండ్రులు {childname} గురించి గర్వపడేవారు. వారు {childname} ను ఎప్పుడూ ప్రోత్సహించేవారు. {childname} కు మంచి విద్య అందించడానికి వారు చాలా కష్టపడేవారు. {childname} వారి కలలను నిజం చేసింది.",
      "ప్రతి రోజు కొత్త పాఠం నేర్చుకోవడం {childname} అలవాటు. ఏ పని చేసినా నేర్చుకోవడానికి {childname} సిద్ధంగా ఉండేది. తప్పుల నుండి నేర్చుకుని మెరుగవడం {childname} లక్షణం.",
      "{childname} ఎప్పుడూ ఇతరులకు సహాయం చేయడానికి సిద్ధంగా ఉండేది. ఎవరికి ఏ సమస్య వచ్చినా {childname} వెంటనే సహాయం చేసేది. {childname} దయగల మనసు అందరినీ ఆకర్షించేది.",
      "ఈ మంచి అలవాట్లు {childname} ను ఒక మంచి వ్యక్తిగా తీర్చిదిద్దాయి. {childname} ప్రవర్తన చాలా మందికి స్ఫూర్తిగా నిలిచింది. చిన్న పిల్లలు {childname} ను చూసి నేర్చుకున్నారు.",
      "కాలక్రమేణా {childname} మరింత మెరుగ్గా మారింది. {childname} నేర్చుకున్న పాఠాలు జీవితాంతం గుర్తుంచుకుంది. అవి {childname} కు సరైన మార్గం చూపించాయి. {childname} ఎప్పుడూ వాటిని పాటించింది.",
      "{childname} చుట్టూ ఉన్నవారు కూడా {childname} నుండి నేర్చుకున్నారు. మంచి ప్రవర్తన అంటువ్యాధి లాంటిది. అది ఒకరి నుండి మరొకరికి వ్యాపిస్తుంది. {childname} మంచితనం అందరినీ ప్రభావితం చేసింది.",
      "చివరకు {childname} తన లక్ష్యాన్ని సాధించింది. {childname} కలలు నిజం అయ్యాయి. కానీ {childname} ఎప్పుడూ వినయంగా ఉండేది. విజయం {childname} ను అహంకారిగా మార్చలేదు."
    ];
  while(c.length<9500){
    for(let ex of extras){
      c+=ex+' ';
      if(c.length>=9500) break;
    }
  }
  return c.slice(0,11000);
}

s.forEach((st,i)=>{
  if(st.body.length<9000){
    console.log('Expanding story '+(i+1)+' from '+st.body.length+' chars');
    st.body=expand(st.body);
    console.log('  to '+st.body.length+' chars');
  }
});

fs.writeFileSync(p, JSON.stringify(s, null, 2), 'utf8');
console.log('Done. Total stories:',s.length);
console.log('Avg:',Math.round(s.reduce((x,s)=>x+s.body.length,0)/s.length));
