$(document).ready(function () {

  $(window).scroll(function () {

    if ($(window).scrollTop() > 300) {

      $("#header").addClass('scroll');

    } else {

      $("#header").removeClass('scroll');
    }
  });

  /* 타이핑효과 */

String.prototype.toKorChars = function() { 
  var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], 
  cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
  cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong; 
   
  var str = this, 
      cnt = str.length, 
      chars = [], 
      cCode; 
  for (var i = 0; i < cnt; i++) { 
    cCode = str.charCodeAt(i); 
    if (cCode == 32) { 
      chars.push(" ");
      continue;
    } 
    // 한글이 아닌 경우 
    if (cCode < 0xAC00 || cCode > 0xD7A3) { 
      chars.push(str.charAt(i)); continue; 
    } 
    cCode = str.charCodeAt(i) - 0xAC00; 
 
    jong = cCode % 28; // 종성 
    jung = ((cCode - jong) / 28 ) % 21 // 중성 
    cho = (((cCode - jong) / 28 ) - jung ) / 21 // 초성 
 
    //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨 
    // chars.push(cCho[cho], cJung[jung]); 
    // if (cJong[jong] !== '') { 
    //     chars.push(cJong[jong]); 
    //     } 
 
 
    //  테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
    if (cJong[jong] !== '') { 
       chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
    }
            
  } 
  return chars; 
 }
 
 
 //타이핑할 문장
    var result  = "웹 디자이너 한경현입니다.";
    var typeing1=[];
    result = result.split(''); // 한글자씩자름
 
    //각글자 초성,중성,종성으로 나눔
    for(var i =0; i<result.length; i++){
      typeing1[i]=result[i].toKorChars();
    }
 
    //출력할 엘리먼트요소 가져옴 
    var resultDiv = document.getElementsByClassName("result")[0];
 
    var text = "";
    var i=0; 
    var j=0; 
 
    //총글자수
    var imax = typeing1.length;
 
    //setInterval을 이용해 반복적으로 출력 
    var inter = setInterval(typi,100);
 
 
    function typi(){
      //글자수만큼 반복후 종료 
      if(i<=imax-1){
        //각 글자가 초성 중성 종성 순서대로 추가되도록 
        var jmax = typeing1[i].length;
        resultDiv.innerHTML = text + typeing1[i][j];
        j++;
        if(j==jmax){
          text+=typeing1[i][j-1];
          //초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
          i++;
          j=0;
         }
       } else{
         clearInterval(inter);
       }
     }


/* 레이어 팝업 */

  $(".layer_pop").hide();
  $(".learn-more.neo").click(function () {
    $(".modal-neo").show();
  })

  $(".close").click(function () {
    $(".layer_pop").hide();
  })

  $(".learn-more.bz").click(function () {
    $(".modal-zinus").show();
  })

  $(".learn-more.konec02").click(function () {
    $(".modal-konec").show();
  })



  $(".learn-more.zep02").click(function () {
    $(".modal-zep").show();
  })




  /* 외부영역 클릭시 팝업 닫기 */
  $(document).mouseup(function (e) {
    if ($(".layer_pop").has(e.target).length === 0) {
      $(".layer_pop").hide();
    }
  });

  /* ESC 키 누를시 팝업 닫기 */
  $(document).keydown(function (e) {
    //keyCode 구 브라우저, which 현재 브라우저
    var code = e.keyCode || e.which;

    if (code == 27) { // 27은 ESC 키번호
      $('.layer_pop').hide();
    }
  });

  /* 버튼효과 */
  document.querySelectorAll('.button').forEach(button => {

    let div = document.createElement('div'),
      letters = button.textContent.trim().split('');

    function elements(letter, index, array) {

      let element = document.createElement('span'),
        part = (index >= array.length / 2) ? -1 : 1,
        position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
        move = position / (array.length / 2),
        rotate = 1 - move;

      element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
      element.style.setProperty('--move', move);
      element.style.setProperty('--rotate', rotate);
      element.style.setProperty('--part', part);

      div.appendChild(element);

    }

    letters.forEach(elements);

    button.innerHTML = div.outerHTML;

    button.addEventListener('mouseenter', e => {
      if (!button.classList.contains('out')) {
        button.classList.add('in');
      }
    });

    button.addEventListener('mouseleave', e => {
      if (button.classList.contains('in')) {
        button.classList.add('out');
        setTimeout(() => button.classList.remove('in', 'out'), 950);
      }
    });

  });


  var slidersContainer = document.querySelector('.sliders-container');

  // Initializing the numbers slider
  var msNumbers = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--numbers',
    range: [1, 4],
    rangeContent: function (i) {
      return '0' + i;
    },
    style: {
      transform: [{ scale: [0.4, 1] }],
      opacity: [0, 1]
    },
    interactive: false
  });

  // Initializing the titles slider
  var titles = [
    'Branding Design',
    'Banner Design',
    'Banner Design',
    'Banner Design'
  ];
  var msTitles = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--titles',
    range: [0, 3],
    rangeContent: function (i) {
      return '<h3>' + titles[i] + '</h3>';
    },
    vertical: true,
    reverse: true,
    style: {
      opacity: [0, 1]
    },
    interactive: false
  });

  // Initializing the links slider
  var msLinks = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'ms--links',
    range: [0, 3],
    rangeContent: function () {
      return '<a class="ms-slide__link">More</a>';
    },
    vertical: true,
    interactive: false
  });

  // Get pagination items
  var pagination = document.querySelector('.pagination');
  var paginationItems = [].slice.call(pagination.children);

  // Initializing the images slider
  var msImages = new MomentumSlider({
    // Element to append the slider
    el: slidersContainer,
    // CSS class to reference the slider
    cssClass: 'ms--images',
    // Generate the 4 slides required
    range: [0, 3],
    rangeContent: function () {
      return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
    },
    // Syncronize the other sliders
    sync: [msNumbers, msTitles, msLinks],
    // Styles to interpolate as we move the slider
    style: {
      '.ms-slide__image': {
        transform: [{ scale: [1.5, 1] }]
      }
    },
    // Update pagination if slider change
    change: function (newIndex, oldIndex) {
      if (typeof oldIndex !== 'undefined') {
        paginationItems[oldIndex].classList.remove('pagination__item--active');
      }
      paginationItems[newIndex].classList.add('pagination__item--active');
    }
  });

  // Select corresponding slider item when a pagination button is clicked
  pagination.addEventListener('click', function (e) {
    if (e.target.matches('.pagination__button')) {
      var index = paginationItems.indexOf(e.target.parentNode);
      msImages.select(index);
    }
  });

  const cursor = document.querySelector('#cursor');
  const cursorCircle = cursor.querySelector('.cursor__circle');

  const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
  const pos = { x: 0, y: 0 }; // cursor's coordinates
  const speed = 0.1; // between 0 and 1

  const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  window.addEventListener('mousemove', updateCoordinates);


  function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
  }

  function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
      Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
  }

  //마우스 오버
  const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    const rotate = 'rotate(' + angle + 'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
  };

  function loop() {
    updateCursor();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);



  const cursorModifiers = document.querySelectorAll('[cursor-class]');

  cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function () {
      const className = this.getAttribute('cursor-class');
      cursor.classList.add(className);
    });

    curosrModifier.addEventListener('mouseleave', function () {
      const className = this.getAttribute('cursor-class');
      cursor.classList.remove(className);
    });
  });

  $(".ms-track li:nth-child(1) a, .ms-slide:nth-child(1) .ms-slide__image").click(function () {
    $(".modal-design01").show();
  })


  $(".modal-design01 .close").click(function () {
    $(".layer_pop").hide();
  })

  $(".ms-track li:nth-child(2) a, .ms-slide:nth-child(2) .ms-slide__image").click(function () {
    $(".modal-design02").show();
  })


  $(".modal-design02 .close").click(function () {
    $(".layer_pop").hide();
  })

  $(".ms-track li:nth-child(3) a, .ms-slide:nth-child(3) .ms-slide__image").click(function () {
    $(".modal-design03").show();
  })


  $(".modal-design03 .close").click(function () {
    $(".layer_pop").hide();
  })

  $(".ms-track li:nth-child(4) a, .ms-slide:nth-child(4) .ms-slide__image").click(function () {
    $(".modal-design04").show();
  })


  $(".modal-design04 .close").click(function () {
    $(".layer_pop").hide();
  })

  // Drag&Drop Click event 해제

  function blockWhileDragging(isDragging) {
    let slides = document.getElementsByClassName("ms--images");

    if (isDragging) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add("is-dragging"); // is-dragging 클래스 추가
      }
    } else {
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("is-dragging"); // is-dragging 클래스 제거
      }
    }
  }

  // mousedown 여부를 판단할 변수
  let isMouseDown = false;

  // mousedown 이벤트에서 isMouseDown을 true로 변환
  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  // mousemove 이벤트에서 isMouseDown을 판단해 blockWhileDragging 함수 실행
  document.addEventListener("mousemove", () => {
    if (isMouseDown) {
      blockWhileDragging(true);
    } else {
      blockWhileDragging(false);
    }
  });

  // mouseup 이벤트에서 mousedown 이전 상태로 초기화
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
    blockWhileDragging(false);
  });



});







