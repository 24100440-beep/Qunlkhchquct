# Hướng dẫn cài đặt project trên máy local

## Bước 1: Tạo project React + Vite mới

Mở terminal trong VS Code và chạy:

```bash
npm create vite@latest immigration-management -- --template react-ts
cd immigration-management
```

## Bước 2: Cài đặt dependencies

```bash
npm install
npm install date-fns lucide-react
npm install -D @tailwindcss/vite tailwindcss
```

## Bước 3: Cấu hình Tailwind CSS

### 3.1. Tạo file `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3.2. Cập nhật file `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3.3. Tạo file `src/index.css`:

```css
@import "tailwindcss";
```

### 3.4. Cập nhật file `src/main.tsx`:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## Bước 4: Copy các file từ Figma Make

### Cấu trúc thư mục cần tạo:

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── types/
│   └── traveler.ts
├── data/
│   └── mockData.ts
└── components/
    ├── TravelerForm.tsx
    ├── TravelerTable.tsx
    ├── SearchBar.tsx
    └── StatisticsCards.tsx
```

### Copy nội dung các file:

1. **src/App.tsx** - Copy từ file App.tsx của Figma Make
2. **src/types/traveler.ts** - Copy từ file types/traveler.ts
3. **src/data/mockData.ts** - Copy từ file data/mockData.ts
4. **src/components/TravelerForm.tsx** - Copy component
5. **src/components/TravelerTable.tsx** - Copy component
6. **src/components/SearchBar.tsx** - Copy component
7. **src/components/StatisticsCards.tsx** - Copy component

## Bước 5: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## Bước 6: Khi đã có Java Backend

Tạo file `src/services/api.ts` và làm theo hướng dẫn trong file `API_SPECIFICATION.md`

---

## Troubleshooting

### Lỗi: Module not found
- Đảm bảo đã cài đủ dependencies: `npm install`

### Lỗi: Tailwind classes không hoạt động
- Kiểm tra file `tailwind.config.js` đã đúng content paths
- Kiểm tra file `src/index.css` đã import tailwindcss

### Lỗi: TypeScript errors
- Chạy: `npm install --save-dev @types/react @types/react-dom`
