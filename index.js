module.exports = function(AWS) {
  function sendMail(payload) {
    const params = {
      FunctionName: 'lambda_mail-production-1-0-0',
      InvocationType: 'Event',
      Payload: JSON.stringify(payload)
    }
    const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31'
    })
    return new Promise((resolve, reject) => {
      lambda.invoke(params, function(err, data) {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }

  function lambda(name, payload) {
    const params = {
      FunctionName: name,
      InvocationType: 'Event',
      Payload: JSON.stringify(payload)
    }
    const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31'
    })
    return new Promise((resolve, reject) => {
      lambda.invoke(params, function(err, data) {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }


  return {
      sendMail: sendMail
  }
}
