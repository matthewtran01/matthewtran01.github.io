$(document).ready(function()
{
    /* create a validator method that makes sure the end value is numerically larger than the beginning  */
    $.validator.addMethod("greaterThan", function(value, element, param)
    {
        var num1= parseInt(value);
        var num2= parseInt($(param).val());
        return this.optional(element) || num1 >= num2;
    }, 'Invalid value');

    /* create a validator to make sure the range of numbers from beginning to end is less than 100 */
    $.validator.addMethod("range", function(value, element, param)
    {   
        var num1= parseInt(value);
        var num2= parseInt($(param).val());
        return this.optional(element) || Math.abs(num1 - num2) < parseInt(101);
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
                range: "#rowStart"
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
                range: "#colStart"
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
                range: "Please make sure the range of numbers is 100 or less"
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
                range: "Please make sure the range of numbers is 100 or less"
            }
        }
    });
});

$(".button").click(function()
{
    if($("#rowStart").valid() && $("#rowEnd").valid() && $("#colStart").valid() && $("#colEnd").valid())
    {
        createTable();
    };
})