import type from '@pierreminiggio/puppeteer-text-typer'

/**
 * @param {import("puppeteer").Page} page
 * @param {string} login
 * @param {string} password 
 * 
 * @returns {Promise<>}
 */
export default function (page, login, password) {
    return new Promise(async (resolve, reject) => {
        try {
            await page.goto('https://difter.fr')

            const loginInputSelector = 'input[name="email"]'
            const passwordInputSelector = 'input[name="password"]'
            await page.waitForSelector(loginInputSelector)
            await page.waitForSelector(passwordInputSelector)

            await type(page, loginInputSelector, login)
            await type(page, passwordInputSelector, password)

            await page.waitForTimeout(1000)
            
            const submitButtonSelector = 'button'
            await page.waitForSelector(submitButtonSelector)
            await page.click(submitButtonSelector)

            await page.waitForTimeout(3000)
            
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}