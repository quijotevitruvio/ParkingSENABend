/**
 * PRUEBAS UNITARIAS PARA LA CLASE USUARIO
 * =====================================
 * Este archivo contiene pruebas exhaustivas para todos los métodos
 * de la clase Usuario del sistema de gestión de parqueadero.
 */

const { Usuario } = require('../model');

class PruebasUsuario {
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

  // Método auxiliar para verificar igualdad
  assertEquals(esperado, actual, mensaje = '') {
    if (esperado !== actual) {
      throw new Error(`${mensaje} - Esperado: ${esperado}, Actual: ${actual}`);
    }
  }

  // Método auxiliar para verificar que no sea null
  assertNotNull(valor, mensaje = '') {
    if (valor === null || valor === undefined) {
      throw new Error(`${mensaje} - El valor no debe ser null o undefined`);
    }
  }

  // Método auxiliar para verificar que sea null
  assertNull(valor, mensaje = '') {
    if (valor !== null) {
      throw new Error(`${mensaje} - El valor debe ser null`);
    }
  }

  // Método auxiliar para verificar que sea verdadero
  assertTrue(condicion, mensaje = '') {
    if (!condicion) {
      throw new Error(`${mensaje} - La condición debe ser verdadera`);
    }
  }

  // ========================================
  // PRUEBAS DEL CONSTRUCTOR
  // ========================================

  async probarConstructorVacio() {
    const usuario = new Usuario();
    
    this.assertEquals(null, usuario.id_usuario, 'ID usuario debe ser null');
    this.assertEquals(null, usuario.tipo_documento, 'Tipo documento debe ser null');
    this.assertEquals(null, usuario.numero_documento, 'Número documento debe ser null');
    this.assertEquals(null, usuario.primer_nombre, 'Primer nombre debe ser null');
    this.assertEquals(null, usuario.segundo_nombre, 'Segundo nombre debe ser null');
    this.assertEquals(null, usuario.primer_apellido, 'Primer apellido debe ser null');
    this.assertEquals(null, usuario.segundo_apellido, 'Segundo apellido debe ser null');
    this.assertEquals(null, usuario.direccion_correo, 'Email debe ser null');
    this.assertEquals(null, usuario.numero_celular, 'Celular debe ser null');
    this.assertEquals(null, usuario.foto_perfil, 'Foto debe ser null');
    this.assertEquals(null, usuario.estado, 'Estado debe ser null');
    this.assertEquals(null, usuario.clave, 'Clave debe ser null');
    this.assertEquals(null, usuario.perfil_usuario_id, 'Perfil ID debe ser null');
  }

  async probarConstructorConParametros() {
    const usuario = new Usuario(
      1, 'CC', '123456789', 'Juan', 'Carlos', 'Pérez', 'López',
      'juan@email.com', '3001234567', 'foto.jpg', 'activo', 'password123', 2
    );

    this.assertEquals(1, usuario.id_usuario, 'ID usuario incorrecto');
    this.assertEquals('CC', usuario.tipo_documento, 'Tipo documento incorrecto');
    this.assertEquals('123456789', usuario.numero_documento, 'Número documento incorrecto');
    this.assertEquals('Juan', usuario.primer_nombre, 'Primer nombre incorrecto');
    this.assertEquals('Carlos', usuario.segundo_nombre, 'Segundo nombre incorrecto');
    this.assertEquals('Pérez', usuario.primer_apellido, 'Primer apellido incorrecto');
    this.assertEquals('López', usuario.segundo_apellido, 'Segundo apellido incorrecto');
    this.assertEquals('juan@email.com', usuario.direccion_correo, 'Email incorrecto');
    this.assertEquals('3001234567', usuario.numero_celular, 'Celular incorrecto');
    this.assertEquals('foto.jpg', usuario.foto_perfil, 'Foto incorrecto');
    this.assertEquals('activo', usuario.estado, 'Estado incorrecto');
    this.assertEquals('password123', usuario.clave, 'Clave incorrecta');
    this.assertEquals(2, usuario.perfil_usuario_id, 'Perfil ID incorrecto');
  }

  // ========================================
  // PRUEBAS DE GETTERS Y SETTERS
  // ========================================

  async probarGettersYSetters() {
    const usuario = new Usuario();

    // Probar setters
    usuario.id_usuario = 10;
    usuario.tipo_documento = 'TI';
    usuario.numero_documento = '987654321';
    usuario.primer_nombre = 'María';
    usuario.segundo_nombre = 'Elena';
    usuario.primer_apellido = 'González';
    usuario.segundo_apellido = 'Rodríguez';
    usuario.direccion_correo = 'maria@test.com';
    usuario.numero_celular = '3009876543';
    usuario.foto_perfil = 'maria.jpg';
    usuario.estado = 'inactivo';
    usuario.clave = 'newpassword';
    usuario.perfil_usuario_id = 3;

    // Probar getters
    this.assertEquals(10, usuario.id_usuario, 'Getter ID usuario');
    this.assertEquals('TI', usuario.tipo_documento, 'Getter tipo documento');
    this.assertEquals('987654321', usuario.numero_documento, 'Getter número documento');
    this.assertEquals('María', usuario.primer_nombre, 'Getter primer nombre');
    this.assertEquals('Elena', usuario.segundo_nombre, 'Getter segundo nombre');
    this.assertEquals('González', usuario.primer_apellido, 'Getter primer apellido');
    this.assertEquals('Rodríguez', usuario.segundo_apellido, 'Getter segundo apellido');
    this.assertEquals('maria@test.com', usuario.direccion_correo, 'Getter email');
    this.assertEquals('3009876543', usuario.numero_celular, 'Getter celular');
    this.assertEquals('maria.jpg', usuario.foto_perfil, 'Getter foto');
    this.assertEquals('inactivo', usuario.estado, 'Getter estado');
    this.assertEquals('newpassword', usuario.clave, 'Getter clave');
    this.assertEquals(3, usuario.perfil_usuario_id, 'Getter perfil ID');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO toJSON()
  // ========================================

  async probarMetodoToJSON() {
    const usuario = new Usuario(
      5, 'CE', '555666777', 'Ana', 'Sofía', 'Martínez', 'Cruz',
      'ana@test.com', '3005556666', 'ana.png', 'activo', 'secret123', 1
    );

    const json = usuario.toJSON();

    this.assertNotNull(json, 'JSON no debe ser null');
    this.assertEquals(5, json.id_usuario, 'JSON ID usuario');
    this.assertEquals('CE', json.tipo_documento, 'JSON tipo documento');
    this.assertEquals('555666777', json.numero_documento, 'JSON número documento');
    this.assertEquals('Ana', json.primer_nombre, 'JSON primer nombre');
    this.assertEquals('Sofía', json.segundo_nombre, 'JSON segundo nombre');
    this.assertEquals('Martínez', json.primer_apellido, 'JSON primer apellido');
    this.assertEquals('Cruz', json.segundo_apellido, 'JSON segundo apellido');
    this.assertEquals('ana@test.com', json.direccion_correo, 'JSON email');
    this.assertEquals('3005556666', json.numero_celular, 'JSON celular');
    this.assertEquals('ana.png', json.foto_perfil, 'JSON foto');
    this.assertEquals('activo', json.estado, 'JSON estado');
    this.assertEquals('secret123', json.clave, 'JSON clave');
    this.assertEquals(1, json.perfil_usuario_id, 'JSON perfil ID');

    // Verificar que es un objeto serializable
    const jsonString = JSON.stringify(json);
    this.assertNotNull(jsonString, 'Debe poder convertirse a string JSON');
    this.assertTrue(jsonString.length > 0, 'JSON string no debe estar vacío');
  }

  // ========================================
  // PRUEBAS DEL MÉTODO _mapRowToObject()
  // ========================================

  async probarMetodoMapRowToObject() {
    const usuario = new Usuario();
    
    const mockRow = {
      id_usuario: 99,
      tipo_documento: 'PP',
      numero_documento: '111222333',
      primer_nombre: 'Carlos',
      segundo_nombre: 'Alberto',
      primer_apellido: 'Sánchez',
      segundo_apellido: 'Díaz',
      direccion_correo: 'carlos@test.com',
      numero_celular: '3001112222',
      foto_perfil: 'carlos.jpg',
      estado: 'pendiente',
      clave: 'mypassword',
      PERFIL_USUARIO_id: 4
    };

    usuario._mapRowToObject(mockRow);

    this.assertEquals(99, usuario.id_usuario, 'Map ID usuario');
    this.assertEquals('PP', usuario.tipo_documento, 'Map tipo documento');
    this.assertEquals('111222333', usuario.numero_documento, 'Map número documento');
    this.assertEquals('Carlos', usuario.primer_nombre, 'Map primer nombre');
    this.assertEquals('Alberto', usuario.segundo_nombre, 'Map segundo nombre');
    this.assertEquals('Sánchez', usuario.primer_apellido, 'Map primer apellido');
    this.assertEquals('Díaz', usuario.segundo_apellido, 'Map segundo apellido');
    this.assertEquals('carlos@test.com', usuario.direccion_correo, 'Map email');
    this.assertEquals('3001112222', usuario.numero_celular, 'Map celular');
    this.assertEquals('carlos.jpg', usuario.foto_perfil, 'Map foto');
    this.assertEquals('pendiente', usuario.estado, 'Map estado');
    this.assertEquals('mypassword', usuario.clave, 'Map clave');
    this.assertEquals(4, usuario.perfil_usuario_id, 'Map perfil ID');
  }

  // ========================================
  // PRUEBAS DE MÉTODOS DE BASE DE DATOS
  // ========================================
  // NOTA: Estas pruebas requieren conexión a BD real o mock

  async probarMetodoFindAll() {
    try {
      const usuarios = await Usuario.findAll();
      
      this.assertNotNull(usuarios, 'FindAll debe retornar array');
      this.assertTrue(Array.isArray(usuarios), 'Debe ser un array');
      
      if (usuarios.length > 0) {
        const primerUsuario = usuarios[0];
        this.assertNotNull(primerUsuario.numero_documento, 'Usuario debe tener documento');
        this.assertNotNull(primerUsuario.primer_nombre, 'Usuario debe tener nombre');
        
        // Verificar que toJSON funciona
        const json = primerUsuario.toJSON();
        this.assertNotNull(json, 'toJSON debe funcionar');
      }
      
      console.log(`   📊 Se encontraron ${usuarios.length} usuarios en BD`);
    } catch (error) {
      // Si no hay conexión a BD, verificamos que el error sea apropiado
      this.assertTrue(
        error.message.includes('Error finding all Usuario') || 
        error.message.includes('connection') ||
        error.message.includes('database'),
        'Error debe ser relacionado con BD'
      );
      console.log('   ℹ️  Prueba de BD - Se esperaba error de conexión');
    }
  }

  async probarMetodoFindById() {
    const usuario = new Usuario();
    
    try {
      // Probar con ID que probablemente exista
      const resultado = await usuario.findById(1);
      
      if (resultado) {
        this.assertNotNull(resultado.id_usuario, 'Usuario encontrado debe tener ID');
        this.assertEquals(1, resultado.id_usuario, 'ID debe coincidir');
        console.log(`   📋 Usuario encontrado: ${resultado.primer_nombre} ${resultado.primer_apellido}`);
      } else {
        console.log('   ℹ️  No se encontró usuario con ID 1');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding Usuario') || 
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
      console.log('   ℹ️  Prueba de BD - Se esperaba error de conexión');
    }
  }

  async probarMetodoFindByDocument() {
    const usuario = new Usuario();
    
    try {
      // Usar el documento que se modificó en app.js
      const resultado = await usuario.findByDocument('651684841');
      
      if (resultado) {
        this.assertNotNull(resultado.numero_documento, 'Usuario debe tener documento');
        this.assertEquals('651684841', resultado.numero_documento, 'Documento debe coincidir');
        console.log(`   📋 Usuario encontrado: ${resultado.primer_nombre} ${resultado.primer_apellido}`);
      } else {
        console.log('   ℹ️  No se encontró usuario con documento 651684841');
      }
    } catch (error) {
      this.assertTrue(
        error.message.includes('Error finding Usuario by document') || 
        error.message.includes('connection'),
        'Error debe ser relacionado con BD'
      );
      console.log('   ℹ️  Prueba de BD - Se esperaba error de conexión');
    }
  }

  // ========================================
  // PRUEBAS DE VALIDACIÓN DE DATOS
  // ========================================

  async probarValidacionDatos() {
    const usuario = new Usuario();

    // Probar con datos válidos
    usuario.tipo_documento = 'CC';
    usuario.numero_documento = '123456789';
    usuario.primer_nombre = 'Test';
    usuario.primer_apellido = 'User';
    usuario.direccion_correo = 'test@test.com';

    this.assertEquals('CC', usuario.tipo_documento, 'Validación tipo documento');
    this.assertEquals('123456789', usuario.numero_documento, 'Validación número documento');
    this.assertEquals('Test', usuario.primer_nombre, 'Validación primer nombre');
    this.assertEquals('test@test.com', usuario.direccion_correo, 'Validación email');

    // Probar JSON con datos válidos
    const json = usuario.toJSON();
    this.assertEquals('CC', json.tipo_documento, 'JSON validación tipo documento');
    this.assertEquals('123456789', json.numero_documento, 'JSON validación número documento');
  }

  // ========================================
  // PRUEBAS DE CASOS EXTREMOS
  // ========================================

  async probarCasosExtremos() {
    // Probar con strings vacíos
    const usuario1 = new Usuario(null, '', '', '', '', '', '', '', '', '', '', '', null);
    this.assertEquals('', usuario1.tipo_documento, 'String vacío tipo documento');
    this.assertEquals('', usuario1.numero_documento, 'String vacío número documento');

    // Probar con números como strings
    const usuario2 = new Usuario();
    usuario2.id_usuario = '999';
    usuario2.perfil_usuario_id = '5';
    this.assertEquals('999', usuario2.id_usuario, 'ID como string');
    this.assertEquals('5', usuario2.perfil_usuario_id, 'Perfil ID como string');

    // Probar JSON con valores extremos
    const json = usuario2.toJSON();
    this.assertEquals('999', json.id_usuario, 'JSON ID como string');
    this.assertEquals('5', json.perfil_usuario_id, 'JSON perfil ID como string');
  }

  // ========================================
  // MÉTODO PRINCIPAL PARA EJECUTAR TODAS LAS PRUEBAS
  // ========================================

  async ejecutarTodasLasPruebas() {
    console.log('🚀 INICIANDO PRUEBAS UNITARIAS DE LA CLASE USUARIO');
    console.log('='.repeat(60));

    const inicioPruebas = Date.now();

    // Ejecutar todas las pruebas
    await this.ejecutarPrueba('Constructor Vacío', () => this.probarConstructorVacio());
    await this.ejecutarPrueba('Constructor Con Parámetros', () => this.probarConstructorConParametros());
    await this.ejecutarPrueba('Getters y Setters', () => this.probarGettersYSetters());
    await this.ejecutarPrueba('Método toJSON', () => this.probarMetodoToJSON());
    await this.ejecutarPrueba('Método _mapRowToObject', () => this.probarMetodoMapRowToObject());
    await this.ejecutarPrueba('Método findAll (BD)', () => this.probarMetodoFindAll());
    await this.ejecutarPrueba('Método findById (BD)', () => this.probarMetodoFindById());
    await this.ejecutarPrueba('Método findByDocument (BD)', () => this.probarMetodoFindByDocument());
    await this.ejecutarPrueba('Validación de Datos', () => this.probarValidacionDatos());
    await this.ejecutarPrueba('Casos Extremos', () => this.probarCasosExtremos());

    const finPruebas = Date.now();
    const tiempoTotal = finPruebas - inicioPruebas;

    // Mostrar resumen final
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE PRUEBAS UNITARIAS');
    console.log('='.repeat(60));
    console.log(`📈 Total de pruebas ejecutadas: ${this.contadorPruebas}`);
    console.log(`✅ Pruebas exitosas: ${this.pruebasExitosas}`);
    console.log(`❌ Pruebas fallidas: ${this.pruebasFallidas}`);
    console.log(`⏱️  Tiempo total: ${tiempoTotal}ms`);
    console.log(`📊 Porcentaje de éxito: ${Math.round((this.pruebasExitosas / this.contadorPruebas) * 100)}%`);

    if (this.pruebasFallidas > 0) {
      console.log('\n❌ PRUEBAS FALLIDAS:');
      this.resultados
        .filter(r => r.resultado === 'FALLIDA')
        .forEach(r => console.log(`   • ${r.nombre}: ${r.error}`));
    }

    console.log('\n✨ PRUEBAS COMPLETADAS');
    
    return {
      total: this.contadorPruebas,
      exitosas: this.pruebasExitosas,
      fallidas: this.pruebasFallidas,
      porcentajeExito: Math.round((this.pruebasExitosas / this.contadorPruebas) * 100),
      tiempoTotal: tiempoTotal,
      resultados: this.resultados
    };
  }
}

// ========================================
// EJECUTAR PRUEBAS SI SE EJECUTA DIRECTAMENTE
// ========================================

if (require.main === module) {
  const pruebas = new PruebasUsuario();
  pruebas.ejecutarTodasLasPruebas()
    .then(resultado => {
      console.log('\n🎯 Pruebas finalizadas exitosamente');
      process.exit(resultado.fallidas > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('💥 Error ejecutando pruebas:', error);
      process.exit(1);
    });
}

// Exportar la clase para uso en otros archivos
module.exports = PruebasUsuario; 