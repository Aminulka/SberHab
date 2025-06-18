import express from 'express'; // Фреймворк для создания сервера
import sqlite3 from 'sqlite3'; // Драйвер для работы с SQLite
import cors from 'cors'; // Middleware для разрешения кросс-доменных запросов
import path from 'path'; // Модуль для работы с путями файловой системы

// Создание экземпляра Express-приложения
const app = express();

// Установка порта из переменных окружения или 3003 по умолчанию
const port = process.env.PORT || 3003;

// Middleware
app.use(cors()); // Разрешаем CORS-запросы со всех доменов
app.use(express.json()); // Парсинг входящих JSON-запросов

// Подключение к SQLite базе данных
const db = new sqlite3.Database(path.join(__dirname, 'orders.db'), (err) => {
  if (err) {
    console.error('Ошибка подключения к базе:', err.message);
  } else {
    console.log('База данных подключена');

    // Создание таблицы заказов с дополнительными полями для стоимости
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        city TEXT NOT NULL,
        fabricType TEXT,
        color TEXT,
        quantity TEXT,
        comment TEXT,
        subtotal REAL,
        delivery_cost REAL,
        total_amount REAL,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// API endpoints
// 1. Создание нового заказа (POST /api/orders)
app.post('/api/orders', (req, res) => {
  // Деструктуризация данных из тела запроса
  const {
    name,
    phone,
    email,
    city,
    fabricType,
    color,
    quantity,
    comment,
    orderSummary: { subtotal, deliveryCost, total },
  } = req.body;
  // SQL-запрос для вставки данных
  const query = `
    INSERT INTO orders (
      name, phone, email, city, fabricType, color, quantity, comment,
      subtotal, delivery_cost, total_amount
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  // Выполнение запроса
  db.run(
    query,
    [name, phone, email, city, fabricType, color, quantity, comment, subtotal, deliveryCost, total],
    function (err) {
      if (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ error: 'Failed to save order' });
      } else {
        // Успешный ответ с ID созданного заказа
        res.status(201).json({
          message: 'Order created successfully',
          orderId: this.lastID,
        });
      }
    }
  );
});

// Админ-панель для просмотра заказов (GET /api/orders)
app.get('/api/orders', (_req, res) => {
  const query = `
    SELECT * FROM orders
    ORDER BY created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    } else {
      res.json(rows);
    }
  });
});

// Обновление статуса заказа
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.run(query, [status, id], (err) => {
    if (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Failed to update order' });
    } else {
      res.json({ message: 'Order updated successfully' });
    }
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../build', './public/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
