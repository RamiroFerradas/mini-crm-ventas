# mini-crm-ventas

## Documentación mínima de implementación

### Estado global y normalización
Toda la gestión de clientes, oportunidades y productos se maneja con Zustand, usando un store por entidad en `app/store/`. Los datos están normalizados y cada store se encarga de su persistencia y sincronización.

### SEO y rutas dinámicas
Cada cliente tiene su propia página en `app/(pages)/clients/[id]/page.tsx`, donde se generan los meta tags dinámicos para SEO usando la función `generateMetadata`.

### Optimistic UI
Al crear o editar oportunidades, la interfaz refleja los cambios de inmediato. Si la API rechaza la operación, se revierte el estado y se muestra un mensaje de error (ver lógica en los stores de entidad y el toast global).

### Lazy loading
El módulo de estadísticas (`app/(pages)/analytics/page.tsx`) y los avatares de clientes usan carga diferida para optimizar el rendimiento.

### Websockets y eventos en tiempo real
Las actualizaciones de oportunidades en tiempo real se manejan con socket.io-client (`app/lib/socket.ts` y `server/socket-server.ts`). Además, MirageJS simula eventos en tiempo real en desarrollo.

### Soporte offline y sincronización
Se usa IndexedDB con Dexie.js (`app/db/indexedDb.ts`) para persistencia local. El hook `useSyncLifecycle` gestiona la sincronización automática cuando vuelve la conexión.

### API Mocking
MirageJS y fakeApi (`app/lib/mirage/` y `app/lib/fakeApi.ts`) simulan el backend y los eventos en tiempo real para desarrollo sin servidor real.

### Formularios dinámicos y validaciones
Los formularios usan react-hook-form. En el de oportunidades, si el producto es “Membresía Premium” aparece el campo de duración, y si el monto supera el umbral, se pide aprobación de gerente. El formulario de clientes valida el email en tiempo real.

### Buscador indexable
La lista de clientes (`ClientList.tsx`) tiene un buscador por nombre/email, accesible y amigable para SEO.

### Feedback visual de sincronización
El estado de sincronización (online, offline, pendientes, errores) se muestra siempre en el header con el componente `SyncStatusIndicator`.


