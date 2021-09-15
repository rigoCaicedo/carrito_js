//variables requeridas para control de eventos
const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito > tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){

    //Agrega un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);
}

function agregarCurso(e){
e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId=e.target.getAttribute('data-id');
        //eliminar del arreglo por el data-id
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);
        carritoHTML();

    }
}

function leerDatosCurso(curso){
    //console.log(curso);
    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio>span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //validar que elemento seleccionado ya exista en el carrito
    const existe = articulosCarrito.some(curso=>curso.id===infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos=articulosCarrito.map(curso=>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;//Retorna el objeto actualizado
            }else{
                return curso;//retorna objeto sin duplicar
            }
        });
        articulosCarrito=[...cursos];
    }else{
        //agrega elementos al carrito
    articulosCarrito=[...articulosCarrito,infoCurso];
    }
    
    carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limipiar html
    limpiarHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        //destructuring curso
        const {imagen,titulo,precio,cantidad,id}=curso;
        const row=document.createElement('tr');
        row.innerHTML=`
            <td><img src='${imagen}' width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </<>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    //forma lenta
    contenedorCarrito.innerHTML='';

    //forma mas rapida de eliminacion de nodos
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}