import loginToDifter from './src/login.js'
import puppeteer from 'puppeteer'
import type from '@pierreminiggio/puppeteer-text-typer'

/**
 * @typedef {Object} DifterPosterConfig
 * @property {boolean} show default false
 * 
 * @param {string} login
 * @param {string} password
 * @param {string} content
 * @param {DifterPosterConfig} config 
 * 
 * @returns {Promise<string>}
 */
export default function (login, password, content, config = {}) {

    return new Promise(async (resolve, reject) => {
        
        setDefaultConfig(config, 'show', false)

        let browser
        try {
            browser = await puppeteer.launch({
                headless: ! config.show,
                args: [
                    '--disable-notifications',
                    '--no-sandbox'
                ]
            })
        } catch (e) {
            reject(e)
            return
        }
        
        try {
            const page = await browser.newPage()

            await loginToDifter(page, login, password)

            const textareaSelector = '.emojionearea-editor'
            await type(page, textareaSelector, content)
            
            const submitButtonSelector = 'button[type="submit"]'
            await page.click(submitButtonSelector)

            await page.waitForTimeout(4000)

            const postId = await page.evaluate(() => {
                return document.querySelector('.post-list-item').getAttribute('data-list-item')
            })
            
            await browser.close()
            resolve(postId)
        } catch (e) {
            await browser.close()
            reject(e)
        }
    })
}

/**
 * @param {DifterPosterConfig} config 
 * @param {string} configKey 
 * @param {*} defaultValue
 * 
 * @returns {void}
 */
function setDefaultConfig(config, configKey, defaultValue) {
    if (! (configKey in config)) {
        config[configKey] = defaultValue
    }
}
