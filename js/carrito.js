let carrito = [];
// carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.querySelector(".container-productos");
const carritoContenedor = document.querySelector("#carritoContenedor");

const precioTotal = document.querySelector("#precioTotal");
const total = document.querySelector("#total");
const subtotal = document.querySelector("#subtotal");
const tax = document.querySelector("#tax");
const contadorProducto = document.querySelector("#contadorProducto");

const vaciarCarrito = document.querySelector("#vaciarCarrito");
const procesarCompra = document.querySelector("#procesarCompra");

const activarFuncion = document.querySelector("#activarFuncion");


function guardarLocal() {
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    mostrarCarrito();
    if (activarFuncion) {
      document.querySelector("#activarFuncion").click(procesarPedido);
    }
  });
}
guardarLocal();

// Vaciar carrito
if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

// Dirigirse a la pagina de comprar
if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

// IMPRIMIR LOS PRODUCTOS
const imprimir = (product) => {
  if (contenedor) {
    contenedor.innerHTML='';
    product.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      if (contenedor) {
        contenedor.innerHTML += `
        <article class="container-article">
        <img class="image-article" src="${img}" alt="${desc}">
        <p class="nombre-producto">${nombre}</p>
        <p class="nombre-producto>${desc}</p>
        <p class="precio">S/. ${precio}</p>
        <div class="boton-container">
        <button class="boton-carrito" onclick="agregarProducto(${id})">SUMAR AL CARRITO</button>
        </div>
        </article>
        `;
      }
    });
  }
}
imprimir(stockProductos);

// PUSH AL CARRITO O AGREGAR PRODUCTOS
const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)
    
  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito();
};

const modalBody = document.querySelector(".Modal .modalBody");

const mostrarCarrito = () => {
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor">
      <div class="modalcontenedor-img">
      <img class="img-fluid img-carrito" src="${img}"/>
      </div>
      <div class="modalcontenedor-text">
      <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad : ${cantidad}</p>
      </div>
      <button class="bi bi-x-circle-fill" onclick="eliminarProducto(${id})"></button>
      </div>
      `;
    });
    carritoContenedor.textContent = carrito.length;
  }

  if (carrito.length === 0) {
    modalBody.innerHTML = `
    <p>¡Aun no agregaste nada!</p>
    `;
  }
  
  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  guardarStorage()
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const prodId = id;
  carrito = carrito.filter((prod) => prod.id !== prodId);
  mostrarCarrito();
}

function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#list-products");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      listaCompra.innerHTML += `
      <li class="list-group-item">
        <div class="container-fluid">
          <div class="row">
              <div class="col-sm-2 d-flex align-items-center justify-content-center">
                  <img src="${img}" alt="${nombre}" width="100" class="rounded">
              </div>
              <div class="col-sm-3 d-flex align-items-center justify-content-center">
                  <div class="container text-center">
                          <p class="mb-0">${nombre}</p>
                  </div>
              </div>
              <div class="col-sm-3 d-flex align-items-center justify-content-center">
                  <div class="container text-center">
                          <p class="mb-0">S/.${precio}</p>
                  </div>
              </div>                                
              <div class="col-sm-2 d-flex align-items-center justify-content-center">
                  <span class="w-25 text-center">${cantidad}</span>
              </div>
              <div class="col-sm-2 d-flex align-items-center justify-content-center"><span class="w-25 text-center">S/.${cantidad * precio}</span></div>
          </div>
        </div>
      </li>
      `;
    }
  });
  totalCompra = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
  igvPagar = totalCompra * 0.18;
  totalPagar = totalCompra + igvPagar;
  
  subtotal.innerText = totalCompra.toFixed(2);
  tax.innerText = (igvPagar).toFixed(2);
  total.innerText = totalPagar;
  contadorProducto.innerText = carrito.length;
}


function categoryValue (category) {
  category = document.getElementById("category").value;

  if(category.length > 0){
    const productos = stockProductos.filter(prod => prod.category == category);
    imprimir(productos);
    console.log(productos);
  }else{
    imprimir(stockProductos);
  }
}