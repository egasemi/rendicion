$(document).ready(function(){
    $("#diez,#veinte,#cincuenta,#cien,#docientos,#quinientos,#mil,#stockInicial,#litrosRecibidos").keyup(function subtotal (){

        var subt = parseInt(this.value)*parseInt(this.dataset.val);
        if (isNaN(subt) || subt < 0) {
            $(this).next().text(0);
        } else {
            $(this).next().text(subt);
        }
        var lista = [];
        $('label').slice(4,11).each(function(){
            if (parseInt($(this).text()) >0 ) {
                lista.push(parseInt($(this).text()))
            }
        })
        var total = lista.reduce((a, b) => a + b, 0);
        $("#total").val(total);

        if (total % 40 === 0) {
            var totalSachets = total / 40;
            $("#total").attr("class","form-control text-success");
        } else {
            var totalSachets = (total - (total % 40))/40
            $("#total").attr("class","form-control text-danger");
        }
        $("#sachets").val(totalSachets);

        var stock = $("#stockInicial").val();
        var recibidas = $("#litrosRecibidos").val();
        $("#sobrante").val(parseInt(stock) + parseInt(recibidas) - parseInt(totalSachets));
        
    })
    $("#distrito").change(function stock(){
        var requestURL = "https://spreadsheets.google.com/feeds/cells/1qDfmW1_zmA9zVq-dk8XV3YwREsJCUxFEcLAz37LwTPE/6/public/values?alt=json";
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            //console.log(request.response);
            var indice = $("#distrito option:selected").data('index');
            //console.log(indice);
            var stockIncical = request.response.feed.entry[indice].content.$t;
            //console.log(stockInicial)

            $("#stockInicial").val(stockIncical);
        }
    })
    $("#enviar").click(function(){
        ent = $("#pedidoEnt").val();
        desc = $("#pedidoDesc").val();

        if (ent === '') {
            ent = 0;
        }
        if (desc === ''){
            desc = 0;
        }

        var mje = "Total Vendido: *$" + $("#total").val() + "*\n\
Total Sachets: *" + $("#sachets").val() + "*\n\
Sobrante: *" + $("#sobrante").val() + "*\n\
Pedido Semana que viene: \n\
Enteras: *" + ent + "*\n\
Descreamdas: *" + desc + "*"

        //console.log(desc)
        //console.log(ent)
        //console.log(mje)
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.open("https://wa.me/5493413341777?text=" + encodeURI(mje),'_blank');
        } else {
            new ClipboardJS('.btn');
            $("#contenido-modal").append("<textarea id='clipboardExample1' class='form-control' rows='6'>" + mje + "</textarea>");
            $('#myModal').modal('show')
        }
        
    })

    $("#pedidoEnt,#pedidoDesc").change(function() {
        if ($(this).val() % 15 > 0) {
            $(this).attr("class","form-control text-danger");
            $(this).next().show();
            $("#enviar").hide();
        } else {
            $(this).attr("class","form-control mb-3 text-success");
            $(this).next().hide();
            $("#enviar").show();


        }
    })
})