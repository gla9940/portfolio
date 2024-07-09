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

});






