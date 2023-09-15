let nick = document.querySelector("#nickname");
let formPlayer = document.querySelector(".info-player");

formPlayer.addEventListener("submit", (e)=>{
    if(nick.value.length < 3){
        e.preventDefault();
        alert("escolha um nick!")
        nick.style.border="2px solid red"
    }
    // else{
    //     window.location.href="http://www.devmedia.com.br/guia/javascript/34372"
    // }
})

// anime({
//   targets: '.el',
//   translateX: 250,
//   direction: 'alternate',
//   loop: true,
//   autoplay: true,
//   easing: 'linear'
// });

anime({
  targets: '#mainSvg',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 5000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});