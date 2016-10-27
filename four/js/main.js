angular.module('myapp', []).controller('mainCtrl', function ($scope) {
    $scope.q = 0;
    $scope.q_all = 7;
    $scope.curr = '';
    $scope.curr_inp = '';

    $scope.step = 100 / 6; 

    $scope.formData = []; 

	$scope.isAnimating = false; 
	
    window.onresize = function() {

        if (window.innerWidth < 1000) {
            $scope.q = 6; 
            $scope.$apply(); 

            $('.progress-bar-top').fadeOut(200);
            $('#continue-btn').fadeOut(200); 
            $('.check-title').text('Demo Form'); 
            $('.q1').fadeOut(300); 
            $('.q').fadeIn(300); 
            $('#wrap').attr('id', 'wrap2'); 
        }
    }

    $scope.show_prompt = function() {
  
            $('.prompt-wrap').velocity({
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
            $('.prompt-wrap').velocity({
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
		block.css({'z-index': '11111111'}); 
		c.fadeOut(300, function() {
			        
					// if ($scope.q == 3) {
                    block.animate({
                   
						width: '0px', 
						opacity: 0
                    }, {
						
						duration:300, 
						start: function() {
						
								next.animate({
								width: '108px'
								}, 
								{
								duration: 300,
								start: function () {
					   
									a.fadeIn(400, function () {
										$scope.f = true;
									});
									
								}
							})
						}
					})
               // }

		})

            

        } else {

            a.fadeOut(100); 
            next.velocity({
                width: '0px'
            }, 200);

            c.fadeIn(200); 
            if ($scope.q == 3) {

                block.velocity({
                    width: '108px', 
                    marginRight: '0px', 
					opacity: 1
                }, 200)
            }

            else {
                block.velocity({
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
 
        c.fadeIn(300);
        block.velocity({
            width: '108px'
        }, {
            duration: 300,
        })
    }

    $scope.change_q = function () {

        if ($scope.q == 5) {
            $('.progress-bar-top').fadeOut(300, function () { 
				$('#continue-btn').fadeOut(300);
                $scope.show_form();
            })
        }

        if ($scope.q == 0) {
            $scope.hide_prompt(); 
        } else if ($scope.q == 4) {
	
			$scope.move_file_bar();
		} 
		
		else {
            $scope.animate_q();
        }


    } 

    $scope.animate_bar_top = function (flag) {

        $('.meter-top span').animate({
  
            width: $scope.step * ($scope.q+1) + '%'
        }, {
            duration: 700,
            complete: function () {
                if (flag) {
                    $('.meter-top').fadeOut(200);
                }
            }
        })


    }

    $scope.animate_q = function() {

        $scope.f = false; 
        var bar = $('.meter');


        var next = $('.next');

        next.animate({
	
		marginRight: 200 + 'px', 
		opacity: 0.3
		
        }, {
            duration: 400,

            complete: function () {
                $('.q').fadeOut(500, function () {
					$scope.animate_bar_top();

					bar.animate({
						'width': ($scope.q + 1) * $scope.step + '%',

					}, {
						duration: 500, 
						complete: function() {
							if ($scope.q == 3) {
								$scope.isAnimating = true; 
								$scope.exp();
							}
						}
					})
                    $scope.formData.push({
                        i: $scope.q, 
                        val: $scope.curr_inp.value
                    }); 

                    $scope.q++;
                    $scope.f = false;
                    $scope.$apply();

                    $('.q').fadeIn(300);

   
                });
            }
        })
    }

    $scope.exp = function () {

        $('.input-overlay').animate({
            height: '200px',
            marginTop: '-200px'
        }, 300);

        $('.arrow').css('margin-top', '75px');
        $('.cross').css('margin-top', '75px');

		       $('.block').animate({
                    height: '200px',
                    marginTop: '-185px'
                }, {
                    duration: 300,
                    complete: function () {
                        $('.next').css({
                            'height': '200px',
                            'margin-top': '-185px',
                        }); 
						
						$scope.isAnimating = false; 
                    }
                }); 
				
        $('textarea').animate({
            height: 200 + 'px'
        }, {
            duration: 300
        })
    }

    $scope.pretty_upload = function () {
		if ($scope.isAnimating) return false; 
        var file = document.getElementById('file'); 
        $scope.curr_inp = file; 
        
			
        file.onchange = $scope.move_file_bar; 
    } 
	
	$scope.move_file_bar = function() {
				console.log($scope.curr_inp.value) 

				
				
				$('.plus').fadeOut(100, function() {
					
					$('.file-meter').animate({
					width: '800px' ,
					opacity: 0.3
					
				}, {
					duration: 300,
					complete: $scope.change_q_file
				})
			});
	}

	$scope.change_q_file = function () {
                    $scope.animate_bar_top(); 
                    $('.file-meter').fadeOut(300, function() {
                    
               
                          
                            $('#q5').css('height', 100 + 'px');
                          
                            $scope.formData.push({
                                i: 4, 
                                val: $scope.curr_inp.value
                            })
                            $('.progress-b').fadeOut(300); 
                            $('.input-overlay').fadeOut(300, function () {
                                $scope.q++;
                                $scope.$apply();

                                $('.q').fadeIn(500, function () {


                                });
                            });
						})                  
					}
  
    $scope.show_form = function() {

        $('.progress-b').velocity({
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

