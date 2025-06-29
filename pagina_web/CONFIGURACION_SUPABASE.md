# Configuración de Supabase para el Formulario de Contacto

## Pasos para configurar la integración con Supabase

### 1. Obtener las credenciales de Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. En el dashboard, ve a **Settings** > **API**
3. Copia los siguientes valores:
   - **URL**: Tu URL del proyecto (ejemplo: `https://tuproyecto.supabase.co`)
   - **anon public**: Tu API Key anónima

### 2. Configurar las credenciales

1. Abre el archivo `supabase-config.js`
2. Reemplaza `YOUR_SUPABASE_URL_HERE` con tu URL de Supabase
3. Reemplaza `YOUR_SUPABASE_ANON_KEY_HERE` con tu API Key anónima

**Ejemplo:**
```javascript
const SUPABASE_CONFIG = {
    url: 'https://miproyecto.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

### 3. Verificar la tabla en Supabase

La tabla `contacto_webpage` debe existir en tu base de datos con las siguientes columnas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | bigint | ID auto-incrementable (clave primaria) |
| `tipo_solicitud` | text | Tipo de solicitud (demo-gratuito, cotizacion-personalizada) |
| `correo` | text | Email del contacto |
| `telefono` | text | Teléfono (opcional) |
| `nombre_institucion` | text | Nombre de la institución |
| `tipo_institucion` | text | Tipo de institución |
| `cantidad_alumnos` | text | Rango de cantidad de alumnos |
| `responsable` | text | Nombre y cargo del responsable |
| `mensaje` | text | Mensaje adicional (opcional) |
| `created_at` | timestamp with time zone | Fecha de creación |

### 4. Configurar permisos (RLS)

Para que el formulario pueda insertar datos, necesitas configurar las políticas de Row Level Security:

1. Ve a **Authentication** > **Policies** en tu dashboard de Supabase
2. Para la tabla `contacto_webpage`, crea una política de INSERT que permita inserciones anónimas:

```sql
CREATE POLICY "Allow anonymous inserts" ON contacto_webpage
FOR INSERT WITH CHECK (true);
```

### 5. Probar la integración

1. Abre cualquier página del sitio web
2. Haz clic en cualquier botón de "Demo" o "Cotización"
3. Llena el formulario y envíalo
4. Verifica en tu dashboard de Supabase que el registro se haya creado en la tabla `contacto_webpage`

## Funcionalidades implementadas

### Selección inteligente del tipo de solicitud
- Los botones de **Demo** establecen automáticamente "Demo Gratuito"
- Los botones de **Cotización** establecen automáticamente "Cotización Personalizada"

### Campos del formulario
- **Tipo de Solicitud**: Solo "Demo Gratuito" y "Cotización Personalizada"
- **Teléfono**: Campo opcional (sin required)
- **Integración completa**: Todos los datos se envían a Supabase

### Manejo de errores
- Validación de configuración de Supabase
- Mensaje de error si la configuración no está completa
- Estados de carga durante el envío
- Mensajes de éxito personalizados según el tipo de solicitud

## Solución de problemas

### Error: "Supabase no está configurado"
- Verifica que hayas editado correctamente el archivo `supabase-config.js`
- Asegúrate de que los valores no sean los placeholders por defecto

### Error 401 (Unauthorized)
- Verifica que tu API Key sea correcta
- Asegúrate de que las políticas RLS estén configuradas correctamente

### Error 404 (Not Found)
- Verifica que la tabla `contacto_webpage` exista
- Verifica que tu URL de Supabase sea correcta

### Los datos no aparecen en Supabase
- Revisa la consola del navegador para errores
- Verifica que las políticas de inserción estén configuradas
- Asegúrate de que todos los campos requeridos estén siendo enviados 