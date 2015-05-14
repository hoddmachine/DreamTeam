

$(document).ready(function () {
    //TODO: add a check so that if a person clicks a previously selected button classes aren't added
    $(".posts-type button:nth-child(1)").click(function () {
        $(".posts-type button:nth-child(1)").removeClass("btn-option").addClass("btn-selected");
        $(".posts-type button:nth-child(2)").removeClass("btn-selected").addClass("btn-option");
    });
    $(".posts-type button:nth-child(2)").click(function () {
        $(".posts-type button:nth-child(1)").removeClass("btn-selected").addClass("btn-option");
        $(".posts-type button:nth-child(2)").removeClass("btn-option").addClass("btn-selected");
    });
    $(".posts-orderby button:nth-child(1)").click(function() {
        $(".posts-orderby button:nth-child(1)").removeClass("btn-option").addClass("btn-selected");
        $(".posts-orderby button:nth-child(2)").removeClass("btn-selected").addClass("btn-option");
    });
    $(".posts-orderby button:nth-child(2)").click(function () {
        $(".posts-orderby button:nth-child(1)").removeClass("btn-selected").addClass("btn-option");
        $(".posts-orderby button:nth-child(2)").removeClass("btn-option").addClass("btn-selected");
    });

    $(".create-post-button").click(function(){
        $(".new-post-container").toggleClass('open');
    });
    
    $(".search-filters button").click(function() {
        $(this).siblings().not(".btn-option").toggleClass("btn-option");
        $(this).toggleClass("btn-option");
        var filter = $(this).attr("name");

        if(filter === "s_all") {
            $(".search-results").show(100);
        } else {
            $(".search-results").not('.' + filter).hide(100);            
            $('.' + filter).show(100);
        }
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })
    
    $(".create-group-button").click(function () {
        $(".edit-info-container").toggleClass('open');
    });


    // Search results filter
    $(".search-filters button").click(function () {
        $(this).siblings().not(".btn-option").toggleClass("btn-option");
        $(this).toggleClass("btn-option");
        var filter = $(this).attr("name");

        if (filter === "s_all") {
            $(".search-results").show(100);
        } else {
            $(".search-results").not('.' + filter).hide(100);
            $('.' + filter).show(100);
        }
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    
    $('.image-link').magnificPopup({type:'image'});
    
    $('.popup-link').magnificPopup({ 
        type: 'image'
        // other options
    });


    $("body").on('click', ".btn-follow", function () {
        var currBtn = $(this);
        var btnText = $("span", this);
        var btnType = btnText.text();
        var uri = currBtn.attr('data-url');
        var id = currBtn.attr('data-id');
        console.log(uri + id);
        $.ajax({
            async: false,
            type: "POST",
            url: uri,
            data: {
                'Id': id
            }
        }).success(function (result) {
            var uri = currBtn.attr("data-url");
            if (btnType === "Follow") {
                btnText.text("Unfollow");
                var newAttr = (uri.slice(0, 8) + "Unf" + uri.slice(9));
                currBtn.attr("data-url", newAttr);
            } else if (btnType === "Unfollow") {
                btnText.text("Follow");
                var newAttr = (uri.slice(0, 8) + "F" + uri.slice(11));
                currBtn.attr("data-url", newAttr);
            }
            currBtn.toggleClass("btn-option");
        }).fail(function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        });
        return false;
    });


    $("body").on('click', ".vote", function () {
        var currBtn = $(this);
        var uri = currBtn.parent.attr('data-url');
        var id = currBtn.parent.attr('data-id');
        var type = currBtn.attr('data-type');
        $.ajax({
            async: false,
            type: "POST",
            url: uri,
            data: {'type' : type }
        }).success(function (result) {
            var count = currBtn.closest("post-rating-count");
            var value = parseInt(count.text(), 10);
            if (type == "up") {
                value += 1;
                count.text(value);
            } else if (type == "down") {
                value -= 1;
                count.text(value);
            }
            currBtn.toggleClass("btn-option");
        }).fail(function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        });
        return false;
    });

    $('body').on('submit', '#edit_profile', function () {
        var theForm = $(this);
        $.ajax({
            type: "POST",
            url: "/Profile/EditProfile",
            data: theForm.serialize(),
        }).done(function (result) {
            // Todo Update form

        }).fail(function (error) {
            alert("There was an error posting the data to the server: " + error.responseText);
        });
        return false;
    });

    $(".edit-profile button").click(function () {
        var form = $("#edit_profile").serialize();
        $.ajax({
            type: 'POST',
            url: "/Profile/EditProfile",
            data: form,
            dataType: 'json',
            success: function (data) {
                if (data.result == "Error") {
                    alert(data.message);
                }
            }
        });
    });



});




