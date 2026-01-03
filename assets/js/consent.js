(function(){
  const KEY = 'cerebra_consent';
  const COOKIE_NAME = 'cerebra_consent';
  function setCookie(name, value, days){
    const d = new Date(); d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + d.toUTCString() + ';SameSite=Lax';
  }
  function getCookie(name){
    const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? decodeURIComponent(v.pop()) : null;
  }

  function setGtagConsent(status, attempts = 0){
    if(window.gtag){
      if(status === 'granted'){
        gtag('consent','update',{ 'ad_storage':'granted','analytics_storage':'granted' });
        // ensure measurement starts after consent
        gtag('config', 'G-FJEQ5ZZCHD');
      } else {
        gtag('consent','update',{ 'ad_storage':'denied','analytics_storage':'denied' });
      }
      return;
    }
    if(attempts < 10){
      setTimeout(()=> setGtagConsent(status, attempts+1), 500);
    }
  }

  function hideBanner(banner){ if(banner && banner.parentNode) banner.parentNode.removeChild(banner); }

  // check localStorage first, fallback to cookie (handles odd environments)
  const stored = localStorage.getItem(KEY) || getCookie(COOKIE_NAME);
  if(stored){
    setGtagConsent(stored);
    // ensure banner is not built/shown
    return;
  }

  // build banner
  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-message">We use cookies for analytics to improve the website. By clicking "Accept" you consent to analytics cookies. <a href="/privacy.html">Privacy policy</a></div>
      <div class="cookie-actions">
        <button id="cookie-accept" class="btn-accept">Accept</button>
        <button id="cookie-reject" class="btn-reject">Reject</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', function(){
    localStorage.setItem(KEY, 'granted');
    setCookie(COOKIE_NAME, 'granted', 365);
    setGtagConsent('granted');
    hideBanner(banner);
  });
  document.getElementById('cookie-reject').addEventListener('click', function(){
    localStorage.setItem(KEY, 'denied');
    setCookie(COOKIE_NAME, 'denied', 365);
    setGtagConsent('denied');
    hideBanner(banner);
  });
})();
