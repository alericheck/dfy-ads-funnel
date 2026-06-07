/* global React, I */
const { useState: aS, useEffect: aE } = React;

const APPLY_URL = 'https://adoutreach.com/apply-adroll';

function ApplySection() {
  return (
    <section className="section apply ao-dark page" id="apply">
      <div className="hero-glow" />
      <div className="wrap apply-grid">
        <div className="apply-copy reveal">
          <span className="kicker-pill"><I.bolt style={{ width: 14, height: 14 }} /> Spots Are Limited</span>
          <h2 style={{ marginTop: 16 }}>Apply For <span className="grad">Done For You</span> Ads Management</h2>
          <p>If you're ready to have your ads run, optimized and scaled for you, apply now. If you qualify, you'll book a call with our team to map out your custom plan.</p>
          <div className="qual-box">
            <div className="qb-h">To Qualify You Must</div>
            <ul>
              <li><I.check /><span>Be a <b style={{ color: '#fff' }}>coach, consultant, course creator</b> or service-based business</span></li>
              <li><I.check /><span>Have a marketing budget of <b style={{ color: '#fff' }}>$10k/mo or more</b></span></li>
              <li><I.check /><span>Be ready to scale with proven video ads</span></li>
            </ul>
          </div>
          <div className="month-note"><I.shield /> Month-to-month - no long-term contract</div>
        </div>

        <div className="cta-card reveal" style={{ transitionDelay: '.1s' }}>
          <div className="cta-card-glow" />
          <span className="cta-eyebrow"><I.cal /> Free Strategy Call</span>
          <h3>Ready To Scale Your Business?</h3>
          <p>Apply now and our team will review your business to see if we're a fit. It only takes a couple of minutes.</p>
          <a className="btn btn-coral btn-lg btn-block" href={APPLY_URL} target="_blank" rel="noopener">Apply Now <I.arrow /></a>
          <ul className="cta-reassure">
            <li><I.check /> Takes about 2 minutes to apply</li>
            <li><I.check /> No long-term contract, month-to-month</li>
            <li><I.check /> Limited spots available each month</li>
          </ul>
          <div className="cta-trust">Join <b>3,000+</b> businesses we've helped scale their leads &amp; sales</div>
        </div>
      </div>
    </section>);

}

function UrgencyBar({ show }) {
  const [closed, setClosed] = aS(false);
  const [past, setPast] = aS(false);
  aE(() => {const f = () => setPast(window.scrollY > 700);window.addEventListener('scroll', f);f();return () => window.removeEventListener('scroll', f);}, []);
  if (!show) return null;
  return (
    <div className={`urgency-bar ${closed || !past ? 'hide' : ''}`}>
      <span className="ub-txt"><I.bolt style={{ width: 18, height: 18 }} /> Done For You Ads Management<span className="ub-spots"> - spots are limited this month</span></span>
      <a className="btn" href={APPLY_URL} target="_blank" rel="noopener">Apply Now</a>
      <button className="ub-close" onClick={() => setClosed(true)} aria-label="Close">×</button>
    </div>);

}

function Footer() {
  return (
    <footer className="footer ao-dark page">
      <div className="wrap">
        <div className="footer-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <img className="footer-logo" src={window.RES('logoWhite', 'assets/adoutreach-logo-white.png')} alt="AdOutreach" />
            <span className="footer-tag">The #1 Authority for attracting clients through Video Ads & Video Marketing.</span>
          </div>
          <a className="btn btn-coral" href={APPLY_URL} target="_blank" rel="noopener">Apply Now <I.arrow /></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AdOutreach. All rights reserved.</span>
          <span>Terms · Privacy · Disclaimer · Earnings Disclaimer</span>
        </div>
      </div>
    </footer>);

}

window.ApplySection = ApplySection;window.UrgencyBar = UrgencyBar;window.Footer = Footer;