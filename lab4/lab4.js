/**
 * Класс, представляющий книгу
 */
export class Book {
    /** @type {string} - Название книги */
    #title;
    
    /** @type {number} - Год издания (защищенное поле) */
    _pubYear;
    
    /** @type {number} - Цена книги (приватное поле) */
    #price;

    /**
     * Конструктор для создания экземпляр книги
     * @param {string} title - Название книги (не может быть пустой строкой)
     * @param {number} pubYear - Год издания (положительное число)
     * @param {number} price - Цена книги (положительное число)
     * @throws {Error} Если валидация не пройдена
     */
    constructor(title, pubYear, price) {
        this.title = title;
        this._pubYear = pubYear;
        this.#price = price;
    }

    /**
     * Геттер для названия книги
     * @returns {string} Название книги
     */
    get title() {
        return this.#title;
    }

    /**
     * Сеттер для названия книги
     * @param {string} value - Новое название
     * @throws {Error} Если название - пустая строка
     */
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Название книги не может быть пустой строкой');
        }
        this.#title = value;
    }

    /**
     * Геттер для года издания
     * @returns {number} Год издания
     */
    get pubYear() {
        return this._pubYear;
    }

    /**
     * Сеттер для года издания
     * @param {number} value - Новый год издания
     * @throws {Error} Если значение не является положительным числом
     */
    set pubYear(value) {
        if (typeof value !== 'number' || isNaN(value) || value <= 0) {
            throw new Error('Год издания должен быть положительным числом');
        }
        this._pubYear = value;
    }

    /**
     * Геттер для цены книги
     * @returns {number} Цена книги
     */
    get price() {
        return this.#price;
    }

    /**
     * Сеттер для цены книги
     * @param {number} value - Новая цена
     * @throws {Error} Если значение не является положительным числом
     */
    set price(value) {
        if (typeof value !== 'number' || isNaN(value) || value <= 0) {
            throw new Error('Цена должна быть положительным числом');
        }
        this.#price = value;
    }

    /**
     * Метод, который выводит в консоль название и цену книги
     */
    show() {
        console.log(`Книга: "${this.title}", Цена: ${this.#price} руб.`);
    }

    /**
     * Статический метод для сравнения книг по году издания
     * @param {Book} a - Первая книга
     * @param {Book} b - Вторая книга
     * @returns {number} -1, если a раньше b; 1, если a позже b; 0, если равны
     */
    static compare(a, b) {
        if (a._pubYear < b._pubYear) return -1;
        if (a._pubYear > b._pubYear) return 1;
        return 0;
    }
}

/**
 * Функция, которая проверяет, пустой ли объект (не имеет свойств, включая символьные)
 * @param {object} obj - Проверяемый объект
 * @returns {boolean} true, если объект не имеет свойств, иначе false
 */
export function isEmpty(obj) {
    if (Object.keys(obj).length > 0) return false;
    
    if (Object.getOwnPropertySymbols(obj).length > 0) return false;
    
    return true;
}

/**
 * Расширяет объект методами для работы с классами в строке className
 * @param {object} obj - Объект со свойством className
 * @returns {object} Объект с добавленными методами
 */
export function addClassMethods(obj) {
    /**
     * Добавляет класс в список
     * @param {string} cls - Добавляемый класс
     * @returns {object} Объект для цепочки вызовов
     */
    obj.addClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        if (!classes.includes(cls)) {
            classes.push(cls);
            this.className = classes.join(' ');
        }
        return this;
    };

    /**
     * Удаляет класс из списка
     * @param {string} cls - Удаляемый класс
     * @returns {object} Объект для цепочки вызовов
     */
    obj.removeClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        const index = classes.indexOf(cls);
        if (index !== -1) {
            classes.splice(index, 1);
            this.className = classes.join(' ');
        }
        return this;
    };

    return obj;
}

/**
 * Возвращает количество секунд, прошедших с начала текущего дня
 * @returns {number} Количество секунд
 */
export function getSecondsToday() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((now - startOfDay) / 1000);
}

/**
 * Форматирует дату в формат "дд.мм.гг"
 * @param {Date} date - Форматируемая дата
 * @returns {string} Отформатированная строка даты
 */
export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
}

/**
 * Глубокое сравнение двух объектов
 * @param {object} obj1 - Первый объект
 * @param {object} obj2 - Второй объект
 * @returns {boolean} true, если объекты равны
 */
export function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}