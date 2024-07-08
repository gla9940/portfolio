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

});

