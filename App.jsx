import { useEffect, useRef, useState } from 'react'
import { jsPDF } from 'jspdf'
import { T, W, H, CAL, BGSRC, CALSRC, FONTS, EVK, EVL } from './templates'
import { draw, E } from './draw'
import './styles.css'

const STEPS = ['Template', 'Groom & bride', 'Date & venue', 'Design', 'Preview', 'Download']
const PEOPLE = [
  ['Groom’s information', [['gn', 'Groom’s name'], ['gf', 'Father’s name'], ['gm', 'Mother’s name'], ['gh', 'Family / house name'], ['gp', 'Place / address']]],
  ['Bride’s information', [['bn', 'Bride’s name'], ['bf', 'Father’s name'], ['bm', 'Mother’s name'], ['bh', 'Family / house name'], ['bp', 'Place / address']]],
]
const EV_TIME = { mehendi: '16:00', haldi: '10:00', engagement: '17:00', reception: '19:00' }
const INIT = {
  nk: true, ev: Object.fromEntries(EVK.map(k => [k, { on: false, date: '', time: EV_TIME[k], venue: '', vaddr: '' }])),
  gn: 'Ali', gf: 'Raheem', gm: 'Rasheeda', gh: 'Valliyath House', gp: 'Koyilandy, Kozhikode',
  bn: 'Hessa', bf: 'Mayan', bm: 'Ramla', bh: 'Manikoth (H)', bp: 'Iringath, Kozhikode',
  date: '2027-07-18', day: 'Sunday', time: '12:00', venue: 'Eventza Convention Centre', vaddr: 'Ulliyeri, Kozhikode',
  head: '', msg: '', bism: true,
}
const dayOf = v => { const d = new Date(v + 'T00:00:00'); return isNaN(d) ? '' : d.toLocaleDateString('en-US', { weekday: 'long' }) }

function useAssets() {
  const [tick, setTick] = useState(0)
  const ref = useRef({ bg: {}, cal: {} })
  useEffect(() => {
    const bump = () => setTick(t => t + 1)
    const load = (store, k, src) => { const i = new Image(); i.onload = bump; i.src = src; store[k] = i }
    Object.entries(BGSRC).forEach(([k, s]) => load(ref.current.bg, k, s))
    Object.entries(CALSRC).forEach(([k, s]) => load(ref.current.cal, k, s))
    Promise.all(FONTS.map(f => document.fonts.load(`40px "${f}"`, 'Aa بسم').catch(() => 0))).then(bump)
  }, [])
  return [ref.current, tick]
}

function Card({ tid, k = 1, sel = null, F, ov, assets, tick, boxesRef, canvasRef, ...rest }) {
  const local = useRef(null), ref = canvasRef || local
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const boxes = draw(ref.current, { tid, k, sel, F, ov, ...assets })
      if (boxesRef) boxesRef.current = boxes
    })
    return () => cancelAnimationFrame(raf)
  }, [tid, k, sel, F, ov, tick])
  return <canvas ref={ref} width={W * k} height={H * k} {...rest} />
}

const Field = ({ id, label, ...p }) => <><label htmlFor={id}>{label}</label><input id={id} {...p} /></>
const Check = ({ id, label, ...p }) => (
  <div className="chk"><input type="checkbox" id={id} {...p} /><label htmlFor={id} style={{ margin: 0, color: 'inherit', fontSize: 15 }}>{label}</label></div>
)

export default function App() {
  const [assets, tick] = useAssets()
  const [tid, setTid] = useState('t1')
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState('gname')
  const [F, setF] = useState(INIT)
  const [ov, setOv] = useState({})
  const [msg, setMsg] = useState('')
  const cvRef = useRef(null), boxesRef = useRef({}), drag = useRef(null)

  const e = E(ov, tid, sel)
  const set = (k, v) => setF(f => ({ ...f, [k]: v, ...(k === 'date' && v ? { day: dayOf(v) } : {}) }))
  const setEv = (k, p) => setF(f => ({ ...f, ev: { ...f.ev, [k]: { ...f.ev[k], ...p } } }))
  const setO = p => setOv(o => ({ ...o, [tid]: { ...o[tid], [sel]: { ...o[tid]?.[sel], ...p } } }))
  const go = n => { setStep(Math.max(0, Math.min(5, n))); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const toggleEv = (k, on) => setF(f => {
    const v = f.ev[k]
    return { ...f, ev: { ...f.ev, [k]: { ...v, on, date: on && !v.date ? f.date : v.date } } }
  })

  // drag text on the card (design step only)
  const pt = ev => {
    const r = cvRef.current.getBoundingClientRect(), sc = Math.min(r.width / W, r.height / H)
    return [(ev.clientX - r.left - (r.width - W * sc) / 2) / sc, (ev.clientY - r.top - (r.height - H * sc) / 2) / sc]
  }
  const down = ev => {
    if (step !== 3) return
    const [x, y] = pt(ev), hit = [...T[tid].els].reverse().find(b => { const q = boxesRef.current[b.id]; return q && x >= q[0] - 12 && x <= q[2] + 12 && y >= q[1] - 8 && y <= q[3] + 8 })
    if (!hit) return
    const cur = E(ov, tid, hit.id)
    setSel(hit.id); drag.current = { x, y, ex: cur.x, ey: cur.y }; cvRef.current.setPointerCapture(ev.pointerId)
  }
  const move = ev => { if (!drag.current) return; const [x, y] = pt(ev), d = drag.current; setO({ x: Math.round(d.ex + x - d.x), y: Math.round(d.ey + y - d.y) }) }
  const up = () => { drag.current = null }

  // export
  const out = () => { const c = document.createElement('canvas'); draw(c, { tid, k: 1, sel: null, F, ov, ...assets }); return c }
  const fname = () => ('wedding-invitation-' + (F.gn + '-' + F.bn).toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '')
  const save = (name, blob) => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); setMsg('Downloaded ' + name)
  }
  const dlPng = () => out().toBlob(b => save(fname() + '.png', b), 'image/png')
  const dlPdf = () => {
    const p = new jsPDF({ unit: 'mm', format: 'a4' })
    p.addImage(out().toDataURL('image/jpeg', .97), 'JPEG', 0, 0, 210, 297)
    save(fname() + '.pdf', p.output('blob'))
  }

  const cardProps = { tid, F, ov, assets, tick }
  return (
    <>
      <div className="top"><b>Nisf</b><a href="https://nisfapp.com/">← Back to nisfapp.com</a></div>
      <div className="hero"><h1>Create Your Wedding Invitation</h1><p>Design a beautiful wedding invitation with your preferred style and details.</p></div>
      <div className="steps">
        {STEPS.map((n, i) => <button key={n} className={(i === step ? 'on ' : '') + (i < step ? 'done' : '')} onClick={() => go(i)}>{i + 1}. {n}</button>)}
      </div>
      <div className={'app' + (step === 3 ? ' s4' : '')}>
        <div className="panel">
          {step === 0 && <div className="pn on"><h2>1. Choose a template</h2><p>Tap a design. You can switch any time and your details stay.</p>
            <div className="tg">{Object.keys(T).map(id => (
              <button key={id} className={id === tid ? 'on' : ''} onClick={() => { setTid(id); setSel('gname') }}>
                <Card {...cardProps} tid={id} k={.2} />{T[id].n}
              </button>))}</div></div>}

          {step === 1 && <div className="pn on"><h2>2. Groom &amp; bride</h2><p>Fill in the family details.</p>
            {PEOPLE.map(([g, fs]) => <fieldset key={g}><legend>{g}</legend>
              {fs.map(([k, l]) => <Field key={k} id={'i_' + k} label={l} type="text" value={F[k]} onChange={ev => set(k, ev.target.value)} />)}
            </fieldset>)}</div>}

          {step === 2 && <div className="pn on"><h2>3. Date, time &amp; venue</h2><p>The day fills in automatically from the date.</p>
            <fieldset><legend>Events to include</legend>
              <Check id="c_nk" label={EVL.nikkah} checked={F.nk} onChange={ev => set('nk', ev.target.checked)} />
              {EVK.map(k => <Check key={k} id={'c_' + k} label={EVL[k]} checked={F.ev[k].on} onChange={ev => toggleEv(k, ev.target.checked)} />)}
              <p style={{ fontSize: 12, color: 'var(--mut)', margin: '4px 0 0' }}>The first ticked event fills the main date / time / venue row. Others are listed on the card with their own details.</p></fieldset>
            <fieldset><legend>Wedding information</legend>
              <Field id="i_date" label="Wedding date" type="date" value={F.date} onChange={ev => set('date', ev.target.value)} />
              <Field id="i_day" label="Day" type="text" value={F.day} onChange={ev => set('day', ev.target.value)} />
              <Field id="i_time" label="Wedding time" type="time" value={F.time} onChange={ev => set('time', ev.target.value)} />
              <Field id="i_venue" label="Venue name" type="text" value={F.venue} onChange={ev => set('venue', ev.target.value)} />
              <Field id="i_vaddr" label="Venue address" type="text" value={F.vaddr} onChange={ev => set('vaddr', ev.target.value)} /></fieldset>
            {EVK.filter(k => F.ev[k].on).map(k => <fieldset key={k}><legend>{EVL[k]} details</legend>
              <Field id={`e_${k}_d`} label="Date" type="date" value={F.ev[k].date} onChange={ev => setEv(k, { date: ev.target.value })} />
              <Field id={`e_${k}_t`} label="Time" type="time" value={F.ev[k].time} onChange={ev => setEv(k, { time: ev.target.value })} />
              <Field id={`e_${k}_v`} label="Venue name (blank = same as main)" type="text" value={F.ev[k].venue} onChange={ev => setEv(k, { venue: ev.target.value })} />
              <Field id={`e_${k}_a`} label="Venue address" type="text" value={F.ev[k].vaddr} onChange={ev => setEv(k, { vaddr: ev.target.value })} />
            </fieldset>)}</div>}

          {step === 3 && <div className="pn on"><h2>4. Customise design</h2><p>Tap or drag text on the card, or pick it below.</p>
            <fieldset><legend>Invitation text</legend>
              <label>Heading (leave empty for the template’s default)</label>
              <textarea value={F.head} onChange={ev => set('head', ev.target.value)} />
              <Check id="bism" label="Show Arabic calligraphy (Bismillah / blessing)" checked={F.bism} onChange={ev => set('bism', ev.target.checked)} />
              <label>Additional message (optional)</label>
              <textarea value={F.msg} placeholder="e.g. Reception to follow. Your presence is our blessing." onChange={ev => set('msg', ev.target.value)} /></fieldset>
            <fieldset><legend>Selected text</legend>
              <select value={sel} onChange={ev => setSel(ev.target.value)}>{T[tid].els.map(x => <option key={x.id} value={x.id}>{x.l}</option>)}</select>
              <label>Text (empty = automatic from your details)</label>
              <textarea value={ov[tid]?.[sel]?.text || ''} onChange={ev => setO({ text: ev.target.value })} />
              <div className="row">
                <div><label>Font</label><select value={e.f} onChange={ev => setO({ f: ev.target.value })}>{FONTS.map(f => <option key={f}>{f}</option>)}</select></div>
                <div><label>Colour</label><input type="color" value={e.c || CAL[tid]?.col || '#000000'} onChange={ev => setO({ c: ev.target.value })} /></div>
              </div>
              <label>Size <span>{Math.round(e.s)}px</span></label>
              <input type="range" min="10" max="220" value={e.s} onChange={ev => setO({ s: +ev.target.value })} />
              <label>Alignment</label>
              <div className="al">{['left', 'center', 'right'].map(a => <button key={a} className="btn g" onClick={() => setO({ a })}>{a === 'center' ? 'Centre' : a[0].toUpperCase() + a.slice(1)}</button>)}</div>
              <label>Letter spacing</label><input type="range" min="-2" max="30" step=".5" value={e.ls || 0} onChange={ev => setO({ ls: +ev.target.value })} />
              <label>Line spacing</label><input type="range" min="0.8" max="2.6" step=".05" value={e.lh} onChange={ev => setO({ lh: +ev.target.value })} />
              <label>Move left / right</label><input type="range" min="0" max="1240" value={e.x} onChange={ev => setO({ x: +ev.target.value })} />
              <label>Move up / down</label><input type="range" min="0" max="1748" value={e.y} onChange={ev => setO({ y: +ev.target.value })} />
              <div className="row" style={{ marginTop: 12 }}>
                <button className="btn g" onClick={() => setOv(o => { const t = { ...o[tid] }; delete t[sel]; return { ...o, [tid]: t } })}>Reset this text</button>
                <button className="btn g" onClick={() => setOv(o => { const n = { ...o }; delete n[tid]; return n })}>Reset all</button>
              </div></fieldset></div>}

          {step === 4 && <div className="pn on"><h2>5. Preview</h2><p>This is exactly what will be downloaded: no outlines or controls. Use Back to change anything.</p></div>}

          {step === 5 && <div className="pn on"><h2>6. Download</h2><p>High-quality files at the template’s original size (1240 × 1748 px, A4 ratio).</p>
            <button className="btn big" onClick={dlPng}>Download PNG</button>
            <button className="btn big g" onClick={dlPdf}>Download PDF</button>
            <div className="msg">{msg}</div></div>}

          <div className="nav">
            <button className="btn g" style={{ visibility: step ? 'visible' : 'hidden' }} onClick={() => go(step - 1)}>Back</button>
            {step < 5 && <button className="btn" onClick={() => go(step + 1)}>Next</button>}
          </div>
        </div>
        <div className="pv">
          <Card {...cardProps} sel={step === 3 ? sel : null} canvasRef={cvRef} boxesRef={boxesRef} className="cv"
            onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
        </div>
      </div>
    </>
  )
}
