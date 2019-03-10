const {
  BaseKonnector,
  requestFactory,
  signin,
  scrape,
  saveFiles,
  log,
  utils
} = require('cozy-konnector-libs')
const request = requestFactory({
  cheerio: true,
  json: false,
  jar: true
})

const VENDOR = 'orchestra'
const baseUrl = 'http://www.egiweb.net'

module.exports = new BaseKonnector(start)

async function start(fields) {
  log('info', 'Authenticating ...')
  await authenticate(fields.login, fields.password)
  log('info', 'Successfully logged in')
  log('info', 'Fetching the list of documents')
  const $ = await request(`${baseUrl}/Works/Doc_all.php`)
  log('info', 'Parsing list of documents')
  const documents = await parseDocuments($)
  log('info', 'Saving data to Cozy')
  await saveFiles(documents, fields)
}

function authenticate(login, password) {
  return signin({
    url: baseUrl,
    formSelector: 'form',
    formData: { login, password },
    validate: (statusCode, $, fullResponse) => {
      const [, redirectLocation] =
        fullResponse.body.match(/location='(.+)?'/) || []
      return redirectLocation && redirectLocation.endsWith('login-2.php')
    }
  })
}

function parseDocuments($) {
  const docs = scrape(
    $,
    {
      title: {
        sel: 'a',
        parse: title => title.split('/ ').pop()
      },
      date: {
        sel: 'a',
        parse: text => {
          const [date] = text.match(/(\d{2}\/\d{2}\/\d{4})/)
          return new Date(
            date.split('/')[2],
            parseInt(date.split('/')[1]) - 1,
            parseInt(date.split('/')[0])
          )
        }
      },
      fileurl: {
        sel: 'input',
        attr: 'value',
        parse: url => `${baseUrl}/${url.replace(/^\.\.\//, '')}`
      },
      vendorRef: {
        sel: 'input',
        attr: 'value',
        // eslint-disable-next-line prettier/prettier
        parse: url => url.split('_').pop().split('.').shift()
      }
    },
    'form'
  )
  return docs.map(doc => ({
    ...doc,
    filename: `${utils.formatDate(doc.date)}_${VENDOR}_${doc.vendorRef}.pdf`,
    vendor: VENDOR,
    metadata: {
      importDate: new Date(),
      version: 1
    }
  }))
}
