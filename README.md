# SkunkBones.com - v1.0.0
### Artisanal Midcoast Maine Skunk Bones E-Commerce Store

Welcome to **SkunkBones.com**, the premier, high-fidelity parody e-commerce destination for sun-bleached, double-deodorized Striped Skunk (*Mephitis mephitis*) skeletal specimens harvested ethically along the misty shores of Midcoast Maine (Boothbay Harbor, Southport, and Edgecomb). 

This project is built using a modern, lightweight single-page application (SPA) architecture with **Vanilla HTML5, CSS3, and JavaScript**. It features a high-end luxury design aesthetic (similar to brands like Aesop or Le Labo), complete with a mock cart, shipping state exclusions, interactive fun facts, and a free Google Sheets database integration.

---

## Features
1. **Curated Product Selection**: A catalog of bones sorted by category (Craniums, Vertebrae, Limbs, Sets) featuring funny, charming descriptions of Captain Barnaby's harvesting process.
2. **State Compliance Validator**: An active shipping filter that blocks acquisitions from states with strict wildlife trade statutes (California, New York, Texas, Georgia, Hawaii, and Washington).
3. **Google Sheets Order Logging**: Submits orders directly to a Google Sheet via a lightweight, serverless Google Apps Script webhook.
4. **Interactive Skeletal Diagram**: Clickable hotspots showcasing biological trivia about Maine skunks.
5. **Responsive Premium Aesthetics**: Beautiful forest-green and ivory palettes, typography from Google Fonts, custom CSS layouts, and smooth animations.

---

## Project Structure
```
├── assets/
│   ├── hero_skunk_skull.jpg    # Sun-bleached skunk skull on the shoreline
│   ├── captain_barnaby.jpg     # Whimsical portrait of the founder
│   └── bone_collection.jpg     # Elegant velvet arrangement of skeletal specimens
├── index.html                  # Main application structure
├── style.css                   # Custom styles, styling variables, and media queries
├── app.js                      # Product databases, state check logic, and sheet transmitters
├── README.md                   # Setup guide and change log (This file)
└── gemini.md                   # Core development rules & guidelines
```

---

## Local Development

We prefer python for scripting. To run this project locally, you can start a simple python web server in the project root:

```bash
# Start a local python web server on port 8000
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your web browser.

---

## Google Sheets Checkout Setup (100% Free)

To automatically record orders in a Google Sheet:
1. Open [Google Sheets](https://sheets.google.com) and create a blank spreadsheet.
2. Write these headers in Row 1:
   `Timestamp | Name | Email | Address | City | State | Zip | Items | Total`
3. Go to **Extensions > Apps Script** in the sheet menu.
4. Paste the following script into `Code.gs` (replacing all code):
   ```javascript
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       
       sheet.appendRow([
         new Date().toLocaleString(),
         data.name,
         data.email,
         data.address,
         data.city,
         data.state,
         data.zip,
         data.items,
         data.total
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Logged successfully" }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeader('Access-Control-Allow-Origin', '*');
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
         .setMimeType(ContentService.MimeType.JSON)
         .setHeader('Access-Control-Allow-Origin', '*');
     }
   }

   function doGet(e) {
     return ContentService.createTextOutput("Google Sheets Endpoint is Online.")
       .setHeader('Access-Control-Allow-Origin', '*');
   }
   ```
5. Click **Deploy > New Deployment** (top right).
6. Select **Web App** as the deployment type.
7. Configure:
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
8. Click **Deploy**, click **Authorize Access** (sign in and click Advanced > Go to Untitled Project), and copy the **Web App URL**.
9. On your SkunkBones website, click the **Sheet Setup** link in the navigation menu, paste your URL, and click **Save Configuration**. All subsequent checkouts will write directly to your sheet!

---

## Free Hosting & Domain Redirect Guide (skunkbones.com)

Since the site is built on pure static HTML/CSS/JS, you can host it completely free on **GitHub Pages**, **Vercel**, or **Netlify**.

### Option A: GitHub Pages
1. Initialize a git repository locally: `git init` (already done).
2. Create a free repository on GitHub (e.g. `skunkbones`).
3. Add your remote and push: `git remote add origin <URL>` then `git push -u origin main`.
4. Go to **Settings > Pages** on your GitHub repository.
5. Under Build and Deployment, set source to **Deploy from a branch** and select `main` (root directory). Click Save.
6. Your site will be live at `https://<username>.github.io/skunkbones`.

### Option B: Vercel (Highly Recommended)
1. Sign up for a free account at [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New > Project**, and import your repository.
3. Keep default settings (Vercel automatically detects static HTML/CSS sites) and click **Deploy**.
4. Your site will be hosted on a global edge CDN with a free SSL certificate.

### Mapping skunkbones.com to Free Hosting
To redirect visitors going to your custom domain `skunkbones.com` to this hosted site:
1. In your Vercel or GitHub Pages dashboard, go to **Settings > Domains** (or Custom Domains).
2. Enter `skunkbones.com` and `www.skunkbones.com`.
3. Log into your domain registrar (where you bought `skunkbones.com`, e.g., Namecheap, GoDaddy, Hover).
4. Go to **DNS Settings** for your domain.
5. Create the following records:
   - **Type A Record**: Name = `@`, Value = `76.76.21.21` (Vercel's IP address) or the IP specified by GitHub Pages.
   - **Type CNAME Record**: Name = `www`, Value = `cname.vercel-dns.com.` (or your GitHub page URL `username.github.io.`).
6. Wait 5-30 minutes for DNS propagation. Visitors of `skunkbones.com` will now see your gorgeous Midcoast Maine skunk bones shop!

---

## Change Log

### v1.0.0 (2026-07-07)
- Initial release of the complete skunkbones.com e-commerce platform.
- Created `index.html` structure with simulated page routing, a dynamic cart drawer, and a multi-step checkout form.
- Designed `style.css` implementing a luxurious ivory and pine green color scheme, detailed hover effects, modal layers, and versioning.
- Written `app.js` featuring product databases, category filters, interactive trivia hotspot controllers, and the Google Sheets Apps Script API hook.
- Added three AI-generated high-fidelity assets: sun-bleached skull shoreline (`assets/hero_skunk_skull.jpg`), Captain Barnaby portrait (`assets/captain_barnaby.jpg`), and specimen tray (`assets/bone_collection.jpg`).
- Integrated dynamic compliance checker to filter restricted shipping states (CA, NY, TX, GA, HI, WA).
