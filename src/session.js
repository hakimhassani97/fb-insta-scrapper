const fs = require(fs);
const cookiesFilePath = 'cookies.json';

export const Session = {
    /**
     * cookie file name
     */
    cookiesFilePath,
    /**
     * save the session cookie into a json file
     */
    saveSession: ()=>{
        // Save Session Cookies
        const cookiesObject = await page.cookies()
        // Write cookies to temp file to be used in other profile pages
        fs.writeFile(
            cookiesFilePath,
            JSON.stringify(cookiesObject),
            function (err) {
                if (err) {
                    console.log('The file could not be written.', err)
                }
                console.log('Session has been successfully saved')
            }
        )
    },
    /**
     * load the session cookie from the json file
     */
    loadSession : ()=>{
        const previousSession = fs.existsSync(cookiesFilePath)
        if (previousSession) {
        // If file exist load the cookies
        const cookiesString = fs.readFileSync(cookiesFilePath);
        const parsedCookies = JSON.parse(cookiesString);
        if (parsedCookies.length !== 0) {
            for (let cookie of parsedCookies) {
            await page.setCookie(cookie)
            }
            console.log('Session has been loaded in the browser')
        }
        }
    }
}