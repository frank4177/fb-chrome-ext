// let allUrls = [] // Use a Set to avoid duplicate URLs
let urls = new Set()
let storedData = {}

async function clickAndSavePostUrls(storeddata) {
  // localStorage.setItem('move', 0)

  chrome.storage.local.get(['profileData'], function (result) {
    // console.log('datt', result.profileData);
    storedData = result.profileData
  })

  let lastHeight = document.body.scrollHeight

  while (true) {
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait for the page to load more posts.

    const selector ='.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.xt0b8zv.xi81zsa'

    const posts = document.querySelectorAll(selector)

    posts.forEach((post) => {
      var event = new FocusEvent('focusin', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
      post.dispatchEvent(event)
    })

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for focus interactions

    posts.forEach((post) => {
      if (post.href && isValidPostUrl(post.href)){
        urls.add(post.href)
      }
    })

    const newHeight = document.body.scrollHeight
    if (newHeight === lastHeight) {
      break // If the scroll height hasn't changed, we've hit the bottom.
    }
    lastHeight = newHeight
  }

  const pathname = window.location.pathname
  console.log(pathname)

  urls = Array.from(urls)

  console.log('dd', storedData)
  console.log(urls)
  postData(storedData, urls)
  console.log('Reached the bottom of the page.')

  // chrome.storage.local.set({ key:"restart" }, () => {  // Storing the data
  //   console.log('Profile data is set:', "restart");
  // });
  alert('Reached the bottom of the page.')
}

function isValidPostUrl(url) {
  return /\/posts|\/permalink|\/story|\/photo/.test(url);
}

async function postData(dataa, urll) {
  const batchid = dataa.model.batch_job_id
  const fbid = dataa.model.id
  const payload = {
    links: urll,
  }

  if (urll.length !== 0) {
    // Default options are marked with *
    const response = await fetch(
      `https://mkdlabs.com/v3/api/custom/owlco/save_links/${batchid}/${fbid}`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
          'Content-Type': 'application/json',
          'x-project': 'b3dsY286Y3VjOWxhdTRyMmoybHllNHQxaXYzMHl3bjM4dm5iYQ==',
        },

        body: JSON.stringify(payload), // body data type must match "Content-Type" header
      },
    )

    // Throws an error if the response status is not in the range 200-299
    if (!response.ok) {
      alert('Post Links API error')
      throw new Error('Network response was not ok')
    }
  } else {
    const response = await fetch(
      `https://mkdlabs.com/v3/api/custom/owlco/save_links/${batchid}/${fbid}`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.

        headers: {
          'Content-Type': 'application/json',
          'x-project': 'b3dsY286Y3VjOWxhdTRyMmoybHllNHQxaXYzMHl3bjM4dm5iYQ==',
        },

        body: JSON.stringify({skip: true}), 
      },
    )

    // Throws an error if the response status is not in the range 200-299
    if (!response.ok) {
      alert('Post Links API error')
      throw new Error('Network response was not ok')
    }
  }

  if (dataa.model === null) {
    alert('profiles finished')
  }

  const data = await response.json()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'collectUrls') {
    // chrome.storage.local.get(['profileData'], function(result) {
    //   // console.log('Profile data currently is:', result.profileData);
    //   clickAndSavePostUrls();  // Continue with the URL collection process
    // });
    clickAndSavePostUrls() // Continue with the URL collection process
  }

  if (request.action === 'navigate') {
    chrome.storage.local.get(['profileData'], function (result) {
      // console.log('Profile data currently is:', result.profileData);
      window.location.href = result.profileData.model.facebook_profile_link
    })
  }
  return true // Indicates you wish to send a response asynchronously
})


