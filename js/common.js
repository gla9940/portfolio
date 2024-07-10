$(document).ready(function () {

  $(window).scroll(function () {

    if ($(window).scrollTop() > 300) {

      $("#header").addClass('scroll');

    } else {

      $("#header").removeClass('scroll');
    }


  });

  $(".modal-neo").hide();
  $(".neopharm .img-box02").click(function(){
    $(".modal-neo").show();
  })

  $(".modal-neo .close").click(function(){
    $(".modal-neo").hide();
  })

  $(".modal-zinus").hide();
  $(".zinus .img-box02").click(function(){
    $(".modal-zinus").show();
  })

  $(".modal-zinus .close").click(function(){
    $(".modal-zinus").hide();
  })

  /* 외부영역 클릭시 팝업 닫기 */
$(document).mouseup(function (e){
	if($(".layer_pop").has(e.target).length === 0){
		$(".layer_pop").hide();
	}
});

/* ESC 키 누를시 팝업 닫기 */
$(document).keydown(function(e){
	//keyCode 구 브라우저, which 현재 브라우저
    var code = e.keyCode || e.which;
 
    if (code == 27) { // 27은 ESC 키번호
        $('.layer_pop').hide();
    }
});

});

