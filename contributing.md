# ¿Cómo contribuir?

1. Haz un fork del repositorio
![fork image](https://utfs.io/f/51ed1c0c-7822-451c-be6c-3bfc0c50d632-446iqu.57.46.png)

2. Clonar el repositorio
``` bash
git clone https://github.com/<TU-USUARIO>/librero-lis.git && cd librero-lis
```

2. Crea una rama con la siguiente nomenclatura 
``` bash
git checkout -b fix-issue-<Numero-del-issue> 
```

> Pasos para ejecutar el programa

### Back End
1. Navegar al backend
```bash
cd backend
```

2. Ejecutar el comando para obtener las librerias:
``` bash
npm install
```

3. En la pagina de [turso](https://turso.tech/app) levantar una base de datos de desarrollo y agregar lo siguiente a un archivo .env
```
TURSO_CONNECTION_URL = url de la base de datos
TURSO_AUTH_TOKEN = key de la base de datos
```

4. Generar las tablas en turso con drizzle
``` bash
npm db:push
```

5. Ejecutar el backend:
``` bash
npm start:dev
```

### Front End
1. Navegar al backend
```bash
cd frontend
```

2. Ejecutar el comando para obtener las librerias:
``` bash
npm install
```

3. En la pagina de [firebase](https://firebase.google.com/) levantar el servicio de autentificacion y storage
![start](https://utfs.io/f/bec8e87e-c8b9-4109-bc8f-86b99f5045db-446iqv.05.39.png)

#### Autentificacion
![auth start](https://utfs.io/f/14023f20-aea6-4903-aff3-14ad8a293606-446iqw.40.25.png)
![auth config](https://utfs.io/f/de880521-59c6-4cf1-845c-22d66c179642-446iqw.41.17.png)
![auth selection](https://utfs.io/f/1ece7c22-3697-41e2-9895-1313b61eb471-446iqw.42.01.png)
![auth end](https://utfs.io/f/5f1f20ac-072d-42f3-8536-89339a541bd4-446iqw.42.20.png)
#### Storage
![storage start](https://utfs.io/f/22470db1-f915-41d0-b218-49be19edfe6f-446iqw.40.51.png)
![storage config](https://utfs.io/f/6121881a-aa94-4f70-998c-4dc526176826-446iqw.42.44.png)
![storage rules](https://utfs.io/f/9f9ecc76-dfc7-4513-94d9-1da3d87a5446-446iqw.43.05.png)

4. Agregar las siguientes variables al archivo .env
``` bash
VITE_FIREBASE_API_KEY=api-key
VITE_FIREBASE_APP_ID=app-id
VITE_FIREBASE_AUTH_DOMAIN=auth-domain
VITE_FIREBASE_MEASUREMENT_ID=measurement-id
VITE_FIREBASE_MESSAGING_SENDER_ID=sender-id
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=storage-bucket
``` 

5. Ejecutar el frontend:

``` bash
npm dev
```

> Nota: En caso de querer usar el backend local debes modificar los url de los servicios por http://localhost:3030

## Agregar los cambios
- ```git status``` Muestra los archivos modificados
- ```git add -A``` Agrega los cambios al area de preparado
- ```git commit -m "fix: <Explica los cambios>"``` 
- ```git push fix-issue-<Numero-del-issue>``` Sube los cambios al repo

Despues de agregar los cambios, dirigete al forked repo y ve a la seccion **pull request**. Te saldra un pop up que dice **Pull request**. Aprieta el pop up y seras redireccionado a la pagina del pull request

Llena el formulario y da la descripcion necesaria

Finalmente aprieta en **Submit** y listo, se hara la contribucion 🎉

> Nota: cualquier duda me puedes contactar al correo <rafabeltrans17@gmail.com>
