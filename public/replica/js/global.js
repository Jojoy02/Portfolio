$(document).ready(function () {
  //open
  $(".wrap").addClass("open")

  //sd start
  setTimeout(function () {
    $(".wrap").addClass("sd_start")
  }, 500)

  //vd_pop
  /*
	setTimeout(function(){
		var vd_pop = $('#vd_pop').attr('src') + '?autoplay=1&mute=1&loop=1';
		$('#vd_pop').attr('src',vd_pop);
	},1500);
	setTimeout(function(){
		$('.vd_pop').addClass('on');
		$('.pop_dim').addClass('on');
	},2000);
	$(".vd_pop .vd_wrap .close").click(function() {
		$('.vd_pop').remove();
		var vd1 = $('#vd1').attr('src') + '?muted=1&autoplay=1&loop=1';
		$('#vd1').attr('src',vd1);
		$('#hd_pop').addClass('on');
	});
  */

  //tab
  $(document).on("click", ".tab_box > ul > .tab", function () {
    sd1.slideTo(0, 0)
    sd2.slideTo(0, 0)
    sd3.slideTo(0, 0)
    sd4.slideTo(0, 0)
    sd5.slideTo(0, 0)
    var idx = $(this).index()
    $(".tab_box > ul > li").removeClass("on")
    $(".tab_box > ul > li").eq(idx).addClass("on")
    $(".con_box > ul > li").removeClass("on")
    $(".con_box > ul > li").eq(idx).addClass("on")
    setTimeout(function () {
      $(".con_box > ul > li").removeClass("ani")
      $(".con_box > ul > li").eq(idx).addClass("ani")
    }, 0)
  })

  $(document).on("click", ".unit_plan .p1", function () {
    $(".sd4").removeClass("no_cube")
    setTimeout(function () {
      sd4.slideTo(1)
    }, 0)
  })
  $(document).on("click", ".unit_plan .p2", function () {
    $(".sd4").removeClass("no_cube")
    setTimeout(function () {
      sd4.slideTo(2)
    }, 0)
  })
  $(document).on("click", ".unit_plan .p3", function () {
    $(".sd4").removeClass("no_cube")
    setTimeout(function () {
      sd4.slideTo(3)
    }, 0)
  })
  $(document).on("click", ".unit_plan .p4", function () {
    $(".sd4").removeClass("no_cube")
    setTimeout(function () {
      sd4.slideTo(4)
    }, 0)
  })

  //unit bg
  $(".unit_plan").hover(
    function () {
      $(".unit_plan .bg").addClass("on")
    },
    function () {
      $(".unit_plan .bg").removeClass("on")
    },
  )
  $(".unit_plan .p1").hover(function () {
    $(".unit_plan .bg").removeClass("b2 b3 b4")
    $(".unit_plan .bg").addClass("b1")
  })
  $(".unit_plan .p2").hover(function () {
    $(".unit_plan .bg").removeClass("b1 b3 b4")
    $(".unit_plan .bg").addClass("b2")
  })
  $(".unit_plan .p3").hover(function () {
    $(".unit_plan .bg").removeClass("b1 b2 b4")
    $(".unit_plan .bg").addClass("b3")
  })
  $(".unit_plan .p4").hover(function () {
    $(".unit_plan .bg").removeClass("b1 b2 b3")
    $(".unit_plan .bg").addClass("b4")
  })

  //work detail：缩略图切换主图
  $(document).on("click", ".wd-thumbs button", function () {
    var src = $(this).attr("data-src")
    if (!src) return
    $(this).addClass("on").siblings("button").removeClass("on")
    $(this).closest(".rig").find(".wd-main").attr("src", src)
  })

  //unit tab
  $(document).on("click", ".unit_tab > li", function () {
    if ($(this).hasClass("on") == false) {
      var u_t_idx = $(this).index()
      var t = $(this)
      $(this).siblings("li").removeClass("on")
      $(this).addClass("on")
      $(this).closest(".top").next(".bot").find(".unit_box > li").fadeOut(400)
      $(this)
        .closest(".top")
        .next(".bot")
        .find(".unit_box > li")
        .eq(u_t_idx)
        .fadeIn(0)
      setTimeout(function () {
        $(t)
          .closest(".top")
          .next(".bot")
          .find(".unit_box > li")
          .removeClass("on")
        $(t)
          .closest(".top")
          .next(".bot")
          .find(".unit_box > li")
          .eq(u_t_idx)
          .addClass("on")
      }, 0)
    }
  })

  //logo
  $(document).on("click", "h1", function () {
    $(".tab_box .tab1").trigger("click")
  })

  //sd_area
  var sd1 = new Swiper(".sd1", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    //mousewheel: true,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".scroll.scr1").removeClass("bot_rot top_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        var isReversing = previousIndex > activeIndex
        $(".sd1").toggleClass("is-reversing", isReversing)
        $(".scroll.scr1").toggleClass("is-reversing", isReversing)
        setTimeout(function () {
          //down
          if (previousIndex === 0 && activeIndex === 1) {
            $(".scroll.scr1").addClass("bot_rot")
          }
          if (previousIndex === 1 && activeIndex === 2) {
            $(".scroll.scr1").removeClass("bot")
            $(".scroll.scr1").addClass("bot_rot top")
          }
          //up
          if (previousIndex === 1 && activeIndex === 0) {
            $(".scroll.scr1").removeClass("top")
            $(".scroll.scr1").addClass("top_rot bot")
          }
          if (previousIndex === 2 && activeIndex === 1) {
            $(".scroll.scr1").addClass("top_rot")
          }
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        $(".sd1").addClass("no_cube acting")
        $(".sd1, .scroll.scr1").removeClass("is-reversing")
      },
    },
  })
  $(document).on("click", ".sd1.acting + .scroll.scr1.bot", function () {
    $(".sd1").removeClass("no_cube")
    setTimeout(function () {
      sd1.slideNext()
    }, 0)
  })
  $(document).on("click", ".sd1.acting + .scroll.scr1.top", function () {
    $(".sd1").removeClass("no_cube")
    setTimeout(function () {
      sd1.slidePrev()
    }, 0)
  })
  $(".sd1").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd1").hasClass("acting")) {
      var activeIndex = sd1.activeIndex
      var totalSlides = sd1.slides.length
      if (activeIndex === 0) {
      } else {
        $(".sd1").removeClass("no_cube acting")
        setTimeout(function () {
          sd1.slidePrev()
        }, 0)
      }
    }
    if (delta > 0 && $(".sd1").hasClass("acting")) {
      var activeIndex = sd1.activeIndex
      var totalSlides = sd1.slides.length
      if (activeIndex === totalSlides - 1) {
      } else {
        $(".sd1").removeClass("no_cube acting")
        setTimeout(function () {
          sd1.slideNext()
        }, 0)
      }
    }
  })

  var sd2 = new Swiper(".sd2", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    //mousewheel: true,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".sd2").removeClass("acting")
        $(".scroll.scr2").removeClass("bot_rot top_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        setTimeout(function () {
          //down
          if (previousIndex === 0 && activeIndex === 1) {
            $(".scroll.scr2").removeClass("bot")
            $(".scroll.scr2").addClass("bot_rot top")
          }
          //up
          if (previousIndex === 1 && activeIndex === 0) {
            $(".scroll.scr2").removeClass("top")
            $(".scroll.scr2").addClass("top_rot bot")
          }
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        $(".sd2").addClass("no_cube acting")
      },
    },
  })
  $(document).on("click", ".sd2.acting + .scroll.scr2.bot", function () {
    $(".sd2").removeClass("no_cube")
    setTimeout(function () {
      sd2.slideNext()
    }, 0)
  })
  $(document).on("click", ".sd2.acting + .scroll.scr2.top", function () {
    $(".sd2").removeClass("no_cube")
    setTimeout(function () {
      sd2.slidePrev()
    }, 0)
  })
  $(".sd2").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    $(".sd2").removeClass("no_cube")
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd2").hasClass("acting")) {
      setTimeout(function () {
        sd2.slidePrev()
      }, 0)
    }
    if (delta > 0 && $(".sd2").hasClass("acting")) {
      var activeIndex = sd2.activeIndex
      var totalSlides = sd2.slides.length
      if (activeIndex === totalSlides - 1) {
        $(".sd2").addClass("no_cube")
      }
      setTimeout(function () {
        sd2.slideNext()
      }, 0)
    }
  })

  var sd3 = new Swiper(".sd3", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    //mousewheel: true,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".sd3").removeClass("acting")
        $(".scroll.scr3").removeClass("bot_rot top_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        setTimeout(function () {
          //down
          if (previousIndex === 0 && activeIndex === 1) {
            $(".scroll.scr3").addClass("bot_rot")
          }
          if (previousIndex === 1 && activeIndex === 2) {
            $(".scroll.scr3").removeClass("bot")
            $(".scroll.scr3").addClass("bot_rot top")
          }
          //up
          if (previousIndex === 1 && activeIndex === 0) {
            $(".scroll.scr3").removeClass("top")
            $(".scroll.scr3").addClass("top_rot bot")
          }
          if (previousIndex === 2 && activeIndex === 1) {
            $(".scroll.scr3").addClass("top_rot")
          }
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        $(".sd3").addClass("no_cube acting")
      },
    },
  })
  $(document).on("click", ".sd3.acting + .scroll.scr3.bot", function () {
    $(".sd3").removeClass("no_cube")
    setTimeout(function () {
      sd3.slideNext()
    }, 0)
  })
  $(document).on("click", ".sd3.acting + .scroll.scr3.top", function () {
    $(".sd3").removeClass("no_cube")
    setTimeout(function () {
      sd3.slidePrev()
    }, 0)
  })
  $(".sd3").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    $(".sd3").removeClass("no_cube")
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd3").hasClass("acting")) {
      setTimeout(function () {
        sd3.slidePrev()
      }, 0)
    }
    if (delta > 0 && $(".sd3").hasClass("acting")) {
      var activeIndex = sd3.activeIndex
      var totalSlides = sd3.slides.length
      if (activeIndex === totalSlides - 1) {
        $(".sd3").addClass("no_cube")
      }
      setTimeout(function () {
        sd3.slideNext()
      }, 0)
    }
  })

  //zoom
  function zoom() {
    $(".zoom_wrap").each(function (index, element) {
      var $this = $(this)
      var target = $(this).find(".target")
      var zoom = target.data("zoom")
      $this
        .on("mousemove", magnify)
        .prepend("<div class='magnifier'></div>")
        .children(".magnifier")
        .css({
          "background-size":
            target.width() * zoom + "px " + target.height() * zoom + "px",
        })
      var magnifier = $(this).find(".magnifier")
      function magnify(e) {
        var mouseX = e.pageX - $(this).offset().left
        var mouseY = e.pageY - $(this).offset().top
        if (
          mouseX < $(this).width() &&
          mouseY < $(this).height() &&
          mouseX > 0 &&
          mouseY > 0
        ) {
          magnifier.fadeIn(100)
        } else {
          magnifier.fadeOut(100)
        }
        if (magnifier.is(":visible")) {
          var rx = -(mouseX * zoom - magnifier.width() / 2)
          var ry = -(mouseY * zoom - magnifier.height() / 2)
          var px = mouseX - magnifier.width() / 2
          var py = mouseY - magnifier.height() / 2
          magnifier.css({
            left: px,
            top: py,
            backgroundPosition: rx + "px " + ry + "px",
          })
        }
      }
    })
  }
  zoom()
  $(document).on("click", ".r_f_p .unit_tab li", function () {
    setTimeout(function () {
      $(".magnifier").remove()
      zoom()
    }, 800)
  })

  var sd4 = new Swiper(".sd4", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".sd4 .swiper-slide").removeClass("com")
        $(".scroll.scr4").removeClass("bot_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        if (activeIndex === 0) {
          $(".scroll.scr4").addClass("none")
        } else {
          $(".scroll.scr4").removeClass("none")
        }
        setTimeout(function () {
          $(".scroll.scr4").addClass("bot_rot")
        }, 0)
        if (activeIndex === 3) {
          zoom()
        }
      },
      slideChangeTransitionEnd: function () {
        $(".sd4").addClass("no_cube acting")
        $(".sd4 .swiper-slide-active").addClass("com")
      },
    },
  })
  $(document).on("click", ".sd4.acting + .scroll.scr4.top", function () {
    $(".sd4").removeClass("no_cube")
    setTimeout(function () {
      sd4.slideTo(0)
    }, 0)
  })
  $(".sd4").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd4").hasClass("acting")) {
      var activeIndex = sd4.activeIndex
      var totalSlides = sd4.slides.length
      if (activeIndex === 0) {
      } else {
        $(".sd4").removeClass("no_cube acting")
        setTimeout(function () {
          sd4.slidePrev()
        }, 0)
      }
    }
    if (delta > 0 && $(".sd4").hasClass("acting")) {
      var activeIndex = sd4.activeIndex
      var totalSlides = sd4.slides.length
      if (activeIndex === totalSlides - 1) {
      } else {
        $(".sd4").removeClass("no_cube acting")
        setTimeout(function () {
          sd4.slideNext()
        }, 0)
      }
    }
  })

  var sd5 = new Swiper(".sd5", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    //mousewheel: true,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".sd5").removeClass("acting")
        $(".scroll.scr5").removeClass("bot_rot top_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        setTimeout(function () {
          //down
          if (previousIndex === 0 && activeIndex === 1) {
            $(".scroll.scr5").removeClass("bot")
            $(".scroll.scr5").addClass("bot_rot top")
          }
          //up
          if (previousIndex === 1 && activeIndex === 0) {
            $(".scroll.scr5").removeClass("top")
            $(".scroll.scr5").addClass("top_rot bot")
          }
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        $(".sd5").addClass("no_cube acting")
      },
    },
  })
  $(document).on("click", ".sd5.acting + .scroll.scr5.bot", function () {
    $(".sd5").removeClass("no_cube")
    setTimeout(function () {
      sd5.slideNext()
    }, 0)
  })
  $(document).on("click", ".sd5.acting + .scroll.scr5.top", function () {
    $(".sd5").removeClass("no_cube")
    setTimeout(function () {
      sd5.slidePrev()
    }, 0)
  })
  $(".sd5").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    $(".sd5").removeClass("no_cube")
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd5").hasClass("acting")) {
      setTimeout(function () {
        sd5.slidePrev()
      }, 0)
    }
    if (delta > 0 && $(".sd5").hasClass("acting")) {
      var activeIndex = sd5.activeIndex
      var totalSlides = sd5.slides.length
      if (activeIndex === totalSlides - 1) {
        $(".sd5").addClass("no_cube")
      }
      setTimeout(function () {
        sd5.slideNext()
      }, 0)
    }
  })

  var sd6 = new Swiper(".sd6", {
    speed: 800,
    effect: "cube",
    direction: "vertical",
    touchRatio: 0,
    //mousewheel: true,
    observer: true,
    observeParents: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".sd6").removeClass("acting")
        $(".scroll.scr6").removeClass("bot_rot top_rot")
        var previousIndex = this.previousIndex
        var activeIndex = this.activeIndex
        setTimeout(function () {
          //down
          if (previousIndex === 0 && activeIndex === 1) {
            $(".scroll.scr6").removeClass("bot")
            $(".scroll.scr6").addClass("bot_rot top")
          }
          //up
          if (previousIndex === 1 && activeIndex === 0) {
            $(".scroll.scr6").removeClass("top")
            $(".scroll.scr6").addClass("top_rot bot")
          }
        }, 0)
      },
      slideChangeTransitionEnd: function () {
        $(".sd6").addClass("no_cube acting")
      },
    },
  })
  $(document).on("click", ".sd6.acting + .scroll.scr6.bot", function () {
    $(".sd6").removeClass("no_cube")
    setTimeout(function () {
      sd6.slideNext()
    }, 0)
  })
  $(document).on("click", ".sd6.acting + .scroll.scr6.top", function () {
    $(".sd6").removeClass("no_cube")
    setTimeout(function () {
      sd6.slidePrev()
    }, 0)
  })
  $(".sd6").on("DOMMouseScroll mousewheel wheel", function (event, delta) {
    $(".sd6").removeClass("no_cube")
    var delta =
      event.originalEvent.deltaY ||
      -event.originalEvent.wheelDelta ||
      event.originalEvent.detail
    if (delta < 0 && $(".sd6").hasClass("acting")) {
      setTimeout(function () {
        sd6.slidePrev()
      }, 0)
    }
    if (delta > 0 && $(".sd6").hasClass("acting")) {
      var activeIndex = sd6.activeIndex
      var totalSlides = sd6.slides.length
      if (activeIndex === totalSlides - 1) {
        $(".sd6").addClass("no_cube")
      }
      setTimeout(function () {
        sd6.slideNext()
      }, 0)
    }
  })

  //sd touch
  if ($(window).width() <= $(window).height() * 1.2) {
    sd1.params.touchRatio = "1"
    sd1.update()
    sd2.params.touchRatio = "1"
    sd2.update()
    sd3.params.touchRatio = "1"
    sd3.update()
    sd4.params.touchRatio = "1"
    sd4.update()
    sd5.params.touchRatio = "1"
    sd5.update()
  }
})

// 栏目 6：点「查看获奖页面」不跳转，改为在右侧就地展开获奖页预览
$(function () {
  var $gpv = $(".gpv")
  if (!$gpv.length) return
  var $link = $(".oth-link[data-gpv]")

  function openGpv() {
    $gpv.addClass("on").attr("aria-hidden", "false")
  }
  function closeGpv() {
    $gpv.removeClass("on").attr("aria-hidden", "true")
  }

  $link.on("click", function (e) {
    e.preventDefault()
    openGpv()
  })
  $gpv.on("click", ".gpv-bd, .gpv-x", function (e) {
    e.preventDefault()
    e.stopPropagation()
    closeGpv()
  })
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) closeGpv()
  })
})
