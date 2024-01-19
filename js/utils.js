let users = [
    {
      "id": 1,
      "name": "Brad Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
        },
    }
]

let remesas = [
    {"id":"#29939301","company":"imred","amount":"1000","status":"pagada", "created_at":"20231203","charged_at":"20231203"},
    {"id":"#29939302","company":"redmi","amount":"1000","status":"", "created_at":"20231203","charged_at":"20231203"},
    {"id":"#29939303","company":"digital","amount":"14000","status":"pagada", "created_at":"20231203","charged_at":"20231203"},
    {"id":"#29939304","company":"hp","amount":"4000","status":"", "created_at":"20231203","charged_at":"20231203"},
    {"id":"#29939305","company":"Nestle","amount":"5000","status":"pagada", "created_at":"20231203","charged_at":"20231203"},
    {"id":"#29939306","company":"bit","amount":"5000","status":"", "created_at":"20231204","charged_at":"20231204"},
    {"id":"#29939307","company":"redmi","amount":"16000","status":"pagada", "created_at":"20231204","charged_at":"20231204"},
    {"id":"#29939308","company":"digital","amount":"12000","status":"pagada", "created_at":"20231204","charged_at":"20231204"},
    {"id":"#29939309","company":"bit","amount":"72000","status":"", "created_at":"20231204","charged_at":"20231204"},
    {"id":"#29939310","company":"telcel","amount":"8000","status":"pagada", "created_at":"20231204","charged_at":"20231204"},
    {"id":"#29939311","company":"sae","amount":"18000","status":"", "created_at":"20231205","charged_at":"20231205"},
    {"id":"#29939312","company":"aspel","amount":"12000","status":"pagada", "created_at":"20231205","charged_at":"20231205"},
    {"id":"#29939313","company":"infotec","amount":"2000","status":"pagada", "created_at":"20231205","charged_at":"20231205"},
    {"id":"#29939314","company":"inbursa","amount":"19000","status":"pagada", "created_at":"20231205","charged_at":"20231205"},
    {"id":"#29939315","company":"Indigo","amount":"2000","status":"", "created_at":"20231205","charged_at":"20231205"},
    {"id":"#29939316","company":"Wester Union","amount":"12000","status":"pagada", "created_at":"20231206","charged_at":"20231206"},
	{"id":"#29939317","company":"Wester Union","amount":"3000","status":"pagada", "created_at":"20231206","charged_at":"20231206"},
	{"id":"#29939318","company":"Wester Union","amount":"14000","status":"pagada", "created_at":"20231206","charged_at":"20231206"},
	{"id":"#29939319","company":"Soriana","amount":"12000","status":"pagada", "created_at":"20231202","charged_at":"20231202"},
	{"id":"#29939320","company":"Soriana","amount":"2000","status":"pagada", "created_at":"20231202","charged_at":"20231202"},

]

    const loadRemesas = ( arrRemesas ) => {

        arrRemesas.sort((
            (a, b) =>  a.charged_at - b.charged_at )
        )

        let templateItem = arrRemesas.reduce((acc, currentItem) => {
        
            
            if( currentItem.status === "pagada"){
                const dollar = currencyFormatter({
                currency: "USD",
                value: currentItem.amount
                }) 

                acc += `
                    <div class="item_remesas" >
                        <div class="item_remesas_text" >${currentItem.id}</div>
                        <div class="item_remesas_text" >${currentItem.company}</div>
                        <div class="item_remesas_number">${dollar}</div>
                    </div>
                   `        
            }           

            return acc           

        }, '')
          

        document.querySelector('.lista_remesas').innerHTML = templateItem
        
    } 

    const filterRemesas = ( arrRemesas, id, empresa, monto ) => {

        if( id.trim().length === 0 &&
            empresa.trim().length === 0 &&
            monto.trim().length === 0 )  {

            document.addEventListener('DOMContentLoaded', loadRemesas( remesas ) )
                
        }
        else {

            
            const arrFilterRemesas = arrRemesas.filter((itemRemesa ) => itemRemesa.id == id 
                    || itemRemesa.company == empresa || itemRemesa.amount == monto
                         );

            arrFilterRemesas.sort((
                (a, b) =>  a.charged_at - b.charged_at )
            )

            document.getElementById('lista_remesas').innerHTML = '';

            let templateItem = arrFilterRemesas.reduce((acc, currentItem) => {
            
                
                
                    const dollar = currencyFormatter({
                    currency: "USD",
                    value: currentItem.amount
                    }) 

                    acc += `
                        <div class="item_remesas" >
                            <div class="item_remesas_text" >${currentItem.id}</div>
                            <div class="item_remesas_text" >${currentItem.company}</div>
                            <div class="item_remesas_number">${dollar}</div>
                        </div>
                    `        
                        

                return acc           

            }, '')
            

            document.querySelector('.lista_remesas').innerHTML = templateItem
        }
    }

    document.getElementById('today').innerHTML = dateNow()
    document.addEventListener('DOMContentLoaded', loadRemesas( remesas ) )

    function currencyFormatter({ currency, value}) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          minimumFractionDigits: 2,
          currency
        }) 
        return formatter.format(value)
    }

    function dateNow(){
     return  new Intl.DateTimeFormat("es-ES", {
            dateStyle: "long"
        }).format(new Date());
    }



    //Calculadora
    var uno = document.getElementById('uno');
    var dos = document.getElementById('dos');
    var tres = document.getElementById('tres');
    var cuatro = document.getElementById('cuatro');
    var cinco = document.getElementById('cinco');
    var seis = document.getElementById('seis');
    var siete = document.getElementById('siete');
    var ocho = document.getElementById('ocho');
    var nueve = document.getElementById('nueve');
    var cero = document.getElementById('cero');

    uno.onclick = function(e){
        
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "1";
        }
    }

    dos.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "2";
        }
    }
    tres.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "3";
        }
    } 
    cuatro.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "4";
        }
    } 
    cinco.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "5";
        }
    } 
    seis.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "6";
        }
    } 
    siete.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "7";
        }
    } 
    ocho.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "8";
        }
    } 
    nueve.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "9";
        }
    } 
    cero.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + "0";
        }
    } 
    punto.onclick = function(e){
        if(  resultado.textContent.length < 8 ){
            resultado.textContent = resultado.textContent  + ".";
        }
    }


    // Modal

    
    var modal = document.getElementById("ventanaModal");
    
    var botonFiltro = document.getElementById("filtros");
    
    var span = document.getElementsByClassName("cerrar")[0];

    
    botonFiltro.addEventListener("click",function() {
        modal.style.display = "block";
        document.getElementById("id").value = "";
        document.getElementById("empresa").value = "";
        document.getElementById("monto").value = "";
    });

    
    span.addEventListener("click",function() {
        modal.style.display = "none";
    });

    
    window.addEventListener("click",function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    });



    
    btnfiltro.onclick = function(e){
               

        e.preventDefault()
        e.stopPropagation()
        
        var id = document.getElementById("id").value;
        var empresa = document.getElementById("empresa").value;
        var monto = document.getElementById("monto").value;
        
        console.log(id)
        console.log(empresa)
        console.log(monto)

        modal.style.display = "none";
        filterRemesas( remesas, id, empresa, monto)
        
      
        
    };


    // Paginacion

    const list_remesas = document.getElementById('lista_remesas')
    const buttons = document.getElementById('buttons')

    let btnNext
    let btnPrev
    