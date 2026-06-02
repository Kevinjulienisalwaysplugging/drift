# DRIFT Supabase Waitlist Setup

I wired the site so the signup form can post directly to Supabase once you add your public project details.

## 1. Create or Open Your Supabase Project

Go to Supabase, create a project if you do not already have one, and wait for it to finish setting up.

## 2. Create the Waitlist Table

1. In Supabase, open your project.
2. In the left sidebar, click `SQL Editor`.
3. Click `New query`.
4. Open `supabase-waitlist.sql` from this folder.
5. Paste the full SQL into Supabase.
6. Click `Run`.

This creates a table named `waitlist_signups` with columns for email, source, page URL, browser info, and signup time.

It also turns on Row Level Security. Public visitors can insert their email, but they cannot read the list of emails.

## 3. Get Your Public API Values

1. In Supabase, click the gear icon for `Project Settings`.
2. Click `API`.
3. Copy the `Project URL`.
4. Copy the `anon public` key.

The anon key is okay to use in the website because the table policy only allows inserts. Do not use the `service_role` key in the website.

## 4. Add the Values to the Site

In `index.html`, find this block near the bottom:

```html
window.DRIFT_SUPABASE = {
  url: "",
  anonKey: "",
  table: "waitlist_signups"
};
```

Replace it with your real values:

```html
window.DRIFT_SUPABASE = {
  url: "https://your-project-id.supabase.co",
  anonKey: "your-public-anon-key",
  table: "waitlist_signups"
};
```

Then regenerate or resend the updated HTML file.

## 5. Test It

Open the site, enter your own email, and submit the form.

Then go back to Supabase:

1. Click `Table Editor`.
2. Open `waitlist_signups`.
3. Confirm your email appears as a new row.

## 6. Connect the Google Add-On

Once your Google add-on is ready, point it at the `waitlist_signups` table. The table includes:

- `email`
- `source`
- `page_url`
- `user_agent`
- `created_at`

## Important

The website should only use the public anon key. Do not paste the service role key into any HTML file.

If the form says demo mode, the URL/key are still blank. If the form says something went wrong, the most likely causes are a typo in the Project URL/key, the SQL was not run, or Row Level Security policy was changed.
