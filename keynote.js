(function () {

  var slides = [].slice.call(document.querySelectorAll('section'));
  var current = null;

  [].slice.call(document.querySelectorAll('.gist')).forEach(function (el) {
    var octoLogo = document.createElement('div');

    // Look for script tag
    var scriptTag = el.previousSibling;
    while (scriptTag && scriptTag.nodeName.toLowerCase() !== 'script') {
      scriptTag = scriptTag.previousSibling;
    }

    octoLogo.classList.add('gist-logo');
    octoLogo.innerHTML = '<a class="icon-github" href="' + scriptTag.src.replace('.js', '') + '"></a>';
    el.appendChild(octoLogo);
  });

  var goToPage = function(page) {
    if (page < 0 || page >= slides.length) {
      return;
    }
    slides.forEach(function (slide) {
      if (slide.classList.contains('active')) {
        slide.classList.remove('active');
      }
    });
    slides[page].classList.add('active');
    current = page;

    var aside = slides[page].querySelector('aside');

    if (aside) {
      var spaces = '                                   ';
      console.log(
        '%c' + spaces + 'Slide ' + (page + 1) + ' of ' + slides.length + spaces,
        'width:100%;display:block;background: #222; color: #fff;font-size:20px;'
      );
      console.log('%c' + aside.textContent, 'font-size: 14px;' + aside.style.cssText);
    }

    document.location.hash = '#' + page;
  };

  document.onkeydown = function (evt) {
    if (evt.keyCode === 37) {
      goToPage(current - 1);

    } else if (evt.keyCode === 39) {
      goToPage(current + 1);
    }
  };

  var page = document.location.hash ? document.location.hash.substr(1) : 0;
  goToPage(parseInt(page, 10));

})();
