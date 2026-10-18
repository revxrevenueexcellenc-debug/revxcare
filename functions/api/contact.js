// Cloudflare Pages Function: POST /api/contact -> emails the inbox via Resend.
// Pages > Settings > Variables and Secrets: RESEND_API_KEY (secret). Optional: MAIL_TO, MAIL_FROM.
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export async function onRequestPost({request,env}){
  const j=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'Content-Type':'application/json'}});
  let d;try{d=await request.json()}catch{return j({error:'bad request'},400)}
  if(d.website)return j({ok:true});
  const {name,email,phone,organization,role,volume,message}=d;
  if(!name||!message||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email||''))return j({error:'missing fields'},400);
  if(!env.RESEND_API_KEY)return j({error:'not configured'},500);
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({from:env.MAIL_FROM||'revXcare Website <info@revxcare.com>',to:[env.MAIL_TO||'info@revexcar.com'],reply_to:email,
    subject:`New enquiry from ${String(name).slice(0,80)}`,
    html:`<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone)}<br><b>Organisation:</b> ${esc(organization)}<br><b>Role:</b> ${esc(role)}<br><b>Monthly claim volume:</b> ${esc(volume)}</p><p>${esc(message).replace(/\n/g,'<br>')}</p>`})});
  return r.ok?j({ok:true}):j({error:'send failed'},502);
}
