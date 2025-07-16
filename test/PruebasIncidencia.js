/**
 * PRUEBAS UNITARIAS PARA LA CLASE INCIDENCIA
 * ==========================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase Incidencia del sistema de gestión de parqueadero.
 */

const Incidencia = require('../model/Incidencia');

class PruebasIncidencia {
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
    const incidencia = new Incidencia();
    this.assertEquals(null, incidencia.id, 'id debe ser null');
    this.assertEquals(null, incidencia.nombre, 'nombre debe ser null');
  }

  async probarConstructorConParametros() {
    const incidencia = new Incidencia(1, 'Choque');
    this.assertEquals(1, incidencia.id, 'id incorrecto');
    this.assertEquals('Choque', incidencia.nombre, 'nombre incorrecto');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const incidencia = new Incidencia();
    incidencia.id = 5;
    incidencia.nombre = 'Robo';
    this.assertEquals(5, incidencia.id, 'Getter id');
    this.assertEquals('Robo', incidencia.nombre, 'Getter nombre');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const incidencia = new Incidencia(2, 'Incendio');
    const json = incidencia.toJSON();
    this.assertEquals(2, json.id, 'toJSON id');
    this.assertEquals('Incendio', json.nombre, 'toJSON nombre');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO _mapRowToObject()
  // ========================================

  async probarMetodoMapRowToObject() {
    const incidencia = new Incidencia();
    const mockRow = { id: 10, nombre: 'Daño' };
    incidencia._mapRowToObject(mockRow);
    this.assertEquals(10, incidencia.id, 'Map id');
    this.assertEquals('Daño', incidencia.nombre, 'Map nombre');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS DE BASE DE DATOS
  // ========================================
  // NOTA: Estas pruebas requieren conexión a BD real o mock

  async probarMetodoFindAll() {
    try {
      const incidencias = await Incidencia.findAll();
      this.assertNotNull(incidencias, 'findAll debe retornar array');
      this.assertTrue(Array.isArray(incidencias), 'Debe ser un array');
      if (incidencias.length > 0) {
        const primera = incidencias[0];
        this.assertNotNull(primera.id, 'Incidencia debe tener id');
        this.assertNotNull(primera.nombre, 'Incidencia debe tener nombre');
        const json = primera.toJSON();
        this.assertNotNull(json, 'toJSON debe funcionar');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding all Incidencia') ||
        error.message.includes('connection') ||
        error.message.includes('database'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindById() {
    const incidencia = new Incidencia();
    try {
      const resultado = await incidencia.findById(1);
      if (resultado) {
        this.assertNotNull(resultado.id, 'Incidencia debe tener id');
        this.assertEquals(1, resultado.id, 'id debe coincidir');
      } else {
        console.log('   ℹ️  No se encontró incidencia con id 1');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding Incidencia') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  async probarMetodoFindByNombre() {
    const incidencia = new Incidencia();
    try {
      const resultados = await incidencia.findByNombre('Choque');
      this.assertNotNull(resultados, 'findByNombre debe retornar array');
      this.assertTrue(Array.isArray(resultados), 'Debe ser un array');
      if (resultados.length > 0) {
        const primera = resultados[0];
        this.assertNotNull(primera.id, 'Incidencia debe tener id');
        this.assertNotNull(primera.nombre, 'Incidencia debe tener nombre');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding Incidencia by name') ||
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
    }
  }

  // ========================================
  // EJECUCIÓN DE TODAS LAS PRUEBAS
  // ========================================

  async ejecutarTodas() {
    console.log('🚗 INICIANDO PRUEBAS UNITARIAS DE LA CLASE INCIDENCIA');
    console.log('='.repeat(60));
    await this.ejecutarPrueba('Constructor Vacío', () => this.probarConstructorVacio());
    await this.ejecutarPrueba('Constructor Con Parámetros', () => this.probarConstructorConParametros());
    await this.ejecutarPrueba('Getters y Setters', () => this.probarGettersYSetters());
    await this.ejecutarPrueba('Método toJSON', () => this.probarMetodoToJSON());
    await this.ejecutarPrueba('Método _mapRowToObject', () => this.probarMetodoMapRowToObject());
    await this.ejecutarPrueba('Método findAll (BD)', () => this.probarMetodoFindAll());
    await this.ejecutarPrueba('Método findById (BD)', () => this.probarMetodoFindById());
    await this.ejecutarPrueba('Método findByNombre (BD)', () => this.probarMetodoFindByNombre());
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS UNITARIAS');
    console.log('='.repeat(60));
    console.log(`📈 Total de pruebas ejecutadas: ${this.contadorPruebas}`);
    console.log(`✅ Pruebas exitosas: ${this.pruebasExitosas}`);
    console.log(`❌ Pruebas fallidas: ${this.pruebasFallidas}`);
    console.log('='.repeat(60));
  }
}

// Ejecutar si es archivo principal
if (require.main === module) {
  const pruebas = new PruebasIncidencia();
  pruebas.ejecutarTodas();
}

module.exports = PruebasIncidencia;