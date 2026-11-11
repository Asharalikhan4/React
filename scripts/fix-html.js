const fs = require('fs');
const path = require('path');

const distHtmlPath = path.join(__dirname, '../dist/index.html');
if (fs.existsSync(distHtmlPath)) {
  let html = fs.readFileSync(distHtmlPath, 'utf8');

  // Remove any unquoted or stripped google-site-verification meta tags
  html = html.replace(/<meta[^>]*google-site-verification[^>]*>/gi, '');

  // Ensure <head> and </head> are explicitly present
  if (!html.includes('<head>')) {
    html = html.replace(/(<html[^>]*>)/i, '$1<head>');
    html = html.replace(/(<body[^>]*>)/i, '</head>$1');
  }

  // Inject properly quoted Google site verification tag as the very first child of <head>
  const verificationTag = '<meta name="google-site-verification" content="l-MCXs7NHoyKtXPOOfJbGMrOPsMHGQ3FPsVBOUWule8">';
  html = html.replace('<head>', `<head>${verificationTag}`);

  fs.writeFileSync(distHtmlPath, html, 'utf8');
  console.log('Successfully formatted <head> and injected google-site-verification in dist/index.html');
}
