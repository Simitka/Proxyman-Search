# scriptTrash
Выше можно скачать возможно даже рабочий скрипт для ProxyMan, который ищет в теле запроса/ответа указанную тобой фразу и, в случае успеха, красит и добавляет комментарий к соответствующему запросу/ответу
<img width="1400" alt="image" src="https://user-images.githubusercontent.com/60274458/181373820-c8bfbfe0-225b-4db8-993a-84deb390e34a.png">
### На данный момент скрипт (не)умеет
- [ ] Возможность выбрать где будет осуществляться поиск
	- [x] поиск в request body	
	- [ ] поиск в response body
	- [ ] переключатель request-response
	- [ ] возможность искать и в request, и в response
- [x] Два режима поиска:
	- [x] строгий – ищет конкретную фразу
	- [x] мягкий – ищет в том числе фразу внутри фразы 
- [ ] Нормальное описание


# Установка 
1. Скачать, установить и запустить [ProxyMan](https://proxyman.io)
2. Засетапить устройство (подробнее в ProxyMan ➡ Menu bar ➡ Sertificate ➡ Install sertificate in Android/iOS)
3. Открыть Menu bar ➡ Scripting ➡ Script list...
4. Слева внизу нажать на +
5. В поле URL указать желаемый хост или * для всех хостов
6. Скопировать содержание скрипта на GitHub и вставить в окно программы
7. Нажать Save & Active
<img width="1400" alt="image" src="https://user-images.githubusercontent.com/60274458/181373525-048554e1-1838-4aa2-9986-0b00c6ef3a6d.png">
