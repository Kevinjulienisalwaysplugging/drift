# Upload The DRIFT Legal Pages

The privacy and data deletion pages are Next.js routes. They work on Vercel when these files are in GitHub:

```text
app/privacy/page.jsx
app/data-deletion/page.jsx
app/legal-page.jsx
app/globals.css
index.html
public/storefront.html
```

After GitHub uploads and Vercel redeploys, open:

```text
https://www.drift-sleepwear.com/privacy
https://www.drift-sleepwear.com/data-deletion
```

The storefront footer should also link to both pages.

