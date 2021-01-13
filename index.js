/**
 * @author hakimhassani97
 * 
 */

const puppeteer = require('puppeteer');

const scrapeImages = async (username) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', {waitUntil: 'networkidle2'});
    // Login form
    await page.screenshot({ path: '1.png' });
    console.log('screenshot');
    // await page.type('[name=username]', 'fireship_dev');
    // await page.type('[name=password]', 'some-pa$$word');
    // await page.screenshot({ path: '2.png' });
    // await page.click('[type=submit]');
    // // Social Page
    // await page.waitFor(5000);
    // await page.goto(`https://www.instagram.com/${username}`);
    // await page.waitForSelector('img ', {
    //     visible: true,
    // });
    // await page.screenshot({ path: '3.png' });
    // // Execute code in the DOM
    // const data = await page.evaluate(() => {
    //     const images = document.querySelectorAll('img');
    //     const urls = Array.from(images).map(v => v.src);
    //     return urls
    // });
    // await browser.close();
    // console.log(data);
    // return data;
}

scrapeImages('hakimhassani97')