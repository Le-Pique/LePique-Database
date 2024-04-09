# Diccionario de datos

Lepiqué Courier & Logistics

## Locations

| Llave                | Campo              | Tipo de Dato | Tamaño | Restricción | Descripción                            |
|----------------------|--------------------|--------------|--------|-------------|----------------------------------------|
| id                   | ID                 | String       |        | Primary Key | Identificador único de la sucursal     |
| title                | Título             | String       |        |             | Título de la sucursal                  |
| address              | Dirección          | String       |        |             | Dirección de la sucursal               |
| type                 | Tipo               | String       |        |             | Tipo de sucursal (ej. Sucursal)        |
| phone_number         | Número de Teléfono | String       |        |             | Número de teléfono de la sucursal      |
| location.point       | Punto              | String       |        |             | Punto de referencia de la sucursal     |
| location.coordinates | Coordenadas        | Array        |        |             | Coordenadas geográficas de la sucursal |

## Users

| Llave                | Campo                | Tipo de Dato | Tamaño | Restricción | Descripción                                                     |
|----------------------|----------------------|--------------|--------|-------------|-----------------------------------------------------------------|
| id                   | ID                   | String       |        | Primary Key | Identificador único del usuario                                 |
| created_at           | Creado en            | DateTime     |        |             | Fecha y hora de creación del usuario                            |
| updated_at           | Actualizado en       | DateTime     |        |             | Fecha y hora de la última actualización del usuario             |
| personal_information | Información Personal | Object       |        |             | Información personal del usuario                                |
| role                 | Rol                  | String       |        |             | Rol del usuario (ej. manager, courier, consumer, support_agent) |
| contacts             | Contactos            | Array        |        |             | Lista de contactos del usuario                                  |
| addresses            | Direcciones          | Array        |        |             | Lista de direcciones del usuario                                |

### Contacts of Consumer User

| Llave        | Campo              | Tipo de Dato | Tamaño | Restricción | Descripción                     |
|--------------|--------------------|--------------|--------|-------------|---------------------------------|
| name         | Nombre             | String       |        |             | Nombre del contacto             |
| phone_number | Número de Teléfono | String       |        |             | Número de teléfono del contacto |

### Addresses of Consumer User

| Llave                | Campo              | Tipo de Dato | Tamaño | Restricción | Descripción                             |
|----------------------|--------------------|--------------|--------|-------------|-----------------------------------------|
| id                   | ID                 | String       |        | Primary Key | Identificador único de la dirección     |
| name                 | Nombre             | String       |        |             | Nombre de la dirección                  |
| type                 | Tipo               | String       |        |             | Tipo de dirección (ej. Home)            |
| phone_number         | Número de Teléfono | String       |        |             | Número de teléfono de la dirección      |
| address              | Dirección          | String       |        |             | Dirección física                        |
| location.point       | Punto              | String       |        |             | Punto de referencia de la dirección     |
| location.coordinates | Coordenadas        | Array        |        |             | Coordenadas geográficas de la dirección |

## Orders

| Llave                 | Campo                   | Tipo de Dato | Tamaño | Restricción | Descripción                                            |
|-----------------------|-------------------------|--------------|--------|-------------|--------------------------------------------------------|
| id                    | ID                      | String       |        | Primary Key | Identificador único del pedido                         |
| status                | Estado                  | Array        |        |             | Estado actual del pedido (ej. "En ruta")               |
| delivery_confirmation | Confirmación de Entrega | Object       |        |             | Detalles de la confirmación de entrega                 |
| coordinates           | Coordenadas             | Array        |        |             | Coordenadas geográficas del pedido                     |
| notifications         | Notificaciones          | Array        |        |             | Lista de notificaciones del pedido                     |
| details               | Detalles                | Object       |        |             | Detalles específicos del pedido                        |
| rating                | Calificación            | Object       |        |             | Detalles de la calificación del pedido                 |
| chat_messages         | Mensajes de Chat        | Array        |        |             | Lista de mensajes de chat relacionados con el pedido   |
| support-tickets       | Tickets de Soporte      | Array        |        |             | Lista de tickets de soporte relacionados con el pedido |

### Delivery confirmation

| Llave                 | Campo                     | Tipo de Dato | Tamaño | Restricción | Descripción                                         |
|-----------------------|---------------------------|--------------|--------|-------------|-----------------------------------------------------|
| courier_confirmation  | Confirmación del Courier  | Object       |        |             | Detalles de la confirmación por parte del mensajero |
| receiver_confirmation | Confirmación del Receptor | Object       |        |             | Detalles de la confirmación por parte del receptor  |

#### Courier confirmation

| Llave             | Campo                 | Tipo de Dato | Tamaño | Restricción | Descripción                                    |
|-------------------|-----------------------|--------------|--------|-------------|------------------------------------------------|
| confirmed_at      | Confirmado en         | DateTime     |        |             | Fecha y hora de confirmación por el mensajero  |
| evidence_pictures | Imágenes de Evidencia | Array        |        |             | Lista de imágenes como evidencia de la entrega |

#### Courier confirmation

| Llave             | Campo                 | Tipo de Dato | Tamaño | Restricción | Descripción                                    |
|-------------------|-----------------------|--------------|--------|-------------|------------------------------------------------|
| state             | Estado                | String       |        |             | Estado de la confirmación por el receptor      |
| evidence_pictures | Imágenes de Evidencia | Array        |        |             | Lista de imágenes como evidencia de la entrega |

### Notifications

| Llave   | Campo    | Tipo de Dato | Tamaño | Restricción | Descripción                                   |
|---------|----------|--------------|--------|-------------|-----------------------------------------------|
| title   | Título   | String       |        |             | Título de la notificación                     |
| message | Mensaje  | String       |        |             | Mensaje de la notificación                    |
| actions | Acciones | Array        |        |             | Lista de acciones asociadas a la notificación |

#### Actions

| Llave            | Campo            | Tipo de Dato | Tamaño | Restricción | Descripción                        |
|------------------|------------------|--------------|--------|-------------|------------------------------------|
| title            | Título           | String       |        |             | Título de la acción                |
| type             | Tipo             | String       |        |             | Tipo de acción (ej. deeplink)      |
| ios-deeplink     | Deeplink iOS     | String       |        |             | Deeplink para dispositivos iOS     |
| android-deeplink | Deeplink Android | String       |        |             | Deeplink para dispositivos Android |
| web-link         | Enlace Web       | String       |        |             | Enlace web asociado a la acción    |

### Details

| Llave                   | Campo                      | Tipo de Dato | Tamaño | Restricción | Descripción                              |
|-------------------------|----------------------------|--------------|--------|-------------|------------------------------------------|
| reference               | Referencia                 | String       |        |             | Referencia del pedido                    |
| product                 | Producto                   | String       |        |             | Producto asociado al pedido              |
| created_at              | Creado en                  | DateTime     |        |             | Fecha y hora de creación del pedido      |
| estimated_delivery_date | Fecha de Entrega Estimada  | String       |        |             | Fecha estimada de entrega del pedido     |
| eta                     | Tiempo Estimado de Llegada | String       |        |             | Tiempo estimado de llegada del pedido    |
| contents                | Contenidos                 | Object       |        |             | Contenidos del pedido                    |
| sender_information      | Información del Remitente  | Object       |        |             | Información del remitente                |
| receiver_information    | Información del Receptor   | Object       |        |             | Información del receptor                 |
| movements               | Movimientos                | Array        |        |             | Lista de movimientos asociados al pedido |

#### Contents

| Llave | Campo | Tipo de Dato | Tamaño | Restricción | Descripción                            |
|-------|-------|--------------|--------|-------------|----------------------------------------|
| type  | Tipo  | Array        |        |             | Lista de tipos de contenido del pedido |

#### Sender Information

| Llave               | Campo                  | Tipo de Dato | Tamaño | Restricción | Descripción                      |
|---------------------|------------------------|--------------|--------|-------------|----------------------------------|
| assigned_manager_id | ID del Gestor Asignado | String       |        |             | ID del gestor asignado al pedido |
| name                | Nombre                 | String       |        |             | Nombre del remitente             |
| location_id         | ID de la Ubicación     | String       |        |             | ID de la ubicación del remitente |

#### Receiver Information

| Llave         | Campo              | Tipo de Dato | Tamaño | Restricción | Descripción                                           |
|---------------|--------------------|--------------|--------|-------------|-------------------------------------------------------|
| id            | ID                 | String       |        |             | ID del receptor                                       |
| name          | Nombre             | String       |        |             | Nombre del receptor                                   |
| location_id   | ID de la Ubicación | String       |        |             | ID de la ubicación del receptor                       |
| location_type | Tipo de Ubicación  | String       |        |             | Tipo de ubicación del receptor (ej. consumer_address) |

#### Movements

| Llave       | Campo              | Tipo de Dato | Tamaño | Restricción | Descripción                               |
|-------------|--------------------|--------------|--------|-------------|-------------------------------------------|
| id          | ID                 | String       |        |             | ID del movimiento                         |
| date        | Fecha y Hora       | String       |        |             | Fecha y hora del movimiento               |
| title       | Título             | String       |        |             | Título del movimiento                     |
| location_id | ID de la Ubicación | String       |        |             | ID de la ubicación asociada al movimiento |
| coordinates | Coordenadas        | Array        |        |             | Coordenadas geográficas del movimiento    |

### Rating

| Llave             | Campo                  | Tipo de Dato | Tamaño | Restricción | Descripción                                      |
|-------------------|------------------------|--------------|--------|-------------|--------------------------------------------------|
| receiver-opinion  | Opinión del Receptor   | Object       |        |             | Opinión del receptor sobre la entrega            |
| time_accomplished | Tiempo de Cumplimiento | Boolean      |        |             | Indicador de si el pedido fue entregado a tiempo |
| time_delay        | Retraso en el Tiempo   | String       |        |             | Tiempo de retraso en la entrega                  |

#### Receiver Opinion

| Llave    | Campo       | Tipo de Dato | Tamaño | Restricción | Descripción                               |
|----------|-------------|--------------|--------|-------------|-------------------------------------------|
| comments | Comentarios | String       |        |             | Comentarios del receptor sobre la entrega |

### Chat Messages

| Llave  | Campo     | Tipo de Dato | Tamaño | Restricción | Descripción                                           |
|--------|-----------|--------------|--------|-------------|-------------------------------------------------------|
| id     | ID        | String       |        |             | ID del mensaje de chat                                |
| sender | Remitente | String       |        |             | Remitente del mensaje de chat (ej. consumer, courier) |

### Support Tickets

| Llave                  | Campo                    | Tipo de Dato | Tamaño | Restricción | Descripción                                     |
|------------------------|--------------------------|--------------|--------|-------------|-------------------------------------------------|
| order_id               | ID del Pedido            | String       |        |             | ID del pedido asociado al ticket de soporte     |
| sender_id              | ID del Remitente         | String       |        |             | ID del remitente del ticket de soporte          |
| consumer_id            | ID del Consumidor        | String       |        |             | ID del consumidor asociado al ticket de soporte |
| assigned_support_agent | ID del Agente de Soporte | String       |        |             | ID del agente de soporte asignado al ticket     |
| status                 | Estado                   | String       |        |             | Estado del ticket de soporte (ej. open, closed) |
| title                  | Título                   | String       |        |             | Título del ticket de soporte                    |
| short_description      | Descripción Corta        | String       |        |             | Descripción corta del problema                  |
| chat_messages          | Mensajes de Chat         | Array        |        |             | Lista de mensajes de chat asociados al ticket   |