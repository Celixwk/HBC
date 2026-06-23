-- Hotel Boutique - Schema idempotente (CREATE TABLE IF NOT EXISTS)
-- Se puede ejecutar en cualquier momento sin romper datos existentes
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE IF NOT EXISTS "cuenta_espacio" (
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
CREATE TABLE IF NOT EXISTS "cuenta_persona" (
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
CREATE TABLE IF NOT EXISTS "espacio" (
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

    CONSTRAINT "espacio_pkey" PRIMARY KEY ("id_espacio")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "huesped" (
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
CREATE TABLE IF NOT EXISTS "inventario_minibar" (
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
CREATE TABLE IF NOT EXISTS "reserva" (
    "id_reserva" SERIAL NOT NULL,
    "id_huesped" INTEGER NOT NULL,
    "id_espacio" INTEGER NOT NULL,
    "tipo_reserva" VARCHAR(15) NOT NULL DEFAULT 'alojamiento',
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

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "configuracion_hotel" (
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
CREATE TABLE IF NOT EXISTS "tipo_espacio_config" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "precio_base" DECIMAL(12,2) NOT NULL,
    "recargo_pareja" DECIMAL(12,2) NOT NULL,
    "recargo_adicional" DECIMAL(12,2) NOT NULL,
    "max_personas_adicionales" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "tipo_espacio_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "categoria_inventario" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(80) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoria_inventario_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "proveedor" (
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
CREATE TABLE IF NOT EXISTS "producto_inventario" (
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
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_inventario_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "movimiento_inventario" (
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
CREATE TABLE IF NOT EXISTS "gasto_operativo" (
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
CREATE TABLE IF NOT EXISTS "categoria_gasto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categoria_gasto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (IF NOT EXISTS safe via DO blocks)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cuenta_espacio_reserva') THEN
    CREATE INDEX "idx_cuenta_espacio_reserva" ON "cuenta_espacio"("id_reserva");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cuenta_persona_huesped') THEN
    CREATE INDEX "idx_cuenta_persona_huesped" ON "cuenta_persona"("id_huesped");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_cuenta_persona_reserva') THEN
    CREATE INDEX "idx_cuenta_persona_reserva" ON "cuenta_persona"("id_reserva");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'espacio_numero_key') THEN
    CREATE UNIQUE INDEX "espacio_numero_key" ON "espacio"("numero");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_minibar_espacio') THEN
    CREATE INDEX "idx_minibar_espacio" ON "inventario_minibar"("id_espacio");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reserva_checkin') THEN
    CREATE INDEX "idx_reserva_checkin" ON "reserva"("check_in");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reserva_checkout') THEN
    CREATE INDEX "idx_reserva_checkout" ON "reserva"("check_out");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reserva_espacio') THEN
    CREATE INDEX "idx_reserva_espacio" ON "reserva"("id_espacio");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reserva_estado') THEN
    CREATE INDEX "idx_reserva_estado" ON "reserva"("estado_reserva");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_reserva_huesped') THEN
    CREATE INDEX "idx_reserva_huesped" ON "reserva"("id_huesped");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'tipo_espacio_config_nombre_key') THEN
    CREATE UNIQUE INDEX "tipo_espacio_config_nombre_key" ON "tipo_espacio_config"("nombre");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'categoria_inventario_nombre_key') THEN
    CREATE UNIQUE INDEX "categoria_inventario_nombre_key" ON "categoria_inventario"("nombre");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_producto_categoria') THEN
    CREATE INDEX "idx_producto_categoria" ON "producto_inventario"("categoria");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_producto_proveedor') THEN
    CREATE INDEX "idx_producto_proveedor" ON "producto_inventario"("id_proveedor");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_movimiento_producto') THEN
    CREATE INDEX "idx_movimiento_producto" ON "movimiento_inventario"("id_producto");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_movimiento_fecha') THEN
    CREATE INDEX "idx_movimiento_fecha" ON "movimiento_inventario"("fecha");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_gasto_fecha') THEN
    CREATE INDEX "idx_gasto_fecha" ON "gasto_operativo"("fecha");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_gasto_categoria') THEN
    CREATE INDEX "idx_gasto_categoria" ON "gasto_operativo"("categoria");
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'categoria_gasto_nombre_key') THEN
    CREATE UNIQUE INDEX "categoria_gasto_nombre_key" ON "categoria_gasto"("nombre");
  END IF;
END $$;

-- AddForeignKey (safe)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cuenta_espacio_id_reserva_fkey') THEN
    ALTER TABLE "cuenta_espacio" ADD CONSTRAINT "cuenta_espacio_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cuenta_persona_id_huesped_fkey') THEN
    ALTER TABLE "cuenta_persona" ADD CONSTRAINT "cuenta_persona_id_huesped_fkey" FOREIGN KEY ("id_huesped") REFERENCES "huesped"("id_huesped") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cuenta_persona_id_reserva_fkey') THEN
    ALTER TABLE "cuenta_persona" ADD CONSTRAINT "cuenta_persona_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'inventario_minibar_id_espacio_fkey') THEN
    ALTER TABLE "inventario_minibar" ADD CONSTRAINT "inventario_minibar_id_espacio_fkey" FOREIGN KEY ("id_espacio") REFERENCES "espacio"("id_espacio") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reserva_id_espacio_fkey') THEN
    ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_espacio_fkey" FOREIGN KEY ("id_espacio") REFERENCES "espacio"("id_espacio") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reserva_id_huesped_fkey') THEN
    ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_huesped_fkey" FOREIGN KEY ("id_huesped") REFERENCES "huesped"("id_huesped") ON DELETE NO ACTION ON UPDATE NO ACTION;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'producto_inventario_id_proveedor_fkey') THEN
    ALTER TABLE "producto_inventario" ADD CONSTRAINT "producto_inventario_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'movimiento_inventario_id_producto_fkey') THEN
    ALTER TABLE "movimiento_inventario" ADD CONSTRAINT "movimiento_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto_inventario"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
