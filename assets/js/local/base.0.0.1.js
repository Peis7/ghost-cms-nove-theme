var audio_pb = null
var home_cuento_finished = false
var playing_interval = null
var menu_codes = {'las-lobas':'#1D57A0','puro-cuento':'#F46F35','tallarte':'#34C1B8','nosotros':'#879042',}
    
function handle_show_right_header(){
    if (jQuery( window ).width() <= 768){
        make_header_fix_on_mobiled()
        return
    }
    var header = jQuery("#gh-head")
    var header_menu = jQuery(".gh-head-menu")
    var logo = jQuery(".gh-head-logo")
    var header_height = header_menu.height()
    var fixed_header_menu = jQuery(".fixed-gh-head-menu")
    var fixed_header_menu_logo = jQuery(".fixed-gh-head-menu .gh-head-brand")
    var header_height = jQuery('#gh-head').first().height()
    jQuery(window).scroll(function() {
            var scroll_to_top = jQuery(window).scrollTop()
            if (scroll_to_top > header_height && !fixed_header_menu.hasClass("shown")){
                // header.addClass('fixed')
                // header.addClass('left-0')
                // header.addClass('pcs:w-full')
                // header_menu.addClass('hidden')
                // //fixed_header_menu.removeClass('hidden')
                // jQuery('.site-content').css('margin-top',header_height)
                // fixed_header_menu.addClass("shown")
                // fixed_header_menu.slideDown(300, function() {
                //     console.log("Shown done")
                // });
                // fixed_header_menu_logo.removeClass('hidden')

                header.addClass("scrolled");
                header.removeClass("no-scrolled");
            }
            if (scroll_to_top == 0){
                // header.removeClass("fixed")
                // header.removeClass("pcs:w-full")
                // jQuery('.site-content').css('margin-top',0)
                // //fixed_header_menu.addClass("hidden")
                // //fixed_header_menu.slideUp( 500, function() {
                // header_menu.removeClass("hidden")
                // fixed_header_menu.removeClass("shown")
                // fixed_header_menu.hide()
                // //});
                // fixed_header_menu_logo.addClass("hidden")
                // header.removeClass("left-0")
                header.addClass("no-scrolled");
                header.removeClass("scrolled");
            }
    })
}
function generate_post_carrusels(){
    jQuery.each([2021,2020,2019,2018], function( index, value ) {
             jQuery('.las-lobas .owl-carrousel-'+value).owlCarousel({
                    loop:true,
                    margin:10,
                    items:1,
                    nav:true,
                    autoplay:false,
                    autoplayTimeout:2000,
                    autoplayHoverPause:false,
                    responsiveClass:true,
                    responsiveBaseElement: 'body',
                    responsive:{
                        0:{
                            items:1,
                            margin:0,
                            autoplay:true,
                        },
                        500:{
                            items:2,
                            margin:0,
                            margin:10,
                        },
                        1100:{
                            items:3,
                            margin:10,
                        }
                    }
                });
    });
    jQuery('.las-lobas .owl-carousel .owl-nav').addClass('bg-black absolute right-6 md:right-0 -top-16 s:-top-20 teta:-top-6 w-32 h-12 rounded-full')
    jQuery('.las-lobas .owl-carousel .owl-nav .owl-prev').addClass('w-1/2 h-full')
    jQuery('.las-lobas .owl-carousel .owl-nav .owl-next').addClass('w-1/2 h-full')
    jQuery('.las-lobas .owl-carousel .owl-nav span').addClass('text-white text-3xl')
    jQuery('.las-lobas .owl-carousel .owl-nav').removeClass('disabled')
    add_carrusel_buttons_events()
}
function add_carrusel_buttons_events(){
    jQuery('.owl-carousel .owl-nav button').click(function() {
        jQuery('.las-lobas .owl-carousel .owl-nav').removeClass('disabled')
    })
}

function show_menu(){
    jQuery('.mobile-menu').css("left","0")
}
function show_close_menu_icon(){
    jQuery('.mobile-menus-icon-container').addClass("left-unset right-4")
    jQuery('.menu-close').show()
}
function hide_close_menu_icon(){
    jQuery('.mobile-menus-icon-container').removeClass("left-unset right-4")
    jQuery('.menu-close').hide()
}
function show_burguer_menu_icon(){
    jQuery('.menu-burguer').show()
}
function hide_burguer_menu_icon(){
    jQuery('.menu-burguer').hide()
}
function hide_menu(){
    jQuery('.mobile-menu').css("left","100%")
}
function stop_bar_animation(bar_object){
    bar_object.stop()
}
function play_bar_animation(bar_object){
    bar_object.animate(1)
}

function hide_icon(selector){
    jQuery(selector).hide()
}
function show_icon(selector){
    jQuery(selector).show()
}
function prepare_audio(selector,call_back_load_audio,call_back_audio_finish){
    console.log("Prepare audio")
    load_audio(selector,call_back_load_audio)
    add_audio_finished_handler(selector,call_back_audio_finish)
}
function handle_single_audio_finished(time_display_selector){
    hide_icon('.player .pause')
    show_icon('.player .play')
    home_cuento_finished = true
    audio_pb.set(0)
    clearInterval(playing_interval);
    if (time_display_selector) reset_timer_function(time_display_selector)
}
function handle_multiple_audio_finished(time_display_selector){
    //hide_icon('.player .pause')
    //show_icon('.player .play')
    home_cuento_finished = true
    audio_pb.set(0)
    clearInterval(playing_interval);
    if (time_display_selector) reset_timer_function(time_display_selector)
    jQuery('.player .next').click()
}
function audio_finish_handler(selector,handler){
    jQuery(selector).on('ended', function() {
        handler()
     });
}
function add_audio_finished_handler(selector,call_back){
    call_back(selector)
}
function load_audio(selector,audio_loaded_handler){
    jQuery(selector).first().trigger('load')
    handle_audio_loaded(selector,audio_loaded_handler)
}
function play(player_selector,after_play_handler){
    jQuery(player_selector).first().trigger('play')
    after_play_handler()
}
function pause(player_selector){
    jQuery(player_selector).first().trigger('pause')
}
function make_header_fix_on_mobiled(){
    var header = jQuery("#gh-head")
    jQuery(window).scroll(function() {
        var scroll_to_top = jQuery(window).scrollTop()
        if (scroll_to_top > header.height() && !header.hasClass('fixed')){
            header.addClass('fixed')
        }
        if (scroll_to_top == 0){
            header.removeClass("fixed")
        }
})
}
function add_post_per_year_event(){
    jQuery('.post-years .year').click(function(){
        jQuery('.post-years .year').removeClass('md:border-b-2')
        jQuery('.post-years .year').removeClass('karma-bold')
        jQuery(this).addClass('md:border-b-2')
        jQuery(this).addClass('karma-bold')
    })
}
function get_audio_duration(id){
    return  document.getElementById(id).duration ? document.getElementById(id).duration  : 0
}

function initialize_player(bar_code_container_id,audio_id,type,tail_width,stroke_didth){
    console.log("initialize_player:::::")
    if (audio_pb)return
    audio_pb = type == 'circle' ? 
                new ProgressBar.Circle(bar_code_container_id, {
                    strokeWidth: stroke_didth,
                    easing: 'linear',
                    duration: parseInt((get_audio_duration(audio_id))*1000),
                    color: '#F30C28',
                    trailColor: '#eee',
                    trailWidth: tail_width,
                    svgStyle: null
                }) :
                new ProgressBar.Line(bar_code_container_id, {
                    strokeWidth: stroke_didth,
                    easing: 'linear',
                    duration: parseInt((get_audio_duration(audio_id))*1000),
                    color: '#F30C28',
                    trailColor: '#eee',
                    trailWidth: tail_width,
                    svgStyle: null
                })
}
function initialize_bar_if_needed(){
    if (home_cuento_finished){
        home_cuento_finished = false
    }
}
function handle_audio_loaded(id,handler){
    jQuery(id).on("loadedmetadata", function() {
        handler()
    }); 
}

function set_css_attribute(selector,attr_name,value){
    jQuery(selector).css(attr_name,value)
}
function set_right_dimensions_for_home_player(){
    if (jQuery( window ).width() > 768){return}
    set_css_attribute('.puro-cuento .outer','height',jQuery( ".puro-cuento" ).width())
    set_css_attribute('.puro-cuento .outer','width',jQuery( ".puro-cuento" ).width())
}
function set_right_dimensions_for_puro_cuento(){
    if (jQuery( window ).width() > 768){return}
    set_css_attribute('.post-puro-cuento .outer','height',jQuery( ".post-puro-cuento" ).width())
    set_css_attribute('.post-puro-cuento .outer','width',jQuery( ".post-puro-cuento" ).width())
}
function put_right_color_to_menu_item(){
    var current = jQuery('.nav-current')
    if (menu_codes[current.attr('code')] !== 'undefined') current.find('a').css('color', menu_codes[current.attr('code')]) 
}
function add_color_hover_to_menu_item(){
    var current = jQuery('.nav-current')
    jQuery( '.nav li' ).hover(
        function(){
            if (menu_codes[current.attr('code')] !== 'undefined') jQuery(this).css('color',menu_codes[current.attr('code')])
        }
        ,
	    function(){
            jQuery(this).css('color','#1F1F1F')
        }
    );
}
function hide_player(selector){
    if (jQuery(selector).length > 0) jQuery(selector).addClass('hidden')
}
function update_player_data(element,play_container_selector,attributes_container_selector){
    var audio_url = jQuery(element).attr('audio_url')
    var audio_id = jQuery(element).attr('audio_id')
    var index = jQuery(element).attr('index')
    var post_id = jQuery(element).attr('post-id')
    var author = jQuery(element).closest(play_container_selector).find(attributes_container_selector+' .author').first().text()
    var title = jQuery(element).closest(play_container_selector).find(attributes_container_selector+' .title').first().text()
    var cover_image_url = jQuery(element).closest(play_container_selector).find(attributes_container_selector+' img').first().attr('src')
    jQuery('.player').removeClass('hidden')
    jQuery('.player').find('audio').attr('index',index)
    jQuery('.player').find('audio source').first().attr('src',audio_url)
    jQuery('.player').find('audio').first().attr('id',audio_id)
    jQuery('.player').find('audio').first().attr('post-id',post_id)
    jQuery('.player .title').text(title)
    jQuery('.player .author').text(author)
    jQuery('.player .cover_image img').first().attr('src',cover_image_url)
    return audio_id
}

function handle_play(element,play_container_selector,attributes_container_selector,bar_id,bar_type,bar_tail_width,bar_width){
        var audio_id = update_player_data(element,play_container_selector,attributes_container_selector)
		prepare_audio('audio',
								function(){
									initialize_player(bar_id,audio_id,bar_type,bar_tail_width,bar_width);play('#'+audio_id,()=>{update_time(audio_id,'.player .time',function(){return document.getElementById(audio_id)})});play_bar_animation(audio_pb)
										},function(){audio_finish_handler('#'+audio_id,function(){handle_multiple_audio_finished('.player .time')})})
	  
		
}
String.prototype.formatAsTime = function () {
    var sec_num = parseInt(this, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    return String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0');
}

function update_time(audio_id,display_selector,get_audio_element){
    if (playing_interval) clearInterval(playing_interval)
    playing_interval = setInterval(function(){ 
        var myaudio = document.getElementById(audio_id);
        var cur_time = myaudio.currentTime;
		jQuery(display_selector).text(String(cur_time).formatAsTime())
    }, 1000);
}   
function reset_timer_function(display_selector){
    jQuery(display_selector).text('0'.formatAsTime())
}
function show_puro_cuento_post_player(){
    if (jQuery('.post-puro-cuento .header-section').length > 0 ) jQuery('.post-puro-cuento .header-section').removeClass('hidden')
}
function handle_cuento_event(){
    jQuery( '.puro-cuento-list .cuento' ).hover(
        function(){jQuery(this).find('.play').removeClass('md:hidden')}
        ,
	    function(){jQuery(this).find('.play').addClass('md:hidden')}
    );
}
function tallarte_generate_carrusels(){
    jQuery('.tallarte .post').each(function( index,post ) {
      var current_post = jQuery(post)
      var carrusel = current_post.find('.owl-carousel[number="'+jQuery(post).attr('number')+'"]')
          jQuery(post).find('.content-container .kg-gallery-container .kg-gallery-image img').each(function( index,img ) {
          carrusel.append(jQuery(img))
      });
      carrusel.find('img').addClass('object-cover min-h-18rem max-h-18rem md:max-h-28rem')
      carrusel.owlCarousel({
                      loop:true,
                      margin:0,
                      items:1,
                      nav:true,
                      dots:true,
                      autoplay:false,
                      autoplayTimeout:2000,
                      autoplayHoverPause:false,
                      responsiveClass:true,
                      responsiveBaseElement: 'body',
     });
     carrusel.find('.owl-nav').addClass('bg-black absolute right-6 md:right-0 -top-16 s:-top-20 teta:-top-6 w-32 h-12 rounded-full')
     carrusel.find('.owl-nav .owl-prev').addClass('w-1/2 h-full')
     carrusel.find('.owl-nav .owl-next').addClass('w-1/2 h-full')
     carrusel.find('.owl-nav span').addClass('text-white text-3xl')
     carrusel.find('.owl-nav').removeClass('disabled')
   });
}
function handle_nex_prev_button(){
	clearInterval(playing_interval)
	pause('.player audio')
	audio_pb.set(0)
	reset_timer_function('.player .time')
}
function get_next_song(index,direction){
		return direction == 'forward' ? index == jQuery('.related-posts .r-post').length ? 1 : parseInt(index) + 1 : index == 1 ? jQuery('.related-posts .r-post').length : 	parseInt(index) - 1
}
function play_song_by(element,index){
	var post = jQuery('.related-posts .r-post[index='+index+']')
	var audio_id = post.attr('audio_id')
    var post_id = post.attr('post-id')
    update_current_post_id(post_id)
	jQuery(element).closest('.player').find('audio').first().attr('id',audio_id)
	jQuery(element).closest('.player').find('audio').first().attr('index',index)
    jQuery(element).closest('.player').find('audio').first().attr('post-id',post_id)
	load_audio('.player #'+audio_id,function(){play('#'+audio_id,()=>{update_time(audio_id,'.player .time',function(){return       document.getElementById(audio_id)})});play_bar_animation(audio_pb)})
	update_player_with_song_at(index)
}
function update_player_with_song_at(index){
		var post = jQuery('.related-posts .r-post[index='+index+']')
		var title = post.attr('title')
		var image_url = post.attr('image')
		var audio_id = post.attr('audio_id')
	    var audio_url = post.attr('audio_url')
		var content = post.find('.r-post-content').first().html()
        var post_id = post.attr('post-id')
		update_puro_cuento_data(image_url,audio_id,title,audio_url,content,index,post_id)
		update_player_with(image_url,audio_id,title,audio_url)
}
function update_puro_cuento_data(image_url,audio_id,title,audio_url,content,index,post_id){
    jQuery('.post-puro-cuento .header-section .featured-image img').first().attr('src',image_url)
    jQuery('.post-puro-cuento .header-section .featured-image img').first().attr('srcset',image_url+' 600w,'+image_url+' 1000w')
    jQuery('.post-puro-cuento .header-section .title').first().text(title)
    jQuery('.post-puro-cuento .content .details').first().html(content)
    jQuery('.post-puro-cuento .play').attr('audio_id',audio_id)
    jQuery('.post-puro-cuento .play').attr('audio_url',audio_url)
    jQuery('.post-puro-cuento .play').attr('index',index)
    jQuery('.post-puro-cuento .play').attr('post-id',post_id)
}
function update_player_with(image_url,audio_id,title,audio_url){
    jQuery('.player .title').text(title)
    jQuery('.player audio source').first().attr('src',audio_url)
    jQuery('.player img').first().attr('src',image_url)
}
function hide_current_post(post_id_container){
	show_hiden_post()
	var current_post = jQuery(post_id_container).attr('post-id')
    console.log()
	jQuery('.related-posts .r-post[post-id='+current_post+']').addClass('hidden')
}
function show_hiden_post(){
	jQuery('.related-posts .r-post').removeClass('hidden')
}
function update_current_post_id(post_id){
    console.log("post_id: "+post_id)
    jQuery('.post-puro-cuento').attr('post-id',post_id)
}
function remove_overflow(){
    jQuery('body').addClass('overflow-hidden')
}
function add_overflow(){
    jQuery('body').removeClass('overflow-hidden')
}
window.onload = function() {
    handle_cuento_event()
    put_right_color_to_menu_item()
    add_color_hover_to_menu_item()
    set_right_dimensions_for_home_player()
    set_right_dimensions_for_puro_cuento()
    show_puro_cuento_post_player()
    add_post_per_year_event()
    tallarte_generate_carrusels()
    hide_current_post('.post-puro-cuento')
    prepare_audio('.puro-cuento #cuento-audio',function(){initialize_player('#home-player','cuento-audio','circle',1,6)},function(){audio_finish_handler('cuento-audio',function(){})})

    handle_show_right_header()
    jQuery( ".menu-burguer" ).click(function() {
        show_menu();
        remove_overflow()
        hide_burguer_menu_icon()
        show_close_menu_icon()
    });
    jQuery( ".menu-close" ).click(function() {
        hide_menu()
        add_overflow()
        hide_close_menu_icon()
        show_burguer_menu_icon()
    });
    jQuery('.puro-cuento .play').click(function() {
        console.log(".puro-cuento .play    --------->")
        initialize_bar_if_needed();
        hide_icon('.puro-cuento .play')
        show_icon('.puro-cuento .pause')
        play_bar_animation(audio_pb)
        play('.puro-cuento #cuento-audio',()=>{})
    });
    jQuery('.puro-cuento .pause').click(function() {
        hide_icon('.puro-cuento .pause')
        show_icon('.puro-cuento .play')
        stop_bar_animation(audio_pb)
        pause('.puro-cuento #cuento-audio')
    });
    jQuery('.post-puro-cuento .play').click(function(){
        var audio_id = jQuery(this).attr('audio_id')   
        hide_icon('.player .play')
        show_icon('.player .pause') 
		handle_play(this,'.post-puro-cuento','.header-section','#player-bar-indicator','line',1,1)

    })
    jQuery('.player .play').click(function() {
            console.log(".player .play    --------->")
            initialize_bar_if_needed();
            hide_icon('.player .play')
            show_icon('.player .pause')
            play_bar_animation(audio_pb)
            play('#'+jQuery('.player').find('audio').first().attr('id'),()=>{})
            update_time(jQuery('.player').find('audio').first().attr('id'),'.player .time',function(){return document.getElementById(jQuery('.player').find('audio').first().attr('id'))})
            //load_audio('.player audio',call_back_load_audio)
            play_bar_animation(audio_pb)
        });
    jQuery('.player .pause').click(function() {
            hide_icon('.player .pause')
            show_icon('.player .play')
            stop_bar_animation(audio_pb)
            pause('#'+jQuery('.player').find('audio').first().attr('id'))
    });
    jQuery('.post-puro-cuento .related-posts .r-post').click(function() {
        var post = jQuery(this)
        var image_url = post.attr('image')
        var index = post.attr('index')
        var title = post.attr('title')
        var audio_id = post.attr('audio_id')
        var audio_url = post.attr('audio_url')
        var content = post.find('.r-post-content').first().html()
        var post_id = post.attr('post-id')
        hide_current_post('.post-puro-cuento')
        update_puro_cuento_data(image_url,audio_id,title,audio_url,content,index,post_id)
    })
    jQuery('.player .next').click(function(){
		handle_nex_prev_button()
		var index = jQuery(this).closest('.player').find('audio').first().attr('index')
        play_song_by(this,get_next_song(index,'forward'))
        hide_current_post('.post-puro-cuento')
    })
    jQuery('.player .prev').click(function(){
        handle_nex_prev_button()
        var index = jQuery(this).closest('.player').find('audio').first().attr('index')
        play_song_by(this,get_next_song(index,'backwards'))
        hide_current_post('.post-puro-cuento')
    })
    generate_post_carrusels()
};


function selectPostHome(y){
    var select_post_2021 = document.getElementById("select-post-home-2021"); 
    var select_post_2020 = document.getElementById("select-post-home-2020"); 
    var select_post_2019 = document.getElementById("select-post-home-2019");
    var select_post_2018 = document.getElementById("select-post-home-2018"); 
    
    var post_2021 = document.getElementById("post-year-2021");
    var post_2020 = document.getElementById("post-year-2020");
    var post_2019 = document.getElementById("post-year-2019");
    var post_2018 = document.getElementById("post-year-2018");
     switch (y){
        case "2021":

          select_post_2021.classList.add("font-karma-bold");
          select_post_2020.classList.remove("font-karma-bold");
          select_post_2019.classList.remove("font-karma-bold");
          select_post_2018.classList.remove("font-karma-bold");
        
          post_2021.classList.remove("hidden");
          post_2020.classList.add("hidden");
          post_2019.classList.add("hidden");
          post_2018.classList.add("hidden");
          break;
        case "2020":

          select_post_2021.classList.remove("font-karma-bold");
          select_post_2020.classList.add("font-karma-bold");
          select_post_2019.classList.remove("font-karma-bold");
          select_post_2018.classList.remove("font-karma-bold");
       
          post_2021.classList.add("hidden");
          post_2020.classList.remove("hidden");
          post_2019.classList.add("hidden");
          post_2018.classList.add("hidden");
          break;
        case "2019":
          select_post_2021.classList.remove("font-karma-bold");
          select_post_2020.classList.remove("font-karma-bold");
          select_post_2019.classList.add("font-karma-bold");
          select_post_2018.classList.remove("font-karma-bold");
        
          post_2021.classList.add("hidden");
          post_2020.classList.add("hidden");
          post_2019.classList.remove("hidden");
          post_2018.classList.add("hidden");
          break;
        case "2018":
          select_post_2021.classList.remove("font-karma-bold");
          select_post_2020.classList.remove("font-karma-bold");
          select_post_2019.classList.remove("font-karma-bold");
          select_post_2018.classList.add("font-karma-bold");

          post_2021.classList.add("hidden");
          post_2020.classList.add("hidden");
          post_2019.classList.add("hidden");
          post_2018.classList.remove("hidden");
          break;
    
        default:
          break;
      }
}    