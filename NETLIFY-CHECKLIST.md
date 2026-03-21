# قائمة جاهزية Netlify — iif-web

استخدمها مرة واحدة عند إنشاء الموقع أو للمراجعة.

## 1) المستودع على GitHub

- الرابط: **https://github.com/alzahrani6020/iif-web**
- الفرع الافتراضي: **`main`**

## 2) إنشاء الموقع في Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. **GitHub** → امنح الصلاحية إن طُلب → اختر **`alzahrani6020/iif-web`**
3. **Build settings:** اتركها فارغة إن قرأت من المستودع، أو انسخ من [NETLIFY-UI-SETTINGS.md](./NETLIFY-UI-SETTINGS.md)
4. **Deploy site**

## 3) بعد أول نشر ناجح

| الإجراء | أين |
|--------|-----|
| **اسم النطاق الفرعي** | Site settings → Domain management → يمكن تغيير `xxx.netlify.app` |
| **فرض HTTPS** | Site settings → HTTPS → **Force HTTPS** (مُنصى به) |
| **النشر التلقائي** | يحدث عند كل **push** إلى `main` (طالما الموقع مربوط بـ GitHub) |

## 4) أسرار اختيارية (GitHub Actions)

لتشغيل workflow **Deploy Netlify** يدوياً من تبويب Actions:

| السر | المصدر |
|------|--------|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications → Personal access tokens |
| `NETLIFY_SITE_ID` | Site settings → Site details → Site ID |

> إذا لم تضف الأسرار: لا بأس — النشر عبر **ربط GitHub في Netlify** يكفي لمعظم الحالات.

## 5) التحقق

- افتح الرابط `https://<اسم-موقعك>.netlify.app`
- جرّب: `/` ، واجهة الصندوق، المنصة الحكومية
- روابط مختصرة (إن وُجدت في `netlify.toml`): `/fund` ، `/gov`

## 6) الملفات المرجعية في المشروع

| الملف | الغرض |
|-------|--------|
| `netlify.toml` | أمر البناء، النشر، التوجيهات، الرؤوس |
| `NETLIFY-UI-SETTINGS.md` | نسخ ولصق لحقول الواجهة |
| `دليل-المبتدئ-النشر.md` | شرح مبسّط للمبتدئين |
