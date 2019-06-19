export default function htmlTemplate(reactDom, reduxState, helmetData, req) {
  const root = `${req.protocol}://${req.headers.host}`

  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="${root}/static/css/bundle.css">
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
      </head>

      <body>
        <div id="app">${reactDom}</div>
        <script>
          window.REDUX_DATA = ${JSON.stringify(reduxState)}
        </script>
        <script src="${root}/static/js/bundle.js"></script>
      </body>
      </html>
  `
}
