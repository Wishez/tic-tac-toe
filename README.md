# ТэЗэ
Сделать игру в крестики-нолики на одном экране 
• Поле бесконечное 
• Ходы поочередные 
• Первый ход за крестиками и всегда в клетку с координатой (0,0) 
• Условие победы – [C] крестиков/ноликов в ряд по горизонтали, вертикали или диагонали. C – произвольный параметр, предусмотреть управление этим параметром при сборке проекта. 
• Стек – Typescript, React, Redux. 
• В Redux должен быть ровно 1 Action. Кол-во редюсеров не ограничено, но приветствуются оптимальные решения 
• Размер клетки поля по желанию, масштабированием и скроллингом можно пренебречь, считаем, что игра закончится на одном экране. Но будет плюсом, если поле будет действительно бесконечно 
• В идеале – юнит-тесты на редюсеры и компоненты, хотя бы по 1. 
• Все остальные детали – на усмотрение разработчика.

# TODO
1. Оптимизировать алгоритм на больших полях
2. Добавить масштабирование с перетаскиванием
3. Сделать бесконечное поле
4. Сохранить данные по предыдущим игр и текущей игре
5. Отобразить количество побед и ничьих для каждого игрока
6. Добавить механику отката ходов
7. Наиграться с ботом, убедившись, что всё верно работает

# Дизайн
https://www.figma.com/file/0ki3j45JXVD5sWTFXZ4AEe/%D0%9A%D1%80%D1%81%D1%82%D0%B8%D0%BA%D0%B8-%D0%BD%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8?node-id=2%3A3

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
