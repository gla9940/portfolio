$(document).ready(function () {

  $(window).scroll(function () {

    if ($(window).scrollTop() > 300) {

      $("#header").addClass('scroll');

    } else {

      $("#header").removeClass('scroll');
    }
  });


  $(".modal-neo").hide();
  $(".neopharm .img-box02").click(function () {
    $(".modal-neo").show();
  })

  $(".modal-neo .close").click(function () {
    $(".modal-neo").hide();
  })

  $(".modal-zinus").hide();
  $(".zinus .img-box02").click(function () {
    $(".modal-zinus").show();
  })

  $(".modal-zinus .close").click(function () {
    $(".modal-zinus").hide();
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

  /*버튼효과*/
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
      return '<a class="ms-slide__link">View More</a>';
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
    
    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
    const rotate = 'rotate(' + angle +'deg)';
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
    curosrModifier.addEventListener('mouseenter', function() {
      const className = this.getAttribute('cursor-class');
      cursor.classList.add(className);
    });
    
    curosrModifier.addEventListener('mouseleave', function() {
      const className = this.getAttribute('cursor-class');
      cursor.classList.remove(className);
    });
  });

});







