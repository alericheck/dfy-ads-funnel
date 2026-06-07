/* global React, VSLPlayer, I */
const { useState: uS, useEffect: uE, useRef: uR } = React;

/* scroll reveal hook - auto-staggers siblings, reveals just before fully in view */
function useReveal() {
  uE(() => {
    const els = [...document.querySelectorAll('.reveal')];
    const byParent = new Map();
    els.forEach((el) => {
      if (el.classList.contains('in')) return;
      const p = el.parentElement;
      const idx = byParent.get(p) || 0;
      byParent.set(p, idx + 1);
      if (!el.style.transitionDelay) el.style.setProperty('--rd', Math.min(idx, 7) * 0.085 + 's');
    });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}});
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
window.useReveal = useReveal;

const APPLY_URL = 'https://adoutreach.com/apply-adroll';
const scrollToApply = () => window.open(APPLY_URL, '_blank', 'noopener');
window.scrollToApply = scrollToApply;
window.APPLY_URL = APPLY_URL;

/* count-up that fires when scrolled into view */
function CountUp({ target, decimals = 0, prefix = '', suffix = '', sep = false, dur = 1500 }) {
  const [val, setVal] = uS(0);
  const ref = uR(null);
  uE(() => {
    const el = ref.current;if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {setVal(target);return;}
    let raf = 0,started = false;
    const run = (t0) => {
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {if (e.isIntersecting && !started) {started = true;run(performance.now());io.unobserve(el);}});
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => {io.disconnect();cancelAnimationFrame(raf);};
  }, [target, dur]);
  let n = val.toFixed(decimals);
  if (sep) n = Math.round(val).toLocaleString();
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}
window.CountUp = CountUp;

/* ---------------- Nav ---------------- */
function Nav() {
  const [s, setS] = uS(false);
  uE(() => {const f = () => setS(window.scrollY > 40);window.addEventListener('scroll', f);return () => window.removeEventListener('scroll', f);}, []);
  return (
    <nav className={`nav ${s ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <div className="nav-logo"><img src={window.RES('logoWhite', 'assets/adoutreach-logo-white.png')} alt="AdOutreach" /></div>
        <div className="nav-right">
          <span className="nav-meta">The #1 Authority in <b>Video Ads</b> &amp; Video Marketing</span>
          <button className="btn btn-coral" onClick={scrollToApply}>Apply Now</button>
        </div>
      </div>
    </nav>);

}

/* ---------------- Hero ---------------- */
function Hero({ heroLayout, videoMode, captionsDefault, ctaStyle }) {
  const ctaClass = ctaStyle === 'gradient' ? 'btn-grad' : 'btn-coral';
  return (
    <header className={`hero ${heroLayout === 'split' ? 'split' : ''}`}>
      <div className="hero-glow" />
      <div className="hero-grid-tex" />
      <div className="wrap hero-inner">
        <div className="hero-head">
          <span className="kicker-pill">Done For You Ads Management</span>
          <h1>We Run, Optimize &amp; <span className="grad">Scale Your Ads</span> - So You Can Focus On Your Business</h1>
          <p>The same YouTube &amp; Meta ad system we've used for <strong style={{ color: '#fff' }}>3,000+ businesses</strong> - fully done for you, month-to-month, no long-term contract.</p>
          {heroLayout === 'split' &&
          <div className="hero-cta-row">
              <button className={`btn ${ctaClass} btn-lg`} onClick={scrollToApply}>Apply Now <I.arrow /></button>
            </div>
          }
          {heroLayout === 'split' &&
          <div className="hero-qual"><I.shield /> For coaches, consultants, course creators &amp; service businesses</div>
          }
        </div>
        <div className="hero-stage">
          <VSLPlayer videoMode={videoMode} captionsDefault={captionsDefault} onApply={scrollToApply} />
        </div>
      </div>
      {heroLayout !== 'split' &&
      <div className="wrap">
          <div className="trust-row">
            {[
          { node: <React.Fragment><CountUp prefix="$" target={7.7} decimals={1} suffix="M+" /></React.Fragment>, l: 'Spent On Our Own Ads' },
          { node: <CountUp target={3000} sep={true} suffix="+" />, l: 'Businesses Scaled' },
          { node: '9-Figure', l: 'Client Revenue Generated' },
          { node: 'Inc. 5000', l: '#60 Fastest-Growing' }].
          map((t, i) =>
          <div className="trust-tile reveal" key={i}><div className="trust-n grad">{t.node}</div><div className="trust-l">{t.l}</div></div>
          )}
          </div>
        </div>
      }
    </header>);

}

/* ---------------- Marquee ---------------- */
function Marquee() {
  return (
    <section className="bg-navy marquee-sec">
      <div className="marquee-label">Companies We've Helped Grow</div>
      <div className="marquee"><div className="marquee-track">
        {[...LOGOS, ...LOGOS].map((l, i) =>
          <div className="logo-chip" key={i}><img src={window.RES('logo_' + l[0], 'assets/logos/' + l[0] + '.png')} alt={l[1]} /></div>
          )}
      </div></div>
    </section>);

}

/* ---------------- Offer ---------------- */
const STEPS = [
{ n: '1', tag: 'Step 01', title: 'Marketing Game Plan & Strategy', items: ['Deep-dive audit of your existing marketing', 'We create your custom game plan', 'For your ads, funnels & overall strategy'] },
{ n: '2', tag: 'Step 02', title: 'Video Ad Scripting & Image Generation', items: ['Ad scripts written with multiple variations', 'Funnel consulting from your strategist', 'AI image ad creatives via our proprietary software'] },
{ n: '3', tag: 'Step 03', title: 'Done For You Ads Setup & Launch', items: ['Your strategist sets up & launches your ads', 'Deep targeting & audience research', 'YouTube Ads + Meta Ads (Facebook & Instagram)'] },
{ n: '4', tag: 'Step 04', title: 'Done For You Ads Management', items: ['We run your ads - full DFY management', 'Recurring meetings with your ad strategist', 'We optimize & scale your ads for you'] },
{ n: '★', tag: 'Bonus', title: 'Organic Content Consulting', items: ['1-on-1 organic content consulting calls', 'Dedicated organic content strategist', 'AI-powered data analysis & content scripts'], bonus: true }];


function OfferSection({ layout }) {
  return (
    <section className="section bg-paper page" id="offer">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow2 center">What's Included</span>
          <h2>A Complete, <span className="grad">Done-For-You</span> Ad Engine</h2>
          <p className="lead2">Four done-for-you steps - plus organic content consulting - so you attract new leads &amp; clients while we handle the ads end to end.</p>
        </div>
        <div className="value-strip reveal">
          {['Month-to-Month - No Long Contract', 'YouTube + Meta Ads', '1-on-1 Strategist', 'Video Ad Focus'].map((v, i) =>
          <span className="value-chip" key={i}><I.check />{v}</span>
          )}
        </div>

        {layout === 'cards' ?
        <div className="offer-cards">
            {STEPS.map((s, i) =>
          <div className={`offer-card reveal ${s.bonus ? 'bonus' : ''}`} key={i} style={{ transitionDelay: i * 0.06 + 's' }}>
                <div className="oc-num">{s.n}</div>
                <div className="oc-tag">{s.tag}</div>
                <h3>{s.title}</h3>
                <ul>{s.items.map((it, j) => <li key={j}><I.check />{it}</li>)}</ul>
              </div>
          )}
          </div> :

        <div className="timeline">
            {STEPS.map((s, i) =>
          <div className="tl-item reveal" key={i}>
                <div className={`tl-dot ${s.bonus ? 'bonus' : ''}`}>
                  {s.bonus ? <span className="tl-n" style={{ fontSize: 30 }}>★</span> : <React.Fragment><span className="tl-step">STEP</span><span className="tl-n">{s.n}</span></React.Fragment>}
                </div>
                <div className={`tl-card ${s.bonus ? 'bonus' : ''}`}>
                  <span className="tl-tag">{s.bonus ? 'Included Bonus' : s.tag}</span>
                  <h3>{s.title}</h3>
                  <ul>{s.items.map((it, j) => <li key={j}><I.check />{it}</li>)}</ul>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </section>);

}

/* ---------------- Comparison ---------------- */
function Comparison() {
  return (
    <section className="section bg-navy-deep ao-dark page">
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 700 }}>
          <span className="eyebrow2 center teal">The AdOutreach Difference</span>
          <h2 style={{ color: '#fff' }}>Most Agencies Aren't Built <span className="grad">Like This</span></h2>
        </div>
        <div className="compare-grid">
          <div className="compare-card them reveal">
            <h3>Most Marketing Agencies</h3>
            <p className="cc-sub">The status quo</p>
            <ul className="compare-list">
              {["Don't specialize in video marketing", 'Focus on only one platform (Meta Ads)', "Don't support your organic content", 'Lock you into 6-12 month contracts'].map((x, i) =>
              <li key={i}><span className="ci x"><I.x /></span>{x}</li>
              )}
            </ul>
          </div>
          <div className="compare-card us reveal" style={{ transitionDelay: '.1s' }}>
            <span className="compare-badge">AdOutreach</span>
            <h3>Done For You Ads Management</h3>
            <p className="cc-sub">Built to earn your business long-term</p>
            <ul className="compare-list">
              {['Specialists in video marketing', 'YouTube Ads + Meta Ads together', 'You get 1-on-1 organic content consulting', 'No long-term commitment - month to month'].map((x, i) =>
              <li key={i}><span className="ci c"><I.check /></span>{x}</li>
              )}
            </ul>
          </div>
        </div>
        <p className="compare-foot reveal">We don't lock you in - we earn your business every single month. 🚀</p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 26 }}>
          <button className="btn btn-coral btn-lg" onClick={scrollToApply}>Apply For Ads Management <I.arrow /></button>
        </div>
      </div>
    </section>);

}

/* ---------------- Founder ---------------- */
function Founder() {
  return (
    <section className="section bg-paper page">
      <div className="wrap">
        <div className="founder-grid">
          <div className="founder-photo reveal">
            <img className="photo" src={window.RES('aleric', 'assets/aleric.jpg')} alt="Aleric Heck" />
            <div className="founder-badges">
              <div className="founder-badge"><div className="fb-n">$7.7M+</div><div className="fb-l">Own Ad Spend</div></div>
              <div className="founder-badge"><div className="fb-n">Inc. 5000</div><div className="fb-l">#60 in America</div></div>
            </div>
          </div>
          <div className="founder-copy reveal" style={{ transitionDelay: '.1s' }}>
            <span className="eyebrow2">Led By</span>
            <h2>Aleric Heck</h2>
            <div className="f-role">Founder &amp; CEO of AdOutreach · Video Marketing Expert</div>
            <ul>
              <li><I.check /><span>Author of the Amazon Bestselling Book <b>"Video Authority"</b></span></li>
              <li><I.check /><span>Built <b>AppFind</b> to 500k+ YouTube subscribers while in High School before founding AdOutreach in his College dorm room</span></li>
              <li><I.check /><span>Scaled AdOutreach to <b>8 Figures</b> - landing <b>#60</b> on the INC 5000 list of the Fastest-Growing Companies in America</span></li>
              <li><I.check /><span>Personally spent <b>$7.7M+</b> on our own video ads - we practice what we preach</span></li>
            </ul>
            <button className="btn btn-coral" onClick={scrollToApply}>Apply To Work With Us <I.arrow /></button>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------- Apply CTA band ---------------- */
function ApplyCTABand() {
  return (
    <section className="section-sm bg-paper page" style={{ paddingTop: 0 }}>
      <div className="wrap reveal" style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-coral btn-lg" onClick={scrollToApply}>Apply Now <I.arrow /></button>
      </div>
    </section>);

}

/* ---------------- Testimonials ---------------- */
const QUOTES = [
{ n: 'Ahmad Munawar', r: 'Consultant', q: "I finally hit that $100k month I couldn't get with Facebook ads, on the back of YouTube ads and the AdOutreach team's help.", kpi: 'First $100k month', photo: 'https://adoutreach.com/wp-content/uploads/2022/02/home-section-07-img-02.png' },
{ n: 'Donna Partow', r: 'Consultant', q: "I recorded a 2-minute video and sent it to my list with the offer they helped me create. I've made $115,000 in just two months!", kpi: '$115k / 2 months', photo: 'https://adoutreach.com/wp-content/uploads/2022/02/home-section-07-img-03.png' },
{ n: 'Lee Blue', r: 'Web Design Coach', q: 'My calendar is maxed out from the amount of leads! Spent $3,000 in ads and on-boarded about $30,000 worth of clients in one month.', kpi: '10x ROAS', photo: 'https://adoutreach.com/wp-content/uploads/2022/02/home-section-07-img-04.png' },
{ n: 'Jonathan Kirchner', r: 'Recruiter Consulting', q: "Within a month we hit $10k. Within 90 days, $30-40k/month. We're now on pace for a $100k month.", kpi: '$10k to $100k/mo', photo: 'https://adoutreach.com/wp-content/uploads/2022/02/home-section-07-img-05.png' },
{ n: 'Zan Shaikh', r: 'Coaching', q: "We've spent somewhere around $8,000 and made around $60,000! AdOutreach is the absolute best program out there.", kpi: '7.5x ROAS', photo: 'https://adoutreach.com/wp-content/uploads/2022/06/zan-img.png' },
{ n: 'Brandon Castro', r: 'Sales Entrepreneur', q: "The team helped us with literally everything. We've done a bit over $200k and we're consistently passing the $40k/mo mark.", kpi: '$20k to $200k', photo: 'https://adoutreach.com/wp-content/uploads/2024/04/Brandon-Castro.png' },
{ n: 'Brent Kocal', r: 'Performance Coach', q: "I've invested $4K in ad spend, and that's turned into $50,000 in top-line revenue, that's a 12.5x ROAS!", kpi: '12.5x ROAS', photo: 'https://adoutreach.com/wp-content/uploads/2024/04/Brent-kocal.png' },
{ n: 'Michael Shane', r: 'Marketing & Sales', q: "AdOutreach has helped us take our business to another level. Their team of experts helped us accelerate our growth exponentially.", kpi: 'Exponential growth', photo: 'https://adoutreach.com/wp-content/uploads/2024/04/Michael-Shane.png' },
{ n: 'Tim McCormick', r: 'Client Since 2022', q: 'The unmeasurable value they have brought to my business is simply beyond words. Their personalized service sets them apart from the rest.', kpi: 'Booked-out calendar', photo: 'https://adoutreach.com/wp-content/uploads/2024/04/Tim-McCormick.png' }];

function Testimonials() {
  return (
    <section className="section-sm bg-paper page" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: 36 }}>
          <span className="eyebrow2 center">Thousands Of Success Stories</span>
          <h2>Here Are Just <span className="grad">A Few</span></h2>
        </div>
        <div className="testi-grid">
          {QUOTES.map((t, i) =>
          <div className="testi-card reveal" key={i} style={{ transitionDelay: i * 0.06 + 's' }}>
              <div className="testi-kpi">{t.kpi}</div>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-q">"{t.q}"</p>
              <div className="testi-attr">
                <div className="testi-av">
                  <span className="av-initials">{t.n.split(' ').map((x) => x[0]).join('')}</span>
                  {t.photo && <img src={window.RES('testi' + i, t.photo)} alt={t.n} loading="lazy" onError={(e) => {e.target.style.display = 'none';}} />}
                </div>
                <div><div className="testi-name">{t.n}</div><div className="testi-role">{t.r}</div></div>
              </div>
            </div>
          )}
        </div>
        <div className="see-all reveal">
          <a href="https://adoutreach.com/success-stories/" target="_blank" rel="noopener">See More Success Stories <I.arrow /></a>
        </div>
      </div>
    </section>);

}

window.Nav = Nav;window.Hero = Hero;window.Marquee = Marquee;
window.OfferSection = OfferSection;window.Comparison = Comparison;
window.Founder = Founder;window.Testimonials = Testimonials;
window.ApplyCTABand = ApplyCTABand;