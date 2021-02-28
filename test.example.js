// Copy this file to test.js
// You can then test using npm test

import post from './index.js'

(async () => {
    console.log(await post(
        'Difter login or email',
        'Difter password',
        'Post content',
        {show: true}
    ))
})()
