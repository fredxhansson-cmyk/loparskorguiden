import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ORG_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Löparskoguiden\",\"url\":\"https://loparskoguiden.vercel.app\",\"logo\":\"https://loparskoguiden.vercel.app/favicon.ico\",\"description\":\"Oberoende jämförelsetjänst för svenska konsumenter inom sport.\",\"foundingDate\":\"2026\",\"inLanguage\":\"sv-SE\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"url\":\"https://loparskoguiden.vercel.app/kontakt\"}}";
const WEB_PAGE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Bästa löparskor 2026 - Guide och tips\",\"description\":\"Upptäck de bästa löparskorna 2026 för optimal komfort och prestanda. ✓ Uppdaterad 2026\",\"url\":\"https://loparskoguiden.vercel.app\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"inLanguage\":\"sv-SE\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"Löparskoguiden\",\"url\":\"https://loparskoguiden.vercel.app\"},\"breadcrumb\":{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Hem\",\"item\":\"https://loparskoguiden.vercel.app\"}]}}";
const ITEM_LIST_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Bästa löparskor 2026: en guide — Jämförelse 2026\",\"description\":\"Upptäck de bästa löparskorna för 2026 för optimala prestationer.\",\"numberOfItems\":8,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"item\":{\"@type\":\"Product\",\"name\":\"Garmin Forerunner 265\",\"url\":\"https://www.amazon.se/dp/B0BS11J3BR\",\"description\":\"AMOLED löparklocka med avancerad träningsanalys\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.9\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"589\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"4490\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0BS11J3BR\"}}},{\"@type\":\"ListItem\",\"position\":2,\"item\":{\"@type\":\"Product\",\"name\":\"Nike Air Zoom Pegasus 41\",\"url\":\"https://www.amazon.se/dp/B0C2J3SMXL\",\"description\":\"Världens mest populära löparsko — perfekt för alla distanser\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"753\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1195\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0C2J3SMXL\"}}},{\"@type\":\"ListItem\",\"position\":3,\"item\":{\"@type\":\"Product\",\"name\":\"ASICS Gel-Kayano 31\",\"url\":\"https://www.amazon.se/dp/B0BVHKBGVZ\",\"description\":\"Maximal stabilitet och dämpning — perfekt för överbetoning\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"171\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1695\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0BVHKBGVZ\"}}},{\"@type\":\"ListItem\",\"position\":4,\"item\":{\"@type\":\"Product\",\"name\":\"Polar Vantage M3\",\"url\":\"https://www.amazon.se/dp/B0C9HF1CH7\",\"description\":\"Mångsidig träningsklocka med SleepWise och FuelWise\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"112\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"3190\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0C9HF1CH7\"}}},{\"@type\":\"ListItem\",\"position\":5,\"item\":{\"@type\":\"Product\",\"name\":\"Adidas Ultraboost 24\",\"url\":\"https://www.amazon.se/dp/B0BS7YXW7N\",\"description\":\"Ikonisk komfort och återvunnet material — löpning & vardag\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"519\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1695\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0BS7YXW7N\"}}},{\"@type\":\"ListItem\",\"position\":6,\"item\":{\"@type\":\"Product\",\"name\":\"Brooks Ghost 16\",\"url\":\"https://www.amazon.se/dp/B0C68FHCPF\",\"description\":\"Neutral löparsko med DNA LOFT v3-dämpning för alla distanser\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"708\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1495\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0C68FHCPF\"}}},{\"@type\":\"ListItem\",\"position\":7,\"item\":{\"@type\":\"Product\",\"name\":\"Wahoo KICKR Core\",\"url\":\"https://www.amazon.se/dp/B07NB4W7QZ\",\"description\":\"Direktdrivet cykelträning hemma — tyst och precist motstånd\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"739\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"7990\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B07NB4W7QZ\"}}},{\"@type\":\"ListItem\",\"position\":8,\"item\":{\"@type\":\"Product\",\"name\":\"New Balance Fresh Foam X 1080\",\"url\":\"https://www.amazon.se/dp/B0BSXDLMHM\",\"description\":\"Lyxig dämpning för långa distanser — toppval för maratonlöpning\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"316\"},\"offers\":{\"@type\":\"Offer\",\"price\":\"1795\",\"priceCurrency\":\"SEK\",\"availability\":\"https://schema.org/InStock\",\"url\":\"https://www.amazon.se/dp/B0BSXDLMHM\"}}}]}";
const ARTICLE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bästa löparskor 2026: en guide\",\"description\":\"Upptäck de bästa löparskorna för 2026 för optimala prestationer.\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"author\":{\"@type\":\"Organization\",\"name\":\"Löparskoguiden\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Löparskoguiden\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://loparskoguiden.vercel.app\"}}";
const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Vilka är de bästa löparskorna 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"De bästa löparskorna 2026 inkluderar modeller från Garmin, Nike, ASICS, Polar, Adidas, Brooks, Wahoo och New Balance. Varje modell erbjuder unik komfort och prestanda, så det bästa valet beror på dina individuella behov och preferenser.\"}}]}";

export async function getStaticProps() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.toLocaleDateString('sv-SE', { month: 'long' });
  var updated = now.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  var fallback = [{"url":"https://www.amazon.se/dp/B0BS11J3BR","asin":"B0BS11J3BR","name":"Garmin Forerunner 265","pros":["AMOLED-skärm","Avancerad löpanalys","13 dagars batteritid"],"badge":"🏆 Bäst löparklocka","brand":"Garmin","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0BS11J3BR","price":"4 490 kr","score":"4.9","network":"amazon","priceValue":4490,"description":"AMOLED löparklocka med avancerad träningsanalys"},{"url":"https://www.amazon.se/dp/B0C2J3SMXL","asin":"B0C2J3SMXL","name":"Nike Air Zoom Pegasus 41","pros":["ReactX-dämpning","Bred passform","Passar alla distanser"],"badge":"Bäst löparsko","brand":"Nike","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0C2J3SMXL","price":"1 195 kr","score":"4.8","network":"amazon","priceValue":1195,"description":"Världens mest populära löparsko — perfekt för alla distanser"},{"url":"https://www.amazon.se/dp/B0BVHKBGVZ","asin":"B0BVHKBGVZ","name":"ASICS Gel-Kayano 31","pros":["LITETRUSS-teknik","Maximal dämpning","Bred häl"],"badge":"Bäst stabilitet","brand":"ASICS","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0BVHKBGVZ","price":"1 695 kr","score":"4.7","network":"amazon","priceValue":1695,"description":"Maximal stabilitet och dämpning — perfekt för överbetoning"},{"url":"https://www.amazon.se/dp/B0C9HF1CH7","asin":"B0C9HF1CH7","name":"Polar Vantage M3","pros":["SleepWise-sömnanalys","Inbyggd GPS","7 dagars batteritid"],"badge":"Bäst triatlon","brand":"Polar","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0C9HF1CH7","price":"3 190 kr","score":"4.7","network":"amazon","priceValue":3190,"description":"Mångsidig träningsklocka med SleepWise och FuelWise"},{"url":"https://www.amazon.se/dp/B0BS7YXW7N","asin":"B0BS7YXW7N","name":"Adidas Ultraboost 24","pros":["Boost-dämpning","Primeknit-överdel","Hållbart material"],"badge":"Bäst komfort","brand":"Adidas","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0BS7YXW7N","price":"1 695 kr","score":"4.6","network":"amazon","priceValue":1695,"description":"Ikonisk komfort och återvunnet material — löpning & vardag"},{"url":"https://www.amazon.se/dp/B0C68FHCPF","asin":"B0C68FHCPF","name":"Brooks Ghost 16","pros":["DNA LOFT v3","Neutral stödprofil","Utmärkt hållbarhet"],"badge":"Bäst neutral","brand":"Brooks","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0C68FHCPF","price":"1 495 kr","score":"4.8","network":"amazon","priceValue":1495,"description":"Neutral löparsko med DNA LOFT v3-dämpning för alla distanser"},{"url":"https://www.amazon.se/dp/B07NB4W7QZ","asin":"B07NB4W7QZ","name":"Wahoo KICKR Core","pros":["Direktdrivet","WiFi + ANT+","Kompatibel med Zwift/Wahoo"],"badge":"Bäst träningscykel","brand":"Wahoo","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B07NB4W7QZ","price":"7 990 kr","score":"4.8","network":"amazon","priceValue":7990,"description":"Direktdrivet cykelträning hemma — tyst och precist motstånd"},{"url":"https://www.amazon.se/dp/B0BSXDLMHM","asin":"B0BSXDLMHM","name":"New Balance Fresh Foam X 1080","pros":["Fresh Foam X-dämpning","Plushkänsla","Perfekt för långdistans"],"badge":"Bäst maraton","brand":"New Balance","image":"https://axiom-engine-production-54c3.up.railway.app/img/amazon/B0BSXDLMHM","price":"1 795 kr","score":"4.7","network":"amazon","priceValue":1795,"description":"Lyxig dämpning för långa distanser — toppval för maratonlöpning"}];
  var items = fallback.slice();

  return {
    props: { providers: items, year: year, month: month, updated: updated },
    revalidate: 86400,
  };
}

export default function Home({ providers, year, month, updated }) {
  const [sortBy, setSortBy] = useState('betyg');
  const [visibleCount, setVisibleCount] = useState(5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  

  var extractNum = function(p) {
    if (p.rateValue) return parseFloat(p.rateValue);
    if (p.priceValue) return parseFloat(p.priceValue);
    var m = String(p.price||'').match(/[0-9]+[.,]?[0-9]*/);
    return m ? parseFloat(m[0].replace(',','.')) : 9999;
  };
  var sorted = [...providers].sort(function(a, b) {
    if (sortBy === 'pris') return extractNum(a) - extractNum(b);
    if (sortBy === 'namn') return a.name.localeCompare(b.name, 'sv');
    return parseFloat(b.score||b.rating||0) - parseFloat(a.score||a.rating||0);
  });
  var visible = sorted.slice(0, visibleCount);
  var toggleSelect = function(name) {
    setSelected(function(prev) {
      return prev.includes(name) ? prev.filter(function(n){return n!==name;}) : prev.length < 3 ? prev.concat([name]) : prev;
    });
  };
  var selectedProviders = providers.filter(function(p){return selected.includes(p.name);});

  const pc = '#16a34a';
  const pcLight = '#16a34a14';
  const pcMed = '#16a34a30';

  const TRACK_BASE = 'https://axiom-engine-production-54c3.up.railway.app/r';
  const SITE_SLUG = 'loparskoguiden';
  const AffBtn = ({ url, name, primary, network }) => {
    var href = TRACK_BASE && TRACK_BASE.startsWith('http')
      ? TRACK_BASE + '?p=' + encodeURIComponent(name) + '&url=' + encodeURIComponent(url) + '&site=' + SITE_SLUG + (network && network !== 'adtraction' ? '&network=' + encodeURIComponent(network) : '')
      : url;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
          padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
          textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
        {network === 'amazon' ? 'Köp på Amazon →' : 'Välj ' + name + ' →'}
      </a>
    );
  };

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Bästa löparskor 2026 - Guide och tips</title>
        <meta name="description" content="Upptäck de bästa löparskorna 2026 för optimal komfort och prestanda. ✓ Uppdaterad 2026" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://loparskoguiden.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bästa löparskor 2026 - Guide och tips" />
        <meta property="og:description" content="Upptäck de bästa löparskorna 2026 för optimal komfort och prestanda. ✓ Uppdaterad 2026" />
        <meta property="og:url" content="https://loparskoguiden.vercel.app" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:site_name" content="Löparskoguiden" />
        <meta property="og:image" content="https://loparskoguiden.vercel.app/api/og?title=B%C3%A4sta%20l%C3%B6parskor%202026%20-%20Guide%20och%20tips&niche=sport" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bästa löparskor 2026 - Guide och tips" />
        <meta name="twitter:description" content="Upptäck de bästa löparskorna 2026 för optimal komfort och prestanda. ✓ Uppdaterad 2026" />
        <meta name="twitter:image" content="https://loparskoguiden.vercel.app/api/og?title=B%C3%A4sta%20l%C3%B6parskor%202026%20-%20Guide%20och%20tips&niche=sport" />
        <link rel="alternate" hreflang="sv" href="https://loparskoguiden.vercel.app" />
        <link rel="alternate" hreflang="x-default" href="https://loparskoguiden.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEB_PAGE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ITEM_LIST_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          Löparskoguiden
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:pcLight, color:pc, padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Uppdaterad {updated}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:'#f0fdf4', color:'#15803d', padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Oberoende jämförelse
              </div>
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Bästa löparskor 2026: en guide
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Upptäck de bästa löparskorna för 2026 för optimala prestationer.
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
              Upptäck dina favoriter →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"18\" y=\"130\" width=\"34\" height=\"68\" rx=\"5\" fill=\"#16a34a\" opacity=\"0.18\"/><rect x=\"64\" y=\"98\" width=\"34\" height=\"100\" rx=\"5\" fill=\"#16a34a\" opacity=\"0.38\"/><rect x=\"110\" y=\"58\" width=\"34\" height=\"140\" rx=\"5\" fill=\"#16a34a\" opacity=\"0.65\"/><rect x=\"156\" y=\"76\" width=\"34\" height=\"122\" rx=\"5\" fill=\"#16a34a\" opacity=\"0.82\"/><rect x=\"202\" y=\"36\" width=\"34\" height=\"162\" rx=\"5\" fill=\"#16a34a\"/><path d=\"M35 124 L81 93 L127 53 L173 71 L219 31\" stroke=\"#16a34a\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"35\" cy=\"124\" r=\"5\" fill=\"#16a34a\"/><circle cx=\"81\" cy=\"93\" r=\"5\" fill=\"#16a34a\"/><circle cx=\"127\" cy=\"53\" r=\"5\" fill=\"#16a34a\"/><circle cx=\"173\" cy=\"71\" r=\"5\" fill=\"#16a34a\"/><circle cx=\"219\" cy=\"31\" r=\"5\" fill=\"#16a34a\"/><circle cx=\"228\" cy=\"178\" r=\"24\" fill=\"#16a34a\" opacity=\"0.12\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"228\" y=\"184\" text-anchor=\"middle\" fill=\"#16a34a\" font-family=\"Inter,sans-serif\" font-size=\"13\" font-weight=\"700\">kr</text></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#16a34a',fontWeight:800,flexShrink:0}}>✓</span><span>Förbättrad komfort</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#16a34a',fontWeight:800,flexShrink:0}}>✓</span><span>Hållbar design</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#16a34a',fontWeight:800,flexShrink:0}}>✓</span><span>Optimerad prestanda</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför toppmodeller
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat {updated}
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['betyg','pris','namn'].map(function(s) { return (
            <button key={s} onClick={() => setSortBy(s)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: sortBy===s ? pc : '#f1f5f9',
                color: sortBy===s ? '#fff' : '#64748b' }}>
              {s==='betyg' ? '⭐ Bäst betyg' : s==='pris' ? '💰 Lägst pris' : '🔤 Namn A–Ö'}
            </button>
          ); })}
        </div>


        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {visible.map((p, i) => (
            <div key={p.name} style={{ background:'#fff', border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0', borderRadius:16, padding:'22px 26px', position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a' }}>
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background: i===0 ? pcLight : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b', flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                {p.name && (
                  <div style={{ width:72, height:72, flexShrink:0, borderRadius:10, background:'#f0f4ff', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ maxWidth:68, maxHeight:68, objectFit:'contain', borderRadius:6 }}
                        onError={function(e){
                          e.target.style.display='none';
                          var init=document.createElement('span');
                          init.textContent=(p.brand||p.name||'?')[0].toUpperCase();
                          init.style.cssText='font-size:26px;font-weight:800;color:#6366f1;';
                          e.target.parentElement.appendChild(init);
                        }}
                      />
                    ) : (
                      <span style={{ fontSize:26, fontWeight:800, color:'#6366f1' }}>{(p.brand||p.name||'?')[0].toUpperCase()}</span>
                    )}
                  </div>
                )}
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a', marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>{p.description}</div>
                  {p.pros && <div style={{ display:'flex', flexDirection:'column', gap:5 }}>{p.pros.map((pro, j) => (<div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13 }}><span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ color:'#374151' }}>{pro}</span></div>))}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:190, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>{p.currentPrice || p.price}</div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} network={p.network} />
                  <button onClick={() => toggleSelect(p.name)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor: selected.includes(p.name) || selected.length < 3 ? 'pointer' : 'not-allowed', fontFamily:'Inter,sans-serif', border:'1px solid', borderColor: selected.includes(p.name) ? pc : '#e2e8f0', background: selected.includes(p.name) ? pcLight : '#fff', color: selected.includes(p.name) ? pc : '#64748b', opacity: !selected.includes(p.name) && selected.length >= 3 ? 0.4 : 1 }}>
                    {selected.includes(p.name) ? '✓ Vald' : '+ Jämför'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {visibleCount < sorted.length && (
            <button onClick={() => setVisibleCount(function(c){ return Math.min(c + 5, sorted.length); })}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid '+pc, background:'#fff', color:pc }}>
              Visa 5 fler ↓ &nbsp;<span style={{ fontWeight:400, fontSize:13, opacity:0.7 }}>({sorted.length - visibleCount} återstår)</span>
            </button>
          )}
          {visibleCount >= sorted.length && sorted.length > 5 && (
            <button onClick={() => setVisibleCount(5)}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid #e2e8f0', background:'#fff', color:'#64748b' }}>
              Visa färre ↑
            </button>
          )}
          <p style={{ margin:0, fontSize:13, color:'#94a3b8' }}>
            Visar {visible.length} av {sorted.length} alternativ
            {selected.length > 0 && <span style={{ marginLeft:12, color:pc, fontWeight:600 }}>{selected.length} valda för jämförelse</span>}
          </p>
          <p style={{ margin:0, fontSize:11, color:'#cbd5e1' }}>
            Priser är riktpriser — klicka på ett alternativ för aktuellt pris hos respektive leverantör
          </p>
        </div>

        {selected.length >= 2 && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:80,
            background:'#0f172a', padding:'14px 20px', fontFamily:'Inter,sans-serif',
            display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap',
            boxShadow:'0 -4px 32px rgba(0,0,0,0.25)' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:14 }}>
              {selected.length} valda: {selected.join(' vs ')}
            </span>
            <button onClick={() => setShowCompare(true)}
              style={{ background:pc, color:'#fff', border:'none', borderRadius:8,
                padding:'9px 22px', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Jämför nu →
            </button>
            <button onClick={() => setSelected([])}
              style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155',
                borderRadius:8, padding:'9px 14px', fontSize:13, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Rensa
            </button>
          </div>
        )}

        {showCompare && (
          <div onClick={() => setShowCompare(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:200,
            display:'flex', alignItems:'flex-start', justifyContent:'center',
            padding:'24px 16px', overflowY:'auto', fontFamily:'Inter,sans-serif' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16,
              width:'100%', maxWidth: selectedProviders.length === 2 ? 700 : 940,
              padding:28, marginTop:12, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h3 style={{ fontSize:20, fontWeight:800, margin:0, color:'#0f172a' }}>
                  Jämförelse — {selectedProviders.map(function(p){return p.name;}).join(' vs ')}
                </h3>
                <button onClick={() => setShowCompare(false)}
                  style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns: selectedProviders.map(function(){return '1fr';}).join(' '), gap:14 }}>
                {selectedProviders.map(function(p) { return (
                  <div key={p.name} style={{ border:'2px solid '+pc+'30', borderRadius:12, padding:'20px 18px',
                    display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ fontWeight:800, fontSize:17, color:'#0f172a', borderBottom:'1px solid #f1f5f9', paddingBottom:10 }}>{p.name}</div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>PRIS</div>
                      <div style={{ fontSize:20, fontWeight:800, color:pc }}>{p.currentPrice||p.price||'—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>BETYG</div>
                      <Stars score={p.score} />
                    </div>
                    {p.badge && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>UTMÄRKELSE</div>
                        <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block' }}>{p.badge}</div>
                      </div>
                    )}
                    {p.description && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>OM TJÄNSTEN</div>
                        <div style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{p.description}</div>
                      </div>
                    )}
                    {p.pros && p.pros.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:6 }}>FÖRDELAR</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                          {p.pros.map(function(pro,j){return(
                            <div key={j} style={{ display:'flex', gap:6, fontSize:13 }}>
                              <span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span>
                              <span style={{ color:'#374151' }}>{pro}</span>
                            </div>
                          );})}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop:'auto', paddingTop:10 }}>
                      <AffBtn url={p.url} name={p.name} primary={true} network={p.network} />
                    </div>
                  </div>
                );})}
              </div>
              <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
                * Stäng för att välja fler alternativ eller byta urval.
              </p>
            </div>
          </div>
        )}

        <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Välj rätt löparskor
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>
            När det kommer till att välja rätt löparskor är det viktigt att tänka på ett par faktorer. Först och främst bör du överväga din löpstil och fotens anatomi. Pronationsmönster kan påverka vilken typ av stöd du behöver. För de som har en neutral löpstil kan en sko med balanserat stöd vara idealisk, medan de med överpronation kan dra nytta av extra stabilitet. Materialval spelar också en viktig roll. Många moderna löparskor använder avancerade material som ger både lätt vikt och tillräcklig dämpning. Ventilation är en annan faktor att ta hänsyn till, särskilt om du planerar att springa långa sträckor eller i varmare klimat. Slutligen, tänk på hållbarheten hos skon, särskilt om du springer ofta. En högkvalitativ löparsko kan vara en investering, men den kommer att ge avkastning i form av komfort och reducerad risk för skador.
          </p>
          <h3 style={{ fontSize:22, fontWeight:700, marginBottom:16, color:'#0f172a', marginTop:40 }}>Vanliga misstag</h3>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>Ett vanligt misstag många löpare gör är att välja skor baserat på utseendet snarare än funktionaliteten. Det är viktigt att prioritera komfort och stöd över stil. Ett annat misstag är att inte byta skor regelbundet. Löparskor förlorar sin dämpning och stöd över tid, vilket kan leda till skador. Det rekommenderas att byta skor efter ungefär 500-800 kilometers löpning. Många löpare misslyckas också med att prova skor ordentligt innan köp. Det är viktigt att testa skorna med rätt typ av strumpor och under de förhållanden du planerar att använda dem. Slutligen, ignorerar många betydelsen av rätt passform. En sko som inte sitter bra kan orsaka blåsor och obehag.</p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#16a34a15',color:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Prova olika märken</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#16a34a15',color:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Fokus på passform</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#16a34a15',color:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Byt skor regelbundet</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#16a34a15',color:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Välj rätt dämpning</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilka är de bästa löparskorna 2026?<span style={{color:'#16a34a',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>De bästa löparskorna 2026 inkluderar modeller från Garmin, Nike, ASICS, Polar, Adidas, Brooks, Wahoo och New Balance. Varje modell erbjuder unik komfort och prestanda, så det bästa valet beror på dina individuella behov och preferenser.</p></details>
      </section>

      <section style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'32px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:12, fontWeight:600 }}>Läs mer:</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="/loparskor" style={{color:'#16a34a',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa löparskor</a>
            · <a href="/smartwatch" style={{color:'#16a34a',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa träningsklocka</a>
            · <a href="/cykel" style={{color:'#16a34a',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa cykel</a>
            · <a href="/traning" style={{color:'#16a34a',fontWeight:600,textDecoration:'none',fontSize:14}}>Bästa träningsutrustning</a>
          </div>
        </div>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:260 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18, marginBottom:10 }}>Löparskoguiden</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter. Vi jämför 8 alternativ inom sport.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
            
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Jämförelser</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/jamfor/garmin-forerunner-265-vs-nike-air-zoom-pegasus-41" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Garmin Forerunner 265 vs Nike Air Zoom Pegasus 41</Link>
                <Link href="/jamfor/garmin-forerunner-265-vs-asics-gel-kayano-31" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Garmin Forerunner 265 vs ASICS Gel-Kayano 31</Link>
                <Link href="/jamfor/garmin-forerunner-265-vs-polar-vantage-m3" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Garmin Forerunner 265 vs Polar Vantage M3</Link>
                <Link href="/jamfor/garmin-forerunner-265-vs-adidas-ultraboost-24" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Garmin Forerunner 265 vs Adidas Ultraboost 24</Link>
                <Link href="/jamfor/garmin-forerunner-265-vs-brooks-ghost-16" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Garmin Forerunner 265 vs Brooks Ghost 16</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; {year} Löparskoguiden. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}