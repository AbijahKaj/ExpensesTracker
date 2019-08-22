/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var expenses = $.localStorage.get('expenses') ? $.localStorage.get('expenses') : [];
$(() => {
    loadExpenses();
    $("#refresh").click((e) => {
        e.preventDefault();
        loadExpenses();
    })
    $("#expenseForm").submit((e) => {
        e.preventDefault();
        var id = expenses.length,
                name = $("#name").val(),
                amount = $("#amount").val();
        if (name != "" && amount != "") {
            var newDate = new Date();
            var datetime = newDate.today() + " @ " + newDate.timeNow();
            expenses.push([id, name, amount, datetime]);
            $.localStorage.set('expenses', expenses);
            loadExpenses();
            //console.log($.localStorage.get('expenses'));
        } else {
            $("#expenseForm").before('<div class="invalid-feedback">\
          Can\'t be empty.\
        </div>')
            $(this).css({'class': "was-validated"});
        }

        
    },false);
});

/*
 * Clear the local and session storage
 * @author Abijah Kajabika
 * @returns {null} 
 */
function clearStorage() {
    $.localStorage.set('expenses', null);
    $.sessionStorage.set('expenses', null);
}

function loadExpenses() {
    $("#expenses").text("");
    if ($.localStorage.get('expenses')) {
        $.localStorage.get('expenses').forEach((element) => {
            $("#expenses").append('<li data-id="'+ element[0] +'" class="list-group-item d-flex justify-content-between align-items-center"> \
                        ' + element[1] + '\
            <span class="">' + element[2] + ' $</span>\
                        <span class="">Created on: ' + element[3] + '</span>\
                    </li>');
            //console.log(element);
        });
    }

}

// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
};

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
};
window.onbeforeunload = function(){
  return;
}