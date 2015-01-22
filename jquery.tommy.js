/*
$.fn.hasAttr(attribute)                         (jQuery Plug-in)是否有屬性
$.fn.removeStyle(property)                      (jQuery Plug-in)移除樣式
*/

/*====================================================================================================
(jQuery Plug-in)是否有屬性
ex:  $("div").hasAttr("style")
out: true , false
*/

(function($) {
    $.fn.hasAttr = function(attribute) {
        var result = false;
        this.each(function() {
            if ($(this).attr(attribute) !== undefined) {
                result = true;
            }
        });
        return result;
    };
})(jQuery);

/*====================================================================================================
(jQuery Plug-in)移除樣式
ex:  $("div").removeStyle("width")
out: jQuery Object
*/
(function($) {
	$.fn.removeStyle = function(property) {
     if (typeof property === "string" && property.length>0) {
       var style =this.attr("style") || "";
       style = style.split(";");
       var newStyle=[];
       for(var i=0,max=style.length;i<max;i++) {
         if(style[i].split(":")[0].indexOf(property)===-1) {
           newStyle.push(style[i]);
         }
       }
       this.attr("style",newStyle.join(";"));
     }
     return this;
  };
})(jQuery);