/**
 * PRUEBAS UNITARIAS PARA LA CLASE REPORTEINCIDENCIA
 * =====================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase ReporteIncidencia del sistema de gestión de parqueadero.
 */

const { ReporteIncidencia } = require('../model');

class PruebasReporteIncidencia {
  constructor() {
    this.contadorPruebas = 0;
    this.pruebasExitosas = 0;
    this.pruebasFallidas = 0;
    this.resultados = [];
  }

  // Método para ejecutar una prueba individual
  async ejecutarPrueba(nombrePrueba, funcionPrueba) {
    this.contadorPruebas++;
    console.log(`\n🧪 Ejecutando: ${nombrePrueba}`);
    try {
      await funcionPrueba();
      this.pruebasExitosas++;
      console.log(`✅ EXITOSA: ${nombrePrueba}`);
      this.resultados.push({ nombre: nombrePrueba, resultado: 'EXITOSA', error: null });
    } catch (error) {
      this.pruebasFallidas++;
      console.log(`❌ FALLIDA: ${nombrePrueba}`);
      console.log(`   Error: ${error.message}`);
      this.resultados.push({ nombre: nombrePrueba, resultado: 'FALLIDA', error: error.message });
    }
  }

  // Métodos auxiliares de aserción
  assertEquals(esperado, actual, mensaje = '') {
    if (esperado !== actual) {
      throw new Error(`${mensaje} - Esperado: ${esperado}, Actual: ${actual}`);
    }
  }

  assertNotNull(valor, mensaje = '') {
    if (valor === null || valor === undefined) {
      throw new Error(`${mensaje} - El valor no debe ser null o undefined`);
    }
  }

  assertNull(valor, mensaje = '') {
    if (valor !== null) {
      throw new Error(`${mensaje} - El valor debe ser null`);
    }
  }

  assertTrue(condicion, mensaje = '') {
    if (!condicion) {
      throw new Error(`${mensaje} - La condición debe ser verdadera`);
    }
  }

  // ========================================
  // PRUEBAS DEL CONSTRUCTOR
  // ========================================

  async probarConstructorVacio() {
    const reporte = new ReporteIncidencia();
    this.assertEquals(null, reporte.vehiculo_id, 'vehiculo_id debe ser null');
    this.assertEquals(null, reporte.incidencia_id, 'incidencia_id debe ser null');
    this.assertEquals(null, reporte.fecha_hora, 'fecha_hora debe ser null');
  }

  async probarConstructorConParametros() {
    const fecha = '2025-06-09 10:00:00';
    const reporte = new ReporteIncidencia(1, 2, fecha);
    this.assertEquals(1, reporte.vehiculo_id, 'vehiculo_id incorrecto');
    this.assertEquals(2, reporte.incidencia_id, 'incidencia_id incorrecto');
    this.assertEquals(fecha, reporte.fecha_hora, 'fecha_hora incorrecta');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const reporte = new ReporteIncidencia();
    reporte.vehiculo_id = 5;
    reporte.incidencia_id = 7;
    reporte.fecha_hora = '2025-06-09 12:00:00';
    this.assertEquals(5, reporte.vehiculo_id, 'Getter vehiculo_id');
    this.assertEquals(7, reporte.incidencia_id, 'Getter incidencia_id');
    this.assertEquals('2025-06-09 12:00:00', reporte.fecha_hora, 'Getter fecha_hora');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const fecha = '2025-06-09 15:00:00';
    const reporte = new ReporteIncidencia(3, 4, fecha);
    const json = reporte.toJSON();
    this.assertEquals(3, json.vehiculo_id, 'toJSON vehiculo_id');
    this.assertEquals(4, json.incidencia_id, 'toJSON incidencia_id');
    this.assertEquals(fecha, json.fecha_hora, 'toJSON fecha_hora');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS CRUD (requieren BD)
  // ========================================

  async probarCreateFindUpdateDelete() {
    // Crear
    const fecha = '2025-06-09 18:00:00';
    const reporte = new ReporteIncidencia(10, 20, fecha);
    await reporte.create();

    // Buscar por IDs
    const encontrados = await reporte.findByIds(10, 20);
    this.assertTrue(Array.isArray(encontrados), 'findByIds debe retornar array');
    this.assertTrue(encontrados.length > 0, 'findByIds debe retornar al menos uno');
    this.assertEquals(fecha, encontrados[0].fecha_hora, 'findByIds fecha_hora');

    // Actualizar
    reporte.fecha_hora = '2025-06-09 19:00:00';
    await reporte.update();
    const actualizados = await reporte.findByIds(10, 20);
    this.assertEquals('2025-06-09 19:00:00', actualizados[0].fecha_hora, 'update fecha_hora');

    // Eliminar
    const eliminado = await reporte.delete();
    this.assertTrue(eliminado, 'delete debe retornar true');
    const trasEliminar = await reporte.findByIds(10, 20);
    this.assertTrue(Array.isArray(trasEliminar), 'findByIds tras delete debe retornar array');
    // Puede haber más de uno si hay duplicados, pero al menos el último insertado debe estar eliminado
  }

  async probarFindAllYFiltros() {
    // Insertar dos reportes
    const r1 = new ReporteIncidencia(30, 40, '2025-06-09 20:00:00');
    const r2 = new ReporteIncidencia(31, 41, '2025-06-09 21:00:00');
    await r1.create();
    await r2.create();

    // Buscar todos
    const todos = await ReporteIncidencia.findAll();
    this.assertTrue(Array.isArray(todos), 'findAll debe retornar array');
    this.assertTrue(todos.length > 0, 'findAll debe retornar elementos');

    // Buscar por vehiculo
    const porVehiculo = await ReporteIncidencia.findByVehicleId(30);
    this.assertTrue(Array.isArray(porVehiculo), 'findByVehicleId debe retornar array');
    this.assertTrue(porVehiculo.length >= 1, 'findByVehicleId debe retornar al menos 1');

    // Buscar por incidencia
    const porIncidencia = await ReporteIncidencia.findByIncidentId(41);
    this.assertTrue(Array.isArray(porIncidencia), 'findByIncidentId debe retornar array');
    this.assertTrue(porIncidencia.length >= 1, 'findByIncidentId debe retornar al menos 1');

    // Buscar por rango de fechas
    const porFecha = await ReporteIncidencia.findByDateRange('2025-06-09 19:00:00', '2025-06-09 22:00:00');
    this.assertTrue(Array.isArray(porFecha), 'findByDateRange debe retornar array');
    this.assertTrue(porFecha.length >= 2, 'findByDateRange debe retornar al menos 2');

    // Limpiar
    await r1.delete();
    await r2.delete();
  }

  // ========================================
  // EJECUCIÓN DE TODAS LAS PRUEBAS
  // ========================================

  async ejecutarTodas() {
    await this.ejecutarPrueba('Constructor vacío', this.probarConstructorVacio.bind(this));
    await this.ejecutarPrueba('Constructor con parámetros', this.probarConstructorConParametros.bind(this));
    await this.ejecutarPrueba('Getters y Setters', this.probarGettersYSetters.bind(this));
    await this.ejecutarPrueba('Método toJSON', this.probarMetodoToJSON.bind(this));
    await this.ejecutarPrueba('CRUD: create/find/update/delete', this.probarCreateFindUpdateDelete.bind(this));
    await this.ejecutarPrueba('findAll y filtros', this.probarFindAllYFiltros.bind(this));

    // Resumen
    console.log('\n==============================');
    console.log(`Pruebas ejecutadas: ${this.contadorPruebas}`);
    console.log(`Pruebas exitosas:  ${this.pruebasExitosas}`);
    console.log(`Pruebas fallidas:  ${this.pruebasFallidas}`);
    console.log('==============================\n');
    if (this.pruebasFallidas > 0) {
      console.log('❌ Algunas pruebas fallaron. Revisa los errores arriba.');
    } else {
      console.log('✅ Todas las pruebas fueron exitosas.');
    }
  }
}

// Ejecutar si es archivo principal
if (require.main === module) {
  const pruebas = new PruebasReporteIncidencia();
  pruebas.ejecutarTodas();
}

module.exports = PruebasReporteIncidencia;
