CREATE TABLE IF NOT EXISTS "usuario" (
  "id_usuario"      SERIAL PRIMARY KEY,
  "nombre_completo" VARCHAR(150) NOT NULL,
  "username"        VARCHAR(80)  NOT NULL UNIQUE,
  "password_hash"   VARCHAR(255) NOT NULL,
  "rol"             VARCHAR(20)  NOT NULL DEFAULT 'recepcionista',
  "activo"          BOOLEAN      NOT NULL DEFAULT TRUE,
  "fecha_creacion"  TIMESTAMP(6)          DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "idx_usuario_username" ON "usuario"("username");

CREATE TABLE IF NOT EXISTS "audit_log" (
  "id_log"      SERIAL PRIMARY KEY,
  "id_usuario"  INTEGER REFERENCES "usuario"("id_usuario") ON DELETE SET NULL,
  "username"    VARCHAR(80)  NOT NULL,
  "accion"      VARCHAR(60)  NOT NULL,
  "descripcion" TEXT,
  "entidad"     VARCHAR(40),
  "entidad_id"  INTEGER,
  "ip"          VARCHAR(45),
  "fecha"       TIMESTAMP(6) DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "idx_audit_fecha"   ON "audit_log"("fecha");
CREATE INDEX IF NOT EXISTS "idx_audit_usuario" ON "audit_log"("id_usuario");
CREATE INDEX IF NOT EXISTS "idx_audit_accion"  ON "audit_log"("accion");

CREATE TABLE IF NOT EXISTS "turno_caja" (
  "id_turno"       SERIAL PRIMARY KEY,
  "id_usuario"     INTEGER NOT NULL REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION,
  "fecha_apertura" TIMESTAMP(6) DEFAULT NOW(),
  "monto_apertura" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "fecha_cierre"   TIMESTAMP(6),
  "monto_sistema"  DECIMAL(12,2),
  "monto_real"     DECIMAL(12,2),
  "diferencia"     DECIMAL(12,2),
  "estado"         VARCHAR(20) NOT NULL DEFAULT 'abierto',
  "notas"          TEXT
);
CREATE INDEX IF NOT EXISTS "idx_caja_usuario" ON "turno_caja"("id_usuario");
CREATE INDEX IF NOT EXISTS "idx_caja_estado"  ON "turno_caja"("estado");
