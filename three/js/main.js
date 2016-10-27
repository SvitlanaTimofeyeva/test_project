angular.module('myapp', []).controller('mainCtrl', function ($scope) {
    $scope.q = 0;
    $scope.q_all = 7;
    $scope.curr = '';
    $scope.curr_inp = '';

    $scope.step = 100 / 7; 

    $scope.formData = []; 

    window.onresize = function() {

        if (window.innerWidth < 1000) {
            $scope.q = 6; 
            $scope.$apply(); 

            $('.check-title').text('Demo Form'); 
            $('.q1').fadeOut(300); 
            $('.q').fadeIn(300); 
            $('#wrap').attr('id', 'wrap2'); 
        }
    }

    $scope.show_prompt = function() {
  
            $('.prompt-wrap').animate({
                height: '60px', 
                paddingTop: '9px'
            }, {
                duration: 300, 
                complete: function() {
                    $('.pretty-prompt').fadeIn(300); 
                }
            })
    
    } 

    $scope.hide_prompt = function() {
        $('.pretty-prompt').fadeOut(300, function() {
            $('.prompt-wrap').animate({
                height: '0px', 
                paddingTop: '0px'
            }, {
                duration: 300, 
                complete: function() {
                    $scope.animate_q(); 
                }
            })
        })
    }

    $scope.pretty_validate = function () {
        
        if ($scope.curr_inp.value.length == 0) $scope.f = false; 
        if ($scope.f) return false;

     

        var c = $('.cross');
        var a = $('.arrow');

        var next = $('.next');
        var block = $('.block');



        if ($scope.curr_inp.value.length > 0) {


            c.fadeOut(100, function () {
                if ($scope.q == 3) {
                    block.animate({

                        marginRight: -108 + 'px'
                    }, 300)
                }
                next.animate({
                    width: '108px'
                }, {
                    duration: 300,
                    complete: function () {

                        
                        a.fadeIn(400, function () {

                            $scope.f = true;
                        });
                        block.css({ 'width': '0px' })
                    }
                })
            })

        } else {

            a.fadeOut(100); 
            next.animate({
                width: '0px'
            }, 200);

            c.fadeIn(200); 
            if ($scope.q == 3) {

                block.animate({
                    width: '108px', 
                    marginRight: '0px'
                }, 200)
            }

            else {
                block.animate({
                    width: '108px'
                }, {
                    duration: 200,

                })
            }
  
        }
        
    }

    $scope.block = function ($event) {

        var c = $('.cross');
        var a = $('.arrow');

        var next = $('.next');
        var block = $('.block');

        $scope.curr_inp = $event.target;

        if ($('.pretty-prompt')) {
            $scope.show_prompt();
        }
    
        if ($scope.curr_inp.value.length > 0) return false;
        //else {
        //    next.fadeOut(200); 
        //}
 
        c.fadeIn(300);
        block.animate({
            width: '108px'
        }, {
            duration: 300,
        })
    }

    $scope.change_q = function () {


        if ($scope.q == 0) {
            $scope.hide_prompt(); 
        } else {
            $scope.animate_q();
        }



    } 

    $scope.animate_q = function() {

        $scope.f = false; 
        var bar = $('.meter');


        var next = $('.next');

        next.animate({
            opacity: 0,
            marginRight: 300 + 'px'
        }, {
            duration: 500,
            start: function() {
                bar.animate({
                    'width': ($scope.q + 1) * $scope.step + '%',

                }, {
                    duration: 300,
                })
            }, 
            complete: function () {
                $('.q').fadeOut(200, function () {

                    $scope.formData.push({
                        i: $scope.q, 
                        val: $scope.curr_inp.value
                    }); 

                    $scope.q++;
                    $scope.f = false;
                    $scope.$apply();

                    $('.q').fadeIn(200);

                    if ($scope.q == 3) {
                        $scope.exp();
                    }

              
                });

            }
        })

    }

    $scope.exp = function () {

        $('.input-overlay').animate({
            height: '200px',
            marginTop: '-200px'
        }, 300);

        $('textarea').animate({
            height: 200 + 'px'
        }, {
            duration: 300,
            start: function () {
           
            
                $('.block').animate({
                    height: '200px',
                    marginTop: '-185px'
                }, {
                    duration: 500,
                    complete: function () {
                        $('.next').css({
                            'height': '200px',
                            'margin-top': '-185px',
                        });

                    }
                });
            } 
        })
    }

    $scope.pretty_upload = function () {

        var file = document.getElementById('file'); 
        $scope.curr_inp = file; 
        

        file.onchange = function () {
            console.log($scope.curr_inp.value)
            $('.plus').fadeOut(300);
            $('.file-meter').animate({
                width: '100%'
            }, {
                duration: 500,
                complete: function () {

                    $('.file-meter').animate({
                        height: '0%', 
                        marginTop: 200 + 'px'
                    }, {
                        duration: 400, 
                        complete: function() {
                            $scope.formData.push({
                                i: 4, 
                                val: $scope.curr_inp.value
                            })
                            $scope.q++;
                            $scope.$apply(); 


                        $('.input-overlay').animate({

                            height: '0px', 
                            marginTop: '0px'
                        }, 300); 
                        
                        $('.q').fadeIn(300, function() {


                        $('.y-n-btns').animate({
                            height: '100px'
                        }, 300)
                        
                        $('.y').animate({

                            width: '50%'
                        }, {

                            duration: 300, 
                            complete: function() {
                                $('.txt').fadeIn(300); 
                            }
                        }); 


                    }); 
                        }
                    })                  
                }
            })
        }
    } 

    $scope.get_check = function($event) {

        if ($event.target.dataset.val == '1') {
            $scope.formData.check = true; 
        } else {
            $scope.formData.check = false; 
        } 

        console.log($scope.formData); 

        $scope.show_form(); 
    } 

    $scope.show_form = function() {

        $('.progress-b').animate({
            marginLeft: '50%', 
            width: '0%'
        },{
            duration: 300, 
            complete: function() { 

                $('.q').fadeOut(300, function() {

                 $scope.q++; 
                 $scope.$apply(); 
                 $('#wrap').attr('id', 'wrap2'); 
                 $('.q').fadeIn(300); 

                })
            }
        })

    }

    $scope.pretty_upload2 = function() {
        var file2 = document.getElementById('file2'); 

        file2.onchange = function() {
            $('.custom-file2').addClass('color-change'); 
        }
    } 

   $scope.show_thanx = function() {

        $('.q').fadeOut(300, function() {

            $scope.q = 7; 
            $scope.$apply(); 

            $('#wrap2').attr('id','wrap'); 
            $('.q').fadeIn(300); 
        })    
   }


}) 

window.onload = function() {
       $('.q').fadeIn(300);
       $('.q1').fadeIn(300); 

       var e = new CustomEvent('resize'); 
       window.dispatchEvent(e); 
}

