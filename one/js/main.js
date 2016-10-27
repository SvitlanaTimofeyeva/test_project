angular.module('app', []).controller('mainCtrl', function ($scope) {
 
    $scope.q_id = 0; 
    $scope.q_all = 7;

    $scope.formData = {
        company_id: '',
        company_name: '',
        company_alias: '',
        description: '',
        logo: '',
        contact: ''
    }

    $scope.step = 100 / $scope.q_all;

    $scope.switchQuestion = function () {

        if ($('.form-input').val() == '' && $('.form-input').attr('required')) {

            show_err();
            return false; 
        }

        $('#num').animate({
            opacity: 0 
        }, 200)

        if ($scope.q_id == $scope.q_all - 2) {
            $('body').css({
                'overflow-y': 'scroll'
            });

            //if (!$scope.img_uploaded) {
            //    $('.custom-file-upload').removeClass('regress'); 
            //}
        }

        if ($scope.q_id == $scope.q_all - 1) {
            $('.status').fadeOut(300);
        }

        $('#' + $scope.q_id).removeClass('slidein');
        $('#' + $scope.q_id).css('margin-top', 0)
        $('#' + $scope.q_id).animate({
        
            opacity: 0,
            marginTop: -100 + 'px'
        },
        {
            duration: 300,
            always: function () {
                $scope.q_id++;


                if ($scope.q_id >= $scope.q_all) {
                    $('.progress-bar').fadeOut(500);
                    $('.btn-container').fadeOut(500); 
                }
                $('#num').animate({
                    opacity: 1
                }, 200)
                $scope.$apply(); 
                animate_bar();
            }
        })

    }


    // show and hide prompt info 

    $scope.show_info = function(msg) { 

        var prompt = $('.prompt');
        var p_arrow = $('.prompt-style');

        if (window.innerWidth > 800) {
            prompt.css({
                'width': window.innerWidth / 5 + 'px'
            })

        } else {
            prompt.css({
                'width': window.innerWidth / 3 + 'px'
            })
        }
    
        $('.prompt-container').fadeIn(500); 

       prompt.html(msg); 
    }

    $scope.hide_info = function (msg) {

        $('.prompt-container').fadeOut(500);

    }
 
    // animate progress bar 

    function animate_bar() {
        $('.meter span').animate({
            width: $scope.step * $scope.q_id + '%'
        }, 1000)
    }



    // show error 

    function show_err() {
        if ($('.req')) {
            $('.error-msg').html('Please fill the field before continuing');
            $('.error-msg').fadeIn(300); 
        }
    } 
    
    var init_flag = false; 
    $scope.animate_upload = function () {
       
        if (init_flag) return false; 

        init_flag = true;
        var bar = $('.custom-file-upload');

        if (bar.hasClass('regress')) bar.removeClass('regress'); 
        bar.addClass('progress');
        var b = document.querySelector('.custom-file-upload'); 


        var p_bar = new ProgressBar.Circle(b, {
            strokeWidth: 5,
            easing: 'easeInOut',
            duration: 1400,
            color: '#a3ffae',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: null
        });

        p_bar.animate(1.0);

        setTimeout(function () {
            bar.removeClass('progress')
            bar.addClass('regress');
            $('svg').fadeOut(200, function () {
         
                init_flag = false; 
            });
            
        }, 1400)

    }

    $scope.img_uploaded = false; 
    $scope.upload = function () {

        var i = document.getElementById('file');
        i.onchange = function () {
                
            $scope.animate_upload();
            $scope.img_uploaded = true; 
            
        }
    }
     

    // use enter to switch question 
    document.onkeydown = function (e) {
        if (e.keyCode == 13) {
            $scope.switchQuestion(); 
        }  
    }
   
})
