import twitter

def tweet(tempInfo):
    api = twitter.Api(consumer_key='',
                      consumer_secret='',
                      access_token_key='',
                      access_token_secret='')

    message = ('Office Temp:\n'
              'Average Temperature: {0}\n' 
              'Highest Temperature: {1}\n'
              'Measuring Period: 8:00 a.m. - 5 p.m.\n'
              'Detail View: https://goo.gl/HlYBdr').format(tempInfo.averageTemp, tempInfo.highestTemp)

    try:
        status = api.PostUpdate(message, verify_status_length=False)
    except UnicodeDecodeError:
        print "Your message could not be encoded.  Perhaps it contains non-ASCII characters? "
        print "Try explicitly specifying the encoding with the --encoding flag"
        sys.exit(2)
    
