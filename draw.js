import { T, W, H, EVK, EVL } from './templates'

export const E = (ov, tid, id) => ({ ...T[tid].els.find(e => e.id === id), ...(ov[tid]?.[id] || {}) })
const U = s => s.toUpperCase()
const j = (...a) => a.filter(x => x && x.trim()).join(', ')
const parse = v => { const d = v ? new Date(v + 'T00:00:00') : null; return d && !isNaN(d) ? d : null }
const fmtT = v => { if (!v) return ''; const [h, m] = v.split(':').map(Number); return `${(h % 12) || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }
const ld = v => { const d = parse(v); return d ? `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'long' })} ${d.getFullYear()}` : '' }
const dparts = v => { const d = parse(v); return d ? [d.toLocaleDateString('en-US', { month: 'long' }), String(d.getDate()), String(d.getFullYear())] : ['', '', ''] }
const evList = F => [['nikkah', F.nk], ...EVK.map(k => [k, F.ev[k].on])].filter(x => x[1]).map(x => x[0])
function evData(F, k) {
  if (k === 'nikkah') return { date: F.date, day: F.day, time: F.time, venue: F.venue, vaddr: F.vaddr }
  const e = F.ev[k], d = parse(e.date)
  return { date: e.date, day: d ? d.toLocaleDateString('en-US', { weekday: 'long' }) : '', time: e.time, venue: e.venue || F.venue, vaddr: e.vaddr || F.vaddr }
}

function txt(F, ov, tid, e) {
  const o = ov[tid]?.[e.id]
  if (o && o.text) return o.text
  const t = T[tid], M = evData(F, evList(F)[0] || 'nikkah')
  if (e.sub) return e.sub
  switch (e.id) {
    case 'bism': return F.bism ? '1' : ''
    case 'head': return F.head.trim() || t.head
    case 'gname': return F.gn
    case 'bname': return F.bn
    case 'amp': return t.am || '&'
    case 'msg': return F.msg
    case 'ginfo': case 'binfo': {
      const g = e.id === 'ginfo', p = g ? 'S/O' : 'D/O'
      const f = g ? F.gf : F.bf, m = g ? F.gm : F.bm, h = g ? F.gh : F.bh, pl = g ? F.gp : F.bp
      const l1 = (f || m) ? `${p} ${[f, m].filter(Boolean).join(' AND ')}` : ''
      return t.three ? [l1, h, pl].filter(Boolean).join('\n') : [l1, j(h, pl)].filter(Boolean).join('\n')
    }
    case 'events': return evList(F).slice(1).map(k => {
      const d = evData(F, k)
      return [[(EVL[k] || k).toUpperCase(), ld(d.date), fmtT(d.time)].filter(Boolean).join(' · '), j(d.venue, d.vaddr)].filter(Boolean).join('\n')
    }).join('\n\n')
    case 'time': return [M.day, fmtT(M.time)].filter(Boolean).join('\n')
    case 'venue': return [M.venue && M.vaddr ? M.venue + ',' : M.venue, M.vaddr].filter(Boolean).join('\n')
    case 'date': {
      const d = dparts(M.date)
      if (t.dfmt && d[1]) {
        const n = +d[1], o = (n % 10 === 1 && n !== 11) ? 'st' : (n % 10 === 2 && n !== 12) ? 'nd' : (n % 10 === 3 && n !== 13) ? 'rd' : 'th'
        return `${n}${o} ${d[0]}, ${d[2]}`
      }
      return d.join('\n')
    }
  }
  return ''
}

const TINT = {}
function tinted(im, key, col) {
  if (TINT[key + col]) return TINT[key + col]
  const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight
  const x = c.getContext('2d'); x.drawImage(im, 0, 0)
  x.globalCompositeOperation = 'source-in'; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height)
  return (TINT[key + col] = c)
}
const outline = (c, x, y, w, h) => { c.save(); c.strokeStyle = '#d4a63a'; c.lineWidth = 3; c.setLineDash([10, 7]); c.strokeRect(x - 8, y - 4, w + 16, h + 8); c.restore() }

/** Paints one invitation onto `cv` at scale k. Returns hit boxes keyed by element id. */
export function draw(cv, { tid, k, sel, F, ov, bg, cal }) {
  const c = cv.getContext('2d'); cv.width = W * k; cv.height = H * k; c.setTransform(k, 0, 0, k, 0, 0)
  const back = bg[T[tid].bg]; if (back && back.complete) c.drawImage(back, 0, 0, W, H)
  const boxes = {}
  for (const b of T[tid].els) {
    const e = E(ov, tid, b.id); let t = txt(F, ov, tid, e); if (!t) continue
    const custom = ov[tid]?.[e.id]?.text
    if (e.img) {
      const im = cal[tid]; if (!im || !im.complete) continue
      const sc = e.s / 100, w = im.naturalWidth * sc, h = im.naturalHeight * sc
      c.drawImage(e.c ? tinted(im, tid, e.c) : im, e.x - w / 2, e.y - h / 2, w, h)
      boxes[b.id] = [e.x - w / 2, e.y - h / 2, e.x + w / 2, e.y + h / 2]
      if (sel === b.id) outline(c, e.x - w / 2, e.y - h / 2, w, h)
      continue
    }
    if (e.u && !e.ar) t = U(t)
    c.save(); c.fillStyle = e.c; c.textAlign = e.a; c.textBaseline = 'middle'; c.direction = e.ar ? 'rtl' : 'ltr'
    if ('letterSpacing' in c) c.letterSpacing = (e.ls || 0) + 'px'
    const L = t.split('\n'); let es = e.s
    if (e.id === 'events' && !custom) es = Math.min(e.s, (H - 60 - e.y) / (L.length * e.lh))
    let bx = 1e9, by = 1e9, bX = 0, bY = 0
    const isD = e.date && !custom
    L.forEach((ln, i) => {
      let s = es, y = e.y + i * es * e.lh
      if (isD) { y = e.y + T[tid].dy[i] * e.s / 26; if (i === 1) s = e.s * 2.15 }
      c.font = `${e.w} ${s}px "${e.f}"`
      if (e.ar || e.maxw) { const m = c.measureText(ln).width, L2 = e.maxw || W - 80; if (m > L2) { s *= L2 / m; c.font = `${e.w} ${s}px "${e.f}"` } }
      c.fillText(ln, e.x, y)
      const w = c.measureText(ln).width, x0 = e.a === 'left' ? e.x : e.a === 'right' ? e.x - w : e.x - w / 2
      bx = Math.min(bx, x0); bX = Math.max(bX, x0 + w); by = Math.min(by, y - s * .6); bY = Math.max(bY, y + s * .6)
    })
    c.restore(); boxes[b.id] = [bx, by, bX, bY]
    if (sel === b.id) outline(c, bx, by, bX - bx, bY - by)
  }
  return boxes
}
