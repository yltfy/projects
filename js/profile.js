$(document).ready(function(){
    $('.works-box dl').on('click',function () {
        var $this = $(this);
        var newTab=window.open('about:blank');
        good($this,newTab);
    });
    var cate = 'all';
    $('#nav-works li').on('click',function () {
        var $this = $(this);
        if($this.data('cate')==cate){
            return;
        }else{
            $.ajax({
                url:"/api.php/example/exampleList?cate="+$this.data('cate'),
                type:'get',
                success:function(data){
                    var worksList = data.data.worksList;
                    var str = '';
                    for(var i in worksList){
                        var works = worksList[i].works;
                        var name = '';
                        if($this.data('cate')!='all'&&works.length<=4){
                            name = ' min-hg';
                        }
                        str += '<div class="works-box-top">\
                                    <div class="works-box-bottom clear">\
                                        <div class="works-box-count'+name+'">\
                                            <h3>'+ worksList[i].name +'</h3>';
                        for(var j=0;j<works.length;j++){
                            if(j%4==0){
                                str += '<div class="works-box-row clear">';
                            }
                            str += '<dl data-nid="'+works[j].newsId+'" data-wid="'+works[j].workId+'"><dt><div class="box-3d"><div class="box-3d-content"><img src="'+works[j].coverImg+'"/><img src="'+works[j].coverImg+'"/><img src="'+works[j].coverImg+'"/><img src="'+works[j].coverImg+'"/><img src="'+works[j].coverImg+'"/></div></div></dt><dd><p>'+works[j].title+'</p><ul><li class="talk">'+works[j].commentNum+'</li><li class="praise">'+works[j].voteNum+'</li></ul></dd></dl>';
                            if(j%4==3||j==(works.length-1)){
                                str += '</div>';
                            }
                        }
                        str += '</div>\
                            </div>\
                        </div>';
                    }
                    $('#works-box').html(str);
                    $(".box-3d").on("mouseenter mouseleave",function(e) {
                        spin(e,this);
                    });
                    $('.works-box dl').on('click',function () {
                        var $this = $(this);
                        var newTab=window.open('about:blank');
                        good($this,newTab);
                    });
                    cate = $this.data('cate');
                    $('#nav-works .active').removeClass('active');
                    $this.addClass('active');
                },
                error:function(data){
                    console.log(data);
                }
            });
        }
    });

    //图片3D旋转效果
    $(".box-3d").on("mouseenter mouseleave",function(e) {
        spin(e,this);
    });

    function spin(e,obj) {
        var sTop = getScrollTop();
        var w = obj.offsetWidth;
        var h = obj.offsetHeight;
        var x = e.pageX - obj.getBoundingClientRect().left - w/2;
        var y = e.pageY - obj.getBoundingClientRect().top - sTop - h/2;
        var direction = Math.round((((Math.atan2(y, x) * 180 / Math.PI) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
        var eventType = e.type;
        var box3D = $(obj).find(".box-3d-content");
        if(eventType == 'mouseenter'){
            switch (direction){
                case 0:
                    box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(-90deg)");
                    break;
                case 1:
                    box3D.css("transform","translateZ(-85px) rotateY(-90deg) rotateX(0deg)");
                    break;
                case 2:
                    box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(90deg)");
                    break;
                case 3:
                    box3D.css("transform","translateZ(-85px) rotateY(90deg) rotateX(0deg)");
                    break;
            }
        }else{
            box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(0deg)");
        }
    }

    //获取滚动条高度
    function getScrollTop(){
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
});