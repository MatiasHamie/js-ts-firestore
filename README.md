# Webpack Starter

Proyecto para crear aplicaciones utilizando webpack.

# CRUD Firestore

## Creo lo que quiero guardar

```
const usuario = {
nombre: 'Pedro',
activo: false,
fechaNac: 0
}
```

## Referencia a la db de firestore
```
const usuariosRef = db.collection('usuarios');
```

## Agregar / Insertar

    le pongo el nombre que quiero a la collection
    (collecion = "tabla")
    add() si la tabla no existe, la crea
    
```
usuariosRef
    .add(usuario)
    .then(docRef => console.log(docRef))
    .catch(console.log);
```

## Modifico
```
    usuariosRef 
        .doc('jNzvTJSY8AYO43hG5dxy')
        .update({ activo: false })
```

## Modifico con set
    A diferencia del update(), el set()
    destruye la info que no enviamos,
    por ende modifica todo el objeto (documento)

```
usuariosRef
.doc('jNzvTJSY8AYO43hG5dxy')
.set({ activo: false })
```

## Borrar

```
usuariosRef
    .doc('jNzvTJSY8AYO43hG5dxy')
    .delete()
    .then(() => console.log('Borrado'))
    .catch(console.log);
```

## Seleccion de registros

    Equivalente SQL: select * from usuarios;

    OBSERVABLE, tiempo real
    onSnapshot() es un callback que se va a ejecutar
    cada vez que algo cambie en la base de datos firestore

    Me creo un array para guardarme la info traida
    esa info se obtiene, .data() y el uid por separado .id
    para comodidad pusheo un objeto con {id: , ...snapHijo.data() }
    esto es similar a un subscribe de angular, una vez que arranca
    se queda escuchando cambios, y cada cambio ejecuta otra vez esto

```
usuariosRef
    .onSnapshot(snap => {
        const usuarios: any[] = [];

        snap.forEach(snapHijo => {
            usuarios.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        })

        console.log(usuarios);
    })
```

    Para tener un codigo mas limpio, lo separe en otro archivo
    y creo el metodo retornaDocumentos(snap)
    
```
usuariosRef
    .onSnapshot(snap => retornaDocumentos(snap));
```

    forma mas corta posible, ya que el primer argumento lo mandamos de una
    podemos escribirlo asi
```
usuariosRef
    .onSnapshot(retornaDocumentos);
```

    Solo una vez, sin traer todo mediante deteccion de cambios
```
usuariosRef
    .get()
    .then(retornaDocumentos);
```


    Equivalente SQL:
        Select * from usuarios
            Where activo = true

        where(campo que me interesa, operador, valor que me interesa)

    Ejemplo 1:
```
        usuariosRef
        .where('activo', '==', true)
        .get()
        .then(retornaDocumentos);
```

    Ejemplo 2
```
    usuariosRef
        .where('salario', '>', 1800)
        .get()
        .then(retornaDocumentos);
```
    Ejemplo 3 (compuesto)
```   
    usuariosRef
        .where('salario', '>', 1800)
        .where('salario', '<', 2300)
        .get()
        .then(retornaDocumentos);
```
    Ejemplo 4 (compuesto con 2 campos distintos)

    No se puede, firebase va a tirar el error
    FirebaseError: The query requires an index. You can create it
    here: 'un link'

    Hay 2 soluciones:

    1) Hay que ir a la consola de firebase
    -> firestore
    -> base de datos deseada
    -> indices
    -> crear indice

    2) haces click en el link del error que aparece en consola
    -     te crea un indice justo como lo necesitas

    La creacion de indices puede demorar 1-5 minutos, tenesmos que ver que
    el estado del indice pase de Creando... en Habilitado
```
    usuariosRef
        .where('salario', '>=', 1800)
        .where('activo', '==', true)
        .get()
        .then(retornaDocumentos);
```
## orderBy(campo deseado, 'asc' o 'desc')

   Equivalente SQL: select * from usuarios order by nombre asc

   Es como el where() pero le agrega un sort
   
```
    usuariosRef
        .orderBy('nombre')
        .get()
        .then(retornaDocumentos);
```

    Suponiendo que queremos pedir los datos con orderBy()
    PERO no todos tienen ese campo, como por ejemplo...
    de 10 registros, solo 7 tienen el campo salario agregado

    el orderBy va a traer todos los que tengan salario, y los ordena
    ojo con eso

    Equivalente SQL: select * from usuarios order by nombre asc, salario asc
    Aclaracion: aca hay que agregar el indice como esta explicado en el where de este readme
    
```
    usuariosRef
        .orderBy('nombre')
        .orderBy('salario')
        .get()
        .then(retornaDocumentos);
```

## limit(n: number) trae n registros
```
    usuariosRef
        .limit(2)
        .get()
        .then(retornaDocumentos);
```

### Notas:
Recuerden reconstruir los módulos de Node
```
npm install
npm run build

