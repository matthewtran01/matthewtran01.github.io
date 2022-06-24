/*
Name: Matthew Tran 
School: U mass Lowell
date: 6/23/2022
used jquery to create validations for the form so the inputs are correct and checked table for assignmeent 4 of GUI 1    
Matthew Tran, UMass Lowell Computer Science matthew_tran@student.uml.edu
    Copyright (c) 2022 by Matthew All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author. Updated June 23,2022
*/
function validCheck()
{
    /* create a validator method that makes sure the end value is numerically larger than the beginning  */
    $.validator.addMethod("greaterThan", function(value, element, param)
    {
        var num1= parseInt(value);
        var num2= parseInt($(param).val());
        return this.optional(element) || num1 >= num2;
    }, 'Invalid value');

    
    // Validate data of the form by checking if the value is filled, a number, between -50 and 50, larger than the start number(if applicable), and if the range is under 100(if applicable)

    $("#sForm").validate
    (
        {
        rules:
        {
            rowStart:
            {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            rowEnd:
            {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThan: "#rowStart",
                
            },
            colStart:
            {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            colEnd:
            {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThan: "#colStart",
                
            }
        },
        messages:
        {
            rowStart:
            {
                required: "Please enter something",
                number: "Please enter an actualy number",
                min: "Please enter a number greater than -50",
                max: "Please enter a number that is less than 50"
            },
            rowEnd:
            {
                required: "Please enter something",
                number: "Please enter an actualy number",
                min: "Please enter a number greater than -50",
                max: "Please enter a number that is less than 50",
                greaterThan: "Please make sure the end number is larger than or equal to the starting number",
                
            },
            colStart:
            {
                required: "Please enter something",
                number: "Please enter an actualy number",
                min: "Please enter a number greater than -50",
                max: "Please enter a number that is less than 50"
            },
            colEnd:
            {
                required: "Please enter something",
                number: "Please enter an actualy number",
                min: "Please enter a number greater than -50",
                max: "Please enter a number that is less than 50",
                greaterThan: "Please make sure the end number is larger than or equal to the starting number",
                
            }
        }
    });
}

function slideTable()
{
    validCheck();

 //$(".button").click(function()

    if($("#rowStart").valid() && $("#rowEnd").valid() && $("#colStart").valid() && $("#colEnd").valid())
    {
        createTable();
    };

}