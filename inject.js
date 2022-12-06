(function () {
  const api = 'https://xuehuayu.cn/v.html?source=extension&from={{from}}&title={{title}}&vid='
  const loc = window.location.href

  function _$ (selector, dom = document) {
    return dom.querySelector(selector)
  }
  function _$$ (selector, dom = document) {
    return dom.querySelectorAll(selector)
  }

  function hideSelector (selector) {
    _$$(selector).forEach(e => {
      e.remove()
    })
  }

  function clearTimer (timer) { clearInterval(timer); clearTimeout(timer); timer = null; }
  function setItem (key, value) { window?.localStorage?.setItem(key, value); }
  function getItem (key) { return window?.localStorage?.getItem(key); }

  function addClass (selector, classNamme) {
    _$$(selector).forEach(e => {
      let cl = e.classList
      cl = cl + ' ' + classNamme
      e.classList = cl
    })
  }

  function removeClass (selector, classNamme) {
    _$$(selector).forEach(e => {
      let cl = e.classList
      cl = cl.replace(classNamme, '')
      e.classList = cl
    })
  }

  if (loc.includes('leduozy')) {
    const vodList = _$$('.movievod li') || [];

    vodList.forEach(li => {
      const _html = li.innerHTML
      const _text = li.innerText
      if (_text.includes('XM')) {
        li.classList = li.classList + ' vod-li'
        const xm = _html.replace(/<.+\/?>|<.+>.*?<\.*>/g, '')
        const nums = _html.match(/.*\>(.*?)\$/)
        const num = nums ? ':' + nums[1] : ''
        const ldApi = api.replace('{{from}}', 'leduo').replace('{{title}}', `${nums[1]}`)
        const _a = document.createElement('a')
        _a.href = ldApi + xm
        _a.target = '_blank'
        _a.className = 'kk-btn'
        _a.innerText = `播放${num}`
        li.append(_a)
      }
    })
  } else if (loc.includes('fqzy')) {
    const vodList = _$$('.vodplayinfo li') || [];

    vodList.forEach(li => {
      const _html = li.innerHTML
      const _text = li.innerText
      if (_text.includes('FQ')) {
        li.classList = li.classList + ' vod-li'
        const xm = _html.replace(/<.+\/?>|<.+>.*?<\.*>|.*?\$/g, '')
        const nums = _html.match(/.*\>(.*?)\$/)
        const num = nums ? ':' + nums[1] : ''
        const fqApi = api.replace('{{from}}', 'fanqie').replace('{{title}}', `${nums[1]}`)
        const _a = document.createElement('a')
        _a.href = fqApi + xm
        _a.target = '_blank'
        _a.className = 'kk-btn'
        _a.innerText = `播放${num}`
        li.append(_a)
      }
    })
  } else if (loc.includes('guangsuzy') || loc.includes('guangsuziyuan')) {
    const vodList = _$$('.dy-collect-list li') || [];
    const api = 'https://www.gszyv.com/m3u8/?url='
    const wraps = _$$('.dy-collect-video')
    wraps.forEach(e => {
      if (e.innerText.includes('.m3u8')) {
        e.id = 'kk-play-m3u8'
      } else {
        e.id = 'kk-play-yun'
      }
    })
    const title = _$('.dy-collect .dy-title')
    title.classList = title.classList + ' flex-block center-items'
    title.innerHTML = title.innerHTML + '<span>&nbsp;&nbsp;[点击跳转到目标位置]==></span><a class="kk-btn d-i-b" target="_self" href="#kk-play-yun">yun</a><a class="kk-btn d-i-b" target="_self" href="#kk-play-m3u8">m3u8</a>'
    vodList.forEach(li => {
      const xm = _$$('a', li)[0].href

      if (xm.includes('http')) {
        const nums = _$('.c-name', li).innerText
        const num = nums ? ':' + nums : ''
        const _a = document.createElement('a')
        if (xm.includes('.m3u8')) {
          _a.href = api + xm
        } else {
          _a.href = xm
        }
        _a.target = '_blank'
        _a.className = 'kk-btn d-i-b'
        _a.innerText = `播放${num}`
        li.append(_a)
      }
    })
  } else if (loc.includes('hongniuzy') || loc.includes('hongniuziyuan')) {
    const vodList = _$$('.vodplayinfo li') || [];
    const api = 'https://www.tutukiki.com/m3u8/?url='
    const wrap = _$$('.playBox')[1]
    const title = _$('.liketitle', wrap)
    title.style.height = 'auto'
    title.innerHTML = '<div class="flex-block center-items">' + title.innerHTML + '</div>' + '<div><span class="f-s-16">&nbsp;&nbsp;[点击跳转到目标位置]==></span><a class="kk-btn d-i-b" target="_self" href="#play_1">yun</a><a class="kk-btn d-i-b" target="_self" href="#play_2">m3u8</a></div>'
    vodList.forEach(li => {
      const xm = _$$('a', li)[0].href
      if (xm.includes('http')) {
        li.classList = li.classList + ' vod-li'
        const num = _$$('a', li)[0].title
        const _a = document.createElement('a')
        if (xm.includes('.m3u8')) {
          _a.href = api + xm
        } else {
          _a.href = xm
        }
        _a.target = '_blank'
        _a.className = 'kk-btn'
        _a.innerText = `播放${num}`
        li.append(_a)
      }
    })
  } else if (loc.includes('foxzyw') || loc.includes('foxzy') || loc.includes('kudian')) {
    const vodList = _$$('.stui-content__playlist li') || [];
    const jxUrl = 'http://jx.ykyunbo.com/m3u8.php?url='
    vodList.forEach(li => {
      const xm = _$$('.url', li)[0].innerText
      const num = _$$('.copy_text', li)[0].innerText.split(' : ')[0]
      if (xm.includes('http')) {
        const _a = document.createElement('a')
        if (xm.includes('.m3u8')) {
          _a.href = jxUrl + xm
        } else {
          _a.href = xm
        }
        _a.target = '_blank'
        _a.className = 'kk-btn'
        _a.innerText = `播放:${num}`
        li.append(_a)
      }
    })
  } else if (loc.includes('xhzy0')) {
    const vodList = _$$('.vodplayinfo li') || [];
    const vodInfos = _$$('.vodplayinfo')
    const jxUrl = 'https://m3u8.tx-xhzy.com/?url='
    const titles = _$$('.whitetitle')
    const index = titles.length - 1
    const titleHtml = titles[index].innerHTML
    titles[index].classList = titles[index].classList + ' flex-block'
    titles[index].innerHTML = '<div class="flex-block center-items">' + titleHtml + '</div>' + '<div><span class="f-s-16">&nbsp;&nbsp;[点击跳转到目标位置]==></span><a class="kk-btn d-i-b" target="_self" href="#xhzy">yun</a><a class="kk-btn d-i-b" target="_self" href="#xhm3u8">m3u8</a></div>'
    vodList.forEach(li => {
      const xm = _$$('font', li)[0].innerText
      const links = xm.split('$')
      const num = links[0]
      const link = links[1]
      if (xm.includes('http')) {
        const _a = document.createElement('a')
        if (xm.includes('.m3u8')) {
          _a.href = jxUrl + link
        } else {
          _a.href = link
        }
        _a.target = '_blank'
        _a.className = 'kk-btn'
        _a.innerText = `播放:${num}`
        li.append(_a)
      }
    })

  }

})()
