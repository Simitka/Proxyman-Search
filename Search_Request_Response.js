//////////////////////////////////////////////////////////////////////////////////////////////////////////  
///////////////////////////////////////////// НАСТРОЙКА ПОИСКА ///////////////////////////////////////////
//С помощью массива color ниже можно выполнить поиск любого количества фраз внутри запроса-ответа
//Найденные фразы помечаются цветами и добавляются в колонку Comment
//Для пометки доступны 7 цветов: red, blue, green, yellow, purple, gray, white (commentOnly)
//У каждого цвета есть параметры поиска, о них ниже:
////exactSearch – ВКЛ/ВЫКЛ жесткий поиск. В мягком поиске не учитывается регистр и ищутся фразы внутри фраз
////whereSearch – искать внутри request / response / everywhere (request+response)
////whatFind – фраза или массив фраз, которые будет искать скрипт
const color = {
  red: {
    exactSearch: false,
    whereSearch: 'request',
    whatFind: [
      '"method": "verify_receipt_data_v2"',
      '"method": "verify_purchase"'
    ]
  },
  gray: {
    exactSearch: true,
    whereSearch: 'request',
    whatFind: '"eventName": "bannerDefault"'
  },
  blue: {
    exactSearch: false,
    whereSearch: 'everywhere',
    whatFind: '"model": "Transaction"'
  },
  green: {
    exactSearch: true,
    whereSearch: 'request',
    whatFind: [
      '"method": "getToken"',
      '"method": "getContext"',
      '"model": "FirebaseMapping"',
      '"model": "MailingListStatusesMapping"'
    ]
  },
  yellow: {
    exactSearch: true,
    whereSearch: 'request',
    whatFind: [
      '"model": "Impression"',
      '"model": "Click"',
      '"model": "inApps"',
      '"model": "PaidSubscriptionActivation"'
    ]
  },
  purple: {
    exactSearch: true,
    whereSearch: 'request',
    whatFind: [
      '"model": "ApplovinAdsImpression"',
      '"model": "AdsClick"',
      '"event_name": "rewarded_video_request"',
      '"event_name": "interstitial_video"',
      '"event_name": "rewarded_video"',
      '"model": "ImpressionFail"'
    ]
  },
  commentOnly: {
    exactSearch: true,
    whereSearch: 'everywhere',
    whatFind: ''
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function onResponse(context, url, request, response) {
  for (var key in color) {
    if (color[key].whatFind != "") {
      if (Array.isArray(color[key].whatFind) == true) {
        for (var i = 0; i < color[key].whatFind.length; i++) {
          if (searchFun(color[key].whatFind[i], color[key].whereSearch, color[key].exactSearch) != -1) {
            response.color = key;
            response.comment = color[key].whatFind[i];
            return response;
          }
        }
      } else if (Array.isArray(color[key].whatFind) == false) {
        if (searchFun(color[key].whatFind, color[key].whereSearch, color[key].exactSearch) != -1) {
          response.color = key;
          response.comment = color[key].whatFind;
          return response;
        }
      } else if (color[key] == "commentOnly") {
        if (searchFun(color[key].whatFind, color[key].whereSearch, color[key].exactSearch) != -1) {
          response.comment = color[key].whatFind;
          return response;
        }
      }
    }
  }
  return response;

  ///////////////////////////////// FUNCTION /////////////////////////////////
  function searchFun(whatFindValue, whereSearchValue, exactSearchValue) {

    switch (exactSearchValue) {
      case true: {
        var regEx = new RegExp('(\\W|^)(' + whatFindValue + ')(\\W|$)');
        break;
      }
      case false: {
        var regEx = new RegExp(whatFindValue, "i");
        break;
      }
    }

    switch (whereSearchValue) {
      case "request": {
        var strJson = request.body;
        break;
      }
      case "response": {
        var strJson = response.body;
        break;
      }
      case "everywhere": {
        var strJson = Object.assign({}, request.body, response.body);
        break;
      }
    };

    strJson = JSON.stringify(strJson).split(': ').join(':').split(':').join(': ').split(',').join(', ');
    return strJson.search(regEx);
  }
}
////////////////////////////////////////////////////////////////////////////
