import TagManager from 'react-gtm-module'

function injectRDScript() {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src =
    'https://d335luupugsy2.cloudfront.net/js/loader-scripts/ea018d40-ab17-4773-9181-14cb8ea96f37-loader.js'
  script.async = true

  setTimeout(() => {
    document.body.appendChild(script)
  }, 3000)
}

const HotjarScript = `(function(h, o, t, j, a, r) {
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:1755159,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');
  r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`

function injectHotjarScript() {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.innerHTML = HotjarScript

  document.head.insertBefore(
    document.head.appendChild(script),
    document.head.childNodes[0]
  )
}

const CustomDataScript = `window.customData = {
  page: {
    name: '',
  },
  site: {
    portal: '',
    versao: '',
    brand: '',
  },
  user: {
    numero: '',
    points: '',
    logged: '',
    loginType: '',
  },
}`

function injectCustomDataScript() {
  const script = document.createElement('script')

  script.innerHTML = CustomDataScript

  document.head.insertBefore(
    document.head.appendChild(script),
    document.head.childNodes[0]
  )
}

const tagManagerArgs = {
  gtmId: 'GTM-M4L9HVF',
}

export default function injectExternalScripts() {
  TagManager.initialize(tagManagerArgs)
  injectHotjarScript()
  injectCustomDataScript()
  injectRDScript()
}
