/* global React, I */
const { useState: fS, useRef: fR, useEffect: fE } = React;

const APPLY_LINK = 'https://adoutreach.com/apply-adroll';
const CONSULT_LINK = 'http://adoutreach.com/application';
const SUPERCUT_ID = 'uJRw4kLJmkg';

/* ============== TESTIMONIAL SUPERCUT VIDEO ============== */
function SupercutSection() {
  const [started, setStarted] = fS(false);
  return (
    <section className="section bg-navy-deep ao-dark page" id="supercut">
      <div className="wrap-narrow">
        <div className="sec-head reveal" style={{ maxWidth: 760 }}>
          <span className="eyebrow2 center teal">Real Clients, Real Results</span>
          <h2 style={{ color: '#fff' }}>Watch The <span className="grad">Client Results</span> Supercut</h2>
          <p className="lead2" style={{ color: 'rgba(255,255,255,.74)' }}>Don't take our word for it. Hear directly from the business owners we've helped scale.</p>
        </div>
        <div className="supercut-shell reveal">
          <div className="player supercut-player">
            {started ? (
              <iframe className="yt-frame" src={`https://www.youtube-nocookie.com/embed/${SUPERCUT_ID}?autoplay=1&rel=0&playsinline=1`}
                title="AdOutreach Client Results Supercut" frameBorder="0" allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
            ) : (
              <div className="yt-facade" onClick={() => setStarted(true)}>
                <img className="yt-poster" src={window.RES('supercutPoster', `https://i.ytimg.com/vi/${SUPERCUT_ID}/maxresdefault.jpg`)} alt="AdOutreach client results supercut" loading="lazy" />
                <div className="player-deco-top">
                  <span className="live-tag"><span className="live-dot" /> Testimonial Supercut</span>
                </div>
                <div className="play-overlay">
                  <button className="play-btn-big" aria-label="Play video"><I.play /></button>
                  <div className="play-overlay-label">Watch real client results</div>
                </div>
              </div>
            )}
          </div>
          <div className="yt-fallback">
            Trouble viewing the video here?{' '}
            <a href={`https://www.youtube.com/watch?v=${SUPERCUT_ID}`} target="_blank" rel="noopener">Watch it on YouTube <I.arrow style={{ width: 13, height: 13 }} /></a>
          </div>
        </div>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--s-6)' }}>
          <button className="btn btn-coral btn-lg" onClick={scrollToApply}>Apply Now <I.arrow /></button>
        </div>
      </div>
    </section>
  );
}

/* ============== WHO THIS IS FOR / NOT FOR ============== */
function WhoForSection() {
  const FOR = [
    'You\'re a coach, consultant, course creator, or service-based business',
    'You have a proven offer and want more qualified leads & sales',
    'You have a marketing budget of $10k/mo or more',
    'You want it done for you - not another course to grind through',
    'You\'re ready to scale with YouTube + Meta ads',
  ];
  const NOT = [
    'You\'re pre-revenue with no validated offer yet',
    'You\'re not able to commit at least $10k/mo in marketing budget',
    'You want overnight results with no marketing budget',
    'You\'d rather learn to run the ads yourself (see our consulting below)',
    'You\'re looking for a magic bullet, not a real growth system',
  ];
  return (
    <section className="section bg-paper page" id="who-for">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow2 center">Honest Fit Check</span>
          <h2>Is This <span className="grad">Right For You?</span></h2>
          <p className="lead2">Done For You Ads Management isn't for everyone - and that's the point. Here's exactly who we can help.</p>
        </div>
        <div className="whofor-grid">
          <div className="whofor-card is-for reveal">
            <div className="wf-head"><span className="wf-ic c"><I.check /></span> This is for you if…</div>
            <ul>{FOR.map((x, i) => <li key={i}><span className="wf-tick"><I.check /></span>{x}</li>)}</ul>
          </div>
          <div className="whofor-card is-not reveal" style={{ transitionDelay: '.08s' }}>
            <div className="wf-head"><span className="wf-ic x"><I.x /></span> This isn't for you if…</div>
            <ul>{NOT.map((x, i) => <li key={i}><span className="wf-cross"><I.x /></span>{x}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== FAQ / OBJECTION CRUSHER ============== */
const FAQS = [
  { q: 'How much does it cost?', a: "It's a custom engagement based on your goals and budget - and it's month-to-month with no long-term contract. You'll get exact numbers on your strategy call. To be a fit, you should have at least a $10k/mo marketing budget." },
  { q: "What's the minimum marketing budget to work with you?", a: "You'll want a marketing budget of $10k/mo or more. That's the level where our done-for-you management can drive a strong, scalable return - below that, our YouTube Ad Consulting program is a better starting point." },
  { q: 'How fast will I see results?', a: "Most clients have ads live within the first couple of weeks. Meaningful traction typically builds over the first 30-90 days as we test, optimize, and scale. Results vary by offer, market, and budget - we set realistic expectations on your call." },
  { q: "I've been burned by an agency before. Why are you different?", a: "Three reasons: we specialize in video marketing (YouTube + Meta together, not just one platform), we include 1-on-1 organic content consulting, and we're month-to-month. We don't lock you in - we earn your business every single month." },
  { q: 'Which platforms do you run ads on?', a: 'YouTube Ads and Meta Ads (Facebook & Instagram), with deep targeting and audience research. We use the channels that fit your offer and goals - not a one-size-fits-all template.' },
  { q: 'Do I need existing video content or a big following?', a: "No. We write your ad scripts (with multiple variations) and generate AI image ad creatives with our proprietary software. You don't need a following to start - and if you want to grow organically too, that's exactly what the bonus consulting covers." },
  { q: 'Who actually manages my ads?', a: "A dedicated ad & marketing strategist on our team - and you'll meet with them regularly. Our team has managed campaigns across 3,000+ businesses and spent $7.7M+ on our own video ads, so we deploy what's already proven to work." },
  { q: 'Is there a long-term contract?', a: 'No. Done For You Ads Management is month-to-month. We believe in earning your business with results, not locking you into a 6-12 month agreement.' },
];
function FAQItem({ q, a, open, onClick }) {
  const ref = fR(null);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={onClick} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: open ? (ref.current ? ref.current.scrollHeight + 4 : 600) : 0 }}>
        <div className="faq-a" ref={ref}>{a}</div>
      </div>
    </div>
  );
}
function FAQSection() {
  const [open, setOpen] = fS(0);
  return (
    <section className="section bg-navy-deep ao-dark page" id="faq">
      <div className="wrap-narrow">
        <div className="sec-head reveal" style={{ maxWidth: 720 }}>
          <span className="eyebrow2 center teal">Questions, Answered</span>
          <h2 style={{ color: '#fff' }}>Before You <span className="grad">Apply</span></h2>
          <p className="lead2" style={{ color: 'rgba(255,255,255,.74)' }}>The things smart business owners ask us most - answered straight.</p>
        </div>
        <div className="faq-list reveal">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
        <div className="faq-foot reveal">
          Still have questions? <a href={APPLY_LINK} target="_blank" rel="noopener">Apply and ask us on your call →</a>
        </div>
      </div>
    </section>
  );
}

/* ============== WHAT HAPPENS AFTER YOU APPLY ============== */
const STEPS_AFTER = [
  { n: '1', t: 'Apply in ~2 minutes', d: 'Tell us about your business, your offer, and your goals. Quick and simple.' },
  { n: '2', t: 'We review your application', d: 'Our team confirms you\'re a fit for Done For You Ads Management.' },
  { n: '3', t: 'Book your strategy call', d: 'If it\'s a match, you\'ll book a call to map out your custom game plan.' },
  { n: '4', t: 'We build, launch & scale', d: 'Your done-for-you ad engine goes live - we run, optimize, and scale it for you.' },
];
function WhatHappensSection() {
  return (
    <section className="section bg-paper page" id="what-happens">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow2 center">No Surprises</span>
          <h2>What Happens <span className="grad">After You Apply</span></h2>
          <p className="lead2">A clear, simple path from "Apply Now" to ads that run, optimize, and scale.</p>
        </div>
        <div className="steps-after">
          {STEPS_AFTER.map((s, i) => (
            <div className="after-card reveal" key={i} style={{ transitionDelay: (i * 0.07) + 's' }}>
              <div className="after-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              {i < STEPS_AFTER.length - 1 && <span className="after-arrow" aria-hidden="true"><I.arrow /></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== DON'T QUALIFY → CONSULTING FALLBACK ============== */
function ConsultingFallback() {
  return (
    <section className="section-sm bg-paper page" id="consulting">
      <div className="wrap">
        <div className="consult-card reveal">
          <div className="consult-glow" />
          <div className="consult-inner">
            <div className="consult-copy">
              <span className="eyebrow2 teal">Not At $10k/mo In Marketing Budget Yet?</span>
              <h3>Learn Our YouTube Ad Strategies Yourself</h3>
              <p>Done For You Ads Management is built for businesses ready to invest $10k/mo+. If you're earlier in your journey, our <b>YouTube Ad Consulting</b> program teaches you to run high-converting YouTube ads yourself - with our team guiding you every step of the way.</p>
            </div>
            <div className="consult-action">
              <a className="btn btn-grad btn-lg" href={CONSULT_LINK} target="_blank" rel="noopener">Apply For Consulting <I.arrow /></a>
              <span className="consult-note">Lower budget · Learn the system · Get expert guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== VIDEO AUTHORITY BOOK ============== */
const BOOK_URL = 'https://amzn.to/3Qa2IWT';
const BOOK_POINTS = [
  'Craft videos that speak directly to your ideal clients',
  'Turn cold viewers into warm leads & loyal, high-paying clients',
  'Leverage YouTube Ads to scale your authority with precision',
];
function BookSection() {
  return (
    <section className="section bg-paper page book-sec" id="book">
      <div className="wrap">
        <div className="book-grid">
          <div className="book-stage reveal">
            <div className="book3d">
              <div className="book-seal" aria-hidden="true">
                <span className="s-1">#1</span>
                <span className="s-2">Best<br />Seller</span>
              </div>
              <div className="book3d-box">
                <div className="bk-face bk-front">
                  <img src={window.RES('bookCover', 'assets/video-authority-cover.jpg')} alt='Video Authority by Aleric Heck - The Art and Science of Converting Viewers Into Clients' />
                  <span className="bk-gloss" aria-hidden="true" />
                </div>
                <div className="bk-face bk-spine" aria-hidden="true">
                  <span className="bk-spine-title">VIDEO AUTHORITY</span>
                  <span className="bk-spine-author">ALERIC HECK</span>
                </div>
                <div className="bk-face bk-pages" aria-hidden="true" />
                <div className="bk-face bk-top" aria-hidden="true" />
                <div className="bk-face bk-bottom" aria-hidden="true" />
                <div className="bk-face bk-back" aria-hidden="true" />
              </div>
              <div className="book-shadow" aria-hidden="true" />
            </div>
          </div>

          <div className="book-copy reveal" style={{ transitionDelay: '.1s' }}>
            <span className="eyebrow2">From Our Founder</span>
            <div className="book-badge" style={{ marginTop: 14 }}>
              <span className="bb-stars">★★★★★</span> Amazon #1 Best Seller
            </div>
            <h2>Read The Book Behind <span className="grad">The System</span></h2>
            <div className="book-sub2">Video Authority</div>
            <p>
              In <b>Video Authority: The Art &amp; Science of Converting Viewers Into Clients</b>, founder Aleric Heck shares the exact strategies he's used to help thousands of businesses collectively generate over <b>$300M in sales</b> with YouTube &amp; video marketing - the same principles powering the done-for-you system on this page.
            </p>
            <ul className="book-points">
              {BOOK_POINTS.map((p, i) => <li key={i}><I.check />{p}</li>)}
            </ul>
            <div className="book-cta-row">
              <a className="btn btn-coral btn-lg" href={BOOK_URL} target="_blank" rel="noopener">Get It On Amazon <I.arrow /></a>
              <span className="book-meta"><b>170+</b> five-star reviews <span className="dot" /> Best Seller in Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.WhoForSection = WhoForSection;
window.SupercutSection = SupercutSection;
window.FAQSection = FAQSection;
window.WhatHappensSection = WhatHappensSection;
window.ConsultingFallback = ConsultingFallback;
window.BookSection = BookSection;
