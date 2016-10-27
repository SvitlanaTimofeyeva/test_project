angular.module('app', [])
    .controller('mainCtrl', function ($scope) {
        $scope.cat = 1;
        $scope.all = 2;
        $scope.step = 100 / $scope.all; 

        $scope.change_cat = function (flag) {
   
           $('.meter-top span').animate({

                    width: $scope.step * ($scope.cat + 1) + '%'
                }, {
                    duration: 1000,
                 
                    complete: function () {

                        if ($scope.cat == 1) {

                            $scope.cat++;
                           $('.stats').fadeOut(300, function () {
                               $('.progress-bar-top').fadeOut(500);
                               $('.content').fadeOut(500);
                               $('.thanx').css({
                                   'margin-top': window.innerHeight / 2 - 20 + 'px'
                               });
                               $('.thanx').fadeIn(500);
                           });
                       }
                         if (flag) {
                        $('.meter-top').fadeOut(500);
                   }
               }
           })
        } 

    })
    .controller('inputCtrl', function ($scope) {
           
           

            $scope.q = 0;
            $scope.q_all = 5; 

            $scope.indices = [0,1,2,3,4,5]; 

            $scope.inputs = JSON.stringify([
                {
                    title: 'Basic Organization Information',
                    placeholders: ['Full legal name of the organization*',
                    'Your organization is also known as (AKA)',
                    'Your organization website*',
                    'Please add your organization mission statement here.'],
                    types: ['i', 'i', 'i', 't'],
                    prompts: ['Enter this 9-digit number using the following format XX-XXXXXXX. EIN is an Employer Identification Number assigned by the IRS to identify a particular organization',
                    null, null, null],
                    values: [] 
                },
                {
                    title: 'Address',
                    placeholders: ['Main/physical address*', 'Building/suite number', 'City',
                    'State', 'Country'],
                    types: ['i', 'i', 'i', 'i'],
                    prompts: [null, null, null, null],
                    values: [] 
                },
                {
                    title: 'Fiscal Year Information',
                    placeholders: ['Fiscal year start date*', 'Fiscal year end date*',
                        'Asset Amount', 'Asset Amount Year'],
                    types: ['i', 'i', 'i', 'i'],
                    prompts: [null, null, 'Asset amount is an amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization’s asset amount'], 
                    values: []
                },
                {
                    title: 'National Taxonomy of Exempt Entities (NTEE)', 
                    placeholders: ['Select your organization type*'],
                    types: ['d', 'd'],
                    values: [[
                        'Nonprofit Organization',
                        'School',
                        'Faith Based organization',
                        'Association'

                    ]],
                    prompts: [null, null]
                },
                {
                    title: 'Region(s) that your organization currently serves',
                    placeholders: ['5 digit zip code of the regions you serve*'],
                    types: ['i'],
                    prompts: [null],
                    values: [] 
                },
                {
                    title: 'Leadership Information',
                    placeholders: ['Leadership Full Name', 'Leadership Job Title', 'Leadership Bio'],
                    types: ['i', 'i', 't'],
                    prompts: ['Your current senior leadership information. Please add them according to their hierarchy level. It can be your Executive Director/President/CEO, board chair/president and so forth.',
                    null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                    values: [] 
                }
            ]);


     })
    .directive('prettyInput', function () {
        return {
            restrict: 'E',
            template: `
                <label class="form-label">{{title}}</label>
                <div class ="wrap">

                        <input id="inp{{num}}" ng-focus="pretty_validate($event)" ng-change="check_empty()" ng-model="val" class ="form-input" placeholder="{{placeholder}}" />
                        <div class ="big-input-meter" id="meter{{num}}"></div>

                     <div class ="pretty-dropdown">
                       <div class ="cell" ng-click="select_items($event)" ng-repeat="value in values">
                    {{value}}
                    </div>
                </div>
               </div>
                <div class ="right" id="right{{num}}" ng-click="change_q()">
                    <img class="icon" src="img/arr.png" />
                </div>
                <div class ="wrong" id="wrong{{num}}">
                     <img class ="icon" src="img/cross.png" />
                </div>
                <div class ="input-meter">
                    <div class="meter-span" id="span{{num}}"></div>
                </div>


                `,
            scope: {
                num: '=',
                input: '@input'
            },
            replace: false,
            controller: function ($scope) {

                

                $scope.curr = '';
                $scope.q = 0;
                $scope.field_data = [];

                $scope.clicked_cells = []; 

                $scope.flag = false;

                $scope.data = JSON.parse($scope.input);
                $scope.values = $scope.data[$scope.num].values[$scope.q];

                $scope.title = $scope.data[$scope.num].title;

                $scope.q_all = $scope.data[$scope.num].placeholders.length;
                $scope.small_step = 100 / $scope.q_all;

                $scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q];
                console.log($scope.data)

                $scope.down = function () {


                    if ($scope.data[$scope.num].values.length > 0) {
                        $('#right' + $scope.num + ' img').attr('src', 'img/down.png').fadeIn(500, function () {
                            $(this).addClass('down'); 
                        });
                        $scope.drop = true;
                        $('#right' + $scope.num).css({
                            'background-color': '#1f467d'
                        });

                        $('#right' + $scope.num).animate({
                            width: 100 + 'px',
                         

                        });

                       
                    }
                }

                

                $scope.pretty_validate = function ($event) {
                    $scope.down(); 
                    if ($scope.data[$scope.num].values.length == 0) {
                        $scope.curr = $event.target;
                        $scope.show_wrong();
                    } else {

                        $scope.curr = $event.target;
                        $event.target.style.backgroundColor = '#9dabd0';
                        $event.target.style.color = '#8a97bb';
                        $event.target.value = $scope.placeholder; 
                        $event.target.style.color = '#162a63'; 

                    
                    }

                }

                $scope.check_empty = function () {
                    if ($scope.curr.value == '') {
                        $scope.hide_right();
                    } else {
                        $scope.show_right();
                    }
                }


                // animations 

                // empty field 
                $scope.show_wrong = function () {
                    if ($scope.q > 0) $('#wrong' + $scope.num).css({
                        marginTop: '-100px'
                    });

                    $('#wrong' + $scope.num).animate({
                        width: 100 + 'px'
                    }, {
                        duration: 300,
                        complete: function () {
                            $('#wrong' + $scope.num + ' img').fadeIn(300);
                        }
                    });
                }

                // valid input 
                $scope.show_right = function () {
                    if ($scope.done) return false;

                    $('#right' + $scope.num).animate({
                        width: 100 + 'px'
                    }, {
                        duration: 300,
                        complete: function () {
                            $('#right' + $scope.num + ' img').fadeIn(300);
                        }
                    })
                }

                // invalid input 
                $scope.hide_right = function () {

                    $scope.done = true;
                    $('#right' + $scope.num + ' img').fadeOut(300, function () {
                        $('#right' + $scope.num).animate({
                            width: 0 + 'px'
                        }, {
                            duration: 1000,
                        })
                    });

                }




                // animate placeholder change!!! 
                $scope.switch_placeholder = function () {
                    $('#inp' + $scope.num).animate({
                        opacity: 0
                    }, {
                        duration: 300,
                        complete: function () {

                            $scope.field_data.push({
                                cat: $scope.num,
                                index: $scope.q,
                                val: $scope.curr.value
                            })

                            $scope.curr.value = '';
                            $scope.q++;
                            $scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q];

                            $scope.$apply();
                            $scope.small_progress();

                            $(this).animate({
                                opacity: 1
                            }, 300)
                        }
                    });
                }


                // sliding block animation 
                $scope.pretty_slide = function () {

                    if ($scope.flag) return false;

                    $scope.flag = true;
                    $('#wrong' + $scope.num + ' img').fadeOut(100, function () {
                        $('#wrong' + $scope.num).fadeOut(100, function () {
                            $('#right' + $scope.num).animate({
                                marginRight: '200px',
                                opacity: 0
                            }, {
                                duration: 500,
                                complete: function () {
                                    $('#right' + $scope.num + ' img').css({ 'display': 'none' })
                                    $('#wrong' + $scope.num).css({
                                        'display': 'block',
                                        'width': '0px'
                                    })
                                    $(this).css({
                                        marginRight: '20px',
                                        width: '0px',
                                        opacity: 1
                                    })

                                    $scope.flag = false;
                                }
                            })
                        });
                    });
                }

                // change question!!! 
                $scope.change_q = function () {
                    
                    if ($scope.q + 1 < $scope.q_all && !$scope.drop) {

                        console.log($scope.q)
                        console.log($scope.q_all)
                        $scope.pretty_slide();
                        $scope.switch_placeholder();


                    } else if ($scope.drop) {

                      
                        $scope.show_drop(); 
                    }
                    else {
                        $scope.finish();

                    }

                }

                // input progress bar animation 
                $scope.small_progress = function (cb) {

                    $('#span' + $scope.num).animate({
                        width: $scope.small_step / $scope.q + '%'
                    }, {
                        duration: 500,
                        complete: function () {
                            if (cb) cb();
                        }
                    });
                }

                // form field is done 
                $scope.finish = function () {
                    $scope.done = true; 
                    $scope.q++;

                    if ($scope.drop) {
                        $scope.small_progress(cb1);
                    } else {
                     
                     
                        $scope.small_progress(cb2);
                    }

                    function cb1() {
                        $('#right' + $scope.num).fadeOut(100, function () {
                            $('#wrong' + $scope.num).fadeOut(100, function () {
                                $('.pretty-dropdown').slideUp(300, function () {
                                    $('#meter' + $scope.num).animate({
                                        width: 100 + '%'
                                    }, {
                                        duration: 300,
                                        complete: function () {

                                        }
                                    })
                                });
                            })
                        });
                   
                    }

                    function cb2() {
                        $('#right' + $scope.num + ' img').fadeOut(300, function () {
                            $('#meter' + $scope.num).animate({
                                width: 100 + '%'
                            }, {
                                duration: 300,
                                complete: function () {

                                }
                            })
                        })
                    }
                }

                //select items in dropdown 

                $scope.select_items = function ($event) {

           
                    $('.down').addClass('rotate');
                    $('#right' + $scope.num).attr('id', 'colorchange');
                    $('#colorchange').css({
                        'background-color': '#28d68c'
                    })

                    $('#colorchange').on('click', function () {

                    
                        $('#wrong' + $scope.num).fadeOut(200, function () {
                            $('#colorchange').animate({
                                marginRight: '200px', 
                                opacity: 0
                            }, { 
                                duration: 500, 
                                complete: function() {
                                    $('#colorchange').attr('id', 'right' + $scope.num);

                                    //        //$scope.drop = false; 
                                    $scope.finish()
                                }
                            })
        
                        })
                       
                
                    })

                    if ($event.target.classList.contains('selected')) {
                        $event.target.style.backgroundColor = '#c3cbe1';
                        $event.target.style.color = '#9dabd0';
                        $scope.clicked_cells.pop(); 

                    } else {

                        $scope.curr.style.backgroundColor = '#c3cbe1';
                        $scope.curr.style.color = '#8a97bb';

                        $scope.drop = true;
                        $event.target.style.backgroundColor = '#9dabd0';
                        $event.target.style.color = '#162a63'
                        $scope.show_right();

                        $scope.clicked_cells.push($event.target.innerText)
                        $event.target.classList.add('selected');



                    }
               
                }


                //show dropdown 

                $scope.show_drop = function () {

                    $scope.drop_success = function () {

                        $('.down').addClass('rotate');
                    }

                    $('#wrong' + $scope.num).animate({
 
                        marginTop: '-540px'
                    }, {
                        duration: 300,
                        complete: function () {
                            $scope.show_wrong();
                        }
                    })

                    $('#right' + $scope.num).animate({

                        marginTop: '-540px'
                    }, 300)

                    //$('#wrong' + $scope.num + ' img').animate({
                    //    marginTop: '230px'
                    //}, 300);
                    //$('#right' + $scope.num + ' img').animate({
                    //    marginTop: '230px'
                    //}, 300);
                    $('.pretty-dropdown').slideDown(300, function () {

                        

                        $('#inp' + $scope.num).css({
                            'cursor': 'pointer'

                        });

             
                    });
                }

           
          
            }
        }
    })
