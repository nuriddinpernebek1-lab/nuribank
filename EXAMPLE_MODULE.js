/**
 * ПРИМЕР: Правильный способ создавать модули для SPA
 * 
 * Этот файл показывает как ПРАВИЛЬНО экспортировать модули
 * на глобальный scope window для использования везде
 */

// ====== ПРАВИЛЬНЫЙ СПОСОБ ======

const ExampleModule = (() => {
  // 1. Приватные переменные (доступны только внутри IIFE)
  const privateState = {
    counter: 0,
    data: []
  };

  // 2. Приватные функции (не видны снаружи)
  const incrementCounter = () => {
    privateState.counter++;
  };

  const validateData = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data');
    }
    return true;
  };

  // 3. Публичные методы (видны везде)
  const getCounter = () => privateState.counter;

  const addData = (item) => {
    validateData(item);
    privateState.data.push(item);
    incrementCounter();
    console.log(`✅ Added item #${privateState.counter}`);
    return item;
  };

  const getData = () => [...privateState.data]; // copy, не ссылка

  const reset = () => {
    privateState.counter = 0;
    privateState.data = [];
  };

  // 4. Экспортируем только публичный интерфейс
  return {
    addData,
    getData,
    getCounter,
    reset
  };
})();

// 🔴 КРИТИЧНО: Делаем доступным глобально!
window.ExampleModule = ExampleModule;

// ====== ТЕ­ПЕРЬ ЭТО РАБОТАЕТ ======

// В любом другом файле (если он загружен после этого):
console.log(window.ExampleModule); // ✅ [Object { addData, getData, ... }]
ExampleModule.addData({ name: 'test' }); // ✅ Работает!
console.log(ExampleModule.getCounter()); // ✅ 1

// ====== НЕПРАВИЛЬНЫЕ СПОСОБЫ (ИЗБЕГАТЬ) ======

// ❌ Неправильно: забыли window.XXX
// const WrongModule1 = (() => { return { foo: () => {} }; })();
// // WrongModule1 видна только в текущем файле!

// ❌ Неправильно: использование console.log вместо window
// console.log(WrongModule1); // ReferenceError: WrongModule1 is not defined

// ❌ Неправильно: модульная система (если используем без bundler)
// export const MyModule = (...); // Не работает в простом HTML!

// ❌ Неправильно: не закрывают IIFE
// const BadModule = {
//   foo: () => {},
//   bar: () => {}
// }; // Все члены публичные, нет инкапсуляции

// ====== РЕАЛЬНЫЙ ПРИМЕР ИЗ ПРОЕКТА ======

// API.js:
// const API = (() => { /* ... */ })();
// window.API = API; ✅

// Store.js:
// const Store = (() => { /* ... */ })();
// window.Store = Store; ✅

// HomePage.js:
// const HomePage = {
//   render: () => { /* ... */ },
//   init: () => { /* ... */ }
// };
// window.HomePage = HomePage; ✅

// app.js:
// if (typeof window.Store === 'undefined') { throw new Error('...'); } ✅
// Router.init({ '/': { component: HomePage, ... } }); ✅
