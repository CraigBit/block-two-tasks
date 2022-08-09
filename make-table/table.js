// Вывести таблицу умножения в консоль

function makeTable(num) {
  // все числа таблицы
  let allTableDigits = makeDigitsArray(num);

  // массив для столбиков таблицы
  let tableColumns = [];

  // длина ряда таблицы
  let rowLength = num;

  // будущая таблица
  let finalTable = '';

  // (1) Столбики таблицы

  // делаем сами столбики
  for (let i = 0; i < allTableDigits.length; i += rowLength) {
    tableColumns.push(allTableDigits.slice(i, i + rowLength));
  }

  // выравниваем цифры в столбиках по правому краю
  tableColumns = makePaddedColumns(tableColumns, rowLength);

  // (2) Шапка таблицы

  // вычисляем длину пробела для шапки
  let headerSpace = makeHeaderSpace(tableColumns[0]);

  // делаем разделитель шапки
  let tableDivider = makeTableDivider(tableColumns);

  // выводим шапку
  for (let i = 0; i < 1; i++) {
    // сначала пробел
    finalTable += headerSpace;

    // потом цифры
    for (let j = 0; j < rowLength; j++) {
      finalTable += tableColumns[j][i] + ' ';
    }
    // затем разделить
    finalTable += '\n' + tableDivider + '\n';
  }

  // (3) Тело таблицы

  // берем множители рядов
  let rowValue = tableColumns[0];

  // выводим тело таблицы
  for (let i = 0; i < rowLength; i++) {
    // множитель ряда с разделителем
    finalTable += `${rowValue[i]}|`;

    // остальная часть ряда с произведениями
    for (let j = 0; j < allTableDigits.length / rowLength; j++) {
      finalTable += `${tableColumns[j][i]} `;
    }

    // перевод строки в конце каждого ряда
    finalTable += '\n';
  }

  // (4) Вывод в консоль
  console.log(finalTable);
}

makeTable(17);

//--------------------------------- Вспомогательные методы: ----------------------------------//

// 1) сбор всех чисел таблицы в массив и превращение их в строки

function makeDigitsArray(num) {
  let digitsArray = [];

  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      digitsArray.push(String(i * j));
    }
  }

  return digitsArray;
}

// 2) сделать отступы для чисел в столбике
function makePaddedColumns(columns, num) {
  let paddedColumns = [];

  for (let i = 0; i < num; i++) {
    let column = columns[i];
    let paddedColumn = column.map((digit) => {
      const lastDigitLength = column[column.length - 1].length;
      if (typeof column != 'undefined') {
        if (digit.length < lastDigitLength) {
          let paddedDigit = digit.padStart(lastDigitLength);
          return paddedDigit;
        } else {
          return digit;
        }
      }
    });

    paddedColumns.push(paddedColumn);
  }

  return paddedColumns;
}

// 3) сделать пробел для шапки
function makeHeaderSpace(multiplierColumn) {
  let lastMultiplier = multiplierColumn[multiplierColumn.length - 1];

  let length = lastMultiplier.length;

  let headerSpace = lastMultiplier.replace(
    lastMultiplier,
    ' '.repeat(length + 1)
  );

  return headerSpace;
}

// 4) сделать разделитель шапки
function makeTableDivider(columns) {
  let lastRow = [];

  for (let i = 0; i < columns.length; i++) {
    lastRow.push(columns[i][columns[i].length - 1]);
  }

  let lastItem = lastRow[lastRow.length - 1];

  let dividerArray = lastRow.map((item) => {
    if (item === lastItem) {
      return item.replace(item, '-'.repeat(item.length));
    } else {
      return item.replace(item, '-'.repeat(item.length + 1));
    }
  });

  let tableDivider;
  if (lastRow.length === 1) {
    tableDivider = `-${dividerArray[0]}${dividerArray.join('')}`;
  } else {
    tableDivider = `${dividerArray[0]}${dividerArray.join('')}`;
  }

  return tableDivider;
}
