О проекте:

DefendPoint NDR - это современная платформа для Network Detection and Response (NDR), предназначенная для мониторинга, анализа и реагирования на угрозы безопасности в сети.
Проект состоит из двух основных частей: клиентской части (фронтенд) и серверной части (бэкенд).

Фронтенд документация
Технологический стек

Основные технологии:

1)React 18 - библиотека для построения пользовательских интерфейсов
2)TypeScript 5 - типизированный JavaScript для надежности кода
3)Redux Toolkit (RTK) - управление состоянием приложения
4)RTK Query - работа с API и кеширование данных
5)TanStack Router - маршрутизация с поддержкой TypeScript
6)Vite - быстрая сборка и разработка
7)CSS Modules - изолированные стили для компонентов
8)SCSS - препроцессор для расширенных возможностей CSS
9)Recharts - библиотека для построения графиков

Вспомогательные инструменты:

ESLint - проверка качества кода
Prettier - форматирование кода
Vitest - тестирование
PNPM - быстрый менеджер пакетов
date-fns - работа с датами
clsx - условное объединение классов

Архитектура (FSD)
Проект построен по методологии Feature-Sliced Design:

src/
├── app/           # Инициализация приложения, провайдеры, роутинг
├── pages/         # Страницы приложения
├── widgets/       # Самостоятельные блоки UI
├── features/      # Пользовательские сценарии
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемый код

Управление состоянием

Redux Toolkit Store:

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

RTK Query API:

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Dashboard', 'Threats', 'Policies', ...],
  endpoints: () => ({}),
})

Дизайн-система:
Темная тема

Основной фон: #0a0a0a
Карточки: #1e1e1e с эффектом стекла
Акцентный цвет: градиент #3b82f6 → #8b5cf6
Текст: градации серого для иерархии
Компоненты

Карточки - с эффектом наведения и стеклянным фоном
Таблицы - с сортировкой и фильтрацией
Графики - интерактивные с Recharts
Фильтры - выдвижные панели
Статусы - цветные индикаторы
Также в разработке светлая тема проекта ( на данный момент, возможно уже имеется и светлая тема )

Интерактивные элементы

Анимация при наведении
Плавные переходы
Адаптивный дизайн
Темная тема по умолчанию

Взаимодействие с API:

const { data, isLoading } = useGetThreatsQuery({ 
  page: 1, 
  limit: 10,
  severity: 'critical' 
})

Серверная документация
Технологический стек:

1)Node.js - среда выполнения
2)Express - веб-фреймворк
3)TypeScript - типизация
4)tsx - запуск TypeScript файлов
5)CORS - middleware для кросс-доменных запросов

Архитектура (MVC-подобная):

server/
├── index.ts           # Точка входа
├── app.ts             # Конфигурация Express
├── routes/            # Маршруты
├── controllers/       # Контроллеры (бизнес-логика)
├── services/          # Сервисы (работа с данными)
├── data/              # Мок-данные
├── middleware/        # Промежуточные обработчики
├── utils/             # Утилиты
└── types/             # TypeScript типы

Эндпоинты API:

Dashboard /api/dashboard

GET /stats - статистика дашборда
GET /traffic - данные трафика
Threats /api/threats

GET / - список угроз
GET /:id - конкретная угроза
PATCH /:id/status - обновление статуса
Policies /api/policies

GET / - список политик
GET /stats - статистика политик
POST / - создание политики
PUT /:id - обновление политики
PATCH /:id/status - обновление статуса
DELETE /:id - удаление политики
POST /:id/execute - выполнение политики
Traffic /api/traffic

GET / - потоки трафика
GET /stats - статистика трафика
GET /bandwidth - история пропускной способности
GET /protocols - распределение по протоколам
POST /:id/block - блокировка потока
POST /:id/allow - разрешение потока
Anomalies /api/anomalies

GET / - список аномалий
GET /stats - статистика аномалий
GET /timeline - временная шкала
PATCH /:id/status - обновление статуса
POST /:id/assign - назначение ответственного
POST /:id/resolve - отметка о решении
Auth Logs /api/auth-logs

GET / - журнал авторизации
GET /stats - статистика входов
Diagnostics /api/diagnostics

GET /services - состояние сервисов
GET /metrics - метрики системы
GET /summary - сводка
GET /logs - логи диагностики
POST /services/:id/restart - перезапуск сервиса
Reports /api/reports

GET / - список отчетов
GET /summary - сводка по отчетам
POST / - создание отчета
GET /templates - шаблоны отчетов
GET /schedules - расписания отчетов
Settings /api/settings

GET /profile - профиль пользователя
GET /preferences - предпочтения
GET /notifications - настройки уведомлений
GET /security - настройки безопасности
GET /api-keys - API ключи
GET /audit-logs - логи аудита

Утилиты:

query.utils.ts - работа с query параметрами
getQueryString(req, 'param')  
getQueryNumber(req, 'param')  

params.utils.ts - работа с URL параметрами
getParamId(req)

pagination.util.ts - пагинация
applyPagination(items, query)

Запуск проекта
Режим разработки:

bash
# Установка зависимостей
pnpm install


# По отдельности
pnpm server  # сервер на порту 3000
pnpm dev     # клиент на порту 5173
Сборка

bash
# Сборка клиента
pnpm build

# Сборка сервера
pnpm build:server

Мок-данные
Все данные хранятся в server/data/ и имитируют реальную работу системы:

threats.data.ts - угрозы с MITRE атаками
policies.data.ts - политики безопасности
traffic.data.ts - сетевой трафик
anomalies.data.ts - аномалии
auth-logs.data.ts - логи авторизации
diagnostics.data.ts - состояние системы
reports.data.ts - отчеты
settings.data.ts - настройки

Безопасность:

CORS настроен для работы с фронтендом
Подготовка к аутентификации - заглушка для токена
Валидация входных данных через утилиты

Планы по развитию:

1)Аутентификация - добавление JWT токенов (В процессе разработки на данный момент)
2)WebSocket - real-time уведомления
3)База данных - замена мок-данных на PostgreSQL 
4)Документирование API - Swagger/OpenAPI
5)Тесты - добавление unit и integration тестов (В разработке на данный момент)
6)Деплой - настройка CI/CD

Последнее обновление: Февраль 2026 (19.02.2026)
