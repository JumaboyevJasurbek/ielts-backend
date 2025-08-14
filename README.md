# IELTS Mock Test Backend

Bu loyiha IELTS Mock Test uchun NestJS backend API hisoblanadi.

## O'rnatish

```bash
npm install
```

## Database Configuration

PostgreSQL bazasini o'rnating va `.env` faylini yarating:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=ielts_mock
PORT=3001
```

## Ishga tushirish

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Admin CRUD Operatsiyalari

#### Savol qo'shish

```http
POST /api/admin/questions
Content-Type: application/json

{
  "questionText": "What is the capital of France?",
  "options": ["London", "Berlin", "Paris", "Madrid"],
  "correctAnswer": 2
}
```

#### Barcha savollarni olish

```http
GET /api/admin/questions
```

#### Bitta savolni olish

```http
GET /api/admin/questions/:id
```

#### Savolni yangilash

```http
PATCH /api/admin/questions/:id
Content-Type: application/json

{
  "questionText": "Updated question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 1
}
```

#### Savolni o'chirish

```http
DELETE /api/admin/questions/:id
```

### Foydalanuvchi Operatsiyalari

#### Test uchun savollarni olish (to'g'ri javobsiz)

```http
GET /api/test/questions
```

Response:

```json
[
  {
    "id": 1,
    "questionText": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid"],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### Testni yakunlash va natijani olish

```http
POST /api/test/submit
Content-Type: application/json

{
  "answers": [2, 0, 1, 3]
}
```

Response:

```json
{
  "score": 3,
  "percentage": 75,
  "total": 4
}
```

## Ma'lumotlar strukturasi

### Question Entity

- `id`: number (Primary Key)
- `questionText`: string (Savol matni)
- `options`: string[] (4 ta javob varianti)
- `correctAnswer`: number (To'g'ri javob indexi: 0-3)
- `createdAt`: Date
- `updatedAt`: Date

## Validation

- Savol matni majburiy
- 4 ta javob varianti majburiy
- To'g'ri javob 0-3 orasida bo'lishi kerak

## CORS

Frontend (localhost:3000) bilan ishlash uchun CORS yoqilgan.
