# أمان المشروع — تذكير سريع

| الموضوع | التوصية |
|---------|---------|
| **`engines/searxng/config/settings.yml`** | غيّر **`secret_key`** قبل أي نشر عام؛ لا ترفع مفاتيح حقيقية في تذاكر عامة. |
| **Netlify / GitHub Actions** | الأسرار في **Settings → Secrets** فقط؛ لا تضع رموزاً في الكود. |
| **`.env`** | مُدرَج في `.gitignore` — لا تلتزم ملفات أسرار. |
| **المستودع** | راجع من له **صلاحية** على `alzahrani6020/iif-web`. |

للتفاصيل: [NETLIFY-FREE-TIER.md](./NETLIFY-FREE-TIER.md) (حدود الخدمات المجانية).
