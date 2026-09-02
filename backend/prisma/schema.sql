-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE IF NOT EXISTS \"cuenta_espacio" (
    "id_item" SERIAL NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "nombre_producto" VARCHAR(150) NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL(12,2) NOT NULL,
    "valor_total" DECIMAL(12,2),
    "estado" VARCHAR(20) DEFAULT 'pendiente',
    "metodo_pago" VARCHAR(50),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "anotaciones" TEXT,

    CONSTRAINT "cuenta_espacio_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"cuenta_persona" (
    "id_item_persona" SERIAL NOT NULL,
    "id_huesped" INTEGER,
    "nombre_persona" VARCHAR(150) NOT NULL,
    "id_reserva" INTEGER,
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,
    "descripcion" VARCHAR(200) NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "valor_unitario" DECIMAL(12,2) NOT NULL,
    "valor_total" DECIMAL(12,2),
    "estado" VARCHAR(20) DEFAULT 'pendiente',
    "metodo_pago" VARCHAR(50),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cuenta_persona_pkey" PRIMARY KEY ("id_item_persona")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"espacio" (
    "id_espacio" SERIAL NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "tipo_espacio" VARCHAR(20) NOT NULL,
    "tipo_habitacion" VARCHAR(20),
    "capacidad_personas" INTEGER,
    "precio_persona_1" DECIMAL(12,2),
    "precio_persona_2" DECIMAL(12,2),
    "precio_adicional" DECIMAL(12,2) DEFAULT 80000,
    "estado_limpieza" VARCHAR(20) DEFAULT 'limpia',
    "activo" BOOLEAN DEFAULT true,
    "tiene_minibar" BOOLEAN DEFAULT false,
    "url_ical" VARCHAR(500),

    CONSTRAINT "espacio_pkey" PRIMARY KEY ("id_espacio")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"huesped" (
    "id_huesped" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(150) NOT NULL,
    "telefono" VARCHAR(20),
    "documento" VARCHAR(30),
    "tipo_documento" VARCHAR(20),
    "procedencia" VARCHAR(100),
    "firma" TEXT,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "huesped_pkey" PRIMARY KEY ("id_huesped")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"inventario_minibar" (
    "id_inventario" SERIAL NOT NULL,
    "id_espacio" INTEGER NOT NULL,
    "nombre_producto" VARCHAR(150) NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "precio_unitario" DECIMAL(12,2) NOT NULL,
    "fecha_vencimiento" DATE,
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventario_minibar_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"origen_reserva" (
    "id_origen" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "origen_reserva_pkey" PRIMARY KEY ("id_origen")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"reserva" (
    "id_reserva" SERIAL NOT NULL,
    "id_huesped" INTEGER NOT NULL,
    "id_espacio" INTEGER NOT NULL,
    "tipo_reserva" VARCHAR(15) NOT NULL DEFAULT 'alojamiento',
    "origen" VARCHAR(50) NOT NULL DEFAULT 'Propia',
    "dni_tipo" VARCHAR(20) DEFAULT 'reserva',
    "check_in" DATE,
    "check_out" DATE,
    "cantidad_adultos" INTEGER DEFAULT 1,
    "cantidad_ninos" INTEGER DEFAULT 0,
    "fecha_evento" DATE,
    "hora_inicio" TIME(6),
    "hora_fin" TIME(6),
    "estado_reserva" VARCHAR(20) NOT NULL DEFAULT 'activa',
    "monto_total" DECIMAL(12,2),
    "estado_pago" VARCHAR(20) DEFAULT 'pendiente',
    "metodo_pago" VARCHAR(50),
    "monto_pagado" DECIMAL(12,2) DEFAULT 0,
    "anotaciones" TEXT,
    "firma" TEXT,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "precio_noche_snapshot" DECIMAL(12,2),
    "temporada_tipo" VARCHAR(10),

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"configuracion_hotel" (
    "id" SERIAL NOT NULL,
    "nombre_hotel" VARCHAR(200),
    "direccion" VARCHAR(300),
    "telefono" VARCHAR(50),
    "nit" VARCHAR(50),
    "email" VARCHAR(100),
    "ciudad" VARCHAR(100),
    "hora_check_in" VARCHAR(10) DEFAULT '15:00',
    "hora_check_out" VARCHAR(10) DEFAULT '13:00',
    "fecha_actualizacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configuracion_hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"tipo_espacio_config" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "precio_base" DECIMAL(12,2) NOT NULL,
    "recargo_pareja" DECIMAL(12,2) NOT NULL,
    "recargo_adicional" DECIMAL(12,2) NOT NULL,
    "max_personas_adicionales" INTEGER NOT NULL DEFAULT 1,
    "precio_base_media" DECIMAL(12,2),
    "precio_base_alta" DECIMAL(12,2),
    "recargo_pareja_media" DECIMAL(12,2),
    "recargo_pareja_alta" DECIMAL(12,2),
    "recargo_adicional_media" DECIMAL(12,2),
    "recargo_adicional_alta" DECIMAL(12,2),

    CONSTRAINT "tipo_espacio_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"temporada" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(10) NOT NULL,
    "mes_dia_inicio" VARCHAR(5) NOT NULL,
    "mes_dia_fin" VARCHAR(5) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "es_exacta" BOOLEAN NOT NULL DEFAULT false,
    "fecha_exacta_inicio" VARCHAR(10),
    "fecha_exacta_fin" VARCHAR(10),

    CONSTRAINT "temporada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"categoria_inventario" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_inventario_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "nit" VARCHAR(30),
    "telefono" VARCHAR(30),
    "email" VARCHAR(100),
    "direccion" VARCHAR(300),
    "ciudad" VARCHAR(100),
    "contacto" VARCHAR(150),
    "notas" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"producto_inventario" (
    "id_producto" SERIAL NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "descripcion" TEXT,
    "categoria" VARCHAR(50) NOT NULL,
    "unidad_medida" VARCHAR(30) NOT NULL DEFAULT 'unidad',
    "precio_costo" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "precio_venta" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "stock_actual" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "stock_minimo" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "id_proveedor" INTEGER,
    "fecha_vencimiento" DATE,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_inventario_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"movimiento_inventario" (
    "id_movimiento" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "tipo" VARCHAR(10) NOT NULL,
    "motivo" VARCHAR(30) NOT NULL,
    "cantidad" DECIMAL(12,3) NOT NULL,
    "stock_antes" DECIMAL(12,3) NOT NULL,
    "stock_despues" DECIMAL(12,3) NOT NULL,
    "precio_unitario" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "referencia_id" INTEGER,
    "referencia_tipo" VARCHAR(30),
    "notas" TEXT,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimiento_inventario_pkey" PRIMARY KEY ("id_movimiento")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"gasto_operativo" (
    "id_gasto" SERIAL NOT NULL,
    "categoria" VARCHAR(60) NOT NULL,
    "descripcion" VARCHAR(300) NOT NULL,
    "monto" DECIMAL(12,2) NOT NULL,
    "fecha" DATE NOT NULL,
    "comprobante" VARCHAR(100),
    "proveedor_nombre" VARCHAR(200),
    "es_recurrente" BOOLEAN NOT NULL DEFAULT false,
    "dia_recurrente" INTEGER,
    "notas" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gasto_operativo_pkey" PRIMARY KEY ("id_gasto")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"categoria_gasto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categoria_gasto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(150) NOT NULL,
    "username" VARCHAR(80) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(20) NOT NULL DEFAULT 'recepcionista',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"audit_log" (
    "id_log" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "username" VARCHAR(80) NOT NULL,
    "accion" VARCHAR(60) NOT NULL,
    "descripcion" TEXT,
    "entidad" VARCHAR(40),
    "entidad_id" INTEGER,
    "ip" VARCHAR(45),
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS \"turno_caja" (
    "id_turno" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "fecha_apertura" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto_apertura" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "fecha_cierre" TIMESTAMP(6),
    "monto_sistema" DECIMAL(12,2),
    "monto_real" DECIMAL(12,2),
    "diferencia" DECIMAL(12,2),
    "estado" VARCHAR(20) NOT NULL DEFAULT 'abierto',
    "notas" TEXT,

    CONSTRAINT "turno_caja_pkey" PRIMARY KEY ("id_turno")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_cuenta_espacio_reserva" ON "cuenta_espacio"("id_reserva");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_cuenta_persona_huesped" ON "cuenta_persona"("id_huesped");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_cuenta_persona_reserva" ON "cuenta_persona"("id_reserva");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"espacio_numero_key" ON "espacio"("numero");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_minibar_espacio" ON "inventario_minibar"("id_espacio");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"origen_reserva_nombre_key" ON "origen_reserva"("nombre");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_reserva_checkin" ON "reserva"("check_in");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_reserva_checkout" ON "reserva"("check_out");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_reserva_espacio" ON "reserva"("id_espacio");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_reserva_estado" ON "reserva"("estado_reserva");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_reserva_huesped" ON "reserva"("id_huesped");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"tipo_espacio_config_nombre_key" ON "tipo_espacio_config"("nombre");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_temporada_inicio" ON "temporada"("mes_dia_inicio");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_temporada_fin" ON "temporada"("mes_dia_fin");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"categoria_inventario_nombre_key" ON "categoria_inventario"("nombre");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_producto_categoria" ON "producto_inventario"("categoria");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_producto_proveedor" ON "producto_inventario"("id_proveedor");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_movimiento_producto" ON "movimiento_inventario"("id_producto");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_movimiento_fecha" ON "movimiento_inventario"("fecha");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_gasto_fecha" ON "gasto_operativo"("fecha");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_gasto_categoria" ON "gasto_operativo"("categoria");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"categoria_gasto_nombre_key" ON "categoria_gasto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS \"usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_usuario_username" ON "usuario"("username");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_audit_fecha" ON "audit_log"("fecha");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_audit_usuario" ON "audit_log"("id_usuario");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_audit_accion" ON "audit_log"("accion");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_caja_usuario" ON "turno_caja"("id_usuario");

-- CreateIndex
CREATE INDEX IF NOT EXISTS \"idx_caja_estado" ON "turno_caja"("estado");

-- AddForeignKey
ALTER TABLE "cuenta_espacio" ADD CONSTRAINT "cuenta_espacio_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cuenta_persona" ADD CONSTRAINT "cuenta_persona_id_huesped_fkey" FOREIGN KEY ("id_huesped") REFERENCES "huesped"("id_huesped") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cuenta_persona" ADD CONSTRAINT "cuenta_persona_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventario_minibar" ADD CONSTRAINT "inventario_minibar_id_espacio_fkey" FOREIGN KEY ("id_espacio") REFERENCES "espacio"("id_espacio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_espacio_fkey" FOREIGN KEY ("id_espacio") REFERENCES "espacio"("id_espacio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_huesped_fkey" FOREIGN KEY ("id_huesped") REFERENCES "huesped"("id_huesped") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "producto_inventario" ADD CONSTRAINT "producto_inventario_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_inventario" ADD CONSTRAINT "movimiento_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto_inventario"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turno_caja" ADD CONSTRAINT "turno_caja_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE CASCADE;

