(function(){
  const KEY = 'cerebra_consent';
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

  const stored = localStorage.getItem(KEY);
  if(stored){
    setGtagConsent(stored);
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
    setGtagConsent('granted');
    hideBanner(banner);
  });
  document.getElementById('cookie-reject').addEventListener('click', function(){
    localStorage.setItem(KEY, 'denied');
    setGtagConsent('denied');
    hideBanner(banner);
  });
})();
