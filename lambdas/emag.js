const puppeteer = require("puppeteer");

const errorObj = {
    "error" : "Something wrong happened when fetching data"
};

const getEmagPriceInfo = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless : true
        });
        const page = await browser.newPage();
        await page.goto(url);
    
        let priceNode = await page.$('.product-new-price');
        let productNode = await page.$('.page-title');
    
        let priceTag = await priceNode.evaluate(el => el.textContent);
        let productName = await productNode.evaluate(el => el.textContent);
    
        let integerPart = priceTag.split(",")[0].replace(".", "");
        let decimalPart = priceTag.split(",")[1].split(" ")[0];
        let finalPriceTag = parseFloat(integerPart) + parseInt(decimalPart) / 100;
        let currency = priceTag.split(" ")[1];
    
        
        let requestDate = (new Date()).toISOString();
        try {
            let cutUselessChars = productName.split("\n ")[1].trimStart();
            productName = cutUselessChars;
        }
        catch (err) {
            console.log(err);
            return errorObj;
        }
        
        return {
            "product" : productName,
            "price": finalPriceTag,
            "currency" : currency,
            "dateRequested" : requestDate
        };
    }
    catch (err) {
        console.log(err);
        return errorObj;      
    }
};