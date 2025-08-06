let s = new Sistema()

let usuarioLogueado = null;

let paseadorLogueado = null;

ocultar("seleccionarPaseador");
ocultar("gestionContrataciones");
ocultar("cancelacionContrataciones");
ocultar("listadoCliente");
ocultar("listadoPaseador");
ocultar("cerrarSesion");
ocultar("navCliente");
ocultar("navPaseador");
ocultar("inicioSesion");


//NavBar Cliente ------------------------------------------------------------------------------------------
document.querySelector("#aRealizarContratacion").addEventListener("click", mostrarRealizarContratacion);
document.querySelector("#aCancelarContratacion").addEventListener("click", mostrarCancelarContratacion);
document.querySelector("#aListadoEstadistico").addEventListener("click", mostrarListadoCliente);
document.querySelector("#aCerrarSesionCliente").addEventListener("click", mostrarCerrarSesionC);
document.querySelector("#aIniciarSesion").addEventListener("click", mostrarIniciarSesion);
document.querySelector("#aRegistrarse").addEventListener("click", mostrarRegistrarse);

function mostrarRealizarContratacion() {
    ocultarTodo();
    mostrar("seleccionarPaseador");
}

function mostrarCancelarContratacion() {
    ocultarTodo();
    mostrar("cancelacionContrataciones");
    existeContratacionPendiente();
    inyectarContratacionATabla();
}

function mostrarListadoCliente() {
    ocultarTodo();
    mostrar("listadoCliente");
}

function mostrarCerrarSesionC() {
    ocultarTodo();
    mostrar("cerrarSesion");
}

function mostrarIniciarSesion() {
    ocultarTodo();
    mostrar("inicioSesion");
    mostrar("tituloApp");
}

function mostrarRegistrarse() {
    ocultarTodo();
    mostrar("registro");
    mostrar("tituloApp");
}



//NavBar Paseador ------------------------------------------------------------------------------------------
document.querySelector("#aProcesarContrataciones").addEventListener("click", mostrarProcesarContrataciones);
document.querySelector("#aListado").addEventListener("click", mostrarListadoPaseador);
document.querySelector("#aCerrarSesionPaseador").addEventListener("click", mostrarCerrarSesionP); 

function mostrarProcesarContrataciones() {
    ocultarTodo();
    mostrar("gestionContrataciones");
}

function mostrarListadoPaseador() {
    ocultarTodo();
    mostrar("listadoPaseador");
    inyectarTablaListadoPerrosPaseador();
    inyectarTablaListadoPerrosPaseadorConteo();
}

function mostrarCerrarSesionP() {
    ocultarTodo();
    mostrar("cerrarSesion");
}


// Ocultar Todo ------------------------------------------------------------------------------------------
function ocultarTodo() {
    ocultar("registro")
    ocultar("inicioSesion")
    ocultar("seleccionarPaseador");
    ocultar("gestionContrataciones");
    ocultar("cancelacionContrataciones");
    ocultar("listadoCliente");
    ocultar("listadoPaseador");
    ocultar("cerrarSesion");
    ocultar("tituloApp");
    
}


// Registrar ------------------------------------------------------------------------------------------
document.querySelector("#btnRegistroCliente").addEventListener("click", registroCliente)

function registroCliente() {
    
    let nombreUsuarioCliente = document.querySelector("#txtNombreUsuarioCliente").value;
    let contraseniaCliente = document.querySelector("#txtContraseniaCliente").value;
    let nombrePerroCliente = document.querySelector("#txtNombrePerro").value;
    let tamanioPerro = document.querySelector("#slcTamanioPerro").value;
   

    let mensaje = s.validacionContrasenia(contraseniaCliente);
    let validacionUsuario = s.validacionUsuario(nombreUsuarioCliente);
    let validacionNombrePerro = s.validacionNombrePerro(nombrePerroCliente);
    
    

    if(mensaje === "" && validacionUsuario === false && validacionNombrePerro === "" ) {
        
        s.registrar(nombreUsuarioCliente, contraseniaCliente, nombrePerroCliente,tamanioPerro);
        document.querySelector("#pRegistro").innerHTML = "Registro Exitoso!";
        
        setTimeout(() => {
        ocultar("registro");
        mostrar("inicioSesion");
        }, 800);
        

    } else if (validacionUsuario === true) {
        document.querySelector("#pRegistro").innerHTML = "Este usuario ya existe";
        
    } else {
        document.querySelector("#pRegistro").innerHTML = mensaje + validacionNombrePerro;
    }

}




// Inicar Sesión ------------------------------------------------------------------------------------------
document.querySelector("#btnIniciarSesion").addEventListener("click", inicarSesion);

function inicarSesion() {
    let usuario = document.querySelector("#txtNombreInicioDeSesion").value;
    let contrasenia = document.querySelector("#txtContraseniaInicioDeSesion").value


    let loginValidoCliente = s.loginCliente(usuario, contrasenia);
    let loginValidoPaseador = s.loginPaseador(usuario, contrasenia)

    if(loginValidoCliente) {
        document.querySelector("#pInicioSesion").innerHTML = "Inicio de sesión exitoso!"
        ocultarTodo()
        mostrar("navCliente")
        mostrar("seleccionarPaseador")
        usuarioLogueado = s.obtenerUsuario(usuario, contrasenia)
        inyectarATablaDelCliente();
        inyectarPaseadoresAlSelect();
        
    } else if (loginValidoPaseador) {
        document.querySelector("#pInicioSesion").innerHTML = "Inicio de sesión exitoso!"
        ocultarTodo()
        mostrar("navPaseador")
        mostrar("gestionContrataciones")
        paseadorLogueado = s.obtenerPaseador(usuario, contrasenia)
        inyectarATablaGestionContrataciones();
        inyectarTablaListadoPerrosPaseador();
        inyectarTablaListadoPerrosPaseadorConteo();
    } else {
        document.querySelector("#pInicioSesion").innerHTML = "- Nombre de usuario y/o contraseña incorrectos"
    }


    
}



//Seleccionar Paseador ------------------------------------------------------------------------------------------
function inyectarPaseadoresAlSelect() {
    document.querySelector("#slcPaseador").innerHTML = "";

    for(let i = 0; i < s.paseadores.length; i++) {
        let p = s.paseadores[i];

        if(p.cuposDisponibles > 0) {
            document.querySelector("#slcPaseador").innerHTML += `<option value="${p.numeroIdentificador}">${p.nombre}</option>`;
        }
       
    }
    
}



document.querySelector("#btnSeleccionarPaseador").addEventListener("click", seleccionarPaseador);

function seleccionarPaseador() {
    let paseador = document.querySelector("#slcPaseador").value;

    let validacionSeleccionUnSoloPaseador = s.validacionSeleccionUnSoloPaseador(usuarioLogueado.nombreUsuario)
    

    if(validacionSeleccionUnSoloPaseador === "") {
        s.registrarContratacion(s.idContratacion, usuarioLogueado.nombreUsuario, paseador)
        document.querySelector("#pSeleccionPaseador").innerHTML = "Contratación exitosa!"
        inyectarContratacionATabla();
        
    } else {
        document.querySelector("#pSeleccionPaseador").innerHTML = validacionSeleccionUnSoloPaseador
    }

    existeContratacionPendiente();
    


}



//Cancelación contrataciones --------------------------------------------------------------------------------

function inyectarContratacionATabla() {

    document.querySelector("#tblCancelacionContrataciones").innerHTML = "";

    


    for(let i = 0; i < s.contrataciones.length; i++) {
        let contratacion = s.contrataciones[i];
        let ocultarBoton = "";
        if(usuarioLogueado.nombreUsuario === contratacion.cliente) {

            if (contratacion.estado !== "Pendiente") {
                ocultarBoton = "disabled"
            }

            let obtenerPaseadorPorID = s.obtenerPaseadorPorID(contratacion.paseador)

            document.querySelector("#tblCancelacionContrataciones").innerHTML += `<tr>
                                                                                    <td>${obtenerPaseadorPorID}</td>
                                                                                    <td>${contratacion.estado}</td>
                                                                                    <td><input type="button" value="Cancelar" class="btnCancelar btn btn-primary" data-id-contratacion="${contratacion.numeroIdentificador}" ${ocultarBoton}></td>
                                                                                    </tr>`

        }
    }

    bindearBotonesCancelar();
    

}

function bindearBotonesCancelar() {
    let botonesCancelar = document.querySelectorAll(".btnCancelar");

    for(let i = 0; i < botonesCancelar.length; i++) {
        let boton = botonesCancelar[i];
        boton.addEventListener("click", cancelar)
    }
}


function cancelar() {
    let idContratacion = this.getAttribute("data-id-contratacion");

    let objetoContartacion = s.obtenerContratacionPorID(idContratacion);

    objetoContartacion.estado = "Cancelada"
    inyectarContratacionATabla();
    existeContratacionPendiente();
    

}

function existeContratacionPendiente() {

    document.querySelector("#pMensajeCancelacionContrataciones").innerHTML = "";

    let existeContratacionPendiente = s.existeContratacionPendiente(usuarioLogueado.nombreUsuario);

    if(!existeContratacionPendiente) {
        document.querySelector("#pMensajeCancelacionContrataciones").innerHTML = "- No hay contratación pendiente!"
    }

    
}




// Gestión de contrataciones -----------------------------------------------------------------------------------

function inyectarATablaGestionContrataciones() {
    document.querySelector("#tblGestionContrataciones").innerHTML = "";

   

    for(let i = 0; i < s.contrataciones.length; i++) {
        let contratacion = s.contrataciones[i];
        let ocultarBoton = "";


        if(paseadorLogueado.numeroIdentificador === contratacion.paseador) {

            if(contratacion.estado !== "Pendiente") {
                ocultarBoton = "disabled"
            }

            let obtenerTamanioPerroPorNombrePorNombreCliente = s.obtenerTamanioPerroPorNombreCliente(contratacion.cliente)

            document.querySelector("#tblGestionContrataciones").innerHTML += `<tr>
                                                                                <td>${contratacion.cliente}</td>
                                                                                <td>${obtenerTamanioPerroPorNombrePorNombreCliente}</td>
                                                                                <td><input type="button" value="Procesar" class="btnProcesar btn btn-primary" data-id-contratacion="${contratacion.numeroIdentificador}" ${ocultarBoton}></td>
                                                                                <td>${contratacion.estado}</td>
                                                                                </tr>`

        }
    }

    bindearBotonesProcesar();
    
}

function bindearBotonesProcesar() {
    let botonesProcesar = document.querySelectorAll(".btnProcesar");

    for(let i = 0; i < botonesProcesar.length; i++) {
        let boton = botonesProcesar[i];
        boton.addEventListener("click", procesar)

    }
}

function procesar() {   
    let idContratacion = this.getAttribute("data-id-contratacion");
    document.querySelector("#pMensajeGestionContrataciones").innerHTML = s.procesarContratacion(idContratacion);
    inyectarATablaGestionContrataciones();
    
}

//Listado estadìstico del cliente -------------------------------------------------------------------------------

function inyectarATablaDelCliente() {
    document.querySelector("#tblListadoCliente").innerHTML = "";
    

    for(let i = 0; i < s.paseadores.length; i++) {
        let paseador = s.paseadores[i];

        let obtenerCantPerrosAsignadosPorIDPaseador = s.obtenerCantPerrosAsignadosPorIDPaseador(paseador.numeroIdentificador);

        
        document.querySelector("#tblListadoCliente").innerHTML += `<tr>
                                                                        <td>${paseador.nombre}</td>
                                                                        <td>${obtenerCantPerrosAsignadosPorIDPaseador}</td>
                                                                    </tr>`

        
        
                                                                        
    }


}



//Listado perros del paseador ----------------------------------------------------------------------------------

function inyectarTablaListadoPerrosPaseador() {
    document.querySelector("#tblListadoPerrosPaseador").innerHTML = "";
    document.querySelector("#pMensajeListadoPerrosPaseador").innerHTML = "";

    for(let i = 0; i < s.contrataciones.length; i++) {
        let contratacion = s.contrataciones[i];

        if(paseadorLogueado.numeroIdentificador === contratacion.paseador) {
            
            if(contratacion.estado === "Aprobada") {

                let obtenerTamanioPerroPorNombrePorNombreCliente = s.obtenerTamanioPerroPorNombreCliente(contratacion.cliente)

                let obtenerNombrePerroPorNombreCliente = s.obtenerNombrePerroPorNombreCliente(contratacion.cliente)

                document.querySelector("#tblListadoPerrosPaseador").innerHTML += `<tr>
                                                                                    <td>${obtenerNombrePerroPorNombreCliente}</td>
                                                                                    <td>${obtenerTamanioPerroPorNombrePorNombreCliente}</td>
                                                                                    </tr>`

            }
            
            

        }

    
    
    }
    
    if (document.querySelector("#tblListadoPerrosPaseador").innerHTML === ""){

        document.querySelector("#pMensajeListadoPerrosPaseador").innerHTML = "- No hay perros asignados actualmente"
        
            
    }

}


function inyectarTablaListadoPerrosPaseadorConteo() {
    document.querySelector("#tblListadoPerrosPaseadorConteo").innerHTML = "";
    let cuposOcupados = 0;
    let porcentajeCupos;

    for(let i = 0; i < s.contrataciones.length; i++) {
        let contratacion = s.contrataciones[i];
    
        if(paseadorLogueado.numeroIdentificador === contratacion.paseador && contratacion.estado === "Aprobada") {

            let obtenerCupoMaximoPorID = s.obtenerCupoMaximoPorID(contratacion.paseador)
            let obtenerTamanioPorNombreCliente = s.obtenerTamanioPerroPorNombreCliente(contratacion.cliente)

            if(obtenerTamanioPorNombreCliente === "Grande") {
                cuposOcupados += 4;
            } else if(obtenerTamanioPorNombreCliente === "Mediano") {
                cuposOcupados += 2;
            } else if(obtenerTamanioPorNombreCliente === "Chico") {
                cuposOcupados += 1;
            }

            porcentajeCupos = (cuposOcupados * 100) / obtenerCupoMaximoPorID

            

            document.querySelector("#tblListadoPerrosPaseadorConteo").innerHTML = `<tr>
                                                                                        <td>${cuposOcupados}</td>
                                                                                        <td>${obtenerCupoMaximoPorID}</td>
                                                                                        <td>${porcentajeCupos}%</td>
                                                                                        </tr>`


        }

    }

}


// Cerrar Sesion ------------------------------------------------------------------------------------------
document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);

function cerrarSesion() {
    ocultarTodo();
    mostrar("registro");
    mostrar("inicioSesion");
    ocultar("navCliente");
    ocultar("navPaseador");
    ocultar("inicioSesion");
    mostrar("tituloApp");

    usuarioLogueado = null;
    paseadorLogueado = null;
    
    
    document.querySelector("#txtNombreUsuarioCliente").value = "";
    document.querySelector("#txtContraseniaCliente").value = "";
    document.querySelector("#txtNombrePerro").value = "";
    document.querySelector("#pRegistro").innerHTML = "";

    document.querySelector("#txtNombreInicioDeSesion").value = "";
    document.querySelector("#txtContraseniaInicioDeSesion").value = "";
    document.querySelector("#pInicioSesion").innerHTML = "";
    document.querySelector("#pSeleccionPaseador").innerHTML = "";
    document.querySelector("#pMensajeGestionContrataciones").innerHTML = "";
}

// Apretar aRegistrarse -----------------------------------------------------------------------------------------------

document.querySelector("#aRegistrarse").addEventListener("click", aRegistrarse);

function aRegistrarse() {
    document.querySelector("#txtNombreUsuarioCliente").value = "";
    document.querySelector("#txtContraseniaCliente").value = "";
    document.querySelector("#txtNombrePerro").value = "";
    document.querySelector("#pRegistro").innerHTML = "";
}

//Apretra aInicioSesion ----------------------------------------------------------------------------------------------

document.querySelector("#aIniciarSesion").addEventListener("click", aIniciarSesion);

function aIniciarSesion() {
    document.querySelector("#txtNombreInicioDeSesion").value = "";
    document.querySelector("#txtContraseniaInicioDeSesion").value = "";
    document.querySelector("#pInicioSesion").innerHTML = "";
    document.querySelector("#pSeleccionPaseador").innerHTML = "";
    document.querySelector("#pMensajeGestionContrataciones").innerHTML = "";
}


// Funciones ocultar y mostrar ------------------------------------------------------------------------------------------

function ocultar(id) {
    document.querySelector("#" + id).style.display = "none"
}

function mostrar(id) {
    document.querySelector("#" + id).style.display = "block"
}
