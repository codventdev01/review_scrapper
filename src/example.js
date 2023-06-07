const getReviews = require('./getReviews');

async function main() {
    try {
        const data = await getReviews("https://www.google.com/maps/place/Black+%26+Brown+Bakery/@25.3708874,68.2850111,13z/data=!4m12!1m2!2m1!1sblack+and+brown!3m8!1s0x394c71db4e718a45:0x6e52670da47b89e8!8m2!3d25.3708874!4d68.3571089!9m1!1b1!15sCg9ibGFjayBhbmQgYnJvd25aESIPYmxhY2sgYW5kIGJyb3dukgEGYmFrZXJ54AEA!16s%2Fg%2F11f9ckh28t?entry=ttu");
        // console.log(JSON.stringify(data));
        console.log(data);

    } catch(e) {
        console.log(e);
    }
}

main();