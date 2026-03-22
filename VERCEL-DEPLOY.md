# إذا ظهر «لا جديد» على iif-fund.vercel.app

## التحقق السريع

- **GitHub** `main` يحتوي آخر التعديلات (مثلاً كومِت `fix(dashboard): ... v5 markers`).
- **Vercel** قد يعرض **نسخة قديمة** إذا لم يُنفَّذ deploy جديد بعد الدفع.

## ماذا تفعل في لوحة Vercel

1. ادخل **Vercel → المشروع المرتبط بـ `iif-fund.vercel.app`**.
2. تبويب **Settings → Git**  
   - تأكد أن **Repository** = `alzahrani6020/iif-web` (أو نفس الريبو الذي تدفع إليه).  
   - **Production Branch** = `main`.  
   - فعّل **Automatic deployments** لفرع الإنتاج.
3. تبويب **Deployments**  
   - هل يوجد deployment **بعد** وقت آخر `git push`؟  
   - إن **لا**: اضغط **Redeploy** على آخر deployment، أو **Deploy** من آخر commit على `main`.
4. إن كان المشروع يستخدم **Root Directory**  
   - إن وُجد: يجب أن يكون **`financial-consulting/iif-fund-demo`** (حيث يوجد `index.html` الكبير و`vercel.json`).  
   - جذر المستودع وحده يحتوي `index.html` صغيراً للتوجيه — لا تستخدمه كجذر لواجهة الصندوق.

## بعد نشر ناجح

- افتح: `https://iif-fund.vercel.app/index.html` → **Ctrl+U** → **Ctrl+F** → ابحث عن **`v8-fix-main-close`** أو **`dashboard-fullpage-v8-fix-main-close`**.  
- إن وُجد → النسخة الجديدة وصلت. إن لم يوجد → ما زال الـ deploy أو المسار خاطئاً.

## أوامر (اختياري)

إن كان عندك [Vercel CLI](https://vercel.com/docs/cli):

```bash
cd financial-consulting/iif-fund-demo
vercel --prod
```

(من المجلد الصحيح حسب إعداد المشروع.)
