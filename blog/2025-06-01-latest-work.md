---
slug: latest-work
title: Our latest work with a client
authors: Dario, Gonza
tags: [Kubernetes, Infrastructure, MySQL, MongoDB, AWS, CICD, GitOps]
image: 
---

## How it started
*Explicar brevemente la infra original de Soty (despliegue de recursos con ploi, mongo en scalegrid, ...)*
At first, our client had its software deployed mostly in Digital Ocean with some resources in ploi.io and ScaleGrid.


## What was the goal
*Explicar brevemente qué metas teníamos para el proyecto y porqué*
 - *migrar a kubernetes pq proporciona escqlado horizontal automático, optimiza las BBDD reduciendo el costo de nube y CO2...*
 - *enseñar mejores practicas de desarrollo sw*
 - *...*

Al empezar, nuestro objetivo era claro: teniamos que mejorar su plataforma, y así ofrecerles una mejor experiencia en el desarrollo del software a la vez que se reducen los costes asociados.

Para ello, se estandarizaron sus entornos de infraestructura con EKS, ya que proporciona un escalado horizontal automático, lo que permite abaratar los gastos y el consumo de CO2 al solo aprovisionar los recursos necesarios.
En cada entorno se usa Helm y ArgoCD para optimizar los despliegues de distintas aplicaciones, como puede ser la aplicación web y una MongoDB.
Además, se adoptaron GitOps con el fin de automatizar el desarrollo del software, garantizando despliegues rápidos y fiables de aplicaciones y servicios en CICD.


## How was it archieved?
*Un subapartado para cada punto de los anteriores en el que se explique técnicamente qué cosas contribuyeron a ese punto se hicieron y luego describirlas*
- *optimizar las BBDD: despliegue de mongo y mysql en k8s explicando el proceso y las decisiones arquitectónicas elegidas*

### Kubernetes clusters
Están desplegados en la nube, gracias al servicio de AWS EKS, y orquesta gran parte de los servicios de nuestro cliente.
Además, también aloja otros servicios que forman parte de nuestra plataforma:
- **Stack de observabilidad y alertas** para ofrecer al cliente visibilidad sobre las aplicaciones desplegadas y sus recursos correspondientes.
- **Herramientas de CICD** para optimizar el despliegue de aplicaciones.
- **Balanceadores de carga** para distribuir las peticiones que lleguen a un servicio de manera equitativa entre distintas réplicas.
- **External secrets manager** para poder extraer información sensible del código en forma de secretos que pueden ser manejados desde el servicio que ofrece AWS.

### Custom image for their web application
La aplicación del cliente está desarrollada en PHP, por lo que se creó un Helm personalizado para poder manejar de manera automática los despliegues con ArgoCD.
Posteriormente, se optimizó la imagen del sistema operativo que se usaba, creando una imagen propia que ya tenia descargados aquellos paquetes necesarios para que la aplicación funcione:
Con ello, se consiguió reducir el tiempo para buildear la imagen desde los 8 minutos a 2.

Además, la aplicación se decidió por correr en nodos con arquitectura ARM, que es la arquitectura que usaba de antes el cliente.


### Databases migration and optimization
La aplicación del cliente usa una base de datos MongoDB y una MySQL junto con una Redis. 
Todos estos recursos se migraron a los nuevos entornos:
#### MongoDB
Está desplegada en el clúster a través de Helm en una arquitectura con 3 réplicas para asegurar su disponibilidad.

Inicialmente, se trató de usar una versión en ARM de la MongoDB para reutilizar los nodos existentes y reducir el coste de la infraestructura.
Sin embargo, debido al poco soporte de imágenes de MongoDB compatibles con arquitecturas ARM, se optó por usar arquitectura AMD en cambio.

La base de datos de origen estaba en la versión v5.x por lo que además de hacer una migración, se decidió por hacer un upgrade a una versión con soporte y que se pueda mantener actualizada frente a vulnerabilidades.
Se pensó originalmente en poner la versión más reciente (v8.x), pero resultó imposible hacer la migración a esta versión puesto que la BBDD de origen usa colecciones de tipo *timeseries* que no mantienen consistencia en el esquema de sus datos.
Se trató de sortear este problema por varias maneras:
- Usando MongoTools en una versión superior a v100.4 (v100.12.0) ya que según [lo escrito por un empleado de MongoDB](https://www.mongodb.com/community/forums/t/database-tools-100-4-0-released/115727), permite la migración de *timeseries*
- Creando las colecciones primero, activar la flag ``timeseriesBucketsMayHaveMixedSchemaData`` y luego importar los datos.
- Modificando los metadatos de creación de la colección para que añadiera la flag activada.

Finalmente, se decidió por migrar a la versión v7.x, que todavía posee soporte y en un futuro actualizar a la v8.x y activar manualmente dicha flag.

#### MySQL 
Se usa el servicio de AWS Aurora y RDS, ya que nos permite tener una implementación rápida a través de código con Terraform.
Originalmente, el proceso de migración pensaba hacerse con AWS DMS pero presenta una serie de inconvenientes que resultan complicados de sortear:
- **DMS no es capaz de migrar objetos secundarios (FKs y restricciones de cascada):** Ya que DMS funciona replicando cambios en logs durante el proceso de replicación, pero los motores de BBDD no guardan logs de objetos secundarios. Hasta 2020 había una flag (``HandleCascadeConstraints``) que, aunque no documentada, permitía evitar esta restricción. Al estar deprecada y no disponible actualmente, la unica solución es modificar el DDL de la base de datos en más de las 400 ocurrencias que hay de FKs y restricciones de cascada.
- **Necesidad de desabilitar FKs durante la migración:** Lo que obliga a parar la aplicación.
- **Problemas de timeouts en la base de datos de origen:** Que se resolviendo importando los recursos necesarios en Terraform a código y modificando sus valores, ya que al ser *selfmanaged*, no hay otra forma de editar estos valores.


#### Redis
De manera similar a MySQL, nos decantamos por usar Terraform y el servicio de ElastiCache.

### Self-hosted action runners
Creación de runners propios para correr GitHub Actions, más eficientes y baratos que los ofrecidos de por GitHub.


## Other improvements:
*Explicar brevemente otras mejoras que se llevaron a cabo (creación de imágenes de su aplicación personalizadas para despliegues más eficientes, finops,...)*

También se hicieron un conjunto de tareas que mejoraron el sistema, de alguna u otra forma:
- **FinOps:** Estudio y análisis de la infraestructura a lo largo de varios momentos con los que poder ajustar los recursos y así reducir gastos.
- **Secretos:** Se extrajeron datos sensibles presentes en el código del cliente a secretos en AWS, ofreciendo así una mayor seguridad de su aplicación.
- **Sistema de colas:** Migración de un sistema de colas desde DigitalOcean a AWS, manejado por Terraform. También se añadieron neuvas colas, DLQs, a las originales donde se redirigirán aquellos mensajes que no sean extraidos en un tiempo. Esto ayuda al cliente a debuggear y a tener mayor control de los problemas que puedan existir.
- **Migración de buckets S3:** Configuración y migración de un bucket por entorno, desde DO hasta AWS con rutas de acceso restringido y rutas de acceso público desde el Internet.
- **QA:** Testeo de la aplicación a lo largo de distintos momentos.











