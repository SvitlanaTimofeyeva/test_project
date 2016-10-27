angular.module('app', []).controller('mainCtrl', function ($scope) {

    $scope.done = false; 

    $scope.animate_upload = function () {

        var graph = $('.custom-upload');
        var meter = $('#upload-meter'); 
        var f = document.getElementById('file'); 
 
        f.onchange = function () {
            graph.animate({
                width: 160 + 'px'
            }, {
                duration: 500,
                complete: function () {

                    meter.animate({
                        width: 154 + 'px'
                    }, {
                        duration: 500,
                        complete: function () {
                            graph.animate({
                                width: 119 + 'px'
                            }, {
                                duration: 500,
                                start: function () {
                                    meter.fadeOut(400, function () {
                                        meter.css({
                                            'width': 0 + 'px',
                                            'display': 'block'
                                        })
                                    });
                                }
                            })

                        }
                    })
                }
            });
        }

    }

    $scope.is_animating = false; 
    $scope.show_info = function (id, msg) {

        if ($scope.is_animating) return false; 
        $scope.is_animating = true;

        var prompt = $('.prompt');
        var p_arrow = $('.prompt-style');

        if (window.innerWidth > 800) {
            prompt.css({
                'width': window.innerWidth / 5 + 'px'
            })

        } else {
            prompt.css({
                'width': window.innerWidth / 2.5 + 'px'
            })
        }

        function set_pos(id) {
            var p = $('#' + id).position().top;

            if (id == '1') {
                $('#2').fadeOut(100);
            }
            $('.prompt-container').css({
                'margin-top': p + 50 +  'px'
            })

            
        }

        set_pos(id); 

        $('.prompt-container').fadeIn(300);

        prompt.html(msg);

 
    }

    $scope.hide_info = function (id) {

    
        $('.prompt-container').fadeOut(500, function () {
        });
        $scope.is_animating = false; 
        if (id == 1) {
            $('#2').fadeIn(900);
        }

    }

    $scope.animate_bar = function() {
        var b = $('.meter');

        b.animate({
            width: 100 + '%'
        }, {
            duration: 500,
            complete: function () {

                $scope.switch_slides();
            }
        })


    }

    $scope.validate_input = function () {
     
        if ($('input[name=c_id]').val() == '') {
            $scope.show_err(1);
        } else if ($('input[name=c_name]').val() == '') {
            $scope.show_err(2); 
        } else {
            $scope.animate_bar(); 
        }
        
    }

    $scope.show_err = function (id) {
        $('.err' + id).fadeIn(300);
    
    }

    $scope.hide_err = function (id) {
        $('.err' + id).fadeOut(300); 
    }

    $scope.switch_slides = function () {
        $('.form-block').animate({
            opacity: 0
        }, {
            duration: 500,
            start: function () {
                $('.form-block').css({
                    'visibility': 'hidden'
                })

                var w = window.innerWidth / 2 - $('.thank-you-screen').width() / 2; 
                
                $('.thank-you-screen').css({
                    left: w + 'px',
                    top: 40 + '%'
                });

                $('.thank-you-screen').fadeIn(300);
            }
        })
        
    }
    window.onresize = function () {
        $('.prompt-container').fadeOut(500);

        var w = window.innerWidth / 2 - $('.thank-you-screen').width() / 2;

        $('.thank-you-screen').css({
            left: w + 'px',
            top: 40 + '%'
        });


    }
})