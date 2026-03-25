# أمان المشروع — تذكير سريع

| الموضوع | التوصية |
|---------|---------|
| **`engines/searxng/config/settings.yml`** | غيّر **`secret_key`** قبل أي نشر عام؛ لا ترفع مفاتيح حقيقية في تذاكر عامة. راجع **`safe_search`** و**`outgoing`** قبل الإنتاج. |
| **Tor / بحث `.onion`** | التشغيل المحلي عبر Docker لأغراض التطوير؛ الامتثال القانوني والاستخدام المسؤول على عاتق المشغّل — لا تعرّض مثيل SearXNG للعام بدون تقييم مخاطر. |
| **Netlify / GitHub Actions** | الأسرار في **Settings → Secrets** فقط؛ لا تضع رموزاً في الكود. إن ظهر رمز في سجل أو أداة، **ألغِه** في لوحة الخدمة وأنشئ رمزاً جديداً ثم حدّث السر في GitHub. |
| **Vercel (Actions اختياري)** | `VERCEL_TOKEN` من [حساب Vercel → Tokens](https://vercel.com/account/tokens)؛ لا تلصق التوكن في الريبو. عند التجديد: أنشئ توكناً جديداً، حدّث السر في GitHub **Settings → Secrets → Actions**، ثم ألغِ القديم من لوحة Vercel. |
| **`.env`** | مُدرَج في `.gitignore` — لا تلتزم ملفات أسرار. |
| **المستودع** | راجع من له **صلاحية** على `alzahrani6020/iif-web`. |

للتفاصيل: [NETLIFY-FREE-TIER.md](./NETLIFY-FREE-TIER.md) (حدود الخدمات المجانية).
