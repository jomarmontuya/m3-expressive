#!/bin/bash
cd /home/z/my-project
bunx next dev -p 3100 > dev-4c.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3100/ --max-time 5)
  [ "$code" = "200" ] && break; sleep 2
done
echo "SERVER_UP_HTTP:$code"
echo "--- registry api ---"
curl -s "http://127.0.0.1:3100/api/registry?summary=true" --max-time 20 | head -c 200; echo
agent-browser open "http://127.0.0.1:3100/#/component/fab-menu" >/dev/null
agent-browser wait --load networkidle >/dev/null
agent-browser wait 2000 >/dev/null
echo "--- closed screen FAB horizontal centering (stage w=192 -> center ~96) ---"
agent-browser eval "(() => { const st=document.querySelector('[data-testid=\"docked-fab-stage-screen\"]').getBoundingClientRect(); const f=document.querySelector('[data-testid=\"docked-fab-stage-screen\"] button[aria-haspopup=\"menu\"]').getBoundingClientRect(); return JSON.stringify({stageCenter: Math.round(st.left+st.width/2), fabCenter: Math.round(f.left+f.width/2), fabFlushBottom: Math.round(st.bottom-f.bottom)}); })()"
echo "--- open BAR row: action FABs sit left of main FAB, all flush on bar top ---"
agent-browser eval "document.querySelector('[data-testid=\"docked-fab-stage-bar\"] button[aria-haspopup=\"menu\"]').scrollIntoView({block:'center'})"
agent-browser wait 400 >/dev/null
agent-browser find first '[data-testid="docked-fab-stage-bar"] button[aria-haspopup="menu"]' click
agent-browser wait 1200 >/dev/null
agent-browser eval "(() => { const st=document.querySelector('[data-testid=\"docked-fab-stage-bar\"]'); const main=st.querySelector('button[aria-haspopup=\"menu\"]').getBoundingClientRect(); const acts=[...st.querySelectorAll('button[aria-label]')].filter(b=>!b.closest('[class*=\"h-12\"]') && b.getAttribute('aria-haspopup')!=='menu').map(b=>Math.round(b.getBoundingClientRect().left)); const bar=st.lastElementChild.getBoundingClientRect(); return JSON.stringify({mainFabLeft: Math.round(main.left), actionLefts: acts, barTop: Math.round(bar.top), mainFabBottom: Math.round(main.bottom)}); })()"
echo "--- HORIZONTAL floating demo cascade ---"
agent-browser press Escape; agent-browser wait 1200 >/dev/null
agent-browser eval "(() => { const cols=[...document.querySelectorAll('span.md-label-medium')].filter(s=>s.textContent==='Horizontal'); return 'col_found:'+cols.length; })()"
agent-browser find text "Invite" click 2>/dev/null || agent-browser eval "(() => { const b=[...document.querySelectorAll('button[aria-label=\"Invite\"]')][0]; b.closest('[data-testid]') ? null : b.click(); return 'clicked_invite_floating'; })()"
agent-browser wait 1000 >/dev/null
agent-browser eval "(() => { const chips=[...document.querySelectorAll('span.bg-m3-inverse-surface')].filter(s=>['Invite','New group'].includes(s.textContent) && !s.closest('[data-testid]')); const btn=[...document.querySelectorAll('button[aria-haspopup=\"menu\"]')].filter(b=>!b.closest('[data-testid]'))[1]; return JSON.stringify({expanded: btn.getAttribute('aria-expanded'), chips: chips.map(c=>c.textContent)}); })()"
echo "PAGE ERRORS:"; agent-browser errors
