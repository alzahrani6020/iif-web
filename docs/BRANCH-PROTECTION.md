# حماية الفرع `main` على GitHub

هدفها: عدم دمج كود إلى `main` إلا بعد **نجاح CI** (سير عمل **CI** / مهمة **verify**).

## من الواجهة (موصى به)

1. المستودع → **Settings** → **Branches** → **Add branch protection rule** (أو **Edit** للقاعدة الحالية على `main`).
2. **Branch name pattern:** `main`
3. فعّل:
   - **Require status checks to pass before merging**
   - **Require branches to be up to date before merging** (اختياري لكنه يقلل تعارض الدمج)
4. ابحث في القائمة عن **`CI / verify`** (أو **`verify`** ضمن workflow **CI**) واختره كفحص مطلوب.
5. إن عملت وحدك على المستودع: اترك **Do not require pull requests** (أو لا تفعّل «Require a pull request before merging») إذا أردت الإبقاء على **push** مباشر إلى `main` مع بقاء اشتراط نجاح الفحوصات حيث ينطبق ذلك على الدمج عبر PR.
6. **Include administrators:** عطّله إن أردت أن تنطبق القواعد حتى على مالك المستودع (أكثر صرامة).

## من GitHub CLI (اختياري)

يتطلب صلاحية **admin** على المستودع. أنشئ ملفاً مؤقتاً `body.json` يحتوي (عدّل `context` إن لزم ليطابق اسم الفحص في **Actions**):

```json
{
  "required_status_checks": {
    "strict": true,
    "checks": [{ "context": "CI / verify", "app_id": 15368 }]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": false,
  "lock_branch": false,
  "allow_fork_syncing": true
}
```

ثم (Linux/macOS أو Git Bash):

`gh api --method PUT repos/alzahrani6020/iif-web/branches/main/protection --input body.json`

على **PowerShell** يمكن: `Get-Content body.json -Raw | gh api --method PUT repos/alzahrani6020/iif-web/branches/main/protection --input -`

`app_id` **15368** هو تطبيق **GitHub Actions** الافتراضي؛ إذا رجع **422** غيّر `context` إلى **`verify`** فقط أو استخدم الواجهة الرسومية.

## ملاحظة

تفعيل **Require a pull request before merging** يمنع **push** المباشر إلى `main`؛ استخدمه عندما ينضم فريق ويُفضّل مراجعة الكود.
