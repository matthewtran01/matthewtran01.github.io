/*
Name: Matthew Tran 
School: U mass Lowell
date: 6/23/2022
used jquery to add a slider bar and a window to add tabs for multiple multiplication tables  
Matthew Tran, UMass Lowell Computer Science matthew_tran@student.uml.edu
    Copyright (c) 2022 by Matthew All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated June 23,2022
*/

// create the  tab
function createTabs()
{
    //counter = tab counter, if more than 30, then throw an error
    var counter = $("#tabs ul li").length + 1;
    if(counter > 30)
    {
        alert("Cannot create more than 30 tabs.");
        return false;
    }

    // add a new tab of the current multiplication table
    if($("#rowStart").valid() && $("#rowEnd").valid() && $("#colStart").valid() && $("#colEnd").valid())
    {
        $("#tabs").tabs();
        $("#tabs ul").append("<li><a href='#tab-" + counter + "'>tab #" + counter + "</a><span role='presentation' class='ui-icon ui-icon-close'></span></li>");
        $("#tabs").append("<div id='tab-"+counter+"'>" + $("#table").html() + "</div>");
        $("#tabs").tabs("refresh");
        $("#tabs").tabs("option", "active", -1);
    }
    else
    //error message for the inability to create a tab of current multiplication table 
    {
        alert("Error: could not create a tab of multiplication table");
        return false;
    }
}

// slider function that creates the slider from the id in index.html and continuously updates the multiplication table on input and sliding 
function sliderRead() {
    $("#horizontalStart").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) 
        {
            $("#rowStart").val(ui.value);
            slideTable();
        }
    });
    $("#rowStart").on("keyup", function() {
        $("#horizontalStart").slider("value", this.value);
        slideTable();
    });

    $("#horizontalEnd").slider(
        {
        min: -50,
        max: 50,
        slide: function(event, ui) 
        {
            $("#rowEnd").val(ui.value);
            slideTable();
        }
    });
    $("#rowEnd").on("keyup", function() 
    {
        $("#horizontalEnd").slider("value", this.value);
        slideTable();
    });

    $("#verticalStart").slider(
        {
        min: -50,
        max: 50,
        slide: function(event, ui) 
        {
            $("#colStart").val(ui.value);
            slideTable();
        }
    });
    $("#colStart").on("keyup", function() 
    {
        $("#verticalStart").slider("value", this.value);
        slideTable();
    });

    $("#verticalEnd").slider(
        {
        min: -50,
        max: 50,
        slide: function(event, ui) 
        {
            $("#colEnd").val(ui.value);
            slideTable();
        }
    });
    $("#colEnd").on("keyup", function() 
    {
        $("#verticalEnd").slider("value", this.value);
        slideTable();
    });
}




$(function()
{

    //create table and slider
    slideTable();
    sliderRead();


    //close tabs
    $("#tabs").on("click", "span.ui-icon-close", function() {
        var panelNum = $(this).closest("li").remove().attr("aria-controls");
        $("#"+panelNum).remove();
        $("#tabs").tabs("refresh");
        if($("#tabs ul li").length == 0) {
            $(".ui-tabs").tabs("destroy");
            document.getElementById("rm").innerHTML = "";
        }
    });


    //create the button to delete all tabs
    $(".button").click(function() {
        createTabs();
        var delButton = '<button type="button">Delete All Tab</button>';
        document.getElementById("rm").innerHTML = delButton;
    });

    // delete all the tabs
    $("#rm").click(function() {
        document.getElementById("tabs").innerHTML = "<ul></ul>";
        $(".ui-tabs").tabs("destroy");
        document.getElementById("rm").innerHTML = "";
    });
});

