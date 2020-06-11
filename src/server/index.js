const express = require("express");
const cors  = require("cors")
const React  = require("react")
const { renderToString }  = require("react-dom/server")
const StaticRouter = require("react-router").StaticRouter
const serialize  = require("serialize-javascript")
const App  = require('../shared/App').default;

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  // const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise =  Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hacker News</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
          <style>
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 3px;
  padding-bottom: 2px;
  text-align: left;
  background-color: #ff742a;
  color: white;
}
#customers td {
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: left;
}
</style>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port: 3000`)
})
