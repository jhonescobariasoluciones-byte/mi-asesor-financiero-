// logic.test.js
import { state, agregarItem, actualizarBalance } from './logic.js';

// 'describe' agrupa un conjunto de pruebas relacionadas.
describe('Pruebas para la Lógica Financiera', () => {

  // 'beforeEach' se ejecuta ANTES de cada prueba ('it').
  // Lo usamos para resetear los datos y asegurar que cada prueba sea independiente.
  beforeEach(() => {
    state.ingresos = [];
    state.egresos = [];
    state.balance = 0;
    state.porcentajeEgresos = -1;
  });

  // 'it' define una prueba individual.
  it('debería agregar un ingreso correctamente al estado', () => {
    // 1. Preparación (Arrange)
    const tipo = 'ingresos';
    const descripcion = 'Salario';
    const valor = 2000;

    // 2. Actuación (Act)
    agregarItem(tipo, descripcion, valor);

    // 3. Verificación (Assert)
    expect(state.ingresos.length).toBe(1);
    expect(state.ingresos[0].descripcion).toBe('Salario');
    expect(state.ingresos[0].valor).toBe(2000);
  });

  it('debería agregar un egreso correctamente al estado', () => {
    agregarItem('egresos', 'Renta', 500);
    expect(state.egresos.length).toBe(1);
    expect(state.egresos[0].descripcion).toBe('Renta');
  });

  it('debería calcular el balance correctamente (ingresos > egresos)', () => {
    agregarItem('ingresos', 'Salario', 2000);
    agregarItem('egresos', 'Renta', 500);

    actualizarBalance();

    expect(state.balance).toBe(1500); // 2000 - 500 = 1500
  });

  it('debería calcular el porcentaje de egresos correctamente', () => {
    agregarItem('ingresos', 'Salario', 1000);
    agregarItem('egresos', 'Comida', 250);

    actualizarBalance();

    // El porcentaje de egresos es (250 / 1000) * 100 = 25
    expect(state.porcentajeEgresos).toBe(25);
  });
});