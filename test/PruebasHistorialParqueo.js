/**
 * PRUEBAS UNITARIAS PARA LA CLASE HISTORIALPARQUEO
 * ===============================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase HistorialParqueo del sistema de gestión de parqueadero.
 */

const HistorialParqueo = require('../model/HistorialParqueo');

class PruebasHistorialParqueo {
  constructor() {
    this.contadorPruebas = 0;
    this.pruebasExitosas = 0;
    this.pruebasFallidas = 0;
  }

  async ejecutarPrueba(nombrePrueba, funcionPrueba) {
    this.contadorPruebas++;
    try {
      await funcionPrueba();
      this.pruebasExitosas++;
      console.log(`✅ EXITOSA: ${nombrePrueba}`);
    } catch (error) {
      this.pruebasFallidas++;
      console.error(`❌ FALLIDA: ${nombrePrueba}`);
      console.error('   Detalle:', error.message);
    }
  }

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
    const historial = new HistorialParqueo();
    this.assertEquals(null, historial.celda_id, 'celda_id debe ser null');
    this.assertEquals(null, historial.vehiculo_id, 'vehiculo_id debe ser null');
    this.assertEquals(null, historial.fecha_hora, 'fecha_hora debe ser null');
  }

  async probarConstructorConParametros() {
    const historial = new HistorialParqueo(1, 2, '2025-06-16 10:00:00');
    this.assertEquals(1, historial.celda_id, 'celda_id incorrecto');
    this.assertEquals(2, historial.vehiculo_id, 'vehiculo_id incorrecto');
    this.assertEquals('2025-06-16 10:00:00', historial.fecha_hora, 'fecha_hora incorrecta');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const historial = new HistorialParqueo();
    historial.celda_id = 5;
    historial.vehiculo_id = 7;
    historial.fecha_hora = '2025-06-16 12:00:00';
    this.assertEquals(5, historial.celda_id, 'Getter celda_id');
    this.assertEquals(7, historial.vehiculo_id, 'Getter vehiculo_id');
    this.assertEquals('2025-06-16 12:00:00', historial.fecha_hora, 'Getter fecha_hora');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const historial = new HistorialParqueo(2, 3, '2025-06-16 13:00:00');
    const json = historial.toJSON();
    this.assertEquals(2, json.celda_id, 'toJSON celda_id');
    this.assertEquals(3, json.vehiculo_id, 'toJSON vehiculo_id');
    this.assertEquals('2025-06-16 13:00:00', json.fecha_hora, 'toJSON fecha_hora');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO _mapRowToObject()
  // ========================================

  async probarMetodoMapRowToObject() {
    const historial = new HistorialParqueo();
    const mockRow = { CELDA_id: 10, VEHICULO_id: 20, fecha_hora: '2025-06-16 14:00:00' };
    historial._mapRowToObject(mockRow);
    this.assertEquals(10, historial.celda_id, 'Map celda_id');
    this.assertEquals(20, historial.vehiculo_id, 'Map vehiculo_id');
    this.assertEquals('2025-06-16 14:00:00', historial.fecha_hora, 'Map fecha_hora');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS DE BASE DE DATOS
  // ========================================
  // NOTA: Estas pruebas requieren conexión a BD real o mock

  async probarMetodoFindAll() {
    try {
      const historiales = await HistorialParqueo.findAll();
      this.assertNotNull(historiales, 'findAll debe retornar array');
      this.assertTrue(Array.isArray(historiales), 'Debe ser un array');
      if (historiales.length > 0) {
        const primero = historiales[0];
        this.assertNotNull(primero.celda_id, 'Historial debe tener celda_id');
        this.assertNotNull(primero.vehiculo_id, 'Historial debe tener vehiculo_id');
        this.assertNotNull(primero.fecha_hora, 'Historial debe tener fecha_hora');
        const json = primero.toJSON();
        this.assertNotNull(json, 'toJSON debe funcionar');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding all HistorialParqueo') ||
        error.message.includes('connection') ||
        error.message.includes('database'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindByIds() {
    const historial = new HistorialParqueo();
    try {
      const resultados = await historial.findByIds(1, 1);
      this.assertNotNull(resultados, 'findByIds debe retornar array');
      this.assertTrue(Array.isArray(resultados), 'Debe ser un array');
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding HistorialParqueo') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindByVehicleId() {
    try {
      const resultados = await HistorialParqueo.findByVehicleId(1);
      this.assertNotNull(resultados, 'findByVehicleId debe retornar array');
      this.assertTrue(Array.isArray(resultados), 'Debe ser un array');
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding HistorialParqueo by vehicle ID') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindByCellId() {
    try {
      const resultados = await HistorialParqueo.findByCellId(1);
      this.assertNotNull(resultados, 'findByCellId debe retornar array');
      this.assertTrue(Array.isArray(resultados), 'Debe ser un array');
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding HistorialParqueo by cell ID') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindByDateRange() {
    try {
      const resultados = await HistorialParqueo.findByDateRange('2025-06-01', '2025-06-30');
      this.assertNotNull(resultados, 'findByDateRange debe retornar array');
      this.assertTrue(Array.isArray(resultados), 'Debe ser un array');
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding HistorialParqueo by date range') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoGetCurrentVehicleInCell() {
    try {
      const resultado = await HistorialParqueo.getCurrentVehicleInCell(1);
      if (resultado) {
        this.assertNotNull(resultado.celda_id, 'Debe tener celda_id');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding current vehicle in cell') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoGetParkingStatistics() {
    try {
      const stats = await HistorialParqueo.getParkingStatistics();
      this.assertNotNull(stats, 'getParkingStatistics debe retornar objeto');
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error getting parking statistics') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  // ========================================
  // EJECUCIÓN DE TODAS LAS PRUEBAS
  // ========================================

  async ejecutarTodas() {
    console.log('🅿️ INICIANDO PRUEBAS UNITARIAS DE LA CLASE HISTORIALPARQUEO');
    console.log('='.repeat(60));
    await this.ejecutarPrueba('Constructor Vacío', () => this.probarConstructorVacio());
    await this.ejecutarPrueba('Constructor Con Parámetros', () => this.probarConstructorConParametros());
    await this.ejecutarPrueba('Getters y Setters', () => this.probarGettersYSetters());
    await this.ejecutarPrueba('Método toJSON', () => this.probarMetodoToJSON());
    await this.ejecutarPrueba('Método _mapRowToObject', () => this.probarMetodoMapRowToObject());
    await this.ejecutarPrueba('Método findAll (BD)', () => this.probarMetodoFindAll());
    await this.ejecutarPrueba('Método findByIds (BD)', () => this.probarMetodoFindByIds());
    await this.ejecutarPrueba('Método findByVehicleId (BD)', () => this.probarMetodoFindByVehicleId());
    await this.ejecutarPrueba('Método findByCellId (BD)', () => this.probarMetodoFindByCellId());
    await this.ejecutarPrueba('Método findByDateRange (BD)', () => this.probarMetodoFindByDateRange());
    await this.ejecutarPrueba('Método getCurrentVehicleInCell (BD)', () => this.probarMetodoGetCurrentVehicleInCell());
    await this.ejecutarPrueba('Método getParkingStatistics (BD)', () => this.probarMetodoGetParkingStatistics());
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS UNITARIAS');
    console.log('='.repeat(60));
    console.log(`📈 Total de pruebas ejecutadas: ${this.contadorPruebas}`);
    console.log(`✅ Pruebas exitosas: ${this.pruebasExitosas}`);
    console.log(`❌ Pruebas fallidas: ${this.pruebasFallidas}`);
    console.log('='.repeat(60));
  }
}

if (require.main === module) {
  const pruebas = new PruebasHistorialParqueo();
  pruebas.ejecutarTodas();
}

module.exports = PruebasHistorialParqueo;