(function ($) {
  "use strict";

  // Header Type = Fixed
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  $(".loop").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    autoplay: true,
    nav: true,
    margin: 0,
    responsive: {
      1200: {
        items: 5,
      },
      992: {
        items: 3,
      },
      760: {
        items: 2,
      },
    },
  });

  $("#modal_trigger").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close",
  });

  $(function () {
    // Calling Login Form
    $("#modal_trigger").click(function () {
      $(".user_register_first").hide();
      $(".user_register_next").hide();
      $(".forgot_password_card").hide();
      $(".user_login").show();
      return false;
    });

    $("#user_login_form").click(function () {
      $(".user_register_first").hide();
      $(".user_register_next").hide();
      $(".forgot_password_card").hide();
      $(".user_login").show();
      return false;
    });

    // Calling Register Form
    $("#register_form_start").click(function () {
      $(".user_login").hide();
      $(".user_register_first").show();

      $("#username").removeClass("is-invalid");
      $("#email_register").removeClass("is-invalid");
      $("#password_register").removeClass("is-invalid");
      $("#confirmpassword").removeClass("is-invalid");

      return false;
    });

    $("#register_form_next").click(function () {
      let username = $("#username").val();
      let email = $("#email_register").val();
      let password = $("#password_register").val();
      let confirmpassword = $("#confirmpassword").val();

      if (!username) {
        $("#username").addClass("is-invalid");
      }

      if (!email) {
        $("#email_register").addClass("is-invalid");
      }

      if (!password) {
        $("#password_register").addClass("is-invalid");
      }

      if (!confirmpassword) {
        $("#confirmpassword").addClass("is-invalid");
      }

      if (password != confirmpassword) {
        $("#errormsg_register").css("display", "block");
        $("#errortxt_register").html(
          "Password and Confirm Password do not match."
        );
      } else {
        if (username && email && password && confirmpassword) {
          $(".user_register_first").hide();
          $(".user_register_next").show();
          return false;
        }
      }
    });

    $("#register_form_back").click(function () {
      $(".user_register_first").show();
      $(".user_register_next").hide();
      // $(".header_title").tex("Register");
      return false;
    });

    // Going back to Social Forms
    $(".back_btn").click(function () {
      $(".user_login").hide();
      $(".user_register").hide();
      $(".social_login").show();
      $(".header_title").text("Login");
      return false;
    });

    // Forgot Password
    $("#forgot_password").click(function () {
      $(".user_login").hide();
      $(".user_register").hide();
      $(".forgot_password_card").show();
      return false;
    });

    // Reset Password
    $("#reset_password").click(function () {
      $(".user_login").show();
      $(".forgot_password_card").hide();
      return false;
    });
  });

  // Acc
  $(document).on("click", ".naccs .menu div", function () {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
      $(".naccs .menu div").removeClass("active");
      $(".naccs ul li").removeClass("active");

      $(this).addClass("active");
      $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .addClass("active");

      var listItemHeight = $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .innerHeight();
      $(".naccs ul").height(listItemHeight + "px");
    }
  });

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $(".scroll-to-section a[href*=\\#]:not([href=\\#])").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top + 1,
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $(".scroll-to-section a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top + 1,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Acc
  $(document).on("click", ".naccs .menu div", function () {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
      $(".naccs .menu div").removeClass("active");
      $(".naccs ul li").removeClass("active");

      $(this).addClass("active");
      $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .addClass("active");

      var listItemHeight = $(".naccs ul")
        .find("li:eq(" + numberIndex + ")")
        .innerHeight();
      $(".naccs ul").height(listItemHeight + "px");
    }
  });

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 767) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }
})(window.jQuery);
