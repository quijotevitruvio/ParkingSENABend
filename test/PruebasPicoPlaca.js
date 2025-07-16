/**
 * PRUEBAS UNITARIAS PARA LA CLASE PICOPLACA
 * =====================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase PicoPlaca del sistema de gestión de parqueadero.
 */

const { PicoPlaca } = require('../model');

class PruebasPicoPlaca {
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
    const pico = new PicoPlaca();
    this.assertEquals(null, pico.id, 'id debe ser null');
    this.assertEquals(null, pico.tipo_vehiculo, 'tipo_vehiculo debe ser null');
    this.assertEquals(null, pico.numero, 'numero debe ser null');
    this.assertEquals(null, pico.dia, 'dia debe ser null');
  }

  async probarConstructorConParametros() {
    const pico = new PicoPlaca(1, 'Carro', 5, 'Lunes');
    this.assertEquals(1, pico.id, 'id incorrecto');
    this.assertEquals('Carro', pico.tipo_vehiculo, 'tipo_vehiculo incorrecto');
    this.assertEquals(5, pico.numero, 'numero incorrecto');
    this.assertEquals('Lunes', pico.dia, 'dia incorrecto');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const pico = new PicoPlaca();
    pico.id = 10;
    pico.tipo_vehiculo = 'Moto';
    pico.numero = 7;
    pico.dia = 'Martes';
    this.assertEquals(10, pico.id, 'Getter id');
    this.assertEquals('Moto', pico.tipo_vehiculo, 'Getter tipo_vehiculo');
    this.assertEquals(7, pico.numero, 'Getter numero');
    this.assertEquals('Martes', pico.dia, 'Getter dia');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const pico = new PicoPlaca(2, 'Carro', 8, 'Viernes');
    const json = pico.toJSON();
    this.assertEquals(2, json.id, 'toJSON id');
    this.assertEquals('Carro', json.tipo_vehiculo, 'toJSON tipo_vehiculo');
    this.assertEquals(8, json.numero, 'toJSON numero');
    this.assertEquals('Viernes', json.dia, 'toJSON dia');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS CRUD (requieren BD)
  // ========================================

  async probarCreateFindUpdateDelete() {
    // Crear
    const pico = new PicoPlaca(null, 'Carro', 9, 'Sabado');
    await pico.create();
    this.assertNotNull(pico.id, 'id debe asignarse tras create');

    // Buscar por ID
    const buscado = new PicoPlaca();
    await buscado.findById(pico.id);
    this.assertEquals('Carro', buscado.tipo_vehiculo, 'findById tipo_vehiculo');

    // Actualizar
    pico.tipo_vehiculo = 'Moto';
    pico.numero = 0;
    pico.dia = 'Domingo';
    await pico.update();
    const actualizado = new PicoPlaca();
    await actualizado.findById(pico.id);
    this.assertEquals('Moto', actualizado.tipo_vehiculo, 'update tipo_vehiculo');
    this.assertEquals(0, actualizado.numero, 'update numero');
    this.assertEquals('Domingo', actualizado.dia, 'update dia');

    // Eliminar
    const eliminado = await pico.delete();
    this.assertTrue(eliminado, 'delete debe retornar true');
    const trasEliminar = new PicoPlaca();
    const resultado = await trasEliminar.findById(pico.id);
    this.assertNull(resultado, 'PicoPlaca debe ser null tras eliminar');
  }

  async probarFindAllYFiltros() {
    // Insertar dos reglas
    const p1 = new PicoPlaca(null, 'Carro', 1, 'Lunes');
    const p2 = new PicoPlaca(null, 'Moto', 2, 'Martes');
    await p1.create();
    await p2.create();

    // Buscar todos
    const todos = await PicoPlaca.findAll();
    this.assertTrue(Array.isArray(todos), 'findAll debe retornar array');
    this.assertTrue(todos.length > 0, 'findAll debe retornar elementos');

    // Buscar por tipo y día
    const porTipoDia = await PicoPlaca.findByVehicleTypeAndDay('Carro', 'Lunes');
    this.assertTrue(Array.isArray(porTipoDia), 'findByVehicleTypeAndDay debe retornar array');
    this.assertTrue(porTipoDia.length >= 1, 'findByVehicleTypeAndDay debe retornar al menos 1');

    // Buscar por número y día
    const porNumeroDia = await PicoPlaca.findByNumberAndDay(2, 'Martes');
    this.assertTrue(Array.isArray(porNumeroDia), 'findByNumberAndDay debe retornar array');
    this.assertTrue(porNumeroDia.length >= 1, 'findByNumberAndDay debe retornar al menos 1');

    // Limpiar
    await p1.delete();
    await p2.delete();
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
  const pruebas = new PruebasPicoPlaca();
  pruebas.ejecutarTodas();
}

module.exports = PruebasPicoPlaca;
