const fs = require('fs');
const path = require('path');

const files = ['admin.js', 'appoinments.js', 'doctors.js', 'patients.js', 'payments.js', 'reviews.js'];
const dir = path.join('src', 'app', 'lib', 'api');

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the token fetching with a try-catch to prevent unauthenticated users from getting blocked
    content = content.replace(/const tokenRes = await authClient\.token\(\{ fetchOptions: \{ headers: await headers\(\) \} \}\);/g, `let tokenRes;
        try {
            tokenRes = await authClient.token({ fetchOptions: { headers: await headers() } });
        } catch (e) {
            tokenRes = null;
        }`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Added try/catch to authClient.token() in ' + file);
}
