(function () {
    var host = document.getElementsByTagName("preloader")[0];
    var bars = [];
  
    var i = 0;
  
    host.hide = function () {
      this.style.display = "none";
    };
    host.show = function () {
      this.style.display = "block";
    };
  
    /*host.addEventListener( 'show', host.show, false);
              host.addEventListener( 'hide', host.hide, false);*/
  
    while (i < 3) {
      i++;
      var bar = document.createElement("bar");
      bars.push(bar);
      host.appendChild(bar);
    }
  
    var barAnimation = function (index) {
      setTimeout(
        function () {
          setInterval(function () {
            bars[index].setAttribute(
              "class",
              bars[index].getAttribute("class") == "active" ? "" : "active"
            );
          }, 700);
        },
        index == 0 ? 50 : index * 150 + 50
      );
    };
  
    host.setAttribute("class", "animate");
  
    setTimeout(function () {
      host.setAttribute("class", "start animate");
    }, 300);
    setTimeout(function () {
      host.setAttribute("class", "start complete");
    }, 1100);
  
    setTimeout(function () {
      for (var b = 0; b < bars.length; b++) {
        barAnimation(b);
      }
    }, 1100);
  })();
  