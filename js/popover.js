/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Broad Institute
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Created by turner on 9/19/14.
 */
var igv = (function (igv) {

    igv.Popover = function (parentDiv) {

        this.markupWithParentDiv(parentDiv)
    };

    igv.Popover.prototype.markupWithParentDiv = function(parentDiv) {

        var myself = this,
            popoverCloseElement,
            popoverCloseIcon;

        if (this.parentDiv) {
            return;
        }

        this.parentDiv = parentDiv;

        // popover
        this.popoverDiv = $('<div class="igv-popover">')[0];
        $(this.parentDiv).append(this.popoverDiv);

        // popover content
        this.popoverContentDiv = $('<div class="igv-popoverContent">')[0];
        $(this.popoverDiv).append(this.popoverContentDiv);

        // popover close
        popoverCloseElement = $('<span class="igv-popoverCloseElement">')[0];
        $(this.popoverDiv).append(popoverCloseElement);

        popoverCloseIcon = $('<i class="fa fa-times igv-popoverCloseFontAwesome">')[0];
        $(popoverCloseElement).append(popoverCloseIcon);

        $(popoverCloseElement).hover(

            function() {
                $(popoverCloseIcon).removeClass("fa-times"       );
                $(popoverCloseIcon).addClass   ("fa-times-circle fa-lg");

                $(popoverCloseIcon).css({
                    "color" : "#222"
                });
            },

            function() {
                $(popoverCloseIcon).removeClass("fa-times-circle fa-lg");
                $(popoverCloseIcon).addClass   ("fa-times"       );

                $(popoverCloseIcon).css({
                    "color" : "#444"
                });

            }
        );

        popoverCloseElement.onclick = function (e) {
            $(myself.popoverDiv).hide();
        };

    };

    igv.Popover.prototype.testData = function (rows) {
        var i,
            name,
            nameValues = [];

        for (i = 0; i < rows; i++) {
            name = "name " + i;
            nameValues.push( { name : name, value : "verbsgohuman" } );
        }

        return nameValues;
    };

    igv.Popover.prototype.hide = function () {
        $(this.popoverDiv).hide();
    };

    igv.Popover.prototype.show = function (pageX, pageY, content) {

        var left,
            height,
            containerCoordinates = { x : pageX, y : pageY },
            containerRect = { x : 0, y : 0, width : $(window).width(), height : $(window).height() },
            popupRect = { },
            popupX = pageX,
            popupY = pageY;

        if (content) {

            $(this.popoverContentDiv).html(content);

            popupX -= $(this.parentDiv).offset().left;
            popupY -= $(this.parentDiv).offset().top;
            popupRect = { x : popupX, y : popupY, width : $(popoverDiv).outerWidth(), height : $(popoverDiv).outerHeight() };

            left = popupX;
            if (containerCoordinates.x + popupRect.width > containerRect.width) {
                left = popupX - popupRect.width;
            }

            $(popoverDiv).css({
                "left": left + "px",
                "top" : popupY  + "px"
            }).show();

            height = $(this.popoverContentDiv).height() + 20;
            $(popoverDiv).css({
                "height": height + "px"
            });
        }
    };

    return igv;

})(igv || {});

