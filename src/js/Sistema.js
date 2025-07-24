class Sistema {
    constructor() {

        this.paseadores = [
            new Paseador(1, "Juan", "Juan_43", "Juan2005", 15, 14),
            new Paseador(2, "Gonzalo", "gonza2900", "Hq03102005", 10, 6),
            new Paseador(3, "Diego", "DiegoM10_", "Montevideo_8", 4, 4),
            new Paseador(4, "Sebastian", "sebae_4457", "Sebastian4457", 20, 18),
            new Paseador(5, "Lucía", "Lula34", "Lu1234", 10, 8)
        ];

        this.clientes = [
            new Cliente("Lean_2", "1234", "Sasha", "Chico"),
            new Cliente("Juli24", "1234", "Tobi", "Grande"),
            new Cliente("Migue75_", "1234", "Zack", "Grande"),
            new Cliente("Martin_3", "1234", "Negrita", "Mediano"),
            new Cliente("leo6", "1234", "Milo", "Chico"),
            new Cliente("joaco56", "1234", "Zeus", "Mediano"),
            new Cliente("anto5", "1234", "Mia", "Mediano"),
            new Cliente("lucas34", "1234", "Rocky", "Grande"),
            new Cliente("lio4", "1234", "Luna", "Mediano"),
            new Cliente("juanjo6", "1234", "Thor", "Grande"),
            new Cliente("Nico_12", "1234", "Max", "Chico"),
            new Cliente("Tomi_08", "1234", "Nala", "Grande"),
            new Cliente("Sofi99_", "1234", "Bruno", "Grande"),
            new Cliente("Mati_21", "1234", "Mora", "Mediano"),
            new Cliente("Vale17_", "1234", "Lola", "Mediano"),
            new Cliente("Fede_03", "1234", "Sol", "Chico"),
            new Cliente("19Gabi", "1234", "Roko", "Chico"),
            new Cliente("pau_", "1234", "Rufi", "Mediano"),
            new Cliente("Dani4", "1234", "Hugo", "Grande"),
            new Cliente("Luqui_44", "1234", "Bolt", "Mediano"),

        ];

        this.contrataciones = [
            new Contratacion(1, "Lean_2", 1, "Aprobada"),
            new Contratacion(2, "Juli24", 2, "Aprobada"),
            new Contratacion(3, "Migue75_", 1, "Pendiente"),
            new Contratacion(4, "Martin_3", 2, "Pendiente"),
            new Contratacion(5, "leo6", 3, "Pendiente"),
            new Contratacion(6, "joaco56", 4, "Pendiente"),
            new Contratacion(7, "anto5", 4, "Aprobada"),
            new Contratacion(8, "lucas34", 5, "Pendiente"),
            new Contratacion(9, "lio4", 5, "Aprobada"),
            new Contratacion(10, "juanjo6", 3, "Pendiente")
        ];

        this.idContratacion = 11;

        
    }


    registrar(nombreUsuario, contrasenia, perro, tamanio) {
        let datos = new Cliente (nombreUsuario, contrasenia, perro, tamanio);
        
        this.clientes.push(datos);
        return datos;
    }

   
    //Registro  ---------------------------------------------------------------------------------
    validacionContrasenia(contrasenia) {
        
        let contadorMayusculas = 0;
        let contadorMinusculas = 0;
        let contadorNumeros = 0;
        let mensaje = "";
        

        if(contrasenia.length < 5) {
            mensaje += "- La contraseña debe tener mínimo 5 caracteres<br>"
        } 
        
        for(let i = 0; i < contrasenia.length; i++) {
            let codigo = contrasenia.charCodeAt(i)

            if(codigo >= 65 && codigo <= 90) {
                contadorMayusculas++
            }

            if(codigo >= 97 && codigo <= 122) {
                contadorMinusculas++
            }

            if(codigo >= 48 && codigo <= 57) {
                contadorNumeros++
            }
        }

        if(contadorMayusculas <= 0) {
            mensaje += "- La contraseña debe tener al menos una mayúscula<br>"
        }

        if(contadorMinusculas <= 0) {
            mensaje += "- La contraseña debe tener al menos una minúscula<br>"
        }

        if(contadorNumeros <= 0) {
            mensaje += "- La contraseña debe tener al menos un número<br>"
        }

        return mensaje;
    }


    validacionUsuario(usuario) {
        let existeUsuario = false;

        for(let i = 0; i < this.clientes.length; i++) {
            let objetoUsuario = this.clientes[i];
            let nombreUsuario = objetoUsuario.nombreUsuario;
        
            if(usuario.toLowerCase() === nombreUsuario.toLowerCase()) {
                existeUsuario = true;
            } 
        }

        return existeUsuario;
    }

    validacionNombrePerro(nombrePerro) {
        let nombrePerroVacio = false;
        let mensaje = "";
        if(nombrePerro === "") {
            nombrePerroVacio = true;
            mensaje += "Indique el nombre de su perro";
        }

        return mensaje;
    }




    //Login --------------------------------------------------------------------------------------------------
    loginCliente(nombreUsr, contraUsuario) {
        let loginExitoso = false;

        //Recorrer array clientes
        for(let i = 0; i < this.clientes.length; i++) {
            let objetoUsuario = this.clientes[i];
            let nombreUsuario = objetoUsuario.nombreUsuario;  
            let contraseniaUsuario = objetoUsuario.contrasenia;



            if(nombreUsr === nombreUsuario && contraUsuario === contraseniaUsuario) {
                loginExitoso = true;
                break;
            }

        }

        return loginExitoso;
        
    }



    loginPaseador(nombreUsr, contraUsuario) {
        let loginExitoso = false;

        
        
        for(let i = 0; i < this.paseadores.length; i++) {
            let objetoPaseador = this.paseadores[i];
            let nombreUsuario = objetoPaseador.nombreUsuario;
            let contraseniaUsuario = objetoPaseador.contrasenia;


            if(nombreUsr === nombreUsuario && contraUsuario === contraseniaUsuario) {
                loginExitoso = true;
                break;
            }
        
        }

        return loginExitoso;

    }


    obtenerUsuario(usuario, contrasenia) {
        let obtenerUsuario = null;
        
        for(let i = 0; i < this.clientes.length; i++) {
            let objetoUsuario = this.clientes[i];
            
            if(objetoUsuario.nombreUsuario === usuario && objetoUsuario.contrasenia === contrasenia) {
                obtenerUsuario = objetoUsuario;
            }


        }

        return obtenerUsuario;

    }

    obtenerPaseador(usuario, contrasenia) {
        let obtenerPaseador = null;
        
        for(let i = 0; i < this.paseadores.length; i++) {
            let objetoPaseador = this.paseadores[i];
            
            if(objetoPaseador.nombreUsuario === usuario && objetoPaseador.contrasenia === contrasenia) {
                obtenerPaseador = objetoPaseador;
            }


        }

        return obtenerPaseador;
    }
    

    //Seleccionar Paseador --------------------------------------------------------------------------------------

    registrarContratacion(id, cliente, paseador) {
        let datos = new Contratacion (id, cliente, Number(paseador), "Pendiente");
        
        this.contrataciones.push(datos)

        this.idContratacion++
        
        return datos;
    }


    validacionSeleccionUnSoloPaseador(usuario) {
        let mensaje = "";

        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];


            if(contratacion.estado === "Pendiente" && usuario === contratacion.cliente) {
                mensaje += "Solo puede contratar un paseador a la vez";
            }

        }

        return mensaje;

    }



    //Cancelación contratación ------------------------------------------------------------------------------------



    obtenerPaseadorPorID(paseadorId) {
        let nombre;

        for(let i = 0; i < this.paseadores.length; i++) {
            let paseador = this.paseadores[i];
            let id = paseador.numeroIdentificador
            

            if(paseadorId == id) {
                nombre = paseador.nombre;
                break;
            }

        }

        return nombre; 
    }

    obtenerContratacionPorID(contratacionId) {
        let objetoContartacion = null

        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];
            let id = contratacion.numeroIdentificador

            if(contratacionId == id) {
                objetoContartacion = contratacion
                break;
            }
        }

        return objetoContartacion;
    }

    existeContratacionPendiente(cliente) {
        let existeContartacionPendiente = false;

        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];

            if(cliente === contratacion.cliente) {

                if(contratacion.estado === "Pendiente") {
                    existeContartacionPendiente = true;
                    break;
                }
            }
        }

        return existeContartacionPendiente;

    }


    //Gestion contrataciones ---------------------------------------------------------------------------------

    obtenerTamanioPerroPorNombreCliente(nombreCliente) {
        let tamanioPerro

        for(let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i];
            let nombreCli = cliente.nombreUsuario


            if(nombreCliente == nombreCli) {
                tamanioPerro = cliente.tamanioPerro
            }
        }

        return tamanioPerro


    }

    procesarContratacion(IDContratacion) { 

        /* Funcion de procesar contratación llamada al presionar el boton Procesar (insertado en la tabla de gestión de contrataciones)  */

        let mensaje = "";
        let contadorCuposOcupados = 0;

        let objetoContratacion = this.obtenerContratacionPorID(IDContratacion)
        let objetoCliente = this.obtenerClientePorNombre(objetoContratacion.cliente);
        let objetoPaseador = this.obtenerObjetoPaseadorPorID(objetoContratacion.paseador)
        let cuposDisponibles = objetoPaseador.cuposDisponibles
        let tienePerroGrande = this.tienePerroGrande(objetoPaseador.numeroIdentificador);
        let tienePerroChico = this.tienePerroChico(objetoPaseador.numeroIdentificador);



        if(tienePerroGrande && objetoCliente.tamanioPerro === "Chico") {
            mensaje += "- No puedes tener un perro grande junto a un perro chico"
            objetoContratacion.estado = "Cancelada"

        } else if (tienePerroChico && objetoCliente.tamanioPerro === "Grande"){
            mensaje += "- No puedes tener un perro chico junto a un perro grande"
            objetoContratacion.estado = "Cancelada"
           
        } else {

            if(objetoCliente.tamanioPerro === "Grande") {
                contadorCuposOcupados += 4;
            } else if (objetoCliente.tamanioPerro === "Mediano") {
                contadorCuposOcupados += 2;
            } else if (objetoCliente.tamanioPerro === "Chico") {
                contadorCuposOcupados += 1;
            }

            if(cuposDisponibles < contadorCuposOcupados) {
                mensaje += "- No tienes suficientes cupos"
                objetoContratacion.estado = "Cancelada"
            } else {
                objetoPaseador.cuposDisponibles = cuposDisponibles - contadorCuposOcupados
                mensaje += "Contratación aprobada!"
                objetoContratacion.estado = "Aprobada"
            }

        }
        

        return mensaje;

    }


    obtenerClientePorNombre(nombreCliente) {
        let objetoCliente = null

        for(let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i];
            

            if(cliente.nombreUsuario === nombreCliente) {
                objetoCliente = cliente
                break;
            }
        }

        return objetoCliente;
    }

    
    obtenerObjetoPaseadorPorID(IDpaseador) {
        let objetoPaseador = null

        for(let i = 0; i < this.paseadores.length; i++) {
            let paseador = this.paseadores[i];
            

            if(paseador.numeroIdentificador == IDpaseador) {
                objetoPaseador = paseador
                break;
            }
        }

        return objetoPaseador;
    }
    

    tienePerroGrande(IDPaseador) {
        let tienePerroGrande = false;

        

        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];

            let objetoCliente = this.obtenerClientePorNombre(contratacion.cliente);


            if(contratacion.paseador == IDPaseador && objetoCliente.tamanioPerro === "Grande" && contratacion.estado === "Aprobada") {
                tienePerroGrande = true;
            }
        }

        return tienePerroGrande;
    }

    tienePerroChico(IDPaseador) {
        let tienePerroChico = false;


        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];

            let objetoCliente = this.obtenerClientePorNombre(contratacion.cliente);


            if(contratacion.paseador == IDPaseador && objetoCliente.tamanioPerro === "Chico" && contratacion.estado === "Aprobada") {
                tienePerroChico = true;
            }
        }

        return tienePerroChico;
    }


    //Listado perros del paseador ----------------------------------------------------------------------------------


    obtenerNombrePerroPorNombreCliente(nombreCliente) {
        let nombrePerro

        for(let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i];
            let nombreCli = cliente.nombreUsuario

            if(nombreCliente === nombreCli) {
                nombrePerro =  cliente.nombrePerro;
            }


        }

        return nombrePerro;
    }

    obtenerCupoMaximoPorID(idPaseador) {
        let cupoMaximo
        
        for(let i = 0; i < this.paseadores.length; i++) {
            let paseador = this.paseadores[i];
            let id = paseador.numeroIdentificador

            if(idPaseador === id) {
                cupoMaximo = paseador.cupoMaximo
            }


        }

        return cupoMaximo;
    }


    //Listado estadìstico del cliente -------------------------------------------------------------------------------


    

    obtenerCantPerrosAsignadosPorIDPaseador(paseadorId) {
        let perrosAsignados = 0;

        for(let i = 0; i < this.contrataciones.length; i++) {
            let contratacion = this.contrataciones[i];
            let idPaseador = contratacion.paseador
            

            if(idPaseador === paseadorId && contratacion.estado === "Aprobada") {
                perrosAsignados++;
            }
        }

        return perrosAsignados;
    }





}