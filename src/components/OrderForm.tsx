import React, { useState, useEffect } from 'react';
import '../styles/order-form.css';

interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  fabricType: string;
  color: string;
  quantity: string;
  comment: string;
}

// Список городов с бесплатной доставкой
const FREE_DELIVERY_CITIES = ['Москва', 'Санкт-Петербург', 'Владимир', 'Казань'];

// Список городов России
const RUSSIAN_CITIES = [
  { name: 'Москва', region: 'Центральный' },
  { name: 'Санкт-Петербург', region: 'Северо-Западный' },
  { name: 'Владимир', region: 'Центральный' },
  { name: 'Гусь-Хрустальный', region: 'Центральный' },
  { name: 'Нижний Новгород', region: 'Приволжский' },
  { name: 'Казань', region: 'Приволжский' },
  { name: 'Новосибирск', region: 'Сибирский' },
  { name: 'Екатеринбург', region: 'Уральский' },
  { name: 'Челябинск', region: 'Уральский' },
  { name: 'Омск', region: 'Сибирский' },
  { name: 'Самара', region: 'Приволжский' },
  { name: 'Ростов-на-Дону', region: 'Южный' },
  { name: 'Уфа', region: 'Приволжский' },
  { name: 'Красноярск', region: 'Сибирский' },
  { name: 'Воронеж', region: 'Центральный' },
  { name: 'Пермь', region: 'Приволжский' },
  { name: 'Волгоград', region: 'Южный' },
].sort((a, b) => a.name.localeCompare(b.name));

// Группируем города по регионам для выпадающего списка
const CITIES_BY_REGION = RUSSIAN_CITIES.reduce(
  (acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city.name);
    return acc;
  },
  {} as { [key: string]: string[] }
);

// Базовые цены на ткани за м^2
const FABRIC_PRICES = {
  basic: 2500,
  loft: 3000,
  geometry: 3200,
  minimalism: 2800,
  classic: 3500,
  kids: 3000,
};

const MAX_QUANTITY = 100;
const DELIVERY_COST = 99;

const API_URL = 'http://localhost:3003'; // Меняем порт на 3003

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    fabricType: 'basic',
    color: '',
    quantity: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
    quantity: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    deliveryCost: 0,
    total: 0,
  });

  // Расчет стоимости заказа при изменении города, типа ткани или количества
  useEffect(() => {
    const quantity = Number(formData.quantity) || 0;
    const fabricPrice =
      FABRIC_PRICES[formData.fabricType as keyof typeof FABRIC_PRICES] || FABRIC_PRICES.basic;
    const subtotal = quantity * fabricPrice;

    const deliveryCost = FREE_DELIVERY_CITIES.some((city) =>
      formData.city.toLowerCase().includes(city.toLowerCase())
    )
      ? 0
      : DELIVERY_COST;

    setOrderSummary({
      subtotal,
      deliveryCost,
      total: subtotal + deliveryCost,
    });
  }, [formData.city, formData.fabricType, formData.quantity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Валидация количества
    if (name === 'quantity') {
      const numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 1) {
        setErrors({ ...errors, quantity: 'Количество должно быть не менее 1 м²' });
      } else if (numValue > MAX_QUANTITY) {
        setErrors({ ...errors, quantity: `Максимальное количество: ${MAX_QUANTITY} м²` });
      } else {
        setErrors({ ...errors, quantity: '' });
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      quantity: '',
    };

    // Проверка количества
    const quantity = Number(formData.quantity);
    if (isNaN(quantity) || quantity < 1) {
      newErrors.quantity = 'Количество должно быть не менее 1 м²';
    } else if (quantity > MAX_QUANTITY) {
      newErrors.quantity = `Максимальное количество: ${MAX_QUANTITY} м²`;
    }

    setErrors(newErrors);

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.city ||
      !formData.quantity
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Пожалуйста, заполните все обязательные поля',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Пожалуйста, введите корректный email',
      });
      return false;
    }

    const phoneRegex = /^\+?[0-9]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9+]/g, ''))) {
      setSubmitStatus({
        type: 'error',
        message: 'Пожалуйста, введите корректный номер телефона',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          orderSummary,
          maxQuantity: MAX_QUANTITY,
        }),
      });

      if (!response.ok) throw new Error('Ошибка при отправке заказа');

      setSubmitStatus({
        type: 'success',
        message: 'Ваш заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.',
      });

      // Очищаем форму после успешной отправки
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        fabricType: 'basic',
        color: '',
        quantity: '',
        comment: '',
      });
    } catch (error) {
      console.error('Order submission error:', error); // Добавляем логгирование ошибки
      setSubmitStatus({
        type: 'error',
        message: 'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='order-form-container'>
      <form onSubmit={handleSubmit} className='order-form'>
        <div className='form-group'>
          <label htmlFor='name'>
            Имя <span className='required'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>
            Телефон <span className='required'>*</span>
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>
            Email <span className='required'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='city'>
            Город <span className='required'>*</span>
          </label>
          <select id='city' name='city' value={formData.city} onChange={handleChange} required>
            <option value=''>Выберите город</option>
            {Object.entries(CITIES_BY_REGION).map(([region, cities]) => (
              <optgroup key={region} label={region}>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city} {FREE_DELIVERY_CITIES.includes(city) ? '(Бесплатная доставка)' : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {formData.city && (
            <small className='city-hint'>
              {FREE_DELIVERY_CITIES.includes(formData.city)
                ? '✓ Бесплатная доставка'
                : `Стоимость доставки: ${DELIVERY_COST} ₽`}
            </small>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='fabricType'>
            Тип ткани <span className='required'>*</span>
          </label>
          <select
            id='fabricType'
            name='fabricType'
            value={formData.fabricType}
            onChange={handleChange}
            required
          >
            <option value='basic'>Basic ({FABRIC_PRICES.basic} ₽/м²)</option>
            <option value='loft'>Loft ({FABRIC_PRICES.loft} ₽/м²)</option>
            <option value='geometry'>Geometry ({FABRIC_PRICES.geometry} ₽/м²)</option>
            <option value='minimalism'>Minimalism ({FABRIC_PRICES.minimalism} ₽/м²)</option>
            <option value='classic'>Classic ({FABRIC_PRICES.classic} ₽/м²)</option>
            <option value='kids'>Kids ({FABRIC_PRICES.kids} ₽/м²)</option>
          </select>
          <small className='price-hint'>
            Стоимость за м²: {FABRIC_PRICES[formData.fabricType as keyof typeof FABRIC_PRICES]} ₽
          </small>
        </div>

        <div className='form-group'>
          <label htmlFor='color'>Выбранный цвет</label>
          <input
            type='text'
            id='color'
            name='color'
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='quantity'>
            Количество (м²) <span className='required'>*</span>
          </label>
          <input
            type='number'
            id='quantity'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            min='1'
            max={MAX_QUANTITY}
            required
          />
          {errors.quantity && <div className='error-message'>{errors.quantity}</div>}
          {formData.quantity && !errors.quantity && (
            <small className='quantity-hint'>
              Стоимость материалов: {formData.quantity} м² ×{' '}
              {FABRIC_PRICES[formData.fabricType as keyof typeof FABRIC_PRICES]} ₽ ={' '}
              {orderSummary.subtotal.toLocaleString()} ₽
              <br />
              Максимальное количество за один заказ: {MAX_QUANTITY}
            </small>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='comment'>Комментарий к заказу</label>
          <textarea
            id='comment'
            name='comment'
            value={formData.comment}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className='order-summary'>
          <h3>Расчет стоимости:</h3>
          <div className='summary-item'>
            <span>Стоимость материалов:</span>
            <span className='calculation'>
              {formData.quantity} м² ×{' '}
              {FABRIC_PRICES[formData.fabricType as keyof typeof FABRIC_PRICES]} ₽ ={' '}
              {orderSummary.subtotal.toLocaleString()} ₽
            </span>
          </div>
          <div className='summary-item'>
            <span>Доставка:</span>
            <span>{orderSummary.deliveryCost.toLocaleString()} ₽</span>
          </div>
          <div className='summary-item total'>
            <span>Общая сумма:</span>
            <span>{orderSummary.total.toLocaleString()} ₽</span>
          </div>
        </div>

        {submitStatus.message && (
          <div className={`submit-status ${submitStatus.type}`}>{submitStatus.message}</div>
        )}

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Оформить заказ'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
