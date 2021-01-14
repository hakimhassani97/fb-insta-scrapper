const puppeteer = require('puppeteer');
const { wait } = require('./src/helpers');

(async () => {
    // set options
    let launchOptions = { headless: true, args: ['--start-maximized'] };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // login
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });
    // remove cookies dialogue
    try {
        await page.click('.aOOlW', {delay: 2000})
    }catch(e){}
    let res = await page.evaluate(() => {
        document.querySelector('[role=presentation]')?.remove()
        return true
    });
    await page.screenshot({path: '1.png'});
    await page.type('[name=username]', 'softlycreations@gmail.com');
    await page.type('[name=password]', 'softly1234');
    await page.screenshot({path: '2.png'});
    await page.click('[type=submit]');
    // // wait(7000)
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.screenshot({path: '3.png'});

    // insta posts
    await page.goto('https://www.instagram.com/explore/tags/jacqueschirac/', { waitUntil: 'networkidle0' })
    await page.screenshot({path: 's.png'});
    
    await page.waitForSelector('.v1Nh3.kIKUG._bz0w');
    const result = await page.evaluate(() => {
        // Get elements into a NodeList
        const elements = document.querySelectorAll('.v1Nh3.kIKUG._bz0w a');
    
        // Convert elements to an array, 
        // then for each item of that array only return the href attribute
        const linksArr = Array.from(elements).map(link => link.href);
    
        return linksArr;
    });
    console.log(result);

    // close the browser
    await browser.close();
})();