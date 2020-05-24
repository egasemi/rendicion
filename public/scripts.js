$(document).ready(function(){
    $("#diez,#veinte,#cincuenta,#cien,#docientos,#quinientos,#mil").keyup(function subtotal (){

        var subt = parseInt(this.value)*parseInt(this.dataset.val);
        if (isNaN(subt) || subt < 0) {
            $(this).next().text(0) 
        } else {
            $(this).next().text(subt)
        }
        var lista = [];
        $('label').slice(5,12).each(function(){
            if (parseInt($(this).text()) >0 ) {
                lista.push(parseInt($(this).text()))
            }
        })
        var total = lista.reduce((a, b) => a + b, 0);
        $("#total").val(total)
    })
})