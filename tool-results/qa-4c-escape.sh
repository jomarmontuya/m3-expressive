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
agent-browser open "http://127.0.0.1:3100/#/component/fab-menu" >/dev/null
agent-browser wait --load networkidle >/dev/null
agent-browser wait 2000 >/dev/null
agent-browser eval "(() => { const btns=[...document.querySelectorAll('button[aria-haspopup=\"menu\"]')].filter(b=>!b.closest('[data-testid]')); btns[0].scrollIntoView({block:'center'}); return 'floating_fabs:'+btns.length; })()"
agent-browser wait 400 >/dev/null
agent-browser find first 'button[aria-haspopup="menu"]' click
agent-browser wait 1200 >/dev/null
echo "VERTICAL OPEN STATE:"
agent-browser eval "(() => { const btns=[...document.querySelectorAll('button[aria-haspopup=\"menu\"]')].filter(b=>!b.closest('[data-testid]')); const chips=[...document.querySelectorAll('span.bg-m3-inverse-surface')].filter(s=>!s.closest('[data-testid]')); return JSON.stringify({expanded: btns[0].getAttribute('aria-expanded'), chips: chips.map(c=>c.textContent)}); })()"
agent-browser press Escape
agent-browser wait 1500 >/dev/null
echo "VERTICAL AFTER ESCAPE:"
agent-browser eval "(() => { const btns=[...document.querySelectorAll('button[aria-haspopup=\"menu\"]')].filter(b=>!b.closest('[data-testid]')); const chips=[...document.querySelectorAll('span.bg-m3-inverse-surface')].filter(s=>!s.closest('[data-testid]')); return JSON.stringify({expanded: btns[0].getAttribute('aria-expanded'), chips: chips.map(c=>c.textContent)}); })()"
echo "PAGE ERRORS FINAL:"
agent-browser errors
