const puppeteer  = require('puppeteer');

const getReviews = async (url, output = "json") => {
    output = output.toLowerCase();
    if (output != "json" && output != "object") {
        console.error('INVALID OUTPUT OPTION');
        return;
    }
    console.log('Launching headless chrome...');
    url = url.toString();
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
    console.log('going to url');
    await page.goto(url);
    console.log(page.url);
    console.log('waiting for selector');
    await page.waitForSelector('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div:nth-child(9) > div:nth-child(1)');
    console.log('it\'s here ! now loop through data...')
    const data = await page.evaluate(() => {
        let reviewAuthorNamesClasses = document.getElementsByClassName('d4r55');
        let reviewAuthorNames = [];
        for (let elements of reviewAuthorNamesClasses) {
            reviewAuthorNames.push(elements.innerText);
        }
        let datesClasses = document.getElementsByClassName('rsqaWe');
        let dates = [];
        for(let elements of datesClasses) {
            dates.push(elements.innerText);
        }

        let ratingsClasses = document.getElementsByClassName('kvMYJc');
        let ratings = [];
        for (let elements of ratingsClasses) { 
            // ratings.push(elements.children.length);

            ratings.push(elements.getAttribute('aria-label').replace(/ stars| star/g,''));
        }

        let reviewsContentClasses = document.getElementsByClassName('wiI7pd');
        let reviewsContent = []
        for(let elements of reviewsContentClasses) {
            reviewsContent.push(elements.innerText);
        }

        let combine_response = [];

        for (let index = 0; index < reviewAuthorNames.length; index++) {
            const element = reviewAuthorNames[index];
            combine_response[index] = {
                'author_name': element,
                'date': dates[index] ?? '-',
                'rating': ratings[index] ?? '-',
                'content': reviewsContent[index] ?? '-',
            }
        }

        return {'reviews':combine_response};
        // return {
        //     reviewAuthorNames,
        //     dates,
        //     ratings,
        //     reviewsContent
        // }
    })
    console.log('done ! closing browser...')
    browser.close();
    // console.log(data);
    return new Promise((resolve, reject) => {
        if(output === "json") {
            console.log('json');
            resolve(data);
        } else if(output === "object") {
            resolve(data);
        }
        if(reject) {
            reject({error: "error while scraping data."})
        }
    })
    
};

module.exports = getReviews;