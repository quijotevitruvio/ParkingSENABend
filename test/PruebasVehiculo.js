/**
 * PRUEBAS UNITARIAS PARA LA CLASE VEHICULO
 * =====================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase Vehiculo del sistema de gestión de parqueadero.
 */

const { Vehiculo } = require('../model');

class PruebasVehiculo {
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
    const vehiculo = new Vehiculo();
    this.assertEquals(null, vehiculo.id, 'ID debe ser null');
    this.assertEquals(null, vehiculo.placa, 'Placa debe ser null');
    this.assertEquals(null, vehiculo.color, 'Color debe ser null');
    this.assertEquals(null, vehiculo.modelo, 'Modelo debe ser null');
    this.assertEquals(null, vehiculo.marca, 'Marca debe ser null');
    this.assertEquals(null, vehiculo.tipo, 'Tipo debe ser null');
    this.assertEquals(null, vehiculo.usuario_id_usuario, 'Usuario ID debe ser null');
  }

  async probarConstructorConParametros() {
    const vehiculo = new Vehiculo(1, 'ABC123', 'Rojo', '2020', 'Toyota', 'Carro', 5);
    this.assertEquals(1, vehiculo.id, 'ID incorrecto');
    this.assertEquals('ABC123', vehiculo.placa, 'Placa incorrecta');
    this.assertEquals('Rojo', vehiculo.color, 'Color incorrecto');
    this.assertEquals('2020', vehiculo.modelo, 'Modelo incorrecto');
    this.assertEquals('Toyota', vehiculo.marca, 'Marca incorrecta');
    this.assertEquals('Carro', vehiculo.tipo, 'Tipo incorrecto');
    this.assertEquals(5, vehiculo.usuario_id_usuario, 'Usuario ID incorrecto');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const vehiculo = new Vehiculo();
    vehiculo.id = 10;
    vehiculo.placa = 'XYZ789';
    vehiculo.color = 'Azul';
    vehiculo.modelo = '2018';
    vehiculo.marca = 'Mazda';
    vehiculo.tipo = 'Moto';
    vehiculo.usuario_id_usuario = 3;
    this.assertEquals(10, vehiculo.id, 'Getter ID');
    this.assertEquals('XYZ789', vehiculo.placa, 'Getter placa');
    this.assertEquals('Azul', vehiculo.color, 'Getter color');
    this.assertEquals('2018', vehiculo.modelo, 'Getter modelo');
    this.assertEquals('Mazda', vehiculo.marca, 'Getter marca');
    this.assertEquals('Moto', vehiculo.tipo, 'Getter tipo');
    this.assertEquals(3, vehiculo.usuario_id_usuario, 'Getter usuario_id_usuario');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const vehiculo = new Vehiculo(2, 'DEF456', 'Negro', '2022', 'Kia', 'Carro', 7);
    const json = vehiculo.toJSON();
    this.assertEquals(2, json.id, 'toJSON id');
    this.assertEquals('DEF456', json.placa, 'toJSON placa');
    this.assertEquals('Negro', json.color, 'toJSON color');
    this.assertEquals('2022', json.modelo, 'toJSON modelo');
    this.assertEquals('Kia', json.marca, 'toJSON marca');
    this.assertEquals('Carro', json.tipo, 'toJSON tipo');
    this.assertEquals(7, json.usuario_id_usuario, 'toJSON usuario_id_usuario');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS CRUD (requieren BD)
  // ========================================

  async probarCreateFindUpdateDelete() {
    // Crear
    const vehiculo = new Vehiculo(null, 'TEST123', 'Verde', '2019', 'Renault', 'Carro', 1);
    await vehiculo.create();
    this.assertNotNull(vehiculo.id, 'ID debe asignarse tras create');

    // Buscar por ID
    const vehiculoBuscado = new Vehiculo();
    await vehiculoBuscado.findById(vehiculo.id);
    this.assertEquals('TEST123', vehiculoBuscado.placa, 'findById placa');

    // Buscar por placa
    const vehiculoPorPlaca = new Vehiculo();
    await vehiculoPorPlaca.findByPlaca('TEST123');
    this.assertEquals('Verde', vehiculoPorPlaca.color, 'findByPlaca color');

    // Actualizar
    vehiculo.color = 'Amarillo';
    await vehiculo.update();
    const vehiculoActualizado = new Vehiculo();
    await vehiculoActualizado.findById(vehiculo.id);
    this.assertEquals('Amarillo', vehiculoActualizado.color, 'update color');

    // Eliminar
    const eliminado = await vehiculo.delete();
    this.assertTrue(eliminado, 'delete debe retornar true');
    const vehiculoEliminado = new Vehiculo();
    const resultado = await vehiculoEliminado.findById(vehiculo.id);
    this.assertNull(resultado, 'Vehiculo debe ser null tras eliminar');
  }

  async probarFindAllYFindByUserId() {
    // Insertar dos vehículos para el usuario 2
    const v1 = new Vehiculo(null, 'FINDALL1', 'Gris', '2017', 'Chevrolet', 'Carro', 2);
    const v2 = new Vehiculo(null, 'FINDALL2', 'Blanco', '2016', 'Ford', 'Moto', 2);
    await v1.create();
    await v2.create();

    // Buscar todos
    const todos = await Vehiculo.findAll();
    this.assertTrue(Array.isArray(todos), 'findAll debe retornar array');
    this.assertTrue(todos.length > 0, 'findAll debe retornar elementos');

    // Buscar por usuario
    const porUsuario = await Vehiculo.findByUserId(2);
    this.assertTrue(Array.isArray(porUsuario), 'findByUserId debe retornar array');
    this.assertTrue(porUsuario.length >= 2, 'findByUserId debe retornar al menos 2');

    // Limpiar
    await v1.delete();
    await v2.delete();
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
    await this.ejecutarPrueba('findAll y findByUserId', this.probarFindAllYFindByUserId.bind(this));

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
  const pruebas = new PruebasVehiculo();
  pruebas.ejecutarTodas();
}

module.exports = PruebasVehiculo;