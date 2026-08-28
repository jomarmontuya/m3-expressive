#!/bin/bash
# Task 4-c QA: temporary dev server (port 3100) + agent-browser sweep, all in ONE session.
cd /home/z/my-project
ab() { agent-browser "$@"; }

bunx next dev -p 3100 > dev-4c.log 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT

code=000
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3100/ --max-time 5)
  [ "$code" = "200" ] && break
  sleep 2
done
echo "SERVER_UP_HTTP:$code"

FABSEL='[data-testid="docked-fab-stage-screen"] button[aria-haspopup="menu"]'
BARSEL='[data-testid="docked-fab-stage-bar"] button[aria-haspopup="menu"]'

radii() { # $1 = selector
  ab eval "(() => { const el = document.querySelector('$1'); if (!el) return 'NO_FAB'; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); const st = el.closest('[data-testid]'); const acts = st ? st.querySelectorAll('button[aria-label]:not([aria-haspopup=\"menu\"])').length : -1; return JSON.stringify({br: cs.borderRadius, bbl: cs.borderBottomLeftRadius, bbr: cs.borderBottomRightRadius, btl: cs.borderTopLeftRadius, btr: cs.borderTopRightRadius, expanded: el.getAttribute('aria-expanded'), pos: cs.position, actions: acts, fabBottom: Math.round(r.bottom), ctxBottom: st ? Math.round(st.getBoundingClientRect().bottom) : -1}); })()"
}

echo "=== OPEN PAGE ==="
ab open "http://127.0.0.1:3100/#/component/fab-menu" || exit 1
ab wait --load networkidle
ab wait 2500
echo "=== PAGE ERRORS (after load) ==="
ab errors

echo "=== SCREEN STAGE: CLOSED RADII ==="
radii "$FABSEL"

echo "=== CLICK SCREEN DOCKED FAB (real pointer) ==="
ab find first "$FABSEL" click
ab wait 1000

echo "=== SCREEN STAGE: OPEN RADII + CASCADE ==="
radii "$FABSEL"

echo "=== SCROLL INTO VIEW + SCREENSHOT (both stages, screen open) ==="
ab eval "document.querySelector('[data-testid=\"docked-fab-stage-screen\"]').scrollIntoView({block:'center'})"
ab wait 800
ab find first "$BARSEL" click
ab wait 1000
echo "=== BAR STAGE: OPEN RADII + CASCADE ==="
radii "$BARSEL"
ab screenshot /home/z/my-project/tool-results/fab-menu-docked.png

echo "=== ESCAPE CLOSES (screen stage) ==="
ab press Escape
ab wait 800
radii "$FABSEL"
echo "=== BAR STAGE AFTER ESCAPE (outside-press/Escape closes both) ==="
radii "$BARSEL"

echo "=== VERTICAL (floating) DEMO STILL WORKS ==="
ab eval "(() => { const btns=[...document.querySelectorAll('button[aria-haspopup=\"menu\"]')].filter(b=>!b.closest('[data-testid]')); const v=btns[0]; v.scrollIntoView({block:'center'}); return 'floating_fabs_not_in_stages:'+btns.length; })()"
ab wait 500
ab find first 'button[aria-haspopup="menu"]' click
ab wait 900
ab eval "(() => { const labels=[...document.querySelectorAll('span')].filter(s=>['Camera','Gallery','Voice note'].includes(s.textContent) && s.className.includes('bg-m3-inverse-surface')); return JSON.stringify({floatingLabelsVisible: labels.length}); })()"
ab press Escape
ab wait 600
ab eval "(() => { const labels=[...document.querySelectorAll('span')].filter(s=>['Camera','Gallery','Voice note'].includes(s.textContent) && s.className.includes('bg-m3-inverse-surface')); return JSON.stringify({floatingLabelsAfterEscape: labels.length}); })()"

echo "=== FINAL PAGE ERRORS ==="
ab errors
echo "=== DEV LOG TAIL (4c server) ==="
tail -6 dev-4c.log
