  function onResponse(context, url, request, response) {
    ///////////////////////////////////////////// НАСТРОЙКА ПОИСКА ////////////////////////////////////////////
    //В блоке color ниже можно выполнить поиск до 6 фраз и подсветить их разными цветами
    //Для подсветки доступны 6 цветов: red, blue, green, yellow, purple, gray
    //У каждого цвета есть параметры поиска, о них ниже:
    ////whatFind – та фраза, которую будет искать скрипт
    ////exactSearch – ВКЛ/ВЫКЛ жесткий поиск. В мягком поиске не учитывается регистр и ищутся фразы внутри фраз
    ////whereSearch – искать внутри request / response / everywhere (request+response)
    var color = {
      red: {
        whatFind: '',
        exactSearch: true,
        whereSearch: 'request'
      },
      blue: {
        whatFind: '',
        exactSearch: true,
        whereSearch: 'response'
      },
      green: {
        whatFind: '"method": "getContext"',
        exactSearch: true,
        whereSearch: 'request'
      },
      yellow: {
        whatFind: 'Tiles Android: Start Promo',
        exactSearch: true,
        whereSearch: 'request'
      },
      purple: {
        whatFind: '"model": "Click',
        exactSearch: false,
        whereSearch: 'request'
      },
      gray: {
        whatFind: '"event_name": "Gandalf spot"',
        exactSearch: false,
        whereSearch: 'everywhere'
      }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (var key in color) {
      if (color[key].whatFind != "") {
        if (searchFun(color[key].whatFind, color[key].whereSearch, color[key].exactSearch) != -1) {
          response.color = key;
          response.comment = color[key].whatFind;
          return response;
        }
      }
    }

    return response;

    ///////////////////////////////// FUNCTION /////////////////////////////////
    function searchFun(whatFindValue, whereSearchValue, exactSearchValue) {
      switch (whereSearchValue) {
        case "request": {
          var strJson = request.body;
          break;
        };
      case "response": {
        var strJson = response.body;
        break;
      };
      case "everywhere": {
        var strJson = Object.assign({}, request.body, response.body);
        break;
      };
      };

      strJson = JSON.stringify(strJson).split(': ').join(':').split(':').join(': ').split(',').join(', ');

      switch (exactSearchValue) {
        case true:
          var regEx = new RegExp('(\\W|^)(' + whatFindValue + ')(\\W|$)');
          console.log("\n=============================\nTRUE | regEX = " + regEx);
          console.log("TRUE | value = " + strJson + "\n=============================\n");
          break;
        case false:
          var regEx = new RegExp(whatFindValue, "i");
          console.log("\n=============================\nFALSE | regEX = " + regEx);
          console.log("FALSE | value = " + strJson + "\n=============================\n");
          break;
      }

      return strJson.search(regEx);

    }
  }
  ////////////////////////////////////////////////////////////////////////////
