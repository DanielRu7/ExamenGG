module.exports = [
  {
    "id": 1,
    "text": "¿Qué es el lenguaje ensamblador?",
    "options": ["Un lenguaje de alto nivel como Python", "Un lenguaje de bajo nivel que usa mnemónicos", "El código binario directo (código máquina)", "Un sistema operativo"],
    "correct": "Un lenguaje de bajo nivel que usa mnemónicos"
  },
  {
    "id": 2,
    "text": "¿Qué herramienta traduce el código ensamblador a código máquina?",
    "options": ["Compilador", "Intérprete", "Ensamblador (Assembler)", "Enlazador (Linker)"],
    "correct": "Ensamblador (Assembler)"
  },
  {
    "id": 3,
    "text": "¿Qué es un mnemónico en ensamblador?",
    "options": ["Un tipo de dato numérico", "Una palabra clave fácil de recordar para una instrucción", "Un error de sintaxis", "Una dirección de memoria"],
    "correct": "Una palabra clave fácil de recordar para una instrucción"
  },
  {
    "id": 4,
    "text": "¿Qué es un registro en la CPU?",
    "options": ["Un archivo de configuración", "Una pequeña unidad de almacenamiento de alta velocidad", "Un dispositivo de entrada/salida", "Una variable en el disco duro"],
    "correct": "Una pequeña unidad de almacenamiento de alta velocidad"
  },
  {
    "id": 5,
    "text": "¿Cuál es el propósito principal de la instrucción 'MOV'?",
    "options": ["Mover el puntero del ratón", "Sumar dos números", "Copiar datos de un lugar a otro (registro o memoria)", "Saltar a otra parte del código"],
    "correct": "Copiar datos de un lugar a otro (registro o memoria)"
  },
  {
    "id": 6,
    "text": "¿Qué hace la instrucción 'ADD AX, BX'?",
    "options": ["Suma AX y BX, guarda el resultado en AX", "Suma AX y BX, guarda el resultado en BX", "Mueve AX a BX", "Compara AX y BX"],
    "correct": "Suma AX y BX, guarda el resultado en AX"
  },
  {
    "id": 7,
    "text": "La instrucción 'JMP' (Jump) realiza un...",
    "options": ["Salto condicional", "Salto incondicional", "Llamada a una función", "Interrupción del sistema"],
    "correct": "Salto incondicional"
  },
  {
    "id": 8,
    "text": "¿Qué instrucción se usa comúnmente ANTES de un salto condicional (como JE o JNE)?",
    "options": ["MOV", "PUSH", "CMP (Compare)", "ADD"],
    "correct": "CMP (Compare)"
  },
  {
    "id": 9,
    "text": "¿Qué es la 'Pila' (Stack) en ensamblador?",
    "options": ["Un tipo de dato de texto", "Una estructura de datos LIFO (Último en Entrar, Primero en Salir)", "Un registro principal de la CPU", "Un archivo de log"],
    "correct": "Una estructura de datos LIFO (Último en Entrar, Primero en Salir)"
  },
  {
    "id": 10,
    "text": "¿Qué instrucción se usa para guardar un valor en la Pila (Stack)?",
    "options": ["PUSH", "POP", "SAVE", "STORE"],
    "correct": "PUSH"
  },
  {
    "id": 11,
    "text": "¿Qué instrucción se usa para recuperar un valor de la Pila (Stack)?",
    "options": ["PUSH", "POP", "GET", "LOAD"],
    "correct": "POP"
  },
  {
    "id": 12,
    "text": "¿Qué hace la instrucción 'INT' (Interrupt)?",
    "options": ["Define un número entero (integer)", "Invierte el valor de un bit", "Genera una interrupción de software (llamada al S.O.)", "Incrementa un registro"],
    "correct": "Genera una interrupción de software (llamada al S.O.)"
  },
  {
    "id": 13,
    "text": "En la instrucción 'MOV AX, 5', ¿qué tipo de direccionamiento se usa para el '5'?",
    "options": ["Direccionamiento directo", "Direccionamiento indirecto", "Direccionamiento inmediato", "Direccionamiento por registro"],
    "correct": "Direccionamiento inmediato"
  },
  {
    "id": 14,
    "text": "¿Cuál es la relación entre el lenguaje ensamblador y el código máquina?",
    "options": ["Son lo mismo", "El ensamblador es una abstracción más legible del código máquina", "El código máquina es una abstracción del ensamblador", "No tienen relación"],
    "correct": "El ensamblador es una abstracción más legible del código máquina"
  },
  {
    "id": 15,
    "text": "¿Qué hace la instrucción 'SUB'?",
    "options": ["Define una subrutina", "Resta dos valores", "Sustituye texto", "Verifica si un valor es subterráneo"],
    "correct": "Resta dos valores"
  },
  {
    "id": 16,
    "text": "Si 'CMP AX, BX' se ejecuta y AX es igual a BX, ¿qué bandera (flag) de estado se activa?",
    "options": ["Bandera de Acarreo (Carry Flag)", "Bandera Cero (Zero Flag)", "Bandera de Signo (Sign Flag)", "Bandera de Desbordamiento (Overflow Flag)"],
    "correct": "Bandera Cero (Zero Flag)"
  }
];