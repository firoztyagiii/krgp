"use strict";

function side_panel_open() {
  jQuery(".dropdown-trigger").on("click", function () {
    jQuery(".slide-sidebar-wrapper, .body-overlay").addClass("active");
  });
  jQuery(".slide-sidebar-close, .body-overlay").on("click", function () {
    jQuery(".slide-sidebar-wrapper, .body-overlay").removeClass("active");
  });
}
side_panel_open();

function search_panel_open() {
  jQuery(".search-trigger").on("click", function () {
    jQuery(".site-search, .body-overlay").addClass("active");
    jQuery(".site-search .search-form .search-form-field").focus();
  });
  jQuery(".site-search-close, .body-overlay").on("click", function () {
    jQuery(
      ".site-search, .body-overlay, .mobile-header-menu-container"
    ).removeClass("active");
  });
}
search_panel_open();

function switch_form_columns() {
  jQuery(".tab-columns-switcher").on("click", function () {
    jQuery(".tab-column", jQuery(this).parents(".tab-columns")).toggleClass(
      "hidden"
    );
  });
}
switch_form_columns();

function sticky_menu_active() {
  if (jQuery(".sticky-header-on").length) {
    jQuery(".sticky-header-on").each(function () {
      let obj = jQuery(this);
      let el_offset = obj.offset().top;
      let el_height = jQuery(".sticky-wrapper", obj).innerHeight();
      let el_ready = el_offset + el_height;
      let el_not_active = el_offset + el_height + 300;
      el_offset = el_offset + el_height + 200;

      obj.height(el_height);

      jQuery(window).scroll(function () {
        var st = jQuery(this).scrollTop();
        if (st <= el_ready) {
          obj.removeClass("sticky-ready");
        } else {
          obj.addClass("sticky-ready");
        }
        if (st <= el_not_active) {
          obj.removeClass("sticky-active");
        }
        if (st <= el_offset) {
          obj.removeClass("sticky-active");
        } else {
          obj.addClass("sticky-active");
        }
      });
    });
  }
}
setTimeout(sticky_menu_active, 300);

function mobile_menu_open() {
  jQuery(".menu-trigger").on("click", function () {
    jQuery(".mobile-header-menu-container, .body-overlay").addClass("active");
  });
  jQuery(".menu-close, .body-overlay").on("click", function () {
    jQuery(".mobile-header-menu-container, .body-overlay").removeClass(
      "active"
    );
  });
}
mobile_menu_open();

function compact_menu_open() {
  jQuery(".compact-menu-trigger").on("click", function () {
    jQuery(".alter-menu-wrapper, .body-overlay").addClass("active");
  });
  jQuery(".alter-menu-close, .body-overlay").on("click", function () {
    jQuery(".alter-menu-wrapper, .body-overlay").removeClass("active");
  });
}
compact_menu_open();

function simple_sidebar_open() {
  jQuery(".simple-sidebar-trigger").on("click", function () {
    if (jQuery(window).width() < 992) {
      jQuery(".simple-sidebar, .body-overlay").addClass("active");
    }
  });
  jQuery(".shop-hidden-sidebar-close, .body-overlay").on("click", function () {
    jQuery(".simple-sidebar, .body-overlay").removeClass("active");
  });
}
simple_sidebar_open();

function widget_list_hierarchy_init() {
  widget_archives_hierarchy_controller(
    ".widget ul li",
    "ul.children",
    "parent-archive",
    "widget-archive-trigger"
  );
  widget_archives_hierarchy_controller(
    ".widget_nav_menu .menu li",
    "ul.sub-menu",
    "parent-archive",
    "widget-menu-trigger"
  );
}

function widget_archives_hierarchy_controller(
  list_item_selector,
  sublist_item_selector,
  parent_class,
  trigger_class
) {
  jQuery(list_item_selector)
    .has(sublist_item_selector)
    .each(function () {
      jQuery(this).addClass(parent_class);
      jQuery(this).append("<span class='" + trigger_class + "'></span>");
    });
  jQuery(list_item_selector + ">" + sublist_item_selector).css(
    "display",
    "none"
  );
  jQuery(list_item_selector + ">.item-wrapper>" + sublist_item_selector).css(
    "display",
    "none"
  );
  jQuery(document).on("click", "." + trigger_class, function () {
    var el = jQuery(this);
    var sublist = el.siblings(sublist_item_selector);
    var sublist_alt = el
      .siblings(".item-wrapper")
      .children(sublist_item_selector);
    if (!sublist.length && !sublist_alt.length) return;
    sublist = sublist.first();
    sublist_alt = sublist_alt.first();
    el.toggleClass("active");
    sublist.slideToggle(300);
    sublist_alt.slideToggle(300);
  });
}

function fix_responsive_iframe() {
  jQuery(".video-embed > div").each(function () {
    jQuery(this).unwrap(".video-embed");
  });
}

function elements_slider_init() {
  jQuery(
    ".elementor-element .owl-carousel, .content-inner > .archive-listing .owl-carousel, .single-post .owl-carousel"
  ).each(function () {
    let slider = jQuery(this),
      slider_options = slider.data("slider-options"),
      itemsMobile = 1,
      itemsTablet = 1,
      itemsDesktop = 1,
      itemsFool = 1,
      slideCount = jQuery(".slider-item", slider).length,
      progress = slider_options["progress"]
        ? slider_options["progress"]
        : false;

    switch (slider_options["items"]) {
      case 2:
        itemsMobile = 1;
        itemsTablet = 2;
        itemsDesktop = 2;
        itemsFool = 2;
        break;
      case 3:
        itemsMobile = 1;
        itemsTablet = 2;
        itemsDesktop = 3;
        itemsFool = 3;
        break;
      case 4:
        itemsMobile = 1;
        itemsTablet = 2;
        itemsDesktop = 3;
        itemsFool = 4;
        break;
      case 5:
        itemsMobile = 1;
        itemsTablet = 2;
        itemsDesktop = 3;
        itemsFool = 5;
        break;
      case 6:
        itemsMobile = 1;
        itemsTablet = 3;
        itemsDesktop = 5;
        itemsFool = 6;
        break;
      default:
        break;
    }
    slider_options["responsive"] = {
      0: {
        items: itemsMobile,
        dots: slideCount > itemsMobile ? slider_options["dots"] : false,
      },
      768: {
        items: itemsTablet,
        dots: slideCount > itemsTablet ? slider_options["dots"] : false,
      },
      992: {
        items: itemsDesktop,
        dots: slideCount > itemsDesktop ? slider_options["dots"] : false,
      },
      1281: {
        items: itemsFool,
        dots: slideCount > itemsFool ? slider_options["dots"] : false,
      },
    };
    slider.owlCarousel(slider_options);
    if (progress) {
      slider.on("changed.owl.carousel", function (event) {
        if (!event.namespace) {
          return;
        }
        let progress_wrapper = slider.parents(".elementor-widget-container"),
          progress_current = jQuery(
            ".slider-progress-current",
            progress_wrapper
          ),
          progress_all = jQuery(".slider-progress-all", progress_wrapper),
          carousel = event.relatedTarget;
        progress_all.text(
          carousel.items().length < 10
            ? "0" + carousel.items().length
            : carousel.items().length
        );
        progress_current.text(
          carousel.relative(carousel.current()) + 1 < 10
            ? "0" + (carousel.relative(carousel.current()) + 1)
            : carousel.relative(carousel.current()) + 1
        );
      });
    }
  });
}

function project_slider_init() {
  jQuery(".project-post-gallery .owl-carousel").each(function () {
    jQuery(this).owlCarousel({
      items: 1,
      nav: false,
      dots: true,
      autoplay: false,
      loop: true,
      dotsContainer: false,
      autoHeight: false,
    });
  });
}

function single_portfolio_slider_init() {
  jQuery(".portfolio-post-gallery.owl-carousel").each(function () {
    jQuery(this).owlCarousel({
      items: 1,
      nav: false,
      dots: false,
      autoplay: false,
      loop: true,
      rewind: false,
      dotsContainer: false,
      autoHeight: false,
      center: true,
      margin: 10,
    });
  });
}

// Isotope init
function isotope_init() {
  if (jQuery(".isotope").length > 0) {
    jQuery(".isotope-trigger").isotope({
      itemSelector: ".isotope-item",
      gutter: 0,
    });
  }
}

function help_item_acardeon() {
  jQuery(".help-item").each(function () {
    jQuery(".help-item-title", this).on("click", function () {
      jQuery(this)
        .siblings(".help-item-content")
        .slideToggle(300)
        .parents(".help-item")
        .toggleClass("active");
    });
  });
}
help_item_acardeon();

function background_image_parallax(object, multiplier) {
  if (object.length > 0) {
    multiplier = typeof multiplier !== "undefined" ? multiplier : 0.5;
    multiplier = 1 - multiplier;
    var doc = jQuery(document);
    object.css({
      "background-attatchment": "fixed",
    });
    jQuery(window).scroll(function () {
      if (jQuery(window).width() >= 1020) {
        var from_top = doc.scrollTop() - object.offset().top,
          bg_css = "center " + multiplier * from_top + "px";
        object.css({
          "background-position": bg_css,
        });
      } else {
        object.css({
          "background-position": "",
        });
      }
    });
  }
}

// Scroll to Top
function scroll_to_top_init() {
  var scrollTop = jQuery(window).scrollTop();
  if (scrollTop > 600) {
    jQuery(".footer-scroll-top").addClass("active");
  } else {
    jQuery(".footer-scroll-top").removeClass("active");
  }
}

// Check if form field is empty
function check_custom_field(element) {
  if (element.val().length !== 0) {
    element
      .parents(".agencium-form-field, .woocommerce-input-wrapper")
      .addClass("not-empty");
  } else {
    element
      .parents(".agencium-form-field, .woocommerce-input-wrapper")
      .removeClass("not-empty");
  }
}

// Wrap WPForm form fields
function wrap_multycolumns_wpform_fields() {
  jQuery(
    ".wpforms-field .wpforms-field-row .wpforms-field-row-block input"
  ).each(function () {
    jQuery(this).wrap('<div class="agencium-form-field"></div>');
  });
}

// Custom cursor
function agencium_custom_cursor() {
  if (jQuery(window).width() > 1020) {
    jQuery(".custom-cursor-drag").each(function () {
      const cursor = jQuery(this);
      const wrapper = cursor.siblings(".owl-carousel");

      function showViewCursor(event) {
        cursor.css("left", event.clientX - 32).css("top", event.clientY - 32);
      }

      wrapper.mousemove(showViewCursor);

      wrapper.mouseleave(function (e) {
        if (!jQuery("body").hasClass("elementor-editor-active")) {
          wrapper.css({ cursor: "auto" });
          cursor.removeClass("active");
          setTimeout(function () {
            if (!cursor.hasClass("active")) {
              cursor.hide();
            }
          }, 300);
        }
      });

      wrapper.mouseenter(function (e) {
        if (!jQuery("body").hasClass("elementor-editor-active")) {
          wrapper.css({ cursor: "none" });
          cursor.show();
          setTimeout(function () {
            cursor.addClass("active");
          }, 10);
        }
      });
    });
  }
}

// Hidden media
function agencium_hidden_media() {
  if (jQuery(window).width() > 1020) {
    jQuery(".hidden-media").each(function () {
      const cursor = jQuery(this);
      const wrapper = cursor.parents('[class*="post-"]');

      function showViewCursor(event) {
        cursor.css("left", event.clientX + 5).css("top", event.clientY + 10);
      }

      wrapper.mousemove(showViewCursor);

      wrapper.mouseleave(function (e) {
        if (!jQuery("body").hasClass("elementor-editor-active")) {
          cursor.removeClass("active");
          setTimeout(function () {
            // if ( !cursor.hasClass('active') ) {
            cursor.hide();
            // }
          }, 100);
        }
      });

      wrapper.mouseenter(function (e) {
        if (!jQuery("body").hasClass("elementor-editor-active")) {
          cursor.show();
          setTimeout(function () {
            cursor.addClass("active");
          }, 10);
        }
      });
    });
  }
}

// Ticker
function agencium_ticker() {
  jQuery(".ticker")
    .marquee("destroy")
    .marquee({
      allowCss3Support: true,
      css3easing: "linear",
      easing: "linear",
      delayBeforeStart: 0,
      direction: jQuery(".ticker")
        .parents(".agencium-ticker-wrapper")
        .data("direction"),
      duplicated: true,
      duration:
        jQuery(".ticker").parents(".agencium-ticker-wrapper").data("speed") *
        1000,
      gap: 0,
      pauseOnCycle: false,
      pauseOnHover: false,
      startVisible: true,
    });
}

// Flowmap deformation effect
function flowmap_deformation() {
  jQuery(".flowmap-deformation-wrapper").each(function () {
    let box = jQuery(this);

    setTimeout(function () {
      box.addClass("active");
    }, 300);

    const imgSize = [box.data("bg-width"), box.data("bg-height")];

    const vertex = `
					attribute vec2 uv;
					attribute vec2 position;
					varying vec2 vUv;
					void main() {
							vUv = uv;
							gl_Position = vec4(position, 0, 1);
					}
			`;
    const fragment = `
					precision highp float;
					precision highp int;
					uniform sampler2D tWater;
					uniform sampler2D tFlow;
					uniform float uTime;
					varying vec2 vUv;
					uniform vec4 res;

					void main() {

							// R and G values are velocity in the x and y direction
							// B value is the velocity length
							vec3 flow = texture2D(tFlow, vUv).rgb;

							vec2 uv = .5 * gl_FragCoord.xy / res.xy ;
							vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);
							myUV -= flow.xy * (0.15 * 0.7);

							vec3 tex = texture2D(tWater, myUV).rgb;

							gl_FragColor = vec4(tex.r, tex.g, tex.b, 1.0);
					}
			`;
    {
      const renderer = new ogl.Renderer({ dpr: 2 });
      const gl = renderer.gl;
      box.append(gl.canvas);

      // Variable inputs to control flowmap
      let aspect = 1;
      const mouse = new ogl.Vec2(-1);
      const velocity = new ogl.Vec2();
      function resize() {
        let a1, a2;
        var imageAspect = imgSize[1] / imgSize[0];
        if (box.outerHeight() / box.outerWidth() < imageAspect) {
          a1 = 1;
          a2 = box.outerHeight() / box.outerWidth() / imageAspect;
        } else {
          a1 = (box.outerWidth() / box.outerHeight()) * imageAspect;
          a2 = 1;
        }
        mesh.program.uniforms.res.value = new ogl.Vec4(
          box.outerWidth(),
          box.outerHeight(),
          a1,
          a2
        );

        renderer.setSize(box.outerWidth(), box.outerHeight());
        aspect = box.outerWidth() / box.outerHeight();
      }
      const flowmap = new ogl.Flowmap(gl, {
        falloff: 0.6,
      });
      // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
      const geometry = new ogl.Geometry(gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
      });
      const texture = new ogl.Texture(gl, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
      });
      const img = new Image();
      img.onload = () => (texture.image = img);
      img.crossOrigin = "Anonymous";
      img.src = box.data("bg");

      let a1, a2;
      var imageAspect = imgSize[1] / imgSize[0]; //0.5573
      if (box.outerHeight() / box.outerWidth() < imageAspect) {
        // 0.4146 < 0.5573
        a1 = 1;
        a2 = box.outerHeight() / box.outerWidth() / imageAspect; // 0.7439
      } else {
        a1 = (box.outerWidth() / box.outerHeight()) * imageAspect;
        a2 = 1;
      }

      const program = new ogl.Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          tWater: { value: texture },
          res: {
            value: new ogl.Vec4(box.outerWidth(), box.outerHeight(), a1, a2),
          },
          img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
          // Note that the uniform is applied without using an object and value property
          // This is because the class alternates this texture between two render targets
          // and updates the value property after each render.
          tFlow: flowmap.uniform,
        },
      });
      const mesh = new ogl.Mesh(gl, { geometry, program });

      window.addEventListener("resize", resize, false);
      resize();

      // Create handlers to get mouse position and velocity
      const isTouchCapable = "ontouchstart" in window;
      if (isTouchCapable) {
        window.addEventListener("touchstart", updateMouse, false);
        window.addEventListener("touchmove", updateMouse, { passive: false });
      } else {
        window.addEventListener("mousemove", updateMouse, false);
      }
      let lastTime;
      const lastMouse = new ogl.Vec2();
      function updateMouse(e) {
        // e.preventDefault();
        if (e.changedTouches && e.changedTouches.length) {
          e.x = e.changedTouches[0].pageX;
          e.y = e.changedTouches[0].pageY;
        }
        if (e.x === undefined) {
          e.x = e.pageX;
          e.y = e.pageY;
        }
        // Get mouse value in 0 to 1 range, with y flipped
        mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height);
        // Calculate velocity
        if (!lastTime) {
          // First frame
          lastTime = performance.now();
          lastMouse.set(e.x, e.y);
        }

        const deltaX = e.x - lastMouse.x;
        const deltaY = e.y - lastMouse.y;

        lastMouse.set(e.x, e.y);

        let time = performance.now();

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - lastTime);
        lastTime = time;
        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;
        // Flag update to prevent hanging velocity values when not moving
        velocity.needsUpdate = true;
      }
      requestAnimationFrame(update);
      function update(t) {
        requestAnimationFrame(update);
        // Reset velocity when mouse not moving
        if (!velocity.needsUpdate) {
          mouse.set(-1);
          velocity.set(0);
        }
        velocity.needsUpdate = false;
        // Update flowmap inputs
        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);
        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();
        program.uniforms.uTime.value = t * 0.01;
        renderer.render({ scene: mesh });
      }
    }
  });
}

// ---------------------- //
// --- Document Ready --- //
// ---------------------- //
jQuery(document).ready(function () {
  // Parallax
  background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.9);

  // Mobile Menu
  function mobile_menu() {
    jQuery(".mobile-header-menu-container .main-menu")
      .find(".menu-item")
      .each(function (i, el) {
        if (
          jQuery(el).find(".sub-menu").length != 0 &&
          jQuery(el).find(".sub-menu-trigger").length == 0
        ) {
          jQuery(el).append('<span class="sub-menu-trigger"></span>');
        }
      });

    jQuery(".sub-menu-trigger").off();
    jQuery(".sub-menu-trigger").on("click", function () {
      if (jQuery(this).parent().hasClass("active")) {
        jQuery(this).prev().slideUp();
        jQuery(this).parent().removeClass("active");
      } else {
        var currentParents = jQuery(this).parents(".menu-item");
        jQuery(".sub-menu-trigger")
          .parent()
          .not(currentParents)
          .removeClass("active");
        jQuery(".sub-menu-trigger")
          .parent()
          .not(currentParents)
          .find(".sub-menu")
          .slideUp(300);

        jQuery(this).prev().slideDown();
        jQuery(this).parent().addClass("active");
      }
    });
    jQuery(".mobile-header-menu-container .main-menu a").on(
      "click",
      function () {
        jQuery(
          ".site-search, .body-overlay, .mobile-header-menu-container"
        ).removeClass("active");
      }
    );
  }
  mobile_menu();

  // Alter Menu
  function alter_menu() {
    jQuery(".alter-menu-wrapper .main-menu")
      .find(".menu-item")
      .each(function (i, el) {
        if (
          jQuery(el).find(".sub-menu").length != 0 &&
          jQuery(el).find(".sub-menu-trigger").length == 0
        ) {
          jQuery(el).append('<span class="sub-menu-trigger"></span>');
        }
      });

    jQuery(".sub-menu-trigger").off();
    jQuery(".sub-menu-trigger").on("click", function () {
      if (jQuery(this).parent().hasClass("active")) {
        jQuery(this).prev().slideUp();
        jQuery(this).parent().removeClass("active");
      } else {
        var currentParents = jQuery(this).parents(".menu-item");
        jQuery(".sub-menu-trigger")
          .parent()
          .not(currentParents)
          .removeClass("active");
        jQuery(".sub-menu-trigger")
          .parent()
          .not(currentParents)
          .find(".sub-menu")
          .slideUp(300);

        jQuery(this).prev().slideDown();
        jQuery(this).parent().addClass("active");
      }
    });
    jQuery(".alter-menu-wrapper .main-menu a").on("click", function () {
      jQuery(".site-search, .body-overlay, .alter-menu-wrapper").removeClass(
        "active"
      );
    });
  }
  alter_menu();

  // Scroll to Anchor
  function scroll_to_anchor() {
    jQuery(".pwb-az-listing-header a").on("click", function () {
      var target = jQuery(this).attr("href");
      jQuery("body, html").animate(
        { scrollTop: jQuery(target).offset().top - 200 + "px" },
        600
      );
      return false;
    });
  }
  scroll_to_anchor();

  // Scroll To Top
  scroll_to_top_init();
  jQuery(".footer-scroll-top").on("click", function () {
    jQuery("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  widget_list_hierarchy_init();
  setTimeout(fix_responsive_iframe, 800);
  setTimeout(elements_slider_init, 500);
  setTimeout(isotope_init, 500);
  wrap_multycolumns_wpform_fields();
  project_slider_init();

  single_portfolio_slider_init();

  // Check custom form fields
  jQuery(
    ".agencium-form-field input, .agencium-form-field textarea, .agencium-form-field select, .woocommerce-input-wrapper .input-text"
  )
    .each(function () {
      check_custom_field(jQuery(this));
    })
    .on("change", function () {
      check_custom_field(jQuery(this));
    });

  // Custom cursor
  agencium_custom_cursor();
  agencium_hidden_media();

  // Ticker
  agencium_ticker();

  // Services grid animation
  jQuery(".service-grid-listing .service-item")
    .on("mouseover", function () {
      if (jQuery(window).width() > 1200) {
        let obj = jQuery(".service-item-hidden", this);

        obj.addClass("active");
        setTimeout(function () {
          if (obj.hasClass("active")) {
            obj.slideDown(600, "swing");
          }
        }, 400);
      }
    })
    .on("mouseleave", function () {
      jQuery(".service-item-hidden", this).slideUp(400).removeClass("active");
    });

  // Flowmap Effect
  jQuery("body").one("mouseover", flowmap_deformation);

  // Customize Elementor DOM
  if (jQuery(".elementor-container").length > 0) {
    jQuery(".elementor-container").each(function () {
      jQuery(this)
        .children(".elementor-column")
        .wrapAll('<div class="elementor-row" />');
    });
  }
});

// --------------------- //
// --- Window Resize --- //
// --------------------- //
jQuery(window).on("resize", function () {
  setTimeout(sticky_menu_active, 300);
  mobile_menu_open();
  compact_menu_open();
  background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.9);
  agencium_custom_cursor();
  agencium_hidden_media();

  agencium_ticker();
});

// --------------------- //
// --- Window Scroll --- //
// --------------------- //
jQuery(window).on("scroll", function () {
  scroll_to_top_init();
});

(function ($) {
  // Page Preloader
  var loader;
  $.fn.start_loader = start_loader;
  $.fn.stop_loader = stop_loader;

  $(document).ready(function () {
    page_loader_controller();
  });

  function page_loader_controller() {
    var page_loader, interval, timeLaps;
    page_loader = $(".page-loader");
    timeLaps = 0;
    interval = setInterval(function () {
      var page_loaded = check_if_page_loaded();
      timeLaps++;
      if (page_loaded || timeLaps == 12) {
        clearInterval(interval);
        page_loader.stop_loader();
      }
    }, 10);
  }

  function check_if_page_loaded() {
    var keys, key, i, r;
    if (window.modules_state == undefined) return false;
    r = true;
    keys = Object.keys(window.modules_state);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      if (!window.modules_state[key]) {
        r = false;
        break;
      }
    }
    return r;
  }

  function start_loader() {
    var loader_container;
    loader = jQuery(this);
    if (!loader.length) return;
    loader_container = loader[0].parentNode;
    if (loader_container != null) {
      loader_container.style.opacity = 1;
      setTimeout(function () {
        loader_container.style.display = "block";
      }, 10);
    }
  }

  function stop_loader() {
    var loader_container;
    loader = jQuery(this);
    if (!loader.length) return;
    loader_container = loader[0].parentNode;
    jQuery("body").trigger("pageloader_start_hidden");
    if (loader_container != null) {
      setTimeout(function () {
        loader_container.style.opacity = 0;
        setTimeout(function () {
          loader_container.style.display = "none";
        }, 300);
      }, 500);
    }
  }

  // AJAX Pagination for Elementor Post Listing
  $(".elementor-widget").on("click", ".content-pagination a", function (e) {
    e.preventDefault();
    var paged = null;
    var id = $(this).parents(".elementor-widget").attr("data-id");
    if ($(this).hasClass("prev")) {
      paged = parseInt($(this).siblings(".current").text()) - 1;
    } else if ($(this).hasClass("next")) {
      paged = parseInt($(this).siblings(".current").text()) + 1;
    } else {
      paged = parseInt($(this).text());
    }
    var filter_term = $(this).attr("data-value");
    var filter_taxonomy = $(this)
      .parents(".filter-control-list")
      .attr("data-taxonomy");

    genre_get_posts(paged, id, filter_term, filter_taxonomy);
  });

  // AJAX Filter for Elementor Post Listing
  $(".elementor-widget").on(
    "click",
    ".filter-control-list .filter-control-item",
    function (e) {
      e.preventDefault();
      var paged = 1;
      var id = $(this).parents(".elementor-widget").attr("data-id");
      var filter_term = $(this).attr("data-value");
      var filter_taxonomy = $(this)
        .parents(".filter-control-list")
        .attr("data-taxonomy");
      if (filter_term === "all") {
        filter_term = null;
      }

      $(this)
        .addClass("active")
        .siblings(".filter-control-item")
        .removeClass("active");

      genre_get_posts(paged, id, filter_term, filter_taxonomy);
    }
  );

  // Main AJAX function
  function genre_get_posts(
    paged = 1,
    id = null,
    filter_term = null,
    filter_taxonomy = null
  ) {
    var ajax_url = ajax_params.ajax_url;
    var args = $(".archive-listing", ".elementor-element-" + id).attr(
      "data-ajax"
    );
    var widget = $(".archive-listing", ".elementor-element-" + id).attr(
      "data-widget"
    );
    var classes = $(
      ".archive-listing-wrapper",
      ".elementor-element-" + id
    ).attr("class");

    $.ajax({
      type: "POST",
      url: ajax_url,
      data: {
        action: "pagination",
        args: args,
        widget: widget,
        paged: paged,
        classes: classes,
        id: id,
        filter_term: filter_term,
        filter_taxonomy: filter_taxonomy,
        security: ajax_params.ajax_nonce,
      },
      beforeSend: function () {
        var height = $(
          ".archive-listing",
          ".elementor-element-" + id
        ).outerHeight();
        $(".archive-listing", ".elementor-element-" + id)
          .height(height)
          .addClass("loading");
      },
      success: function (data) {
        $(".archive-listing", ".elementor-element-" + id).html(data);
        if ($(window.wp.mediaelement).length > 0) {
          $(window.wp.mediaelement.initialize);
        }
        setTimeout(function () {
          $(".archive-listing", ".elementor-element-" + id)
            .removeAttr("style")
            .removeClass("loading");
        }, 500);
        setTimeout(elements_slider_init, 300);
        setTimeout(fix_responsive_iframe, 600);
        setTimeout(isotope_init, 500);
      },
      error: function () {
        $(".archive-listing", ".elementor-element-" + id).html(
          '<p class="error">AJAX ERROR</p>'
        );
      },
    });
  }
})(jQuery);
