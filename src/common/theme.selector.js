const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
console.log(prefersDarkScheme)
if (prefersDarkScheme.matches) {
  document.body.classList.add('bg-dark')
} else {
  document.body.classList.remove('bg-dark')
}

// $('.switch').click(()=>{
//   $([".light [class*='-light']", ".dark [class*='-dark']"]).each((i,ele)=>{
//       $(ele).toggleClass('bg-light bg-dark')
//       $(ele).toggleClass('text-light text-dark')
//       $(ele).toggleClass('navbar-light navbar-dark')
//   })
//   // toggle body class selector
//   $('body').toggleClass('light dark')
// })
