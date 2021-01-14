const puppeteer = require('puppeteer');
const { wait, autoScroll } = require('./src/helpers');
require('./src/db');
const {insert} = require('./src/db');

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
    // await page.screenshot({path: '1.png'});
    // await page.waitForSelector('[name=username]');
    await page.type('[name=username]', 'softlycreations@gmail.com');
    await page.type('[name=password]', 'softly1234');
    // await page.screenshot({path: '2.png'});
    await page.click('[type=submit]');
    // // wait(7000)
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    // await page.screenshot({path: '3.png'});

    // insta posts
    await page.goto('https://www.instagram.com/explore/tags/jacqueschirac/', { waitUntil: 'networkidle0' })
    // await page.screenshot({path: 's.png'});
    
    await page.waitForSelector('.v1Nh3.kIKUG._bz0w');
    // await autoScroll(page);
    const result = await page.evaluate(async() => {
        let images = document.querySelectorAll('.KL4Bh > img')
        const elements = document.querySelectorAll('.v1Nh3.kIKUG._bz0w a');
        let texts = []
        // for(let i=0;i<elements.length;i++){
        //     elements[i].click()
        //     await page.waitForSelector('.C4VMK > span');
        //     let el = document.querySelectorAll('.C4VMK > span');
        //     texts.push(el.innerText)
        // }
        const linksArr = Array.from(elements).map((link, i) => {
            return {link: link.href, alt: images[i].alt, src: images[i].src, text: texts[i]}
        });
        return linksArr;
    });
    console.log(result);
    console.log(result.length);
    insert(result);

    // close the browser
    await browser.close();
})();