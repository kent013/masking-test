$().ready(function () {
    var layer, image, content;
    //add obstacle layer
    $('a.toggle-obstable').on('click', function(e){
        var layer = $(e.target).parents('div');
        if(layer.find('div.obstacle').length > 0){
            layer.find('div.obstacle').remove();
        }else{
            layer.append($('<div class="obstacle">Obstacle!!!!</div>'));
        }
    });

    //example1
    layer = $('#example1 div.mask');
    if((!$.support.checkOn && $.support.checkClone) || $.browser.mozilla){
        layer.css('background-image', 'url(images/image.png)');
    }else{
        image = '<img src="' + 'images/image.png' + '"/>';
        content = getMaskedContent('mozie1', image, 'images/mask.png', 'images/mask_mozie.png', 400, 400);
        layer.append($(content));
    }

    //example2
    layer = $('#example2 div.mask');
    if((!$.support.checkOn && $.support.checkClone)){
        layer.css('background-image', 'url(images/image.png)');
    }else{
        image = '<img src="' + 'images/image.png' + '"/>';
        content = getMaskedContent('mozie2', image, 'images/mask.png', 'images/mask_mozie.png', 400, 400);
        layer.append($(content));
    }

    //animation
    $('a.animate').on('click', function(e){
        var layer = $(e.target).parents('div').find('div.mask');
        layer.fadeOut(
            {duration:1000, complete:function(){
                layer.fadeIn(
                    {duration:1000}
                );
            }}
        );
    });

    //example3
    layer = $('#example3 div.mask');
    if((!$.support.checkOn && $.support.checkClone)){
        layer.css('background-image', 'url(images/image.png)');
    }else{
        image = '<img src="' + 'images/image.png' + '"/>';
        content = getMaskedContent('mozie3', image, 'images/mask.png', 'images/mask_mozie.png', 400, 400);
        layer.append($(content));
    }

    //ie9 animation
    if($.browser.msie && $.browser.version == 9){
        $('#example3 a.animate').off('click');
        $('#example3 a.animate').on('click', function(e){
            var layer = $(e.target).parents('div').find('div.mask img:first');
            animateImageIE9(layer, "fadeOut", 1000, function(){
                animateImageIE9(layer, "fadeIn", 1000);
            });
        });
    }
});


function animateImageIE9(image, type, duration, complete){
    var begin = 0;
    var end = 100;
    if(type == "fadeOut"){
        begin = 100;
        end = 0;
    }
    image.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + begin + ')');
    var interval = 13;
    var step = 0;
    duration = duration / 4; //adhoc adjustment

    var intervalId = setInterval(function(){
        var opacity = step * (100 / (duration / interval));
        console.log(opacity);
        if(type == "fadeOut"){
            opacity = 100 - opacity;
        }

        image.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')');
        step++;
        if(step * interval > duration){
            clearInterval(intervalId);
            image.css('filter', 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + end + ')');
            if(complete){
                complete();
            }
        }
    }, interval);
}

function getMaskedContent(id, content, mask, iemask, width, height){
    if(!$.support.checkOn && $.support.checkClone){
        return '';
    }

    var viewerContent = '';
    if(window.SVGForeignObjectElement) {
        viewerContent += '<svg width="' + width + 'px" height="' + height + 'px"><defs><mask id="' + id + '" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse"><image width="' + width + 'px" height="' + height + 'px" xlink:href="' + mask +'"/></mask></defs><foreignObject width="100%" height="100%" style="mask: url(#' + id + ');">';
    } else {
        viewerContent += '<div style="width:' + width + 'px; height:' + height + 'px; filter: progid:DXImageTransform.Microsoft.Chroma(color=\'#00FFFF\'); zoom: 1;">';
    }
    viewerContent += content;
    if(window.SVGForeignObjectElement) {
        viewerContent += '</foreignObject></svg>';
    } else {
        viewerContent += '<!--[if lte IE 9]><img src="' + iemask + '" style="display: block; margin-top: -' + height + 'px;"><![endif]--></div>';
    }
    return viewerContent;
}
