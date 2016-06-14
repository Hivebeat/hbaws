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


    const sqs = {
      queues: {
        exporting: {
          sendMessage: function() {
            var params = {
              MessageBody: JSON.stringify(message),
              QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/509982192577/exporting',
              DelaySeconds: 0,
            }
            return new Promise((resolve, reject) => {
              sqs.sendMessage(params, function(err, data) {
                if (err) return reject(err)
                return resolve(data)
              });
            })
          }
        }
      }
    }
  }


  return {
    sendMail: sendMail,
    lambda: lambda,
    sqs: sqs
  }
}
