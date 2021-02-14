// solo importandolo, ya se configura firebase
import db from './firebase/config';
import { retornaDocumentos } from './helpers/mostrar-documentos';

const usuariosRef = db.collection('usuarios');

// -- PAGINACION con botones SIGUIENTE y PREVIO -- 
// Boton para paginación
const btnNext = document.createElement('button');
btnNext.innerText = 'Next Page';
document.body.append(btnNext);

let firstDocument: any = null;
let lastDocument: any = null;

btnNext.addEventListener('click', () => {
    // startAfter()
    // la primera vez es null, asi q firebase lo ignora
    // y cuando no hay mas datos, recibis un array vacio
    const query = usuariosRef
        .orderBy('nombre')
        .startAfter(lastDocument);

    // necesito tener el ultimo documento para decirle a firebase
    // a partir de este quiero n documentos mas 
    // (ese n es el que le mandamos al limit)
    query.limit(2).get().then(snap => {

        // si no recibo nada, o sea null o undefined (falsy) 
        // el lastDocument vuelve a ser NULL y vuelve a empezar todo 
        // nuevamente
        firstDocument = snap.docs[0] || null
        lastDocument = snap.docs[snap.docs.length - 1] || null
        retornaDocumentos(snap)
    })
})

const btnPrevious = document.createElement('button');
btnPrevious.innerText = 'Previous Page';
document.body.append(btnPrevious);

btnPrevious.addEventListener('click', () => {
    // startAfter()
    // la primera vez es null, asi q firebase lo ignora
    // y cuando no hay mas datos, recibis un array vacio
    const query = usuariosRef
        .orderBy('nombre')
        .endBefore(firstDocument);

    // necesito tener el ultimo documento para decirle a firebase
    // a partir de este quiero n documentos mas 
    // (ese n es el que le mandamos al limit)
    query.limit(2).get().then(snap => {

        // si no recibo nada, o sea null o undefined (falsy) 
        // el lastDocument vuelve a ser NULL y vuelve a empezar todo 
        // nuevamente
        lastDocument = snap.docs[snap.docs.length - 1] || null
        retornaDocumentos(snap)
    })
})