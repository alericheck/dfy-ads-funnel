/* global React */
const { useState, useEffect, useRef, useCallback } = React;
window.RES = (id, path) => (window.__resources && window.__resources[id]) ? window.__resources[id] : path;

/* ---------------- Icons ---------------- */
const I = {
  play:   (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5v14l11-7z"/></svg>,
  pause:  (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>,
  replay: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>,
  vol:    (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 10v4h4l5 5V5L7 10H3z"/><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>,
  mute:   (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 10v4h4l5 5V5L7 10H3z"/><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 9l5 6M21 9l-5 6"/></svg>,
  cc:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path strokeLinecap="round" d="M9.5 10.2a2.2 2.2 0 0 0-3.5 1.8 2.2 2.2 0 0 0 3.5 1.8M18 10.2a2.2 2.2 0 0 0-3.5 1.8 2.2 2.2 0 0 0 3.5 1.8"/></svg>,
  expand: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>,
  check:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5"/></svg>,
  x:      (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...p}><path d="M18 6L6 18M6 6l12 12"/></svg>,
  arrow:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  user:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>,
  film:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/></svg>,
  bolt:   (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  cal:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
};
window.I = I;

/* ---------------- helpers ---------------- */
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
function countUp(t, target, dur = 1.4) {
  if (t >= dur) return target;
  return target * easeOut(Math.max(0, t) / dur);
}
function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  const m = Math.floor(s / 60), ss = s % 60;
  return m + ':' + String(ss).padStart(2, '0');
}

/* ---------------- scene factory for steps ---------------- */
function StepScene({ num, title, bullets }) {
  return (
    <div className="sc sc-step-layout">
      <div className="sc-step-num anim-pop">{num}</div>
      <div>
        <div className="sc-badge anim" style={{ animationDelay: '.05s' }}>STEP {num}</div>
        <h2 className="sc-title md anim" style={{ animationDelay: '.12s' }}>{title}</h2>
        <ul className="sc-bullets">
          {bullets.map((b, i) => (
            <li key={i} className="anim-wipe" style={{ animationDelay: (0.3 + i * 0.18) + 's' }}>
              <span className="sc-check"><I.check /></span>{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- client logos (real, from the deck) ---------------- */
const LOGOS = [
  ['skyview', 'Sky View Trading'], ['tuftneedle', 'Tuft & Needle'], ['proctorgallagher', 'Proctor Gallagher Institute'],
  ['groovefunnels', 'GrooveFunnels'], ['passionio', 'Passion.io'], ['lendi', 'Lendi'], ['ereleases', 'eReleases'],
  ['alliancesolar', 'Alliance Solar'], ['warriorbabe', 'WarriorBabe'], ['conway', 'Conway Consulting'],
  ['clickfunnels', 'ClickFunnels'], ['xeroshoes', 'Xero Shoes'], ['bodylastics', 'Bodylastics'],
  ['snow', 'SNOW'], ['covideo', 'Covideo'], ['closersio', 'Closers.io'],
];
window.LOGOS = LOGOS;

/* ---------------- SCENES ---------------- */
const SCENES = [
  { dur: 5, cap: "Done For You Ads Management - the same system behind thousands of client wins.",
    el: () => (
      <div className="sc">
        <img src={window.RES('logoWhite','assets/adoutreach-logo-white.png')} alt="" className="anim-pop"
             style={{ height: '11cqh', width: 'auto', margin: '0 auto 5cqh' }} />
        <div className="sc-eyebrow anim" style={{ animationDelay: '.2s' }}>Done For You</div>
        <h1 className="sc-title grad anim-pop" style={{ animationDelay: '.35s' }}>Ads Management</h1>
        <div className="sc-sub anim" style={{ animationDelay: '.7s' }}>Value-Driven Video Marketing - Run, Optimized &amp; Scaled For You</div>
      </div>
    )},
  { dur: 6, cap: "It's the same system we've implemented for 3,000+ businesses to scale their leads & sales.",
    el: (t) => (
      <div className="sc">
        <div className="sc-eyebrow anim">The Proven System</div>
        <div className="sc-mega grad anim-pop">{Math.round(countUp(t, 3000)).toLocaleString()}+</div>
        <h2 className="sc-title md anim" style={{ animationDelay: '.4s', marginTop: '2cqh' }}>
          Businesses Scaled<br />Their <span className="grad">Leads &amp; Sales</span>
        </h2>
      </div>
    )},
  { dur: 6, cap: "Companies we've helped grow - across coaching, e-commerce, and high-ticket services.",
    el: () => {
      const show = LOGOS.slice(0, 8);
      return (
        <div className="sc">
          <h2 className="sc-title md anim">Companies We've <span className="grad">Helped Grow</span></h2>
          <div className="sc-logos">
            {show.map((l, i) => (
              <div key={i} className="sc-logo-chip anim-pop" style={{ animationDelay: (0.2 + i * 0.07) + 's' }}>
                <img src={window.RES('logo_'+l[0], 'assets/logos/'+l[0]+'.png')} alt={l[1]} />
              </div>
            ))}
          </div>
        </div>
      );
    }},
  { dur: 6, cap: "We also used this exact strategy to scale our own company onto the Inc. 5000.",
    el: (t) => {
      const tiles = [
        { n: Math.round(countUp(t, 9)), s: '+', l: 'Figures Generated For Clients' },
        { n: Math.round(countUp(t, 60)), s: '', l: 'Fastest-Growing in America (Inc. 5000)' },
        { n: Math.round(countUp(t, 8)), s: '-Fig', l: 'Company We Scaled With This System' },
      ];
      return (
        <div className="sc">
          <div className="sc-eyebrow anim">We Used It On Ourselves Too</div>
          <h2 className="sc-title md anim" style={{ animationDelay: '.1s' }}>Proven At <span className="grad">Scale</span></h2>
          <div className="sc-metrics">
            {tiles.map((m, i) => (
              <div key={i} className="sc-metric anim-pop" style={{ animationDelay: (0.25 + i * 0.12) + 's' }}>
                <div className="m-n grad">{m.n}{m.s}</div>
                <div className="m-l">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }},
  { dur: 6, cap: "We've spent over $7.7 million on our own video ads - so we know exactly what works.",
    el: (t) => (
      <div className="sc">
        <div className="sc-eyebrow anim">Battle-Tested Ad Spend</div>
        <div className="sc-mega grad anim-pop">${countUp(t, 7.7).toFixed(1)}M</div>
        <h2 className="sc-title md anim" style={{ animationDelay: '.4s', marginTop: '2cqh' }}>
          Spent On Our <span className="grad">Own Video Ads</span>
        </h2>
        <div className="sc-sub anim" style={{ animationDelay: '.7s' }}>We don't guess. We deploy what's already working.</div>
      </div>
    )},
  { dur: 7, cap: "Led by Aleric Heck - Founder & CEO, video marketing expert, and author of 'Video Authority.'",
    el: () => (
      <div className="sc sc-founder">
        <div className="sc-portrait anim-pop">
          <img className="photo" src={window.RES('aleric','assets/aleric.jpg')} alt="Aleric Heck" />
        </div>
        <div>
          <div className="sc-eyebrow anim">Led By</div>
          <div className="f-name grad anim" style={{ animationDelay: '.1s' }}>Aleric Heck</div>
          <ul>
            {[['Founder & CEO', 'of AdOutreach'], ['Video Marketing Expert', ''], ['Author of', '"Video Authority" on Amazon']].map((r, i) => (
              <li key={i} className="anim-wipe" style={{ animationDelay: (0.3 + i * 0.16) + 's' }}>
                <span className="sc-check"><I.check /></span><span><b>{r[0]}</b> {r[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )},
  { dur: 5.5, cap: "Step 1 - we build your custom marketing game plan with a deep-dive audit.",
    el: () => <StepScene num="1" title="Marketing Game Plan & Strategy" bullets={[
      'Deep-Dive Audit of Your Existing Marketing',
      "We Create Your Custom Game Plan",
      'For Your Ads, Funnels & Overall Strategy',
    ]} /> },
  { dur: 5.5, cap: "Step 2 - we script your video ads and generate AI ad creative with our software.",
    el: () => <StepScene num="2" title="Video Ad Scripting & Image Generation" bullets={[
      'Write Your Ad Scripts With Multiple Variations',
      'Consult You On Your Marketing Funnel',
      'Generate AI Image Ad Creatives (Proprietary Software)',
    ]} /> },
  { dur: 5.5, cap: "Step 3 - your strategist sets up and launches your ads on YouTube and Meta.",
    el: () => <StepScene num="3" title="Done For You Ads Setup & Launch" bullets={[
      'Your Strategist Sets Up & Launches Your Ads',
      'Deep Targeting & Audience Research',
      'YouTube Ads & Meta Ads (Facebook & Instagram)',
    ]} /> },
  { dur: 5.5, cap: "Step 4 - we run, optimize, and scale your ads for you, fully done for you.",
    el: () => <StepScene num="4" title="Done For You Ads Management" bullets={[
      'We Run Your Ads - Full Done For You Management',
      'Meet With Your Ad & Marketing Strategist',
      'We Optimize & Scale Your Ads For You',
    ]} /> },
  { dur: 5.5, cap: "Plus a bonus - 1-on-1 organic content consulting to compound your growth.",
    el: () => (
      <div className="sc sc-step-layout">
        <div className="sc-step-num anim-pop" style={{ WebkitTextStroke: '2px rgba(255,90,60,.55)' }}>★</div>
        <div>
          <div className="sc-badge coral anim" style={{ animationDelay: '.05s' }}>BONUS</div>
          <h2 className="sc-title md anim" style={{ animationDelay: '.12s' }}>Organic Content Consulting</h2>
          <ul className="sc-bullets">
            {['1-on-1 Organic Content Consulting (1-1 Meetings)', 'Dedicated Organic Content Strategist', 'AI-Powered Data Analysis & Content Scripts'].map((b, i) => (
              <li key={i} className="anim-wipe" style={{ animationDelay: (0.3 + i * 0.18) + 's' }}>
                <span className="sc-check"><I.check /></span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )},
  { dur: 5, cap: "All designed to help you hit your goals - while you focus on running your business.",
    el: () => (
      <div className="sc">
        <div className="sc-rocket anim-pop">🚀</div>
        <h2 className="sc-title md anim" style={{ animationDelay: '.2s', marginTop: '2cqh' }}>
          Designed To Help You<br /><span className="grad">Achieve Your Goals</span>
        </h2>
        <div className="sc-sub anim" style={{ animationDelay: '.5s' }}>Focus on your business while we attract new leads &amp; clients.</div>
      </div>
    )},
  { dur: 8, cap: "Most agencies don't specialize in video, lock you into long contracts, or skip organic. We're different.",
    el: () => (
      <div className="sc">
        <h2 className="sc-title md anim" style={{ marginBottom: '4cqh' }}>Why We're <span className="grad">Different</span></h2>
        <div className="sc-compare">
          <div className="cmp-col them anim-wipe" style={{ animationDelay: '.15s' }}>
            <div className="cmp-h">Most Agencies</div>
            <ul className="cmp-list">
              {['No video marketing focus', 'Only one platform (Meta)', "Don't support organic content", '6-12 month contracts'].map((x, i) => (
                <li key={i}><span className="cmp-ic x"><I.x /></span>{x}</li>
              ))}
            </ul>
          </div>
          <div className="cmp-col us anim-wipe" style={{ animationDelay: '.3s' }}>
            <div className="cmp-h">AdOutreach</div>
            <ul className="cmp-list">
              {['Specialize in video marketing', 'YouTube Ads + Meta Ads', '1-on-1 organic consulting included', 'Month-to-month - no lock-in'].map((x, i) => (
                <li key={i}><span className="cmp-ic c"><I.check /></span>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )},
  { dur: 6, cap: "Here's everything you get - four done-for-you steps plus organic consulting.",
    el: () => (
      <div className="sc">
        <div className="sc-eyebrow anim">Everything You Get</div>
        <h2 className="sc-title md anim" style={{ animationDelay: '.1s' }}>Done For You <span className="grad">Ads Management</span></h2>
        <ul className="sc-recap">
          {[['Marketing Game Plan & Strategy', 'STEP 1'], ['Video Ad Scripting & Content Plan', 'STEP 2'], ['Done For You Ads Setup & Launch', 'STEP 3'], ['DFY Management + Organic Consulting', 'STEP 4']].map((r, i) => (
            <li key={i} className="anim-wipe" style={{ animationDelay: (0.25 + i * 0.14) + 's' }}>
              <span className="r-l"><span className="sc-check"><I.check /></span>{r[0]}</span>
              <span className="r-step">{r[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    )},
  { dur: 5, cap: "Spots are limited. If you're ready to scale, apply now.",
    el: () => (
      <div className="sc">
        <div className="kicker-pill anim" style={{ margin: '0 auto 4cqh' }}><I.bolt style={{ width: 14, height: 14 }} /> Spots Are Limited</div>
        <h1 className="sc-title grad anim-pop">Apply Now</h1>
        <div className="sc-sub anim" style={{ animationDelay: '.4s' }}>Let's build your done-for-you ad engine - together.</div>
      </div>
    )},
];

// cumulative timing
const TIMINGS = (() => {
  let acc = 0; const arr = SCENES.map(s => { const start = acc; acc += s.dur; return { start, end: acc, dur: s.dur }; });
  return { arr, total: acc };
})();
const TOTAL = TIMINGS.total;
const YT_ID = 'yp6kebcC4JM';
const YT_DURATION = '7:25';

/* ---------------- Player ---------------- */
function VSLPlayer({ videoMode = 'animated', captionsDefault = true, onApply }) {
  const STORE = 'dfy_vsl_time_v1';
  const [ytStarted, setYtStarted] = useState(false);
  const [elapsed, setElapsed] = useState(() => {
    const v = parseFloat(localStorage.getItem(STORE) || '0');
    return isNaN(v) ? 0 : Math.min(v, TOTAL - 0.05);
  });
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(() => parseFloat(localStorage.getItem(STORE) || '0') > 0.1);
  const [captions, setCaptions] = useState(captionsDefault);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [scrubbing, setScrubbing] = useState(false);
  const rafRef = useRef(0); const lastRef = useRef(0); const elapsedRef = useRef(elapsed); const rateRef = useRef(rate);
  elapsedRef.current = elapsed; rateRef.current = rate;

  useEffect(() => { setCaptions(captionsDefault); }, [captionsDefault]);

  // rAF playback loop
  useEffect(() => {
    if (!playing) return;
    lastRef.current = performance.now();
    const tick = (now) => {
      const dt = (now - lastRef.current) / 1000; lastRef.current = now;
      let next = elapsedRef.current + dt * rateRef.current;
      if (next >= TOTAL) { next = TOTAL; setElapsed(next); setPlaying(false); return; }
      setElapsed(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  // persist
  useEffect(() => {
    const id = setTimeout(() => localStorage.setItem(STORE, String(elapsed)), 250);
    return () => clearTimeout(id);
  }, [elapsed]);

  const ended = elapsed >= TOTAL - 0.02;
  const sceneIdx = (() => {
    for (let i = 0; i < TIMINGS.arr.length; i++) if (elapsed < TIMINGS.arr[i].end) return i;
    return TIMINGS.arr.length - 1;
  })();
  const sceneT = elapsed - TIMINGS.arr[sceneIdx].start;

  const start = useCallback(() => { if (ended) { setElapsed(0); } setStarted(true); setPlaying(true); }, [ended]);
  const toggle = useCallback(() => { if (!started) return start(); if (ended) { setElapsed(0); setPlaying(true); return; } setPlaying(p => !p); }, [started, ended, start]);

  // scrubbing
  const trackRef = useRef(null);
  const seekFromEvent = useCallback((clientX) => {
    const el = trackRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setElapsed(ratio * TOTAL); setStarted(true);
  }, []);
  const onScrubDown = (e) => { setScrubbing(true); seekFromEvent(e.clientX); };
  useEffect(() => {
    if (!scrubbing) return;
    const mv = (e) => seekFromEvent(e.clientX);
    const up = () => setScrubbing(false);
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  }, [scrubbing, seekFromEvent]);

  const cycleRate = () => setRate(r => (r === 1 ? 1.25 : r === 1.25 ? 1.5 : r === 1.5 ? 2 : 1));
  const pct = (elapsed / TOTAL) * 100;
  const Scene = SCENES[sceneIdx].el;

  return (
    <div className="player-shell">
      <div className="player">
        {videoMode === 'youtube' ? (
          ytStarted ? (
            <iframe className="yt-frame" src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0&playsinline=1`}
              title="Done For You Ads Management" frameBorder="0" allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
          ) : (
            <div className="yt-facade" onClick={() => setYtStarted(true)}>
              <img className="yt-poster" src={window.RES('ytPoster',`https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`)} alt="Done For You Ads Management walkthrough" loading="lazy" />
              <div className="player-deco-top">
                <span className="live-tag"><span className="live-dot" /> DFY Offer Walkthrough</span>
                <span className="player-wm"><img src={window.RES('logoWhite','assets/adoutreach-logo-white.png')} alt="AdOutreach" /></span>
              </div>
              <div className="play-overlay">
                <button className="play-btn-big" aria-label="Play video"><I.play /></button>
                <div className="play-overlay-label">Watch: How Done For You Ads Management Works ({YT_DURATION})</div>
              </div>
            </div>
          )
        ) : (
        <React.Fragment>
        {/* stage */}
        <div className="stage">
          {videoMode === 'upload' ? (
            <div className="upload-ph">
              <I.film />
              <b>Drop in your recorded VSL here</b>
              <small>Swap this placeholder for your real video - replace the stage markup with a <code>&lt;video src="your-vsl.mp4"&gt;</code> or an embed. All controls + the apply funnel below stay exactly the same.</small>
            </div>
          ) : (
            <div className="scene" key={sceneIdx}><Scene t={sceneT} /></div>
          )}
        </div>

        {/* top chrome */}
        {videoMode === 'animated' && (
          <div className="player-deco-top">
            <span className="live-tag"><span className="live-dot" /> DFY Offer Walkthrough</span>
            <span className="player-wm"><img src={window.RES('logoWhite','assets/adoutreach-logo-white.png')} alt="AdOutreach" /></span>
          </div>
        )}

        {/* caption */}
        {videoMode === 'animated' && started && !ended && (
          <div className={`caption ${captions ? '' : 'off'}`} key={'cap' + sceneIdx}>{SCENES[sceneIdx].cap}</div>
        )}

        {/* play overlay */}
        <div className={`play-overlay ${started && !ended ? 'hidden' : ''}`} onClick={toggle}>
          <button className="play-btn-big" aria-label="Play">
            {ended ? <I.replay style={{ width: 34, height: 34, marginLeft: 0 }} /> : <I.play />}
          </button>
          {!started && <div className="play-overlay-label">Watch: How Done For You Ads Management Works ({fmtTime(TOTAL)})</div>}
          {ended && <div className="play-overlay-label">Replay the walkthrough</div>}
        </div>

        {/* controls */}
        {videoMode === 'animated' && (
          <div className="controls" style={{ opacity: started ? 1 : 0, transition: 'opacity .3s' }}>
            <div className="scrub" ref={trackRef} onPointerDown={onScrubDown}>
              <div className="scrub-track">
                <div className="scrub-buf" style={{ width: '100%' }} />
                <div className="scrub-fill" style={{ width: pct + '%' }} />
              </div>
              <div className="scrub-ticks">
                {TIMINGS.arr.slice(1).map((s, i) => <span key={i} className="scrub-tick" style={{ left: (s.start / TOTAL) * 100 + '%' }} />)}
              </div>
              <div className="scrub-knob" style={{ left: pct + '%', opacity: scrubbing ? 1 : .9 }} />
            </div>
            <div className="controls-row">
              <button className="ctrl-btn play" onClick={toggle} aria-label="Play/Pause">
                {playing ? <I.pause /> : ended ? <I.replay /> : <I.play />}
              </button>
              <button className="ctrl-btn" onClick={() => setMuted(m => !m)} aria-label="Mute">
                {muted ? <I.mute /> : <I.vol />}
              </button>
              <span className="time">{fmtTime(elapsed)}<span className="sep">/</span>{fmtTime(TOTAL)}</span>
              <span className="ctrl-spacer" />
              <button className="rate-btn" onClick={cycleRate}>{rate}×</button>
              <button className={`ctrl-btn cc-btn ${captions ? 'active' : ''}`} onClick={() => setCaptions(c => !c)} aria-label="Captions"><I.cc /></button>
              <button className="ctrl-btn" onClick={() => { const el = trackRef.current?.closest('.player'); if (el?.requestFullscreen) el.requestFullscreen(); }} aria-label="Fullscreen"><I.expand /></button>
            </div>
          </div>
        )}
        </React.Fragment>
        )}
      </div>

      {/* under-player apply strip */}
      <div className="player-cta-strip">
        <div className="pcs-txt">Ready to have your ads <b>run, optimized &amp; scaled for you?</b></div>
        <button className="btn btn-coral" onClick={onApply}>Apply Now <I.arrow /></button>
      </div>
      {videoMode === 'youtube' && (
        <div className="yt-fallback">
          Trouble viewing the video here?{' '}
          <a href={`https://www.youtube.com/watch?v=${YT_ID}`} target="_blank" rel="noopener">Watch it on YouTube <I.arrow style={{ width: 13, height: 13 }} /></a>
        </div>
      )}
    </div>
  );
}
window.VSLPlayer = VSLPlayer;
