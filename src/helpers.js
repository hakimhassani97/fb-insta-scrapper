module.exports = {
    /**
     * waits ms milliseconds
     */
    wait: (ms)=>{
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    },
    /**
     * auto scroll to the bottom of the page
     */
    autoScroll: async (page)=>{
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let max = 300;
                let i = 0;
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if(totalHeight >= scrollHeight || i>=max){
                        clearInterval(timer);
                        resolve();
                    }
                    i++;
                }, 100);
            });
        });
    }
}