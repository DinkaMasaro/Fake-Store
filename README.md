## Descripción del proyecto
Este proyecto es una aplicación web desarrollada con ReactJS que permite gestionar productos mediante la Fake Store API<sup>1</sup>. La aplicación incluye una pantalla de inicio de sesión donde los usuarios ingresan su correo electrónico y contraseña para acceder a un listado de productos. Los usuarios pueden agregar productos mediante un formulario, visualizarlos con su imagen, título y precio, y eliminar productos de la lista. Para la interfaz se utilizó Bootstrap para los estilos. La aplicación implementa validaciones de autenticación y maneja errores. 

El proyecto consta de 6 componentes, cada uno con su funcionalidad independiente y separado de los demás para mantener la legibilidad, facilitando la reutilización y modularización del código.

El componente **LogIn** es el encargado de recibir el correo electrónico y la contraseña del usuario a través de un formulario. Las credenciales ingresadas se comparan con las definidas en las variables de entorno. Si las credenciales son correctas, se llama a la función handleLogin del componente de autenticación y se redirige al usuario a la página de productos usando el hook useNavigate. Si las credenciales son incorrectas, se muestra un mensaje de error mediante el componente AlertMessage.

El componente **AuthProvider** implementa un contexto de autenticación que gestiona el estado de si un usuario está autenticado o no. Utiliza un proveedor que almacena el estado de autenticación y las funciones para iniciar y cerrar sesión, manteniendo el estado en sessionStorage para que la sesión persista incluso después de recargar la página. Además, ofrece un hook para que otros componentes accedan fácilmente a este estado y las funciones, aprovechando las ventajas del React Context para compartir estos valores entre componentes sin necesidad de pasarlos explícitamente a través de las props.

El componente **ProtectedRoute** implementa una manera de proteger las rutas de la aplicación, asegurando que solo los usuarios autenticados puedan acceder a ellas. Utiliza el contexto useAuth para verificar si el usuario está autenticado. Si no lo está, redirige a la página principal mediante el componente Navigate. Si el usuario está autenticado, renderiza el contenido protegido. Este componente garantiza que solo los usuarios con permisos adecuados puedan acceder a rutas restringidas, como es el caso de la ruta /products, que redirige a la pantalla principal si el usuario no está autenticado.

El componente **AlertMessage** muestra un mensaje de alerta utilizando los estilos de Bootstrap, adaptándose según el tipo de mensaje (éxito o error). El mensaje se oculta automáticamente después de un tiempo determinado, pero también incluye un botón de cierre que permite al usuario cerrar la alerta manualmente antes de que se oculte.

El componente **Product** implementa un formulario para agregar productos a través del endpoint POST<sup>2</sup> de la API. Utiliza el hook de la librería react-hook-form5 para gestionar la validación de los campos del formulario y enviar los datos de manera eficiente. Si la solicitud para agregar un producto es exitosa, se muestra un mensaje de éxito y los campos del formulario se restablecen. Si ocurre un error, se muestra un mensaje de error usando el componente AlertMessage.

El componente **ProductList** se encarga de mostrar, eliminar y agregar productos a una lista. Obtiene los productos desde la API utilizando el endpoint GET<sup>3</sup> y elimina productos con el endpoint DELETE<sup>4</sup>. En caso de error durante la carga o eliminación, se muestra un mensaje de alerta utilizando el componente AlertMessage, y también se notifica al usuario cuando las acciones se completan con éxito. Además, incluye un menú desplegable con un botón para cerrar sesión y un formulario modal para agregar nuevos productos.
Un problema identificado al agregar productos desde el backend es que todos se generan con el mismo ID (21). Esto provoca que, al intentar eliminar un producto, se borren todos los que fueron agregados, ya que comparten el mismo ID.

## Instrucciones para desplegar localmente
1) Clonar el repositorio: https://github.com/DinkaMasaro/Fake-Store 
2) Dentro de la carpeta del proyecto, instala las dependencias necesarias con el comando **npm install**.
3) Crear un archivo **.env** en la raíz del proyecto y definir en el mismo **REACT_APP_CORRECT_EMAIL** y **REACT_APP_CORRECT_PASSWORD** con los valores por defecto.
4) Inicia la aplicación ejecutando **npm start**.
5) Una vez iniciado, el servidor estará disponible en: http://localhost:3000

## Enlace al despliegue en Vercel
https://fake-store-ten.vercel.app/

## Referencias
1. https://fakestoreapi.com/ 
2. POST https://fakestoreapi.com/products 
3. GET https://fakestoreapi.com/products 
4. DELETE https://fakestoreapi.com/products/:id
5. Form https://react-hook-form.com/ 
6. React https://react.dev/learn
7. Chat GPT https://chatgpt.com/?ref=dotcom
8. Bootstrap https://getbootstrap.com/docs/5.3/getting-started/introduction/
   

